// Types for Training Videos (manual until yarn generate can run)
export interface Tag {
  id: string;
  name: string;
}

export interface Group {
  id: string;
  name: string;
}

export interface TrainingVideo {
  createdAt: string;
  description?: string;
  groups: Group[];
  id: string;
  tags: Tag[];
  thumbnailStatus?: string;
  thumbnailUrl?: string;
  title: string;
  updatedAt: string;
  videoUrl: string;
  viewCount: number;
}

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
