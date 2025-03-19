import type { FormInstance } from 'antd';

import { useGroupsContext } from '#/context/groups-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Form, notification } from 'antd';
import { useCopyOffenderMutation } from 'graphql/offenders/mutations/__generated__/copy-offender.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

const { useForm } = Form;

export interface FormData {
  groups: string[];
  scheme: string;
}

interface Props {
  offenderId: string;
  onClose: () => void;
}

interface Return {
  form: FormInstance<FormData>;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  selectSchemeId: string;
  setSelectSchemeId: (value: string) => void;
  userSchemes: { label: string; value: string }[];
}

const useCopyOffender = ({ offenderId, onClose }: Props): Return => {
  const intl = useIntl();

  const schemeId = useAtomValue(currentSchemeIdAtom);
  const userSchemes = useStoreState((state) => state.user.schemes);
  const [selectSchemeId, setSelectSchemeId] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [form] = useForm<FormData>();

  const { groups, groupsLoading } = useGroupsContext();

  const [copyOffender] = useCopyOffenderMutation({
    onCompleted: () => {
      setSaving(false);
      const schemeName = userSchemes.find(
        (el) => el.scheme.id === selectSchemeId
      )?.scheme.name;

      notification.success({
        description: intl.formatMessage(
          {
            defaultMessage: 'The offender has been copied to {schemeName}!',
          },
          { schemeName }
        ),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Copied',
        }),
        placement: 'bottomRight',
      });
      onClose();
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);

    void copyOffender({
      variables: {
        data: {
          groups: {
            connect:
              groups && groups.length === 1
                ? groups.map(({ value: id }) => ({ id }))
                : data.groups.map((id) => ({ id })),
          },
          scheme: data.scheme,
        },
        where: {
          id: offenderId,
        },
      },
    });
  };

  return {
    form,
    groups,
    groupsLoading,
    onSubmit,
    saving,
    selectSchemeId,
    setSelectSchemeId,
    userSchemes:
      userSchemes
        .filter(({ scheme }) => scheme.id !== schemeId)
        .map((scheme) => ({
          label: scheme.scheme.name,
          value: scheme.scheme.id,
        })) || [],
  };
};
export default useCopyOffender;
