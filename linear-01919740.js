import{i as t,a as n,b as r,f as e,p as a,c as i,d as u,e as o,g as c}from"./precisionRound-de7a9f9e.js";function l(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function s(t){var n;return 1===t.length&&(n=t,t=function(t,r){return l(n(t),r)}),{left:function(n,r,e,a){for(null==e&&(e=0),null==a&&(a=n.length);e<a;){var i=e+a>>>1;t(n[i],r)<0?e=i+1:a=i}return e},right:function(n,r,e,a){for(null==e&&(e=0),null==a&&(a=n.length);e<a;){var i=e+a>>>1;t(n[i],r)>0?a=i:e=i+1}return e}}}var f=s(l).right;function h(t,n){var r,e,a,i=t.length,u=-1;if(null==n){for(;++u<i;)if(null!=(r=t[u])&&r>=r)for(e=a=r;++u<i;)null!=(r=t[u])&&(e>r&&(e=r),a<r&&(a=r))}else for(;++u<i;)if(null!=(r=n(t[u],u,t))&&r>=r)for(e=a=r;++u<i;)null!=(r=n(t[u],u,t))&&(e>r&&(e=r),a<r&&(a=r));return[e,a]}var p=Math.sqrt(50),v=Math.sqrt(10),g=Math.sqrt(2);function m(t,n,r){var e=(n-t)/Math.max(0,r),a=Math.floor(Math.log(e)/Math.LN10),i=e/Math.pow(10,a);return a>=0?(i>=p?10:i>=v?5:i>=g?2:1)*Math.pow(10,a):-Math.pow(10,-a)/(i>=p?10:i>=v?5:i>=g?2:1)}function M(t,n,r){var e=Math.abs(n-t)/Math.max(0,r),a=Math.pow(10,Math.floor(Math.log(e)/Math.LN10)),i=e/a;return i>=p?a*=10:i>=v?a*=5:i>=g&&(a*=2),n<t?-a:a}var d=Array.prototype.slice;function y(t){return t}function k(t){return"translate("+(t+.5)+",0)"}function N(t){return"translate(0,"+(t+.5)+")"}function w(t){return function(n){return+t(n)}}function x(t){var n=Math.max(0,t.bandwidth()-1)/2;return t.round()&&(n=Math.round(n)),function(r){return+t(r)+n}}function b(){return!this.__axis}function A(t,n){var r=[],e=null,a=null,i=6,u=6,o=3,c=1===t||4===t?-1:1,l=4===t||2===t?"x":"y",s=1===t||3===t?k:N;function f(f){var h=null==e?n.ticks?n.ticks.apply(n,r):n.domain():e,p=null==a?n.tickFormat?n.tickFormat.apply(n,r):y:a,v=Math.max(i,0)+o,g=n.range(),m=+g[0]+.5,M=+g[g.length-1]+.5,d=(n.bandwidth?x:w)(n.copy()),k=f.selection?f.selection():f,N=k.selectAll(".domain").data([null]),A=k.selectAll(".tick").data(h,n).order(),$=A.exit(),z=A.enter().append("g").attr("class","tick"),F=A.select("line"),_=A.select("text");N=N.merge(N.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),A=A.merge(z),F=F.merge(z.append("line").attr("stroke","currentColor").attr(l+"2",c*i)),_=_.merge(z.append("text").attr("fill","currentColor").attr(l,c*v).attr("dy",1===t?"0em":3===t?"0.71em":"0.32em")),f!==k&&(N=N.transition(f),A=A.transition(f),F=F.transition(f),_=_.transition(f),$=$.transition(f).attr("opacity",1e-6).attr("transform",(function(t){return isFinite(t=d(t))?s(t):this.getAttribute("transform")})),z.attr("opacity",1e-6).attr("transform",(function(t){var n=this.parentNode.__axis;return s(n&&isFinite(n=n(t))?n:d(t))}))),$.remove(),N.attr("d",4===t||2==t?u?"M"+c*u+","+m+"H0.5V"+M+"H"+c*u:"M0.5,"+m+"V"+M:u?"M"+m+","+c*u+"V0.5H"+M+"V"+c*u:"M"+m+",0.5H"+M),A.attr("opacity",1).attr("transform",(function(t){return s(d(t))})),F.attr(l+"2",c*i),_.attr(l,c*v).text(p),k.filter(b).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",2===t?"start":4===t?"end":"middle"),k.each((function(){this.__axis=d}))}return f.scale=function(t){return arguments.length?(n=t,f):n},f.ticks=function(){return r=d.call(arguments),f},f.tickArguments=function(t){return arguments.length?(r=null==t?[]:d.call(t),f):r.slice()},f.tickValues=function(t){return arguments.length?(e=null==t?null:d.call(t),f):e&&e.slice()},f.tickFormat=function(t){return arguments.length?(a=t,f):a},f.tickSize=function(t){return arguments.length?(i=u=+t,f):i},f.tickSizeInner=function(t){return arguments.length?(i=+t,f):i},f.tickSizeOuter=function(t){return arguments.length?(u=+t,f):u},f.tickPadding=function(t){return arguments.length?(o=+t,f):o},f}function $(t){return A(3,t)}function z(t){return A(4,t)}function F(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}var _,V;1===(_=F).length&&(V=_,_=function(t,n){return F(V(t),n)});function H(){}function q(t,n){var r=new H;if(t instanceof H)t.each((function(t,n){r.set(n,t)}));else if(Array.isArray(t)){var e,a=-1,i=t.length;if(null==n)for(;++a<i;)r.set(a,t[a]);else for(;++a<i;)r.set(n(e=t[a],a,t),e)}else if(t)for(var u in t)r.set(u,t[u]);return r}function C(){}H.prototype=q.prototype={constructor:H,has:function(t){return"$"+t in this},get:function(t){return this["$"+t]},set:function(t,n){return this["$"+t]=n,this},remove:function(t){var n="$"+t;return n in this&&delete this[n]},clear:function(){for(var t in this)"$"===t[0]&&delete this[t]},keys:function(){var t=[];for(var n in this)"$"===n[0]&&t.push(n.slice(1));return t},values:function(){var t=[];for(var n in this)"$"===n[0]&&t.push(this[n]);return t},entries:function(){var t=[];for(var n in this)"$"===n[0]&&t.push({key:n.slice(1),value:this[n]});return t},size:function(){var t=0;for(var n in this)"$"===n[0]&&++t;return t},empty:function(){for(var t in this)if("$"===t[0])return!1;return!0},each:function(t){for(var n in this)"$"===n[0]&&t(this[n],n.slice(1),this)}};var S=q.prototype;function j(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}C.prototype=function(t,n){var r=new C;if(t instanceof C)t.each((function(t){r.add(t)}));else if(t){var e=-1,a=t.length;if(null==n)for(;++e<a;)r.add(t[e]);else for(;++e<a;)r.add(n(t[e],e,t))}return r}.prototype={constructor:C,has:S.has,add:function(t){return this["$"+(t+="")]=t,this},remove:S.remove,clear:S.clear,values:S.keys,size:S.size,empty:S.empty,each:S.each};!function(t){1===t.length&&(t=function(t){return function(n,r){return j(t(n),r)}}(t))}(j);function L(t,n){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(n).domain(t)}return this}var R=Array.prototype,I=R.map,O=R.slice;function P(t){return+t}var B=[0,1];function D(t){return t}function E(t,n){return(n-=t=+t)?function(r){return(r-t)/n}:(r=isNaN(n)?NaN:.5,function(){return r});var r}function G(t){var n,r=t[0],e=t[t.length-1];return r>e&&(n=r,r=e,e=n),function(t){return Math.max(r,Math.min(e,t))}}function J(t,n,r){var e=t[0],a=t[1],i=n[0],u=n[1];return a<e?(e=E(a,e),i=r(u,i)):(e=E(e,a),i=r(i,u)),function(t){return i(e(t))}}function K(t,n,r){var e=Math.min(t.length,n.length)-1,a=new Array(e),i=new Array(e),u=-1;for(t[e]<t[0]&&(t=t.slice().reverse(),n=n.slice().reverse());++u<e;)a[u]=E(t[u],t[u+1]),i[u]=r(n[u],n[u+1]);return function(n){var r=f(t,n,1,e)-1;return i[r](a[r](n))}}function Q(t,n){return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function T(e,a){return function(){var e,a,i,u,o,c,l=B,s=B,f=r,h=D;function p(){return u=Math.min(l.length,s.length)>2?K:J,o=c=null,v}function v(t){return isNaN(t=+t)?i:(o||(o=u(l.map(e),s,f)))(e(h(t)))}return v.invert=function(n){return h(a((c||(c=u(s,l.map(e),t)))(n)))},v.domain=function(t){return arguments.length?(l=I.call(t,P),h===D||(h=G(l)),p()):l.slice()},v.range=function(t){return arguments.length?(s=O.call(t),p()):s.slice()},v.rangeRound=function(t){return s=O.call(t),f=n,p()},v.clamp=function(t){return arguments.length?(h=t?G(l):D,v):h!==D},v.interpolate=function(t){return arguments.length?(f=t,p()):f},v.unknown=function(t){return arguments.length?(i=t,v):i},function(t,n){return e=t,a=n,p()}}()(e,a)}function U(t){var n=t.domain;return t.ticks=function(t){var r=n();return function(t,n,r){var e,a,i,u,o=-1;if(r=+r,(t=+t)===(n=+n)&&r>0)return[t];if((e=n<t)&&(a=t,t=n,n=a),0===(u=m(t,n,r))||!isFinite(u))return[];if(u>0)for(t=Math.ceil(t/u),n=Math.floor(n/u),i=new Array(a=Math.ceil(n-t+1));++o<a;)i[o]=(t+o)*u;else for(t=Math.floor(t*u),n=Math.ceil(n*u),i=new Array(a=Math.ceil(t-n+1));++o<a;)i[o]=(t-o)/u;return e&&i.reverse(),i}(r[0],r[r.length-1],null==t?10:t)},t.tickFormat=function(t,r){var l=n();return function(t,n,r,l){var s,f=M(t,n,r);switch((l=e(null==l?",f":l)).type){case"s":var h=Math.max(Math.abs(t),Math.abs(n));return null!=l.precision||isNaN(s=u(f,h))||(l.precision=s),o(l,h);case"":case"e":case"g":case"p":case"r":null!=l.precision||isNaN(s=i(f,Math.max(Math.abs(t),Math.abs(n))))||(l.precision=s-("e"===l.type));break;case"f":case"%":null!=l.precision||isNaN(s=a(f))||(l.precision=s-2*("%"===l.type))}return c(l)}(l[0],l[l.length-1],null==t?10:t,r)},t.nice=function(r){null==r&&(r=10);var e,a=n(),i=0,u=a.length-1,o=a[i],c=a[u];return c<o&&(e=o,o=c,c=e,e=i,i=u,u=e),(e=m(o,c,r))>0?e=m(o=Math.floor(o/e)*e,c=Math.ceil(c/e)*e,r):e<0&&(e=m(o=Math.ceil(o*e)/e,c=Math.floor(c*e)/e,r)),e>0?(a[i]=Math.floor(o/e)*e,a[u]=Math.ceil(c/e)*e,n(a)):e<0&&(a[i]=Math.ceil(o*e)/e,a[u]=Math.floor(c*e)/e,n(a)),t},t}function W(){var t=T(D,D);return t.copy=function(){return Q(t,W())},L.apply(t,arguments),U(t)}export{$ as a,z as b,f as c,T as d,h as e,D as f,Q as g,s as h,L as i,l as j,W as l,I as m,M as t};
