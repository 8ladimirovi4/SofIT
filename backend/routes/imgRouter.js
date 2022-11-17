/* eslint-disable */
const imgRouter = require("express").Router();
const fs = require('fs');
const path = require('path');



const arr = []
let map = new Map()

imgRouter
.post('/', (req, res) => {
try{
  const id1 = Number(req.body.id)
  map.set('id', id1)
fs.readdir(`${__dirname}/../uploads/`,(err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file, i)=> {
   const dir1 = { id: i-1, name: file};
    return arr.push(dir1)
  })
  arr.map(el => {
    if(el.id === id1){
   const image = path.resolve(`${__dirname}/../uploads/${el.name}/debug.jpg`)
   map.set('url', image)
    }else{
      return
    }     
})
files.forEach((file, i)=> {
  const dir2 = { id: i-1, name: file};
  if(dir2.id === id1){
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
}catch (error){
  res.json({error: message})
}
})



  .get(`/:id`, (req, res) => {
 
    console.log(req.params.id);
    try{
  
    fs.readdir(`${__dirname}/../uploads/`,(err, files) => {
      if (err) {
        console.error(err);
        return;
      }
      files.forEach((file, i)=> {
       const dir1 = { id: i, name: file};
        return arr.push(dir1)
      })
      arr.map(el => {
        if(el.id === Number(req.params.id)){
       const image = path.resolve(`${__dirname}/../uploads/${el.name}/debug.jpg`)
       res.sendFile(image)  
        }else{
          return
        }  
        
 
    })
  })
}catch(error){
  res.json({error: message})
}
})

module.exports = imgRouter;
