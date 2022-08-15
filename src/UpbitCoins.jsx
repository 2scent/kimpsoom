import useUpbitCoins from './hooks/useUpbitCoins';
import UpbitPriceContainer from './UpbitPriceContainer';

export default function UpbitCoins() {
  const { isLoading, data: coins } = useUpbitCoins();

  if (isLoading) {
    return <p>코인 로딩 중...</p>;
  }

  return (
    <UpbitPriceContainer
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
