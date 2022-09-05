import React, { useMemo } from 'react';

import StyledTableRow from '@/components/StyledTableRow';
import StyledTableCell from '@/components/StyledTableCell';

import { useExchangeRate } from '@/features/exchange-rate';

import calculatePremium from '../utils/calculatePremium';

function KimpItem({ coin: { ticker, koreaPrice, foreignPrice } }) {
  const { data: exchangeRate } = useExchangeRate();

  const priceDiffernce = useMemo(
    () => {
      if (!koreaPrice || !foreignPrice || !exchangeRate) return null;
      return koreaPrice - (foreignPrice * exchangeRate);
    },
    [koreaPrice, foreignPrice, exchangeRate],
  );

  const kimchiPremium = useMemo(
    () => {
      if (!koreaPrice || !foreignPrice || !exchangeRate) return null;
      return calculatePremium({ koreaPrice, foreignPrice, exchangeRate });
    },
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
        {priceDiffernce && `${priceDiffernce.toLocaleString()}`}
        {kimchiPremium && ` (${kimchiPremium}%)`}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default React.memo(KimpItem);
