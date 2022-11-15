/* eslint-disable */
const imgRouter = require("express").Router();
const { dir } = require("console");
const fs = require('fs');
const path = require('path');

let id1
let dir1
let image
const arr = []
let obj = {}
let map = new Map()
imgRouter
.post('/', (req, res) => {
try{
  id1 = Number(req.body.id)
fs.readdir(`${__dirname}/../uploads/`,(err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file, i)=> {
    dir1 = { id: i-2, name: file};
    return arr.push(dir1)
  })
  arr.map(el => {
    if(el.id === id1){
  image = path.resolve(`${__dirname}/../uploads/${el.name}/debug.jpg`)
    }else{
      return
    }     
})
map.set('url', image)
  res.json({img: image})
})
}catch (error){
  res.json({error: message})
}
})


  .get(`/:id`, (req, res) => {
    try{
   if(map.get('url')){
  res.status(200)
  .sendFile(`${map.get('url')}`)
}
else{
    res.sendFile(path.resolve(`${__dirname}/../uploads/A226CO790_0c5759f8-edd9-4e10-b0aa-c996d14bebfc/debug.jpg`))

}
    }catch(error){
      res.json({error: message})
    }
  })







module.exports = imgRouter;
