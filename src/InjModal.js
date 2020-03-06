import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

// const StyledModal = styled((props) => <Modal {...props} />)`
const StyledModal = styled(Modal)`
    height: 400px;
    width: 300px;
    background-color: lightblue;
`

const InjModal = ({ injection }) => {
  return (
    <>
      <StyledModal
        inject
        show={true}
        keyboard
        restoreFocus
      >InjectionFirstModal</StyledModal>
    </>
  );
}

export default InjModal;
