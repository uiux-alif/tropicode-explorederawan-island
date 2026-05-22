/* ============================================================
   EXPLORE DERAWAN — Main JavaScript
   main.js — Minimal, organized, vanilla JS
   ============================================================ */

/* ── Navbar ─────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navOverlay?.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navOverlay?.addEventListener('click', closeNav);
  navMenu.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeNav));
}

function closeNav() {
  navMenu?.classList.remove('open');
  navOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

/* Mark active nav link */
(function markActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── Scroll Reveal ───────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

/* ── Testimonials Slider ─────────────────────────────────────── */
function initSlider(trackId, prevId, nextId, dotsId) {
  const track   = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const dotsEl  = document.getElementById(dotsId);
  if (!track) return;

  const slides = Array.from(track.children);
  let current  = 0;
  let perView  = getPerView();

  function getPerView() {
    return window.innerWidth >= 1024 ? 3
         : window.innerWidth >= 640  ? 2
         : 1;
  }

  const total = Math.max(0, slides.length - perView);

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total));
    const slideW = track.parentElement.offsetWidth / perView;
    track.style.transform = `translateX(-${current * slideW}px)`;
    renderDots();
  }

  function renderDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    for (let i = 0; i <= total; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  window.addEventListener('resize', () => {
    perView = getPerView();
    goTo(Math.min(current, Math.max(0, slides.length - perView)));
  }, { passive: true });

  renderDots();
}

initSlider('testiTrack', 'testiPrev', 'testiNext', 'testiDots');

/* ── Gallery Filter & Lightbox ───────────────────────────────── */
(function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items      = document.querySelectorAll('.gallery-item');
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightboxImg');
  const lbClose    = document.getElementById('lightboxClose');

  // Filter
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        item.style.display = match ? '' : 'none';
      });
    });
  });

  // Lightbox
  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (lbImg && img) {
        lbImg.src  = img.src.replace('w=600', 'w=1200');
        lbImg.alt  = img.alt;
      }
      lightbox?.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
    if (lbImg) lbImg.src = '';
  }

  lbClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();

/* ── FAQ Accordion ───────────────────────────────────────────── */
(function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
})();

/* ── Load JSON data & render sections ────────────────────────── */
async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (e) {
    console.warn('loadJSON error:', path, e);
    return null;
  }
}

/* Render package cards */
function renderPackageCards(packages, containerId, max) {
  const el = document.getElementById(containerId);
  if (!el || !packages) return;
  const list = max ? packages.slice(0, max) : packages;
  el.innerHTML = list.map(pkg => `
    <div class="pkg-card reveal" data-type="${pkg.type}">
      <div class="pkg-card-img">
        <img src="${pkg.image}" alt="${pkg.title}" loading="lazy" width="600" height="375">
        ${pkg.badge ? `<span class="pkg-badge">${pkg.badge}</span>` : ''}
      </div>
      <div class="pkg-card-body">
        <div class="pkg-card-meta">
          <span class="pkg-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            ${pkg.duration}
          </span>
        </div>
        <h3 class="h4">${pkg.title}</h3>
        <div class="pkg-destinations">
          ${pkg.destinations.slice(0,3).map(d => `<span class="pkg-dest-tag">${d}</span>`).join('')}
        </div>
        <div class="pkg-price-row">
          <div>
            <div class="pkg-price-label">Mulai dari</div>
            ${pkg.price_from > 0
              ? `<div class="pkg-price-value">Rp ${(pkg.price_from/1000).toLocaleString('id')}K <span>/ pax</span></div>`
              : `<div class="pkg-price-value" style="font-size:1rem">Hubungi Kami</div>`
            }
          </div>
          <a href="package-detail.html?id=${pkg.slug}" class="btn btn-primary btn-sm">Detail</a>
        </div>
      </div>
    </div>
  `).join('');
  initRevealNew(el.querySelectorAll('.reveal'));
}

/* Render destination cards */
function renderDestCards(destinations, containerId, max) {
  const el = document.getElementById(containerId);
  if (!el || !destinations) return;
  const list = max ? destinations.slice(0, max) : destinations;
  el.innerHTML = list.map(dest => `
    <div class="dest-card reveal">
      <img src="${dest.image}" alt="${dest.name}" loading="lazy" width="400" height="530">
      <div class="dest-card-overlay"></div>
      <div class="dest-card-content">
        <div class="dest-card-name">${dest.name}</div>
        <div class="dest-card-tagline">${dest.tagline}</div>
        <a href="destinations.html#${dest.id}" class="dest-card-btn">
          Explore
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  `).join('');
  initRevealNew(el.querySelectorAll('.reveal'));
}

