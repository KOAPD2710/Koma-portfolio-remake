import { initScriptPage } from './pages/index';
import { inject } from "@vercel/analytics"

const main = () => {
    initScriptPage()
    inject()
};

window.onload = main();