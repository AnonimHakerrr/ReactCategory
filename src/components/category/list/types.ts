 

export interface ICategoryItem {

    id: number,
    name: string,
    photo: string ,
    description: string
} 
export interface ICategoryList{
    date:ICategoryItem[],
    last_page:number,
    total:number,
    current_page:number
}