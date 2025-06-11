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
        const isType2 = content.classList.contains('type-2');

        let openHeight;
        if (isType2) {
            if (width <= 550) {
                openHeight = '7.25rem'; // type-2 かつ 550以下
            } else {
                openHeight = '5rem'; // type-2 かつ それ以外
            }
        } else if (width <= 767) {
            openHeight = '4.375rem'; // 通常SP
        } else if (width <= 1024) {
            openHeight = '3.125rem'; // 通常タブレット
        } else {
            openHeight = '5rem'; // 通常PC
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
