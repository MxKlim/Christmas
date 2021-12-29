import './header.scss'
import {renderTreeyToyList} from '../treePage/render-toy'
const headerElement:HTMLElement = document.querySelector('.header');
const wrapperElement:HTMLElement = document.querySelector('.wrapper');
const wrapperLeftElement:HTMLElement = document.querySelector('.wrapper-left');
const wrapperBottomElement:HTMLElement = document.querySelector('.wrapper-bottom');
const targetArrayElement:Array<HTMLElement> = [];

const elementArray:Array<HTMLElement> = [wrapperElement, wrapperLeftElement,wrapperBottomElement];


const selectPage =  (e:Event):void => {
    const target:HTMLElement = e.target as HTMLElement;

    if(target.classList.contains('header-wrapper')){
        return
    } else {
        removeClassActive(elementArray, 'active');
        removeClassActive(targetArrayElement, 'header_active');
        if( target.classList.contains('header__logo')) {
            wrapperElement.classList.add('active');
            targetArrayElement[0] = target;
            target.classList.add('header_active')
        }
        if( target.classList.contains('toys-select') || target.classList.contains('start-game')) {
            targetArrayElement[1] = target;
            wrapperLeftElement.classList.add('active')
            target.classList.add('header_active')
        }
        if( target.classList.contains('tree-select')){
            targetArrayElement[2] = target;
            wrapperBottomElement.classList.add('active')
            target.classList.add('header_active')
            renderTreeyToyList()
        }
    }
}

function removeClassActive(elementArray:Array<HTMLElement>, className:string):void {
    elementArray.forEach(item =>{
        if(item.classList.contains(className)){
            item.classList.remove(className)
        }
    });
}
headerElement.addEventListener('click',  selectPage)

export default selectPage;