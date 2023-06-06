const InstructorRegisterSchema=require('../../models/admin/InstructorModel')
const resultSchema=require('../../models/Teacher/ResultST')
const Sheduleclass_Schema=require('../../models/Teacher/Schedule_Class')
const assignment_Schema=require('../../models/Teacher/Add_Assignment')
const AddFeeSchema=require('../../models/Teacher/Add_fee')
const crypto = require('crypto');
const Functions = require('../../library/functions');
const nodemailer = require("nodemailer");
const EventsSchema=require('../../models/Teacher/Events')
const loginInstructor=async(req,resp,next)=>{
    try { 
      const email = req.body.email;
      const password = req.body.password;
      const usermail = await InstructorRegisterSchema.findOne({
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
  
const createAddFee=async(req,res)=>{
  const { regno,name,amount,mode,transId,paid,date,course}=req.body
  let data = new AddFeeSchema( { regno,name,amount,mode,transId,paid,date,course});
 
 let result = await data.save();
 res.status(200).json({
   code: 200,
   message: "  Result Created successfully", 
   error: false,
   status: true,
 });

}

const putAddFee=async(req,res)=>{
 try {

   const  { regno,name,amount,mode,transId,paid,date,course}=req.body

    let data = await AddFeeSchema.updateOne(
     {regno:req.params.regno},
     { $set:   { regno,name,amount,mode,transId,paid,date,course}
    } 
     );
      res.send(data);

  } catch (err) {
      console.log(err)
  }

}
const delAddFee=async(req,res)=>{
 try {
     console.log(req.params)
     let data = await AddFeeSchema.deleteOne({regno:req.params.regno});
     res.send(data);
 } catch (err) {
     console.log(err)

 }

}
const getAllAddFee=async(req,res)=>{
let data=await AddFeeSchema.find();
res.send(data)
}
const getsingleFee=async(req,res)=>{
  let data=await AddFeeSchema.find({regno:req.params.regno});
  res.send(data)
  }
const gettotalpaidFee=async(req,res)=>{
//let r=await AddFeeSchema.find({regno:req.params.regno});
// res.send(data)
let regno=req.params.regno;
let data=await AddFeeSchema.aggregate([
  
  {
    $group: { _id: "$regno", totalpaid: { $sum: "$paid" } }
  }
]) 
res.send(data)
}
   {/*  RESULT SECTION */}
const createResult=async(req,res)=>{
     const {name,regno,course,topic,total_marks,obtain_marks}=req.body
     let data = new resultSchema({name,regno,course,topic,total_marks,obtain_marks });
    
    let result = await data.save();
    res.status(200).json({
      code: 200,
      message: "  Result Created successfully", 
      error: false,
      status: true,
    });
   
}

const putResult=async(req,res)=>{
    try {

      const {name,regno,course,topic,total_marks,obtain_marks}=req.body
 
       let data = await resultSchema.updateOne(
        {regno:req.params.regno},
        { $set:   {
          name,regno,course,topic,total_marks,obtain_marks
               }
       } 
        );
         res.send(data);
 
     } catch (err) {
         console.log(err)
     }
   
}
const delResult=async(req,res)=>{
    try {
        console.log(req.params)
        let data = await resultSchema.deleteOne({regno:req.params.regno});
        res.send(data);
    } catch (err) {
        console.log(err)

    }
   
}
const getAllResult=async(req,res)=>{
  let data=await resultSchema.find();
  res.send(data)
}
const getsingleResult=async(req,res)=>{
  let data=await resultSchema.find({regno:req.params.regno});
  res.send(data)
}
 
{/*     ScheduleClas */}
const getAllScheduleClass=async(req,res)=>{
  let data=await Sheduleclass_Schema.find();
  res.send(data)
  }
const createScheduleClass=async(req,res)=>{
  const {topic,course,time,date,contact_instructor,link}=req.body
  let data = new Sheduleclass_Schema({topic,course,time,date,contact_instructor,link});
 
  await data.save();
 res.status(200).json({
   code: 200,
   message: "  Class Scheduled successfully", 
   error: false,
   status: true,
 });

}

const putScheduleClass=async(req,res)=>{
 try {

   const  {topic,course,time,date,contact_instructor,link}=req.body

    let data = await Sheduleclass_Schema.updateOne(
     {contact_instructor:req.params.contact_instructor},
     { $set:   {topic,course,time,date,contact_instructor,link}
    } 
     );
      res.send(data);

  } catch (err) {
      console.log(err)
  }

}
const delScheduleClass=async(req,res)=>{
 try {
     console.log(req.params)
     let data = await Sheduleclass_Schema.deleteOne({contact_instructor:req.params.contact_instructor});
     res.send(data);
 } catch (err) {
     console.log(err)

 }

}

{/*     ADD ASSGINMENT */}
const getAssignment=async(req,res)=>{
  let data=await assignment_Schema.find();
  res.send(data)
  }
const createAssignment=async(req,res)=>{
 
  const {title,instructions,due_date,contact_instructor}=req.body;
  let upload=req.file.filename
  console.log( upload )
  let data = new assignment_Schema({title,instructions,due_date,upload,contact_instructor});
 
  await data.save();
 res.status(200).json({
   code: 200,
   message: "  Assignment created successfully", 
   error: false,
   status: true,
 });
 

}

const putAssignment=async(req,res)=>{
 try {

  let upload=req.file.filename
  const {title,instructions,due_date,contact_instructor}=req.body
  

    let data = await assignment_Schema.updateOne(
     {contact_instructor:req.params.contact_instructor},
     { $set:   {title,instructions,due_date,upload,contact_instructor}
    } 
     );
      res.send(data);

  } catch (err) {
      console.log(err)
  }

}
const delAssignment=async(req,res)=>{
 try {
     
     let data = await assignment_Schema.deleteOne({contact_instructor:req.params.contact_instructor});
     res.send(data);
 } catch (err) {
     console.log(err)

 }

}
const createEvent=async(req,resp)=>{
  try { 
      
      const img=req.file.filename;
    
  const {event,desc,from,to}=req.body 
       let data = new EventsSchema({event,desc,from,to,img}); 
     let result=  await data.save(); 
        resp.send(result) 
   } catch (err) {
     console.log(err);
   }
}

const getEvent=async(req,res)=>{

  let data = await EventsSchema.find(); 
  res.send(data);
}
const getSingleEvent=async(req,res)=>{

  let data = await EventsSchema.find({event:req.params.event});

  res.send(data);
}

const deleteEvent= async (req, resp) => {
try {
  console.log(req.params);
  let data = await EventsSchema.deleteOne({event:req.params.event});
  resp.send(data);
} catch (err) {
  console.log(err);
}
}
const putEvent=async(req,res)=>{
  try { const img=req.file.filename;
    
    const {event,desc,from,to}=req.body 
     let data = await EventsSchema .updateOne(
      {event:req.params.event},
      { $set:   {event,desc,from,to,img} } 
  );
       res.send(data);

   } catch (err) {
       console.log(err)
   }
 
}

module.exports={  createEvent,getEvent,getSingleEvent,deleteEvent,putEvent,
  getAssignment,createAssignment,putAssignment,delAssignment,createAddFee,putAddFee,delAddFee,getAllAddFee,gettotalpaidFee,getsingleFee
 , loginInstructor,createScheduleClass,putScheduleClass  ,delScheduleClass,getAllScheduleClass, getAllResult,getsingleResult,delResult,putResult,createResult} 
 