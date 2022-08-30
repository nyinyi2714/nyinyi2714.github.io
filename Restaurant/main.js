
// Gallery next and back buttons

const nextBtn = document.getElementById('next')
const backBtn = document.getElementById('back')
const gallery = document.getElementById('gallery')

let num = 1

nextBtn.addEventListener('click', () => {
    if (nextBtn.dataset.value === 'false') return

    disableButtons()
    if (num >= 5) num = 0
    gallery.style.backgroundImage = `url('./Images/foodphoto${++num}.avif')`
    setTimeout(enableButtons, 900)
})

backBtn.addEventListener('click', () => {
    if (backBtn.dataset.value === 'false') return

    disableButtons()
    if (num <= 1) num = 6
    gallery.style.backgroundImage = `url('./Images/foodphoto${--num}.avif')`
    setTimeout(enableButtons, 900)
})

function disableButtons() {
    nextBtn.dataset.value = 'false'
    backBtn.dataset.value = 'false'
}

function enableButtons() {
    nextBtn.dataset.value = 'true'
    backBtn.dataset.value = 'true'
}

// Change theme of the banner when gallery is no longer intersecting

const banner = document.getElementById('banner')
const logo = document.getElementById('logo')

const galleryObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            banner.classList.remove('red')
            logo.src = "./Images/white logo.png"
        } else {
            banner.classList.add('red')
            logo.src = "./Images/red logo.png"
        }

    })
}, { threshold: .97 })

// If it is mobile nav, disable the change of the banner theme
if (window.innerWidth >= 680) galleryObserver.observe(gallery)

// If user resize the widow, decide whether to disable or enable the change of the banner theme
window.addEventListener('resize', () => {
    if (window.innerWidth >= 680) {
        galleryObserver.observe(gallery)
        logo.src = "./Images/white logo.png"
    } else {
        galleryObserver.unobserve(gallery)
        logo.src = "./Images/red logo.png"
    }
})


// Mobile Nav burger menu animation

const mobileNavTimeline = gsap.timeline({ defaults: { duration: .3 }, paused: true })
mobileNavTimeline
    .to('#bar-2', { y: '100%', opacity: 0 }, 'burger')
    .to('#bar-1', { rotate: '45deg', y: '8px', x: '1px' }, 'burger')
    .to('#bar-3', { rotate: '-45deg', y: '-8px', x: '-1px' }, 'burger')
    .to('#mobile-nav', { y: '0', duration: .5 }, 'burger')

const burger = document.getElementById('burger')
const mobileNav = document.getElementById('mobile-nav')
let mobileNavOpened = false
burger.addEventListener('click', () => {
    if (mobileNavOpened) {
        mobileNavTimeline.play()
    } else {
        mobileNavTimeline.reverse()
    }
    mobileNavOpened = !mobileNavOpened
})


// Email Signup Popup

const emailBtn = document.getElementById('email-signup')
const emailClosedBtn = document.getElementById('email-close-btn')
const emailFormContainer = document.getElementById('email-form-container')
const emailForm = document.getElementById('email-form')

emailBtn.addEventListener('click', () => {
    emailFormTimeline.play()
})

emailClosedBtn.addEventListener('click', () => {
    emailFormTimeline.reverse()
})

const emailFormTimeline = gsap.timeline({ defaults: { duration: .5 }, paused: true })
emailFormTimeline
    .to('#email-form-container', { y: 0, duration: 0 })
    .to('#email-form-container', { opacity: 1 }, 'email')
    .to('#email-form', { opacity: 1 }, 'email')


const formFields = document.querySelectorAll('#email-form input[type="text"]')

formFields.forEach(field => {
    field.addEventListener('keyup', (obj) => {

        let currentField = document.getElementById(obj.target.id)
        let currentLabel = document.getElementById('label-' + obj.target.id)

        if (currentField.value.length > 0) {
            currentLabel.style.opacity = 1
            currentLabel.style.transform = 'translateY(0)'
        }
        else {
            currentLabel.style.opacity = 0
            currentLabel.style.transform = 'translateY(50%)'
        }

    })
})




