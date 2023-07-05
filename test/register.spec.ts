import { deleteUserByEmail } from './helper/account-db';
import fixtures from './fixtures';
import AccountModel from '../src/models/account';
import { faker } from '@faker-js/faker';

describe('POST /api/register', () => {
  test.concurrent(
    'should respond with a 200 status code and return token',
    async () => {
      const { teardown, request } = await fixtures();
      const response = await request
        .post('/api/register')
        .send({ email: 'vonypet@mail', password: '1234pass!', name: 'von' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
      expect(response.body.token.startsWith('eyJ')).toBe(true);
      await deleteUserByEmail('vonypet@mail');
      await teardown();
    }
  );
  test.concurrent(
    'should respond with a 409 status code if user already exists',
    async () => {
      const { teardown, request } = await fixtures();

      const email = faker.internet.email();

      await AccountModel.create({
        email: email, // faker.email()
        password: faker.internet.password(),
        name: faker.person.fullName(),
      });

      const response = await request.post('/api/register').send({
        email: email,
        password: faker.internet.password(),
        name: faker.person.fullName(),
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe('User already exists');
      await deleteUserByEmail(email);
      await teardown();
    }
  );
});
