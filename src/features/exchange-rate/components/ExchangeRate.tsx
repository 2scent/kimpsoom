import useExchangeRate from '@/shared/hooks/use-exchange-rate';

export default function ExchangeRate() {
  const { data: exchangeRate } = useExchangeRate();

  return <p>{exchangeRate?.toFixed(2)}</p>;
}
