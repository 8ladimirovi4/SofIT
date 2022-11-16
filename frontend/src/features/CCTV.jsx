import { useEffect } from 'react'
import {React, useState, useRef} from 'react'
import './cctv.css'




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


  return (
    <div className='container'>
      <div className='content'>
      <h1>SofIT_CCTV</h1>
        <button onClick={() => {FetchFunc();getIdPlus()}}>List Photo</button>
        <br/>  
        <br/>  
    
        <img src={`http://localhost:3001/img/${getId}`} alt='ops' width='600'/> 
        {getInfo ? 
    
        <div className='info'>
        <p>Гос номер ТС: {getInfo && getInfo.history.plate}</p>
        <p>Дата фиксации: {getInfo && getInfo.timestamp.slice(0,19)}</p>
        <p>Тип ТС: {getInfo && getInfo.history.class}</p>
        </div>
:
        <div className='info'>
        <p>Гос номер ТС: {getDefaultInfo && getDefaultInfo.history.plate}</p>
        <p>Дата фиксации: {getDefaultInfo && getDefaultInfo.timestamp.slice(0,19)}</p>
        <p>Тип ТС: {getDefaultInfo && getDefaultInfo.history.class}</p>
        </div>
        }
      </div>
    </div>
  )
}

export default CCTV
