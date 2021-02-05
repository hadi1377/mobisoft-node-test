import { Router } from "express";

import setUser from "@middlewares/setUser";
import authRouter from "./auth";
import bookRouter from "./book";
import userRouter from "./user";

const router = Router();
router.use("/", setUser);
router.use("/auth", authRouter);
router.use(userRouter);
router.use(bookRouter);

export default router;
