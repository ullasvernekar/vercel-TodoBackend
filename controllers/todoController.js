import asyncHandler from "express-async-handler";
import Todo from "../schemas/todoSchema.js";
import mongoose from "mongoose";

export const createTodo = asyncHandler(async (req, res) => {
  try {
    const { title, description, image, priority, dueDate } = req.body;

    const existingTodo = await Todo.findOne({ title });
    if (existingTodo) {
      return res.status(409).json({
        success: false,
        msg: `Todo already exists by the same title ${title} `,
      });
    }

    const todoDoc = await Todo.create({
      title,
      description,
      image,
      priority,
      dueDate,
    });

    return res.status(201).json({
      success: true,
      msg: "Todo created successfully",
      todoDoc,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "server error",
      error,
    });
  }
});

export const findById = asyncHandler(async (req, res) => {
  try {
    const todoId = req.params.id;

    const todoDoc = await Todo.findById(todoId);
    if (!todoDoc) {
      return res
        .status(404)
        .json({ success: false, msg: "Todo ID Does Not Exist : ", todoId });
    }

    return res
      .status(200)
      .json({ success: true, msg: "Todo Found By ID Successfully", todoDoc });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "server error", error });
  }
});

export const findAll = asyncHandler(async (req, res) => {
  try {
    const todoDoc = await Todo.find();
    if (todoDoc.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "No Todos exists to be found " });
    }

    return res.status(200).json({
      success: true,
      msg: "All Todos Found Successfully",
      data: todoDoc,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "server error",
      error,
    });
  }
});

export const updateTodo = asyncHandler(async (req, res) => {
  try {
    const { todoId, title, description, image, priority, dueDate } = req.body;

    const existingTodo = await Todo.findById(todoId);

    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        msg: "Todo Not Found by ID to Update",
        todoId,
      });
    }

    const todoDoc = await Todo.findByIdAndUpdate(
      { _id: todoId },
      {
        title,
        description,
        image,
        priority,
        dueDate,
      }
    );

    return res
      .status(200)
      .json({ success: true, msg: "Todo Updated successfully", data: todoDoc });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "server error",
      error,
    });
  }
});

export const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const todoDoc = await Todo.findByIdAndDelete(todoId);
    if (!todoDoc) {
      return res.status(404).json({
        success: false,
        msg: "todo not found by ID to Delete",
        todoId,
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Todo deleted successfully by ID",
      todoDoc,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "server error",
      error,
    });
  }
});



