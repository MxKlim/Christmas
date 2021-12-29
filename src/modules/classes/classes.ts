import {dataInterface, optionsFilterType} from '../interface/interface'

export class Card{
    data:Array<dataInterface>
    favorites?:Array<number>
    constructor(data:Array<dataInterface>, favorites?:Array<number>){
        this.data = data;
        this.favorites = favorites;
    }

    render():void {
        const fragment:DocumentFragment = document.createDocumentFragment();
        const fragmentCard = <HTMLTemplateElement> document.querySelector('#template-card');
        
        this.data.forEach(item =>{
            const fragmentCardClone = <HTMLElement> fragmentCard.content.cloneNode(true);
            fragmentCardClone.querySelector('.toy-card').setAttribute('data-toy', `${item.num}toy`);
            fragmentCardClone.querySelector('.toy-card__name').textContent = item.name;
            fragmentCardClone.querySelector('.toy-img').setAttribute('src', `assets/toys/${item.num}.png`);
            fragmentCardClone.querySelector('.quentity').textContent = `Количество: ${item.count}`;
            fragmentCardClone.querySelector('.year').textContent =`Год покупки: ${item.year}`;
            fragmentCardClone.querySelector('.shape-toy').textContent =`Форма: ${item.shape}`;
            fragmentCardClone.querySelector('.color-toy').textContent =`Цвет: ${item.color}`;
            fragmentCardClone.querySelector('.size-toy').textContent =`Размер: ${item.size}`;
            if(this.favorites && this.checkClassActive(item)) {
                fragmentCardClone.querySelector('.toy-indicator').setAttribute('class','toy-indicator indicator-active');
            }
            fragmentCardClone.querySelector('.favorite-toy').textContent =`Любимая: ${item.favorite? 'да': 'нет'}`;
            fragment.append(fragmentCardClone)
        })
        document.querySelector('.toy-result').innerHTML = '';
        document.querySelector('.toy-result').appendChild(fragment);
    }
    checkClassActive(item:dataInterface):boolean{
       if(this.favorites.includes(+item.num)) return true
        return false 
    }
}

export class StoregSave{
    nameParametr:string;
    parametr:optionsFilterType | Array<number>|string;
    constructor(nameParametr:string, parametr:optionsFilterType | Array<number> |string){
       this.nameParametr = nameParametr;
       this.parametr     = parametr;
       this.localStorageParam();
    }
    localStorageParam():void {
        const parametrJSON:string = JSON.stringify(this.parametr);
        if(localStorage.getItem(this.nameParametr)){
           localStorage.removeItem(this.nameParametr );
           localStorage.setItem(this.nameParametr , parametrJSON);
        }
        if(!localStorage.getItem(this.nameParametr )){
           localStorage.setItem(this.nameParametr , parametrJSON); 
        }
    }
}

export class SnowCreate{
    container:HTMLDivElement
    count:number
    src:string
    speed:number
    styles:CSSStyleDeclaration
    topPosition:number
    flag:boolean
    elementArray:Array<HTMLDivElement>|null
    constructor(container:HTMLDivElement, count:number, src:string, speed:number) {
        this.container = container;
        this.count = count;
        this.src = src;
        this.speed = speed;
        this.styles = window.getComputedStyle(this.container, null);
        this.topPosition = 0;
        this.flag = false;
        this.elementArray = [];
    }

    createSnowflake() {
        for(let i = 0; i<this.count; i++){
            const createElementDiv = document.createElement('div');
            const createElementImg = document.createElement('img');
            const left = this.setPosition();
            const width = this.setWidth();
            const top = this.random(100, 1).toString();
            createElementImg.src = this.src;
            createElementImg.alt = '';
            createElementDiv.classList.add('snowflake');
            createElementDiv.style.left = `${left}px`;
            createElementDiv.style.width = `${width}px`;
            createElementDiv.style.top = `-${top}px`;
            createElementDiv.append(createElementImg);
            this.container.append(createElementDiv);
            this.setMove(createElementDiv);
            this.elementArray.push(createElementDiv);
        }
    }
    setPosition():string{
        const width:number = parseInt(this.styles.width);
        const position:string = this.random(width, 1).toString();
        return position;
    }
    setWidth():string{
        const widthSnowflake:string =  this.random(35, 10).toString();
        return widthSnowflake;
    }
    setMove(div:HTMLDivElement){
        if(this.flag){
            div.classList.add('snow-move');
            this.flag = false
        }else{
            div.classList.add('snow-move-less');
            this.flag = true
        }
    }

