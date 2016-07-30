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
    var travel1=req.body.addtravel;
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


module.exports = router;