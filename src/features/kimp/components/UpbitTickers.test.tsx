import { fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import TICKERS from '@fixtures/tickers';

import { renderWithClient } from '@/shared/utils/testing/react-query';

import { toggleSelectCoin } from '@/shared/store/coins-slice';

import useUpbitTickers from '../hooks/use-upbit-tickers';

import UpbitTickersContainer from './UpbitTickersContainer';

jest.mock('../hooks/use-upbit-tickers');

describe('UpbitTickersContainer', () => {
  const dispatch = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useSelector as jest.Mock).mockReturnValue([]);

    (useUpbitTickers as jest.Mock).mockReturnValue({ data: TICKERS });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderUpbitTickersContainer = () => renderWithClient(<UpbitTickersContainer />);

  it('renders tickers', () => {
    const { container } = renderUpbitTickersContainer();

    TICKERS.forEach((
      (ticker) => expect(container).toHaveTextContent(ticker)
    ));
  });

  it('listens click event', () => {
    const { getByRole } = renderUpbitTickersContainer();

    TICKERS.forEach((
      (ticker) => {
        fireEvent.click(getByRole('button', { name: ticker }));
        expect(dispatch).toBeCalledWith(toggleSelectCoin({ ticker }));
      }
    ));
  });
});
