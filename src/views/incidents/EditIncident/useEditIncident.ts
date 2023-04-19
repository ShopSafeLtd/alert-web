import { useEffect, useState } from 'react';
import type {
  CreateTagMutation,
  EditIncidentQuery,
  IncidentUpdateInput,
  ListGoodsTypesQuery,
  ListOffendersQuery,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
  TagsQuery,
} from 'graphql/generated';
import {
  TagType,
  ImagePosition,
  Model,
  QueryMode,
  Role,
  SearchBusinessesDocument,
  SortOrder,
  TagsDocument,
  useListGoodsTypesQuery,
  useListOffendersQuery,
  useRecycleIncidentMutation,
  useSchemeGroupsQuery,
  useTagsQuery,
  useUpdateIncidentMutation,
  useEditIncidentQuery,
} from 'graphql/generated';
import { message, Modal, notification, Upload } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { MutationUpdaterFn } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router';
import update from 'immutability-helper';
import type { UploadChangeParam } from 'antd/lib/upload';
import type {
  VehicleData,
  OffenderData as OffenderDataGlobal,
} from 'types/DataType';

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
  policeNo?: string;
  goods: {
    id: string;
    goodsType?: string;
    value?: number;
    recoveredValue: number;
  }[];
  business?: {
    label: React.ReactNode;
    value: string;
  };
  groups: string[];
  tagsCrimeTypes: string[];
  tagsInvolved: string[];
  tagsImpact: string[];
  images: [{ id: string; url: string; optimised: string }];
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface OffenderData extends OffenderDataGlobal {
  new: boolean;
  existing: boolean;
  edited: boolean;
  deleted: boolean;
}

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  optimised?: string | null;
  edited?: boolean;
  position: ImagePosition;
  new?: boolean;
}

interface ImagePayload extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  optimised?: string | null;
}
interface VehicleType extends VehicleData {
  edited: boolean;
  new: boolean;
  existing: boolean;
  deleted: boolean;
}

interface Return {
  addIncidentTag: boolean;
  addRecentOffender: Offender | null;
  adminRights: boolean;
  assignOffendersToImages: (data: {
    image: ImagePayload;
    offenders: OffenderDataGlobal[];
  }) => void;
  beforeUpload: (value: RcFile) => void;
  data: EditIncidentQuery | undefined;
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
  onPreview: (value: ImagePayload) => void;
  onReject: () => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  onSubmit: (value: FormData) => void;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  removeImage: (uid: string) => void;
  removeImageFromOffender: (data: {
    image: ImagePayload;
    offenderId: string;
  }) => void;
  saving: boolean;
  searchOffenders: string;
  setAddRecentOffender: (value: Offender | null) => void;
  setAssignToImage: (image: ImagePayload) => void;
  setSearchOffenders: (value: string) => void;
  crimeTypes: { value: string; label: string }[];
  involvedTags: { value: string; label: string }[];
  impactTags: { value: string; label: string }[];
  tagsLoading: boolean;
  toggleAddIncidentTag: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  vehiclesData: VehicleType[];
  onAddOffender: (offender: OffenderDataGlobal, existing: boolean) => void;
  onEditOffender: (offender: OffenderDataGlobal) => void;
  onRemoveOffender: (offenderId: string) => void;
  onEditImage: (value: Image) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onEditVehicle: (data: VehicleData) => void;
  onRemoveVehicle: (vehicleId: string) => void;
}

