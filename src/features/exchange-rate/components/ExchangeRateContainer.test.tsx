import mockConsole, { RestoreConsole } from 'jest-mock-console';

import { renderWithClient } from '@/shared/utils/testing/react-query';

import useExchangeRate from '@/shared/hooks/use-exchange-rate';

import ExchangeRateContainer from './ExchangeRateContainer';

jest.mock('@/shared/hooks/use-exchange-rate');

describe('ExchangeRateContainer', () => {
  const exchangeRate = 1312.00;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderExchangeRateContainer = () => renderWithClient(<ExchangeRateContainer />);

  it('renders heading', () => {
    (useExchangeRate as jest.Mock).mockReturnValue({ data: exchangeRate });

    const { container } = renderExchangeRateContainer();

    expect(container).toHaveTextContent('환율');
  });

  context('when succeeded', () => {
    beforeAll(() => {
      (useExchangeRate as jest.Mock).mockReturnValue({ data: exchangeRate });
    });

    it('renders exchange rate', () => {
      const { container } = renderExchangeRateContainer();

      expect(container).toHaveTextContent(exchangeRate.toFixed(2));
    });
  });

  context('when loading', () => {
    beforeAll(() => {
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
    let restoreConsole : RestoreConsole;

    beforeAll(() => {
      restoreConsole = mockConsole();

      (useExchangeRate as jest.Mock).mockImplementation(() => {
        throw new Error();
      });
    });

    afterAll(() => {
      restoreConsole();
    });

    it('renders error alert', () => {
      const { container } = renderExchangeRateContainer();

      expect(container).toHaveTextContent('다시 불러오기');
    });
  });
});
