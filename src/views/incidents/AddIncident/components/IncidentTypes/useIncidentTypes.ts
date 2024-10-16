import type { FormData } from '#/views/incidents/AddIncident/useAddIncident';
import type { FormInstance } from 'antd';
import type { ListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
import type { TagType } from 'graphql/types';

import { useAddIncidentTagsQuery } from '#/views/incidents/AddIncident/components/IncidentTypes/__generated__/add-incident-incident-tags.generated';
import { useAddIncidentIncidentTagsQuery } from '#/views/incidents/AddIncident/components/IncidentTypes/__generated__/add-incident-tags.generated';
import { Form } from 'antd';
import { Model } from 'graphql/types';
import { useEffect, useMemo } from 'react';
import { useStoreState } from 'state';

interface Props {
  form: FormInstance<FormData>;
  setPoliceReporting: (value: boolean) => void;
}

interface Return {
  incidentTagsData: ListIncidentTagsQuery | undefined;
  incidentTagsLoading: boolean;
  oneSelectedIncidentTypeOnly: boolean;
  tags: { label: string; tooltip: string; type: TagType; value: string }[];
  tagsLoading: boolean;
}

const useIncidentTypes = ({ form, setPoliceReporting }: Props): Return => {
  const { id: schemeId, oneSelectedIncidentTypeOnly } = useStoreState(
    (state) => state.scheme
  );

  const selectedTag = Form.useWatch('tags', form);

  const { data: incidentTagsData, loading: incidentTagsLoading } =
    useAddIncidentIncidentTagsQuery({
      variables: {
        where: {
          schemeId,
        },
      },
    });

  const { data: tagsData, loading: tagsLoading } = useAddIncidentTagsQuery({
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

  useEffect(() => {
    if (selectedTag && selectedTag[0]) {
      const tag = incidentTagsData?.listIncidentTags.find(
        ({ value }) => value === selectedTag[0]
      );
      if (tag) setPoliceReporting(tag.policeReporting);
    }
  }, [selectedTag]);

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
