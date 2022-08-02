import { useState } from 'react';

import {
  Role,
  useViewIncidentQuery,
  ViewIncidentQuery,
  Age,
  Gender,
  Race,
  Build,
} from 'graphql/generated';
import { useParams } from 'react-router-dom';
import { useLightbox } from 'simple-react-lightbox';
import { useStoreState } from 'state';
import { Modal } from 'antd';

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
  // images?: {
  //   id: string;
  //   optimised?: string | null;
  // }[];
}
interface Return {
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  openLightbox: (index: number) => void;
  addOffenderRights: boolean;
  incidentId: string;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  updateOffenderList: (value: OffenderData[] | undefined) => void;
}

const useViewIncident = (): Return => {
  const { openLightbox } = useLightbox();
  const params = useParams();

  const role = useStoreState((state) => state.user.role);
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [offendersData, setOffendersData] = useState<
    OffenderData[] | undefined
  >([]);
  const { data, loading } = useViewIncidentQuery({
    variables: {
      where: {
        id: params.id,
      },
    },
  });
  const toggleAddExistingOffender = () => {
    setAddExistingOffender(!addExistingOffender);
  };
  const updateOffenderList = (filterOffenders: OffenderData[] | undefined) => {
    if (filterOffenders) {
      if (offendersData && offendersData.length > 0) {
        setOffendersData(
          offendersData.concat(
            filterOffenders.filter(
              (item) =>
                !offendersData?.map((offender) => offender.id).includes(item.id)
            )
          )
        );
      } else setOffendersData(filterOffenders);
    }
  };
  const onDelete = () => {
    confirm({
      title: 'Are you sure?',
      content:
        'Deleting this incident will remove it from the feed and move it to the recycle bin for 30 days before being deleted.',
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
    incidentId: params.id || '',
    onDelete,
    addExistingOffender,
    toggleAddExistingOffender,
    updateOffenderList,
  };
};

export default useViewIncident;
