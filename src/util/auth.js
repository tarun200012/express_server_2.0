import {User} from '../user/user-model';
import jwt from 'jsonwebtoken';

export const newToken = user =>{
    return jwt.sign({id: user.id}, 'unacademy',{
        expiresIn: '10d'
    });
}

export const verifyToken = token =>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,'unacademy',(err,res)=>{
            if(err) reject(err);
            resolve(res);
        })
    })
}

export const signin = async (req,res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).send({message : "Email or Password missing"});
    }
    try {
        const user = await User.findOne({email: req.body.email}).select('email password').exec();
        if(!user) return res.status(401).send({message: "Invalid email"});
        const valid = await user.validatePassword(req.body.password);
        if(!valid) return res.status(401).send({message : "Wrong credentials"});
        const token =newToken(user);
        return res.status(200).send({token});
    } catch (e) {
        console.error(e);
        return res.status(500).end();
        
    }
}


export const signup = async (req,res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).send({message : "Email or Password missing"});
    }
    try {
        let alreadyuser = await User.findOne({email: req.body.email}).select('email password').exec();
        if(alreadyuser) return res.status(401).send({message: "IAlready registered email"});
        else{
        const user = await User.create(req.body);
        const token =newToken(user);
        return res.status(200).send({token});
        } 
        
    } catch(e){
        console.error(e);
        return res.status(500).end();
    }
    
}

export const isAuthenticated =async (req,res,next) =>{
    if(!req.headers.authorization){
        return res.status(401).end();
    }
    let token = req.headers.authorization;
    if(!token) return res.status(401).send({message: "Auth failed"});
    if(!token.startsWith('Bearer'))return res.status(401).send({message: "Auth failed"});

    token=token.split('Bearer ')[1].trim();
    try {
    const payload= await verifyToken(token);   
    console.log(payload);
    const user =await User.findById(payload.id).select('email').exec();
    if(!user) return res.status(401).end();
    req.user = user;   
    next(); 
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
} 