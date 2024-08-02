import $ from 'jquery';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { debounce } from '../helper/index';

gsap.registerPlugin(ScrollTrigger);

const InitResize = () => {

    $(window).on('resize', debounce(() => {
        ResizeFunc()
    }, 200))

    const ResizeFunc = () => {
        ScrollTrigger.getAll().forEach(triggers => {
            triggers.update()
            triggers.refresh(true)
        })
    }
}


export default InitResize