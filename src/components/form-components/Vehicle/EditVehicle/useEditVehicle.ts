import { useEffect, useState } from 'react';
import type { ListCrimeGroupsQuery } from 'graphql/generated';
import { Role, useListCrimeGroupsQuery } from 'graphql/generated';
import { message, Upload } from 'antd';
import { useStoreState } from 'state';
import type { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { IncidentCardData, VehicleData } from 'types/DataType';

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  editData: VehicleData | undefined | null;
}
interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  optimised?: string | null;
}
interface Return {
  onSubmit: (value: VehicleData) => void;
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  saving: boolean;
  offendersData: OffenderData[];
  incidentsData: IncidentCardData[];
  linkIncident: boolean;
  linkOffender: boolean;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  updateOffendersList: (value: OffenderData) => void;
  updateIncidentList: (value: IncidentCardData) => void;
  removeOffender: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
  adminRights: boolean;
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
}

const useEditVehicle = ({ onClose, update, editData }: Props): Return => {
  const role = useStoreState((state) => state.user.role);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [incidentsData, setIncidentsData] = useState<IncidentCardData[]>([]);
  const [fileList, setFileList] = useState<Image[]>([]);
  const [imageChange, setImageChange] = useState(false);

  useEffect(() => {
    setOffendersData(<[]>editData?.offenders);
    setIncidentsData(<[]>editData?.incidents);
    if (editData?.images && editData.images.length > 0) {
      setFileList(
        editData?.images.map((image) => ({
          uid: `${image.id}`,
          name: `${image.id}.png`,
          status: 'done',
          url: `${image.optimised || image.url}`,
          optimised: `${image.optimised || image.url}`,
        }))
      );
    }
  }, [editData]);

  const { data: CrimeGroupsData, loading: CrimeGroupsLoading } =
    useListCrimeGroupsQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        where: {
          schemes: {
            some: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
      },
    });

  const onSubmit = (data: VehicleData) => {
    setSaving(true);
    update({
      id: editData?.id || '',
      make: data.make || '',
      model: data.model || '',
      colour: data.colour || '',
      registration: data.registration || '',
      crimeGroup:
        data?.crimeGroup && data.crimeGroup.length > 0
          ? data?.crimeGroup?.map((id) => id)
          : [],
      incidents:
        incidentsData && incidentsData.length > 0
          ? incidentsData.map(({ id }) => id)
          : [],
      offenders:
        offendersData && offendersData.length > 0
          ? offendersData.map(({ id }) => id)
          : [],
      images:
        imageChange && fileList.length > 0
          ? fileList
              .filter((item) => !item.optimised)
              .map((item) => ({
                id: item.uid,
                filename: item.fileName || '',
                mimetype: item.type || '',
                url: item.url || '',
              }))
          : undefined,
    });
    onClose();
  };
  // function
  const toggleLinkIncident = () => {
    setLinkIncident(!linkIncident);
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };

  const updateOffendersList = (selectedOffender: OffenderData) => {
    if (!offendersData?.find(({ id }) => id === selectedOffender.id)) {
      setOffendersData([...offendersData, selectedOffender]);
    }
  };
  const updateIncidentList = (selectedIncident: IncidentCardData) => {
    if (selectedIncident) {
      setIncidentsData([...incidentsData, selectedIncident]);
    }
  };
  const removeOffender = (offenderId: string | undefined) => {
    if (offenderId) {
      setOffendersData(
        offendersData?.filter((offender) => offender.id !== offenderId)
      );
    }
  };
  const removeIncident = (incidentId: string | undefined) => {
    if (incidentId) {
      setIncidentsData(
        incidentsData?.filter((incident) => incident.id !== incidentId)
      );
    }
  };
  // image
  const beforeUpload = (file: RcFile) => {
    const isFileDuplicate = fileList.find((item) => item.name === file.name);
    if (isFileDuplicate) {
      message.error('This image already exists, please choose another one.');
    }
    return !isFileDuplicate || Upload.LIST_IGNORE;
  };
  const imgChange: UploadProps['onChange'] = (info) => {
    if (info.file.response && info.file.status === 'done') {
      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          url: info.file.response[0].url,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
        },
      ]);
      setImageChange(true);
    } else {
      setFileList(info.fileList);
      setImageChange(true);
    }
  };

  return {
    onSubmit,
    CrimeGroupsData,
    CrimeGroupsLoading,
    saving,
    offendersData,
    incidentsData,
    linkIncident,
    linkOffender,
    toggleLinkIncident,
    toggleLinkOffender,
    updateIncidentList,
    updateOffendersList,
    removeOffender,
    removeIncident,
    adminRights: role !== Role.User,
    imgChange,
    beforeUpload,
    fileList,
  };
};
export default useEditVehicle;