/* Render testimonials */
function renderTestimonials(testimonials, trackId) {
  const el = document.getElementById(trackId);
  if (!el || !testimonials) return;
  el.innerHTML = testimonials.map(t => `
    <div class="testi-card" style="min-width:320px;flex:0 0 320px">
      <div class="testi-stars">${'★'.repeat(t.rating)}</div>
      <p class="testi-text">${t.review}</p>
      <div class="testi-author">
        <img class="testi-avatar" src="${t.avatar}" alt="${t.name}" width="48" height="48" loading="lazy">
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-meta">${t.origin} · ${t.trip} · ${t.date}</div>
        </div>
      </div>
    </div>
  `).join('');
  // re-init slider after render
  initSlider('testiTrack', 'testiPrev', 'testiNext', 'testiDots');
}

/* Render gallery preview */
function renderGalleryPreview(gallery, containerId, max) {
  const el = document.getElementById(containerId);
  if (!el || !gallery) return;
  const list = max ? gallery.slice(0, max) : gallery;
  el.innerHTML = list.map(g => `
    <div class="gallery-item" data-category="${g.category}" title="${g.title}">
      <img src="${g.image}" alt="${g.title}" loading="lazy" width="400" height="400">
      <div class="gallery-item-overlay">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
      </div>
    </div>
  `).join('');
}

/* Helper: init IntersectionObserver for newly-added .reveal elements */
function initRevealNew(els) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ── Page-specific init ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  const page = document.body.dataset.page;

  if (page === 'home') {
    const [packages, destinations, testimonials, gallery] = await Promise.all([
      loadJSON('data/packages.json'),
      loadJSON('data/destinations.json'),
      loadJSON('data/testimonials.json'),
      loadJSON('data/gallery.json'),
    ]);
    renderPackageCards(packages, 'packagesGrid', 3);
    renderDestCards(destinations?.filter(d => d.highlight), 'destinationsGrid', 4);
    renderTestimonials(testimonials, 'testiTrack');
    renderGalleryPreview(gallery, 'galleryPreview', 8);
  }

  if (page === 'packages') {
    const packages = await loadJSON('data/packages.json');
    renderPackageCards(packages, 'packagesGrid');
    // Category filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.dataset.filter;
        document.querySelectorAll('.pkg-card').forEach(card => {
          const match = type === 'all' || card.dataset.type === type;
          card.style.display = match ? '' : 'none';
        });
      });
    });
  }

  if (page === 'destinations') {
    const destinations = await loadJSON('data/destinations.json');
    renderAllDestinations(destinations);
  }

  if (page === 'gallery') {
    const gallery = await loadJSON('data/gallery.json');
    renderFullGallery(gallery);
  }

  if (page === 'package-detail') {
    // Detail page uses inline data, no extra loading needed
  }
});

/* ── Destinations page: render all cards ─────────────────────── */
function renderAllDestinations(destinations) {
  const el = document.getElementById('destinationsGrid');
  if (!el || !destinations) return;
  el.innerHTML = destinations.map(dest => `
    <div class="card reveal" id="${dest.id}">
      <div class="card-img">
        <img src="${dest.image}" alt="${dest.name}" loading="lazy" width="600" height="450">
      </div>
      <div class="card-body">
        <div class="section-eyebrow">${dest.tagline}</div>
        <h3 class="h4 card-title">${dest.name}</h3>
        <p class="card-text">${dest.description}</p>
        <div class="pkg-destinations mt-3">
          ${dest.activities.map(a => `<span class="pkg-dest-tag">${a}</span>`).join('')}
        </div>
        <div class="mt-3">
          <a href="packages.html" class="btn-ghost btn btn-sm">Lihat Paket →</a>
        </div>
      </div>
    </div>
  `).join('');
  initRevealNew(el.querySelectorAll('.reveal'));
}

/* ── Gallery page: render full masonry ────────────────────────── */
function renderFullGallery(gallery) {
  const el = document.getElementById('galleryGrid');
  if (!el || !gallery) return;

  el.innerHTML = gallery.map(g => `
    <div class="gallery-item" data-category="${g.category}" title="${g.title}">
      <img src="${g.image}" alt="${g.title}" loading="lazy" width="600" height="600">
      <div class="gallery-item-overlay">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
          <path d="M11 8v6M8 11h6"/>
        </svg>
      </div>
    </div>
  `).join('');

  const items = document.querySelectorAll('.gallery-item');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // FILTER
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;

      items.forEach(item => {
        const match = cat === 'all' || item.dataset.category === cat;
        item.style.display = match ? '' : 'none';
      });

    });
  });

  // LIGHTBOX
  items.forEach(item => {
    item.addEventListener('click', () => {

      const img = item.querySelector('img');
      const lbImg = document.getElementById('lightboxImg');
      const lb = document.getElementById('lightbox');

      if (lbImg && img) {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
      }

      lb?.classList.add('open');
      document.body.style.overflow = 'hidden';

    });
  });
}

/* ── Contact form ────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name');
    const msg  = data.get('message');
    const tel  = '6281234567890'; // ganti nomor WA
    const text = encodeURIComponent(`Halo Explore Derawan!\n\nNama: ${name}\n\n${msg}`);
    window.open(`https://wa.me/${tel}?text=${text}`, '_blank');
  });
}
