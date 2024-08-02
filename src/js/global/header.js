import $, { css } from "jquery";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { parseRem } from "../helper/index";

gsap.registerPlugin(ScrollTrigger);

const InitHeader = () => {
    const headerHeight = $('header.header').height()
    $('.main').css('--header-height', `${headerHeight}px`)

    const InitHeaderFunc = () => {
        let currentPage = $('.main').attr('data-barba-namespace')

        if (currentPage == 'work') {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.work-preamble',
                    start: `top top+=${headerHeight}`,
                    end: 'top top',
                    scrub: true,
                }
            })
            tl
                .to('.header', {
                    top: -headerHeight,
                    ease: 'none',
                    overwrite: true
                })
        } else {
            gsap.to('.header', {
                top: 0,
                duration: .4,
                overwrite: true
            })
        }
    }
    InitHeaderFunc()
}


export default InitHeader