# Commandes Postgres

Pour lister toutes les commandes/options/… : `man psql`

## Dans le terminal

- `sudo -i -u postgres psql` : se connecte à la bdd
- alternatives (voir « Usage ») :
  - `psql -d postgres` : on spécifie le nom de la bdd
  - `psql postgres` : sans l'utilisation des paramètres (`-[LETTRE]`)
    → nom de la bdd
  - `psql` : sans rien
    → le nom de la bdd est le nom d'utilisateur courant
    (OS username par défaut) (voir la première commande)

- `psql -l` : liste les bdd

> Pour pouvoir utiliser cette commande,
> il faut être un utilisateur du serveur et avoir les droits  
>
> 1. essayez `psql -l`  
> → output :
> `FATAL:  authentification par mot de passe échouée pour l'utilisateur XXX`
>
> 2. entrez `sudo -u postgres psql -l`
> → output : la liste des bdd

- `psql -U nomDeLutilisateur -d nomDeLaBase -f chemin/du/fichier.sql` :
  exécute les commandes à partir d'un fichier

## Une fois connecté

on arrive dans *psql*, l'interface interactive de Postgres

| Commande                                  | Action                                                                              |
|-------------------------------------------|-------------------------------------------------------------------------------------|
| `\l`                                      | liste les bases de données                                                          |
| `\du`                                     | liste les utilisateurs (`SELECT * FROM "pg_roles";`)                                |
| `\dt`                                     | liste les tables dans la base de données                                            |
| `\d <table_name>`                         | affiche la structure d'une table                                                    |
|                                           |                                                                                     |
| `\c <database_name>`                      | se connecte à une autre base                                                        |
| `\c - <user_name>`                        | se connecte en tant qu'utilisateur `user_name` (`-` est le nom de la base courante) |
| `\c <database_name> <user_name>`          | se connecte à `database-name` en tant que `user_name`                               |
|                                           |                                                                                     |
| `\conninfo`                               | détaille la connexion (où, qui, par)                                                |
| `\s`                                      | historique des commandes                                                            |
| `\i <filename>`                           | exécute des commandes SQL à partir d'un fichier                                     |
|                                           |                                                                                     |
| `\q`, `exit`, `quit`, <kbd>Ctrl + D</kbd> | quitte *psql*                                                                       |

## Commandes SQL

*doc: <https://docs.postgresql.fr/>*

### Role (~ user)

```sql
CREATE USER <user_name> WITH PASSWORD 'password';
-- CREATE ROLE <user_name> WITH [LOGIN] PASSWORD 'password';
-- CREATE ROLE <user_name> WITH ENCRYPTED PASSWORD 'password'; # ENCRYPTED est obsolète

DROP ROLE [IF EXISTS] <user_name>;
-- DROP USER <user_name>;

ALTER ROLE <user_name> WITH
  SUPERUSER
  CREATEDB
  CREATEROLE
  INHERIT
  LOGIN
  PASSWORD 'new_password'
  VALID UNTIL '2024-02-23';
```

### Database

```sql
CREATE DATABASE <db_name>;
-- on crée la base de données
ALTER DATABASE <db_name> OWNER TO <user_name>;
-- puis on donne la propriété de la base à <user_name> mais pas celle des tables

CREATE DATABASE <db_name> OWNER <user_name>;
-- on crée et on donne tout de suite la propriété à l'utilisateur

GRANT
  { CONNECT, SELECT, INSERT, UPDATE, DELETE } | ALL [PRIVILEGES]
ON DATABASE <db_name>
TO <user_name>;
-- définit des droits d'accès
```

### Table

Une grande différence avec MySQL : les tables ont un propriétaire !
En fait, tout (sauf les *Users*) a un propriétaire

```sql
ALTER TABLE <table_name> OWNER TO <user_name>;
-- donne la propriété de la table à <user_name>

GRANT
  { CONNECT, SELECT, INSERT, UPDATE, DELETE } | ALL [PRIVILEGES]
ON TABLE <table_name>
TO <user_name>;
-- définit des droits d'accès
```

```sql
# Créer une table
CREATE TABLE IF NOT EXISTS promo (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50) UNIQUE NOT NULL,
  "github_organization" VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS student (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "first_name" VARCHAR(40) NOT NULL,
  "last_name" VARCHAR(50) NOT NULL,
  "github_username" VARCHAR(255),
  "profile_picture_url" VARCHAR(255),
  "promo" INT REFERENCES "promo"("id")
);
```

> **Types**  
>
> <https://docs.postgresql.fr/12/datatype-numeric.html>  
> INT, INTEGER  
> NUMERIC, DECIMAL → `NUMERIC(nombreChiffreEnTout, nombreChiffreAprèsVirgule)`  
> SERIAL → auto-incrémente  
>
> BOOL, BOOLEAN  
>
> CHAR(x) → x caractères exactement // CHAR – sans parenthèse – = CHAR(1)  
> VARCHAR(x) → x caractères maximum // VARCHAR – sans parenthèse – = TEXT  
> TEXT → pas de limite  
>
> <https://docs.postgresql.fr/11/datatype-datetime.html>  
> DATE // '1970-01-31'  
> TIME // '04:05:06.789'  
> TIMESTAMP // '2004-10-19 10:23:54'  
> INTERVAL

```sql
# Enregistrer des données dans une table
INSERT INTO promo(name) VALUES ('Kimchi');

INSERT INTO student(id, first_name, last_name)
VALUES 
  (1, 'Dave', 'Lopper'),
  (2, 'Jane', 'Smith');

# Supprimer une ou plusieurs lignes
DELETE FROM student [WHERE …];

TRUNCATE TABLE promo; -- vide toute la table

# Modifier une ligne
UPDATE student
SET
  first_name = 'Helen'
WHERE
  last_name = 'Smith';

# Modifier les colonnes
ALTER TABLE promo ADD year INT; -- ajoute
ALTER TABLE promo DROP COLUMN year; -- supprime
-- ALTER TABLE table_name RENAME COLUMN column_name TO new_column_name;
-- ALTER TABLE table_name ALTER COLUMN column_name [SET DATA] TYPE new_data_type;

# Supprimer une table
DROP TABLE promo;
```

### Transtypage, ou *cast*

Opérateur : `::`

Exemples :

- `'4'::int`
- `'2019-11-19 20-57:18'::date`
- `'4 days 3 hours'::interval`
