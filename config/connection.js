const{connect,connection}= require('mongoose'); 
const connectString= process.env.MONGODB_URI || 'mongodb://localhost27017/socialnetDB'

connect(connectString,{
    useNewUrlPar:true,
    useUniTop:true,
});
module.exports=connection