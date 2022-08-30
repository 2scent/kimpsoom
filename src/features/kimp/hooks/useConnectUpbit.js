import { setCoin } from '@/store/coinSlice';
// import { useQueryClient } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';

import useWebSocket from 'react-use-websocket';

export default function useConnectUpbit({ tickers = [] }) {
  // const queryClient = useQueryClient();

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

      // queryClient.setQueryData(
      //   ['upbit', data.code.split('-')[1], 'price'],
      //   data.trade_price,
      // );
      dispatch(
        setCoin({
          ticker: data.code.split('-')[1],
          name: 'upbit',
          value: data.trade_price,
        }),
      );
    },
  });
}
