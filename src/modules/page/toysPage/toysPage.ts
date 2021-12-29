import './toysPage.scss'
import './input-slider.scss'
import data from './toyDB';
import { optionsFilterType, dataInterface } from '../../interface/interface';
import { Card, StoregSave } from '../../classes/classes';
import { getVals } from './slider';

const filterValue:HTMLElement = document.querySelector('.filter-by-value');
const resultBlock:HTMLElement = document.querySelector('.toy-result');
const checkbox = <HTMLInputElement>document.querySelector('#favorite-input');
const parentElementFirst:HTMLElement = document.querySelector('.range-slider_quentity');
const resetFilter = document.querySelector('.reset-sort-btn');
const resetChoiceToy = document.querySelector('.reset-choice-btn');
const parentElementSecond:HTMLElement = document.querySelector('.range-slider_years');
const selectSort:HTMLSelectElement = document.querySelector('.sort-select');
const searthInput:HTMLInputElement = document.querySelector('.search');
const selectCount:HTMLSpanElement = document.querySelector('.select-count-toy span');


let optionsFilter:optionsFilterType = {
    shape: [],
    color: [],
    size: [],
    favorite: [],
    quentity:[],
    years:[]
}
let selectToy:Array<number> = [];

function initialToyCardPage():void {
    if(localStorage.getItem('selectToyStorege')){
        selectToy = JSON.parse( localStorage.getItem('selectToyStorege'));
        selectCount.textContent = selectToy.length.toString();
    }
    if(localStorage.getItem ('selectStoregeParam')){
        selectSort.value =  JSON.parse(localStorage.getItem('selectStoregeParam'))
    }
    if(localStorage.getItem('optionsFilterPrmtr')){
        const storegeOptionsSave = localStorage.getItem('optionsFilterPrmtr');
        optionsFilter = JSON.parse(storegeOptionsSave);
        filterByOptions(optionsFilter.favorite[0]);
        checkbox.checked = optionsFilter.favorite[0];
        setInputValueDefault(parentElementFirst, optionsFilter.quentity)
        setInputValueDefault(parentElementSecond, optionsFilter.years)
       
    }else {
        createToyBlock(data, selectToy);  
    }
}

function removeClassActivity():void {
    const elementCollection = filterValue.querySelectorAll('[data-filter]');
    elementCollection.forEach(item => {
        if(item.classList.contains('active-btn-filter')){
            item.classList.remove('active-btn-filter')
        }
        if(item.classList.contains('colors__item-active')){
            item.classList.remove('colors__item-active')
        }
    })
}

function filterByValue(data:Array<dataInterface>, filter:string):Array<dataInterface> {
    const newArray =  data.filter(item =>{
        const searthFilter = item[filter];
        const searthArray:Array<boolean|number|string> = optionsFilter[filter];
        return searthArray.includes(searthFilter) 
        
    });
    createToyBlock(newArray, selectToy) 
    return newArray;
}

function filterByOptions(isSort?:boolean):void {
    let newData =[...data];
    createToyBlock(newData, selectToy) 
    if(optionsFilter.shape.length){
        newData = filterByValue(newData, 'shape' );
    }
    if(optionsFilter.color.length){
        newData = filterByValue(newData, 'color' )
    }
    if(optionsFilter.size.length){
        newData =  filterByValue(newData, 'size' )
    }
    if(searthInput.value){
        newData = search(newData)
    }

    if(optionsFilter.favorite[0]){
        newData = newData.filter(item =>{
            return item.favorite === true
        })
        createToyBlock(newData, selectToy) 
    }

    if(optionsFilter.quentity.length){
        newData = newData.filter(item =>{
            if(Number(item.count) >= optionsFilter.quentity[0] && Number(item.count) <= optionsFilter.quentity[1]){
                return true
            }
        })
        createToyBlock(newData, selectToy) 
    }

    if(optionsFilter.years.length){
        newData = newData.filter(item =>{
            if(Number(item.year) >= optionsFilter.years[0] && Number(item.year) <= optionsFilter.years[1]){
                return true
            }
        })
        createToyBlock(newData, selectToy) 
    }

    if(isSort){
         sortData(newData)
    }

    if(newData.length === 0){
        resultBlock.textContent = 'Извините, совпадений не обнаружено'
    }
    setClassActivity(optionsFilter)
}

function createToyBlock(data:Array<dataInterface>, favorites?:Array<number>):void {
    const card = new Card(data, favorites);
    card.render(); 
}

function sortData(data:Array<dataInterface>):void {
    const sortParametr = selectSort.value;
    switch (sortParametr) {
        case 'sort-name-max':
            data.sort((a, b) => a.name.localeCompare(b.name));
            createToyBlock(data, selectToy);
            break
        case 'sort-name-min':
            data.sort((a, b) => b.name.localeCompare(a.name));
            createToyBlock(data, selectToy);
            break
        case 'sort-count-max':
            data.sort((a, b) => +a.year - +b.year);
            createToyBlock(data, selectToy);
            break  
        case 'sort-count-min':
            data.sort((a, b) => +b.year - +a.year);
            createToyBlock(data, selectToy);
            break
    }
}

function search(data:Array<dataInterface>):Array<dataInterface> {
    const valueInput = searthInput.value.trim().toLocaleLowerCase();
    const newData =   data.filter(item =>{
        return item.name.toLowerCase().includes(valueInput); 
    });
    searthInput.classList.remove('searth-bg');
    createToyBlock(newData, selectToy) 
    return newData
}

