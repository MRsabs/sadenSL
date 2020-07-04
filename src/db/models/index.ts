import Customer from './customer';
import Order from './order';
import OrderProduct from './orderProduct';
import Product from './product';
import Inventory from './inventory';
import InventoryTracker from './inventoryTracker';
// import { Player, Team } from './test';

Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.hasMany(OrderProduct, { foreignKey: 'orderId' });
Product.hasMany(OrderProduct, { foreignKey: 'productId' });
Product.hasMany(Inventory, { foreignKey: 'productId' });
InventoryTracker.hasMany(Inventory, { foreignKey: 'trackerId' });

Order.belongsTo(Customer, { foreignKey: 'customerId' });
OrderProduct.belongsTo(Product, { foreignKey: 'orderId' });
OrderProduct.belongsTo(Order, { foreignKey: 'productId' });
Inventory.belongsTo(Product, { foreignKey: 'productId' });
Inventory.belongsTo(InventoryTracker, { foreignKey: 'trackerId' });

export {
  Customer,
  Order,
  OrderProduct,
  Product,
  Inventory,
  InventoryTracker,
  // Team,
  // Player,
};
