!function(c){function t(t){for(var e,n,a=t[0],r=t[1],i=t[2],o=0,s=[];o<a.length;o++)n=a[o],Object.prototype.hasOwnProperty.call(u,n)&&u[n]&&s.push(u[n][0]),u[n]=0;for(e in r)Object.prototype.hasOwnProperty.call(r,e)&&(c[e]=r[e]);for(p&&p(t);s.length;)s.shift()();return f.push.apply(f,i||[]),l()}function l(){for(var t,e=0;e<f.length;e++){for(var n=f[e],a=!0,r=1;r<n.length;r++){var i=n[r];0!==u[i]&&(a=!1)}a&&(f.splice(e--,1),t=o(o.s=n[0]))}return t}var n={},u={0:0},f=[];function o(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return c[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=c,o.c=n,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var e=window.webpackJsonp=window.webpackJsonp||[],a=e.push.bind(e);e.push=t,e=e.slice();for(var r=0;r<e.length;r++)t(e[r]);var p=a;f.push(["Vtdi",1]),l()}({Vtdi:function(t,e,n){"use strict";n.r(e);var rt=n("VphZ"),a=n("KU4y"),it=n.n(a),U=n("Wwog"),r=n("DzJC"),ot=n.n(r),i=n("mVx/"),st=n.n(i),o=n("EVdn"),ct=n.n(o),lt=n("LhCv"),ut=n("0hfp");function ft(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],a=!0,r=!1,i=void 0;try{for(var o,s=t[Symbol.iterator]();!(a=(o=s.next()).done)&&(n.push(o.value),!e||n.length!==e);a=!0);}catch(t){r=!0,i=t}finally{try{a||null==s.return||s.return()}finally{if(r)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function pt(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function dt(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach(function(t){vt(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function vt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}!function(){var V="ontouchstart"in document.documentElement;V&&ct()(document.body).addClass("touch");var g=null,l=null,m=null,w=null,F=null,R=null,z=null,B={state:"all",field:"newCases",time:"14d",useLog:!1,per100k:!1,consistentY:!0},y=new Date(2020,0,21),b=null,D=null,S=null,k=null,H=!1,E={cases:"Total Cases",deaths:"Total Deaths",tests:"Total Tests",positive:"Total Positive",pending:"Total Pending",negative:"Total Negative",newCases:"New Cases",newDeaths:"New Deaths",newTests:"New Tests",newPositive:"New Positive",newNegative:"New Negative",pop:"Est. Population"};Object.keys(E).forEach(function(t){E[$(t)]=E[t]});var J=dt({},E);Object.keys(J).forEach(function(t){t.startsWith("new")&&(J[t]="Avg ".concat(J[t].replace("New","Daily")))});var K={"7d":"Last 7 days","14d":"Last 14 days","1mo":"Last 30 days",all:"All-time"},P={"New York City":"36061","Kansas City":"29999"},e=vt({},"29999",491918),X={36005:"36061",36047:"36061",36081:"36061",36085:"36061"},o={state:"state",field:"field",time:"time",useLog:"log",per100k:"per100k",consistentY:"consistentY"},s={state:"all",field:"newCases",time:"14d",useLog:!1,per100k:!1,consistentY:!0};function c(t){for(var e="?"===t[0]?t.substring(1):t,n=e?e.split("&"):[],a={},r=0;r<n.length;r++){var i=ft(n[r].split("=").map(decodeURIComponent),2),o=i[0],s=i[1];a[o]=s}return a}var n=new(function(){function n(t){var e=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.history=t,this.history.listen(function(){e.parse(),"all"===B.state?d():v(B.state)})}var t,e,a;return t=n,(e=[{key:"parse",value:function(){for(var t=c(this.history.location.search),e=Object.keys(o),n=0;n<e.length;n++){var a=e[n],r=o[a],i=null!=t[r]?t[r]:s[a];if("boolean"==typeof s[a]&&"string"==typeof i&&(i="1"===i),B[a]!==i)switch(a){case"state":B.state=i,ct()("#state-select").val(i);break;case"field":E[i]&&(B.field=i,ct()("#field-select").val(i),(H="tests"===B.field||"newTests"===B.field)?(B.useLog=!1,ct()("#cb-use-log-scale").prop("checked",!1),t[o.useLog]="0",ct()(".testing-legend").show(),ct()("#filter-use-log-scale").hide()):(ct()(".testing-legend").hide(),ct()("#filter-use-log-scale").show()));break;case"time":B.time=i,ct()("#time-select").val(i);break;case"useLog":B.useLog=i,ct()("#cb-use-log-scale").prop("checked",i);break;case"per100k":B.per100k=i,ct()("#cb-per-100k").prop("checked",i);break;case"consistentY":B.consistentY=i,ct()("#cb-consistent-y").prop("checked",i)}}}},{key:"push",value:function(t){this._update("push",t)}},{key:"replace",value:function(t){this._update("replace",t)}},{key:"_update",value:function(t,e){var n,a,r=dt({},c(this.history.location.search),{},e);this.history[t]({search:(n=r,(a=Object.keys(n).map(function(t){return"".concat(encodeURIComponent(t),"=").concat(encodeURIComponent(n[t]))}).join("&"))?"?".concat(a):"")})}}])&&pt(t.prototype,e),a&&pt(t,a),n}())(lt.a());function Z(t){var e=["cases","deaths","newCases","newDeaths"];return t&&e.push("positive","negative","pending","tests","newPositive","newNegative","newTests"),e}function a(t,e,n){var s,a=rt.nest().key(function(t){return t.state}).entries(t),r=(s={},n.forEach(function(t){if(t.date){var e=String(t.date).substring(0,4),n=String(t.date).substring(4,6),a=String(t.date).substring(6,8),r=t.fips,i={fips:r,date:new Date(Number(e),Number(n)-1,Number(a)),positive:Number(t.positive),negative:Number(t.negative),pending:Number(t.pending),tests:Number(t.total),newPositive:Number(t.positiveIncrease),newNegative:Number(t.negativeIncrease),newTests:Number(t.totalTestResultsIncrease)};s[r]||(s[r]={});var o=s[r];o[i.date.getTime()]&&console.error("Multiple rows for for same state fips/date",t),o[i.date.getTime()]=i}}),s),i=T(e);g=N(a,i,r);var o,c,l,u,f,p,d=ft((o=t,c=r,l=["cases","deaths"],u=["positive","negative","pending","tests","newPositive","newNegative","newTests"],f=rt.nest().key(function(t){return t.date}).entries(o).map(function(t){var e=t.values,n={fips:"00",date:e[0].date};return e.forEach(function(e){l.forEach(function(t){n[t]||(n[t]=0),n[t]+=Number(e[t])})}),n}),p={},Object.keys(c).forEach(function(t){var a=c[t];Object.keys(a).forEach(function(t){p[t]||(p[t]={});var e=a[t],n=p[t];u.forEach(function(t){n[t]||(n[t]=0),n[t]+=e[t]})})}),[[{key:"United States",values:f}],{"00":p}]),2),v=d[0],h=d[1];m=N(v,i,h)}function T(t){var n=Object.assign({},e);return t.forEach(function(t){var e=X[t.fips]||t.fips;null==n[e]&&(n[e]=0),n[e]+=parseInt(t.pop)}),n}function N(t,v,h){var g=Z(!!h);return t.forEach(function(p){for(var d=[],t=function(t){var e=p.values[t-1],n=p.values[t],a=ft(n.date.split("-"),3),r=a[0],i=a[1],o=a[2],s=n.fips;!s&&n.county&&(s=P[n.county]);var c=dt({},n,{fips:s,date:new Date(Number(r),Number(i)-1,Number(o)),cases:Number(n.cases),deaths:Number(n.deaths)});e?(c.newCases=c.cases-e.cases,c.newDeaths=c.deaths-e.deaths):(c.newCases=c.cases,c.newDeaths=c.deaths),d.push(c);var l=((h?h[c.fips]:{})||{})[c.date.getTime()];l&&(c.positive=l.positive,c.positivePct=l.positive/l.tests,c.negative=l.negative,c.negativePct=l.negative/l.tests,c.pending=l.pending,c.pendingPct=l.pending/l.tests,c.tests=l.tests,c.newPositive=l.newPositive,c.newPositivePct=l.newPositive/l.newTests,c.newNegative=l.newNegative,c.newNegativePct=l.newNegative/l.newTests,c.newTests=l.newTests);var u=v[c.fips];if(u){var f=(c.pop=u)/1e5;g.forEach(function(t){"number"==typeof c[t]&&(c[$(t)]=c[t]/f)})}else p.noPopulation=!0;(null===b||c.date.getTime()>b.getTime())&&(b=c.date)},e=0;e<p.values.length;e++)t(e);p.values=d}),t}function t(t,i,e){var n=Z(e),o={},s=["date"].concat(n).concat(n.map($));return s.forEach(function(t){return o[t]=[null,null]}),{groups:t.map(function(t){for(var e=t.values,n=[],a=0,r=0;r<i.length;r++){for(;e[a]&&e[a].date.getTime()<i[r].getTime();)a++;e[a]&&e[a].date.getTime()===i[r].getTime()&&n.push(dt({},e[a],{i:r}))}return n.forEach(function(n){s.forEach(function(t){var e=o[t];null!=n[t]&&(null===e[0]||n[t]<e[0])&&(o[t][0]=n[t]),null!=n[t]&&(null===e[1]||n[t]>e[1])&&(o[t][1]=n[t])})}),dt({},t,{values:n})}),extents:o}}n.parse();var j=Object(U.a)(t),x=Object(U.a)(t);function $(t){return"".concat(t,"_p100k")}var O=0;function r(t){var e,n,a,r,i,o=(w=t).groups,s=t.overview,c=t.isCounties,l=t.stateFips,u=B.per100k?$(B.field):B.field;e="7d"===B.time?7:"14d"===B.time?14:"1mo"===B.time?30:(n=b,a=y,r=Date.UTC(n.getFullYear(),n.getMonth(),n.getDate()),i=Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()),Math.floor((i-r)/L));for(var f=[b],p=1;p<e;p++){var d=new Date(b);d.setDate(b.getDate()-p),f.unshift(d)}if(c&&H)return ct()("#viz").hide(),void ct()(".testing-data-unavailable").show();ct()("#viz").show(),ct()(".testing-data-unavailable").hide();var v=j(o,f,!c),h=x(s,f,!0),g={field:u,daysToShow:e,datesToShow:f,isCounties:c,stateFips:l};!function(t,e){var n=rt.select("#svg-overview"),a=n.node().getBoundingClientRect(),r=a.width,i=a.height,o=n.select("g.cell");o.selectAll("*").remove();var s=1024<=window.innerWidth,c=s?40:30,l=r-c-16,u=i-(s?20:14);o.attr("transform","translate(".concat(c,", 0)")),C(n,t,dt({},e,{allowDrilldown:!1,chartWidth:l,chartHeight:u,barPad:3}))}(h,g),function(t,e){var n=e.field,a=e.daysToShow,r=rt.select("#grid");r.selectAll("*").remove(),r.attr("class",B.consistentY?"consistent-y":"");var i=t.groups.slice(0),o=1024<=window.innerWidth,s=o?30:25,c=o?250:150,l=Math.floor(window.innerWidth/(c+s)),u=Math.floor((window.innerWidth-s*(l+1))/l),f=i.length,p=Math.floor(u/2.15),d=o?40:30,v=o?20:14,h=window.innerWidth,g=10<a?1:2,m=u+s,w=p+v+s,y=Math.ceil(f/l),b=y*w,k=!e.isCounties;i.forEach(function(t){if(n.startsWith("new"))t.sortVal=rt.sum(t.values,function(t){return t[n]});else{var e=st()(t.values,function(t){return null!=t[n]});t.sortVal=e?e[n]:-1}}),i.sort(function(t,e){return e.sortVal-t.sortVal}),r.attr("viewBox",[0,0,h,b]).selectAll("g.row").data(rt.range(y)).enter().append("g").attr("class","row").attr("transform",function(t){return"translate(".concat(d,", ").concat(t*w,")")}).each(function(e){var t=(e+1)*l>i.length?i.length%l:l,n=rt.range(t).map(function(t){return{row:e,col:t}});rt.select(this).selectAll("g.cell").data(n).enter().append("g").attr("class","cell").classed("cell-clickable",k&&!H).attr("transform",function(t){return"translate(".concat(t.col*m,", 0)")})}),C(r,dt({},t,{groups:i}),dt({},e,{allowDrilldown:k,chartWidth:u,chartHeight:p,barPad:g}))}(v,g);var m=++O;(function(){I=I||rt.json("https://raw.githubusercontent.com/schnerd/covid-tracker/master/us-counties.topojson").then(function(t){F=ut.a(t,t.objects.states).features,R=ut.b(t,t.objects.states,function(t,e){return t!==e}),z=ut.a(t,t.objects.counties).features});return I})().then(function(){m===O&&function(t,e){var r=e.field,n=e.isCounties,a=e.stateFips,i=t.groups,o=!n,s=rt.select("#svg-map"),c=s.node().getBoundingClientRect(),l=c.width,u=c.height,f=l,p=u,d=rt.geoAlbersUsa().translate([f/2,p/2]).scale(f),v=rt.geoPath().projection(d),h=J[r],g=K[B.time];rt.select("#map-title").text("Map of ".concat(h,", ").concat(g));var m=s.select("#map-g").attr("width",f).attr("height",p),w=[];if(n){var y=String(Number(a));w=z.filter(function(t){var e=String(t.id);return y===e.substring(0,4===e.length?1:2)})}var b=n?F.filter(function(t){return t.id===Number(a)}):F,k=Boolean(b.length);rt.select("#map-no-data").classed("shown",!k),rt.select("#viz-map-header").style("opacity",k?1:0);var P=function(t,e){var s={},c=null!=t[0].values[0].tests,l=Z(c);return t.forEach(function(t){var e=t.values,n=e[0],a=n.fips,r=n.pop,i={fips:a,pop:r,label:t.key,cases:rt.sum(e,function(t){return t.newCases}),deaths:rt.sum(e,function(t){return t.newDeaths}),newCases:rt.mean(e,function(t){return t.newCases}),newDeaths:rt.mean(e,function(t){return t.newDeaths})};c&&(i.tests=rt.sum(e,function(t){return t.newTests}),i.positive=rt.sum(e,function(t){return t.newPositive}),i.positivePct=i.positive/i.tests,i.negative=rt.sum(e,function(t){return t.newNegative}),i.negativePct=i.negative/i.tests,i.pending=rt.sum(e,function(t){return t.newPending}),i.pendingPct=i.pending/i.tests,i.newTests=rt.mean(e,function(t){return t.newTests}),i.newPositive=rt.mean(e,function(t){return t.newPositive}),i.newPositivePct=i.newPositive/i.newTests,i.newNegative=rt.mean(e,function(t){return t.newNegative}),i.newNegativePct=i.newNegative/i.newTests);var o=r/1e5;l.forEach(function(t){"number"==typeof i[t]&&(i[$(t)]=i[t]/o)}),s[Number(a)]=i}),e.map(function(t){var e=X[t.id]||t.id,n=s[e];return dt({id:t.id,feature:t},n)})}(i,n?w:b),T=[];P.forEach(function(t){var e=t[r];"number"==typeof e&&0<e&&T.push(e)}),0===T.length&&T.push(1);var N=rt.min(T),j=it()().domain(T).range(q);function x(t){var e=t[r];return null!=e&&0!==e?j(e):G}!function(t,e){rt.select("#map-legend").selectAll(".map-legend-item").data([0,e].concat(t)).join(function(t){var e=t.append("div").attr("class","map-legend-item");return e.append("div").classed("map-legend-item-label",!0),e},function(t){return t},function(t){return t.remove()}).each(function(t,e){ct()(this).css("background-color",0===e?G:q[e-1])}).select(".map-legend-item-label").text(function(t){return nt(t,2)})}(j.clusters(),N);var O=m.select("#map-states").selectAll(".map-state").data(n?b:P,function(t){return t.id}).join(function(t){return t.append("path").attr("opacity",0).attr("class","map-state map-feat")},function(t){return t},function(t){t.transition().duration(350).attr("opacity",0).remove()});O.attr("d",function(t){return v(t.feature)}).transition().duration(Q?0:350).attr("opacity",1).attr("fill",n?G:x);var C=m.select("#map-counties").selectAll(".map-county").data(n?P:[],function(t){return t.id}).join(function(t){return t.append("path").attr("opacity",0).attr("class",function(t){return"map-county map-county-".concat(t.id," map-feat")})},function(t){return t},function(t){t.transition().duration(350).attr("opacity",0).remove()}).attr("d",function(t){return v(t.feature)}).attr("fill",x);C.transition().duration(Q?0:350).attr("opacity",1),m.select("#map-state-borders").datum(R).attr("d",v).attr("opacity",n?0:1);var D=n?C:O;function S(t){var e,n,a=rt.event;t.label&&(n=(e={value:t,field:r,evt:a,allowDrilldown:o&&!H}).value,tt(dt({},e,{title:n.label,subtitle:K[B.time],fieldLabels:J})))}var E=rt.select("#map-backdrop");E.attr("width",l).attr("height",u),E.on("click",function(){n&&at("all")}),V?D.on("click",function(t){rt.event.stopPropagation(),S(t)}).on("mouseleave",function(){et()}):D.on("click",function(t){at(o?t.label:"all")}).on("mouseenter",S).on("mouseleave",function(){et()});var L=Q?m:m.transition().duration(750);if(n&&b.length){var M=n?v.bounds(b[0]):null,A=M[1][0]-M[0][0],Y=M[1][1]-M[0][1],I=(M[0][0]+M[1][0])/2,W=(M[0][1]+M[1][1])/2,_=.9/Math.max(A/f,Y/p),U=[f/2-_*I,p/2-_*W];L.attr("transform","translate("+U+")scale("+_+")")}else L.attr("transform","translate(0)scale(1)");Q=!1}(v,g)})}var q=["#49006a","#672682","#874694","#a666a0","#c588a6","#e3aba6","#ffd09f"].reverse(),G="#999",Q=!0;function C(t,e,n){var h=n.field,a=n.daysToShow,g=n.datesToShow,m=n.allowDrilldown,w=n.chartWidth,y=n.chartHeight,r=n.barPad,b=e.groups,i=e.extents,o=B.useLog?"scaleLog":"scaleLinear",k=rt.scaleBand().domain(g).rangeRound([0,w]).paddingInner(r*a/w).paddingOuter(5*r/w),P=k.bandwidth(),T=g.map(function(t){return k(t)+P/2});function N(t){var e=[0,Math.max(t[1],B.per100k?.1:10)];if(B.useLog){var n=Math.max(t[0],0)||(B.per100k?.01:1);for(e[0]=1;e[0]>=n;)e[0]/=10}return rt[o]().domain(e).range([y,0]).nice()}function j(t){var e=t.domain()[1],n=4;for(B.useLog&&(n=B.per100k?3:e<100?1:e<1e3?2:e<1e4?3:4);5<t.ticks(n).length;)n--;return rt.axisLeft(t).ticks(n).tickSizeInner(-w).tickSizeOuter(0).tickFormat(function(t){return nt(t).replace(/^0\./,".")})}var x=N(i[h]),O=j(x),s=t.selectAll("g.cell"),C=0;s.each(function(t,e){var n=this,a=rt.select(this),r=b[e];if(r){C++;var f=r.values;a.append("line").attr("class","baseline").attr("y1",y).attr("y2",y).attr("x2",w);var i,o=x,s=O;if(!B.consistentY){var c=rt.extent(f,function(t){return t[h]});s=j(o=N(c))}a.append("g").attr("transform","translate(0,0)").call(s),H?(i="newTests"===B.field?["newPositive","newNegative"]:["positive","negative"],B.per100k&&(i=i.map($))):i=[h];var l=rt.stack().keys(i)(f);a.selectAll("g.layer").data(l,function(t){return t.key}).enter().append("g").attr("class",function(t,e){return"layer layer-".concat(e+1," layer-").concat(t.key)}).selectAll(".bar").data(function(t){return t},function(t){return String(t.data.date.getTime())}).enter().append("rect").attr("class","bar").attr("width",P).attr("x",function(t){return k(t.data.date)}).attr("y",function(t){var e=Math.floor(o(t[1]));return Number.isNaN(e)?y:e}).attr("height",function(t){var e=Math.max(Math.ceil(y-o(t[1]-t[0])),0);return Number.isNaN(e)?0:e});var p=a.append("line").attr("y1",0).attr("y2",y).attr("class","crosshair crosshair-hidden"),u=a.append("rect").attr("class","pointer").attr("width",w).attr("height",y);V?u.on("click",function(){rt.event.stopPropagation(),d.call(n)}):u.on("mousemove",d).on("click",v),a.on("mouseleave",function(){p.classed("crosshair-hidden",!0),et()}),a.append("text").text(1<b.length?"".concat(C,". ").concat(r.key):r.key).attr("x",6).attr("y",14).attr("class","cell-label").on("click",v),B.per100k&&r.noPopulation&&a.append("text").text("No population data").attr("x",w/2).attr("y",y/2).attr("class","cell-label-nopop")}function d(){var t,e,n=rt.event,a=rt.mouse(this)[0],r=rt.bisectLeft(T,a),i=T[r-1],o=T[r],s=null==i||Math.abs(a-o)<Math.abs(a-i)?r:r-1,c=g[s],l=f.find(function(t){return t.date.getTime()===c.getTime()});if(l&&(l!==D||!S)){var u=Math.round(k(c)+P/2);p.attr("x1",u).attr("x2",u).classed("crosshair-hidden",!1),e=(t={value:l,field:h,evt:n,allowDrilldown:m&&!H}).value,tt(dt({},t,{title:function(t){return t.toLocaleString("default",{year:"numeric",month:"long",day:"numeric"})}(e.date),fieldLabels:E}))}}function v(){m&&(window.scrollTo(0,0),at(r.key))}});var c,l=(c=b[0].values)[c.length-1].date,u=new Date(l);u.setDate(u.getDate()-a+1),s.append("text").attr("class","x-tick x-tick-start").attr("text-anchor","start").attr("x",0).attr("y",y+4).text(f(u)),s.append("text").attr("class","x-tick x-tick-end").attr("text-anchor","end").attr("x",w).attr("y",y+4).text(f(l))}var L=864e5;function tt(t){clearTimeout(k);var r=t.value,e=t.field,n=t.evt,a=t.allowDrilldown,i=t.title,o=t.subtitle,s=t.fieldLabels;D=r,S=!0;var c=n.pageX,l=n.pageY,u=n.clientY,f={left:"",right:"",top:"",bottom:""},p=window.innerWidth,d=window.innerHeight;if(p<c+250?f.right="".concat(p-c+10,"px"):f.left="".concat(c+10,"px"),d<u+250){var v=document.body.getBoundingClientRect().height;f.bottom="".concat(v-l+10,"px")}else f.top="".concat(l+10,"px");var h,g=H,m=g?"col-3":"col-2";h="tests"===B.field?[{key:"positive",color:"primary1",pct:r.positivePct},{key:"negative",color:"primary2",pct:r.negativePct},{key:"pending",pct:r.pendingPct},{key:"tests"},{key:"cases"},{key:"deaths"}]:"newTests"===B.field?[{key:"newPositive",color:"primary1",pct:r.newPositivePct},{key:"newNegative",color:"primary2",pct:r.newNegativePct},{key:"newTests"},{key:"newCases"},{key:"newDeaths"}]:["cases","deaths","newCases","newDeaths"].map(function(t){return{key:t,color:t===e?"primary1":null}}),B.per100k&&(h=h.map(function(t){return dt({},t,{key:$(t.key),suffix:" per 100k",formatter:M})}),null!=r.pop&&h.push({key:"pop"}));var w=h.map(function(t){var e,n=t.formatter||A,a=r[t.key];return null==a?"":'\n        \t<div class="tooltip-dp-label '.concat(t.color||"",'">').concat(s[t.key],'</div>\n        \t<div class="tooltip-dp-val">').concat(n(a)).concat(t.suffix||"","</div>\n          ").concat(g?'\n            <div class="tooltip-dp-pct">\n              '.concat(null!=(e=t.pct)?"(".concat(Y(e),")"):"","\n            </div>\n          "):"","\n        \t")}),y=a?'<div class="tooltip-drill"><span class="click">Click</span><span class="tap">Tap</span><span> to see counties</span></div>':"";ct()("#tooltip").addClass("shown").toggleClass("clickable",a).css(f).html("<div><h4>".concat(i,"</h4>\n        ").concat(o?"<h5>".concat(o,"</h5>"):"",'\n              <div class="tooltip-grid ').concat(m,'">\n                ').concat(w.join(""),"\n              </div>\n              ").concat(y,"</div>"))}function et(){k=setTimeout(i,50)}function i(){ct()("#tooltip").removeClass("shown"),S=!1}function f(t){return t.toLocaleString("default",{month:"short",day:"numeric"})}function nt(t,e){var n;return 1e6<=t?(t/=1e6,n="m"):1e3<=t&&(t/=1e3,n="k"),void 0!==e&&(t=parseFloat(t.toPrecision(e))),n?"".concat(t).concat(n):String(t)}var u=rt.format(",.1f");function M(t){return u(t)}var p=rt.format(",d");function A(t){return p(t)}var Y=rt.format(".1%");function at(t){n.push(vt({},o.state,t))}function d(){r({groups:g,overview:m}),ct()(".back-to-states").removeClass("shown"),i()}function v(e){var t=l[e],n=g.filter(function(t){return t.key===e}),a=n?n[0].values[0].fips:null;r({groups:t.counties,overview:n,isCounties:!0,stateFips:a}),ct()(".back-to-states").addClass("shown"),i()}var I,h=ot()(function(){w&&r(w)},100);function W(){return Promise.all([rt.csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"),rt.csv("https://raw.githubusercontent.com/schnerd/covid-tracker/master/fips-pop-cty.csv")]).then(function(t){var e,n,a,r,i,o=ft(t,2),s=o[0],c=o[1];e=s,n=c,a=rt.nest().key(function(t){return t.state}).entries(e),r={},i=T(n),a.forEach(function(t){var e=N(rt.nest().key(function(t){return t.county}).entries(t.values),i);r[t.key]={key:t.key,counties:e}}),l=r})}window.addEventListener("resize",h);var _=Promise.all([rt.csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"),rt.csv("https://raw.githubusercontent.com/schnerd/covid-tracker/master/fips-pop-sta.csv"),rt.json("https://covidtracking.com/api/states/daily")]).then(function(t){var e=ft(t,3);a(e[0],e[1],e[2]);var n=g.slice(0).sort(function(t,e){return t.key.localeCompare(e.key)}).map(function(t){return'<option value="'.concat(t.key,'">').concat(t.key,"</option>")}).join("");ct()("#state-select").html('<option value="all" selected>All States</option>'.concat(n)),"all"!==B.state&&ct()("#state-select").val(B.state)});"all"===B.state?(_.then(function(){return d()}),setTimeout(W,200)):Promise.all([_,W()]).then(function(){return v(B.state)}),ct()("#state-select").change(function(){at(ct()(this).val())}),ct()(".back-to-states").click(function(){at("all"),window.scrollTo(0,0)}),ct()("#field-select").change(function(){n.push(vt({},o.field,ct()(this).val()))}),ct()("#time-select").change(function(){n.push(vt({},o.time,ct()(this).val()))}),ct()("#tooltip").click(function(){ct()(this).is(".clickable")&&D&&(at(D.state||D.label),D.label||window.scrollTo(0,0))}),ct()("#cb-use-log-scale").change(function(){var t=ct()(this).is(":checked");n.push(vt({},o.useLog,t?"1":"0"))}),ct()("#cb-per-100k").change(function(){var t=ct()(this).is(":checked");n.push(vt({},o.per100k,t?"1":"0"))}),ct()("#cb-consistent-y").change(function(){var t=ct()(this).is(":checked");n.push(vt({},o.consistentY,t?"1":"0"))}),ct()(document).on("click",function(){et()})}()}});