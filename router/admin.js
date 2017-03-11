const express=require('express');
const router=express.Router();
const path=require('path');
const pool=require('../mysql.js');
const multer=require('multer');
const upload=multer({dest:'upload/'});
const fs=require('fs');
const async=require('async');

router.get('/',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_product.html"));
    // res.sendFile(path.resolve('./views/admin/admin.html'));
});
router.post('/upload',upload.single('file'),(req,res)=>{
    /*console.log(req.file);
    const o=fs.createWriteStream(path.resolve('./upload',req.file.originalname))
    fs.createReadStream(path.resolve(req.file.path)).pipe(o);
    o.on('finish',()=>{
        fs.unlink(path.resolve(req.file.path));
    })*/
    async.series([(callback)=>{
        fs.createReadStream(path.resolve(req.file.path)).pipe(fs.createWriteStream(path.resolve('./upload',req.file.originalname)));
        callback(null);
    },(callback)=>{
        fs.unlink(path.resolve(req.file.path));
        callback(null);
    }])
});
////////////////////
router.get('/news',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_news.html"));
});
router.get('/news/getCates',(req,res)=>{
    pool('select * from content_cates order by cate_id desc',(result)=>{
        res.json(result);
    })
});
router.post('/news/updateCate',(req,res)=>{
    pool('update content_cates set cate_name=? where cate_id=?',[req.body.cate_name,req.body.cate_id],(result)=>{
        res.json(result);
    })
});
router.get('/news/del/:cate_id',(req,res)=>{
    pool('delete from content_cates where cate_id=?',[req.params.cate_id],(result)=>{
        res.json(result);
    })
});
router.get('/news/add',(req,res)=>{
    pool('insert into content_cates (cate_name) values ("")',[req.params.cate_id],(result)=>{
        res.json(result.insertId);
    })
});
//////////////////////////
router.get('/admin_news',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_NewsList.html"));
});
/////////////////////
router.get('/product',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_product.html"));
});
router.get('/product/getCates',(req,res)=>{
    pool('select * from product_cates order by cate_id desc',(result)=>{
        res.json(result);
    })
});
router.post('/product/updateCate',(req,res)=>{
    pool('update product_cates set cate_name=? where cate_id=?',[req.body.cate_name,req.body.cate_id],(result)=>{
        res.json(result);
    })
});
router.get('/product/del/:cate_id',(req,res)=>{
    pool('delete from product_cates where cate_id=?',[req.params.cate_id],(result)=>{
        res.json(result);
    })
});
router.get('/product/add',(req,res)=>{
    pool('insert into product_cates (cate_name) values ("")',[req.params.cate_id],(result)=>{
        res.json(result.insertId);
    })
});
/////////////////////
router.get('/admin_news/:cat_id',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_newsContent.html"));
});
router.get('/admin_productList',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_LproductList.html"));
});
router.get('/admin_productList/:cat_id',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/admin_productCon.html"));
});
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
router.get('/admin_message',(req,res)=>{
    res.sendFile(path.resolve("./views/admin/message.html"));
});
module.exports=router;