import { useRef } from 'react';

import { throttle } from 'throttle-debounce';

interface Throttles {
  [key: string]: throttle<(func: () => void) => void>;
}

export default function useThrottle(delayMs: number) {
  const throttles = useRef({} as Throttles);

  return (key: string, callback: () => void) => {
    if (!(key in throttles.current)) {
      throttles.current[key] = throttle(
        delayMs,
        (func: () => void) => func(),
      );
    }

    throttles.current[key](callback);
  };
}
