const request = require('supertest');
const app = require('../src/app');

let userToken, productId;

beforeAll(async () => {
  const loginUser = await request(app).post('/auth/login').send({
    email: 'user1@example.com',
    password: 'password123'
  });
  userToken = loginUser.body.token;

  // Recreate product for cart testing
  const admin = await request(app).post('/auth/login').send({
    email: 'admin@example.com',
    password: 'admin123'
  });
  const adminToken = admin.body.token;
  const category = await request(app)
    .post('/categories')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ name: 'Clothing' });
  const product = await request(app)
    .post('/products')
    .set('Authorization', `Bearer ${adminToken}`)
    .field('name', 'T-Shirt')
    .field('price', 20)
    .field('stock', 10)
    .field('categoryId', category.body.id);
  productId = product.body.id;
});

describe('Cart API', () => {
  let cartItemId;

  it('should add product to cart', async () => {
    const res = await request(app)
      .post('/cart/items')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId, quantity: 2 });

    expect(res.statusCode).toBe(201);
    cartItemId = res.body.id;
  });

  it('should view cart', async () => {
    const res = await request(app)
      .get('/cart')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.CartItems.length).toBeGreaterThan(0);
  });

  it('should remove item from cart', async () => {
    const res = await request(app)
      .delete(`/cart/items/${cartItemId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(200);
  });
});
