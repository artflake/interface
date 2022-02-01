import { useEffect, useRef } from 'react';
export default function useInterval(callback, delay) {
  let leading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  const savedCallback = useRef(); // Remember the latest callback.

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]); // Set up the interval.

  useEffect(() => {
    function tick() {
      const current = savedCallback.current;
      current && current();
    }

    if (delay !== null) {
      if (leading) tick();
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }

    return undefined;
  }, [delay, leading]);
}