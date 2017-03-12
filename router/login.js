const express=require('express');
const router=express.Router();
const path=require('path');
const pool=require('../mysql.js');
const crypto = require('crypto');

router.get('/',(req,res)=>{
    if(req.session.login){
        res.redirect('/admin');
        return;
    }
    if(req.cookies.hash){
        pool("select * from admin_user where hash=?",[req.cookies.hash],(err,result)=>{
            if(err){
                res.sendFile(path.resolve("./views/admin/login.html"));
                return;
            }
            if(result.length){
                req.session.login=true;
                res.redirect('/admin');
            }else {
                res.sendFile(path.resolve("./views/admin/login.html"));
            }
        })
    }else{
        res.sendFile(path.resolve("./views/admin/login.html"));
    }
});
router.get('/logout',(req,res)=>{
    req.session.login=null;
    res.clearCookie('hash',{path:'/'});
    res.redirect('/login');
});
router.post('/check',(req,res)=>{
    const hash = crypto.createHash('md5');
    hash.update(req.body.password);
    const password=hash.digest('hex');
    pool("select * from admin_user where account=? and password=?",[req.body.userName,password],(err,result)=>{
        if(err){
            res.json('errc');
            return;
        }
         if(result.length){
             if(req.body.remember){
                 res.cookie('hash',result[0].hash,{expires:new Date(Date.now()+7*24*3600*1000),path:'/'});
             }
             req.session.login=true;
             res.json('ok');
         }else {
             res.json('err');
         }
     })
});
module.exports=router;