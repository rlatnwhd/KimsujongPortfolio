/* ─────────────────────────────────────
   SMOOTH SCROLL — Lenis 관성만 (최소 설정)
   책임 : 스크롤 관성(inertia) 효과만 제공
          duration/easing 최소화, 과방향 없음
───────────────────────────────────── */
(function initSmoothScroll() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    lerp: 0.12,             /* 관성만: 숫자 낮을수록 더 부드럽게 따라옴 */
    wheelMultiplier: 1.0,
    touchMultiplier: 1.2,
    smooth: true,
  });

  /* GSAP ScrollTrigger 동기화 */
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', () => ScrollTrigger.update());
    }
    gsap.ticker.add(time => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* 앵커 링크 클릭 시 Lenis로 부드럽게 이동 */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -96, duration: 1.0 });
    });
  });

  window.__lenis = lenis;
})();
