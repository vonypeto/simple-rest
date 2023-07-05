import * as dotenv from 'dotenv';
import app from './app';
import { error } from './src/libs/logger';
import { connect, disconnect } from './src/config/db.connection';

dotenv.config();
(async () => {
  try {
    await connect();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    error(err);
    await disconnect();
  }
})();
