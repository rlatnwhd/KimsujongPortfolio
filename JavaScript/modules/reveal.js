/* ─────────────────────────────────────
   SCROLL REVEAL — GSAP ScrollTrigger (scrub)
   책임 : 스크롤 위치가 애니메이션 진행도를 직접 제어
          스크롤 내리면 진입, 올리면 되돌아감
   라이브러리 : gsap + ScrollTrigger (index.html CDN 로드)
───────────────────────────────────── */
(function initScrollReveal() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    /* GSAP 없을 때 폴백: 기존 방식 */
    const items = [...document.querySelectorAll('.reveal')].map(el => ({ el }));
    function update() {
      const wh = window.innerHeight;
      items.forEach(({ el }) => {
        const r = el.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, (wh - r.top) / (wh * 0.35)));
        const e = 1 - Math.pow(1 - p, 3);
        el.style.opacity = e.toFixed(3);
        el.style.transform = `translateY(${((1 - e) * 60).toFixed(1)}px)`;
      });
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ── 1. Hero 요소: 페이지 로드 직후 순차 등장 ─── */
  const heroOrder = ['#hero .hero-badge', '#hero .hero-eng',
                     '#hero .hero-typing-wrap', '#hero .hero-quote', '#hero .hero-btns'];
  const heroEls = heroOrder.map(s => document.querySelector(s)).filter(Boolean);
  if (heroEls.length) {
    gsap.fromTo(heroEls,
      { y: 100, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1,
        duration: 1.4, ease: 'expo.out',
        stagger: 0.16, delay: 0.65 }
    );
  }

  /* ── 2. sec-label: 왼쪽에서 비틀리며 날아오기 ─── */
  gsap.utils.toArray('.sec-label').forEach(el => {
    el.style.opacity = '0';
    gsap.fromTo(el,
      { x: -240, opacity: 0, skewX: -18, scale: 0.85 },
      { x: 0, opacity: 0.7, skewX: 0, scale: 1,
        scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 67%', scrub: 1 } }
    );
  });

  /* ── 3. sec-title: 크게 슬라이드 + X축 회전 + 밑줄 트리거 ─── */
  gsap.utils.toArray('.sec-title').forEach(el => {
    el.style.opacity = '0';
    gsap.fromTo(el,
      { x: -280, opacity: 0, scale: 0.72, rotationX: 28,
        transformPerspective: 900, transformOrigin: 'left center' },
      { x: 0, opacity: 1, scale: 1, rotationX: 0,
        scrollTrigger: {
          trigger: el, start: 'top 92%', end: 'top 67%', scrub: 1,
          onEnter:     () => el.classList.add('sr-active'),
          onLeaveBack: () => el.classList.remove('sr-active'),
        }
      }
    );
  });

  /* ── 4. About 카드: 아래에서 중력 낙하 + 퍼스펙티브 ─── */
  gsap.utils.toArray('.about-card').forEach((el, i) => {
    el.style.opacity = '0';
    gsap.fromTo(el,
      { y: 200, opacity: 0, scale: 0.78, rotationX: 30,
        transformPerspective: 1200, transformOrigin: 'top center' },
      { y: 0, opacity: 1, scale: 1, rotationX: 0,
        scrollTrigger: { trigger: el, start: `top ${93 - i * 2}%`, end: `top ${67 - i * 2}%`, scrub: 1 } }
    );
  });

  /* ── 5. Stats row: 올라오면서 커지기 ─── */
  gsap.utils.toArray('.stats-row').forEach(el => {
    el.style.opacity = '0';
    gsap.fromTo(el,
      { y: 130, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1,
        scrollTrigger: {
          trigger: el, start: 'top 92%', end: 'top 67%', scrub: 1,
          onEnter:     () => el.classList.add('sr-active'),
          onLeaveBack: () => el.classList.remove('sr-active'),
        }
      }
    );
  });

  /* ── 6. edu-card: 왼쪽에서 Y축 회전하며 날아오기 ─── */
  gsap.utils.toArray('.edu-card').forEach(el => {
    el.style.opacity = '0';
    gsap.fromTo(el,
      { x: -200, opacity: 0, rotationY: -20, scale: 0.88,
        transformPerspective: 1000 },
      { x: 0, opacity: 1, rotationY: 0, scale: 1,
        scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 67%', scrub: 1 } }
    );
  });

  /* ── 7. skill-group: 오른쪽에서 Y축 회전 + sr-active ─── */
  gsap.utils.toArray('.skill-group').forEach((el, i) => {
    el.style.opacity = '0';
    gsap.fromTo(el,
      { x: 220, opacity: 0, rotationY: 18, scale: 0.88,
        transformPerspective: 1000 },
      { x: 0, opacity: 1, rotationY: 0, scale: 1,
        scrollTrigger: {
          trigger: el, start: `top ${92 - i * 2}%`, end: `top ${67 - i * 2}%`, scrub: 1,
          onEnter:     () => el.classList.add('sr-active'),
          onLeaveBack: () => el.classList.remove('sr-active'),
        }
      }
    );
  });

  /* ── 8. contact 카드: 스태거 + 퍼스펙티브 낙하 ─── */
  gsap.utils.toArray('.cc').forEach((el, i) => {
    el.style.opacity = '0';
    gsap.fromTo(el,
      { y: 180, opacity: 0, scale: 0.75, rotationX: 25,
        transformPerspective: 900 },
      { y: 0, opacity: 1, scale: 1, rotationX: 0,
        scrollTrigger: { trigger: el, start: `top ${93 - i * 2}%`, end: `top ${67 - i * 2}%`, scrub: 1 } }
    );
  });

  /* ── 9. 나머지 .reveal 요소 catch-all ─── */
  const skipClasses = ['sec-label','sec-title','about-card','stats-row',
                       'edu-card','skill-group','cc'];
  gsap.utils.toArray('.reveal').forEach(el => {
    if (el.closest('#hero')) return;
    if (el.closest('.act-item')) return; /* activityReveal.js 가 담당 */
    if (skipClasses.some(c => el.classList.contains(c))) return;
    if (el.style.opacity === '0') return; /* 이미 처리됨 */
    el.style.opacity = '0';
    gsap.fromTo(el,
      { y: 120, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1,
        scrollTrigger: { trigger: el, start: 'top 93%', end: 'top 67%', scrub: 1 } }
    );
  });
})();

