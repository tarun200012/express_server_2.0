import {Router} from 'express';
import controllers from './user-controller';

const userRouter=Router();

userRouter.route("/")
       .get(controllers.getMany)
       .post(controllers.createOne);

    // router
    // .route('/:id')
    // .get(controllers.getOne);
    // .patch((req,res)=>{

    //     res.send(req.body);
    // })
    // .delete((req,res)=>{

    //     res.send(req.body);
    // });

    export default userRouter;

