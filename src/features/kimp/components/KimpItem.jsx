import React, { useMemo } from 'react';

import StyledTableRow from '@/components/StyledTableRow';
import StyledTableCell from '@/components/StyledTableCell';

import { useExchangeRate } from '@/features/exchange-rate';

import calculatePremium from '../utils/calculatePremium';

function KimpItem({ coin: { ticker, koreaPrice, foreignPrice } }) {
  const { data: exchangeRate } = useExchangeRate();

  const differnce = useMemo(
    () => koreaPrice - (foreignPrice * exchangeRate),
    [koreaPrice, foreignPrice, exchangeRate],
  );

  const premium = useMemo(
    () => calculatePremium({ koreaPrice, foreignPrice, exchangeRate }),
    [koreaPrice, foreignPrice, exchangeRate],
  );

  return (
    <StyledTableRow>
      <StyledTableCell>{ticker}</StyledTableCell>
      <StyledTableCell align="right">
        {foreignPrice && foreignPrice.toLocaleString()}
      </StyledTableCell>
      <StyledTableCell align="right">
        {koreaPrice && koreaPrice.toLocaleString()}
      </StyledTableCell>
      <StyledTableCell align="right">
        {differnce && `${differnce.toLocaleString()}`}
        {premium && ` (${premium}%)`}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default React.memo(KimpItem);
