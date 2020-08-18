const express=require('express');
const helmet=require('helmet');
const app=express();
const signupAdmin=require('./routes/signupAdmin');
const loginAdmin=require('./routes/loginAdmin');
const signupUser=require('./routes/signupUser');
const loginUser=require('./routes/loginUser');
const createTask=require('./routes/createTask');
const viewTask=require('./routes/viewTasks');
const comment=require('./routes/comment')

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',signupAdmin);
app.use('/',loginAdmin);
app.use('/',signupUser);
app.use('/',loginUser);
app.use('/',createTask);
app.use('/',viewTask);
app.use('/',comment);

app.listen(5227);
console.log('Server started at 127.0.0.1:5227');