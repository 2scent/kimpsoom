import LoadingAlert from '@/shared/components/LoadingAlert';
import AsyncBoundaryWithQuery from '@/shared/components/AsyncBoundaryWithQuery';
import ErrorAlert from '@/shared/components/ErrorAlert';

import UpbitTickers from './UpbitTickers';

function UpbitTickersContainer() {
  return (
    <>
      <h1>코인</h1>
      <AsyncBoundaryWithQuery
        pendingFallback={<LoadingAlert />}
        rejectedFallback={ErrorAlert}
      >
        <UpbitTickers />
      </AsyncBoundaryWithQuery>
    </>
  );
}

export default UpbitTickersContainer;
