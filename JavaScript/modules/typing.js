/* ─────────────────────────────────────
   5. TYPING EFFECT — HERO
   책임 : 히어로 섹션 타이핑 애니메이션
───────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const words = ['Frontend Developer', 'UI / UX Enthusiast', 'React Developer', 'Creative Coder'];
  let wi = 0, ci = 0, del = false;

  function tick() {
    const word = words[wi];
    if (del) {
      el.textContent = word.slice(0, --ci);
      if (ci < 0) { del = false; wi = (wi + 1) % words.length; ci = 0; setTimeout(tick, 450); return; }
      setTimeout(tick, 55);
    } else {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { del = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 105);
    }
  }
  setTimeout(tick, 900);
})();
