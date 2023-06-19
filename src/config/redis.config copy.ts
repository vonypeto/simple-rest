import { createClient } from "redis";

function parseBool(value: string): boolean | undefined {
  const lowercaseValue = value.toLowerCase();

  if (lowercaseValue === "true") {
    return true;
  }

  if (lowercaseValue === "false") {
    return false;
  }

  return undefined;
}
type RedisClient = ReturnType<typeof createClient>;

export async function connectToRedis(): Promise<RedisClient> {
  try {
    const client: RedisClient = createClient({
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        tls: parseBool(process.env.REDIS_TLS),
        // key: readFileSync("./certificate/redis.key"),
        // cert: readFileSync("./certificate/redis.crt"),
        // ca: [readFileSync("./certificate/ca.crt")],
      },
    });
    client.connect();

    console.log("REDIS_USERNAME:", process.env.REDIS_USERNAME);
    console.log("REDIS_HOST:", process.env.REDIS_HOST);
    console.log("REDIS_PASSWORD:", process.env.REDIS_PASSWORD);
    console.log("REDIS_PORT:", process.env.REDIS_PORT);
    console.log("REDIS_TLS:", process.env.REDIS_TLS);
    console.log(process.env.REDIS_USERNAME);

    client.on("connect", () => {
      console.log("Connected to Redis");
    });

    client.on("error", (error: Error) => {
      console.error("Redis Client Error:", error);
    });

    await new Promise<void>((resolve, reject) => {
      client.on("ready", () => {
        resolve();
      });
      client.on("error", (error: Error) => {
        reject(error);
      });
    });

    return client;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error((e as Error).message);
    }
    throw e;
  }
}
