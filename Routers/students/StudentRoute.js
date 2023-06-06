   
const express=require("express");
const Router=express.Router();
const { 
   createSt,getSt,putSt ,stChangepass ,sendforgetPass,delSt ,loginSt,getsingleSt,
   createuploadtask,getuploadtask,deluploadtask,putuploadtask,
         }=require('../../controllers/students/StudentController')
const tast_assignment_upload=require('../../multer/students/task_upload')
Router.route('/students').post(createSt);
Router.route('/students').get(getSt);
Router.route('/students/:contact').get(getsingleSt);
Router.route('/students/:contact').put(putSt);
Router.route('/students/:contact').delete(delSt);
Router.route('/studentlogin').post(loginSt);
Router.route("/mail").get(sendforgetPass);
Router.route("/api/userchangepassword/:token").put(stChangepass)

//////
Router.route('/uploadtask').post(tast_assignment_upload.single('img'),createuploadtask);
Router.route('/uploadtask').get(getuploadtask);
Router.route('/uploadtask/:regno').put(tast_assignment_upload.single('img'),putuploadtask);
Router.route('/uploadtask/:regno').delete(deluploadtask);

   module.exports=Router;        