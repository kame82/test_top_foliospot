import { isPC, isSP, onMediaChange } from "./responsive.js";

// ============================
// navigation menu animation
// ============================
const navIcon = document.querySelector(".nav-menu__icon");
const navList = document.querySelector(".nav-menu__list");

try {
  gsap.set(".nav-menu__list li", { opacity: 0, x: "100%" });
} catch (error) {
  console.error("GSAPの初期化中にエラーが発生しました:", error);
}

navIcon.addEventListener("click", function (e) {
  e.preventDefault();

  if (isPC() && document.querySelector(".top-fv__nav") == null) {
    const rect = navIcon.getBoundingClientRect(); // nav-iconの現在の位置を取得

    // 条件付き：Menuクリック時に上部へスクロール
    if (rect.top !== 0) {
      window.scroll({
        top: 400,
        behavior: "smooth",
      });
    }
  } else if (isPC() && document.querySelector(".top-fv__nav") !== null) {
    const rect = navIcon.getBoundingClientRect(); // nav-iconの現在の位置を取得
    if (rect.top !== 0) {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  navList.classList.contains("js_nav-menu_active") ? closeMenu() : openMenu();
});

if (isPC()) {
  document.querySelector(".nav-menu__mask").addEventListener("click", function () {
    closeMenu();
  });
}

function openMenu() {
  gsap.killTweensOf(".nav-menu__list li"); //アニメーションの停止初期化
  document.querySelectorAll("body").forEach((el) => el.classList.add("no-scroll"));
  //ロゴ切り替え
  document.querySelector("#js_nav-icon__logo").classList.add("js_nav-menu_inactive");
  document.querySelector("#js_nav-icon__cross").classList.remove("js_nav-menu_inactive");
  document.querySelector("#js_nav-icon__cross").classList.add("js_nav-menu_active");

  document.querySelector(".nav-menu-wrapper").classList.add("nav-menu-active");

  navList.classList.add("js_nav-menu_active");
  navList.style.display = "flex";
  gsap.to(".nav-menu__list li", {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power2.inOut",
    stagger: 0.2,
  });
  gsap.to(".nav-menu__mask", {
    opacity: 0.8,
    display: "block",
    duration: 0.6,
    ease: "power2.inOut",
  });
}

function closeMenu() {
  gsap.killTweensOf(".nav-menu__list li"); //アニメーションの停止初期化
  document.querySelectorAll("body").forEach((el) => el.classList.remove("no-scroll"));
  //ロゴ切り替え
  document.querySelector("#js_nav-icon__logo").classList.remove("js_nav-menu_inactive");
  document.querySelector("#js_nav-icon__cross").classList.remove("js_nav-menu_active");
  document.querySelector("#js_nav-icon__cross").classList.add("js_nav-menu_inactive");

  document.querySelector(".nav-menu-wrapper").classList.remove("nav-menu-active");

  navList.classList.remove("js_nav-menu_active");
  gsap.to(".nav-menu__list li", {
    opacity: 0,
    x: "100%",
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: function () {
      navList.style.display = "none";
    },
  });

  gsap.to(".nav-menu__mask", {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: function () {
      document.querySelector(".nav-menu__mask").style.display = "none";
    },
  });
}

// ============================
// search palette of navigation
// ============================

const navSearch = document.querySelector(".nav-menu__list--search");
if (navSearch !== null) {
  navSearch.addEventListener("click", function (e) {
    e.preventDefault();
    paletteOpen();
  });

  document.querySelector(".nav-palette__mask").addEventListener("click", function () {
    paletteClose();
  });

  document.querySelector(".nav-palette__close-btn").addEventListener("click", function (e) {
    e.preventDefault();
    paletteClose();
  });
}

function paletteOpen() {
  const searchPalette = document.querySelector(".nav-palette");
  searchPalette.classList.add("is-active");
  closeMenu();
  document.querySelectorAll("body").forEach((el) => el.classList.add("no-scroll"));
  gsap.to(".nav-palette__mask", {
    opacity: 0.8,
    display: "block",
    duration: 0.6,
    ease: "power2.inOut",
  });
}

function paletteClose() {
  const searchPalette = document.querySelector(".nav-palette");

  document.querySelectorAll("body").forEach((el) => el.classList.remove("no-scroll"));
  searchPalette.classList.remove("is-active");

  gsap.to(".nav-palette__mask", {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: function () {
      document.querySelector(".nav-palette__mask").style.display = "none";
    },
  });
}

// ============================
// top news animation
// ============================
if (document.querySelector(".top-news__list") !== null) {
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
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".gallery-card");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${index * 200}ms`; // 0.2秒ずつ遅らせる
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

// ============================
// get color palette URL parameter
// ============================

const urlParams = new URLSearchParams(window.location.search);
const selectedTypes = urlParams.getAll("type[]") || [];
const selectedStyles = urlParams.getAll("style[]") || [];
const selectedColors = urlParams.getAll("color[]") || [];

if (selectedTypes.length > 0) {
  try {
    selectedTypes.forEach((type) => {
      const typeElements = document.querySelectorAll(`.palette__type--list-${type}`);
      typeElements.forEach((el) => {
        el.checked = true;
      });
    });
  } catch (error) {
    console.error("Typeのチェックボックスの初期化中にエラーが発生しました:", error);
  }
}

if (selectedStyles.length > 0) {
  try {
    selectedStyles.forEach((style) => {
      const styleElements = document.querySelectorAll(`.palette__style--list-${style}`);
      styleElements.forEach((el) => {
        el.checked = true;
      });
    });
  } catch (error) {
    console.error("Styleのチェックボックスの初期化中にエラーが発生しました:", error);
  }
}

if (selectedColors.length > 0) {
  try {
    selectedColors.forEach((color) => {
      const colorElements = document.querySelectorAll(`.palette-${color}`);
      colorElements.forEach((el) => {
        el.checked = true;
      });
    });
  } catch (error) {
    console.error("Colorのチェックボックスの初期化中にエラーが発生しました:", error);
  }
}
