import { renderHook, waitFor } from '@testing-library/react';

import WS from 'jest-websocket-mock';

import { useDispatch } from 'react-redux';

import { changeKoreaPrice } from '@/shared/store/coinsSlice';

import useConnectUpbit from './useConnectUpbit';

jest.mock('@tanstack/react-query');

describe('useConnectUpbit', () => {
  const dispatch = jest.fn();

  let server: WS;

  beforeEach(() => {
    server = new WS('wss://api.upbit.com/websocket/v1');

    (useDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  afterEach(() => {
    WS.clean();

    jest.clearAllMocks();
  });

  const renderUseConnectUpbit = (tickers: string[]) => renderHook((
    () => useConnectUpbit(tickers)
  ));

  it('connects upbit with WebSocket', async () => {
    renderUseConnectUpbit([]);

    expect(await server.connected).toBeTruthy();
  });

  it('sends request message', async () => {
    const tickers = ['BTC', 'ETH'];
    const message = [
      { ticket: 'kimpsoom' },
      {
        type: 'ticker',
        codes: tickers.map((ticker) => `KRW-${ticker}`),
      },
    ];

    renderUseConnectUpbit(tickers);

    await server.connected;

    expect(server).toReceiveMessage(JSON.stringify(message));
  });

  context('when received data', () => {
    const message = {
      code: 'KRW-BTC',
      trade_price: 31639000.0000,
    };

    it('calls setQueryData', async () => {
      renderUseConnectUpbit([]);

      await server.connected;

      const data = new Blob();
      data.text = async () => JSON.stringify(message);

      server.send(data);

      await waitFor((
        () => expect(dispatch).toBeCalledWith(
          changeKoreaPrice({
            ticker: message.code.split('-')[1],
            koreaPrice: message.trade_price,
          }),
        )
      ));
    });
  });
});
