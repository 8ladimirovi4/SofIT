/* eslint-disable */
const infoRouter = require("express").Router();
const fs = require('fs');
const path = require('path');

//получаем данные из JSON файла
let info
infoRouter
.get('/', (req, res, ) => {
  try{
  fs.readdir(`${__dirname}/../uploads/`,(err, files) => {
    files.forEach((file, i)=> {
const dir = { id: i, name: file};
fs.readFile(`${__dirname}/../uploads/${dir.name}/trace.json`, 'utf-8', (err, data) => {
  console.log(data);
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

module.exports = infoRouter;
