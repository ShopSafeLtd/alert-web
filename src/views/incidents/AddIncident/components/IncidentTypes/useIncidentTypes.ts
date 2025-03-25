import type { FormData } from '#/views/incidents/AddIncident/useAddIncident';
import type { FormInstance } from 'antd';
import type { ListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import type { TagType } from 'graphql/types';

import {
  currentSchemeAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { Form } from 'antd';
import { useAtomValue } from 'jotai/index';
import { useEffect, useMemo } from 'react';

interface Props {
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
