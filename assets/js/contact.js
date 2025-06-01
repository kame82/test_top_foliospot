import { isPC, isSP, onMediaChange } from "./responsive.js";

// ============================
// FAQ animation
// ============================

document.querySelectorAll('.js-accordion').forEach(item => {
    const summary = item.querySelector('.details__summary');
    const content = item.querySelector('.details__content');

    content.style.height = '0';
    content.style.overflow = 'hidden';

    summary.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        const width = window.innerWidth;

        let openHeight;
        if (width <= 767) {
            openHeight = '80px'; // SP
        } else if (width <= 1024) {
            openHeight = '50px'; // タブレット
        } else {
            openHeight = '70px'; // PC
        }

        if (isOpen) {
            item.classList.remove('is-open');
            content.style.height = '0';
        } else {
            item.classList.add('is-open');
            content.style.height = openHeight;
        }
    });
});
