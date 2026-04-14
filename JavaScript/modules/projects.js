/* ─────────────────────────────────────
   12. PROJECTS — DATA + CLOTHESLINE SCROLL
   책임 : 프로젝트 데이터 정의 및 수평 스크롤 빨랫줄 UI 구동
───────────────────────────────────── */
(function initProjectsSection() {

  /* ─ 프로젝트 데이터 ─ */
  const PROJECTS = [
    {
      num: '01',
      emoji: '📖',
      title: '웹 프로그래밍 개념 정리',
      desc: 'HTML, CSS, JavaScript의 핵심 개념을 체계적으로 학습하고 정리한 학습용 웹사이트입니다. html 기본 문법, 시맨틱 태그, CSS 레이아웃, 애니메이션 등 프론트엔드 기초를 실습하며 제작했습니다.',
      tags: ['HTML5', 'CSS3'],
      types: ['학습'],
      status: '✓ COMPLETED',
      bg: 'linear-gradient(140deg, #3a9fd5 0%, #1470a8 100%)',
      link: '',
    },
    {
      num: '02',
      emoji: '🔄',
      title: '빌려봄 — 중고 대여 서비스',
      desc: '중고 상품을 이용자로부터 대여하는 중고 대여 서비스입니다. 사용자 인증, 물품 등록/검색, 대여 신청 흐름을 구현했으며 직관적인 UX를 위해 컴포넌트 설계에 집중했습니다.',
      tags: ['Flutter', 'Dart', 'Firebase', 'Figma'],
      types: ['팀'],
      status: '✓ COMPLETED',
      bg: 'linear-gradient(140deg, #52c45a 0%, #28a030 100%)',
      link: '',
    },
    {
      num: '03',
      emoji: '🏡',
      title: '에코 하우스',
      desc: 'Unity를 활용하며 제작한 3D 스토리 공포게임 입니다. 플레이어는 폐건물(호텔)에 갇힌 주인공이 되어 집 안을 탐험하며 퍼즐을 풀고 탈출하는 경험을 하게 됩니다. Unity의 3D 모델링, 애니메이션, 인터랙션 구현 기술을 익히며 완성했습니다.',
      tags: ['Unity', 'C#', '3D Modeling', ],
      types: ['개인'],
      status: '✓ COMPLETED',
      bg: 'linear-gradient(140deg, #e07b39 0%, #b85720 100%)',
      link: '',
    },
    {
      num: '04',
      emoji: '🕹️',
      title: '웹 종합게임',
      desc: 'Canvas API를 활용해 제작한 멀티 게임 포털입니다. 숫자 야구, 지뢰찾기, 퀴즈, 슈팅 게임 등 다양한 게임을 순수 JavaScript로 구현해 로직과 렌더링 최적화를 익혔습니다.',
      tags: ['JavaScript', 'Canvas API', 'HTML5'],
      types: ['개인'],
      status: '✓ COMPLETED',
      bg: 'linear-gradient(140deg, #7c3aed 0%, #4c1d95 100%)',
      link: '',
    },
    {
      num: '05',
      emoji: '☁️',
      title: 'Storoo — 자료 저장 서비스',
      desc: '팀 프로젝트로 개발한 클라우드 자료 저장·공유 서비스입니다. Flutter 기반 프론트엔드와 Flutter Isar 백엔드를 연동했으며, 타입 안전성 강화와 협업 경험을 쌓을 수 있었습니다.',
      tags: ['Flutter', 'Isar', 'Dart', 'CSS'],
      types: ['팀'],
      status: 'Working on it',
      bg: 'linear-gradient(140deg, #06b6d4 0%, #0369a1 100%)',
      link: '',
    },
  ];

  /* ─ 클로슬라인 수평 스크롤 초기화 ─ */
  const zone  = document.getElementById('projects-zone');
  const pin   = document.getElementById('projects-pin');
  const track = document.getElementById('proj-track');
  const bar   = document.getElementById('proj-bar');
  const dotsC = document.getElementById('proj-dots');
  const currC = document.getElementById('pCurr');
  if (!zone || !pin || !track) return;

  const N = PROJECTS.length;

  /* ─ Generate cards ─ */
  PROJECTS.forEach((p, i) => {
    const chips = p.types.map(t => `<span class="hc-type-chip">${t}</span>`).join('');
    const tags  = p.tags.map(t => `<span class="hc-tag">${t}</span>`).join('');

    const slide = document.createElement('div');
    slide.className = 'proj-slide';
    slide.innerHTML = `
      <div class="hang-assembly" data-idx="${i}">
        <div class="hang-clip"></div>
        <div class="hang-string"></div>
        <div class="hang-card">
          <div class="hc-visual" style="background:${p.bg};">
            <div class="hc-type-chips">${chips}</div>
            <span class="hc-emoji">${p.emoji}</span>
            <span class="hc-num">${p.num}</span>
          </div>
          <div class="hc-info">
            <div class="hc-title">${p.title}</div>
            <div class="hc-desc">${p.desc}</div>
            <div class="hc-tags">${tags}</div>
            <div class="hc-status">${p.status}</div>
          </div>
        </div>
      </div>
    `;
    track.appendChild(slide);
  });

  /* ─ Generate dots ─ */
  if (dotsC) {
    for (let i = 0; i < N; i++) {
      const d = document.createElement('div');
      d.className = 'pdot' + (i === 0 ? ' done' : '');
      dotsC.appendChild(d);
    }
  }
  const allDots = dotsC ? dotsC.querySelectorAll('.pdot') : [];
  const assemblies = track.querySelectorAll('.hang-assembly');

  /* ─ Set zone height = (N slides) * 100vh ─ */
  function setZoneHeight() {
    zone.style.height = (N * 100) + 'vh';
  }
  setZoneHeight();
  window.addEventListener('resize', setZoneHeight);

  /* ─ Scroll → horizontal translation + sway ─ */
  let prevScroll = 0;
  let velocity   = 0;

  function onScroll() {
    const zoneRect = zone.getBoundingClientRect();
    const zoneTop  = -zoneRect.top;                      // scroll into zone
    const zoneH    = zone.offsetHeight - window.innerHeight;
    if (zoneH <= 0) return;

    const progress = Math.max(0, Math.min(1, zoneTop / zoneH)); // 0→1
    const totalShift = (N - 1) * window.innerWidth;
    const tx = -progress * totalShift;

    track.style.transform = `translateX(${tx}px)`;

    /* Current card index */
    const raw = progress * (N - 1);
    const idx = Math.min(Math.round(raw), N - 1);

    /* Update dots & counter */
    allDots.forEach((d, j) => d.classList.toggle('done', j <= idx));
    if (currC) currC.textContent = idx + 1;
    if (bar) bar.style.width = (progress * 100).toFixed(1) + '%';

    /* Scroll velocity → sway rotation */
    const currScroll = window.scrollY;
    const delta = currScroll - prevScroll;
    velocity += (delta - velocity) * 0.2;        // smoothed velocity
    prevScroll = currScroll;

    const maxRotate = 6;  // degrees
    const sway = Math.max(-maxRotate, Math.min(maxRotate, velocity * 0.15));

    assemblies.forEach(a => {
      a.style.transform = `rotate(${sway}deg)`;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─ Slowly return sway to 0 when not scrolling ─ */
  let idleTimer = null;
  window.addEventListener('scroll', () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      velocity = 0;
      assemblies.forEach(a => {
        a.style.transition = 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)';
        a.style.transform = 'rotate(0deg)';
        setTimeout(() => { a.style.transition = 'transform 0.05s linear'; }, 850);
      });
    }, 120);
  }, { passive: true });

})();
