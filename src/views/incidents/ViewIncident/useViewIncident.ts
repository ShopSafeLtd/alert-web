import { useState } from 'react';

import {
  Role,
  useRecycleIncidentMutation,
  useUpdateIncidentMutation,
  useViewIncidentQuery,
  ViewIncidentQuery,
  Age,
  Gender,
  Race,
  Build,
} from 'graphql/generated';

import { useLightbox } from 'simple-react-lightbox';
import { useStoreState } from 'state';
import { notification, Modal } from 'antd';

const { confirm } = Modal;
interface OffenderData {
  id: string;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
}
interface Return {
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  saving: boolean;
  openLightbox: (index: number) => void;
  addOffenderRights: boolean;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: (id: string) => void;
  linkOffender: boolean;
  toggleLinkOffender: () => void;
  updateOffendersList: (value: OffenderData) => void;
}

const useViewIncident = (incidentId: string): Return => {
  const { openLightbox } = useLightbox();

  const role = useStoreState((state) => state.user.role);
  const [saving, setSaving] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);

  const { data, loading } = useViewIncidentQuery({
    variables: {
      where: {
        id: incidentId,
      },
    },
  });

  const [updateIncident] = useUpdateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Linked!',
        description: 'The offenders have been Linked to this incidents!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const updateOffendersList = (selectedOffender: OffenderData) => {
    setSaving(true);
    if (incidentId && selectedOffender) {
      updateIncident({
        variables: {
          where: {
            id: incidentId,
          },
          data: {
            offenders: {
              connect: [{ id: selectedOffender.id }],
            },
          },
        },
      });
    }
    setSaving(false);
  };

  const [recycleIncident] = useRecycleIncidentMutation({
    onCompleted: () => {
      window.history.back();
      notification.success({
        message: 'Successfully Deleted!',
        description:
          'The incident has been deleted from the feed and moved to the recycle bin.',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });
  const onDelete = (id: string) => {
    confirm({
      title: 'Are you sure?',
      content:
        'Click delete if you wish to delete this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      okText: 'Delete',
      onOk() {
        recycleIncident({
          variables: {
            where: { id },
          },
        });
      },
    });
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };
  return {
    data,
    loading,
    saving,
    openLightbox,
    addOffenderRights: role !== Role.User,
    editRights: role !== Role.User,
    deleteRights: role !== Role.User,
    onDelete,
    linkOffender,
    toggleLinkOffender,
    updateOffendersList,
  };
};

export default useViewIncident;
