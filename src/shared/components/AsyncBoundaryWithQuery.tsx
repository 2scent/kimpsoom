import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import AsyncBoundary, { AsyncBoundaryProps } from './AsyncBoundary';

export default function AsyncBoundaryWithQuery(props: AsyncBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <AsyncBoundary
      onReset={reset}
      {...props}
    />
  );
}
