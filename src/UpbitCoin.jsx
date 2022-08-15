import React from 'react';

import useUpbit from './hooks/useUpbit';

function UpbitCoin({ coin }) {
  const { isLoading, data: price } = useUpbit({ code: coin.market });

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
