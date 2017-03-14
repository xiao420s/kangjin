const mysql=require('mysql');
const mysqlpool=mysql.createPool({
    host:'localhost',
    database:'kangjin',
    user:'root',
    password:'',
    connectionLimit:10000
});
function pool(sql,para,fn){
    mysqlpool.getConnection((error,con)=>{
        if(para instanceof Array){
            con.query(sql,para,(err,res)=>{
                fn(err,res);
            });
        }else{
            con.query(sql,(err,res)=>{
                para(err,res);
            })
        }
    })
}
module.exports=pool;