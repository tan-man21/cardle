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
}