import { sequelize } from "../sequelize-client.js";
import { Card } from "./card.model.js";
import { List } from "./list.model.js";
import { Tag } from "./tag.model.js";

/*
  Documentation :

  - One-to-Many : hasMany + belongsTo
  - Many-to-Many : belongsToMany + belongsToMany
*/

// List ↔ Card
// One-to-Many : hasMany + belongsTo
List.hasMany(Card, {
  as: "cards", // quand on récupère les listes, on veut inclure les cartes sous ce nom…
  foreignKey: "list_id", // nom de l'attribut faisant la liaison entre les deux tables
});

Card.belongsTo(List, {
  as: "list",
  foreignKey: "list_id",
});

// Card ↔ Tag
// Many-to-Many : belongsToMany + belongsToMany
// on définit la table de liaison (utile pour le seeding)
const CardHasTag = sequelize.define(
  "card_has_tag",
  {}, // pas besoin d'y définir les champs : ils seront automatiquement créés par la déclaration de nos associations
  { tableName: "card_has_tag" }
);

Card.belongsToMany(Tag, {
  as: "tags",
  through: CardHasTag, // Nom de la table de liaison → j'utilise directement le model, Sequelize se charge de récupérer le nom de la table
  foreignKey: "card_id", // https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#aliases-and-custom-key-names
  otherKey: "tag_id"
});

Tag.belongsToMany(Card, {
  as: "cards",
  through: CardHasTag, // Nom de la table de liaison
  foreignKey: "tag_id", // https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#aliases-and-custom-key-names
  otherKey: "card_id"
});

export { Card, List, Tag, CardHasTag };
