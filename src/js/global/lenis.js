import Lenis from '@studio-freight/lenis';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis;

const initLenis = () => {
    lenis = new Lenis({
        duration: 1.5,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    })

    window.lenis = lenis;

    gsap.ticker.remove(gsap.updateRoot);
    gsap.ticker.lagSmoothing(0);

    function raf(time) {
        lenis.raf(time);
        gsap.updateRoot(time / 1000);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update)
}

const stopLenis = () => {
    lenis.stop()
}
const startLenis = () => {
    lenis.start()
}

export {
    lenis,
    initLenis,
    stopLenis,
    startLenis
};