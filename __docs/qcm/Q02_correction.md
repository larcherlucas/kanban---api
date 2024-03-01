# S06E02 – QCM – API & AJAX

Une `Web API` retourne toujours du `JSON`

- ❌ vrai
- ✅ faux

Une API Web, de manière générale renvoie une **ressource**,
99% du temps, c'est du texte dans un format particulier :

- JSON
- XML
- YAML
- texte brut

---

`fetch` permet de :

- ❌ fetcher (quelle question !)
- ❌ récupérer les données d'une API web depuis un terminal → `cURL`
- ✅ récupérer les données d'une API web depuis un fichier JavaScript

---

Le MCD indique `VOITURE <-- 1,1 --> Possède <-- 0,N --> GARAGE`.
C'est une association de type :

- ❌ One-to-One
- ✅ One-to-Many
- ❌ Many-to-Many
- ❌ Voiture-to-Garage

```text
VOITURE <-- 1,1 --> POSSÉDER <-- 0,N --> GARAGE
          max(1,1)            max(0,N)
            = 1                 = N

→ on conserve les maximums de chaque cardinalité : 1N
→ One-To-Many

Sens de lecture :

- un garage possède entre 0 et N voitures
- une voiture appartient à 1 et 1 seul garage
```

---

Lequel de ces outils NE permet PAS de faire des requêtes HTTP

- ❌ curl
- ❌ Insomnia / Postman
- ❌ fetch
- ✅ draw.io
- ❌ Firefox → via par exemple la barre URL
