import { useState } from 'react';
import type { TagsQuery, TagsQueryVariables } from 'graphql/generated';
import {
  useRecycleTagMutation,
  Model,
  QueryMode,
  TagsDocument,
  useCreateTagMutation,
  useTagsQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';

import { Modal, notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { TagData } from 'types/DataType';
import { useIntl } from 'react-intl';

const { confirm } = Modal;

interface Return {
  data: TagsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addOffenderWarning: boolean;
  toggleAddOffenderWarning: () => void;
  offenderId: string;
  setOffenderId: (value: string) => void;
  editOffenderWarning: boolean;
  toggleEditOffenderWarning: () => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
  onAddOffenderWarning: (value: TagData) => void;
}

const useOffenderWarningList = (): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const schemeName = useStoreState((state) => state.scheme.name);
  const userId = useStoreState((state) => state.user.id);
  const [offenderId, setOffenderId] = useState('');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [addOffenderWarning, setAddOffenderWarning] = useState(false);
  const [editOffenderWarning, setEditOffenderWarning] = useState(false);

  const variables = {
    where: {
      schemes: {
        some: {
          id: {
            in: [schemeId],
          },
        },
      },
      dataType: {
        equals: Model.Offender,
      },
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The offender warning has been added.',
          id: 'aV3tF0',
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
        query: TagsDocument,
        data: {
          tags: [...(<[]>existingData.tags), res.createTag],
          __typename: 'Query',
        },
        variables,
      });
    },
  });

  const onAddOffenderWarning = (value: TagData) => {
    createTag({
      variables: {
        data: {
          name: value.name,
          description: value.description || '',
          schemes: {
            connect: value.schemes.map((id) => ({
              id,
            })),
          },
          createdBy: { connect: { id: userId } },
          dataType: Model.Offender,
        },
      },
      update: (store, result) => {
        const existingData = store.readQuery<TagsQuery, TagsQueryVariables>({
          query: TagsDocument,
          variables,
        });

        if (existingData && result.data)
          store.writeQuery<TagsQuery, TagsQueryVariables>({
            query: TagsDocument,
            variables,
            data: {
              tags: [...(<[]>existingData.tags), result.data?.createTag],
            },
          });
      },
    }).finally(() => setSaving(false));
  };

  // delete
  const [recycleTag] = useRecycleTagMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Removed',
        description: `The crime type has been removed from ${schemeName}!`,
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
        query: TagsDocument,
        data: {
          tags: existingData?.tags?.filter(
            (tag) => tag?.id !== res?.recycleTag?.id
          ),
          __typename: 'Query',
        },
        variables,
      });
    },
  });

  const deleteConfirm = (currentId: string) => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the offender warning?',
        id: 'NCxXub',
      }),
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
        id: 'JDJoIZ',
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
    });
  };
  const toggleAddOffenderWarning = () => {
    setAddOffenderWarning(!addOffenderWarning);
  };
  const toggleEditOffenderWarning = () => {
    setEditOffenderWarning(!editOffenderWarning);
  };

  return {
    data,
    loading,
    search,
    setSearch,
    addOffenderWarning,
    toggleAddOffenderWarning,
    offenderId,
    setOffenderId,
    editOffenderWarning,
    toggleEditOffenderWarning,
    saving,
    deleteConfirm,
    onAddOffenderWarning,
  };
};

export default useOffenderWarningList;
