import { isPC, isSP, onMediaChange } from "./responsive.js";

// ============================
// card animation
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".pf-gallery__card");
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
            ease: "power2.out"
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
        y: 40
    });

    // Intersection Observer
    observer.observe(card);

    // Hover effect
    card.addEventListener("mouseenter", () => {
        const img = card.querySelector(".pf-gallery__img");
        gsap.to(img, {
        scale: 1.02,
        duration: 0.1,
        ease: "power2.out"
        });
    });

    card.addEventListener("mouseleave", () => {
        const img = card.querySelector(".pf-gallery__img");
        gsap.to(img, {
        scale: 1,
        duration: 0.1,
        ease: "power2.out"
        });
    });
    });
});
