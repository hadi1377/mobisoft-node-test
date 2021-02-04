import { Router, Request, Response, NextFunction } from "express";

import v1Routes from "./v1";
import downloadRoutes from "./download";

const router = Router();

router.use("/v1/", v1Routes);
router.use("/uploads", downloadRoutes);

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({
    hasError: true,
    statusCode: status,
    message: message,
    errors: err.data,
  });
});

export default router;
