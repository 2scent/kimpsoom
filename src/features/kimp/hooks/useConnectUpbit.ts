import { useDispatch } from 'react-redux';

import useWebSocket from 'react-use-websocket';

import useThrottle from '@/shared/hooks/useThrottle';

import { changeKoreaPrice } from '@/shared/store/coinsSlice';

export interface UseConnectUpbitParams {
  tickers: string[];
}

export default function useConnectUpbit({ tickers = [] }: UseConnectUpbitParams) {
  const dispatch = useDispatch();
  const throttle = useThrottle(500);

  const { sendMessage } = useWebSocket('wss://api.upbit.com/websocket/v1', {
    onOpen: () => {
      const message = [
        { ticket: 'kimpsoom' },
        {
          type: 'ticker',
          codes: tickers.map((ticker) => `KRW-${ticker}`),
        },
      ];

      sendMessage(JSON.stringify(message));
    },
    onMessage: async (event) => {
      const data = JSON.parse(await event.data.text());

      const ticker = data.code.split('-')[1] as string;

      throttle(
        ticker,
        () => dispatch(
          changeKoreaPrice({
            ticker,
            koreaPrice: data.trade_price,
          }),
        ),
      );
    },
    filter: () => false,
  });
}
