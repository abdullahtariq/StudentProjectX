const e = require('express')
var STUDENT = require('./student.model')
var controller = {}

controller.getAllStudents = function(req,res){
  console.log('Hello from getAllStudent method checking text')
  // mysql -> select * from students
  STUDENT.find({},function(error,result){
    if(error){
      console.log('error in getAllStudents')
      console.log(error)
      res.status(500).json({
        status: false,
        message : "There is some problem in finding students using getAllStudents please check logs"
      })
    }
    res.status(200).json(result)
  }).sort({"_id":-1})
}

controller.saveStudent = function(req,res){

  const student = req.body
  try{
    STUDENT.create(student, function(error, result){
      console.log('i am here')
      if(error){
        console.log('error in saving student', error);
        res.status(500).send('error in saving please check logs')
      }else{
        console.log(result);
        res.status(200).send('student save successfully')
      }
    })
  }catch(error){
    console.log(error)
  }
  
}

controller.loginStudent = (req,res) => {
  try{
    const studentUsername = req.body && req.body.username ? req.body.username : "";
    const studentPassword = req.body && req.body.password ? req.body.password : "";

    if(studentUsername && studentPassword){
      // mongo mien dhondo 
      STUDENT.find({username:studentUsername, password:studentPassword},(error,result) => {
        if(error){
          console.log('error in loginStudent', error)
          res.send('Error in api loginStudent');
        }else{
          console.log(result);
          if(result && result.length > 0){
            res.status(200).send({status: true, message: result[0] })
          }else{
            res.status(200).send({status: true, message: 'No student Record found' })
          }
        }
      })
    }else{
      res.send('Username or Password is missing.')
    }
    
    
  }catch(error){
    console.log('error in login loginStudent', error)
  }
  
}

controller.deleteStudent = (req,res) => {
  const studentId = req.params.id
  STUDENT.findById({_id:studentId},function(err, result){
    if(err){
      console.log('Something wrong in deleteStudent find', err)
    }else {
      console.log(result);
      if(result){
        const student = result;
        result.remove(function(error){
          if(error){
            console.log('error in removing student', error)
          }else{
            res.send({'status':true, message : `${student.firstName} ${student.lastName} Deleted Successfull`});
          }
        })
      }
      
    }
  })
}

controller.getSingleStudentDetails = (req,res) => {
  const studentId = req.params && req.params.id ? req.params.id : null;
  if(studentId){
    STUDENT.findOne({_id: studentId}, function(error, result){
      if(error){
        console.log('error in getSingleStudentDetails', error)
        res.send({status:false, message:'please check logs an error occured'})
      }else{
        res.send(result);
      }
    })
  }else{
    res.send({status:false, message : 'Student id is not provided'})
  }
}


controller.updateStudent = (req,res) => {
  const id = req.body && req.body.id ? req.body.id : null
  if(id){
    STUDENT.findOneAndUpdate({_id:id},{$set: req.body}, function(error,result){
      if(error){
        console.log('updateStudent Error', error)
        res.send('error in update please check logs')
      }else{
        console.log(result)
        res.send({status:true, message : 'Student Record updated successfully'})
      }
    })
  }else{
    res.send({status:false,message: 'Student information is missing'})
  }
}

module.exports = controller;