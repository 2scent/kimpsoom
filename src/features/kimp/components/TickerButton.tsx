import { Button } from '@mui/material';

interface TickerButtonProps {
  ticker: string;
  selected: boolean;
  onClick: (ticker: string) => void;
}

function TickerButton({
  ticker,
  selected,
  onClick,
}: TickerButtonProps) {
  const handleClickTicker = () => onClick(ticker);

  return (
    <Button
      fullWidth
      variant={selected ? 'contained' : 'outlined'}
      onClick={handleClickTicker}
    >
      {ticker}
    </Button>
  );
}

export default TickerButton;
