import { sequelize } from "../sequelize-client.js";
import { Card } from "./card.model.js";
import { List } from "./list.model.js";
import { Tag } from "./tag.model.js";

List.hasMany(Card, {
  as: "cards", 
  foreignKey: "list_id", 
});

Card.belongsTo(List, {
  as: "list",
  foreignKey: "list_id",
});
const CardHasTag = sequelize.define(
  "card_has_tag",
  {},
  { tableName: "card_has_tag" }
);

Card.belongsToMany(Tag, {
  as: "tags",
  through: CardHasTag, 
  foreignKey: "card_id", 
  otherKey: "tag_id"
});

Tag.belongsToMany(Card, {
  as: "cards",
  through: CardHasTag, 
  foreignKey: "tag_id", 
  otherKey: "card_id"
});

export { Card, List, Tag, CardHasTag };
