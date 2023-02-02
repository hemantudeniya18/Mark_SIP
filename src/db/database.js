var mongoose = require('mongoose');
const dotenv = require('dotenv')
// const uri = "mongodb+srv://hyunjin0327:Yg9sw6U6uL4CPo52@grm.qcgqg.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://hyunjin0327:Yg9sw6U6uL4CPo52@grm.qcgqg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri,{
    // useCreateIndex: true,
    // useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
