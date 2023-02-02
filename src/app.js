const express = require('express');
const path = require('path');
const hbs = require('hbs')
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser')

const app = express();

const router = require('./route/users')
const uploadRouter = require('./route/upload');
// const addRouter = require('./route/addEvent')
// const r = require('./route/mark');
  /* view engine setup */
app.set('views', path.join(__dirname, '../views'))
console.log(__dirname);
app.set('view engine', 'hbs');
hbs.registerPartials('views/partials')



app.use(cookieParser())
app.use('/static', express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(router)
app.use(uploadRouter);
// app.use(addRouter)
// app.use(r)


app.listen(port,()=>{
  console.log(`this is port ${port}`);
})