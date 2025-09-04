import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';


dotenv.config();

const app = express();
const server= createServer(app);
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.send('<h1>Polling App</h1>');
})

server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});