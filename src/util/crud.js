export const getOne = model => async (req,res)=>{
    try{
        const doc= await model.findOne({id: req.params.id}).exec();
        if(!doc){
            return res.status(404).end();
        }
        res.status(200).json({data: doc});

    }
    catch(e){
console.error(e);
res.status(400).end();
    }
}



export const getMany = model => async (req,res)=>{
    try{
        const doc= await model.find({}).exec();
        if(!doc){
            return res.status(404).end();
        }
        res.status(200).json({data: doc});

    }
    catch(e){
console.error(e);
res.status(400).end();
    }
}

export const createOne = model => async (req,res)=>{
    try{
        const doc= await model.create(req.body);
        res.status(200).json({data: doc});

    }
    catch(e){
console.error(e);
res.status(400).end();
    }
}

export const updateOne = model => async (req,res)=>{
    try{
        const doc= await model.findOneAndUpdate({id: req.params.id}, req.body, {new: true}).exec();
        if(!doc){
            return res.status(404).end();
        }
        res.status(200).json({data: doc});

    }
    catch(e){
console.error(e);
res.status(400).end();
    }
}
export const removeOne = model => async (req,res)=>{
    try{
        const doc= await model.findOneAndRemove({id: req.params.id}).exec();
        if(!doc){
            return res.status(404).end();
        }
        res.status(200).json({data: doc});

    }
    catch(e){
console.error(e);
res.status(400).end();
    }
}

export const crudControllers = model => ({
    removeOne: removeOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model),
       getMany: getMany(model),
       getOne: getOne(model),
})

























