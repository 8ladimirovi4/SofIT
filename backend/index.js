/* eslint-disable */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const fs = require('fs');

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));

//получаем массив с картинками

fs.readdir(`${__dirname}/uploads/`,(err, files) => {
    files.forEach((file, i)=> {
const dir = { id: i, name: file};
console.log(dir);
//написать код, чтобы получать 
if(dir.id === 4)
      app.use('/img', express.static(`${__dirname}/uploads/${dir.name}`));
        })
      })

 

  // //прочитать файл
  // fs.readFile(`./uploads/A011CA126_68f8f9e7-04ac-4395-998b-a50f99901a78/trace.json`, 'utf-8', (err, data) => {
  
  // })

  // //получить имя дикторий в массиве
  // fs.readdir(`${__dirname}/uploads`, { withFileTypes: true }, (err, files) => {
  //   files.filter(d => d.isDirectory()).map(d => d.name)

  //   })

//routes
app.use('/upload', express.static('./uploads'));


app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
