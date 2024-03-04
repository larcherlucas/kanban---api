import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize-client.js";

/*
  Export NOMMÉ

  au moment de l'import je suis OBLIGÉ d'utiliser ce nom
  en le mettant entre accolades
  → import { List } from 'models/list.model.js'

  pour changer son nom
  → import { List as NewName } from 'models/list.model.js'

  peut en avoir plusieurs par fichier
*/
export class List extends Model {}

List.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  }
}, {
  sequelize,
  modelName: "List",
  tableName: "list"
});
