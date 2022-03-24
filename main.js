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
timeline.fromTo('.logo', {opacity: 0, y: '-100%'}, {duration: .5, opacity: 1, y: 0})
timeline.fromTo('.desktop_nav > *', {opacity: 0, y: '-100%'}, {opacity: 1, y: 0, stagger: .1})
timeline.fromTo('.burger_menu', {opacity: 0, y: '-100%'}, {opacity: 1, y: 0}, '<')
timeline.fromTo('.hero > *', {opacity: 0, y: '40%'}, {opacity: 1, y: 0, stagger: .1})
timeline.fromTo('.side_content', {opacity: 0}, {opacity: 1,})




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

function openMobileNav() {
    burgerMenuAnimation.open();
    burgerMenu.dataset.close = 'false';
    main.classList.add('blur');
}

function closeMobileNav() {
    burgerMenuAnimation.close();
    burgerMenu.dataset.close = 'true';
    main.classList.remove('blur');
}

const burgerMenuAnimation = {
    tl: gsap.timeline({defaults: {duration: .1} }),
    firstTime: true,
    open() {
        if(this.firstTime) {
            this.tl.to(barArr[0], {y:'10px'})
            this.tl.to(barArr[2], {y:'-10px'}, '<')
            this.tl.to(barArr[2], {opacity: '0'})
            this.tl.to(barArr[1], {width: '40px'}, '<')
            this.tl.to(barArr[1], {rotation: '45'})
            this.tl.to(barArr[0], {rotation: '135'}, '<')
            this.tl.to(extendedMenu, {duration: .05, x:0} , '<')
            this.firstTime = false;
        } else {
            this.tl.play();
        } 
    },
    close() {
        this.tl.reverse();
    }
}