import useUpbitCoins from '../hooks/useUpbitCoins';

import UpbitCoins from './UpbitCoins';

export default function UpbitContainer() {
  const { isLoading, data: coins } = useUpbitCoins();

  return (
    <>
      <h1>업비트</h1>
      {isLoading
        ? <p>로딩 중</p>
        : (
          <UpbitCoins
            coins={coins}
          />
        )}
    </>
  );
}
