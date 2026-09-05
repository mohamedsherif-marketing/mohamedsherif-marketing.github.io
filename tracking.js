/* Tracking hub — add platform IDs below to activate vendor pixels. */
window.MS_TRACKING_CONFIG={
  ga4:"",
  metaPixel:"",
  tiktokPixel:"",
  snapPixel:""
};
(function(){
  const c=window.MS_TRACKING_CONFIG||{};
  window.dataLayer=window.dataLayer||[];
  window.msTrack=function(event,params){
    const payload=Object.assign({event:event,page_path:location.pathname,page_title:document.title},params||{});
    window.dataLayer.push(payload);
    if(typeof window.gtag==="function") window.gtag("event",event,params||{});
    if(typeof window.fbq==="function") window.fbq("trackCustom",event,params||{});
    if(window.ttq&&typeof window.ttq.track==="function") window.ttq.track(event,params||{});
    if(typeof window.snaptr==="function") window.snaptr("track",event,params||{});
  };
  const load=(src,id)=>{if(id&&document.querySelector('script[data-ms="'+id+'"]')===null){const s=document.createElement("script");s.async=true;s.src=src;s.dataset.ms=id;document.head.appendChild(s)}};
  if(c.ga4){
    load("https://www.googletagmanager.com/gtag/js?id="+encodeURIComponent(c.ga4),"ga4");
    window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",c.ga4);
  }
  if(c.metaPixel){
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;t.dataset.ms="meta";s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
    fbq("init",c.metaPixel);fbq("track","PageView");
  }
  if(c.tiktokPixel){
    !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat([].slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e){var n=document.createElement("script");n.async=!0;n.src="https://analytics.tiktok.com/i18n/pixel/events.js?sdkid="+e+"&lib="+t;n.dataset.ms="tiktok";document.head.appendChild(n)};ttq.load(c.tiktokPixel);ttq.page()}(window,document,"ttq");
  }
  if(c.snapPixel){
    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s="script";var r=t.createElement(s);r.async=!0;r.src=n;r.dataset.ms="snap";var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u)})(window,document,"https://sc-static.net/scevent.min.js");
    snaptr("init",c.snapPixel);snaptr("track","PAGE_VIEW");
  }
  const qs=new URLSearchParams(location.search);
  ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","gclid","fbclid","ttclid","ScCid"].forEach(k=>{const v=qs.get(k);if(v)sessionStorage.setItem("ms_"+k,v)});
  document.addEventListener("click",e=>{
    const a=e.target.closest("a");
    if(!a)return;
    const h=a.getAttribute("href")||"";
    if(h.includes("wa.me")) msTrack("whatsapp_click",{link_text:(a.textContent||"").trim(),location:a.dataset.location||"site"});
    if(h.startsWith("mailto:")) msTrack("email_click",{location:a.dataset.location||"site"});
  });
})();