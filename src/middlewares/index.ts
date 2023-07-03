import errorHandler from "./error-handler";
import requestLogger from "./request-logger";
import validationMiddleware from "./validation-express";
import allowCors from "./cors-handler";
const middleware: {
  url: string;
  errorHandler: typeof errorHandler;
  requestLogger: typeof requestLogger;
  validationMiddleware: typeof validationMiddleware;
  allowCors: typeof allowCors;
} = {} as any;

middleware.errorHandler = errorHandler;
middleware.requestLogger = requestLogger;
middleware.validationMiddleware = validationMiddleware;
middleware.allowCors = allowCors;
export default middleware;
