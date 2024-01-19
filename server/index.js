import express from 'express';
import { PORT , mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

// app.use(cors(
//     {
//         origin: 'http://localhost:5173/',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     }
// ));

app.use('/books', booksRoute)


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`App is running at port : ${PORT}`)
        });
    })
    .catch((error)=>{
        console.log(error)
    })