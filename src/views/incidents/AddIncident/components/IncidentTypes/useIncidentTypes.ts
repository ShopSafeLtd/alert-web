import { useMemo } from 'react';
import { useStoreState } from 'state';
import type { ListIncidentTagsQuery } from 'graphql/tags/queries/list-incident-tags.generated';
import { useListIncidentTagsQuery } from 'graphql/tags/queries/list-incident-tags.generated';
import { useTagsQuery } from 'graphql/tags/queries/tags.generated';
import type { TagType } from 'graphql/types';
import { Model } from 'graphql/types';

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