const onPreview = async (file: UploadFile) => {
  let src = file.url as string;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as RcFile);
      reader.addEventListener('load', () => resolve(reader.result as string));
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};

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

  const [vehiclesData, setVehiclesData] = useState<VehicleType[]>([]);

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
  const { data: incidentData, loading } = useEditIncidentQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: incidentId,
      },
    },

    onCompleted: ({ incident }) => {
      if (incident?.offenders && incident.offenders.length > 0) {
        setOffendersData(
          incident.offenders.map((offender) => ({
            ...offender,
            deleted: false,
            edited: false,
            existing: false,
            new: false,
          }))
        );
      }
      if (incident?.vehicles && incident.vehicles.length > 0) {
        setVehiclesData(
          incident.vehicles.map((item) => ({
            ...item,
            edited: false,
            deleted: false,
            existing: false,
            new: false,
          }))
        );
      }
      // imageList
      if (incident?.images && incident.images.length > 0) {
        setFileList(
          incident?.images.map((image) => ({
            uid: `${image.id}`,
            name: `${image.id}.png`,
            status: 'done',
            url: `${image.optimised}`,
            optimised: `${image.optimised}`,
            offenders: image.offenders,
            edited: false,
            position: image.position,
            new: false,
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
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
        },
        dataType: {
          equals: Model.Incident,
        },
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
        where:
          searchOffenders.length > 0
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
        edited: false,
        position: ImagePosition.CenterCenter,
        new: true,
      });
      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          url: info.file.response[0].url,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
          edited: false,
          position: ImagePosition.CenterCenter,
          new: true,
        },
      ]);
      setImageChange(true);
    } else {
      setFileList(info.fileList as Image[]);
      setImageChange(true);
    }
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

  const onEditImage = (value: Image) => {
    const index = fileList.map((item) => item.uid).indexOf(value.uid);
    setFileList(
      update(fileList, {
        [index]: {
          $set: {
            ...value,
            edited: !value.new,
          },
        },
      })
    );
  };

  const onAddOffender = (offender: OffenderDataGlobal, existing: boolean) => {
    setOffendersData([
      ...offendersData,
      {
        ...offender,
        deleted: false,
        edited: false,
        existing,
        new: !existing,
      },
    ]);
    if (!existing && offender.images) {
      setFileList([
        ...fileList,
        ...offender.images.map((image) => ({
          uid: image.id || '',
          name: image.fileName || '',
          type: image.type || '',
          url: image.url || '',
          optimised: image.optimised,
          offenders: [
            {
              id: offender.id,
              name: offender.name,
            },
          ],
          edited: false,
          position: ImagePosition.CenterCenter,
          new: true,
        })),
      ]);
    }
  };

  const onEditOffender = (offender: OffenderDataGlobal) => {
    const existingOffender = offendersData.find(
      (item) => item.id === offender.id
    );
    if (existingOffender) {
      const index = offendersData
        .map((item) => item.id)
        .indexOf(existingOffender.id);
      setOffendersData(
        update(offendersData, {
          [index]: {
            $set: {
              ...existingOffender,
              edited: !existingOffender.new,
            },
          },
        })
      );
    }
  };

  const onRemoveOffender = (offenderId: string) => {
    const existingOffender = offendersData.find(
      (item) => item.id === offenderId
    );
    if (existingOffender) {
      if (existingOffender.new || existingOffender.existing) {
        setOffendersData(
          offendersData.filter((item) => item.id !== offenderId)
        );
      }
      if (!existingOffender.new && !existingOffender.existing) {
        const index = offendersData
          .map((item) => item.id)
          .indexOf(existingOffender.id);
        setOffendersData(
          update(offendersData, {
            [index]: {
              $set: {
                ...existingOffender,
                edited: false,
                deleted: true,
              },
            },
          })
        );
      }
    }
  };

  const onAddVehicle = (vehicle: VehicleData, existing: boolean) => {
    setVehiclesData([
      ...vehiclesData,
      {
        ...vehicle,
        new: !existing,
        existing,
        deleted: false,
        edited: false,
      },
    ]);
  };

  const onRemoveVehicle = (vehicleId: string) => {
    const vehicle = vehiclesData.find((item) => item.id === vehicleId);

    if (vehicle?.new || vehicle?.existing) {
      setVehiclesData(vehiclesData.filter((item) => item.id !== vehicleId));
    } else {
      const index = vehiclesData.map((item) => item.id).indexOf(vehicleId);
      setVehiclesData(
        update(vehiclesData, {
          [index]: {
            deleted: {
              $set: true,
            },
            edited: {
              $set: false,
            },
          },
        })
      );
    }
  };

  const onEditVehicle = (value: VehicleData) => {
    const vehicle = vehiclesData.find((item) => item.id === value.id);
    if (vehicle) {
      const index = vehiclesData.map((item) => item.id).indexOf(value.id);
      setVehiclesData(
        update(vehiclesData, {
          [index]: {
            $set: {
              ...vehicle,
              ...value,
              edited: !vehicle.new,
            },
          },
        })
      );
    }
  };

  const removeImage = (uid: string) => {
    setFileList(fileList.filter((image) => image.uid !== uid));
  };
  const removeImageFromOffender = (data: {
    image: ImagePayload;
    offenderId: string;
  }) => {
    // find index of file in fileList array
    const file = fileList.find(({ uid }) => uid === data.image.uid);
    const fileIndex = fileList.map(({ uid }) => uid).indexOf(data.image.uid);
    // update the file object in the array with the new value, update will replace value in same place in array
    if (file)
      setFileList(
        update(fileList, {
          [fileIndex]: {
            $set: {
              ...file,
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
    image: ImagePayload;
    offenders: OffenderDataGlobal[];
  }) => {
    if (offendersData) {
      const changedOffendersIds = new Set(data.offenders.map(({ id }) => id));
      const originalOffendersIds = new Set(offendersData.map(({ id }) => id));
      const originalImageOffendersIds =
        fileList
          .find(({ uid }) => uid === data.image.uid)
          ?.offenders?.map(({ id }) => id) || [];
      const updatedOffenders = offendersData
        .map((offender) => {
          if (changedOffendersIds.has(offender.id))
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
        // @ts-expect-error type mismatch
        .filter(isOffenderData);
      const newOffenders = data.offenders.filter(
        (offender) => !originalOffendersIds.has(offender.id)
      );

      setOffendersData([
        ...updatedOffenders,
        ...newOffenders.map((offender) => ({
          ...offender,
          deleted: false,
          edited: false,
          existing: false,
          new: false,
        })),
      ]);
    }

    // find index of file in fileList array
    const file = fileList.find(({ uid }) => uid === data.image.uid);
    const fileIndex = fileList.map(({ uid }) => uid).indexOf(data.image.uid);
    // update the file object in the array with the new value, update will replace value in same place in array
    if (file) {
      setFileList(
        update(fileList, {
          [fileIndex]: {
            $set: {
              ...file,
              ...data.image,
            },
          },
        })
      );
    }

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
          edited: false,
          position: ImagePosition.CenterCenter,
          new: true,
        },
      ]);
    }
  };

  const onSubmit = (data: FormData) => {
    setSaving(true);

    if (offendersData) {
      const getOffenders = (): IncidentUpdateInput['offenders'] => {
        const existingOffenders = offendersData.filter((item) => item.existing);
        const newOffenders = offendersData.filter((item) => item.new);
        const deletedOffenders = offendersData.filter((item) => item.deleted);

        return {
          connect:
            existingOffenders.length > 0
              ? existingOffenders.map((offender) => ({ id: offender.id }))
              : undefined,
          create:
            newOffenders.length > 0
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
                  groups:
                    data.groups.length > 0
                      ? { connect: data.groups.map((id) => ({ id })) }
                      : undefined,
                  scheme: { connect: { id: schemeId } },
                  createdBy: { connect: { id: userId } },
                  localId: offender.id,
                  images:
                    offender?.images &&
                    offender.images.length > 0 &&
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
          disconnect:
            deletedOffenders.length > 0
              ? deletedOffenders.map((offender) => ({ id: offender.id }))
              : undefined,
        };

        return {
          connect: undefined,
          create: undefined,
        };
      };

      const getVehicles = (): IncidentUpdateInput['vehicles'] => {
        const removeVehicles = vehiclesData?.filter((item) => item.deleted);
        const newVehicles = vehiclesData.filter((item) => item.new);
        const existingVehicles = vehiclesData.filter((item) => item.existing);
        const editedVehicles = existingVehicles.filter((item) => item.edited);
        return {
          connect:
            existingVehicles.length > 0
              ? existingVehicles.map(({ id }) => ({ id }))
              : undefined,
          disconnect:
            removeVehicles && removeVehicles.length > 0
              ? removeVehicles.map(({ id }) => ({ id }))
              : undefined,
          update: editedVehicles.map((vehicle) => ({
            where: { id: vehicle.id },
            data: {
              make: { set: vehicle.make },
              model: { set: vehicle.model },
              colour: { set: vehicle.colour },
              registration: { set: vehicle.registration },
              crimeGroup:
                vehicle.crimeGroup && vehicle.crimeGroup.length > 0
                  ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                  : undefined,
              incidents: vehicle.incidents
                ? { connect: vehicle.incidents.map((id) => ({ id })) }
                : undefined,
              offenders:
                vehicle.offenders && vehicle.offenders.length > 0
                  ? { connect: vehicle.offenders.map((id) => ({ id })) }
                  : undefined,
            },
          })),

          create:
            newVehicles.length > 0
              ? newVehicles.map((vehicle) => ({
                  make: vehicle.make,
                  model: vehicle.model,
                  colour: vehicle.colour,
                  registration: vehicle.registration,
                  crimeGroup:
                    vehicle.crimeGroup && vehicle.crimeGroup.length > 0
                      ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                      : undefined,
                  offenders:
                    vehicle.offenders && vehicle.offenders.length > 0
                      ? { connect: vehicle.offenders.map((id) => ({ id })) }
                      : undefined,
                }))
              : undefined,
        };
      };
      const getImages = (): IncidentUpdateInput['images'] => {
        const editedImages = fileList.filter(
          (item) => item.edited && !item.new
        );

        return {
          upload:
            imageChange && fileList.length > 0
              ? fileList
                  .filter((item) => !item.optimised)
                  .map((item) => ({
                    url: {
                      filename: item.fileName || '',
                      mimetype: item.type || '',
                      url: item.url || '',
                    },
                    position: item.position,
                  }))
                  .filter((obj) => obj.url !== undefined)
              : undefined,
          disconnect: incidentData?.incident?.images
            .filter(
              (image) => !fileList.map((item) => item.uid).includes(image.id)
            )
            .map(({ id }) => ({
              id,
            })),
          update:
            editedImages.length > 0
              ? editedImages.map((item) => ({
                  data: {
                    position: { set: item.position },
                  },
                  where: {
                    id: item.uid,
                  },
                }))
              : undefined,
        };
      };

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
            location: {
              update: {
                building: { set: data.building || '' },
                street: { set: data.street || '' },
                townCity: { set: data.townCity || '' },
                county: { set: data.county || '' },
                postcode: { set: data.postcode || '' },
              },
            },
            business: {
              connect: data.business?.value
                ? {
                    id: data.business.value,
                  }
                : undefined,
              disconnect:
                incidentData?.incident?.business?.id &&
                data.business?.value === undefined
                  ? true
                  : undefined,
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
              set: [
                ...data.tagsCrimeTypes.map((id) => ({ id })),
                ...data.tagsImpact.map((id) => ({ id })),
                ...data.tagsInvolved.map((id) => ({ id })),
              ],
            },
            offenders: getOffenders(),
            vehicles: getVehicles(),
            images: getImages(),
          },
        },
      });
    } else {
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
    }
  };

  const onCancelNewImage = () => {
    setNewImage(null);
  };

  const setAssignToImage = (image: ImagePayload) => {
    setNewImage({
      ...image,
      position: ImagePosition.CenterCenter,
      edited: false,
      new: false,
    });
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
        response.data.listBusinesses.businesses.length > 0
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
    offendersData: offendersData.filter((item) => !item.deleted),
    onCancelNewImage,
    onPreview,
    onReject,
    onSearchBusiness,
    onSubmit,
    recentOffenderData,
    recentOffenderLoading,
    removeImage,
    removeImageFromOffender,
    saving,
    searchOffenders,
    setAddRecentOffender,
    setAssignToImage,
    setSearchOffenders,
    crimeTypes:
      tagsData?.tags
        .filter((item) => item.type === TagType.IncidentCrimeType)
        .map((tag) => ({ value: tag.id, label: tag.name })) || [],
    impactTags:
      tagsData?.tags
        .filter((item) => item.type === TagType.IncidentImpact)
        .map((tag) => ({ value: tag.id, label: tag.name })) || [],
    involvedTags:
      tagsData?.tags
        .filter((item) => item.type === TagType.IncidentInvolved)
        .map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    toggleAddIncidentTag,
    updateIncidentTag,
    vehiclesData: vehiclesData.filter((item) => !item.deleted),
    onAddOffender,
    onEditOffender,
    onRemoveOffender,
    onEditImage,
    onAddVehicle,
    onEditVehicle,
    onRemoveVehicle,
  };
};

export default useEditIncident;
