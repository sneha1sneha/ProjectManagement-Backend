
const express = require("express");
const app = express();
const mysql = require("mysql")
const jwt=require("jsonwebtoken");
const bodyParser = require("body-parser");
// var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors())
// const bcrypt=require("bcryptjs");
// const saltrounds=7;
// const bcrypt=require("bcrypt-nodejs");

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'indproject'
});

con.connect((err) => {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});


// middileware for verification
function verifytoken(req,res,next){
    let authHeader=req.headers.authorization;
     console.log(authHeader)
    if (authHeader==undefined){
        res.status(401).send({error:"no token provided"})
    }
    let token=authHeader.split(" ")[1]
    
          console.log(token)
    jwt.verify(token,"high",function(err,decoded)
    {
        if (err){
            res.status(500).send({error:"Authentication failed"})
        }
        else{
            // res.send(decoded);
           console.log("SUCES")
        
            next();
            
         }
    
    })

}



app.post("/login",urlencodedParser, function (req, res) {
    if(req.body.username == undefined || req.body.password == undefined) {
        console.log("error");
        res.status(500).send({ error: "autentication failed" });
    }

    let username = req.body.username;
    let passwordd = req.body.password;
    let r=`select password from registerationtable where username = '${username}'`
    con.query(r,(err,resultt)=>
    {
        if(err){
            res.status(500).send({error:"server er"})
                console.log("error in passwordhashing")}
                
        else{
            console.log("GGDGCGDHGCHD")
            console.log(resultt)
            const data=resultt[0].password
            
            console.log(data)
            console.log(passwordd)
            bcrypt.compare(passwordd,data,function(err,result){
                console.log("dbvcfdv")
                if(result){
                    console.log(username)
                    console.log(passwordd)
                    let qr = `select name,id from registerationtable  where username = '${username}' and  password =  '${data}'   `
                    con.query(qr,(err,result)=>{
                        if(err || result.length==0){
                        res.status(500).send({error:"login failed"});
                        console.log("error")
                        a=result.length
                        console.log(a)
                        }
                        else{
                                                //    res.status(200).send({success:"login success"});
                            
                            let resp={
                                id:result[0].id,
                                displayname:result[0].name
                            }
                            
                            let token=jwt.sign(resp,"high",{expiresIn:27000});
                            res.status(200).send({auth:true,token:token});
                            // console.log(token)
                            
                        }
                    
                                            
                    })

                }
            
            else{
                    // throw err;
                    res.status(500).send({error:"error"})
                }
            
            })
        }   








    })
})


// <------------------------------->or<-------------------------------------------------------------------------->

app.post("/loginn",urlencodedParser, function (req, res) {
    if(req.body.username == undefined || req.body.password == undefined) {
        console.log("error");
        res.status(500).send({ error: "please enter valid details" });
    }

    let username = req.body.username;
    let password = req.body.password;
    console.log(username,password)
    let qr = `select name,id from registerationtable  where username = '${username}' and  password =  '${password}'   `
    console.log(qr)
    con.query(qr,(err,result)=>{
        if(err || result.length==0){
        res.status(500).send({error:"login failed"});
        console.log("error")
        console.log(result)
        }
        else{
                                //    res.status(200).send({success:"login success"});
            
            let resp={
                id:result[0].id,
                displayname:result[0].name
            }
            
            let token=jwt.sign(resp,"high",{expiresIn:27000});
            res.status(200).send({auth:true,token:token});
             console.log(token)
            
        }
    
                            
    })

})


// <--------------------------------------------------------------------------->
    // 
    
    //             }else{
    //                         throw err;
    //                     }
    // })
    //         }
            
    //     }

    // )
    



    // bcrypt.compare(password,data,function(err,resulttt){
    //             if(resulttt){
    //                         console.log("username")
    //                         let qr = `select name from registerationtable  where username = '${username}' and  password =  '${password}'   `
    //                         con.query(qr,(err,result)=>{
    //                             if(err || result.length==0){
    //                             res.status(500).send({error:"login failed"});
    //                             console.log("error")
    //                             }
    //                             else{
    //                                                     //    res.status(200).send({success:"login success"});
                                    
    //                                 let resp={
    //                                     id:result[0].id,
    //                                     displayname:result[0].name
    //                                 }
    //                                 let token=jwt.sign(resp,"secret",{expiresIn:270});
    //                                 res.status(200).send({auth:true,token:token});
    //                                 console.log(token)
                        
    //                             }
                            
                            
    //                         })
    //                     }else{
    //                         throw err;
    //                     }
    // })

    

    





