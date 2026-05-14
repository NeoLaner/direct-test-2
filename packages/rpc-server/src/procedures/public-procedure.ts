import { errorMiddleware } from "../middlewares/error-middleware";
import { timingMiddleware } from "../middlewares/timing-middleware";
import { o } from "../orpc-server";

export const publicProcedure = o.use(timingMiddleware).use(errorMiddleware);
