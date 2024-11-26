import express from "express";
import { 
    createUser,
    updateUser,
    getUser,
    getAllUsers,
    deleteUser

} from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.route("/createUser").post(createUser);
userRouter.route("/updateUser/:id").post(updateUser);
userRouter.route("/getUser/:id").get(getUser);    
userRouter.route("/getAllUsers").get(getAllUsers);
userRouter.route("/deleteUser/:id").delete(deleteUser);

export default userRouter;