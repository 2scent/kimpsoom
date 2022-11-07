import { useDispatch, useSelector } from 'react-redux';

import TICKERS from '@fixtures/tickers';

import { renderWithClient } from '@/shared/utils/react-query-testing';

import useExchangeRate from '@/shared/hooks/use-exchange-rate';

import useUpbitTickers from '../hooks/use-upbit-tickers';

import KimpListContainer from './KimpListContainer';

jest.mock('@/shared/hooks/use-exchange-rate');
jest.mock('../hooks/use-connect-bybit');
jest.mock('../hooks/use-connect-upbit');
jest.mock('../hooks/use-upbit-tickers');

describe('KimpListContainer', () => {
  const dispatch = jest.fn();

  beforeAll(() => {
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

      TICKERS.forEach((
        (ticker) => expect(container).toHaveTextContent(ticker)
      ));
    });
  });

  context('without tickers', () => {
    given('tickers', () => undefined);
    given('selectedTickers', () => []);

    it("doesn't render tickers", () => {
      const { container } = renderKimpListContainer();

      TICKERS.forEach((
        (ticker) => expect(container).not.toHaveTextContent(ticker)
      ));
    });
  });
});
