import pool from '../db/pool';
import { errorMessage, status, } from '../helpers/status';


// Function to get All Checklist
const getAllCheckList = async (req, res) => {

    try {

        let data = await pool.query("SELECT * FROM CheckList")
        res.status(status.success);
        res.json(data.rows);

    } catch (err) {

        res.status(status.error);
        res.send(err);

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

            res.status(status.notfound);
            let message = { message: "Record does not exist" };
            res.send(Object.assign({}, errorMessage, message));

        }
    } catch (err) {

        res.status(status.error);
        res.send(err);

    }
}

export { getAllCheckList, getCheckListById }