import express from 'express';
import pool from './db/pool'
import 'dotenv/config';
import { checkListRouter } from './routes/checklist';


const start = () => {

    const app = express();
    app.use(express.json());

    app.listen(process.env.PORT, () => {
        console.log(`LISTENING ON PORT ${process.env.PORT} !`)
    })

    //Test connection for the database
    pool.connect((err) => {
        if (err)
            console.log("There was an error connecting to the database")
        else
            console.log("Database connected")

    });

    //Connecc routers to app
    app.use('/checklist', checkListRouter);
    
}

start();