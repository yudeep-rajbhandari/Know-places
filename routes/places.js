/**
 * Created by root on 6/29/16.
 */
var express = require('express');
var router = express.Router();
var model = require('./../models/places.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/addPlace',function(req,res,next){
    var places=req.body.addPlaces;


        var addthis = new model(places);
        addthis.save(function(err,data){
            if(err){
                throw (err);
            }
        if(!err){
                res.status(200).json({success:true, data:data})
            }
            else{
            next(err);
        }
        })

    });

    router.get('/findPlaces',function(req,res,next){
    model.find({},function(err,data){
            if(err) {
                thow(err);
            }
            if(data){
                res.status(200).json({data:data})
    }
        })
    });



module.exports = router;