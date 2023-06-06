   
const express=require("express");
const Router=express.Router();
const {createInstructor,putInstructor,getInstructor,getCourse,createCourse,putCourse,
   createAdmin,loginAdmin,putAdmin,getAdmin,deleteAdmin,
                                 deleteCourse,deleteInstructor,createEnquiry,getEnquiry,deleteEnquiry,
                                 createExpense,getExpense,deleteExpense,putExpense,putEnquiry,
                                 createStOfMonth,getStOfMonth,putStOfMonth,delStOfMonth,
                                 createincome,getincome,getSingleincome,deleteincome,putincome

                              }=require('../../controllers/admin/AdminController')
const course_upload=require('../../multer/admin/course_upload')
const Expense_Attach=require("../../multer/admin/Expense_Attach")
const income_upload=require('../../multer/admin/Income_upload')
const studentofmonth_upload=require('../../multer/admin/StudentOfMonth')
Router.route('/income').post(income_upload.single('attach'),createincome);
Router.route('/income').get(getincome);
Router.route('/income/:invoice_no').delete(deleteincome);
Router.route('/income/:invoice_no').put(getSingleincome);
Router.route('/income/:invoice_no').put(income_upload.single('attach'),putincome);


Router.route('/admin').post(createAdmin);
Router.route('/adminlogin').post(getAdmin);
Router.route('/admin/:contact').delete(deleteAdmin);
Router.route('/admin/:contact').put(putAdmin);
Router.route('/instructor').post(createInstructor);
Router.route('/instructor').get(getInstructor);
Router.route('/instructor/:contact').delete(deleteInstructor);
Router.route('/instructor/:contact').put(putInstructor);
Router.route('/course').post(course_upload.single('img'),createCourse);
Router.route('/course').get(getCourse);
Router.route('/course/:_id').delete(deleteCourse);
Router.route('/course/:_id').put(course_upload.single('img'),putCourse);
Router.route('/enquiry').post(createEnquiry);
Router.route('/enquiry').get(getEnquiry);
Router.route('/enquiry/:contact').delete(deleteEnquiry);
Router.route('/enquiry/:contact').put(putEnquiry);
Router.route('/expense').post(Expense_Attach.single("Attach_Document"),createExpense);
Router.route('/expense/:Invoice_Number').put(Expense_Attach.single("Attach_Document"),putExpense);
Router.route('/expense').get(getExpense);
Router.route('/expense/:Invoice_Number').delete(deleteExpense);
Router.route('/studentofmonth').post(studentofmonth_upload.single('img'),createStOfMonth);
Router.route('/studentofmonth').get(getStOfMonth);
Router.route('/studentofmonth/:regno').delete(delStOfMonth);
Router.route('/studentofmonth/:regno').put(studentofmonth_upload.single('img'),putStOfMonth);
   module.exports=Router; 