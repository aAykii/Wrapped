/* ════════════════════════════════════════════
   💕 NOSSA RETROSPECTIVA — SCRIPT PRINCIPAL
   Organizado em módulos comentados
════════════════════════════════════════════ */

/* ── Aguarda DOM pronto ───────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

/* ════════════════════════════════════════════
   APP — Controlador central
════════════════════════════════════════════ */
const App = {
  currentSlide: -1,      // -1 = splash, 0..7 = slides
  totalSlides: 8,
  isAnimating: false,

  init() {
    Particles.init('particles-canvas');
    Splash.init();
  },

  // Inicia a apresentação após clique no splash
  start() {
    Splash.hide();
    Music.start();
    SlidesWrapper.show();
    Nav.build();
    App.goTo(0);
  },

  goTo(index) {
    if (App.isAnimating) return;
    if (index < 0 || index >= App.totalSlides) return;
    App.isAnimating = true;

    const prev = App.currentSlide;
    App.currentSlide = index;

    // Remove active do slide anterior
    if (prev >= 0) {
      const prevEl = document.querySelector(`.slide[data-index="${prev}"]`);
      if (prevEl) {
        prevEl.classList.add('leaving');
        setTimeout(() => {
          prevEl.classList.remove('is-active', 'leaving');
        }, 600);
      }
    }

    // Ativa novo slide
    const nextEl = document.querySelector(`.slide[data-index="${index}"]`);
    if (nextEl) {
      nextEl.classList.add('is-active');
      nextEl.scrollTop = 0;
    }

    Nav.update(index);

    // Carrega conteúdo do slide
    setTimeout(() => {
      SlideContent.load(index);
      App.isAnimating = false;
    }, 300);
  },

  next() {
    App.goTo(App.currentSlide + 1);
  },
};

/* ════════════════════════════════════════════
   SPLASH
════════════════════════════════════════════ */
const Splash = {
  init() {
    document.getElementById('start-btn').addEventListener('click', () => {
      App.start();
    });
  },
  hide() {
    const el = document.getElementById('splash');
    el.style.pointerEvents = 'none';
    el.style.opacity = '0';
    el.style.transform = 'scale(1.05)';
    el.style.transition = 'opacity .8s ease, transform .8s ease';
    setTimeout(() => {
      el.classList.remove('active');
      el.classList.add('hidden');
      el.removeAttribute('style');
    }, 800);
  },
};

/* ════════════════════════════════════════════
   PARTICLES — Canvas de partículas
════════════════════════════════════════════ */
const Particles = {
  instances: [],

  init(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    this.create(canvas);
  },

  create(canvas) {
    const ctx = canvas.getContext('2d');
    const pts = [];
    const N = 60;

    const resize = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + .4,
        vx: (Math.random() - .5) * .3,
        vy: (Math.random() - .5) * .3,
        alpha: Math.random() * .6 + .2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,160,180,${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    draw();
  },
};

/* ════════════════════════════════════════════
   MUSIC — Player de áudio
════════════════════════════════════════════ */
const Music = {
  audio: null,
  playing: false,

  start() {
    this.audio = document.getElementById('bg-audio');
    const src = CONFIG.music && CONFIG.music.file;

    if (!src) return; // sem arquivo, não inicia

    this.audio.src = src;
    this.audio.volume = .7;

    const playerEl = document.getElementById('music-player');
    playerEl.classList.remove('hidden');

    this.audio.play().then(() => {
      this.playing = true;
    }).catch(() => {
      // Autoplay bloqueado — usuário já clicou, mas alguns browsers ainda bloqueiam
      console.warn('Autoplay bloqueado pelo navegador.');
    });

    // Toggle play/pause
    document.getElementById('music-toggle').addEventListener('click', () => {
      if (this.playing) {
        this.audio.pause();
        this.playing = false;
        document.getElementById('music-icon').textContent = '▶';
      } else {
        this.audio.play();
        this.playing = true;
        document.getElementById('music-icon').textContent = '⏸';
      }
    });

    // Volume
    document.getElementById('volume-slider').addEventListener('input', e => {
      this.audio.volume = e.target.value;
    });
  },
};

/* ════════════════════════════════════════════
   SLIDES WRAPPER
════════════════════════════════════════════ */
const SlidesWrapper = {
  show() {
    const el = document.getElementById('slides-wrapper');
    el.classList.remove('hidden');

    // Botões "Próximo" e "Recomeçar"
    document.querySelectorAll('.btn-next').forEach(btn => {
      btn.addEventListener('click', () => App.next());
    });

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        App.goTo(0);
      });
    }

    // Navegacao por swipe desativada para permitir leitura/rolagem livre nos slides longos.
  },

  initSwipe() {
    let startY = 0, startX = 0;
    const wrapper = document.getElementById('slides-wrapper');

    wrapper.addEventListener('touchstart', e => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchend', e => {
      const dy = e.changedTouches[0].clientY - startY;
      const dx = e.changedTouches[0].clientX - startX;
      // Só navega se swipe > 60px e predominantemente vertical
      if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx)) {
        if (dy < 0) App.next();           // swipe up = próximo
        else App.goTo(App.currentSlide - 1); // swipe down = anterior
      }
    }, { passive: true });
  },
};

