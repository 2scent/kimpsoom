import { renderHook, waitFor } from '@testing-library/react';

import WS from 'jest-websocket-mock';

import { useQueryClient } from '@tanstack/react-query';

import useConnectBybit from './useConnectBybit';

jest.mock('@tanstack/react-query');

describe('useConnectBybit', () => {
  const setQueryData = jest.fn();

  const renderUseConnectBybit = ({ codes }) => renderHook((
    () => useConnectBybit({ codes })
  ));

  let server;

  beforeEach(() => {
    server = new WS('wss://stream.bybit.com/realtime_public');

    useQueryClient.mockReturnValue({
      setQueryData,
    });
  });

  afterEach(() => {
    WS.clean();

    jest.clearAllMocks();
  });

  it('connects bybit with WebSocket', async () => {
    renderUseConnectBybit({});

    expect(await server.connected).toBeTruthy();
  });

  it('sends request message', async () => {
    const codes = ['BTCUSDT', 'ETHUSDT'];

    renderUseConnectBybit({ codes });

    await server.connected;

    await waitFor(() => expect(server).toHaveReceivedMessages(
      codes.map((code) => (
        JSON.stringify({
          op: 'subscribe',
          args: [`trade.${code}`],
        })
      )),
    ));
  });

  context('when received data', () => {
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
      renderUseConnectBybit({});

      await server.connected;

      server.send(JSON.stringify(message));

      await waitFor((
        () => expect(setQueryData).toBeCalledWith(
          ['bybit', symbol],
          price,
        )
      ));
    });
  });
});
