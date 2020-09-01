import express from 'express';

const start = () => {
    let port = 5000;
    const app = express();
    app.get('/', (req, res) => {
        res.send("Hello world!");
    })
    app.listen(port, () => {
        console.log(`LISTENING ON PORT ${port}!`)
    })
}
 
start();