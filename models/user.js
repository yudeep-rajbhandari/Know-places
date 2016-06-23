/**
 * Created by linux on 5/30/16.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userSchema = new Schema({
    "name":{"type":String},
    "emailAddress" : {"type" : String},
    "password" : {"type" : String },
    "role":{"type"  : String},
    "age" : {"type" : Number},
    "Address" : {"type" : String},
    "number" : {"type" : Number},
    "gender":{"type":String}
});
userSchema.pre('save', function(next) {
    var usr=this;
    usr.password =usr.password;
    next();
})
userSchema.methods.compare=function(password,callback){

    console.log(this.password);
    console.log((password));
    callback( this.password==password);




}



module.exports=mongoose.model('user',userSchema);