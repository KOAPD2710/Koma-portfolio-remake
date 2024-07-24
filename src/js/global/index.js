import { initLenis } from "./lenis";
import { initTheme } from "./theme";
import initAppendHTML from "./append";

const initGlobal = () => {
    initLenis()
    initTheme()
    initAppendHTML()
}


export default initGlobal