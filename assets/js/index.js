import { isPC, isSP, onMediaChange } from "./responsive.js";

// ============================
// nav position:fix時のnav高さ調整
// ============================

if (isPC()) {
  adjustNavHeight();
  window.addEventListener("resize", adjustNavHeight);
}

onMediaChange("(min-width: 768px)", (matches) => {
  if (matches) {
    adjustNavHeight();
    window.removeEventListener("resize", adjustNavHeight); // 重複防止のためadjust eventを削除
    window.addEventListener("resize", adjustNavHeight);
  } else {
    const menuWidth = document.querySelector(".top-fv__nav")?.offsetWidth;
    const root = document.documentElement;
    const fontSize = window.getComputedStyle(root).getPropertyValue("font-size");
    const stFontSize = parseFloat(fontSize);
    window.removeEventListener("resize", adjustNavHeight);
    // sp menu高さをremで算出
    document.querySelector(".top-fv__nav").style.height = `${menuWidth / stFontSize}rem`;
  }
});

function adjustNavHeight() {
  const height = document.querySelector(".top-fv--container")?.offsetHeight;
  const nav = document.querySelector(".top-fv__nav");
  const navItem = document.querySelector(".top-fv__nav--list");
  if (height && nav && navItem) {
    nav.style.height = `${height}px`;
    navItem.style.height = `${height}px`;
  }
}

// ============================
// navigation menu animation
// ============================
const navList = document.querySelector(".top-fv__nav--list");
const spNavLine = document.querySelectorAll(".top-fv__nav--sp-line");

try {
  gsap.set(".top-fv__nav--list li", { opacity: 0, x: "100%" });
} catch (error) {
  console.error("GSAPの初期化中にエラーが発生しました:", error);
}

document.querySelector(".top-fv__nav--icon").addEventListener("click", function (e) {
  e.preventDefault();
  if (isSP()) {
    navList.classList.contains("js_top-nav_active") ? spNavLine.forEach((el) => el.classList.remove("sp-menu_is-active")) : spNavLine.forEach((el) => el.classList.add("sp-menu_is-active"));
  }
  navList.classList.contains("js_top-nav_active") ? closeMenu() : openMenu();
});

if (isPC()) {
  document.querySelector(".top-nav__mask").addEventListener("click", function () {
    closeMenu();
  });
}

function openMenu() {
  gsap.killTweensOf(".top-fv__nav--list li"); //アニメーションの停止初期化
  document.querySelectorAll("body, html").forEach((el) => el.classList.add("no-scroll"));

  navList.classList.add("js_top-nav_active");
  navList.style.display = "flex";
  gsap.to(".top-fv__nav--list li", {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power2.inOut",
    stagger: 0.2,
  });
  gsap.to(".top-nav__mask", {
    opacity: 0.8,
    display: "block",
    duration: 0.6,
    ease: "power2.inOut",
  });
}

function closeMenu() {
  gsap.killTweensOf(".top-fv__nav--list li"); //アニメーションの停止初期化
  document.querySelectorAll("body, html").forEach((el) => el.classList.remove("no-scroll"));

  navList.classList.remove("js_top-nav_active");
  gsap.to(".top-fv__nav--list li", {
    opacity: 0,
    x: "100%",
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: function () {
      navList.style.display = "none";
    },
  });

  gsap.to(".top-nav__mask", {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: function () {
      document.querySelector(".top-nav__mask").style.display = "none";
    },
  });
}

// ============================
// top news animation
// ============================

gsap.to(".top-news__list", {
  x: "-100%",
  duration: 25,
  ease: "linear",
  repeat: -1,
});

// ============================
// main card animation
// ============================
document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for fade-in animation
  const cards = document.querySelectorAll(".gallery-card");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-inview");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  cards.forEach((card) => {
    // Intersection Observer
    observer.observe(card);

    // Hover effect
    card.addEventListener("mouseenter", () => {
      const img = card.querySelector(".gallery-card__image img");
      gsap.to(img, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      const img = card.querySelector(".gallery-card__image img");
      gsap.to(img, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
});
