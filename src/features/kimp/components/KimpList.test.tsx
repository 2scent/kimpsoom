import { useDispatch, useSelector } from 'react-redux';

import TICKERS from '@fixtures/tickers';

import { renderWithClient } from '@/shared/utils/testing/react-query';

import useExchangeRate from '@/shared/hooks/use-exchange-rate';

import { initCoins, selectCoins } from '@/shared/store/coins-slice';

import useConnectBybit from '../hooks/use-connect-bybit';
import useConnectUpbit from '../hooks/use-connect-upbit';

import KimpList, { defaultSelectedTickers } from './KimpList';

jest.mock('@/shared/hooks/use-exchange-rate');
jest.mock('../hooks/use-connect-bybit');
jest.mock('../hooks/use-connect-upbit');

describe('KimpList', () => {
  const dispatch = jest.fn();

  beforeAll(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useSelector as jest.Mock).mockReturnValue(TICKERS.map((ticker) => ({ ticker })));

    (useExchangeRate as jest.Mock).mockReturnValue({ data: 1380.0 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderKimpList = () => renderWithClient((
    <KimpList
      tickers={TICKERS}
    />
  ));

  it('renders tickers', () => {
    const { container } = renderKimpList();

    TICKERS.forEach((
      (ticker) => expect(container).toHaveTextContent(ticker)
    ));
  });

  it('dispatches initCoins with tickers', () => {
    renderKimpList();

    expect(dispatch).toBeCalledWith(initCoins({ tickers: TICKERS }));
  });

  it('dispatches selectCoins with defaultSelectedTickers', () => {
    renderKimpList();

    expect(dispatch).toBeCalledWith(selectCoins({ tickers: defaultSelectedTickers }));
  });

  it('calls useConnectUpbit with tickers', () => {
    renderKimpList();

    expect(useConnectUpbit).toBeCalledWith(TICKERS);
  });

  it('calls useConnectBybit with tickers', () => {
    renderKimpList();

    expect(useConnectBybit).toBeCalledWith(TICKERS);
  });
});
