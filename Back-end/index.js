var express = require('express');
var app = express();
var pg = require('pg');
const cors = require('cors');
const  jwt  =  require('jsonwebtoken');


var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended: false});
var db_connection = "postgres://postgres:Geetha@99@localhost:5432/invoice";
const SECRET_KEY = "secretkey23456";
app.use(cors());
app.use(bodyparser.json());



app.post('/login', urlencodedparser, function(req,res){

    var username = req.body.username;
    var password = req.body.password;
    var login_client = new pg.Client(db_connection);
    var Response = {};

    login_client.connect(function (err){
     if(err){
        console.log('Could not connect to postgresql on signup',err);
        }
        else{      
         login_client.query('SELECT * FROM user_details WHERE username=$1 AND password=$2 LIMIT 1',[username,password], function (err, result){
            if(err){
                console.log('Insert error in signup', err);
            }
                    else{
                    if(result.rows.length!=0){
                        const expiresIn = 24 * 60 * 60;
                        const accessToken = jwt.sign({ id: result.rows.id }, SECRET_KEY, {
                            expiresIn: expiresIn
                        });
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows[i];
                            console.log(row.user_id);
                            user= row.user_id;
                            Response = {"status":200,"message":"Success","result":{ "user_id": row.user_id, "token": accessToken, "expires_in": expiresIn }};
                          
                        }
                            login_client.end();
                    }
                    else
                    {
                    Response = {"status":400,"message":"Invalid User"};
                   
                        
                    login_client.end();
                    }
                }
                res.send(Response);
            });
    }
  
    });
 
  
});
var client = new pg.Client(db_connection);
client.connect();

app.post('/signup',urlencodedparser, function(req,response){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var role = req.body.role;
    var Response;
    client.query('INSERT INTO user_details(username,email,password,role) VALUES ($1,$2,$3,$4)',[username,email,password,role],(err,Result)=>{
        if(err)
        {
            Response = {"status": 400, "message":err};
        }
        else{
        
        Response={"status":200,"message":' User added successfully'}
      
        }
   })

   response.send(Response);
});

app.get('/get_list/:user_id',urlencodedparser, function(req,response){

    var user_id = req.params.user_id;
    var Response;
   
    client.query(`SELECT * FROM invoice_list WHERE user_id = ${user_id}`,(err,res)=>{
        if(err)
        {
            Response = {"status": 400, "message":err};
        }
        else{
            Response={"status":200,"message":"Success","result":res.rows};
     
        }
        response.send(Response);
    })
    
});

app.get('/get_user_invoice/:id',urlencodedparser, function(req,response){

    var invoice_id = req.params.id;
    var Response;
    client.query(`SELECT invoice_id,invoice_name,invoice_date,invoice_price FROM invoice_list WHERE invoice_id = ${invoice_id}`,(err,res)=>{
        if(err)
        {
            Response = {"status": 400, "message":err};
        }
        else{
            Response={"status":200,"message":"Success","result":res.rows};
        }
        response.send(Response);
    });
    
});

app.post('/add_list',urlencodedparser,function(req,response){

    var user_id = req.body.user_id;
    var invoice_name = req.body.invoice_name;
    var invoice_date = req.body.invoice_date;
    var invoice_price = req.body.invoice_price;
    var Response;
    
    client.query('INSERT INTO invoice_list(user_id,invoice_name,invoice_date,invoice_price) VALUES ($1,$2,$3,$4)',[user_id,invoice_name,invoice_date,invoice_price],(err,result)=>{
        if(err)
        {
            Response = {"status": 400, "message":err};
        }
        else{
    
        Response = {"status": 200, "message":' Invoice added successfully'};
        }
        response.send(Response);
    });
    
});

app.put('/update_list',urlencodedparser,function(req,response){
    //var invoice_id = req.params.invoice_id;
    var invoice_id = req.body.invoice_id;
    var invoice_name = req.body.invoice_name;
    var invoice_date = req.body.invoice_date;
    var invoice_price = req.body.invoice_price;

    var Response;
    client.query('UPDATE invoice_list SET invoice_name = ($1),invoice_date= ($2),invoice_price= ($3) WHERE invoice_id =($4) ',[invoice_name,invoice_date,invoice_price,invoice_id],(err,result)=>{
        if(err)
        {
            Response = {"status": 400, "message":err};
        }
        else{
        
        Response = {"status": 200, "message":' Invoice updated successfully'};
        }
        response.send(Response);
    });
   
});

app.delete('/delete_list/:id',urlencodedparser,function(req,response){

    var invoice_id = req.params.id;
    var Response;
    client.query(`DELETE FROM invoice_list WHERE invoice_id=${invoice_id}`,(err,res)=>{
        if(err)
        {
            Response = {"status": 400, "message":err};
        }
        else{
        Response = {"status": 204, "message":' Invoice deleted successfully',"result":null};
        }
        response.send(Response);
    });
    
});

app.listen(3030, function (){
    console.log('Listening on localhost:3030');
});