/* ─────────────────────────────────────
   HERO DECO ANIM — 캐릭터 + 파티클 스크롤 폭발 애니
   책임 : hero 섹션에서 스크롤 내리면 요소들이 사방으로 폭발하듯 날아감
          스크롤 올리면 다시 돌아옴 (scrub)
   참고 : 샘플 portfoliosj-react.netlify.app 의 section01 구조
───────────────────────────────────── */
(function initHeroDecoAnim() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const hero = document.querySelector('#hero');
  if (!hero) return;

  /* ── 공통 ScrollTrigger 설정 ── */
  const st = {
    trigger: hero,
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  };

  /* ── 메인 캐릭터: 아래로 떨어지며 회전+확대+흐림 ── */
  gsap.fromTo('.hd-char',
    { y: 0, x: 0, scale: 1, rotation: 0, opacity: 1, filter: 'blur(0px)' },
    { y: '900%', x: '120%', scale: 4, rotation: 720,
      opacity: 0, filter: 'blur(40px)',
      scrollTrigger: st }
  );

  /* ── 파티클 1 (</>) : 왼쪽 위로 날아감 ── */
  gsap.fromTo('.hd-p1',
    { y: 0, x: 0, scale: 1, rotation: 0, opacity: 1, filter: 'blur(0px)' },
    { y: '-900%', x: '-1100%', scale: 4, rotation: -540,
      opacity: 0, filter: 'blur(30px)',
      scrollTrigger: st }
  );

  /* ── 파티클 2 (별) : 오른쪽 위로 날아감 ── */
  gsap.fromTo('.hd-p2',
    { y: 0, x: 0, scale: 1, rotation: 0, opacity: 1, filter: 'blur(0px)' },
    { y: '-800%', x: '1000%', scale: 5, rotation: 900,
      opacity: 0, filter: 'blur(35px)',
      scrollTrigger: st }
  );

  /* ── 파티클 3 (구름) : 왼쪽으로 유유히 날아감 ── */
  gsap.fromTo('.hd-p3',
    { y: 0, x: 0, scale: 1, rotation: 0, opacity: 1, filter: 'blur(0px)' },
    { y: '-400%', x: '-1400%', scale: 3, rotation: -360,
      opacity: 0, filter: 'blur(25px)',
      scrollTrigger: st }
  );

  /* ── 파티클 4 ({}) : 오른쪽 아래로 ── */
  gsap.fromTo('.hd-p4',
    { y: 0, x: 0, scale: 1, rotation: 0, opacity: 1, filter: 'blur(0px)' },
    { y: '700%', x: '1200%', scale: 4, rotation: 480,
      opacity: 0, filter: 'blur(30px)',
      scrollTrigger: st }
  );

  /* ── 파티클 5 (번개) : 아래 왼쪽으로 ── */
  gsap.fromTo('.hd-p5',
    { y: 0, x: 0, scale: 1, rotation: 0, opacity: 1, filter: 'blur(0px)' },
    { y: '1100%', x: '-900%', scale: 5, rotation: -720,
      opacity: 0, filter: 'blur(40px)',
      scrollTrigger: st }
  );

  /* ── 파티클 6 (다이아) : 위쪽 중앙으로 ── */
  gsap.fromTo('.hd-p6',
    { y: 0, x: 0, scale: 1, rotation: 0, opacity: 1, filter: 'blur(0px)' },
    { y: '-1000%', x: '200%', scale: 4, rotation: 630,
      opacity: 0, filter: 'blur(30px)',
      scrollTrigger: st }
  );

  /* ── 히어로 텍스트: 스크롤하면 위로 페이드아웃 (샘플 참고) ── */
  gsap.to('.hero-inner > *', {
    y: -200,
    opacity: 0,
    filter: 'blur(12px)',
    stagger: 0.04,
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'center top',
      scrub: 1,
    }
  });
})();
