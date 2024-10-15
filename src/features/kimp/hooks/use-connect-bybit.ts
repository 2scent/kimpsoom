import { useDispatch } from 'react-redux';

import useWebSocket from 'react-use-websocket';

import useThrottle from '@/shared/hooks/use-throttle';

import { changeForeignPrice } from '@/shared/store/coins-slice';

export default function useConnectBybit(tickers: string[]) {
  const dispatch = useDispatch();
  const throttle = useThrottle(500);

  const { sendMessage } = useWebSocket('wss://stream.bybit.com/v5/public/spot', {
    onOpen: () => {
      tickers.forEach((code) => {
        const message = {
          op: 'subscribe',
          args: [`publicTrade.${code}USDT`],
        };

        sendMessage(JSON.stringify(message));
      });
    },
    onMessage: async (event) => {
      const { data } = JSON.parse(event.data);

      if (!data?.length) return;

      const { s, p } = data[data.length - 1];
      const ticker = s.substring(0, s.length - 4);

      throttle(
        ticker,
        () => dispatch(
          changeForeignPrice({
            ticker: s.substring(0, s.length - 4),
            foreignPrice: p,
          }),
        ),
      );
    },
    filter: () => false,
  });
}
