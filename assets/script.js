const preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const mode = document.getElementById('mode');

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

mode.addEventListener('click', ()  => {
    let switchToTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    setTheme(switchToTheme);
});

setTheme(localStorage.getItem('theme') || preferedColorScheme);

const flagsElement = document.getElementById("flags");
const textsToChange  = document.querySelectorAll("[data-section]");
const changeLanguage = async (language) => {
    const requestJson = await fetch(`../languages/${language}.json`);
    const texts = await requestJson.json();

    for (const textsToChange of textsToChange) {
        const section = textsToChange.dataset.section;
        const value = textsToChange.dataset.value;

        textsToChange.innerHTML=texts[section][value];
    }
};

flagsElement.addEventListener("click",(e)=> {
    changeLanguage(e.target.parentElement.dataset.language);
});


var typed = new Typed(".multiple-text",{
    strings:["Frontend Developer","Frontend Developer"], 
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
})

const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider__section");
let sliderSectionLast = sliderSection[sliderSection.length - 1];
let carousel;

const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector("#btn-right");

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function Next(){
    let sliderSectionFirst = document.querySelectorAll(".slider__section")[0];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('beforeend', sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 500);
}

function Prev(){
    let sliderSection = document.querySelectorAll(".slider__section");
    let sliderSectionLast = sliderSection[sliderSection.length - 1];
    slider.style.marginLeft = "0";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('afterbegin', sliderSectionLast);
        slider.style.marginLeft = "-100%";
    }, 500);
}

btnRight.addEventListener('click', function(){
    Next();
    clearInterval(carousel);
    carousel = setInterval(function(){
        Next();
    },5000);

});
btnLeft.addEventListener('click', function(){
    Prev();
    clearInterval(carousel);
    carousel = setInterval(function(){
        Next();
    },5000);
});

carousel = setInterval(function(){
    Next();
},5000);