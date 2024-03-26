import React from 'react'
import './Welcome.css'
import blueBlob from "../../images/Blue.png"
import yellowBlob from "../../images/Yellow.png" 
const Welcome = () => {
  return (
    <div>
        <div className="heroSection">
          <img className='yellow' src={yellowBlob} alt="kuch bi" />
            <div className="heroInner">
              <h1>Welcome to Screen Shot App</h1>
              <p>We Take Screen Shots of Website's issues and Help you Describe issues A better Way</p>
            </div>
          <img className='blue' src={blueBlob} alt="kuch bi" />
      </div>
    </div>
  )
}

export default Welcome;


 