/**
 * Created by linux on 7/30/16.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var userPlaceSchema = new Schema({
    "userName": {"type": String},
    "profilepic":{"type":String},
    "visitedPlace" : {"type" : String},
    "visitedPlacelink" : {"type" : String},
    "Travel" : {"type" : String },
    "Travellink" : {"type" : String },
    "latitude" : {"type" : Number},
    "longitude" : {"type" : Number},
    "bestStay" : {"type" : String},
    "bestStaylink" : {"type" : String},


    "Food":{"type":String},
    "Foodlink":{"type":String},
    "Fares":{"type":String},
    "Adventures":{"type":String},
    "Difficulties":{"type":String},
    "quote":{"type":String},
    "Adventureslink":{"type":String},
    "Rating":{"type":String}



});

module.exports=mongoose.model('userPlaces',userPlaceSchema);
