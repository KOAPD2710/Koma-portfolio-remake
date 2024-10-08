import $ from "jquery";

const initAppendHTML = (data) => {
    const svgK = `
        <span class="embed-svg">
            <svg class="logoK" width="100%" viewBox="0 0 28.7 28.7">
                <path fill="currentColor" d="m16.6,14.3c8.5-2.3,11.4-7.6,12-13.1C28.7.3,28.5,0,27.5,0c-8.8,0-17.5,0-26.3,0C.2,0,0,.3,0,1.2v26.2c0,.9.2,1.2,1.2,1.2,8.8,0,17.5,0,26.3,0,1,0,1.2-.3,1.1-1.2-.6-5.5-3.5-10.8-12-13.1Z" />
            </svg>
        </span>
    `;
    $(data.next.container).find('.txt.svg-text').prepend(svgK);
}


export default initAppendHTML;