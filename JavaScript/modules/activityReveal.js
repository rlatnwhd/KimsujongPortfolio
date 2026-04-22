/* ─────────────────────────────────────
   ACTIVITY REVEAL — rAF + lerp
   책임 : 카드가 왼쪽에서 scaleX로 펼쳐짐
          CSS transition 사용 안 함
          requestAnimationFrame + lerp 0.09
───────────────────────────────────── */
(function initActivityReveal() {
  const items = [...document.querySelectorAll('#activity .act-item')];
  if (!items.length) return;

  /* 각 카드마다 독립 progress 상태 */
  const states = items.map(() => ({ current: 0 }));
  const lineFill = document.getElementById('act-line-fill');

  /* targetProgress 계산 — 명세 그대로 */
  function getTarget(el) {
    const top   = el.getBoundingClientRect().top;
    const start = window.innerHeight * 1.05;
    const end   = window.innerHeight * 0.65;
    return Math.max(0, Math.min(1, (start - top) / (start - end)));
  }

  /* 세로선 채움: 첫 카드 진입 ~ 마지막 카드 완전 진입 사이 평균 */
  function updateLine() {
    if (!lineFill) return;
    const first = getTarget(items[0]);
    const last  = getTarget(items[items.length - 1]);
    const p = Math.max(0, Math.min(1, (first + last) / 2));
    lineFill.style.height = (p * 100).toFixed(2) + '%';
  }

  let rafId = null;

  function loop() {
    let settling = false;

    items.forEach((el, i) => {
      const s   = states[i];
      const tgt = getTarget(el);
      const diff = tgt - s.current;

      if (Math.abs(diff) > 0.0005) {
        s.current += diff * 0.09;
        settling = true;
      } else {
        s.current = tgt;
      }

      const p     = s.current;
      const card  = el.querySelector('.act-card');
      const inner = el.querySelector('.act-card-inner');

      if (card)  card.style.transform = `scaleX(${Math.max(0, p).toFixed(4)})`;
      if (inner) inner.style.opacity  = p > 0.4
        ? ((p - 0.4) / 0.6).toFixed(4)
        : '0';
    });

    updateLine();

    if (settling) {
      rafId = requestAnimationFrame(loop);
    } else {
      rafId = null;
    }
  }

  function kick() {
    if (rafId === null) {
      rafId = requestAnimationFrame(loop);
    }
  }

  window.addEventListener('scroll', kick, { passive: true });
  kick(); /* 초기 실행 */
})();


