import { Button } from '@/components/ui/button';
import { FloatingHearts } from '../components/FloatingHearts';
import { DEFAULT_NAME } from '../types';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

interface StartLevelProps {
  onStart: () => void;
  onResetPersonalization: () => void;
  isLoading: boolean;
}

export function StartLevel({
  onStart,
  onResetPersonalization,
  isLoading,
}: StartLevelProps) {
  const { login, clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleAuth = async () => {
    if (identity) {
      await clear();
      queryClient.clear();
      onResetPersonalization();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <div className="game-level start-level">
      <FloatingHearts />
      <img
        src="/assets/generated/romantic-couple-illustration.dim_1200x1200.png"
        alt="Romantic illustration"
        className="romantic-illustration"
      />
      <div className="level-content">
        <h1 className="game-title glow-text">Welcome {DEFAULT_NAME} ❤️</h1>

        <div className="button-group">
          <Button
            onClick={onStart}
            size="lg"
            className="start-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              'Start the Love Game 🎮'
            )}
          </Button>

          <Button
            onClick={onResetPersonalization}
            variant="outline"
            size="sm"
            className="reset-button"
            disabled={isLoading}
          >
            Reset Personalization
          </Button>

          <Button
            onClick={handleAuth}
            variant="ghost"
            size="sm"
            className="auth-button"
            disabled={isLoading}
          >
            {identity ? 'Logout' : 'Login to Save Progress'}
          </Button>
        </div>
      </div>
    </div>
  );
}
