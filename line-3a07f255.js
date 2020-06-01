import{i as t,d as n,g as e,m as i,h as r,k as o,t as s}from"./linear-93e29e1f.js";import{n as u,b as h,c,e as a,a as f,d as l,s as _,y as g}from"./defaultLocale-94b85140.js";var M=Math.PI,y=2*M,x=y-1e-6;function v(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function p(){return new v}v.prototype=p.prototype={constructor:v,moveTo:function(t,n){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,n){this._+="L"+(this._x1=+t)+","+(this._y1=+n)},quadraticCurveTo:function(t,n,e,i){this._+="Q"+ +t+","+ +n+","+(this._x1=+e)+","+(this._y1=+i)},bezierCurveTo:function(t,n,e,i,r,o){this._+="C"+ +t+","+ +n+","+ +e+","+ +i+","+(this._x1=+r)+","+(this._y1=+o)},arcTo:function(t,n,e,i,r){t=+t,n=+n,e=+e,i=+i,r=+r;var o=this._x1,s=this._y1,u=e-t,h=i-n,c=o-t,a=s-n,f=c*c+a*a;if(r<0)throw new Error("negative radius: "+r);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=n);else if(f>1e-6)if(Math.abs(a*u-h*c)>1e-6&&r){var l=e-o,_=i-s,g=u*u+h*h,y=l*l+_*_,x=Math.sqrt(g),v=Math.sqrt(f),p=r*Math.tan((M-Math.acos((g+f-y)/(2*x*v)))/2),d=p/v,m=p/x;Math.abs(d-1)>1e-6&&(this._+="L"+(t+d*c)+","+(n+d*a)),this._+="A"+r+","+r+",0,0,"+ +(a*l>c*_)+","+(this._x1=t+m*u)+","+(this._y1=n+m*h)}else this._+="L"+(this._x1=t)+","+(this._y1=n);else;},arc:function(t,n,e,i,r,o){t=+t,n=+n,o=!!o;var s=(e=+e)*Math.cos(i),u=e*Math.sin(i),h=t+s,c=n+u,a=1^o,f=o?i-r:r-i;if(e<0)throw new Error("negative radius: "+e);null===this._x1?this._+="M"+h+","+c:(Math.abs(this._x1-h)>1e-6||Math.abs(this._y1-c)>1e-6)&&(this._+="L"+h+","+c),e&&(f<0&&(f=f%y+y),f>x?this._+="A"+e+","+e+",0,1,"+a+","+(t-s)+","+(n-u)+"A"+e+","+e+",0,1,"+a+","+(this._x1=h)+","+(this._y1=c):f>1e-6&&(this._+="A"+e+","+e+",0,"+ +(f>=M)+","+a+","+(this._x1=t+e*Math.cos(r))+","+(this._y1=n+e*Math.sin(r))))},rect:function(t,n,e,i){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)+"h"+ +e+"v"+ +i+"h"+-e+"Z"},toString:function(){return this._}};var d=u((function(){}),(function(t,n){t.setTime(+t+n)}),(function(t,n){return n-t}));d.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?u((function(n){n.setTime(Math.floor(n/t)*t)}),(function(n,e){n.setTime(+n+e*t)}),(function(n,e){return(e-n)/t})):d:null};var m=u((function(t){t.setTime(t-t.getMilliseconds())}),(function(t,n){t.setTime(+t+n*h)}),(function(t,n){return(n-t)/h}),(function(t){return t.getUTCSeconds()})),T=u((function(t){t.setTime(t-t.getMilliseconds()-t.getSeconds()*h)}),(function(t,n){t.setTime(+t+n*c)}),(function(t,n){return(n-t)/c}),(function(t){return t.getMinutes()})),w=u((function(t){t.setTime(t-t.getMilliseconds()-t.getSeconds()*h-t.getMinutes()*c)}),(function(t,n){t.setTime(+t+n*a)}),(function(t,n){return(n-t)/a}),(function(t){return t.getHours()})),b=u((function(t){t.setDate(1),t.setHours(0,0,0,0)}),(function(t,n){t.setMonth(t.getMonth()+n)}),(function(t,n){return n.getMonth()-t.getMonth()+12*(n.getFullYear()-t.getFullYear())}),(function(t){return t.getMonth()}));function S(t){return new Date(t)}function D(t){return t instanceof Date?+t:+new Date(+t)}function L(t,u,h,c,a,f,l,_,g){var M=n(e,e),y=M.invert,x=M.domain,v=g(".%L"),p=g(":%S"),d=g("%I:%M"),m=g("%I %p"),T=g("%a %d"),w=g("%b %d"),b=g("%B"),E=g("%Y"),k=[[l,1,1e3],[l,5,5e3],[l,15,15e3],[l,30,3e4],[f,1,6e4],[f,5,3e5],[f,15,9e5],[f,30,18e5],[a,1,36e5],[a,3,108e5],[a,6,216e5],[a,12,432e5],[c,1,864e5],[c,2,1728e5],[h,1,6048e5],[u,1,2592e6],[u,3,7776e6],[t,1,31536e6]];function A(n){return(l(n)<n?v:f(n)<n?p:a(n)<n?d:c(n)<n?m:u(n)<n?h(n)<n?T:w:t(n)<n?b:E)(n)}function C(n,e,i,r){if(null==n&&(n=10),"number"==typeof n){var u=Math.abs(i-e)/n,h=o((function(t){return t[2]})).right(k,u);h===k.length?(r=s(e/31536e6,i/31536e6,n),n=t):h?(r=(h=k[u/k[h-1][2]<k[h][2]/u?h-1:h])[1],n=h[0]):(r=Math.max(s(e,i,n),1),n=_)}return null==r?n:n.every(r)}return M.invert=function(t){return new Date(y(t))},M.domain=function(t){return arguments.length?x(i.call(t,D)):x().map(S)},M.ticks=function(t,n){var e,i=x(),r=i[0],o=i[i.length-1],s=o<r;return s&&(e=r,r=o,o=e),e=(e=C(t,r,o,n))?e.range(r,o+1):[],s?e.reverse():e},M.tickFormat=function(t,n){return null==n?A:g(n)},M.nice=function(t,n){var e=x();return(t=C(t,e[0],e[e.length-1],n))?x(function(t,n){var e,i=0,r=(t=t.slice()).length-1,o=t[i],s=t[r];return s<o&&(e=i,i=r,r=e,e=o,o=s,s=e),t[i]=n.floor(o),t[r]=n.ceil(s),t}(e,t)):M},M.copy=function(){return r(M,L(t,u,h,c,a,f,l,_,g))},M}function E(){return t.apply(L(g,b,_,l,w,T,m,d,f).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}function k(t){return function(){return t}}function A(t){this._context=t}function C(t){return new A(t)}function F(t){return t[0]}function q(t){return t[1]}function I(){var t=F,n=q,e=k(!0),i=null,r=C,o=null;function s(s){var u,h,c,a=s.length,f=!1;for(null==i&&(o=r(c=p())),u=0;u<=a;++u)!(u<a&&e(h=s[u],u,s))===f&&((f=!f)?o.lineStart():o.lineEnd()),f&&o.point(+t(h,u,s),+n(h,u,s));if(c)return o=null,c+""||null}return s.x=function(n){return arguments.length?(t="function"==typeof n?n:k(+n),s):t},s.y=function(t){return arguments.length?(n="function"==typeof t?t:k(+t),s):n},s.defined=function(t){return arguments.length?(e="function"==typeof t?t:k(!!t),s):e},s.curve=function(t){return arguments.length?(r=t,null!=i&&(o=r(i)),s):r},s.context=function(t){return arguments.length?(null==t?i=o=null:o=r(i=t),s):i},s}A.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._context.lineTo(t,n)}}};export{I as l,E as t};
