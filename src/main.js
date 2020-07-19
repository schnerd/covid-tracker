import {nest as d3nest} from 'd3-collection';
import {stack as d3stack, line as d3line, curveMonotoneX as d3curveMonotoneX} from 'd3-shape';
import {format as d3format} from 'd3-format';
import {json as d3json, csv as d3csv} from 'd3-fetch';
import {
  mean as d3mean,
  sum as d3sum,
  min as d3min,
  range as d3range,
  extent as d3extent,
  bisectLeft as d3bisectLeft,
} from 'd3-array';
import {select as d3select, mouse as d3mouse, event as d3event} from 'd3-selection';
import {axisLeft as d3axisLeft} from 'd3-axis';
import {
  scaleBand as d3scaleBand,
  scaleLog as d3scaleLog,
  scaleLinear as d3scaleLinear,
} from 'd3-scale';
import {geoAlbersUsa as d3geoAlbersUsa, geoPath as d3geoPath} from 'd3-geo';
import scaleCluster from 'd3-scale-cluster';
import memoizeOne from 'memoize-one';
import throttle from 'lodash/throttle';
import findLast from 'lodash/findLast';
import sortedIndexBy from 'lodash/sortedIndexBy';
import $ from 'jquery';
import * as history from 'history';
import * as topojson from 'topojson-client';
import './style.css';
import 'd3-transition';

