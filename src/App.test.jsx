import { render } from '@testing-library/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

describe('App', () => {
  const queryClient = new QueryClient();

  const renderApp = () => render((
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  ));

  it('renders heading', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('KIMPSOOM');
  });

  it('renders kimp', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('김프');
  });
});
