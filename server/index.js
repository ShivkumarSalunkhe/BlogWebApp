import express from 'express';

import Connection from './database/db.js';


const app = express();



app.listen(process.env.PORT,()=> console.log('Your server is up at Port 8000'))

Connection();