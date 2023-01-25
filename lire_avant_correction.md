# Projet-Angular
PARTIE 4: 

  Pour la partie 4 on a choisi de modifier les modèles utilisateurs afin qu'ils puissent contenir des listes. 
  Du coup un se connecte plus à la collection taches ou lites, mais à la collection utilisateur.
  
  Pour ajouter, supprimer ou changer de liste une tache, on utilise une nouvelle fonction que met à jour l'utilisateur connecté.
  Pour la page d'inscription il a fallu créer un nouveau html, un nouveau component et ect.
  Il fallait bien évidemment mettre à jour appModule.ts et app-routing.module.ts pour spécifier la route et le component.
  En plus de cela il a fallu modifier login.component.ts et login.component.html pour permettre l'accès à la page d'inscription.
  
  
  Pour pouvoir se connecter, on utilise la fonction appelle la fonction login dans le submit.
  Si la fonction login marche, on utilise la fonction navigate et on passe des queryParameters pour que tache.component.ts puisse récupérer les informations de l'utilisateur avec la fonction getUser dans ngOnInit.
