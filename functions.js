export function createButton(text) {
    const btn = document.createElement("button");
    btn.classList.add("button", "fade-in");    
    btn.textContent = text;

    return btn;
  }