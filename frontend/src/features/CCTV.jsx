import { useEffect } from 'react'
import {React, useState, useRef} from 'react'




function CCTV() {
const [getId, setGetId] = useState(2)
const [getInfo, setGetInfo] = useState({})
const [getImage, setGetImage] = useState({})



function getIdPlus () {
  setGetId(prev => prev + 1)
}

function getIdMinus () {
  setGetId(prev => prev - 1)
  if (getId < 2) {
    setGetId(2)
  }
}


  async function FetchFunc () {
    const response = await fetch(`http://localhost:3001/img`, {
     method: 'POST',
     body: JSON.stringify({
     id: getId,
     }),
     headers: { "Content-Type": "application/json" },
   }) 
   const data = await response.json()
   setGetImage(data)
     }
console.log(getImage.img);



     useEffect(() => {
      async function getInfo () {
  const response =  await fetch ('http://localhost:3001/data')
  const data = await response.json()
  setGetInfo(JSON.parse(data.trace));
      }
      getInfo () 
     },[getImage])
     console.log(getInfo);

// useEffect(() => {
// async function getImg () {
// const response = await fetch ('http://localhost:3001/img')
//   }
//   getImg () 
//  },[getImage])
//  console.log(getId);

// if(getImage.name){
// console.log (getImage.name[0])
// }

  return (
    <div>
      <h1>CCTV</h1>
      { getId >= 2 ? 
      <>
        <img src={`http://localhost:3001/img/${getId}`} alt='ops' width='600'/> 
        <br/>   
        <button onClick={() => {FetchFunc();getIdMinus()}}>back</button>
        <button onClick={() => {FetchFunc();getIdPlus()}}>forward</button>
        </>
:
<>
<img src={`http://localhost:3001/img/${getId}`} alt='ops' width='600'/> 
        <br/>   
        <button onClick={() => {FetchFunc();getIdPlus()}}>forward</button>
        </>
      }
       <p>{getInfo && getInfo.timestamp}</p>
    </div>
  )
}

export default CCTV
