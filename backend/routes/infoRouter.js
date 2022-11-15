/* eslint-disable */
const infoRouter = require("express").Router();
const fs = require('fs');
const path = require('path');

//получаем данные из JSON файла
let info
infoRouter
.post('/', (req, res, ) => {
  try{
    id1 = Number(req.body.id)
  fs.readdir(`${__dirname}/../uploads/`,(err, files) => {
    files.forEach((file, i)=> {
const dir1 = { id: i-2, name: file};
if(dir1.id === id1)
fs.readFile(`${__dirname}/../uploads/${dir1.name}/trace.json`, 'utf-8', (err, data) => {
  info = data
})
  })
    })
if(info){
res.json({trace: info})
}
}catch ({ message }) {
  res.json({ message: "info did not found" });
}
})


.get(`/`, (req, res) => {
  try{
   fs.readFile(`${__dirname}/../uploads/Y917CP26_8d87adf8-ce40-47b3-814c-4700d28a016f/trace.json`, 'utf-8', (err, data) => {
    if(data)
 res.json({trace: data})
  })
}catch(error){
    res.json({error: message})
  }
})


module.exports = infoRouter;
