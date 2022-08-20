import {Router} from 'express';
import controllers from './post-controller';

const router=Router();

router
    .route('/')
    .get(controllers.getOne)
    .post(controllers.createOne);

    // router
    // .route('/post/:id/:num')
    // .get((req,res)=>{
    //     res.send("okget");
    // })
    // .patch((req,res)=>{

    //     res.send(req.body);
    // })
    // .delete((req,res)=>{

    //     res.send(req.body);
    // });

    export default router;


