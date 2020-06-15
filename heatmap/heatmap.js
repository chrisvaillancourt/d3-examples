import{w as t,x as n,R as e,y as r,C as a,z as i,A as o,j as s,s as u}from"../precisionRound-f2241ba6.js";import{r as h,d as c,m as l}from"../min-eb5af223.js";import{t as f,a as d,f as p}from"../defaultLocale-6888ceff.js";import{a as m}from"../month-fdf3866f.js";import{e as g,l as w}from"../linear-3681a81c.js";var b=6/29,y=3*b*b;function v(t){if(t instanceof x)return new x(t.l,t.a,t.b,t.opacity);if(t instanceof k)return B(t);t instanceof e||(t=r(t));var n,a,i=A(t.r),o=A(t.g),s=A(t.b),u=M((.2225045*i+.7168786*o+.0606169*s)/1);return i===o&&o===s?n=a=u:(n=M((.4360747*i+.3850649*o+.1430804*s)/.96422),a=M((.0139322*i+.0971045*o+.7141733*s)/.82521)),new x(116*u-16,500*(n-u),200*(u-a),t.opacity)}function x(t,n,e,r){this.l=+t,this.a=+n,this.b=+e,this.opacity=+r}function M(t){return t>.008856451679035631?Math.pow(t,1/3):t/y+4/29}function N(t){return t>b?t*t*t:y*(t-4/29)}function j(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function A(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function $(t){if(t instanceof k)return new k(t.h,t.c,t.l,t.opacity);if(t instanceof x||(t=v(t)),0===t.a&&0===t.b)return new k(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity);var n=Math.atan2(t.b,t.a)*h;return new k(n<0?n+360:n,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function W(t,n,e,r){return 1===arguments.length?$(t):new k(t,n,e,null==r?1:r)}function k(t,n,e,r){this.h=+t,this.c=+n,this.l=+e,this.opacity=+r}function B(t){if(isNaN(t.h))return new x(t.l,0,0,t.opacity);var n=t.h*c;return new x(t.l,Math.cos(n)*t.c,Math.sin(n)*t.c,t.opacity)}t(x,(function(t,n,e,r){return 1===arguments.length?v(t):new x(t,n,e,null==r?1:r)}),n(a,{brighter:function(t){return new x(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new x(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,n=isNaN(this.a)?t:t+this.a/500,r=isNaN(this.b)?t:t-this.b/200;return n=.96422*N(n),t=1*N(t),r=.82521*N(r),new e(j(3.1338561*n-1.6168667*t-.4906146*r),j(-.9787684*n+1.9161415*t+.033454*r),j(.0719453*n-.2289914*t+1.4052427*r),this.opacity)}})),t(k,W,n(a,{brighter:function(t){return new k(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},darker:function(t){return new k(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},rgb:function(){return B(this).rgb()}}));var E=function(t){return function(n,e){var r=t((n=W(n)).h,(e=W(e)).h),a=i(n.c,e.c),o=i(n.l,e.l),s=i(n.opacity,e.opacity);return function(t){return n.h=r(t),n.c=a(t),n.l=o(t),n.opacity=s(t),n+""}}}(o);console.time("draw heatmap"),async function(){var t=await s("../data/nyc_weather_data.json"),n=f("%Y-%m-%d");function e(t){return n(t.date)}t=t.sort((function(t,n){return e(t)-e(n)})),d("%-e");var r=d("%-w");const a=e(t[0]),i=Math.ceil(t.length/7)+1;var o={margin:{top:30,right:0,bottom:0,left:80},get width(){return.95*(window.innerWidth-this.margin.left-this.margin.right)},get boundedWidth(){return this.width-this.margin.left-this.margin.right},get height(){return 7*this.boundedWidth/i+this.margin.top+this.margin.bottom},get boundedHeight(){return this.height-this.margin.top-this.margin.bottom}},h=u("#wrapper").append("svg").attr("width",o.width).attr("height",o.height).append("g").style("transform",`translate(${o.margin.left}px, ${o.margin.top}px)`),c=l([o.boundedWidth/i,o.boundedHeight/7]),b=d("%b"),y=(h.selectAll(".month").data(m(e(t[0]),e(t[t.length-1]))).enter().append("text").attr("class","month").attr("transform",(function(t){return`translate(${c*p(a,t).length}, -10)`})).text((function(t){return b(t)})),f("%-e")),v=d("%-A");function x(n){function i(t){return t[n]}u("#metric").text(n);var o=g(t,i),s=w().domain(o).range([0,1]).clamp(!0),l=E("#ecf0f1","#5758BB");u("#legend-min").text(o[0]),u("#legend-max").text(o[1]),u("#legend-gradient").style("background",`linear-gradient(to right, ${new Array(10).fill(null).map((function(t,n){return`${l(n/9)} ${100*n/9}%`})).join(", ")})`);var f=h.selectAll(".day").data(t,(function(t){return t.date}));f.enter().append("rect").merge(f).attr("class","day").attr("x",(function(t){return c*function(t){return p(a,e(t)).length}(t)})).attr("width",c).attr("y",(function(t){return c*function(t){return Number(r(e(t)))}(t)})).attr("height",c).style("fill",(function(t){return function(t){return l(s(t)||0)}(i(t))}));f.exit().remove()}h.selectAll(".label").data(new Array(7).fill(null).map((function(t,n){return n}))).enter().append("text").attr("class","label").attr("transform",(function(t){return`translate(-10, ${c*(t+.5)})`})).text((function(t){return v(y(t))}));var M=["moonPhase","windSpeed","dewPoint","humidity","uvIndex","windBearing","temperatureMin","temperatureMax"];x(M[M.length-1]),u("#heading").append("label").attr("for","metric-select").text("Select Metric");var N=u("#heading").append("select").attr("name","metrics").attr("id","metric-select");N.selectAll("options").data(M).enter().append("option").text(t=>t).attr("value",t=>t).property("selected",(function(t){return"temperatureMax"==t||null})),N.node().addEventListener("change",(function(t){x(t.target.value)}))}().then(()=>console.timeEnd("draw heatmap"));
