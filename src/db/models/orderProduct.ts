import { Model, DataTypes } from 'sequelize';
import sequelize from '../init';
import { unixNow, uuidV4 } from '../../util/native';

class OrderProduct extends Model {}
OrderProduct.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue() {
        return uuidV4();
      },
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.NUMBER,
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
  { sequelize, modelName: 'orderProduct' }
);

export default OrderProduct;
