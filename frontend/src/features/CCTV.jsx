import { useEffect } from 'react'
import {React, useState} from 'react'




function CCTV() {
const [getId, setGetId] = useState(1)
const [getInfo, setGetInfo] = useState({})
const [getImage, setGetImage] = useState({})

function getIdPlus () {
  setGetId(prev => prev + 1)
}

function getIdMinus () {
  setGetId(prev => prev - 1)
}


  // async function FetchFunc () {
  //   await fetch(`http://localhost:3001/img`, {
  //    method: 'POST',
  //    body: JSON.stringify({
  //    id: getId,
  //    }),
  //    headers: { "Content-Type": "application/json" },
  //  }) 
  //    }
  //    FetchFunc ()

     useEffect(() => {
      async function getInfo () {
  const response =  await fetch ('http://localhost:3001/data')
  const data = await response.json()
  setGetInfo(JSON.parse(data.trace));
      }
      getInfo () 
     },[])
     console.log(getInfo);

// useEffect(() => {
//   async function getImg () {
// const response =  await fetch ('http://localhost:3001/img')
// const data = await response.json()
// setGetImage(data.img)
//   }
//   getImg () 
//  },[])

// if(getImage.name){
// console.log (getImage.name[0])
// }

  return (
    <div>
      <h1>CCTV</h1>
     
        <img src={`http://localhost:3001/img`} alt='ops' width='600'/>
  
        {/* <button onClick={() => {FetchFunc(); getIdPlus()}}>getIdPlus</button>
        <button onClick={() => {FetchFunc(); getIdMinus()}}>getIdMinus</button> */}
    </div>
  )
}

export default CCTV
