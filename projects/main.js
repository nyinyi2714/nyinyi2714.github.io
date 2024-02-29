const prevBtnAndChildren = document.querySelectorAll("#prev, #prev *");
const nextBtnAndChildren = document.querySelectorAll("#next, #next *");

const navigationBtns = [...prevBtnAndChildren, ...nextBtnAndChildren];

const carousel = document.getElementById("carousel");
const carouselItems = document.querySelectorAll(".carousel > img");

let currentImgIndex = 0;
let maxImgIndex = carouselItems.length - 1;
let isAnimating = false;


function navigateCarousel(e) {
  if (isAnimating) return; // Ignore clicks during animation
  isAnimating = true;
  navigationBtns.forEach(btn => btn.disabled = true);

  const currBtnAction = e.target.dataset["action"];

  if (currBtnAction === "prev") {
    currentImgIndex = (currentImgIndex > 0) ? currentImgIndex - 1 : maxImgIndex;
  } else if (currBtnAction === "next") {
    currentImgIndex = (currentImgIndex < maxImgIndex) ? currentImgIndex + 1 : 0;
  }

  let translateXValue = -currentImgIndex * 100;

  carousel.style.transform = `translateX(${translateXValue}%)`;

  // Set a timeout to reset the flag after the animation duration
  setTimeout(() => {
    isAnimating = false;
    navigationBtns.forEach(btn => btn.disabled = false);

  }, 500); // transition duration is 500ms
}

navigationBtns.forEach(btn => btn.addEventListener('click', navigateCarousel));

const demoVideo = document.getElementById("demo-video");
const videoPlayBtn = document.getElementById('video-play-btn');
const playIcon = document.getElementById("play-icon");

const playSvgPath = "M7 6v12l10-6z";
const pauseSvgPath = "M8 7h3v10H8zm5 0h3v10h-3z"
let timerRef;

const hidePlayBtn = () => {
  videoPlayBtn.classList.remove("full-opacity");
};

const displayPlayBtn = () => {
  videoPlayBtn.classList.add("full-opacity");
  if(timerRef) clearTimeout(timerRef);
  timerRef = setTimeout(hidePlayBtn, 1500); // hide play button after 1.5 sec of displaying
};

demoVideo?.addEventListener('mouseenter', displayPlayBtn);
demoVideo?.addEventListener('mousemove', displayPlayBtn);
demoVideo?.addEventListener('ended', () => {
  videoPlayBtn.classList.add("full-opacity");
  playIcon.setAttribute('d', playSvgPath);
});

videoPlayBtn?.addEventListener('click', () => {
  if (demoVideo.paused) {
    demoVideo.play();
    playIcon.setAttribute('d', pauseSvgPath);
  } else {
    demoVideo.pause();
    playIcon.setAttribute('d', playSvgPath);
  }
});