(function () {
  const isTouchDevice = 'ontouchstart' in document.documentElement;
  if (isTouchDevice) {
    $(document.body).addClass('touch');
  }

  // Data
  let stateData = null;
  let countyData = null;
  let usData = null;
  let lastData = null;

  let stateToFipsMap = {};

  // Map features
  let stateFeatures = null;
  let stateBorders = null;
  let countyFeatures = null;

  // Filter values
  const filters = {
    state: 'all',
    field: 'newCases',
    time: '14d',
    useLog: false,
    per100k: false,
    consistentY: true,
  };

  // UI state
  let firstCasesDate = new Date(2020, 0, 21);
  let lastCasesDate = null;
  let tooltipValue = null;
  let tooltipShown = null;
  let tooltipHideTimer = null;
  let isTestingData = false;

  ///////////////
  // Constants //
  ///////////////

  const dataPointLabels = {
    cases: 'Total Cases',
    deaths: 'Total Deaths',
    tests: 'Total Tests',
    positive: 'Total Positive',
    pending: 'Total Pending',
    negative: 'Total Negative',
    newCases: 'New Cases',
    newDeaths: 'New Deaths',
    newTests: 'New Tests',
    newPositive: 'New Positive',
    newNegative: 'New Negative',
    pop: 'Est. Population',
  };
  Object.keys(dataPointLabels).forEach((k) => {
    dataPointLabels[per100kKey(k)] = dataPointLabels[k];
  });

  // On the map, "daily new" fields are averages
  const mapDataPointLabels = {...dataPointLabels};
  Object.keys(mapDataPointLabels).forEach((key) => {
    if (key.indexOf('new') === 0) {
      mapDataPointLabels[key] = `Avg ${mapDataPointLabels[key].replace('New', 'Daily')}`;
    }
  });

  const fieldHasMovingAverage = {
    newCases: true,
    newDeaths: true,
    [per100kKey('newCases')]: true,
    [per100kKey('newDeaths')]: true,
  };

  const timeLabels = {
    '7d': 'Last 7 days',
    '14d': 'Last 14 days',
    '1mo': 'Last 30 days',
    '90d': 'Last 90 days',
    all: 'All-time',
  };

  const MA_NUM_DAYS = 7;

  const KANSAS_CITY_FAKE_FIPS = '29999';

  // https://github.com/nytimes/covid-19-data#geographic-exceptions
  const countyLabelToFips = {
    'New York City': '36061',
    'Kansas City': KANSAS_CITY_FAKE_FIPS,
  };

  const populationOverrides = {
    // Kansas City, MO edge cases. City is not a real county, it overlaps
    // with four other counties. Mayor posted a tweet with population estimates
    // for the city overall, and the parts of the counties that fall within the city.
    // https://twitter.com/QuintonLucasKC/status/1249756319805997058
    [KANSAS_CITY_FAKE_FIPS]: 505604,
    // Cass County, MO
    '29037': 103610 - 85,
    // Jackson County, MO
    '29095': 700307 - 313870,
    // Clay County, MO
    '29047': 246365 - 137446,
    // Platte County, MO
    '29165': 102985 - 54202,

    // New York City - Sum of the 5 boroughs due to NYT geographic exception
    '36061': 8336817,
  };

  const fipsRemapping = {
    // Bronx -> NY
    '36005': '36061',
    // Kings -> NY,
    '36047': '36061',
    // Queens -> NY
    '36081': '36061',
    // Richmond -> NY
    '36085': '36061',
  };

  ////////////
  // Router //
  ////////////

  const filterKeys = {
    state: 'state',
    field: 'field',
    time: 'time',
    useLog: 'log',
    per100k: 'per100k',
    consistentY: 'consistentY',
  };
  const filterDefaults = {
    state: 'all',
    field: 'newCases',
    time: '14d',
    useLog: false,
    per100k: false,
    consistentY: true,
  };

  class Router {
    constructor(hist) {
      this.history = hist;
      this.history.listen(() => {
        // Update filter state variables and re-render
        this.parse();
        if (filters.state === 'all') {
          fetchAndRenderStates();
        } else {
          fetchAndRenderCounties(filters.state);
        }
      });
    }

    parse(firstParse = false) {
      const qs = parseQs(this.history.location.search);
      const keys = Object.keys(filterKeys);

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const qsKey = filterKeys[k];
        let v = qs[qsKey] != undefined ? qs[qsKey] : filterDefaults[k];
        // Coerce boolean filter values from string to boolean
        if (typeof filterDefaults[k] === 'boolean' && typeof v === 'string') {
          v = v === '1';
        }
        if (filters[k] === v && !firstParse) {
          continue;
        }
        switch (k) {
          case 'state': {
            // Somehow URLs with plus instead of space are being used
            v = v.replace('+', ' ');
            filters.state = v;
            $('#state-select').val(v);
            break;
          }
          case 'field': {
            if (dataPointLabels[v]) {
              filters.field = v;
              $('#field-select').val(v);

              isTestingData = filters.field === 'tests' || filters.field === 'newTests';
              if (isTestingData) {
                // Disable useLog if switching to testing data
                filters.useLog = false;
                $('#cb-use-log-scale').prop('checked', false);
                qs[filterKeys.useLog] = '0';

                $('.testing-legend').show();
                $('#filter-use-log-scale').hide();
              } else {
                $('.testing-legend').hide();
                $('#filter-use-log-scale').show();
              }
              if (v === 'newCases' || v === 'newDeaths') {
                $('.ma-legend .legend-field-label').text(dataPointLabels[v]);
                $('.ma-legend').show();
              } else {
                $('.ma-legend').hide();
              }
            }
            break;
          }
          case 'time': {
            filters.time = v;
            $('#time-select').val(v);
            break;
          }
          case 'useLog': {
            filters.useLog = v;
            $('#cb-use-log-scale').prop('checked', v);
            break;
          }
          case 'per100k': {
            filters.per100k = v;
            $('#cb-per-100k').prop('checked', v);
            break;
          }
          case 'consistentY': {
            filters.consistentY = v;
            $('#cb-consistent-y').prop('checked', v);
            break;
          }
        }
      }
    }

    push(obj) {
      this._update('push', obj);
    }

    replace(obj) {
      this._update('replace', obj);
    }

    _update(action, obj) {
      const query = {
        ...parseQs(this.history.location.search),
        ...obj,
      };
      this.history[action]({
        search: stringifyQs(query),
      });
    }
  }

  function parseQs(qs) {
    const query = qs[0] === '?' ? qs.substring(1) : qs;
    const vars = query ? query.split('&') : [];
    const obj = {};
    for (let i = 0; i < vars.length; i++) {
      const [k, v] = vars[i].split('=').map(decodeURIComponent);
      obj[k] = v;
    }
    return obj;
  }
  function stringifyQs(obj) {
    const result = Object.keys(obj)
      .map((k) => {
        return `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`;
      })
      .join('&');
    return result ? `?${result}` : '';
  }
  const router = new Router(history.createBrowserHistory());
  router.parse(true);

  /////////////////////
  // Data Processing //
  /////////////////////

  function getValueKeys(withTesting) {
    const valueKeys = ['cases', 'deaths', 'newCases', 'newDeaths'];
    if (withTesting) {
      valueKeys.push(
        'positive',
        'negative',
        'pending',
        'tests',
        'newPositive',
        'newNegative',
        'newTests',
      );
    }
    return valueKeys;
  }

  function processStates(csv, popMap) {
    const nestedStates = d3nest()
      .key((k) => k.state)
      .entries(csv);

    const processed = processGroups(nestedStates, popMap, true);

    stateData = [];
    processed.forEach((group) => {
      if (group.key === 'US') {
        group.key = 'United States';
        usData = [group];
      } else {
        if (!stateToFipsMap[group.key]) {
          stateToFipsMap[group.key] = group.values[0].fips;
        }
        stateData.push(group);
      }
    });
  }

  function coerceNumber(value) {
    return value == undefined ? null : Number(value);
  }

  function processCounties(csv, popMap) {
    // First nest counties by state
    const nestedStates = d3nest()
      .key((k) => k.state)
      .entries(csv);

    const stateMap = {};

    nestedStates.forEach((state) => {
      const counties = d3nest()
        .key((k) => k.county)
        .entries(state.values);
      const byCounty = processGroups(counties, popMap, false);
      stateMap[state.key] = {key: state.key, counties: byCounty};
    });

    countyData = stateMap;
  }

  function processPopulations(pop) {
    const map = Object.assign({}, populationOverrides);
    pop.forEach((p) => {
      const fips = fipsRemapping[p.fips] || p.fips;
      if (populationOverrides[fips]) {
        map[fips] = populationOverrides[fips];
      } else {
        map[fips] = parseInt(p.pop);
      }
    });
    return map;
  }

  function processGroups(groups, popMap, hasTesting) {
    const valueKeys = getValueKeys(hasTesting);

    groups.forEach((group) => {
      const newRows = [];
      for (let i = 0; i < group.values.length; i++) {
        const row = group.values[i];
        const [year, month, date] = row.date.split('-');

        let fips = row.fips;
        if (!fips && row.county) {
          fips = countyLabelToFips[row.county];
        }

        const parsed = {
          ...row,
          fips,
          date: new Date(Number(year), Number(month) - 1, Number(date)),
          cases: Number(row.cases),
          deaths: Number(row.deaths),
          newCases: Number(row.newCases),
        };
        valueKeys.forEach((key) => {
          parsed[key] = coerceNumber(parsed[key]);
        });

        newRows.push(parsed);

        // Add population-normalized data
        const pop = popMap[parsed.fips];
        if (pop) {
          parsed.pop = pop;
          const p100kFactor = pop / 1e5;
          valueKeys.forEach((key) => {
            if (typeof parsed[key] === 'number') {
              parsed[per100kKey(key)] = parsed[key] / p100kFactor;
            }
          });
        } else {
          group.noPopulation = true;
        }

        if (lastCasesDate === null || parsed.date.getTime() > lastCasesDate.getTime()) {
          lastCasesDate = parsed.date;
        }
      }
      group.values = newRows;
    });

    return groups;
  }

  function filterData(groups, datesToShow, hasTestingData) {
    const valueKeys = getValueKeys(hasTestingData);
    const allValueKeys = valueKeys.concat(valueKeys.map(per100kKey));

    // Keys for which to compute moving averages
    let maKeys = ['newCases', 'newDeaths'];
    maKeys = maKeys.concat(maKeys.map(per100kKey));

    const extents = {};
    const extentKeys = ['date'].concat(allValueKeys);
    extentKeys.forEach((key) => (extents[key] = [null, null]));

    const maStartDate = new Date(datesToShow[0]);
    maStartDate.setDate(maStartDate.getDate() - MA_NUM_DAYS);

    const dateAccessor = (v) => v.date.getTime();

    const newGroups = groups.map((g) => {
      const {values} = g;
      const newRows = [];

      // Start/end date of the visualized range
      let startDate = datesToShow[0];
      let endDate = last(datesToShow);
      // However we start 7 days before to calculate moving averages
      let curDate = new Date(maStartDate);

      // Using sortedIndexBy to binary search for the index where our dates start
      let valuesIndex = sortedIndexBy(values, {date: maStartDate}, dateAccessor);

      // Data structure to store our N-day moving average window for each field
      let maWindows = {};
      maKeys.forEach((key) => {
        maWindows[key] = [];
      });

      while (curDate.getTime() <= endDate.getTime()) {
        // Is this date within our visualized range?
        let isWithinRange = curDate.getTime() >= startDate.getTime();

        // Peek at the next value in our values array – is there a value for the current date?
        let nextValue = values[valuesIndex];
        let matchingValue =
          nextValue && nextValue.date.getTime() === curDate.getTime() ? nextValue : null;

        // First update moving averages
        let maValues = {};
        maKeys.forEach((key) => {
          const arr = maWindows[key];
          if (arr.length === MA_NUM_DAYS) {
            arr.shift();
          }
          // If there is data for the current date/field combo, use that.
          if (matchingValue && typeof matchingValue[key] === 'number') {
            arr.push(nextValue[key]);
          } else {
            arr.push(0);
          }
          // Store today's moving average as the mean of our moving average window
          maValues[maKey(key)] = d3mean(arr);
        });

        // For dates that will be visualized, push a value into the newRows array
        if (isWithinRange) {
          if (matchingValue) {
            newRows.push(Object.assign({}, matchingValue, maValues));
          } else {
            // If there was no matching value for today, all we have is a moving average,
            // just generate a fake data point with the average values
            newRows.push(
              Object.assign(
                {
                  date: new Date(curDate),
                  fips: values[0].fips,
                  pop: values[0].pop,
                  state: values[0].state,
                  county: values[0].county,
                },
                maValues,
              ),
            );
          }
        }

        // If current index of values array was a match for this date, we want to move to next.
        if (matchingValue) {
          valuesIndex++;
        }

        // Make next loop iteration use tomorrow's date
        curDate.setDate(curDate.getDate() + 1);
      }

      // Update the extents object
      newRows.forEach((row) => {
        extentKeys.forEach((key) => {
          const extent = extents[key];
          const value = row[key];
          if (value != undefined && (extent[0] === null || value < extent[0])) {
            extent[0] = value;
          }
          if (value != undefined && (extent[1] === null || value > extent[1])) {
            extent[1] = value;
          }
          // Account for moving averages in the extent
          if (fieldHasMovingAverage[key]) {
            const maValue = row[maKey(key)];
            if (maValue != undefined && (extent[1] === null || maValue > extent[1])) {
              extent[1] = maValue;
            }
          }
        });
      });

      return {
        ...g,
        values: newRows,
      };
    });

    return {groups: newGroups, extents};
  }

  const filterGridData = memoizeOne(filterData);
  const filterOverviewData = memoizeOne(filterData);

  function per100kKey(key) {
    return `${key}_p100k`;
  }

  function maKey(key) {
    return `${key}_ma`;
  }

  function last(arr) {
    return arr[arr.length - 1];
  }

  let mapRenderCount = 0;
  function render(data) {
    lastData = data;
    const {groups, overview, isCounties, stateFips} = data;

    const field = filters.per100k ? per100kKey(filters.field) : filters.field;

    let daysToShow;
    if (filters.time === '7d') {
      daysToShow = 7;
    } else if (filters.time === '14d') {
      daysToShow = 14;
    } else if (filters.time === '1mo') {
      daysToShow = 30;
    } else if (filters.time === '90d') {
      daysToShow = 90;
    } else {
      daysToShow = dateDiffInDays(lastCasesDate, firstCasesDate);
    }
    const datesToShow = [lastCasesDate];
    for (let i = 1; i < daysToShow; i++) {
      const nextDate = new Date(lastCasesDate);
      nextDate.setDate(lastCasesDate.getDate() - i);
      datesToShow.unshift(nextDate);
    }

    if (isCounties && isTestingData) {
      $('#viz').hide();
      $('.testing-data-unavailable').show();
      return;
    } else {
      $('#viz').show();
      $('.testing-data-unavailable').hide();
    }

    const overviewData = filterOverviewData(overview, datesToShow, true);
    const gridData = filterGridData(groups, datesToShow, !isCounties);

    const options = {
      field,
      daysToShow,
      datesToShow,
      isCounties,
      stateFips,
    };

    renderOverview(overviewData, options);
    renderGrid(gridData, options);

    // Render map after fetching map data (debounce the render calls)
    const _mapRenderCount = ++mapRenderCount;
    fetchMapData().then(() => {
      if (_mapRenderCount === mapRenderCount) {
        renderMap(gridData, options);
      }
    });
  }

  function aggMapData(groups, features) {
    const byFips = {};

    const hasTests = groups[0].values[0].tests != undefined;
    const fields = getValueKeys(hasTests);

    groups.forEach((group) => {
      const {values} = group;
      if (!values.length) {
        return;
      }
      const {fips, pop} = values[0];

      // Just aggregate the number of new cases/etc across the selected time range
      let value = {
        fips,
        pop,
        label: group.key,
        // New cases/deaths over last N days
        cases: d3sum(values, (v) => v.newCases),
        deaths: d3sum(values, (v) => v.newDeaths),
        // Average of new daily cases/deahts over last N days
        newCases: d3mean(values, (v) => v.newCases),
        newDeaths: d3mean(values, (v) => v.newDeaths),
      };

      if (hasTests) {
        value.tests = d3sum(values, (v) => v.newTests);
        value.positive = d3sum(values, (v) => v.newPositive);
        value.positivePct = value.positive / value.tests;
        value.negative = d3sum(values, (v) => v.newNegative);
        value.negativePct = value.negative / value.tests;
        value.pending = d3sum(values, (v) => v.newPending);
        value.pendingPct = value.pending / value.tests;
        value.newTests = d3mean(values, (v) => v.newTests);
        value.newPositive = d3mean(values, (v) => v.newPositive);
        value.newPositivePct = value.newPositive / value.newTests;
        value.newNegative = d3mean(values, (v) => v.newNegative);
        value.newNegativePct = value.newNegative / value.newTests;
      }

      const p100kFactor = pop / 1e5;
      fields.forEach((field) => {
        if (typeof value[field] === 'number') {
          value[per100kKey(field)] = value[field] / p100kFactor;
        }
      });

      byFips[Number(fips)] = value;
    });

    return features.map((f) => {
      const fips = fipsRemapping[f.id] || f.id;
      const data = byFips[fips];
      return {
        id: f.id,
        feature: f,
        ...data,
      };
    });
  }

  // https://gka.github.io/palettes/#/7|s|49006a,9b59b6,ffd09f|ffffe0,ff005e,93003a|1|1
  const mapColors = [
    '#49006a',
    '#672682',
    '#874694',
    '#a666a0',
    '#c588a6',
    '#e3aba6',
    '#ffd09f',
  ].reverse();
  const mapNoDataColor = '#999';

  let isFirstMapRender = true;
  function renderMap(data, options) {
    const {field, isCounties, stateFips} = options;
    const {groups} = data;

    const allowDrilldown = !isCounties;

    const $map = d3select('#svg-map');
    const {width, height} = $map.node().getBoundingClientRect();
    const mapWidth = width;
    const mapHeight = height;

    const projection = d3geoAlbersUsa()
      .translate([mapWidth / 2, mapHeight / 2])
      .scale(mapWidth);
    const path = d3geoPath().projection(projection);

    const fieldTitle = mapDataPointLabels[field];
    const timeTitle = timeLabels[filters.time];
    d3select('#map-title').text(`Map of ${fieldTitle}, ${timeTitle}`);

    const $g = $map.select('#map-g').attr('width', mapWidth).attr('height', mapHeight);

    let countyFeaturesFiltered = [];
    if (isCounties) {
      const _stateFips = String(Number(stateFips));
      countyFeaturesFiltered = countyFeatures.filter((f) => {
        const fips = String(f.id);
        return _stateFips === fips.substring(0, fips.length === 4 ? 1 : 2);
      });
    }

    let stateFeaturesFiltered = isCounties
      ? stateFeatures.filter((f) => f.id === Number(stateFips))
      : stateFeatures;

    const hasMapData = Boolean(stateFeaturesFiltered.length);
    d3select('#map-no-data').classed('shown', !hasMapData);
    d3select('#viz-map-header').style('opacity', hasMapData ? 1 : 0);

    const joinedData = aggMapData(
      groups,
      isCounties ? countyFeaturesFiltered : stateFeaturesFiltered,
    );

    const domain = [];
    joinedData.forEach((d) => {
      const value = d[field];
      if (typeof value === 'number' && value > 0) {
        domain.push(value);
      }
    });
    if (domain.length === 0) {
      domain.push(1);
    }
    const min = d3min(domain);
    const colorScale = scaleCluster().domain(domain).range(mapColors);
    const clusters = colorScale.clusters();
    renderMapLegend(clusters, min);

    function fillColor(d) {
      const datum = d[field];
      return datum != undefined && datum !== 0 ? colorScale(datum) : mapNoDataColor;
    }

    const $states = $g
      .select('#map-states')
      .selectAll('.map-state')
      .data(isCounties ? stateFeaturesFiltered : joinedData, (d) => d.id)
      .join(
        (enter) => enter.append('path').attr('opacity', 0).attr('class', 'map-state map-feat'),
        (update) => update,
        (exit) => {
          exit.transition().duration(350).attr('opacity', 0).remove();
        },
      );

    $states
      .attr('d', (d) => path(d.feature))
      .transition()
      .duration(isFirstMapRender ? 0 : 350)
      .attr('opacity', 1)
      .attr('fill', isCounties ? mapNoDataColor : fillColor);

    const $counties = $g
      .select('#map-counties')
      .selectAll('.map-county')
      .data(isCounties ? joinedData : [], (d) => d.id)
      .join(
        (enter) =>
          enter
            .append('path')
            .attr('opacity', 0)
            .attr('class', (d) => `map-county map-county-${d.id} map-feat`),
        (update) => update,
        (exit) => {
          exit.transition().duration(350).attr('opacity', 0).remove();
        },
      )
      .attr('d', (d) => path(d.feature))
      .attr('fill', fillColor);

    $counties
      .transition()
      .duration(isFirstMapRender ? 0 : 350)
      .attr('opacity', 1);

    $g.select('#map-state-borders')
      .datum(stateBorders)
      .attr('d', path)
      .attr('opacity', isCounties ? 0 : 1);

    const $features = isCounties ? $counties : $states;

    function onMouseEnter(d) {
      const evt = d3event;
      if (d.label) {
        showMapTooltip({value: d, field, evt, allowDrilldown: allowDrilldown && !isTestingData});
      }
    }

    const $backdrop = d3select('#map-backdrop');
    $backdrop.attr('width', width).attr('height', height);
    $backdrop.on('click', () => {
      if (isCounties) {
        setStateFilter('all');
      }
    });

    if (isTouchDevice) {
      $features
        .on('click', (d) => {
          // Dont let this bubble up to document click
          d3event.stopPropagation();
          onMouseEnter(d);
        })
        .on('mouseleave', () => {
          hideTooltipSoon();
        });
    } else {
      $features
        .on('click', (d) => {
          if (allowDrilldown) {
            setStateFilter(d.label);
          } else {
            setStateFilter('all');
          }
        })
        .on('mouseenter', onMouseEnter)
        .on('mouseleave', () => {
          hideTooltipSoon();
        });
    }

    // Zoom to the correct location (anaimated on subsequent renders)
    const $gSel = isFirstMapRender ? $g : $g.transition().duration(750);
    if (isCounties && stateFeaturesFiltered.length) {
      const bounds = isCounties ? path.bounds(stateFeaturesFiltered[0]) : null;
      const xWidth = bounds[1][0] - bounds[0][0];
      const yHeight = bounds[1][1] - bounds[0][1];
      const xCenter = (bounds[0][0] + bounds[1][0]) / 2;
      const yCenter = (bounds[0][1] + bounds[1][1]) / 2;
      const scale = 0.9 / Math.max(xWidth / mapWidth, yHeight / mapHeight);
      const translate = [mapWidth / 2 - scale * xCenter, mapHeight / 2 - scale * yCenter];
      $gSel.attr('transform', 'translate(' + translate + ')scale(' + scale + ')');
    } else {
      $gSel.attr('transform', 'translate(0)scale(1)');
    }

    isFirstMapRender = false;
  }

  function renderMapLegend(clusters, min) {
    const $legend = d3select('#map-legend');
    $legend
      .selectAll('.map-legend-item')
      .data([0, min].concat(clusters))
      .join(
        (enter) => {
          const $item = enter.append('div').attr('class', 'map-legend-item');
          $item.append('div').classed('map-legend-item-label', true);
          return $item;
        },
        (update) => update,
        (exit) => exit.remove(),
      )
      .each(function (d, i) {
        $(this).css('background-color', i === 0 ? mapNoDataColor : mapColors[i - 1]);
      })
      .select('.map-legend-item-label')
      .text((d) => formatMapLegendTick(d));
  }

  function renderOverview(data, options) {
    const $overview = d3select('#svg-overview');
    const {width, height} = $overview.node().getBoundingClientRect();

    const $cell = $overview.select('g.cell');
    $cell.selectAll('*').remove();

    const useLarge = window.innerWidth >= 1024;
    const yAxisWidth = useLarge ? 40 : 30;
    const xAxisHeight = useLarge ? 20 : 14;
    const marginRight = 16;
    const cellLabelX = 6;
    const cellLabelY = 0;
    const chartWidth = width - yAxisWidth - marginRight;
    const chartHeight = height - xAxisHeight;

    $cell.attr('transform', `translate(${yAxisWidth}, 0)`);

    renderCharts($overview, data, {
      ...options,
      allowDrilldown: false,
      chartWidth,
      chartHeight,
      cellLabelX,
      cellLabelY,
      barPad: 3,
    });
  }

  function renderGrid(data, options) {
    const {field, daysToShow} = options;

    const $svg = d3select('#grid');
    // Make sure  we're starting fresh
    $svg.selectAll('*').remove();
    $svg.attr('class', filters.consistentY ? 'consistent-y' : '');

    const groups = data.groups.slice(0);

    const useLarge = window.innerWidth >= 1024;
    const chartAspectRatio = 2.15;
    const chartXPadding = useLarge ? 30 : 25;
    const chartYPadding = useLarge ? 40 : 35;
    const estChartWidth = useLarge ? 250 : 150;
    const numCols = Math.floor(window.innerWidth / (estChartWidth + chartXPadding));
    const chartWidth = Math.floor((window.innerWidth - chartXPadding * (numCols + 1)) / numCols);

    const cellLabelX = -20;
    const cellLabelY = -10;
    const numStates = groups.length;
    const chartHeight = Math.floor(chartWidth / chartAspectRatio);
    const yAxisWidth = useLarge ? 40 : 30;
    const xAxisHeight = useLarge ? 20 : 14;
    const winWidth = window.innerWidth;
    const barPad = daysToShow > 10 ? 1 : 2;

    const colWidth = chartWidth + chartXPadding;
    const rowHeight = chartHeight + xAxisHeight + chartYPadding;

    const numRows = Math.ceil(numStates / numCols);

    const totalHeight = numRows * rowHeight;

    const allowDrilldown = !options.isCounties;

    groups.forEach((g) => {
      if (field.indexOf('new') === 0) {
        // For daily new cases / deaths, sort by the sum of the data currently being shown
        g.sortVal = d3sum(g.values, (v) => v[field]);
      } else {
        // Otherwise sort by the last shown cumulative value
        const lastVal = findLast(g.values, (v) => v[field] != undefined);
        g.sortVal = lastVal ? lastVal[field] : -1;
      }
    });
    groups.sort((a, b) => b.sortVal - a.sortVal);

    // Create grid of rows and columns
    const $rows = $svg
      .attr('viewBox', [0, 0, winWidth, totalHeight])
      .selectAll('g.row')
      .data(d3range(numRows))
      .enter()
      .append('g')
      .attr('class', 'row')
      .attr('transform', (row) => `translate(${yAxisWidth}, ${row * rowHeight})`);

    // Add cells
    $rows.each(function (row) {
      const lastItemNumber = (row + 1) * numCols;
      const numColsForRow = lastItemNumber > groups.length ? groups.length % numCols : numCols;
      const range = d3range(numColsForRow).map((i) => ({row, col: i}));
      d3select(this)
        .selectAll('g.cell')
        .data(range)
        .enter()
        .append('g')
        .attr('class', 'cell')
        .classed('cell-clickable', allowDrilldown && !isTestingData)
        .attr('transform', (d) => `translate(${d.col * colWidth}, 0)`);
    });

    renderCharts(
      $svg,
      {
        ...data,
        groups,
      },
      {
        ...options,
        allowDrilldown,
        chartWidth,
        chartHeight,
        cellLabelX,
        cellLabelY,
        barPad,
      },
    );
  }

  function renderCharts($svg, data, options) {
    const {
      field,
      daysToShow,
      datesToShow,
      allowDrilldown,
      chartWidth,
      chartHeight,
      cellLabelX,
      cellLabelY,
      barPad,
    } = options;
    const {groups, extents} = data;

    const yScaleType = filters.useLog ? d3scaleLog : d3scaleLinear;

    const xScale = d3scaleBand()
      .domain(d3range(datesToShow.length))
      [daysToShow >= 90 ? 'range' : 'rangeRound']([0, chartWidth])
      .paddingInner(Math.floor((100 * (barPad * daysToShow)) / chartWidth) / 100)
      .paddingOuter(0);
    const barWidth = xScale.bandwidth();

    const barXMidpoints = datesToShow.map((d, i) => {
      return xScale(i) + barWidth / 2;
    });

    function makeYScale(extent) {
      const domain = [0, Math.max(extent[1], filters.per100k ? 0.1 : 10)];
      if (filters.useLog) {
        const extentMin = Math.max(extent[0], 0) || (filters.per100k ? 0.01 : 1);
        // Make sure domain start is small enough such that even really small numbers show a bar
        domain[0] = 1;
        while (domain[0] >= extentMin) {
          domain[0] /= 10;
        }
      }
      return yScaleType().domain(domain).range([chartHeight, 0]).nice();
    }

    function makeAxis(scale) {
      const domainMax = scale.domain()[1];
      let numTicks = 4;
      if (filters.useLog) {
        if (filters.per100k) {
          // numTicks > 2 here can create 10+ ticks
          numTicks = 3;
        } else {
          numTicks = domainMax < 100 ? 1 : domainMax < 1000 ? 2 : domainMax < 10000 ? 3 : 4;
        }
      }
      // Make sure there arent too many ticks (happens particularly often with log scale + per100k)
      while (scale.ticks(numTicks).length > 5) {
        numTicks--;
      }
      return d3axisLeft(scale)
        .ticks(numTicks)
        .tickSizeInner(-chartWidth)
        .tickSizeOuter(0)
        .tickFormat((d) => {
          return formatYTick(d);
        });
    }
    const yScale = makeYScale(extents[field]);
    const yAxis = makeAxis(yScale);

    const $cells = $svg.selectAll('g.cell');

    // Fill each cell with a chart
    let counter = 0;
    $cells.each(function (d, index) {
      const $cell = d3select(this);
      const data = groups[index];
      if (!data) {
        return;
      }
      counter++;
      const values = data.values;

      // Add baseline
      $cell
        .append('line')
        .attr('class', 'baseline')
        .attr('y1', chartHeight)
        .attr('y2', chartHeight)
        .attr('x2', chartWidth);

      // Add axis
      let cellYScale = yScale;
      let cellYAxis = yAxis;
      if (!filters.consistentY) {
        let extent = d3extent(values, (d) => d[field]);
        // Account for moving average values in extent
        if (fieldHasMovingAverage[field]) {
          const maField = maKey(field);
          const maExtent = d3extent(values, (d) => d[maField]);
          extent = d3extent(extent.concat(maExtent));
        }
        cellYScale = makeYScale(extent);
        cellYAxis = makeAxis(cellYScale);
      }

      $cell.append('g').attr('transform', 'translate(0,0)').call(cellYAxis);

      let stackFields;
      if (isTestingData) {
        stackFields =
          filters.field === 'newTests' ? ['newPositive', 'newNegative'] : ['positive', 'negative'];
        if (filters.per100k) {
          stackFields = stackFields.map(per100kKey);
        }
      } else {
        stackFields = [field];
      }

      const stack = d3stack().keys(stackFields)(values);
      const $layers = $cell
        .selectAll('g.layer')
        .data(stack, (d) => d.key)
        .enter()
        .append('g')
        .attr('class', (d, i) => {
          return `layer layer-${i + 1} layer-${d.key}`;
        });

      $layers
        .selectAll('.bar')
        .data(
          (l) => l,
          (d) => String(d.data.date.getTime()),
        )
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', barWidth)
        .attr('x', (d, i) => xScale(i))
        .attr('y', (d) => {
          const y = cellYScale(d[1]);
          return Number.isNaN(y) ? chartHeight : y;
        })
        .attr('height', (d) => {
          const y = Math.max(chartHeight - cellYScale(d[1] - d[0]), 0);
          return Number.isNaN(y) ? 0 : y;
        });

      if (fieldHasMovingAverage[field]) {
        const xOffset = barWidth / 2;
        const line = d3line()
          .x((d, i) => Math.round(xScale(i) + xOffset))
          .y((d) => {
            const y = Math.min(Math.floor(cellYScale(d[maKey(field)])), chartHeight);
            return Number.isNaN(y) ? chartHeight : y;
          })
          .curve(d3curveMonotoneX);

        $cell.append('path').attr('class', 'ma-line').datum(values).attr('d', line);
      } else {
        $cell.selectAll('.ma-line').remove();
      }

      const $crosshair = $cell
        .append('line')
        .attr('y1', 0)
        .attr('y2', chartHeight)
        .attr('class', 'crosshair crosshair-hidden');

      function onMouseMove() {
        const evt = d3event;
        const mouse = d3mouse(this);
        const xPos = mouse[0];
        const bisectIndex = d3bisectLeft(barXMidpoints, xPos);
        const left = barXMidpoints[bisectIndex - 1];
        const right = barXMidpoints[bisectIndex];
        const index =
          left == undefined || Math.abs(xPos - right) < Math.abs(xPos - left)
            ? bisectIndex
            : bisectIndex - 1;
        const date = datesToShow[index];
        const value = values.find((v) => v.date.getTime() === date.getTime());
        if (value && (value !== tooltipValue || !tooltipShown)) {
          const chPos = Math.round(xScale(index) + barWidth / 2);
          $crosshair.attr('x1', chPos).attr('x2', chPos).classed('crosshair-hidden', false);
          showChartTooltip({value, field, evt, allowDrilldown: allowDrilldown && !isTestingData});
        }
      }

      function onClick() {
        if (allowDrilldown) {
          setStateFilter(data.key);
          scrollUpTo('#viz');
        }
      }

      const $hover = $cell
        .append('rect')
        .attr('class', 'pointer')
        .attr('width', chartWidth)
        .attr('height', chartHeight);

      // Touch device events are slightly different
      if (isTouchDevice) {
        $hover.on('click', () => {
          // Dont let this bubble up to document click
          d3event.stopPropagation();
          onMouseMove.call(this);
        });
      } else {
        $hover.on('mousemove', onMouseMove).on('click', onClick);
      }
      $cell.on('mouseleave', () => {
        $crosshair.classed('crosshair-hidden', true);
        hideTooltipSoon();
      });

      // Add label above other elements to make it clickable
      $cell
        .append('text')
        .text(groups.length > 1 ? `${counter}. ${data.key}` : data.key)
        .attr('x', cellLabelX)
        .attr('y', cellLabelY)
        .attr('class', 'cell-label')
        .on('click', onClick);

      if (filters.per100k && data.noPopulation) {
        $cell
          .append('text')
          .text('No population data')
          .attr('x', chartWidth / 2)
          .attr('y', chartHeight / 2)
          .attr('class', 'cell-label-nopop');
      }
    });

    // Add start dates
    const endDate = last(groups[0].values).date;
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - daysToShow + 1);

    $cells
      .append('text')
      .attr('class', 'x-tick x-tick-start')
      .attr('text-anchor', 'start')
      .attr('x', 0)
      .attr('y', chartHeight + 4)
      .text(formatXDate(startDate));

    $cells
      .append('text')
      .attr('class', 'x-tick x-tick-end')
      .attr('text-anchor', 'end')
      .attr('x', chartWidth)
      .attr('y', chartHeight + 4)
      .text(formatXDate(endDate));
  }

  function showMapTooltip(options) {
    const {value} = options;
    showTooltip({
      ...options,
      title: value.label,
      subtitle: timeLabels[filters.time],
      fieldLabels: mapDataPointLabels,
    });
  }

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  function dateDiffInDays(b, a) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  function showChartTooltip(options) {
    const {value} = options;
    showTooltip({
      ...options,
      title: formatTooltipDate(value.date),
      fieldLabels: dataPointLabels,
    });
  }

  function showTooltip(options) {
    clearTimeout(tooltipHideTimer);
    const {value, field, evt, allowDrilldown, title, subtitle, fieldLabels} = options;
    tooltipValue = value;
    tooltipShown = true;
    const pageX = evt.pageX;
    const pageY = evt.pageY;
    const clientY = evt.clientY;
    const pad = 10;
    const css = {left: '', right: '', top: '', bottom: '', transform: ''};
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const bodyHeight = document.body.getBoundingClientRect().height;

    const fitsLeft = pageX - 250 > 0;
    const fitsRight = pageX + 250 < winWidth;
    const fitsTop = clientY - 250 > 0;
    const fitsBottom = clientY - 250 < winHeight;

    if (fitsTop) {
      css.bottom = `${bodyHeight - pageY + pad}px`;
    } else {
      css.top = `${pageY + pad}px`;
    }

    if (fitsRight) {
      css.left = `${pageX + pad}px`;
    } else if (fitsLeft) {
      css.right = `${winWidth - pageX + pad}px`;
    } else if (fitsTop || !fitsBottom) {
      css.left = pageX;
      css.transform = 'translateX(-50%)';
      css.bottom = `${bodyHeight - pageY + pad}px`;
    } else if (fitsBottom) {
      css.left = pageX;
      css.transform = 'translateX(-50%)';
      css.top = `${pageY + pad}px`;
    }

    const hasPercents = isTestingData;
    const columnClass = hasPercents ? 'col-3' : 'col-2';

    let dataPoints;
    if (filters.field === 'tests') {
      dataPoints = [
        {key: 'positive', color: 'primary1', pct: value.positivePct},
        {key: 'negative', color: 'primary2', pct: value.negativePct},
        {key: 'pending', pct: value.pendingPct},
        {key: 'tests'},
        {key: 'cases'},
        {key: 'deaths'},
      ];
    } else if (filters.field === 'newTests') {
      dataPoints = [
        {key: 'newPositive', color: 'primary1', pct: value.newPositivePct},
        {key: 'newNegative', color: 'primary2', pct: value.newNegativePct},
        {key: 'newTests'},
        {key: 'newCases'},
        {key: 'newDeaths'},
      ];
    } else {
      dataPoints = ['cases', 'deaths', 'newCases', 'newDeaths'].map((k) => ({
        key: k,
        color: k === field ? 'primary1' : null,
      }));
    }
    if (filters.per100k) {
      dataPoints = dataPoints.map((dp) => ({
        ...dp,
        key: per100kKey(dp.key),
        suffix: ' per 100k',
        formatter: formatPer100kValue,
      }));
      if (value.pop != undefined) {
        dataPoints.push({
          key: 'pop',
        });
      }
    }
    const dataPointEl = dataPoints.map((dp) => {
      const format = dp.formatter || formatTooltipValue;
      const dpValue = value[dp.key];
      if (dpValue == undefined) {
        return '';
      }
      return `
        	<div class="tooltip-dp-label ${dp.color || ''}">${fieldLabels[dp.key]}</div>
        	<div class="tooltip-dp-val">${format(dpValue)}${dp.suffix || ''}</div>
          ${
            hasPercents
              ? `
            <div class="tooltip-dp-pct">
              ${formatTooltipPct(dp.pct)}
            </div>
          `
              : ''
          }
        	`;
    });

    const drilldownMsg = allowDrilldown
      ? '<div class="tooltip-drill"><span class="click">Click</span><span class="tap">Tap</span><span> to see counties</span></div>'
      : '';

    $('#tooltip')
      .addClass('shown')
      .toggleClass('clickable', allowDrilldown)
      .css(css)
      .html(
        `<div><h4>${title}</h4>
        ${subtitle ? `<h5>${subtitle}</h5>` : ''}
              <div class="tooltip-grid ${columnClass}">
                ${dataPointEl.join('')}
              </div>
              ${drilldownMsg}</div>`,
      );
  }

  // Sometimes we want to delay hiding to allow user to click into tooltip before it hides (i.e. on mobile)
  function hideTooltipSoon() {
    // Long delay needed for iOS safari, otherwise tooltip hides
    tooltipHideTimer = setTimeout(hideTooltip, isTouchDevice ? 500 : 50);
  }
  function hideTooltip() {
    $('#tooltip').removeClass('shown');
    tooltipShown = false;
  }

  function formatXDate(d) {
    return d.toLocaleString('default', {month: 'short', day: 'numeric'});
  }

  function formatTooltipDate(d) {
    return d.toLocaleString('default', {year: 'numeric', month: 'long', day: 'numeric'});
  }

  function formatYTick(n) {
    const str = formatNumNice(n);
    return str.replace(/^0\./, '.');
  }

  function formatNumNice(n, precision) {
    let abbrev;
    if (n >= 1e6) {
      n = n / 1e6;
      abbrev = 'm';
    } else if (n >= 1e3) {
      n = n / 1e3;
      abbrev = 'k';
    }
    if (precision !== undefined) {
      // Need to parseFloat again to avoid scientific notation
      n = parseFloat(n.toPrecision(precision));
    }
    return abbrev ? `${n}${abbrev}` : String(n);
  }

  const tooltipFmtPer100k = d3format(',.1f');
  const tooltipFmtPer100kSmall = d3format(',.2f');
  function formatPer100kValue(n) {
    return n >= 1 ? tooltipFmtPer100k(n) : tooltipFmtPer100kSmall(n);
  }

  const tooltipFmt = d3format(',d');
  function formatTooltipValue(n) {
    return tooltipFmt(n);
  }

  function formatMapLegendTick(n) {
    return formatNumNice(n, 2);
  }

  const pctFmt = d3format('.1%');
  function formatTooltipPct(n) {
    return n != undefined ? `(${pctFmt(n)})` : '';
  }

  function setStateFilter(state) {
    router.push({[filterKeys.state]: state});
  }

  function scrollUpTo(selector) {
    const el = document.querySelector(selector);
    if (!el || !el.scrollIntoView) {
      window.scrollTo(0, 0);
    }
    // Only scroll _up_ to target
    if (el.getBoundingClientRect().top >= 0) {
      return;
    }
    el.scrollIntoView({behavior: 'smooth', block: 'start'});
  }

  function attachEvents() {
    $('#state-select').change(function () {
      const val = $(this).val();
      setStateFilter(val);
    });
    $('.back-to-states').click(function () {
      setStateFilter('all');
      scrollUpTo('#viz-map');
    });
    $('#field-select').change(function () {
      router.push({
        [filterKeys.field]: $(this).val(),
      });
    });
    $('#time-select').change(function () {
      router.push({[filterKeys.time]: $(this).val()});
    });
    $('#tooltip').click(function (evt) {
      // Dont let this bubble up to the document.click hide event
      evt.stopPropagation();
      if ($(this).is('.clickable') && tooltipValue) {
        setStateFilter(tooltipValue.state || tooltipValue.label);
        // Scroll to top if this was a chart (not map) click
        if (!tooltipValue.label) {
          scrollUpTo('#viz');
        }
      }
    });
    $('#cb-use-log-scale').change(function () {
      const value = $(this).is(':checked');
      router.push({[filterKeys.useLog]: value ? '1' : '0'});
    });
    $('#cb-per-100k').change(function () {
      const value = $(this).is(':checked');
      router.push({[filterKeys.per100k]: value ? '1' : '0'});
    });
    $('#cb-consistent-y').change(function () {
      const value = $(this).is(':checked');
      router.push({[filterKeys.consistentY]: value ? '1' : '0'});
    });
    $(document).on('click', function () {
      hideTooltipSoon();
    });
  }

  let loadingCount = 0;
  function startLoading() {
    loadingCount++;
    $('.wrapper').addClass('loading');
  }
  function completeLoading() {
    loadingCount--;
    if (loadingCount <= 0) {
      $('.wrapper').removeClass('loading');
      // Just in case this somehow gets below 0
      loadingCount = 0;
    }
  }

  function renderAllStates() {
    render({groups: stateData, overview: usData});
    $('.back-to-states').removeClass('shown');
    hideTooltip();
  }

  function renderCounties(state) {
    const countiesForState = countyData[state];

    const overviewData = stateData.filter((s) => s.key === state);
    const stateFips = overviewData ? overviewData[0].values[0].fips : null;

    render({
      groups: countiesForState.counties,
      overview: overviewData,
      isCounties: true,
      stateFips,
    });

    $('.back-to-states').addClass('shown');
    hideTooltip();
  }

  const resizeWindow = throttle(() => {
    if (lastData) {
      render(lastData);
    }
  }, 100);
  window.addEventListener('resize', resizeWindow);

  function fetchMapData() {
    if (!fetchMapData.promise) {
      fetchMapData.promise = d3json('assets/us-counties.topojson').then((us) => {
        stateFeatures = topojson.feature(us, us.objects.states).features;
        stateBorders = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
        countyFeatures = topojson.feature(us, us.objects.counties).features;
      });
    }
    return fetchMapData.promise;
  }

  function populateStateSelect(stateData) {
    if (populateStateSelect.populated) {
      return;
    }
    populateStateSelect.populated = true;

    const stateOptions = stateData
      .slice(0)
      .sort((a, b) => a.key.localeCompare(b.key))
      .map((s) => `<option value="${s.key}">${s.key}</option>`)
      .join('');
    $('#state-select').html(`<option value="all" selected>All States</option>${stateOptions}`);
    if (filters.state !== 'all') {
      $('#state-select').val(filters.state);
    }
  }

  const fetchStatePopulationsMemo = memoizeOne(() => {
    return new Promise((resolve, reject) => {
      d3csv('assets/fips-pop-sta.csv')
        .then((popCsv) => {
          const popMap = processPopulations(popCsv);
          resolve(popMap);
        })
        .catch(reject);
    });
  });

  const fetchCountyPopulationsMemo = memoizeOne(() => {
    return new Promise((resolve, reject) => {
      d3csv('assets/fips-pop-cty.csv')
        .then((popCsv) => {
          const popMap = processPopulations(popCsv);
          resolve(popMap);
        })
        .catch(reject);
    });
  });

  const fetchStateDataMemo = memoizeOne((timeFilter) => {
    return new Promise((resolve, reject) => {
      const file = timeFilter === 'all' ? 'all' : '90d';
      Promise.all([
        d3csv(
          `https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/state/${file}.csv`,
        ),
        fetchStatePopulationsMemo(),
      ])
        .then(([csv, statePop]) => {
          processStates(csv, statePop);
          populateStateSelect(stateData);
          resolve();
        })
        .catch(reject);
    });
  });

  const fetchCountyDataMemo = memoizeOne((state, timeFilter) => {
    return new Promise((resolve, reject) => {
      // Need to fetch state data first to make sure state => fips mapping is ready
      fetchStateData()
        .then(() => {
          const timeDir = timeFilter === 'all' ? 'all' : '90d';
          const fips = stateToFipsMap[state];
          if (!fips) {
            reject(new Error(`Could not find fips for state ${state}`));
            return;
          }

          Promise.all([
            d3csv(
              `https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/county/${timeDir}/${fips}.csv`,
            ),
            fetchCountyPopulationsMemo(),
          ])
            .then(([csv, countyPop]) => {
              processCounties(csv, countyPop);
              resolve();
            })
            .catch(reject);
        })
        .catch(reject);
    });
  });

  function fetchStateData() {
    return fetchStateDataMemo(filters.time);
  }

  function fetchCountyData(state) {
    return fetchCountyDataMemo(state, filters.time);
  }

  function fetchAndRenderStates() {
    startLoading();
    fetchStateData()
      .then(() => {
        renderAllStates();
        completeLoading();
      })
      .catch((error) => {
        console.error(error);
        completeLoading();
      });
  }

  function fetchAndRenderCounties(state) {
    startLoading();
    fetchCountyData(state)
      .then(() => {
        renderCounties(state);
        completeLoading();
      })
      .catch((error) => {
        console.error(error);
        completeLoading();
      });
  }

  if (filters.state === 'all') {
    fetchAndRenderStates();
  } else {
    fetchAndRenderCounties(filters.state);
  }

  attachEvents();
})();
