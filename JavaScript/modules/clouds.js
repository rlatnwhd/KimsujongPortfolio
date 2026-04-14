/* ─────────────────────────────────────
   3. CLOUD MOVEMENT — SCROLL-DRIVEN 좌우
   책임 : 스크롤 위치만으로 구름 좌우 이동
          자율 움직임 없음. rAF 없음. 순수 스크롤 반응.
───────────────────────────────────── */
(function initClouds() {
  const defs = [
    { el: document.getElementById('cl1'), amp: 55, freq: 0.0055, phase: 0.0 },
    { el: document.getElementById('cl2'), amp: 35, freq: 0.0038, phase: 1.3 },
    { el: document.getElementById('cl3'), amp: 70, freq: 0.0047, phase: 2.7 },
    { el: document.getElementById('cl4'), amp: 45, freq: 0.0062, phase: 4.1 },
  ].filter(d => d.el);

  if (!defs.length) return;

  function update() {
    const sy = window.scrollY;
    defs.forEach(({ el, amp, freq, phase }) => {
      const tx = Math.sin(sy * freq + phase) * amp;
      el.style.transform = `translateX(${tx.toFixed(2)}px)`;
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update(); // 초기 위치 설정
})();
