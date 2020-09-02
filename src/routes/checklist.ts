import { getAllCheckList, getCheckListById } from "../controllers/checklist";
import express from "express";

// Initialize router
const checkListRouter = express.Router();

//Get methods
checkListRouter.get('/', getAllCheckList);
checkListRouter.get('/:id', getCheckListById);


export { checkListRouter }