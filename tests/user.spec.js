process.env.NODE_ENV = "test";
const supertest = require('supertest');
const http = require('http')
const model = require('../models/user.model');
const mongoose = require('mongoose')

let oneUser = {
    "username": "Abby",
    "email": "Abby@gmail.com",
    "password": "123"
}

let oneGenerateUser = {
    "username": "Happy",
    "email": "Happy@gmail.com",
    "password": "123"
}

let oneLoginUser = {
    "email": "Happy@gmail.com",
    "password": "123"
}

// let changeUser = {
//     "username": "Abby",
//     "email": "Abby@gmail.com",
//     "password": "123456"
// }

let users = [{
    "username": "Abby",
    "email": "Abby@gmail.com",
    "password": "123"
}, {
    "username": "Iris",
    "email": "Iris@gmail.com",
    "password": "123"
}, {
    "username": "Nisha",
    "email": "Nisha@gmail.com",
    "password": "123"
}]

describe('Test User API', () => {
    let app, server, request

    beforeAll(done => {
        app = require('../server')
        server = http.createServer(app);
        server.listen(done);
        request = supertest(app)

        for(var i in mongoose.connection.collections){
            mongoose.connection.collections[i].remove(function(){});
        }
    });

    afterAll(done => {
        for(var i in mongoose.connection.collections){
            mongoose.connection.collections[i].remove(function(){});
        }
        server.close(done);

    });



describe("GET /",()=>{
    it('should return all users', async ()=>{

        await model.collection.insertMany(users);

        const res = await request.get('/users');
        expect(res.status).toBe(200);  
    });    
})

describe("GET /:id",()=>{
    it('should return a user ', async ()=>{
        const user = new model(oneUser);
        await user.save();

        const res = await request.get('/users/'+user._id);
        expect(res.status).toBe(200);    
    });    
})

describe("Generate /",()=>{
    const exec = async()=>{
        return await request
        .post("/generate")
        .send(oneGenerateUser);
    }

    it('should create a user', async ()=>{
        const res = await exec();
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
        
    })
});

describe("Login /",()=>{
    const exec = async()=>{
        return await request
        .post("/login")
        .send(oneLoginUser);
    }

    it('should create a user', async ()=>{
        const res = await exec();
        expect(res.status).toBe(200);   
    })
});


   



  
});