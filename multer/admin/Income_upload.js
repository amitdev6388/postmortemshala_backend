const multer=require("multer")
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./assets/admin/incomr_upload')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
});

 
var income_upload=multer({
    storage:storage,
   
})
module.exports=income_upload;