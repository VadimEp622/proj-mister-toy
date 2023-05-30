export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomColor,
    padNum,
    getDayName,
    getMonthName,
    getRandomPastYearTimestamp,
    debounce,
    formatTime
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

function getRandomPastYearTimestamp() {
    const now = Date.now() // Get the current timestamp
    const maxOffset = 1000 * 60 * 60 * 24 * 365 // Maximum offset of 1 year (in milliseconds)
    const randomOffset = Math.floor(Math.random() * maxOffset) // Generate a random offset between 0 and maxOffset
    const pastTimestamp = now - randomOffset // Add the offset to the current timestamp to get a past timestamp
    return pastTimestamp
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function formatTime(time) {
    let now = Date.now()
    let diff = now - time

    const SECOND = 1000
    const MINUTE = SECOND * 60
    const HOUR = MINUTE * 60
    const DAY = HOUR * 24
    const WEEK = DAY * 7
    const MONTH = DAY * 30
    const YEAR = DAY * 365

    if (diff < MINUTE) return 'Just now'
    if (diff < MINUTE * 5) return 'A few minutes ago'
    if (diff < HOUR) return 'Less than a hour ago'
    if (diff < HOUR * 3) return 'Couple of hours ago'
    if (diff < DAY) return 'Earlier Today'
    if (diff < DAY * 2) return 'Yesterday'
    if (diff < DAY * 3) return '2 days ago'
    if (diff < WEEK) return 'About a week ago'

    return _getFormattedTime(time)
}

function _getFormattedTime(t) {
    var d = new Date(t)
    var str = 'At ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' +
        d.getFullYear() + ' Time: ' + d.getHours() + ':' + d.getMinutes()
    return str
}
