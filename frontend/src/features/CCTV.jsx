import {React, useState, useEffect, useRef} from 'react'
import './cctv.css'




function CCTV() {
const task1 = useRef();
const task2 = useRef();
const [getId, setGetId] = useState(0)
const [getInfo, setGetInfo] = useState()
const [getDefaultInfo, setDefaultInfo] = useState()
const [getTask4, setGetTask4] = useState(false)


function getIdPlus () {
  setGetId(prev => prev + 1)
}

function task4Func () {
  setGetTask4(prev => !prev === true)
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
    //  //Для задания 1
    //  console.log('Задание1',getInfo &&  getInfo.history.tracks.map(el => el.points.map(el => el.plate.center.y)));
    //  //Для задания 2
    //  console.log('Задание2',getInfo &&  getInfo.history.tracks.map(el => el.points.map(el => el.plate.region)));
    //  //Для задания 3
    //  console.log('Задание3',getInfo &&  getInfo.history.tracks.map(el => el.points.map(el => el.vehicle_region)));
    //  //Для задания 4
    //  console.log('Задание4',getInfo &&  getInfo.history.tracks.map(el => el.points.map(el => el.detection_state.timestamp)));

     const task4 = getInfo &&  getInfo.history.tracks.map(el => el.points.map(el => el.detection_state.timestamp)).join('\n')
   

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

useEffect(() => {
  const context = task1.current.getContext("2d");
  if (getInfo) {
    const points = getInfo.history.tracks.map((el) =>
      el.points.map((el) => el.plate.center)
    );
    points.map((el) =>
      el.map((coord) => {
        context.beginPath();
        context.arc(coord.x * 500, coord.y * 665, 2, 0, 2 * Math.PI);
        context.fillStyle = "green";
        context.fill();
      })
    );
  }
}, [getInfo]);

const clearCanvas = () => {
  const context = task1.current.getContext("2d");
  context.clearRect(0, 0, task1.current.width, task1.current.height);
  const context2 = task2.current.getContext("2d");
  context2.clearRect(0, 0, task2.current.width, task2.current.height);
};



useEffect(() =>{
  const context = task2.current.getContext("2d");
  if (getInfo) {
    const frame = getInfo.history.tracks.map(el => el.points.map(el => el.vehicle_region))
    console.log(frame);
  //  frame.map(el => el.map(coord => console.log('lt', coord.lt.x,
  //  'rt', coord.rt, 'lb', coord.lb, 'rb', coord.rb
  //   )))
  frame.map(el => el.map(coord => {
    context.beginPath();
    // context.moveTo(coord.lb.x *300,coord.lb.y*300);
    context.strokeRect(coord.rb.x*100, coord.rb.y*100, coord.rt.x*100, coord.rt.y*100)
    // context.bezierCurveTo(coord.lt.x*50,coord.lt.y*50,coord.rb.x*50,coord.rb.y*50,coord.rt.x*50,coord.rt.y*50)
    context.stroke();
  }))
  }
},[getInfo])


return (
  <div className="container">
    <div className="content">
      <h1>SofIT_CCTV</h1>
      <button
        onClick={() => {
          FetchFunc();
          getIdPlus();
          clearCanvas();
        }}
      >
        List Photo
      </button>
      <br />
      <br />
      <div className="container_img">
        <img
          src={`http://localhost:3001/img/${getId}`}
          alt="ops"
          width="600"
        />
        <canvas ref={task1} height={"600px"} width={"500px"} />
        <canvas ref={task2} height={"600px"} width={"500px"} />
        <div className="data">{getTask4 ? task4 : null}</div>
      </div>

      {getInfo ? (
        <div className="info">
          <p>Гос номер ТС: {getInfo && getInfo.history.plate}</p>
          <p>Дата фиксации: {getInfo && getInfo.timestamp.slice(0, 19)}</p>
          <p>Тип ТС: {getInfo && getInfo.history.class}</p>
        </div>
      ) : (
        <div className="info">
          <p>
            Гос номер ТС: {getDefaultInfo && getDefaultInfo.history.plate}
          </p>
          <p>
            Дата фиксации:{" "}
            {getDefaultInfo && getDefaultInfo.timestamp.slice(0, 19)}
          </p>
          <p>Тип ТС: {getDefaultInfo && getDefaultInfo.history.class}</p>
        </div>
      )}
      <p>метки времени</p>
      <input type="checkbox" onChange={task4Func} />
    </div>
  </div>
);
}

export default CCTV;
