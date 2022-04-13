//Adding box-shadow for nav using Intersection Observer

const nav = document.querySelector('nav');
const secHero = document.querySelector('.hero');

navObserver = new IntersectionObserver(entries => {
    if(!entries[0].isIntersecting) {
        nav.classList.add('box_shadow');
    } else {
        nav.classList.remove('box_shadow');
    }
}, {threshold: .8});

navObserver.observe(secHero);


//Highlighting nav items that the user is currently viewing

const allSections = document.querySelectorAll('section');
const desktopNavItems = document.querySelectorAll('.desktop_nav_item') 

sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        desktopNavItems.forEach(item => {
            if(entry.target.id == item.getAttribute('name')) {
                item.classList.add('active');
                return;
            }
            item.classList.remove('active');
        });
        
    })
}, {rootMargin: "-50% 0px -50% 0px", threshold: 0})

allSections.forEach(section => sectionObserver.observe(section));


//Lazy loading for the sections
const slideIns = document.querySelectorAll('.slide-in');

slideInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    })
}, {rootMargin: '0px 0px -30% 0px'});

slideIns.forEach(item => slideInObserver.observe(item));


//Lazy loading for the skill meterbars
const meterbars = document.querySelectorAll('.meterbar');

meterbarObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        entry.target.classList.add('fill');
        observer.unobserve(entry.target);
    })
}, {rootMargin: '0px 0px -10% 0px'});

meterbars.forEach(bar => meterbarObserver.observe(bar));



//Animating the page loading
const timeline = gsap.timeline({defaults: {duration: .4} });
timeline
    .fromTo('.logo_cover', {scale: 1, rotation: 0}, {scale: 0, rotation: 270, duration: 1.1})
    .fromTo('.name', {}, {textShadow: "0 0 10px", fontWeight: 'bold', duration: .2})
    .fromTo('.desktop_nav > *', {opacity: 0, y: '-100%'}, {opacity: 1, y: 0, stagger: .1})
    .fromTo('.burger_menu', {opacity: 0, y: '-100%'}, {opacity: 1, y: 0}, '<')
    .fromTo('.hero > *', {opacity: 0, y: '40%'}, {opacity: 1, y: 0, stagger: .1})
    .fromTo('.side_content', {opacity: 0}, {opacity: 1,})



//Handle the burger menu
const burgerMenu = document.querySelector('.burger_menu');
const extendedMenu = document.querySelector('.extended_menu');
const barArr = document.querySelectorAll('.burger_menu > div');
const main = document.querySelector('main');
const mobileNavItems = document.querySelectorAll('.extended_menu a');

burgerMenu.addEventListener('click', () => {
    burgerMenu.dataset.close == 'true' ? openMobileNav() : closeMobileNav();
})

mobileNavItems.forEach(item => item.addEventListener('click', closeMobileNav))

const burgerMenuTimeline = gsap.timeline({defaults: {duration: .1, ease: Power1.easeOut}, paused: true });
burgerMenuTimeline
.to(barArr[0], {duration: .05, y:'10px'}, 'combine')
.to(barArr[2], {duration: .05, y:'-10px'}, 'combine')
.to(barArr[2], {opacity: '0'})
.to(barArr[1], {duration: 0, width: '40px'})
.to(barArr[1], {rotation: '45'}, 'rotate')
.to(barArr[0], {rotation: '135'}, 'rotate')
.to(extendedMenu, {duration: .05, x:0}, '<');

function openMobileNav() {
    burgerMenuTimeline.play();
    burgerMenu.dataset.close = 'false';
    main.classList.add('blur');
}

function closeMobileNav() {
    burgerMenuTimeline.reverse();
    burgerMenu.dataset.close = 'true';
    main.classList.remove('blur');
}

// Handle the project filter 
const bubbles = document.querySelectorAll('.bubble')
const projectItems = document.querySelectorAll('.project_item')
const projectsContainer = document.querySelector('.projects_container')
let filter = []
let removedItems = []

bubbles.forEach(bubble => {
    bubble.addEventListener('click', e => {

        const value = e.target.getAttribute('value')

        // Check if the bubble is selected
        let isSelected = e.target.classList.contains('selected')

        // If the bubble is not selected yet, add it to the filter
        if(!isSelected) {
            filter.push(value)
        } 

        // If the bubble is already selected, remove from the filter
        else {
            filter = filter.filter(item => item != value)
        }

        // Toggle selected class
        e.target.classList.toggle('selected')

        // If the filter arr is empty, show all items and return
        if(filter.length <= 0) {
            projectItems.forEach(item => {
                item.classList.remove('hide')
            })
            return
        }

        // Filter the project items
        projectItems.forEach((item) => {
            if(filter.includes(item.getAttribute('value'))) {
                item.classList.remove('hide')
            } else {
                item.classList.add('hide')
                item.classList.add('show')
            }
        })

    })
})

