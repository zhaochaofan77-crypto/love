(function () {
  const content = window.LELE_CONTENT;
  const state = window.LELE_STATE.createStationState(content.cards.length);
  const welcome = document.querySelector('#welcome');
  const station = document.querySelector('#station');
  const grid = document.querySelector('#card-grid');
  const progress = document.querySelector('#progress');
  const dialog = document.querySelector('#message-dialog');
  const dialogEmoji = document.querySelector('#dialog-emoji');
  const dialogMessage = document.querySelector('#dialog-message');
  const completion = document.querySelector('#completion-card');
  const completionMessage = document.querySelector('#completion-message');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const celebrationLayer = document.querySelector('#celebration-layer');
  const burstParticles = document.querySelector('#burst-particles');
  let celebrationPlayed = false;

  function createBurstParticles(count) {
    const emojis = ['💗', '💖', '✨', '🌸'];

    return Array.from({ length: count }, (_, index) => {
      const angle = (Math.PI * 2 * index) / count;
      const distance = 118 + (index % 4) * 19;

      return {
        emoji: emojis[index % emojis.length],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotate: -100 + (index * 47) % 210,
        delay: (index % 3) * 22
      };
    });
  }

  const burst = createBurstParticles(24);

  function revealCompletion() {
    completion.hidden = false;
    window.setTimeout(() => {
      completion.classList.add('is-visible');
      completion.scrollIntoView({
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
        block: 'center'
      });
    }, reduceMotion.matches ? 0 : 80);
  }

  function runCelebration() {
    if (celebrationPlayed) return;
    celebrationPlayed = true;
    celebrationLayer.hidden = false;

    if (reduceMotion.matches) {
      celebrationLayer.classList.add('is-reduced');
      window.setTimeout(() => {
        celebrationLayer.classList.remove('is-reduced');
        celebrationLayer.hidden = true;
        revealCompletion();
      }, 420);
      return;
    }

    burst.forEach((particle) => {
      const element = document.createElement('span');
      element.className = 'burst-particle';
      element.textContent = particle.emoji;
      element.style.setProperty('--x', `${particle.x}px`);
      element.style.setProperty('--y', `${particle.y}px`);
      element.style.setProperty('--rotate', `${particle.rotate}deg`);
      element.style.setProperty('--delay', `${particle.delay}ms`);
      burstParticles.append(element);
    });

    celebrationLayer.classList.add('is-celebrating');
    grid.classList.add('celebration-flash');

    window.setTimeout(() => {
      celebrationLayer.classList.remove('is-celebrating');
      grid.classList.remove('celebration-flash');
      burstParticles.replaceChildren();
      celebrationLayer.hidden = true;
      revealCompletion();
    }, 1800);
  }

  document.querySelector('#welcome-title').textContent = content.stationTitle;
  document.querySelector('#station-title').textContent = content.stationTitle;
  document.querySelector('#station-eyebrow').textContent = content.stationEyebrow;
  completionMessage.textContent = content.completion;

  content.cards.forEach((card, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'heart-card';
    button.dataset.cardId = card.id;
    button.style.setProperty('--card-index', index);
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML = `
      <span class="card-shine" aria-hidden="true"></span>
      <span class="card-emoji" aria-hidden="true">${card.emoji}</span>
      <span class="card-label">${card.label}</span>
      <span class="card-hint">点亮我</span>
    `;

    button.addEventListener('click', () => {
      state.light(card.id);
      button.classList.add('is-lit');
      button.setAttribute('aria-pressed', 'true');
      button.querySelector('.card-hint').textContent = '已点亮';
      progress.textContent = `已点亮 ${state.count()} / ${content.cards.length}`;
      dialogEmoji.textContent = card.emoji;
      dialogMessage.textContent = card.message;
      dialog.showModal();

    });

    grid.append(button);
  });

  document.querySelector('#enter-button').addEventListener('click', () => {
    welcome.classList.add('is-leaving');
    window.setTimeout(() => {
      welcome.hidden = true;
      station.hidden = false;
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }, 320);
  });

  document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
  document.querySelector('#dialog-continue').addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    const panel = dialog.querySelector('.dialog-panel');
    if (!panel.contains(event.target)) dialog.close();
  });

  dialog.addEventListener('close', () => {
    if (state.complete()) runCelebration();
  });
})();
