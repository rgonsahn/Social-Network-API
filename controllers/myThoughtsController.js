const{Opinion,User}=require('../models'); 
module.exports={
    // Get your thoughts
getOpinion(req,res){
    Opinion.find({})
    .then ((opinion)=> res.json(opinion))
    .catch((err) => res.status(500).json(err))
},

// Get Single thought
getSingleOpinion(req,res){
    Opinion.findOne({_id: req.params.opinionId})
    .select('-__v')
    .then((opinion)=>
    !opinion
    ?res.status(404).json({message:"No opinion/thought found with this ID"}):res.json(opinion)
    )
    .catch((err)=> res.status(500).json(err));
}
}