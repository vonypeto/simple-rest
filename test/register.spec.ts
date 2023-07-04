import request from 'supertest';

describe('POST /api/register', () => {
  describe('Register given a username and password', () => {
    test('should respond with a 200 status code and return token', async () => {
      const response = await request(app)
        .post('/api/register')
        .set('Authorization', 'Basic dm9ueXBldEBtYWlsLmNvbToxMjM0cGFzcyE=')
        .send({});

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
      expect(response.body.token.startsWith('eyJ')).toBe(true);
    });
    test('should respond with a 409 status code if user already exists', async () => {
      const response = await request(app)
        .post('/api/register')
        .set('Authorization', 'Basic dm9ueXBldEBtYWlsLmNvbToxMjM0cGFzcyE=')
        .send({});

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('User already exists');
    });
  });

  // Tear down
  afterAll(async () => {
    await deleteUserByEmail('vonypet@mail.com');
  });
});
