import { renderHook, waitFor } from '@testing-library/react';

import WS from 'jest-websocket-mock';

import { useQueryClient } from '@tanstack/react-query';

import useConnectUpbit from './useConnectUpbit';

jest.mock('@tanstack/react-query');

describe('useConnectUpbit', () => {
  const setQueryData = jest.fn();

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
    renderHook(() => useConnectUpbit());

    expect(await server.connected).toBeTruthy();
  });

  it('sends request message', async () => {
    renderHook(() => useConnectUpbit());

    await server.connected;

    expect(server).toReceiveMessage('[{"ticket":"test"},{"type":"ticker","codes":["KRW-BTC"]}]');
  });

  context('when received data', () => {
    it('calls setQueryData', async () => {
      renderHook(() => useConnectUpbit());

      await server.connected;

      const data = new Blob();
      data.text = async () => '{"trade_price":31639000.0000}';

      server.send(data);

      waitFor(() => expect(setQueryData).toBeCalledWith(['upbit'], 31639000.0000));
    });
  });
});
