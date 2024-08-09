/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import type { MutationUpdaterFn } from '@apollo/client';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/lib/upload';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import type { ListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import type { EditIncidentQuery } from 'graphql/incidents/queries/__generated__/edit-incident.generated';
import type { ListOffendersQuery } from 'graphql/offenders/queries/__generated__/list-offenders.generated';
import type { CreateTagMutation } from 'graphql/tags/mutations/__generated__/create-tag.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import type { IncidentUpdateInput } from 'graphql/types';
import type {
  Image,
  OffenderData as OffenderDataGlobal,
  VehicleData,
} from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { useApolloClient } from '@apollo/client';
import { Modal, Upload, message, notification } from 'antd';
import { SearchBusinessesDocument } from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import { useListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import { useRecycleIncidentMutation } from 'graphql/incidents/mutations/__generated__/recycle-incident.generated';
import { useUpdateIncidentMutation } from 'graphql/incidents/mutations/__generated__/update-incident.generated';
import { useEditIncidentQuery } from 'graphql/incidents/queries/__generated__/edit-incident.generated';
import { useListOffendersQuery } from 'graphql/offenders/queries/__generated__/list-offenders.generated';
import {
  TagsDocument,
  useTagsQuery,
} from 'graphql/tags/queries/__generated__/tags.generated';
import {
  ImagePosition,
  Model,
  QueryMode,
  Role,
  SortOrder,
  TagType,
} from 'graphql/types';
import update from 'immutability-helper';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useStoreActions, useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

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
  building: string;
  business?: {
    label: React.ReactNode;
    value: string;
  };
  county: string;
  date: Date;
  description: string;
  goods: {
    goodsType?: string;
    id: string;
    recoveredValue: number;
    value?: number;
  }[];
  groups: string[];
  images: [{ id: string; optimised: string; url: string }];
  policeInvolved?: boolean;
  policeNo?: string;
  policeRef?: string;
  policeReported?: boolean;
  postcode: string;
  recoveredValue?: number;
  street: string;
  subject: string;
  tagsCrimeTypes: string[];
  tagsImpact: string[];
  tagsInvolved: string[];
  townCity: string;
  value?: number;
}

interface OffenderData extends OffenderDataGlobal {
  deleted: boolean;
  edited: boolean;
  existing: boolean;
  new: boolean;
}

export interface EditImage extends Image {
  offenders?: {
    id: string;
    name?: null | string | undefined;
  }[];
}

interface ImagePayload extends UploadFile {
  offenders?: {
    id: string;
    name?: null | string | undefined;
  }[];
  optimised?: null | string;
}
interface VehicleType extends VehicleData {
  deleted: boolean;
  edited: boolean;
  existing: boolean;
  new: boolean;
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
  crimeTypes: { label: string; value: string }[];
  data: EditIncidentQuery | undefined;
  fileList: EditImage[];
  goodsTypesData: ListGoodsTypesQuery | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  imgChange: UploadProps['onChange'];
  impactTags: { label: string; value: string }[];
  involvedTags: { label: string; value: string }[];
  loading: boolean;
  newImage: EditImage | null;
  offenderImgChange: (
    info: UploadChangeParam<UploadFile>,
    currentId: string
  ) => void;
  offendersData: OffenderData[];
  onAddOffender: (offender: OffenderDataGlobal, existing: boolean) => void;
  onAddVehicle: (data: VehicleData, existing: boolean) => void;
  onCancelNewImage: () => void;
  onEditImage: (value: EditImage) => void;
  onEditOffender: (offender: OffenderDataGlobal) => void;
  onEditVehicle: (data: VehicleData) => void;
  onReject: () => void;
  onRemoveOffender: (offenderId: string) => void;
  onRemoveVehicle: (vehicleId: string) => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  onSubmit: (value: FormData) => void;
  primaryImage: string;
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
  setPrimaryImage: (value: string) => void;
  setSearchOffenders: (value: string) => void;
  tagsLoading: boolean;
  toggleAddIncidentTag: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  vehiclesData: VehicleType[];
}

