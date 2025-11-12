const request = require('supertest');
const app = require('../src/app');

let adminToken;

beforeAll(async () => {
  const res = await request(app).post('/auth/login').send({
    email: 'admin@example.com',
    password: 'admin123'
  });
  adminToken = res.body.token;
});

describe('Category API', () => {
  let categoryId;

  it('should create a category', async () => {
    const res = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Electronics' });

    expect(res.statusCode).toBe(201);
    categoryId = res.body.id;
  });

  it('should list categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a category', async () => {
    const res = await request(app)
      .put(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ description: 'All gadgets' });
    expect(res.statusCode).toBe(200);
  });

  it('should delete a category', async () => {
    const res = await request(app)
      .delete(`/categories/${categoryId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });
});
