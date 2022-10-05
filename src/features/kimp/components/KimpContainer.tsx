import AsyncBoundaryWithQuery from '@/shared/components/AsyncBoundaryWithQuery';
import ErrorAlert from '@/shared/components/ErrorAlert';
import LoadingAlert from '@/shared/components/LoadingAlert';

import KimpListContainer from './KimpListContainer';

function KimpContainer() {
  return (
    <>
      <h1>김프</h1>
      <AsyncBoundaryWithQuery
        pendingFallback={<LoadingAlert />}
        rejectedFallback={ErrorAlert}
      >
        <KimpListContainer />
      </AsyncBoundaryWithQuery>
    </>
  );
}

export default KimpContainer;
