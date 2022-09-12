import { Button } from '@mui/material';

import { FallbackProps } from 'react-error-boundary';

export default function ErrorAlert({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>{error.message}</p>
      <Button
        variant="contained"
        color="error"
        onClick={resetErrorBoundary}
      >
        다시 불러오기
      </Button>
    </div>
  );
}
