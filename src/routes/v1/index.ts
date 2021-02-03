import setUser from "@middlewares/setUser";
import { Router } from "express";

const router = Router();

// router.get("/", (req, res, next) => {
//   res.end("hello baby");
// });
router.use("/", setUser);

export default router;
