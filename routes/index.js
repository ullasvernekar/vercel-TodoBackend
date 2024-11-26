import expresRouter from "express";
import todoRouter  from "./todoRouter.js";
import userRouter from "./userRouter.js";

const router = expresRouter();

router.use("/todo",todoRouter);
router.use("/user",userRouter);

export default router;