import { render } from '@testing-library/react';

import useExchangeRate from '@/shared/hooks/useExchangeRate';

import ExchangeRateContainer from './ExchangeRateContainer';

jest.mock('@/shared/hooks/useExchangeRate');

describe('ExchangeRateContainer', () => {
  const exchangeRate = 1312.00;

  beforeEach(() => {
    (useExchangeRate as jest.Mock).mockReturnValue({ data: exchangeRate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderExchangeRateContainer = () => render(<ExchangeRateContainer />);

  it('renders heading', () => {
    const { container } = renderExchangeRateContainer();

    expect(container).toHaveTextContent('환율');
  });

  it('renders exchange rate', () => {
    const { container } = renderExchangeRateContainer();

    expect(container).toHaveTextContent(exchangeRate.toFixed(2));
  });
});
