import { useDispatch } from 'react-redux';

import useWebSocket from 'react-use-websocket';

import useThrottle from '@/shared/hooks/use-throttle';

import { changeForeignPrice } from '@/shared/store/coins-slice';

export default function useConnectBybit(tickers: string[]) {
  const dispatch = useDispatch();
  const throttle = useThrottle(500);

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
      const ticker = symbol.substring(0, symbol.length - 4);

      throttle(
        ticker,
        () => dispatch(
          changeForeignPrice({
            ticker: symbol.substring(0, symbol.length - 4),
            foreignPrice: price,
          }),
        ),
      );
    },
    filter: () => false,
  });
}
