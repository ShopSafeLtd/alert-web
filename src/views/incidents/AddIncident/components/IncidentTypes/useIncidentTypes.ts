import type { ListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
import type { TagType } from 'graphql/types';

import { useListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { Model } from 'graphql/types';
import { useMemo } from 'react';
import { useStoreState } from 'state';

interface Return {
  incidentTagsData: ListIncidentTagsQuery | undefined;
  incidentTagsLoading: boolean;
  oneSelectedIncidentTypeOnly: boolean;
  tags: { label: string; tooltip: string; type: TagType; value: string }[];
  tagsLoading: boolean;
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
        dataType: {
          equals: Model.Incident,
        },
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });

  return {
    incidentTagsData,
    incidentTagsLoading,
    oneSelectedIncidentTypeOnly,
    tags: useMemo(
      () =>
        tagsData?.tags.map((tag) => ({
          label: tag.name,
          tooltip: tag.description,
          type: tag.type,
          value: tag.id,
        })) || [],
      [tagsData]
    ),
    tagsLoading,
  };
};

export default useIncidentTypes;
