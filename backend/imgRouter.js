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
  id1 = Number(req.body.id)
fs.readdir(`${__dirname}/uploads/`,(err, files) => {
  files.forEach((file, i)=> {
    dir1 = { id: i, name: file};
    return arr.push(dir1)
  })
  arr.map(el => {
    if(el.id === id1)
  image = path.resolve(`${__dirname}/uploads/${el.name}/debug.jpg`)     
 
  
  // console.log('image',image);
  // console.log(id1);
})
map.set('url', image)
  // res.sendFile(image)
  res.json({img: image})
})

})




  .get('/', (req, res) => {
if(map.get('url')){
  console.log('map===>',map.get('url'));
  res.sendFile(`${map.get('url')}`)
}else{
    res.sendFile('/Users/vlleo/Desktop/Тестовые/SofIT/CCTV_pdd/backend/uploads/Y917CP26_8d87adf8-ce40-47b3-814c-4700d28a016f/debug.jpg')
}
  })







module.exports = imgRouter;
