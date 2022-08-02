import {
  Role,
  useRecycleOffenderMutation,
  useViewOffenderQuery,
  ViewOffenderQuery,
} from 'graphql/generated';
import { useParams } from 'react-router-dom';
import { useLightbox } from 'simple-react-lightbox';
import { Modal, notification } from 'antd';

import { useStoreState } from 'state';

const { confirm } = Modal;

interface Return {
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  openLightbox: (index: number) => void;
  addOffenderRights: boolean;
  offenderId: string;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: (id: string) => void;
}

const useViewOffender = (): Return => {
  const { openLightbox } = useLightbox();
  const params = useParams();

  const role = useStoreState((state) => state.user.role);

  const { data, loading } = useViewOffenderQuery({
    variables: {
      where: {
        id: params.id,
      },
    },
  });

  const [recycleOffender] = useRecycleOffenderMutation({
    onCompleted: () => {
      window.history.back();
      notification.success({
        message: 'Successfully Deleted!',
        description:
          'The offender has been deleted from the feed and moved to the recycle bin.',
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
        'Deleting this Offender will remove it from the feed and move it to the recycle bin for 30 days before being deleted.',
      okType: 'danger',
      okText: 'Delete',
      onOk() {
        recycleOffender({
          variables: {
            where: { id },
          },
        });
      },
    });
  };

  return {
    data,
    loading,
    openLightbox,
    addOffenderRights: role !== Role.User,
    editRights: role !== Role.User,
    deleteRights: role !== Role.User,
    offenderId: params.id || '',
    onDelete,
  };
};

export default useViewOffender;
