import { deleteUserByEmail } from '@src/helper/account-db';
import request from 'supertest';
import app from '../app';

describe('POST /api/register', () => {
  describe('Register given a username and password', () => {
    test('should respond with a 200 status code and return token', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({ email: 'vonypet@mail', password: '1234pass!', name: 'von' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
      expect(response.body.token.startsWith('eyJ')).toBe(true);
    });
    test('should respond with a 409 status code if user already exists', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({ email: 'vonypet@mail', password: '1234pass!', name: 'von' });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('User already exists');
    });
  });

  // Tear down
  afterAll(async () => {
    await deleteUserByEmail('vonypet@mail');
  });
});
