import request from 'supertest';
import app from '../app';

jest.setTimeout(60000); 

describe('Auth Endpoints', () => {

  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'testpassword',
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    console.log('Register response:', res.body);
    expect(res.statusCode).toBe(201);
  });

  it('should not register with existing email', async () => {
    const duplicateEmail = 'duplicateuser@example.com';

    const userPayload = {
      name: 'Duplicate User',
      email: duplicateEmail,
      password: 'duplicatepassword',
    };

    await request(app).post('/api/auth/register').send(userPayload);

    
    const res = await request(app).post('/api/auth/register').send(userPayload);

    console.log('Duplicate register response:', res.body);
    expect(res.statusCode).toBe(400);
  });

  it('should login with correct credentials', async () => {
    const loginUser = {
      name: 'Login User',
      email: 'loginuser@example.com',
      password: 'loginpassword',
    };

    
    await request(app).post('/api/auth/register').send(loginUser);

    
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: loginUser.email,
        password: loginUser.password,
      });

    console.log('Login response:', res.body);
    expect(res.statusCode).toBe(200);
  });

});
