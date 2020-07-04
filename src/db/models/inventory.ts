import { Model, DataTypes } from 'sequelize';
import sequelize from '../init';
import { unixNow, uuidV4 } from '../../util/native';

class Inventory extends Model {}
Inventory.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue() {
        return uuidV4();
      },
      primaryKey: true,
    },
    trackerId: {
      type: DataTypes.STRING,
    },
    productId: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
    quantityInStock: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue() {
        return unixNow();
      },
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue() {
        return unixNow();
      },
    },
  },
  { sequelize, modelName: 'inventory' }
);

export default Inventory;
