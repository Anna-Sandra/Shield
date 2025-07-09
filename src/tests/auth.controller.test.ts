import request from 'supertest';
import app from '../app';

jest.setTimeout(60000); 

describe('Auth Endpoints', () => {

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: `testuser@example.com`,
        password: 'testpassword'
      });

    console.log('Register response:', res.body);
    return expect(res.statusCode).toBe(201);
  });

  it('should not register with existing email', async () => {
    const email = `duplicateuser@example.com`;

    // First registration
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email,
        password: 'testpassword'
      });

    // Duplicate registration
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email,
        password: 'testpassword'
      });

    console.log('Duplicate register response:', res.body);
    return expect(res.statusCode).toBe(400);
  });

  it('should login with correct credentials', async () => {
    const email = `loginuser@example.com`;
    const password = 'loginpassword';

    // Register user first
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Login User',
        email,
        password
      });

    // Login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email,
        password
      });

    console.log('Login response:', res.body);
    return expect(res.statusCode).toBe(200);
  });

});
