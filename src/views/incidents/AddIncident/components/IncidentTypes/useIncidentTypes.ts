import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { FormInstance } from 'antd';
import type { ListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import type { TagType } from 'graphql/types';

import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useBusinessPoliceAreaQuery } from '#/views/incidents/AddIncident/graphql/queries/__generated__/business-police-area.generated';
import { Form } from 'antd';
import { PoliceForce } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useMemo } from 'react';

interface Props {
  businessId?: string;
  form: FormInstance<FormData>;
  incidentTagsData: ListIncidentTagsQuery | undefined;
  setPoliceReporting: (value: boolean) => void;
  tagsData: TagsQuery | undefined;
}

interface Return {
  incidentTagsData: ListIncidentTagsQuery | undefined;
  incidentTypeTooltip?: null | string;
  oneSelectedIncidentTypeOnly: boolean;
  tags: { label: string; tooltip: string; type: TagType; value: string }[];
  tagsLoading: boolean;
}

const useIncidentTypes = ({
  businessId,
  form,
  incidentTagsData,
  setPoliceReporting,
  tagsData,
}: Props): Return => {
  const incidentTypeTooltip =
    useAtomValue(currentSchemeAtom)?.incidentTypeTooltip;
  const oneSelectedIncidentTypeOnly =
    useAtomValue(currentSchemeAtom)?.oneSelectedIncidentTypeOnly;

  const selectedTag = Form.useWatch('tags', form);

  const { data: businessData } = useBusinessPoliceAreaQuery({
    skip: !businessId,
    variables: {
      where: { id: businessId },
    },
  });

  useEffect(() => {
    if (selectedTag && selectedTag[0]) {
      const tag = incidentTagsData?.listIncidentTags.find(
        ({ value }) => value === selectedTag[0]
      );

      if (tag) {
        const hasNottsPoliceArea =
          businessData?.business?.policeArea?.includes(
            PoliceForce.Nottinghamshire
          ) ?? false;

        const shouldShowPoliceReporting =
          tag.policeReporting && hasNottsPoliceArea;

        setPoliceReporting(shouldShowPoliceReporting);
      }
    } else {
      setPoliceReporting(false);
    }
  }, [selectedTag, businessData, incidentTagsData, setPoliceReporting]);

  return {
    incidentTagsData,

    incidentTypeTooltip,
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
    tagsLoading: false,
  };
};

export default useIncidentTypes;
