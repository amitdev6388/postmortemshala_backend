const mysql=require('mysql')
 const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"postmortemshala"
 })
 con.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("db connected successfully...")
    }
 })
 module.exports=con;