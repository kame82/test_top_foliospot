import { isPC } from "./mediaQuery.js";
import { navElements, openMenu, closeMenu, paletteOpen, paletteClose, setPaletteState, parallaxAnimation, animateMemberCards } from "./function.js";
// ============================
// navigation menu animation
// ============================

// GSAP初期化
if (document.querySelector(".nav-menu__list li")) {
  try {
    gsap.set(".nav-menu__list li", { opacity: 0, x: "100%" });
  } catch (error) {
    console.error("GSAPの初期化中にエラーが発生しました:", error);
  }

  if (navElements.icon) {
    navElements.icon.addEventListener("click", function (e) {
      e.preventDefault();

      if (isPC()) {
        const rect = navElements.icon.getBoundingClientRect();
        if (rect.top !== 0) {
          const scrollTop = document.querySelector(".top-fv__nav") ? 0 : 400;
          window.scroll({ top: scrollTop, behavior: "smooth" });
        }
      }

      navElements.list.classList.contains("js_nav-menu_active") ? closeMenu() : openMenu();
    });
  }

  if (isPC() && navElements.mask) {
    navElements.mask.addEventListener("click", closeMenu);
  }
}
// ============================
// search palette of navigation
// ============================

const searchPaletteElements = {
  trigger: document.querySelector(".nav-menu__list--search"),
  mask: document.querySelector(".nav-palette__mask"),
  closeBtn: document.querySelector(".nav-palette__close-btn"),
};

if (searchPaletteElements.trigger) {
  // パレット開く
  searchPaletteElements.trigger.addEventListener("click", (e) => {
    e.preventDefault();
    paletteOpen();
  });

  // パレット閉じる（マスククリック）
  searchPaletteElements.mask?.addEventListener("click", paletteClose);

  // パレット閉じる（閉じるボタン）
  searchPaletteElements.closeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    paletteClose();
  });

  // get color palette URL parameter
  setPaletteState("type[]", (type) => `.palette__type--list-${type}`);
  setPaletteState("style[]", (style) => `.palette__style--list-${style}`);
  setPaletteState("color[]", (color) => `.palette-${color}`);
}

// ============================
// top news animation
// ============================
if (document.querySelector(".top-news__list")) {
  gsap.to(".top-news__list", {
    x: "-100%",
    duration: 25,
    ease: "linear",
    repeat: -1,
  });
}

// ============================
// main card animation
// ============================
if (document.querySelectorAll(".js-card-animation")) {
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".js-card-animation");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: index * 0.2,
              ease: "power2.out",
            });
            obs.unobserve(card);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    cards.forEach((card) => {
      // 初期状態の設定
      gsap.set(card, {
        opacity: 0,
        y: 40,
      });

      // Intersection Observer
      observer.observe(card);
    });
  });
}

// ============================
// about section animation
// ============================
if (document.querySelector("#about")) {
  parallaxAnimation();
  animateMemberCards();
}

// ============================
// FAQ animation
// ============================

if (document.querySelector("#contact")) {
  document.querySelectorAll(".js-accordion").forEach((item) => {
    const summary = item.querySelector(".details__summary");
    const content = item.querySelector(".details__content");

    content.style.height = "0";
    content.style.overflow = "hidden";

    summary.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      const width = window.innerWidth;
      const isType2 = content.classList.contains("type-2");

      let openHeight;
      if (isType2) {
        if (width <= 550) {
          openHeight = "7.25rem"; // type-2 かつ 550以下
        } else {
          openHeight = "5rem"; // type-2 かつ それ以外
        }
      } else if (width <= 767) {
        openHeight = "4.375rem"; // 通常SP
      } else if (width <= 1024) {
        openHeight = "3.125rem"; // 通常タブレット
      } else {
        openHeight = "5rem"; // 通常PC
      }

      if (isOpen) {
        item.classList.remove("is-open");
        content.style.height = "0";
      } else {
        item.classList.add("is-open");
        content.style.height = openHeight;
      }
    });
  });
}
