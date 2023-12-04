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
    top: '32%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    height: '500px',
    position: 'relative',
  },
};

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      {children}
      <CloseButton onClick={onClose}>X</CloseButton>
    </Modal>
  );
};

export default CustomModal;