/* ════════════════════════════════════════════
   NAV — Bolinhas de navegação
════════════════════════════════════════════ */
const Nav = {
  build() {
    const nav = document.getElementById('slide-nav');
    nav.classList.remove('hidden');
    nav.innerHTML = '';

    const labels = ['Intro', 'Jornada', 'Momentos', 'Stats', 'Amor', 'Timeline', 'Carta', 'Fim'];
    for (let i = 0; i < App.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'nav-dot';
      dot.title = labels[i] || `Slide ${i + 1}`;
      dot.addEventListener('click', () => App.goTo(i));
      nav.appendChild(dot);
    }
  },

  update(index) {
    document.querySelectorAll('.nav-dot').forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
  },
};

/* ════════════════════════════════════════════
   SLIDE CONTENT — Carrega dados em cada slide
════════════════════════════════════════════ */
const SlideContent = {
  loaded: new Set(),

  load(index) {
    if (this.loaded.has(index)) {
      // Re-anima elementos se necessário
      this.animate(index);
      return;
    }
    this.loaded.add(index);

    switch (index) {
      case 0: this.loadIntro(); break;
      case 1: this.loadJourney(); break;
      case 2: this.loadMoments(); break;
      case 3: this.loadStats(); break;
      case 4: this.loadLoves(); break;
      case 5: this.loadTimeline(); break;
      case 6: this.loadLetter(); break;
      case 7: this.loadEnding(); break;
    }

    this.animate(index);
  },

  animate(index) {
    // Anima cards com stagger
    const slide = document.querySelector(`.slide[data-index="${index}"]`);
    if (!slide) return;

    const cards = slide.querySelectorAll('.stat-card, .love-card, .tl-item');
    cards.forEach((c, i) => {
      c.classList.remove('revealed');
      setTimeout(() => c.classList.add('revealed'), 150 + i * 120);
    });
  },

  /* ── Helpers ───────────────────────────── */
  parseLocalDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  },

  daysSince(dateStr) {
    const d = this.parseLocalDate(dateStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor((today - d) / 86400000);
  },

  fmtDate(dateStr) {
    const d = this.parseLocalDate(dateStr);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  },

  /* ── Slide 0: Intro ─────────────────────── */
  loadIntro() {
    // Nada extra; conteúdo estático no HTML
  },

  /* ── Slide 1: Jornada ───────────────────── */
  loadJourney() {
    const img = document.getElementById('journey-photo');
    const days = document.getElementById('days-counter');
    const met = document.getElementById('met-date-display');
    const msg = document.getElementById('journey-message');

    if (CONFIG.journey.photo) img.src = CONFIG.journey.photo;
    msg.textContent = CONFIG.journey.message;
    met.textContent = this.fmtDate(CONFIG.dates.togetherDate);

    // Anima contador de dias
    const target = this.daysSince(CONFIG.dates.togetherDate);
    Counter.animate(days, 0, target, 1800);
  },

  /* ── Slide 2: Momentos ──────────────────── */
  loadMoments() {
    const carousel = document.getElementById('carousel');
    const dotsEl = document.getElementById('carousel-dots');
    const caption = document.getElementById('carousel-caption');
    const moments = CONFIG.moments;

    if (!carousel || !dotsEl || !caption || !moments.length) return;

    const track = document.createElement('div');
    track.className = 'carousel-track';

    // Estado do carrossel
    const state = {
      current: 0,
      goTo: function (i) {
        this.current = (i + moments.length) % moments.length;
        track.style.transform = `translateX(-${this.current * 100}%)`;
        dotsEl.querySelectorAll('.cdot').forEach((d, di) =>
          d.classList.toggle('active', di === this.current));
        caption.textContent = moments[this.current]?.caption || '';
      }
    };

    // Cria itens
    carousel.innerHTML = '';
    dotsEl.innerHTML = '';
    moments.forEach((m, i) => {
      const item = document.createElement('div');
      item.className = 'carousel-item';
      const img = document.createElement('img');
      img.src = m.photo;
      img.alt = m.caption;
      img.loading = 'lazy';
      item.appendChild(img);
      track.appendChild(item);

      const dot = document.createElement('button');
      dot.className = i === 0 ? 'cdot active' : 'cdot';
      dot.addEventListener('click', () => state.goTo(i));
      dotsEl.appendChild(dot);
    });
    carousel.appendChild(track);

    caption.textContent = moments[0]?.caption || '';

    // Remove listeners antigos dos botões
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
      const newPrevBtn = prevBtn.cloneNode(true);
      prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
      newPrevBtn.addEventListener('click', () => state.goTo(state.current - 1));
    }

    if (nextBtn) {
      const newNextBtn = nextBtn.cloneNode(true);
      nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
      newNextBtn.addEventListener('click', () => state.goTo(state.current + 1));
    }

    // Auto-play suave
    if (!this._carouselTimer) {
      this._carouselTimer = setInterval(() => {
        if (App.currentSlide === 2) state.goTo(state.current + 1);
      }, 4000);
    }
  },

  /* ── Slide 3: Estatísticas ──────────────── */
  loadStats() {
    const days = this.daysSince(CONFIG.dates.togetherDate);
    const stats = CONFIG.stats;
    const funFacts = CONFIG.stats.funFacts;

    // Anima contadores
    setTimeout(() => Counter.render(document.getElementById('stat-days'), days, 2000), 200);
    setTimeout(() => Counter.render(document.getElementById('stat-photos'), stats.photos, 2200), 400);
    setTimeout(() => Counter.render(document.getElementById('stat-calls'), stats.calls, 2000), 600);
    setTimeout(() => Counter.render(document.getElementById('stat-specials'), stats.specials, 1800), 800);

    // Fun fact aleatório
    const ff = funFacts[Math.floor(Math.random() * funFacts.length)];
    document.getElementById('fun-fact').textContent = ff;
  },

  /* ── Slide 4: Coisas que eu amo ─────────── */
  loadLoves() {
    const grid = document.getElementById('loves-grid');
    grid.innerHTML = '';
    CONFIG.loves.forEach(l => {
      const card = document.createElement('div');
      card.className = 'love-card';
      card.innerHTML = `
        <div class="love-emoji">${l.emoji}</div>
        <div class="love-title">${l.title}</div>
        <div class="love-desc">${l.desc}</div>
      `;
      grid.appendChild(card);
    });
  },

  /* ── Slide 5: Timeline ──────────────────── */
  loadTimeline() {
    const tl = document.getElementById('timeline');
    tl.innerHTML = '';
    CONFIG.timeline.forEach(t => {
      const item = document.createElement('div');
      item.className = 'tl-item';
      item.innerHTML = `
        <div class="tl-dot">${t.emoji}</div>
        <div class="tl-card">
          ${t.photo ? `<img class="tl-img" src="${t.photo}" alt="${t.title}" loading="lazy" />` : ''}
          <div class="tl-body">
            <div class="tl-date">${t.date}</div>
            <div class="tl-title">${t.title}</div>
            <div class="tl-desc">${t.desc}</div>
          </div>
        </div>
      `;
      tl.appendChild(item);
    });
  },

  /* ── Slide 6: Carta ─────────────────────── */
  loadLetter() {
    const greetingEl = document.getElementById('letter-greeting');
    const bodyEl = document.getElementById('letter-body');
    const signEl = document.getElementById('letter-sign');

    greetingEl.textContent = CONFIG.letter.greeting;
    signEl.textContent = '';

    // Efeito de digitação no corpo
    Typewriter.run(bodyEl, CONFIG.letter.body, 22, () => {
      // Depois do corpo, aparece a assinatura
      setTimeout(() => {
        Typewriter.run(signEl, CONFIG.letter.signature, 35);
      }, 400);
    });
  },

  /* ── Slide 7: Encerramento ──────────────── */
  loadEnding() {
    document.getElementById('ending-message').textContent = CONFIG.ending.message;
    document.getElementById('ending-sub').textContent = CONFIG.ending.sub;
    Hearts.start();
  },
};

