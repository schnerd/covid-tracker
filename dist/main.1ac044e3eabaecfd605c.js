!function(c){function t(t){for(var e,n,a=t[0],r=t[1],i=t[2],o=0,s=[];o<a.length;o++)n=a[o],Object.prototype.hasOwnProperty.call(u,n)&&u[n]&&s.push(u[n][0]),u[n]=0;for(e in r)Object.prototype.hasOwnProperty.call(r,e)&&(c[e]=r[e]);for(p&&p(t);s.length;)s.shift()();return f.push.apply(f,i||[]),l()}function l(){for(var t,e=0;e<f.length;e++){for(var n=f[e],a=!0,r=1;r<n.length;r++){var i=n[r];0!==u[i]&&(a=!1)}a&&(f.splice(e--,1),t=o(o.s=n[0]))}return t}var n={},u={0:0},f=[];function o(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return c[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=c,o.c=n,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="dist";var e=window.webpackJsonp=window.webpackJsonp||[],a=e.push.bind(e);e.push=t,e=e.slice();for(var r=0;r<e.length;r++)t(e[r]);var p=a;f.push(["Vtdi",1]),l()}({OMi8:function(t,e,n){},Vtdi:function(t,e,n){"use strict";n.r(e);var ct=n("VphZ"),a=n("KU4y"),lt=n.n(a),ut=n("Wwog"),r=n("DzJC"),ft=n.n(r),i=n("mVx/"),pt=n.n(i),o=n("EVdn"),dt=n.n(o),vt=n("LhCv"),ht=n("0hfp");n("OMi8");function gt(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],a=!0,r=!1,i=void 0;try{for(var o,s=t[Symbol.iterator]();!(a=(o=s.next()).done)&&(n.push(o.value),!e||n.length!==e);a=!0);}catch(t){r=!0,i=t}finally{try{a||null==s.return||s.return()}finally{if(r)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function mt(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function wt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach(function(t){yt(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function yt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}!function(){var t,z="ontouchstart"in document.documentElement;z&&dt()(document.body).addClass("touch");var w,e,n,g=null,l=null,m=null,y=null,U=null,F=null,R=null,B={state:"all",field:"newCases",time:"14d",useLog:!1,per100k:!1,consistentY:!0},b=new Date(2020,0,21),k=null,D=null,S=null,x=null,H=!1,E={cases:"Total Cases",deaths:"Total Deaths",tests:"Total Tests",positive:"Total Positive",pending:"Total Pending",negative:"Total Negative",newCases:"New Cases",newDeaths:"New Deaths",newTests:"New Tests",newPositive:"New Positive",newNegative:"New Negative",pop:"Est. Population"};Object.keys(E).forEach(function(t){E[Z(t)]=E[t]});var J=wt({},E);Object.keys(J).forEach(function(t){0===t.indexOf("new")&&(J[t]="Avg ".concat(J[t].replace("New","Daily")))});var X={"7d":"Last 7 days","14d":"Last 14 days","1mo":"Last 30 days",all:"All-time"},P={"New York City":"36061","Kansas City":"29999"},a=(yt(t={},"29999",505604),yt(t,"29037",103525),yt(t,"29095",386437),yt(t,"29047",108919),yt(t,"29165",48783),yt(t,"36061",8336817),t),K={36005:"36061",36047:"36061",36081:"36061",36085:"36061"},o={state:"state",field:"field",time:"time",useLog:"log",per100k:"per100k",consistentY:"consistentY"},s={state:"all",field:"newCases",time:"14d",useLog:!1,per100k:!1,consistentY:!0};function c(t){for(var e="?"===t[0]?t.substring(1):t,n=e?e.split("&"):[],a={},r=0;r<n.length;r++){var i=gt(n[r].split("=").map(decodeURIComponent),2),o=i[0],s=i[1];a[o]=s}return a}var r=new(function(){function n(t){var e=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.history=t,this.history.listen(function(){e.parse(),"all"===B.state?ot():st(B.state)})}var t,e,a;return t=n,(e=[{key:"parse",value:function(){for(var t=c(this.history.location.search),e=Object.keys(o),n=0;n<e.length;n++){var a=e[n],r=o[a],i=null!=t[r]?t[r]:s[a];if("boolean"==typeof s[a]&&"string"==typeof i&&(i="1"===i),B[a]!==i)switch(a){case"state":i=i.replace("+"," "),B.state=i,dt()("#state-select").val(i);break;case"field":E[i]&&(B.field=i,dt()("#field-select").val(i),(H="tests"===B.field||"newTests"===B.field)?(B.useLog=!1,dt()("#cb-use-log-scale").prop("checked",!1),t[o.useLog]="0",dt()(".testing-legend").show(),dt()("#filter-use-log-scale").hide()):(dt()(".testing-legend").hide(),dt()("#filter-use-log-scale").show()));break;case"time":B.time=i,dt()("#time-select").val(i);break;case"useLog":B.useLog=i,dt()("#cb-use-log-scale").prop("checked",i);break;case"per100k":B.per100k=i,dt()("#cb-per-100k").prop("checked",i);break;case"consistentY":B.consistentY=i,dt()("#cb-consistent-y").prop("checked",i)}}}},{key:"push",value:function(t){this._update("push",t)}},{key:"replace",value:function(t){this._update("replace",t)}},{key:"_update",value:function(t,e){var n,a,r=wt({},c(this.history.location.search),{},e);this.history[t]({search:(n=r,(a=Object.keys(n).map(function(t){return"".concat(encodeURIComponent(t),"=").concat(encodeURIComponent(n[t]))}).join("&"))?"?".concat(a):"")})}}])&&mt(t.prototype,e),a&&mt(t,a),n}())(vt.a());function q(t){var e=["cases","deaths","newCases","newDeaths"];return t&&e.push("positive","negative","pending","tests","newPositive","newNegative","newTests"),e}function i(t,e,n){var s,a=ct.nest().key(function(t){return t.state}).entries(t),r=(s={},n.forEach(function(t){if(t.date){var e=String(t.date).substring(0,4),n=String(t.date).substring(4,6),a=String(t.date).substring(6,8),r=t.fips,i={fips:r||"",date:new Date(Number(e),Number(n)-1,Number(a)),positive:T(t.positive),negative:T(t.negative),pending:T(t.pending),tests:T(t.total),newPositive:T(t.positiveIncrease),newNegative:T(t.negativeIncrease),newTests:T(t.totalTestResultsIncrease)};s[r]||(s[r]={});var o=s[r];o[i.date.getTime()]&&console.error("Multiple rows for for same state fips/date",t),o[i.date.getTime()]=i}}),s),i=j(e);g=O(a,i,r);var o,c,l,u,f,p,d=gt((o=t,c=r,l=["cases","deaths"],u=["positive","negative","pending","tests","newPositive","newNegative","newTests"],f=ct.nest().key(function(t){return t.date}).entries(o).map(function(t){var e=t.values,n={fips:"00",date:e[0].date};return e.forEach(function(e){l.forEach(function(t){n[t]||(n[t]=0),n[t]+=Number(e[t])})}),n}),p={},Object.keys(c).forEach(function(t){var a=c[t];Object.keys(a).forEach(function(t){p[t]||(p[t]={});var e=a[t],n=p[t];u.forEach(function(t){n[t]||(n[t]=0),n[t]+=e[t]||0})})}),[[{key:"United States",values:f}],{"00":p}]),2),v=d[0],h=d[1];m=O(v,i,h)}function T(t){return null==t?null:Number(t)}function j(t){var n=Object.assign({},a);return t.forEach(function(t){var e=K[t.fips]||t.fips;a[e]?n[e]=a[e]:n[e]=parseInt(t.pop)}),n}function O(t,v,h){var g=q(!!h);return t.forEach(function(p){for(var d=[],t=function(t){var e=p.values[t-1],n=p.values[t],a=gt(n.date.split("-"),3),r=a[0],i=a[1],o=a[2],s=n.fips;!s&&n.county&&(s=P[n.county]);var c=wt({},n,{fips:s,date:new Date(Number(r),Number(i)-1,Number(o)),cases:Number(n.cases),deaths:Number(n.deaths)});e?(c.newCases=c.cases-e.cases,c.newDeaths=c.deaths-e.deaths):(c.newCases=c.cases,c.newDeaths=c.deaths),d.push(c);var l=((h?h[c.fips]:{})||{})[c.date.getTime()];l&&(c.positive=l.positive,c.positivePct=l.positive/l.tests,c.negative=l.negative,c.negativePct=l.negative/l.tests,c.pending=l.pending,c.pendingPct=l.pending/l.tests,c.tests=l.tests,c.newPositive=l.newPositive,c.newPositivePct=l.newPositive/l.newTests,c.newNegative=l.newNegative,c.newNegativePct=l.newNegative/l.newTests,c.newTests=l.newTests);var u=v[c.fips];if(u){var f=(c.pop=u)/1e5;g.forEach(function(t){"number"==typeof c[t]&&(c[Z(t)]=c[t]/f)})}else p.noPopulation=!0;(null===k||c.date.getTime()>k.getTime())&&(k=c.date)},e=0;e<p.values.length;e++)t(e);p.values=d}),t}function u(t,i,e){var n=q(e),o={},s=["date"].concat(n).concat(n.map(Z));return s.forEach(function(t){return o[t]=[null,null]}),{groups:t.map(function(t){for(var e=t.values,n=[],a=0,r=0;r<i.length;r++){for(;e[a]&&e[a].date.getTime()<i[r].getTime();)a++;e[a]&&e[a].date.getTime()===i[r].getTime()&&n.push(wt({},e[a],{i:r}))}return n.forEach(function(n){s.forEach(function(t){var e=o[t];null!=n[t]&&(null===e[0]||n[t]<e[0])&&(o[t][0]=n[t]),null!=n[t]&&(null===e[1]||n[t]>e[1])&&(o[t][1]=n[t])})}),wt({},t,{values:n})}),extents:o}}r.parse();var N=Object(ut.a)(u),C=Object(ut.a)(u);function Z(t){return"".concat(t,"_p100k")}var L=0;function f(t){var e,n,a,r,i,o=(y=t).groups,s=t.overview,c=t.isCounties,l=t.stateFips,u=B.per100k?Z(B.field):B.field;e="7d"===B.time?7:"14d"===B.time?14:"1mo"===B.time?30:(n=k,a=b,r=Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()),i=Date.UTC(n.getFullYear(),n.getMonth(),n.getDate()),Math.floor((i-r)/A));for(var f=[k],p=1;p<e;p++){var d=new Date(k);d.setDate(k.getDate()-p),f.unshift(d)}if(c&&H)return dt()("#viz").hide(),void dt()(".testing-data-unavailable").show();dt()("#viz").show(),dt()(".testing-data-unavailable").hide();var v=N(o,f,!c),h=C(s,f,!0),g={field:u,daysToShow:e,datesToShow:f,isCounties:c,stateFips:l};!function(t,e){var n=ct.select("#svg-overview"),a=n.node().getBoundingClientRect(),r=a.width,i=a.height,o=n.select("g.cell");o.selectAll("*").remove();var s=1024<=window.innerWidth,c=s?40:30,l=r-c-16,u=i-(s?20:14);o.attr("transform","translate(".concat(c,", 0)")),M(n,t,wt({},e,{allowDrilldown:!1,chartWidth:l,chartHeight:u,barPad:3}))}(h,g),function(t,e){var n=e.field,a=e.daysToShow,r=ct.select("#grid");r.selectAll("*").remove(),r.attr("class",B.consistentY?"consistent-y":"");var i=t.groups.slice(0),o=1024<=window.innerWidth,s=o?30:25,c=o?250:150,l=Math.floor(window.innerWidth/(c+s)),u=Math.floor((window.innerWidth-s*(l+1))/l),f=i.length,p=Math.floor(u/2.15),d=o?40:30,v=o?20:14,h=window.innerWidth,g=10<a?1:2,m=u+s,w=p+v+s,y=Math.ceil(f/l),b=y*w,k=!e.isCounties;i.forEach(function(t){if(0===n.indexOf("new"))t.sortVal=ct.sum(t.values,function(t){return t[n]});else{var e=pt()(t.values,function(t){return null!=t[n]});t.sortVal=e?e[n]:-1}}),i.sort(function(t,e){return e.sortVal-t.sortVal}),r.attr("viewBox",[0,0,h,b]).selectAll("g.row").data(ct.range(y)).enter().append("g").attr("class","row").attr("transform",function(t){return"translate(".concat(d,", ").concat(t*w,")")}).each(function(e){var t=(e+1)*l>i.length?i.length%l:l,n=ct.range(t).map(function(t){return{row:e,col:t}});ct.select(this).selectAll("g.cell").data(n).enter().append("g").attr("class","cell").classed("cell-clickable",k&&!H).attr("transform",function(t){return"translate(".concat(t.col*m,", 0)")})}),M(r,wt({},t,{groups:i}),wt({},e,{allowDrilldown:k,chartWidth:u,chartHeight:p,barPad:g}))}(v,g);var m=++L;(function(){w=w||ct.json("assets/us-counties.topojson").then(function(t){U=ht.a(t,t.objects.states).features,F=ht.b(t,t.objects.states,function(t,e){return t!==e}),R=ht.a(t,t.objects.counties).features});return w})().then(function(){m===L&&function(t,e){var r=e.field,n=e.isCounties,a=e.stateFips,i=t.groups,o=!n,s=ct.select("#svg-map"),c=s.node().getBoundingClientRect(),l=c.width,u=c.height,f=l,p=u,d=ct.geoAlbersUsa().translate([f/2,p/2]).scale(f),v=ct.geoPath().projection(d),h=J[r],g=X[B.time];ct.select("#map-title").text("Map of ".concat(h,", ").concat(g));var m=s.select("#map-g").attr("width",f).attr("height",p),w=[];if(n){var y=String(Number(a));w=R.filter(function(t){var e=String(t.id);return y===e.substring(0,4===e.length?1:2)})}var b=n?U.filter(function(t){return t.id===Number(a)}):U,k=Boolean(b.length);ct.select("#map-no-data").classed("shown",!k),ct.select("#viz-map-header").style("opacity",k?1:0);var P=function(t,e){var s={},c=null!=t[0].values[0].tests,l=q(c);return t.forEach(function(t){var e=t.values;if(e.length){var n=e[0],a=n.fips,r=n.pop,i={fips:a,pop:r,label:t.key,cases:ct.sum(e,function(t){return t.newCases}),deaths:ct.sum(e,function(t){return t.newDeaths}),newCases:ct.mean(e,function(t){return t.newCases}),newDeaths:ct.mean(e,function(t){return t.newDeaths})};c&&(i.tests=ct.sum(e,function(t){return t.newTests}),i.positive=ct.sum(e,function(t){return t.newPositive}),i.positivePct=i.positive/i.tests,i.negative=ct.sum(e,function(t){return t.newNegative}),i.negativePct=i.negative/i.tests,i.pending=ct.sum(e,function(t){return t.newPending}),i.pendingPct=i.pending/i.tests,i.newTests=ct.mean(e,function(t){return t.newTests}),i.newPositive=ct.mean(e,function(t){return t.newPositive}),i.newPositivePct=i.newPositive/i.newTests,i.newNegative=ct.mean(e,function(t){return t.newNegative}),i.newNegativePct=i.newNegative/i.newTests);var o=r/1e5;l.forEach(function(t){"number"==typeof i[t]&&(i[Z(t)]=i[t]/o)}),s[Number(a)]=i}}),e.map(function(t){var e=K[t.id]||t.id,n=s[e];return wt({id:t.id,feature:t},n)})}(i,n?w:b),T=[];P.forEach(function(t){var e=t[r];"number"==typeof e&&0<e&&T.push(e)}),0===T.length&&T.push(1);var x=ct.min(T),j=lt()().domain(T).range($);function O(t){var e=t[r];return null!=e&&0!==e?j(e):G}!function(t,e){ct.select("#map-legend").selectAll(".map-legend-item").data([0,e].concat(t)).join(function(t){var e=t.append("div").attr("class","map-legend-item");return e.append("div").classed("map-legend-item-label",!0),e},function(t){return t},function(t){return t.remove()}).each(function(t,e){dt()(this).css("background-color",0===e?G:$[e-1])}).select(".map-legend-item-label").text(function(t){return nt(t,2)})}(j.clusters(),x);var N=m.select("#map-states").selectAll(".map-state").data(n?b:P,function(t){return t.id}).join(function(t){return t.append("path").attr("opacity",0).attr("class","map-state map-feat")},function(t){return t},function(t){t.transition().duration(350).attr("opacity",0).remove()});N.attr("d",function(t){return v(t.feature)}).transition().duration(Q?0:350).attr("opacity",1).attr("fill",n?G:O);var C=m.select("#map-counties").selectAll(".map-county").data(n?P:[],function(t){return t.id}).join(function(t){return t.append("path").attr("opacity",0).attr("class",function(t){return"map-county map-county-".concat(t.id," map-feat")})},function(t){return t},function(t){t.transition().duration(350).attr("opacity",0).remove()}).attr("d",function(t){return v(t.feature)}).attr("fill",O);C.transition().duration(Q?0:350).attr("opacity",1),m.select("#map-state-borders").datum(F).attr("d",v).attr("opacity",n?0:1);var D=n?C:N;function S(t){var e,n,a=ct.event;t.label&&(n=(e={value:t,field:r,evt:a,allowDrilldown:o&&!H}).value,tt(wt({},e,{title:n.label,subtitle:X[B.time],fieldLabels:J})))}var E=ct.select("#map-backdrop");E.attr("width",l).attr("height",u),E.on("click",function(){n&&at("all")}),z?D.on("click",function(t){ct.event.stopPropagation(),S(t)}).on("mouseleave",function(){et()}):D.on("click",function(t){at(o?t.label:"all")}).on("mouseenter",S).on("mouseleave",function(){et()});var L=Q?m:m.transition().duration(750);if(n&&b.length){var M=n?v.bounds(b[0]):null,A=M[1][0]-M[0][0],I=M[1][1]-M[0][1],Y=(M[0][0]+M[1][0])/2,V=(M[0][1]+M[1][1])/2,W=.9/Math.max(A/f,I/p),_=[f/2-W*Y,p/2-W*V];L.attr("transform","translate("+_+")scale("+W+")")}else L.attr("transform","translate(0)scale(1)");Q=!1}(v,g)})}var $=["#49006a","#672682","#874694","#a666a0","#c588a6","#e3aba6","#ffd09f"].reverse(),G="#999",Q=!0;function M(t,e,n){var h=n.field,a=n.daysToShow,g=n.datesToShow,m=n.allowDrilldown,w=n.chartWidth,y=n.chartHeight,r=n.barPad,b=e.groups,i=e.extents,o=B.useLog?"scaleLog":"scaleLinear",k=ct.scaleBand().domain(g).rangeRound([0,w]).paddingInner(r*a/w).paddingOuter(5*r/w),P=k.bandwidth(),T=g.map(function(t){return k(t)+P/2});function x(t){var e=[0,Math.max(t[1],B.per100k?.1:10)];if(B.useLog){var n=Math.max(t[0],0)||(B.per100k?.01:1);for(e[0]=1;e[0]>=n;)e[0]/=10}return ct[o]().domain(e).range([y,0]).nice()}function j(t){var e=t.domain()[1],n=4;for(B.useLog&&(n=B.per100k?3:e<100?1:e<1e3?2:e<1e4?3:4);5<t.ticks(n).length;)n--;return ct.axisLeft(t).ticks(n).tickSizeInner(-w).tickSizeOuter(0).tickFormat(function(t){return nt(t).replace(/^0\./,".")})}var O=x(i[h]),N=j(O),s=t.selectAll("g.cell"),C=0;s.each(function(t,e){var n=this,a=ct.select(this),r=b[e];if(r){C++;var f=r.values;a.append("line").attr("class","baseline").attr("y1",y).attr("y2",y).attr("x2",w);var i,o=O,s=N;if(!B.consistentY){var c=ct.extent(f,function(t){return t[h]});s=j(o=x(c))}a.append("g").attr("transform","translate(0,0)").call(s),H?(i="newTests"===B.field?["newPositive","newNegative"]:["positive","negative"],B.per100k&&(i=i.map(Z))):i=[h];var l=ct.stack().keys(i)(f);a.selectAll("g.layer").data(l,function(t){return t.key}).enter().append("g").attr("class",function(t,e){return"layer layer-".concat(e+1," layer-").concat(t.key)}).selectAll(".bar").data(function(t){return t},function(t){return String(t.data.date.getTime())}).enter().append("rect").attr("class","bar").attr("width",P).attr("x",function(t){return k(t.data.date)}).attr("y",function(t){var e=Math.floor(o(t[1]));return Number.isNaN(e)?y:e}).attr("height",function(t){var e=Math.max(Math.ceil(y-o(t[1]-t[0])),0);return Number.isNaN(e)?0:e});var p=a.append("line").attr("y1",0).attr("y2",y).attr("class","crosshair crosshair-hidden"),u=a.append("rect").attr("class","pointer").attr("width",w).attr("height",y);z?u.on("click",function(){ct.event.stopPropagation(),d.call(n)}):u.on("mousemove",d).on("click",v),a.on("mouseleave",function(){p.classed("crosshair-hidden",!0),et()}),a.append("text").text(1<b.length?"".concat(C,". ").concat(r.key):r.key).attr("x",6).attr("y",14).attr("class","cell-label").on("click",v),B.per100k&&r.noPopulation&&a.append("text").text("No population data").attr("x",w/2).attr("y",y/2).attr("class","cell-label-nopop")}function d(){var t,e,n=ct.event,a=ct.mouse(this)[0],r=ct.bisectLeft(T,a),i=T[r-1],o=T[r],s=null==i||Math.abs(a-o)<Math.abs(a-i)?r:r-1,c=g[s],l=f.find(function(t){return t.date.getTime()===c.getTime()});if(l&&(l!==D||!S)){var u=Math.round(k(c)+P/2);p.attr("x1",u).attr("x2",u).classed("crosshair-hidden",!1),e=(t={value:l,field:h,evt:n,allowDrilldown:m&&!H}).value,tt(wt({},t,{title:function(t){return t.toLocaleString("default",{year:"numeric",month:"long",day:"numeric"})}(e.date),fieldLabels:E}))}}function v(){m&&(at(r.key),_("#viz-overview"))}});var c,l=(c=b[0].values)[c.length-1].date,u=new Date(l);u.setDate(u.getDate()-a+1),s.append("text").attr("class","x-tick x-tick-start").attr("text-anchor","start").attr("x",0).attr("y",y+4).text(d(u)),s.append("text").attr("class","x-tick x-tick-end").attr("text-anchor","end").attr("x",w).attr("y",y+4).text(d(l))}var A=864e5;function tt(t){clearTimeout(x);var r=t.value,e=t.field,n=t.evt,a=t.allowDrilldown,i=t.title,o=t.subtitle,s=t.fieldLabels;D=r,S=!0;var c=n.pageX,l=n.pageY,u=n.clientY,f={left:"",right:"",top:"",bottom:"",transform:""},p=window.innerWidth,d=window.innerHeight,v=document.body.getBoundingClientRect().height,h=0<c-250,g=c+250<p,m=0<u-250,w=u-250<d;m?f.bottom="".concat(v-l+10,"px"):f.top="".concat(l+10,"px"),g?f.left="".concat(c+10,"px"):h?f.right="".concat(p-c+10,"px"):m||!w?(f.left=c,f.transform="translateX(-50%)",f.bottom="".concat(v-l+10,"px")):w&&(f.left=c,f.transform="translateX(-50%)",f.top="".concat(l+10,"px"));var y,b=H,k=b?"col-3":"col-2";y="tests"===B.field?[{key:"positive",color:"primary1",pct:r.positivePct},{key:"negative",color:"primary2",pct:r.negativePct},{key:"pending",pct:r.pendingPct},{key:"tests"},{key:"cases"},{key:"deaths"}]:"newTests"===B.field?[{key:"newPositive",color:"primary1",pct:r.newPositivePct},{key:"newNegative",color:"primary2",pct:r.newNegativePct},{key:"newTests"},{key:"newCases"},{key:"newDeaths"}]:["cases","deaths","newCases","newDeaths"].map(function(t){return{key:t,color:t===e?"primary1":null}}),B.per100k&&(y=y.map(function(t){return wt({},t,{key:Z(t.key),suffix:" per 100k",formatter:I})}),null!=r.pop&&y.push({key:"pop"}));var P=y.map(function(t){var e,n=t.formatter||V,a=r[t.key];return null==a?"":'\n        \t<div class="tooltip-dp-label '.concat(t.color||"",'">').concat(s[t.key],'</div>\n        \t<div class="tooltip-dp-val">').concat(n(a)).concat(t.suffix||"","</div>\n          ").concat(b?'\n            <div class="tooltip-dp-pct">\n              '.concat(null!=(e=t.pct)?"(".concat(W(e),")"):"","\n            </div>\n          "):"","\n        \t")}),T=a?'<div class="tooltip-drill"><span class="click">Click</span><span class="tap">Tap</span><span> to see counties</span></div>':"";dt()("#tooltip").addClass("shown").toggleClass("clickable",a).css(f).html("<div><h4>".concat(i,"</h4>\n        ").concat(o?"<h5>".concat(o,"</h5>"):"",'\n              <div class="tooltip-grid ').concat(k,'">\n                ').concat(P.join(""),"\n              </div>\n              ").concat(T,"</div>"))}function et(){x=setTimeout(p,z?500:50)}function p(){dt()("#tooltip").removeClass("shown"),S=!1}function d(t){return t.toLocaleString("default",{month:"short",day:"numeric"})}function nt(t,e){var n;return 1e6<=t?(t/=1e6,n="m"):1e3<=t&&(t/=1e3,n="k"),void 0!==e&&(t=parseFloat(t.toPrecision(e))),n?"".concat(t).concat(n):String(t)}var v=ct.format(",.1f"),h=ct.format(",.2f");function I(t){return(1<=t?v:h)(t)}var Y=ct.format(",d");function V(t){return Y(t)}var W=ct.format(".1%");function at(t){r.push(yt({},o.state,t))}function _(t){var e=document.querySelector(t);e&&e.scrollIntoView||window.scrollTo(0,0),e.scrollIntoView({behavior:"smooth",block:"start"})}var rt=ft()(function(){y&&f(y)},100);function it(){return e=e||Promise.all([ct.csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"),ct.csv("assets/fips-pop-cty.csv")]).then(function(t){var e,n,a,r,i,o=gt(t,2),s=o[0],c=o[1];e=s,n=c,a=ct.nest().key(function(t){return t.state}).entries(e),r={},i=j(n),a.forEach(function(t){var e=O(ct.nest().key(function(t){return t.county}).entries(t.values),i);r[t.key]={key:t.key,counties:e}}),l=r})}function ot(){n.then(function(){return f({groups:g,overview:m}),dt()(".back-to-states").removeClass("shown"),void p()})}function st(r){Promise.all([n,it()]).then(function(){return t=l[e=r],n=g.filter(function(t){return t.key===e}),a=n?n[0].values[0].fips:null,f({groups:t.counties,overview:n,isCounties:!0,stateFips:a}),dt()(".back-to-states").addClass("shown"),void p();var e,t,n,a})}window.addEventListener("resize",rt),n=n||Promise.all([ct.csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"),ct.csv("assets/fips-pop-sta.csv"),ct.json("https://covidtracking.com/api/v1/states/daily.json")]).then(function(t){var e=gt(t,3);i(e[0],e[1],e[2]);var n=g.slice(0).sort(function(t,e){return t.key.localeCompare(e.key)}).map(function(t){return'<option value="'.concat(t.key,'">').concat(t.key,"</option>")}).join("");dt()("#state-select").html('<option value="all" selected>All States</option>'.concat(n)),"all"!==B.state&&dt()("#state-select").val(B.state)}),"all"===B.state?(ot(),setTimeout(it,200)):st(B.state),dt()("#state-select").change(function(){at(dt()(this).val())}),dt()(".back-to-states").click(function(){at("all"),_("#vi")}),dt()("#field-select").change(function(){r.push(yt({},o.field,dt()(this).val()))}),dt()("#time-select").change(function(){r.push(yt({},o.time,dt()(this).val()))}),dt()("#tooltip").click(function(t){t.stopPropagation(),dt()(this).is(".clickable")&&D&&(at(D.state||D.label),D.label||_("#viz-overview"))}),dt()("#cb-use-log-scale").change(function(){var t=dt()(this).is(":checked");r.push(yt({},o.useLog,t?"1":"0"))}),dt()("#cb-per-100k").change(function(){var t=dt()(this).is(":checked");r.push(yt({},o.per100k,t?"1":"0"))}),dt()("#cb-consistent-y").change(function(){var t=dt()(this).is(":checked");r.push(yt({},o.consistentY,t?"1":"0"))}),dt()(document).on("click",function(){et()})}()}});
//# sourceMappingURL=main.1ac044e3eabaecfd605c.js.map