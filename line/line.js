import{j as t,l as a,e,b as r,a as n}from"../linear-01919740.js";import{m as i}from"../max-4f4ac469.js";import{h as o,j as s,s as d,g as c}from"../precisionRound-de7a9f9e.js";import{t as l,l as p}from"../line-8011cae4.js";import{t as h,a as u}from"../defaultLocale-94b85140.js";function g(){for(var t,a=o;t=a.sourceEvent;)a=t;return a}!async function(){let o=await s("../data/nyc_weather_data.json");const m=t=>t.temperatureMax,f=h("%Y-%m-%d"),y=t=>f(t.date);o=o.sort((t,a)=>y(t)-y(a)).slice(0,100);let b={width:.9*window.innerWidth,height:400,margin:{top:15,right:15,bottom:40,left:60}};b.boundedWidth=b.width-b.margin.left-b.margin.right,b.boundedHeight=b.height-b.margin.top-b.margin.bottom;const x=d("#wrapper").append("svg").attr("width",b.width).attr("height",b.height).append("g").attr("transform",`translate(${b.margin.left}, ${b.margin.top})`);x.append("defs").append("clipPath").attr("id","bounds-clip-path").append("rect").attr("width",b.boundedWidth).attr("height",b.boundedHeight);const v=x.append("g").attr("clip-path","url(#bounds-clip-path)"),w=a().domain(e(o,m)).range([b.boundedHeight,0]),j=w(32),H=(v.append("rect").attr("class","freezing").attr("x",0).attr("width",i([0,b.boundedWidth])).attr("y",j).attr("height",i([0,b.boundedHeight-j])),l().domain(e(o,y)).range([0,b.boundedWidth])),T=p().x(t=>H(y(t))).y(t=>w(m(t))),W=(v.append("path").attr("class","line").attr("d",T(o)),r().scale(w)),Y=(x.append("g").attr("class","y-axis").call(W).append("text").attr("class","y-axis-label").attr("x",-b.boundedHeight/2).attr("y",10-b.margin.left).html("Minimum Temperature (&deg;F)"),n().scale(H));x.append("g").attr("class","x-axis").style("transform",`translateY(${b.boundedHeight}px)`).call(Y),x.append("rect").attr("class","listening-rect").attr("width",b.boundedWidth).attr("height",b.boundedHeight).on("mousemove",(function(){var a=function(t){var a=g();return a.changedTouches&&(a=a.changedTouches[0]),function(t,a){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=a.clientX,r.y=a.clientY,[(r=r.matrixTransform(t.getScreenCTM().inverse())).x,r.y]}var n=t.getBoundingClientRect();return[a.clientX-n.left-t.clientLeft,a.clientY-n.top-t.clientTop]}(t,a)}(this),e=H.invert(a[0]),r=function(a,e){if(r=a.length){var r,n,i=0,o=0,s=a[o];for(null==e&&(e=t);++i<r;)(e(n=a[i],s)<0||0!==e(s,s))&&(s=n,o=i);return 0===e(s,s)?o:void 0}}(o,(function(t,a){return h(t)-h(a)})),n=o[r],i=y(n),s=m(n);M.select("#date").text($(i)),M.select("#temperature").html((d=s,c(".1f")(d)+"°F"));var d;var l=H(i)+b.margin.left,p=w(s)+b.margin.top;function h(t){return Math.abs(y(t)-e)}M.style("transform",`translate(calc(-50% + ${l}px), calc(-100% + ${p}px))`).style("opacity",1),S.attr("cx",H(i)).attr("cy",w(s)).attr("opacity",1)})).on("mouseleave",(function(){M.style("opacity",0),S.style("opacity",1)}));var $=u("%B %A %-d, %Y"),M=d("#tooltip"),S=x.append("circle").attr("r",4).attr("stroke","#af9358").attr("fill","white").attr("stroke-width",2).style("opacity",0)}();
