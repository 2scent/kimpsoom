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
    (useSelector as jest.Mock).mockReturnValue(TICKERS.map((ticker) => ({ ticker })));

    (useExchangeRate as jest.Mock).mockReturnValue({ data: 1380.0 });
    (useUpbitTickers as jest.Mock).mockReturnValue({ data: TICKERS });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderKimpListContainer = () => renderWithClient(<KimpListContainer />);

  it('renders tickers', () => {
    const { container } = renderKimpListContainer();

    TICKERS.forEach(
      (ticker) => expect(container).toHaveTextContent(ticker),
    );
  });
});
