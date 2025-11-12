const request = require('supertest');
const app = require('../src/app');

describe('Auth API', () => {
  it('should sign up a new customer', async () => {
    const res = await request(app).post('/auth/signup').send({
      email: 'user1@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it('should login existing user', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'user1@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should create admin account', async () => {
    const res = await request(app).post('/auth/signup').send({
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });
});
