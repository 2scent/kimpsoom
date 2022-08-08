import useUpbit from './hooks/useUpbit';
import useConnectUpbit from './hooks/useConnectUpbit';

export default function UpbitPriceContainer() {
  useConnectUpbit();

  const { isLoading, data } = useUpbit();

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
