import { Liste } from "./liste";

export interface User {
    _id?:string;
    login:string;
    password:string;
    listes: Array<Liste>;
}