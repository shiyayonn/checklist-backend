import { getAllCheckList, getCheckListById, addCheckList } from "../controllers/checklist";
import express from "express";

// Initialize router
const checkListRouter = express.Router();

checkListRouter.get('/', getAllCheckList)
               .get('/:textpath', getCheckListById)
               .post('/', addCheckList);

export { checkListRouter }