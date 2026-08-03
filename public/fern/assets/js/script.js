document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initBannerVideo();
  initOverviewCounter();
  initFancybox();
  initPlansTabs();
  initMasterHotspots();
  initSpecsStudio();
  initLocationTabs();
  initScrollSpy();
  initCtaDock();
  initWalkthrough();

  // Banner + interiors wait for Swiper; AOS/GSAP wait for idle (protects LCP)
  const runWhen = (ready, fn, tries = 50) => {
    if (ready()) {
      fn();
      return;
    }
    if (tries <= 0) return;
    setTimeout(() => runWhen(ready, fn, tries - 1), 80);
  };

  runWhen(() => typeof Swiper !== 'undefined', () => {
    initBannerSwiper();
    initInteriorsSwiper();
  });

  const deferHeavy = () => {
    runWhen(() => typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined', initAnimateImg);
    runWhen(() => typeof AOS !== 'undefined', initAOS);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(deferHeavy, { timeout: 2500 });
  } else {
    window.addEventListener('load', () => setTimeout(deferHeavy, 500));
  }
});

function initHeader() {
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const headerNav = document.getElementById('headerNav');
  const navBackdrop = document.getElementById('navBackdrop');
  const progressBar = header?.querySelector('.header-progress__bar');
  const sectionLabel = document.getElementById('headerSectionLabel');
  const navLinks = Array.from(document.querySelectorAll('#headerNav .nav-link'));
  const banner = document.getElementById('banner');

  if (!header) return;

  const sectionNames = {
    about: 'About',
    plans: 'Plans',
    'luxury-homes': 'Homes',
    walkthrough: 'Tour',
    clubhouse: 'Amenities',
    amenities: 'Amenities',
    gallery: 'Gallery',
    location: 'Location',
    specifications: 'Specs',
  };

  let lockedScrollY = 0;
  let programmaticScroll = false;
  let programmaticTimer = 0;

  const updateScrollProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    header.style.setProperty('--scroll-progress', value.toFixed(4));
    if (progressBar) progressBar.style.transform = `scaleX(${value})`;
  };

  const setActiveLink = (id, { force = false } = {}) => {
    if (programmaticScroll && !force) return;
    const targetId = id === 'amenities' ? 'clubhouse' : id;
    if (!sectionNames[targetId] && targetId !== 'banner') return;

    navLinks.forEach(link => {
      const match = targetId !== 'banner' && link.getAttribute('href') === `#${targetId}`;
      link.classList.toggle('active', match);
    });

    if (sectionLabel) {
      const label = sectionNames[targetId] || '';
      sectionLabel.textContent = label;
      sectionLabel.classList.toggle('is-visible', Boolean(label));
    }
  };

  window.setFernActiveNav = setActiveLink;
  window.isFernNavProgrammatic = () => programmaticScroll;

  if (banner) {
    const bannerObserver = new IntersectionObserver(([entry]) => {
      header.classList.toggle('on-banner', entry.isIntersecting);
    }, { threshold: 0.25 });
    bannerObserver.observe(banner);
  }

  let lastScrollY = window.scrollY;

  const onScroll = () => {
    const currentScrollY = window.scrollY;
    header.classList.toggle('scrolled', currentScrollY > 50);
    updateScrollProgress();

    if (headerNav?.classList.contains('open')) {
      header.classList.remove('header-hidden');
      lastScrollY = currentScrollY;
      return;
    }

    if (window.innerWidth < 992) {
      header.classList.remove('header-hidden');
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY <= 50) {
      header.classList.remove('header-hidden');
    } else if (currentScrollY > lastScrollY + 8) {
      header.classList.add('header-hidden');
    } else if (currentScrollY < lastScrollY - 8) {
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
  };

  const setNavOpen = (isOpen) => {
    if (isOpen) {
      lockedScrollY = window.scrollY || window.pageYOffset || 0;
      document.body.style.top = `-${lockedScrollY}px`;
      document.body.classList.add('nav-open');
      header.classList.add('nav-open');
      headerNav?.classList.add('open');
      navToggle?.classList.add('active');
      navToggle?.setAttribute('aria-expanded', 'true');
      if (navBackdrop) {
        navBackdrop.hidden = false;
        navBackdrop.classList.add('is-visible');
      }
      header.classList.remove('header-hidden');
      return;
    }

    headerNav?.classList.remove('open');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
    header.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
    document.body.style.top = '';
    if (navBackdrop) {
      navBackdrop.classList.remove('is-visible');
      navBackdrop.hidden = true;
    }
    // Restore exact scroll before any navigation (prevents jump-to-top)
    window.scrollTo(0, lockedScrollY);
  };

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    programmaticScroll = true;
    window.clearTimeout(programmaticTimer);

    const headerH = Math.ceil(header.getBoundingClientRect().height || 72);
    const extra = window.innerWidth < 992 ? 8 : 16;
    const top = Math.max(
      0,
      target.getBoundingClientRect().top + window.scrollY - headerH - extra
    );

    window.scrollTo({ top, behavior: 'smooth' });
    setActiveLink(id, { force: true });

    programmaticTimer = window.setTimeout(() => {
      programmaticScroll = false;
      setActiveLink(id, { force: true });
    }, 900);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && header.classList.contains('nav-open')) {
      setNavOpen(false);
    }
    updateScrollProgress();
  });

  onScroll();

  navToggle?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setNavOpen(!headerNav?.classList.contains('open'));
  });

  navBackdrop?.addEventListener('click', () => setNavOpen(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('nav-open')) {
      setNavOpen(false);
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href')?.replace('#', '');
      if (!id) return;
      event.preventDefault();
      event.stopPropagation();

      setNavOpen(false);

      // Wait one frame so body unlock + scroll restore settle, then go to section
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToSection(id));
      });
    });
  });
}

