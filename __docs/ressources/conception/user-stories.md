# User stories

## Rappel

- outil de **clarification du besoin** lors de la conception
- fait office de **scenario de test** pour valider la réalisation du projet
- liste de scenarii (_story_) au format bien défini

Différent de :

- _use-case_ (cas d'utilisation) qui modélise les interactions entre un système
  et un utilisateur

- _specification_, le cahier des charges fonctionnel de comment il faut
  implémenter la fonctionnalité, peut contenir des _users stories_,
  des _wireframes_

## Format

- 🇫🇷 `En tant que [role], je souhaite pouvoir [action] (( afin de [but] ))`
- 🇺🇸 `AS [role] I want [ACTION] (( so that [GOAL] ))`

- `Rôle` = l'état de l'utilisateur
  - visiteur
  - membre connecté
  - administrateur du site
  - utilisateur sur mobile
  - utilisateur avec un handicap visuel
  - …

## Exemple

Définition du rôle :  
**Utilisateur** → utilisateur anonyme, non logué

| En tant que | Je veux pouvoir               | Dans le but de                                                     |
|-------------|-------------------------------|--------------------------------------------------------------------|
| Utilisateur | Afficher les listes           | permettre l'utilisation du kanban dans son état actuel             |
| Utilisateur | Créer une liste               | rajouter une liste au kanban                                       |
| Utilisateur | Modifier une liste            | Changer ses informations                                           |
| Utilisateur | Déplacer une liste            | Modifier sa position au sein du board                              |
| Utilisateur | Supprimer une liste           | de ne plus la voir s'afficher et de supprimer ses cartes également |
| Utilisateur | Afficher une carte            | pour voir son contenu                                              |
| Utilisateur | Créer une carte               | rajouter une carte dans une liste                                  |
| Utilisateur | Modifier une carte            | mettre à jour son contenu ou sa couleur                            |
| Utilisateur | Déplacer une carte            | réorganiser la liste ou de changer la carte de liste               |
| Utilisateur | Supprimer une carte           | ne plus la voir                                                    |
| Utilisateur | Afficher les labels           | afin d'en sélectionner un                                          |
| Utilisateur | Créer un label                | augmenter la liste des labels disponibles                          |
| Utilisateur | Modifier un label             | corriger une faute ou sa couleur                                   |
| Utilisateur | Supprimer un label            | qu'il ne soit plus rattacher aux cartes                            |
| Utilisateur | Associer un label à une carte | qualifier la carte                                                 |

Si on considère la **couleur comme une entité** (à part entière),
on ajoute :

| En tant que | Je veux pouvoir                  | Dans le but de                                                  |
|-------------|----------------------------------|-----------------------------------------------------------------|
| Utilisateur | Afficher les couleurs            | afin d'en sélectionner une                                      |
| Utilisateur | Créer une couleur                | augmenter la liste des couleurs disponibles                     |
| Utilisateur | Modifier une couleur             | corriger la valeur (et/ou autre)                                |
| Utilisateur | Supprimer une couleur            | qu'elle ne soit plus rattachée à une carte ou un label          |
| Utilisateur | Associer une couleur à une carte | qualifier la carte                                              |
| Utilisateur | Associer une couleur à un label  | qualifier le label                                              |
