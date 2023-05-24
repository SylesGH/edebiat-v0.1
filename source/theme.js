function randomTheme() {
    setTheme(Math.floor(Math.random() * 10))
}

var local = parseInt(localStorage.getItem('theme'))

// Local storage themes
function setTheme(themeIndex) {
    local = parseInt(localStorage.getItem('theme'))
    var localTheme = themeIndex || parseInt(localStorage.getItem('theme'))
    switch (localTheme) {
        case 1:
            secondTheme()
            break;
        case 2:
            thirdTheme()
            break;
        case 3:
            fourthTheme()
            break;
        case 4:
            fifthTheme()
            break;
        case 5:
            sixthTheme()
            break;
        case 6:
            seventhTheme()
            break;
        case 7:
            eigthTheme()
            break;
        case 8:
            ninethTheme()
            break;
        case 9:
            tenthTheme()
            break;
        default:
            defaultTheme()
            break;
    }
}

async function orderTheme() {
    setTheme(10)
    for (let i = 0; i < 10; i++) {
        setTheme(i)
        await new Promise(orderTheme => setTimeout(orderTheme, 700));
        console.log(i);
    }
    setTheme(10)
}

function defaultTheme() {
    document.documentElement.style.setProperty('--color-1', '#8D7B68')
    document.documentElement.style.setProperty('--color-2', '#A4907C')
    document.documentElement.style.setProperty('--color-3', '#C8B6A6')
    document.documentElement.style.setProperty('--color-4', '#F1DEC9')
    localStorage.setItem('theme', "0")
}

function secondTheme() {
    document.documentElement.style.setProperty('--color-1', '#874356')
    document.documentElement.style.setProperty('--color-2', '#C65D7B')
    document.documentElement.style.setProperty('--color-3', '#F68989')
    document.documentElement.style.setProperty('--color-4', '#F6E7D8')
    localStorage.setItem('theme', "1")
}

function thirdTheme() {
    document.documentElement.style.setProperty('--color-1', '#4E4E6A')
    document.documentElement.style.setProperty('--color-2', '#1F6CB0')
    document.documentElement.style.setProperty('--color-3', '#70A3C4')
    document.documentElement.style.setProperty('--color-4', '#E7E8F5')
    localStorage.setItem('theme', "2")
}

function fourthTheme() {
    document.documentElement.style.setProperty('--color-1', '#6886C5')
    document.documentElement.style.setProperty('--color-2', '#FFACB7')
    document.documentElement.style.setProperty('--color-3', '#FFE0AC')
    document.documentElement.style.setProperty('--color-4', '#F9F9F9')
    localStorage.setItem('theme', "3")
}

function fifthTheme() {
    document.documentElement.style.setProperty('--color-1', '#40513B')
    document.documentElement.style.setProperty('--color-2', '#609966')
    document.documentElement.style.setProperty('--color-3', '#9DC08B')
    document.documentElement.style.setProperty('--color-4', '#EDF1D6')
    localStorage.setItem('theme', "4")
}

function sixthTheme() {
    document.documentElement.style.setProperty('--color-1', '#2C3333')
    document.documentElement.style.setProperty('--color-2', '#2E4F4F')
    document.documentElement.style.setProperty('--color-3', '#0E8388')
    document.documentElement.style.setProperty('--color-4', '#CBE4DE')
    localStorage.setItem('theme', "5")
}

function seventhTheme() {
    document.documentElement.style.setProperty('--color-1', '#191825')
    document.documentElement.style.setProperty('--color-2', '#865DFF')
    document.documentElement.style.setProperty('--color-3', '#E384FF')
    document.documentElement.style.setProperty('--color-4', '#FFA3FD')
    localStorage.setItem('theme', "6")
}

function eigthTheme() {
    document.documentElement.style.setProperty('--color-1', '#7A3E65')
    document.documentElement.style.setProperty('--color-2', '#A84448')
    document.documentElement.style.setProperty('--color-3', '#E9A178')
    document.documentElement.style.setProperty('--color-4', '#F6E1C3')
    localStorage.setItem('theme', "7")
}

function ninethTheme() {
    document.documentElement.style.setProperty('--color-1', '#AA77FF')
    document.documentElement.style.setProperty('--color-2', '#62CDFF')
    document.documentElement.style.setProperty('--color-3', '#97DEFF')
    document.documentElement.style.setProperty('--color-4', '#C9EEFF')
    localStorage.setItem('theme', "8")
}

function tenthTheme() {
    document.documentElement.style.setProperty('--color-1', '#292929')
    document.documentElement.style.setProperty('--color-2', '#525252')
    document.documentElement.style.setProperty('--color-3', '#8c8c8c')
    document.documentElement.style.setProperty('--color-4', '#d1d1d1')
    localStorage.setItem('theme', "9")
}