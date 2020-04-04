import React from 'react';
import Container from './Container';
import Header from './Header/Header';

const Wrapper = ({ children, title, backNav }) => {
  return (
    <Container>
      <Header title={title} backNav={backNav} />
      <Container
        style={{
          flex: 10,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {children}
      </Container>
    </Container>
  );
};
export default Wrapper;
