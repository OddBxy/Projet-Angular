import { Tache } from "./tache";
export interface Liste{
    //_id?:string
    titre:string;
    statut:string
    Taches:Array<Tache>;
}
