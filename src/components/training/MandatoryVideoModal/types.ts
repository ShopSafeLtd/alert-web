import type { PendingLoginPromptVideosQuery } from '../../../graphql/queries/__generated__/pending-login-prompt-videos.generated';

export type PendingVideo = NonNullable<
  PendingLoginPromptVideosQuery['pendingLoginPromptVideos'][0]
>;

export interface VideoCompletionStatus {
  hasWatched: boolean;
  progress: number;
  videoId: string;
}
