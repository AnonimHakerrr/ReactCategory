export interface IRegister {
    name:string,
    surname:string,
    image:File|null ,
    tel:number,
    email: string,
    password: string,
    password_confirmation :string
}

export interface IRegisterResult {
    access_token: string
}