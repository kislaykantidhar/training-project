let chai=require('chai');
let chaihttp=require('chai-http');
chai.use(chaihttp);
let Chance=require('chance');
const { expect } = require('chai');
let chance=new Chance(); 
let admintoken;
let admin={name:chance.name(),email:chance.email({domain:"abc.com"}),password:chance.string({length:9})}
let user1={name:chance.name(),email:chance.email({domain:"abc.com"}),password:chance.string({length:9})}
let user2={name:chance.name(),email:chance.email({domain:"abc.com"}),password:chance.string({length:9})}
let user3={name:chance.name(),email:chance.email({domain:"abc.com"}),password:chance.string({length:9})}
describe("In this test ,1st I will create 1 admin and 3 user ,sign them up,\nnext admin will login and will get token\nafter this with the createTask route admin will try to create task for each of them",()=>{
    it("Create admin",(done)=>{
        chai.request('http://localhost:5227')
        .post('/signup/Admin')
        .send(admin)
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("signed up successfully")
            done()
        })
    })

    it("Create user1",(done)=>{
        chai.request('http://localhost:5227')
        .post('/signup/User')
        .send(user1)
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("signed up successfully")
            done()
        })
    })

    it("Create user2",(done)=>{
        chai.request('http://localhost:5227')
        .post('/signup/User')
        .send(user2)
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("signed up successfully")
            done()
        })
    })
    it("Create user3",(done)=>{
        chai.request('http://localhost:5227')
        .post('/signup/User')
        .send(user3)
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("signed up successfully")
            done()
        })
    })
    it("Login Admin",(done)=>{
        chai.request('http://localhost:5227')
        .post('/login/Admin')
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
    it("admin creates task for user2",(done)=>{
        chai.request('http://localhost:5227')
        .get('/createTask')
        .set('authorization','bearer '+admintoken)
        .send({title:chance.sentence({words:11}),summary:chance.paragraph({sentences:2}),assignedTo:user2.email})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("Task created successfully")
            done();
        })
    })
    it("admin creates task for user3",(done)=>{
        chai.request('http://localhost:5227')
        .get('/createTask')
        .set('authorization','bearer '+admintoken)
        .send({title:chance.sentence({words:9}),summary:chance.paragraph({sentences:3}),assignedTo:user3.email})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("Task created successfully")
            done();
        })
    })
    it("Not assigning task to anybody will also create task with satus unassigned",(done)=>{
        chai.request('http://localhost:5227')
        .get('/createTask')
        .set('authorization','bearer '+admintoken)
        .send({title:chance.sentence({words:9}),summary:chance.paragraph({sentences:3})})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("Task created successfully")
            done();
        }) 
    })

    it("Not giving summary to the task will give 403",(done)=>{
        chai.request('http://localhost:5227')
        .get('/createTask')
        .set('authorization','bearer '+admintoken)
        .send({title:chance.sentence({words:9})})
        .end((err,res)=>{
            expect(res).to.have.status(403);
            done();
        }) 
    })
    it("Not giving title to the task will give 403 too",(done)=>{
        chai.request('http://localhost:5227')
        .get('/createTask')
        .set('authorization','bearer '+admintoken)
        .send({summary:chance.paragraph({sentences:3})})
        .end((err,res)=>{
            expect(res).to.have.status(403);
            done();
        }) 
    })
    it("assigning task to some wrong user email",(done)=>{
        chai.request('http://localhost:5227')
        .get('/createTask')
        .set('authorization','bearer '+admintoken)
        .send({title:chance.sentence({words:9}),summary:chance.paragraph({sentences:3}),assignedTo:chance.email({domain:"random.com"})})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg).to.equal("The user email doesnot exist")
            done();
        })
    })

    it("passing in the wrong token will send 403",(done)=>{
        chai.request('http://localhost:5227')
        .get('/createTask')
        .set('authorization','bearer wrong token')
        .send({title:chance.sentence({words:9}),summary:chance.paragraph({sentences:3}),assignedTo:user3.email})
        .end((err,res)=>{
            expect(res).to.have.status(403);
            done();
        })
    })

})