let clock = document.getElementById('clock')

function startTime() {
    let today = new Date(),
        h = today.getHours(),
        m = today.getMinutes(),
        s = today.getSeconds()
    h = checkTime(h)
    m = checkTime(m)
    s = checkTime(s)

    let ampm = h >= 12 ? 'PM' : 'AM'

    h = h > 12 ? h - 12 : (h == '00' ? 12 : h)
    clock.innerHTML = `${h}:${m}${seconds ? `:${s}` : ''} ${ampm}`

    let t = setTimeout(startTime, 500)
}

function checkTime(i) {
    return i < 10 ? '0' + i : i
}

let seconds = true
startTime()

function hideSeconds() {
    seconds = !seconds
    document.getElementById('hide').innerHTML = `${seconds ? 'Hide' : 'Show'} Seconds`
    window.localStorage.setItem('preferences-show-seconds',  seconds ? 'true' : 'false')
}

function getP(cname) {
    return window.localStorage.getItem(cname) || ''
}

seconds = getP('preferences-show-seconds') == 'false' ? false : true
document.getElementById('hide-seconds').innerHTML = `${seconds ? 'Hide' : 'Show'} Seconds`
let lightTheme = getP('preferences-light-theme') == 'true' ? true : false
if (lightTheme)
    document.body.classList.add('light')


document.getElementById('theme-swap').onclick = () => {
    swapThemes()
}

function swapThemes() {
    if (document.body.classList.contains('light')) {
        document.body.classList.remove('light')
    } else {
        document.body.classList.add('light')
    }
    window.localStorage.setItem('preferences-light-theme',  document.body.classList.contains('light') ? 'true' : 'false')
}