const express=require('express');
const router=express.Router();
const path=require('path');
const pool=require('../mysql.js');
const multer=require('multer');
const upload=multer({dest:'./upload/'});
const fs=require('fs');
const async=require('async');
//首页
router.get('/',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_product.html"));
});
//产品内容图片
router.post('/upload',upload.single('wangEditorH5File'),(req,res)=>{
    console.log(req.file);
    const filename=req.file.filename+'.'+(req.file.mimetype.split('/')[1]);
    async.series([(callback)=>{
        fs.createReadStream(path.resolve(req.file.path)).pipe(fs.createWriteStream(path.resolve('./public/product',filename)));
        callback(null);
    },(callback)=>{
        fs.unlink(path.resolve(req.file.path));
        callback(null);
    },(callback)=>{
        res.end(`http://localhost:3000/product/${filename}`);
    }])
});
////////////////////
//新闻分类管理
router.get('/news',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_news.html"));
});
router.get('/news/getCates',(req,res)=>{
    pool('select * from content_cates order by cate_id desc',(err,result)=>{
        res.json(result);
    })
});
router.post('/news/updateCate',(req,res)=>{
    pool('update content_cates set cate_name=? where cate_id=?',[req.body.cate_name,req.body.cate_id],(err,result)=>{
        res.json(result);
    })
});
router.get('/news/del/:cate_id',(req,res)=>{
    pool('delete from content_cates where cate_id=?',[req.params.cate_id],(err,result)=>{
        if(!err){
            res.redirect('/admin/news')
        }
    })
});
router.get('/news/add',(req,res)=>{
    pool('insert into content_cates (cate_name) values ("")',[req.params.cate_id],(err,result)=>{
        res.json(result.insertId);
    })
});
//////////////////////////
//新闻列表
router.get('/admin_news',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_NewsList.html"));
});
router.get('/admin_news/newsall', (req, res)=> {
    pool('select * from content order by c_id desc', (err, data)=> {
        res.json(data);
    })
});
router.get('/admin_news/add',(req,res)=>{
    pool('insert into content (title,views,content,subtitle,cate_id) values ("","","","",1)',(err,result)=>{
        res.json(result.insertId);
    })
});
router.get('/admin_news/updateCate/:c_id/:cate_id',(req,res)=>{
    pool('update content set cate_id=? where c_id=?', [req.params.cate_id,req.params.c_id],(err, data)=> {
        if(!err){
            res.json('ok');
        }
    })
});
router.get('/admin_news/delete/:c_id', (req, res)=> {
    pool('delete from content where c_id = ?',
        [req.params.c_id], function (err, data) {
            if (!err) {
                res.redirect('/admin/admin_news');
            }
        })
});
//////////////////////////
//新闻详情页
router.get('/admin_news/:cat_id',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_newsContent.html"));
});
router.post('/admin_news/getcontentlist/:id',(req,res)=>{
    pool('select * from content where c_id=?',[req.params.id],(err,result)=>{
        res.json(result);
    })
});
router.get('/admin_news/:id/getThumb',(req,res)=>{
    pool("select c_id,img_url from content where c_id=?",[req.params.id],(err,result)=>{
        res.json(result);
    })
})
router.get('/admin_news/del/thumb/:id',(req,res)=>{
    pool('update content set img_url="" where c_id=?',[req.params.id],(err,result)=>{
        if(!err){
            res.json('ok');
        }
    })
});
router.post('/admin_news/upload/thumb/:id',upload.single('file'),(req,res)=>{
    console.log(req.file)
    const filename=req.file.filename+'.'+(req.file.mimetype.split('/')[1]);
    async.series([(callback)=>{
        fs.createReadStream(path.resolve(req.file.path)).pipe(fs.createWriteStream(path.resolve('./public/product',filename)));
        callback(null);
    },(callback)=>{
        fs.unlink(path.resolve(req.file.path));
        callback(null);
    },(callback)=>{
        pool('update content set img_url=? where c_id=?',[`/product/${filename}`,req.params.id],(err,result)=>{
            if(!err){
                res.json({id:req.params.id,src:`/product/${filename}`});
            }else{
                res.json('err');
            }
        })
    }])
});
router.post('/admin_news/updatecontent/:cate_id', (req, res)=> {
    console.log(req.body)
    pool('update content set title=?,author=?, content=?,subtitle=? where c_id=?',
        [req.body.title,req.body.author, req.body.content,req.body.subtitle,req.params.cate_id], (err, data)=> {
            if (err) {
                res.json('err');
            } else {
                res.json(data.insertId);
            }
        });
});
/////////////////////
//产品分类
router.get('/product',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_product.html"));
});
router.get('/product/getCates',(req,res)=>{
    pool('select * from product_cates order by cate_id desc',(err,result)=>{
        res.json(result);
    })
});
router.post('/product/updateCate',(req,res)=>{
    pool('update product_cates set cate_name=? where cate_id=?',[req.body.cate_name,req.body.cate_id],(err,result)=>{
        res.json(result);
    })
});
router.get('/product/del/:cate_id',(req,res)=>{
    pool('delete from product_cates where cate_id=?',[req.params.cate_id],(err,result)=>{
        if(!err){
            res.redirect('/admin/product')
        }
    })
});
router.get('/product/add',(req,res)=>{
    pool('insert into product_cates (cate_name) values ("")',[req.params.cate_id],(err,result)=>{
        res.json(result.insertId);
    })
});
/////////////////////
//产品列表
router.get('/admin_productList',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_Lproductlist.html"));
});
router.get('/admin_productList/getAll',(req,res)=>{
    pool('select id,name,cate_id,thumb from product order by id desc',(err,result)=>{
        res.json(result);
    })
})
router.get('/admin_productList/add',(req,res)=>{
    pool('insert into product (name,cate_id,thumb) values ("",1,"")',(err,result)=>{
        if(!err){
            res.redirect('/admin/admin_productList')
        }
    })
});
router.get('/admin_productList/del/:id',(req,res)=>{
    pool('delete from product where id=?',[req.params.id],(err,result)=>{
        if(!err){
            res.redirect('/admin/admin_productList')
        }
    })
});
router.get('/admin_productList/updateCate/:id/:value',(req,res)=>{
    pool('update product set cate_id=? where id=?',[req.params.value,req.params.id],(err,result)=>{
        if(!err){
            res.json('ok');
        }
    })
});
router.post('/update_productList/:id',(req,res)=>{
    pool('update product set name=?,ename=?,title=?,subtitle=?,fun=?,fun_content=?,fun_e_content=?,content=? where id=?',[req.body.name,req.body.ename,req.body.title,req.body.subtitle,req.body.fun,req.body.fun_content,req.body.fun_e_content,req.body.content,req.params.id],(err,result)=>{
        if(!err){
            res.json('ok');
        }
    })
});
//////////////////////////
//产品详情
router.get('/admin_productList/:cat_id',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_productCon.html"));
});
router.get('/admin_productList/:cat_id/get',(req,res)=>{
    pool('select * from product where id=?',[req.params.cat_id],(err,result)=>{
        res.json(result);
    })
});
router.get('/admin_productList/:cat_id/getCrousel',(req,res)=>{
    pool('select * from product_img where c_id=?',[req.params.cat_id],(err,result)=>{
        res.json(result);
    })
});
router.get('/admin_productList/:cat_id/getThumb',(req,res)=>{
    pool('select id,thumb from product where id=?',[req.params.cat_id],(err,result)=>{
        res.json(result);
    })
});
router.get('/del/thumb/:id',(req,res)=>{
    pool('update product set thumb="" where id=?',[req.params.id],(err,result)=>{
        if(!err){
            res.json('ok');
        }
    })
});
router.post('/upload/thumb/:id',upload.single('file'),(req,res)=>{
    const filename=req.file.filename+'.'+(req.file.mimetype.split('/')[1]);
    async.series([(callback)=>{
        fs.createReadStream(path.resolve(req.file.path)).pipe(fs.createWriteStream(path.resolve('./public/product',filename)));
        callback(null);
    },(callback)=>{
        fs.unlink(path.resolve(req.file.path));
        callback(null);
    },(callback)=>{
        pool('update product set thumb=? where id=?',[`/product/${filename}`,req.params.id],(err,result)=>{
            if(!err){
                res.json({id:req.params.id,src:`/product/${filename}`});
            }else{
                res.json('err');
            }
        })
    }])
});
router.post('/upload/crousel/:id',upload.single('file'),(req,res)=>{
    const filename=req.file.filename+'.'+(req.file.mimetype.split('/')[1]);
    async.series([(callback)=>{
        fs.createReadStream(path.resolve(req.file.path)).pipe(fs.createWriteStream(path.resolve('./public/product',filename)));
        callback(null);
    },(callback)=>{
        fs.unlink(path.resolve(req.file.path));
        callback(null);
    },(callback)=>{
        pool('insert into product_img (c_id,img_url) values (?,?)',[req.params.id,`/product/${filename}`],(err,result)=>{
            res.json({id:result.insertId,src:`/product/${filename}`});
        })
    }])
});
router.get('/del/crousel/:id',(req,res)=>{
    pool('delete from product_img where i_id=?',[req.params.id],(err,result)=>{
        if(!err){
            res.json('ok');
        }
    })
});
router.get('/admin_productList/:cat_id/getCrousel',(req,res)=>{
    pool('select * from product_img where c_id=?',[req.params.cat_id],(err,result)=>{
        res.json(result);
    })
});
//////////////////////////
//营养保健列表
router.get('/admin_health',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin-industry.html"));
});
router.get('/admin_health/all',(req,res)=>{
    pool('select * from health order by c_id desc',(err,result)=>{
        res.json(result)
    })
});
router.get('/admin_health/add',(req,res)=>{
    pool('insert into health (title,views,subtitle) values ("","","")',
        (req,result)=>{
            res.json(result.insertId);
        })
});
router.get('/admin_health/del/:c_id',(req,res)=>{
    pool('delete from health where c_id=?',[req.params.c_id],(err,result)=>{
        if(!err){
            res.redirect('/admin/admin_health');
        }
        // res.json(result);
    })
});
//////////////////////////
//营养保健详情
router.get('/admin_health/:cat_id',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_hdetails.html"));
});
router.get('/admin_healthcontent/:id/getThumb',(req,res)=>{
    pool("select c_id,img_url from health where c_id=?",[req.params.id],(err,result)=>{
        res.json(result);
    })
});

