var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mark1', {
    // useCreateIndex: true,
    // useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // autoIndex: true,
});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

/* 
var mongodb=require('mongodb');  
var MongoClient=mongodb.MongoClient;  
var url="mongodb://localhost:27017/mark2"  
MongoClient.connect(url,function(error,databases){  
    if(error){  
        throw error;  
  
    }  
   /*  var dbase=databases.db("mark2");  
    dbase.createCollection("pract",function(error,response){  
        if(error){  
            throw error;  
        }   */
      
    // console.log("collection is created.....")  
    // databases.close();  
    // });   */