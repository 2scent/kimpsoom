import AsyncBoundaryWithQuery from '@/shared/components/AsyncBoundaryWithQuery';
import ErrorAlert from '@/shared/components/ErrorAlert';
import LoadingAlert from '@/shared/components/LoadingAlert';

import useUpbitTickers from '../hooks/useUpbitTickers';

import KimpList from './KimpList';

function KimpContainer() {
  const { isLoading, data: tickers } = useUpbitTickers();

  return (
    <>
      <h1>김프</h1>
      {isLoading
        ? <LoadingAlert />
        : (
          <AsyncBoundaryWithQuery
            pendingFallback={<LoadingAlert />}
            rejectedFallback={ErrorAlert}
          >
            <KimpList
              tickers={tickers}
            />
          </AsyncBoundaryWithQuery>
        )}
    </>
  );
}

export default KimpContainer;
