export interface ICategoryCraete {
    
    name: string,
    photo:File|null ,
    description: string
}
export interface ICategoryCreateErrror {
    name: string,

    description: string
}