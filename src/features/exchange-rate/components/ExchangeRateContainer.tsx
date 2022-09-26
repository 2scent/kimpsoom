import AsyncBoundaryWithQuery from '@/shared/components/AsyncBoundaryWithQuery';
import ErrorAlert from '@/shared/components/ErrorAlert';
import LoadingAlert from '@/shared/components/LoadingAlert';

import ExchangeRate from './ExchangeRate';

export default function ExchangeRateContainer() {
  return (
    <>
      <h1>환율</h1>
      <AsyncBoundaryWithQuery
        pendingFallback={<LoadingAlert />}
        rejectedFallback={ErrorAlert}
      >
        <ExchangeRate />
      </AsyncBoundaryWithQuery>
    </>
  );
}
