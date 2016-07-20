/**
 * Created by linux on 6/11/16.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var placeSchema = new Schema({
    "userid": {"type": Schema.Types.ObjectId,required:true, ref: 'user'},
    "placeName":{"type":String},
    "placeDescription" : {"type" : String},
    "placeAddress" : {"type" : String },
    "latitude" : {"type" : Number},
    "longitude" : {"type" : Number},
    "imageLink" : {"type" : String},
    "district":{"type": String},
    "categories":{"type":String},
    "role":{"type":String ,required:true},
    "driveway":{"type":String},
    "expense":{"type":String},
    "nearbyHotels":{"type":String}

});

module.exports=mongoose.model('places',placeSchema);