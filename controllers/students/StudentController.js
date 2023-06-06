const Student_RegisterSchema=require("../../models/students/StudentModel") ;
const crypto = require('crypto');
const Functions = require('../../library/functions');
const upload_task=require('../../models/students/uploadTask')
const nodemailer = require("nodemailer");
const createSt=async(req,resp,next)=>{
    try { 
         const regno=req.body.regno; 
         const name=req.body.name;
        const fname=req.body.fname; 
     const address=req.body.address; 
        const contact=req.body.contact;
        const email=req.body.email;
         const gender=req.body.gender;
          const dob=req.body.dob;
          const admdate=req.body.admdate;
        const refby=req.body.refby;
        const password=req.body.password;
      
         
        const usermail = await Student_RegisterSchema.findOne({ email: email });
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
          let data = new Student_RegisterSchema({
            regno,
       name,
       fname,
       address,
       contact,
       email,
       gender,
       dob,
       admdate, 
       refby,
       password
          });
          //  const token=await data.generatAuthToken()
          //    console.log(token)
          let result = await data.save();
          //resp.send(result);
    
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
const loginSt=async(req,resp,next)=>{
  try { 
    const email = req.body.email;
    const password = req.body.password;
    const usermail = await Student_RegisterSchema.findOne({
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
const getSt=async(req,res)=>{
    let data = await Student_RegisterSchema.find();

    res.send(data);
   
}
const getsingleSt=async(req,res)=>{
  let data = await Student_RegisterSchema.find({contact:req.params.contact});

  res.status(200).json({
    
      _id: data[0]._id,
      name: data[0].name,
      regno: data[0].regno,
      fname: data[0].fname,
      address: data[0].address,
      email: data[0].email,
      contact: data[0].contact,
      dob: data[0].dob,
      gender: data[0].gender,
      admdate: data[0].admdate,
      refby: data[0].refby,
      password: data[0].password,

    
  });
}
const putSt=async(req,res)=>{
    try {

      const regno=req.body.regno; 
      const name=req.body.name;
     const fname=req.body.fname; 
  const address=req.body.address; 
     const contact=req.body.contact;
     const email=req.body.email;
      const gender=req.body.gender;
       const dob=req.body.dob;
       const admdate=req.body.admdate;
     const refby=req.body.refby;
     const password=req.body.password;
 
       let data = await Student_RegisterSchema.updateOne(
        {contact:req.params.contact},
        { $set:   {
            regno,
       name,
       fname,
       address,
       contact,
       email,
       gender,
       dob,
       admdate,
       refby,
       password
          
        } }

    );
         res.send(data);
 
     } catch (err) {
         console.log(err)
     }
   
}
const delSt=async(req,res)=>{
    try {
        console.log(req.params)
        let data = await Student_RegisterSchema.deleteOne({contact:req.params.contact});
        res.send(data);
    } catch (err) {
        console.log(err)

    }
   
}
const sendforgetPass= (req, res) => {
  try{
   const email=req.body.email;
   const usermail =  Student_RegisterSchema.findOne({
     email: email, 
   });
   if(usermail){
 
    // const email = "amitpoly2020@gmail.com";
     //const _id=req.body._id;
     const _id = '464gdgr55654645645645'
   
     crypto.randomBytes(64, function (err, buffer) {
       let token = buffer.toString('hex');
       let timeStamp = Functions.getTimeStamp(Date.now());
         
       const transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 587,
         secure: false,
         auth: {
           user: 'amitpoly2020@gmail.com',
           pass: 'tnipzxxgahbeznwp'
         }
       }); 
       
       (() => {
   
         const mailOptions = {
           from: 'amitpoly2020@gmail.com', // sender 
           to: `${email}`, // list of receivers
           subject: `SMS Education reset password link`,
           text: ``,
         ///  html: "<p> click the link below for Reset your password <a href='http://postmortemshala.co.in/reset/password/" + token + "'> click here,</a></p>"
           html: "<p> click the link   for Reset your password <a href='https://coaching-institute.netlify.app'> click here,</a></p>"
         }
   
         const result = transporter
           .sendMail(mailOptions)
           .then((log) => {
            Student_RegisterSchema.updateOne(
               { email: req.body.email },
               { $set: { token: token}},{upsert:true}).then((result, err) => {
                  console.log("tocken add successully")
              })
             res.status(200).json({
               code: 200,
               status: true,
               message: "Mail Sent Successully !!",
               error: false,
               data: {
                 messageInfo: log,
                 sendTimestamp: timeStamp,
                 token: token,
               }
             });
   
           })
           .catch((error) => {
             res.status(404).json({
               code: 404,
               status: false,
               message: "Mail Sent Error !!",
               error: error,
               data: []
             });
           });
   
       })(); 
     }); 
    
   }
   else{ 
     res.send("Something went Wrong ! Email not found")
   } 
   }catch(err){
   console.log(err)
  }
 
 }  

 const stChangepass=async (req, resp) => {
  try {
    let password = req.body.newpass ;
   const usermail= await Student_RegisterSchema.updateOne(
     {token: req.params.token},
      {
        $set: {
          password: password,
        },
      },
      
    );
    if (usermail) {
      resp.status(200).json({
        code: 200,
        massage: "password has been changed successfully..",
       
        error: false,
        status: true,
      });
    } else {
      console.log("Error Ocured !");
    }
  } catch (error) {
    console.log(error);
  }
} 
const createuploadtask=async(req,res)=>{ 
  const {regno,name }=req.body
  const img=req.file.filename;
  let data = new upload_task({img,regno,name}); 
 let result = await data.save();
 res.status(200).json({
   code: 200,
   message: "  Task uploaded successfully", 
   error: false,
   status: true,
 });

}
const getuploadtask=async(req,res)=>{
  let data = await upload_task.find();

  res.send(data);
 
}

const putuploadtask=async(req,res)=>{
  try {
     const img=req.file.filename
   const{regno,name}=req.body
     let data = await upload_task.updateOne(
      {regno:req.params.regno},
      { $set:   {
       img   ,
       regno,
     name
        
      } }

  );
       res.send(data);

   } catch (err) {
       console.log(err)
   }
 
}
const deluploadtask=async(req,res)=>{
  try {
      console.log(req.params)
      let data = await upload_task.deleteOne({regno:req.params.regno});
      res.send(data);
  } catch (err) {
      console.log(err)

  }
 
}


module.exports={createSt, 
  createuploadtask,getuploadtask,deluploadtask,putuploadtask,getsingleSt,
  sendforgetPass,stChangepass, loginSt,getSt,putSt,delSt ,}