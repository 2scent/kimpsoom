import { useQueryClient } from '@tanstack/react-query';

import useWebSocket from 'react-use-websocket';

export default function useConnectBybit({ codes = [] }) {
  const queryClient = useQueryClient();

  const { sendMessage } = useWebSocket('wss://stream.bybit.com/realtime_public', {
    onOpen: () => {
      codes.forEach((code) => {
        const message = {
          op: 'subscribe',
          args: [`trade.${code}`],
        };

        sendMessage(JSON.stringify(message));
      });
    },
    onMessage: async (event) => {
      const { data } = JSON.parse(event.data);

      if (!data?.length) return;

      const lastTrade = data[data.length - 1];

      queryClient.setQueryData(['bybit', lastTrade.symbol], lastTrade.price);
    },
  });
}
