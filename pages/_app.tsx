import type { AppProps } from 'next/app';

import React from 'react';

import { Provider } from 'react-redux';

import {
  Hydrate, QueryClient, QueryClientConfig, QueryClientProvider,
} from '@tanstack/react-query';

import store from '@/shared/store';

const defaultOptions: QueryClientConfig['defaultOptions'] = {
  queries: {
    suspense: true,
  },
};

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: unknown }>) {
  const [queryClient] = React.useState(() => new QueryClient({ defaultOptions }));

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
