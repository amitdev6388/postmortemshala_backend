const InstructorRegisterSchema=require('../../models/admin/InstructorModel')
const AdminRegisterSchema=require('../../models/admin/Admin_reg')
const CourseSchema=require("../../models/admin/Add_Course");
const Enquiry_adminSchema=require("../../models/admin/Enquiry_admin")
const ExpenseSchema=require('../../models/admin/Expense_admin')
const StudentOfMonthSchema=require('../../models/admin/StudentOfMonth')
const IncomeSchema=require('../../models/admin/income')
const createAdmin=async(req,resp)=>{
    try { 
        
        const name=req.body.name;
      
    const address=req.body.address; 
       const contact=req.body.contact;
       const email=req.body.email;
        const gender=req.body.gender;
         const dob=req.body.dob;
         const qualification=req.body.qualification;
       const degree=req.body.degree;
       const exp=req.body.exp;
       const password=req.body.password;
     
        
       const usermail = await AdminRegisterSchema.findOne({ email: email });
       console.log(usermail);
       if (usermail) {
         resp.status(404).json({
           code: 404,
           message: "user aleready exist....  ",
           data: [],
           error: false,
           status: false,
         });
       } else {
         let data = new AdminRegisterSchema({
           
      name, 
      address,
      contact,
      email,
      gender,
      dob,
      qualification,
      degree,
      exp,
      password
         });
        
         let result = await data.save();
     
   
         resp.status(200).json({
           code: 200,
           message: "user  Register successfully",
   
           error: false,
           status: true,
         });
       }
     } catch (err) {
       console.log(err);
     }
}
const loginAdmin=async(req,resp,next)=>{
  try { 
    const email = req.body.email;
    const password = req.body.password;
    const usermail = await AdminRegisterSchema.findOne({
      email: email,
      password: password,
    });
    if (usermail) {
      resp.status(200).json({
        code: 200,
        message: "user Login successfully",
        data: {
          _id: usermail._id,
          name: usermail.name,
          email: usermail.email,
          contact: usermail.contact,
        },
        error: false,
        status: true,
      });
      console.log(usermail._id);
    } else {
      resp.status(404).json({
        code: 404,
        message: "Invalid User details, Try Again.  ",
        data: [],
        error: false,
        status: false,
      });
    }
    } catch (err) {
      console.log(err);
    }
}  
const putAdmin=async(req,res)=>{
  try {

    const name=req.body.name; 
    const address=req.body.address; 
       const contact=req.body.contact;
       const email=req.body.email;
        const gender=req.body.gender;
         const dob=req.body.dob;
         const qualification=req.body.qualification;
       const degree=req.body.degree;
       const exp=req.body.exp;
       const password=req.body.password;
      

     let data = await AdminRegisterSchema.updateOne(
     {contact: req.params.contact},
      { $set:   {
        name, 
      address,
      contact,
      email,
      gender,
      dob,
      qualification,
      degree,
      exp,
      password
        
      } }

  );
       res.send(data);

   } catch (err) {
       console.log(err)
   }
 
}

const getAdmin=async(req,resp,next)=>{
  try { 
    const email = req.body.email;
    const password = req.body.password;
    const usermail = await AdminRegisterSchema.findOne({
      email: email,
      password: password,
    });
    if (usermail) {
      resp.status(200).json({
        code: 200,
        message: "user Login successfully",
        data: {
          _id: usermail._id,
          name: usermail.name,
          email: usermail.email,
          contact: usermail.contact,
        },
        error: false,
        status: true,
      });
      console.log(usermail._id);
    } else {
      resp.status(404).json({
        code: 404,
        message: "Invalid User details, Try Again.  ",
        data: [],
        error: false,
        status: false,
      });
    }
    } catch (err) {
      console.log(err);
    }
}   

