import{a as t,b as a}from"../bisect-ada9d806.js";import{l as e,e as r}from"../linear-bf5f1e59.js";import{m as n}from"../min-54383882.js";import{s as i}from"../precisionRound-37c4ad23.js";import{j as c}from"../json-3227c80e.js";!async function(){let o=await c("../data/nyc_weather_data.json");function s(t){return t.dewPoint}function d(t){return t.humidity}function l(t){return t.cloudCover}const h=function(){const t=n([.9*window.innerWidth,.9*window.innerHeight]),a={width:t,height:t,margin:{top:10,right:10,bottom:50,left:50}};return a.boundedWidth=a.width-a.margin.left-a.margin.right,a.boundedHeight=a.height-a.margin.top-a.margin.bottom,a}(),m=function({wrapperSelector:t,chartDimensions:a}){return i(t).append("svg").attr("width",a.width).attr("height",a.height).append("g").style("transform",`translate(${a.margin.left}px, ${a.margin.top}px)`)}({wrapperSelector:"#wrapper",chartDimensions:h});function f({chartData:t,dataAccessor:a,range:n,isNice:i}){const c=e().domain(r(t,a)).range(n);return i&&c.nice(),c}const g=f({chartData:o,dataAccessor:s,range:[h.boundedHeight,0],isNice:!0}),p=f({chartData:o,dataAccessor:d,range:[0,h.boundedWidth],isNice:!0}),u=f({chartData:o,dataAccessor:l,range:["skyblue","darkslategrey"],isNice:!1});!function({chartBounds:t,chartData:a,chartXScale:e,dataXAccessor:r,chartYScale:n,dataYAccessor:i,fillScale:c,fillAccessor:o}){t.selectAll("circle").data(a).join("circle").attr("cx",t=>e(r(t))).attr("cy",t=>n(i(t))).attr("r",5).attr("fill",t=>c(o(t)))}({chartBounds:m,chartData:o,chartXScale:g,dataXAccessor:s,chartYScale:p,dataYAccessor:d,fillScale:u,fillAccessor:l}),function(){const a=t().scale(g);m.append("g").call(a).style("transform",`translateY(${h.boundedHeight}px)`).append("text").attr("x",h.boundedWidth/2).attr("y",h.margin.bottom-10).attr("fill","black").style("font-size","1.4em").html("Dew Point (&deg;F)")}(),function(){const t=a().scale(p).ticks(4);m.append("g").call(t).append("text").attr("x",-h.boundedHeight/2).attr("y",10-h.margin.left).attr("fill","black").style("font-size","1.4em").style("transform","rotate(-90deg").style("text-anchor","middle").text("Relative Humidity")}()}();
