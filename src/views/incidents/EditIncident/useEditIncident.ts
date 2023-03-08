import { useEffect, useState } from 'react';
import {
  Age,
  Build,
  CreateTagMutation,
  Gender,
  IncidentUpdateInput,
  ListGoodsTypesQuery,
  ListOffendersQuery,
  Model,
  QueryMode,
  Race,
  Role,
  SearchBusinessesDocument,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
  SortOrder,
  TagsDocument,
  TagsQuery,
  useListCrimeGroupsQuery,
  useListGoodsTypesQuery,
  useListOffendersQuery,
  useListVehiclesQuery,
  useRecycleIncidentMutation,
  useSchemeGroupsQuery,
  useTagsQuery,
  useUpdateIncidentMutation,
  useViewIncidentQuery,
  ViewIncidentQuery,
} from 'graphql/generated';
import { message, Modal, notification, Upload } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { MutationUpdaterFn, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router';
import update from 'immutability-helper';
import { UploadChangeParam } from 'antd/lib/upload';
import { CrimeGroupData, VehicleData } from 'types/DataType';

const { confirm } = Modal;

interface Props {
  incidentId: string;
  reviewed: boolean;
}

type Offender = Exclude<
  ListOffendersQuery['listOffenders'],
  null | undefined
>['offenders'][0];

interface FormData {
  subject: string;
  description: string;
  date: Date;
  value?: number;
  recoveredValue?: number;
  policeReported?: boolean;
  policeInvolved?: boolean;
  policeRef?: string;
  business: {
    label: React.ReactNode;
    value: string;
  };
  groups: string[];
  tags: string[];
  images: { id: string; url: string; optimised: string }[];
  goods: {
    id: string;
    goodsType?: string;
    value?: number;
    recoveredValue: number;
  }[];
}

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

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  optimised?: string | null;
}

interface Return {
  addIncidentTag: boolean;
  addRecentOffender: Offender | null;
  adminRights: boolean;
  assignOffendersToImages: (data: {
    image: Image;
    offenders: OffenderData[];
  }) => void;
  beforeUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupData[];
  data: ViewIncidentQuery | undefined;
  fileList: Image[];
  goodsTypesData: ListGoodsTypesQuery | undefined;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  loading: boolean;
  newImage: Image | null;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  onCancelNewImage: () => void;
  onPreview: (value: Image) => void;
  onReject: () => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  onSubmit: (value: FormData) => void;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeCrimeGroup: (crimeGroupId: string) => void;
  removeImage: (uid: string) => void;
  removeImageFromOffender: (data: { image: Image; offenderId: string }) => void;
  removeOffender: (offenderId: string) => void;
  removeVehicle: (vehicleId: string) => void;
  saving: boolean;
  searchOffenders: string;
  setAddRecentOffender: (value: Offender | null) => void;
  setAssignToImage: (image: Image) => void;
  setSearchOffenders: (value: string) => void;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  toggleAddIncidentTag: () => void;
  updateCrimeGroupsData: (value: CrimeGroupData) => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  updateOffender: (value: OffenderData) => void;
  updateOffendersData: (value: OffenderData) => void;
  updateVehiclesData: (value: VehicleData) => void;
  vehiclesData: VehicleData[];
}

