/* ─────────────────────────────────────
   1. SCROLL PROGRESS BAR
   책임 : 페이지 스크롤 진행률을 상단 바에 반영
───────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  function update() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = Math.round((scrollTop / docH) * 100) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
