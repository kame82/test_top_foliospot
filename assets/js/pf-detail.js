import { isPC, isSP, onMediaChange } from "./responsive.js";

// ============================
// card animation
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".pf-card");
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
        const img = card.querySelector(".pf-card__image img");
        gsap.to(img, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        });
    });

    card.addEventListener("mouseleave", () => {
        const img = card.querySelector(".pf-card__image img");
        gsap.to(img, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        });
    });
    });
});