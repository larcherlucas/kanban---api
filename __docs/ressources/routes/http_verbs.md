# HTTP verbs

## GET

## POST

## PUT

Met à jour une ressource **en entier** si celle-ci existe, sinon la crée

→ pour modifier un champ,
**il faut envoyer tous les champs** dans le corps de la requête

### Différence avec POST

PUT est
[idempotente](https://developer.mozilla.org/fr/docs/Glossary/Idempotent) :  
Une requête PUT, envoyée une ou plusieurs fois avec succès,
aura toujours le même effet (il n'y a pas d'effet de bord).  
À l'inverse, des requêtes POST successives et identiques peuvent avoir
des effets additionnels,
ce qui peut revenir par exemple à passer plusieurs fois une commande.

## PATCH

Permet de mettre à jour une ressource de manière partielle

## DELETE