const deleteAdmin= async (req, resp) => {
  try {
    console.log(req.params.contact);
    let data = await AdminRegisterSchema.deleteOne({contact:req.params.contact});
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
}

const createInstructor=async(req,resp)=>{
  try { 
      
      const name=req.body.name;
    
  const address=req.body.address; 
     const contact=req.body.contact;
     const email=req.body.email;
      const gender=req.body.gender;
       const dob=req.body.dob;
       const qualification=req.body.qualification;
     const degree=req.body.degree;
     const exp=req.body.exp;
     const password=req.body.password;
   
      
     const usermail = await InstructorRegisterSchema.findOne({ email: email });
     console.log(usermail);
     if (usermail) {
       resp.status(404).json({
         code: 404,
         message: "user aleready exist....  ",
         data: [],
         error: false,
         status: false,
       });
     } else {
       let data = new InstructorRegisterSchema({
         
    name, 
    address,
    contact,
    email,
    gender,
    dob,
    qualification,
    degree,
    exp,
    password
       });
      
       let result = await data.save();
   
 
       resp.status(200).json({
         code: 200,
         message: "user  Register successfully",
 
         error: false,
         status: true,
       });
     }
   } catch (err) {
     console.log(err);
   }
}
const putInstructor=async(req,res)=>{
try {

  const name=req.body.name; 
  const address=req.body.address; 
     const contact=req.body.contact;
     const email=req.body.email;
      const gender=req.body.gender;
       const dob=req.body.dob;
       const qualification=req.body.qualification;
     const degree=req.body.degree;
     const exp=req.body.exp;
     const password=req.body.password;
    

   let data = await InstructorRegisterSchema.updateOne(
   {contact: req.params.contact},
    { $set:   {
      name, 
    address,
    contact,
    email,
    gender,
    dob,
    qualification,
    degree,
    exp,
    password
      
    } }

);
     res.send(data);

 } catch (err) {
     console.log(err)
 }

}

const getInstructor=async(req,res)=>{

  let data = await InstructorRegisterSchema.find( );

  res.send(data);
}

const deleteInstructor= async (req, resp) => {
try {
  //console.log(req.params.contact);
  let data = await InstructorRegisterSchema.deleteOne({contact:req.params.contact});
  resp.send(data);
} catch (err) {
  console.log(err);
}
} 
const createCourse= async(req,resp)=>{
  try { 
    let img = req.file.filename;
    let title = req.body.title;
    let desc = req.body.desc;
    let level = req.body.level;
    let lessons = req.body.lessons;
    let duration = req.body.duration;
    let price = req.body.price;
    let rating = req.body.rating;
   
      
     const usermail = await CourseSchema.findOne({ title: title });
     console.log(usermail);
     if (usermail) {
       resp.status(404).json({
         code: 404,
         message: "Course aleready exist....  ",
         data: [],
         error: false,
         status: false,
       });
     } else {
       let data = new CourseSchema({
         
        img,
        title,
        desc,
        level,
        lessons,
        duration,
        price,
        rating,
       });
      
       let result = await data.save();
   
 
       resp.status(200).json({
         code: 200,
         message: "Course  Register successfully",
 
         error: false,
         status: true,
       });
     }
   } catch (err) {
     console.log(err);
   }
}

const putCourse=async(req,res)=>{
  try {

    let img = req.file.filename;
    let title = req.body.title;
    let desc = req.body.desc;
    let level = req.body.level;
    let lessons = req.body.lessons;
    let duration = req.body.duration;
    let price = req.body.price;
    let rating = req.body.rating;
      

     let data = await CourseSchema.updateOne(
     {title: req.params.title},
      { $set:   {
        
        img,
        title,
        desc,
        level,
        lessons,
        duration,
        price,
        rating,
      } }

  );
       res.send(data);

   } catch (err) {
       console.log(err)
   }
 
}
const getCourse=async(req,res)=>{

  let data = await CourseSchema.find( );

  res.send(data);
}

 const deleteCourse= async (req, resp) => {
  try {
    console.log(req.params);
    let data = await CourseSchema.deleteOne({title:req.params.title});
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
}

const createEnquiry=async(req,resp)=>{
  try { 
      
   const {name,fname,address,  dob, epx_join,course,contact, email,gender, counseller, note}=req.body;
   
      
     const usermail = await Enquiry_adminSchema.findOne({ contact: contact });
     console.log(usermail);
     if (usermail) {
       resp.status(404).json({
         code: 404,
         message: "user aleready exist....  ",
         data: [],
         error: false,
         status: false,
       });
     } else {
       let data = new Enquiry_adminSchema({
        name,fname,address,  dob, epx_join,course,contact, email,gender, counseller, note
    
       });
      
       let result = await data.save();
   
 
       resp.status(200).json({
         code: 200,
         message: "Enquiry created successfully",
 
         error: false,
         status: true,
       });
     }
   } catch (err) {
     console.log(err);
   }
}
const putEnquiry=async(req,res)=>{
  try {

    const {name,fname,address,  dob, epx_join,course,contact, email,gender, counseller, note}=req.body;
   

     let data = await Enquiry_adminSchema.updateOne(
      {contact:req.params.contact},
      { $set:   {
        name,fname,address,  dob, epx_join,course,contact, email,gender, counseller, note
    
      } }

  );
       res.send(result);

   } catch (err) {
       console.log(err)
   }
 
}
const getEnquiry=async(req,res)=>{

  let data = await Enquiry_adminSchema.find( );

  res.send(data);
}
const deleteEnquiry= async (req, resp) => {
  try {
    console.log(req.params);
    let data = await Enquiry_adminSchema.deleteOne({contact:req.params.contact});
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
}
const createExpense=async(req,resp)=>{
  try { 
      
      const Expense_Head=req.body.Expense_Head;
    
  const name=req.body.name; 
     const Invoice_Number=req.body.Invoice_Number;
     const date=req.body.date;
      const Amount=req.body.Amount;
       const Attach_Document=req.file.filename;
       const Description=req.body.Description;
 
     
       let data = new ExpenseSchema({  
      Expense_Head,
      name,
      Invoice_Number,
      date,
      Amount,
      Attach_Document,
      Description
       });
      
     let result=  await data.save();
   
 
        resp.send(result)
     
   } catch (err) {
     console.log(err);
   }
}

const getExpense=async(req,res)=>{

  let data = await ExpenseSchema.find( );

  res.send(data);
}

const deleteExpense= async (req, resp) => {
try {
  console.log(req.params);
  let data = await ExpenseSchema.deleteOne({Invoice_Number:req.params.Invoice_Number});
  resp.send(data);
} catch (err) {
  console.log(err);
}
}
const putExpense=async(req,res)=>{
  try {

    const Expense_Head=req.body.Expense_Head;
    
    const name=req.body.name; 
       const Invoice_Number=req.body.Invoice_Number;
       const date=req.body.date;
        const Amount=req.body.Amount;
         const Attach_Document=req.file.filename;
         const Description=req.body.Description;
   

     let data = await ExpenseSchema.updateOne(
      {Invoice_Number:req.params.Invoice_Number},
      { $set:   {
        Expense_Head,
        name,
        Invoice_Number,
        date,
        Amount,
        Attach_Document,
        Description
      } }

  );
       res.send(result);

   } catch (err) {
       console.log(err)
   }
 
}
const createStOfMonth=async(req,res)=>{ 
  const {regno,name,course }=req.body
  const img=req.file.filename;
  let data = new StudentOfMonthSchema({img,regno,name, course}); 
 let result = await data.save();
 res.status(200).json({
   code: 200,
   message: "  Student of month is Created successfully", 
   error: false,
   status: true,
 });

}
const getStOfMonth=async(req,res)=>{
  let data = await StudentOfMonthSchema.find();

  res.send(data);
 
}

const putStOfMonth=async(req,res)=>{
  try {
     const img=req.file.filename
   const{regno,name,course}=req.body
     let data = await StudentOfMonthSchema.updateOne(
      {regno:req.params.regno},
      { $set:   {
       img   ,
       regno,
     name,
  course
        
      } }

  );
       res.send(data);

   } catch (err) {
       console.log(err)
   }
 
}
const delStOfMonth=async(req,res)=>{
  try {
      console.log(req.params)
      let data = await StudentOfMonthSchema.deleteOne({regno:req.params.regno});
      res.send(data);
  } catch (err) {
      console.log(err)

  }
 
}



const createincome=async(req,resp)=>{
  try { 
      
      const attach=req.file.filename;
    
  const {income_head,name,invoice_no,date,desc}=req.body
     
       let data = new IncomeSchema({  
        income_head,name,invoice_no,date,attach,desc
       });
      
     let result=  await data.save();
   
 
        resp.send(result)
     
   } catch (err) {
     console.log(err);
   }
}

const getincome=async(req,res)=>{

  let data = await IncomeSchema.find( );

  res.send(data);
}
const getSingleincome=async(req,res)=>{

  let data = await IncomeSchema.find({invoice_no:req.params.invoice_no});

  res.send(data);
}
const deleteincome= async (req, resp) => {
try {
  console.log(req.params);
  let data = await IncomeSchema.deleteOne({invoice_no:req.params.invoice_no});
  resp.send(data);
} catch (err) {
  console.log(err);
}
}
const putincome=async(req,res)=>{
  try {

     
    const attach=req.file.filename;
    
    const {income_head,name,invoice_no,date,desc}=req.body 
     let data = await IncomeSchema .updateOne(
      {invoice_no:req.params.invoice_no},
      { $set: {  
        income_head,name,invoice_no,date,attach,desc
       } } 
  );
       res.send(data);
   } catch (err) {
       console.log(err)
   }
 
}

module.exports={createincome,getincome,getSingleincome,deleteincome,putincome,
  createInstructor,putInstructor, getInstructor,createCourse,getCourse,putCourse,putExpense,createStOfMonth,getStOfMonth,putStOfMonth,delStOfMonth,
  deleteCourse,deleteInstructor,createEnquiry,getEnquiry,deleteEnquiry,createAdmin,loginAdmin,putAdmin,getAdmin,deleteAdmin,
  createExpense,getExpense,deleteExpense,putEnquiry
}