import { Role, useViewIncidentQuery, ViewIncidentQuery } from 'graphql/generated'
import { useParams } from 'react-router-dom'
import { useLightbox } from "simple-react-lightbox";
import { useStoreState } from 'state';
import { Modal } from 'antd'

const { confirm } = Modal

interface Return {
  data: ViewIncidentQuery|undefined;
  loading: boolean;
  openLightbox: (index: number) => void;
  addOffenderRights: boolean;
  incidentId: string;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: () => void;
}

const useViewIncident = (): Return => {
  const { openLightbox } = useLightbox();
  const params = useParams()

  const role = useStoreState(state => state.user.role)

  const { data, loading } = useViewIncidentQuery({
    variables: {
      where: {
        id: params.id
      }
    }
  })

  const onDelete = () => {
    confirm({
      title: 'Are you sure?',
      content: 'Deleting this incident will remove it from the feed and move it to the recycle bin for 30 days before being deleted.',
      okType: 'danger',
      okText: 'Delete'
    });
  }

  return {
    data,
    loading,
    openLightbox,
    addOffenderRights: role !== Role.User,
    editRights: role !== Role.User,
    deleteRights: role !== Role.User,
    incidentId: params.id || '',
    onDelete
  }
}

export default useViewIncident