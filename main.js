(function () {
  const isTouchDevice = 'ontouchstart' in document.documentElement;
  if (isTouchDevice) {
    $(document.body).addClass('touch');
  }

  // Data
  let stateData = null;
  let countyData = null;
  let stateDataFiltered = null;
  let countyDataFiltered = null;
  let curData = null;

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
    return processGroups(nestedStates, popMap, testingByFips);
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

    return stateMap;
  }

  function processPopulations(pop) {
    const map = {};
    pop.forEach((p) => {
      map[p.fips] = parseInt(p.pop);
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
        const parsed = {
          ...row,
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

  const filterData = memoizeOne((data, datesToShow) => {
    const {groups, isCounties} = data;
    const valueKeys = getValueKeys(!isCounties);

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

    return {...data, groups: newGroups, extents};
  });

  function per100kKey(key) {
    return `${key}_p100k`;
  }

  function last(arr) {
    return arr[arr.length - 1];
  }

  let mapRenderCount = 0;
  function render(data) {
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

    const filteredData = filterData(data, datesToShow);

    const options = {
      field,
      daysToShow,
      datesToShow,
    };

    renderDetail(filteredData, options);
    renderGrid(filteredData, options);

    // Render Map (only the last invokation)
    const _mapRenderCount = ++mapRenderCount;
    fetchMapData().then(() => {
      if (_mapRenderCount === mapRenderCount) {
        renderMap(filteredData, options);
      }
    });
  }

  function aggMapData(groups, field) {
    const byFips = {};
    let aggFn = filters.per100k ? 'mean' : 'sum';
    groups.forEach((group) => {
      const {values} = group;
      const fips = values[0].fips;
      const res = d3[aggFn](values, (v) => v[field]);
      byFips[Number(fips)] = res;
    });
    const extent = d3.extent(Object.values(byFips));
    return {byFips, extent};
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

  function renderMap(data, options) {
    const {field, daysToShow, datesToShow} = options;
    const {groups, extents, isCounties} = data;

    const $map = d3.select('#svg-map');
    const {width, height} = $map.node().getBoundingClientRect();

    const {byFips} = aggMapData(groups, field);
    const domain = Object.values(byFips).filter((v) => typeof v === 'number');

    const colorScale = d3.scaleCluster().domain(domain).range(mapColors);
    const clusters = colorScale.clusters();
    renderMapLegend(clusters);

    const projection = d3
      .geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(width);
    const path = d3.geoPath().projection(projection);

    const $g = $map.select('#map-g').attr('width', width).attr('height', height);

    const $counties = $g
      .select('#map-counties')
      .selectAll('path')
      .data(countyFeatures)
      .join((enter) => enter.append('path').attr('class', 'map-county map-feat'))
      .attr('d', path);

    const $states = $g
      .select('#map-states')
      .selectAll('path')
      .data(stateFeatures)
      .join((enter) => enter.append('path').attr('class', 'map-state map-feat'))
      .attr('d', path)
      .attr('fill', (d) => {
        const id = d.id;
        const datum = byFips[id];
        return datum != undefined ? colorScale(datum) : 'transparent';
      });

    const $borders = $g.select('#map-state-borders').datum(stateBorders).attr('d', path);
  }
  function renderMapLegend(clusters) {
    const $legend = d3.select('#map-legend');
    $legend
      .selectAll('.map-legend-item')
      .data([0].concat(clusters))
      .join(
        (enter) => {
          const $item = enter.append('div').attr('class', 'map-legend-item');
          $item.append('div').attr('class', 'map-legend-item-label');
          return $item;
        },
        (update) => update,
        (exit) => exit.remove(),
      )
      .each(function (d, i) {
        $(this).css('background-color', mapColors[i]);
      })
      .select('.map-legend-item-label')
      .text((d) => formatMapLegendTick(d));
  }

  function renderDetail(data, options) {}

  function renderGrid(data, options) {
    const {field, daysToShow, datesToShow} = options;
    const {extents, isCounties} = data;

    // Make sure we're starting fresh
    const $svg = d3.select('#grid');
    $svg.selectAll('*').remove();

    if (isCounties && isTestingData) {
      $('#viz').hide();
      $('.testing-data-unavailable').show();
      return;
    } else {
      $('#viz').show();
      $('.testing-data-unavailable').hide();
    }

    const yScaleType = filters.useLog ? 'scaleLog' : 'scaleLinear';

    const groups = data.groups.slice(0);

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

    $svg.attr('class', filters.consistentY ? 'consistent-y' : '');

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
        .classed('cell-clickable', !isCounties && !isTestingData)
        .attr('transform', (d) => `translate(${d.col * colWidth}, 0)`);
    });

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
          showTooltip(value, field, evt);
        }
      }

      function onClick() {
        if (!isCounties) {
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
          d3.selectAll('.crosshair').classed('crosshair-hidden', true);
          d3.event.stopPropagation();
          onMouseMove.call(this);
        });
      } else {
        $hover
          .on('mousemove', onMouseMove)
          .on('click', onClick)
          .on('mouseout', function () {
            $crosshair.classed('crosshair-hidden', true);
            hideTooltip();
          });
      }

      // Add label above other elements to make it clickable
      $cell
        .append('text')
        .text(`${counter}. ${data.key}`)
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

  function showTooltip(value, field, evt) {
    tooltipValue = value;
    tooltipShown = true;
    const offsetX = evt.layerX || evt.offsetX;
    const offsetY = evt.layerY || evt.offsetY;
    const pad = 10;
    const css = {left: '', right: '', top: `${offsetY + pad}px`, bottom: ''};
    const winWidth = window.innerWidth;
    // If it overflows right
    if (offsetX + 150 > winWidth) {
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
        	<div class="tooltip-dp-label ${dp.color || ''}">${dataPointLabels[dp.key]}</div>
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

    const drilldownMsg =
      !value.county && !isTestingData
        ? '<div class="tooltip-drill"><span class="click">Click</span><span class="tap">Tap</span><span> to see counties</span></div>'
        : '';

    $('#tooltip')
      .addClass('shown')
      .css(css)
      .html(
        `<div><h4>${formatTooltipDate(value.date)}</h4>
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

  const mapLegendFormatPer100k = d3.format(',.1f');
  function formatMapLegendTick(n) {
    if (filters.per100k) {
      return mapLegendFormatPer100k(n);
    }
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
      if (tooltipValue && !tooltipValue.county) {
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
    curData = {groups: stateData};
    render(curData);
    $('.back-to-states').removeClass('shown');
    $('.sub-geo-name').hide();
    hideTooltip();
  }
  function renderCounties(state) {
    const stateData = countyData[state];
    curData = {groups: stateData.counties, isCounties: true};
    render(curData);
    $('.back-to-states').addClass('shown');
    $('.sub-geo-name').text(state).show();
    hideTooltip();
  }

  const resizeWindow = _.throttle(() => {
    if (curData) {
      render(curData);
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
      stateData = processStates(csv, statePop, testingData);

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
      countyData = processCounties(csv, countyPop);
    });
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

  if (filters.state === 'all') {
    fetchStateData().then(() => renderAllStates());
    setTimeout(fetchCountyData, 200);
  } else {
    fetchCountyData().then(() => renderCounties(filters.state));
    setTimeout(fetchStateData, 200);
  }

  attachEvents();
})();
