import { renderHook } from '@testing-library/react';

import useThrottle from './use-throttle';

jest.useFakeTimers();

describe('useThrottle', () => {
  const cb = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('executes callback at most once per delay', () => {
    const { result: { current: throttle } } = renderHook(() => useThrottle(500));

    throttle('key', cb);
    throttle('key', cb);
    throttle('key', cb);
    throttle('key', cb);

    jest.advanceTimersByTime(500);

    throttle('key', cb);
    throttle('key', cb);
    throttle('key', cb);

    jest.advanceTimersByTime(500);

    throttle('key', cb);
    throttle('key', cb);

    expect(cb).toHaveBeenCalledTimes(3);
  });

  it('applies delay for each key', () => {
    const { result: { current: throttle } } = renderHook(() => useThrottle(500));

    throttle('key1', cb);
    throttle('key2', cb);
    throttle('key3', cb);

    expect(cb).toHaveBeenCalledTimes(3);
  });
});
