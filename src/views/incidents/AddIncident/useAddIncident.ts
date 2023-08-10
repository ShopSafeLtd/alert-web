/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Form, Modal, notification } from 'antd';
import type {
  AddressesQuery,
  Age,
  Build,
  CreateIncidentData,
  CreateIncidentMutation,
  Gender,
  Height,
  IdSource,
  ListIncidentsQuery,
  PoliceResponseTime,
  Race,
} from 'graphql/generated';
import {
  AnswerType,
  GoodsMode,
  IncidentFormField,
  ListIncidentsDocument,
  Model,
  Role,
  useAddressesQuery,
  useCreateIncidentMutation,
  useListGoodsTypesQuery,
  useListIncidentTagsQuery,
  useSchemeGroupsQuery,
  useTagsQuery,
} from 'graphql/generated';
import moment from 'moment';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'state';
import type { CustomQuestion, Image, LocationData } from 'types/DataType';
import Mixpanel from 'utils/mixpanel';
import { useIntl } from 'react-intl';
import type { StateOffenderData } from 'components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import type { StateVehicleData } from 'components/incidents/IncidentForm/Profiles/Vehicles/useVehicles';
import type { StateImageData } from 'components/incidents/IncidentForm/ImageSection/useImageSection';

const { useForm } = Form;
const { confirm } = Modal;

export interface OffenderData {
  id: string;
  confirmedInIncident: boolean;
  reference?: number | null;
  name?: string | null;
  alias?: string[] | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  height?: Height | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  comment?: string | null;
  approved?: boolean | null;
  updatedAt?: Date;
  images?: {
    id: string;
    url?: string | null | undefined;
    new: boolean;
    boundingBox?: {
      height: string;
      left: string;
      top: string;
      width: string;
    };
  }[];
  imageUid?: string[] | undefined;
  idVerified?: boolean;
  idSource?: IdSource;
  new: boolean;
  existing: boolean;
  edited: boolean;
}

export interface FormData {
  subject: string;
  description: string;
  date: Date;
  value?: number;
  recoveredValue?: number;
  policeReported?: boolean;
  policeInvolved?: boolean;
  policeRef?: string;
  policeNo?: string;
  policeResponse: PoliceResponseTime;
  business?: {
    label: React.ReactNode;
    value: string;
  };
  groups: string[];
  tags: string[];
  images?: StateImageData[];
  goods?: {
    goodsType?: string;
    value?: number;
    recoveredValue?: number;
    quantity?: number;
    recoveredQuantity?: number;
    sku?: string;
  }[];
  offenders: StateOffenderData[] | null;
  vehicles: StateVehicleData[] | null;
  involvedTags?: [];
  fellingTags?: [];
}

export interface NewImage extends Image {
  offenders?: {
    id: string;
    name?: string | undefined | null;
    new?: boolean;
  }[];
}

export interface VehicleData {
  id: string;
  make?: string | null | undefined;
  model?: string | null | undefined;
  colour?: string | null | undefined;
  reference?: number | null;
  registration?: string | null | undefined;
  new: boolean;
  existing: boolean;
  edited: boolean;
}

interface Return {
  addressLoading: boolean;
  adminRights: boolean;
  form: FormInstance<FormData>;
  isTheft: boolean;
  onSubmit: (value: FormData) => void;
  onValuesChange: (changedValues: FormData, values: FormData) => void;
  primaryAddress:
    | Exclude<AddressesQuery['addresses'], undefined | null>[0]
    | undefined;
  saving: boolean;
  addNewAddress: boolean;
  toggleAddNewAddress: () => void;
  updateNewAddressData: (value: LocationData | undefined) => void;
  newAddressData: LocationData | undefined;
  goodsVisible: boolean;
  dontKnowGoods: () => void;
  knowGoods: () => void;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  incidentForm: IncidentFormField[];
  customQuestions: CustomQuestion[];
  goodsMode: GoodsMode;
}

