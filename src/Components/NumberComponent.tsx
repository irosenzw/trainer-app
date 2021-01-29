import React from 'react';
import Card from '../Components/Layout/Card';
import SimpleNumComponent from './SimpleNumComponent';

const NumberComponent: React.FC<NumberComponentProps> = (props) => {
  const { title, ...rest } = props;
  return (
    <Card title={title}>
      <SimpleNumComponent {...rest} />
    </Card>
  );
};

type NumberComponentProps = {
  title: string;
  number: number | string;
  onDown: () => void;
  onUp: () => void;
  onChange: (val: any) => void;
};

export default NumberComponent;
