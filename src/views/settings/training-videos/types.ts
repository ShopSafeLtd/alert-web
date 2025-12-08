// Types for Training Videos (manual until yarn generate can run)
import { ResourceTrainingVideosQuery } from '#/views/resources/training/graphql/queries/__generated__/training-videos.generated';

export interface Tag {
  id: string;
  name: string;
}

export interface Group {
  id: string;
  name: string;
}

export type TrainingVideo =
  ResourceTrainingVideosQuery['trainingVideos'][number];

export interface CreateTrainingVideoInput {
  description?: string;
  groupIds: string[];
  schemeId: string;
  tags?: string[];
  title: string;
  videoUrl: string;
}

export interface UpdateTrainingVideoInput {
  description?: string;
  groupIds?: string[];
  id: string;
  tags?: string[];
  title?: string;
}
