const {Schema,model,Types} = require('mongoose');

// moment imported 
const moment = require('moment');

// schema-react 
const schemaReact = new Schema(
    {
        reactId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactBody:{
            type: String,
            required: true,
            maxlength: 280
        },
        username:{
            type: String,
            required: true,
        },
        createdOn:{
            type:Date,
            default: Date.now,
            get: createdOnVal => moment(createdOnVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
       
    },
    {
        toJSON:{
            virtuals: true,
            getters: true
        },
        id: false,
    }
) 
// schema thought 
const opinionSchema= new Schema(
    {
        opinionText:{
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdOn:{
            type: Date,
            default: Date.now,
            get: createdOnVal => moment(createdOnVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username:{
            type: String,
            required: true,
        },
        reactions: 
            [schemaReact],},
        {
        toJSON:{
            virtuals:true,
            getters: true,
        },
        id: false,
        }
    
) 
opinionSchema.virtual("reactCount").get(function(){
    return this.reactions.length;
});
// user model created using user's schema
const Opinion = model('Opinion',opinionSchema);
module.exports=Opinion;