export interface dataInterface{
    [index: string]: boolean | string
    num: string,
    name: string,
    count: string,
    year: string,
    shape: string,
    color: string,
    size: string,
    favorite: boolean
}
export interface optionsFilterType{
    [index: string]: Array<string|null> | boolean[] | number[]
    
    shape?:Array<string|null>,
    color?:Array<string|null>,
    size?:Array<string|null>,
    favorite: boolean[],
    quentity:number[],
    years:number[]
    
}