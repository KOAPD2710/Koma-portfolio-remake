import $ from 'jquery';

import { parseRem, typeOpts } from '../helper/index';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from "../libs/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

let FooterScrollTrigger = []

const InitFooter = () => {
    const HandleMarquee = () => {
        const targetData = $('.footer').find('.marquee');
        targetData.each((__, marquee) => {
            const target = {
                marquee: $(marquee),
                wrapper: $(marquee).find('.marquee-wrapper'),
                item: $(marquee).find('.marquee-item'),
                trigger: $(marquee).parents('[data-marquee-container]')
            }

            let itemCount = (target.marquee.width() + 4. * target.item.width()) / target.item.width();

            if (itemCount > parseInt(itemCount)) {
                Array.from({ length: itemCount - 1 }).forEach(() => {
                    let cloner = target.item.clone();
                    target.wrapper.append(cloner);
                })
            }

            //Animate Marquee
            const isInvert = target.marquee.attr('data-marquee-invert')
            const isHover = target.marquee.attr('data-marquee-hover')

            let itemTarget = $(marquee).find('.marquee-item');

            let tlMarquee = gsap.timeline({
                scrollTrigger: {
                    trigger: target.marquee,
                    start: 'top bottom',
                    endTrigger: target.trigger,
                    end: 'bottom top',
                    toggleActions: 'play pause play pause',
                },
                repeat: -1,
            })

            tlMarquee.addLabel("global", '1');

            FooterScrollTrigger.push(tlMarquee)

            const speed = 200;

            tlMarquee.to(itemTarget, {
                xPercent: isInvert == 'true' ? 100 : -100,
                duration: target.item.width() / speed,
                ease: 'none'
            })
            if (isHover == 'true') {
                target.marquee.on('mouseenter', () => {
                    gsap.to(tlMarquee, { timeScale: 0.4, duration: 0.8 })
                })
                target.marquee.on('mouseleave', () => {
                    gsap.to(tlMarquee, { timeScale: 1.0, duration: 0.8 })
                })
            }

            //Animate Logo
            const LogoAnimateFunc = () => {
                const logoItem = {
                    logoK: $(marquee).find('.marquee-logo-item.logo-K'),
                    logoO: $(marquee).find('.marquee-logo-item.logo-O'),
                    logoM: $(marquee).find('.marquee-logo-item.logo-M'),
                    logoA: $(marquee).find('.marquee-logo-item.logo-A')
                }

                let tlLogo = gsap.timeline({
                    scrollTrigger: {
                        trigger: target.marquee,
                        start: 'top bottom',
                        endTrigger: target.trigger,
                        end: 'bottom top',
                        toggleActions: 'play pause play pause',
                    },
                    repeat: -1
                })
                tlLogo.addLabel("global", '1');
                FooterScrollTrigger.push(tlLogo)

                const easing = "power2.inOut";
                const duration = 1.6;

                tlLogo
                    .to(logoItem.logoK, {
                        xPercent: -100,
                        ease: easing,
                        duration: duration,
                    }, 0)
                    .from(logoItem.logoO, {
                        xPercent: -100,
                        ease: easing,
                        duration: duration,
                    }, '<=')
                    .to(logoItem.logoO, {
                        yPercent: 100,
                        ease: easing,
                        duration: duration,
                    }, '>')
                    .from(logoItem.logoM, {
                        yPercent: 100,
                        ease: easing,
                        duration: duration,
                        yoyo: true
                    }, '<=')
                    .to(logoItem.logoM, {
                        yPercent: 100,
                        ease: easing,
                        duration: duration,
                    }, '>')
                    .from(logoItem.logoA, {
                        yPercent: 100,
                        ease: easing,
                        duration: duration,
                        yoyo: true
                    }, '<=')
                    .to(logoItem.logoA, {
                        yPercent: 100,
                        ease: easing,
                        duration: duration,
                    }, '>')
                    .to(logoItem.logoK, {
                        xPercent: 0,
                        ease: easing,
                        duration: duration,
                    }, '<=')
            }
            if ($(marquee).find('.marquee-logo').length) {
                LogoAnimateFunc()
            }
        })
    }

    const HandleSocailLink = () => {
        const targetActive = {
            link: $('.footer-git-right-content-social-link'),
            txt: $('.footer-git-right-content-social-link-txt'),
        }

        const targetLink = {
            all: $('.footer-git-right-content-info-link'),
        }

        const HandleActive = (idx) => {
            targetActive.txt.removeClass('active')
            targetActive.link.eq(idx).find('.footer-git-right-content-social-link-txt').addClass('active')

            let tl = gsap.timeline()

            tl
                .to(targetLink.all, {
                    yPercent: idx * -100,
                    ease: 'power1.inOut',
                    duration: .4,
                    overwrite: true
                })
            tl.addLabel("global", '1');
            FooterScrollTrigger.push(tl)
        }

        targetActive.link.on('click', function (e) {
            e.preventDefault()

            let idx = $(this).index()
            HandleActive(idx)
        })
    }

    const HandleYear = () => {
        const year = new Date().getFullYear();
        $('.footer-git-left-copyright span').text(year)
    }


    const HandleCircle = () => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.footer-git .marquee',
                start: 'bottom bottom',
                endTrigger: '.footer-git',
                end: 'top top',
                scrub: true,
            }
        })
        tl.addLabel("global", '1');
        FooterScrollTrigger.push(tl)

        tl
            .from('.footer-git-right-circle', {
                y: $(window).height() / - 2 - parseRem(30),
                ease: 'none'
            })

        let tlSpin = gsap.timeline({
            scrollTrigger: {
                trigger: '.footer-git',
                start: 'top bottom',
                end: 'bottom top',
                toggleActions: 'play pause play pause',
            },
            repeat: -1,
        })
        tlSpin.addLabel("global", '1');
        FooterScrollTrigger.push(tl)

        tlSpin
            .to('.footer-git-right-circle svg', {
                rotate: 360,
                ease: 'none',
                duration: 20
            })
    }

    HandleSocailLink()
    HandleMarquee()
    HandleYear()
    HandleCircle()
}

const InitLogoFooter = () => {
    const random = Math.round(Math.random() * 3)
    $('.footer-git-left-ic').removeClass('active').eq(random).addClass('active')
}

export { InitFooter, InitLogoFooter, FooterScrollTrigger }