
// new PerformanceObserver((entryList) => {
//   for (const entry of entryList.getEntries()) {
//     console.log('LCP candidate:', entry.startTime, entry);
//   }
// }).observe({
//   type: 'largest-contentful-paint',
//   buffered: true
// });

const injectScript = (file, node) => {
  const th = document.querySelector(node);
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('async', 'async');
  s.setAttribute('src', file);
  th.appendChild(s);
  return s
};
(function() {
  injectScript(chrome.runtime.getURL('/js/proxy_encrypt.js'), 'body');
  const sc = injectScript(chrome.runtime.getURL('/js/web-vitals.iife.js'), 'body');
  sc.onload = () => {
    injectScript(chrome.runtime.getURL('/js/do_webVitals.js'), 'body');
  }
})();
