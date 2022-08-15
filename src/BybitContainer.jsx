import useBybitCoins from './hooks/useBybitCoins';

function BybitCoins({ coins }) {
  return (
    <ul>
      {coins.map((coin) => (
        <li key={coin.name}>
          {coin.name}
        </li>
      ))}
    </ul>
  );
}

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
