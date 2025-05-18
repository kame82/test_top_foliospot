import { isPC, isSP, onMediaChange } from "./responsive.js";

// ============================
// FAQ animation
// ============================

document.addEventListener('DOMContentLoaded', () => {
    const details = document.querySelectorAll('.details');

    details.forEach(element => {
        const summary = element.querySelector('.details__summary');
        const content = element.querySelector('.details__content');

        summary.addEventListener('click', e => {
            e.preventDefault();
            if (element.open) {
                // 閉じるアニメーション（速くする: 0.2s など）
                content.style.height = content.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    content.style.transition = 'height 0.2s cubic-bezier(0.4,0,0.2,1)';
                    content.style.height = '0px';
                });
                content.addEventListener('transitionend', function handler() {
                    element.removeAttribute('open');
                    content.style.transition = '';
                    content.style.height = '';
                    content.removeEventListener('transitionend', handler);
                });
            } else {
                // 開くアニメーション（従来通り: 0.36s）
                element.setAttribute('open', 'true');
                content.style.height = '0px';
                requestAnimationFrame(() => {
                    content.style.transition = 'height 0.36s cubic-bezier(0.4,0,0.2,1)';
                    content.style.height = content.scrollHeight + 'px';
                });
                content.addEventListener('transitionend', function handler() {
                    content.style.transition = '';
                    content.style.height = '';
                    content.removeEventListener('transitionend', handler);
                });
            }
        });
    });
});