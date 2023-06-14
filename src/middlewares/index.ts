import errorHandler from "./errorHandler";
import requestLogger from "./requestLogger";
import validationMiddleware from "./validationExpress";
import allowCors from "./corsHandler";
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
