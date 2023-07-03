import jwt, { Jwt } from "jsonwebtoken";
import authenticationToken from "./jwt.auth";

const token = {
  jwt,
  authenticationToken: authenticationToken(jwt),
};

export default token;
