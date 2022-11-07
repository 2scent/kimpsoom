import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { render, renderHook } from '@testing-library/react';

const defaultOptions = {
  queries: {
    retry: false,
    suspense: true,
  },
};

export function renderHookWithClient<Result, Props>(renderFunc: (initialProps: Props) => Result) {
  const queryClient = new QueryClient({ defaultOptions });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  return renderHook(renderFunc, { wrapper });
}

export function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({ defaultOptions });

  return render((
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  ));
}
