   
const express=require("express");
const Router=express.Router();
const assignment_upload=require('../../multer/teachers/assignment_upload')
const events_upload=require('../../multer/teachers/evets')
const { getAssignment,createAssignment,putAssignment,delAssignment,createAddFee,getsingleFee, putAddFee,delAddFee,getAllAddFee,gettotalpaidFee,
    loginInstructor, getAllResult,getsingleResult,delResult,putResult,createResult,
    createScheduleClass,putScheduleClass  ,delScheduleClass,getAllScheduleClass,createEvent,getEvent,getSingleEvent,deleteEvent,putEvent,
         }=require('../../controllers/teachers/TeacherController')
/**fee */
Router.route('/event/:event').put(events_upload.single('img'),putEvent);
Router.route('/event/:event').delete(deleteEvent); 
Router.route('/event/:event').get(getSingleEvent); 
Router.route('/event').post(events_upload.single('img'),createEvent);
Router.get('/event',getEvent)

 Router.route('/fee/:regno').put(putAddFee);
 Router.route('/fee/:regno').delete(delAddFee); 
 Router.route('/fee/:regno').get(getsingleFee); 
 Router.route('/totalpaidfee').get(gettotalpaidFee); 
 /*  Instructor Login */
Router.route('/instructorlogin').post(loginInstructor);
/*  Class ROUTER */
Router.route('/class').post(createScheduleClass);
 Router.route('/class/:contact_instructor').put(putScheduleClass);
 Router.route('/class/:contact_instructor').delete(delScheduleClass); 
 Router.route('/class').get(getAllScheduleClass);

/**Result wala*/
 
Router.route('/marks').post(createResult);
Router.get('/marks',getAllResult)

 Router.route('/marks/:regno').put(putResult);
 Router.route('/marks/:regno').delete(delResult); 
 Router.route('/marks/:regno').get(getsingleResult); 
 

 /**ADD ASSignmenyt */
 
//  Router.route('/assign').post(assignment_upload.single('upload',{name:"upload"}),createAssignment);
 Router.post('/assign',assignment_upload.single('upload',{name:"upload"}),createAssignment)
 Router.route('/assign/:contact_instructor').put(assignment_upload.single('upload'),putAssignment);
 Router.route('/assign/:contact_instructor').delete(delAssignment);  
 Router.route('/assign').get(getAssignment);
   module.exports=Router;