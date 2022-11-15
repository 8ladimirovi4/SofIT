import { useEffect } from 'react'
import {React, useState, useRef} from 'react'




function CCTV() {
const [getId, setGetId] = useState(1)
const [getInfo, setGetInfo] = useState({})
const [getImage, setGetImage] = useState({})
const input = useRef()

function getIdPlus () {
  setGetId(prev => prev + 1)
}

function getIdMinus () {
  setGetId(prev => prev - 1)
}


  async function FetchFunc (event) {
    event.preventDefault()
    const response = await fetch(`http://localhost:3001/img`, {
     method: 'POST',
     body: JSON.stringify({
     id: input.current.value,
     }),
     headers: { "Content-Type": "application/json" },
   }) 
   const data = await response.json()
   setGetImage(data)
     }
console.log(getImage);

     useEffect(() => {
      async function getInfo () {
  const response =  await fetch ('http://localhost:3001/data')
  const data = await response.json()
  setGetInfo(JSON.parse(data.trace));
      }
      getInfo () 
     },[])
     console.log(getInfo);

useEffect(() => {
async function getImg () {
await fetch ('http://localhost:3001/img')
  }
  getImg () 
 },[getImage])

// if(getImage.name){
// console.log (getImage.name[0])
// }

  return (
    <div>
      <h1>CCTV</h1>
     
        <img src={`http://localhost:3001/img`} alt='ops' width='600'/>
  
        {/* <button onClick={() => {FetchFunc(); getIdPlus()}}>getIdPlus</button>
        <button onClick={() => {FetchFunc(); getIdMinus()}}>getIdMinus</button> */}
       <form >
        <input name="input1" ref={input}/>
        <button onClick={FetchFunc}>click</button>
       </form>
       {/* <p>{getImage && getImage.img}</p> */}
    </div>
  )
}

export default CCTV
