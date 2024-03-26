import React from 'react'
import CloseIcon from '../../images/Close.png';
import {ReactComponent as CorrectIcon} from '../../images/correct.svg';
import {ReactComponent as RetryIcon} from '../../images/retry.svg';
import './BottomButtons.css'
import Modal from '../Modal';


const BottomButtons = ({handleFullScreenCapture, type , setType, onStartCapture, setCanvaOpenModal, openSSModal, setSSOpenModal, screenCapture }) => {

  const handleCustomCapture = () => {
    onStartCapture(); 
    setType("none");
  }

  const handleClose = () => {
    setType("none");
  }

  const handleSave = () => {
    setCanvaOpenModal(true);
    setType("none");
  }

  const handleRetry = () => {
    setType("shotType");
  }
  

  return (
    <div className='bada'>
      {type === "shotType" &&
        <div className='BottomButtons'>            
          <div onClick={handleCustomCapture} className="btn-texts">Custom Area</div>
          <div onClick={() => handleFullScreenCapture()} className="btn-texts">Full Screen</div>
          <img className='btn-red' src={CloseIcon} onClick={handleClose} alt="" />
        </div>  
      } 
      {type === "shotTaken" &&
                  
      <Modal 
        openModal={openSSModal}
        setOpenModal={setSSOpenModal}
        showCloseIcon={false}
        customClass='SSModal'
        
      >
      <img src={screenCapture} alt="" style={{ width: '100%', height: '100%', marginBottom:"50px" }} />      
        <div className='BottomButtons' id='bg2'>
          <div className='btn-green' onClick={handleSave}><CorrectIcon width="20px" height="20px" />
            <div>Save</div> 
           </div>
          <div onClick={handleRetry} className="btn-texts"><RetryIcon width="20px" height="20px" /></div>
          <img className='btn-red' src={CloseIcon} onClick={handleClose} alt="" />
        </div>
      </Modal>
      } 
    </div>
  )
}

export default BottomButtons