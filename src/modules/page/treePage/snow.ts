import {SnowCreate} from '../../classes/classes';
const snowButton:HTMLButtonElement = document.querySelector('.js_controls__snowfall');
const snowContainer:HTMLDivElement = document.querySelector('.js_tree_block');
const src = 'assets/svg/snowflake.svg';
let status = true;
let SnowflakeClassesArray:Array<SnowCreate> = [];
let snowInterval:NodeJS.Timer;

function createSnowflake() {
    const snow = new SnowCreate(snowContainer, 4, src, 10);
    SnowflakeClassesArray.push(snow);
    snow.createSnowflake();
}

function createSnow() {
    let index = 0;
    snowInterval =  setInterval(()=> {
        index++
        createSnowflake();
        if(index === 40) {
            clearInterval(snowInterval);
        }
    }, 500);   
}

function removeSnowflake() {
    SnowflakeClassesArray.forEach(item => {
        item.remove();

    })
}

snowButton.addEventListener('click', ()=> {
    
    if(status) {
        createSnow();
        status = false;
    } else {
        removeSnowflake();
        clearInterval(snowInterval);
        SnowflakeClassesArray = [];
        status = true;
    }
})