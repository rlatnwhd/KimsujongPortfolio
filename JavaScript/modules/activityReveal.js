/* ─────────────────────────────────────
   ACTIVITY REVEAL — SCROLL DRIVEN
   책임 : 액티비티 카드 스크롤 연동 좌→우 진입 + 위로 스크롤 시 역진입
   reveal.js 의 단발성 IntersectionObserver 와 별도로 동작합니다.
───────────────────────────────────── */
(function initActivityReveal() {
  const items = [...document.querySelectorAll('#activity .act-item')];
  if (!items.length) return;

  /* easeOutCubic: 빠르게 진입 → 부드럽게 멈춤 (튀어나오는 느낌) */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function update() {
    const wh = window.innerHeight;
    items.forEach(el => {
      const r = el.getBoundingClientRect();
      /*
       * p=0 : 카드 상단이 viewport 하단에 딱 걸칠 때  (완전히 숨김)
       * p=1 : 카드 상단이 viewport 하단에서 40% 올라왔을 때 (완전히 노출)
       * 위로 스크롤하면 p가 다시 0으로 줄어 → 역방향 애니메이션
       */
      const raw = (wh - r.top) / (wh * 0.4);
      const p   = easeOutCubic(Math.max(0, Math.min(1, raw)));

      el.style.transform = `translateX(${((1 - p) * -90).toFixed(1)}px)`;
      el.style.opacity   = p.toFixed(3);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  /* 페이지 로드 시 즉시 한 번 실행 (이미 화면에 있는 카드 처리) */
  update();
})();
