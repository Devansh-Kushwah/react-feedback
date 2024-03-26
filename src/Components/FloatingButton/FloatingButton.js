import React, { useState } from 'react';
import './FloatingButton.css'
import ScreenShot from '../../images/Capture.png';
import CloseIcon from '../../images/Close.png';
import tickets from '../../images/tickets.png';

const FloatingButton = ({setType}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    if(isOpen){
      setType("shotType");
      setIsOpen(false);
    }
    else{
      setType("none");
      setIsOpen(true);
    }
  };

  return (
    <div className="floatingButton">
      <div className="FloatingIcon" onClick={handleButtonClick}>
        {isOpen ?  <img src={CloseIcon} alt="Close" width={"30px"}  /> : <img src={ScreenShot} alt="ScreenShot" width={"30px"}  />}
      </div>
      {isOpen && (
      <div className='FloatingModal'>
        <div style={{display:"flex", }}>
          <div>
            <div style={{marginTop:"16px", fontSize:"16px", fontWeight:"500"}}>Facing Problem ?</div>
            <div style={{fontSize:"14px"}}>Our web support team is here to help! Feel free to reach out to with any question or issues you're facing while navigating our website.</div>
            <div style={{fontSize:"14px", fontWeight:"500"}}>Report an issue</div>

          </div>
          <div>
            <img src={tickets} style={{width:"100px"}} alt="" />
          </div>
        </div>
        <div style={{paddingRight:"32px"}}>
        <div style={{cursor: "pointer" , fontSize: "14px", color: "white", width:"100%", margin:"16px 0px 0px 0px ", borderRadius:"8px", textAlign:"center", padding: "8px", backgroundColor:"#293264"}} onClick={handleButtonClick}>Take A ScreenShot</div>
        </div>
      </div> 
      )}
    </div>
  );
};

export default FloatingButton;