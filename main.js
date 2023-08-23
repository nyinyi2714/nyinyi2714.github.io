//Adding box-shadow for nav bar using Intersection Observer

const nav = document.querySelector("nav")
const secHero = document.querySelector(".hero")

navObserver = new IntersectionObserver(entries => {
    if(!entries[0].isIntersecting) {
        nav.classList.add("box_shadow")
    } else {
        nav.classList.remove("box_shadow")
    }
}, {threshold: .8})

navObserver.observe(secHero)


//Highlighting nav items that the user is currently viewing

const allSections = document.querySelectorAll("section")
const desktopNavItems = document.querySelectorAll(".desktop_nav_item") 

sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(!entry.isIntersecting) return
        desktopNavItems.forEach(item => {
            if(entry.target.id == item.getAttribute("name")) {
                item.classList.add("active")
                return
            }
            item.classList.remove("active")
        })
        
    })
}, {rootMargin: "-50% 0px -50% 0px", threshold: 0})

allSections.forEach(section => sectionObserver.observe(section))


//Lazy loading for the sections
const slideIns = document.querySelectorAll(".slide-in")

slideInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting) return
        entry.target.classList.add("active")
        observer.unobserve(entry.target)
    })
}, {rootMargin: "0px 0px -20% 0px"})

slideIns.forEach(item => slideInObserver.observe(item))

//Animating the page loading
const timeline = gsap.timeline({defaults: {duration: .4} })
timeline
    .fromTo(".logo", {opacity: 0, y: "-100%"}, {opacity: 1, y: 0, ease: "back.out(3)", duration: .6})
    .to(".name", {textShadow: "0 0 10px", duration: 1})
    .fromTo(".hero > *", {opacity: 0, y: "40%"}, {opacity: 1, y: 0, stagger: .2}, "<")
    .fromTo(".desktop_nav > *", {opacity: 0, y: "-100%"}, {opacity: 1, y: 0, stagger: .1}, "nav-=1")
    .fromTo(".burger_menu", {opacity: 0, y: "-100%"}, {opacity: 1, y: 0}, "nav-=1")
    .fromTo(".side_content_left", {opacity: 0}, {opacity: 1}, "side")
    .fromTo(".side_content_right", {opacity: 0}, {opacity: 1}, "side-=.1")


//Handle the burger menu
const burgerMenu = document.querySelector(".burger_menu")
const extendedMenu = document.querySelector(".extended_menu")
const barArr = document.querySelectorAll(".burger_menu > div")
const main = document.querySelector("main")
const mobileNavItems = document.querySelectorAll(".extended_menu a")

burgerMenu.addEventListener("click", () => {
    burgerMenu.dataset.close == "true" ? openMobileNav() : closeMobileNav()
})

mobileNavItems.forEach(item => item.addEventListener("click", closeMobileNav))

const burgerMenuTimeline = gsap.timeline({defaults: {duration: .1}, paused: true })
burgerMenuTimeline
.to(barArr[0], {duration: .05, y:"10px"}, "combine")
.to(barArr[2], {duration: .05, y:"-10px"}, "combine")
.to(barArr[2], {opacity: "0"})
.to(barArr[1], {duration: 0, width: "40px"})
.to(barArr[1], {rotation: "45"}, "rotate")
.to(barArr[0], {rotation: "135"}, "rotate")
.to(extendedMenu, {duration: .05, x:0}, "<")

function openMobileNav() {
    burgerMenuTimeline.play()
    burgerMenu.dataset.close = "false"
    main.classList.add("blur")
}

function closeMobileNav() {
    burgerMenuTimeline.reverse()
    burgerMenu.dataset.close = "true"
    main.classList.remove("blur")
}

