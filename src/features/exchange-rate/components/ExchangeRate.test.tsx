import { renderWithClient } from '@/shared/utils/testing/react-query';

import useExchangeRate from '@/shared/hooks/useExchangeRate';

import ExchangeRate from './ExchangeRate';

jest.mock('@/shared/hooks/useExchangeRate');

describe('ExchangeRate', () => {
  const exchangeRate = 1312.00;

  beforeEach(() => {
    (useExchangeRate as jest.Mock).mockReturnValue({ data: exchangeRate });
  });

  afterEach(() => {
    jest.clearAllMocks();
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
