/* ─────────────────────────────────────
   HERO CHARACTER ANIMATION
   책임 : 히어로 이름(.hero-name) 한 글자씩 위에서 낙하 입장
          스크롤 내리면 다시 위로 올라가고 (역재생)
          스크롤 올리면 다시 내려옴 (무한 반복)
   동작 방식:
     - JS가 각 글자를 <span class="char-wrap"><span class="hero-char"> 로 래핑
     - rAF 루프: 진입 progress(시간기반) + 퇴장 progress(스크롤기반) 합산
     - reveal.js 중복 제어 방지를 위해 .reveal 클래스 직접 제거
───────────────────────────────────── */
(function initHeroCharAnim() {
  const nameEl = document.querySelector('.hero-name');
  if (!nameEl) return;

  /* ── 1. 원본 내용 파싱 (accent 스팬 보존) ─────────── */
  const parsed = [];
  nameEl.childNodes.forEach(node => {
    if (node.nodeType === 3) {          // 텍스트 노드
      [...node.textContent].forEach(ch => parsed.push({ ch, accent: false }));
    } else if (node.nodeType === 1) {   // <span class="accent"> 등
      const isAccent = node.classList.contains('accent');
      [...node.textContent].forEach(ch => parsed.push({ ch, accent: isAccent }));
    }
  });

  /* ── 2. HTML 재구성: 각 글자를 overflow:hidden 래퍼로 감싸기 ── */
  nameEl.innerHTML = parsed.map((c, i) =>
    `<span class="char-wrap" style="--ci:${i}">` +
    `<span class="hero-char${c.accent ? ' accent' : ''}">${c.ch === ' ' ? '\u00a0' : c.ch}</span>` +
    `</span>`
  ).join('');

  /* ── 3. reveal.js 중복 제어 방지 ─────────────────── */
  nameEl.classList.remove('reveal');
  nameEl.style.opacity  = '1';
  nameEl.style.transform = 'none';

  /* ── 4. 애니메이션 파라미터 ───────────────────────── */
  const charEls  = [...nameEl.querySelectorAll('.hero-char')];
  const STAGGER  = 70;   // 글자 간 지연 ms (줄어들수록 더 역동적)
  const ENTER    = 520;  // 낙하 완료 시간 ms
  const DIST     = 180;  // 낙하 거리 px — 샘플 수준 극강
  const SCROLL_TH = window.innerHeight * 1.5; // 이 scrollY에서 완전히 퇴장

  function easeOut(t) { return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3); }
  function easeIn(t)  { return Math.pow(Math.max(0, Math.min(1, t)), 2); }

  let sy = window.scrollY;
  window.addEventListener('scroll', () => { sy = window.scrollY; }, { passive: true });

  const start = performance.now();

  function render(now) {
    const scrollExit = easeIn(sy / SCROLL_TH);   // 0(top) → 1(scrolled)

    charEls.forEach((el, i) => {
      const elapsed = now - start - i * STAGGER;
      const enterP  = easeOut(elapsed / ENTER);   // 0 → 1

      /* translateY:
           진입 중  : -DIST -> 0 (낙하)
           스크롤 퇴장 : 0 -> -DIST (위로 올라가며 퇴장)    */
      const ty = (1 - enterP) * -DIST + scrollExit * -DIST;

      /* opacity:
           진입 중  : 0 -> 1
           스크롤 퇴장 : 1 -> 0                             */
      const op = enterP * (1 - scrollExit);

      el.style.transform = `translateY(${ty.toFixed(2)}px)`;
      el.style.opacity   = Math.max(0, op).toFixed(3);
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();
