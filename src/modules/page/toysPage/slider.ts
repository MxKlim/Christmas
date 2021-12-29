
 
export function getVals(parent:HTMLElement):Array<number>{

    const  slides:Array<HTMLInputElement> = Array.from(parent.getElementsByTagName("input"));
    const minValue:HTMLElement = parent.querySelector('.range-count-min');
    const maxValue:HTMLElement = parent.querySelector('.range-count-max');
     let slide1 = parseFloat( slides[0].value);
     let slide2 = parseFloat( slides[1].value);
    if( slide1 > slide2 ){ const tmp = slide2; slide2 = slide1; slide1 = tmp; }
    minValue.textContent = slide1.toString();
    maxValue.textContent = slide2.toString();
    return [slide1, slide2]

}
  

