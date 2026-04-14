/* ─────────────────────────────────────
   BG TRANSITION
   책임 : Skills → Projects 구간에서 뷰포트 전체 배경을
          하늘색에서 다크 네이비로 페이드 전환
   원리 : #bg-overlay(fixed, 다크 색) 의 opacity를
          스크롤 위치에 따라 0 → 1 → 0 으로 제어
───────────────────────────────────── */
(function initBgTransition() {
  const overlay  = document.getElementById('bg-overlay');
  const skyFade  = document.querySelector('.sky-fade');
  const afterZone = document.getElementById('activity');
  if (!overlay) return;

  function update() {
    const wh = window.innerHeight;
    let opacity = 0;

    /* ── Fade IN : .sky-fade 가 뷰포트를 통과하는 동안 ── */
    if (skyFade) {
      const r = skyFade.getBoundingClientRect();
      // r.top == wh  → 뷰포트 아래에서 막 등장 → opacity 0
      // r.top == -r.height → 완전히 위로 사라짐 → opacity 1
      const range = r.height + wh * 0.4;
      opacity = Math.max(0, Math.min(1, (wh - r.top) / range));
    }

    /* ── Fade OUT : #activity 섹션이 뷰포트로 올라오는 동안 ── */
    if (afterZone) {
      const r = afterZone.getBoundingClientRect();
      // r.top == wh*0.6 → 막 보이기 시작 → 아직 opaque
      // r.top == 0      → 상단에 닿으면 → opacity 0
      const fadeOut = Math.max(0, Math.min(1, r.top / (wh * 0.6)));
      opacity = Math.min(opacity, fadeOut);
    }

    overlay.style.opacity = opacity.toFixed(3);
  }

  window.addEventListener('scroll', update, { passive: true });
  update(); // 초기 상태 반영
})();
