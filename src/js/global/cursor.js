import $ from 'jquery';

import { lerp, xGetter, xSetter, yGetter, ySetter, pointerCurr } from '../helper/index';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const InitCursor = () => {

    const HandleCursor = () => {
        const target = {
            cursor: $('.cursor'),
            inner: $('.cursor-inner'),
        }

        let currPos = {
            x: xGetter(target.cursor.get(0)),
            y: yGetter(target.cursor.get(0))
        }

        xSetter(target.cursor.get(0))(lerp(currPos.x, pointerCurr().x, 0.11))
        ySetter(target.cursor.get(0))(lerp(currPos.y, pointerCurr().y, 0.11))

        requestAnimationFrame(HandleCursor)
    }

    HandleCursor()
}


export default InitCursor