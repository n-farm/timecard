/* 農園タイムカード：画面ファイルを端末に保存（通信できないときだけ保存分を使う） */
const CACHE='tc-web';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon-192.png','./apple-touch-icon.png'])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{
  const req=e.request,url=new URL(req.url);
  if(req.method!=='GET'||url.origin!==self.location.origin||url.pathname.endsWith('version.json'))return;
  e.respondWith(fetch(req).then(res=>{if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;})
    .catch(()=>caches.match(req,{ignoreSearch:true}).then(hit=>hit||caches.match('./index.html'))));
});
