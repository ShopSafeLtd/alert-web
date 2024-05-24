import { useState } from 'react';
import type { CustomGalleriesQuery } from 'graphql/generated';
import {
  CustomGalleriesDocument,
  QueryMode,
  useCreateCustomGalleryMutation,
  useCustomGalleriesQuery,
  useDeleteCustomGalleryMutation,
  useUpdateCustomGalleryMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';

import { Modal, notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { CustomGalleryData } from 'types/DataType';
import { useIntl } from 'react-intl';

const { confirm } = Modal;

interface Return {
  data: CustomGalleriesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addCustomGallery: boolean;
  toggleAddCustomGallery: () => void;
  editCustomGallery: CustomGalleryData | undefined;
  setEditCustomGallery: (value: CustomGalleryData | undefined) => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
  onAddCustomGallery: (value: CustomGalleryData) => void;
  onEditCustomGallery: (value: CustomGalleryData) => void;
}

const useCustomGalleries = (): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const schemeName = useStoreState((state) => state.scheme.name);

  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [addCustomGallery, setAddCustomGallery] = useState(false);
  const [editCustomGallery, setEditCustomGallery] = useState<
    CustomGalleryData | undefined
  >();

  const variables = {
    where: {
      schemes: {
        some: {
          id: {
            in: [schemeId],
          },
        },
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
  const { data, loading } = useCustomGalleriesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  // createCustomGallery
  const [createCustomGallery] = useCreateCustomGalleryMutation({
    onCompleted: () => {
      setAddCustomGallery(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The custom gallery has been added.',
          id: 'T+shVI',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;
      const existingData = store.readQuery<CustomGalleriesQuery>({
        query: CustomGalleriesDocument,
        variables,
      });

      if (existingData === null) return;

      store.writeQuery<CustomGalleriesQuery>({
        query: CustomGalleriesDocument,
        data: {
          customGalleriesRelay: {
            totalCount: existingData.customGalleriesRelay.totalCount + 1,
            edges: [
              ...existingData.customGalleriesRelay.edges,
              { node: res.createCustomGallery },
            ],
          },
          __typename: 'Query',
        },
        variables,
      });
    },
  });

  const onAddCustomGallery = (value: CustomGalleryData) => {
    void createCustomGallery({
      variables: {
        data: {
          name: value.name,
          description: value.description || '',
          schemes: {
            connect: { id: schemeId },
          },
          groups: {
            connect:
              value.groups && value.groups.length > 0
                ? value.groups?.map((id) => ({ id }))
                : [],
          },
        },
      },
    }).finally(() => {
      setSaving(false);
    });
  };

  // delete
  const [deleteCustomGallery] = useDeleteCustomGalleryMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Removed',
        description: `The custom gallery has been removed from ${schemeName}!`,
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;
      const existingData = store.readQuery<CustomGalleriesQuery>({
        query: CustomGalleriesDocument,
        variables,
      });

      if (existingData === null) return;

      store.writeQuery<CustomGalleriesQuery>({
        query: CustomGalleriesDocument,
        data: {
          customGalleriesRelay: {
            totalCount: existingData.customGalleriesRelay.totalCount - 1,
            edges: existingData.customGalleriesRelay.edges.filter(
              ({ node: customGallery }) =>
                customGallery?.id !== res?.deleteCustomGallery?.id
            ),
          },
          __typename: 'Query',
        },
        variables,
      });
    },
  });
  const [updateCustomGallery] = useUpdateCustomGalleryMutation({
    onCompleted: () => {
      setEditCustomGallery(undefined);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The offender warning has been updated.',
          id: 'GI8rR7',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });

  const onEditCustomGallery = (value: CustomGalleryData) => {
    setSaving(true);
    void updateCustomGallery({
      variables: {
        where: {
          id: value.id,
        },
        data: {
          name: { set: value.name },
          description: { set: value.description || '' },
          groups: {
            set:
              value.groups && value.groups.length > 0
                ? value.groups?.map((id) => ({ id }))
                : [],
          },
        },
      },
    }).finally(() => {
      setSaving(false);
    });
  };
  const deleteConfirm = (currentId: string) => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the custom gallery?',
        id: 'vwosFl',
      }),
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
        id: 'JDJoIZ',
      }),
      onOk() {
        setSaving(true);
        void deleteCustomGallery({
          variables: {
            id: currentId,
          },
        }).finally(() => setSaving(false));
      },
    });
  };
  const toggleAddCustomGallery = () => {
    setAddCustomGallery(!addCustomGallery);
  };

  return {
    data,
    loading,
    search,
    setSearch,
    addCustomGallery,
    toggleAddCustomGallery,
    editCustomGallery,
    saving,
    deleteConfirm,
    onAddCustomGallery,
    onEditCustomGallery,
    setEditCustomGallery,
  };
};

export default useCustomGalleries;
