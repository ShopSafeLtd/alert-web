import {
  Role,
  useViewOffenderQuery,
  ViewOffenderQuery,
} from 'graphql/generated';
import { useParams } from 'react-router-dom';
import { useLightbox } from 'simple-react-lightbox';
import { useStoreState } from 'state';
import { Modal } from 'antd';

const { confirm } = Modal;

interface Return {
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  openLightbox: (index: number) => void;
  addOffenderRights: boolean;
  offenderId: string;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: () => void;
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

  const onDelete = () => {
    confirm({
      title: 'Are you sure?',
      content:
        'Deleting this Offender will remove it from the feed and move it to the recycle bin for 30 days before being deleted.',
      okType: 'danger',
      okText: 'Delete',
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
