import domtoimage from 'dom-to-image';
import {createSliderItem, showModalSlider} from './slider-results';
import './slider-results.scss';


const node = document.querySelector('.js_tree_block'),
 convertToJpegBtn = document.querySelector('.js_tree__save'),
 treeResultList = document.querySelector('.js_tree_result_list');
export const arrayImg:string[] = [];

let flag = true;
 


function getImageJpeg() {
    domtoimage.toJpeg(node)
    .then(function (dataUrl) {
        if(flag) {
            flag = false;
            treeResultList.innerHTML = ''; 
        }
        const img = new Image();
        img.src = dataUrl;
        arrayImg.push(dataUrl);
        const liResult = document.createElement('li');
        liResult.classList.add('tree-result__item');
        liResult.append(img);
        liResult.addEventListener('click', showModalSlider)
        treeResultList.append(liResult);
        createSliderItem(arrayImg)
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
}
convertToJpegBtn.addEventListener('click', getImageJpeg)