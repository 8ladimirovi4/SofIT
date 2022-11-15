import { useEffect } from 'react'
import {React, useState, useRef} from 'react'




function CCTV() {
const [getId, setGetId] = useState(0)
const [getInfo, setGetInfo] = useState()
const [getDefaultInfo, setDefaultInfo] = useState()
const [getImage, setGetImage] = useState({})





function getIdPlus () {
  setGetId(prev => prev + 1)
}

function getIdMinus () {
  setGetId(prev => prev - 1)
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

     useEffect(() => {
      async function getInfo () {
  const response =  await fetch ('http://localhost:3001/data', {
    method: 'POST',
     body: JSON.stringify({
     id: getId,
     }),
     headers: { "Content-Type": "application/json" },
  })
  const data = await response.json()
  setGetInfo(JSON.parse(data.trace));
      }
      getInfo () 
     },[getId])
     console.log(getInfo);

     

useEffect(()=> {
  async function getImgFetch () {
  const response = await fetch(`http://localhost:3001/data`)
  if(response.ok){
  const data = await response.json()
  setDefaultInfo(JSON.parse(data.trace))
  }else{
    console.log('no data');
  }
  }
  getImgFetch ()
},[])
console.log('====>', getDefaultInfo);

  return (
    <div>
      <h1>CCTV</h1>
      <div>
        <button onClick={() => {FetchFunc();getIdPlus()}}>List Photo</button>
        <br/>  
        <img src={`http://localhost:3001/img/${getId}`} alt='ops' width='600'/> 
        {getInfo ? 
        <p>{getInfo && getInfo.history.plate}</p>
:
<p>{getDefaultInfo && getDefaultInfo.history.plate}</p>
        }
        </div>

   
    </div>
  )
}

export default CCTV
