import"../index-54c9ecd2.js";import{j as n,s as t,g as r}from"../precisionRound-f2241ba6.js";import{e as i,l as e}from"../linear-3681a81c.js";import{m as o}from"../max-fec1de3e.js";var u={},a={};function c(n){return new Function("d","return {"+n.map((function(n,t){return JSON.stringify(n)+": d["+t+'] || ""'})).join(",")+"}")}function l(n){var t=Object.create(null),r=[];return n.forEach((function(n){for(var i in n)i in t||r.push(t[i]=i)})),r}function f(n,t){var r=n+"",i=r.length;return i<t?new Array(t-i+1).join(0)+r:r}function s(n){var t,r=n.getUTCHours(),i=n.getUTCMinutes(),e=n.getUTCSeconds(),o=n.getUTCMilliseconds();return isNaN(n)?"Invalid Date":((t=n.getUTCFullYear())<0?"-"+f(-t,6):t>9999?"+"+f(t,6):f(t,4))+"-"+f(n.getUTCMonth()+1,2)+"-"+f(n.getUTCDate(),2)+(o?"T"+f(r,2)+":"+f(i,2)+":"+f(e,2)+"."+f(o,3)+"Z":e?"T"+f(r,2)+":"+f(i,2)+":"+f(e,2)+"Z":i||r?"T"+f(r,2)+":"+f(i,2)+"Z":"")}var p=function(n){var t=new RegExp('["'+n+"\n\r]"),r=n.charCodeAt(0);function i(n,t){var i,e=[],o=n.length,c=0,l=0,f=o<=0,s=!1;function p(){if(f)return a;if(s)return s=!1,u;var t,i,e=c;if(34===n.charCodeAt(e)){for(;c++<o&&34!==n.charCodeAt(c)||34===n.charCodeAt(++c););return(t=c)>=o?f=!0:10===(i=n.charCodeAt(c++))?s=!0:13===i&&(s=!0,10===n.charCodeAt(c)&&++c),n.slice(e+1,t-1).replace(/""/g,'"')}for(;c<o;){if(10===(i=n.charCodeAt(t=c++)))s=!0;else if(13===i)s=!0,10===n.charCodeAt(c)&&++c;else if(i!==r)continue;return n.slice(e,t)}return f=!0,n.slice(e,o)}for(10===n.charCodeAt(o-1)&&--o,13===n.charCodeAt(o-1)&&--o;(i=p())!==a;){for(var h=[];i!==u&&i!==a;)h.push(i),i=p();t&&null==(h=t(h,l++))||e.push(h)}return e}function e(t,r){return t.map((function(t){return r.map((function(n){return f(t[n])})).join(n)}))}function o(t){return t.map(f).join(n)}function f(n){return null==n?"":n instanceof Date?s(n):t.test(n+="")?'"'+n.replace(/"/g,'""')+'"':n}return{parse:function(n,t){var r,e,o=i(n,(function(n,i){if(r)return r(n,i-1);e=n,r=t?function(n,t){var r=c(n);return function(i,e){return t(r(i),e,n)}}(n,t):c(n)}));return o.columns=e||[],o},parseRows:i,format:function(t,r){return null==r&&(r=l(t)),[r.map(f).join(n)].concat(e(t,r)).join("\n")},formatBody:function(n,t){return null==t&&(t=l(n)),e(n,t).join("\n")},formatRows:function(n){return n.map(o).join("\n")},formatRow:o,formatValue:f}}(",").parse;function h(n){if(!n.ok)throw new Error(n.status+" "+n.statusText);return n.text()}function d(n,t){return fetch(n,t).then(h)}var g,v=(g=p,function(n,t,r){return 2===arguments.length&&"function"==typeof t&&(r=t,t=void 0),d(n,t).then((function(n){return g(n,r)}))});function y(){return new m}function m(){this.reset()}m.prototype={constructor:m,reset:function(){this.s=this.t=0},add:function(n){E(S,n,this.t),E(this,S.s,this.s),this.s?this.t+=S.t:this.s=S.t},valueOf:function(){return this.s}};var S=new m;function E(n,t,r){var i=n.s=t+r,e=i-t,o=i-e;n.t=t-o+(r-e)}var x=1e-6,M=Math.PI,_=M/2,w=M/4,N=2*M,j=180/M,C=M/180,b=Math.abs,A=Math.atan,T=Math.atan2,P=Math.cos,R=Math.ceil,k=Math.sin,U=Math.sign||function(n){return n>0?1:n<0?-1:0},z=Math.sqrt;function H(n){return n>1?_:n<-1?-_:Math.asin(n)}function L(){}function O(n,t){n&&$.hasOwnProperty(n.type)&&$[n.type](n,t)}var W={Feature:function(n,t){O(n.geometry,t)},FeatureCollection:function(n,t){for(var r=n.features,i=-1,e=r.length;++i<e;)O(r[i].geometry,t)}},$={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var r=n.coordinates,i=-1,e=r.length;++i<e;)n=r[i],t.point(n[0],n[1],n[2])},LineString:function(n,t){D(n.coordinates,t,0)},MultiLineString:function(n,t){for(var r=n.coordinates,i=-1,e=r.length;++i<e;)D(r[i],t,0)},Polygon:function(n,t){F(n.coordinates,t)},MultiPolygon:function(n,t){for(var r=n.coordinates,i=-1,e=r.length;++i<e;)F(r[i],t)},GeometryCollection:function(n,t){for(var r=n.geometries,i=-1,e=r.length;++i<e;)O(r[i],t)}};function D(n,t,r){var i,e=-1,o=n.length-r;for(t.lineStart();++e<o;)i=n[e],t.point(i[0],i[1],i[2]);t.lineEnd()}function F(n,t){var r=-1,i=n.length;for(t.polygonStart();++r<i;)D(n[r],t,1);t.polygonEnd()}function Z(n,t){n&&W.hasOwnProperty(n.type)?W[n.type](n,t):O(n,t)}function G(n){return[T(n[1],n[0]),H(n[2])]}function I(n){var t=n[0],r=n[1],i=P(r);return[i*P(t),i*k(t),k(r)]}function Y(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function q(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function B(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function J(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function V(n){var t=z(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function X(n,t){function r(r,i){return r=n(r,i),t(r[0],r[1])}return n.invert&&t.invert&&(r.invert=function(r,i){return(r=t.invert(r,i))&&n.invert(r[0],r[1])}),r}function K(n,t){return[b(n)>M?n+Math.round(-n/N)*N:n,t]}function Q(n){return function(t,r){return[(t+=n)>M?t-N:t<-M?t+N:t,r]}}function nn(n){var t=Q(n);return t.invert=Q(-n),t}function tn(n,t){var r=P(n),i=k(n),e=P(t),o=k(t);function u(n,t){var u=P(t),a=P(n)*u,c=k(n)*u,l=k(t),f=l*r+a*i;return[T(c*e-f*o,a*r-l*i),H(f*e+c*o)]}return u.invert=function(n,t){var u=P(t),a=P(n)*u,c=k(n)*u,l=k(t),f=l*e-c*o;return[T(c*e+l*o,a*r+f*i),H(f*r-a*i)]},u}function rn(n,t){(t=I(t))[0]-=n,V(t);var r,i=(r=-t[1])>1?0:r<-1?M:Math.acos(r);return((-t[2]<0?-i:i)+N-x)%N}function en(){var n,t=[];return{point:function(t,r,i){n.push([t,r,i])},lineStart:function(){t.push(n=[])},lineEnd:L,rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))},result:function(){var r=t;return t=[],n=null,r}}}function on(n,t){return b(n[0]-t[0])<x&&b(n[1]-t[1])<x}function un(n,t,r,i){this.x=n,this.z=t,this.o=r,this.e=i,this.v=!1,this.n=this.p=null}function an(n,t,r,i,e){var o,u,a=[],c=[];if(n.forEach((function(n){if(!((t=n.length-1)<=0)){var t,r,i=n[0],u=n[t];if(on(i,u)){if(!i[2]&&!u[2]){for(e.lineStart(),o=0;o<t;++o)e.point((i=n[o])[0],i[1]);return void e.lineEnd()}u[0]+=2e-6}a.push(r=new un(i,n,null,!0)),c.push(r.o=new un(i,null,r,!1)),a.push(r=new un(u,n,null,!1)),c.push(r.o=new un(u,null,r,!0))}})),a.length){for(c.sort(t),cn(a),cn(c),o=0,u=c.length;o<u;++o)c[o].e=r=!r;for(var l,f,s=a[0];;){for(var p=s,h=!0;p.v;)if((p=p.n)===s)return;l=p.z,e.lineStart();do{if(p.v=p.o.v=!0,p.e){if(h)for(o=0,u=l.length;o<u;++o)e.point((f=l[o])[0],f[1]);else i(p.x,p.n.x,1,e);p=p.n}else{if(h)for(l=p.p.z,o=l.length-1;o>=0;--o)e.point((f=l[o])[0],f[1]);else i(p.x,p.p.x,-1,e);p=p.p}l=(p=p.o).z,h=!h}while(!p.v);e.lineEnd()}}}function cn(n){if(t=n.length){for(var t,r,i=0,e=n[0];++i<t;)e.n=r=n[i],r.p=e,e=r;e.n=r=n[0],r.p=e}}K.invert=K;var ln=y();function fn(n){return b(n[0])<=M?n[0]:U(n[0])*((b(n[0])+M)%N-M)}function sn(n,t){return n<t?-1:n>t?1:n>=t?0:NaN}var pn,hn;1===(pn=sn).length&&(hn=pn,pn=function(n,t){return sn(hn(n),t)});function dn(n,t,r){n=+n,t=+t,r=(e=arguments.length)<2?(t=n,n=0,1):e<3?1:+r;for(var i=-1,e=0|Math.max(0,Math.ceil((t-n)/r)),o=new Array(e);++i<e;)o[i]=n+i*r;return o}function gn(n){for(var t,r,i,e=n.length,o=-1,u=0;++o<e;)u+=n[o].length;for(r=new Array(u);--e>=0;)for(t=(i=n[e]).length;--t>=0;)r[--u]=i[t];return r}function vn(n,t,r,i){return function(e){var o,u,a,c=t(e),l=en(),f=t(l),s=!1,p={point:h,lineStart:g,lineEnd:v,polygonStart:function(){p.point=y,p.lineStart=m,p.lineEnd=S,u=[],o=[]},polygonEnd:function(){p.point=h,p.lineStart=g,p.lineEnd=v,u=gn(u);var n=function(n,t){var r=fn(t),i=t[1],e=k(i),o=[k(r),-P(r),0],u=0,a=0;ln.reset(),1===e?i=_+x:-1===e&&(i=-_-x);for(var c=0,l=n.length;c<l;++c)if(s=(f=n[c]).length)for(var f,s,p=f[s-1],h=fn(p),d=p[1]/2+w,g=k(d),v=P(d),y=0;y<s;++y,h=S,g=j,v=C,p=m){var m=f[y],S=fn(m),E=m[1]/2+w,j=k(E),C=P(E),b=S-h,A=b>=0?1:-1,R=A*b,U=R>M,z=g*j;if(ln.add(T(z*A*k(R),v*C+z*P(R))),u+=U?b+A*N:b,U^h>=r^S>=r){var L=q(I(p),I(m));V(L);var O=q(o,L);V(O);var W=(U^b>=0?-1:1)*H(O[2]);(i>W||i===W&&(L[0]||L[1]))&&(a+=U^b>=0?1:-1)}}return(u<-x||u<x&&ln<-x)^1&a}(o,i);u.length?(s||(e.polygonStart(),s=!0),an(u,mn,n,r,e)):n&&(s||(e.polygonStart(),s=!0),e.lineStart(),r(null,null,1,e),e.lineEnd()),s&&(e.polygonEnd(),s=!1),u=o=null},sphere:function(){e.polygonStart(),e.lineStart(),r(null,null,1,e),e.lineEnd(),e.polygonEnd()}};function h(t,r){n(t,r)&&e.point(t,r)}function d(n,t){c.point(n,t)}function g(){p.point=d,c.lineStart()}function v(){p.point=h,c.lineEnd()}function y(n,t){a.push([n,t]),f.point(n,t)}function m(){f.lineStart(),a=[]}function S(){y(a[0][0],a[0][1]),f.lineEnd();var n,t,r,i,c=f.clean(),p=l.result(),h=p.length;if(a.pop(),o.push(a),a=null,h)if(1&c){if((t=(r=p[0]).length-1)>0){for(s||(e.polygonStart(),s=!0),e.lineStart(),n=0;n<t;++n)e.point((i=r[n])[0],i[1]);e.lineEnd()}}else h>1&&2&c&&p.push(p.pop().concat(p.shift())),u.push(p.filter(yn))}return p}}function yn(n){return n.length>1}function mn(n,t){return((n=n.x)[0]<0?n[1]-_-x:_-n[1])-((t=t.x)[0]<0?t[1]-_-x:_-t[1])}var Sn=vn((function(){return!0}),(function(n){var t,r=NaN,i=NaN,e=NaN;return{lineStart:function(){n.lineStart(),t=1},point:function(o,u){var a=o>0?M:-M,c=b(o-r);b(c-M)<x?(n.point(r,i=(i+u)/2>0?_:-_),n.point(e,i),n.lineEnd(),n.lineStart(),n.point(a,i),n.point(o,i),t=0):e!==a&&c>=M&&(b(r-e)<x&&(r-=e*x),b(o-a)<x&&(o-=a*x),i=function(n,t,r,i){var e,o,u=k(n-r);return b(u)>x?A((k(t)*(o=P(i))*k(r)-k(i)*(e=P(t))*k(n))/(e*o*u)):(t+i)/2}(r,i,o,u),n.point(e,i),n.lineEnd(),n.lineStart(),n.point(a,i),t=0),n.point(r=o,i=u),e=a},lineEnd:function(){n.lineEnd(),r=i=NaN},clean:function(){return 2-t}}}),(function(n,t,r,i){var e;if(null==n)e=r*_,i.point(-M,e),i.point(0,e),i.point(M,e),i.point(M,0),i.point(M,-e),i.point(0,-e),i.point(-M,-e),i.point(-M,0),i.point(-M,e);else if(b(n[0]-t[0])>x){var o=n[0]<t[0]?M:-M;e=r*o/2,i.point(-o,e),i.point(0,e),i.point(o,e)}else i.point(t[0],t[1])}),[-M,-_]);function En(n){var t=P(n),r=6*C,i=t>0,e=b(t)>x;function o(n,r){return P(n)*P(r)>t}function u(n,r,i){var e=[1,0,0],o=q(I(n),I(r)),u=Y(o,o),a=o[0],c=u-a*a;if(!c)return!i&&n;var l=t*u/c,f=-t*a/c,s=q(e,o),p=J(e,l);B(p,J(o,f));var h=s,d=Y(p,h),g=Y(h,h),v=d*d-g*(Y(p,p)-1);if(!(v<0)){var y=z(v),m=J(h,(-d-y)/g);if(B(m,p),m=G(m),!i)return m;var S,E=n[0],_=r[0],w=n[1],N=r[1];_<E&&(S=E,E=_,_=S);var j=_-E,C=b(j-M)<x;if(!C&&N<w&&(S=w,w=N,N=S),C||j<x?C?w+N>0^m[1]<(b(m[0]-E)<x?w:N):w<=m[1]&&m[1]<=N:j>M^(E<=m[0]&&m[0]<=_)){var A=J(h,(-d+y)/g);return B(A,p),[m,G(A)]}}}function a(t,r){var e=i?n:M-n,o=0;return t<-e?o|=1:t>e&&(o|=2),r<-e?o|=4:r>e&&(o|=8),o}return vn(o,(function(n){var t,r,c,l,f;return{lineStart:function(){l=c=!1,f=1},point:function(s,p){var h,d=[s,p],g=o(s,p),v=i?g?0:a(s,p):g?a(s+(s<0?M:-M),p):0;if(!t&&(l=c=g)&&n.lineStart(),g!==c&&(!(h=u(t,d))||on(t,h)||on(d,h))&&(d[2]=1),g!==c)f=0,g?(n.lineStart(),h=u(d,t),n.point(h[0],h[1])):(h=u(t,d),n.point(h[0],h[1],2),n.lineEnd()),t=h;else if(e&&t&&i^g){var y;v&r||!(y=u(d,t,!0))||(f=0,i?(n.lineStart(),n.point(y[0][0],y[0][1]),n.point(y[1][0],y[1][1]),n.lineEnd()):(n.point(y[1][0],y[1][1]),n.lineEnd(),n.lineStart(),n.point(y[0][0],y[0][1],3)))}!g||t&&on(t,d)||n.point(d[0],d[1]),t=d,c=g,r=v},lineEnd:function(){c&&n.lineEnd(),t=null},clean:function(){return f|(l&&c)<<1}}}),(function(t,i,e,o){!function(n,t,r,i,e,o){if(r){var u=P(t),a=k(t),c=i*r;null==e?(e=t+i*N,o=t-c/2):(e=rn(u,e),o=rn(u,o),(i>0?e<o:e>o)&&(e+=i*N));for(var l,f=e;i>0?f>o:f<o;f-=c)l=G([u,-a*P(f),-a*k(f)]),n.point(l[0],l[1])}}(o,n,r,e,t,i)}),i?[0,-n]:[-M,n-M])}function xn(n,t,r,i){function e(e,o){return n<=e&&e<=r&&t<=o&&o<=i}function o(e,o,a,l){var f=0,s=0;if(null==e||(f=u(e,a))!==(s=u(o,a))||c(e,o)<0^a>0)do{l.point(0===f||3===f?n:r,f>1?i:t)}while((f=(f+a+4)%4)!==s);else l.point(o[0],o[1])}function u(i,e){return b(i[0]-n)<x?e>0?0:3:b(i[0]-r)<x?e>0?2:1:b(i[1]-t)<x?e>0?1:0:e>0?3:2}function a(n,t){return c(n.x,t.x)}function c(n,t){var r=u(n,1),i=u(t,1);return r!==i?r-i:0===r?t[1]-n[1]:1===r?n[0]-t[0]:2===r?n[1]-t[1]:t[0]-n[0]}return function(u){var c,l,f,s,p,h,d,g,v,y,m,S=u,E=en(),x={point:M,lineStart:function(){x.point=_,l&&l.push(f=[]);y=!0,v=!1,d=g=NaN},lineEnd:function(){c&&(_(s,p),h&&v&&E.rejoin(),c.push(E.result()));x.point=M,v&&S.lineEnd()},polygonStart:function(){S=E,c=[],l=[],m=!0},polygonEnd:function(){var t=function(){for(var t=0,r=0,e=l.length;r<e;++r)for(var o,u,a=l[r],c=1,f=a.length,s=a[0],p=s[0],h=s[1];c<f;++c)o=p,u=h,s=a[c],p=s[0],h=s[1],u<=i?h>i&&(p-o)*(i-u)>(h-u)*(n-o)&&++t:h<=i&&(p-o)*(i-u)<(h-u)*(n-o)&&--t;return t}(),r=m&&t,e=(c=gn(c)).length;(r||e)&&(u.polygonStart(),r&&(u.lineStart(),o(null,null,1,u),u.lineEnd()),e&&an(c,a,t,o,u),u.polygonEnd());S=u,c=l=f=null}};function M(n,t){e(n,t)&&S.point(n,t)}function _(o,u){var a=e(o,u);if(l&&f.push([o,u]),y)s=o,p=u,h=a,y=!1,a&&(S.lineStart(),S.point(o,u));else if(a&&v)S.point(o,u);else{var c=[d=Math.max(-1e9,Math.min(1e9,d)),g=Math.max(-1e9,Math.min(1e9,g))],E=[o=Math.max(-1e9,Math.min(1e9,o)),u=Math.max(-1e9,Math.min(1e9,u))];!function(n,t,r,i,e,o){var u,a=n[0],c=n[1],l=0,f=1,s=t[0]-a,p=t[1]-c;if(u=r-a,s||!(u>0)){if(u/=s,s<0){if(u<l)return;u<f&&(f=u)}else if(s>0){if(u>f)return;u>l&&(l=u)}if(u=e-a,s||!(u<0)){if(u/=s,s<0){if(u>f)return;u>l&&(l=u)}else if(s>0){if(u<l)return;u<f&&(f=u)}if(u=i-c,p||!(u>0)){if(u/=p,p<0){if(u<l)return;u<f&&(f=u)}else if(p>0){if(u>f)return;u>l&&(l=u)}if(u=o-c,p||!(u<0)){if(u/=p,p<0){if(u>f)return;u>l&&(l=u)}else if(p>0){if(u<l)return;u<f&&(f=u)}return l>0&&(n[0]=a+l*s,n[1]=c+l*p),f<1&&(t[0]=a+f*s,t[1]=c+f*p),!0}}}}}(c,E,n,t,r,i)?a&&(S.lineStart(),S.point(o,u),m=!1):(v||(S.lineStart(),S.point(c[0],c[1])),S.point(E[0],E[1]),a||S.lineEnd(),m=!1)}d=o,g=u,v=a}return x}}function Mn(n,t,r){var i=dn(n,t-x,r).concat(t);return function(n){return i.map((function(t){return[n,t]}))}}function _n(n,t,r){var i=dn(n,t-x,r).concat(t);return function(n){return i.map((function(t){return[t,n]}))}}function wn(){return function(){var n,t,r,i,e,o,u,a,c,l,f,s,p=10,h=p,d=90,g=360,v=2.5;function y(){return{type:"MultiLineString",coordinates:m()}}function m(){return dn(R(i/d)*d,r,d).map(f).concat(dn(R(a/g)*g,u,g).map(s)).concat(dn(R(t/p)*p,n,p).filter((function(n){return b(n%d)>x})).map(c)).concat(dn(R(o/h)*h,e,h).filter((function(n){return b(n%g)>x})).map(l))}return y.lines=function(){return m().map((function(n){return{type:"LineString",coordinates:n}}))},y.outline=function(){return{type:"Polygon",coordinates:[f(i).concat(s(u).slice(1),f(r).reverse().slice(1),s(a).reverse().slice(1))]}},y.extent=function(n){return arguments.length?y.extentMajor(n).extentMinor(n):y.extentMinor()},y.extentMajor=function(n){return arguments.length?(i=+n[0][0],r=+n[1][0],a=+n[0][1],u=+n[1][1],i>r&&(n=i,i=r,r=n),a>u&&(n=a,a=u,u=n),y.precision(v)):[[i,a],[r,u]]},y.extentMinor=function(r){return arguments.length?(t=+r[0][0],n=+r[1][0],o=+r[0][1],e=+r[1][1],t>n&&(r=t,t=n,n=r),o>e&&(r=o,o=e,e=r),y.precision(v)):[[t,o],[n,e]]},y.step=function(n){return arguments.length?y.stepMajor(n).stepMinor(n):y.stepMinor()},y.stepMajor=function(n){return arguments.length?(d=+n[0],g=+n[1],y):[d,g]},y.stepMinor=function(n){return arguments.length?(p=+n[0],h=+n[1],y):[p,h]},y.precision=function(p){return arguments.length?(v=+p,c=Mn(o,e,90),l=_n(t,n,v),f=Mn(a,u,90),s=_n(i,r,v),y):v},y.extentMajor([[-180,-89.999999],[180,89.999999]]).extentMinor([[-180,-80.000001],[180,80.000001]])}()()}function Nn(n){return n}var jn,Cn,bn,An,Tn=y(),Pn=y(),Rn={point:L,lineStart:L,lineEnd:L,polygonStart:function(){Rn.lineStart=kn,Rn.lineEnd=Hn},polygonEnd:function(){Rn.lineStart=Rn.lineEnd=Rn.point=L,Tn.add(b(Pn)),Pn.reset()},result:function(){var n=Tn/2;return Tn.reset(),n}};function kn(){Rn.point=Un}function Un(n,t){Rn.point=zn,jn=bn=n,Cn=An=t}function zn(n,t){Pn.add(An*n-bn*t),bn=n,An=t}function Hn(){zn(jn,Cn)}var Ln=1/0,On=Ln,Wn=-Ln,$n=Wn,Dn={point:function(n,t){n<Ln&&(Ln=n);n>Wn&&(Wn=n);t<On&&(On=t);t>$n&&($n=t)},lineStart:L,lineEnd:L,polygonStart:L,polygonEnd:L,result:function(){var n=[[Ln,On],[Wn,$n]];return Wn=$n=-(On=Ln=1/0),n}};var Fn,Zn,Gn,In,Yn=0,qn=0,Bn=0,Jn=0,Vn=0,Xn=0,Kn=0,Qn=0,nt=0,tt={point:rt,lineStart:it,lineEnd:ut,polygonStart:function(){tt.lineStart=at,tt.lineEnd=ct},polygonEnd:function(){tt.point=rt,tt.lineStart=it,tt.lineEnd=ut},result:function(){var n=nt?[Kn/nt,Qn/nt]:Xn?[Jn/Xn,Vn/Xn]:Bn?[Yn/Bn,qn/Bn]:[NaN,NaN];return Yn=qn=Bn=Jn=Vn=Xn=Kn=Qn=nt=0,n}};function rt(n,t){Yn+=n,qn+=t,++Bn}function it(){tt.point=et}function et(n,t){tt.point=ot,rt(Gn=n,In=t)}function ot(n,t){var r=n-Gn,i=t-In,e=z(r*r+i*i);Jn+=e*(Gn+n)/2,Vn+=e*(In+t)/2,Xn+=e,rt(Gn=n,In=t)}function ut(){tt.point=rt}function at(){tt.point=lt}function ct(){ft(Fn,Zn)}function lt(n,t){tt.point=ft,rt(Fn=Gn=n,Zn=In=t)}function ft(n,t){var r=n-Gn,i=t-In,e=z(r*r+i*i);Jn+=e*(Gn+n)/2,Vn+=e*(In+t)/2,Xn+=e,Kn+=(e=In*n-Gn*t)*(Gn+n),Qn+=e*(In+t),nt+=3*e,rt(Gn=n,In=t)}function st(n){this._context=n}st.prototype={_radius:4.5,pointRadius:function(n){return this._radius=n,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._context.closePath(),this._point=NaN},point:function(n,t){switch(this._point){case 0:this._context.moveTo(n,t),this._point=1;break;case 1:this._context.lineTo(n,t);break;default:this._context.moveTo(n+this._radius,t),this._context.arc(n,t,this._radius,0,N)}},result:L};var pt,ht,dt,gt,vt,yt=y(),mt={point:L,lineStart:function(){mt.point=St},lineEnd:function(){pt&&Et(ht,dt),mt.point=L},polygonStart:function(){pt=!0},polygonEnd:function(){pt=null},result:function(){var n=+yt;return yt.reset(),n}};function St(n,t){mt.point=Et,ht=gt=n,dt=vt=t}function Et(n,t){gt-=n,vt-=t,yt.add(z(gt*gt+vt*vt)),gt=n,vt=t}function xt(){this._string=[]}function Mt(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function _t(n){return function(t){var r=new wt;for(var i in n)r[i]=n[i];return r.stream=t,r}}function wt(){}function Nt(n,t,r){var i=n.clipExtent&&n.clipExtent();return n.scale(150).translate([0,0]),null!=i&&n.clipExtent(null),Z(r,n.stream(Dn)),t(Dn.result()),null!=i&&n.clipExtent(i),n}function jt(n,t,r){return Nt(n,(function(r){var i=t[1][0]-t[0][0],e=t[1][1]-t[0][1],o=Math.min(i/(r[1][0]-r[0][0]),e/(r[1][1]-r[0][1])),u=+t[0][0]+(i-o*(r[1][0]+r[0][0]))/2,a=+t[0][1]+(e-o*(r[1][1]+r[0][1]))/2;n.scale(150*o).translate([u,a])}),r)}xt.prototype={_radius:4.5,_circle:Mt(4.5),pointRadius:function(n){return(n=+n)!==this._radius&&(this._radius=n,this._circle=null),this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){0===this._line&&this._string.push("Z"),this._point=NaN},point:function(n,t){switch(this._point){case 0:this._string.push("M",n,",",t),this._point=1;break;case 1:this._string.push("L",n,",",t);break;default:null==this._circle&&(this._circle=Mt(this._radius)),this._string.push("M",n,",",t,this._circle)}},result:function(){if(this._string.length){var n=this._string.join("");return this._string=[],n}return null}},wt.prototype={constructor:wt,point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};var Ct=P(30*C);function bt(n,t){return+t?function(n,t){function r(i,e,o,u,a,c,l,f,s,p,h,d,g,v){var y=l-i,m=f-e,S=y*y+m*m;if(S>4*t&&g--){var E=u+p,M=a+h,_=c+d,w=z(E*E+M*M+_*_),N=H(_/=w),j=b(b(_)-1)<x||b(o-s)<x?(o+s)/2:T(M,E),C=n(j,N),A=C[0],P=C[1],R=A-i,k=P-e,U=m*R-y*k;(U*U/S>t||b((y*R+m*k)/S-.5)>.3||u*p+a*h+c*d<Ct)&&(r(i,e,o,u,a,c,A,P,j,E/=w,M/=w,_,g,v),v.point(A,P),r(A,P,j,E,M,_,l,f,s,p,h,d,g,v))}}return function(t){var i,e,o,u,a,c,l,f,s,p,h,d,g={point:v,lineStart:y,lineEnd:S,polygonStart:function(){t.polygonStart(),g.lineStart=E},polygonEnd:function(){t.polygonEnd(),g.lineStart=y}};function v(r,i){r=n(r,i),t.point(r[0],r[1])}function y(){f=NaN,g.point=m,t.lineStart()}function m(i,e){var o=I([i,e]),u=n(i,e);r(f,s,l,p,h,d,f=u[0],s=u[1],l=i,p=o[0],h=o[1],d=o[2],16,t),t.point(f,s)}function S(){g.point=v,t.lineEnd()}function E(){y(),g.point=x,g.lineEnd=M}function x(n,t){m(i=n,t),e=f,o=s,u=p,a=h,c=d,g.point=m}function M(){r(f,s,l,p,h,d,e,o,i,u,a,c,16,t),g.lineEnd=S,S()}return g}}(n,t):function(n){return _t({point:function(t,r){t=n(t,r),this.stream.point(t[0],t[1])}})}(n)}var At=_t({point:function(n,t){this.stream.point(n*C,t*C)}});function Tt(n,t,r,i,e){function o(o,u){return[t+n*(o*=i),r-n*(u*=e)]}return o.invert=function(o,u){return[(o-t)/n*i,(r-u)/n*e]},o}function Pt(n,t,r,i,e,o){var u=P(o),a=k(o),c=u*n,l=a*n,f=u/n,s=a/n,p=(a*r-u*t)/n,h=(a*t+u*r)/n;function d(n,o){return[c*(n*=i)-l*(o*=e)+t,r-l*n-c*o]}return d.invert=function(n,t){return[i*(f*n-s*t+p),e*(h-s*n-f*t)]},d}function Rt(n){return function(n){var t,r,i,e,o,u,a,c,l,f,s=150,p=480,h=250,d=0,g=0,v=0,y=0,m=0,S=0,E=1,x=1,M=null,_=Sn,w=null,b=Nn,A=.5;function T(n){return c(n[0]*C,n[1]*C)}function P(n){return(n=c.invert(n[0],n[1]))&&[n[0]*j,n[1]*j]}function R(){var n=Pt(s,0,0,E,x,S).apply(null,t(d,g)),i=(S?Pt:Tt)(s,p-n[0],h-n[1],E,x,S);return r=function(n,t,r){return(n%=N)?t||r?X(nn(n),tn(t,r)):nn(n):t||r?tn(t,r):K}(v,y,m),a=X(t,i),c=X(r,a),u=bt(a,A),k()}function k(){return l=f=null,T}return T.stream=function(n){return l&&f===n?l:l=At(function(n){return _t({point:function(t,r){var i=n(t,r);return this.stream.point(i[0],i[1])}})}(r)(_(u(b(f=n)))))},T.preclip=function(n){return arguments.length?(_=n,M=void 0,k()):_},T.postclip=function(n){return arguments.length?(b=n,w=i=e=o=null,k()):b},T.clipAngle=function(n){return arguments.length?(_=+n?En(M=n*C):(M=null,Sn),k()):M*j},T.clipExtent=function(n){return arguments.length?(b=null==n?(w=i=e=o=null,Nn):xn(w=+n[0][0],i=+n[0][1],e=+n[1][0],o=+n[1][1]),k()):null==w?null:[[w,i],[e,o]]},T.scale=function(n){return arguments.length?(s=+n,R()):s},T.translate=function(n){return arguments.length?(p=+n[0],h=+n[1],R()):[p,h]},T.center=function(n){return arguments.length?(d=n[0]%360*C,g=n[1]%360*C,R()):[d*j,g*j]},T.rotate=function(n){return arguments.length?(v=n[0]%360*C,y=n[1]%360*C,m=n.length>2?n[2]%360*C:0,R()):[v*j,y*j,m*j]},T.angle=function(n){return arguments.length?(S=n%360*C,R()):S*j},T.reflectX=function(n){return arguments.length?(E=n?-1:1,R()):E<0},T.reflectY=function(n){return arguments.length?(x=n?-1:1,R()):x<0},T.precision=function(n){return arguments.length?(u=bt(a,A=n*n),k()):z(A)},T.fitExtent=function(n,t){return jt(T,n,t)},T.fitSize=function(n,t){return function(n,t,r){return jt(n,[[0,0],t],r)}(T,n,t)},T.fitWidth=function(n,t){return function(n,t,r){return Nt(n,(function(r){var i=+t,e=i/(r[1][0]-r[0][0]),o=(i-e*(r[1][0]+r[0][0]))/2,u=-e*r[0][1];n.scale(150*e).translate([o,u])}),r)}(T,n,t)},T.fitHeight=function(n,t){return function(n,t,r){return Nt(n,(function(r){var i=+t,e=i/(r[1][1]-r[0][1]),o=-e*r[0][0],u=(i-e*(r[1][1]+r[0][1]))/2;n.scale(150*e).translate([o,u])}),r)}(T,n,t)},function(){return t=n.apply(this,arguments),T.invert=t.invert&&P,R()}}((function(){return n}))()}var kt=1.340264,Ut=-.081106,zt=893e-6,Ht=.003796,Lt=z(3)/2;function Ot(n,t){var r=H(Lt*k(t)),i=r*r,e=i*i*i;return[n*P(r)/(Lt*(kt+3*Ut*i+e*(7*zt+9*Ht*i))),r*(kt+Ut*i+e*(zt+Ht*i))]}function Wt(){return Rt(Ot).scale(177.158)}Ot.invert=function(n,t){for(var r,i=t,e=i*i,o=e*e*e,u=0;u<12&&(o=(e=(i-=r=(i*(kt+Ut*e+o*(zt+Ht*e))-t)/(kt+3*Ut*e+o*(7*zt+9*Ht*e)))*i)*e*e,!(b(r)<1e-12));++u);return[Lt*n*(kt+3*Ut*e+o*(7*zt+9*Ht*e))/P(i),H(k(i)/Lt)]},console.time("draw map"),async function(){var u=await n("../data/world-geojson.json"),a=await v("../data/data_bank_data.csv");function c(n){return n.properties.ADM0_A3_IS}var l=new Map;a.forEach((function(n){"Population growth (annual %)"==n["Series Name"]&&l.set(n["Country Code"],Number(n["2017 [YR2017]"])||0)}));var f={width:.9*window.innerWidth,margin:{top:10,right:10,bottom:10,left:10}};f.boundedWidth=f.width-f.margin.left-f.margin.right;var s={type:"Sphere"},p=Wt().fitWidth(f.boundedWidth,s),h=function(n,t){var r,i,e=4.5;function o(n){return n&&("function"==typeof e&&i.pointRadius(+e.apply(this,arguments)),Z(n,r(i))),i.result()}return o.area=function(n){return Z(n,r(Rn)),Rn.result()},o.measure=function(n){return Z(n,r(mt)),mt.result()},o.bounds=function(n){return Z(n,r(Dn)),Dn.result()},o.centroid=function(n){return Z(n,r(tt)),tt.result()},o.projection=function(t){return arguments.length?(r=null==t?(n=null,Nn):(n=t).stream,o):n},o.context=function(n){return arguments.length?(i=null==n?(t=null,new xt):new st(t=n),"function"!=typeof e&&i.pointRadius(e),o):t},o.pointRadius=function(n){return arguments.length?(e="function"==typeof n?n:(i.pointRadius(+n),+n),o):e},o.projection(n).context(t)}(p),[[d,g],[y,m]]=h.bounds(s);f.boundedHeight=m,f.height=f.boundedHeight+f.margin.top+f.margin.bottom;var S=t("#wrapper").append("svg").attr("width",f.width).attr("height",f.height),E=S.append("g").style("transform",`translate(${f.margin.left}px, ${f.margin.top})`),x=Array.from(l.values()),M=i(x),_=o([-M[0],M[1]]),w=e().domain([-_,0,_]).range(["indigo","white","darkgreen"]),N=(E.append("path").attr("class","earth").attr("d",h(s)),wn()),j=(E.append("path").attr("class","graticule").attr("d",h(N)),E.selectAll(".country").data(u.features).enter().append("path").attr("class","country").attr("d",h).attr("fill",(function(n){var t=l.get(c(n));return void 0===t?"#e2e6e9":w(t)}))),C=f.width<800?f.boundedHeight-30:.5*f.boundedHeight,b=S.append("g").attr("transform",`translate(120, ${C})`),A=(b.append("text").attr("y",-23).attr("class","legend-title").text("Population Growth"),b.append("text").attr("y",-9).attr("class","legend-byline").text("Percent change in 2017"),S.append("defs")),T=w.range().length;A.append("linearGradient").attr("id","legend-gradient").selectAll("stop").data(w.range()).enter().append("stop").attr("stop-color",(function(n){return n})).attr("offset",(function(n,t){return 100*t/(T-1)+"%"})),b.append("rect").attr("x",-60).attr("height",16).attr("width",120).style("fill","url(#legend-gradient)"),b.append("text").attr("class","legend-value").attr("x",70).attr("y",8).text(r(".1f")(_)+"%"),b.append("text").attr("class","legend-value").attr("x",-70).attr("y",8).text(r(".1f")(-_)+"%").style("text-anchor","end"),navigator.geolocation.getCurrentPosition((function(n){const[t,r]=p([n.coords.longitude,n.coords.latitude]);E.append("circle").attr("class","my-location").attr("cx",t).attr("cy",r).attr("r",0).transition().duration(500).attr("r",10)}));var P=t("#tooltip");j.on("mouseenter",(function(n){var t=l.get(c(n));P.select("#country").text((i=n,i.properties.NAME)),P.select("#value").text(r(",.2f")(t||0)+"%");var i;const[e,o]=h.centroid(n),u=e+f.margin.left,a=o+f.margin.top;P.style("transform",`translate(calc(-50% + ${u}px), calc(-100% + ${a}px))`),P.style("opacity",1)})).on("mouseleave",(function(){P.style("opacity",0)}))}().then(()=>console.timeEnd("draw map"));
