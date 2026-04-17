/* ─────────────────────────────────────
   GLOBAL SMOOTH SCROLL — Pure Lerp (no library)
   책임 : 전체 페이지 휠 스크롤에 관성(lerp) 적용
          #projects-zone 내부는 projects.js 에 위임
          앵커/키보드/터치 등 외부 스크롤은 즉시 동기화
───────────────────────────────────── */
(function initGlobalSmoothScroll() {

  var LERP     = 0.09;
  var targetY  = window.scrollY;
  var currentY = window.scrollY;
  var rafId    = null;
  var fromUs   = false;

  function maxY() {
    return document.documentElement.scrollHeight - window.innerHeight;
  }

  /* rAF lerp tick */
  function tick() {
    currentY += (targetY - currentY) * LERP;
    var done = Math.abs(targetY - currentY) < 0.5;
    if (done) currentY = targetY;

    fromUs = true;
    window.scrollTo(0, currentY);
    fromUs = false;

    if (done) { rafId = null; return; }
    rafId = requestAnimationFrame(tick);
  }

  function schedule() {
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  /* Wheel: #projects-zone 는 projects.js 에 위임 */
  document.addEventListener('wheel', function(e) {
    if (e.target.closest && e.target.closest('#projects-zone')) return;

    e.preventDefault();
    targetY = Math.max(0, Math.min(maxY(), targetY + e.deltaY));
    schedule();
  }, { passive: false });

  /* 외부 스크롤 (앵커, 키보드, 터치, projects.js scrollTo) → 즉시 동기화 */
  window.addEventListener('scroll', function() {
    if (fromUs) return;
    var sy = window.scrollY;
    targetY  = sy;
    currentY = sy;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }, { passive: true });

})();