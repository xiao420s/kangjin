const express=require('express');
const router=express.Router();
const path=require('path');
//首页
router.get('/',(req,res)=>{
    res.sendFile(path.resolve("./views/index/index.html"));
});
//新闻页面
router.get('/news',(req,res)=>{
    res.sendFile(path.resolve("./views/index/newsList.html"));
});
router.get('/news/:cat_id',(req,res)=>{
    res.sendFile(path.resolve("./views/index/newsList.html"));
});
router.get('/news/:cat_id/:news_id',(req,res)=>{
    res.sendFile(path.resolve("./views/index/Company-news.html"));
});
//营养保健
router.get('/health',(req,res)=>{
    res.sendFile(path.resolve("./views/index/health.html"));
});
router.get('/health/:news_id',(req,res)=>{
    res.sendFile(path.resolve("./views/index/health-news.html"));
});
//产品页面
router.get('/product',(req,res)=>{
    res.sendFile(path.resolve("./views/index/Lproductlist.html"));
});
router.get('/product/:cat_id',(req,res)=>{
    res.sendFile(path.resolve("./views/index/Lproductlist.html"));
});
router.get('/product/:cat_id/:p_id',(req,res)=>{
    res.sendFile(path.resolve("./views/index/p_display.html"));
});
//联系我们
router.get('/contact',(req,res)=>{
    res.sendFile(path.resolve("./views/index/contact.html"));
});
//招聘页面
router.get('/recruit',(req,res)=>{
    res.sendFile(path.resolve("./views/index/recruit.html"));
});
//关于我们
router.get('/summary',(req,res)=>{
    res.sendFile(path.resolve("./views/index/summary.html"));
});
router.get('/green',(req,res)=>{
    res.sendFile(path.resolve("./views/index/green.html"));
});
router.get('/culture',(req,res)=>{
    res.sendFile(path.resolve("./views/index/Lculture.html"));
});
//页脚留言信息
router.post('/message', (req, res)=> {
    mysql('insert into message (name,email,phone,content) values(?,?,?,?)',
        [req.body.name,req.body.mail,req.body.phone,req.body.message], (err, data)=> {
            if (err) {
                res.json('err');
            } else {
                res.json(data.insertId);
            }
        });
});
module.exports=router;