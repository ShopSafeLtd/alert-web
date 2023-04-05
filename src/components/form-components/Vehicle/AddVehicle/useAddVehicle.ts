import { useState } from 'react';
import type {
  ListCrimeGroupsQuery,
  ListIncidentsQuery,
} from 'graphql/generated';
import {
  useListCrimeGroupsQuery,
  SortOrder,
  useListIncidentsQuery,
  Role,
} from 'graphql/generated';
import { message, Upload } from 'antd';
import { useStoreState } from 'state';
import type { OffenderData } from 'components/viewChat/ViewMessage/useViewMessage';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { VehicleData } from 'types/DataType';

interface Props {
  update: (value: VehicleData) => void;
}

interface Return {
  onSubmit: (value: VehicleData) => void;
  CrimeGroupsData: ListCrimeGroupsQuery | undefined;
  CrimeGroupsLoading: boolean;
  offendersData: OffenderData[];
  incidentsData:
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents'];
  linkIncident: boolean;
  linkOffender: boolean;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  updateOffendersList: (value: OffenderData) => void;
  updateIncidentList: (value: string) => void;
  removeOffender: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
  adminRights: boolean;
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
}

const useAddVehicle = ({ update }: Props): Return => {
  const role = useStoreState((state) => state.user.role);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [incidentsData, setIncidentsData] = useState<
    Exclude<ListIncidentsQuery['listIncidents'], undefined | null>['incidents']
  >([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageChange, setImageChange] = useState(false);

  // query
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
  const { data: listIncidentsData } = useListIncidentsQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        createdAt: SortOrder.Desc,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const onSubmit = (data: VehicleData) => {
    // createVehicle({
    //   variables: {
    //     data: {
    //       make: data.make || '',
    //       model: data.model || '',
    //       colour: data.colour || '',
    //       registration: data.registration || '',
    //       crimeGroup:
    //         data?.crimeGroup && data.crimeGroup.length > 0
    //           ? data?.crimeGroup?.map((id) => ({ id }))
    //           : [],
    //       incidents:
    //         incidentsData && incidentsData.length > 0
    //           ? incidentsData.map(({ id }) => ({ id }))
    //           : [],
    //       offenders:
    //         offendersData && offendersData.length > 0
    //           ? offendersData.map(({ id }) => ({ id }))
    //           : [],
    //       schemes: schemeId,
    //       image: {
    //         upload:
    //           imageChange && fileList.length > 0
    //             ? fileList.map((item) => ({
    //                 url: {
    //                   filename: item.fileName || '',
    //                   mimetype: item.type || '',
    //                   url: item.url || '',
    //                 },
    //               }))
    //             : undefined,
    //       },
    //     },
    //   },
    // });
    update({
      id: Math.floor(Math.random() * 1000).toString(),
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
          ? fileList.map((item) => ({
              id: item.uid,
              filename: item.fileName || '',
              mimetype: item.type || '',
              url: item.url || '',
            }))
          : [],
    });
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
  const updateIncidentList = (selectedIncidentId: string) => {
    if (
      listIncidentsData?.listIncidents?.incidents &&
      listIncidentsData.listIncidents.total > 0
    ) {
      const selectedIncident =
        listIncidentsData?.listIncidents?.incidents.filter(
          ({ id }) => id === selectedIncidentId
        );
      setIncidentsData([...incidentsData, ...selectedIncident]);
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
      message.error(
        'This image has already existed, please choose another one.'
      );
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
export default useAddVehicle;
