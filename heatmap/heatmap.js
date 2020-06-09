import{w as t,x as n,R as e,y as r,C as i,z as a,A as o,j as s,s as u}from"../precisionRound-200bdab7.js";import{r as c,d as l}from"../math-00efd339.js";import{a as h,t as f,f as d}from"../defaultLocale-c798c300.js";import{a as p}from"../month-a8d9f45c.js";import{e as m,l as g}from"../linear-4221f875.js";var w=6/29,b=3*w*w;function y(t){if(t instanceof v)return new v(t.l,t.a,t.b,t.opacity);if(t instanceof W)return k(t);t instanceof e||(t=r(t));var n,i,a=j(t.r),o=j(t.g),s=j(t.b),u=x((.2225045*a+.7168786*o+.0606169*s)/1);return a===o&&o===s?n=i=u:(n=x((.4360747*a+.3850649*o+.1430804*s)/.96422),i=x((.0139322*a+.0971045*o+.7141733*s)/.82521)),new v(116*u-16,500*(n-u),200*(u-i),t.opacity)}function v(t,n,e,r){this.l=+t,this.a=+n,this.b=+e,this.opacity=+r}function x(t){return t>.008856451679035631?Math.pow(t,1/3):t/b+4/29}function M(t){return t>w?t*t*t:b*(t-4/29)}function N(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function j(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function A(t){if(t instanceof W)return new W(t.h,t.c,t.l,t.opacity);if(t instanceof v||(t=y(t)),0===t.a&&0===t.b)return new W(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity);var n=Math.atan2(t.b,t.a)*c;return new W(n<0?n+360:n,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function $(t,n,e,r){return 1===arguments.length?A(t):new W(t,n,e,null==r?1:r)}function W(t,n,e,r){this.h=+t,this.c=+n,this.l=+e,this.opacity=+r}function k(t){if(isNaN(t.h))return new v(t.l,0,0,t.opacity);var n=t.h*l;return new v(t.l,Math.cos(n)*t.c,Math.sin(n)*t.c,t.opacity)}t(v,(function(t,n,e,r){return 1===arguments.length?y(t):new v(t,n,e,null==r?1:r)}),n(i,{brighter:function(t){return new v(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new v(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,n=isNaN(this.a)?t:t+this.a/500,r=isNaN(this.b)?t:t-this.b/200;return n=.96422*M(n),t=1*M(t),r=.82521*M(r),new e(N(3.1338561*n-1.6168667*t-.4906146*r),N(-.9787684*n+1.9161415*t+.033454*r),N(.0719453*n-.2289914*t+1.4052427*r),this.opacity)}})),t(W,$,n(i,{brighter:function(t){return new W(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},darker:function(t){return new W(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},rgb:function(){return k(this).rgb()}}));var B=function(t){return function(n,e){var r=t((n=$(n)).h,(e=$(e)).h),i=a(n.c,e.c),o=a(n.l,e.l),s=a(n.opacity,e.opacity);return function(t){return n.h=r(t),n.c=i(t),n.l=o(t),n.opacity=s(t),n+""}}}(o);console.time("draw heatmap"),async function(){var t=await s("../data/nyc_weather_data.json"),n=h("%Y-%m-%d");function e(t){return n(t.date)}t=t.sort((function(t,n){return e(t)-e(n)})),f("%-e");var r=f("%-w");const i=e(t[0]),a=Math.ceil(t.length/7)+1;var o={margin:{top:30,right:0,bottom:0,left:80},get width(){return.95*(window.innerWidth-this.margin.left-this.margin.right)},get boundedWidth(){return this.width-this.margin.left-this.margin.right},get height(){return 7*this.boundedWidth/a+this.margin.top+this.margin.bottom},get boundedHeight(){return this.height-this.margin.top-this.margin.bottom}},c=u("#wrapper").append("svg").attr("width",o.width).attr("height",o.height).append("g").style("transform",`translate(${o.margin.left}px, ${o.margin.top}px)`),l=function(t,n){let e;if(void 0===n)for(const n of t)null!=n&&(e>n||void 0===e&&n>=n)&&(e=n);else{let r=-1;for(let i of t)null!=(i=n(i,++r,t))&&(e>i||void 0===e&&i>=i)&&(e=i)}return e}([o.boundedWidth/a,o.boundedHeight/7]),w=f("%b"),b=(c.selectAll(".month").data(p(e(t[0]),e(t[t.length-1]))).enter().append("text").attr("class","month").attr("transform",(function(t){return`translate(${l*d(i,t).length}, -10)`})).text((function(t){return w(t)})),h("%-e")),y=f("%-A");function v(n){function a(t){return t[n]}u("#metric").text(n);var o=m(t,a),s=g().domain(o).range([0,1]).clamp(!0),h=B("#ecf0f1","#5758BB");u("#legend-min").text(o[0]),u("#legend-max").text(o[1]),u("#legend-gradient").style("background",`linear-gradient(to right, ${new Array(10).fill(null).map((function(t,n){return`${h(n/9)} ${100*n/9}%`})).join(", ")})`);var f=c.selectAll(".day").data(t,(function(t){return t.date}));f.enter().append("rect").merge(f).attr("class","day").attr("x",(function(t){return l*function(t){return d(i,e(t)).length}(t)})).attr("width",l).attr("y",(function(t){return l*function(t){return Number(r(e(t)))}(t)})).attr("height",l).style("fill",(function(t){return function(t){return h(s(t)||0)}(a(t))}));f.exit().remove()}c.selectAll(".label").data(new Array(7).fill(null).map((function(t,n){return n}))).enter().append("text").attr("class","label").attr("transform",(function(t){return`translate(-10, ${l*(t+.5)})`})).text((function(t){return y(b(t))}));var x=["moonPhase","windSpeed","dewPoint","humidity","uvIndex","windBearing","temperatureMin","temperatureMax"];v(x[x.length-1]),u("#heading").append("label").attr("for","metric-select").text("Select Metric");var M=u("#heading").append("select").attr("name","metrics").attr("id","metric-select");M.selectAll("options").data(x).enter().append("option").text(t=>t).attr("value",t=>t).property("selected",(function(t){return"temperatureMax"==t||null})),M.node().addEventListener("change",(function(t){v(t.target.value)}))}().then(()=>console.timeEnd("draw heatmap"));
