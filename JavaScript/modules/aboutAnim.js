/* aboutAnim.js — 샘플 section03 방식 */
(function () {
  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector('#about');
  if (!section) return;

  /* ── 1) 본문 아이템: blur + scale (샘플 동일) ── */
  const items = gsap.utils.toArray(
    '#about .about-player-header, #about .about-block'
  );

  items.forEach(el => {
    gsap.fromTo(el,
      { filter: 'blur(5px)', scale: 0.5 },
      {
        filter: 'blur(0px)',
        scale: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: el,
          scrub: true,
          start: 'bottom 100%',
          end: 'top 66%',
        },
      }
    );
  });

  /* ── 2) 사진 무빙: 샘플 동일 (y:200→0, scale:1.25→1, rotate:0→-5) ── */
  const mover = document.querySelector('.about-photo-mover');
  if (!mover) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });

  tl.fromTo(mover,
    { rotate: 0, scale: 1.25, y: 200 },
    { rotate: -5, scale: 1,    y: 0, duration: 0.2 }
  );
})();
