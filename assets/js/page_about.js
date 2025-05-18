import { isPC, isSP, onMediaChange } from "./responsive.js";

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".concept-wrapper",
    start: "-10% top",
  },
});

tl.fromTo(
  document.querySelector(".concept__main"),
  {
    x: 200,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    ease: "power2.out",
    duration: 1.5,
    onStart: () => {
      animateTypeWriter();
    },
  }
).fromTo(
  ".concept__main--sub",
  {
    y: 100,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    ease: "power2.out",
    duration: 1,
    stagger: 0.4,
  }
);

function animateTypeWriter() {
  const typing = (selector, text) => {
    return new Promise((resolve) => {
      text.split("").forEach((char, index) => {
        setTimeout(() => {
          document.querySelector(selector).textContent += char;
          if (index === text.length - 1) {
            resolve();
          }
        }, 50 * index);
      });
    });
  };

  typing(".concept__main--title", "クリエイターのポートフォリオをもっと身近に");
}

gsap.utils.toArray(".member__card").forEach((card, i) => {
  gsap.fromTo(
    card,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "bottom center",
      },
    }
  );
});
