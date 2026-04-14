/* ─────────────────────────────────────
   6. SCROLL REVEAL — INTERSECTION OBSERVER
   책임 : .reveal 요소가 뷰포트에 진입할 때 페이드인
───────────────────────────────────── */
(function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
