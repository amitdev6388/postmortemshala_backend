const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
     
    img: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    
      desc: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        required: true,
      },
      lessons: {
        type: Number,
        required: true,
      },
    
      duration: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        //required:true
      },
      rating: {
        type: Number,
        //required:true
      },
    
    
}); 
module.exports = mongoose.model('Course_admin',CourseSchema);
 