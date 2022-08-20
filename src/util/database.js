import mongoose from "mongoose";  
import {config} from "../config/development.js";  

export const connect = (url = config.databaseURL, opts={} )=>{
    console.log("mongoose up");
    return mongoose.connect(url,
        {...opts, useNewUrlParser: true}
        );
}