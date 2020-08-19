let chai=require('chai');
let chaihttp=require('chai-http');
chai.use(chaihttp);
let Chance=require('chance');
const { expect } = require('chai');
let chance=new Chance();
let admintoken,usertoken1,usertoken2;
let admin={name:chance.name(),email:chance.email({domain:"abc.com"}),password:chance.string({length:9})}
let user1={name:chance.name(),email:chance.email({domain:"abc.com"}),password:chance.string({length:9})}
let user2={name:chance.name(),email:chance.email({domain:"abc.com"}),password:chance.string({length:9})}

describe("In this test 1 admin and 2 users are created , and to one 3 tasks will be assigned and the other wont be assigned any tasks",()=>{
    it("Create admin",(done)=>{
        chai.request('http://localhost:5227')
        .post('/signupAdmin')
        .send(admin)
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("signed up successfully")
            done()
        })
    })

    it("Create user1",(done)=>{
        chai.request('http://localhost:5227')
        .post('/signupUser')
        .send(user1)
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("signed up successfully")
            done()
        })
    })

    it("Create user2",(done)=>{
        chai.request('http://localhost:5227')
        .post('/signupUser')
        .send(user2)
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("signed up successfully")
            done()
        })
    })

    it("Login Admin",(done)=>{
        chai.request('http://localhost:5227')
        .post('/loginAdmin')
        .send({email:admin.email,password:admin.password})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("welcome");
            expect(res.body.token).to.be.not.null;
            expect(res.body.token).to.be.not.undefined;
            admintoken=res.body.token;
            done();
        })
    })
    it("admin creates task for user1",(done)=>{
        chai.request('http://localhost:5227')
        .get('/createTask')
        .set('authorization','bearer '+admintoken)
        .send({title:chance.sentence({words:10}),summary:chance.paragraph({sentences:4}),assignedTo:user1.email})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("Task created successfully")
            done();
        })
    })
    it("admin creates task for user1 again",(done)=>{
        chai.request('http://localhost:5227')
        .get('/createTask')
        .set('authorization','bearer '+admintoken)
        .send({title:chance.sentence({words:10}),summary:chance.paragraph({sentences:4}),assignedTo:user1.email})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("Task created successfully")
            done();
        })
    })
    it("admin creates task for user1 for the third time",(done)=>{
        chai.request('http://localhost:5227')
        .get('/createTask')
        .set('authorization','bearer '+admintoken)
        .send({title:chance.sentence({words:10}),summary:chance.paragraph({sentences:4}),assignedTo:user1.email})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("Task created successfully")
            done();
        })
    })
    it("user1 logs in and get its token",(done)=>{
        chai.request('http://localhost:5227')
        .post('/loginUser')
        .send({email:user1.email,password:user1.password})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("welcome");
            expect(res.body.token).to.be.not.null;
            expect(res.body.token).to.be.not.undefined;
            usertoken1=res.body.token;
            done();
        })

    })
    it("user1 checks out tasks that are assigned to him,which should be 3 in number as three tasks are assigned to him",(done)=>{
        chai.request('http://localhost:5227')
        .get('/viewTasks')
        .set('authorization','bearer '+usertoken1)
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg.length).to.equal(3)
            expect(res.body.msg[0]).has.property('id');
            expect(res.body.msg[0]).has.property('title');
            expect(res.body.msg[0]).has.property('summary');
            expect(res.body.msg[0]).has.property('created_at');
            expect(res.body.msg[0]).has.property('comment_at');
            done();
        })
    })

    it("now user 2 login in to get his list of tasks",(done)=>{
        chai.request('http://localhost:5227')
        .post('/loginUser')
        .send({email:user2.email,password:user2.password})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("welcome");
            expect(res.body.token).to.be.not.null;
            expect(res.body.token).to.be.not.undefined;
            usertoken2=res.body.token;
            done();
        })

    })

    it("user2 checks and sees that he did'nt get any tasks",(done)=>{
        chai.request('http://localhost:5227')
        .get('/viewTasks')
        .set('authorization','bearer '+usertoken2)
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("No task is assigned to you yet")
            done();
        })
    })

    it("someone with wrong token token will get 403",(done)=>{
        chai.request('http://localhost:5227')
        .get('/viewTasks')
        .set('authorization','bearer '+"wrong token")
        .end((err,res)=>{
            expect(res).to.have.status(403);
            
            done();
        })
    })
    

})