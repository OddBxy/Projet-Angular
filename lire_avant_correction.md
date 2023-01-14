# Projet-Angular

ETAPE-2: 
  Après avoir suivi l'explication et la mise en place du drag&drop grâce aux liens fournis, il fallait encore modifier la fonction de drop pour qu'elle puisse changer le statut des taches.
  Pour cela on a récupéré les informations de la tâche grâce à "event.item.data" grâce à la fonction cdkdragData.
  Mais on a aussi mis des "id" sur les container afin de passer le statut de la liste, représentée par le container, au statut de la tache.
  Les "id" ont été récuperé grâce à "event.container.id"
  On stock les informations dans une tâche créée dans la fonction drop ce qui nous permet d'utiliser la fonction updateTache.
