import { renderHook, waitFor } from '@testing-library/react';

import WS from 'jest-websocket-mock';

import { useDispatch } from 'react-redux';

import { changeForeignPrice } from '@/shared/store/coinsSlice';

import useConnectBybit from './useConnectBybit';

jest.mock('@tanstack/react-query');

describe('useConnectBybit', () => {
  const dispatch = jest.fn();

  const renderUseConnectBybit = ({ tickers }: { tickers: string[] }) => renderHook((
    () => useConnectBybit({ tickers })
  ));

  let server: WS;

  beforeEach(() => {
    server = new WS('wss://stream.bybit.com/realtime_public');

    (useDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    WS.clean();

    jest.clearAllMocks();
  });

  it('connects bybit with WebSocket', async () => {
    renderUseConnectBybit({ tickers: [] });

    expect(await server.connected).toBeTruthy();
  });

  it('sends request message', async () => {
    const tickers = ['BTC', 'ETH'];

    renderUseConnectBybit({ tickers });

    await server.connected;

    await waitFor(() => expect(server).toHaveReceivedMessages(
      tickers.map((ticker) => (
        JSON.stringify({
          op: 'subscribe',
          args: [`trade.${ticker}USDT`],
        })
      )),
    ));
  });

  context('when received valid data', () => {
    const symbol = 'BTCUSDT';
    const price = '24138.50';

    const message = {
      data: [
        {
          symbol,
          price,
        },
      ],
    };

    it('calls setQueryData', async () => {
      renderUseConnectBybit({ tickers: [] });

      await server.connected;

      server.send(JSON.stringify(message));

      await waitFor((
        () => expect(dispatch).toBeCalledWith(
          changeForeignPrice({
            ticker: symbol.substring(0, symbol.length - 4),
            foreignPrice: price,
          }),
        )
      ));
    });
  });

  context('when received empty data', () => {
    const message = {
      data: [],
    };

    it('does nothing', async () => {
      renderUseConnectBybit({ tickers: [] });

      await server.connected;

      server.send(JSON.stringify(message));

      await waitFor((
        () => expect(dispatch).not.toBeCalled()
      ));
    });
  });
});
