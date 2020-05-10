import React from 'react';

// delay == null -> pause interval
// delay == 1 -> clear interval
// eslint-disable-next-line import/prefer-default-export
export const useInterval = (callback: any, delay: number) => {
  const savedCallback: React.MutableRefObject<any> = React.useRef();

  // Remember the latest function.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      if (delay === 1) {
        clearInterval(id);
      }
      return () => clearInterval(id);
    }
  }, [delay]);
};
