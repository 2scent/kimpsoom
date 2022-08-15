import useBybitCoins from './hooks/useBybitCoins';

import BybitCoins from './BybitCoins';

export default function BybitContainer() {
  const { isLoading, data: coins } = useBybitCoins();

  return (
    <>
      <h1>바이비트</h1>
      {isLoading
        ? <p>로딩 중</p>
        : (
          <BybitCoins
            coins={coins}
          />
        )}
    </>
  );
}
