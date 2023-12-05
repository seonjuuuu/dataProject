import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const appRoot = document.getElementById('root');
Modal.setAppElement(appRoot);

const customStyles = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    top: '20px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translateX( -50%)',
    maxWidth: '500px',
    width: '70%',
    height: '500px',
    position: 'relative',
  },
};
const ConfirmButton = styled.button`
  display: block;
  color: white;
  background-color: #2c3e76;
  border: none;
  box-shadow: none;
  border-radius: 4px;
  padding: 8px 12px;
  overflow: visible;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  bottom: 50px;
  right: 30px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const CustomModal = ({ isOpen, onClose, children, showConfirmButton }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      {children}
      <CloseButton onClick={onClose}>X</CloseButton>
      {showConfirmButton && (
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      )}
    </Modal>
  );
};

export default CustomModal;
