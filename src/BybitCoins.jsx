import useBybitCoins from './hooks/useBybitCoins';

import Bybit from './Bybit';

export default function BybitCoins() {
  const { isLoading, data: coins } = useBybitCoins();

  if (isLoading) {
    return <p>코인 로딩 중...</p>;
  }

  return (
    <Bybit
      coins={coins}
    />
  );
  // return (
  //   <ul>
  //     {data.map(
  //       (coin) => (
  //         <li
  //           key={coin.market}
  //         >
  //           {coin.market}
  //         </li>
  //       ),
  //     )}
  //   </ul>
  // );
}
