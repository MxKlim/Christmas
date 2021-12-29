import {removeClassActive} from './choice-tree';

const backgroundContainer = document.querySelector('.js_bg__choice');
const treeContainerBg:HTMLDivElement = document.querySelector('.js_tree_block');
const arrayBackgroundElements = Array.from(document.querySelectorAll('.bg-choice__item'));

function setBackground(event:Event) {
    removeClassActive(arrayBackgroundElements, 'tree-active')
    const target:HTMLLIElement = event.target as HTMLLIElement;
    const indexBackground:number = +target.getAttribute('data-bg');
    treeContainerBg.style.backgroundImage = `url(assets/bg/${indexBackground+1}.jpg)`
    target.classList.add('.tree-active')
}

backgroundContainer.addEventListener('click', setBackground) 