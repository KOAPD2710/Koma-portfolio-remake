import $ from 'jquery';

import { lerp, xGetter, xSetter, yGetter, ySetter, pointerCurr, scaleYGetter, scaleXGetter, scaleXSetter, rotGetter, rotSetter, scaleYSetter } from '../helper/index';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const InitCursor = () => {

    const HandleCursor = () => {
        const target = {
            cursor: $('.cursor'),
            inner: $('.cursor-dot-inner'),
            blob: $('.cursor-blob')
        }

        let currPos = {
            x: xGetter(target.cursor.get(0)),
            y: yGetter(target.cursor.get(0))
        }

        let distance = Math.sqrt(Math.pow(pointerCurr().x - currPos.x, 2) + Math.pow(pointerCurr().y - currPos.y, 2));

        let currBlob = {
            scaleX: scaleXGetter(target.blob.get(0)),
            scaleY: scaleYGetter(target.blob.get(0)),
            rotate: rotGetter(target.blob.get(0)),
            rotateInner: rotGetter(target.blob.find('.cursor-blob-inner').get(0)),
        }

        let targetBlob = {
            scale: Math.min(distance / 600, 0.7),
            rotate: (Math.atan2(pointerCurr().y - currPos.y, pointerCurr().x - currPos.x) * 180) / Math.PI
        }


        xSetter(target.cursor.get(0))(lerp(currPos.x, pointerCurr().x, 0.11))
        ySetter(target.cursor.get(0))(lerp(currPos.y, pointerCurr().y, 0.11))

        scaleXSetter(target.blob.get(0))(lerp(currBlob.scaleX, 1 + targetBlob.scale, 0.11))
        scaleYSetter(target.blob.get(0))(lerp(currBlob.scaleY, 1 - targetBlob.scale, 0.11))

        rotSetter(target.blob.get(0))(targetBlob.rotate)
        rotSetter(target.blob.find('.cursor-blob-inner').get(0))(-targetBlob.rotate)


        requestAnimationFrame(HandleCursor)
    }

    HandleCursor()
}


export default InitCursor