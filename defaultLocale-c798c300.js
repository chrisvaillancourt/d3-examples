var n=new Date,e=new Date;function t(r,u,o,i){function c(n){return r(n=0===arguments.length?new Date:new Date(+n)),n}return c.floor=function(n){return r(n=new Date(+n)),n},c.ceil=function(n){return r(n=new Date(n-1)),u(n,1),r(n),n},c.round=function(n){var e=c(n),t=c.ceil(n);return n-e<t-n?e:t},c.offset=function(n,e){return u(n=new Date(+n),null==e?1:Math.floor(e)),n},c.range=function(n,e,t){var o,i=[];if(n=c.ceil(n),t=null==t?1:Math.floor(t),!(n<e&&t>0))return i;do{i.push(o=new Date(+n)),u(n,t),r(n)}while(o<n&&n<e);return i},c.filter=function(n){return t((function(e){if(e>=e)for(;r(e),!n(e);)e.setTime(e-1)}),(function(e,t){if(e>=e)if(t<0)for(;++t<=0;)for(;u(e,-1),!n(e););else for(;--t>=0;)for(;u(e,1),!n(e););}))},o&&(c.count=function(t,u){return n.setTime(+t),e.setTime(+u),r(n),r(e),Math.floor(o(n,e))},c.every=function(n){return n=Math.floor(n),isFinite(n)&&n>0?n>1?c.filter(i?function(e){return i(e)%n==0}:function(e){return c.count(0,e)%n==0}):c:null}),c}var r=1e3,u=6e4,o=36e5,i=t((function(n){n.setHours(0,0,0,0)}),(function(n,e){n.setDate(n.getDate()+e)}),(function(n,e){return(e-n-6e4*(e.getTimezoneOffset()-n.getTimezoneOffset()))/864e5}),(function(n){return n.getDate()-1}));function c(n){return t((function(e){e.setDate(e.getDate()-(e.getDay()+7-n)%7),e.setHours(0,0,0,0)}),(function(n,e){n.setDate(n.getDate()+7*e)}),(function(n,e){return(e-n-6e4*(e.getTimezoneOffset()-n.getTimezoneOffset()))/6048e5}))}var a=c(0),f=c(1),l=(c(2),c(3),c(4)),s=(c(5),c(6),a.range),g=t((function(n){n.setMonth(0,1),n.setHours(0,0,0,0)}),(function(n,e){n.setFullYear(n.getFullYear()+e)}),(function(n,e){return e.getFullYear()-n.getFullYear()}),(function(n){return n.getFullYear()}));g.every=function(n){return isFinite(n=Math.floor(n))&&n>0?t((function(e){e.setFullYear(Math.floor(e.getFullYear()/n)*n),e.setMonth(0,1),e.setHours(0,0,0,0)}),(function(e,t){e.setFullYear(e.getFullYear()+t*n)})):null};var h=t((function(n){n.setUTCHours(0,0,0,0)}),(function(n,e){n.setUTCDate(n.getUTCDate()+e)}),(function(n,e){return(e-n)/864e5}),(function(n){return n.getUTCDate()-1}));function T(n){return t((function(e){e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-n)%7),e.setUTCHours(0,0,0,0)}),(function(n,e){n.setUTCDate(n.getUTCDate()+7*e)}),(function(n,e){return(e-n)/6048e5}))}var y=T(0),C=T(1),D=(T(2),T(3),T(4)),v=(T(5),T(6),t((function(n){n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)}),(function(n,e){n.setUTCFullYear(n.getUTCFullYear()+e)}),(function(n,e){return e.getUTCFullYear()-n.getUTCFullYear()}),(function(n){return n.getUTCFullYear()})));function U(n){if(0<=n.y&&n.y<100){var e=new Date(-1,n.m,n.d,n.H,n.M,n.S,n.L);return e.setFullYear(n.y),e}return new Date(n.y,n.m,n.d,n.H,n.M,n.S,n.L)}function M(n){if(0<=n.y&&n.y<100){var e=new Date(Date.UTC(-1,n.m,n.d,n.H,n.M,n.S,n.L));return e.setUTCFullYear(n.y),e}return new Date(Date.UTC(n.y,n.m,n.d,n.H,n.M,n.S,n.L))}function d(n,e,t){return{y:n,m:e,d:t,H:0,M:0,S:0,L:0}}v.every=function(n){return isFinite(n=Math.floor(n))&&n>0?t((function(e){e.setUTCFullYear(Math.floor(e.getUTCFullYear()/n)*n),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)}),(function(e,t){e.setUTCFullYear(e.getUTCFullYear()+t*n)})):null};var m,w,F,x={"-":"",_:" ",0:"0"},Y=/^\s*\d+/,H=/^%/,p=/[\\^$*+?|[\]().{}]/g;function S(n,e,t){var r=n<0?"-":"",u=(r?-n:n)+"",o=u.length;return r+(o<t?new Array(t-o+1).join(e)+u:u)}function L(n){return n.replace(p,"\\$&")}function A(n){return new RegExp("^(?:"+n.map(L).join("|")+")","i")}function Z(n){for(var e={},t=-1,r=n.length;++t<r;)e[n[t].toLowerCase()]=t;return e}function b(n,e,t){var r=Y.exec(e.slice(t,t+1));return r?(n.w=+r[0],t+r[0].length):-1}function W(n,e,t){var r=Y.exec(e.slice(t,t+1));return r?(n.u=+r[0],t+r[0].length):-1}function V(n,e,t){var r=Y.exec(e.slice(t,t+2));return r?(n.U=+r[0],t+r[0].length):-1}function O(n,e,t){var r=Y.exec(e.slice(t,t+2));return r?(n.V=+r[0],t+r[0].length):-1}function j(n,e,t){var r=Y.exec(e.slice(t,t+2));return r?(n.W=+r[0],t+r[0].length):-1}function q(n,e,t){var r=Y.exec(e.slice(t,t+4));return r?(n.y=+r[0],t+r[0].length):-1}function J(n,e,t){var r=Y.exec(e.slice(t,t+2));return r?(n.y=+r[0]+(+r[0]>68?1900:2e3),t+r[0].length):-1}function Q(n,e,t){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(t,t+6));return r?(n.Z=r[1]?0:-(r[2]+(r[3]||"00")),t+r[0].length):-1}function X(n,e,t){var r=Y.exec(e.slice(t,t+1));return r?(n.q=3*r[0]-3,t+r[0].length):-1}function z(n,e,t){var r=Y.exec(e.slice(t,t+2));return r?(n.m=r[0]-1,t+r[0].length):-1}function I(n,e,t){var r=Y.exec(e.slice(t,t+2));return r?(n.d=+r[0],t+r[0].length):-1}function B(n,e,t){var r=Y.exec(e.slice(t,t+3));return r?(n.m=0,n.d=+r[0],t+r[0].length):-1}function P(n,e,t){var r=Y.exec(e.slice(t,t+2));return r?(n.H=+r[0],t+r[0].length):-1}function N(n,e,t){var r=Y.exec(e.slice(t,t+2));return r?(n.M=+r[0],t+r[0].length):-1}function $(n,e,t){var r=Y.exec(e.slice(t,t+2));return r?(n.S=+r[0],t+r[0].length):-1}function E(n,e,t){var r=Y.exec(e.slice(t,t+3));return r?(n.L=+r[0],t+r[0].length):-1}function R(n,e,t){var r=Y.exec(e.slice(t,t+6));return r?(n.L=Math.floor(r[0]/1e3),t+r[0].length):-1}function _(n,e,t){var r=H.exec(e.slice(t,t+1));return r?t+r[0].length:-1}function k(n,e,t){var r=Y.exec(e.slice(t));return r?(n.Q=+r[0],t+r[0].length):-1}function G(n,e,t){var r=Y.exec(e.slice(t));return r?(n.s=+r[0],t+r[0].length):-1}function K(n,e){return S(n.getDate(),e,2)}function nn(n,e){return S(n.getHours(),e,2)}function en(n,e){return S(n.getHours()%12||12,e,2)}function tn(n,e){return S(1+i.count(g(n),n),e,3)}function rn(n,e){return S(n.getMilliseconds(),e,3)}function un(n,e){return rn(n,e)+"000"}function on(n,e){return S(n.getMonth()+1,e,2)}function cn(n,e){return S(n.getMinutes(),e,2)}function an(n,e){return S(n.getSeconds(),e,2)}function fn(n){var e=n.getDay();return 0===e?7:e}function ln(n,e){return S(a.count(g(n)-1,n),e,2)}function sn(n,e){var t=n.getDay();return n=t>=4||0===t?l(n):l.ceil(n),S(l.count(g(n),n)+(4===g(n).getDay()),e,2)}function gn(n){return n.getDay()}function hn(n,e){return S(f.count(g(n)-1,n),e,2)}function Tn(n,e){return S(n.getFullYear()%100,e,2)}function yn(n,e){return S(n.getFullYear()%1e4,e,4)}function Cn(n){var e=n.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+S(e/60|0,"0",2)+S(e%60,"0",2)}function Dn(n,e){return S(n.getUTCDate(),e,2)}function vn(n,e){return S(n.getUTCHours(),e,2)}function Un(n,e){return S(n.getUTCHours()%12||12,e,2)}function Mn(n,e){return S(1+h.count(v(n),n),e,3)}function dn(n,e){return S(n.getUTCMilliseconds(),e,3)}function mn(n,e){return dn(n,e)+"000"}function wn(n,e){return S(n.getUTCMonth()+1,e,2)}function Fn(n,e){return S(n.getUTCMinutes(),e,2)}function xn(n,e){return S(n.getUTCSeconds(),e,2)}function Yn(n){var e=n.getUTCDay();return 0===e?7:e}function Hn(n,e){return S(y.count(v(n)-1,n),e,2)}function pn(n,e){var t=n.getUTCDay();return n=t>=4||0===t?D(n):D.ceil(n),S(D.count(v(n),n)+(4===v(n).getUTCDay()),e,2)}function Sn(n){return n.getUTCDay()}function Ln(n,e){return S(C.count(v(n)-1,n),e,2)}function An(n,e){return S(n.getUTCFullYear()%100,e,2)}function Zn(n,e){return S(n.getUTCFullYear()%1e4,e,4)}function bn(){return"+0000"}function Wn(){return"%"}function Vn(n){return+n}function On(n){return Math.floor(+n/1e3)}m=function(n){var e=n.dateTime,t=n.date,r=n.time,u=n.periods,o=n.days,c=n.shortDays,a=n.months,l=n.shortMonths,s=A(u),g=Z(u),T=A(o),y=Z(o),D=A(c),v=Z(c),m=A(a),w=Z(a),F=A(l),Y=Z(l),H={a:function(n){return c[n.getDay()]},A:function(n){return o[n.getDay()]},b:function(n){return l[n.getMonth()]},B:function(n){return a[n.getMonth()]},c:null,d:K,e:K,f:un,H:nn,I:en,j:tn,L:rn,m:on,M:cn,p:function(n){return u[+(n.getHours()>=12)]},q:function(n){return 1+~~(n.getMonth()/3)},Q:Vn,s:On,S:an,u:fn,U:ln,V:sn,w:gn,W:hn,x:null,X:null,y:Tn,Y:yn,Z:Cn,"%":Wn},p={a:function(n){return c[n.getUTCDay()]},A:function(n){return o[n.getUTCDay()]},b:function(n){return l[n.getUTCMonth()]},B:function(n){return a[n.getUTCMonth()]},c:null,d:Dn,e:Dn,f:mn,H:vn,I:Un,j:Mn,L:dn,m:wn,M:Fn,p:function(n){return u[+(n.getUTCHours()>=12)]},q:function(n){return 1+~~(n.getUTCMonth()/3)},Q:Vn,s:On,S:xn,u:Yn,U:Hn,V:pn,w:Sn,W:Ln,x:null,X:null,y:An,Y:Zn,Z:bn,"%":Wn},S={a:function(n,e,t){var r=D.exec(e.slice(t));return r?(n.w=v[r[0].toLowerCase()],t+r[0].length):-1},A:function(n,e,t){var r=T.exec(e.slice(t));return r?(n.w=y[r[0].toLowerCase()],t+r[0].length):-1},b:function(n,e,t){var r=F.exec(e.slice(t));return r?(n.m=Y[r[0].toLowerCase()],t+r[0].length):-1},B:function(n,e,t){var r=m.exec(e.slice(t));return r?(n.m=w[r[0].toLowerCase()],t+r[0].length):-1},c:function(n,t,r){return qn(n,e,t,r)},d:I,e:I,f:R,H:P,I:P,j:B,L:E,m:z,M:N,p:function(n,e,t){var r=s.exec(e.slice(t));return r?(n.p=g[r[0].toLowerCase()],t+r[0].length):-1},q:X,Q:k,s:G,S:$,u:W,U:V,V:O,w:b,W:j,x:function(n,e,r){return qn(n,t,e,r)},X:function(n,e,t){return qn(n,r,e,t)},y:J,Y:q,Z:Q,"%":_};function L(n,e){return function(t){var r,u,o,i=[],c=-1,a=0,f=n.length;for(t instanceof Date||(t=new Date(+t));++c<f;)37===n.charCodeAt(c)&&(i.push(n.slice(a,c)),null!=(u=x[r=n.charAt(++c)])?r=n.charAt(++c):u="e"===r?" ":"0",(o=e[r])&&(r=o(t,u)),i.push(r),a=c+1);return i.push(n.slice(a,c)),i.join("")}}function jn(n,e){return function(t){var r,u,o=d(1900,void 0,1);if(qn(o,n,t+="",0)!=t.length)return null;if("Q"in o)return new Date(o.Q);if("s"in o)return new Date(1e3*o.s+("L"in o?o.L:0));if(e&&!("Z"in o)&&(o.Z=0),"p"in o&&(o.H=o.H%12+12*o.p),void 0===o.m&&(o.m="q"in o?o.q:0),"V"in o){if(o.V<1||o.V>53)return null;"w"in o||(o.w=1),"Z"in o?(u=(r=M(d(o.y,0,1))).getUTCDay(),r=u>4||0===u?C.ceil(r):C(r),r=h.offset(r,7*(o.V-1)),o.y=r.getUTCFullYear(),o.m=r.getUTCMonth(),o.d=r.getUTCDate()+(o.w+6)%7):(u=(r=U(d(o.y,0,1))).getDay(),r=u>4||0===u?f.ceil(r):f(r),r=i.offset(r,7*(o.V-1)),o.y=r.getFullYear(),o.m=r.getMonth(),o.d=r.getDate()+(o.w+6)%7)}else("W"in o||"U"in o)&&("w"in o||(o.w="u"in o?o.u%7:"W"in o?1:0),u="Z"in o?M(d(o.y,0,1)).getUTCDay():U(d(o.y,0,1)).getDay(),o.m=0,o.d="W"in o?(o.w+6)%7+7*o.W-(u+5)%7:o.w+7*o.U-(u+6)%7);return"Z"in o?(o.H+=o.Z/100|0,o.M+=o.Z%100,M(o)):U(o)}}function qn(n,e,t,r){for(var u,o,i=0,c=e.length,a=t.length;i<c;){if(r>=a)return-1;if(37===(u=e.charCodeAt(i++))){if(u=e.charAt(i++),!(o=S[u in x?e.charAt(i++):u])||(r=o(n,t,r))<0)return-1}else if(u!=t.charCodeAt(r++))return-1}return r}return H.x=L(t,H),H.X=L(r,H),H.c=L(e,H),p.x=L(t,p),p.X=L(r,p),p.c=L(e,p),{format:function(n){var e=L(n+="",H);return e.toString=function(){return n},e},parse:function(n){var e=jn(n+="",!1);return e.toString=function(){return n},e},utcFormat:function(n){var e=L(n+="",p);return e.toString=function(){return n},e},utcParse:function(n){var e=jn(n+="",!0);return e.toString=function(){return n},e}}}({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}),w=m.format,F=m.parse,m.utcFormat,m.utcParse;export{F as a,r as b,u as c,i as d,o as e,s as f,t as n,a as s,w as t,g as y};