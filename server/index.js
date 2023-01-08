import express from 'express';
import Connection from './database/db.js';
import router from './routes/route.js';
import cors from 'cors'
import bodyParser from 'body-parser';


const app = express();

app.use(cors())

app.use(bodyParser.json({extented:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/', router)
app.listen(process.env.PORT,()=> console.log('Your server is up at Port 8000'))

Connection();