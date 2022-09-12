import { useDispatch } from 'react-redux';

import useWebSocket from 'react-use-websocket';

import { changeKoreaPrice } from '@/shared/store/coinsSlice';

export default function useConnectUpbit({ tickers = [] }) {
  const dispatch = useDispatch();

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

      dispatch(
        changeKoreaPrice({
          ticker: data.code.split('-')[1],
          koreaPrice: data.trade_price,
        }),
      );
    },
  });
}
