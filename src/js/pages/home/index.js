import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const home = {
    namespace: "home",
    afterEnter(data) {
        console.log(`enter ${this.namespace}`);

        function HomeHero() {
            ScrollTrigger.create({
                trigger: '.home-hero',
                start: 'top bottom',
                onEnter: () => {
                    HomeHeroFunc()
                }
            })

            const HomeHeroFunc = () => {
                const logo = {
                    K: $('.home-hero-ic.logoK'),
                    O: $('.home-hero-ic.logoO'),
                    M: $('.home-hero-ic.logoM'),
                    A: $('.home-hero-ic.logoA'),
                }
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: '.home-hero',
                        start: 'bottom bottom',
                        end: 'bottom top',
                        scrub: .5,
                        // markers: true,
                    },
                })
                const indexEase = "power1.out";

                tl
                    .to(logo.K, {
                        xPercent: -35,
                        yPercent: 70,
                        rotate: 15,
                        scale: 1.05,
                        ease: indexEase
                    }, "<=")
                    .to(logo.O, {
                        xPercent: -9,
                        yPercent: 80,
                        ease: indexEase
                    }, "<=")
                    .to(logo.M, {
                        xPercent: 4,
                        yPercent: 95,
                        rotate: -15,
                        scale: .95,
                        ease: indexEase
                    }, "<=")
                    .to(logo.A, {
                        xPercent: 32,
                        yPercent: 65,
                        rotate: 25,
                        scale: 1.1,
                        ease: indexEase
                    }, "<=")
            }
        }
        HomeHero()

        function HomePreamble() {
        }
        HomePreamble()

        function HomeSomeShit() {
            ScrollTrigger.create({
                trigger: ".home-someshit",
                start: 'top bottom',
                onEnter: () => {
                    HomeSomeShitFunc()
                }
            })

            const HomeSomeShitFunc = () => {
                let tlSpinCircle = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".home-someshit",
                        start: 'top bottom',
                        end: 'bottom top',
                        toggleActions: 'play pause play pause',
                    }
                })

                tlSpinCircle
                    .to('.home-someshit-circle.top svg', {
                        rotate: 360,
                        duration: 20,
                        repeat: -1,
                        ease: 'none'
                    }, "<=")
                    .to('.home-someshit-circle.bot svg', {
                        rotate: -360,
                        duration: 20,
                        repeat: -1,
                        ease: 'none'
                    }, "<=")
            }
        }
        HomeSomeShit()
    },
    beforeLeave(data) {
        console.log(`leave ${this.namespace}`);
    }
}

export default home