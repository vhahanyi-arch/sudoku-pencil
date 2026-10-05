const CACHE='sudoku-pencil-v0914';
const ASSETS=['./','./index.html','./manifest.json','./engine.js','./puzzles.js','./backup.js','./screenshot.js','./imports.js','./import-worker.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(a=>new Request(a,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sudoku-pencil-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
// Network first, always revalidating with the server (cache:'no-cache'), so a new upload shows on the next
// online load instead of after the browser's HTTP cache expires. Only successful same-origin responses
// are cached, so a failed or half-finished deploy never replaces the offline copy.
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const same=new URL(e.request.url).origin===location.origin;e.respondWith((same?fetch(e.request.url,{cache:'no-cache'}):fetch(e.request)).then(r=>{if(r.ok&&r.type==='basic'){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match('./index.html'):Response.error()))))});