/* ════════════════════════════════════════════
   COUNTER — Anima números de 0 até target
════════════════════════════════════════════ */
const Counter = {
  render(el, value, duration) {
    if (!el) return;
    el.classList.remove('is-text');
    if (typeof value === 'number' && Number.isFinite(value)) {
      this.animate(el, 0, value, duration);
      return;
    }
    el.classList.add('is-text');
    el.textContent = value || '0';
  },

  animate(el, from, to, duration) {
    if (!el) return;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out-cubic
      el.textContent = Math.round(from + (to - from) * ease).toLocaleString('pt-BR');
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },
};

/* ════════════════════════════════════════════
   TYPEWRITER — Efeito de digitação
════════════════════════════════════════════ */
const Typewriter = {
  run(el, text, speed = 25, onDone = null) {
    el.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    el.appendChild(cursor);

    let i = 0;
    const type = () => {
      if (i < text.length) {
        cursor.before(text[i]);
        i++;
        setTimeout(type, speed);
      } else {
        cursor.remove();
        if (onDone) onDone();
      }
    };
    setTimeout(type, 300);
  },
};

/* ════════════════════════════════════════════
   HEARTS — Corações flutuantes no encerramento
════════════════════════════════════════════ */
const Hearts = {
  _timer: null,
  emojis: ['❤️', '💕', '💖', '💗', '💝', '🌸', '✨'],

  start() {
    if (this._timer) return;
    const container = document.getElementById('floating-hearts');
    if (!container) return;

    const spawn = () => {
      const h = document.createElement('div');
      h.className = 'fheart';
      h.textContent = this.emojis[Math.floor(Math.random() * this.emojis.length)];
      h.style.left = Math.random() * 100 + '%';
      h.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
      const dur = 4 + Math.random() * 4;
      h.style.animationDuration = dur + 's';
      h.style.animationDelay = Math.random() * 1 + 's';
      container.appendChild(h);
      setTimeout(() => h.remove(), (dur + 1.5) * 1000);
    };

    spawn();
    this._timer = setInterval(spawn, 600);
  },

  stop() {
    if (this._timer) { clearInterval(this._timer); this._timer = null; }
  },
};
