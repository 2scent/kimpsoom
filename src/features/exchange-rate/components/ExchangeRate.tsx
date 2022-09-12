import useExchangeRate from '../hooks/useExchangeRate';

export default function ExchangeRate() {
  const { isLoading, data: exchangeRate } = useExchangeRate();

  return (
    <>
      <h1>환율</h1>
      {isLoading
        ? <p>로딩 중</p>
        : <p>{exchangeRate?.toFixed(2)}</p>}
    </>
  );
}
