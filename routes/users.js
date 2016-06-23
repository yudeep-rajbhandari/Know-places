var express = require('express');
var router = express.Router();
var model = require('./../models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req,res,next){
  var information=req.body.userdata;
  console.log(information);
  model.findOne({emailAddress:information.emailAddress}, function(err,data) {
      console.log('<<<<<<<<',data);
    if (err) throw err;
    if (data) {
      res.json({ success:false, message: 'signup failed,email address already taken'});
    }
    else {



    var user = new model(information)

    user.save(function (err, data) {
          if (!err) {
            res.status(200).json({data: data, message: "Signup successfull"})
          } else {
            next(err)
          }
        }
    )
  }
  })
});
router.post('/login', function (req, res, next) {
    model.findOne({emailAddress: req.body.user.emailAddress}, function (err, data) {
        if (err) throw err;
        if (!data) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            data.compare(req.body.user.password, function (match) {
                if (match) {
                    res.json({success: true, user: data});
                }
                else {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                }
            })

        }
    })

});


module.exports = router;
