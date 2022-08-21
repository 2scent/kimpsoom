import React from 'react';

import useUpbitPrice from '../hooks/useUpbitPrice';

function UpbitCoin({ coin }) {
  const { isLoading, data: price } = useUpbitPrice({ code: coin.market });

  return (
    <li>
      {coin.market}
      :
      {' '}
      {!isLoading && price.toLocaleString()}
    </li>
  );
}

export default React.memo(UpbitCoin);
