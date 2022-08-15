import React from 'react';

import useBybit from './hooks/useBybit';

function BybitPrice({ coin }) {
  const { isLoading, data } = useBybit(coin.name);

  return (
    <li>
      {coin.name}
      {' '}
      -
      {' '}
      {isLoading ? '로딩 중' : data}
    </li>
  );
}

export default React.memo(BybitPrice);
