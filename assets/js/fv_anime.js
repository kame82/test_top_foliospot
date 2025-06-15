import { isPC } from "./mediaQuery.js";

// ============================
// logic of hero animation
// ============================
if (document.querySelector("#index")) {
  const isFirstLoad = sessionStorage.getItem("isFirstLoad");

  window.addEventListener("load", () => {
    document.querySelector(".top-hero").style.display = "block";
    document.querySelectorAll("body, html").forEach((el) => el.classList.add("no-scroll"));
    initAnimation();
    if (!isFirstLoad) {
      delay(500)
        .then(() => animateTypeWriter1())
        .then(() => delay(200))
        .then(() => animateTypeWriter2())
        .then(() => delay(100))
        .then(() => animateTypeWriter3())
        .then(() => delay(1000))
        .then(() => hideTopHero())
        .then(() => delay(1000))
        .then(() => hideTopHeroBgkground())
        .then(() => animateFvPeople())
        .then(() => animateFvTitle())
        .then(() => animateConfetti());
      sessionStorage.setItem("isFirstLoad", true);
    } else {
      hideTopHeroBgkground()
        .then(() => animateFvPeople())
        .then(() => animateFvTitle())
        .then(() => animateConfetti());
    }
  });
}

// === delay function ===
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// === hero animation (typewriter) ===
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

function animateTypeWriter1() {
  return new Promise((resolve) => {
    typing(".top-hero__title1", "クリエイターの").then(resolve);
  });
}

function animateTypeWriter2() {
  return new Promise((resolve) => {
    typing(".top-hero__title2", "ポートフォリオを").then(resolve);
  });
}

function animateTypeWriter3() {
  return new Promise((resolve) => {
    typing(".top-hero__title3", "もっと身近に").then(resolve);
  });
}

// ==== hide top hero ===
function hideTopHero() {
  return new Promise((resolve) => {
    gsap.to(".top-hero__title", {
      opacity: 0,
      duration: 2,
      onComplete: function () {
        resolve();
      },
    });
  });
}

function hideTopHeroBgkground() {
  return new Promise((resolve) => {
    document.querySelectorAll("body, html").forEach((el) => el.classList.remove("no-scroll"));
    document.querySelector(".top-hero").style.pointerEvents = "none";

    gsap.to(".top-hero", {
      opacity: 0,
      duration: 2,
      onComplete: function () {
        document.querySelector(".top-hero").style.display = "none";
        resolve();
      },
    });
  });
}

// === top hero animation (fv section) ===
// init animation
function initAnimation() {
  gsap.set(".top-fv__title", { y: -200, opacity: 0 });
  for (let i = 1; i <= 9; i++) {
    gsap.set(`.top-fv__container-people--${i}`, { opacity: 0 });
  }
}

// people animation
function animateFvPeople() {
  return new Promise((resolve) => {
    const timeline = gsap.timeline({
      onComplete: function () {
        appearAllPeople();
        resolve();
      },
    });
    // create random Array
    const array = isPC() ? [1, 2, 3, 4, 6, 7, 8, 9] : [1, 2, 3, 6];
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    shuffledArray.push(5);

    shuffledArray.forEach((x) => {
      timeline.fromTo(
        `.top-fv__container-people--${x}`,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
        }
      );
    });
  });
}

function appearAllPeople() {
  document.querySelectorAll(".top-fv__container-people--4, .top-fv__container-people--7, .top-fv__container-people--8, .top-fv__container-people--9").forEach((el) => (el.style.opacity = 1));
}
//title animation
function animateFvTitle() {
  return new Promise((resolve) => {
    gsap.fromTo(".top-fv__title", { y: -300, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: "bounce.out", onComplete: resolve });
  });
}

// === 紙吹雪(confetti) ===
function animateConfetti() {
  return new Promise((resolve) => {
    confettiTop();

    // GSAPを使用して繰り返しアニメーションを設定
    gsap.to(
      {},
      {
        duration: 5, //時間間隔
        repeat: -1, // 無限に繰り返す
        onRepeat: () => {
          if (!document.hidden) {
            confettiTop(); // ページがアクティブな場合のみ実行
          }
        },
      }
    );

    resolve();
  });
}

function confettiTop() {
  // === confettiの初期化 ===
  var myCanvas = document.createElement("canvas");
  document.querySelector(".top-fv--container").appendChild(myCanvas);

  var myConfetti = confetti.create(myCanvas, {
    resize: true,
    useWorker: true,
  });
  if (isPC()) {
    // 画面左側
    myConfetti({
      particleCount: 40, //紙量
      spread: 160, // 拡散角度
      origin: { y: 0, x: 0 }, // 発生位置
      startVelocity: 60, // 初速
      ticks: 800, //表示時間
      gravity: 0.5, //落下速度
      scalar: 2, // 紙吹雪の大きさ
      shapes: ["square"],
    });
    setTimeout(() => {
      // 画面右側
      myConfetti({
        particleCount: 40, //紙量
        spread: 160, // 拡散角度
        origin: { y: 0, x: 1 }, // 発生位置
        startVelocity: 60, // 初速
        ticks: 800, //表示時間
        gravity: 0.5, //落下速度
        scalar: 2, // 紙吹雪の大きさ
        shapes: ["square"],
      });
    }, 300);
  } else {
    // スマホ画面 画面中央
    myConfetti({
      particleCount: 30, //紙量
      spread: 160, // 拡散角度
      origin: { y: 0, x: 0.5 }, // 発生位置
      startVelocity: 40, // 初速
      ticks: 800, //表示時間
      gravity: 0.5, //落下速度
      scalar: 2, // 紙吹雪の大きさ
      shapes: ["square"],
    });
  }
}
