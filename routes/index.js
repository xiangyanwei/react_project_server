const express = require('express');
const {UserModel} = require('../db/userData') ;
const router = express.Router();
const filter = {password:0, __v: 0} ;
const md5 = require('blueimp-md5')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res){
  const {username, password, type} = req.body ;
    UserModel.findOne({username}, (err, userDoc)=>{
        console.log(1111);
      if(userDoc){
          res.send('该用户已经存在') ;
      }else{
          new UserModel({username, password: md5(password), type}).save((err, data)=>{
            res.json({code: 0, data:{user_id: data._id, type}}) ;
            res.cookie('user_id', data._id, {maxAge: 1000*60*60*24*7}) ;

          })
      }
    })
})

router.post('/login', (req, res)=>{
  const {username, password} = req.body;
  UserModel.findOne({username, password: md5(password)}, filter, (err, userDoc)=>{
    if(userDoc){
        res.cookie('user_id', userDoc._id, {maxAge: 1000*60*60*24*7}) ;
        res.send(userDoc) ;
    }else{
      res.send('用户名或密码错误') ;
    }
  })

})

module.exports = router;