function initBannerSwiper() {
  // Hero now uses muted background video; keep hook for legacy markup if present
  const el = document.getElementById('bannerSwiper');
  if (!el || typeof Swiper === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  new Swiper('#bannerSwiper', {
    loop: true,
    speed: reduceMotion ? 0 : 1100,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    simulateTouch: true,
    allowTouchMove: true,
    touchRatio: 1,
    threshold: 5,
    followFinger: true,
    pagination: {
      el: '.banner-pagination',
      clickable: true,
    },
    autoplay: reduceMotion ? false : {
      delay: 4500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  });
}

function initBannerVideo() {
  const video = document.querySelector('[data-banner-video]');
  if (!video) return;

  const cfg = window.FERN_SITE || {};
  const srcRaw = String(
    cfg.walkthrough_video || cfg.banner_video || '/fern/assets/videos/fern-walkthrough.mp4'
  ).trim();
  let src = srcRaw;
  try {
    src = new URL(srcRaw, window.location.origin).href;
  } catch (err) {
    src = srcRaw;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    video.remove();
    return;
  }

  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute('muted', '');
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.loop = true;
  video.autoplay = true;
  video.preload = 'metadata';
  video.setAttribute('aria-hidden', 'true');

  const source = video.querySelector('source');
  if (source) source.src = src;
  else video.src = src;

  const tryPlay = () => {
    video.muted = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          document.getElementById('banner')?.classList.add('is-video-playing');
        })
        .catch(() => {
          // Retry muted play on first user gesture
          const unlock = () => {
            video.muted = true;
            video.play()
              .then(() => {
                document.getElementById('banner')?.classList.add('is-video-playing');
              })
              .catch(() => {});
            window.removeEventListener('pointerdown', unlock);
            window.removeEventListener('touchstart', unlock);
          };
          window.addEventListener('pointerdown', unlock, { once: true, passive: true });
          window.addEventListener('touchstart', unlock, { once: true, passive: true });
        });
    }
  };

  if (video.readyState >= 2) tryPlay();
  else {
    video.addEventListener('loadeddata', tryPlay, { once: true });
    try {
      video.load();
    } catch (err) {
      /* ignore */
    }
    setTimeout(tryPlay, 800);
  }

  // Pause when off-screen to save battery/data
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = true;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(video);
  }
}

