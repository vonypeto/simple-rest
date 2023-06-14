import jwt, { Jwt } from "jsonwebtoken";
import authenticationToken from "./jwt.auth";

const token: {
  jwt: typeof jwt;
  authenticationToken: ReturnType<typeof authenticationToken>;
} = {
  jwt,
  authenticationToken: authenticationToken(jwt),
};

export default token;
