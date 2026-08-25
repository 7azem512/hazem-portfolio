
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.project, .stack-group, .training-list > div').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .55s ease, transform .55s ease';
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = `.in-view { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);