app.post("/register",urlencodedParser,function(req,res){
    const name=req.body.name
    const email=req.body.email
    const account=req.body.account
    // const phonenumber=req.body.phonenumber
    const username=req.body.username
    const password=req.body.password
//     bcrypt.hash(password,saltrounds,function(err,hash){
     

//     if(hash){
  
//       const password=hash;
//      let query = `INSERT INTO registerationtable ( name,email,account,phonenumber,username,password) VALUES ("${name}","${email}", "${account}", "${phonenumber}", "${username}","${password}")`;
 

//      con.query(query,(err,result)=>{

//             if(err) throw err

//             res.json(result)

//         })
//     }

// else{
//     throw err
// }


    

//  })
    let query = `INSERT INTO registerationtable ( name,email,account,username,password) VALUES ("${name}","${email}", "${account}", "${username}","${password}")`;
    

        con.query(query,(err,result)=>{

                if(err) throw err

                res.json(result)

            })
        


 })




 app.get('/getemploydet/:id',(req,res)=>{
        con.query('select * from registerationtable WHERE id=?',[req.params.id],(err,result)=>{
            res.json(result)
        })
              })

              


app.post('/addemp', urlencodedParser,verifytoken,(req,res)=>{

    

   

    const emp_name=req.body.name;

    

    

    const emp_account=req.body.account;

    const emp_salary=req.body.salary;

    const emp_project=req.body.project;

    const emp_gender=req.body.gender;



   let query   = `INSERT INTO empdetails( name, account, salary, project,gender) VALUES ("${emp_name}", "${emp_account}", "${emp_salary}", "${emp_project}","${emp_gender}")`;

    con.query(query,(err,result)=>{

      if(err) throw err

      res.json(result)
      
    })



  })

  app.get('/getemp',verifytoken,(req,res)=>{
    con.query('select * from empdetails;',(err,result)=>{
        res.json(result)
    })
          })



// <------------------------------------------------->project    details  ---------------------------------->



app.get('/getproject',verifytoken,(req,res)=>{
    con.query('select * from projecttable;',(err,result)=>{
        res.json(result)
    })
          })


app.get('/getproject1',verifytoken,(req,res)=>{
        con.query('select * from projecttable1;',(err,result)=>{
                res.json(result)
            })
                  })
        
                  
// app.get('/getproject1/:projectname',(req,res)=>{
//         con.query('select * from projecttable1 WHERE projectname=?',[req.params.projectname],(err,result)=>{
//                 res.json(result)
//             })
//                     })




app.get('/getproject1/:id',(req,res)=>{
    con.query('select * from projecttable1 WHERE id=?',[req.params.id],(err,result)=>{
        res.json(result)
    })
            })                   


app.post('/addproject', urlencodedParser,verifytoken,(req,res)=>{





    const projectname=req.body.projectname;

    

    

    const description=req.body.description;

    const manager=req.body.manager;

    const teammember1=req.body.teammember1;

    const teammember2=req.body.teammember2;

    const teammember3=req.body.teammember3;

    const teammember4=req.body.teammember4;



    let query   = `INSERT INTO projecttable1(  projectname, description,  manager, teammember1,teammember2,teammember3,teammember4) VALUES ("${ projectname}", "${description}", "${ manager}", "${teammember1}","${teammember2}","${teammember3}","${teammember4}")`;
   
    con.query(query,(err,result)=>{

        if(err) throw err

        res.json(result)
        // res.send("inserted")
        
    })



    })
                                       
                    
app.put('/updateproject1/:id',urlencodedParser,verifytoken,function(req,res){

    // const upId=req.params.id;

    // let id=req.body.id;
     
    const projectname = req.body.projectname;

    const description=req.body.description;

    const manager=req.body.manager;

    const teammember1=req.body.teammember1;

    const teammember2=req.body.teammember2;
    const teammember3=req.body.teammember3;

    const teammember4=req.body.teammember4;
    // console.log("uiiu",req.body.projectname);

    // con.query('UPDATE projecttable1 SET ? WHERE id=?',[{ projectname: projectname,description:description, manager: manager,teammember1:teammember1,teammember2:teammember2,teammember3:teammember3,teammember4:teammember4}],[req.params.id],(err,result)=>{
       con.query( `update projecttable1 set projectname ="${projectname}",description="${description}",manager="${manager}",teammember1="${teammember1}",teammember2="${teammember2}",teammember3="${teammember3}",teammember4="${teammember4}"  where id=?`,[req.params.id] ,(err,result)=>{ 
    
       if(err){

        // console.log(err)
    
        throw err
    }
        
        else{

            // res.send("updated")}
            res.json(result)}
        
    }) 
  })

app.delete('/delete/:id',verifytoken,(req,res)=>{
    // const deletId=req.params.id;
    con.query('delete  from projecttable1 where id=?',[req.params.id],(err,result)=>{
        if(err){
            //  console.log(err)}
             throw err}
            else{
                res.send("DELETED")}
                // res.json(result)}
                // console.log(result)
         })
    //    res.json(result)
})




app.listen('8080', () => {
    console.log("server connected to port 8080")
})





























// <------------------------------------------------->TRIAL<--------------------------------------------------->
app.post("/registeration",urlencodedParser,function(req,res){
    
    const username=req.body.username
     console.log(req.body.username)
    const password=req.body.password
    

    let query = `INSERT INTO registeration ( username,password) VALUES ("${username}","${password}")`;
    

    con.query(query,(err,result)=>{

            if(err) throw err

            res.status(200).json(result);
             console.log(result);
        })
    


})



