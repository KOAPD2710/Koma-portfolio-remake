import $ from "jquery";


import barba from '@barba/core';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import initGlobal from '../global/index';
import initMarquee from '../global/marquee';
import initFooter from "../global/footer";
import initAppendHTML from "../global/append";

import home from './home/index.js';
import about from './about/index.js';

const VIEWS = [home, about];

const initScriptPage = () => {

    function removeAllScrollTrigger() {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
            trigger.kill();
        });
    }
    function refreshAllScrollTrigger() {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach(trigger => {
            trigger.update(true);
            trigger.refresh(true);
        });
    }

    barba.init({
        preventRunning: true,
        transitions: [{
            name: 'opacity-transition',
            async: true,
            once(data) {
                initGlobal()
                initMarquee(data)
                initAppendHTML(data)
                initFooter()
            },
            leave(data) {
                gsap.to(data.current.container, {
                    opacity: 0
                });
            },
            enter(data) {
                gsap.from(data.next.container, {
                    opacity: 0,
                    onComplete: () => {
                        refreshAllScrollTrigger()
                    }
                });
            },
            afterEnter() {
            },
            async after(data) {
                initMarquee(data)
                initAppendHTML(data)
            },
            async beforeLeave(data) {
            },
            async leave(data) {
            },
            async afterLeave(data) {
            }
        }],
        views: VIEWS
    });
}

export {
    VIEWS,
    initScriptPage
};