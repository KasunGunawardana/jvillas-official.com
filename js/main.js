// develop by: Kasun Gunawardana
// kasun4it@gmail.com

const loadingScreen = document.querySelector('.loading-screen');
const mainNavigation = document.querySelector('.main-navigation');
const mediaLinks = document.querySelectorAll('.media-container a');
const backgroundScale = document.querySelector('.bg-container');
const mainHeading = document.querySelectorAll('.main-heading .heading-wrapper');
const mainHeadingLink = document.querySelector('.main-heading a');
const scrollIcon = document.querySelector('.scroll-icon');
const scrollFontIcon = document.querySelector('.scroll-wrapper .fas');
const scrollIconDesc = document.querySelectorAll('.scroll-icon-desc');
const footer = document.querySelector('footer');

function pageTransitionIn() {

  return gsap

    .to(loadingScreen, { duration: .5, scaleY: 1, transformOrigin: 'bottom left'})
}

function pageTransitionOut(container) {

  return gsap
    .timeline({ delay: 1 })
    .add('start')
    .to(loadingScreen, {
      duration: 0.5,
      scaleY: 0,
      skewX: 0,
      transformOrigin: 'top left',
      ease: 'power1.out'
    }, 'start')
    .call(contentAnimation, [container], 'start')
}
function contentAnimation(container) {
  $(container.querySelectorAll('.orange-heading-bg')[0]).addClass('show');
  setTimeout(() => {
    $(container.querySelectorAll('.orange-heading-bg')[1]).addClass('show');
    $(container.querySelectorAll('.orange-heading-bg')[2]).addClass('show');
  }, 1000);
  return gsap
    .timeline()
    .from(container.querySelector('.is-animated'), {
      duration: 0.5,
      translateY: 10,
      opacity: 0,
      stagger: 0.4
    })
    .from(mainNavigation, { duration: .5, translateY: -10, opacity: 0})
    .from(footer, { duration: .5, translateY: 10, opacity: 0})
    .from(mainHeading[0], { duration: .5, translateX: 30, opacity: 0})
    .from(mainHeading[1], { duration: .5, translateX: -30, opacity: 0})
    .from(mainHeadingLink, { duration: .5, translateY: -30, opacity: 0})
    .from(mediaLinks[0], { duration: .5, translateY: 10, opacity: 0})
    .from(mediaLinks[1], { duration: .5, translateY: 10, opacity: 0})
    .from(mediaLinks[2], { duration: .5, translateY: 10, opacity: 0})
    .from(mediaLinks[3], { duration: .5, translateY: 10, opacity: 0})
    .from(scrollIcon, { duration: .5, translateY: 10, opacity: 0})
    .from(scrollFontIcon, { duration: .5, translateY: 10, opacity: 0})
    .from(scrollIconDesc, { duration: .5, translateY: -10, opacity: 0})
    .from(backgroundScale.classList.add('scale'))
}

function loadContent() {
  var scrollContent = document.querySelector('.hero');
var contentDiv = document.querySelector('#contentDiv');
function openContent() {
  if(document.querySelector('#contentDiv')) {
    document.querySelector('#contentDiv').classList.add('open');
  }
}

window.onload = scrollContent.addEventListener('wheel', function(event)
{
  if (event.deltaY > 0)
 {
  openContent();
 }
});

scrollContent.addEventListener("touchend", function(event)
{
  if (event.deltaY > 0)
 {
  openContent();
 }
});
}

loadContent();

$(window).on('load', function() {
  document.getElementById('signature').classList.add('svg-animate');
  setTimeout(() => {
    beginAnimation();
  }, 3000);
});


function beginAnimation() {

    $('.images-preloader').fadeOut();
    $(function() {
      barba.init({
        transitions: [{
    
          async leave(data) {
    
    
            await pageTransitionIn();

            loadContent();
    
            data.current.container.remove();
          },
    
          async enter(data) {
            await pageTransitionOut(data.next.container);
          },
    
          async once(data) {
            await contentAnimation(data.next.container);
          }
        }]
      });
    
    });
}