    random(value:number, min:number):number{
      const valueInt = Math.floor(value);  
      return Math.floor(Math.random() * (valueInt - min));
    }
    remove(){
        this.elementArray.forEach(item =>{
            item.remove();
        })
    }
}

export class audioPlayer{
    autoPlay:boolean
    loop:boolean   
    src:string  
    container:HTMLDivElement   
    audio:HTMLAudioElement  

    constructor(autoPlay:boolean, loop:boolean, src:string, container:HTMLDivElement){
        this.autoPlay    = autoPlay;
        this.loop        = loop;
        this.src         = src;
        this.container   = container;
        this.audio       = document.createElement('audio');
    }

    render(){
        this.audio.setAttribute('src', this.src);
        this.container.appendChild(this.audio);
    }
    audioPlay(){ 
        this.audio.play(); 
    }
    remove(){
        this.audio.remove();
    }
}

export class Slider {
  buttonSelector:string
  slideSelector:string
  wrapperSlidesSelector:string
  containerSliderSelector:string
  buttons:NodeListOf<HTMLButtonElement>|null
  slides:NodeList|null
  wrapper:HTMLDivElement|null
  container:HTMLDivElement|null
  count:number|null
  slidesMy:number|null

  constructor(buttonSelector:string, slideSelector:string, wrapperSlidesSelector:string, containerSliderSelector:string){
    this.buttons = document.querySelectorAll(`${buttonSelector}`);
    this.wrapper = document.querySelector(`${wrapperSlidesSelector}`);
    this.container = document.querySelector(`${containerSliderSelector}`);
    this.slides = null;
    this.count = null;
    this.slidesMy = null
    this.buttonSelector = buttonSelector;
    this.slideSelector = slideSelector;
    this.wrapperSlidesSelector = wrapperSlidesSelector;
    this.containerSliderSelector = containerSliderSelector;

    this.init();
    this.buttons.forEach(item => {
      item.addEventListener('click', (event)=>{
      event.stopPropagation()
      this.hasDiraction(event)
      })
    }) 
  }
  init(){
    this.slides = document.querySelectorAll(`${this.slideSelector}`)
    this.count = this.wrapper.children.length;
    this.getWidthWrapper();
    this.setAttributeButtons();
  }

  getCountSlides(){
    const slides = this.wrapper.querySelectorAll('.item-custom-slider');
    this.slidesMy = slides.length
  }
  getWidthWrapper() {
    this.wrapper.style.width = this.slides.length * Math.round(
      parseFloat(
      window.getComputedStyle(this.container)
      .width)) + 'px' ;
  }

  setAttributeButtons() {
      const arrayButtons = Array.from(this.buttons)
      arrayButtons[0].setAttribute('data-slider', 'prev')
      arrayButtons[1].setAttribute('data-slider', 'next')
  }

  hasDiraction(event:Event) {
      const target:HTMLButtonElement = event.target as HTMLButtonElement;
    if(target.getAttribute('data-slider') === 'next'){
      this.moveChild (true);
    }else{
      this.moveChild (false);
    }
  }

  moveChild(dir:boolean) {
    if(dir)  {
      console.log('prev')
      const newElem = this.wrapper.children[0];
      this.wrapper.style.left = '-200%';
      this.wrapper.addEventListener("transitionend", 
        ()=>{ 
          this.wrapper.style.transition ='none';
          this.wrapper.style.left ='-100%';
          this.wrapper.append(newElem);
        }
      );
      this.wrapper.style.transition ='left .5s';
      return
    }
    console.log('next')
      const newElem = this.wrapper.children[this.count-1];
      this.wrapper.style.left = '0%';
      this.wrapper.addEventListener("transitionend", 
        ()=>{ 
          this.wrapper.style.transition ='none';
          this.wrapper.prepend(newElem);
          this.wrapper.style.left = '-100%';
        });
      this.wrapper.style.transition ='left .5s';
    console.log('count', this.count)
  }
  
  remove(){
    this.wrapper.innerHTML = '';
    this.slides = null
    this.count = null
  }

  createItemSlide(src:string) {
    const sliderItem = document.createElement('div');
    sliderItem.classList.add('item-custom-slider');
    const newImg = new Image();
    newImg.src = src;
    sliderItem.appendChild(newImg);
    this.wrapper.appendChild(sliderItem)
  }
}
