'use strict';

import { Model } from 'sequelize';

interface RoomAttributes {
  id: string;
  password: string;
  admin: string;
  timeStamp: number;
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
    timeStamp!: number;
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