function initInteriorsSwiper() {
  const tabs = document.querySelectorAll('.interior-tab');
  const panels = document.querySelectorAll('.interior-panel');
  const swipers = {};
  const swiperInited = { ground: false, first: false, second: false };

  const swiperMap = {
    ground: {
      selector: '#interiorsGroundSwiper',
      navigation: { nextEl: '.ground-interiors-next', prevEl: '.ground-interiors-prev' },
    },
    first: {
      selector: '#interiorsFirstSwiper',
      navigation: { nextEl: '.first-interiors-next', prevEl: '.first-interiors-prev' },
    },
    second: {
      selector: '#interiorsSecondSwiper',
      navigation: { nextEl: '.second-interiors-next', prevEl: '.second-interiors-prev' },
    },
  };

  const createConfig = (navigation) => ({
    slidesPerView: 1,
    spaceBetween: 24,
    speed: 500,
    grabCursor: true,
    simulateTouch: true,
    allowTouchMove: true,
    touchRatio: 1,
    threshold: 5,
    followFinger: true,
    resistance: true,
    resistanceRatio: 0.85,
    observer: true,
    observeParents: true,
    watchOverflow: true,
    navigation,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 12,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 24,
      }
    },
  });

  const refreshSwiper = (floor) => {
    const swiper = swipers[floor];
    if (!swiper) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        swiper.updateSize();
        swiper.updateSlides();
        swiper.update();
      });
    });
  };

  const initFloorSwiper = (floor) => {
    if (swiperInited[floor] || typeof Swiper === 'undefined') return;

    const { selector, navigation } = swiperMap[floor];
    const el = document.querySelector(selector);
    if (!el) return;

    swipers[floor] = new Swiper(selector, createConfig(navigation));
    swiperInited[floor] = true;
    refreshSwiper(floor);
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const floor = tab.dataset.floor;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-floor-panel="${floor}"]`).classList.add('active');
      initFloorSwiper(floor);
      refreshSwiper(floor);

      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    });
  });

  initFloorSwiper('ground');

  window.addEventListener('resize', () => {
    Object.keys(swipers).forEach(refreshSwiper);
  });
}

function initAnimateImg() {
  const section = document.querySelector('.animate_img');
  const inner = section?.querySelector('.animate_img-inner');
  const img = inner?.querySelector('img');

  if (!section || !inner || !img || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'top 25%',
        scrub: 1.3,
      },
    });

    tl.to(inner, {
      width: '100vw',
      borderRadius: 0,
      ease: 'none',
    }, 0).to(img, {
      height: '100vh',
      ease: 'none',
    }, 0);

    return () => tl.kill();
  });

  mm.add('(max-width: 767px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 92%',
        end: 'top 68%',
        scrub: 0.8,
      },
    });

    tl.to(inner, {
      width: '100vw',
      borderRadius: 0,
      ease: 'none',
    });

    return () => tl.kill();
  });
}

function initOverviewCounter() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const counters = document.querySelectorAll('[data-count]');
  const sections = [...new Set(
    [...counters].map(el => el.closest('section')).filter(Boolean)
  )];

  const getStartPoint = (sectionId) => (
    sectionId === 'overview' ? 'top 52%' : 'top 78%'
  );

  const setupCounters = (getStart) => {
    const triggers = [];

    sections.forEach(section => {
      section.querySelectorAll('[data-count]').forEach((el, index) => {
        const target = Number(el.dataset.count);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const format = el.dataset.format || '';
        const counter = { val: 0 };
        let hasPlayed = false;

        const updateText = () => {
          let num = Math.round(counter.val);
          if (format === 'comma') {
            num = num.toLocaleString('en-IN');
          }
          el.textContent = `${prefix}${num}${suffix}`;
        };

        const playCounter = () => {
          if (hasPlayed) return;
          hasPlayed = true;
          counter.val = 0;
          updateText();

          gsap.to(counter, {
            val: target,
            duration: 2,
            delay: index * 0.1,
            ease: 'power2.out',
            onUpdate: updateText,
            onComplete: updateText,
          });
        };

        triggers.push(ScrollTrigger.create({
          trigger: el,
          start: getStart(section.id),
          once: true,
          onEnter: playCounter,
        }));
      });
    });

    return () => triggers.forEach(trigger => trigger.kill());
  };

  const mm = gsap.matchMedia();

  mm.add('(min-width: 992px)', () => setupCounters(getStartPoint));

  mm.add('(max-width: 991px) and (min-width: 768px)', () => setupCounters(
    (sectionId) => (sectionId === 'overview' ? 'top 68%' : 'top 84%')
  ));

  mm.add('(max-width: 767px)', () => setupCounters(
    (sectionId) => (sectionId === 'overview' ? 'top 78%' : 'top 90%')
  ));
}

function initAOS() {
  if (typeof AOS === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hoverableSelector = [
    '.club-card',
    '.project-card',
    '.project-tile',
    '.gallery-item',
    '.amenity-card',
    '.stat-card',
    '.spec-item',
    '.specs-studio',
    '.specs-nav__btn',
    '.plan-master',
    '.location-map',
    '.clubhouse-hero',
    '.btn',
    '.about-highlights > li',
  ].join(', ');

  const revealSelector = [
    '.banner-scroll',
    '.section-header',
    '.about-media',
    '.about-content > .section-title',
    '.about-content > .section-desc',
    '.about-content > .about-text',
    '.about-highlights > li',
    '.about-facts > *',
    '.about-content > .btn',
    '.overview-media',
    '.overview-stats > *',
    '.plans-clear-head',
    '.plans-clear-tabs',
    '.master-clear',
    '.villa-clear',
    '.interiors-tabs',
    '.interiors-slider-wrap',
    '.clubhouse-hero',
    '.clubhouse-grid > *',
    '.amenities-outdoor > *',
    '.feature-showcase',
    '.gallery-grid > *',
    '.interiors-slider-wrap',
    '.clubhouse-hero',
    '.clubhouse-amenities-header',
    '.clubhouse-grid > *',
    '.amenities-outdoor > *',
    '.feature-showcase',
    '.gallery-grid > *',
    '.location-hero',
    '.location-shell',
    '.location-nearby > *',
    '.location-contact',
    '.specs-studio',
    '.specs-nav',
    '.specs-stage',
    '.projects-brand',
    '.projects-intro',
    '.projects-rail > *',
    '.projects-showcase > *',
    '.projects-grid > *',
    '.footer-brand',
    '.footer-top',
    '.footer-cols > *',
    '.footer-bottom',
    '.footer-links',
    '.footer-social',
    '.footer-contact',
  ].join(', ');

  const isExcluded = (el) => el.closest('#animate-img, .animate_img, #specifications, .specifications');
  const isHoverable = (el) => el.matches(hoverableSelector);

  const getRevealElements = (root) => {
    const elements = [...root.querySelectorAll(revealSelector)].filter(el => !isExcluded(el));

    return elements.filter((el, _, arr) => !arr.some(other => other !== el && other.contains(el)));
  };

  const clearAOSInlineStyles = (el) => {
    if (!isHoverable(el)) return;

    el.style.removeProperty('transform');
    el.style.removeProperty('transition');
    el.style.removeProperty('transition-property');
    el.style.removeProperty('transition-duration');
    el.style.removeProperty('transition-timing-function');
    el.style.removeProperty('transition-delay');
  };

  const roots = [
    ...document.querySelectorAll('section:not(#animate-img):not(.animate_img)'),
    document.querySelector('.site-footer'),
  ].filter(Boolean);

  roots.forEach((root) => {
    const elements = getRevealElements(root);

    elements.forEach((el, index) => {
      const hoverable = isHoverable(el);

      el.setAttribute('data-aos', hoverable ? 'fade' : 'fade-up');
      el.setAttribute('data-aos-duration', hoverable ? '600' : '800');
      el.setAttribute('data-aos-easing', 'ease-out-cubic');
      el.setAttribute('data-aos-delay', String(Math.min(index * (hoverable ? 40 : 70), hoverable ? 160 : 350)));
      el.setAttribute('data-aos-once', 'true');
    });
  });

  document.addEventListener('aos:in', ({ detail }) => {
    clearAOSInlineStyles(detail);
  });

  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 120,
    anchorPlacement: 'top-bottom',
  });

  document.querySelectorAll(`${hoverableSelector}[data-aos].aos-animate`).forEach(clearAOSInlineStyles);

  window.addEventListener('load', () => {
    AOS.refresh();
    document.querySelectorAll(`${hoverableSelector}[data-aos].aos-animate`).forEach(clearAOSInlineStyles);
  });
}

function initFancybox() {
  if (typeof Fancybox === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const buildCaption = (caption) => {
    if (!caption) return '';
    const parts = String(caption).split('—').map((part) => part.trim());
    const title = parts[0] || caption;
    const meta = parts.slice(1).join(' — ');
    return `
      <div class="fbx-caption">
        <span class="fbx-caption__eyebrow">MAK Fern</span>
        <span class="fbx-caption__title">${title}</span>
        ${meta ? `<span class="fbx-caption__meta">${meta}</span>` : ''}
      </div>
    `;
  };

  window.fernLightboxDefaults = {
    animated: !reduceMotion,
    autoFocus: false,
    trapFocus: true,
    placeFocusBack: true,
    dragToClose: true,
    hideScrollbar: true,
    backdropClick: 'close',
    idle: false,
    mainClass: 'fern-lightbox',
    startIndex: 0,
    Thumbs: {
      type: 'classic',
      showOnStart: true,
      key: 't',
    },
    Toolbar: {
      display: {
        left: ['infobar'],
        middle: [
          'zoomIn',
          'zoomOut',
          'toggle1to1',
          'rotateCW',
          'flipX',
          'flipY',
        ],
        right: ['slideshow', 'thumbs', 'close'],
      },
    },
    Images: {
      zoom: true,
      initialSize: 'fit',
      Panzoom: {
        maxScale: 5,
        minScale: 1,
        friction: 0.22,
      },
    },
    Carousel: {
      transition: reduceMotion ? false : 'fade',
      friction: 0.88,
      Prefetch: true,
    },
    caption: (_fancybox, slide) => buildCaption(slide.caption),
    on: {
      reveal: (fancybox, slide) => {
        const src = slide.src || '';
        const isPlan = /plan|master_?plan/i.test(src);
        fancybox.container.classList.toggle('is-plan-viewer', isPlan);
      },
      'Carousel.change': (fancybox, _carousel, slide) => {
        const src = slide?.src || '';
        const isPlan = /plan|master_?plan/i.test(src);
        fancybox.container.classList.toggle('is-plan-viewer', isPlan);
      },
    },
  };

  Fancybox.bind('[data-fancybox]', window.fernLightboxDefaults);
}

function openFernLightbox(slides, startIndex = 0) {
  if (typeof Fancybox === 'undefined' || !slides?.length) return;
  Fancybox.show(slides, {
    ...(window.fernLightboxDefaults || {}),
    startIndex,
  });
}

function initPlansTabs() {
  const tabs = document.querySelectorAll('.plan-tab');
  const panels = document.querySelectorAll('.plan-panel');
  const ink = document.getElementById('plansSegInk');
  const tablist = document.getElementById('plansTabs');

  const moveInk = (activeTab) => {
    if (!ink || !tablist || !activeTab || window.innerWidth <= 767) return;
    const listBox = tablist.getBoundingClientRect();
    const tabBox = activeTab.getBoundingClientRect();
    ink.style.width = `${tabBox.width}px`;
    ink.style.transform = `translateX(${tabBox.left - listBox.left - 6}px)`;
  };

  const activateTab = (target) => {
    tabs.forEach((tab) => {
      const on = tab.dataset.tab === target;
      tab.classList.toggle('active', on);
      tab.setAttribute('aria-selected', String(on));
      if (on) moveInk(tab);
    });

    panels.forEach((panel) => {
      const on = panel.dataset.panel === target;
      panel.classList.toggle('active', on);
      if (on) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    });

    if (typeof AOS !== 'undefined') AOS.refresh();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  const initial = document.querySelector('.plan-tab.active');
  if (initial) {
    requestAnimationFrame(() => moveInk(initial));
  }

  window.addEventListener('resize', () => {
    const active = document.querySelector('.plan-tab.active');
    if (active) moveInk(active);
  });

  initVillaStudios();
}

function initVillaStudios() {
  document.querySelectorAll('[data-studio]').forEach((studio) => {
    const thumbs = [...studio.querySelectorAll('.villa-size')];
    const modes = [...studio.querySelectorAll('.villa-mode')];
    const stage = studio.querySelector('.villa-immersive__stage');
    const elevImg = studio.querySelector('.villa-studio__image');
    const planImg = studio.querySelector('.villa-studio__plan');
    const titleEl = studio.querySelector('.villa-studio__title');
    const facingEl = studio.querySelector('.villa-studio__facing');
    const builtEl = studio.querySelector('.villa-studio__built-value');
    const counterEl = studio.querySelector('.villa-studio__counter');
    const expandElev = studio.querySelector('.villa-expand-elevation');
    const expandPlan = studio.querySelector('.villa-expand-plan');
    const expandCurrent = studio.querySelector('.villa-expand-current');
    const navBtns = studio.querySelectorAll('.villa-nav-btn');
    const floorChipsWrap = studio.querySelector('.villa-floor-chips');
    const floorChips = [...studio.querySelectorAll('.villa-floor-chip')];

    if (!thumbs.length || !elevImg || !planImg || !stage) return;

    let index = 0;
    let mode = 'elevation';
    let floorFocus = 'full';

    const getUnitSlides = (focus = floorFocus) => {
      const thumb = thumbs[index];
      const title = thumb.dataset.title;
      const facing = thumb.dataset.facing;
      const built = thumb.dataset.built;
      const focusLabel = {
        full: 'Full Floor Plan',
        ground: 'Ground Floor Focus',
        first: 'First Floor Focus',
        second: 'Second Floor Focus',
      }[focus] || 'Floor Plan';

      const slides = [
        {
          src: thumb.dataset.elevation,
          caption: `${title} — ${facing} Elevation · Built-up ${built}`,
        },
      ];

      if (thumb.dataset.elevationAlt) {
        slides.push({
          src: thumb.dataset.elevationAlt,
          caption: `${title} — ${facing} Alternate Elevation · Built-up ${built}`,
        });
      }

      slides.push({
        src: thumb.dataset.plan,
        caption: `${title} — ${facing} · ${focusLabel} · Built-up ${built}`,
      });

      return slides;
    };

    const openUnitLightbox = (preferred = mode) => {
      const slides = getUnitSlides(floorFocus);
      let startIndex = 0;
      if (preferred === 'plan') startIndex = slides.length - 1;
      openFernLightbox(slides, startIndex);
    };

    const applyUnit = (nextIndex, { animate = true } = {}) => {
      index = (nextIndex + thumbs.length) % thumbs.length;
      const thumb = thumbs[index];

      thumbs.forEach((t, i) => {
        const on = i === index;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', String(on));
      });

      const elevation = thumb.dataset.elevation;
      const plan = thumb.dataset.plan;
      const title = thumb.dataset.title;
      const facing = thumb.dataset.facing;
      const built = thumb.dataset.built;

      const swap = () => {
        elevImg.src = elevation;
        elevImg.alt = `${facing} villa elevation ${title}`;
        planImg.src = plan;
        planImg.alt = `${facing} villa floor plan ${title}`;
        if (titleEl) titleEl.textContent = title;
        if (facingEl) facingEl.textContent = facing;
        if (builtEl) builtEl.textContent = built;
        if (counterEl) {
          counterEl.textContent = `Villa ${index + 1} of ${thumbs.length}`;
        }
      };

      if (!animate) {
        swap();
        return;
      }

      stage.classList.add('is-switching');
      window.setTimeout(() => {
        swap();
        stage.classList.remove('is-switching');
      }, 140);
    };

    const applyMode = (nextMode) => {
      mode = nextMode;
      modes.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
      });
      stage.setAttribute('data-active-mode', mode);
      if (floorChipsWrap) {
        if (mode === 'plan') floorChipsWrap.removeAttribute('hidden');
        else floorChipsWrap.setAttribute('hidden', '');
      }
    };

    floorChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        floorFocus = chip.dataset.floorFocus || 'full';
        floorChips.forEach((c) => c.classList.toggle('active', c === chip));
        applyMode('plan');
        openUnitLightbox('plan');
      });
    });

    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => applyUnit(i));
    });

    modes.forEach((btn) => {
      btn.addEventListener('click', () => applyMode(btn.dataset.mode));
    });

    navBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        applyUnit(index + Number(btn.dataset.dir || 0));
      });
    });

    expandElev?.addEventListener('click', (e) => {
      e.preventDefault();
      openUnitLightbox('elevation');
    });

    expandPlan?.addEventListener('click', (e) => {
      e.preventDefault();
      openUnitLightbox('plan');
    });

    expandCurrent?.addEventListener('click', (e) => {
      e.preventDefault();
      openUnitLightbox(mode);
    });

    stage.addEventListener('dblclick', () => openUnitLightbox(mode));

    studio.tabIndex = 0;
    studio.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        applyUnit(index + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        applyUnit(index - 1);
      } else if (e.key === 'e' || e.key === 'E') {
        applyMode('elevation');
      } else if (e.key === 'f' || e.key === 'F') {
        applyMode('plan');
      } else if (e.key === 'Enter') {
        openUnitLightbox(mode);
      }
    });

    let touchX = null;
    stage.addEventListener('touchstart', (e) => {
      touchX = e.changedTouches[0].clientX;
    }, { passive: true });
    stage.addEventListener('touchend', (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) < 48) return;
      applyUnit(index + (dx < 0 ? 1 : -1));
    }, { passive: true });

    applyUnit(0, { animate: false });
    applyMode('elevation');
  });
}

function initMasterHotspots() {
  const hotspots = Array.from(document.querySelectorAll('.master-hotspot'));
  if (!hotspots.length) return;

  const closeAll = (except = null) => {
    hotspots.forEach((spot) => {
      if (spot !== except) spot.classList.remove('is-open');
    });
  };

  const openLightbox = (spot) => {
    const src = spot.dataset.src;
    const caption = spot.dataset.caption || spot.querySelector('.master-hotspot__label')?.textContent?.trim() || 'Highlight';
    if (!src) return;

    openFernLightbox([
      {
        src: './assets/images/plans/masterplan.jpg',
        caption: 'MAK Fern Master Plan — Community Canvas',
      },
      {
        src,
        caption: `${caption} — MAK Fern`,
      },
    ], 1);
  };

  hotspots.forEach((spot) => {
    spot.addEventListener('mouseenter', () => closeAll(spot));
    spot.addEventListener('focusin', () => {
      closeAll(spot);
      spot.classList.add('is-open');
    });
    spot.addEventListener('focusout', () => {
      // Delay so focus can move into card if needed
      requestAnimationFrame(() => {
        if (!spot.contains(document.activeElement)) {
          spot.classList.remove('is-open');
        }
      });
    });

    spot.addEventListener('click', (event) => {
      const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

      if (isTouch) {
        if (!spot.classList.contains('is-open')) {
          event.preventDefault();
          closeAll(spot);
          spot.classList.add('is-open');
          return;
        }
      }

      openLightbox(spot);
      closeAll();
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.master-hotspot')) closeAll();
  });
}

function initSpecsStudio() {
  const studio = document.getElementById('specsStudio');
  if (!studio) return;

  const tabs = Array.from(studio.querySelectorAll('[data-spec-tab]'));
  const panels = Array.from(studio.querySelectorAll('.specs-panel'));
  if (!tabs.length || !panels.length) return;

  const isStackedMobile = () => window.matchMedia('(max-width: 991px)').matches;

  const activate = (id, focusTab = false) => {
    if (isStackedMobile()) {
      // Mobile: every category visible — no tab gating
      panels.forEach((panel) => {
        panel.classList.add('active');
        panel.removeAttribute('hidden');
        panel.setAttribute('aria-hidden', 'false');
      });
      tabs.forEach((tab) => {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
      });
      return;
    }

    tabs.forEach((tab) => {
      const isActive = tab.dataset.specTab === id;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.tabIndex = isActive ? 0 : -1;
      if (isActive && focusTab) tab.focus();
    });

    panels.forEach((panel) => {
      const isActive = panel.id === `spec-panel-${id}`;
      panel.classList.toggle('active', isActive);
      panel.removeAttribute('hidden');
      panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (isStackedMobile()) return;
      activate(tab.dataset.specTab);
    });

    tab.addEventListener('keydown', (event) => {
      if (isStackedMobile()) return;
      const index = tabs.indexOf(tab);
      if (index < 0) return;

      let next = null;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        next = tabs[(index + 1) % tabs.length];
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        next = tabs[(index - 1 + tabs.length) % tabs.length];
      } else if (event.key === 'Home') {
        next = tabs[0];
      } else if (event.key === 'End') {
        next = tabs[tabs.length - 1];
      }

      if (!next) return;
      event.preventDefault();
      activate(next.dataset.specTab, true);
    });
  });

  const sync = () => activate(tabs.find((tab) => tab.classList.contains('active'))?.dataset.specTab || '1');
  sync();
  window.addEventListener('resize', sync, { passive: true });
}

function initLocationTabs() {
  const shell = document.getElementById('locationShell');
  if (!shell) return;

  const tabs = [...shell.querySelectorAll('[data-loc-tab]')];
  const panels = [...shell.querySelectorAll('.location-panel')];
  const cards = [...shell.querySelectorAll('.nearby-card')];

  const activate = (id) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.locTab === id;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    panels.forEach((panel) => {
      const active = panel.id === `loc-panel-${id}`;
      panel.classList.toggle('active', active);
      panel.toggleAttribute('hidden', !active);
    });
  };

  tabs.forEach(tab => tab.addEventListener('click', () => activate(tab.dataset.locTab)));

  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
    cards.forEach((card) => {
      card.querySelector('.nearby-card__hit')?.addEventListener('click', () => {
        const opening = !card.classList.contains('is-open');
        cards.forEach(other => other.classList.remove('is-open'));
        card.classList.toggle('is-open', opening);
      });
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.nearby-card')) cards.forEach(card => card.classList.remove('is-open'));
    });
  }
}

function initScrollSpy() {
  // Nav maps Amenities → #clubhouse; #amenities still highlights Amenities
  const sectionIds = [
    'about',
    'plans',
    'luxury-homes',
    'walkthrough',
    'clubhouse',
    'amenities',
    'gallery',
    'location',
    'specifications',
  ];
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  let ticking = false;

  const getHeaderOffset = () => {
    const header = document.getElementById('siteHeader');
    return Math.ceil((header?.getBoundingClientRect().height || 72) + 24);
  };

  const updateActiveFromScroll = () => {
    if (typeof window.isFernNavProgrammatic === 'function' && window.isFernNavProgrammatic()) {
      return;
    }

    // Menu open + body fixed: don't reshuffle active state
    if (document.body.classList.contains('nav-open')) return;

    const marker = getHeaderOffset();
    let currentId = sections[0].id;

    for (let i = 0; i < sections.length; i += 1) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top - marker <= 0) {
        currentId = sections[i].id;
      } else {
        break;
      }
    }

    // Near page bottom → last section
    const scrollBottom = window.scrollY + window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    if (docHeight - scrollBottom < 80) {
      currentId = sections[sections.length - 1].id;
    }

    // Near top / banner → clear or about
    if (window.scrollY < 80) {
      currentId = 'about';
      // Still on hero: no strong section yet — keep about only once past banner a bit
      const banner = document.getElementById('banner');
      if (banner) {
        const bannerBottom = banner.getBoundingClientRect().bottom;
        if (bannerBottom > window.innerHeight * 0.55) {
          if (typeof window.setFernActiveNav === 'function') {
            window.setFernActiveNav('banner', { force: true });
          }
          return;
        }
      }
    }

    if (typeof window.setFernActiveNav === 'function') {
      window.setFernActiveNav(currentId);
    }
  };

  const onScrollOrResize = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateActiveFromScroll();
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);
  updateActiveFromScroll();
}

function initCtaDock() {
  const dock = document.getElementById('ctaDock');
  const details = document.getElementById('projectDetails');
  const brochureBtn = document.getElementById('ctaBrochureOpen');
  const footerBrochureBtn = document.getElementById('footerBrochureOpen');
  const openBtn = document.getElementById('ctaDetailsOpen');
  const closeBtn = document.getElementById('ctaDetailsClose');
  const dismissBtn = document.getElementById('ctaDetailsDismiss');
  const panel = details?.querySelector('.project-details__panel');
  if (!dock) return;

  document.body.classList.add('has-cta-dock');

  const FORM_PAGE =
    'https://makprojects.org/mak-crm/form-widget.php?form_id=1&ui=page&mode=live';

  const measureDockSpace = () => {
    const height = Math.ceil(dock.getBoundingClientRect().height || 64);
    const gap = window.innerWidth <= 767 ? 28 : 24;
    document.documentElement.style.setProperty('--cta-dock-space', `${height + gap}px`);
  };

  const syncVisibility = () => {
    const show = window.scrollY > 80;
    dock.classList.toggle('is-visible', show && !document.body.classList.contains('details-open'));
  };

  const openMakCrmForm = () => {
    const FORM_SRC = 'https://makprojects.org/mak-crm/form-widget.php?form_id=1&display=popup';

    const tryClickFab = () => {
      const fabBtn = document.querySelector('[id^="mak-cf-root-"][id$="-fab"] .mak-cf-fab-btn');
      if (!fabBtn) return false;
      fabBtn.click();
      return true;
    };

    if (tryClickFab()) return true;

    // Ensure form widget script is present (idle-loaded)
    if (typeof window.loadMakWidgets === 'function') {
      window.loadMakWidgets();
    }
    if (!document.querySelector('script[src*="form-widget.php"]')) {
      const f = document.createElement('script');
      f.src = FORM_SRC;
      f.defer = true;
      document.body.appendChild(f);
    }

    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (tryClickFab() || tries >= 40) {
        window.clearInterval(timer);
        if (tries >= 40 && !tryClickFab()) {
          window.open(FORM_PAGE, '_blank', 'noopener,noreferrer');
        }
      }
    }, 100);

    return false;
  };

  window.openMakCrmForm = openMakCrmForm;

  document.querySelectorAll('[data-open-crm-form]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      openMakCrmForm();
    });
  });

  const closeDetails = () => {
    if (!details) return;
    details.hidden = true;
    document.body.classList.remove('details-open');
    dock.classList.remove('is-hidden-by-modal');
    syncVisibility();
    openBtn?.focus();
  };

  // CTA dock + footer brochure → CRM lead form
  brochureBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    openMakCrmForm();
  });
  footerBrochureBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    openMakCrmForm();
  });
  openBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    openMakCrmForm();
  });

  closeBtn?.addEventListener('click', closeDetails);
  dismissBtn?.addEventListener('click', closeDetails);

  details?.addEventListener('click', (event) => {
    if (event.target === details) closeDetails();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && details && !details.hidden) {
      closeDetails();
    }
  });

  // Focus trap lite inside panel while open
  details?.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || details.hidden || !panel) return;
    const focusable = [...panel.querySelectorAll('a, button, [tabindex]:not([tabindex="-1]")')]
      .filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
      measureDockSpace();
      syncVisibility();
    });
    ro.observe(dock);
  }

  window.addEventListener('scroll', syncVisibility, { passive: true });
  window.addEventListener('resize', () => {
    measureDockSpace();
    syncVisibility();
  }, { passive: true });
  window.addEventListener('orientationchange', () => {
    window.setTimeout(() => {
      measureDockSpace();
      syncVisibility();
    }, 120);
  });

  measureDockSpace();
  syncVisibility();
}

function initWalkthrough() {
  const section = document.getElementById('walkthrough');
  if (!section) return;

  const cfg = window.FERN_SITE || {};
  const video = section.querySelector('[data-walkthrough-video]');
  const playBtns = section.querySelectorAll('[data-walkthrough-play]');
  const note = section.querySelector('[data-walkthrough-note]');
  const meta = section.querySelector('[data-walkthrough-meta]');
  const overlay = section.querySelector('.walkthrough-player__play');

  const youtube = String(cfg.walkthrough_youtube || '').trim();
  const videoSrcRaw = String(
    cfg.walkthrough_video || '/fern/assets/videos/fern-walkthrough.mp4'
  ).trim();
  let videoSrc = videoSrcRaw;
  try {
    videoSrc = new URL(videoSrcRaw, window.location.origin).href;
  } catch (err) {
    videoSrc = videoSrcRaw;
  }

  if (!video) return;

  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.preload = 'metadata';
  video.controls = false;
  video.src = videoSrc;
  try {
    video.load();
  } catch (err) {
    /* ignore */
  }

  const showPlaying = () => {
    section.classList.add('is-playing');
    video.controls = true;
    if (overlay) {
      overlay.hidden = true;
      overlay.setAttribute('aria-hidden', 'true');
    }
  };

  const showIdle = () => {
    section.classList.remove('is-playing');
    video.controls = false;
    if (overlay) {
      overlay.hidden = false;
      overlay.removeAttribute('aria-hidden');
    }
  };

  const openYoutube = () => {
    if (typeof Fancybox !== 'undefined') {
      Fancybox.show([{ src: youtube, type: 'youtube', preload: false }]);
      return;
    }
    window.open(youtube, '_blank', 'noopener');
  };

  const start = async () => {
    section.classList.remove('is-unavailable');
    if (note) note.hidden = true;
    if (meta) meta.textContent = 'Villa tour · HD';

    if (youtube) {
      openYoutube();
      return;
    }

    showPlaying();

    try {
      if (video.readyState < 2) {
        await new Promise((resolve) => {
          const onReady = () => {
            video.removeEventListener('loadeddata', onReady);
            resolve();
          };
          video.addEventListener('loadeddata', onReady);
          video.load();
          setTimeout(resolve, 1500);
        });
      }
      video.currentTime = 0;
      await video.play();
    } catch (err) {
      // Browser blocked unmuted autoplay — keep controls visible for manual play
      try {
        video.muted = true;
        await video.play();
        video.muted = false;
      } catch (err2) {
        if (note) {
          note.hidden = false;
          note.textContent = 'Use the video controls to play the walkthrough.';
        }
      }
    }
  };

  playBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      start();
    });
  });

  video.addEventListener('ended', () => {
    showIdle();
    try {
      video.currentTime = 0;
    } catch (err) {
      /* ignore */
    }
  });

  video.addEventListener('pause', () => {
    if (!video.ended && video.currentTime > 0.1) {
      // keep playing UI + native controls while paused mid-watch
      section.classList.add('is-playing');
      video.controls = true;
    }
  });
}



