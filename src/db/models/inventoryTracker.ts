import { Model, DataTypes } from 'sequelize';
import sequelize from '../init';
import { unixNow, uuidV4 } from '../../util/native';

class InventoryTracker extends Model {}
InventoryTracker.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue() {
        return uuidV4();
      },
      primaryKey: true,
    },
    inventoryName: {
      type: DataTypes.STRING,
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
  { sequelize, modelName: 'inventoryTracker' }
);

export default InventoryTracker;
