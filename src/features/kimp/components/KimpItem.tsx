import React, { useMemo } from 'react';

import StyledTableRow from '@/shared/components/StyledTableRow';
import StyledTableCell from '@/shared/components/StyledTableCell';

import useExchangeRate from '@/shared/hooks/useExchangeRate';

import calculatePremium from '../utils/calculatePremium';

type KimpItemProps = {
  coin: {
    ticker: string;
    koreaPrice?: number;
    foreignPrice?: number;
  };
}

function KimpItem({ coin: { ticker, koreaPrice, foreignPrice } }: KimpItemProps) {
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
