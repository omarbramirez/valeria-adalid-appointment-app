'use strict';

/*MAIN SLIDER SECTION*/

const slider = document.querySelector(`.main-slider`);
const sliders = document.getElementsByClassName(`main-slider`);
// let sliderDestination = document.querySelector(`.services`);
const _sliderHeight = document.querySelector('.slider');
const sliderNav = document.querySelector('.nav-sliders');
const dots = document.getElementsByClassName(`dot`);
const sliderDots = document.getElementsByClassName(`slider_dot`);
let counter = 1;


const activeState = (selectors, selection)=>{
    for (var i = 0, len = selectors.length; i < len; i++) {
            selectors[i].classList.remove ('active')};
            selection.classList.add('active');
    }

const autoHeight = (ht1, ht2, heightFix)=>{
    ht1.style.height= `${ht2.offsetHeight - 35 + heightFix}px`;
    window.addEventListener('load', function(){
    ht1.style.height= `${ht2.offsetHeight - 35 + heightFix}px`;
    });
    window.addEventListener('resize', function(){
    ht1.style.height= `${ht2.offsetHeight - 35 + heightFix}px`;
    });
};

const dotActiveState = function(d,s1,s2){    
    let _destination = ' ';
    let destination = ' ';
    if(d.target.classList.contains('dot')){
       _destination = d.target.classList.toString().split(' ')[2];
       destination = document.querySelector(`.${_destination}`);
        activeState(s1,d.target);
        activeState(s2, destination)
    };
};

if(sliderNav){
sliderNav.addEventListener('click', (e)=>{
    dotActiveState(e, sliderDots, sliders);
})
autoHeight(_sliderHeight, slider,0);

setInterval(function(){
    const sections = ['services', 'aboutme', 'products'];
    let activeDot = document.getElementsByClassName(`dot slider_dot ${sections[counter]}`)[0];
    let activeSlide = document.querySelector(`.${sections[counter]}`);
    activeState(sliderDots, activeDot);
    activeState(sliders, activeSlide);
    counter < 2 ? ++counter : counter = 0;
}, 7000);
};


/*MAIN SLIDER SECTION: WHATSAPP FLOATING ICON ELEMENT*/

let socialFloat = document.querySelector('#floating_icon');
let footer = document.querySelector('#footer');

const checkOffset = () => {
    function getRectTop(el){
      var rect = el.getBoundingClientRect();
      return rect.top;
    }
    if((getRectTop(socialFloat) + document.body.scrollTop) + socialFloat.offsetHeight >= (getRectTop(footer) + document.body.scrollTop) - 15 )
      socialFloat.style.display = 'none';
    if(document.body.scrollTop + window.innerHeight < (getRectTop(footer) + document.body.scrollTop))
      socialFloat.style.display = 'flex'; // restore when you scroll up
    
  }
if(socialFloat){
document.addEventListener("scroll", function(){
    checkOffset();
  });
}


/*REVIEWS SLIDER SECTION*/

const reviews = document.querySelector('.reviews');
let user = document.querySelector('.review-1');
const _users = document.getElementsByClassName(`users`);
const reviewsNav = document.querySelector('.nav-reviews');
const reviewDots = document.getElementsByClassName(`review_dot`);

if(reviewsNav){
reviewsNav.addEventListener('click', (e)=>{
        dotActiveState(e, reviewDots, _users);
        let _user = e.target.classList.toString().split(' ')[2];
        user = document.querySelector(`.${_user}`);    

        reviews.style.height= `${user.offsetHeight}px`;
    });

autoHeight(reviews, user, 35);
};

/*BEFORE AFTER SECTION*/
const proofs = document.querySelector('.proofs');
let proof = document.querySelector('.proof-1');
const _proofs = document.getElementsByClassName(`proof`);
const proofNav = document.querySelector('.nav-proofs');
const proofDots = document.getElementsByClassName(`proof_dot`);

if(proofNav){
proofNav.addEventListener('click', (e)=>{
    dotActiveState(e, proofDots, _proofs);
    let _proof = e.target.classList.toString().split(' ')[2];
    proof = document.querySelector(`.${_proof}`);    

    proofs.style.height= `${proof.offsetHeight}px`;
});
autoHeight(proofs, proof, 35);
};