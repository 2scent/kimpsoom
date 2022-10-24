import { useDispatch, useSelector } from 'react-redux';

import TICKERS from '@fixtures/tickers';

import { renderWithClient } from '@/shared/utils/testing/react-query';

import useExchangeRate from '@/shared/hooks/useExchangeRate';

import useUpbitTickers from '../hooks/useUpbitTickers';

import KimpListContainer from './KimpListContainer';

jest.mock('@/shared/hooks/useExchangeRate');
jest.mock('../hooks/useConnectBybit');
jest.mock('../hooks/useConnectUpbit');
jest.mock('../hooks/useUpbitTickers');

describe('KimpListContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useSelector as jest.Mock).mockImplementation(() => given.selectedTickers);

    (useExchangeRate as jest.Mock).mockReturnValue({ data: 1380.0 });
    (useUpbitTickers as jest.Mock).mockReturnValue({ data: given.tickers });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderKimpListContainer = () => renderWithClient(<KimpListContainer />);

  context('with tickers', () => {
    given('tickers', () => TICKERS);
    given('selectedTickers', () => TICKERS.map((ticker) => ({ ticker })));

    it('renders tickers', () => {
      const { container } = renderKimpListContainer();

      TICKERS.forEach(
        (ticker) => expect(container).toHaveTextContent(ticker),
      );
    });
  });

  context('without tickers', () => {
    given('tickers', () => undefined);
    given('selectedTickers', () => []);

    it("doesn't render tickers", () => {
      const { container } = renderKimpListContainer();

      TICKERS.forEach(
        (ticker) => expect(container).not.toHaveTextContent(ticker),
      );
    });
  });
});
