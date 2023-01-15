const Stud = require('../db/Stud');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Log = {
    check:(req,res)=>{
        const {idNum} = req.body;
        Stud.findOne({idNum},(err,result)=>{
            if(err) throw err;
            if(result){
                return res.status(200).json({user:true})
            }else{
                return res.status(200).json({user:false})
            }
        })
    },
    sign:(req,res)=>{
        const { 
            idNum,
            password,
            username,
            level,
            academicSession,
            email,
            phone, } = req.body
            
        Stud.findOne({idNum},(error,result)=>{
            if(error) throw error;
            if(result){
                res.json({msg:"user already exist"});
            }else{
                if(password.length >= 4){
                    bcrypt.hash(password, 10, function(err, hash) {
                        // Store hash in your password DB.
                        const stud = new Stud({
                            idNum,
                            password:hash,
                            name:username,
                            level,
                            email,
                            academicSession,
                            phone,
                        });

                        stud.save((err,savedStud)=>{
                            console.log(err)
                            if(err) return res.send(err)
                            //create a token
                        const token = jwt.sign({
                            id:savedStud._id,
                            idNum:savedStud.idNum,
                            level:savedStud.level,
                            academicSession:savedStud.academicSession,
                            name:savedStud.name}, 
                            process.env.JWT_KEY);
                         //Send the JWT to the client in the response
                        res.status(200).json({token})
                        })
                    });
                }else{
                    res.send("please enter id number and password")
                }
                
            }
        })
    },
    
    login:(req,res)=>{
        // Get the username and password from the request body
        const { idNum, password } = req.body
console.log(req.body)
        if(idNum != "undefined" && password > 4){

        // search if user exist
        Stud.findOne({idNum:idNum},(error,stud)=>{
            if(error) throw error;
            // check user exist
            if(stud){
                const hash = stud.password;
                bcrypt.compare(password, hash,(err, result)=> {
                    // check if correct password is entered
                    if(result){
                        // create a token
                        const token = jwt.sign({
                            id:stud._id,
                            idNum:stud.idNum,
                            level:stud.level,
                            academicSession:stud.academicSession,
                            name:stud.name}, 
                            process.env.JWT_KEY);

                        // Send the JWT to the client in the response
                        res.status(200).json({ token })
                    }else{
                        res.json({msg:"wrong password"})
                    }
                });
            }else{
               return res.json({msg:'user does not exist'})
            }
        })}else{
            res.json({msg:"please out required fields"})
        }
    }
}
module.exports = Log;