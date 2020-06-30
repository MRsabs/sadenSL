import Customer from './customer';
import Order from './order';

// sequlize assostions
Customer.hasMany(Order);
Order.belongsTo(Customer, { foreignKey: 'customerId' });

export { Customer, Order };
