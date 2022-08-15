import { useQueryClient } from '@tanstack/react-query';

import useWebSocket from 'react-use-websocket';

export default function useConnectBybit(coinCodes = ['BTCUSDT']) {
  const queryClient = useQueryClient();

  const { sendMessage } = useWebSocket('wss://stream.bybit.com/realtime_public', {
    onOpen: () => {
      // console.log(coinCodes);
      // const message = {
      //   op: 'subscribe',
      //   args: coinCodes.slice(0, 117).map((code) => `trade.${code}`),
      // };

      // sendMessage(JSON.stringify(message));

      coinCodes.forEach((coin) => {
        const message = {
          op: 'subscribe',
          args: [`trade.${coin}`],
        };

        sendMessage(JSON.stringify(message));
      });
    },
    onMessage: (event) => {
      // console.log(JSON.parse(event.data));
      const data = JSON.parse(event.data);

      console.log(data);

      if (!data.data) return;

      const lastTrade = data.data[data.data.length - 1];

      queryClient.setQueryData(['bybit', lastTrade.symbol], lastTrade.price);
    },
  });
}
