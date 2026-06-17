// Service Worker لداشبورد كيتا — يضمن إن المتصفح يجيب آخر نسخة دايماً
// (يتغلّب على كاش GitHub Pages الافتراضي 10 دقايق). مش بيخزّن HTML، فمفيش نسخ قديمة عالقة.
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e){
  // للصفحة نفسها (التنقّل): اجبر جلب نسخة جديدة من السيرفر دايماً
  if(e.request.mode === 'navigate'){
    e.respondWith(fetch(e.request, { cache: 'reload' }).catch(function(){ return fetch(e.request); }));
  }
});
