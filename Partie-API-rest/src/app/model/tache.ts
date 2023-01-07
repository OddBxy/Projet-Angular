export interface Tache {
    _id?:string;
    titre:string;
    termine:boolean;
    statut:string;
}

export interface Liste{
    titre:string;
    statut:string
    Taches:Array<Tache>;
}
