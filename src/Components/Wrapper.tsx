import React, { ReactNode } from 'react';
import Container from './Container';
import Header from './Header/Header';

const Wrapper: React.FC<WrapperProps> = (props) => {
  return (
    <Container>
      <Header title={props.title} backNav={props.backNav} />
      <Container
        style={{
          flex: 10,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {props.children}
      </Container>
    </Container>
  );
};

type WrapperProps = {
  title: string;
  backNav?: any;
};

export default Wrapper;
