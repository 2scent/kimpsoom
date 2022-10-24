import { useDispatch, useSelector } from 'react-redux';

import TICKERS from '@fixtures/tickers';

import { renderWithClient } from '@/shared/utils/testing/react-query';

import useExchangeRate from '@/shared/hooks/useExchangeRate';

import useConnectBybit from '../hooks/useConnectBybit';
import useConnectUpbit from '../hooks/useConnectUpbit';

import KimpList from './KimpList';

jest.mock('@/shared/hooks/useExchangeRate');
jest.mock('../hooks/useConnectBybit');
jest.mock('../hooks/useConnectUpbit');

describe('KimpList', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
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

    TICKERS.forEach(
      (ticker) => expect(container).toHaveTextContent(ticker),
    );
  });

  it('calls useConnectUpbit with tickers', () => {
    renderKimpList();

    expect(useConnectUpbit).toBeCalledWith({
      tickers: TICKERS,
    });
  });

  it('calls useConnectBybit with tickers', () => {
    renderKimpList();

    expect(useConnectBybit).toBeCalledWith(TICKERS);
  });
});
