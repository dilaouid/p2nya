'use strict';

const {
  Model
} = require('sequelize');

interface RoomAttributes {
  id: string;
  password: string;
  admin: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class Room extends Model<RoomAttributes> implements RoomAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    password!: string;
    admin!: string;
  };
  Room.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeStamp: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Room',
    timestamps: false
  });
  return Room;
};