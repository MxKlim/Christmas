
const treeContainer = document.querySelector('.js_tree__choice');
const arrayTree = Array.from(document.querySelectorAll('.tree-choice__item'))
const treeImg:HTMLImageElement = document.querySelector('.tree-img');

function setTreeToPage(event:Event) {
    removeClassActive(arrayTree, 'tree-active');
    const target:HTMLLIElement = event.target as HTMLLIElement;
    const indexBackground:number = +target.getAttribute('data-tree');
    treeImg.src = `./assets/tree/${indexBackground+1}.png`;
    target.classList.add('tree-active');
}

export function removeClassActive(array:Element[], classRemove:string) {
    array.forEach(item => {
        if(item.classList.contains(classRemove)) {
            item.classList.remove(classRemove)
        }
    })  
}

treeContainer.addEventListener('click', (event) => {
    setTreeToPage(event)
})