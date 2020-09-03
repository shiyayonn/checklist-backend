import { getAllTaskByTextPath, addTaskToCheckList } from "../controllers/tasklist";
import express from "express";

// Initialize router
const taskListRouter = express.Router();

taskListRouter.get('/:textpath', getAllTaskByTextPath)
              .post('/:textpath', addTaskToCheckList)

export { taskListRouter }