!function(t){function e(e){for(var a,c,i=e[0],s=e[1],l=e[2],f=0,p=[];f<i.length;f++)c=i[f],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&p.push(r[c][0]),r[c]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);for(u&&u(e);p.length;)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,i=1;i<n.length;i++){var s=n[i];0!==r[s]&&(a=!1)}a&&(o.splice(e--,1),t=c(c.s=n[0]))}return t}var a={},r={0:0},o=[];function c(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=t,c.c=a,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(n,a,function(e){return t[e]}.bind(null,a));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="dist";var i=window.webpackJsonp=window.webpackJsonp||[],s=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=s;o.push(["Vtdi",1]),n()}({OMi8:function(t,e,n){},Vtdi:function(t,e,n){"use strict";n.r(e);var a=n("bwSX"),r=n("+ugm"),o=n("pL0w"),c=n("wIsI"),i=n("44y/"),s=n("EjHT"),l=n("nWpo"),u=n("8cru"),f=n("V183"),p=n("OWWo"),d=n("mrVq"),h=n("NltA"),v=n("wz8V"),m=n("h8nK"),b=n("AKWm"),g=n("AWXE"),y=n("4k54"),w=n("RhHs"),k=n("n0hd"),j=n("VIqg"),O=n("sCaM"),x=n("aj5g"),C=n("vHEj"),D=n("KU4y"),P=n.n(D),E=n("Wwog"),M=n("DzJC"),S=n.n(M),T=n("mVx/"),L=n.n(T),N=n("ytg1"),A=n.n(N),Y=n("EVdn"),W=n.n(Y),I=n("LhCv"),V=n("0hfp");n("OMi8"),n("sQjb");function _(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],a=!0,r=!1,o=void 0;try{for(var c,i=t[Symbol.iterator]();!(a=(c=i.next()).done)&&(n.push(c.value),!e||n.length!==e);a=!0);}catch(t){r=!0,o=t}finally{try{a||null==i.return||i.return()}finally{if(r)throw o}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return z(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return z(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function z(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function R(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function U(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function F(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?U(Object(n),!0).forEach((function(e){X(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):U(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function X(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}!function(){var t,e,n="ontouchstart"in document.documentElement;n&&W()(document.body).addClass("touch");var D=null,M=null,T=null,N=null,Y={},z=null,U=null,H=null,B={state:"state",field:"field",time:"time",useLog:"log",per100k:"per100k",consistentY:"consistentY"},K={state:"all",field:"newCases",time:"1mo",useLog:!1,per100k:!0,consistentY:!0},q=F({},K),J=new Date(2020,0,21),Q=null,$=null,G=null,Z=null,tt={cases:"Total Cases",deaths:"Total Deaths",newCases:"New Cases",newDeaths:"New Deaths",pop:"Est. Population"};Object.keys(tt).forEach((function(t){tt[vt(t)]=tt[t]}));var et=F({},tt);Object.keys(et).forEach((function(t){0===t.indexOf("new")&&(et[t]="Avg ".concat(et[t].replace("New","Daily")))}));var nt=(X(t={newCases:!0,newDeaths:!0},vt("newCases"),!0),X(t,vt("newDeaths"),!0),t),at={"7d":"Last 7 days","14d":"Last 14 days","1mo":"Last 30 days","90d":"Last 90 days",all:"All-time"},rt={"New York City":"36061","Kansas City":"29999"},ot=(X(e={},"29999",505604),X(e,"29037",103525),X(e,"29095",386437),X(e,"29047",108919),X(e,"29165",48783),X(e,"36061",8336817),e),ct={36005:"36061",36047:"36061",36081:"36061",36085:"36061"};function it(t){for(var e="?"===t[0]?t.substring(1):t,n=e?e.split("&"):[],a={},r=0;r<n.length;r++){var o=_(n[r].split("=").map(decodeURIComponent),2),c=o[0],i=o[1];a[c]=i}return a}function st(t){var e=Object.keys(t).map((function(e){return"".concat(encodeURIComponent(e),"=").concat(encodeURIComponent(t[e]))})).join("&");return e?"?".concat(e):""}var lt=new(function(){function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.history=e,this.history.listen((function(){n.parse(),"all"===q.state?Bt():Kt(q.state)}))}var e,n,a;return e=t,(n=[{key:"parse",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=it(this.history.location.search),n=Object.keys(B),a=0;a<n.length;a++){var r=n[a],o=B[r],c=null!=e[o]?e[o]:K[r];if("boolean"==typeof K[r]&&"string"==typeof c&&(c="1"===c),q[r]!==c||t)switch(r){case"state":c=c.replace("+"," "),q.state=c,W()("#state-select").val(c);break;case"field":tt[c]&&(q.field=c,W()("#field-select").val(c));break;case"time":q.time=c,W()("#time-select").val(c);break;case"useLog":q.useLog=c,W()("#cb-use-log-scale").prop("checked",c);break;case"per100k":q.per100k=c,W()("#cb-per-100k").prop("checked",c);break;case"consistentY":q.consistentY=c,W()("#cb-consistent-y").prop("checked",c)}}}},{key:"push",value:function(t){this._update("push",t)}},{key:"replace",value:function(t){this._update("replace",t)}},{key:"_update",value:function(t,e){var n=F(F({},it(this.history.location.search)),e);this.history[t]({search:st(n)})}}])&&R(e.prototype,n),a&&R(e,a),t}())(I.a());function ut(t){var e=Object.assign({},ot);return t.forEach((function(t){var n=ct[t.fips]||t.fips;e[n]=ot[n]?ot[n]:parseInt(t.pop)})),e}function ft(t,e){var n=["cases","deaths","newCases","newDeaths"];return t.forEach((function(t){for(var a=[],r=function(r){var o=t.values[r],c=_(o.date.split("-"),3),i=c[0],s=c[1],l=c[2],u=o.fips;!u&&o.county&&(u=rt[o.county]);var f=F(F({},o),{},{fips:u,date:new Date(Number(i),Number(s)-1,Number(l)),cases:Number(o.cases),deaths:Number(o.deaths),newCases:Number(o.newCases)});n.forEach((function(t){var e;f[t]=null==(e=f[t])?null:Number(e)})),a.push(f);var p=e[f.fips];if(p){f.pop=p;var d=p/1e5;n.forEach((function(t){"number"==typeof f[t]&&(f[vt(t)]=f[t]/d)}))}else t.noPopulation=!0;(null===Q||f.date.getTime()>Q.getTime())&&(Q=f.date)},o=0;o<t.values.length;o++)r(o);t.values=a})),t}function pt(t,e){var n=["cases","deaths","newCases","newDeaths"],a=n.concat(n.map(vt)),r=["newCases","newDeaths"];r=r.concat(r.map(vt));var o={},c=["date"].concat(a);c.forEach((function(t){return o[t]=[null,null]}));var i=new Date(e[0]);i.setDate(i.getDate()-7);var s=function(t){return t.date.getTime()};return{groups:t.map((function(t){var n=t.values,a=[],l=e[0],u=bt(e),p=new Date(i),d=A()(n,{date:i},s),h={};r.forEach((function(t){h[t]=[]}));for(var v=function(){var t=p.getTime()>=l.getTime(),e=n[d],o=e&&e.date.getTime()===p.getTime()?e:null,c={};r.forEach((function(t){var n=h[t];7===n.length&&n.shift(),o&&"number"==typeof o[t]?n.push(e[t]):n.push(0),c[mt(t)]=Object(f.a)(n)})),t&&(o?a.push(Object.assign({},o,c)):a.push(Object.assign({date:new Date(p),fips:n[0].fips,pop:n[0].pop,state:n[0].state,county:n[0].county},c))),o&&d++,p.setDate(p.getDate()+1)};p.getTime()<=u.getTime();)v();return a.forEach((function(t){c.forEach((function(e){var n=o[e],a=t[e];if(null!=a&&(null===n[0]||a<n[0])&&(n[0]=a),null!=a&&(null===n[1]||a>n[1])&&(n[1]=a),nt[e]){var r=t[mt(e)];null!=r&&(null===n[1]||r>n[1])&&(n[1]=r)}}))})),F(F({},t),{},{values:a})})),extents:o}}lt.parse(!0);var dt=Object(E.a)(pt),ht=Object(E.a)(pt);function vt(t){return"".concat(t,"_p100k")}function mt(t){return"".concat(t,"_ma")}function bt(t){return t[t.length-1]}var gt=0;function yt(t){N=t;var e,a,r,o,c,i=t.groups,s=t.overview,l=t.isCounties,u=t.stateFips,v=q.per100k?vt(q.field):q.field;"7d"===q.time?e=7:"14d"===q.time?e=14:"1mo"===q.time?e=30:"90d"===q.time?e=90:(a=Q,r=J,o=Date.UTC(r.getFullYear(),r.getMonth(),r.getDate()),c=Date.UTC(a.getFullYear(),a.getMonth(),a.getDate()),e=Math.floor((c-o)/864e5));for(var m=[Q],y=1;y<e;y++){var w=new Date(Q);w.setDate(Q.getDate()-y),m.unshift(w)}var k=ht(s,m),j=dt(i,m),O={field:v,datesToShow:m,isCounties:l,stateFips:u};!function(){var t=q.field;"newCases"===t||"newDeaths"===t?(W()(".ma-legend .legend-field-label").text(tt[t]+(q.per100k?" per 100K":"")),W()(".ma-legend").show()):W()(".ma-legend").hide()}(),function(t,e){var n=Object(b.a)("#svg-overview"),a=n.node().getBoundingClientRect(),r=a.width,o=a.height,c=n.select("g.cell");c.selectAll("*").remove();var i=window.innerWidth>=1024,s=i?40:30,l=r-s-16,u=o-(i?20:14);c.attr("transform","translate(".concat(s,", 0)")),jt(n,t,F(F({},e),{},{allowDrilldown:!1,chartWidth:l,chartHeight:u,cellLabelX:6,cellLabelY:0,barPad:3}))}(k,O),function(t,e){var n=e.field,a=e.datesToShow,r=Object(b.a)("#grid");r.selectAll("*").remove(),r.attr("class",q.consistentY?"consistent-y":"");var o=t.groups.slice(0),c=window.innerWidth>=1024,i=c?30:25,s=c?40:35,l=c?250:150,u=Math.floor(window.innerWidth/(l+i)),f=Math.floor((window.innerWidth-i*(u+1))/u),d=o.length,v=Math.floor(f/2.15),m=c?40:30,g=c?20:14,y=window.innerWidth,w=a.length>10?1:2,k=f+i,j=v+g+s,O=Math.ceil(d/u),x=O*j,C=!e.isCounties;o.forEach((function(t){if(0===n.indexOf("new"))t.sortVal=Object(p.a)(t.values,(function(t){return t[n]}));else{var e=L()(t.values,(function(t){return null!=t[n]}));t.sortVal=e?e[n]:-1}})),o.sort((function(t,e){return e.sortVal-t.sortVal})),r.attr("viewBox",[0,0,y,x]).selectAll("g.row").data(Object(h.a)(O)).enter().append("g").attr("class","row").attr("transform",(function(t){return"translate(".concat(m,", ").concat(t*j,")")})).each((function(t){var e=(t+1)*u>o.length?o.length%u:u,n=Object(h.a)(e).map((function(e){return{row:t,col:e}}));Object(b.a)(this).selectAll("g.cell").data(n).enter().append("g").attr("class","cell").classed("cell-clickable",C).attr("transform",(function(t){return"translate(".concat(t.col*k,", 0)")}))})),jt(r,F(F({},t),{},{groups:o}),F(F({},e),{},{allowDrilldown:C,chartWidth:f,chartHeight:v,cellLabelX:-20,cellLabelY:-10,barPad:w}))}(j,O);var D=++gt;zt().then((function(){D===gt&&function(t,e){var a=e.field,r=e.isCounties,o=e.stateFips,c=t.groups,i=!r,s=Object(b.a)("#svg-map"),l=s.node().getBoundingClientRect(),u=l.width,h=l.height,v=u,m=h,y=Object(x.a)().translate([v/2,m/2]).scale(v),w=Object(C.a)().projection(y),k=et[a];q.per100k&&(k+=" per 100K");var j=at[q.time];Object(b.a)("#map-title").text("Map of ".concat(k,", ").concat(j));var O=s.select("#map-g").attr("width",v).attr("height",m),D=[];if(r){var E=String(Number(o));D=H.filter((function(t){var e=String(t.id);return E===e.substring(0,4===e.length?1:2)}))}var M=r?z.filter((function(t){return t.id===Number(o)})):z,S=Boolean(M.length);Object(b.a)("#map-no-data").classed("shown",!S),Object(b.a)("#viz-map-header").style("opacity",S?1:0);var T=function(t,e){var n={},a=["cases","deaths","newCases","newDeaths"];return t.forEach((function(t){var e=t.values;if(e.length){var r=e[0],o=r.fips,c=r.pop,i={fips:o,pop:c,label:t.key,cases:Object(p.a)(e,(function(t){return t.newCases})),deaths:Object(p.a)(e,(function(t){return t.newDeaths})),newCases:Object(f.a)(e,(function(t){return t.newCases})),newDeaths:Object(f.a)(e,(function(t){return t.newDeaths}))},s=c/1e5;a.forEach((function(t){"number"==typeof i[t]&&(i[vt(t)]=i[t]/s)})),n[Number(o)]=i}})),e.map((function(t){var e=ct[t.id]||t.id,a=n[e];return F({id:t.id,feature:t},a)}))}(c,r?D:M),L=[];T.forEach((function(t){var e=t[a];"number"==typeof e&&e>0&&L.push(e)})),0===L.length&&L.push(1);var N=Object(d.a)(L),A=P()().domain(L).range(wt);function Y(t){var e=t[a];return null!=e&&0!==e?A(e):"#999"}!function(t,e){Object(b.a)("#map-legend").selectAll(".map-legend-item").data([0,e].concat(t)).join((function(t){var e=t.append("div").attr("class","map-legend-item");return e.append("div").classed("map-legend-item-label",!0),e}),(function(t){return t}),(function(t){return t.remove()})).each((function(t,e){W()(this).css("background-color",0===e?"#999":wt[e-1])})).select(".map-legend-item-label").text((function(t){return Et(t,2)}))}(A.clusters(),N);var I=O.select("#map-states").selectAll(".map-state").data(r?M:T,(function(t){return t.id})).join((function(t){return t.append("path").attr("opacity",0).attr("class","map-state map-feat")}),(function(t){return t}),(function(t){t.transition().duration(350).attr("opacity",0).remove()}));I.attr("d",(function(t){return w(t.feature)})).transition().duration(kt?0:350).attr("opacity",1).attr("fill",r?"#999":Y);var V=O.select("#map-counties").selectAll(".map-county").data(r?T:[],(function(t){return t.id})).join((function(t){return t.append("path").attr("opacity",0).attr("class",(function(t){return"map-county map-county-".concat(t.id," map-feat")}))}),(function(t){return t}),(function(t){t.transition().duration(350).attr("opacity",0).remove()})).attr("d",(function(t){return w(t.feature)})).attr("fill",Y);V.transition().duration(kt?0:350).attr("opacity",1),O.select("#map-state-borders").datum(U).attr("d",w).attr("opacity",r?0:1);var _=r?V:I;function R(t){var e=g.b;t.label&&function(t){var e=t.value;Ot(F(F({},t),{},{title:e.label,subtitle:at[q.time],fieldLabels:et}))}({value:t,field:a,evt:e,allowDrilldown:i})}var X=Object(b.a)("#map-backdrop");X.attr("width",u).attr("height",h),X.on("click",(function(){r&&At("all")})),n?_.on("click",(function(t){g.b.stopPropagation(),R(t)})).on("mouseleave",(function(){xt()})):_.on("click",(function(t){At(i?t.label:"all")})).on("mouseenter",R).on("mouseleave",(function(){xt()}));var B=kt?O:O.transition().duration(750);if(r&&M.length){var K=r?w.bounds(M[0]):null,J=K[1][0]-K[0][0],Q=K[1][1]-K[0][1],$=(K[0][0]+K[1][0])/2,G=(K[0][1]+K[1][1])/2,Z=.9/Math.max(J/v,Q/m),tt=[v/2-Z*$,m/2-Z*G];B.attr("transform","translate("+tt+")scale("+Z+")")}else B.attr("transform","translate(0)scale(1)");kt=!1}(j,O)}))}var wt=["#49006a","#672682","#874694","#a666a0","#c588a6","#e3aba6","#ffd09f"].reverse(),kt=!0;function jt(t,e,a){var s=a.field,l=a.datesToShow,u=a.allowDrilldown,f=a.chartWidth,p=a.chartHeight,d=a.cellLabelX,x=a.cellLabelY,C=a.barPad,D=e.groups,P=e.extents,E=q.useLog?k.a:j.a,M=Object(O.a)().domain(Object(h.a)(l.length))[l.length>=90?"range":"rangeRound"]([0,f]).paddingInner(Math.floor(C*l.length*100/f)/100).paddingOuter(0),S=M.bandwidth(),T=l.map((function(t,e){return M(e)+S/2}));function L(t){var e=[0,Math.max(t[1],q.per100k?.1:10)];if(q.useLog){var n=Math.max(t[0],0)||(q.per100k?.01:1);for(e[0]=1;e[0]>=n;)e[0]/=10}return E().domain(e).range([p,0]).nice()}function N(t){var e=t.domain()[1],n=4;for(q.useLog&&(n=q.per100k?3:e<100?1:e<1e3?2:e<1e4?3:4);t.ticks(n).length>5;)n--;return Object(w.a)(t).ticks(n).tickSizeInner(-f).tickSizeOuter(0).tickFormat((function(t){return Et(t).replace(/^0\./,".")}))}var A=L(P[s]),Y=N(A),W=t.selectAll("g.cell"),I=0;W.each((function(t,e){var a=this,h=Object(b.a)(this),w=D[e];if(w){I++;var k=w.values;h.append("line").attr("class","baseline").attr("y1",p).attr("y2",p).attr("x2",f);var j=A,O=Y;if(!q.consistentY){var C=Object(v.a)(k,(function(t){return t[s]}));if(nt[s]){var P=mt(s),E=Object(v.a)(k,(function(t){return t[P]}));C=Object(v.a)(C.concat(E))}O=N(j=L(C))}h.append("g").attr("transform","translate(0,0)").call(O);var W=[s],V=Object(c.a)().keys(W)(k),_=h.selectAll("g.layer").data(V,(function(t){return t.key})).enter().append("g").attr("class",(function(t,e){return"layer layer-".concat(e+1," layer-").concat(t.key)}));if("all"!==q.time)_.selectAll(".bar").data((function(t){return t}),(function(t){return String(t.data.date.getTime())})).enter().append("rect").attr("class","bar").attr("width",S).attr("x",(function(t,e){return M(e)})).attr("y",(function(t){var e=j(t[1]);return Number.isNaN(e)?p:e})).attr("height",(function(t){var e=Math.max(p-j(t[1]-t[0]),0);return Number.isNaN(e)?0:e}));else if(W.length>1){var z=Object(i.a)().x((function(t,e){return M(e)})).y0((function(t){return j(Math.max(t[0]||0,0))})).y1((function(t){return j(Math.max(t[1]||0,0))}));_.append("path").attr("class","area").attr("d",z)}else nt[s]||X(s,"chart-line");nt[s]?X(mt(s),"chart-line ma-line"):h.selectAll(".ma-line").remove();var R=h.append("line").attr("y1",0).attr("y2",p).attr("class","crosshair crosshair-hidden"),U=h.append("rect").attr("class","pointer").attr("width",f).attr("height",p);n?U.on("click",(function(){g.b.stopPropagation(),H.call(a)})):U.on("mousemove",H).on("click",B),h.on("mouseleave",(function(){R.classed("crosshair-hidden",!0),xt()})),h.append("text").text(D.length>1?"".concat(I,". ").concat(w.key):w.key).attr("x",d).attr("y",x).attr("class","cell-label").on("click",B),q.per100k&&w.noPopulation&&h.append("text").text("No population data").attr("x",f/2).attr("y",p/2).attr("class","cell-label-nopop")}function X(t,e){var n=S/2,a=Object(r.a)().x((function(t,e){return Math.round(M(e)+n)})).y((function(e){var n=Math.min(Math.floor(j(e[t])),p);return Number.isNaN(n)?p:n})).curve(o.a);h.append("path").attr("class",e).datum(k).attr("d",a)}function H(){var t=g.b,e=Object(y.a)(this)[0],n=Object(m.a)(T,e),a=T[n-1],r=T[n],o=null==a||Math.abs(e-r)<Math.abs(e-a)?n:n-1,c=l[o],i=k.find((function(t){return t.date.getTime()===c.getTime()}));if(i&&(i!==$||!G)){var f=Math.round(M(o)+S/2);R.attr("x1",f).attr("x2",f).classed("crosshair-hidden",!1),function(t){var e=t.value;Ot(F(F({},t),{},{title:Pt(e.date),fieldLabels:tt}))}({value:i,field:s,evt:t,allowDrilldown:u})}}function B(){u&&(At(w.key),Yt("#viz"))}})),W.append("text").attr("class","x-tick x-tick-start").attr("text-anchor","start").attr("x",0).attr("y",p+4).text(Dt(l[0])),W.append("text").attr("class","x-tick x-tick-end").attr("text-anchor","end").attr("x",f).attr("y",p+4).text(Dt(bt(l)))}function Ot(t){clearTimeout(Z);var e=t.value,n=t.field,a=t.evt,r=t.allowDrilldown,o=t.title,c=t.subtitle,i=t.fieldLabels;$=e,G=!0;var s,l=a.pageX,u=a.pageY,f=a.clientY,p={left:"",right:"",top:"",bottom:"",transform:""},d=window.innerWidth,h=window.innerHeight,v=document.body.getBoundingClientRect().height,m=l-250>0,b=l+250<d,g=f-250>0,y=f-250<h;g?p.bottom="".concat(v-u+10,"px"):p.top="".concat(u+10,"px"),b?p.left="".concat(l+10,"px"):m?p.right="".concat(d-l+10,"px"):g||!y?(p.left=l,p.transform="translateX(-50%)",p.bottom="".concat(v-u+10,"px")):y&&(p.left=l,p.transform="translateX(-50%)",p.top="".concat(u+10,"px")),s=0===q.field.indexOf("new")?["newCases","newDeaths"].map((function(t){return{key:t,color:t===n?"primary1":null}})):["cases","deaths"].map((function(t){return{key:t,color:t===n?"primary1":null}})),q.per100k&&(s=s.map((function(t){return F(F({},t),{},{key:vt(t.key),suffix:" per 100k",formatter:Tt})})),null!=e.pop&&s.push({key:"pop"}));var w=s.map((function(t){var n=t.formatter||Nt,a=e[t.key];return null==a?"":'\n        \t<div class="tooltip-dp-label '.concat(t.color||"",'">').concat(i[t.key],'</div>\n        \t<div class="tooltip-dp-val">').concat(n(a)).concat(t.suffix||"","</div>\n        \t")})),k=r?'<div class="tooltip-drill"><span class="click">Click</span><span class="tap">Tap</span><span> to see counties</span></div>':"";W()("#tooltip").addClass("shown").toggleClass("clickable",r).css(p).html("<div><h4>".concat(o,"</h4>\n        ").concat(c?"<h5>".concat(c,"</h5>"):"",'\n              <div class="tooltip-grid col-2">\n                ').concat(w.join(""),"\n              </div>\n              ").concat(k,"</div>"))}function xt(){Z=setTimeout(Ct,n?500:50)}function Ct(){W()("#tooltip").removeClass("shown"),G=!1}function Dt(t){return t.toLocaleString("default",{month:"short",day:"numeric"})}function Pt(t){return t.toLocaleString("default",{year:"numeric",month:"long",day:"numeric"})}function Et(t,e){var n;return t>=1e6?(t/=1e6,n="m"):t>=1e3&&(t/=1e3,n="k"),void 0!==e&&(t=parseFloat(t.toPrecision(e))),n?"".concat(t).concat(n):String(t)}var Mt=Object(s.a)(",.1f"),St=Object(s.a)(",.2f");function Tt(t){return t>=1?Mt(t):St(t)}var Lt=Object(s.a)(",d");function Nt(t){return Lt(t)}function At(t){lt.push(X({},B.state,t))}function Yt(t){var e=document.querySelector(t);e&&e.scrollIntoView||window.scrollTo(0,0),e.getBoundingClientRect().top>=0||e.scrollIntoView({behavior:"smooth",block:"start"})}var Wt=0;function It(){Wt++,W()(".wrapper").addClass("loading")}function Vt(){--Wt<=0&&(W()(".wrapper").removeClass("loading"),Wt=0)}var _t=S()((function(){N&&yt(N)}),100);function zt(){return zt.promise||(zt.promise=Object(l.a)("assets/us-counties.topojson").then((function(t){z=V.a(t,t.objects.states).features,U=V.b(t,t.objects.states,(function(t,e){return t!==e})),H=V.a(t,t.objects.counties).features}))),zt.promise}window.addEventListener("resize",_t);var Rt=Object(E.a)((function(){return new Promise((function(t,e){Object(u.a)("assets/fips-pop-sta.csv").then((function(e){var n=ut(e);t(n)})).catch(e)}))})),Ut=Object(E.a)((function(){return new Promise((function(t,e){Object(u.a)("assets/fips-pop-cty.csv").then((function(e){var n=ut(e);t(n)})).catch(e)}))})),Ft=Object(E.a)((function(t){return new Promise((function(e,n){var r="all"===t?"all":"90d";Promise.all([Object(u.a)("https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/state/".concat(r,".csv")),Rt()]).then((function(t){var n=_(t,2);!function(t,e){var n=ft(Object(a.a)().key((function(t){return t.state})).entries(t),e);D=[],n.forEach((function(t){"US"===t.key?(t.key="United States",T=[t]):(Y[t.key]||(Y[t.key]=t.values[0].fips),D.push(t))}))}(n[0],n[1]),function t(e){if(!t.populated){t.populated=!0;var n=e.slice(0).sort((function(t,e){return t.key.localeCompare(e.key)})).map((function(t){return'<option value="'.concat(t.key,'">').concat(t.key,"</option>")})).join("");W()("#state-select").html('<option value="all" selected>All States</option>'.concat(n)),"all"!==q.state&&W()("#state-select").val(q.state)}}(D),e()})).catch(n)}))})),Xt=Object(E.a)((function(t,e){return new Promise((function(n,r){Ht().then((function(){var o="all"===e?"all":"90d",c=Y[t];c?Promise.all([Object(u.a)("https://raw.githubusercontent.com/schnerd/covid-tracker-data/master/data/county/".concat(o,"/").concat(c,".csv")),Ut()]).then((function(t){var e=_(t,2);!function(t,e){var n=Object(a.a)().key((function(t){return t.state})).entries(t),r={};n.forEach((function(t){var n=ft(Object(a.a)().key((function(t){return t.county})).entries(t.values),e);r[t.key]={key:t.key,counties:n}})),M=r}(e[0],e[1]),n()})).catch(r):r(new Error("Could not find fips for state ".concat(t)))})).catch(r)}))}));function Ht(){return Ft(q.time)}function Bt(){It(),Ht().then((function(){yt({groups:D,overview:T}),W()(".back-to-states").removeClass("shown"),Ct(),Vt()})).catch((function(t){console.error(t),Vt()}))}function Kt(t){It(),function(t){return Xt(t,q.time)}(t).then((function(){!function(t){var e=M[t],n=D.filter((function(e){return e.key===t})),a=n?n[0].values[0].fips:null;yt({groups:e.counties,overview:n,isCounties:!0,stateFips:a}),W()(".back-to-states").addClass("shown"),Ct()}(t),Vt()})).catch((function(t){console.error(t),Vt()}))}"all"===q.state?Bt():Kt(q.state),W()("#state-select").change((function(){At(W()(this).val())})),W()(".back-to-states").click((function(){At("all"),Yt("#viz-map")})),W()("#field-select").change((function(){lt.push(X({},B.field,W()(this).val()))})),W()("#time-select").change((function(){lt.push(X({},B.time,W()(this).val()))})),W()("#tooltip").click((function(t){t.stopPropagation(),W()(this).is(".clickable")&&$&&(At($.state||$.label),$.label||Yt("#viz"))})),W()("#cb-use-log-scale").change((function(){var t=W()(this).is(":checked");lt.push(X({},B.useLog,t?"1":"0"))})),W()("#cb-per-100k").change((function(){var t=W()(this).is(":checked");lt.push(X({},B.per100k,t?"1":"0"))})),W()("#cb-consistent-y").change((function(){var t=W()(this).is(":checked");lt.push(X({},B.consistentY,t?"1":"0"))})),W()(document).on("click",(function(){xt()}))}()}});
//# sourceMappingURL=main.e7bf5bf2e7f260810a11.js.map