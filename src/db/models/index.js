import Customer from './customer';
import Order from './order';
import OrderProduct from './orderProduct';
import Product from './product';
import Inventory from './inventory';

// sequlize assostions
// Customer.hasMany(Order, { foreignKey: 'customerId' });
// Product.hasMany(Inventory, { foreignKey: 'productId' });

// Order.hasMany(OrderProduct, { foreignKey: 'orderId' });
// OrderProduct.belongsTo(Order);

// OrderProduct.hasMany(Product, { foreignKey: 'productId' });
// Product.belongsTo(OrderProduct);

// Order.belongsTo(Customer);
// Inventory.belongsTo(Product);

Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.hasMany(OrderProduct, { foreignKey: 'orderId' });
Product.hasMany(OrderProduct, { foreignKey: 'productId' });
Product.hasMany(Inventory, { foreignKey: 'productId' });

Order.belongsTo(Customer);
OrderProduct.belongsTo(Product);
OrderProduct.belongsTo(Order);
Inventory.belongsTo(Product);

export { Customer, Order, OrderProduct, Product, Inventory };
