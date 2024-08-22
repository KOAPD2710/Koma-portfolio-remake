import $ from "jquery";

import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { lenis, initLenis } from "../global/lenis";

import { InitFooter, InitLogoFooter, FooterScrollTrigger } from "../global/footer";
import InitHeader from "../global/header";

import InitResize from "../global/resizePage";
import InitCursor from "../global/cursor";
import initMarquee from '../global/marquee';
import initAppendHTML from "../global/append";
import InitScrollbar from "../global/scrollbar";
import { initTheme } from "../global/theme";

import home from './home/index.js';
import about from './about/index.js';
import work from "./work/index";

const VIEWS = [home, about, work];

const initScriptPage = () => {

    function removeAllScrollTrigger() {
        let triggers = gsap.globalTimeline.getChildren();
        triggers.forEach((trigger, idx) => {
            let globalTrigger = trigger?.labels?.global ? true : false;
            if (!globalTrigger) {
                // trigger.kill()
            }
        });

    }
    function refreshFooterScrollTrigger() {
        // FooterScrollTrigger.forEach(trigger => {
        //     trigger.scrollTrigger.update();
        //     trigger.scrollTrigger.refresh();
        // });
        ScrollTrigger.getAll().forEach(triggers => {
            triggers.update()
            triggers.refresh()
        })
    }
    function ScrollTop() {
        lenis.scrollTo(0, {
            force: true,
            immediate: true
        })
    }
    barba.use(barbaPrefetch);
    barba.init({
        preventRunning: true,
        transitions: [{
            // name: 'opacity-transition',
            sync: true,
            once(data) {
                initLenis()
                initTheme()
                InitHeader()
                InitFooter()
                initAppendHTML(data)
                initMarquee(data)
                InitScrollbar()
                InitLogoFooter()
                InitCursor()
                InitResize()
                ScrollTop()
            },
            leave(data) {
                gsap.to(data.current.container, {
                    opacity: 0,
                    duration: 1,
                });
            },
            afterLeave(data) {
                ScrollTop()
                if (window.animationFrameId) {
                    cancelAnimationFrame(window.animationFrameId);
                    window.animationFrameId = null;
                }
                removeAllScrollTrigger()
            },
            enter(data) {
                gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 1,
                });
            },
            async after(data) {
                InitHeader()
                refreshFooterScrollTrigger()
                initMarquee(data)
                initAppendHTML(data)
                InitLogoFooter()
            },
        }],
        views: VIEWS
    });
}

export {
    initScriptPage
};