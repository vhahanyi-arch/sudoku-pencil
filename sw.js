const CACHE='sudoku-pencil-v0913-number-pad';
const ASSETS=['./','./index.html','./manifest.json','./engine.js','./puzzles.js','./backup.js','./screenshot.js','./imports.js','./import-worker.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sudoku-pencil-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
// Network first. Only successful same-origin responses are cached, so a failed or half-finished
// deploy never replaces the offline copy. Only page navigations fall back to index.html.
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{if(r.ok&&r.type==='basic'){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match('./index.html'):Response.error()))))});
