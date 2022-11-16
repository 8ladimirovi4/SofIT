import { React, useState, useEffect, useRef } from 'react';
import './cctv.css';

function CCTV() {
  const task1 = useRef();
  const task2 = useRef();
  const task3 = useRef();
  const task4 = useRef();
  const [getTask1, setGetTask1] = useState(false);
  const [getTask2, setGetTask2] = useState(false);
  const [getTask3, setGetTask3] = useState(false);
  const [getTask4, setGetTask4] = useState(false);
  const [getId, setGetId] = useState(0);
  const [getInfo, setGetInfo] = useState();
  const [getDefaultInfo, setDefaultInfo] = useState();

  function getIdPlus() {
    setGetId((prev) => prev + 1);
  }

  function task1Func() {
    setGetTask1((prev) => !prev === true);
  }

  function task2Func() {
    setGetTask2((prev) => !prev === true);
  }

  function task3Func() {
    setGetTask3((prev) => !prev === true);
  }

  function task4Func() {
    setGetTask4((prev) => !prev === true);
  }

  async function FetchFunc() {
    const response = await fetch(`http://localhost:3001/img`, {
      method: 'POST',
      body: JSON.stringify({
        id: getId,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
  }

  function clearCanvas() {
    const context = task1.current.getContext('2d');
    context.clearRect(0, 0, task1.current.width, task1.current.height);
    const context2 = task2.current.getContext('2d');
    context2.clearRect(0, 0, task2.current.width, task2.current.height);
    const context3 = task3.current.getContext('2d');
    context3.clearRect(0, 0, task3.current.width, task3.current.height);
    const context4 = task4.current.getContext('2d');
    context4.clearRect(0, 0, task4.current.width, task4.current.height);
  }

  useEffect(() => {
    async function getInfo() {
      const response = await fetch('http://localhost:3001/data', {
        method: 'POST',
        body: JSON.stringify({
          id: getId,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setGetInfo(JSON.parse(data.trace));
    }
    getInfo();
  }, [getId]);

  useEffect(() => {
    async function getImgFetch() {
      const response = await fetch(`http://localhost:3001/data`);
      if (response.ok) {
        const data = await response.json();
        setDefaultInfo(JSON.parse(data.trace));
      } else {
        console.log('no data');
      }
    }
    getImgFetch();
  }, []);

  useEffect(() => {
    const context1 = task1.current.getContext('2d');
    if (getInfo) {
      const points = getInfo.history.tracks.map((el) =>
        el.points.map((el) => el.plate.center)
      );
      points.map((el) =>
        el.map((coord) => {
          context1.beginPath();
          context1.arc(coord.x * 500, coord.y * 665, 2, 0, 2 * Math.PI);
          context1.fillStyle = 'green';
          return context1.fill();
        })
      );
    }
  }, [getInfo, getTask1]);

  useEffect(() => {
    const context2 = task2.current.getContext('2d');
    if (getInfo) {
      const frame = getInfo.history.tracks.map((el) =>
        el.points.map((el) => el.plate.region)
      );
      frame.map((el) =>
        el.map((coord) => {
          context2.beginPath();
          context2.lineTo(coord.lb.x * 500, coord.lb.y * 610);
          context2.lineTo(coord.lt.x * 500, coord.lt.y * 610);
          context2.lineTo(coord.rt.x * 500, coord.rt.y * 610);
          context2.lineTo(coord.rb.x * 500, coord.rb.y * 610);
          context2.lineTo(coord.lb.x * 500, coord.lb.y * 610);
          return context2.stroke();
        })
      );
    }
  }, [getInfo, getTask2]);

  useEffect(() => {
    const context3 = task3.current.getContext('2d');
    if (getInfo) {
      const frame = getInfo.history.tracks.map((el) =>
        el.points.map((el) => el.vehicle_region)
      );
      frame.map((el) =>
        el.map((coord) => {
          context3.beginPath();
          context3.lineTo(coord.lb.x * 500, coord.lb.y * 610);
          context3.lineTo(coord.lt.x * 500, coord.lt.y * 610);
          context3.lineTo(coord.rt.x * 500, coord.rt.y * 610);
          context3.lineTo(coord.rb.x * 500, coord.rb.y * 610);
          context3.lineTo(coord.lb.x * 500, coord.lb.y * 610);
          return context3.stroke();
        })
      );
    }
  }, [getInfo, getTask3]);

  useEffect(() => {
    function wrapText(
      context,
      text,
      marginLeft,
      marginTop,
      maxWidth,
      lineHeight
    ) {
      const words = text.split(' ');
      const countWords = words.length;
      let line = '';
      for (let n = 0; n < countWords; n++) {
        let testLine = line + words[n] + ' ';
        let testWidth = context.measureText(testLine).width;
        if (testWidth > maxWidth) {
          context.fillText(line, marginLeft, marginTop);
          line = words[n] + ' ';
          marginTop += lineHeight;
        } else {
          line = testLine;
        }
      }
      context.fillText(line, marginLeft, marginTop);
    }
    const maxWidth = 400;
    const lineHeight = 25;
    const marginLeft = 20;
    const marginTop = 40;

    const context4 = task4.current.getContext('2d');
    if (getInfo) {
      const points = getInfo.history.tracks
        .map((el) => el.points.map((el) => el.detection_state.timestamp))
        .join(' ');
      context4.fillStyle = 'white';
      context4.font = '15px Arial';
      wrapText(context4, points, marginLeft, marginTop, maxWidth, lineHeight);
    }
  }, [getInfo, getTask4]);

  return (
    <div className="container">
      <div className="content">
        <h1>SofIT_CCTV</h1>
        <br />
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
          {getTask1 ? (
            <canvas ref={task1} height={'600px'} width={'500px'} />
          ) : (
            <canvas ref={task1} height={'0px'} width={'0px'} />
          )}

          {getTask2 ? (
            <canvas ref={task2} height={'600px'} width={'500px'} />
          ) : (
            <canvas ref={task2} height={'0px'} width={'0px'} />
          )}

          {getTask3 ? (
            <canvas ref={task3} height={'600px'} width={'500px'} />
          ) : (
            <canvas ref={task3} height={'0px'} width={'0px'} />
          )}
          {getTask4 ? (
            <canvas ref={task4} height={'600px'} width={'500px'} />
          ) : (
            <canvas ref={task4} height={'0px'} width={'0px'} />
          )}
         
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
              Дата фиксации:{' '}
              {getDefaultInfo && getDefaultInfo.timestamp.slice(0, 19)}
            </p>
            <p>Тип ТС: {getDefaultInfo && getDefaultInfo.history.class}</p>
          </div>
        )}
        <br />
        <div className="checkbox_container">
          <div className="checkbox">
            <p>Точки</p>
            <br />
            <input type="checkbox" onChange={task1Func} />
          </div>
          <div className="checkbox">
            <p>Рамки</p>
            <br />
            <input type="checkbox" onChange={task2Func} />
          </div>
          <div className="checkbox">
            <p>Границы ТС</p>
            <br />
            <input type="checkbox" onChange={task3Func} />
          </div>
          <div className="checkbox">
            <p>Метки времени</p>
            <br />
            <input type="checkbox" onChange={task4Func} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CCTV;
