import express from 'express';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res) => {
    console.log('server is running');
    res.send('Server is running'); 
  });

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});
