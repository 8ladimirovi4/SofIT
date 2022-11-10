import { useEffect } from 'react'
import {React, useState} from 'react'




function CCTV() {

const img = 'IMG_6583.jpg'

  return (
    <div>
      <h1>CCTV</h1>
        <img src={`http://localhost:3001/upload/${img}`} alt='ops' width='200'/>
    </div>
  )
}

export default CCTV
