import React, { useMemo } from 'react';

import StyledTableRow from '@/shared/components/StyledTableRow';
import StyledTableCell from '@/shared/components/StyledTableCell';

import useExchangeRate from '@/shared/hooks/useExchangeRate';

import calculatePremium from '../utils/calculatePremium';

interface KimpItemProps {
  coin: {
    ticker: string;
    koreanPrice?: number;
    foreignPrice?: number;
  };
}

function KimpItem({ coin: { ticker, koreanPrice, foreignPrice } }: KimpItemProps) {
  const { data: exchangeRate } = useExchangeRate();

  const priceDiffernce = useMemo(
    () => {
      if (!koreanPrice || !foreignPrice || !exchangeRate) return null;
      return koreanPrice - (foreignPrice * exchangeRate);
    },
    [koreanPrice, foreignPrice, exchangeRate],
  );

  const kimchiPremium = useMemo(
    () => {
      if (!koreanPrice || !foreignPrice || !exchangeRate) return null;
      return calculatePremium({ koreanPrice, foreignPrice, exchangeRate });
    },
    [koreanPrice, foreignPrice, exchangeRate],
  );

  return (
    <StyledTableRow>
      <StyledTableCell>{ticker}</StyledTableCell>
      <StyledTableCell align="right">
        {foreignPrice && foreignPrice.toLocaleString()}
      </StyledTableCell>
      <StyledTableCell align="right">
        {koreanPrice && koreanPrice.toLocaleString()}
      </StyledTableCell>
      <StyledTableCell align="right">
        {priceDiffernce && `${priceDiffernce.toLocaleString()}`}
        {kimchiPremium && ` (${kimchiPremium}%)`}
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default React.memo(KimpItem);
