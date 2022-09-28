import { useDispatch, useSelector } from 'react-redux';

import TICKERS from '@fixtures/tickers';

import { renderWithClient } from '@/shared/utils/testing/react-query';

import useUpbitTickers from '../hooks/useUpbitTickers';

import KimpContainer from './KimpContainer';

jest.mock('../hooks/useConnectBybit');
jest.mock('../hooks/useConnectUpbit');
jest.mock('../hooks/useUpbitTickers');

describe('KimpContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (useSelector as jest.Mock).mockReturnValue(TICKERS.map((ticker) => ({ ticker })));

    (useUpbitTickers as jest.Mock).mockImplementation(() => ({
      isLoading: given.isLoading,
      data: TICKERS,
    }));
  });

  const renderKimpContainer = () => renderWithClient(<KimpContainer />);

  it('renders heading', () => {
    const { container } = renderKimpContainer();

    expect(container).toHaveTextContent('김프');
  });

  context('when loading', () => {
    given('isLoading', () => true);

    it('renders loading', () => {
      const { container } = renderKimpContainer();

      expect(container).toHaveTextContent('로딩 중');
    });
  });

  context('when loaded', () => {
    given('isLoading', () => false);

    it('renders tickers', () => {
      const { container } = renderKimpContainer();

      TICKERS.forEach(
        (ticker) => expect(container).toHaveTextContent(ticker),
      );
    });
  });
});
