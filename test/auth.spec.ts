import fixtures from './fixtures';

describe.skip('POST /api/auth', () => {
  test('should respond with a 200 status code and return token', async () => {
    const { teardown, request } = await fixtures(); // Run the setup function before the test
    const response = await request
      .post('/api/auth')
      .set('Authorization', 'Basic dXNlckBtYWlsLmNvbToxMjM0cGFzcyE=')
      .send({});
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
    expect(response.body.token.startsWith('eyJ')).toBe(true);
    await teardown(); // Run the teardown function after the test
  });

  test('should respond with a 500 Internal status code without authorization bearer', async () => {
    const { teardown, request } = await fixtures(); // Run the setup function before the test
    const response = await request.post('/api/auth');
    expect(response.status).toBe(500);
    await teardown(); // Run the teardown function after the test
  });
  test('should respond with a 400 status code if email or password is missing', async () => {
    const { teardown, request } = await fixtures();
    const response = await request.post('/api/register').send({ name: 'von' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email and password are required');
    await teardown();
  });
});
