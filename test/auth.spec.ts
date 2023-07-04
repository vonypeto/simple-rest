import request from 'supertest';
import app from '../app';
import { setup, teardown } from './fixtures';

describe('POST /api/auth', () => {
  test.concurrent(
    'should respond with a 200 status code and return token',
    async () => {
      await setup();
      const response = await request(app)
        .post('/api/auth')
        .set('Authorization', 'Basic dXNlckBtYWlsLmNvbToxMjM0cGFzcyE=')
        .send({});

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
      expect(response.body.token.startsWith('eyJ')).toBe(true);
      await teardown();
    }
  );

  test.concurrent(
    'should respond with a 500 Internal status code without authorization bearer',
    async () => {
      await setup();
      const response = await request(app).post('/api/auth');
      expect(response.status).toBe(500);
      await teardown();
    }
  );
});
