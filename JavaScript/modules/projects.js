/* ─────────────────────────────────────
   12. PROJECTS — 평행사변형 프레임 + 콘텐츠 시차
   슬라이드 = clip-path 평행사변형, 콘텐츠 시차 이동
   배경+이미지+텍스트 함께 이동 → 원근감
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

  /* ─ DOM 요소 ─ */
  const zone  = document.getElementById('projects-zone');
  const pin   = document.getElementById('projects-pin');
  const track = document.getElementById('proj-track');
  const bar   = document.getElementById('proj-bar');
  const dotsC = document.getElementById('proj-dots');
  const currC = document.getElementById('pCurr');
  if (!zone || !pin || !track) return;

  const N = PROJECTS.length;
  const OVERLAP_RATIO = 0.06; // 6vw 겹침 (평행사변형 경계)

  /* ─ 슬라이드 생성 (프레임+콘텐츠 일체) ─ */
  PROJECTS.forEach((p, i) => {
    const chips = p.types.map(t => `<span class="ps-type-chip">${t}</span>`).join('');
    const tags  = p.tags.map(t => `<span class="ps-tag">${t}</span>`).join('');

    const slide = document.createElement('div');
    slide.className = 'proj-slide';
    slide.style.zIndex = i + 1;
    slide.innerHTML = `
      <div class="ps-content" style="background: ${p.bg};">
        <div class="ps-img-area">
          <div class="ps-img-inner">
            <div class="ps-type-chips">${chips}</div>
            <span class="ps-emoji">${p.emoji}</span>
            <span class="ps-num">${p.num}</span>
          </div>
        </div>
        <div class="ps-divider"></div>
        <div class="ps-info-area">
          <p class="ps-label-mini">PROJECT · ${p.num}</p>
          <h2 class="ps-title">${p.title}</h2>
          <p class="ps-desc">${p.desc}</p>
          <div class="ps-tags">${tags}</div>
          <div class="ps-status">${p.status}</div>
        </div>
      </div>
    `;
    track.appendChild(slide);
  });

  /* ─ Dots 생성 ─ */
  if (dotsC) {
    for (let i = 0; i < N; i++) {
      const d = document.createElement('div');
      d.className = 'pdot' + (i === 0 ? ' done' : '');
      dotsC.appendChild(d);
    }
  }
  const allDots = dotsC ? dotsC.querySelectorAll('.pdot') : [];

  /* ─ Zone 높이 설정 ─ */
  function setZoneHeight() {
    zone.style.height = (N * 100) + 'vh';
  }
  setZoneHeight();
  window.addEventListener('resize', setZoneHeight);

  /* ─ 시차 대상 캐싱 ─ */
  const contents = track.querySelectorAll('.ps-content');

  /* ─ Scroll → 트랙 이동 + 콘텐츠 시차 ─ */
  function onScroll() {
    const zoneRect = zone.getBoundingClientRect();
    const zoneTop  = -zoneRect.top;
    const zoneH    = zone.offsetHeight - window.innerHeight;
    if (zoneH <= 0) return;

    const progress = Math.max(0, Math.min(1, zoneTop / zoneH));

    // 트랙 총 이동량 (6vw 겹침 고려)
    const vw = window.innerWidth;
    const overlap = vw * OVERLAP_RATIO;
    const totalShift = (N - 1) * (vw - overlap);

    // 트랙 이동 (프레임 = 스크롤 속도 100%)
    const tx = -progress * totalShift;
    track.style.transform = `translateX(${tx}px)`;

    // 각 슬라이드 내부 콘텐츠 시차 이동
    // offset: 0=정위치, +=오른쪽(접근중), -=왼쪽(지나감)
    for (let i = 0; i < N; i++) {
      const offset = progress * (N - 1) - i;
      if (contents[i]) {
        contents[i].style.transform =
          `translate(${offset * 8}vw, ${-offset * 5}vh)`;
      }
    }

    /* 현재 카드 인덱스 */
    const idx = Math.min(Math.round(progress * (N - 1)), N - 1);

    /* Dots & counter 업데이트 */
    allDots.forEach((d, j) => d.classList.toggle('done', j <= idx));
    if (currC) currC.textContent = idx + 1;
    if (bar)   bar.style.width = (progress * 100).toFixed(1) + '%';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

})();