function setClassActivity(optionsFilter:optionsFilterType) {
    if(optionsFilter.shape.length){
        optionsFilter.shape.forEach(item =>{
            const element:HTMLElement = filterValue.querySelector(`[data-filter = "${item}"]`);
            element.classList.add('active-btn-filter')
        })
    }
    if(optionsFilter.color.length){
        optionsFilter.color.forEach(item =>{
            const element:HTMLElement = filterValue.querySelector(`[data-filter = "${item}"]`);
            element.classList.add('colors__item-active')
        })
    }
    if(optionsFilter.size.length){
        optionsFilter.size.forEach(item =>{
            const element:HTMLElement = filterValue.querySelector(`[data-filter = "${item}"]`);
            element.classList.add('active-btn-filter')
        })
    }
    
}

function setPropertyOptions(type:string, values:string|boolean|Array<number>):void {
    const optionsType:Array<string| boolean | number > = optionsFilter[type]
  if( Array.isArray(values) ) {
    optionsType[0] = values[0];
    optionsType[1] = values[1];
  }else if(type === 'favorite' && typeof values === 'boolean') {
    optionsType[0] = values
  }else if(!Array.isArray(values)){
    if(!optionsType.includes(values)){
        optionsType.push(values)
    }else{
        const index = optionsType.indexOf(values);
        optionsType.splice(index, 1);
        removeClassActivity();
        setClassActivity(optionsFilter)
    }
  }
  const storegeOptions = new StoregSave('optionsFilterPrmtr',optionsFilter)
  filterByOptions()  
}

function addListenerToInput(parentElement:HTMLElement):void {
  const type = parentElement.dataset.type;
  const inputArray = parentElement.querySelectorAll('input');
  inputArray.forEach(item =>{
    item.addEventListener('input', ()=>{
        const arr =  getVals(parentElement);
        const  range = [...arr];
        setPropertyOptions(type, range);
    } )
  })

}

function defaultFilterValue():void {
    optionsFilter.shape = [];
    optionsFilter.color = [];
    optionsFilter.size = [];
    optionsFilter.favorite = [];
    optionsFilter.quentity = [];
    optionsFilter.years = [];
    setInputValueDefault(parentElementFirst, []);
    setInputValueDefault(parentElementSecond, []); 
   const storegeOptions = new StoregSave('optionsFilterPrmtr',optionsFilter);
   const selectStorege = new StoregSave('selectStoregeParam', '');
    removeClassActivity();
    initialToyCardPage();
}
function setInputValueDefault(parentElement:HTMLElement, parametrsValue?:Array<number> ):void {
    const inputs = parentElement.querySelectorAll('input');
    if(parametrsValue.length){
        inputs[0].value = `${parametrsValue[0]}`;
        inputs[1].value = `${parametrsValue[1]}`;
    }else{
        inputs[0].value = `${inputs[0].min}`;
        inputs[1].value = `${inputs[1].max}`;
    }
    getVals(parentElement)
}

function selectToyType(event:Event):void {
  const targetElement:HTMLDivElement = event.target as HTMLDivElement;
  const selectionIndicator = targetElement.querySelector('.toy-indicator');
  const cardId = targetElement.getAttribute('data-toy');
  const id = parseInt(cardId);
  
  if( targetElement.classList.contains('toy-card')){
    if(!selectToy.includes(id) && selectToy.length < 20){
        selectionIndicator.classList.add('indicator-active')
        selectToy.push(id)
    }else{
        const index = selectToy.indexOf(id);
        if(index>=0){
            selectToy.splice(index, 1)
            selectionIndicator.classList.remove('indicator-active') 
        }else{
            showModal()
        }
    }
  }

  selectCount.textContent = selectToy.length.toString();
  const selectToyStorege = new StoregSave('selectToyStorege', selectToy)
}

function showModal():void {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.textContent = 'Извините, все слоты заполнены';
    setTimeout(()=>{
        modal.remove();
    }, 1500)
    resultBlock.append(modal);
}


initialToyCardPage();
addListenerToInput(parentElementFirst);
addListenerToInput(parentElementSecond);

resetFilter.addEventListener('click', defaultFilterValue )
parentElementFirst.addEventListener('click', ():void => {
    addListenerToInput(parentElementFirst)
});
parentElementSecond.addEventListener('click', ():void => {
    addListenerToInput(parentElementSecond)
});

filterValue.addEventListener('click', (event):void => {
  const element:HTMLElement = event.target as HTMLButtonElement|HTMLInputElement;
  const typeFilter = element.getAttribute('data-type');
  const filter = element.getAttribute('data-filter');
  if(typeFilter){
    if(typeFilter === 'favorite'){
        setPropertyOptions(typeFilter, !checkbox.checked)
        return
    }
    setPropertyOptions(typeFilter, filter);
  }
  filterByOptions()
});

searthInput.addEventListener('input', ():void => {
    filterByOptions()
});
searthInput.addEventListener('change', ():void => {
    searthInput.classList.add('searth-bg')
});

selectSort.addEventListener('input', ():void => {
    const selectStorege = new StoregSave('selectStoregeParam', selectSort.value )
    filterByOptions(true)
});
resultBlock.addEventListener('click', selectToyType )

resetChoiceToy.addEventListener('click', ():void => {
    selectToy = [];
    const selectToyStorege = new StoregSave('selectToyStorege', selectToy);
    selectCount.textContent = selectToy.length.toString();
    filterByOptions();
})
