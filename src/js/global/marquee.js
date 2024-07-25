import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const initMarquee = (data) => {
    const targetData = $(data.next.container).find('.marquee')

    targetData.each((__, marquee) => {
        const target = {
            marquee: $(marquee),
            wrapper: $(marquee).find('.marquee-wrapper'),
            item: $(marquee).find('.marquee-item')
        }

        let itemCount = (target.marquee.width() + 4. * target.item.width()) / target.item.width();

        if (itemCount > parseInt(itemCount)) {
            for (i = 0; i < itemCount - 1; i++) {
                let cloner = target.item.clone();
                target.wrapper.append(cloner);
            }
        }

        //Animate Marquee
        const isInvert = target.marquee.attr('data-marquee-invert')
        const isHover = target.marquee.attr('data-marquee-hover')


        let itemTarget = $(marquee).find('.marquee-item');

        let tlMarquee = gsap.timeline({
            scrollTrigger: {
                trigger: target.marquee,
                start: 'top bottom',
                end: 'bottom top',
                toggleActions: 'play pause play pause'
            },
            repeat: -1,
            // paused: true,
        })

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
                    end: 'bottom top',
                    toggleActions: 'play pause play pause'
                },
                repeat: -1
            })

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


export default initMarquee;