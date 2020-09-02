import pool from '../db/pool';
import { errorMessage, status, successMessage } from '../helpers/status';
import { createUniqueId } from '../helpers/id.generate';



// Function to get All Checklist
const getAllCheckList = async (req, res) => {

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

        let data = await pool.query(`SELECT * FROM CheckList where id = ${req.params.id}`)

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
            await pool.query(`INSERT INTO CheckList (textPath,checkListName) VALUES ('${uniqueId}','${req.body.checklistname}')`)
            res.status(status.created)
            let message = { message: "Record added" };
            res.json(Object.assign({}, successMessage, message));

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