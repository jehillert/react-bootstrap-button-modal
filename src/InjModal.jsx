import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

// const StyledModal = styled(Modal)`
const StyledModal = styled((props) => <Modal {...props} />)`
  div.modal-dialog {

  }
  div.modal-content {

  }
  height: 400px;
  width: 300px;
  background-color: lightblue;
`

const InjModal = ({ handleClick }) => {
  const yo = () => {
    handleClick();
  }
  return (
    <>
      <StyledModal
        show={true}
        keyboard
        restoreFocus
      >
        <button onClick={yo}>
          InjectionFirstModal
        </button>
      </StyledModal>
    </>
  );
}

export default InjModal;
