const express = require('express');
const app = express();
const mysql = require('mysql');
  
const bodyParser =require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
// default route
app.get('/',(req, res) => {
     res.send('hello' )
});
// connection configurations
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Assigment'
    
});
dbConn.connect((error)=>{
    if(error) {console.log('database connected')
}});


console.log('database connected')
  
//POST API  for customer      
app.post('/api/customer',(req,res)=>{
    let customer= req.body;
   
 dbConn.query('INSERT INTO Customers SET customerId = ?,CustomersName = ?, email= ?,Gender= ?',[customer.customerId, customer.CustomersName, customer.email,customer.Gender],function(err,rows,fields){
    if(!err){
        res.send('successfull send')
        console.log(rows)
    }else{
        //
        console.log(err)
        res.send(' data not a  sent')
    }
})     
});
//POST API  for user      
app.post('/api/user',(req,res)=>{
    let user= req.body;
   
 dbConn.query('INSERT INTO User SET id = ?,username = ?, email= ?,password= ?',[user.id, user.username, user.email,user.password],function(err,rows,fields){
    if(!err){
        res.send('successfull send')
        console.log(rows)
    }else{
        //
        console.log(err)
        res.send(' data not asent')
    }
})     
});





//get user details


        app.get('/api/userDetails', (req, res) => {
        dbConn.query('SELECT * FROM User',(err,rows,field)=>{
        res.send(rows)
            })  
        });
// detele api
app.delete('/api/user/:id',(req,res) =>{
    
    const userId = req.body.id
    dbConn.query('DELETE from User where id=?',[userId] ,(err,rows,field) => {
          if(!err){
              res.send('deleted')
              console.log('was deleted')

          }
    })
});

// set port
app.listen(5000,() => {console.log('starting servers');
});