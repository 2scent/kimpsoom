import React from 'react';

import useBybitPrice from '../hooks/useBybitPrice';
import useExchangeRate from '../hooks/useExchangeRate';
import useUpbitPrice from '../hooks/useUpbitPrice';

import calculatePremium from '../utils/calculatePremium';

function KimpItem({ ticker }) {
  const { data: koreaPrice } = useUpbitPrice({ ticker });
  const { data: foreignPrice } = useBybitPrice({ ticker });
  const { data: exchangeRate } = useExchangeRate();

  return (
    <li>
      {ticker}
      {' '}
      :
      {' '}
      {koreaPrice}
      {' '}
      원
      {' '}
      :
      {' '}
      {foreignPrice}
      {' '}
      달러
      {' '}
      :
      {' '}
      {exchangeRate}
      {' '}
      :
      {' '}
      {calculatePremium({
        koreaPrice,
        foreignPrice,
        exchangeRate,
      })}
    </li>
  );
}

export default React.memo(KimpItem);
