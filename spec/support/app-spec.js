var request = require('request');
const fs = require('fs');

describe("server", () =>{
    var server;
    beforeAll(() => {
        server =  require('../../src/index');
    })
    afterAll(()=>{
        server.close();
    })

    describe("GET /serverstatus" ,()=>{
        var data = {};
        beforeAll((done)=>{
            request.get("http://localhost:3000/api/csv/serverstatus", (error, response, body) => {
                console.log("ERR", error, body, response)
                data.status = response.statusCode;
                data.body = body;
                done();
            })
        })
        it("Status 200" , () => {
            expect(data.status).toBe(200);
        })
        it("Status 200" , () => {
            expect(data.body).toBe("API is up");
        })
    })

    describe("POST /fileupload no file" ,()=>{
        var data = {};
        beforeAll((done)=>{
            request.post("http://localhost:3000/api/csv/fileupload", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            })
        })
        it("Status 400 Bad Request" , () => {
            expect(data.status).toBe(400);
        })
        it("Status Bad Request message" , () => {
            expect(data.body).toBe("Please upload CSV file");
        })
    })

    describe("POST /fileupload success request " ,()=>{
        var data = {};
        var controller = require('../../src/csv-upload');
        const formData  = {
            file: fs.createReadStream( 'uploads/file-1645632007707'),
        };

        beforeAll((done)=>{
           
            spyOn(controller, "frameResponse").and.callThrough();
            request.post({url:"http://localhost:3000/api/csv/fileupload",formData:formData}, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            })
        })
        it("Status 200" , () => {
            expect(data.status).toBe(200);
        })
       it("Response Data As Expected", ()=>{
           expect(data.body).toEqual('{"top_product":"Massoub gift card","product_rating":" 5.0"}')
       })
       it("High Rated Product evaluation is success", ()=>{
           expect(controller.frameResponse).toHaveBeenCalled();
       })
    })
})

