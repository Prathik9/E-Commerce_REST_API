require('dotenv').config();
const { sequelize, User, Category, Product, Cart } = require('../models');
const bcrypt = require('bcrypt');
const cloudinary = require('../config/cloudinary');

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');

    // Drop and recreate all tables
    await sequelize.sync({ force: true });
    console.log('🗃️ Database synced');

    // --- USERS ---
    // const passwordHash = await bcrypt.hash('password123', 10);
    const admin = await User.create({
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });

    const customer = await User.create({
      email: 'user@example.com',
      password: 'password123',
      role: 'customer',
    });

    console.log('👤 Users created:', admin.email, customer.email);

    // --- CARTS ---
    const cart = await Cart.create({ userId: customer.id });
    console.log('🛒 Cart created for user@example.com');

    // --- CATEGORIES ---
    const electronics = await Category.create({
      name: 'Electronics',
      description: 'All electronic gadgets and accessories',
    });

    const books = await Category.create({
      name: 'Books',
      description: 'Fiction, Non-fiction, and Educational books',
    });

    const fashion = await Category.create({
      name: 'Fashion',
      description: 'Clothing, shoes, and accessories',
    });

    console.log('📦 Categories created:', electronics.name, books.name, fashion.name);

    // --- PRODUCTS ---
    const products = [
      {
        name: 'Smartphone',
        description: 'Latest Android smartphone with 128GB storage',
        price: 699.99,
        stock: 50,
        categoryId: electronics.id,
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      },
      {
        name: 'Wireless Headphones',
        description: 'Noise cancelling Bluetooth headphones',
        price: 149.99,
        stock: 30,
        categoryId: electronics.id,
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1688397400/headphones.jpg',
      },
      {
        name: 'JavaScript Book',
        description: 'Learn modern JavaScript programming',
        price: 39.99,
        stock: 100,
        categoryId: books.id,
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1688397400/js-book.jpg',
      },
      {
        name: 'T-Shirt',
        description: '100% cotton unisex t-shirt',
        price: 19.99,
        stock: 200,
        categoryId: fashion.id,
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1688397400/tshirt.jpg',
      },
    ];

    await Product.bulkCreate(products);
    console.log(`🛍️ ${products.length} products created`);

    console.log('✅ Seeding complete! You can now test your APIs:');
    console.log('➡️  Login as admin: admin@example.com / password123');
    console.log('➡️  Login as customer: user@example.com / password123');
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await sequelize.close();
    console.log('🔒 Connection closed');
  }
}

seed();
