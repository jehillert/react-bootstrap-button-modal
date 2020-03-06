import React, { useState } from 'react';
import BootModal from './BootModal';
import InjModal from './InjModal';
import InjectFirstProvider from './InjectFirstProvider'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const App = () => {
  const [toggleState, toggleModals] = useState(true)

  const StyledDiv = styled.div`
    /* height: 100vw; */
    /* width: 100vw; */
    /* background-color: lightgrey; */
    /* padding: 3rem; */
  `

  const handleClick = () => {
    toggleModals((prevState) => !prevState);
  };

  return (
    <>
    <StyledDiv></StyledDiv>
      {toggleState ? (
        <BootModal handleClick={handleClick} />
      ) : (
        <InjectFirstProvider>
          <InjModal handleClick={handleClick} />
        </InjectFirstProvider>
      )}
    </>
  );
}

export default App;
