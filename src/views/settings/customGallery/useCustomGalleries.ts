import type {
  CustomGalleriesQuery,
  CustomGalleriesQueryVariables,
} from '#/views/settings/customGallery/graphql/queries/list_custom_galleries.generated';
import type { CustomGalleryData } from 'types/DataType';

import {
  CustomGalleriesDocument,
  useCustomGalleriesQuery,
} from '#/views/settings/customGallery/graphql/queries/list_custom_galleries.generated';
import { Modal, notification } from 'antd';
import { useCreateCustomGalleryMutation } from 'graphql/customGallery/mutations/create-custom-gallery.generated';
import { useDeleteCustomGalleryMutation } from 'graphql/customGallery/mutations/delete_custom-gallery.generated';
import { useUpdateCustomGalleryMutation } from 'graphql/customGallery/mutations/update_custom-gallery.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;

interface Return {
  addCustomGallery: boolean;
  data: CustomGalleriesQuery | undefined;
  deleteConfirm: (value: string) => void;
  editCustomGallery: CustomGalleryData | undefined;
  loading: boolean;
  onAddCustomGallery: (value: CustomGalleryData) => void;
  onEditCustomGallery: (value: CustomGalleryData) => void;
  saving: boolean;
  search: string;
  setEditCustomGallery: (value: CustomGalleryData | undefined) => void;
  setSearch: (value: string) => void;
  toggleAddCustomGallery: () => void;
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

  const variables: CustomGalleriesQueryVariables = {
    order: {
      name: SortOrder.Asc,
    },
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

      schemes: {
        some: {
          id: {
            in: [schemeId],
          },
        },
      },
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
        description: intl.formatMessage({
          defaultMessage: 'The custom gallery has been added.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
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
        data: {
          __typename: 'Query',
          customGalleriesRelay: {
            edges: [
              ...existingData.customGalleriesRelay.edges,
              { node: res.createCustomGallery },
            ],
            totalCount: existingData.customGalleriesRelay.totalCount + 1,
          },
        },
        query: CustomGalleriesDocument,
        variables,
      });
    },
  });

  const onAddCustomGallery = (value: CustomGalleryData) => {
    void createCustomGallery({
      variables: {
        data: {
          description: value.description || '',
          groups: {
            connect:
              value.groups && value.groups.length > 0
                ? value.groups?.map((id) => ({ id }))
                : [],
          },
          name: value.name,
          schemes: {
            connect: { id: schemeId },
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
        description: `The custom gallery has been removed from ${schemeName}!`,
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
      const existingData = store.readQuery<CustomGalleriesQuery>({
        query: CustomGalleriesDocument,
        variables,
      });

      if (existingData === null) return;

      store.writeQuery<CustomGalleriesQuery>({
        data: {
          __typename: 'Query',
          customGalleriesRelay: {
            edges: existingData.customGalleriesRelay.edges.filter(
              ({ node: customGallery }) =>
                customGallery?.id !== res?.deleteCustomGallery?.id
            ),
            totalCount: existingData.customGalleriesRelay.totalCount - 1,
          },
        },
        query: CustomGalleriesDocument,
        variables,
      });
    },
  });
  const [updateCustomGallery] = useUpdateCustomGalleryMutation({
    onCompleted: () => {
      setEditCustomGallery(undefined);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The offender warning has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
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
        data: {
          description: { set: value.description || '' },
          groups: {
            set:
              value.groups && value.groups.length > 0
                ? value.groups?.map((id) => ({ id }))
                : [],
          },
          name: { set: value.name },
        },
        where: {
          id: value.id,
        },
      },
    }).finally(() => {
      setSaving(false);
    });
  };
  const deleteConfirm = (currentId: string) => {
    confirm({
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      onOk() {
        setSaving(true);
        void deleteCustomGallery({
          variables: {
            id: currentId,
          },
        }).finally(() => setSaving(false));
      },
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the custom gallery?',
      }),
    });
  };
  const toggleAddCustomGallery = () => {
    setAddCustomGallery(!addCustomGallery);
  };

  return {
    addCustomGallery,
    data,
    deleteConfirm,
    editCustomGallery,
    loading,
    onAddCustomGallery,
    onEditCustomGallery,
    saving,
    search,
    setEditCustomGallery,
    setSearch,
    toggleAddCustomGallery,
  };
};

export default useCustomGalleries;
