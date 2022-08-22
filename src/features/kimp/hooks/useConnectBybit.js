import { useQueryClient } from '@tanstack/react-query';

import useWebSocket from 'react-use-websocket';

export default function useConnectBybit({ tickers = [] }) {
  const queryClient = useQueryClient();

  const { sendMessage } = useWebSocket('wss://stream.bybit.com/realtime_public', {
    onOpen: () => {
      tickers.forEach((code) => {
        const message = {
          op: 'subscribe',
          args: [`trade.${code}USDT`],
        };

        sendMessage(JSON.stringify(message));
      });
    },
    onMessage: async (event) => {
      const { data } = JSON.parse(event.data);

      if (!data?.length) return;

      const { symbol, price } = data[data.length - 1];

      queryClient.setQueryData(
        ['bybit', symbol.substring(0, symbol.length - 4), 'price'],
        Number(price),
      );
    },
  });
}
