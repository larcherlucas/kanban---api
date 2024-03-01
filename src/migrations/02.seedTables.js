import { List } from "../models/list.model.js";
import { sequelize } from "../sequelize-client.js";

seedTables();

async function seedTables() {
  console.log("🔄 Okanban seeding started...");

  // on crée les listes
  // raccourci de `List.build(data)` + `sequelize.save()`
  // await List.create({ title: 'Backlog', position: 1 });
  // await List.create({ title: 'To do', position: 2 });

  // on peut aussi créer les listes en une seule fois !
  // chaque liste est dans un tableau
  await List.bulkCreate([
    { title: 'Backlog', position: 1 },
    { title: 'To do', position: 2 },
    { title: 'In progress', position: 3 },
    { title: 'To test', position: 4 },
    { title: 'Done', position: 5 },
  ], { validate: true }); // par défaut pas de validation des champs !?!
  
  console.log("✅ Okanban seed done with success !");
  
  console.log("🧹 Clean up by closing database connexion");
  await sequelize.close();
}
