function t(t){if(!t.ok)throw new Error(t.status+" "+t.statusText);return t.json()}function n(n,r){return fetch(n,r).then(t)}export{n as j};
