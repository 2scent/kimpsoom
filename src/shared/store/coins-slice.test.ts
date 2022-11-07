import TICKERS from '@fixtures/tickers';

import { RootState } from './index';

import reducer, {
  changeForeignPrice,
  changeKoreanPrice,
  coinsSelector,
  initCoins,
  selectCoins,
  selectedCoinsSelector,
  selectedTickersSelector,
  toggleSelectCoin,
} from './coins-slice';

describe('coinsSlice', () => {
  describe('reducer', () => {
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
      const initialState = {
        coins: [],
      };

      it('initializes coins', () => {
        const state = reducer(initialState, initCoins({ tickers: TICKERS }));

        expect(state.coins).toEqual(
          TICKERS.map((ticker) => ({
            ticker,
            koreanPrice: null,
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

        it('changes coin to unselected', () => {
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

        it('changes coin to selected', () => {
          const ticker = 'BTC';

          const state = reducer(initialState, toggleSelectCoin({ ticker }));

          const selectedTickers = state.coins
            .filter((coin) => coin.selected)
            .map((coin) => coin.ticker);

          expect(selectedTickers).not.toContain(ticker);
        });
      });
    });

    describe('changeKoreanPrice', () => {
      const initialState = {
        coins: [
          { ticker: 'BTC', koreanPrice: 0.0 },
          { ticker: 'ETH', koreanPrice: 0.0 },
          { ticker: 'XRP', koreanPrice: 0.0 },
          { ticker: 'ADA', koreanPrice: 0.0 },
        ],
      };

      it('changes korean price of coin', () => {
        const ticker = 'BTC';
        const koreanPrice = 27359000;

        const state = reducer(
          initialState,
          changeKoreanPrice({ ticker, koreanPrice }),
        );

        const btc = state.coins.find((coin) => coin.ticker === ticker)!;

        expect(btc.koreanPrice).toBe(koreanPrice);
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

      it('changes foreign price of coin', () => {
        const ticker = 'ETH';
        const foreignPrice = 1556.45;

        const state = reducer(
          initialState,
          changeForeignPrice({ ticker, foreignPrice }),
        );

        const eth = state.coins.find((coin) => coin.ticker === ticker)!;

        expect(eth.foreignPrice).toBe(foreignPrice);
      });
    });
  });

  describe('selectors', () => {
    const coins = [
      { ticker: 'BTC', foreignPrice: 0.0, selected: true },
      { ticker: 'ETH', foreignPrice: 0.0, selected: true },
      { ticker: 'XRP', foreignPrice: 0.0, selected: false },
      { ticker: 'ADA', foreignPrice: 0.0, selected: true },
    ];

    const rootState = {
      coins: {
        coins,
      },
    } as RootState;

    describe('coinsSelector', () => {
      it('returns all coins', () => {
        const allCoins = coinsSelector(rootState);

        expect(allCoins).toEqual(coins);
      });
    });

    describe('selectedCoinsSelector', () => {
      it('returns selected coins', () => {
        const selectedCoins = selectedCoinsSelector(rootState);

        expect(selectedCoins).toEqual((
          coins.filter((coin) => coin.selected)
        ));
      });
    });

    describe('selectedTickersSelector', () => {
      it('returns tickers of selected coins', () => {
        const selectedTickers = selectedTickersSelector(rootState);

        expect(selectedTickers).toEqual((
          coins
            .filter((coin) => coin.selected)
            .map((coin) => coin.ticker)
        ));
      });
    });
  });
});
