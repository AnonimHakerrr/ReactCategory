import { ICategoryItem } from "../category/list/types"
export interface IProductsImagesItem{
id:number,
name:string

}
export interface IProductsItem {

    id: number,
    name: string,
    category_id:number,
    price: number,
     category?:  ICategoryItem,
     product_images:Array<IProductsImagesItem>,
    description: string
} 
export interface IProductsList{
    date:IProductsItem[],
    last_page:number,
    total:number,
    current_page:number
}