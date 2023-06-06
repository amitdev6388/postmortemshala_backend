const mongoose = require("mongoose");
const IncomeSchema = new mongoose.Schema({
     
    income_head:{
        type:String,
       // required:true
    },
    name:{
        type:String,
      // required:true
    },
    invoice_no:{
        type:Number,
///required:true
    },
    attach:{
        type:String,
     //   required:true
    },
 
    des:{
        type:String,
      // required:true
    }
    
});


module.exports = mongoose.model('Income_tbl',IncomeSchema);
 