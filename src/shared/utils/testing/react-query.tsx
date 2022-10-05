import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { render } from '@testing-library/react';

const defaultOptions = {
  queries: {
    retry: false,
  },
};

export function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions,
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

export function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions,
  });

  const { rerender, ...result } = render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) => rerender(
      <QueryClientProvider client={queryClient}>{rerenderUi}</QueryClientProvider>,
    ),
  };
}
