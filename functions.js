export function createButton(text) {
    const btn = document.createElement("button");
    btn.classList.add("button", "fade-in");    
    btn.textContent = text;

    return btn;
  }

export function progressBar(percent) {
  const bar = document.querySelector(".bar");
  bar.style.width = `${percent}%`;
  bar.style.animation = `loadingBar ${percent / 10}s ease-in-out`;

  if(percent === 100) {
    const confettiWrapper = document.querySelector('.confetti-wrapper');
    // Generate confetti
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti-piece');
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.setProperty('--fall-duration', `${Math.random() * 2 + 3}s`);
      confetti.style.setProperty('--confetti-color', getRandomColor());
      confettiWrapper.appendChild(confetti);

      // Remove confetti after it finishes falling
      const duration = parseFloat(confetti.style.getPropertyValue('--fall-duration')) * 2000;
      setTimeout(() => confetti.remove(), duration);
    }
    function getRandomColor() {
      const colors = ['#ff6347', '#ffa500', '#32cd32', '#1e90ff', '#ff69b4'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }
}