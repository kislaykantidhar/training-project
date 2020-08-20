# training-project
Training project 

[tabledefination.js](https://github.com/kislaykantidhar/training-project/blob/master/tabledefination.js)
In this section I used sequelize to create table models for this project. The Admin adds users and give them access to the tasks assigned to them .The users then login via their id and password.They log their time and comment on the tasks assigned.The Admin can view the reports.
There are 5 tables:
1. Admin
2. User
3. Tasks
4. Comments
5. LogTime

contents
1. dbFunctions:folder which functions to get and put data into database
2. routes: this folder contains middleware functions which maintains the routes
3. schema: This folder holds  joi - schemas
4. services: This folder contains some of the functions which are used in routes folder scripts or any where else

### How this API works
1. In order to use this api,admin and user both have to signe up(By entering their name,email ids and password) 
2. After signing up both can login.If their login credentials are all right they will recieve the respective jwt.'
3. After this they don't have to login again ,since they have the tokens with them.Without the token both user and admin will recieve 403 error messages.
4. Admin can create tasks by describing title and summary of the task.Now  assigning the task to particular user is optional.Tasks can be assigned by giving the email of user.If no assignee is passed then the status of the task will have **unassigned** status.
5. Users can view the lists of tasks assigned to them.Those tasks will have links to comment and Log time.
6. Admin can get the lists of the tasks created,and with each task two links are also returned with which an admin can see the comments made and the work-log for that task.

# Routes
all the routes are preceded by http://localhost:5227
### 1. (POST) /signupAdmin and /signupUser
In the x-www-form-urlencoded
    {
        name:"YOUR NAME",
        email:"YOUR EMAIL",
        password:"YOUR PASSWORD"
    }
    is passed. Also the password is encrypted and then stored in the database.
In the message returned we get
     {msg:"signed up successfully"}

### 2. (POST) /loginAdmin and /loginUser
In the x-www-form-urlencoded
    {
        
        email:"YOUR EMAIL",
        password:"YOUR PASSWORD"
    }
    is passed.
    If your email doesnot exist in database then
    {msg:"Your email Id or password is invalid"} is passed.
    Otherwise if it exists and password given matches the encrypted  password in db then message like the following is passed.
    {
        msg:"welcome",
        token:"aaaaaaaaaaaaaaaaaa.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.cccccccccccccccccccc"
    }
    this token should be stored by the client app.To authenticate the next actions.

### 3.(GET) /createTask
In the x-www-form-urlencoded
    {
        
        title:"TITLE OF THE TASK",
        summary:"SUMMARISE THE TASKS",
        assignedTo:"USER EMAIL"[this is optional though]
    }
    is passed.
    On successsful task creation we get the message:
    {
        msg:"Task created successfully"
    }
    If the assignedTo value of the form is not available in database then this value is returned 
    {
        msg:"The user email doesnot exist"/comment?task_id=
    }
    However without the right token or with an empty title or empty summary 403(FORBIDDEN) status is given.

### 4.(GET) /viewTasks

Whenever a User routes in this path with his her token,If he/she does'nt has tasks for his he/she gets 
    {
        msg:"No task is assigned to you yet"
    }
But if tasks are assigned he/she will get a list
{
    msg:[
        {task1}
        {task2}
    ]
}
{taskn}==>{
    id:TASK ID,
    title:TITLE OF THE TASK,
    summary:SUMMARY OF THE TASK,
    created_at:DATE OF THE TASK CREATED
    comment_at:link to comment ,
    logTime_at:link to log time,
}
    with the comment_at link and log_time_at link you can comment on the task assigned,and also log respective times you worked for.

### 5.(GET) /logtime?task_id=SOMETASKID
if SOMETASKID is not not a valid id then
    {
        msg:"no such task made"
    }
if it is valid then in the x-www-form-urlencoded
{
    stardedAt: HH:mm
    endedAt:   HH:mm  
}
here time is 24 hrs format.Although the log date is automatically logged
and once logged successfully 
{
    msg:"Time Logged!"
}
is the response.

### 6.(GET) /comment?task_id=SOMETASKID
if SOMETASKID is not not a valid id then
    {
        msg:"no such task made"
    }
if it is valid then in the x-www-form-urlencoded
{
    comment:"some comment"
}
should be sent in request.
On succesfull comment record you get.
{
    msg:"Comment posted"
}
if no comment is passed in the request 
{
    {msg:"there is no comment to post"}
}

### 7.(GET) /viewCreatedTasks
this route is for admin where the admin gets list of all the tasks created by him along 
with the links to the comment and tasks for the tasks

If the Admin has not created any tasks he will get 
{
    msg:" haven't created any tasks yet"
}
else he will get a list ,something just like this
{msg:[
    {
        created_by: ADMIN ID
        id: TASK ID
        title: TITLE OF THE TASK
        summary:TITLE OF THE SUMMARY
        assigned_to:ASSIGNEE 'S NAME
        created_at:DATE OF CREATION
        status:ASSIGNED/UNASSIGNED
        showComments:THE LINK TO SHOW THE COMMENTS
        logs:THE LINK TO SHOW THE LOGS
    },
    {.....},
    .....
]}

### 8.(GET) /showComments?task_id=SOMETASKID
If there is'nt any comment for this task then
{msg:"There is no comment for this task"}
otherwise list of comments are returned
{
    msg:[
        {
            taskid:TASK ID
            time:TIME AND DATE OF THE COMMENT
            comment:COMMENT TEXT
            commented_by:ID OF THE USER WHO COMMENTED
        },
        {...},
        .....
    ]
}

### 9.(GET) /logs?task_id=SOMETASKID
If there is no log for the SOMETASKID then 
{msg:"No logs for this task"}
is returned in response.
otherwise list of log times is returned
{
    msg:[
        {
            taskid:TASK ID 
            date:DATE AND TIME OF THE LOGGING ACTIVITY
            startedAt:HH:mm(24HRS FORMAT)  START TIME OF THE TASK
            endedAt:HH:mm(24HRS FORMAT) END TIME OF THE TASK
        }
    ]
}