import pool from '../db/pool';
import { errorMessage, status, successMessage } from '../helpers/status';



// Function to get All Checklist
const getAllTaskByTextPath = async (req, res) => {

    try {

        let textpath = req.params.textpath;
        let data = await pool.query("SELECT taskdesc,isdone FROM TaskList where id = ( SELECT id from CheckList where textpath = $1)", [textpath]);
        res.status(status.success).json(data.rows);

    } catch (err) {

        let message = { message: "Server error" };
        res.status(status.error).send(Object.assign({}, errorMessage, message));

    }
}

const addTaskToCheckList = async (req, res) => {

    try {

        let taskDesc = req.body.taskdesc;
        let isDone = req.body.isdone;
        let textPath = req.params.textpath;

        if (taskDesc && taskDesc.length < 51 && isDone != null) {

            let query = "INSERT INTO TaskList (id,taskDesc, isDone) \
            values((SELECT id from CheckList where textpath = $1), $2, $3) "
            await pool.query(query, [textPath, taskDesc, isDone])

            let message = { message: "Task added" };
            res.status(status.created).send(Object.assign({}, successMessage, message));

        } else if (!taskDesc || isDone == null) {

            let message = { message: "taskdesc and isdone must be a parameter" };
            res.status(status.bad).send(Object.assign({}, errorMessage, message));

        } else if (taskDesc.length > 50) {

            let message = { message: "taskdesc length should not be longer than 50" };
            res.status(status.bad).send(Object.assign({}, errorMessage, message));

        }

    } catch (err) {

        let message = { message: "Server error" };
        res.status(status.error).send(Object.assign({}, errorMessage, message));

    }
}

export { getAllTaskByTextPath, addTaskToCheckList }