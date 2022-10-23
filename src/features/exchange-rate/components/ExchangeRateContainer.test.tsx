import { renderWithClient } from '@/shared/utils/testing/react-query';

import useExchangeRate from '@/shared/hooks/useExchangeRate';

import ExchangeRateContainer from './ExchangeRateContainer';

jest.mock('@/shared/hooks/useExchangeRate');

describe('ExchangeRateContainer', () => {
  const exchangeRate = 1312.00;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderExchangeRateContainer = () => renderWithClient(<ExchangeRateContainer />);

  context('when succeeded', () => {
    beforeEach(() => {
      (useExchangeRate as jest.Mock).mockReturnValue({ data: exchangeRate });
    });

    it('renders exchange rate', () => {
      const { container } = renderExchangeRateContainer();

      expect(container).toHaveTextContent(exchangeRate.toFixed(2));
    });
  });

  context('when loading', () => {
    beforeEach(() => {
      (useExchangeRate as jest.Mock).mockImplementation(() => {
        throw new Promise(() => {});
      });
    });

    it('renders loading alert', () => {
      const { container } = renderExchangeRateContainer();

      expect(container).toHaveTextContent('로딩 중');
    });
  });

  context('when failed', () => {
    beforeEach(() => {
      (useExchangeRate as jest.Mock).mockImplementation(() => {
        throw new Error();
      });
    });

    it('renders error alert', () => {
      const { container } = renderExchangeRateContainer();

      expect(container).toHaveTextContent('다시 불러오기');
    });
  });
});
