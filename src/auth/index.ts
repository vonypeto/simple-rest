import jwt from 'jsonwebtoken';
import extractCredentials from './basic.auth';
import authenticationToken from './jwt.auth';

const token = {
  jwt,
  authenticationToken: authenticationToken(jwt),
  authenticationBasic: extractCredentials,
};

export default token;
