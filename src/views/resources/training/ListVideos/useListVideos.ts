import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { notification } from 'antd';
import { useAtomValue } from 'jotai/index';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { ResourceTrainingVideosQuery } from '../graphql/queries/__generated__/training-videos.generated';

import { useResourceTrainingVideosQuery } from '../graphql/queries/__generated__/training-videos.generated';

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
export type SortOption = 'az' | 'mostViewed' | 'newest' | 'za';

interface UseListVideosReturn {
  availableTags: Tag[];
  handleClosePlayer: () => void;
  handleOpenPlayer: (video: TrainingVideo) => void;
  handleSearch: (value: string) => void;
  handleSort: (option: SortOption) => void;
  handleTagFilter: (tags: string[]) => void;
  loading: boolean;
  playerModalOpen: boolean;
  searchTerm: string;
  selectedTags: string[];
  selectedVideo: TrainingVideo | null;
  sortBy: SortOption;
  videos: TrainingVideo[];
}

const useListVideos = (): UseListVideosReturn => {
  const currentScheme = useAtomValue(currentSchemeAtom);
  const currentUser = useAtomValue(currentUserAtom);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<TrainingVideo | null>(
    null
  );

  // Get user's group IDs for filtering
  const userGroupIds = useMemo(
    () => currentUser?.groups?.map((g: { id: string }) => g.id) || [],
    [currentUser]
  );

  const { data, loading } = useResourceTrainingVideosQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentScheme?.id,
    variables: {
      schemeId: currentScheme?.id || '',
    },
  });

  // Filter videos by user's groups on the client side
  const groupFilteredVideos = useMemo(() => {
    const videos = data?.trainingVideos || [];

    // If user has no groups, show all videos
    if (userGroupIds.length === 0) {
      return videos;
    }

    // Filter videos where user is in at least one of the video's groups
    return videos.filter((video) => {
      // If video has no groups, show it to all users (no restrictions)
      if (!video.groups || video.groups.length === 0) {
        return true;
      }

      // Check if user is in any of the video's groups
      return video.groups.some((group) => userGroupIds.includes(group.id));
    });
  }, [data?.trainingVideos, userGroupIds]);

  // Get all available tags from videos (from group-filtered videos)
  const availableTags = useMemo(() => {
    const tagMap = new Map<string, Tag>();
    if (groupFilteredVideos)
      for (const video of groupFilteredVideos) {
        if (video.tags)
          for (const tag of video.tags) {
            if (!tagMap.has(tag.id)) {
              tagMap.set(tag.id, tag);
            }
          }
      }
    return [...tagMap.values()];
  }, [groupFilteredVideos]);

  // Filter, search, and sort videos
  const filteredAndSortedVideos = useMemo(() => {
    let result = groupFilteredVideos || [];

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (video) =>
          video.title?.toLowerCase().includes(lowerSearch) ||
          video.description?.toLowerCase().includes(lowerSearch)
      );
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      result = result.filter((video) =>
        video.tags?.some((tag) => selectedTags.includes(tag.id))
      );
    }

    // Apply sorting
    const sorted = [...result];
    switch (sortBy) {
      case 'newest': {
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      }
      case 'mostViewed': {
        sorted.sort((a, b) => b.viewCount - a.viewCount);
        break;
      }
      case 'az': {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      }
      case 'za': {
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      }
      default: {
        break;
      }
    }

    return sorted;
  }, [groupFilteredVideos, searchTerm, selectedTags, sortBy]);

  // Handle direct video linking via URL parameter
  useEffect(() => {
    const videoId = searchParams.get('videoId');
    if (videoId && !loading && filteredAndSortedVideos.length > 0) {
      const video = filteredAndSortedVideos.find((v) => v.id === videoId);
      if (video) {
        setSelectedVideo(video);
        setPlayerModalOpen(true);
        // Clean up URL parameter after opening
        setSearchParams({});
      } else {
        notification.error({
          description:
            'The requested video could not be found or you do not have access to it.',
          message: 'Video not found',
          placement: 'bottomRight',
        });
        setSearchParams({});
      }
    }
  }, [searchParams, loading, filteredAndSortedVideos, setSearchParams]);

  const handleSearch = (value: string): void => {
    setSearchTerm(value);
  };

  const handleTagFilter = (tags: string[]): void => {
    setSelectedTags(tags);
  };

  const handleSort = (option: SortOption): void => {
    setSortBy(option);
  };

  const handleOpenPlayer = (video: TrainingVideo): void => {
    setSelectedVideo(video);
    setPlayerModalOpen(true);
  };

  const handleClosePlayer = (): void => {
    setSelectedVideo(null);
    setPlayerModalOpen(false);
  };

  return {
    availableTags,
    handleClosePlayer,
    handleOpenPlayer,
    handleSearch,
    handleSort,
    handleTagFilter,
    loading,
    playerModalOpen,
    searchTerm,
    selectedTags,
    selectedVideo,
    sortBy,
    videos: filteredAndSortedVideos,
  };
};

export default useListVideos;
