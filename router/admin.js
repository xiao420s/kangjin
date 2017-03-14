const express=require('express');
const router=express.Router();
const path=require('path');
const pool=require('../mysql.js');
const multer=require('multer');
const upload=multer({dest:'./upload/'});
const fs=require('fs');
const async=require('async');

router.get('/',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_product.html"));
});
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
        // if (!err) {
        //     res.redirect('/admin/admin_news');
        // }
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
router.get('/admin_news/:cat_id',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_newsContent.html"));
});
/////////////////////
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
router.get('/admin_health',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin-industry.html"));
});
router.get('/admin_health/:cat_id',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_hdetails.html"));
});
router.get('/admin_recruit',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_Lrecruit.html"));
});
router.get('/admin_recruit/:cat_id',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_Lrecruit_details.html"));
});
/////////////////////////////////
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