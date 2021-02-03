import { Router } from "express";

import setUser from "@middlewares/setUser";
import authRouter from "./auth";

const router = Router();

// router.get("/", (req, res, next) => {
//   res.end("hello baby");
// });
router.use("/", setUser);
router.use("/auth", authRouter);

export default router;
