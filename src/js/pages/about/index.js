import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { parseRem, rotXGetter } from '../../helper/index';

import FluidAnimation from '../../function/fluid';

const about = {
    namespace: "about",
    afterEnter(data) {
        console.log(`enter ${this.namespace}`);


        const AboutStart = (data) => {
            const target = $(data.next.container).find('.about-start')

            const smileImg = target.find('.about-start-left .img-sticker')

            FluidAnimation(smileImg, { translate: [parseRem(20)], rotate: 30 }, 2)
        }

        AboutStart(data)

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
                FluidAnimation(targetLogo, valNum, 2)
            })
        }
        AboutAva(data)
    },
    beforeLeave() {
        console.log(`leave ${this.namespace}`);
    }
}

export default about