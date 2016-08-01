/**
 * Created by linux on 7/30/16.
 */

var express = require('express');
var router = express.Router();
var model = require('./../models/userPlaces.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/addtravel',function(req,res,next){
    var travel1=req.body.addTravel;
    console.log(travel1);

    var addnew = new model(travel1);
    addnew.save(function(err,data) {
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

router.get('/storiesList',function(req,res,next){
    model.find({},function(err,data){
        if(err){
            throw err;
        }
    if(data){
        res.status(200).json({data:data})
    }
    })
})

router.get('/showfullstories/:storiesid',function(req,res,next){
    console.log('<<<<<');

    console.log(req.params.storiesid)
    model.find({_id:req.params.storiesid},function(err,data){
        if(err){
            throw err;
        }
        if(data){
            res.status(200).json({data:data})
        }
    })
})
router.post('/deleteItem1',function(req,res,next){
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