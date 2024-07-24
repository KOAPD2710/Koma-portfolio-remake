import $ from "jquery";


const initTheme = () => {
    const toggleBtn = $('.header-navi-toggle')

    const toggleFunc = (theme) => {
        localStorage.setItem('mode-theme', theme == 'dark' ? 'darkMode' : 'lightMode');

        $('html').attr('data-theme', theme == 'dark' ? 'darkMode' : 'lightMode')
        toggleBtn.removeClass(theme == 'dark' ? 'isLight' : 'isDark')
        toggleBtn.addClass(theme == 'dark' ? 'isDark' : 'isLight')
    }

    const toggleModeTheme = (theme) => {
        let mode = localStorage.getItem('mode-theme');

        switch (mode) {
            case 'darkMode':
                toggleFunc('light')
                break;

            case 'lightMode':
                toggleFunc('dark')
                break;
            default:
                break;
        }
    }


    const checkModeTheme = () => {
        let mode = localStorage.getItem('mode-theme');

        switch (mode) {
            case null:
                let prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;

                if (prefersDarkMode === true) {
                    toggleFunc('dark')
                } else {
                    toggleFunc('light')
                }
                break;
            case 'darkMode':
                toggleFunc('dark')
                break;
            case 'lightMode':
                toggleFunc('light')
                break;
        }
    }
    checkModeTheme()

    toggleBtn.on('click', (e) => {
        e.preventDefault()
        toggleModeTheme()

        let mode = localStorage.getItem('mode-theme');
        console.log(mode);
    })
}

export { initTheme }
