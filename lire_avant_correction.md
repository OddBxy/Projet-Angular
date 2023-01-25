# Projet-Angular
Ce fichier à pour but d'expliquer le travail qui à été réaliser, et comment ce repository est agencé (c'est un README enfaîte).
Ce dépôt est donc constitué de plusieurs branches, chacune d'elles représentent une étape du projet et comportent ce même type de "readme" 
Il y a même une étape en plus, "ETAPE2-V2" qu'on abordera plus tard.
Il sera intéressant de lire le "readme" de chaque branche à fin de comprendre ce qui à été réalisé. 

Il est aussi conseiller de refaire les commandes "npm intall" dans chaque partie angular et "npm intall mongod" dans chaque partie APi
Sinon vous pouvez tout aussi copier coller vos propres fichier, ce sera un peu plus rapide 

L'étape 1 : 
  Cette branche ne possède pas le dossier node_modules comme les autes parties (j'avais pas git, et le fichier est trop volumineux pour passer par le site) 
  
  Pour réaliser cette étape, il a fallu créer 4 div basées sur le modèle déjà présent, et rajouter un champ statut dans le modèle tache de tache.ts.
  Afin que les listes affichent les taches avec le bon statut, on a utilisé *ngClass permettant d'afficher ou non la div contenant la tache selon son statut.
  
  On a aussi rajouté une option permettant d'enrgister une nouvel utilisateur, fonction signIn qui appelle la fonction submit
  
  
