import { errorHandler } from "./errorHandler";
import { requestLogger } from "./requestLogger";

const middleware: {
  url: string;
  errorHandler: typeof errorHandler;
  requestLogger: typeof requestLogger;
} = {} as any;

middleware.errorHandler = errorHandler;
middleware.requestLogger = requestLogger;
export default middleware;
