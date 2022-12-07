const {Schema, model, Types}=require('mongoose');
// schema to create user model
const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email:{
            type: String,
            unique: true,
            required: true,
            match:[ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address",],
        },
        opinions: [
            {
                type:Schema.Types.ObjectId,
                ref: "Opinion",
            },
        ],
        friends:[
            {
                type:Schema.Types.ObjectId,
                ref:"User",
            },
        ],
    },
    {
        toJSON:{
            virtuals:true,
        },
        id:false,
    }
); 
userSchema.virtual("friendCount").get(function(){
    return this.friends.length;
});
const User = model('User', userSchema);

module.exports =User;