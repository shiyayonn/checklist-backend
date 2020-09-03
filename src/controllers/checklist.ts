import pool from '../db/pool';
import { errorMessage, status, successMessage } from '../helpers/status';
import { createUniqueId } from '../helpers/id.generate';



// Function to get All Checklist
const getAllCheckList = async (req, res) => {
    console.log("I GOT HERE")
    try {

        let data = await pool.query("SELECT * FROM CheckList")
        res.status(status.success);
        res.json(data.rows);

    } catch (err) {

        let message = { message: "Server error" };
        res.status(status.error).send(Object.assign({}, errorMessage, message));

    }
}

//Funcction to get ALl checklist by its ID
const getCheckListById = async (req, res) => {

    try {
        let textpath = req.params.textpath;
        let data = await pool.query('SELECT id, checklistname FROM CheckList where textpath = $1', [req.params.textpath])

        if (data.rows.length) {

            res.status(status.success);
            res.json(data.rows[0]);

        } else {

            let message = { message: "Record does not exist" };
            res.status(status.notfound).send(Object.assign({}, errorMessage, message));

        }
    } catch (err) {

        let message = { message: "Server error" };
        res.status(status.error).send(Object.assign({}, errorMessage, message));

    }
}

//Funcction to get ALl checklist by its ID
const addCheckList = async (req, res) => {

    try {

        if (req.body.checklistname && req.body.checklistname.length <= 20) {

            let uniqueId = createUniqueId(7);
            let checkListName = req.body.checklistname;
            await pool.query("INSERT INTO CheckList (textPath,checkListName) VALUES ($1,$2)", [uniqueId, checkListName])

            let message = { message: "Record added" };
            res.status(status.created).json(Object.assign({}, successMessage, message));

        }
        else if (req.body.checklistname && req.body.checklistname.length >= 20) {

            let message = { message: "Check list name length must be less than 21" };
            res.status(status.bad).json(Object.assign({}, errorMessage, message));

        }
        else {

            let message = { message: "Wrong parameters, it should be checklistname" };
            res.status(status.bad).json(Object.assign({}, errorMessage, message));

        }

    } catch (err) {

        let message = { message: "Server error" };
        res.status(status.error).send(Object.assign({}, errorMessage, message));

    }
}



export { getAllCheckList, getCheckListById, addCheckList }