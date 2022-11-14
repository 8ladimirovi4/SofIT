/* eslint-disable */
const imgRouter = require("express").Router();
const fs = require('fs');
const path = require('path');

//получаем данные из JSON файла
let image
let dir1
imgRouter
.get('/', (req, res, next) => {
  try{
      fs.readdir(`${__dirname}/../uploads/`,(err, files) => {
        files.forEach((file, i)=> {
          dir1 = { id: i, name: file};
          next()
         image = path.resolve(`${__dirname}/../uploads/${dir1.name}/debug.jpg`)
        })
  })
  res.sendFile(image)
}catch ({ message }) {
  res.json({ message: "image did not found" });
}
})

module.exports = imgRouter;
