let chai=require('chai');
let chaihttp=require('chai-http');
chai.use(chaihttp);
let Chance=require('chance');
const { expect } = require('chai');
let chance=new Chance();
let admintoken,usertoken1;
let log_link1,log_link2;
let comment_link1,comment_link2;
let admin={name:chance.name(),email:chance.email({domain:"abc.com"}),password:chance.string({length:9})}
let user1={name:chance.name(),email:chance.email({domain:"abc.com"}),password:chance.string({length:9})}
describe("In this test I am trying to check whether the admin is able to get the comments and log time  or not",()=>{
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
    it("user1 logs in and get its token",(done)=>{
        chai.request('http://localhost:5227')
        .post('/login/User')
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
    it("user1 checks out tasks that are assigned to him,which should be 2 in number as two tasks are assigned to him",(done)=>{
        chai.request('http://localhost:5227')
        .get('/view/Tasks')
        .set('authorization','bearer '+usertoken1)
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(res.body.msg.length).to.equal(2)
            expect(res.body.msg[0]).has.property('id');
            expect(res.body.msg[0]).has.property('title');
            expect(res.body.msg[0]).has.property('summary');
            expect(res.body.msg[0]).has.property('created_at');
            expect(res.body.msg[0]).has.property('comment_at');
            expect(res.body.msg[0]).has.property('logTime_at');
            expect(res.body.msg[1]).has.property('id');//from here we get the 2nd alloted tasks
            expect(res.body.msg[1]).has.property('title');
            expect(res.body.msg[1]).has.property('summary');
            expect(res.body.msg[1]).has.property('created_at');
            expect(res.body.msg[1]).has.property('comment_at');
            expect(res.body.msg[1]).has.property('logTime_at');
            log_link1=res.body.msg[0].logTime_at.split('/')[3];
            log_link2=res.body.msg[1].logTime_at.split('/')[3];
            comment_link1=res.body.msg[0].comment_at.split('/')[3];
            comment_link2=res.body.msg[1].comment_at.split('/')[3];
            done();
        })
    })
    it("user1 tries to log time with the link he gets",(done=>{
       chai.request('http://localhost:5227')
       .get("/"+log_link1)
       .set('authorization','bearer '+usertoken1)
       .send({startedAt:"10:43",endedAt:"15:23"})
       .end((err,res)=>{
           expect(res.body.msg).to.equal("Time Logged!");
           done();
       })     
    }))
    it("user1 tries to log time with the 2nd link he gets",(done=>{
        chai.request('http://localhost:5227')
        .get("/"+log_link2)
        .set('authorization','bearer '+usertoken1)
        .send({startedAt:"10:44",endedAt:"15:24"})
        .end((err,res)=>{
            expect(res.body.msg).to.equal("Time Logged!");
            done();
        })     
     }))
     it("user1 tries to comment with the link he gets",(done=>{
        chai.request('http://localhost:5227')
        .get("/"+comment_link1)
        .set('authorization','bearer '+usertoken1)
        .send({comment:"test comment1"})
        .end((err,res)=>{
            expect(res.body.msg).to.equal("Comment posted");
            done();
        })     
     }))
     it("user1 tries to comment with the 2nd link he gets",(done=>{
         chai.request('http://localhost:5227')
         .get("/"+comment_link2)
         .set('authorization','bearer '+usertoken1)
         .send({comment:"test comment2"})
         .end((err,res)=>{
             expect(res.body.msg).to.equal("Comment posted");
             done();
         })     
      }))
      it("Now admin tries to check all the tasks he created",(done)=>{
        chai.request('http://localhost:5227')
        .get('/view/CreatedTask')
        .set('authorization','bearer '+admintoken)
        .end((err,res)=>{
            expect(res.body.msg[0]).has.property('showComments');
            expect(res.body.msg[1]).has.property('showComments');
            expect(res.body.msg[0]).has.property('logs');
            expect(res.body.msg[1]).has.property('logs');
            expect(res.body).not.to.be.null;
            log_link1=res.body.msg[0].logs.split('/')[3];
            log_link2=res.body.msg[1].logs.split('/')[3];
            comment_link1=res.body.msg[0].showComments.split('/')[3]+"/"+res.body.msg[0].showComments.split('/')[4];
            comment_link2=res.body.msg[1].showComments.split('/')[3]+"/"+res.body.msg[1].showComments.split('/')[4];
            done();
        })
      })
      it("Then admin tries to check the log time(1st link)",(done)=>{
          chai.request('http://localhost:5227')
          .get('/'+log_link1)
          .set('authorization','bearer '+admintoken)
          .end((err,res)=>{
              expect(res.body.msg[0].startedAt).to.equal("10:43:00")
              expect(res.body.msg[0].endedAt).to.equal("15:23:00")
              done()
          })
      })
      it("Then admin tries to check the comment(1st link)",(done)=>{
        chai.request('http://localhost:5227')
        .get('/'+comment_link1)
        .set('authorization','bearer '+admintoken)
        .end((err,res)=>{
            expect(res.body.msg[0].comment).to.equal("test comment1")
           
            done()
        })
    })
    it("Then admin tries to check the log time(2nd link)",(done)=>{
        chai.request('http://localhost:5227')
        .get('/'+log_link2)
        .set('authorization','bearer '+admintoken)
        .end((err,res)=>{
            expect(res.body.msg[0].startedAt).to.equal("10:44:00")
            expect(res.body.msg[0].endedAt).to.equal("15:24:00")
            done()
        }) 
    })
    it("Then admin tries to check the comment(2nd link)",(done)=>{
      chai.request('http://localhost:5227')
      .get('/'+comment_link2)
      .set('authorization','bearer '+admintoken)
      .end((err,res)=>{
          expect(res.body.msg[0].comment).to.equal("test comment2")
         
          done()
      })
    })
    it("Without the right token 403 is recieved",(done)=>{
        chai.request('http://localhost:5227')
        .get('/view/CreatedTask')
        .set('authorization','bearer nobear')
        .end((err,res)=>{
            expect(res).to.have.status(403)
            done();
        })
      })
      it("Checking the comments withouth the right token will also return 403",(done)=>{
        chai.request('http://localhost:5227')
        .get('/'+comment_link2)
        .set('authorization','bearer wrongtoken')
        .end((err,res)=>{
            expect(res).to.have.status(403)
           
            done()
        })
      })

})