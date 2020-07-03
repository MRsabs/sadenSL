import { Model, DataTypes } from 'sequelize';
import sequelize from '../init';
import { unixNow, uuidV4 } from '../../util/native';

class Product extends Model {}
Product.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue() {
        return uuidV4();
      },
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    wholeSalePrice: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
    },
    retailPrice: {
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
  { sequelize, modelName: 'product' },
);

export default Product;
