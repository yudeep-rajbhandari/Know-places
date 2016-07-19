/**
 * Created by root on 6/29/16.
 */
var express = require('express');
var router = express.Router();
var model = require('./../models/places.js');
var where = require("lodash.where");;
var user = require('./../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


router.post('/addPlace',function(req,res,next){
    var places=req.body.addPlaces;

user.find({_id:places.userid},function(err,data){
    places.role=data[0].role;
    console.log(data);

        var addthis = new model(places);
        addthis.save(function(err,data) {
            if (err) {
                throw (err);
            }
            if (!err) {
                res.status(200).json({success: true, data: data})
            }
            else {
                next(err);
            }
        })
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
router.get('/Requests',function(req,res,next){
    model.find({role:'user'},function(err,data){
        if(err) {
            thow(err);
        }
        if(!err){
            res.status(200).json({data:data})
            console.log(data)
        }
    })
});
router.get('/listPlaces/:district',function(req,res,next){

    model.find({district:req.params.district,role:'admin'},function(err,data){
        if(err){
            throw (err)
        }
        if(!err){
            res.status(200).json({data:data})
        }
    })



        })




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
router.get('/showPlaces12/:placeid',function(req,res,next){
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
router.put('/updateRequest/:id', function (req, res, next) {
    model.findById(req.params.id, function (err, user) {
        if (err) throw err;

        // change the users location
        user.role = 'admin';
        console.log( user.role);

        // save the user
        user.save(function (err,data) {
            if (err) {throw err;}
            else{
                res.json({success: true, message: "successfully updated",data:data});
                console.log('User successfully updated!');}


        });
    });
})
router.get('/getDistrict',function(req,res,next){
    console.log("logggggg")
    model.distinct('district',function(err,data){
        if(err){
            throw(err)
        }
        if(!err){
            res.status(200).json({data:data})
            console.log('>>>>>>>>>>',data);
        }

    })
})

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