# MLD - Modèle Logique de Données

Objectif : **« Comment va-t-on stocker ? »**

> Idée : exercice de traduction

On passe du Français à l'Anglais, et on suit quelques règles :

- chaque **entité** devient une **table**
- les **attributs** deviennent des champs/colonnes
- associations :
  - _One-to-One_ → ajout d'un attribut
  - _One-to-many_ = si l'_une des cardinalités max vaut 1_
    → une **clé étrangère** est créée dans la table de cette entité
  - _Many-to-Many_ = si les _2 cardinalités max valent N_
    → ajouter une table de liaison qui comporte 2 clés étrangères
    qui pointent vers les deux clés primaires des autres tables

> **REMARQUES** c'est un exercice moins académique que le MCD
> (moins de règles et de formalisme)
>
> - schéma / texte / diagramme…
> - met-on les types de données ?
>   - les « puristes » : NON, intervient AVANT le choix du SGBD
>   - les « pragmatiques » : OUI, on clarifie notre système

## Version textuelle

```text
list(id, title, position)
card(id, content, color, position, #list(id))
tag(id, name, color)
card_has_tag(#card(id), #tag(id))
```

> `card_has_tag` n'a pas besoin de clé primaire…  
> les champs de la table suffisent à créer une
> **clé primaire composite**

## Table de liaison

Exemple :

```text
`card`
  - #1 = nourrir le chat
  - #2 = faire les courses
  - #3 = faire le MLD

`tag` 
  - #1 = urgent
  - #2 = important
  - #3 = work
```

Si je souhaite ajouter un label sur une carte,
j'ajoute un enregistrement dans la table de liaison `card_has_tag` :

- #1 = (1, 1) → ajout du tag 1 sur la carte 1 (nourrir le chat = urgent)
- #2 = (2, 1) → ajout du tag 1 sur la carte 2 (faire les courses = urgent)
- #3 = (2, 2) → ajout du tag 2 sur la carte 2 (faire les courses = important)
