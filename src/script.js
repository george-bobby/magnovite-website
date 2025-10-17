if (typeof window !== 'undefined' && typeof window.gsap !== 'undefined') {
  try {
    if (window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    // First step
    window.gsap.from(".hero-main-container", {
      scale: 1.45,
      duration: 2.8,
      ease: "power3.out",
    });

    window.gsap.to(".overlay", {
      opacity: 0,
      duration: 2.8,
      ease: "power3.out",
      onComplete: () => {
        document.body.style.overflow = "visible";
        document.body.style.overflowX = "hidden";
      },
    });

    // Scroll Indicator
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const bounceTimeline = window.gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    bounceTimeline.to(scrollIndicator, {
      y: 20,
      opacity: 0.3,
      duration: 0.8,
      ease: "power1.inOut",
    });

    // Hide scroll indicator when scrolling starts
    let hasScrolled = false;
    window.addEventListener('scroll', () => {
      if (!hasScrolled) {
        hasScrolled = true;
        window.gsap.to(scrollIndicator, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            if (scrollIndicator) scrollIndicator.style.display = 'none';
          }
        });
      }
    });

    // Create a timeline for better control
    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        scrub: 2.2, // slightly slower scrub for longer presence
        pin: true,
        start: "top top",
        end: "+=2300", // extend distance so hero stays a bit longer
        ease: "none",
      },
    });

    // Need to ensure that the scale is like this otherwise some flicks happens
    tl.set(".hero-main-container", { scale: 1.25 });
    tl.to(".hero-main-container", { scale: 1, duration: 1 });
    tl.to(
      ".hero-main-logo",
      { opacity: 0, duration: 0.5 },
      "<"
    );
    tl.to(
      ".hero-main-image",
      { opacity: 0, duration: 0.9 },
      "<+=0.5"
    );
    tl.to(
      ".hero-main-container",
      { backgroundSize: "28vh", duration: 1.5 },
      "<+=0.2"
    );
    tl.fromTo(
      ".hero-text",
      { backgroundImage: `radial-gradient(
            circle at 50% 200vh,
            rgba(255, 214, 135, 0) 0,
            rgba(157, 47, 106, 0.5) 90vh,
            rgba(157, 47, 106, 0.8) 120vh,
            rgba(32, 31, 66, 0) 150vh
          )` },
      { backgroundImage: `radial-gradient(circle at 50% 3.9575vh,
          rgb(210, 180, 255) 0vh,
          rgb(160, 120, 255) 50.011vh,
          rgb(80, 140, 255) 90.0183vh,
          rgba(32, 31, 66, 0) 140.599vh)`, duration: 3 },
      "<1.2"
    );
    tl.fromTo(
      ".hero-tagline",
      { 
        opacity: 0, 
        y: 30,
        backgroundImage: `radial-gradient(
            circle at 50% 200vh,
            rgba(255, 214, 135, 0) 0,
            rgba(157, 47, 106, 0.5) 90vh,
            rgba(157, 47, 106, 0.8) 120vh,
            rgba(32, 31, 66, 0) 150vh
          )` 
      },
      { 
        opacity: 1, 
        y: 0,
        backgroundImage: `radial-gradient(circle at 50% 3.9575vh,
          rgb(210, 180, 255) 0vh,
          rgb(160, 120, 255) 50.011vh,
          rgb(80, 140, 255) 90.0183vh,
          rgba(32, 31, 66, 0) 140.599vh)`, 
        duration: 3 
      },
      "<0.2"
    );
    tl.fromTo(
      ".hero-text-logo",
      { opacity: 0, maskImage: `radial-gradient(circle at 50% 145.835%, rgb(0, 0, 0) 36.11%, rgba(0, 0, 0, 0) 68.055%)` },
      { opacity: 1, maskImage: `radial-gradient(circle at 50% 105.594%, rgb(0, 0, 0) 62.9372%, rgba(0, 0, 0, 0) 81.4686%)`, duration: 3 },
      "<0.2"
    );
    tl.set(".hero-main-container", { opacity: 0 });
    tl.to(".hero-1-container", { scale: 0.85, duration: 3 }, "<-=3");
    tl.set(
      ".hero-1-container",
      { maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)` },
      "<+=2.1"
    );
    tl.to(
      ".hero-1-container",
      { maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`, duration: 2 },
      "<+=0.2"
    );
    tl.to(
      ".hero-text-logo",
      { opacity: 0, duration: 2 },
      "<1.5"
    );
    tl.set(".hero-1-container", { opacity: 0 });
    tl.set(".hero-2-container", { visibility: "visible" });
    tl.to(".hero-2-container", { opacity: 1, duration: 3 }, "<+=0.2");
    tl.fromTo(
      ".hero-2-container",
      { backgroundImage: `radial-gradient(
            circle at 50% 200vh,
            rgba(255, 214, 135, 0) 0,
            rgba(157, 47, 106, 0.5) 90vh,
            rgba(157, 47, 106, 0.8) 120vh,
            rgba(32, 31, 66, 0) 150vh
          )` },
      { backgroundImage: `radial-gradient(circle at 50% 3.9575vh,
          rgb(210, 180, 255) 0vh,
          rgb(160, 120, 255) 50.011vh,
          rgb(80, 140, 255) 90.0183vh,
          rgba(32, 31, 66, 0) 140.599vh)`, duration: 3 },
      "<1.2"
    );
  } catch (err) {
    // no-op on pages without GSAP/ScrollTrigger
  }
}

