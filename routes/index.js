import expresRouter from "express";
import todoRouter  from "./todoRouter.js";

const router = expresRouter();

router.use("/todo",todoRouter);

export default router;