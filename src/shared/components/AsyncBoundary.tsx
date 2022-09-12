import {
  ReactNode,
  Suspense,
  SuspenseProps,
} from 'react';

import {
  ErrorBoundary,
  ErrorBoundaryPropsWithRender,
} from 'react-error-boundary';

type ExceptFallbackErrorBoundaryAttributes = Omit<
  ErrorBoundaryPropsWithRender,
  'fallbackRender' | 'fallback' | 'FallbackComponent'
>;

export interface AsyncBoundaryProps extends ExceptFallbackErrorBoundaryAttributes {
  pendingFallback: SuspenseProps['fallback'];
  rejectedFallback: ErrorBoundaryPropsWithRender['fallbackRender'];
  children: ReactNode;
}

function AsyncBoundary({
  pendingFallback,
  rejectedFallback,
  children,
  ...errorBoundaryProps
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={rejectedFallback}
      {...errorBoundaryProps}
    >
      <Suspense fallback={pendingFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
