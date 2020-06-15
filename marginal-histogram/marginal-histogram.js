import{a as t,b as n}from"../axis-3a2612fb.js";import"../index-b9fbf715.js";import{R as e,y as a,w as r,x as i,C as o,B as s,D as l,z as h,A as c,a as u,b as d,j as p,s as f,g}from"../precisionRound-200bdab7.js";import{m}from"../mouse-2982b87d.js";import{r as y,d as x,m as _}from"../min-eb5af223.js";import{c as v,l as b,x as w,y as M,a as H,p as Y}from"../line-a0e524d0.js";import{u as j,g as N,a as W,t as k}from"../defaultLocale-443e777c.js";import{f as A,g as D,h as $,j as T,e as S,l as E}from"../linear-a2cf98e2.js";import{h as C,r as F,c as L}from"../createDimensions-03e199fd.js";import{m as R}from"../max-fec1de3e.js";import{D as X}from"../delaunay-5be918bc.js";var Z=-.14861,q=1.78277,z=-.29227,B=-.90649,G=1.97294,I=G*B,O=G*q,P=q*z-B*Z;function J(t){if(t instanceof Q)return new Q(t.h,t.s,t.l,t.opacity);t instanceof e||(t=a(t));var n=t.r/255,r=t.g/255,i=t.b/255,o=(P*i+I*n-O*r)/(P+I-O),s=i-o,l=(G*(r-o)-z*s)/B,h=Math.sqrt(l*l+s*s)/(G*o*(1-o)),c=h?Math.atan2(l,s)*y-120:NaN;return new Q(c<0?c+360:c,h,o,t.opacity)}function K(t,n,e,a){return 1===arguments.length?J(t):new Q(t,n,e,null==a?1:a)}function Q(t,n,e,a){this.h=+t,this.s=+n,this.l=+e,this.opacity=+a}function U(t){return function n(e){function a(n,a){var r=t((n=K(n)).h,(a=K(a)).h),i=h(n.s,a.s),o=h(n.l,a.l),s=h(n.opacity,a.opacity);return function(t){return n.h=r(t),n.s=i(t),n.l=o(Math.pow(t,e)),n.opacity=s(t),n+""}}return e=+e,a.gamma=n,a}(1)}r(Q,K,i(o,{brighter:function(t){return t=null==t?s:Math.pow(s,t),new Q(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?l:Math.pow(l,t),new Q(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*x,n=+this.l,a=isNaN(this.s)?0:this.s*n*(1-n),r=Math.cos(t),i=Math.sin(t);return new e(255*(n+a*(Z*r+q*i)),255*(n+a*(z*r+B*i)),255*(n+a*(G*r)),this.opacity)}})),U(c);var V=U(h);Date.prototype.toISOString||j("%Y-%m-%dT%H:%M:%S.%LZ");var tt=+new Date("2000-01-01T00:00:00.000Z")?function(t){var n=new Date(t);return isNaN(n)?null:n}:N("%Y-%m-%dT%H:%M:%S.%LZ"),nt=(V(K(-100,.75,.35),K(80,1.5,.8)),V(K(260,.75,.35),K(80,1.5,.8)),K());function et(t){(t<0||t>1)&&(t-=Math.floor(t));var n=Math.abs(t-.5);return nt.h=360*t-100,nt.s=1.5-1.5*n,nt.l=.8-.9*n,nt+""}function at(){var t=w,n=null,e=v(0),a=M,r=v(!0),i=null,o=H,s=null;function l(l){var h,c,u,d,p,f=l.length,g=!1,m=new Array(f),y=new Array(f);for(null==i&&(s=o(p=Y())),h=0;h<=f;++h){if(!(h<f&&r(d=l[h],h,l))===g)if(g=!g)c=h,s.areaStart(),s.lineStart();else{for(s.lineEnd(),s.lineStart(),u=h-1;u>=c;--u)s.point(m[u],y[u]);s.lineEnd(),s.areaEnd()}g&&(m[h]=+t(d,h,l),y[h]=+e(d,h,l),s.point(n?+n(d,h,l):m[h],a?+a(d,h,l):y[h]))}if(p)return s=null,p+""||null}function h(){return b().defined(r).curve(o).context(i)}return l.x=function(e){return arguments.length?(t="function"==typeof e?e:v(+e),n=null,l):t},l.x0=function(n){return arguments.length?(t="function"==typeof n?n:v(+n),l):t},l.x1=function(t){return arguments.length?(n=null==t?null:"function"==typeof t?t:v(+t),l):n},l.y=function(t){return arguments.length?(e="function"==typeof t?t:v(+t),a=null,l):e},l.y0=function(t){return arguments.length?(e="function"==typeof t?t:v(+t),l):e},l.y1=function(t){return arguments.length?(a=null==t?null:"function"==typeof t?t:v(+t),l):a},l.lineX0=l.lineY0=function(){return h().x(t).y(e)},l.lineY1=function(){return h().x(t).y(a)},l.lineX1=function(){return h().x(n).y(e)},l.defined=function(t){return arguments.length?(r="function"==typeof t?t:v(!!t),l):r},l.curve=function(t){return arguments.length?(o=t,null!=i&&(s=o(i)),l):o},l.context=function(t){return arguments.length?(null==t?i=s=null:s=o(i=t),l):i},l}function rt(t,n,e){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+n)/6,(t._y0+4*t._y1+e)/6)}function it(t){this._context=t}function ot(t){return new it(t)}function st(t,n,e){const a=t[n];t[n]=t[e],t[e]=a}function lt(t,n,e){if(a=(t=Float64Array.from(function*(t,n){if(void 0===n)for(let n of t)null!=n&&(n=+n)>=n&&(yield n);else{let e=-1;for(let a of t)null!=(a=n(a,++e,t))&&(a=+a)>=a&&(yield a)}}(t,e))).length){if((n=+n)<=0||a<2)return _(t);if(n>=1)return R(t);var a,r=(a-1)*n,i=Math.floor(r),o=R(function t(n,e,a=0,r=n.length-1,i=A){for(;r>a;){if(r-a>600){const o=r-a+1,s=e-a+1,l=Math.log(o),h=.5*Math.exp(2*l/3),c=.5*Math.sqrt(l*h*(o-h)/o)*(s-o/2<0?-1:1);t(n,e,Math.max(a,Math.floor(e-s*h/o+c)),Math.min(r,Math.floor(e+(o-s)*h/o+c)),i)}const o=n[e];let s=a,l=r;for(st(n,a,e),i(n[r],o)>0&&st(n,a,r);s<l;){for(st(n,s,l),++s,--l;i(n[s],o)<0;)++s;for(;i(n[l],o)>0;)--l}0===i(n[a],o)?st(n,a,l):(++l,st(n,l,r)),l<=e&&(a=l+1),e<=l&&(r=l-1)}return n}(t,i).subarray(0,i+1));return o+(_(t.subarray(i+1))-o)*(r-i)}}function ht(){var t,n,e,a,r,i=0,o=1,s=$,l=!1;function h(n){return isNaN(n=+n)?r:s(0===e?.5:(n=(a(n)-t)*e,l?Math.max(0,Math.min(1,n)):n))}function c(t){return function(n){var e,a;return arguments.length?([e,a]=n,s=t(e,a),h):[s(0),s(1)]}}return h.domain=function(r){return arguments.length?([i,o]=r,t=a(i=+i),n=a(o=+o),e=t===n?0:1/(n-t),h):[i,o]},h.clamp=function(t){return arguments.length?(l=!!t,h):l},h.interpolator=function(t){return arguments.length?(s=t,h):s},h.range=c(d),h.rangeRound=c(u),h.unknown=function(t){return arguments.length?(r=t,h):r},function(r){return a=r,t=r(i),n=r(o),e=t===n?0:1/(n-t),h}}function ct(t,n){return n.domain(t.domain()).interpolator(t.interpolator()).clamp(t.clamp()).unknown(t.unknown())}it.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:rt(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:rt(this,t,n)}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=n}},console.time("render chart"),async function(){const e=await p("../data/nyc_weather_data.json");function a(t){return t.temperatureMin}function r(t){return t.temperatureMax}var i=W("%Y-%m-%d");function o(t){return i(t.date).setYear(2e3)}var s=L({customDimensions:{histogramMargin:10,histogramHeight:70,legendWidth:250,legendHeight:26}});const l=f("#wrapper").append("svg").attr("width",s.width).attr("height",s.height),h=l.append("g").style("transform",`translate(${s.margin.left}px, ${s.margin.top}px)`);h.append("rect").classed("bounds-background",!0).attr("x",0).attr("width",s.boundedWidth).attr("y",0).attr("height",s.boundedHeight);var c=S([...e.map(a),...e.map(r)]);const u=E().domain(c).range([0,s.boundedWidth]).nice(),d=E().domain(c).range([s.boundedHeight,0]).nice();var y=function t(){var n=D(ht()($));return n.copy=function(){return ct(n,t())},T.apply(n,arguments)}().domain([W("%m/%d/%Y")("1/1/2000"),W("%m/%d/%Y")("12/31/2000")]).interpolator((function(t){return et(-t)})),x=h.append("g").selectAll(".dot").data(e,t=>t[0]).join("circle").attr("class","dot").attr("cx",t=>u(a(t))).attr("cy",t=>d(r(t))).attr("r",4).style("fill",(function(t){return y(o(t))})),_=C().domain(d.domain()).value(r).thresholds(20),v=_(e),b=E().domain(S(v,t=>t.length)).range([s.histogramHeight,0]),w=h.append("g").attr("class","right-histogram").style("transform",`translate(\n        ${s.boundedWidth+s.histogramMargin}px, -${s.histogramHeight}px) rotate(90deg)`),M=at().x(t=>d((t.x0+t.x1)/2)).y0(s.histogramHeight).y1(t=>b(t.length)).curve(ot),H=(w.append("path").attr("d",t=>M(v)).attr("class","histogram-area"),C().domain(u.domain()).value(a).thresholds(20)),Y=H(e),j=E().domain(S(Y,t=>t.length)).range([s.histogramHeight,0]),N=h.append("g").attr("class","top-histogram").style("transform",`translate(0px, ${-s.histogramHeight-s.histogramMargin}px)`),A=at().x(t=>u((t.x0+t.x1)/2)).y0(s.histogramHeight).y1(t=>j(t.length)).curve(ot),R=(N.append("path").attr("d",t=>A(Y)).attr("class","histogram-area"),X.from(e,t=>u(a(t)),t=>d(r(t))).voronoi());R.xmax=s.boundedWidth,R.ymax=s.boundedHeight,h.selectAll(".voronoi").data(e).enter().append("path").attr("class","voronoi").attr("d",(function(t,n){return R.renderCell(n)}));const Z=t().scale(u),q=(h.append("g").call(Z).style("transform",`translateY(${s.boundedHeight}px)`).append("text").attr("class","x-axis-label").attr("x",s.boundedWidth/2).attr("y",s.margin.bottom-10).html("Minimum Temperature (&deg;F)"),n().scale(d).ticks(4));h.append("g").call(q).append("text").attr("class","y-axis-label").attr("x",-s.boundedHeight/2).attr("y",10-s.margin.left).html("Maximum Temperature (&deg;F)");var z=h.append("g").attr("transform",`translate(\n      ${s.boundedWidth-s.legendWidth-9},\n      ${s.boundedHeight-37})`),B=l.append("defs"),G=F(10).map(t=>t/9);B.append("linearGradient").attr("id","legend-gradient").selectAll("stop").data(G).enter().append("stop").attr("stop-color",t=>et(-t)).attr("offset",t=>100*t+"%");var I=z.append("rect").attr("height",s.legendHeight).attr("width",s.legendWidth).style("fill","url(#legend-gradient)"),O=[W("%m/%d/%Y")("4/1/2000"),W("%m/%d/%Y")("7/1/2000"),W("%m/%d/%Y")("10/1/2000")],P=E().domain(y.domain()).range([0,s.legendWidth]),J=z.selectAll(".legend-value").data(O).enter().append("text").attr("class","legend-value").attr("x",P).attr("y",-6).text(k("%b")),K=z.selectAll(".legend-tick").data(O).enter().append("line").attr("class","legend-tick").attr("x1",P).attr("x2",P).attr("y1",6),Q=f("#tooltip"),U=g(".2f"),V=W("%Y-%m-%d"),nt=k("%B %A %-d, %Y"),rt=h.append("g").attr("opacity",0),it=rt.append("circle").attr("class","tooltip-dot");h.selectAll(".voronoi").on("mouseenter",(function(t){Q.select("#min-temperature").text(U(a(t))),Q.select("#max-temperature").text(U(r(t))),Q.select("#date").text(nt(V(t.date)));const n=u(a(t)),e=d(r(t)),i=n+s.margin.left,o=e+s.margin.top-4;Q.style("transform",`translate(calc(-50% + ${i}px), calc(-100% + ${o}px))`).style("opacity",1),it.attr("cx",u(a(t))).attr("cy",d(r(t))).attr("r",7);st.attr("x",n).attr("y",e-5).attr("width",s.boundedWidth+s.histogramMargin+s.histogramHeight-n).attr("height",10),ut.attr("x",n-5).attr("y",-s.histogramMargin-s.histogramHeight).attr("width",10).attr("height",e+s.histogramMargin+s.histogramHeight),rt.style("opacity",1)})).on("mouseleave",(function(){Q.style("opacity",0),rt.style("opacity",0)}));var st=rt.append("rect").attr("class","hover-line"),ut=rt.append("rect").attr("class","hover-line");I.on("mousemove",(function(){const[t]=m(this),n=new Date(P.invert(t-dt)),a=new Date(P.invert(t+dt)),r=(i=[0,t-dt/2,s.legendWidth-dt],lt(i,.5,l));var i,l;pt.style("opacity",1).style("transform",`translateX(${r}px)`),ft.text([k("%b %d")(n),k("%b %d")(a)]).join("-"),J.style("opacity",0),K.style("opacity",0),x.transition().duration(100).style("opacity",.08).attr("r",2);x.filter(c).transition().duration(100).style("opacity",1).attr("r",5);function h(t){return+k("%Y")(t)}function c(t){var e=o(t);return h(n)<2e3?e>=new Date(n).setYear(2e3)||e<=a:h(a)>2e3?e<=new Date(a).setYear(2e3)||e>=n:e>=n&&e<=a}const u=tt(P.invert(t));var d=e.filter(c);gt.attr("d",(function(t){return A(H(d))})).attr("fill",y(u)).attr("stroke","white").style("opacity",1),mt.attr("d",(function(t){return M(_(d))})).attr("fill",y(u)).attr("stroke","white").style("opacity",1)})).on("mouseleave",(function(){x.transition().duration(500).style("opacity",1).attr("r",4),pt.style("opacity",0),J.style("opacity",1),K.style("opacity",1),mt.style("opacity",0),gt.style("opacity",0)}));const dt=.05*s.legendWidth;var pt=z.append("g").attr("opacity",0),ft=(pt.append("rect").attr("class","legend-highlight-bar").attr("width",dt).attr("height",s.legendHeight),pt.append("text").attr("class","legend-highlight-text").attr("x",dt/2).attr("y",-6)),gt=N.append("path"),mt=w.append("path")}().then(()=>console.timeEnd("render chart")).catch(console.error);
