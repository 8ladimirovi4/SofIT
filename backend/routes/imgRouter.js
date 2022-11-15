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
fs.readdir(`${__dirname}/../uploads/`,(err, files) => {
  files.forEach((file, i)=> {
    dir1 = { id: i, name: file};
    return arr.push(dir1)
  })
  arr.map(el => {
    if(el.id === id1)
  image = path.resolve(`${__dirname}/../uploads/${el.name}/debug.jpg`)     
 
  map.set(1,image )
  // console.log('image',image);
  // console.log(id1);
})
  // res.sendFile(image)
  
  res.json({img: image})
})

})




  .get('/', (req, res) => {
  const foo = map.get(1)
  console.log('foo==>',foo);   
    res.sendFile(foo)
  })







module.exports = imgRouter;
