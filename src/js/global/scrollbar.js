import $ from "jquery";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { lenis } from "./lenis";

gsap.registerPlugin(ScrollTrigger);

const InitScrollbar = () => {
    const target = {
        scrollbar: $('.scrollbar'),
        inner: $('.scrollbar-inner')
    }

    lenis.on('scroll', (e) => {
        gsap.set(target.inner, {
            scaleY: e.progress
        })

        if (Math.abs(e.velocity) > .5) {
            !$(target.scrollbar).hasClass('isScrolling') && $(target.scrollbar).addClass('isScrolling')
        } else {
            $(target.scrollbar).hasClass('isScrolling') && $(target.scrollbar).removeClass('isScrolling')
        }
    })

    gsap.set(target.inner, {
        scaleY: lenis.progress
    })
}


export default InitScrollbar