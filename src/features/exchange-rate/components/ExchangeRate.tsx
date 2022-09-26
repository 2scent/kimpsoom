import useExchangeRate from '@/shared/hooks/useExchangeRate';

export default function ExchangeRate() {
  const { data: exchangeRate } = useExchangeRate();

  return <p>{exchangeRate?.toFixed(2)}</p>;
}
