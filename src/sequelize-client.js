/**
 * On utilise les ESM (EcmaScript modules)
 * 
 * → plus de `require` mais des `import`
 * → plus de `module.exports` mais des `export`
 * 
 * Pour prévenir que je suis en ESM, j'ai renseigné :
 * - `"type": "module"` dans le fichier `package.json`
 * - le `sourceType` dans ESLint
 */

import "dotenv/config";

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.PG_URL, {
  logging: false, // Logger ou non les requêtes SQL passées par Sequelize
  define: {
    underscored: true,
    
    createdAt: "created_at", // Dire que notre champs `createdAt` s'appelle dans notre BDD `created_at`
    updatedAt: "updated_at"
  }
});
