import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import logger from "../utils/logger";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const authenticationToken =
  (jwtInstance: typeof jwt) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        res.sendStatus(401);
        return;
      }

      jwtInstance.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: VerifyErrors | null, user: JwtPayload | undefined) => {
          console.log(err.message);
          if (err) {
            res.sendStatus(403);
            logger.error("Error in /api/example:", err);

            return;
          }
          req.user = user;
          next();
        }
      );
    } catch (error) {
      console.error(error.message);
      res.sendStatus(500);
    }
  };

export default authenticationToken;
