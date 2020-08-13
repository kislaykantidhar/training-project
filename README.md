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

[contents](https://github.com/kislaykantidhar/training-project/blob/master)
1. dbFunctions:folder which functions to get and put data into database
2. routes: this folder contains middleware functions which maintains the routes
3. schema: This folder holds  ajv - schemas
4. services: This folder contains some of the functions which are used in routes folder scripts or any where else
