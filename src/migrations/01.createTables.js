import { List } from "../models/list.model.js";
import { sequelize } from "../sequelize-client.js";

createTables();

async function createTables() {
  console.log("🔄 Okanban tables creation started…");

  console.log("\t- Dropping existing tables first");
  await List.drop({ cascade: true });

  console.log("\t- Creating new tables");
  await List.sync();

  console.log("✅ Okanban tables created with success!");
  
  console.log("🧹 Clean up by closing database connexion\n");
  await sequelize.close();
}