export interface IProductsImagesItem{
 
    name:string
    
    }
    export interface ICreateProductsItem {
    
        name: string,
        category_id:number,
        price: number,
         product_images:Array<IProductsImagesItem>,
        description: string
    } 
    export interface IProductsItemError {
    
        name: string,
        category_id?:number,
        price?: number,
 
        description: string
    }