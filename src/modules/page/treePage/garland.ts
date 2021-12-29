import {removeClassActive} from './choice-tree';

const garlandBtn = document.querySelector('.js_tree__garland'),
      garlandTypeList = document.querySelector('.js_garland__list'),
      garlandTypeItems = Array.from(garlandTypeList.querySelectorAll('.garland-type__item')),
      lightropeList = Array.from(document.querySelectorAll('.lightrope__item')),
      animationClassArray = ['flash-multicolor','flash-red', 'flash-cyano', 'flash-yellow', 'flash-green' ],
      colorAnimationIndex:number[] = [];
let bgFlag = false;
     
function choiceColorGarlands(event:Event):void {
    if(bgFlag) {
        removeClassActive(garlandTypeItems, 'bg-active')
        const target:HTMLLIElement = event.target as HTMLLIElement;
        const indexBackgroundGarland:number = +target.getAttribute('data-gd');
        target.classList.add('bg-active');
        colorAnimationIndex.push(indexBackgroundGarland)
        setColorToGarlands(colorAnimationIndex[colorAnimationIndex.length-1])
    } 
    return
}

function setColorToGarlands(index:number):void {

    lightropeList.forEach(item =>{
        if(item.classList.contains(animationClassArray[colorAnimationIndex[colorAnimationIndex.length-2]])) {
            item.classList.remove(animationClassArray[colorAnimationIndex[colorAnimationIndex.length-2]])
        }
        item.classList.add(animationClassArray[index])
    })    
}
garlandTypeList.addEventListener('click', choiceColorGarlands);
garlandBtn.addEventListener('click', () => {
    if(bgFlag) {
        removeClassActive(garlandTypeItems, 'bg-active')
        removeClassActive(lightropeList, animationClassArray[colorAnimationIndex[colorAnimationIndex.length-1]])
        bgFlag = false
        garlandBtn.textContent = 'Вкл';

    } else{
        bgFlag = true; 
        setColorToGarlands(0)
        garlandBtn.textContent = 'Выкл';
    }
})