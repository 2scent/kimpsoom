import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import mockConsole, { RestoreConsole } from 'jest-mock-console';

import TICKERS from '@fixtures/tickers';

import useUpbitTickers from '../hooks/use-upbit-tickers';

import UpbitTickersContainer from './UpbitTickersContainer';

jest.mock('../hooks/use-upbit-tickers');

describe('UpbitTickersContainer', () => {
  const dispatch = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useSelector as jest.Mock).mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderUpbitTickersContainer = () => render(<UpbitTickersContainer />);

  it('renders heading', () => {
    (useUpbitTickers as jest.Mock).mockReturnValue({ data: TICKERS });

    const { container } = renderUpbitTickersContainer();

    expect(container).toHaveTextContent('코인');
  });

  context('when succeeded', () => {
    beforeAll(() => {
      (useUpbitTickers as jest.Mock).mockReturnValue({ data: TICKERS });
    });

    it('renders tickers', () => {
      const { container } = renderUpbitTickersContainer();

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
      const { container } = renderUpbitTickersContainer();

      expect(container).toHaveTextContent('로딩 중');
    });
  });

  context('when failed', () => {
    let restoreConsole : RestoreConsole;

    beforeAll(() => {
      restoreConsole = mockConsole();

      (useUpbitTickers as jest.Mock).mockImplementation(() => {
        throw new Error('Test');
      });
    });

    afterAll(() => {
      restoreConsole();
    });

    it('renders error alert', () => {
      const { container } = renderUpbitTickersContainer();

      expect(container).toHaveTextContent('다시 불러오기');
    });
  });
});
