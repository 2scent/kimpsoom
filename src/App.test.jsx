import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  const renderApp = () => render(<App />);

  it('renders heading', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('KIMPSOOM');
  });

  it('renders upbit bitcoin price', () => {
    const { container } = renderApp();

    expect(container).toHaveTextContent('업비트 BTC: 30,588,000');
  });
});