const useEditIncident = ({ incidentId, reviewed }: Props): Return => {
  const navigate = useNavigate();
  const client = useApolloClient();

  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const groups = useStoreState((state) => state.user.groups).filter(
    ({ scheme: { id } }) => schemeId === id
  );
  const role = useStoreState((state) => state.user.role);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const order = useStoreState((state) => state.data.incidents.order);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );
  const [saving, setSaving] = useState(false);

  const [addIncidentTag, setAddIncidentTag] = useState(false);
  const [addOffender, setAddOffender] = useState(false);
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [addRecentOffender, setAddRecentOffender] = useState<Offender | null>(
    null
  );
  const [searchOffenders, setSearchOffenders] = useState<string>('');
  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<Image[]>([]);
  const [newImage, setNewImage] = useState<Image | null>(null);
  const [editedOffender, setEditedOffender] = useState<
    OffenderData | undefined
  >();

  const [crimeGroupsData, setCrimeGroupsData] = useState<CrimeGroupData[]>([]);
  const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);

  useEffect(() => {
    if (editedOffender) {
      setOffendersData([
        ...(offendersData?.filter(({ id }) => id !== editedOffender.id) || []),
        {
          ...editedOffender,
        },
      ]);
      setEditedOffender(undefined);
    }
  }, [editedOffender]);
  // Query
  const { data: incidentData, loading } = useViewIncidentQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: incidentId,
      },
    },

    onCompleted: ({ incident }) => {
      if (incident?.offenders && incident.offenders.length) {
        setOffendersData(incident.offenders);
      }
      if (incident?.vehicles && incident.vehicles.length) {
        setVehiclesData(incident.vehicles);
      }
      if (incident?.crimeGroups && incident.crimeGroups.length) {
        setCrimeGroupsData(incident.crimeGroups);
      }
      // imageList
      if (incident?.images && incident.images.length) {
        setFileList(
          incident?.images.map((image) => ({
            uid: `${image.id}`,
            name: `${image.id}.png`,
            status: 'done',
            url: `${image.optimised}`,
            optimised: `${image.optimised}`,
          }))
        );
      }
    },
  });

  const { data: groupData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: role !== Role.SchemeAdmin,
    onCompleted: (result) => {
      setIncidentsState({
        pagination,
        variables: {
          ...variables,
          groups: result.groups.map((group) => group.id),
        },
        order,
      });
    },
  });

  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        dataType: {
          equals: Model.Incident,
        },
      },
    },
  });
  const { data: listVehiclesData } = useListVehiclesQuery({
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

  const { data: listCrimeGroupsData } = useListCrimeGroupsQuery({
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
  const { data: listOffendersData } = useListOffendersQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
    },
  });

  const { data: goodsTypesData } = useListGoodsTypesQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: recentOffenderData, loading: recentOffenderLoading } =
    useListOffendersQuery({
      variables: {
        scheme: {
          id: schemeId,
        },
        order: {
          updatedAt: SortOrder.Desc,
        },
        take: 20,
        where: searchOffenders.length
          ? {
              name: {
                contains: searchOffenders,
                mode: QueryMode.Insensitive,
              },
            }
          : undefined,
      },
    });
  // mutation
  const updateIncidentTag: MutationUpdaterFn<CreateTagMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<TagsQuery>({
      query: TagsDocument,
      variables: {
        where: {
          scheme: { id: { equals: schemeId } },
          dataType: {
            equals: Model.Incident,
          },
        },
      },
    });

    if (existingData === null) return;

    store.writeQuery<TagsQuery>({
      query: TagsDocument,
      data: {
        tags: [...existingData.tags, res.createTag],
        __typename: 'Query',
      },
      variables: {
        where: {
          scheme: { id: { equals: schemeId } },
          dataType: {
            equals: Model.Incident,
          },
        },
      },
    });
  };

  const [updateIncident] = useUpdateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Updated!',
        description: reviewed
          ? 'The Incident has been approved!'
          : 'The Incident has been updated!',
        placement: 'bottomRight',
      });
      navigate(`/app/incidents/view/${incidentId}`);
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

  // delete incident
  const [recycleIncident] = useRecycleIncidentMutation({
    onCompleted: () => {
      navigate(`/app/incidents`);
      notification.success({
        message: 'Successfully Rejected!',
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
  const onReject = () => {
    confirm({
      title: 'Are you sure?',
      content:
        'Click reject if you wish to reject the approvement of this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      okText: 'Reject',
      onOk() {
        recycleIncident({
          variables: {
            where: { id: incidentId },
          },
        });
      },
    });
  };

  // functions
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
    if (info.file.response) {
      setNewImage({
        ...info.file,
        url: info.file.response[0].url,
        fileName: info.file.response[0].blobName,
        type: info.file.response[0].mimetype,
      });
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
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const toggleAddIncidentTag = () => {
    setAddIncidentTag(!addIncidentTag);
  };
  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };
  const toggleAddExistingOffender = () => {
    setAddExistingOffender(!addExistingOffender);
  };
  const updateOffendersData = (offender: OffenderData) => {
    setOffendersData([...offendersData, offender]);
  };
  const updateOffender = (offender: OffenderData) => {
    setEditedOffender(offender);
  };

  const updateVehiclesData = (vehicle: VehicleData) => {
    const editedData = vehiclesData.find(({ id }) => id === vehicle.id);
    if (editedData) {
      setVehiclesData([
        ...(vehiclesData?.filter(({ id }) => id !== vehicle.id) || []),
        {
          ...vehicle,
        },
      ]);
    } else {
      setVehiclesData([...vehiclesData, vehicle]);
    }
  };
  const updateCrimeGroupsData = (crimeGroup: CrimeGroupData) => {
    const editedData = crimeGroupsData.find(({ id }) => id === crimeGroup.id);
    if (editedData) {
      setCrimeGroupsData([
        ...(crimeGroupsData?.filter(({ id }) => id !== crimeGroup.id) || []),
        {
          ...crimeGroup,
        },
      ]);
    } else {
      setCrimeGroupsData([...crimeGroupsData, crimeGroup]);
    }
  };
  const removeOffender = (offenderId: string) => {
    setOffendersData(
      offendersData?.filter((offender) => offender.id !== offenderId)
    );
  };
  const removeVehicle = (vehicleId: string) => {
    setVehiclesData(
      vehiclesData?.filter((vehicle) => vehicle.id !== vehicleId)
    );
  };
  const removeCrimeGroup = (crimeGroupId: string) => {
    setCrimeGroupsData(
      crimeGroupsData?.filter((crimeGroup) => crimeGroup.id !== crimeGroupId)
    );
  };
  const removeImage = (uid: string) => {
    setFileList(fileList.filter((image) => image.uid !== uid));
  };
  const removeImageFromOffender = (data: {
    image: Image;
    offenderId: string;
  }) => {
    // find index of file in fileList array
    const fileIndex = fileList.map(({ uid }) => uid).indexOf(data.image.uid);
    // update the file object in the array with the new value, update will replace value in same place in array
    setFileList(
      update(fileList, {
        [fileIndex]: {
          $set: {
            ...data.image,
            offenders: data.image.offenders?.filter(
              ({ id }) => id !== data.offenderId
            ),
          },
        },
      })
    );

    if (offendersData) {
      // find index of file in fileList array
      const offenderIndex = offendersData
        .map(({ id }) => id)
        .indexOf(data.offenderId);
      const offender = offendersData.find(({ id }) => data.offenderId === id);
      if (offender && offender.images)
        setOffendersData(
          update(offendersData, {
            [offenderIndex]: {
              $set: {
                ...offender,
                images: offender.images.filter(
                  ({ id }) => id !== data.image.uid
                ),
              },
            },
          })
        );
    }
  };
  const isOffenderData = (
    item: OffenderData | undefined
  ): item is OffenderData => !!item;

  const assignOffendersToImages = (data: {
    image: Image;
    offenders: OffenderData[];
  }) => {
    if (offendersData) {
      const changedOffendersIds = data.offenders.map(({ id }) => id);
      const originalOffendersIds = offendersData.map(({ id }) => id);
      const originalImageOffendersIds =
        fileList
          .find(({ uid }) => uid === data.image.uid)
          ?.offenders?.map(({ id }) => id) || [];
      const updatedOffenders = offendersData
        .map((offender) => {
          if (changedOffendersIds.includes(offender.id))
            return data.offenders.find(({ id }) => id === offender.id);
          if (originalImageOffendersIds.includes(offender.id))
            return {
              ...offender,
              images: offender.images?.filter(
                ({ id }) => id !== data.image.uid
              ),
            };
          return offender;
        })
        .filter(isOffenderData);
      const newOffenders = data.offenders.filter(
        (offender) => !originalOffendersIds.includes(offender.id)
      );

      setOffendersData([...updatedOffenders, ...newOffenders]);
    }

    // find index of file in fileList array
    const fileIndex = fileList.map(({ uid }) => uid).indexOf(data.image.uid);
    // update the file object in the array with the new value, update will replace value in same place in array
    setFileList(
      update(fileList, {
        [fileIndex]: {
          $set: data.image,
        },
      })
    );

    setNewImage(null);
  };
  const offenderImgChange = (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => {
    if (info.file.response) {
      const currentOffender = offendersData.find(({ id }) => id === currentId);
      if (currentOffender) {
        assignOffendersToImages({
          image: {
            ...info.file,
            url: info.file.response[0].url,
            fileName: info.file.response[0].blobName,
            type: info.file.response[0].mimetype,
            uid: info.file.uid,
            offenders: [currentOffender],
          },
          offenders: [currentOffender].map((offender) => {
            let images: OffenderData['images'] = [];
            if (offender.images) images = offender.images;
            return {
              ...offender,
              images: [
                ...images,
                {
                  id: info.file.uid,
                  new: true,
                  optimised: info.file.response[0].url,
                  url: info.file.response[0].url,
                  fileName: info.file.response[0].blobName,
                  type: info.file.response[0].mimetype,
                },
              ],
            };
          }),
        });
      }
    } else {
      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          url: info.fileList[0].url,
          fileName: info.fileList[0].fileName,
          type: info.fileList[0].type,
        },
      ]);
    }
  };

  const onSubmit = (data: FormData) => {
    setSaving(true);

    if (!offendersData) {
      confirm({
        title: 'No Offenders',
        content: 'Please select or add at least one offender for the incident.',
        cancelText: 'Find Offenders',
        onCancel() {
          toggleAddExistingOffender();
        },
        okText: 'Add New Offender',
        onOk() {
          toggleAddOffender();
        },
      });
      setSaving(false);
    } else {
      const getOffenders = (): IncidentUpdateInput['offenders'] => {
        if (
          offendersData &&
          listOffendersData?.listOffenders &&
          incidentData?.incident
        ) {
          const offendersIds = listOffendersData.listOffenders.offenders.map(
            (offender) => offender.id
          );
          const existingOffenders = offendersData.filter((item) =>
            offendersIds.includes(item.id)
          );
          const existingOffendersWithImages = existingOffenders
            .filter((offender) =>
              offender.images?.map((image) => image.new).includes(true)
            )
            .map((offender) => ({
              ...offender,
              images: offender.images?.filter((image) => image.new),
            }));
          const newOffenders = offendersData.filter(
            (item) => !offendersIds.includes(item.id)
          );
          const deletedOffenders = incidentData?.incident?.offenders?.filter(
            (offender) =>
              !offendersData?.map((item) => item.id).includes(offender.id)
          );

          // const newOffenderImage = newOffenders?.map((offender) =>
          //   offender.images?.filter((image) => image.new === true)
          // );

          return {
            connect: existingOffenders.length
              ? existingOffenders.map((offender) => ({ id: offender.id }))
              : undefined,
            update: existingOffendersWithImages.map((offender) => ({
              where: { id: offender.id },
              data: {
                images:
                  offender.images && offender.images.length
                    ? {
                        connect: offender.images?.map((image) => ({
                          id: image.id,
                        })),
                      }
                    : {},
              },
            })),
            create: newOffenders.length
              ? newOffenders.map((offender) => ({
                  name: offender.name || 'Unidentified Offender',
                  gender: offender.gender || null,
                  race: offender.race || null,
                  build: offender.build || null,
                  hair: offender.hair || null,
                  peculiarities: offender.peculiarities || null,
                  age: offender.age || null,
                  dateSource: offender.dateSource || null,
                  dateOfBirth: offender.dateOfBirth || null,
                  groups: data.groups.length
                    ? { connect: data.groups.map((id) => ({ id })) }
                    : undefined,
                  scheme: { connect: { id: schemeId } },
                  createdBy: { connect: { id: userId } },
                  localId: offender.id,
                  images:
                    offender?.images &&
                    offender.images.length &&
                    offender.images?.filter((image) => image.new === true)
                      ? {
                          connect: offender.images
                            ?.filter((image) => image.new === true)
                            .map((image) => ({
                              id: image.id,
                            })),
                        }
                      : {},
                }))
              : undefined,
            disconnect: deletedOffenders.length
              ? deletedOffenders.map((offender) => ({ id: offender.id }))
              : undefined,
          };
        }

        return {
          connect: undefined,
          create: undefined,
        };
      };

      const getVehicles = (): IncidentUpdateInput['vehicles'] => {
        if (
          vehiclesData &&
          listVehiclesData?.listVehicles &&
          incidentData?.incident
        ) {
          const vehiclesIds = listVehiclesData.listVehicles.vehicles.map(
            (vehicle) => vehicle.id
          );

          const newVehicles = vehiclesData.filter(
            (item) => !vehiclesIds.includes(item.id)
          );

          const existingVehicles = vehiclesData.filter((item) =>
            vehiclesIds.includes(item.id)
          );
          const editedVehicles = existingVehicles.filter(
            ({ edited }) => edited === true
          );
          return {
            connect: existingVehicles.length
              ? existingVehicles.map(({ id }) => ({ id }))
              : undefined,
            update: editedVehicles.map((vehicle) => ({
              where: { id: vehicle.id },
              data: {
                make: { set: vehicle.make },
                model: { set: vehicle.model },
                colour: { set: vehicle.colour },
                registration: { set: vehicle.registration },
                crimeGroup:
                  vehicle.crimeGroup && vehicle.crimeGroup.length
                    ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                    : undefined,
                incidents:
                  vehicle.incidents && vehicle.incidents
                    ? { connect: vehicle.incidents.map((id) => ({ id })) }
                    : undefined,
                offenders:
                  vehicle.offenders && vehicle.offenders.length
                    ? { connect: vehicle.offenders.map((id) => ({ id })) }
                    : undefined,
              },
            })),

            create: newVehicles.length
              ? newVehicles.map((vehicle) => ({
                  make: vehicle.make,
                  model: vehicle.model,
                  colour: vehicle.colour,
                  registration: vehicle.registration,
                  crimeGroup:
                    vehicle.crimeGroup && vehicle.crimeGroup.length
                      ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                      : undefined,
                  offenders:
                    vehicle.offenders && vehicle.offenders.length
                      ? { connect: vehicle.offenders.map((id) => ({ id })) }
                      : undefined,
                }))
              : undefined,
          };
        }
        return {
          connect: undefined,
          create: undefined,
        };
      };
      const getCrimeGroups = (): IncidentUpdateInput['crimeGroups'] => {
        if (
          crimeGroupsData &&
          listCrimeGroupsData?.listCrimeGroups &&
          incidentData?.incident
        ) {
          const crimeGroupsIds =
            listCrimeGroupsData.listCrimeGroups.crimeGroups.map(
              (crimeGroup) => crimeGroup.id
            );

          const newCrimeGroups = crimeGroupsData.filter(
            (item) => !crimeGroupsIds.includes(item.id)
          );

          const existingCrimeGroups = crimeGroupsData.filter((item) =>
            crimeGroupsIds.includes(item.id)
          );

          return {
            connect: existingCrimeGroups.length
              ? existingCrimeGroups.map(({ id }) => ({ id }))
              : undefined,

            create: newCrimeGroups.length
              ? newCrimeGroups.map((crimeGroup) => ({
                  offenders: {
                    connect: crimeGroup.offenders?.map((id) => ({ id })),
                  },
                }))
              : undefined,
          };
        }
        return {
          connect: undefined,
          create: undefined,
        };
      };
      console.log(data);

      updateIncident({
        variables: {
          where: {
            id: incidentId,
          },
          data: {
            approved: { set: true },
            subject: { set: data.subject },
            description: { set: data.description },
            date: { set: data.date },
            time: { set: data.date },
            value: { set: data.value || 0 },
            recoveredValue: { set: data.recoveredValue || 0 },
            policeInvolved: { set: data.policeInvolved },
            policeRef: { set: data.policeRef },
            policeReported: { set: data.policeReported },
            business: {
              connect: {
                id: data.business.value,
              },
            },
            incidentItems:
              data.goods?.length > 0
                ? {
                    create:
                      data.goods
                        .filter((item) => !item.id)
                        .map((item) => ({
                          goodsType: {
                            connect: {
                              id: item.goodsType,
                            },
                          },
                          name:
                            goodsTypesData?.listGoodsTypes.goodsTypes.find(
                              ({ id }) => id === item.goodsType
                            )?.name || '',
                          value: item.value || 0,
                          recoveredValue: item.recoveredValue || 0,
                        })) || undefined,
                    update:
                      data.goods
                        .filter((item) => item.id)
                        .map((item) => ({
                          data: {
                            goodsType: {
                              connect: {
                                id: item.goodsType,
                              },
                            },
                            name: {
                              set:
                                goodsTypesData?.listGoodsTypes.goodsTypes.find(
                                  ({ id }) => id === item.goodsType
                                )?.name || '',
                            },
                            value: { set: item.value || 0 },
                            recoveredValue: { set: item.recoveredValue || 0 },
                          },
                          where: { id: item.id },
                        })) || undefined,
                  }
                : undefined,
            groups: {
              set: data.groups.map((id) => ({ id })),
            },
            crimeTypes: {
              set: data.tags.map((id) => ({ id })),
            },
            offenders: getOffenders(),
            vehicles: getVehicles(),
            crimeGroups: getCrimeGroups(),
            images: {
              upload:
                imageChange && fileList.length
                  ? fileList
                      .filter((item) => !item.optimised)
                      .map((item) => ({
                        url: {
                          filename: item.fileName || '',
                          mimetype: item.type || '',
                          url: item.url || '',
                        },
                      }))
                      .filter((obj) => obj.url !== undefined)
                  : undefined,

              disconnect: incidentData?.incident?.images
                .filter(
                  (image) =>
                    !fileList.map((item) => item.uid).includes(image.id)
                )
                .map((image) => ({
                  id: image.id,
                })),
            },
          },
        },
      });
    }
  };

  const onCancelNewImage = () => {
    setNewImage(null);
  };

  const setAssignToImage = (image: Image) => {
    setNewImage(image);
  };

  const onSearchBusiness = async (value: string) => {
    if (value.length < 2) {
      return [];
    }
    return client
      .query<SearchBusinessesQuery, SearchBusinessesQueryVariables>({
        query: SearchBusinessesDocument,
        variables: {
          where: {
            name: {
              contains: value,
              mode: QueryMode.Insensitive,
            },
            schemes: {
              some: {
                id: {
                  equals: schemeId,
                },
              },
            },
          },
        },
      })
      .then((response) =>
        response.data.listBusinesses.businesses.length
          ? response.data.listBusinesses.businesses.map((item) => ({
              label: item?.name || '',
              value: item?.id || '',
            }))
          : [
              {
                label: 'No results found',
                value: '',
                disabled: true,
              },
            ]
      );
  };

  return {
    addIncidentTag,
    addRecentOffender,
    adminRights: role !== Role.User,
    assignOffendersToImages,
    beforeUpload,
    crimeGroupsData,
    data: incidentData,
    fileList,
    goodsTypesData,
    groups:
      role === Role.SchemeAdmin
        ? groupData?.groups.map((group) => ({
            value: group.id,
            label: group.name,
          })) || []
        : groups.map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    imgChange,
    loading,
    newImage,
    offenderImgChange,
    offendersData,
    onCancelNewImage,
    onPreview,
    onReject,
    onSearchBusiness,
    onSubmit,
    recentOffenderData,
    recentOffenderLoading,
    removeCrimeGroup,
    removeImage,
    removeImageFromOffender,
    removeOffender,
    removeVehicle,
    saving,
    searchOffenders,
    setAddRecentOffender,
    setAssignToImage,
    setSearchOffenders,
    tags:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    toggleAddIncidentTag,
    updateCrimeGroupsData,
    updateIncidentTag,
    updateOffender,
    updateOffendersData,
    updateVehiclesData,
    vehiclesData,
  };
};

export default useEditIncident;
