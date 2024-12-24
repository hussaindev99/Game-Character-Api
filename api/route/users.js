const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup route
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                Name: req.body.Name,
                email: req.body.email,
                password: hash,
               
            });
            user.save()
                .then(result => {
                    res.status(200).json({
                        new_user: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err,
                        msg:err,
                        
                        
                    });
                });
        }
    });
});

// Login route
router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    msg: "user not exist"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err || !result) {
                    return res.status(401).json({
                        msg: "password is invalid"
                    });
                } else {
                    console.log(req.body.password);
                    const token = jwt.sign({
                        Name: user[0].Name,
                        email: user[0].email,
                    
                    }, "do you know", {
                        expiresIn: "24h"
                    });
                    res.status(200).json({
                        Name: user[0].Name,
                        email: user[0].email,
                        _id:user[0]._id,
                        token: token
                    });
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                msg:'Network error'
            });
        });
});

router.get('/:id',(req,res,next)=>{
    User.findById(req.params.id)
    .then(result=>{
        console.log(result);
        res.status(200).json({
            result:result
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})
router.get('/',(req,res,next)=>{
    User.find()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            result:result
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})



router.put('/:id', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              Name: req.body.Name,
              email: req.body.email,
              password: hash
            }
          },
          { new: true }
        )
          .then(result => {
            res.status(200).json({
              result: result
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    });
  });
  


module.exports = router;

