import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

interface UserProgress {
  name: string;
  dedication: string;
  gameCompleted: boolean;
}

export function useGetUserProgress() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<UserProgress | null>({
    queryKey: ['userProgress'],
    queryFn: async () => {
      if (!actor || !identity) return null;
      try {
        const [name, dedication, gameCompleted] = await actor.getUserProgress();
        return { name, dedication, gameCompleted };
      } catch (error) {
        console.error('Failed to fetch user progress:', error);
        return null;
      }
    },
    enabled: !!actor && !!identity && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveUserProgress() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (progress: UserProgress) => {
      if (!actor || !identity) {
        throw new Error('Not authenticated');
      }
      await actor.saveUserProgress(progress.name, progress.dedication, progress.gameCompleted);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
    },
    onError: (error) => {
      console.error('Failed to save user progress:', error);
    },
  });
}
