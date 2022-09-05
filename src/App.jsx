import { Container } from '@mui/material';

import { ExchangeRate } from '@/features/exchange-rate';
import { KimpContainer, UpbitTickers } from '@/features/kimp';

export default function App() {
  return (
    <Container sx={{ mb: 10 }}>
      <h1>KIMPSOOM</h1>
      <ExchangeRate />
      <UpbitTickers />
      <KimpContainer />
    </Container>
  );
}
