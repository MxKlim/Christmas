import { dataInterface } from '../../interface/interface';
import data from '../toysPage/toyDB';
const toyList:HTMLUListElement = document.querySelector('.js_toy__list');

function addToToyListToys(selectToy:number[]):Array<dataInterface> {
    let newData = [...data];
    newData = newData.filter(item => {
        const numberSelectToy:number = +item.num;
        const itemResult = selectToy.includes(numberSelectToy)
        return itemResult;
    })
    newData = newData.length===0 ? data  : newData ;

    return newData
}

export const renderTreeyToyList = () => {
    const selectToy:Array<number> = localStorage.getItem('selectToyStorege') 
        ? JSON.parse(localStorage.getItem('selectToyStorege')) : [];
    const dataSort:Array<dataInterface> = addToToyListToys(selectToy);
    toyList.innerHTML = '';
    let countToy = 0;
    
    dataSort.forEach(item => {
        if(countToy<20) {
            countToy++
            const liToyItem = document.createElement('li');
            const count = document.createElement('p');
            const img = new Image();
            img.src = `assets/toys/${item.num}.png`;
            img.setAttribute('draggable', 'true');
            img.setAttribute('data-select', item.num);
            img.classList.add('toy-select-tree')
            count.classList.add('tree-toy__count');
            count.textContent = item.count;
            liToyItem.classList.add('tree-toy__item');
            liToyItem.setAttribute('data-toy-container', item.num);
            liToyItem.append(count);
            liToyItem.append(img);
            toyList.appendChild(liToyItem);
        }
    })
}

