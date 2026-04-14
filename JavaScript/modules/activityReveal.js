/* ─────────────────────────────────────
   ACTIVITY REVEAL — GSAP ScrollTrigger
   책임 : 액티비티 카드가 왼쪽에서 회전하며 폭발적으로 진입
          ↑ 스크롤 시 역방향 퇴장 (양방향)
───────────────────────────────────── */
(function initActivityReveal() {
  const items = [...document.querySelectorAll('#activity .act-item')];
  if (!items.length) return;

  /* GSAP 사용 가능하면 강력한 버전 */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    items.forEach((el, i) => {
      el.style.opacity = '0';
      gsap.fromTo(el,
        { x: -320, opacity: 0, scale: 0.8, rotation: -6,
          transformOrigin: 'left center' },
        { x: 0, opacity: 1, scale: 1, rotation: 0,
          scrollTrigger: {
            trigger: el,
            start: `top ${93 - (i % 3) * 2}%`,
            end:   `top ${67 - (i % 3) * 2}%`,
            scrub: 1,
          }
        }
      );
    });
    return;
  }

  /* GSAP 없을 때 폴백 */
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function update() {
    const wh = window.innerHeight;
    items.forEach(el => {
      const r = el.getBoundingClientRect();
      const p = easeOutCubic(Math.max(0, Math.min(1, (wh - r.top) / (wh * 0.4))));
      el.style.transform = `translateX(${((1 - p) * -90).toFixed(1)}px)`;
      el.style.opacity   = p.toFixed(3);
    });
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

