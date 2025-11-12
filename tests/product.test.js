jest.mock('cloudinary', () => ({
    v2: {
      uploader: {
        upload: jest.fn(() =>
          Promise.resolve({ secure_url: 'https://cloudinary.com/fake-image.jpg' })
        ),
      },
      config: jest.fn(),
    },
  }));
  
  const request = require('supertest');
  const app = require('../src/app');
  
  let adminToken, categoryId, productId;
  
  beforeAll(async () => {
    const login = await request(app).post('/auth/login').send({
      email: 'admin@example.com',
      password: 'admin123',
    });
    adminToken = login.body.token;
  
    const cat = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Books' });
    categoryId = cat.body.id;
  });
  
  describe('Product API', () => {
    it('should create a product', async () => {
      const res = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .field('name', 'JavaScript Book')
        .field('price', 299.99)
        .field('stock', 50)
        .field('categoryId', categoryId);
  
      expect(res.statusCode).toBe(201);
      productId = res.body.id;
    });
  
    it('should list products with filters', async () => {
      const res = await request(app).get('/products').query({ q: 'JavaScript' });
      expect(res.statusCode).toBe(200);
      expect(res.body.items.length).toBeGreaterThan(0);
    });
  
    it('should update product price', async () => {
      const res = await request(app)
        .put(`/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 199.99 });
      expect(res.statusCode).toBe(200);
    });
  
    it('should delete product', async () => {
      const res = await request(app)
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
    });
  });
  