import $ from 'jquery';
import gsap from 'gsap';


const lerp = (a, b, t = 0.08) => {
    return a + (b - a) * t;
}

const parseRem = (input) => {
    return input / 10 * parseFloat($('html').css('font-size'));
}

const xSetter = (el) => gsap.quickSetter(el, 'x', `px`);
const xGetter = (el) => gsap.getProperty(el, 'x');

const ySetter = (el) => gsap.quickSetter(el, 'y', `px`);
const yGetter = (el) => gsap.getProperty(el, 'y');

const rotSetter = (el) => gsap.quickSetter(el, 'rotate', `deg`);
const rotGetter = (el) => gsap.getProperty(el, 'rotate');

const rotXSetter = (el) => gsap.quickSetter(el, 'rotateX', `deg`);
const rotXGetter = (el) => gsap.getProperty(el, 'rotateX');

const rotYSetter = (el) => gsap.quickSetter(el, 'rotateY', `deg`);
const rotYGetter = (el) => gsap.getProperty(el, 'rotateY');

const scaleXSetter = (el) => gsap.quickSetter(el, 'scaleX');
const scaleXGetter = (el) => gsap.getProperty(el, 'scaleX');

const scaleYSetter = (el) => gsap.quickSetter(el, 'scaleY');
const scaleYGetter = (el) => gsap.getProperty(el, 'scaleY');


let typeOpts = {
    lines: { type: 'lines', linesClass: 'g-lines' },
    words: { type: 'words,lines', linesClass: 'g-lines', wordsClass: "g-words" },
    chars: { type: 'chars,words,lines', linesClass: 'g-lines', wordsClass: "g-words", charsClass: "char" }
};

let pointer = { x: $(window).width() / 2, y: $(window).height() / 2 };

$(window).on('pointermove', function (e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
})

const pointerCurr = () => {
    return pointer
}

const inView = (el) => {
    if (0 <= el.getBoundingClientRect().bottom && el.getBoundingClientRect().top <= $(window).height()) {
        return true
    }
}

function debounce(func, delay = 100) {
    let timer;
    return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, delay, event);
    };
}

export {
    lerp,
    parseRem,
    xSetter,
    ySetter,
    xGetter,
    yGetter,
    rotSetter,
    rotGetter,
    rotXSetter,
    rotXGetter,
    rotYSetter,
    rotYGetter,
    scaleXSetter,
    scaleXGetter,
    scaleYSetter,
    scaleYGetter,
    typeOpts,
    pointerCurr,
    debounce,
    inView,
}
