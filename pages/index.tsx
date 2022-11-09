import { Container } from '@mui/material';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import fetchExchangeRate from '@/shared/api/fetch-exchange-rate';

import { ExchangeRateContainer } from '@/features/exchange-rate';
import { fetchUpbitTickers, KimpContainer, UpbitTickersContainer } from '@/features/kimp';

export default function HomePage() {
  return (
    <Container sx={{ mb: 10 }}>
      <h1>KIMPSOOM</h1>
      <ExchangeRateContainer />
      <UpbitTickersContainer />
      <KimpContainer />
    </Container>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(['exchangeRate'], fetchExchangeRate),
    queryClient.prefetchQuery(['upbit', 'tickers'], fetchUpbitTickers),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
