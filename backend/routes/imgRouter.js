/* eslint-disable */
const imgRouter = require("express").Router();
const fs = require('fs');
const path = require('path');


let image
const arr = []
let map = new Map()

imgRouter
.post('/', (req, res) => {
try{
 const id1 = Number(req.body.id)
fs.readdir(`${__dirname}/../uploads/`,(err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file, i)=> {
   const dir1 = { id: i-1, name: file};
   console.log(id1);
   console.log(dir1);
    return arr.push(dir1)
  })
  arr.map(el => {
    if(el.id + 1 === id1){
   image = path.resolve(`${__dirname}/../uploads/${el.name}/debug.jpg`)
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
map.set('url', image)
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
