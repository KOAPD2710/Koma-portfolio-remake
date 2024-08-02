import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { parseRem } from '../../helper/index';
// import { inView, lerp, parseRem, pointerCurr, rotXGetter, rotXSetter, rotYGetter, rotYSetter, xGetter, xSetter, yGetter, ySetter } from '../../helper/index';

gsap.registerPlugin(ScrollTrigger);

const work = {
    namespace: "work",
    afterEnter(data) {
        console.log(`enter ${this.namespace}`);

        const WorkHero = (data) => {
            let target = $(data.next.container).find('.work-hero')
            ScrollTrigger.create({
                trigger: target,
                start: 'top bottom',
                once: true,
                onEnter: () => {
                    WorkHeroFunc()
                }
            })

            const WorkHeroFunc = () => {
                ScrollTrigger.create({
                    trigger: target.find('.work-hero-content-sub'),
                    start: 'center top+=62%',
                    endTrigger: '.footer',
                    end: 'bottom top',
                    onEnter: () => {
                        target.find('.work-hero-content-title').removeClass('active')
                        target.find('.work-hero-content-title').eq(1).addClass('active')
                    },
                    onLeaveBack: () => {
                        target.find('.work-hero-content-title').removeClass('active')
                        target.find('.work-hero-content-title').eq(0).addClass('active')
                    },
                })
            }
        }
        WorkHero(data)


        const WorkPreamble = (data) => {
            let target = $(data.next.container).find('.work-preamble')

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: target.find('.work-preamble-sticky'),
                    start: 'top top',
                    end: `bottom-=${parseFloat($('main.main').css('--header-height'))} top`,
                    scrub: true,
                }
            })

            tl
                .to(target.find('.work-preamble-sticky'), {
                    y: target.height() - parseFloat($('main.main').css('--header-height')),
                    ease: 'none'
                })
        }
        WorkPreamble(data)

        const WorkProj = (data) => {
            let target = $(data.next.container).find('.work-proj')

            const allProjects = target.find('.work-proj-item')

            allProjects.each((idx, el) => {

                ScrollTrigger.create({
                    trigger: el,
                    start: 'top bottom',
                    once: true,
                    onEnter: () => {
                        WorkProjFunc(el)
                    },
                    // markers: true
                })

                const WorkProjFunc = (el) => {
                    const targetEl = {
                        element: $(el),
                        infoWrapper: $(el).find('.work-proj-info-wrapper'),
                        thumbCircle: $(el).find('.work-proj-thumb-circle'),
                        thumbTxt: $(el).find('.work-proj-thumb-txt'),
                        thumbTxtWrapper: $(el).find('.work-proj-thumb-txt-wrapper'),
                        thumbTxtContainer: $(el).find('.work-proj-thumb-txt-container'),
                    }

                    //Append HTML
                    let txtCount = targetEl.thumbTxtWrapper.width() / targetEl.thumbTxt.outerWidth() * 2
                    let wrapperCount = targetEl.thumbTxtContainer.height() / targetEl.thumbTxtWrapper.height()
                    let thumbTxtClone = targetEl.thumbTxt.clone()
                    let thumbTxtWrapperClone = targetEl.thumbTxtWrapper.clone()
                    let wrapperCloner = thumbTxtWrapperClone.clone()

                    targetEl.thumbTxtContainer.html('')

                    for (i = 0; i <= txtCount - 1; i++) {
                        let cloner = thumbTxtClone.clone()
                        wrapperCloner.append(cloner)
                    }

                    for (i = 0; i <= wrapperCount + 1; i++) {
                        let cloner = wrapperCloner.clone()

                        if (Math.floor(i / 2) * 2 === i) {
                            cloner.append(thumbTxtClone.clone())
                        }

                        targetEl.thumbTxtContainer.append(cloner)
                    }

                    // Animation
                    let tlTranslateY = gsap.timeline({
                        scrollTrigger: {
                            trigger: targetEl.element,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1,
                        }
                    })

                    tlTranslateY
                        .from(targetEl.infoWrapper, {
                            y: parseRem(80),
                            ease: 'power1.in'
                        }, "<=")
                        .fromTo(targetEl.thumbCircle, {
                            yPercent: 20,
                        }, {
                            yPercent: -10,
                            ease: 'none'
                        }, "<=")


                    let allWapper = $(el).find('.work-proj-thumb-txt-wrapper')
                    let tlThumbWrapperTxt = gsap.timeline({
                        scrollTrigger: {
                            trigger: targetEl.element,
                            start: 'top top+=95%',
                            end: 'bottom top+=60%',
                            scrub: 1,
                            // markers: true
                        }
                    })
                    tlThumbWrapperTxt
                        .from(allWapper, {
                            yPercent: 50,
                            rotateX: 30,
                            scale: 2,
                            opacity: 0,
                            stagger: .04,
                            ease: 'back.out(4.2)'
                        });

                    let tlThumbContainer = gsap.timeline({
                        scrollTrigger: {
                            trigger: targetEl.element,
                            start: 'top top+=95%',
                            end: 'bottom top',
                            scrub: 1,
                            // markers: true
                        }
                    })
                    tlThumbContainer
                        .fromTo(targetEl.thumbTxtContainer, {
                            yPercent: 10,
                        }, {
                            yPercent: -10,
                            ease: 'none'
                        })
                }
                // WorkProjFunc(el)
            })
        }
        WorkProj(data)
    },
    beforeLeave() {
        console.log(`leave ${this.namespace}`);
    }
}

export default work