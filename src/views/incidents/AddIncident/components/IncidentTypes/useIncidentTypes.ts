import { useMemo } from 'react';
import type { ListIncidentTagsQuery, TagType } from 'graphql/generated';
import {
  Model,
  useListIncidentTagsQuery,
  useTagsQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';

interface Return {
  incidentTagsLoading: boolean;
  incidentTagsData: ListIncidentTagsQuery | undefined;
  tagsLoading: boolean;
  tags: { value: string; label: string; tooltip: string; type: TagType }[];
  oneSelectedIncidentTypeOnly: boolean;
}

const useIncidentTypes = (): Return => {
  const { id: schemeId, oneSelectedIncidentTypeOnly } = useStoreState(
    (state) => state.scheme
  );

  const { data: incidentTagsData, loading: incidentTagsLoading } =
    useListIncidentTagsQuery({
      variables: {
        where: {
          schemeId,
        },
      },
    });

  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
        dataType: {
          equals: Model.Incident,
        },
      },
    },
  });

  return {
    incidentTagsLoading,
    incidentTagsData,
    tags: useMemo(
      () =>
        tagsData?.tags.map((tag) => ({
          value: tag.id,
          label: tag.name,
          tooltip: tag.description,
          type: tag.type,
        })) || [],
      [tagsData]
    ),
    tagsLoading,
    oneSelectedIncidentTypeOnly,
  };
};

export default useIncidentTypes;
