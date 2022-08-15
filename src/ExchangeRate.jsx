import useExchangeRate from './hooks/useExchangeRate';

export default function ExchangeRate() {
  const { isLoading, data: exchangeRate } = useExchangeRate();

  if (isLoading) {
    return <p>로딩 중</p>;
  }

  return (
    <p>{exchangeRate}</p>
  );
}
