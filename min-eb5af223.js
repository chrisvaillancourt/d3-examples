var o=Math.PI/180,t=180/Math.PI;function l(o,t){let l;if(void 0===t)for(const t of o)null!=t&&(l>t||void 0===l&&t>=t)&&(l=t);else{let e=-1;for(let r of o)null!=(r=t(r,++e,o))&&(l>r||void 0===l&&r>=r)&&(l=r)}return l}export{o as d,l as m,t as r};
