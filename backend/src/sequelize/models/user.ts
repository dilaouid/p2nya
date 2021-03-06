'use strict';
import { Model } from 'sequelize';

export interface UserAttributes {
  id: number;
  uuid: string;
  username: string;
  inRoom: boolean;
  lastActive: Date;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    uuid!: string;
    username!: string
    inRoom!: boolean;
    lastActive!: Date;
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    username: DataTypes.STRING,
    inRoom: DataTypes.TINYINT,
    lastActive: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    modelName: 'User'
  });
  return User;
};