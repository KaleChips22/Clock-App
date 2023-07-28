let clock = document.getElementById('clock')

function startTime() {
    let today = new Date(),
        h = today.getHours(),
        m = today.getMinutes(),
        s = today.getSeconds()
    h = checkTime(h)
    m = checkTime(m)
    s = checkTime(s)
	if (dispType == 12) {
		let ampm = h >= 12 ? 'PM' : 'AM'

		h = h > 12 ? h - 12 : (h == '00' ? 12 : h)
	}
    clock.innerHTML = `${h}:${m}${seconds ? `${s}` : ''}${dispType == 12 ? ` ${ampm}` : ''}`
	let t = setTimeout(startTime, 500)
}

function checkTime(i) {
	return i < 10 ? '0' + i : i
}

let seconds = true,
	dispType = 12
startTime()

function hideSeconds() {
    seconds = !seconds
    document.getElementById('hide').innerHTML = `${seconds ? 'Hide' : 'Show'} Seconds`
    pref('show-seconds',  seconds ? 'true' : 'false')
}

function time24hour() {
    dispType = (dispType == 24 ? 12 : 24)
    document.getElementById('disptype').dataset.selected = (dispType == 24)
    pref('disp-type', dispType)
}

function pref(id, value = null) {
    if (value == null) return getP(`preferences-${id}`)
    
    // if there is a value to set
	return window.localStorage.setItem(`preferences-${id}`, value)
}

function getP(cname) {
    let c = window.localStorage.getItem(cname) || return ''
    if (isNaN(parseInt(c))) return c
    return parseInt(c)
}

seconds = pref('show-seconds') == 'false' ? false : true
dispType = pref('dips-type')
document.getElementById('hide-seconds').innerHTML = `${seconds ? 'Hide' : 'Show'} Seconds`
let lightTheme = pref('light-theme') == 'true' ? true : false
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
    pref('light-theme',  document.body.classList.contains('light') ? 'true' : 'false')
}