const useAddIncident = (): Return => {
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const businesses = useStoreState((state) => state.user.businesses);
  const role = useStoreState((state) => state.user.role);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const order = useStoreState((state) => state.data.incidents.order);
  const goodsMode = useStoreState((state) => state.scheme.goodsMode);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );

  const [goodsVisible, setGoodsVisible] = useState(false);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [newAddressData, setNewAddressData] = useState<LocationData>();
  const [primaryImage, setPrimaryImage] = useState<string>('');

  const [isTheft] = useState(false);
  const [descriptionPristine, setDescriptionPristine] = useState(true);
  const [saving, setSaving] = useState(false);
  const [incidentForm, setIncidentForm] = useState<IncidentFormField[]>([
    IncidentFormField.Types,
  ]);
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);

  useEffect(() => {
    Mixpanel.track('Start new incident form');
  }, []);

  useEffect(() => {
    if (businesses.length > 0) {
      form.setFieldsValue({
        business: {
          label: businesses[0].name,
          value: businesses[0].id,
        },
      });
    }
  }, [businesses]);

  const navigate = useNavigate();

  // Query
  const { data: groupData } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users:
          role === Role.User
            ? {
                some: {
                  id: {
                    equals: userId,
                  },
                },
              }
            : undefined,
      },
    },
    fetchPolicy: 'cache-and-network',
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

  const { data: goodsTypesData } = useListGoodsTypesQuery();

  const { data: addressData, loading: addressLoading } = useAddressesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        user: {
          id: {
            equals: userId,
          },
        },
      },
    },
  });

  const { data: tagsData } = useTagsQuery({
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
        dataType: {
          equals: Model.Incident,
        },
      },
    },
  });

  const { data: incidentTagsData } = useListIncidentTagsQuery({
    variables: {
      where: {
        schemeId,
      },
    },
  });

  // update incident list after adding a new item
  const updateIncident: MutationUpdaterFn<CreateIncidentMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;
    if (res.createIncident === null || res.createIncident === undefined) return;
    // get existing group list data from Apollo store
    const existingData = store.readQuery<ListIncidentsQuery>({
      query: ListIncidentsDocument,
      variables: {
        scheme: {
          id: schemeId,
        },
      },
    });

    if (existingData === null) return;
    if (existingData?.listIncidents?.incidents === undefined) return;

    // write the new data to the Apollo store
    store.writeQuery<ListIncidentsQuery>({
      query: ListIncidentsDocument,
      data: {
        listIncidents: {
          ...existingData.listIncidents,
          incidents:
            existingData?.listIncidents?.incidents &&
            existingData.listIncidents.incidents.length > 0
              ? // eslint-disable-next-line no-unsafe-optional-chaining
                [...existingData?.listIncidents?.incidents, res.createIncident]
              : [res.createIncident],
        },
        __typename: 'Query',
      },
      variables: {
        scheme: {
          id: schemeId,
        },
      },
    });
  };

  // mutation
  const [createIncident] = useCreateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      Mixpanel.track('Successfully create incident');
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The Incident has been added!',
          id: 'R+HTBd',
        }),
        placement: 'bottomRight',
      });
      navigate('/app/incidents');
    },
    onError: () => {
      setSaving(false);
      Mixpanel.track('Unsuccessfully create incident');
      notification.error({
        message: intl.formatMessage({
          defaultMessage: 'Error!',
          id: 'DIDBlF',
        }),
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors. Please try again.',
          id: 'tPB3Wl',
        }),
        placement: 'bottomRight',
      });
    },

    update: updateIncident,
  });

  // functions
  const toggleAddNewAddress = () => {
    setAddNewAddress(!addNewAddress);
  };
  const updateNewAddressData = (address: LocationData | undefined) =>
    setNewAddressData(address);

  const onSubmit = (data: FormData) => {
    setSaving(true);
    const allOffendersConfirmed = !data.offenders
      ?.map((offender) => offender.confirmedInIncident)
      .includes(false);
    if (allOffendersConfirmed) {
      const getOffenders = (): CreateIncidentData['offenders'] => {
        if (data.offenders) {
          const existingOffenders = data.offenders.filter(
            (item) => item.existing
          );
          const newOffenders = data.offenders.filter((item) => item.new);
          const editedOffenders = data.offenders.filter((item) => item.edited);

          return {
            connect:
              existingOffenders.length > 0
                ? existingOffenders.map((offender) => ({ id: offender.id }))
                : undefined,
            create:
              newOffenders.length > 0
                ? newOffenders.map((offender) => ({
                    name: offender.name,
                    alias: offender.alias ? { set: offender.alias } : undefined,
                    gender: offender.gender || null,
                    race: offender.race || null,
                    build: offender.build || null,
                    height: offender.height || null,
                    hair: offender.hair || null,
                    peculiarities: offender.peculiarities || null,
                    comment: offender.comment || null,
                    age: offender.age || null,
                    dateSource: offender.dateSource || null,
                    dateOfBirth: offender.dateOfBirth || null,
                    groups: {
                      connect:
                        groupData?.groups && groupData.groups.length === 1
                          ? groupData?.groups.map(({ id }) => ({ id }))
                          : data.groups.map((id) => ({ id })),
                    },
                    scheme: { connect: { id: schemeId } },
                    createdBy: { connect: { id: userId } },
                    localId: offender.id,
                  }))
                : undefined,
            update: editedOffenders.map((offender) => ({
              data: {
                name: { set: offender.name },
                alias: offender.alias ? { set: offender.alias } : undefined,
                gender: { set: offender.gender },
                race: { set: offender.race },
                build: { set: offender.build },
                height: { set: offender.height },
                hair: { set: offender.hair },
                peculiarities: { set: offender.peculiarities },
                comment: { set: offender.comment },
                age: { set: offender.age },
                dateSource: offender.dateSource
                  ? { set: offender.dateSource }
                  : undefined,
                dateOfBirth: { set: offender.dateOfBirth },
              },
              where: { id: offender.id },
            })),
          };
        }
        return {
          connect: undefined,
          create: undefined,
        };
      };
      const getVehicles = (): CreateIncidentData['vehicles'] => {
        const newVehicles = data.vehicles?.filter((item) => item.new) || [];
        const existingVehicles =
          data.vehicles?.filter((item) => item.existing) || [];
        const editedVehicles =
          data.vehicles?.filter((item) => item.edited) || [];
        return {
          connect:
            existingVehicles.length > 0
              ? existingVehicles.map(({ id }) => ({ id }))
              : undefined,
          update:
            editedVehicles.length > 0
              ? editedVehicles.map((vehicle) => ({
                  where: { id: vehicle.id },
                  data: {
                    make: { set: vehicle.make },
                    model: { set: vehicle.model },
                    colour: { set: vehicle.colour },
                    registration: { set: vehicle.registration },
                    groups: {
                      connect:
                        groupData?.groups && groupData.groups.length === 1
                          ? groupData?.groups.map(({ id }) => ({ id }))
                          : data.groups.map((id) => ({ id })),
                    },
                  },
                }))
              : undefined,
          create:
            newVehicles.length > 0
              ? newVehicles.map((vehicle) => ({
                  make: vehicle.make,
                  model: vehicle.model,
                  colour: vehicle.colour,
                  registration: vehicle.registration,
                  groups: {
                    connect:
                      groupData?.groups && groupData.groups.length === 1
                        ? groupData?.groups.map(({ id }) => ({ id }))
                        : data.groups.map((id) => ({ id })),
                  },
                  localId: vehicle.id,
                }))
              : undefined,
        };
      };
      const getLocation = (): CreateIncidentData['location'] => {
        if (newAddressData) {
          return {
            create: {
              building: newAddressData.building,
              county: newAddressData.county,
              postcode: newAddressData.postcode,
              street: newAddressData.street,
              townCity: newAddressData.townCity,
            },
          };
        }
        return {
          create: undefined,
        };
      };

      const getImages = () => ({
        create:
          data.images && data.images.length > 0
            ? data.images
                .map((item) => {
                  const offenders = data.offenders?.filter((offender) =>
                    offender.images?.some(({ id }) => id === item.uid)
                  );
                  const vehicles = data.vehicles?.filter((vehicle) =>
                    vehicle.images?.some(({ id }) => id === item.uid)
                  );

                  return {
                    url: {
                      filename: item.fileName || '',
                      mimetype: item.type || '',
                      url: item.url || '',
                    },
                    offenders: offenders?.map((offender) => ({
                      id: offender.id,
                      new: offender.new || false,
                    })),
                    vehicles: vehicles?.map((offender) => ({
                      id: offender.id,
                      new: offender.new || false,
                    })),
                    position: item.position,
                    primary: item.uid === primaryImage,
                    policeImage: item.policeImage,
                    rotation: item.rotation || 0,
                  };
                })
                .filter((object) => object.url !== undefined)
                .filter((object) => object.url.url !== undefined)
            : undefined,
      });

      Mixpanel.track('Submit incident');

      const involved = data.involvedTags?.map((id) => ({ id })) || [];
      const impact = data.fellingTags?.map((id) => ({ id })) || [];

      void createIncident({
        variables: {
          data: {
            subject: data.subject,
            description: data.description,
            date: data.date,
            time: data.date,
            business: data.business?.value
              ? {
                  id: data.business?.value,
                }
              : {
                  id: businesses[0]?.id,
                },
            items:
              data.goods &&
              data.goods
                .filter(
                  (item) =>
                    item.goodsType !== undefined || item.sku !== undefined
                )
                .map((item) => ({
                  goodsType: item.goodsType
                    ? {
                        id: item.goodsType,
                      }
                    : undefined,
                  name:
                    (goodsTypesData &&
                      goodsTypesData.listGoodsTypes.goodsTypes.find(
                        ({ id }) => id === item.goodsType
                      )?.name) ||
                    '',
                  value: item.value || 0,
                  recoveredValue: item.recoveredValue || 0,
                  sku: item.sku,
                  quantity: item.quantity,
                  recoveredQuantity: item.recoveredQuantity,
                })),
            policeInvolved: data.policeInvolved,
            policeRef: data.policeRef,
            policeNo: data.policeNo,
            policeReported: data.policeReported,
            policeResponse: data.policeResponse,
            groups:
              groupData?.groups && groupData.groups.length === 1
                ? groupData?.groups.map(({ id }) => ({ id }))
                : data.groups.map((id) => ({ id })),
            scheme: schemeId,
            crimeTypes: [
              ...data.tags.map((id) => ({ id })),
              ...involved,
              ...impact,
            ],
            offenders: getOffenders(),
            vehicles: getVehicles(),
            crimeGroups: {},
            images: getImages(),
            location: getLocation(),
            answers: customQuestions.map((question) => ({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore TODO: fix noImplicitAny error here
              answer: data[question.questionId] || '',
              type: question.answerType,
              tagQuestionId: question.tagQuestionId,
            })),
          },
        },
      });
    } else {
      confirm({
        type: 'error',
        title: 'Please confirm offenders',
        content:
          'You need to confirm that all the offenders were involved in the incident.',
      });
      setSaving(false);
    }
  };

  const onValuesChange = (changedValues: FormData, values: FormData) => {
    if (changedValues.description) {
      setDescriptionPristine(false);
    }

    if (descriptionPristine) {
      // build description as data is completed
      const tags = values.tags
        .map((id) => tagsData && tagsData.tags.find((tag) => tag.id === id))
        .map((tag) => tag?.name || '');
      const offenders = values.offenders || [];
      const unknownOffenders =
        (values.offenders &&
          values.offenders.filter(
            (item) =>
              item.name ===
              intl.formatMessage({
                defaultMessage: 'Unidentified Offender',
                id: 'tHTxaO',
              })
          )) ||
        [];
      const knownOffenders =
        (values.offenders &&
          values.offenders.filter(
            (item) =>
              item.name !==
              intl.formatMessage({
                defaultMessage: 'Unidentified Offender',
                id: 'tHTxaO',
              })
          )) ||
        [];

      const offendersText = intl.formatMessage(
        {
          defaultMessage:
            'The incident involved {offenderCount, plural, one {offender} other {offenders}} {knownOffenders}{unknownCount, plural, =0 {.} other { and}} {unknownCount, plural, =0 {} 1 {unidentified offender} other {unidentified offenders.}}',
          id: 'cF5joO',
        },
        {
          offenderCount: offenders.length,

          unknownCount: unknownOffenders.length,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          knownOffenders: `${knownOffenders.map(
            (item, index) => `${index > 1 ? ' ' : ''}${item.name || ''}`
          )}`,
        }
      );

      const goodsWithValue =
        values.goods && values.goods.length > 0
          ? values.goods
              .filter(
                (item) =>
                  item.goodsType !== undefined &&
                  item.recoveredValue !== undefined &&
                  item.value !== undefined
              )
              .map((item) => item.value)
          : [];
      const goodsWithRecoveredValue =
        values.goods && values.goods.length > 0
          ? values.goods
              .filter(
                (item) =>
                  item.goodsType !== undefined &&
                  item.recoveredValue !== undefined &&
                  item.value !== undefined
              )
              .map((item) => item.value)
          : [];

      form.setFieldsValue({
        description:
          intl.formatMessage(
            {
              defaultMessage:
                'An incident of {tags} occurred at {time} on {date}. {goods, plural, =0 {} other {The goods lost in this incident total {totalLoss} of which a value of {recovered} was recovered.}}',
              id: 'J5ne/R',
            },
            {
              tags: tags
                .map((tag, index) => `${index > 0 ? ' ' : ''}${tag}`)
                .toString(),
              time: moment(values.date).format('HH:mm'),
              date: moment(values.date).format('dddd Do MMMM YYYY'),
              goods: 0,
              totalLoss:
                goodsWithValue.length > 0
                  ? `£${
                      goodsWithValue
                        .reduce((a, b) => (a || 0) + (b || 0))
                        ?.toFixed(2) || 0
                    }`
                  : '',
              recovered:
                goodsWithRecoveredValue.length > 0
                  ? `£${
                      goodsWithRecoveredValue
                        .reduce((a, b) => (a || 0) + (b || 0))
                        ?.toFixed(2) || 0
                    }`
                  : '',
            }
          ) + (offenders.length > 0 ? offendersText : ''),
      });
    }
  };

  const dontKnowGoods = () => {
    setGoodsVisible(true);
    if (goodsMode === GoodsMode.Generic) {
      form.setFieldsValue({
        goods: [
          {
            goodsType:
              (goodsTypesData &&
                goodsTypesData.listGoodsTypes.goodsTypes.find(
                  (item) => item.name === 'Unknown'
                )?.id) ||
              undefined,
            recoveredValue: 0,
            value: 0,
          },
        ],
      });
    }
  };

  const knowGoods = () => {
    setGoodsVisible(true);
    form.setFieldsValue({
      goods: [
        {
          goodsType: undefined,
          recoveredValue: 0,
          value: undefined,
        },
        {
          goodsType: undefined,
          recoveredValue: 0,
          value: undefined,
        },
      ],
    });
  };

  const formTags = Form.useWatch('tags', form);
  useEffect(() => {
    if (formTags) {
      const sections = [
        ...new Set(
          formTags
            .map(
              (value) =>
                incidentTagsData &&
                incidentTagsData.listIncidentTags.find(
                  (item) => item.value === value
                )
            )
            .flatMap((item) => item?.incidentForm)
            .map((item) => item?.type)
        ),
      ];

      if (sections.length > 0) {
        setIncidentForm(sections as IncidentFormField[]);
      } else {
        setIncidentForm([
          IncidentFormField.Types,
          IncidentFormField.Involved,
          IncidentFormField.Impact,
          IncidentFormField.Where,
          IncidentFormField.Images,
          IncidentFormField.Offenders,
          IncidentFormField.Police,
          IncidentFormField.Details,
          IncidentFormField.Groups,
        ]);
      }
      if (formTags.length > 0) {
        const tag =
          incidentTagsData &&
          incidentTagsData.listIncidentTags.find(
            (item) => item.value === formTags[0]
          );
        if (tag?.questions)
          setCustomQuestions(
            tag.questions.map((question) => ({
              answerType: question?.answerType || AnswerType.String,
              label: question?.label || '',
              questionId: question?.questionId || '',
              required: question?.required || false,
              tagQuestionId: question?.tagQuestionId || '',
              value: '',
              options: question?.options || [],
            }))
          );
      }
    }
  }, [formTags, incidentTagsData]);

  return {
    onSubmit,
    saving,
    primaryAddress: addressData
      ? addressData.addresses.find((item) => item.primary)
      : undefined,
    addressLoading,
    form,
    adminRights: role !== Role.User,
    onValuesChange,
    isTheft,
    addNewAddress,
    toggleAddNewAddress,
    updateNewAddressData,
    newAddressData,
    dontKnowGoods,
    goodsVisible,
    knowGoods,
    primaryImage,
    setPrimaryImage,
    incidentForm,
    customQuestions,
    goodsMode,
  };
};

export default useAddIncident;
