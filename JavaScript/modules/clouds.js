/* ─────────────────────────────────────
   3. CLOUD PARALLAX
   책임 : 배경 구름의 시차(parallax) 스크롤 효과
───────────────────────────────────── */
(function initClouds() {
  const defs = [
    { el: document.getElementById('cl1'), speed: 0.04, base: 8  },
    { el: document.getElementById('cl2'), speed: 0.07, base: 20 },
    { el: document.getElementById('cl3'), speed: 0.05, base: 50 },
    { el: document.getElementById('cl4'), speed: 0.06, base: 75 },
  ].filter(d => d.el);

  function update() {
    const sy = window.scrollY;
    defs.forEach(({ el, speed, base }) => {
      el.style.transform = `translateY(${sy * speed}px)`;
    });
  }
  window.addEventListener('scroll', update, { passive: true });
})();
