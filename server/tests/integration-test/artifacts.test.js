// process.env.NODE_ENV = "test";
// const request = require('supertest');
// const model = require('../../../src/api/proposal/model');

// let app;
// let oneProposal = {
//     "status": "new",
//     "note": [

//     ],
//     "name": "name 0",
//     "outlineOfProject": "project outline 1",
//     "endProductBenefits": "end product benefits 1",
//     "beneficiaries": "beneficiaries 1",
//     "originality": "originality 1",
//     "clientId": "1",
//     "subjectName": "subject name 1",
//     "organisationId": "0"
//   }

// let changeProposal =  {
//     "status": "new",
//     "note": [

//     ],
//     "name": "name 1",
//     "outlineOfProject": "project outline 1",
//     "endProductBenefits": "end product benefits 1",
//     "beneficiaries": "beneficiaries 1",
//     "originality": "originality 1",
//     "clientId": "1",
//     "subjectName": "subject name 2",
//     "organisationId": "0"
//   }

// let proposals = [{
//     "status": "new",
//     "note": [

//     ],
//     "name": "name 0",
//     "outlineOfProject": "project outline 1",
//     "endProductBenefits": "end product benefits 1",
//     "beneficiaries": "beneficiaries 1",
//     "originality": "originality 1",
//     "clientId": "1",
//     "subjectName": "subject name 1",
//     "organisationId": "0"
//   },
//   {
//     "status": "new",
//     "note": [

//     ],
//     "name": "name 1",
//     "outlineOfProject": "project outline 1",
//     "endProductBenefits": "end product benefits 1",
//     "beneficiaries": "beneficiaries 1",
//     "originality": "originality 1",
//     "clientId": "1",
//     "subjectName": "subject name 2",
//     "organisationId": "0"
//   }]

// describe('Test proposal API', () => {
//     beforeEach(() => { app = require('../../../src/api/main');})
//     afterEach(async () => { 
//       await model.remove({});
//     })

// describe("GET /",()=>{
//     it('should return all proposals', async ()=>{

//         await model.collection.insertMany(proposals);

//         const res = await request(app).get('/proposal');
//         expect(res.status).toBe(200);  
//         // expect(res.body.length).toBe(1);     
//     });    
// })

// describe("GET /:id",()=>{
//     it('should return a proposal id valid id is passed', async ()=>{
//         const proposal = new model(oneProposal);
//         await proposal.save();

//         const res = await request(app).get('/proposal/'+proposal._id);
//         expect(res.status).toBe(200);  
//     });    
// })

// describe("POST /",()=>{
//     const exec = async()=>{
//         return await request(app)
//         .post("/proposal")
//         .send(oneProposal);
//     }


//     it('should create a new proposal', async ()=>{
//         const res = await exec();
//         expect(res.status).toBe(200);
//         // console.log(res.body);
//         expect(res.body).toHaveProperty('_id');
//         expect(res.body.name).toBe("name 0");

//     })
// });

// describe("PUT /:id", () => {
//     let newProposal;
//     let proposal;
//     let id;
//     const exec = async ()=>{
//         return await request(app)
//         .put('/proposal/'+id)
//         .send(newProposal);     
//     }

//     beforeEach(async()=>{
//         proposal = new model(oneProposal);
//         await proposal.save();

//         id = proposal._id;
//         newProposal = changeProposal;
//     })
//     it("It responds with an updated proposal", async () => {

//       const res = await exec();

//       expect(res.status).toBe(200);

//     });
//   });

// });