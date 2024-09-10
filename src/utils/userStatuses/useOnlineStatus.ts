import { useUsersOnlineQuery } from '#/utils/userStatuses/graphql/queries/__generated__/online-status.generated';
import { useEffect } from 'react';

const useOnlineStatus = ({
  chatId,
  poll = false,
  pollInterval = 60 * 1000,
}: {
  chatId: string;
  poll?: boolean;
  pollInterval?: number;
}) => {
  if (!poll && pollInterval !== 60 * 1000) {
    console.warn('pollInterval is ignored when poll is false');
  }

  const { data, startPolling, stopPolling } = useUsersOnlineQuery({
    variables: {
      where: chatId,
    },
  });

  useEffect(() => {
    if (!poll) return;
    startPolling(pollInterval);

    const timeoutId = setTimeout(
      () => {
        stopPolling();
      },
      20 * 60 * 1000
    );

    // Clean up function to stop polling when the component unmounts or after 10 minutes
    return () => {
      clearTimeout(timeoutId); // Clear the timeout to prevent stopping polling after x minutes
      stopPolling();
    };
  }, [poll, pollInterval, startPolling, stopPolling]);

  return {
    usersOnline: data?.usersOnline || [],
  };
};

export default useOnlineStatus;
