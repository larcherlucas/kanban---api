# S06E03 – QCM – Models

Je fais office de `scenario de test`, je suis :

- ❌ une spécification
    → une description technique et complète d'une fonctionnalité
- ✅ un user story → En tant que ... je souhaite pouvoir ... afin de ...
- ❌ un use-case
    → un cas d'utilisation de notre application : "Créer une liste"
    (peut regrouper plusieurs user-stories)
- ❌ un wireframe → schema fonctionnel de l'app

---

Sur git/GitHub, un remote c'est :

- ✅ une référence vers un repo GitHub
- ❌ une référence vers le repo d'origine sur GitHub
    → le remote qui conventionnellement (et automatiquement) s'appelle `origin`

---

Devant mon MCD :

- ❌ je précise les `associations` entre mes `tables` et leurs différents `champs`
    → MLD / MPD
- ✅ je précise les `associations` entre mes `entités` et leurs différents `attributs`
    → MCD
- ❌ Je pars en courant

---

Quelle information est fausse ?

- ❌ insérer `coucou` dans un `VARCHAR(7)` lève une erreur
    → `VARCHAR(7)` entre 0 et 7 caractères
- ❌ insérer `coucou` dans un `VARCHAR` lève une erreur
    → `VARCHAR()` entre 0 et X caractères par défaut (X >= 255)
- ❌ le type `VARCHAR(42)` accepte uniquement les chaines de caractères
  qui font exactement 42 caractères
    → `VARCHAR(42)` entre 0 et 42 ; PAS « exactement » 42 caractères
- ✅ elles sont toutes fausses