// Promo video modal logic
const promoCta = document.querySelector('.promo-cta');
const promoModal = document.getElementById('promoModal');
const promoVideo = document.getElementById('promoVideo');
const promoCloseBtn = document.querySelector('.promo-modal__close');

function openPromoModal() {
  if (!promoModal) return;
  promoModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  if (promoVideo) {
    promoVideo.currentTime = 0;
    promoVideo.play().catch(() => {});
  }
}

function closePromoModal() {
  if (!promoModal) return;
  promoModal.classList.remove('is-open');
  document.body.style.overflow = 'visible';
  if (promoVideo) {
    promoVideo.pause();
  }
}

if (promoCta) {
  promoCta.addEventListener('click', openPromoModal);
}

if (promoModal) {
  promoModal.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    // Close when clicking on elements marked with data-close (including their children)
    if (target.closest('[data-close]')) {
      closePromoModal();
      return;
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && promoModal.classList.contains('is-open')) {
      closePromoModal();
    }
  });
}

if (promoCloseBtn) {
  promoCloseBtn.addEventListener('click', closePromoModal);
}

// Gallery Lightbox (only runs on gallery page)
const galleryGrid = document.querySelector('.gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxPrev = document.querySelector('.lightbox__prev');
const lightboxNext = document.querySelector('.lightbox__next');

let galleryImages = [];
let currentIndex = -1;

let currentScale = 1;
let originX = 0;
let originY = 0;
let isPanning = false;
let panStartX = 0;
let panStartY = 0;

function resetLightboxTransforms() {
  currentScale = 1;
  originX = 0;
  originY = 0;
  if (lightboxImg) {
    lightboxImg.style.transform = `translate(0px, 0px) scale(1)`;
  }
}

function openLightboxByIndex(index) {
  if (!lightbox || !lightboxImg) return;
  if (!galleryImages.length) return;
  currentIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
  resetLightboxTransforms();
  lightbox.classList.add('is-active');
  // allow CSS transitions to catch
  requestAnimationFrame(() => lightbox.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  // wait for transition to finish before fully hiding
  setTimeout(() => {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = 'visible';
  }, 220);
}

if (galleryGrid && lightbox && lightboxImg) {
  galleryImages = Array.from(document.querySelectorAll('.gallery-img'));

  const openFromTarget = (target) => {
    if (!(target instanceof Element)) return;
    const imgEl = target.closest('.gallery-img');
    if (imgEl && imgEl instanceof HTMLImageElement) {
      const idx = galleryImages.indexOf(imgEl);
      if (idx !== -1) openLightboxByIndex(idx);
    }
  };

  galleryGrid.addEventListener('click', (e) => {
    const target = e.target;
    openFromTarget(target);
  });

  // Support touch taps and stylus
  galleryGrid.addEventListener('pointerup', (e) => {
    // ignore if it was a drag/scroll; quick taps only
    if (e.pointerType === 'mouse') return; // mouse handled by click
    openFromTarget(e.target);
  });

  // Keyboard accessibility
  galleryGrid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    openFromTarget(e.target);
  });

  lightbox.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-close]')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') {
      openLightboxByIndex(currentIndex + 1);
    }
    if (e.key === 'ArrowLeft') {
      openLightboxByIndex(currentIndex - 1);
    }
  });

  // Zoom with wheel
  lightboxImg.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    const step = 0.15;
    const nextScale = Math.min(4, Math.max(1, currentScale - delta * step));
    currentScale = nextScale;
    lightboxImg.style.transform = `translate(${originX}px, ${originY}px) scale(${currentScale})`;
  }, { passive: false });

  // Click to toggle zoom centered on click point
  lightboxImg.addEventListener('click', (e) => {
    const rect = lightboxImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    if (currentScale <= 1.01) {
      const targetScale = 2.5;
      originX = cx - targetScale * x;
      originY = cy - targetScale * y;
      currentScale = targetScale;
      lightboxImg.style.cursor = 'grabbing';
    } else {
      currentScale = 1;
      originX = 0;
      originY = 0;
      lightboxImg.style.cursor = 'grab';
    }
    lightboxImg.style.transform = `translate(${originX}px, ${originY}px) scale(${currentScale})`;
  });

  // Drag to pan when zoomed
  lightboxImg.addEventListener('mousedown', (e) => {
    if (currentScale <= 1) return;
    isPanning = true;
    panStartX = e.clientX - originX;
    panStartY = e.clientY - originY;
    lightboxImg.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    originX = e.clientX - panStartX;
    originY = e.clientY - panStartY;
    lightboxImg.style.transform = `translate(${originX}px, ${originY}px) scale(${currentScale})`;
  });

  window.addEventListener('mouseup', () => {
    isPanning = false;
    lightboxImg.style.cursor = 'grab';
  });

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => openLightboxByIndex(currentIndex + 1));
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => openLightboxByIndex(currentIndex - 1));
  }
}
