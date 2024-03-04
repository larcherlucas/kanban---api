import { Card, List, Tag, CardHasTag } from "../models/associations.js";
import { sequelize } from "../sequelize-client.js";

createTables();

async function createTables() {
  console.log("🔄 Okanban tables creation started…");

  console.log("\t- Dropping existing tables first");
  // attention à l'ordre des suppressions :
  // j'efface d'abord les cartes puis les listes par exemple
  await Tag.drop({ cascade: true });
  await Card.drop({ cascade: true });
  await List.drop({ cascade: true });
  await CardHasTag.drop({ cascade: true });

  console.log("\t- Creating new tables");
  await List.sync();
  await Card.sync();
  await Tag.sync();
  await CardHasTag.sync();

  console.log("✅ Okanban tables created with success !");
  
  console.log("🧹 Clean up by closing database connexion\n");
  await sequelize.close();
}