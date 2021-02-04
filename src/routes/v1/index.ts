import { Router } from "express";

import setUser from "@middlewares/setUser";
import authRouter from "./auth";
import bookRouter from "./book";

const router = Router();
router.use("/", setUser);
router.use("/auth", authRouter);
router.use(bookRouter);

export default router;
