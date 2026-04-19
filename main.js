// Navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('.nav');
const backToTop = document.getElementById('back-to-top');

// Mobile menu toggle
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// Hide nav on scroll down, show on scroll up
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 120) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
  lastScroll = currentScroll;

  if (backToTop) {
    if (currentScroll > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

// Back to top
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Reading progress bar
const readingProgress = document.getElementById('reading-progress');
if (readingProgress) {
  const articleBody = document.querySelector('.article-body');
  if (articleBody) {
    window.addEventListener('scroll', () => {
      const articleTop = articleBody.offsetTop;
      const articleHeight = articleBody.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;
      const progress = Math.min(
        Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
        1
      );
      readingProgress.style.width = progress * 100 + '%';
    });
  }
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach(el => observer.observe(el));
}

// --- Homepage: Row/stage tracking ---
const rows = document.querySelectorAll('.row');
const stageDots = document.querySelectorAll('.stage-dot');

if (rows.length > 0) {
  // Observe each row for in-view state
  const rowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('in-view', entry.isIntersecting);
      });
    },
    { threshold: 0.2 }
  );
  rows.forEach(r => rowObserver.observe(r));

  // Update progress dots on scroll
  if (stageDots.length > 0) {
    const updateDots = () => {
      const windowHeight = window.innerHeight;
      let activeIndex = 0;

      rows.forEach((row, i) => {
        if (row.getBoundingClientRect().top < windowHeight * 0.5) {
          activeIndex = i;
        }
      });

      stageDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    };

    window.addEventListener('scroll', updateDots, { passive: true });
    updateDots();

    stageDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        rows[i].scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
}
