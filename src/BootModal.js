// https://getbootstrap.com/docs/3.4/javascript/
// dismissible popover example
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
  .modal-backdrop {}

  .modal-dialog {
    position: fixed;
    bottom: ${offset.fromBottom + offset.dy}rem;
    right: ${offset.fromRight + offset.dx}rem;
  }

  .modal-content {
    background-color: seagreen;
    height: 25rem;
    width: 15rem;
  }
`;

const StyledButton = styled(Button)`
    background-color: red;
    border-radius: 50%;
    border: none;
    height:3rem;
    position: absolute;
    width:3rem;
    z-index: 1080;
    bottom: ${offset.fromBottom}rem;
    right: ${offset.fromRight}rem;
`;

const StyledModalButton = styled(Button)`
  float: right;
  align-self: flex-end;
  vertical-align: 80%
`;

const StyledModalBody = styled(StyledModal.Body)`
  height: 300px;
`;

const BootModal = ({ handleClick }) => {
  const [modalState, setModalState] = useState(false);

  return (
    <>
      <StyledModal
        show={modalState}
        keyboard
      >
        <StyledModal.Header>Header</StyledModal.Header>
        <StyledModalBody
          as='button'
          onClick={() => setModalState(false)}
        >
          Click Me
        </StyledModalBody>
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
