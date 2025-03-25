import type {
  TagsQuery,
  TagsQueryVariables,
} from 'graphql/tags/queries/__generated__/tags.generated';
import type { TagData } from 'types/DataType';

import {
  currentSchemeAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { Modal, notification } from 'antd';
import { useRecycleTagMutation } from 'graphql/tag/mutation/__generated__/recycle-tag.generated';
import { useCreateTagMutation } from 'graphql/tags/mutations/__generated__/create-tag.generated';
import {
  TagsDocument,
  useTagsQuery,
} from 'graphql/tags/queries/__generated__/tags.generated';
import { Model, QueryMode } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;

interface Return {
  addOffenderWarning: boolean;
  data: TagsQuery | undefined;
  deleteConfirm: (value: string) => void;
  editOffenderWarning: boolean;
  loading: boolean;
  offenderId: string;
  onAddOffenderWarning: (value: TagData) => void;
  saving: boolean;
  search: string;
  setOffenderId: (value: string) => void;
  setSearch: (value: string) => void;
  toggleAddOffenderWarning: () => void;
  toggleEditOffenderWarning: () => void;
}

const useOffenderWarningList = (): Return => {
  const intl = useIntl();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const schemeName = useAtomValue(currentSchemeAtom)?.name ?? '';
  const userId = useAtomValue(userIdAtom);
  const [offenderId, setOffenderId] = useState('');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [addOffenderWarning, setAddOffenderWarning] = useState(false);
  const [editOffenderWarning, setEditOffenderWarning] = useState(false);

  const variables = {
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          description: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
      dataType: {
        equals: Model.Offender,
      },
      schemes: {
        some: {
          id: {
            in: [schemeId],
          },
        },
      },
    },
  };
  const { data, loading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  // createTag
  const [createTag] = useCreateTagMutation({
    onCompleted: () => {
      setSaving(false);
      setAddOffenderWarning(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The offender warning has been added.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;

      const existingData = store.readQuery<TagsQuery, TagsQueryVariables>({
        query: TagsDocument,
        variables,
      });

      if (existingData === null) return;

      store.writeQuery<TagsQuery, TagsQueryVariables>({
        data: {
          __typename: 'Query',
          tags: [...(<[]>existingData.tags), res.createTag],
        },
        query: TagsDocument,
        variables,
      });
    },
  });

  const onAddOffenderWarning = (value: TagData) => {
    void createTag({
      update: (store, result) => {
        const existingData = store.readQuery<TagsQuery, TagsQueryVariables>({
          query: TagsDocument,
          variables,
        });

        if (existingData && result.data)
          store.writeQuery<TagsQuery, TagsQueryVariables>({
            data: {
              tags: [...(<[]>existingData.tags), result.data?.createTag],
            },
            query: TagsDocument,
            variables,
          });
      },
      variables: {
        data: {
          createdBy: { connect: { id: userId } },
          dataType: Model.Offender,
          description: value.description || '',
          name: value.name,
          schemes: {
            connect: value.schemes.map((id) => ({
              id,
            })),
          },
        },
      },
    }).finally(() => setSaving(false));
  };

  // delete
  const [recycleTag] = useRecycleTagMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: `The crime type has been removed from ${schemeName}!`,
        message: 'Successfully Removed',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;
      const existingData = store.readQuery<TagsQuery>({
        query: TagsDocument,
        variables,
      });

      if (existingData === null) return;

      store.writeQuery<TagsQuery>({
        data: {
          __typename: 'Query',
          tags: existingData?.tags?.filter(
            (tag) => tag?.id !== res?.recycleTag?.id
          ),
        },
        query: TagsDocument,
        variables,
      });
    },
  });

  const deleteConfirm = (currentId: string) => {
    confirm({
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      onOk() {
        setSaving(true);
        void recycleTag({
          variables: {
            where: {
              id: currentId,
            },
          },
        }).finally(() => setSaving(false));
      },
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the offender warning?',
      }),
    });
  };
  const toggleAddOffenderWarning = () => {
    setAddOffenderWarning(!addOffenderWarning);
  };
  const toggleEditOffenderWarning = () => {
    setEditOffenderWarning(!editOffenderWarning);
  };

  return {
    addOffenderWarning,
    data,
    deleteConfirm,
    editOffenderWarning,
    loading,
    offenderId,
    onAddOffenderWarning,
    saving,
    search,
    setOffenderId,
    setSearch,
    toggleAddOffenderWarning,
    toggleEditOffenderWarning,
  };
};

export default useOffenderWarningList;
