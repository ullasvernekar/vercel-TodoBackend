import express from "express";
import{
    createTodo,
    findById,
    findAll,
    updateTodo,
    deleteTodo
} from "../controllers/todoController.js";

const todoRouter = express.Router();    

todoRouter.route("/createTodo").post(createTodo);
todoRouter.route("/findById/:id").get(findById);
todoRouter.route("/findAll").get(findAll);
todoRouter.route("/updateTodo").post(updateTodo);
todoRouter.route("/deleteTodo/:todoId").delete(deleteTodo);

export default todoRouter;