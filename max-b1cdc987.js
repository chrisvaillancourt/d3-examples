function l(l,n){var f,r,u=l.length,o=-1;if(null==n){for(;++o<u;)if(null!=(f=l[o])&&f>=f)for(r=f;++o<u;)null!=(f=l[o])&&f>r&&(r=f)}else for(;++o<u;)if(null!=(f=n(l[o],o,l))&&f>=f)for(r=f;++o<u;)null!=(f=n(l[o],o,l))&&f>r&&(r=f);return r}export{l as m};
