import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from '../../libs/SplitText';
import { inView, lerp, parseRem, pointerCurr, rotXGetter, rotXSetter, rotYGetter, rotYSetter, typeOpts, xGetter, xSetter, yGetter, ySetter } from '../../helper/index';

gsap.registerPlugin(ScrollTrigger);

const home = {
    namespace: "home",
    afterEnter(data) {
        console.log(`enter ${this.namespace}`);

        function HomeHero() {
            ScrollTrigger.create({
                trigger: '.home-hero',
                start: 'bottom bottom',
                once: true,
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
                once: true,
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

                let tlMoveCircle = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".home-someshit",
                        start: 'top bottom',
                        end: `bottom top+=${parseRem(80)}`,
                        scrub: .05,
                        // markers: true
                    }
                })

                tlMoveCircle
                    // .from('.home-someshit-circle.top', {
                    //     yPercent: 25,
                    //     ease: 'none'
                    // }, 0)
                    // .from('.home-someshit-circle.bot', {
                    //     yPercent: -25,
                    //     ease: 'none'
                    // }, "<=")
                    .fromTo('.home-someshit-card-wrapper', {
                        yPercent: 25,
                    }, {
                        yPercent: -15,
                        ease: 'none'
                    }, "<=")


                const totalCard = $('.home-someshit-card')
                $('.home-someshit-card-wrapper').removeClass('flip-1', 'flip-2', 'flip-3')

                totalCard.each((idx, el) => {
                    if (idx > 0) {
                        let tlFlipCard = gsap.timeline({
                            scrollTrigger: {
                                trigger: '.home-someshit',
                                start: `top+=${idx * 100 / totalCard.length}% center`,
                                endTrigger: '.footer',
                                end: 'bottom top',
                                toggleClass: {
                                    targets: '.home-someshit-card-wrapper',
                                    className: `flip-${idx}`,
                                },
                                // markers: true
                            }
                        })
                    }

                    let tlFlipCardActive = gsap.timeline({
                        scrollTrigger: {
                            trigger: '.home-someshit',
                            start: `top+=${idx * 100 / totalCard.length}% center`,
                            endTrigger: '.footer',
                            end: 'bottom top',
                            onEnter: () => {
                                totalCard.removeClass('active').removeClass('current')
                                $(el).addClass('active').addClass('current')
                                $(el).prev().addClass('active')
                            },
                            onLeaveBack: () => {
                                totalCard.removeClass('active').removeClass('current')
                                $(el).addClass('active')
                                $(el).prev().addClass('active').addClass('current')
                            },
                        }
                    })


                })

                const targetRotate = {
                    target: $('.home-someshit-card-rotate'),
                    txt: $('.home-someshit-card-txt'),
                    logo: $('.home-someshit-card-logo')
                }
                const maxRotate = 30;
                const maxTranslate = $('.home-someshit-card-wrapper').width() * .05;

                const HandleParallax3D = () => {
                    let targetReact = targetRotate.target.get(0).getBoundingClientRect();
                    let mousePos = pointerCurr();

                    let midPos = {
                        x: targetReact.left + targetReact.width / 2,
                        y: targetReact.top + targetReact.height / 2
                    }

                    let dist = {
                        x: mousePos.x - midPos.x,
                        y: mousePos.y - midPos.y
                    }

                    let tilt = {
                        x: Math.max(Math.min(dist.y / midPos.y, 1), -1),
                        y: Math.max(Math.min(-dist.x / midPos.x, 1), -1),
                    }

                    let radius = Math.sqrt(Math.pow(tilt.x, 2) + Math.pow(tilt.y, 2)) / Math.sqrt(2);

                    let currRot = {
                        rotX: rotXGetter(targetRotate.target.get(0)),
                        rotY: rotYGetter(targetRotate.target.get(0))
                    }

                    if (inView($('.home-someshit').get(0))) {
                        rotXSetter(targetRotate.target.get(0))(lerp(currRot.rotX, - tilt.x * radius * maxRotate, 0.05))
                        rotYSetter(targetRotate.target.get(0))(lerp(currRot.rotY, - tilt.y * radius * maxRotate, 0.05))
                    } else {
                        rotXSetter(targetRotate.target.get(0))(lerp(currRot.rotX, 0, 0.05))
                        rotYSetter(targetRotate.target.get(0))(lerp(currRot.rotY, 0, 0.05))
                    }

                    //Handle Transform Txt - Logo
                    targetRotate.txt.each((__, el) => {
                        let parent = $(el).parents('.home-someshit-card')
                        let currPos = {
                            x: xGetter(el),
                            y: yGetter(el)
                        }
                        if (parent.hasClass('current')) {
                            xSetter(el)(lerp(currPos.x, -tilt.y * maxTranslate * .5, 0.05))
                            ySetter(el)(lerp(currPos.y, tilt.x * maxTranslate * .5, 0.05))
                        } else {
                            xSetter(el)(lerp(currPos.x, 0, 0.05))
                            ySetter(el)(lerp(currPos.y, 0, 0.05))
                        }
                    })

                    targetRotate.logo.each((__, el) => {
                        let parent = $(el).parents('.home-someshit-card')

                        let currPos = {
                            x: xGetter(el),
                            y: yGetter(el)
                        }

                        if (parent.hasClass('current')) {
                            xSetter(el)(lerp(currPos.x, -tilt.y * maxTranslate, 0.05))
                            ySetter(el)(lerp(currPos.y, tilt.x * maxTranslate, 0.05))
                            // gsap.set(el, {
                            //     filter: `drop-shadow(var(${parent.hasClass('card-front') ? '--cl-white' : '--cl-black'}) ${tilt.y}rem ${-tilt.x}rem ${radius * maxRotate}px)`
                            // })
                        } else {
                            xSetter(el)(lerp(currPos.x, 0, 0.05))
                            ySetter(el)(lerp(currPos.y, 0, 0.05))
                        }
                    })

                    window.animationFrameId = requestAnimationFrame(HandleParallax3D);
                }
                HandleParallax3D()
            }
        }
        HomeSomeShit()

        function HomeProj(data) {
            const section = $(data.next.container).find('.home-proj')

            const target = {
                allItems: section.find('.home-proj-item')
            }

            let allTl = []
            target.allItems.each((idx, el) => {
                const splitTxt = new SplitText($(el).find('.home-proj-item-name'), { ...typeOpts.chars })

                let tl = gsap.timeline({ paused: true })

                tl
                    .to(splitTxt.chars, {
                        x: '5rem',
                        stagger: '.03',
                        ease: "back.out(3)",
                        duration: .4
                    })
                tl.idx = idx

                allTl.push(tl)
            })

            let currCl = ['#ff4949', '#0073C6', '#00A167']

            target.allItems.on('pointerenter', function (e) {
                let index = $(this).index()

                $(allTl).each((idx, el) => {
                    if (index != idx) {
                        el.timeScale(1.3).reverse()
                        $(el).css('--curr-cl', '')
                    }
                })
                allTl[index].timeScale(1).play()
                $(this).css('--curr-cl', currCl[Math.floor(Math.random() * currCl.length)])
            })

            target.allItems.on('pointerleave', function (e) {
                let index = $(this).index()
                allTl[index].timeScale(1.3).reverse()
            })
        }

        HomeProj(data)
    },
    beforeLeave(data) {
        console.log(`leave ${this.namespace}`);
    }
}

export default home