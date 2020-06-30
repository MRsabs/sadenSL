/* eslint-disable max-classes-per-file */
import { Model, DataTypes } from 'sequelize';
import sequelize from '../init';
import { unixNow, uuidV4 } from '../../util/native';

export class Customer extends Model {}
Customer.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue() {
        return uuidV4();
      },
      primaryKey: true,
    },
    name: {
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
  { sequelize, modelName: 'customer' },
);

export class Order extends Model {}
Order.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue() {
        return uuidV4();
      },
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.STRING,
    },
    product: {
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
  { sequelize, modelName: 'order' },
);

Customer.hasMany(Order);
Order.belongsTo(Customer, { foreignKey: 'customerId' });
