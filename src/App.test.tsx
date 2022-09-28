import { renderWithClient } from './shared/utils/testing/react-query';

import App from './App';

describe('App', () => {
  const renderApp = () => renderWithClient(<App />);

  it('renders heading', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('KIMPSOOM');
  });

  it('renders exchange rate', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('환율');
  });

  it('renders kimchi premium', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('김프');
  });
});
