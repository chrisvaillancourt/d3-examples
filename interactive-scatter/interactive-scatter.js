import{l as t,e}from"../linear-78edb2bb.js";import{m as a}from"../min-54383882.js";import{a as n,b as o}from"../axis-3a2612fb.js";import"../index-b9fbf715.js";import{S as r,v as i,j as l,s,g as d}from"../precisionRound-200bdab7.js";import{a as c,t as m}from"../defaultLocale-443e777c.js";import{D as p}from"../delaunay-5be918bc.js";!async function(){const g=await l("../data/nyc_weather_data.json"),h=t=>t.dewPoint,f=t=>t.humidity,u=a([.9*window.innerWidth,.9*window.innerHeight]);let b={width:u,height:u,margin:{top:10,right:10,bottom:50,left:50}};b.boundedWidth=b.width-b.margin.left-b.margin.right,b.boundedHeight=b.height-b.margin.top-b.margin.bottom;const x=s("#wrapper").append("svg").attr("width",b.width).attr("height",b.height).append("g").style("transform",`translate(${b.margin.left}px, ${b.margin.top}px)`),y=t().domain(e(g,h)).range([0,b.boundedWidth]).nice(),w=t().domain(e(g,f)).range([b.boundedHeight,0]).nice();(t=>{const e=x.selectAll("circle").data(t,t=>t[0]);e.enter().append("circle").merge(e).attr("cx",t=>y(h(t))).attr("cy",t=>w(f(t))).attr("r",4),e.exit().remove()})(g);var v=p.from(g,t=>y(h(t)),t=>w(f(t))).voronoi();v.xmax=b.boundedWidth,v.ymax=b.boundedHeight,x.selectAll(".voronoi").data(g).enter().append("path").attr("class","voronoi").attr("d",(function(t,e){return v.renderCell(e)}));const j=n().scale(y),H=(x.append("g").call(j).style("transform",`translateY(${b.boundedHeight}px)`).append("text").attr("class","x-axis-label").attr("x",b.boundedWidth/2).attr("y",b.margin.bottom-10).html("dew point (&deg;F)"),o().scale(w).ticks(4));x.append("g").call(H).append("text").attr("class","y-axis-label").attr("x",-b.boundedHeight/2).attr("y",10-b.margin.left).text("relative humidity");var A=s("#tooltip"),W=d(".2f"),$=d(".2f"),D=c("%Y-%m-%d"),Y=m("%B %A %-d, %Y");x.selectAll(".voronoi").on("mouseenter",(function(t,e){A.select("#humidity").text(W(f(t))),A.select("#dew-point").text($(h(t))),A.select("#date").text(Y(D(t.date)));const a=y(h(t))+b.margin.left,n=w(f(t))+b.margin.top;A.style("transform",`translate(calc(-50% + ${a}px), calc(-100% + ${n}px))`).style("opacity",1);x.append("circle").attr("class","tooltipDot").attr("cx",y(h(t))).attr("cy",w(f(t))).attr("r",7).style("fill","maroon").style("pointer-events","none")})).on("mouseleave",(function(){A.style("opacity",0),(t=".tooltipDot","string"==typeof t?new r([document.querySelectorAll(t)],[document.documentElement]):new r([null==t?[]:t],i)).remove();var t}))}();
