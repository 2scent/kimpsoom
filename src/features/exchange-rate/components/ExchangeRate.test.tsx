import { renderWithClient } from '@/shared/utils/react-query-testing';

import useExchangeRate from '@/shared/hooks/use-exchange-rate';

import ExchangeRate from './ExchangeRate';

jest.mock('@/shared/hooks/use-exchange-rate');

describe('ExchangeRate', () => {
  const exchangeRate = 1312.00;

  beforeEach(() => {
    (useExchangeRate as jest.Mock).mockReturnValue({ data: exchangeRate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderExchangeRate = () => renderWithClient(<ExchangeRate />);

  it('renders exchange rate', () => {
    const { container } = renderExchangeRate();

    expect(container).toHaveTextContent(exchangeRate.toFixed(2));
  });
});
