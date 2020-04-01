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
  };
  Object.keys(dataPointLabels).forEach((k) => {
    dataPointLabels[per100kKey(k)] = dataPointLabels[k];
  });

  // On the map, "daily new" fields are averages
  const mapDataPointLabels = {...dataPointLabels};
  Object.keys(mapDataPointLabels).forEach((key) => {
    if (key.startsWith('new')) {
      mapDataPointLabels[key] = `Avg ${mapDataPointLabels[key]}`;
    }
  });

  const timeLabels = {
    '7d': 'Last 7 days',
    '14d': 'Last 14 days',
    '1mo': 'Last 30 days',
    all: 'All-time',
  };

  // https://github.com/nytimes/covid-19-data#geographic-exceptions
  const countyLabelToFips = {
    'New York City': '36061',
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
  class Router {
    constructor(history) {
      this.history = history;
      history.listen(() => {
        // Update filter state variables and re-render
        window.scrollTo(0, 0);
        this.parse();
        if (filters.state === 'all') {
          renderAllStates();
        } else {
          renderCounties(filters.state);
        }
      });
    }

    parse() {
      const qs = parseQs(this.history.location.search);
      const keys = Object.keys(qs);

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const v = qs[k];
        switch (k) {
          case filterKeys.state: {
            filters.state = v;
            $('#state-select').val(v);
            break;
          }
          case filterKeys.field: {
            if (dataPointLabels[v]) {
              filters.field = v;
              $('#field-select').val(v);

              isTestingData = filters.field === 'tests' || filters.field === 'newTests';
              filters.useLog = false;
              $('#cb-use-log-scale').prop('checked', false);
              qs.useLog = '0';
              if (isTestingData) {
                $('.testing-legend').show();
                $('#filter-use-log-scale').hide();
              } else {
                $('.testing-legend').hide();
                $('#filter-use-log-scale').show();
              }
            }
            break;
          }
          case filterKeys.time: {
            filters.time = v;
            $('#time-select').val(v);
            break;
          }
          case filterKeys.useLog: {
            const value = String(v) === '1';
            filters.useLog = value;
            $('#cb-use-log-scale').prop('checked', value);
            break;
          }
          case filterKeys.per100k: {
            const value = String(v) === '1';
            filters.per100k = value;
            $('#cb-per-100k').prop('checked', value);
            break;
          }
          case filterKeys.consistentY: {
            const value = String(v) === '1';
            filters.consistentY = value;
            $('#cb-consistent-y', value);
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
  const router = new Router(window.History.createBrowserHistory());
  router.parse();

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

  function processStates(csv, pop, testingCsv) {
    const nestedStates = d3
      .nest()
      .key((k) => k.state)
      .entries(csv);

    const testingByFips = processTestingData(testingCsv);

    const popMap = processPopulations(pop);
    stateData = processGroups(nestedStates, popMap, testingByFips);

    const [usRawData, usRawTesting] = processUS(csv, testingByFips);
    usData = processGroups(usRawData, popMap, usRawTesting);
  }

  function processUS(csv, testingByFips) {
    const aggNytKeys = ['cases', 'deaths'];
    const aggTestKeys = [
      'positive',
      'negative',
      'pending',
      'tests',
      'newPositive',
      'newNegative',
      'newTests',
    ];

    // Nest by date (easier to aggregate)
    const nested = d3
      .nest()
      .key((k) => k.date)
      .entries(csv);

    const usValues = nested.map((n) => {
      const stateValuesAtDate = n.values;
      const usValuesAtDate = {
        fips: '00',
        date: stateValuesAtDate[0].date,
      };
      stateValuesAtDate.forEach((state) => {
        aggNytKeys.forEach((key) => {
          if (!usValuesAtDate[key]) {
            usValuesAtDate[key] = 0;
          }
          usValuesAtDate[key] += Number(state[key]);
        });
      });
      return usValuesAtDate;
    });

    // Aggregate testing data
    const testsByDate = {};
    Object.keys(testingByFips).forEach((fips) => {
      const dates = testingByFips[fips];
      Object.keys(dates).forEach((date) => {
        if (!testsByDate[date]) {
          testsByDate[date] = {};
        }
        const stateValueAtDate = dates[date];
        const usValueAtDate = testsByDate[date];
        aggTestKeys.forEach((key) => {
          if (!usValueAtDate[key]) {
            usValueAtDate[key] = 0;
          }
          usValueAtDate[key] += stateValueAtDate[key];
        });
      });
    });

    return [[{key: 'United States', values: usValues}], {'00': testsByDate}];
  }

  function processTestingData(csv) {
    const byFips = {};
    csv.forEach((c) => {
      if (!c.date) {
        return;
      }
      const year = String(c.date).substring(0, 4);
      const month = String(c.date).substring(4, 6);
      const date = String(c.date).substring(6, 8);
      const fips = c.fips;

      const value = {
        fips,
        date: new Date(Number(year), Number(month) - 1, Number(date)),
        positive: Number(c.positive),
        negative: Number(c.negative),
        pending: Number(c.pending),
        tests: Number(c.total),
        newPositive: Number(c.positiveIncrease),
        newNegative: Number(c.negativeIncrease),
        newTests: Number(c.totalTestResultsIncrease),
      };

      // Add to our map
      if (!byFips[fips]) {
        byFips[fips] = {};
      }
      const forFips = byFips[fips];
      if (forFips[value.date.getTime()]) {
        console.error(`Multiple rows for for same state fips/date`, c);
      }
      forFips[value.date.getTime()] = value;
    });

    return byFips;
  }

  function processCounties(csv, pop) {
    // First nest counties by state
    const nestedStates = d3
      .nest()
      .key((k) => k.state)
      .entries(csv);

    const stateMap = {};
    const popMap = processPopulations(pop);

    nestedStates.forEach((state) => {
      const counties = d3
        .nest()
        .key((k) => k.county)
        .entries(state.values);
      const byCounty = processGroups(counties, popMap);
      stateMap[state.key] = {key: state.key, counties: byCounty};
    });

    countyData = stateMap;
  }

  function processPopulations(pop) {
    const map = {};
    pop.forEach((p) => {
      // Normally there would be one population value per fips code,
      // however there are geographic exceptions in our source file
      // where counties are attributed to others. Use our fipsRemapping
      // lookup to sum the populations where necessary.
      const fips = fipsRemapping[p.fips] || p.fips;
      if (map[fips] == undefined) {
        map[fips] = 0;
      }
      map[fips] += parseInt(p.pop);
    });
    return map;
  }

  function processGroups(groups, popMap, testingMap) {
    const valueKeys = getValueKeys(!!testingMap);

    groups.forEach((group) => {
      const newValues = [];
      for (let i = 0; i < group.values.length; i++) {
        const prevRow = group.values[i - 1];
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
        };
        if (prevRow) {
          parsed.newCases = parsed.cases - prevRow.cases;
          parsed.newDeaths = parsed.deaths - prevRow.deaths;
        } else {
          parsed.newCases = parsed.cases;
          parsed.newDeaths = parsed.deaths;
        }
        newValues.push(parsed);

        // Add in testing data
        const testing = ((testingMap ? testingMap[parsed.fips] : {}) || {})[parsed.date.getTime()];
        if (testing) {
          parsed.positive = testing.positive;
          parsed.positivePct = testing.positive / testing.tests;
          parsed.negative = testing.negative;
          parsed.negativePct = testing.negative / testing.tests;
          parsed.pending = testing.pending;
          parsed.pendingPct = testing.pending / testing.tests;
          parsed.tests = testing.tests;
          parsed.newPositive = testing.newPositive;
          parsed.newPositivePct = testing.newPositive / testing.newTests;
          parsed.newNegative = testing.newNegative;
          parsed.newNegativePct = testing.newNegative / testing.newTests;
          parsed.newTests = testing.newTests;
        }

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
      group.values = newValues;
    });

    return groups;
  }

  function filterData(groups, datesToShow, hasTestingData) {
    const valueKeys = getValueKeys(hasTestingData);

    const extents = {};
    const extentKeys = ['date'].concat(valueKeys).concat(valueKeys.map(per100kKey));
    extentKeys.forEach((key) => (extents[key] = [0, null]));

    const newGroups = groups.map((g) => {
      const {values} = g;
      const newValues = [];
      let valuesIndex = 0;

      // Get the dates we care about
      for (var i = 0; i < datesToShow.length; i++) {
        while (
          values[valuesIndex] &&
          values[valuesIndex].date.getTime() < datesToShow[i].getTime()
        ) {
          valuesIndex++;
        }
        if (
          values[valuesIndex] &&
          values[valuesIndex].date.getTime() === datesToShow[i].getTime()
        ) {
          newValues.push({...values[valuesIndex], i});
        }
      }

      // Update the extents object
      newValues.forEach((value) => {
        extentKeys.forEach((key) => {
          if (value[key] != undefined && value[key] < extents[key][0]) {
            extents[key][0] = value[key];
          }
          if (value[key] != undefined && value[key] > extents[key][1]) {
            extents[key][1] = value[key];
          }
        });
      });

      return {
        ...g,
        values: newValues,
      };
    });

    return {groups: newGroups, extents};
  }

  const filterGridData = memoizeOne(filterData);
  const filterOverviewData = memoizeOne(filterData);

  function per100kKey(key) {
    return `${key}_p100k`;
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
    } else {
      daysToShow = moment(lastCasesDate).diff(moment(firstCasesDate), 'days');
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

    const gridData = filterGridData(groups, datesToShow, !isCounties);
    const overviewData = filterOverviewData(overview, datesToShow, true);

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
      const {fips, pop} = values[0];

      // Just aggregate the number of new cases/etc across the selected time range
      let value = {
        fips,
        label: group.key,
        // New cases/deaths over last N days
        cases: d3.sum(values, (v) => v.newCases),
        deaths: d3.sum(values, (v) => v.newDeaths),
        // Average of new daily cases/deahts over last N days
        newCases: d3.mean(values, (v) => v.newCases),
        newDeaths: d3.mean(values, (v) => v.newDeaths),
      };

      if (hasTests) {
        value.tests = d3.sum(values, (v) => v.newTests);
        value.positive = d3.sum(values, (v) => v.newPositive);
        value.positivePct = value.positive / value.tests;
        value.negative = d3.sum(values, (v) => v.newNegative);
        value.negativePct = value.negative / value.tests;
        value.pending = d3.sum(values, (v) => v.newPending);
        value.pendingPct = value.pending / value.tests;
        value.newTests = d3.mean(values, (v) => v.newTests);
        value.newPositive = d3.mean(values, (v) => v.newPositive);
        value.newPositivePct = value.newPositive / value.newTests;
        value.newNegative = d3.mean(values, (v) => v.newNegative);
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

    const $map = d3.select('#svg-map');
    const {width, height} = $map.node().getBoundingClientRect();
    const mapWidth = width;
    const mapHeight = height;

    const projection = d3
      .geoAlbersUsa()
      .translate([mapWidth / 2, mapHeight / 2])
      .scale(mapWidth);
    const path = d3.geoPath().projection(projection);

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
    const min = d3.min(domain);
    const colorScale = d3.scaleCluster().domain(domain).range(mapColors);
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
      const evt = d3.event;
      if (d.label) {
        showMapTooltip({value: d, field, evt, allowDrilldown: allowDrilldown && !isTestingData});
      }
    }

    if (isTouchDevice) {
      $features
        .on('click', (d) => {
          // Dont let this bubble up to document click
          d3.event.stopPropagation();
          onMouseEnter(d);
        })
        .on('mouseleave', () => {
          hideTooltip();
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
          hideTooltip();
        });
    }

    // Zoom to the correct location (anaimated on subsequent renders)
    const $gSel = isFirstMapRender ? $g : $g.transition().duration(750);
    if (isCounties) {
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
    const $legend = d3.select('#map-legend');
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
    const $overview = d3.select('#svg-overview');
    const {width, height} = $overview.node().getBoundingClientRect();

    const $cell = $overview.select('g.cell');
    $cell.selectAll('*').remove();

    const useLarge = window.innerWidth >= 1024;
    const yAxisWidth = useLarge ? 40 : 30;
    const xAxisHeight = useLarge ? 20 : 14;
    const marginRight = 16;
    const chartWidth = width - yAxisWidth - marginRight;
    const chartHeight = height - xAxisHeight;

    $cell.attr('transform', `translate(${yAxisWidth}, 0)`);

    renderCharts($overview, data, {
      ...options,
      allowDrilldown: false,
      chartWidth,
      chartHeight,
      barPad: 3,
    });
  }

  function renderGrid(data, options) {
    const {field, daysToShow} = options;

    const $svg = d3.select('#grid');
    // Make sure  we're starting fresh
    $svg.selectAll('*').remove();
    $svg.attr('class', filters.consistentY ? 'consistent-y' : '');

    const groups = data.groups.slice(0);

    const useLarge = window.innerWidth >= 1024;
    const chartAspectRatio = 2.15;
    const chartPadding = useLarge ? 30 : 25;
    const estChartWidth = useLarge ? 250 : 150;
    const numCols = Math.floor(window.innerWidth / (estChartWidth + chartPadding));
    const chartWidth = Math.floor((window.innerWidth - chartPadding * (numCols + 1)) / numCols);

    const numStates = groups.length;
    const chartHeight = Math.floor(chartWidth / chartAspectRatio);
    const yAxisWidth = useLarge ? 40 : 30;
    const xAxisHeight = useLarge ? 20 : 14;
    const winWidth = window.innerWidth;
    const barPad = daysToShow > 10 ? 1 : 2;

    const colWidth = chartWidth + chartPadding;
    const rowHeight = chartHeight + xAxisHeight + chartPadding;

    const numRows = Math.ceil(numStates / numCols);

    const totalHeight = numRows * rowHeight;

    const allowDrilldown = !options.isCounties;

    groups.forEach((g) => {
      if (field.startsWith('new')) {
        // For daily new cases / deaths, sort by the sum of the data currently being shown
        g.sortVal = d3.sum(g.values, (v) => v[field]);
      } else {
        // Otherwise sort by the last shown cumulative value
        const lastVal = _.findLast(g.values, (v) => v[field] != undefined);
        g.sortVal = lastVal ? lastVal[field] : -1;
      }
    });
    groups.sort((a, b) => b.sortVal - a.sortVal);

    // Create grid of rows and columns
    const $rows = $svg
      .attr('viewBox', [0, 0, winWidth, totalHeight])
      .selectAll('g.row')
      .data(d3.range(numRows))
      .enter()
      .append('g')
      .attr('class', 'row')
      .attr('transform', (row) => `translate(${yAxisWidth}, ${row * rowHeight})`);

    // Add cells
    $rows.each(function (row) {
      const lastItemNumber = (row + 1) * numCols;
      const numColsForRow = lastItemNumber > groups.length ? groups.length % numCols : numCols;
      const range = d3.range(numColsForRow).map((i) => ({row, col: i}));
      d3.select(this)
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
      barPad,
    } = options;
    const {groups, extents} = data;

    const yScaleType = filters.useLog ? 'scaleLog' : 'scaleLinear';

    const xScale = d3
      .scaleBand()
      .domain(datesToShow)
      .rangeRound([0, chartWidth])
      .paddingInner((barPad * daysToShow) / chartWidth)
      .paddingOuter((barPad * 5) / chartWidth);
    const barWidth = xScale.bandwidth();

    const barXMidpoints = datesToShow.map((d) => {
      return xScale(d) + barWidth / 2;
    });

    function makeYScale(extent) {
      const domain = [0, Math.max(extent[1], filters.per100k ? 2 : 10)];
      if (filters.useLog && domain[0] === 0) {
        domain[0] = 1;
      }
      return d3[yScaleType]().domain(domain).range([chartHeight, 0]).nice();
    }

    function makeAxis(scale) {
      const domainMax = scale.domain()[1];
      return d3
        .axisLeft(scale)
        .ticks(
          !filters.useLog
            ? 4
            : domainMax < 100
            ? 1
            : domainMax < 1000
            ? 2
            : domainMax < 10000
            ? 3
            : 4,
        )
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
      const $cell = d3.select(this);
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
        const extent = d3.extent(values, (d) => d[field]);
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

      const stack = d3.stack().keys(stackFields)(values);
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
        .attr('x', (d) => xScale(d.data.date))
        .attr('y', (d) => {
          const y = Math.floor(cellYScale(d[1]));
          return Number.isNaN(y) ? chartHeight : y;
        })
        .attr('height', (d) => {
          const y = Math.max(Math.ceil(chartHeight - cellYScale(d[1] - d[0])), 0);
          return Number.isNaN(y) ? 0 : y;
        });

      const $crosshair = $cell
        .append('line')
        .attr('y1', 0)
        .attr('y2', chartHeight)
        .attr('class', 'crosshair crosshair-hidden');

      function onMouseMove() {
        const evt = d3.event;
        const mouse = d3.mouse(this);
        const xPos = mouse[0];
        const bisectIndex = d3.bisectLeft(barXMidpoints, xPos);
        const left = barXMidpoints[bisectIndex - 1];
        const right = barXMidpoints[bisectIndex];
        const index =
          left == undefined || Math.abs(xPos - right) < Math.abs(xPos - left)
            ? bisectIndex
            : bisectIndex - 1;
        const date = datesToShow[index];
        const value = values.find((v) => v.date.getTime() === date.getTime());
        if (value && (value !== tooltipValue || !tooltipShown)) {
          const chPos = Math.round(xScale(date) + barWidth / 2);
          $crosshair.attr('x1', chPos).attr('x2', chPos).classed('crosshair-hidden', false);
          showChartTooltip({value, field, evt, allowDrilldown: allowDrilldown && !isTestingData});
        }
      }

      function onClick() {
        if (allowDrilldown) {
          setStateFilter(data.key);
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
          d3.event.stopPropagation();
          onMouseMove.call(this);
        });
      } else {
        $hover.on('mousemove', onMouseMove).on('click', onClick);
      }
      $cell.on('mouseleave', () => {
        $crosshair.classed('crosshair-hidden', true);
        hideTooltip();
      });

      // Add label above other elements to make it clickable
      $cell
        .append('text')
        .text(groups.length > 1 ? `${counter}. ${data.key}` : data.key)
        .attr('x', 6)
        .attr('y', 14)
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

  function showChartTooltip(options) {
    const {value} = options;
    showTooltip({
      ...options,
      title: formatTooltipDate(value.date),
      fieldLabels: dataPointLabels,
    });
  }

  function showTooltip(options) {
    const {value, field, evt, allowDrilldown, title, subtitle, fieldLabels} = options;
    tooltipValue = value;
    tooltipShown = true;
    const offsetX = evt.pageX;
    const offsetY = evt.pageY;
    const pad = 10;
    const css = {left: '', right: '', top: `${offsetY + pad}px`, bottom: ''};
    const winWidth = window.innerWidth;
    // If it overflows right
    if (offsetX + 250 > winWidth) {
      css.right = `${winWidth - offsetX + pad}px`;
    } else {
      css.left = `${offsetX + pad}px`;
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
      }));
    }
    const dataPointEl = dataPoints.map((dp) => {
      return `
        	<div class="tooltip-dp-label ${dp.color || ''}">${fieldLabels[dp.key]}</div>
        	<div class="tooltip-dp-val">${formatTooltipValue(value[dp.key])}${
        filters.per100k ? ' per 100k' : ''
      }</div>
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
    return formatNumNice(n);
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
    return abbrev ? `${n}${abbrev}` : n;
  }

  const tooltipFmt = d3.format(',d');
  const tooltipFmtPer100k = d3.format(',.1f');
  function formatTooltipValue(n) {
    return filters.per100k ? tooltipFmtPer100k(n) : tooltipFmt(n);
  }

  function formatMapLegendTick(n) {
    return formatNumNice(n, 2);
  }

  const pctFmt = d3.format('.1%');
  function formatTooltipPct(n) {
    return n != undefined ? `(${pctFmt(n)})` : '';
  }

  function setStateFilter(state) {
    router.push({[filterKeys.state]: state});
  }

  function attachEvents() {
    $('#state-select').change(function () {
      const val = $(this).val();
      setStateFilter(val);
    });
    $('.back-to-states').click(function () {
      setStateFilter('all');
    });
    $('#field-select').change(function () {
      router.push({
        [filterKeys.field]: $(this).val(),
        [filterKeys.useLog]: '0',
      });
    });
    $('#time-select').change(function () {
      router.push({[filterKeys.time]: $(this).val()});
    });
    $('#tooltip').click(function () {
      if ($(this).is('.clickable') && tooltipValue) {
        setStateFilter(tooltipValue.state);
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
      hideTooltip();
    });
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

  function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
      return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
      if (newInputs[i] !== lastInputs[i]) {
        return false;
      }
    }
    return true;
  }

  function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) {
      isEqual = areInputsEqual;
    }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
      var newArgs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        newArgs[_i] = arguments[_i];
      }
      if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
        return lastResult;
      }
      lastResult = resultFn.apply(this, newArgs);
      calledOnce = true;
      lastThis = this;
      lastArgs = newArgs;
      return lastResult;
    }
    return memoized;
  }

  const resizeWindow = _.throttle(() => {
    if (lastData) {
      render(lastData);
    }
  }, 100);
  window.addEventListener('resize', resizeWindow);

  let mapDataPromise;
  function fetchMapData() {
    if (!mapDataPromise) {
      mapDataPromise = d3
        .json('https://raw.githubusercontent.com/schnerd/covid-tracker/master/us-counties.topojson')
        .then((us) => {
          stateFeatures = window.topojson.feature(us, us.objects.states).features;
          stateBorders = window.topojson.mesh(us, us.objects.states, (a, b) => a !== b);
          countyFeatures = window.topojson.feature(us, us.objects.counties).features;
        });
    }
    return mapDataPromise;
  }

  function fetchStateData() {
    return Promise.all([
      d3.csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv'),
      d3.csv('https://raw.githubusercontent.com/schnerd/covid-tracker/master/fips-pop-sta.csv'),
      d3.json('https://covidtracking.com/api/states/daily'),
    ]).then(([csv, statePop, testingData]) => {
      processStates(csv, statePop, testingData);

      // Populate state select
      const stateOptions = stateData
        .slice(0)
        .sort((a, b) => a.key.localeCompare(b.key))
        .map((s) => `<option value="${s.key}">${s.key}</option>`)
        .join('');
      $('#state-select').html(`<option value="all" selected>All States</option>${stateOptions}`);
      if (filters.state !== 'all') {
        $('#state-select').val(filters.state);
      }
    });
  }

  function fetchCountyData() {
    return Promise.all([
      d3.csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv'),
      d3.csv('https://raw.githubusercontent.com/schnerd/covid-tracker/master/fips-pop-cty.csv'),
    ]).then(([csv, countyPop]) => {
      processCounties(csv, countyPop);
    });
  }

  const fetchStateDataPromise = fetchStateData();
  if (filters.state === 'all') {
    fetchStateDataPromise.then(() => renderAllStates());
    setTimeout(fetchCountyData, 200);
  } else {
    Promise.all([fetchStateDataPromise, fetchCountyData()]).then(() =>
      renderCounties(filters.state),
    );
  }

  attachEvents();
})();
