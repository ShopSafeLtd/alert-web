import type { TagQuery } from 'graphql/tag/queries/__generated__/tag.generated';
import type { CrimeType } from 'graphql/types';

import { notification } from 'antd';
import { useUpdateTagMutation } from 'graphql/tag/mutation/__generated__/update_tag.generated';
import { useTagQuery } from 'graphql/tag/queries/__generated__/tag.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

import { useGenerateIncidentTypeDescriptionMutation } from '../AddCrimeType/graphql/mutations/__generated__/generateIncidentTypeDescription.generated';

interface FormData {
  crimeType: CrimeType;
  description: string;
  name: string;
  roles: string[];
}
interface Props {
  incidentId: string | undefined;
  onClose: () => void;
}
interface Return {
  data: TagQuery | undefined;
  generatingDescription: boolean;
  loading: boolean;
  onGenerateDescription: (
    name: string,
    currentDescription?: string
  ) => Promise<null | string>;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useEditCrimeType = ({ incidentId, onClose }: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const [generatingDescription, setGeneratingDescription] = useState(false);

  const { data: TagData, loading } = useTagQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        id: incidentId,
      },
    },
  });

  const [updateTag] = useUpdateTagMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The crime type has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);

    const rolesChangedFunction = () => {
      const roles = TagData?.tag?.roles?.map((role) => role.id) || [];
      const hasChanged = data.roles.sort().join(',') !== roles.sort().join(',');
      if (hasChanged) {
        const newRoles = data.roles
          .map((role) => ({
            id: role,
          }))
          .filter((role) => !roles.includes(role.id));
        const rolesToBeRemoved = roles
          .filter((role) => !data.roles.includes(role))
          .map((role) => ({
            id: role,
          }));

        return {
          connect: newRoles.length > 0 ? newRoles : undefined,
          disconnect:
            rolesToBeRemoved.length > 0 ? rolesToBeRemoved : undefined,
        };
      }
    };

    const rolesChanged = rolesChangedFunction();

    if (incidentId)
      void updateTag({
        variables: {
          data: {
            crimeType: data.crimeType ? { set: data.crimeType } : undefined,
            description: { set: data.description },
            name: { set: data.name },
            roles: rolesChanged ?? undefined,
          },
          where: {
            id: incidentId,
          },
        },
      });
  };

  const [generateDescription] = useGenerateIncidentTypeDescriptionMutation();

  const onGenerateDescription = async (
    name: string,
    currentDescription?: string
  ): Promise<null | string> => {
    setGeneratingDescription(true);

    try {
      const result = await generateDescription({
        variables: {
          incidentTypeName: name,
          userDescription: currentDescription || undefined,
        },
      });

      setGeneratingDescription(false);

      if (result.data?.generateIncidentTypeDescription) {
        return result.data.generateIncidentTypeDescription;
      }
    } catch {
      setGeneratingDescription(false);
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Failed to generate description. Please try again.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Generation Failed',
        }),
        placement: 'bottomRight',
      });
    }

    return null;
  };

  return {
    data: TagData,
    generatingDescription,
    loading,
    onGenerateDescription,
    onSubmit,
    saving,
  };
};

export default useEditCrimeType;
