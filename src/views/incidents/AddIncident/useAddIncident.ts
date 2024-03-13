/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance, UploadFile } from 'antd';
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
  ViewInvestigationQuery,
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
  ViewInvestigationDocument,
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
  documents?: { fileList: UploadFile[] };
  goods?: {
    goodsType?: string;
    value?: number;
    recoveredValue?: number;
    quantity?: number;
    recoveredQuantity?: number;
    sku?: string;
    name?: string;
    stockItem?: string;
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
interface Props {
  investigationId?: string;
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
  reportOnly: boolean;
  brands: string[];
  setBrands: (value: string[]) => void;
  showSiteNumber: boolean;
}

const useAddIncident = ({ investigationId }: Props): Return => {
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const userId = useStoreState((state) => state.user.id);
  const businesses = useStoreState((state) => state.user.businesses);
  const role = useStoreState((state) => state.user.role);
  const reportOnly =
    useStoreState((state) => state.scheme.reportOnly) && role === Role.User;
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const order = useStoreState((state) => state.data.incidents.order);
  const facialRecognition = useStoreState(
    (state) => state.scheme.facialRecognition
  );
  const goodsMode = useStoreState((state) => state.scheme.goodsMode);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );
  const {
    id: schemeId,
    restrictIncidentAccess,
    requireSiteNumberForUsers,
  } = useStoreState((state) => state.scheme);

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
  const showSiteNumber = requireSiteNumberForUsers && role === Role.User;

  const [brands, setBrands] = useState<string[]>([]);
  useEffect(() => {
    Mixpanel.track('Start new incident form');
  }, []);

  useEffect(() => {
    if (businesses.length > 0 && !showSiteNumber) {
      form.setFieldsValue({
        business: {
          label: businesses[0].name,
          value: businesses[0].id,
        },
      });
    } else {
      const businessBrands = businesses[0].brands;
      setBrands(businessBrands);
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

  const { data: goodsTypesData } = useListGoodsTypesQuery({
    variables: {
      where: {
        schemes: {
          id: { equals: schemeId },
        },
      },
    },
  });

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
              ? [
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  ...existingData?.listIncidents?.incidents,
                  {
                    ...res.createIncident,
                    // TODO fix this
                    totalImages: res?.createIncident.images.length || 0,
                    incidentItems: [],
                  },
                ]
              : [
                  {
                    ...res.createIncident,
                    // TODO fix this
                    totalImages: res?.createIncident.images.length || 0,
                    incidentItems: [],
                  },
                ],
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
  const updateInvestigation: MutationUpdaterFn<CreateIncidentMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;
    if (res.createIncident === null || res.createIncident === undefined) return;

    const existingData = store.readQuery<ViewInvestigationQuery>({
      query: ViewInvestigationDocument,
      variables: {
        where: {
          id: investigationId,
        },
      },
    });

    if (!existingData?.investigation) return;
    store.writeQuery<ViewInvestigationQuery>({
      query: ViewInvestigationDocument,
      data: {
        investigation: {
          ...existingData.investigation,
          incidents: [
            // TODO check
            ...existingData.investigation.incidents,
            {
              ...res.createIncident,
              totalValue: res.createIncident.value || 0,
              totalRecoveredValue: res.createIncident.recoveredValue || 0,
            },
          ],
          offenders: [
            ...existingData.investigation.offenders,
            ...res.createIncident.offenders,
          ],
          vehicles: [
            ...existingData.investigation.vehicles,
            ...res.createIncident.vehicles,
          ],
        },
        __typename: 'Query',
      },
      variables,
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
      if (investigationId) {
        navigate(`/app/investigations/view/${investigationId}`);
      } else if (reportOnly) {
        navigate('/app/incidents/add');
      } else if (restrictIncidentAccess && role === Role.User) {
        navigate('/app/dashboard');
      } else {
        navigate('/app/incidents');
      }
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

    update: investigationId ? updateInvestigation : updateIncident,
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

          console.log(data.offenders);

          return {
            connect:
              existingOffenders.length > 0
                ? existingOffenders.map((offender) => ({ id: offender.id }))
                : undefined,
            create:
              newOffenders.length > 0
                ? newOffenders.map((offender) => ({
                    age: offender.age || null,
                    alias: offender.alias ? { set: offender.alias } : undefined,
                    build: offender.build || null,
                    comment: offender.comment || null,
                    createdBy: { connect: { id: userId } },
                    dateOfBirth: offender.dateOfBirth || null,
                    dateSource: offender.dateSource || null,
                    gender: offender.gender || null,
                    groups: {
                      connect:
                        groupData?.groups && groupData.groups.length === 1
                          ? groupData?.groups.map(({ id }) => ({ id }))
                          : data.groups.map((id) => ({ id })),
                    },
                    hair: offender.hair || null,
                    height: offender.height || null,
                    idSource: offender.idSource,
                    idVerified:
                      offender.idVerified === null
                        ? false
                        : offender.idVerified,
                    localId: offender.id,
                    name: offender.name,
                    peculiarities: offender.peculiarities || null,
                    race: offender.race || null,
                    scheme: { connect: { id: schemeId } },
                    images: {
                      create: offender.images
                        ? offender.images.map((item) => ({
                            url: {
                              url: item.url || '',
                              mimetype: 'image/jpg',
                              filename: item.url || '',
                            },
                            indexFaces: facialRecognition,
                          }))
                        : undefined,
                    },
                    address:
                      offender?.address?.street &&
                      offender?.address?.townCity &&
                      offender?.address?.postcode
                        ? {
                            alias: offender?.address?.alias,
                            building: offender?.address?.building,
                            street: offender?.address?.street,
                            townCity: offender?.address?.townCity,
                            county: offender?.address?.county,
                            postcode: offender?.address?.postcode,
                          }
                        : undefined,
                  }))
                : undefined,

            update: editedOffenders.map((offender) => ({
              data: {
                age: { set: offender.age },
                alias: { set: offender.alias || [] },
                build: { set: offender.build },
                comment: { set: offender.comment || '' },
                dateOfBirth: offender.dateOfBirth
                  ? { set: offender.dateOfBirth }
                  : undefined,
                dateSource: { set: offender.dateSource || '' },
                gender: { set: offender.gender },
                hair: { set: offender.hair },
                height: { set: offender.height },
                idSource: offender.idSource
                  ? { set: offender.idSource }
                  : undefined,
                idVerified: offender.idVerified
                  ? { set: offender.idVerified }
                  : undefined,
                name: { set: offender.name || '' },
                peculiarities: { set: offender.peculiarities || '' },
                race: { set: offender.race },
                justification: { set: offender.justification || null },
                infoSource: { set: offender.infoSource || '' },
                knownFor: offender.knownFor,
                targetedGoods: offender.targetedGoods,
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
                    colour: { set: vehicle.colour },
                    groups: {
                      connect:
                        groupData?.groups && groupData.groups.length === 1
                          ? groupData?.groups.map(({ id }) => ({ id }))
                          : data.groups.map((id) => ({ id })),
                    },
                    make: { set: vehicle.make },
                    model: { set: vehicle.model },
                    registration: { set: vehicle.registration },
                  },
                }))
              : undefined,
          create:
            newVehicles.length > 0
              ? newVehicles.map((vehicle) => ({
                  colour: vehicle.colour,
                  groups: {
                    connect:
                      groupData?.groups && groupData.groups.length === 1
                        ? groupData?.groups.map(({ id }) => ({ id }))
                        : data.groups.map((id) => ({ id })),
                  },
                  localId: vehicle.id,
                  make: vehicle.make,
                  model: vehicle.model,
                  registration: vehicle.registration,
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
              geoLat: newAddressData.geoLat,
              geoLng: newAddressData.geoLng,
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

      const getDocuments = () => {
        if (data.documents?.fileList && data.documents?.fileList?.length > 0) {
          return data.documents?.fileList.map((file) => ({
            url: file.url || '',
            name: file.name || '',
            fileType: file.type || '',
            origFileName: file.fileName || '',
          }));
        }
        return undefined;
      };

      void createIncident({
        variables: {
          data: {
            answers: customQuestions.map((question) => ({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore TODO: fix noImplicitAny error here
              answer: data[question.questionId] || '',
              type: question.answerType,
              tagQuestionId: question.tagQuestionId,
            })),
            business: data.business?.value
              ? {
                  id: data.business?.value,
                }
              : {
                  id: businesses[0]?.id,
                },
            crimeGroups: {},
            crimeTypes: [
              ...data.tags.map((id) => ({ id })),
              ...involved,
              ...impact,
            ],
            date: data.date,
            description: data.description,
            documents: getDocuments(),
            groups:
              groupData?.groups && groupData.groups.length === 1
                ? groupData?.groups.map(({ id }) => ({ id }))
                : data.groups.map((id) => ({ id })),
            images: getImages(),
            investigationId: investigationId || null,
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
                  value:
                    goodsMode === GoodsMode.Specific
                      ? (item.value || 0) * (item.quantity || 0)
                      : item.value || 0,
                  recoveredValue:
                    goodsMode === GoodsMode.Specific
                      ? (item.recoveredValue || 0) *
                        (item.recoveredQuantity || 0)
                      : item.recoveredValue || 0,
                  sku: item.sku,
                  quantity: item.quantity,
                  recoveredQuantity: item.recoveredQuantity,
                  stockItem: item.stockItem
                    ? {
                        id: item.stockItem,
                      }
                    : undefined,
                })),
            location: getLocation(),
            offenders: getOffenders(),
            policeInvolved: data.policeInvolved,
            policeNo: data.policeNo,
            policeRef: data.policeRef,
            policeReported: data.policeReported,
            policeResponse: data.policeResponse,
            scheme: schemeId,
            subject: data.subject,

            time: data.date,
            vehicles: getVehicles(),
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

  const { autoPopulateDescription } = useStoreState((state) => state.scheme);
  const onValuesChange = (changedValues: FormData, values: FormData) => {
    if (changedValues.description) {
      setDescriptionPristine(false);
    }

    if (descriptionPristine && autoPopulateDescription) {
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
    if (goodsMode === GoodsMode.Generic)
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
        if (tag?.questions) {
          const tagQuestions = tag.questions.map((question) => ({
            answerType: question?.answerType || AnswerType.String,
            label: question?.label || '',
            questionId: question?.questionId || '',
            required: question?.required || false,
            tagQuestionId: question?.tagQuestionId || '',
            value: '',
            options: question?.options || [],
            dependentOnQuestionId: question?.dependentOnQuestionId || null,
            dependentOnAnswerValue: question?.dependentOnAnswerValue || null,
            dependentOnBrandIds: question?.dependentOnBrandIds || [],
          }));
          if (brands.length > 0) {
            const filteredQuestions = tagQuestions.filter((question) => {
              if (question.dependentOnBrandIds.length > 0) {
                return question.dependentOnBrandIds.some((id) =>
                  brands.includes(id)
                );
              }
              return true;
            });
            setCustomQuestions(filteredQuestions);
          } else {
            const filteredQuestions = tagQuestions.filter(
              (question) => question.dependentOnBrandIds.length === 0
            );
            setCustomQuestions(filteredQuestions);
          }
        }
      }
    }
  }, [formTags, incidentTagsData, brands]);

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
    reportOnly,
    brands,
    setBrands,
    showSiteNumber,
  };
};

export default useAddIncident;
