/* ─────────────────────────────────────
   2. CUSTOM CURSOR + SPARKS
   책임 : 커스텀 마우스 커서 및 스파크 이펙트
───────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

  let mx = 0, my = 0;
  const SPARKS = ['#3a9fd5', '#ffe066', '#52c45a', '#ff8bdb', '#ff9f66'];

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function spawnSpark(x, y) {
    const s = document.createElement('div');
    s.className = 'cspark';
    const angle = Math.random() * Math.PI * 2;
    const dist = 18 + Math.random() * 26;
    s.style.cssText = `left:${x}px;top:${y}px;background:${SPARKS[Math.floor(Math.random()*SPARKS.length)]};--dx:${Math.cos(angle)*dist}px;--dy:${Math.sin(angle)*dist}px;`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 580);
  }

  let sparkCount = 0;
  document.addEventListener('mousemove', e => {
    if (++sparkCount % 4 === 0) spawnSpark(e.clientX, e.clientY);
  });

  // Event delegation — works for dynamically generated elements too
  const HOVER_SEL = 'a, button, .sk, .hang-card, .nav-toggle, .btn, .tilt-card, .pdot';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(HOVER_SEL)) cursor.classList.add('hov');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(HOVER_SEL)) cursor.classList.remove('hov');
  });

})();
