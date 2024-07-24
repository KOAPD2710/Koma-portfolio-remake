import $ from "jquery";


import barba from '@barba/core';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import initGlobal from '../global/index';
import initMarquee from '../global/marquee';

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
    barba.init({
        preventRunning: true,
        transitions: [{
            name: 'opacity-transition',
            async: true,
            once(data) {
                initGlobal()
                initMarquee(data)
            },
            leave(data) {
                gsap.to(data.current.container, {
                    opacity: 0
                });
            },
            enter(data) {
                gsap.from(data.next.container, {
                    opacity: 0
                });
            },
            async after(data) {
                initMarquee(data)
            },
            async beforeLeave(data) {
            },
            async leave(data) {
                removeAllScrollTrigger();
            },
            async afterLeave(data) {
            }
        }],
        views: VIEWS
    });
    // console.log(barba);
}

export {
    VIEWS,
    initScriptPage
};