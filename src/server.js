import express from 'express';
import morgan from 'morgan';
import {json , urlencoded} from 'body-parser';
import postRouter from './post/post-router';
import userRouter from './user/user-router';
import {connect} from "./util/database";

const app=express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev')) ;

app.use('/api/post',postRouter);
app.use('/api/user',userRouter);






export const start=async ()=>{
    await connect();
    app.listen(3000,()=>{
        console.log("server start");
    })
}