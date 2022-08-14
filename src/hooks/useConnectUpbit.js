import { useQueryClient } from '@tanstack/react-query';

import useWebSocket from 'react-use-websocket';

export default function useConnectUpbit(coinCodes) {
  const queryClient = useQueryClient();

  const { sendMessage } = useWebSocket('wss://api.upbit.com/websocket/v1', {
    onOpen: () => {
      const message = [
        { ticket: 'kimpsoom' },
        {
          type: 'ticker',
          codes: coinCodes,
        },
      ];

      sendMessage(JSON.stringify(message));
    },
    onMessage: async (event) => {
      const data = JSON.parse(await event.data.text());

      queryClient.setQueryData(['upbit', data.code], data.trade_price);
    },
  });
}
