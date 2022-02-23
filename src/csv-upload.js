const fs = require('fs');
const csv = require('fast-csv');
const express = require('express');
const { response } = require('express');

const upload = async(req,res ,next) => {
    let resultList = [];
    try{
        if(req.file == undefined){
            res.status(400).send("Please upload CSV file");
        }else{
            let path = "./uploads/" + req.file.filename;
            fs.createReadStream(path).pipe(csv.parse({headers : true}))
            .on("error",(error) =>{
                throw error.message;
            })
            .on("data", (row) => {
                resultList.push(row);
            })
            .on("end", () => {
                frameResponse(resultList);
                res.status(200).send(frameResponse(resultList));
              });
        }
    }catch (error){
        res.status(500).send("Could not upload file");
    }
}

function frameResponse(fileValues){
    let  max = fileValues[0].customer_avrage_rating;
    let maxIndex = 0;

    for (let i = 1, len=fileValues.length; i < len; i++) {
      let v = fileValues[i].customer_avrage_rating;
      (v > max) ? ( max = v,  maxIndex = i)
          : max = max;
    }
    let responseObj = {};
    responseObj['top_product'] = fileValues[maxIndex].product_name;
    responseObj['product_rating'] = fileValues[maxIndex].customer_avrage_rating;
    return responseObj;
}
module.exports = {upload, frameResponse};