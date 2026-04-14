/* ─────────────────────────────────────
   6. SCROLL REVEAL — 전체 요소 스크롤 실시간 연동
   책임 : 모든 .reveal 요소를 스크롤 위치 기반으로 실시간 애니메이션
          ↓ 스크롤: 진입 애니메이션
          ↑ 스크롤: 역방향 퇴장 애니메이션
          CSS transition 방식 아님. JS가 매 스크롤마다 직접 제어.
───────────────────────────────────── */
(function initScrollReveal() {
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function clamp(v)   { return Math.max(0, Math.min(1, v)); }

  /* 요소 클래스에 따라 어울리는 애니메이션 방향 결정 */
  function getAnim(el) {
    if (el.closest('#hero'))                  return { type: 'up',    dist: 24 };
    if (el.classList.contains('sec-label'))   return { type: 'left',  dist: 60 };
    if (el.classList.contains('sec-title'))   return { type: 'left',  dist: 60, isTitle: true };
    if (el.classList.contains('edu-card'))    return { type: 'right', dist: 70 };
    if (el.classList.contains('about-card'))  return { type: 'scale' };
    return { type: 'up', dist: 40 };
  }

  const items = [...document.querySelectorAll('.reveal')].map(el => ({
    el, ...getAnim(el)
  }));

  function update() {
    const wh = window.innerHeight;
    items.forEach(({ el, type, dist, isTitle }) => {
      const r   = el.getBoundingClientRect();
      /* 진입 기준: r.top이 뷰포트 아래에서 65% 지점 통과할 때 p=1 */
      const p   = easeOut(clamp((wh - r.top) / (wh * 0.35)));

      el.style.opacity = p.toFixed(3);

      if      (type === 'up')    el.style.transform = `translateY(${((1 - p) * dist).toFixed(1)}px)`;
      else if (type === 'left')  el.style.transform = `translateX(${((p - 1) * dist).toFixed(1)}px)`;
      else if (type === 'right') el.style.transform = `translateX(${((1 - p) * dist).toFixed(1)}px)`;
      else if (type === 'scale') el.style.transform = `scale(${(0.9 + p * 0.1).toFixed(4)})`;

      /* sec-title 밑줄: sr-active 클래스로 CSS width transition 트리거 */
      if (isTitle) {
        if (p > 0.5) el.classList.add('sr-active');
        else         el.classList.remove('sr-active');
      }
    });
  }

  /* RAF 배칭으로 과도한 재계산 방지 */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { update(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  update(); // 초기 실행
})();
