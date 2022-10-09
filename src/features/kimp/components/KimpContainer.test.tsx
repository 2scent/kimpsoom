import { useDispatch, useSelector } from 'react-redux';

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

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useSelector as jest.Mock).mockReturnValue(TICKERS.map((ticker) => ({ ticker })));

    (useExchangeRate as jest.Mock).mockReturnValue({ data: 1380.0 });
    (useUpbitTickers as jest.Mock).mockReturnValue({ data: TICKERS });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderKimpContainer = () => renderWithClient(<KimpContainer />);

  it('renders heading', () => {
    const { container } = renderKimpContainer();

    expect(container).toHaveTextContent('김프');
  });

  it('renders tickers', () => {
    const { container } = renderKimpContainer();

    TICKERS.forEach(
      (ticker) => expect(container).toHaveTextContent(ticker),
    );
  });
});
