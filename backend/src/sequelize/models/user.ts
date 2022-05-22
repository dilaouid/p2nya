'use strict';
import { Model } from 'sequelize';

interface UserAttributes {
  uuid: string;
  ip: string;
  username: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    uuid!: string;
    ip!: string;
    username!: string
    static associate(models) {
      // define association here
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    ip: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};