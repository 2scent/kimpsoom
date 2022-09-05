import { ExchangeRate } from '@/features/exchange-rate';
import { KimpContainer, UpbitTickers } from '@/features/kimp';

export default function App() {
  return (
    <>
      <h1>KIMPSOOM</h1>
      <ExchangeRate />
      <UpbitTickers />
      <KimpContainer />
    </>
  );
}
