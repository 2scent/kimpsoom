import { useDispatch, useSelector } from 'react-redux';

import TICKERS from '@fixtures/tickers';

import { renderWithClient } from '@/shared/utils/testing/react-query';

import useUpbitTickers from '../hooks/useUpbitTickers';

import KimpListContainer from './KimpListContainer';

jest.mock('../hooks/useConnectBybit');
jest.mock('../hooks/useConnectUpbit');
jest.mock('../hooks/useUpbitTickers');

describe('KimpListContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useSelector as jest.Mock).mockReturnValue(TICKERS.map((ticker) => ({ ticker })));

    (useUpbitTickers as jest.Mock).mockImplementation(() => ({
      data: TICKERS,
    }));
  });

  const renderKimpListContainer = () => renderWithClient(<KimpListContainer />);

  it('renders tickers', () => {
    const { container } = renderKimpListContainer();

    TICKERS.forEach(
      (ticker) => expect(container).toHaveTextContent(ticker),
    );
  });
});
