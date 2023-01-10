
import { getTaches } from "./api.js";
import { Application } from "./app.js";

// récupère la liste des tâches à partir du webService de l'exercice1
const taches = await getTaches();

let app = new Application(taches);