import React from 'react';
import Modal from '../Modal';
import './SSModal.css';

const SSModal = ({screenCapture, openSSModal, setSSOpenModal}) => {
  return (
    <Modal 
      title="SSs Editor"
      openModal={openSSModal}
      setOpenModal={setSSOpenModal}
      // showCloseIcon={true}
      customClass='SSModal'
    >
      <img src={screenCapture} alt="" style={{ width: '100%', height: '100%' }} />
      
    </Modal>
  );
}

export default SSModal;