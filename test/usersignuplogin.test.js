let chai=require('chai');
let chaihttp=require('chai-http');
chai.use(chaihttp);
let expect=chai.expect;
let Chance=require('chance');
let chance=new Chance();
let email=chance.email({domain:"gmail.com"});
    let name=chance.name(); 
    let password=chance.string({length:9});
describe("checking the user signup route",()=>{
    
    it("sending new data value to get sign up",(done)=>{
        chai.request('http://localhost:5227')
        .post('/signupUser')
        .send({name:name,email:email,password:password})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(JSON.stringify(res.body)).to.equal(JSON.stringify({msg:"signed up successfully"}));
            done();
        })
        
        
    })
    it("sending same data value to get sign up:it wont work because email exists already",(done)=>{
        chai.request('http://localhost:5227')
        .post('/signupUser')
        .send({name:name,email:email,password:password})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(JSON.stringify(res.body)).to.equal(JSON.stringify({msg:"emailid must be unique"}));
            done()
        })
        
    })

    it("Loging in with the same credentials",(done)=>{
        chai.request('http://localhost:5227')
        .post('/loginUser')
        .send({email:email,password:password})
        .end((err,res)=>{
            expect(res).to.have.status(200);
            expect(Object.keys(res.body)[1]).to.equal("token");
            expect(res.body.token).to.be.not.undefined;
            expect(res.body.token).to.be.not.null;
            done();
        })
    })

    it("Loging in with wrong credentials",(done)=>{
        chai.request('http://localhost:5227')
        .post('/loginUser')
        .send({email:email,password:"wrongpass"})
        .end((err,res)=>{
            expect(res.body.msg).to.equal("Your email Id or password is invalid");
            done();
        })
    })

    it("signing up with no values:it would return 403",(done)=>{
        chai.request('http://localhost:5227')
        .post('/signupUser')
        .send({})
        .end((err,res)=>{
            expect(res).to.have.status(403);
            
            done()
        })
    })
    it("signing up with password and name with spaces should return \"name\" is not allowed to be empty",(done)=>{
        chai.request('http://localhost:5227')
        .post('/signupUser')
        .send({email:chance.email(),name:"           ",password:"           "})
        .end((err,res)=>{
            expect(res.body.msg).to.equal("\"name\" is not allowed to be empty");
            done()
        })
    })
    it("signing up with password with characters less than 8 should return \"password\" length must be at least 8 characters long",(done)=>{
        chai.request('http://localhost:5227')
        .post('/signupUser')
        .send({email:chance.email({domain:"gmail.com"}),name:chance.name(),password:chance.string({length:6})})
        .end((err,res)=>{
            expect(res.body.msg).to.equal("\"password\" length must be at least 8 characters long");
            done()
        })
    })
})