import { Model, DataTypes } from 'sequelize';
import sequelize from '../init';
import { unixNow, uuidV4 } from '../../util/native';

class Customer extends Model {}
Customer.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue() {
        return uuidV4();
      },
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    phone: {
      type: DataTypes.NUMBER({ length: 16 }),
      defaultValue: 0,
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: 'unknown',
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

export default Customer;
