import{n as t,b as n,c as i,e}from"./defaultLocale-1a6cbc98.js";var s=Math.PI,o=2*s,u=o-1e-6;function h(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function r(){return new h}h.prototype=r.prototype={constructor:h,moveTo:function(t,n){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,n){this._+="L"+(this._x1=+t)+","+(this._y1=+n)},quadraticCurveTo:function(t,n,i,e){this._+="Q"+ +t+","+ +n+","+(this._x1=+i)+","+(this._y1=+e)},bezierCurveTo:function(t,n,i,e,s,o){this._+="C"+ +t+","+ +n+","+ +i+","+ +e+","+(this._x1=+s)+","+(this._y1=+o)},arcTo:function(t,n,i,e,o){t=+t,n=+n,i=+i,e=+e,o=+o;var u=this._x1,h=this._y1,r=i-t,c=e-n,_=u-t,f=h-n,a=_*_+f*f;if(o<0)throw new Error("negative radius: "+o);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=n);else if(a>1e-6)if(Math.abs(f*r-c*_)>1e-6&&o){var l=i-u,x=e-h,M=r*r+c*c,y=l*l+x*x,g=Math.sqrt(M),p=Math.sqrt(a),T=o*Math.tan((s-Math.acos((M+a-y)/(2*g*p)))/2),v=T/p,d=T/g;Math.abs(v-1)>1e-6&&(this._+="L"+(t+v*_)+","+(n+v*f)),this._+="A"+o+","+o+",0,0,"+ +(f*l>_*x)+","+(this._x1=t+d*r)+","+(this._y1=n+d*c)}else this._+="L"+(this._x1=t)+","+(this._y1=n);else;},arc:function(t,n,i,e,h,r){t=+t,n=+n,r=!!r;var c=(i=+i)*Math.cos(e),_=i*Math.sin(e),f=t+c,a=n+_,l=1^r,x=r?e-h:h-e;if(i<0)throw new Error("negative radius: "+i);null===this._x1?this._+="M"+f+","+a:(Math.abs(this._x1-f)>1e-6||Math.abs(this._y1-a)>1e-6)&&(this._+="L"+f+","+a),i&&(x<0&&(x=x%o+o),x>u?this._+="A"+i+","+i+",0,1,"+l+","+(t-c)+","+(n-_)+"A"+i+","+i+",0,1,"+l+","+(this._x1=f)+","+(this._y1=a):x>1e-6&&(this._+="A"+i+","+i+",0,"+ +(x>=s)+","+l+","+(this._x1=t+i*Math.cos(h))+","+(this._y1=n+i*Math.sin(h))))},rect:function(t,n,i,e){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+n)+"h"+ +i+"v"+ +e+"h"+-i+"Z"},toString:function(){return this._}};var c=t((function(){}),(function(t,n){t.setTime(+t+n)}),(function(t,n){return n-t}));c.every=function(n){return n=Math.floor(n),isFinite(n)&&n>0?n>1?t((function(t){t.setTime(Math.floor(t/n)*n)}),(function(t,i){t.setTime(+t+i*n)}),(function(t,i){return(i-t)/n})):c:null};var _=t((function(t){t.setTime(t-t.getMilliseconds())}),(function(t,i){t.setTime(+t+i*n)}),(function(t,i){return(i-t)/n}),(function(t){return t.getUTCSeconds()})),f=t((function(t){t.setTime(t-t.getMilliseconds()-t.getSeconds()*n)}),(function(t,n){t.setTime(+t+n*i)}),(function(t,n){return(n-t)/i}),(function(t){return t.getMinutes()})),a=t((function(t){t.setTime(t-t.getMilliseconds()-t.getSeconds()*n-t.getMinutes()*i)}),(function(t,n){t.setTime(+t+n*e)}),(function(t,n){return(n-t)/e}),(function(t){return t.getHours()})),l=t((function(t){t.setDate(1),t.setHours(0,0,0,0)}),(function(t,n){t.setMonth(t.getMonth()+n)}),(function(t,n){return n.getMonth()-t.getMonth()+12*(n.getFullYear()-t.getFullYear())}),(function(t){return t.getMonth()}));function x(t){return function(){return t}}function M(t){this._context=t}function y(t){return new M(t)}function g(t){return t[0]}function p(t){return t[1]}function T(){var t=g,n=p,i=x(!0),e=null,s=y,o=null;function u(u){var h,c,_,f=u.length,a=!1;for(null==e&&(o=s(_=r())),h=0;h<=f;++h)!(h<f&&i(c=u[h],h,u))===a&&((a=!a)?o.lineStart():o.lineEnd()),a&&o.point(+t(c,h,u),+n(c,h,u));if(_)return o=null,_+""||null}return u.x=function(n){return arguments.length?(t="function"==typeof n?n:x(+n),u):t},u.y=function(t){return arguments.length?(n="function"==typeof t?t:x(+t),u):n},u.defined=function(t){return arguments.length?(i="function"==typeof t?t:x(!!t),u):i},u.curve=function(t){return arguments.length?(s=t,null!=e&&(o=s(e)),u):s},u.context=function(t){return arguments.length?(null==t?e=o=null:o=s(e=t),u):e},u}M.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,n){switch(t=+t,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break;case 1:this._point=2;default:this._context.lineTo(t,n)}}};export{f as a,l as b,a as h,T as l,c as m,_ as s};