const slides = [...document.querySelectorAll(".slide")];
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const counter = document.getElementById("counter");
const dotsWrap = document.querySelector(".dots");
const startBtn = document.getElementById("startBtn");

let index = 0;
let locked = false;

slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className = "dot";
  dot.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(dot);
});

const dots = [...document.querySelectorAll(".dot")];

function update() {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  counter.textContent =
    `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
}

function goTo(i) {
  index = Math.max(0, Math.min(slides.length - 1, i));
  update();
}

function goNext() {
  goTo(index + 1);
}

function goPrev() {
  goTo(index - 1);
}

next.addEventListener("click", goNext);
prev.addEventListener("click", goPrev);
startBtn.addEventListener("click", goNext);

document.addEventListener("keydown", (e) => {
  if (["ArrowRight", "Space", "Enter"].includes(e.code)) {
    e.preventDefault();
    goNext();
  }

  if (["ArrowLeft", "Backspace"].includes(e.code)) {
    e.preventDefault();
    goPrev();
  }
});

document.addEventListener("wheel", (e) => {
  if (locked) return;

  locked = true;

  if (e.deltaY > 0) {
    goNext();
  } else {
    goPrev();
  }

  setTimeout(() => {
    locked = false;
  }, 650);
}, { passive: true });

update();