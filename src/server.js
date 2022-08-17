import express from 'express';
import morgan from 'morgan';
import {json , urlencoded} from 'body-parser';

const app=express();
const router =express.Router();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev')) ;
app.use('/api/v1',router);


router
    .route('/post')
    .get((req,res)=>{
        res.send("okget");
    })
    .post((req,res)=>{

        res.send(req.body);
    })







export const start=()=>{
    app.listen(3000,()=>{
        console.log("server start");
    })
}