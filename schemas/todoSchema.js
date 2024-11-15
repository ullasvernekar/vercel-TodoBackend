import mongoose from "mongoose";
import User from "./userSchema.js"; 
import bcrypt from "bcryptjs"; 

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String, 
  image: {
    data: Buffer,
    contentType: String,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  dueDate: {
    type: Date,
  },

  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  }
});


const Todo = mongoose.model("todo",todoSchema);
export default Todo;
