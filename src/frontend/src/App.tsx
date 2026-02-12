import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoveGame } from './game/LoveGame';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen w-full overflow-hidden">
        <LoveGame />
      </div>
    </QueryClientProvider>
  );
}
