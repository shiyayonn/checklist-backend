import { getAllCheckList, getCheckListById, addCheckList } from "../controllers/checklist";
import express from "express";

// Initialize router
const checkListRouter = express.Router();

//Get methods
checkListRouter.get('/', getAllCheckList)
               .get('/:id', getCheckListById)
               .post('/', addCheckList);

export { checkListRouter }