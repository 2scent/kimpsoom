import { useDispatch, useSelector } from 'react-redux';

import mockConsole, { RestoreConsole } from 'jest-mock-console';

import TICKERS from '@fixtures/tickers';

import { renderWithClient } from '@/shared/utils/testing/react-query';

import useExchangeRate from '@/shared/hooks/useExchangeRate';

import useUpbitTickers from '../hooks/useUpbitTickers';

import KimpContainer from './KimpContainer';

jest.mock('@/shared/hooks/useExchangeRate');
jest.mock('../hooks/useConnectBybit');
jest.mock('../hooks/useConnectUpbit');
jest.mock('../hooks/useUpbitTickers');

describe('KimpContainer', () => {
  const dispatch = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useSelector as jest.Mock).mockReturnValue(TICKERS.map((ticker) => ({ ticker })));

    (useExchangeRate as jest.Mock).mockReturnValue({ data: 1380.0 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderKimpContainer = () => renderWithClient(<KimpContainer />);

  it('renders heading', () => {
    (useUpbitTickers as jest.Mock).mockReturnValue({ data: TICKERS });

    const { container } = renderKimpContainer();

    expect(container).toHaveTextContent('김프');
  });

  context('when succeded', () => {
    beforeAll(() => {
      (useUpbitTickers as jest.Mock).mockReturnValue({ data: TICKERS });
    });

    it('renders tickers', () => {
      const { container } = renderKimpContainer();

      TICKERS.forEach(
        (ticker) => expect(container).toHaveTextContent(ticker),
      );
    });
  });

  context('when loading', () => {
    beforeAll(() => {
      (useUpbitTickers as jest.Mock).mockImplementation(() => {
        throw new Promise(() => {});
      });
    });

    it('renders loading alert', () => {
      const { container } = renderKimpContainer();

      expect(container).toHaveTextContent('로딩 중');
    });
  });

  context('when failed', () => {
    let restoreConsole : RestoreConsole;

    beforeAll(() => {
      restoreConsole = mockConsole();

      (useUpbitTickers as jest.Mock).mockImplementation(() => {
        throw new Error();
      });
    });

    afterAll(() => {
      restoreConsole();
    });

    it('renders error alert', () => {
      const { container } = renderKimpContainer();

      expect(container).toHaveTextContent('다시 불러오기');
    });
  });
});
