import React from 'react';

import useBybitPrice from './hooks/useBybitPrice';

function BybitCoin({ coin }) {
  const { isLoading, data: price } = useBybitPrice({ code: coin.name });

  return (
    <li>
      {coin.name}
      :
      {' '}
      {!isLoading && price}
    </li>
  );
}

export default React.memo(BybitCoin);
