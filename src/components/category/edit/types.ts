export interface ICategoryUpdateListPage {
    id:number,
    name: string,
    photo:File|null ,
    description: string
}
export interface ICategoryUpdateItemPage {
Itmes:ICategoryUpdateListPage;
}
export interface ICategoryUdateErrror {
    name: string,

    description: string
}