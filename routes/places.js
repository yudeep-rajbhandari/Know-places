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

    router.get('/findPlace',function(req,res,next){
    model.find({},function(err,data){
            if(err) {
                thow(err);
            }
            if(!err){
                res.status(200).json({data:data})
    }
        })
    });
router.get('/listPlaces/:district',function(req,res,next){
    model.find({district:req.params.district},function(err,data){
        console.log(req.params.district);
        if(err){
            throw (err);
        }
    if(!err){
        res.status(200).json({data:data})
        console.log(data);
    }
    })


});
router.get('/showPlaces/:placeid',function(req,res,next){
    model.find({_id:req.params.placeid},function(err,data){
        console.log(req.params.placeid);
        if(err){
            throw (err)
        }
        if(!err) {
            res.status(200).json({data: data})
            console.log(data);
        }
        })
    });

router.get('/showPlaces1/:category',function(req,res,next){
    model.find({categories:req.params.category},function(err,data){
        console.log(req.params.category);
        if(err){
            throw (err)
        }
        if(!err) {
            res.status(200).json({data: data})
            console.log(data);
        }
    })
});

router.post('/deleteItem',function(req,res,next){
    console.log(req.body.user);
model.remove({ _id:req.body.user },function(err){

    if(err) {
        throw(err)
    }

    if(!err){
        res.status(200).json({message:'successfully deleted'})
    }
})
})




module.exports = router;