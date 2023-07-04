import { connect, disconnect } from '@src/config/db.connection';

export async function setup() {
  await connect();
}

export async function teardown() {
  await disconnect();
}
