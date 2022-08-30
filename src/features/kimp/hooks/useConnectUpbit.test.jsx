import { renderHook, waitFor } from '@testing-library/react';

import WS from 'jest-websocket-mock';

import { useQueryClient } from '@tanstack/react-query';

import useConnectUpbit from './useConnectUpbit';

jest.mock('@tanstack/react-query');

describe('useConnectUpbit', () => {
  const setQueryData = jest.fn();

  const renderUseConnectUpbit = ({ tickers }) => renderHook((
    () => useConnectUpbit({ tickers })
  ));

  let server;

  beforeEach(() => {
    server = new WS('wss://api.upbit.com/websocket/v1');

    useQueryClient.mockReturnValue({
      setQueryData,
    });
  });

  afterEach(() => {
    WS.clean();

    jest.clearAllMocks();
  });

  it('connects upbit with WebSocket', async () => {
    renderUseConnectUpbit({});

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

    renderUseConnectUpbit({ tickers });

    await server.connected;

    expect(server).toReceiveMessage(JSON.stringify(message));
  });

  context('when received data', () => {
    const message = {
      code: 'KRW-BTC',
      trade_price: 31639000.0000,
    };

    it('calls setQueryData', async () => {
      renderUseConnectUpbit({});

      await server.connected;

      const data = new Blob();
      data.text = async () => JSON.stringify(message);

      server.send(data);

      await waitFor((
        () => expect(setQueryData).toBeCalledWith(
          ['upbit', message.code.split('-')[1], 'price'],
          message.trade_price,
        )
      ));
    });
  });
});