import { useEffect } from 'react'
import {React, useState} from 'react'
import './cctv.css'




function CCTV() {
const [getId, setGetId] = useState(0)
const [getInfo, setGetInfo] = useState()
const [getDefaultInfo, setDefaultInfo] = useState()



function getIdPlus () {
  setGetId(prev => prev + 1)
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
     //Для задания 1
     console.log('Задание1',getInfo &&  getInfo.history.tracks.map(el => el.points.map(el => el.plate.center.y)));
     //Для задания 2
     console.log('Задание2',getInfo &&  getInfo.history.tracks.map(el => el.points.map(el => el.plate.region)));
     //Для задания 3
     console.log('Задание3',getInfo &&  getInfo.history.tracks.map(el => el.points.map(el => el.vehicle_region)));
     //Для задания 4
     console.log('Задание4',getInfo &&  getInfo.history.tracks.map(el => el.points.map(el => el.detection_state.timestamp)));

     const task4 = getInfo &&  getInfo.history.tracks.map(el => el.points.map(el => el.detection_state.timestamp)).join('\n')
     console.log(task4);

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
        <div className='container_img'>
        <img src={`http://localhost:3001/img/${getId}`} alt='ops' width='600'/> 
        <div className='data'>
          {task4}
        </div>
        </div>
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
