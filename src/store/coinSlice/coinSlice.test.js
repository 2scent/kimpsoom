import reducer, { toggleSelectTicker } from './coinSlice';

describe('coinSlice', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      selectedTickers: [
        'BTC',
        'ETH',
        'BCH',
        'DOT',
        'LINK',
        'ADA',
        'XRP',
        'XLM',
        'TRX',
      ],
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('toggleSelectTicker', () => {
    context('when ticker is not selected', () => {
      it('adds ticker', () => {
        const initialState = {
          selectedTickers: [],
        };

        const state = reducer(
          initialState,
          toggleSelectTicker('BTC'),
        );

        expect(state.selectedTickers).toContain('BTC');
      });
    });

    context('when ticker is selected', () => {
      it('removes ticker', () => {
        const initialState = {
          selectedTickers: ['BTC', 'ETH'],
        };

        const state = reducer(
          initialState,
          toggleSelectTicker('BTC'),
        );

        expect(state.selectedTickers).not.toContain('BTC');
        expect(state.selectedTickers).toContain('ETH');
      });
    });
  });
});