router.get('/admin_healthcontent/del/thumb/:id',(req,res)=>{
    pool('update health set img_url="" where c_id=?',[req.params.id],(err,result)=>{
        if(!err){
            res.json('ok');
        }
    })
});

router.post('/admin_healthcontent/upload/thumb/:id',upload.single('file'),(req,res)=>{
    console.log(req.file);
    const filename=req.file.filename+'.'+(req.file.mimetype.split('/')[1]);
    async.series([(callback)=>{
        fs.createReadStream(path.resolve(req.file.path)).pipe(fs.createWriteStream(path.resolve('./public/product',filename)));
        callback(null);
    },(callback)=>{
        fs.unlink(path.resolve(req.file.path));
        callback(null);
    },(callback)=>{
        pool('update health set img_url=? where c_id=?',[`/product/${filename}`,req.params.id],(err,result)=>{
            if(!err){
                res.json({id:req.params.id,src:`/product/${filename}`});
            }else{
                res.json('err');
            }
        })
    }])
});


router.post('/admin_health/getcontentlist/:id',(req,res)=>{
    pool('select * from health where c_id=?',[req.params.id],(err,result)=>{
        res.json(result);
    })
});

router.post('/admin_health/updatecontent/:cate_id', (req, res)=> {
    console.log(req.body);
    pool('update health set title=?,author=?, content=?,subtitle=? where c_id=?',
        [req.body.title,req.body.author, req.body.content,req.body.subtitle,req.params.cate_id], (err, data)=> {
            if (err) {
                res.json('err');
            } else {
                res.json(data.insertId);
            }
        });
});
/////////////////////////
//招聘列表
router.get('/admin_recruit',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_Lrecruit.html"));
});
router.get('/admin_recruit/getid',(req,res)=>{
    pool('select * from recruit order by id desc',(err,result)=>{
        res.json(result);
    })
});
router.get('/admin_recruit/add',(req,res)=>{
    pool('insert into recruit (job) values ("")',(err,result)=>{
        res.json(result.insertId);
    })
});
router.get('/admin_recruit/del/:id',(req,res)=>{
    pool('delete from recruit where id=?',[req.params.id],(err,result)=>{
        if(!err){
            res.redirect('/admin/admin_recruit')
        }
    })
});
/////////////////////////
//招聘详情
router.get('/admin_recruit/:cat_id',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_Lrecruit_details.html"));
});
router.get('/admin_recruit/:cat_id/getid',(req,res)=>{
    pool('select * from recruit where id=?',[req.params.cat_id],(err,result)=>{
        res.json(result);
    })
});
router.post('/admin_recruit/:cat_id/updateinfo',(req,res)=>{

    pool('update recruit set job=?, num=?, demand=? where id=?',[req.body.job,req.body.num,req.body.demand,req.body.id],(err,result)=>{
        console.log(result)
        if(!err){
            res.json('ok')
        }
    })
});
/////////////////////////////////
//留言查看
router.get('/admin_message',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/message.html"));
});
//获取留言页面的信息
router.get('/all', (req, res)=> {
    pool('select * from message order by m_id desc', (err, data)=> {
        res.json(data);
    })
});
router.get('/admin_message/delete/:m_id', (req, res)=> {
    pool('delete from message where m_id = ?',
        [req.params.m_id], function (err, data) {
            if (!err) {
                res.redirect('/admin/admin_message');
            }
        })
});
/////////////////////
module.exports=router;