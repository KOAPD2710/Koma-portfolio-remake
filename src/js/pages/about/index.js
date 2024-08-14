import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { parseRem, rotXGetter } from '../../helper/index';

import FluidAnimation from '../../function/fluid';

const about = {
    namespace: "about",
    afterEnter(data) {
        console.log(`enter ${this.namespace}`);

        const AboutAva = (data) => {
            const target = $(data.next.container).find('.about-ava')

            const targetWrapper = target.find('.about-ava-logo-wrapper')
            targetWrapper.each((__, el) => {
                let targetLogo = $(el).find('.about-ava-logo');
                let currRotate = gsap.getProperty(el, 'rotate');
                let valNum = {
                    translate: [parseRem(20), parseRem(35)]
                }

                if (currRotate != 0) {
                    valNum.rotate = currRotate / 2 + 15
                }
                FluidAnimation(targetLogo, valNum)
            })
        }
        AboutAva(data)
    },
    beforeLeave() {
        console.log(`leave ${this.namespace}`);
    }
}

export default about