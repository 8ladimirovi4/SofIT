/* eslint-disable */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const infoRouter = require('./routes/infoRouter');
const imgRouter = require('./routes/imgRouter');

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors({ origin: ['http://localhost:3000'] }));
app.use('/data', infoRouter);
app.use('/img', imgRouter);

     
// 
//   app.use('/img', (req, res, next) => {
//     const id = req.body.id
   
// next(id)
//   if(id){
//     if (dir.id === ) {
//     app.use('/img', (req, res) => { 
//       // res.sendFile(img)
//     })
//   }
// }else {
  // app.use('/img', (req, res) => { 
  //   // res.sendFile(img)
  //   res.json({path:img})
  // })
// }
//   })

// if(dir.id === 2){
// app.use('/img', (req, res) => {
//   res.sendFile(img)
// })
// }
//написать код, чтобы получать 

// app.use('/img', express.static(`${__dirname}/uploads/${dir.name}/debug.jpg`));
       


 

  // //прочитать файл
  // fs.readFile(`./uploads/A011CA126_68f8f9e7-04ac-4395-998b-a50f99901a78/trace.json`, 'utf-8', (err, data) => {
  
  // })

  // //получить имя дикторий в массиве
  // fs.readdir(`${__dirname}/uploads`, { withFileTypes: true }, (err, files) => {
  //   files.filter(d => d.isDirectory()).map(d => d.name)
  //   })

//routes
// app.use('/upload', express.static('./uploads'));


app.listen(PORT, () => console.log(`Server started on ${PORT} port`));


// const image = path.resolve(`${__dirname}/uploads/${dir1.name}/debug.jpg`)

// app.use('/img', express.static(`${__dirname}/../uploads/${dir1.name}/debug.jpg`))