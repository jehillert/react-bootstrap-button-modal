import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

const offset = {
  fromRight: 5,
  fromBottom: 10,
  dx: -1.5,
  dy: 3,
}

const StyledModal = styled(Modal)`
  .modal-backdrop {
    /* position: relative; */
    /* z: -10000; */
  }

  .modal-dialog {
    position: fixed;
    bottom: ${offset.fromBottom + offset.dy}rem;
    right: ${offset.fromRight + offset.dx}rem;
  }

  .modal-content {
    height: 25rem;
    width: 15rem;
    background-color: seagreen;
  }
`;

const StyledButton = styled(Button)`
    position: absolute;
    z-index: 1080;
    bottom: ${offset.fromBottom}rem;
    right: ${offset.fromRight}rem;
    background-color: red;
    border-radius: 50%;
    border: none;
    height:3rem;
    width:3rem;
`;

const BootModal = ({ handleClick }) => {
  const handleModalClick = () => handleClick();
  const [modalState, setModalState] = useState(false);

  return (
    <>
      <StyledModal
        show={modalState}
        keyboard
        restoreFocus
        backdropClassName='abc'
      >
        <StyledModal.Header>Header</StyledModal.Header>
        <StyledModal.Body>
          Body
          <button onClick={handleModalClick}>Switch</button>
        </StyledModal.Body>
        <StyledModal.Footer>Footer</StyledModal.Footer>
      </StyledModal>
      <StyledButton
        onClick={() => setModalState(() => !modalState)}
      ></StyledButton>
    </>
  );
}

export default BootModal;
/*
bsPrefix='button-ccs-override'

              ←      ↑ ↑ ↑      →
              ← .modal-backdrop →
              ←      ↓ ↓ ↓      →

  ┌---------------------------------------┐
  ¦                                       ¦.modal-dialog
  ¦                                       ¦.my-dialog-class
  ├───────────────────────────────────────┤
  │                                       │.modalheader
  │                                       │
  │                                       │
  ├───────────────────────────────────────┤
  │                                       │.modal-body
  │                                       │
  │                                       │
  │                                       │
  │                                       │
  │                                       │
  │                                       │
  │                                       │
  │                                       │
  │                                       │
  ├───────────────────────────────────────┤
  │                                       │.modalfooter
  │                                       │
  ├───────────────────────────────────────┤
  ¦                                       ¦
  ¦                                       ¦
  └---------------------------------------┘

            ←      ↑ ↑ ↑      →
            ← .modal-backdrop →
            ←      ↓ ↓ ↓      →

  dialogClassName='my-dialog-class'
*/
