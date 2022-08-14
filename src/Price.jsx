import React from 'react';

import useUpbit from './hooks/useUpbit';

function Price({ coin }) {
  const { isLoading, data } = useUpbit(coin.market);

  if (isLoading) {
    return <p>로딩 중</p>;
  }

  return (
    <li>
      {coin.korean_name}
      {' '}
      -
      {' '}
      {data.toLocaleString()}
    </li>
  );
}

export default React.memo(Price);
