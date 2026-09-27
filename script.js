// Smooth Scroll
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

// Intersection Observer for Reveal Animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Magnetic Spotlight Effect for Project Cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
});

// Typewriter Effect with structured tokens
const tokens = [
  { text: "public ", cls: "kw" },
  { text: "class ", cls: "kw" },
  { text: "Hazem ", cls: "cl" },
  { text: "implements ", cls: "kw" },
  { text: "BackendDeveloper", cls: "in" },
  { text: " {\n    ", cls: "" },
  { text: "private ", cls: "kw" },
  { text: "String ", cls: "cl" },
  { text: "focus ", cls: "vr" },
  { text: "= ", cls: "" },
  { text: '"Spring Boot & Microservices"', cls: "st" },
  { text: ";\n\n    ", cls: "" },
  { text: "public void ", cls: "kw" },
  { text: "buildSystems", cls: "fn" },
  { text: "() {\n        ", cls: "" },
  { text: "System", cls: "cl" },
  { text: ".", cls: "" },
  { text: "out", cls: "vr" },
  { text: ".", cls: "" },
  { text: "println", cls: "fn" },
  { text: "(", cls: "" },
  { text: '"Backend systems built to stay clean."', cls: "st" },
  { text: ");\n        ", cls: "" },
  { text: "System", cls: "cl" },
  { text: ".", cls: "" },
  { text: "out", cls: "vr" },
  { text: ".", cls: "" },
  { text: "println", cls: "fn" },
  { text: "(", cls: "" },
  { text: '"Focusing on security and scale."', cls: "st" },
  { text: ");\n    }\n}", cls: "" }
];

const codeElement = document.getElementById('typewriter-code');

if (codeElement) {
  codeElement.innerHTML = '';
  let tokenIndex = 0;
  let charIndex = 0;
  let currentSpan = null;

  function typeToken() {
    if (tokenIndex >= tokens.length) return;

    const token = tokens[tokenIndex];
    if (charIndex === 0) {
      if (token.cls) {
        currentSpan = document.createElement('span');
        currentSpan.className = token.cls;
        codeElement.appendChild(currentSpan);
      } else {
        currentSpan = null;
      }
    }

    const char = token.text[charIndex];
    if (currentSpan) {
      currentSpan.textContent += char;
    } else {
      codeElement.appendChild(document.createTextNode(char));
    }

    charIndex++;
    if (charIndex >= token.text.length) {
      charIndex = 0;
      tokenIndex++;
    }

    let delay = Math.random() * 20 + 15;
    if (char === '\n') delay += 90;
    setTimeout(typeToken, delay);
  }

  setTimeout(typeToken, 400);
}

// Microservices Nodes Canvas Background
const canvas = document.getElementById('canvas-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(241, 90, 36, 0.4)';
            ctx.fill();
        }
    }

    for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(241, 90, 36, ${0.15 - distance / 1000})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
}

// Copy Email to Clipboard
const copyBtn = document.getElementById('copy-email-btn');
const copyToast = document.getElementById('copy-toast');
if (copyBtn && copyToast) {
    copyBtn.addEventListener('click', () => {
        const email = 'hazemsaed512@gmail.com';
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(() => {
                copyToast.classList.add('show');
                setTimeout(() => copyToast.classList.remove('show'), 2500);
            });
        } else {
            const temp = document.createElement('textarea');
            temp.value = email;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            copyToast.classList.add('show');
            setTimeout(() => copyToast.classList.remove('show'), 2500);
        }
    });
}