const useEditIncident = ({ incidentId, reviewed }: Props): Return => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
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
  const [fileList, setFileList] = useState<EditImage[]>([]);
  const [newImage, setNewImage] = useState<EditImage | null>(null);
  const [editedOffender, setEditedOffender] = useState<
    OffenderData | undefined
  >();
  const [primaryImage, setPrimaryImage] = useState<string>('');

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
  }, [editedOffender, offendersData]);
  // Query
  const { data: incidentData, loading } = useEditIncidentQuery({
    fetchPolicy: 'cache-and-network',
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
            deleted: false,
            edited: false,
            existing: false,
            new: false,
          }))
        );
      }
      // imageList
      if (incident?.images && incident.images.length > 0) {
        setFileList(
          incident?.images.map((image) => ({
            edited: false,
            name: `${image.id}.png`,
            new: false,
            offenders: image.offenders,
            optimised: `${image.optimised || ''}`,
            policeImage: image.policeImage || false,
            position: image.position,
            primary: image.primary || false,
            rotation: image.rotation || 0,
            status: 'done',
            uid: `${image.id}`,
            url: `${image.optimised || ''}`,
          }))
        );
        const findPrimaryImage = incident?.images.find(
          ({ primary }) => primary
        )?.id;
        if (findPrimaryImage) setPrimaryImage(findPrimaryImage);
      }
    },

    variables: {
      where: {
        id: incidentId,
      },
    },
  });

  const { groups, groupsLoading } = useGroupsContext();

  useEffect(() => {
    if (groups)
      setIncidentsState({
        order,
        pagination,
        variables: {
          ...variables,
          groups: groups.map((group) => group.value),
        },
      });
  }, [groups]);

  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        dataType: {
          equals: Model.Incident,
        },
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
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
        order: {
          updatedAt: SortOrder.Desc,
        },
        scheme: {
          id: schemeId,
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
          dataType: {
            equals: Model.Incident,
          },
          scheme: { id: { equals: schemeId } },
        },
      },
    });

    if (existingData === null) return;

    store.writeQuery<TagsQuery>({
      data: {
        __typename: 'Query',
        tags: [...existingData.tags, res.createTag],
      },
      query: TagsDocument,
      variables: {
        where: {
          dataType: {
            equals: Model.Incident,
          },
          scheme: { id: { equals: schemeId } },
        },
      },
    });
  };

  const [updateIncident] = useUpdateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: reviewed
          ? intl.formatMessage({
              defaultMessage: 'The Incident has been approved!',
            })
          : intl.formatMessage({
              defaultMessage: 'The Incident has been updated!',
            }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        placement: 'bottomRight',
      });
      navigate(`/app/incidents/view/${incidentId}`);
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  // delete incident
  const [recycleIncident] = useRecycleIncidentMutation({
    onCompleted: () => {
      navigate('/app/incidents');
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'The incident has been deleted from the feed and moved to the recycle bin.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Rejected!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });
  const onReject = () => {
    confirm({
      content: intl.formatMessage({
        defaultMessage:
          'Click reject if you wish to reject the approving of this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      }),
      okText: intl.formatMessage({ defaultMessage: 'Reject' }),
      onOk() {
        void recycleIncident({
          variables: {
            where: { id: incidentId },
          },
        });
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
    });
  };

  // functions
  const beforeUpload = (file: RcFile) => {
    const isFileDuplicate = fileList.find((item) => item.name === file.name);
    if (isFileDuplicate) {
      void message.error(
        intl.formatMessage({
          defaultMessage:
            'This image already exists, please choose another one.',
        })
      );
    }

    return !isFileDuplicate || Upload.LIST_IGNORE;
  };
  const imgChange: UploadProps['onChange'] = (info) => {
    if (info.file.response) {
      setNewImage({
        ...info.file,
        edited: false,
        fileName: info.file.response[0].blobName,
        new: true,
        position: ImagePosition.CenterCenter,
        type: info.file.response[0].mimetype,
        url: info.file.response[0].url,
      });
      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          edited: false,
          fileName: info.file.response[0].blobName,
          new: true,
          position: ImagePosition.CenterCenter,
          type: info.file.response[0].mimetype,
          url: info.file.response[0].url,
        },
      ]);
      setImageChange(true);
    } else {
      setFileList(info.fileList as EditImage[]);
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

  const onEditImage = (value: EditImage) => {
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
          edited: false,
          name: image.fileName || '',
          new: true,
          offenders: [
            {
              id: offender.id,
              name: offender.name,
            },
          ],
          optimised: image.optimised,
          position: ImagePosition.CenterCenter,
          type: image.type || '',
          uid: image.id || '',
          url: image.url || '',
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
                deleted: true,
                edited: false,
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
        deleted: false,
        edited: false,
        existing,
        new: !existing,
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
      if (offender?.images)
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
            fileName: info.file.response[0].blobName,
            offenders: [currentOffender],
            type: info.file.response[0].mimetype,
            uid: info.file.uid,
            url: info.file.response[0].url,
          },
          offenders: [currentOffender].map((offender) => {
            let images: OffenderData['images'] = [];
            if (offender.images) images = offender.images;
            return {
              ...offender,
              images: [
                ...images,
                {
                  fileName: info.file.response[0].blobName,
                  id: info.file.uid,
                  new: true,
                  optimised: info.file.response[0].url,
                  type: info.file.response[0].mimetype,
                  url: info.file.response[0].url,
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
          edited: false,
          fileName: info.fileList[0].fileName,
          new: true,
          position: ImagePosition.CenterCenter,
          type: info.fileList[0].type,
          url: info.fileList[0].url,
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
                  age: offender.age || null,
                  build: offender.build || null,
                  comment: offender.comment || null,
                  createdBy: { connect: { id: userId } },
                  dateOfBirth: offender.dateOfBirth || null,
                  dateSource: offender.dateSource || null,
                  gender: offender.gender || null,
                  groups:
                    data.groups.length > 0
                      ? { connect: data.groups.map((id) => ({ id })) }
                      : undefined,
                  hair: offender.hair || null,
                  height: offender.height || null,
                  images:
                    offender?.images &&
                    offender.images.length > 0 &&
                    offender.images?.filter((image) => image.new === true)
                      ? {
                          connect:
                            offender.images
                              ?.filter((image) => image.new === true)
                              .map((image) => ({
                                id: image.id,
                              })) || [],
                        }
                      : undefined,
                  localId: offender.id,
                  name: offender.name,
                  peculiarities: offender.peculiarities || null,
                  race: offender.race || null,
                  scheme: { connect: { id: schemeId } },
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
          create:
            newVehicles.length > 0
              ? newVehicles.map((vehicle) => ({
                  colour: vehicle.colour,
                  crimeGroup:
                    vehicle.crimeGroup && vehicle.crimeGroup.length > 0
                      ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                      : undefined,
                  groups: {
                    connect:
                      groups && groups.length === 1
                        ? groups.map(({ value: id }) => ({ id }))
                        : data.groups.map((id) => ({ id })),
                  },
                  make: vehicle.make,
                  model: vehicle.model,
                  offenders:
                    vehicle.offenders && vehicle.offenders.length > 0
                      ? { connect: vehicle.offenders.map((id) => ({ id })) }
                      : undefined,
                  registration: vehicle.registration,
                }))
              : undefined,
          disconnect:
            removeVehicles && removeVehicles.length > 0
              ? removeVehicles.map(({ id }) => ({ id }))
              : undefined,

          update: editedVehicles.map((vehicle) => ({
            data: {
              colour: { set: vehicle.colour },
              crimeGroup:
                vehicle.crimeGroup && vehicle.crimeGroup.length > 0
                  ? { connect: vehicle.crimeGroup?.map((id) => ({ id })) }
                  : undefined,
              groups: {
                connect:
                  groups && groups.length === 1
                    ? groups.map(({ value: id }) => ({ id }))
                    : data.groups.map((id) => ({ id })),
              },
              incidents: vehicle.incidents
                ? { connect: vehicle.incidents.map((id) => ({ id })) }
                : undefined,
              make: { set: vehicle.make },
              model: { set: vehicle.model },
              offenders:
                vehicle.offenders && vehicle.offenders.length > 0
                  ? { connect: vehicle.offenders.map((id) => ({ id })) }
                  : undefined,
              registration: { set: vehicle.registration },
            },
            where: { id: vehicle.id },
          })),
        };
      };
      const getImages = (): IncidentUpdateInput['images'] => {
        const editedImages = fileList.filter(
          (item) => item.edited && !item.new
        );

        return {
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
                    policeImage: { set: item.policeImage },
                    position: { set: item.position },
                    primary: { set: item.uid === primaryImage },
                    rotation: { set: item.rotation },
                  },
                  where: {
                    id: item.uid,
                  },
                }))
              : undefined,
          upload:
            imageChange && fileList.length > 0
              ? fileList
                  .filter((item) => !item.optimised)
                  .map((item) => ({
                    policeImage: item.policeImage,
                    position: item.position,
                    primary: item.uid === primaryImage,
                    rotation: item.rotation || 0,
                    url: {
                      filename: item.fileName || '',
                      mimetype: item.type || '',
                      url: item.url || '',
                    },
                  }))
                  .filter((obj) => obj.url !== undefined)
              : undefined,
        };
      };

      void updateIncident({
        variables: {
          data: {
            approved: { set: true },
            business: {
              connect: data.business?.value
                ? {
                    id: data.business.value,
                  }
                : undefined,
              // ???
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              disconnect:
                incidentData?.incident?.business?.id &&
                data.business?.value === undefined
                  ? true
                  : undefined,
            },
            crimeTypes: {
              set: [
                ...data.tagsCrimeTypes.map((id) => ({ id })),
                ...data.tagsImpact.map((id) => ({ id })),
                ...data.tagsInvolved.map((id) => ({ id })),
              ],
            },
            date: { set: data.date },
            description: { set: data.description },
            groups: {
              set: data.groups.map((id) => ({ id })),
            },
            images: getImages(),
            incidentItems:
              data.goods?.length > 0
                ? {
                    create:
                      data.goods
                        .filter((item) => !item.id)
                        .map((item) => ({
                          goodsType: {
                            connect: {
                              id: item.goodsType || '',
                            },
                          },
                          name:
                            goodsTypesData?.listGoodsTypes.goodsTypes.find(
                              ({ id }) => id === item.goodsType
                            )?.name || '',
                          recoveredValue: item.recoveredValue || 0,
                          value: item.value || 0,
                        })) || undefined,
                    update:
                      data.goods
                        .filter((item) => item.id)
                        .map((item) => ({
                          data: {
                            goodsType: {
                              connect: {
                                id: item.goodsType || '',
                              },
                            },
                            name: {
                              set:
                                goodsTypesData?.listGoodsTypes.goodsTypes.find(
                                  ({ id }) => id === item.goodsType
                                )?.name || '',
                            },
                            recoveredValue: { set: item.recoveredValue || 0 },
                            value: { set: item.value || 0 },
                          },
                          where: { id: item.id },
                        })) || undefined,
                  }
                : undefined,
            location: {
              upsert: {
                create: {
                  building: data.building || '',
                  county: data.county || '',
                  postcode: data.postcode || '',
                  premises: '',
                  street: data.street || '',
                  townCity: data.townCity || '',
                },
                update: {
                  building: { set: data.building || '' },
                  county: { set: data.county || '' },
                  postcode: { set: data.postcode || '' },
                  premises: { set: '' },
                  street: { set: data.street || '' },
                  townCity: { set: data.townCity || '' },
                },
              },
            },
            offenders: getOffenders(),
            policeInvolved: { set: data.policeInvolved },
            policeNo: { set: data.policeNo },
            policeRef: { set: data.policeRef },
            policeReported: { set: data.policeReported },
            recoveredValue: { set: data.recoveredValue || 0 },
            subject: { set: data.subject },
            time: { set: data.date },
            value: { set: data.value || 0 },
            vehicles: getVehicles(),
          },
          where: {
            id: incidentId,
          },
        },
      });
    } else {
      confirm({
        cancelText: intl.formatMessage({
          defaultMessage: 'Find Offenders',
        }),
        content: intl.formatMessage({
          defaultMessage:
            'Please select or add at least one offender for the incident.',
        }),
        okText: intl.formatMessage({
          defaultMessage: 'Add New Offender',
        }),
        onCancel: toggleAddExistingOffender,
        onOk: toggleAddOffender,
        title: intl.formatMessage({
          defaultMessage: 'No Offenders',
        }),
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
      edited: false,
      new: false,
      position: ImagePosition.CenterCenter,
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
              location: item?.locations[0].full || '',
              value: item?.id || '',
            }))
          : [
              {
                disabled: true,
                label: intl.formatMessage({
                  defaultMessage: 'No results found',
                }),
                value: '',
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
    crimeTypes:
      tagsData?.tags
        .filter((item) => item.type === TagType.IncidentCrimeType)
        .map((tag) => ({ label: tag.name, value: tag.id })) || [],
    data: incidentData,
    fileList,
    goodsTypesData,
    groups,
    groupsLoading,
    imgChange,
    impactTags:
      tagsData?.tags
        .filter((item) => item.type === TagType.IncidentImpact)
        .map((tag) => ({ label: tag.name, value: tag.id })) || [],
    involvedTags:
      tagsData?.tags
        .filter((item) => item.type === TagType.IncidentInvolved)
        .map((tag) => ({ label: tag.name, value: tag.id })) || [],
    loading,
    newImage,
    offenderImgChange,
    offendersData: offendersData.filter((item) => !item.deleted),
    onAddOffender,
    onAddVehicle,
    onCancelNewImage,
    onEditImage,
    onEditOffender,
    onEditVehicle,
    onReject,
    onRemoveOffender,
    onRemoveVehicle,
    onSearchBusiness,
    onSubmit,
    primaryImage,
    recentOffenderData,
    recentOffenderLoading,
    removeImage,
    removeImageFromOffender,
    saving,
    searchOffenders,
    setAddRecentOffender,
    setAssignToImage,
    setPrimaryImage,
    setSearchOffenders,
    tagsLoading,
    toggleAddIncidentTag,
    updateIncidentTag,
    vehiclesData: vehiclesData.filter((item) => !item.deleted),
  };
};

export default useEditIncident;
