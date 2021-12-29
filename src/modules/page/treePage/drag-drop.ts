
const area = document.querySelector('.map-area');
const blockToys = document.querySelector('.js_toy__list');
const blockTree = document.querySelector('.js_tree_block');

blockToys.addEventListener('mousedown', addListenerItem);
blockTree.addEventListener('mousedown', addListenerItem);
area.addEventListener('dragenter', handlerDragEnter);
area.addEventListener('dragleave', handlerDragLeave);
area.addEventListener('dragover', handlerDragOver);
area.addEventListener('drop', handlerDragDrop);

let itemLeave:boolean;

function addListenerItem(event:Event) {
    const target:HTMLImageElement = event.target as HTMLImageElement; 
    target.addEventListener('dragstart', handlerDragStart);
    target.addEventListener('dragend', handlerDragEnd);
}
function handlerDragDrop(event:DragEvent) {
    const indexImg = event.dataTransfer.getData('dragItem'),
    toy:HTMLImageElement = 
         blockToys.querySelector(`[data-select="${indexImg}"]`) 
         ?  blockToys.querySelector(`[data-select="${indexImg}"]`) 
         : blockTree.querySelector(`[data-select="${indexImg}"]`),
    top = blockTree.getBoundingClientRect().top,
    left = blockTree.getBoundingClientRect().left,
    heightToy = toy.getBoundingClientRect().height,
    widthToy = toy.getBoundingClientRect().width,
    parentElement = toy.parentElement as HTMLLIElement,
    countElement:HTMLParagraphElement = parentElement.querySelector('.tree-toy__count');
   let count:number;
    if(countElement){
        count= +countElement.innerText;
        toy.style.left = event.clientX - left - widthToy/2 + 'px';
        toy.style.top = event.clientY - top - heightToy/2 + 'px';
        countElement ? countElement.textContent = `${--count}`: null;
        if(count > 0){
            parentElement.append(copyElement(toy));
        }
        toy.setAttribute('data-toy-modificate', indexImg)
        blockTree.append(toy)
    } else{
        toy.style.left = event.clientX - left - widthToy/2 + 'px';
        toy.style.top = event.clientY - top - heightToy/2 + 'px';
    }
}
function handlerDragEnter(event:DragEvent) {
    event.preventDefault()
}
function handlerDragLeave() {
    itemLeave = true;
}
function handlerDragOver(event:DragEvent) {
    event.preventDefault()
    itemLeave = false;
}
function handlerDragStart(event:DragEvent) {
    event.dataTransfer.setData('dragItem', this.dataset.select);
}
function handlerDragEnd() {
    if(itemLeave){
        addItemToContainer(this.getAttribute('data-toy-modificate'), this)
    }
}
function copyElement(elem:HTMLImageElement){
   const newElem:HTMLImageElement =  elem.cloneNode(false) as HTMLImageElement;
   newElem.style.top = '';
   newElem.style.left = '';
   newElem.removeEventListener('dragstart', handlerDragStart);
   newElem.removeEventListener('dragend', handlerDragEnd);
   return newElem;
}

function addItemToContainer(index:string,  elem:HTMLImageElement) {
    const container = blockToys.querySelector(`[data-toy-container="${index}"]`),
    countElement:HTMLParagraphElement = container.querySelector('.tree-toy__count');
    let count:number = +countElement.textContent
    const img = container.querySelector('img');
    elem.style.left = '';
    elem.style.top = '';
    img ? elem.remove() : container.append(elem);
    count++;
    countElement.textContent= count.toString();
}
