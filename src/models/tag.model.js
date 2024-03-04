import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize-client.js";

export class Tag extends Model {}

Tag.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  color: {
    // on veut de l'hexadécimal :
    // - `#c0ffee` → 7 caractères
    // - `#b0b` → 4 caractères
    // dans ma table, je veux un VARCHAR(7),
    // « traduit » par Sequelize en `STRING(N)`
    // https://sequelize.org/docs/v7/models/data-types/#strings
    type: DataTypes.STRING(7),
  }
}, {
  sequelize,
  modelName: "Tag",
  tableName: "tag"
});
