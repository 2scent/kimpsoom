import AsyncBoundaryWithQuery from '@/shared/components/AsyncBoundaryWithQuery';
import ErrorAlert from '@/shared/components/ErrorAlert';
import LoadingAlert from '@/shared/components/LoadingAlert';

import useExchangeRate from '@/shared/hooks/useExchangeRate';

function ExchangeRateFetch() {
  const { data: exchangeRate } = useExchangeRate();

  return <p>{exchangeRate?.toFixed(2)}</p>;
}

export default function ExchangeRate() {
  return (
    <>
      <h1>환율</h1>
      <AsyncBoundaryWithQuery
        pendingFallback={<LoadingAlert />}
        rejectedFallback={ErrorAlert}
      >
        <ExchangeRateFetch />
      </AsyncBoundaryWithQuery>
    </>
  );
}
