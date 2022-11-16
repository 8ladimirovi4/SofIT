/* eslint-disable */
const infoRouter = require("express").Router();
const fs = require('fs');
const path = require('path');

//получаем данные из JSON файла

infoRouter
.get(`/`, (req, res) => {
  try{
   fs.readFile(`${__dirname}/../uploads/A226CO790_0c5759f8-edd9-4e10-b0aa-c996d14bebfc/trace.json`, 'utf-8', (err, data) => {
    if(data)
 res.json({trace: data})
  })
}catch(error){
    res.json({error: message})
  }
})


module.exports = infoRouter;
