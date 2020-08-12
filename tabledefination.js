const {Sequelize,DataTypes, Deferrable}=require('sequelize');
const sequelize=new Sequelize('postgres://myuser:123@localhost:5432/projectdb');
// (async ()=>{try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }})()
const Admin =sequelize.define('admin',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    emailid:{
        type:DataTypes.STRING(30),
        unique:true,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    name:{
        type:DataTypes.STRING(40),
        allowNull:false
    },
    password:{
        type:DataTypes.STRING(500),
        allowNull:false
    }
    },{
    timestamps: false
})

const User =sequelize.define('user',{
    created_by:{
        type:DataTypes.INTEGER,
        references:{
            model:Admin,
            key:'id',
            deferrable:Deferrable.INITIALLY_IMMEDIATE
        },
        allowNull:false
    },
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
        
    },
    name:{
        type:DataTypes.STRING(40),
        allowNull:false
    },
    password:{
        type:DataTypes.STRING(500),
        allowNull:false
    }
    },
    {
    timestamps: false
})

const Tasks=sequelize.define('tasks',{
    created_by:{
        type:DataTypes.INTEGER,
        references:{
            model:Admin,
            key:'id',
            deferrable:Deferrable.INITIALLY_IMMEDIATE
        },
        allowNull:false
    },
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING(600),
        allowNull:false
    },
    summary:{
        type:DataTypes.TEXT
    },
    assigned_to:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:'id',
            deferrable:Deferrable.INITIALLY_IMMEDIATE
        }
    },
    created_at:{
        type:DataTypes.DATE
    },
    status:{
        type:DataTypes.STRING,
        validate:{
            isIn:[['unassigned','assigned','done']]
        }
    }
    },{
    timestamps: false
})

const Comments=sequelize.define('comments',{
    taskid:{
        type:DataTypes.INTEGER,
        references:{
            model:Tasks,
            key:'id',
            deferrable:Deferrable.INITIALLY_IMMEDIATE
        }
    },
    time:{
        type:DataTypes.DATE 
    },
    comment:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    commented_by:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:'id',
            deferrable:Deferrable.INITIALLY_IMMEDIATE
        }
    }
    },{
    timestamps: false
})

const LogTime=sequelize.define({
    taskid:{
        type:DataTypes.INTEGER,
        references:{
            model:Tasks,
            key:'id',
            deferrable:Deferrable.INITIALLY_IMMEDIATE
        }
    },
    loggedAt:{
        type:DataTypes.DATE 
    }
    },{
    timestamps: false
})

Promise.all([Admin.sync(),User.sync(),Tasks.sync(),Comments.sync(),LogTime.sync()]).then(()=>{
    console.log("All tables have been successfully created")
}).catch(err=>{
    console.log(err);
})

// (async ()=>{
//     await sequelize.sync({force:true});
// })()