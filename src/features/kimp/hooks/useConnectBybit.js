// import { useQueryClient } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';

import useWebSocket from 'react-use-websocket';

import { setBybitPrice } from '@/store/coinSlice';

export default function useConnectBybit({ tickers = [] }) {
  // const queryClient = useQueryClient();

  const dispatch = useDispatch();

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

      // queryClient.setQueryData(
      //   ['bybit', symbol.substring(0, symbol.length - 4), 'price'],
      //   Number(price),
      // );

      dispatch(
        setBybitPrice({
          ticker: symbol.substring(0, symbol.length - 4),
          price: Number(price),
        }),
      );
    },
  });
}
