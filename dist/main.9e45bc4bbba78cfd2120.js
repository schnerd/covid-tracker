!function(t){function e(e){for(var a,i,c=e[0],s=e[1],l=e[2],f=0,p=[];f<c.length;f++)i=c[f],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&p.push(r[i][0]),r[i]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);for(u&&u(e);p.length;)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,c=1;c<n.length;c++){var s=n[c];0!==r[s]&&(a=!1)}a&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},r={0:0},o=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="dist";var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=s;o.push(["Vtdi",1]),n()}({OMi8:function(t,e,n){},Vtdi:function(t,e,n){"use strict";n.r(e);var a=n("bwSX"),r=n("+ugm"),o=n("pL0w"),i=n("wIsI"),c=n("44y/"),s=n("EjHT"),l=n("nWpo"),u=n("8cru"),f=n("V183"),p=n("OWWo"),d=n("mrVq"),v=n("NltA"),h=n("wz8V"),b=n("h8nK"),g=n("AKWm"),m=n("AWXE"),w=n("4k54"),y=n("RhHs"),k=n("n0hd"),j=n("VIqg"),O=n("sCaM"),P=n("aj5g"),x=n("vHEj"),C=n("KU4y"),D=n.n(C),N=n("Wwog"),T=n("DzJC"),E=n.n(T),L=n("mVx/"),M=n.n(L),S=n("ytg1"),A=n.n(S),Y=n("EVdn"),W=n.n(Y),I=n("LhCv"),V=n("0hfp");n("OMi8"),n("sQjb");function z(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],a=!0,r=!1,o=void 0;try{for(var i,c=t[Symbol.iterator]();!(a=(i=c.next()).done)&&(n.push(i.value),!e||n.length!==e);a=!0);}catch(t){r=!0,o=t}finally{try{a||null==c.return||c.return()}finally{if(r)throw o}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return _(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function R(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function U(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function F(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?U(Object(n),!0).forEach((function(e){X(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):U(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function X(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}!function(){var t,e,n="ontouchstart"in document.documentElement;n&&W()(document.body).addClass("touch");var C=null,T=null,L=null,S=null,Y={},_=null,U=null,H=null,B={state:"all",field:"newCases",time:"14d",useLog:!1,per100k:!1,consistentY:!0},K=new Date(2020,0,21),q=null,J=null,Q=null,$=null,G=!1,Z={cases:"Total Cases",deaths:"Total Deaths",tests:"Total Tests",positive:"Total Positive",negative:"Total Negative",newCases:"New Cases",newDeaths:"New Deaths",newTests:"New Tests",newPositive:"New Positive",newNegative:"New Negative",pop:"Est. Population"};Object.keys(Z).forEach((function(t){Z[gt(t)]=Z[t]}));var tt=F({},Z);Object.keys(tt).forEach((function(t){0===t.indexOf("new")&&(tt[t]="Avg ".concat(tt[t].replace("New","Daily")))}));var et=(X(t={newCases:!0,newDeaths:!0},gt("newCases"),!0),X(t,gt("newDeaths"),!0),t),nt={"7d":"Last 7 days","14d":"Last 14 days","1mo":"Last 30 days","90d":"Last 90 days",all:"All-time"},at={"New York City":"36061","Kansas City":"29999"},rt=(X(e={},"29999",505604),X(e,"29037",103525),X(e,"29095",386437),X(e,"29047",108919),X(e,"29165",48783),X(e,"36061",8336817),e),ot={36005:"36061",36047:"36061",36081:"36061",36085:"36061"},it={state:"state",field:"field",time:"time",useLog:"log",per100k:"per100k",consistentY:"consistentY"},ct={state:"all",field:"newCases",time:"14d",useLog:!1,per100k:!1,consistentY:!0};function st(t){for(var e="?"===t[0]?t.substring(1):t,n=e?e.split("&"):[],a={},r=0;r<n.length;r++){var o=z(n[r].split("=").map(decodeURIComponent),2),i=o[0],c=o[1];a[i]=c}return a}function lt(t){var e=Object.keys(t).map((function(e){return"".concat(encodeURIComponent(e),"=").concat(encodeURIComponent(t[e]))})).join("&");return e?"?".concat(e):""}var ut=new(function(){function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.history=e,this.history.listen((function(){n.parse(),"all"===B.state?Jt():Qt(B.state)}))}var e,n,a;return e=t,(n=[{key:"parse",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=st(this.history.location.search),n=Object.keys(it),a=0;a<n.length;a++){var r=n[a],o=it[r],i=null!=e[o]?e[o]:ct[r];if("boolean"==typeof ct[r]&&"string"==typeof i&&(i="1"===i),B[r]!==i||t)switch(r){case"state":i=i.replace("+"," "),B.state=i,W()("#state-select").val(i);break;case"field":Z[i]&&(B.field=i,W()("#field-select").val(i),(G="tests"===B.field||"newTests"===B.field)?(B.useLog=!1,W()("#cb-use-log-scale").prop("checked",!1),e[it.useLog]="0",W()(".testing-legend").show(),W()("#filter-use-log-scale").hide()):(W()(".testing-legend").hide(),W()("#filter-use-log-scale").show()),"newCases"===i||"newDeaths"===i?(W()(".ma-legend .legend-field-label").text(Z[i]),W()(".ma-legend").show()):W()(".ma-legend").hide());break;case"time":B.time=i,W()("#time-select").val(i);break;case"useLog":B.useLog=i,W()("#cb-use-log-scale").prop("checked",i);break;case"per100k":B.per100k=i,W()("#cb-per-100k").prop("checked",i);break;case"consistentY":B.consistentY=i,W()("#cb-consistent-y").prop("checked",i)}}}},{key:"push",value:function(t){this._update("push",t)}},{key:"replace",value:function(t){this._update("replace",t)}},{key:"_update",value:function(t,e){var n=F(F({},st(this.history.location.search)),e);this.history[t]({search:lt(n)})}}])&&R(e.prototype,n),a&&R(e,a),t}())(I.a());function ft(t){var e=["cases","deaths","newCases","newDeaths"];return t&&e.push("positive","negative","newPositive","newNegative","newTests"),e}function pt(t){var e=Object.assign({},rt);return t.forEach((function(t){var n=ot[t.fips]||t.fips;e[n]=rt[n]?rt[n]:parseInt(t.pop)})),e}function dt(t,e,n){var a=ft(n);return t.forEach((function(t){for(var n=[],r=function(r){var o=t.values[r],i=z(o.date.split("-"),3),c=i[0],s=i[1],l=i[2],u=o.fips;!u&&o.county&&(u=at[o.county]);var f=F(F({},o),{},{fips:u,date:new Date(Number(c),Number(s)-1,Number(l)),cases:Number(o.cases),deaths:Number(o.deaths),newCases:Number(o.newCases)});a.forEach((function(t){var e;f[t]=null==(e=f[t])?null:Number(e)})),n.push(f);var p=e[f.fips];if(p){f.pop=p;var d=p/1e5;a.forEach((function(t){"number"==typeof f[t]&&(f[gt(t)]=f[t]/d)}))}else t.noPopulation=!0;(null===q||f.date.getTime()>q.getTime())&&(q=f.date)},o=0;o<t.values.length;o++)r(o);t.values=n})),t}function vt(t,e,n){var a=ft(n),r=a.concat(a.map(gt)),o=["newCases","newDeaths"];o=o.concat(o.map(gt));var i={},c=["date"].concat(r);c.forEach((function(t){return i[t]=[null,null]}));var s=new Date(e[0]);s.setDate(s.getDate()-7);var l=function(t){return t.date.getTime()};return{groups:t.map((function(t){var n=t.values,a=[],r=e[0],u=wt(e),p=new Date(s),d=A()(n,{date:s},l),v={};o.forEach((function(t){v[t]=[]}));for(var h=function(){var t=p.getTime()>=r.getTime(),e=n[d],i=e&&e.date.getTime()===p.getTime()?e:null,c={};o.forEach((function(t){var n=v[t];7===n.length&&n.shift(),i&&"number"==typeof i[t]?n.push(e[t]):n.push(0),c[mt(t)]=Object(f.a)(n)})),t&&(i?a.push(Object.assign({},i,c)):a.push(Object.assign({date:new Date(p),fips:n[0].fips,pop:n[0].pop,state:n[0].state,county:n[0].county},c))),i&&d++,p.setDate(p.getDate()+1)};p.getTime()<=u.getTime();)h();return a.forEach((function(t){c.forEach((function(e){var n=i[e],a=t[e];if(null!=a&&(null===n[0]||a<n[0])&&(n[0]=a),null!=a&&(null===n[1]||a>n[1])&&(n[1]=a),et[e]){var r=t[mt(e)];null!=r&&(null===n[1]||r>n[1])&&(n[1]=r)}}))})),F(F({},t),{},{values:a})})),extents:i}}ut.parse(!0);var ht=Object(N.a)(vt),bt=Object(N.a)(vt);function gt(t){return"".concat(t,"_p100k")}function mt(t){return"".concat(t,"_ma")}function wt(t){return t[t.length-1]}var yt=0;function kt(t){S=t;var e,a,r,o,i,c=t.groups,s=t.overview,l=t.isCounties,u=t.stateFips,h=B.per100k?gt(B.field):B.field;"7d"===B.time?e=7:"14d"===B.time?e=14:"1mo"===B.time?e=30:"90d"===B.time?e=90:(a=q,r=K,o=Date.UTC(r.getFullYear(),r.getMonth(),r.getDate()),i=Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()),e=Math.floor((i-o)/864e5));for(var b=[q],w=1;w<e;w++){var y=new Date(q);y.setDate(q.getDate()-w),b.unshift(y)}if(l&&G)return W()("#viz").hide(),void W()(".testing-data-unavailable").show();W()("#viz").show(),W()(".testing-data-unavailable").hide();var k=bt(s,b,!0),j=ht(c,b,!l),O={field:h,datesToShow:b,isCounties:l,stateFips:u};!function(t,e){var n=Object(g.a)("#svg-overview"),a=n.node().getBoundingClientRect(),r=a.width,o=a.height,i=n.select("g.cell");i.selectAll("*").remove();var c=window.innerWidth>=1024,s=c?40:30,l=r-s-16,u=o-(c?20:14);i.attr("transform","translate(".concat(s,", 0)")),Pt(n,t,F(F({},e),{},{allowDrilldown:!1,chartWidth:l,chartHeight:u,cellLabelX:6,cellLabelY:0,barPad:3}))}(k,O),function(t,e){var n=e.field,a=e.datesToShow,r=Object(g.a)("#grid");r.selectAll("*").remove(),r.attr("class",B.consistentY?"consistent-y":"");var o=t.groups.slice(0),i=window.innerWidth>=1024,c=i?30:25,s=i?40:35,l=i?250:150,u=Math.floor(window.innerWidth/(l+c)),f=Math.floor((window.innerWidth-c*(u+1))/u),d=o.length,h=Math.floor(f/2.15),b=i?40:30,m=i?20:14,w=window.innerWidth,y=a.length>10?1:2,k=f+c,j=h+m+s,O=Math.ceil(d/u),P=O*j,x=!e.isCounties;o.forEach((function(t){if(0===n.indexOf("new"))t.sortVal=Object(p.a)(t.values,(function(t){return t[n]}));else{var e=M()(t.values,(function(t){return null!=t[n]}));t.sortVal=e?e[n]:-1}})),o.sort((function(t,e){return e.sortVal-t.sortVal})),r.attr("viewBox",[0,0,w,P]).selectAll("g.row").data(Object(v.a)(O)).enter().append("g").attr("class","row").attr("transform",(function(t){return"translate(".concat(b,", ").concat(t*j,")")})).each((function(t){var e=(t+1)*u>o.length?o.length%u:u,n=Object(v.a)(e).map((function(e){return{row:t,col:e}}));Object(g.a)(this).selectAll("g.cell").data(n).enter().append("g").attr("class","cell").classed("cell-clickable",x&&!G).attr("transform",(function(t){return"translate(".concat(t.col*k,", 0)")}))})),Pt(r,F(F({},t),{},{groups:o}),F(F({},e),{},{allowDrilldown:x,chartWidth:f,chartHeight:h,cellLabelX:-20,cellLabelY:-10,barPad:y}))}(j,O);var C=++yt;Ft().then((function(){C===yt&&function(t,e){var a=e.field,r=e.isCounties,o=e.stateFips,i=t.groups,c=!r,s=Object(g.a)("#svg-map"),l=s.node().getBoundingClientRect(),u=l.width,v=l.height,h=u,b=v,w=Object(P.a)().translate([h/2,b/2]).scale(h),y=Object(x.a)().projection(w),k=tt[a],j=nt[B.time];Object(g.a)("#map-title").text("Map of ".concat(k,", ").concat(j));var O=s.select("#map-g").attr("width",h).attr("height",b),C=[];if(r){var N=String(Number(o));C=H.filter((function(t){var e=String(t.id);return N===e.substring(0,4===e.length?1:2)}))}var T=r?_.filter((function(t){return t.id===Number(o)})):_,E=Boolean(T.length);Object(g.a)("#map-no-data").classed("shown",!E),Object(g.a)("#viz-map-header").style("opacity",E?1:0);var L=function(t,e){var n={},a=null!=t[0].values[0].tests,r=ft(a);return t.forEach((function(t){var e=t.values;if(e.length){var o=e[0],i=o.fips,c=o.pop,s={fips:i,pop:c,label:t.key,cases:Object(p.a)(e,(function(t){return t.newCases})),deaths:Object(p.a)(e,(function(t){return t.newDeaths})),newCases:Object(f.a)(e,(function(t){return t.newCases})),newDeaths:Object(f.a)(e,(function(t){return t.newDeaths}))};a&&(s.positive=Object(p.a)(e,(function(t){return t.newPositive})),s.negative=Object(p.a)(e,(function(t){return t.newNegative})),s.tests=s.positive+s.negative,s.positivePct=s.positive/s.tests,s.negativePct=s.negative/s.tests,s.newPositive=Object(f.a)(e,(function(t){return t.newPositive})),s.newNegative=Object(f.a)(e,(function(t){return t.newNegative})),s.newTests=s.newPositive+s.newNegative,s.newPositivePct=s.newPositive/s.newTests,s.newNegativePct=s.newNegative/s.newTests);var l=c/1e5;r.forEach((function(t){"number"==typeof s[t]&&(s[gt(t)]=s[t]/l)})),n[Number(i)]=s}})),e.map((function(t){var e=ot[t.id]||t.id,a=n[e];return F({id:t.id,feature:t},a)}))}(i,r?C:T),M=[];L.forEach((function(t){var e=t[a];"number"==typeof e&&e>0&&M.push(e)})),0===M.length&&M.push(1);var S=Object(d.a)(M),A=D()().domain(M).range(jt);function Y(t){var e=t[a];return null!=e&&0!==e?A(e):"#999"}!function(t,e){Object(g.a)("#map-legend").selectAll(".map-legend-item").data([0,e].concat(t)).join((function(t){var e=t.append("div").attr("class","map-legend-item");return e.append("div").classed("map-legend-item-label",!0),e}),(function(t){return t}),(function(t){return t.remove()})).each((function(t,e){W()(this).css("background-color",0===e?"#999":jt[e-1])})).select(".map-legend-item-label").text((function(t){return Et(t,2)}))}(A.clusters(),S);var I=O.select("#map-states").selectAll(".map-state").data(r?T:L,(function(t){return t.id})).join((function(t){return t.append("path").attr("opacity",0).attr("class","map-state map-feat")}),(function(t){return t}),(function(t){t.transition().duration(350).attr("opacity",0).remove()}));I.attr("d",(function(t){return y(t.feature)})).transition().duration(Ot?0:350).attr("opacity",1).attr("fill",r?"#999":Y);var V=O.select("#map-counties").selectAll(".map-county").data(r?L:[],(function(t){return t.id})).join((function(t){return t.append("path").attr("opacity",0).attr("class",(function(t){return"map-county map-county-".concat(t.id," map-feat")}))}),(function(t){return t}),(function(t){t.transition().duration(350).attr("opacity",0).remove()})).attr("d",(function(t){return y(t.feature)})).attr("fill",Y);V.transition().duration(Ot?0:350).attr("opacity",1),O.select("#map-state-borders").datum(U).attr("d",y).attr("opacity",r?0:1);var z=r?V:I;function R(t){var e=m.b;t.label&&function(t){var e=t.value;xt(F(F({},t),{},{title:e.label,subtitle:nt[B.time],fieldLabels:tt}))}({value:t,field:a,evt:e,allowDrilldown:c&&!G})}var X=Object(g.a)("#map-backdrop");X.attr("width",u).attr("height",v),X.on("click",(function(){r&&It("all")})),n?z.on("click",(function(t){m.b.stopPropagation(),R(t)})).on("mouseleave",(function(){Ct()})):z.on("click",(function(t){It(c?t.label:"all")})).on("mouseenter",R).on("mouseleave",(function(){Ct()}));var K=Ot?O:O.transition().duration(750);if(r&&T.length){var q=r?y.bounds(T[0]):null,J=q[1][0]-q[0][0],Q=q[1][1]-q[0][1],$=(q[0][0]+q[1][0])/2,Z=(q[0][1]+q[1][1])/2,et=.9/Math.max(J/h,Q/b),at=[h/2-et*$,b/2-et*Z];K.attr("transform","translate("+at+")scale("+et+")")}else K.attr("transform","translate(0)scale(1)");Ot=!1}(j,O)}))}var jt=["#49006a","#672682","#874694","#a666a0","#c588a6","#e3aba6","#ffd09f"].reverse(),Ot=!0;function Pt(t,e,a){var s=a.field,l=a.datesToShow,u=a.allowDrilldown,f=a.chartWidth,p=a.chartHeight,d=a.cellLabelX,P=a.cellLabelY,x=a.barPad,C=e.groups,D=e.extents,N=B.useLog?k.a:j.a,T=Object(O.a)().domain(Object(v.a)(l.length))[l.length>=90?"range":"rangeRound"]([0,f]).paddingInner(Math.floor(x*l.length*100/f)/100).paddingOuter(0),E=T.bandwidth(),L=l.map((function(t,e){return T(e)+E/2}));function M(t){var e=[0,Math.max(t[1],B.per100k?.1:10)];if(B.useLog){var n=Math.max(t[0],0)||(B.per100k?.01:1);for(e[0]=1;e[0]>=n;)e[0]/=10}return N().domain(e).range([p,0]).nice()}function S(t){var e=t.domain()[1],n=4;for(B.useLog&&(n=B.per100k?3:e<100?1:e<1e3?2:e<1e4?3:4);t.ticks(n).length>5;)n--;return Object(y.a)(t).ticks(n).tickSizeInner(-f).tickSizeOuter(0).tickFormat((function(t){return Et(t).replace(/^0\./,".")}))}var A=M(D[s]),Y=S(A),W=t.selectAll("g.cell"),I=0;W.each((function(t,e){var a=this,v=Object(g.a)(this),y=C[e];if(y){I++;var k=y.values;v.append("line").attr("class","baseline").attr("y1",p).attr("y2",p).attr("x2",f);var j,O=A,x=Y;if(!B.consistentY){var D=Object(h.a)(k,(function(t){return t[s]}));if(et[s]){var N=mt(s),W=Object(h.a)(k,(function(t){return t[N]}));D=Object(h.a)(D.concat(W))}x=S(O=M(D))}v.append("g").attr("transform","translate(0,0)").call(x),G?(j="newTests"===B.field?["newPositive","newNegative"]:["positive","negative"],B.per100k&&(j=j.map(gt))):j=[s];var V=Object(i.a)().keys(j)(k),z=v.selectAll("g.layer").data(V,(function(t){return t.key})).enter().append("g").attr("class",(function(t,e){return"layer layer-".concat(e+1," layer-").concat(t.key)}));if("all"!==B.time)z.selectAll(".bar").data((function(t){return t}),(function(t){return String(t.data.date.getTime())})).enter().append("rect").attr("class","bar").attr("width",E).attr("x",(function(t,e){return T(e)})).attr("y",(function(t){var e=O(t[1]);return Number.isNaN(e)?p:e})).attr("height",(function(t){var e=Math.max(p-O(t[1]-t[0]),0);return Number.isNaN(e)?0:e}));else if(j.length>1){var _=Object(c.a)().x((function(t,e){return T(e)})).y0((function(t){return O(Math.max(t[0]||0,0))})).y1((function(t){return O(Math.max(t[1]||0,0))}));z.append("path").attr("class","area").attr("d",_)}else et[s]||X(s,"chart-line");et[s]?X(mt(s),"chart-line ma-line"):v.selectAll(".ma-line").remove();var R=v.append("line").attr("y1",0).attr("y2",p).attr("class","crosshair crosshair-hidden"),U=v.append("rect").attr("class","pointer").attr("width",f).attr("height",p);n?U.on("click",(function(){m.b.stopPropagation(),H.call(a)})):U.on("mousemove",H).on("click",K),v.on("mouseleave",(function(){R.classed("crosshair-hidden",!0),Ct()})),v.append("text").text(C.length>1?"".concat(I,". ").concat(y.key):y.key).attr("x",d).attr("y",P).attr("class","cell-label").on("click",K),B.per100k&&y.noPopulation&&v.append("text").text("No population data").attr("x",f/2).attr("y",p/2).attr("class","cell-label-nopop")}function X(t,e){var n=E/2,a=Object(r.a)().x((function(t,e){return Math.round(T(e)+n)})).y((function(e){var n=Math.min(Math.floor(O(e[t])),p);return Number.isNaN(n)?p:n})).curve(o.a);v.append("path").attr("class",e).datum(k).attr("d",a)}function H(){var t=m.b,e=Object(w.a)(this)[0],n=Object(b.a)(L,e),a=L[n-1],r=L[n],o=null==a||Math.abs(e-r)<Math.abs(e-a)?n:n-1,i=l[o],c=k.find((function(t){return t.date.getTime()===i.getTime()}));if(c&&(c!==J||!Q)){var f=Math.round(T(o)+E/2);R.attr("x1",f).attr("x2",f).classed("crosshair-hidden",!1),function(t){var e=t.value;xt(F(F({},t),{},{title:Tt(e.date),fieldLabels:Z}))}({value:c,field:s,evt:t,allowDrilldown:u&&!G})}}function K(){u&&(It(y.key),Vt("#viz"))}})),W.append("text").attr("class","x-tick x-tick-start").attr("text-anchor","start").attr("x",0).attr("y",p+4).text(Nt(l[0])),W.append("text").attr("class","x-tick x-tick-end").attr("text-anchor","end").attr("x",f).attr("y",p+4).text(Nt(wt(l)))}function xt(t){clearTimeout($);var e=t.value,n=t.field,a=t.evt,r=t.allowDrilldown,o=t.title,i=t.subtitle,c=t.fieldLabels;J=e,Q=!0;var s=a.pageX,l=a.pageY,u=a.clientY,f={left:"",right:"",top:"",bottom:"",transform:""},p=window.innerWidth,d=window.innerHeight,v=document.body.getBoundingClientRect().height,h=s-250>0,b=s+250<p,g=u-250>0,m=u-250<d;g?f.bottom="".concat(v-l+10,"px"):f.top="".concat(l+10,"px"),b?f.left="".concat(s+10,"px"):h?f.right="".concat(p-s+10,"px"):g||!m?(f.left=s,f.transform="translateX(-50%)",f.bottom="".concat(v-l+10,"px")):m&&(f.left=s,f.transform="translateX(-50%)",f.top="".concat(l+10,"px"));var w,y=G,k=y?"col-3":"col-2";w="tests"===B.field?[{key:"positive",color:"primary1",pct:e.positivePct},{key:"negative",color:"primary2",pct:e.negativePct},{key:"cases"},{key:"deaths"}]:"newTests"===B.field?[{key:"newPositive",color:"primary1",pct:e.newPositivePct},{key:"newNegative",color:"primary2",pct:e.newNegativePct},{key:"newCases"},{key:"newDeaths"}]:["cases","deaths","newCases","newDeaths"].map((function(t){return{key:t,color:t===n?"primary1":null}})),B.per100k&&(w=w.map((function(t){return F(F({},t),{},{key:gt(t.key),suffix:" per 100k",formatter:St})})),null!=e.pop&&w.push({key:"pop"}));var j=w.map((function(t){var n,a=t.formatter||Yt,r=e[t.key];return null==r?"":'\n        \t<div class="tooltip-dp-label '.concat(t.color||"",'">').concat(c[t.key],'</div>\n        \t<div class="tooltip-dp-val">').concat(a(r)).concat(t.suffix||"","</div>\n          ").concat(y?'\n            <div class="tooltip-dp-pct">\n              '.concat(null!=(n=t.pct)?"(".concat(Wt(n),")"):"","\n            </div>\n          "):"","\n        \t")})),O=r?'<div class="tooltip-drill"><span class="click">Click</span><span class="tap">Tap</span><span> to see counties</span></div>':"";W()("#tooltip").addClass("shown").toggleClass("clickable",r).css(f).html("<div><h4>".concat(o,"</h4>\n        ").concat(i?"<h5>".concat(i,"</h5>"):"",'\n              <div class="tooltip-grid ').concat(k,'">\n                ').concat(j.join(""),"\n              </div>\n              ").concat(O,"</div>"))}function Ct(){$=setTimeout(Dt,n?500:50)}function Dt(){W()("#tooltip").removeClass("shown"),Q=!1}function Nt(t){return t.toLocaleString("default",{month:"short",day:"numeric"})}function Tt(t){return t.toLocaleString("default",{year:"numeric",month:"long",day:"numeric"})}function Et(t,e){var n;return t>=1e6?(t/=1e6,n="m"):t>=1e3&&(t/=1e3,n="k"),void 0!==e&&(t=parseFloat(t.toPrecision(e))),n?"".concat(t).concat(n):String(t)}var Lt=Object(s.a)(",.1f"),Mt=Object(s.a)(",.2f");function St(t){return t>=1?Lt(t):Mt(t)}var At=Object(s.a)(",d");function Yt(t){return At(t)}var Wt=Object(s.a)(".1%");function It(t){ut.push(X({},it.state,t))}function Vt(t){var e=document.querySelector(t);e&&e.scrollIntoView||window.scrollTo(0,0),e.getBoundingClientRect().top>=0||e.scrollIntoView({behavior:"smooth",block:"start"})}var zt=0;function _t(){zt++,W()(".wrapper").addClass("loading")}function Rt(){--zt<=0&&(W()(".wrapper").removeClass("loading"),zt=0)}var Ut=E()((function(){S&&kt(S)}),100);function Ft(){return Ft.promise||(Ft.promise=Object(l.a)("assets/us-counties.topojson").then((function(t){_=V.a(t,t.objects.states).features,U=V.b(t,t.objects.states,(function(t,e){return t!==e})),H=V.a(t,t.objects.counties).features}))),Ft.promise}window.addEventListener("resize",Ut);var Xt=Object(N.a)((function(){return new Promise((function(t,e){Object(u.a)("assets/fips-pop-sta.csv").then((function(e){var n=pt(e);t(n)})).catch(e)}))})),Ht=Object(N.a)((function(){return new Promise((function(t,e){Object(u.a)("assets/fips-pop-cty.csv").then((function(e){var n=pt(e);t(n)})).catch(e)}))})),Bt=Object(N.a)((function(t){return new Promise((function(e,n){var r="all"===t?"all":"90d";Promise.all([Object(u.a)("https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/state/".concat(r,".csv")),Xt()]).then((function(t){var n=z(t,2);!function(t,e){var n=dt(Object(a.a)().key((function(t){return t.state})).entries(t),e,!0);C=[],n.forEach((function(t){"US"===t.key?(t.key="United States",L=[t]):(Y[t.key]||(Y[t.key]=t.values[0].fips),C.push(t))}))}(n[0],n[1]),function t(e){if(!t.populated){t.populated=!0;var n=e.slice(0).sort((function(t,e){return t.key.localeCompare(e.key)})).map((function(t){return'<option value="'.concat(t.key,'">').concat(t.key,"</option>")})).join("");W()("#state-select").html('<option value="all" selected>All States</option>'.concat(n)),"all"!==B.state&&W()("#state-select").val(B.state)}}(C),e()})).catch(n)}))})),Kt=Object(N.a)((function(t,e){return new Promise((function(n,r){qt().then((function(){var o="all"===e?"all":"90d",i=Y[t];i?Promise.all([Object(u.a)("https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/county/".concat(o,"/").concat(i,".csv")),Ht()]).then((function(t){var e=z(t,2);!function(t,e){var n=Object(a.a)().key((function(t){return t.state})).entries(t),r={};n.forEach((function(t){var n=dt(Object(a.a)().key((function(t){return t.county})).entries(t.values),e,!1);r[t.key]={key:t.key,counties:n}})),T=r}(e[0],e[1]),n()})).catch(r):r(new Error("Could not find fips for state ".concat(t)))})).catch(r)}))}));function qt(){return Bt(B.time)}function Jt(){_t(),qt().then((function(){kt({groups:C,overview:L}),W()(".back-to-states").removeClass("shown"),Dt(),Rt()})).catch((function(t){console.error(t),Rt()}))}function Qt(t){_t(),function(t){return Kt(t,B.time)}(t).then((function(){!function(t){var e=T[t],n=C.filter((function(e){return e.key===t})),a=n?n[0].values[0].fips:null;kt({groups:e.counties,overview:n,isCounties:!0,stateFips:a}),W()(".back-to-states").addClass("shown"),Dt()}(t),Rt()})).catch((function(t){console.error(t),Rt()}))}"all"===B.state?Jt():Qt(B.state),W()("#state-select").change((function(){It(W()(this).val())})),W()(".back-to-states").click((function(){It("all"),Vt("#viz-map")})),W()("#field-select").change((function(){ut.push(X({},it.field,W()(this).val()))})),W()("#time-select").change((function(){ut.push(X({},it.time,W()(this).val()))})),W()("#tooltip").click((function(t){t.stopPropagation(),W()(this).is(".clickable")&&J&&(It(J.state||J.label),J.label||Vt("#viz"))})),W()("#cb-use-log-scale").change((function(){var t=W()(this).is(":checked");ut.push(X({},it.useLog,t?"1":"0"))})),W()("#cb-per-100k").change((function(){var t=W()(this).is(":checked");ut.push(X({},it.per100k,t?"1":"0"))})),W()("#cb-consistent-y").change((function(){var t=W()(this).is(":checked");ut.push(X({},it.consistentY,t?"1":"0"))})),W()(document).on("click",(function(){Ct()}))}()}});
//# sourceMappingURL=main.9e45bc4bbba78cfd2120.js.map