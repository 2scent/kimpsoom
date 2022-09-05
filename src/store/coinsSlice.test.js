import TICKERS from '@fixtures/tickers';

import reducer, {
  changeForeignPrice,
  changeKoreaPrice,
  initCoins,
  selectCoins,
  toggleSelectCoin,
} from './coinsSlice';

describe('coinsSlice', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      coins: [],
    };

    it('returns the initial state', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('initCoins', () => {
    const initialState = {};

    it('initializes coins', () => {
      const state = reducer(initialState, initCoins({ tickers: TICKERS }));

      expect(state.coins).toEqual(
        TICKERS.map((ticker) => ({
          ticker,
          koreaPrice: null,
          foreignPrice: null,
          selected: false,
        })),
      );
    });
  });

  describe('selectCoins', () => {
    const initialState = {
      coins: [
        { ticker: 'BTC', selected: false },
        { ticker: 'ETH', selected: false },
        { ticker: 'XRP', selected: false },
        { ticker: 'ADA', selected: false },
      ],
    };

    it('changes coins to selected', () => {
      const tickers = ['BTC', 'XRP'];

      const state = reducer(initialState, selectCoins({ tickers }));

      const selectedTickers = state.coins
        .filter((coin) => coin.selected)
        .map((coin) => coin.ticker);

      expect(selectedTickers).toEqual(tickers);
    });
  });

  describe('toggleSelectCoin', () => {
    context('with selected coins', () => {
      const initialState = {
        coins: [
          { ticker: 'BTC', selected: false },
          { ticker: 'ETH', selected: false },
          { ticker: 'XRP', selected: false },
          { ticker: 'ADA', selected: false },
        ],
      };

      it('changes coins to unselected', () => {
        const ticker = 'BTC';

        const state = reducer(initialState, toggleSelectCoin({ ticker }));

        const selectedTickers = state.coins
          .filter((coin) => coin.selected)
          .map((coin) => coin.ticker);

        expect(selectedTickers).toContain(ticker);
      });
    });

    context('with unselected coins', () => {
      const initialState = {
        coins: [
          { ticker: 'BTC', selected: true },
          { ticker: 'ETH', selected: true },
          { ticker: 'XRP', selected: true },
          { ticker: 'ADA', selected: true },
        ],
      };

      it('changes coins to selected', () => {
        const ticker = 'BTC';

        const state = reducer(initialState, toggleSelectCoin({ ticker }));

        const selectedTickers = state.coins
          .filter((coin) => coin.selected)
          .map((coin) => coin.ticker);

        expect(selectedTickers).not.toContain(ticker);
      });
    });
  });

  describe('changeKoreaPrice', () => {
    const initialState = {
      coins: [
        { ticker: 'BTC', koreaPrice: 0.0 },
        { ticker: 'ETH', koreaPrice: 0.0 },
        { ticker: 'XRP', koreaPrice: 0.0 },
        { ticker: 'ADA', koreaPrice: 0.0 },
      ],
    };

    it('changes korea price', () => {
      const ticker = 'BTC';
      const koreaPrice = 27359000;

      const state = reducer(
        initialState,
        changeKoreaPrice({ ticker, koreaPrice }),
      );

      const btc = state.coins.find((coin) => coin.ticker === ticker);

      expect(btc.koreaPrice).toBe(koreaPrice);
    });
  });

  describe('changeForeignPrice', () => {
    const initialState = {
      coins: [
        { ticker: 'BTC', foreignPrice: 0.0 },
        { ticker: 'ETH', foreignPrice: 0.0 },
        { ticker: 'XRP', foreignPrice: 0.0 },
        { ticker: 'ADA', foreignPrice: 0.0 },
      ],
    };

    it('changes foreign price', () => {
      const ticker = 'ETH';
      const foreignPrice = 1556.45;

      const state = reducer(
        initialState,
        changeForeignPrice({ ticker, foreignPrice }),
      );

      const eth = state.coins.find((coin) => coin.ticker === ticker);

      expect(eth.foreignPrice).toBe(foreignPrice);
    });
  });
});
