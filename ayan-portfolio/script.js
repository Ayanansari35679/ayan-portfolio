const loader = document.getElementById('loader');
const num = document.getElementById('loaderNumber');
const hello = document.getElementById('helloScreen');

// Cinematic entrance: 0% -> 100% -> hello -> portfolio.
let n = 0;
const timer = setInterval(() => {
  n += Math.ceil(Math.random() * 7);
  if (n >= 100) {
    n = 100;
    clearInterval(timer);
    num.textContent = '100%';

    // Let the 100% state breathe for a moment before the hello screen arrives.
    setTimeout(() => {
      loader.classList.add('done');
      hello.classList.add('active');
      hello.setAttribute('aria-hidden', 'false');

      // The hello screen stays long enough to feel intentional, not like a flash.
      setTimeout(() => {
        hello.classList.add('leave');
        document.body.classList.add('portfolio-ready');

        setTimeout(() => {
          hello.classList.remove('active', 'leave');
          hello.setAttribute('aria-hidden', 'true');
        }, 1200);
      }, 2100);
    }, 650);
  } else {
    num.textContent = n + '%';
  }
}, 35);

const cursor = document.getElementById('cursor');
window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a,button,.skill,.project').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

const obs = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) e.target.classList.add('show');
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(x => obs.observe(x));

const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav nav a');
window.addEventListener('scroll', () => {
  let y = scrollY + 150;
  sections.forEach(s => {
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      links.forEach(l => l.style.opacity = l.getAttribute('href') === '#' + s.id ? '1' : '.55');
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const el = document.querySelector(a.getAttribute('href'));
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth' });
  }
}));
const portrait = document.querySelector(".portrait-card");

if (portrait) {
  portrait.addEventListener("mousemove", (e) => {

    const rect = portrait.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    portrait.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
      scale(1.015)
    `;

    portrait.style.setProperty(
      "--mouse-x",
      `${x}px`
    );

    portrait.style.setProperty(
      "--mouse-y",
      `${y}px`
    );
  });

  portrait.addEventListener("mouseleave", () => {
    portrait.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0)
      scale(1)
    `;
  });
}
