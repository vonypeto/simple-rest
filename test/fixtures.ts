import supertest from 'supertest';
import EventEmitter from 'events';
import { getRandomPort } from 'get-port-please';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { connect, disconnect } from '../src/config/db.connection';
import app from '../app';

export default async function fixtures() {
  // mongodb setup
  const mongo = await MongoMemoryReplSet.create({
    replSet: {
      storageEngine: 'wiredTiger',
    },
  });
  await connect(mongo.getUri());

  // application setup
  const randomPort = await getRandomPort();
  const events = new EventEmitter();
  const waitForConnection = new Promise((resolve) =>
    events.on('connected', (port) => {
      if (randomPort === port) resolve(randomPort);
    })
  );
  const server = app.listen(randomPort, () =>
    events.emit('connected', randomPort)
  );
  await waitForConnection;

  return {
    request: supertest(app),
    async teardown() {
      await Promise.resolve(() => {
        server.close();
      });
      await disconnect();
      await mongo.stop();
    },
  };
}
