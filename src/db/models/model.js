import sequelize from '../init';
import { Model, DataTypes } from 'sequelize';
import { unixNow, uuidV4 } from '../../util/native.js';

export class Customer extends Model {}
Customer.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: function () {
        return uuidV4();
      },
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: function () {
        return unixNow();
      },
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: function () {
        return unixNow();
      },
    },
  },
  { sequelize, modelName: 'customer' }
);

export class Order extends Model {}
Order.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: function () {
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
      defaultValue: function () {
        return unixNow();
      },
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: function () {
        return unixNow();
      },
    },
  },
  { sequelize, modelName: 'order' }
);

Customer.hasMany(Order);
Order.belongsTo(Customer, { foreignKey: 'customerId' });
