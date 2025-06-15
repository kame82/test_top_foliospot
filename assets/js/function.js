export { navElements, openMenu, closeMenu, paletteOpen, paletteClose, setPaletteState, parallaxAnimation, animateMemberCards };
// ============================
// navigation menu animation
// ============================

const navElements = {
  icon: document.querySelector(".nav-menu__icon"),
  list: document.querySelector(".nav-menu__list"),
  mask: document.querySelector(".nav-menu__mask"),
  wrapper: document.querySelector(".nav-menu-wrapper"),
  logo: document.querySelector("#js_nav-icon__logo"),
  cross: document.querySelector("#js_nav-icon__cross"),
};

function openMenu() {
  gsap.killTweensOf(".nav-menu__list li");

  // スクロール禁止とロゴ切り替え
  document.body.classList.add("no-scroll");
  navElements.logo?.classList.add("js_nav-menu_inactive");
  navElements.cross?.classList.remove("js_nav-menu_inactive");
  navElements.cross?.classList.add("js_nav-menu_active");
  navElements.wrapper?.classList.add("nav-menu-active");

  // メニュー表示
  navElements.list.classList.add("js_nav-menu_active");
  navElements.list.style.display = "flex";

  // アニメーション
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

async function closeMenu() {
  return new Promise((resolve) => {
    gsap.killTweensOf(".nav-menu__list li");

    // スクロール復活とメニュー非表示
    document.body.classList.remove("no-scroll");
    navElements.list.classList.remove("js_nav-menu_active");

    // アニメーション
    gsap.to(".nav-menu__list li", {
      opacity: 0,
      x: "100%",
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => (navElements.list.style.display = "none"),
    });
    gsap.to(".nav-menu__mask", {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        if (navElements.mask) navElements.mask.style.display = "none";
        resolve();
      },
    });
  }).then(() => {
    // ロゴ切り替え
    navElements.logo?.classList.remove("js_nav-menu_inactive");
    navElements.cross?.classList.remove("js_nav-menu_active");
    navElements.cross?.classList.add("js_nav-menu_inactive");
    navElements.wrapper?.classList.remove("nav-menu-active");
  });
}

// ============================
// search palette of navigation
// ============================

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

// ============================
// search palette of navigation close
// ============================
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

function setPaletteState(param, selectorFn) {
  const urlParams = new URLSearchParams(window.location.search);
  const values = urlParams.getAll(param) || [];

  values.forEach((value) => {
    try {
      document.querySelectorAll(selectorFn(value)).forEach((el) => {
        el.checked = true;
      });
    } catch (error) {
      console.error(`${param} 初期化エラー:`, error);
    }
  });
}

// ============================
// about section animation
// ============================
function parallaxAnimation() {
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
}

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

function animateMemberCards() {
  gsap.utils.toArray(".member__card").forEach((card) => {
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
}
