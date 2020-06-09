import{l as t,e as a}from"../linear-0c710ebb.js";import{m as e}from"../min-54383882.js";import{a as r,b as n}from"../axis-3a2612fb.js";import"../index-b9fbf715.js";import{j as i,s as c}from"../precisionRound-200bdab7.js";!async function(){let o=await i("../data/nyc_weather_data.json");function s(t){return t.dewPoint}function d(t){return t.humidity}function l(t){return t.cloudCover}const h=function(){const t=e([.9*window.innerWidth,.9*window.innerHeight]),a={width:t,height:t,margin:{top:10,right:10,bottom:50,left:50}};return a.boundedWidth=a.width-a.margin.left-a.margin.right,a.boundedHeight=a.height-a.margin.top-a.margin.bottom,a}(),m=function({wrapperSelector:t,chartDimensions:a}){return c(t).append("svg").attr("width",a.width).attr("height",a.height).append("g").style("transform",`translate(${a.margin.left}px, ${a.margin.top}px)`)}({wrapperSelector:"#wrapper",chartDimensions:h});function f({chartData:e,dataAccessor:r,range:n,isNice:i}){const c=t().domain(a(e,r)).range(n);return i&&c.nice(),c}const g=f({chartData:o,dataAccessor:s,range:[h.boundedHeight,0],isNice:!0}),p=f({chartData:o,dataAccessor:d,range:[0,h.boundedWidth],isNice:!0}),u=f({chartData:o,dataAccessor:l,range:["skyblue","darkslategrey"],isNice:!1});!function({chartBounds:t,chartData:a,chartXScale:e,dataXAccessor:r,chartYScale:n,dataYAccessor:i,fillScale:c,fillAccessor:o}){t.selectAll("circle").data(a).join("circle").attr("cx",t=>e(r(t))).attr("cy",t=>n(i(t))).attr("r",5).attr("fill",t=>c(o(t)))}({chartBounds:m,chartData:o,chartXScale:g,dataXAccessor:s,chartYScale:p,dataYAccessor:d,fillScale:u,fillAccessor:l}),function(){const t=r().scale(g);m.append("g").call(t).style("transform",`translateY(${h.boundedHeight}px)`).append("text").attr("x",h.boundedWidth/2).attr("y",h.margin.bottom-10).attr("fill","black").style("font-size","1.4em").html("Dew Point (&deg;F)")}(),function(){const t=n().scale(p).ticks(4);m.append("g").call(t).append("text").attr("x",-h.boundedHeight/2).attr("y",10-h.margin.left).attr("fill","black").style("font-size","1.4em").style("transform","rotate(-90deg").style("text-anchor","middle").text("Relative Humidity")}()}();
