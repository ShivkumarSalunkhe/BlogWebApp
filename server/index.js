import express from 'express';
import Connection from './database/db.js';
import router from './routes/route.js';

const app = express();
app.use('/', router)

app.listen(process.env.PORT,()=> console.log('Your server is up at Port 8000'))

Connection();