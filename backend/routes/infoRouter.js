/* eslint-disable */
const infoRouter = require("express").Router();
const fs = require('fs');
const path = require('path');

//получаем данные из JSON файла
// let info
infoRouter
// .post('/', (req, res, ) => {
//   try{
//     id1 = Number(req.body.id)
//   fs.readdir(`${__dirname}/../uploads/`,(err, files) => {
//     files.forEach((file, i)=> {
// const dir1 = { id: i-2, name: file};
// if(dir1.id === id1){
// fs.readFile(`${__dirname}/../uploads/${dir1.name}/trace.json`, 'utf-8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   info = data
// })
// }else{
//   return
// }
//   })
//     })
// if(info){
// res.json({trace: info})
// }
// }catch ({ message }) {
//   res.json({ message: "info did not found" });
// }
// })


.get(`/:id`, (req, res) => {
  try{
    fs.readdir(`${__dirname}/../uploads/`,(err, files) => {
      if (err) {
        console.error(err);
        return;
      }
    files.forEach((file, i)=> {
      const dir2 = { id: i-1, name: file};
      if(dir2.id === Number(req.params.id)){
      fs.readFile(`${__dirname}/../uploads/${dir2.name}/trace.json`, 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.json({trace: data})
      })
    }
    })
    })
}catch(error){
    res.json({error: message})
  }
})


module.exports = infoRouter;
