import express from 'express';
import morgan from 'morgan';
import {json , urlencoded} from 'body-parser';
import postRouter from './post/post-router';
import userRouter from './user/user-router';
import {connect} from "./util/database";
import cors from "cors";
import {signin,signup,isAuthenticated} from "./util/auth"

const app=express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev')) ;

app.use('/api',isAuthenticated);

app.use('/api/post',postRouter);
app.use('/api/user',userRouter);

app.post('/signup',signup);
app.post('/signin',signin);




export const start=async ()=>{
    await connect();
    app.listen(3000,()=>{
        console.log("server start");
    })
}