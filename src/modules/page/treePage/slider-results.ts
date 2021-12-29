import './slider-results.scss';
import {Slider} from '../../classes/classes';

const containerSlider:HTMLDivElement = document.querySelector('.container-custom-slider');
const overlaySlider:HTMLDivElement = document.querySelector('.overlay');
const closedSlider = overlaySlider.querySelector('span');
const sliderTree = new Slider('.button-custom-slider','.item-custom-slider', '.wrapper-custom-slider', '.container-custom-slider' )


export function createSliderItem(array:string[]) {
    sliderTree.remove();
    array.forEach(item => {
        sliderTree.createItemSlide(item)
    })
    sliderTree.init()
}

export function showModalSlider() {
    overlaySlider.style.left  = '50%'
}

function closedModalSlider() {
    overlaySlider.style.left  = '1000%'
}

containerSlider.addEventListener('click', (event) => {
    const target:HTMLDivElement = event.target as HTMLDivElement;
    if(target.classList.contains('container-slider-results')) {
        containerSlider.style.display = 'none'
    }
})
closedSlider.addEventListener('click', closedModalSlider)
overlaySlider.addEventListener('click', closedModalSlider )