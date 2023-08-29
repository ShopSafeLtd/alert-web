import {
  useCopyOffenderMutation,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useState } from 'react';
import { notification, Form } from 'antd';
import type { FormInstance } from 'antd';
import { useStoreState } from 'state';
import errorNotification from 'types/error_notification';
import { useIntl } from 'react-intl';

const { useForm } = Form;

export interface FormData {
  scheme: string;
  groups: string[];
}

interface Props {
  offenderId: string;
  onClose: () => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  userSchemes: { value: string; label: string }[];
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  form: FormInstance<FormData>;
  selectSchemeId: string;
  setSelectSchemeId: (value: string) => void;
}

const useCopyOffender = ({ offenderId, onClose }: Props): Return => {
  const intl = useIntl();

  const schemeId = useStoreState((state) => state.scheme.id);
  const userSchemes = useStoreState((state) => state.user.schemes);
  const [selectSchemeId, setSelectSchemeId] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [form] = useForm<FormData>();

  const { data: groupData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: selectSchemeId,
          },
        },
      },
    },
    fetchPolicy: 'cache-and-network',
  });
  const [copyOffender] = useCopyOffenderMutation({
    onCompleted: () => {
      setSaving(false);
      const schemeName = userSchemes.find(
        (el) => el.scheme.id === selectSchemeId
      )?.scheme.name;

      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Copied',
          id: 'a9zFSp',
        }),
        description: intl.formatMessage(
          {
            defaultMessage: `The offender has been copied to {schemeName}!`,
            id: 'OROafI',
          },
          { schemeName }
        ),
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
        where: {
          id: offenderId,
        },
        data: {
          groups: {
            connect:
              groupData?.groups && groupData.groups.length === 1
                ? groupData?.groups.map(({ id }) => ({ id }))
                : data.groups.map((id) => ({ id })),
          },
          scheme: data.scheme,
        },
      },
    });
  };

  return {
    onSubmit,
    userSchemes:
      userSchemes
        .filter(({ scheme }) => scheme.id !== schemeId)
        .map((scheme) => ({
          value: scheme.scheme.id,
          label: scheme.scheme.name,
        })) || [],
    groups:
      groupData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    groupsLoading,
    saving,
    selectSchemeId,
    setSelectSchemeId,
    form,
  };
};
export default useCopyOffender;
