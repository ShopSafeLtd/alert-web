import { useState } from 'react';
import {
  useViewIncidentQuery,
  useSchemeGroupsQuery,
  ViewIncidentQuery,
  Role,
  useTagsQuery,
  Model,
  useUpdateIncidentMutation,
  CreateTagMutation,
  TagsQuery,
  TagsDocument,
  Age,
  Gender,
  Race,
  Build,
  useListOffendersQuery,
} from 'graphql/generated';
import { useParams } from 'react-router-dom';
import { notification, Modal } from 'antd';
import { useStoreActions, useStoreState } from 'state';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { MutationUpdaterFn } from '@apollo/client';
import { Moment } from 'moment';

const { confirm } = Modal;

interface FormData {
  subject: string;
  description: string;
  date: Date;
  time: Moment;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
  groups: string[];
  tags: string[];
  images: { id: string; url: string; optimised: string }[];
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
  // images?: {
  //   id: string;
  //   optimised?: string | null;
  // }[];
}
interface Return {
  onSubmit: (value: FormData) => void;
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  imgChange: UploadProps['onChange'];
  fileList: UploadFile[];
  addIncidentTag: boolean;
  toggleAddIncidentTag: () => void;
  updateIncidentTag: MutationUpdaterFn<CreateTagMutation>;
  addOffender: boolean;
  toggleAddOffender: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  updateOffenderList: (value: OffenderData[] | undefined) => void;
  offendersData: OffenderData[] | undefined;
  deleteConfirm: (value: string | undefined) => void;
}

const useEditIncident = (): Return => {
  const incidentId = useParams().id;
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);

  const groups = useStoreState((state) => state.user.groups);
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
  const [offendersData, setOffendersData] = useState<
    OffenderData[] | undefined
  >([]);
  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Query
  const { data: IncidentData, loading } = useViewIncidentQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: incidentId,
      },
    },

    onCompleted: ({ incident }) => {
      if (incident?.offenders && incident.offenders.length > 0) {
        setOffendersData(incident.offenders);
      }

      if (incident?.images && incident.images.length > 0) {
        setFileList(
          incident?.images.map((image) => ({
            uid: `${image.id}`,
            name: `${image.id}.png`,
            status: 'done',
            url: `${image.url}`,
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

  const { data: ListOffendersData } = useListOffendersQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
    },
  });

  // update mutation
  // update tag list after adding a new item
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
        description: 'The Incident has been updated!',
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

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (incidentId) {
      updateIncident({
        variables: {
          where: {
            id: incidentId,
          },
          data: {
            subject: { set: data.subject },
            description: { set: data.description },
            date: { set: data.date },
            time: { set: data.time },
            location: {
              update: {
                building: { set: data.building },
                street: { set: data.street },
                townCity: { set: data.townCity },
                county: { set: data.county },
                postcode: { set: data.postcode },
              },
            },
            groups: {
              set: data.groups.map((id) => ({ id })),
            },
            crimeTypes: {
              set: data.tags.map((id) => ({ id })),
            },
            offenders: {
              connect:
                offendersData && offendersData.length > 0
                  ? offendersData.map((offender) => ({ id: offender.id }))
                  : undefined,
              create:
                offendersData && offendersData.length > 0
                  ? offendersData
                      .filter(
                        (item) =>
                          !ListOffendersData?.listOffenders?.offenders
                            ?.map((offender) => offender.id)
                            .includes(item.id)
                      )
                      .map((offender) => ({
                        name: offender.name || 'Unidentified Offender' || null,
                        gender: offender.gender || null,
                        race: offender.race || null,
                        build: offender.build || null,
                        hair: offender.hair || null,
                        peculiarities: offender.peculiarities || null,
                        age: offender.age || null,
                        dateSource: offender.dateSource || null,
                        dateOfBirth: offender.dateOfBirth || null,
                        groups:
                          offender.groups && offender.groups.length > 0
                            ? {
                                connect: offender.groups.map(({ id }) => ({
                                  id,
                                })),
                              }
                            : undefined,
                        scheme: { connect: { id: schemeId } },
                        createdBy: { connect: { id: userId } },
                        localId: offender.id,
                      }))
                  : undefined,

              delete:
                IncidentData?.incident?.offenders &&
                IncidentData.incident.offenders.length > 0
                  ? IncidentData.incident.offenders
                      .filter(
                        (offender) =>
                          !offendersData
                            ?.map((item) => item.id)
                            .includes(offender.id)
                      )
                      .map((offender) => ({ id: offender.id }))
                  : undefined,
            },

            images: {
              upload:
                imageChange && fileList.length > 0
                  ? fileList
                      .map((item) => ({
                        file: item.originFileObj,
                      }))
                      .filter((obj) => obj.file !== undefined)
                  : [],
              delete: imageChange
                ? IncidentData?.incident?.images
                    .filter(
                      (image) =>
                        !fileList.map((item) => item.uid).includes(image.id)
                    )
                    .map((image) => ({
                      id: image.id,
                    }))
                : [],
            },
          },
        },
      });
    }
  };
  // functions
  const imgChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImageChange(true);
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
  const deleteConfirm = (offenderId: string | undefined) => {
    confirm({
      title: 'Do you want to delete the exclusion?',
      content: 'This action cannot be undone.',
      onOk() {
        setOffendersData(
          offendersData?.filter((offender) => offender.id !== offenderId)
        );
      },
    });
  };

  return {
    onSubmit,
    data: IncidentData,
    loading,
    saving,
    groups:
      role === Role.SchemeAdmin
        ? groupData?.groups.map((group) => ({
            value: group.id,
            label: group.name,
          })) || []
        : groups
            .filter((group) => group.id === schemeId)
            .map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    tags:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    imgChange,
    fileList,
    addIncidentTag,
    toggleAddIncidentTag,
    updateIncidentTag,
    addOffender,
    toggleAddOffender,
    addExistingOffender,
    toggleAddExistingOffender,
    updateOffenderList,
    offendersData,
    deleteConfirm,
  };
};

export default useEditIncident;
