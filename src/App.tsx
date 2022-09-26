import { Container } from '@mui/material';

import { ExchangeRateContainer } from '@/features/exchange-rate';
import { KimpContainer, UpbitTickersContainer } from '@/features/kimp';

export default function App() {
  return (
    <Container sx={{ mb: 10 }}>
      <h1>KIMPSOOM</h1>
      <ExchangeRateContainer />
      <UpbitTickersContainer />
      <KimpContainer />
    </Container>
  );
}
