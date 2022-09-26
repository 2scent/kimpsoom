import { useDispatch } from 'react-redux';

import useWebSocket from 'react-use-websocket';

import { Ticker } from '@/shared/models';

import { changeForeignPrice } from '@/shared/store/coinsSlice';

export interface UseConnectBybitParams { tickers: Ticker[] }

export default function useConnectBybit({ tickers = [] }: UseConnectBybitParams) {
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

      dispatch(
        changeForeignPrice({
          ticker: symbol.substring(0, symbol.length - 4),
          foreignPrice: price,
        }),
      );
    },
  });
}
