import { useQuery, useQueryClient } from '@tanstack/react-query';

import useWebSocket from 'react-use-websocket';

export default function UpbitPriceContainer() {
  const queryClient = useQueryClient();

  const { sendMessage } = useWebSocket('wss://api.upbit.com/websocket/v1', {
    onOpen: () => {
      sendMessage('[{"ticket":"test"},{"type":"ticker","codes":["KRW-BTC"]}]');
    },
    onMessage: async (event) => {
      const data = JSON.parse(await event.data.text());

      queryClient.setQueryData(['upbit'], data.trade_price);
    },
  });

  const { isLoading, data } = useQuery(['upbit']);

  if (isLoading) {
    return <p>로딩 중</p>;
  }

  return (
    <p>
      업비트 BTC:
      {' '}
      {data.toLocaleString()}
    </p>
  );
}
