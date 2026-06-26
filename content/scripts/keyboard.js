import {geometry, layout, plNames, symbolNames, unicodeNames} from './keyboard-data.js';

function formatHex(num) {
    return num.toString(16).toUpperCase().padStart(4, '0');
}

document.addEventListener('DOMContentLoaded', () => {
    const keyDescBL = document.getElementById('key-desc-bl');
    const keyDescTL = document.getElementById('key-desc-tl');
    const keyDescBR = document.getElementById('key-desc-br');
    const keyDescTR = document.getElementById('key-desc-tr');
    const keyDescElement = document.getElementById('key-desc');
    const keyboardElement = document.getElementById('keyboard');

    const placeholder = document.createElement('div');
    placeholder.id = 'key-desc-placeholder';
    placeholder.textContent = 'Najedź kursorem na klawisz, aby zobaczyć szczegóły.';
    keyDescElement.appendChild(placeholder);
    geometry.forEach((row) => {
        const rowElement = keyboardElement.appendChild(document.createElement('div'));
        rowElement.classList.add('kb-row');
        Object.keys(row).forEach((key) => {
            const keyElement = rowElement.appendChild(document.createElement('div'));
            keyElement.classList.add('kb-key');
            if (row[key].width) {
                keyElement.style.width = `${row[key].width * 52}px`;
            }
            if (row[key].name) {
                keyElement.classList.add('special');
                keyElement.textContent = row[key].name;
            } else {
                const keys = layout[key];

                const keyBLElement = keyElement.appendChild(document.createElement('span'));
                keyBLElement.classList.add('bl');
                keyBLElement.textContent = String.fromCharCode(keys[0]);

                const keyTLElement = keyElement.appendChild(document.createElement('span'));
                keyTLElement.classList.add('tl');
                keyTLElement.textContent = String.fromCharCode(keys[1]);

                const keyBRElement = keyElement.appendChild(document.createElement('span'));
                keyBRElement.classList.add('br');
                keyBRElement.textContent = String.fromCharCode(keys[2]);

                const keyTRElement = keyElement.appendChild(document.createElement('span'));
                keyTRElement.classList.add('tr');
                keyTRElement.textContent = String.fromCharCode(keys[3]);

                keyElement.addEventListener('mouseover', () => {
                    placeholder.classList.add('hidden');
                    keyDescBL.querySelector('.key-desc-char').textContent = String.fromCharCode(keys[0]);
					keyDescBL.querySelector('.key-desc-name').textContent = plNames[key]?.[0] ?? '';
                    keyDescBL.querySelector('.key-desc-details').textContent = unicodeNames[keys[0]] ? formatHex(keys[0]) + ' ' + unicodeNames[keys[0]] : symbolNames[key][0];

                    keyDescTL.querySelector('.key-desc-char').textContent = String.fromCharCode(keys[1]);
					keyDescTL.querySelector('.key-desc-name').textContent = plNames[key]?.[1] ?? '';
                    keyDescTL.querySelector('.key-desc-details').textContent = unicodeNames[keys[1]] ? formatHex(keys[1]) + ' ' + unicodeNames[keys[1]] : symbolNames[key][1];

                    keyDescBR.querySelector('.key-desc-char').textContent = String.fromCharCode(keys[2]);
					keyDescBR.querySelector('.key-desc-name').textContent = plNames[key]?.[2] ?? '';
                    keyDescBR.querySelector('.key-desc-details').textContent = unicodeNames[keys[2]] ? formatHex(keys[2]) + ' ' + unicodeNames[keys[2]] : symbolNames[key][2];

                    keyDescTR.querySelector('.key-desc-char').textContent = String.fromCharCode(keys[3]);
					keyDescTR.querySelector('.key-desc-name').textContent = plNames[key]?.[3] ?? '';
                    keyDescTR.querySelector('.key-desc-details').textContent = unicodeNames[keys[3]] ? formatHex(keys[3]) + ' ' + unicodeNames[keys[3]] : symbolNames[key][3];
                });
            }
        });
    });

    const naturalWidth = keyboardElement.offsetWidth;
    const naturalHeight = keyboardElement.offsetHeight;
    const wrapper = document.createElement('div');
    wrapper.classList.add('keyboard-scaler');
    keyboardElement.parentNode.insertBefore(wrapper, keyboardElement);
    wrapper.appendChild(keyboardElement);

    new ResizeObserver(() => {
        const scale = Math.min(1, wrapper.clientWidth / naturalWidth);
        if (scale < 1) {
            keyboardElement.style.transform = `scale(${scale})`;
            keyboardElement.style.transformOrigin = 'top center';
            wrapper.style.height = `${naturalHeight * scale}px`;
        } else {
            keyboardElement.style.transform = '';
            keyboardElement.style.transformOrigin = '';
            wrapper.style.height = '';
        }
    }).observe(wrapper);
});
