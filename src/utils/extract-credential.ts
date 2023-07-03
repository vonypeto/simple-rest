import { Request } from "express";

const extractCredentials = (
  req: Request
): { email: string; password: string } => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Basic ")) {
    const encodedCredentials = authHeader.substring("Basic ".length);
    const decodedCredentials = Buffer.from(
      encodedCredentials,
      "base64"
    ).toString();
    const [email, password] = decodedCredentials.split(":");
    return { email, password };
  } else {
    throw new Error("Invalid Authorization header");
  }
};
export default extractCredentials;
