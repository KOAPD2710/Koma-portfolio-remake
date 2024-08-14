import $ from 'jquery';
import gsap from 'gsap';

const FluidAnimation = (el, value = { rotate: Number, translate: Array }, duration = 1) => {
    const target = $(el);

    const fluidX = (dir) => {
        gsap.to(target, {
            x: Math.random() * dir * value.translate[0],
            ease: "sine.inOut",
            duration: duration + Math.random() * duration,
            onComplete: () => fluidX(dir * -1)
        })
    }
    const fluidY = (dir) => {
        gsap.to(target, {
            y: Math.random() * dir * (value.translate[1] || value.translate[0]),
            ease: "sine.inOut",
            duration: duration + Math.random() * duration,
            onComplete: () => fluidY(dir * -1)
        })
    }
    const fluidRotate = (dir) => {
        gsap.to(target, {
            rotate: Math.random() * value.rotate * dir,
            ease: "sine.inOut",
            duration: duration + Math.random() * duration,
            onComplete: () => fluidRotate(dir * -1)
        })
    }

    if (target.length) {
        fluidX(Math.random > .5 ? 1 : -1)
        fluidY(Math.random > .5 ? 1 : -1)

        if (value.rotate) {
            fluidRotate(Math.random > .5 ? 1 : -1)
        }
    }
}


export default FluidAnimation