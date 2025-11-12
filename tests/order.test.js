const request = require('supertest');
const app = require('../src/app');

let userToken, productId;

beforeAll(async () => {
  const loginUser = await request(app).post('/auth/login').send({
    email: 'user1@example.com',
    password: 'password123'
  });
  userToken = loginUser.body.token;

  // Ensure there's a product available
  const admin = await request(app).post('/auth/login').send({
    email: 'admin@example.com',
    password: 'admin123'
  });
  const adminToken = admin.body.token;
  const category = await request(app)
    .post('/categories')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ name: 'Accessories' });
  const product = await request(app)
    .post('/products')
    .set('Authorization', `Bearer ${adminToken}`)
    .field('name', 'Watch')
    .field('price', 100)
    .field('stock', 5)
    .field('categoryId', category.body.id);
  productId = product.body.id;
});

describe('Order API', () => {
  it('should add product to cart and place order', async () => {
    await request(app)
      .post('/cart/items')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId, quantity: 1 });

    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(201);
    expect(res.body.total).toBeGreaterThan(0);
  });

  it('should view user order history', async () => {
    const res = await request(app)
      .get('/orders/me')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should allow admin to list all orders', async () => {
    const admin = await request(app).post('/auth/login').send({
      email: 'admin@example.com',
      password: 'admin123'
    });
    const adminToken = admin.body.token;

    const res = await request(app)
      .get('/orders')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });
});
