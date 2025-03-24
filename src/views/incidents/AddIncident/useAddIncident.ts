/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance, UploadFile } from 'antd';
import type { StateImageData } from 'components/incidents/IncidentForm/ImageSection/useImageSection';
import type { StateOffenderData } from 'components/incidents/IncidentForm/Profiles/Offenders/useOffenders';
import type { StateVehicleData } from 'components/incidents/IncidentForm/Profiles/Vehicles/useVehicles';
import type { CreateIncidentMutation } from 'graphql/incidents/mutations/__generated__/crreate-incident.generated';
import type { AddressesQuery } from 'graphql/incidents/queries/__generated__/address.generated';
import type { ListIncidentsQuery } from 'graphql/incidents/queries/__generated__/list-incidents.generated';
import type { ViewInvestigationQuery } from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import type { ListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import type {
  Age,
  Build,
  CreateIncidentData,
  Gender,
  Height,
  IdSource,
  PoliceResponseTime,
  Race,
} from 'graphql/types';
import type React from 'react';
import type { CustomQuestion, Image, LocationData } from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { sessionIdAtom } from '#/hooks/useManageSession';
import {
  currentSchemeAtom,
  currentSchemeBusinessesAtom,
  currentSchemeIdAtom,
  isAdminAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasRolePermission from '#/utils/has-role-permission';
import { useGenerateStatementBodyMutation } from '#/views/incidents/AddIncident/graphql/__generated__/generateStatementBody.generated';
import { Form, Modal, notification } from 'antd';
import { useBusinessBrandsLazyQuery } from 'graphql/businesses/queries/__generated__/business-brands.generated';
import { useListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import { useCreateIncidentMutation } from 'graphql/incidents/mutations/__generated__/crreate-incident.generated';
import { useAddressesQuery } from 'graphql/incidents/queries/__generated__/address.generated';
import { ListIncidentsDocument } from 'graphql/incidents/queries/__generated__/list-incidents.generated';
import { ViewInvestigationDocument } from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import { useListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import {
  AnswerType,
  GoodsMode,
  IncidentFormField,
  Model,
  PermissionMethod,
  PermissionModel,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import debounce from 'lodash/debounce';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'state';
import Mixpanel from 'utils/mixpanel';

const { useForm } = Form;
const { confirm } = Modal;

export interface OffenderData {
  age?: Age | null;
  alias?: null | string[];
  approved?: boolean | null;
  build?: Build | null;
  comment?: null | string;
  confirmedInIncident: boolean;
  dateOfBirth?: Date | null;
  dateSource?: null | string;
  edited: boolean;
  existing: boolean;
  gender?: Gender | null;
  hair?: null | string;
  height?: Height | null;
  id: string;
  idSource?: IdSource;
  idVerified?: boolean;
  imageUid?: string[] | undefined;
  images?: {
    boundingBox?: {
      height: string;
      left: string;
      top: string;
      width: string;
    };
    id: string;
    new: boolean;
    url?: null | string | undefined;
  }[];
  name?: null | string;
  new: boolean;
  peculiarities?: null | string;
  race?: Race | null;
  reference?: null | number;
  updatedAt?: Date;
}

export interface FormData {
  business?: {
    label: React.ReactNode;
    value: string;
  };
  cctv?: {
    aheadBehind?: string; // new
    cameraNumber: string;
    correctTime: boolean; // new
    description: string;
    endTime: Date;
    incorrectBy?: number; // new
    showFace: boolean;
    showIncident: boolean;
    startTime: Date;
  }[];
  cctvAvailable?: boolean;
  date: Date;

  description: string;
  documents?: { fileList: UploadFile[] };
  fellingTags?: [];
  goods?: {
    description?: string;
    goodsType?: string;
    name?: string;
    quantity?: number;
    recoveredQuantity?: number;
    recoveredValue?: number;
    sku?: string;
    stockItem?: string;
    value?: number;
  }[];
  groups?: string[];
  hasVictims: boolean;
  images?: StateImageData[];
  involvedTags?: [];
  offenders: StateOffenderData[] | null;
  policeCCTVEmail?: string;
  policeDay?: boolean;
  policeDistanceFromIncident?: string;
  policeIncidentDuration?: string;
  policeInvolved?: boolean;
  policeItemsLocation?: string[];
  policeItemsMO?: string[];
  policeKnownBefore?: boolean;
  policeMG11: boolean;
  policeNo?: string;
  policeObstructions?: string;
  policeObstructionsDetails?: string; // new
  policeReasonRemember?: string;
  policeRef?: string;
  policeReported?: boolean;
  policeResponse?: PoliceResponseTime;
  policeSign?: string;
  policeStatement?: string;
  policeWillingCourt?: boolean;
  policeWitnessAddress?: string;
  policeWitnessAtTime?: boolean;
  policeWitnessEmail?: string;
  policeWitnessEthnicity?: string;
  policeWitnessGender?: string;
  policeWitnessLength?: string; // new
  policeWitnessMobileNo?: string;
  policeWitnessName?: string;
  policeWitnessPlaceOfBirth?: string;
  policeWitnessPostcode?: string;
  policeWitnessWorkNo?: string;
  recoveredValue?: number;
  reportToPolice: boolean;
  subject: string;
  tags: string[];
  value?: number;
  vehicles: StateVehicleData[] | null;
  victimsDetails?: {
    description?: string;
    email?: string;
    name: string;
    phone?: string;
  }[];
  witnessDetails?: {
    description?: string;
    email?: string;
    name: string;
    phone?: string;
  }[];
  witnessesInvolved: boolean;
}

export interface NewImage extends Image {
  offenders?: {
    id: string;
    name?: null | string | undefined;
    new?: boolean;
  }[];
}

export interface VehicleData {
  colour?: null | string | undefined;
  edited: boolean;
  existing: boolean;
  id: string;
  make?: null | string | undefined;
  model?: null | string | undefined;
  new: boolean;
  reference?: null | number;
  registration?: null | string | undefined;
}

interface Props {
  investigationId?: string;
}

interface Return {
  addNewAddress: boolean;
  addressLoading: boolean;
  brands: string[];
  customQuestions: CustomQuestion[];
  dontKnowGoods: () => void;
  form: FormInstance<FormData>;
  generatingStatement: boolean;
  goodsMode: GoodsMode;
  goodsVisible: boolean;
  incidentForm: IncidentFormField[];
  incidentTagsData: ListIncidentTagsQuery | undefined;
  incidentTagsLoading: boolean;
  isTheft: boolean;
  knowGoods: () => void;
  newAddressData: LocationData | undefined;
  onSubmit: (value: FormData) => void;
  onValuesChange: (changedValues: FormData, values: FormData) => void;
  policeReporting: boolean;
  primaryAddress:
    | Exclude<AddressesQuery['addresses'], null | undefined>[0]
    | undefined;
  primaryImage: string;
  reportOnly: boolean;
  saving: boolean;
  setBrands: (value: string[]) => void;
  setPoliceReporting: (value: boolean) => void;
  setPrimaryImage: (value: string) => void;
  showSiteNumber: boolean;
  tagsData: TagsQuery | undefined;
  toggleAddNewAddress: () => void;
  updateNewAddressData: (value: LocationData | undefined) => void;
}

const useAddIncident = ({ investigationId }: Props): Return => {
  const [form] = useForm<FormData>();

  const intl = useIntl();
  const isAdmin = useAtomValue(isAdminAtom);
  const userId = useAtomValue(currentUserAtom)?.id ?? '';
  const businesses = useAtomValue(currentSchemeBusinessesAtom);

  const reportOnly =
    useAtomValue(currentSchemeAtom)?.reportOnly &&
    !hasRolePermission({
      permission: {
        method: PermissionMethod.Read,
        model: PermissionModel.Incidents,
      },
    });

  const formBusiness = Form.useWatch('business', form);

  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const order = useStoreState((state) => state.data.incidents.order);
  const sessionId = useAtomValue(sessionIdAtom);
  const goodsMode = useAtomValue(currentSchemeAtom)?.goodsMode;
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const requireSiteNumberForUsers =
    useAtomValue(currentSchemeAtom)?.requireSiteNumberForUsers;
  const restrictIncidentAccess =
    useAtomValue(currentSchemeAtom)?.restrictIncidentAccess;
  const facialRecognition =
    useAtomValue(currentSchemeAtom)?.facialRecognition ?? true;

  const addOffenderRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Write,
      model: PermissionModel.Offenders,
    },
  });

  const [goodsVisible, setGoodsVisible] = useState(false);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [newAddressData, setNewAddressData] = useState<LocationData>();
  const [primaryImage, setPrimaryImage] = useState<string>('');
  const [policeReporting, setPoliceReporting] = useState(false);
  const [generatingStatement, setGeneratingStatement] = useState(false);

  const [isTheft] = useState(false);
  const [descriptionPristine, setDescriptionPristine] = useState(true);
  const [saving, setSaving] = useState(false);
  // eslint-disable-next-line array-bracket-newline
  const [incidentForm, setIncidentForm] = useState<IncidentFormField[]>([
    IncidentFormField.Types,
    // eslint-disable-next-line array-bracket-newline
  ]);
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const showSiteNumber = requireSiteNumberForUsers && !isAdmin;
  const [brands, setBrands] = useState<string[]>([]);

  const formTags = Form.useWatch('tags', form);
  const victimInvolved = Form.useWatch('victimInvolved', form);
  const witnessesInvolved = Form.useWatch('witnessesInvolved', form);
  const cctvAvailable = Form.useWatch('cctvAvailable', form);
  const policeMG11 = Form.useWatch('policeMG11', form);

  const description = Form.useWatch('description', form);
  const policeDistanceFromIncident = Form.useWatch(
    'policeDistanceFromIncident',
    form
  );
  const fellingTags = Form.useWatch('fellingTags', form);

  const policeIncidentDuration = Form.useWatch('policeIncidentDuration', form);
  const involvedTags = Form.useWatch('involvedTags', form);
  const goods = Form.useWatch('goods', form);
  const policeKnownBefore = Form.useWatch('policeKnownBefore', form);
  const policeObstructions = Form.useWatch('policeObstructions', form);
  const offenders = Form.useWatch('offenders', form);
  const policeItemsLocation = Form.useWatch('policeItemsLocation', form);
  const policeItemsMO = Form.useWatch('policeItemsMO', form);
  const policeReasonRemember = Form.useWatch('policeReasonRemember', form);
  const policeObstructionsDetails = Form.useWatch(
    'policeObstructionsDetails',
    form
  );
  const policeWitnessLength = Form.useWatch('policeWitnessLength', form);
  const vehicles = Form.useWatch('vehicles', form);
  const policeWitnessAtTime = Form.useWatch('policeWitnessAtTime', form);

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

  const [generateStatementBody] = useGenerateStatementBodyMutation();
  const [getBrands] = useBusinessBrandsLazyQuery();

  useEffect(() => {
    if (formBusiness) {
      void getBrands({
        onCompleted: (data) => {
          if (data && data.business && data.business.brands.length > 0) {
            setBrands(data.business.brands);
          }
        },
        variables: {
          where: {
            id: formBusiness.value,
          },
        },
      });
    } else {
      setBrands([]);
    }
  }, [formBusiness]);

  const handleStatementGeneration = async () => {
    if (policeReporting && policeWitnessAtTime !== undefined) {
      const formData = form.getFieldsValue();
      if (!formData.description) return;
      setGeneratingStatement(true);

      const statementData = await generateStatementBody({
        variables: {
          data: {
            businessId: formData.business?.value,
            cctv:
              formData.cctv?.map((item) => ({
                aheadBehind: item.aheadBehind,
                correctTime: item.correctTime,
                description: item.description,
                end: item.endTime,
                incorrectBy: item.incorrectBy
                  ? item.incorrectBy.toString()
                  : undefined,
                start: item.startTime,
              })) ?? [],
            date: formData.date,
            description: formData.description,
            distanceFromIncident: formData.policeDistanceFromIncident,
            impactTags: formData.fellingTags ?? [],
            incidentDuration: formData.policeIncidentDuration,
            incidentType: formData.tags[0],
            involvedTags: formData.involvedTags ?? [],
            items: formData.goods?.map((item) => ({
              description: item.description,
              goodsId: item.goodsType,
              recoveredValue: item.recoveredValue,
              value: item.value,
            })),
            knownSubjects: formData.policeKnownBefore,
            obstructions: formData.policeObstructions,
            offenders:
              formData.offenders?.map((item) => ({
                age: item.age,
                build: item.build,
                characteristics: item.peculiarities,
                comment: item.comment,
                ethnicity: item.race,
                hair: item.hair,
                height: item.height,
                name: item.name,
                sex: item.gender,
              })) ?? [],
            policeItemsLocation: formData.policeItemsLocation,
            policeItemsMO: formData.policeItemsMO,
            policeObstructionsDetails: formData.policeObstructionsDetails,
            policeWitnessLength: formData.policeWitnessLength,
            reasonToRemember: formData.policeReasonRemember,
            vehicles:
              formData.vehicles?.map((item) => ({
                colour: item.colour,
                make: item.make,
                model: item.model,
                registrationPlate: item.registration,
              })) ?? [],
            witnessedInPerson: formData.policeWitnessAtTime ?? false,
          },
        },
      });
      setGeneratingStatement(false);

      form.setFieldValue(
        'policeStatement',
        statementData.data?.generateStatementBody.statement ?? ''
      );
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleStatementGeneration = useCallback(
    debounce(() => {
      void handleStatementGeneration();
    }, 1000),
    [
      policeReporting,
      policeMG11,
      policeWitnessAtTime,
      vehicles,
      policeObstructionsDetails,
      policeWitnessLength,
      policeReasonRemember,
      policeItemsMO,
      policeItemsLocation,
      offenders,
      policeObstructions,
      policeKnownBefore,
      goods,
      involvedTags,
      formTags,
      policeIncidentDuration,

      fellingTags,
      policeDistanceFromIncident,
      description,
    ]
  );

  useEffect(() => {
    void debouncedHandleStatementGeneration();
    return () => debouncedHandleStatementGeneration.cancel();
  }, [
    policeReporting,
    policeMG11,
    policeWitnessAtTime,
    vehicles,
    policeObstructionsDetails,
    policeWitnessLength,
    policeReasonRemember,
    policeItemsMO,
    policeItemsLocation,
    offenders,
    policeObstructions,
    policeKnownBefore,
    goods,
    involvedTags,
    formTags,
    policeIncidentDuration,

    fellingTags,
    policeDistanceFromIncident,
    description,
  ]);

  const navigate = useNavigate();

  const { groups } = useGroupsContext();

  useEffect(() => {
    if (groups) {
      setIncidentsState({
        order,
        pagination,
        variables: {
          ...variables,
          groups: groups.map((group) => group.value),
        },
      });
    }
  }, [groups]);

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
        dataType: {
          equals: Model.Incident,
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
  });

  const { data: incidentTagsData, loading: incidentTagsLoading } =
    useListIncidentTagsQuery({
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
      data: {
        __typename: 'Query',
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
                    incidentItems: [],
                    // TODO fix this
                    totalImages: res?.createIncident.images.length || 0,
                  },
                ]
              : [
                  {
                    ...res.createIncident,
                    incidentItems: [],
                    // TODO fix this
                    totalImages: res?.createIncident.images.length || 0,
                  },
                ],
        },
      },
      query: ListIncidentsDocument,
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
      data: {
        __typename: 'Query',
        investigation: {
          ...existingData.investigation,
          incidents: [
            // TODO check
            ...existingData.investigation.incidents,
            {
              ...res.createIncident,
              totalRecoveredValue: res.createIncident.recoveredValue || 0,
              totalValue: res.createIncident.value || 0,
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
      },
      query: ViewInvestigationDocument,
      variables,
    });
  };

  // mutation
  const [createIncident] = useCreateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      Mixpanel.track('Successfully create incident');
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The Incident has been added!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
        }),
        placement: 'bottomRight',
      });
      if (investigationId) {
        navigate(`/app/investigations/view/${investigationId}`);
      } else if (reportOnly) {
        navigate('/app/incidents/add');
      } else if (
        restrictIncidentAccess &&
        hasRolePermission({
          permission: {
            method: PermissionMethod.Read,
            model: PermissionModel.Incidents,
          },
        })
      ) {
        navigate('/app/dashboard');
      } else {
        navigate('/app/incidents');
      }
    },
    onError: () => {
      setSaving(false);
      Mixpanel.track('Unsuccessfully create incident');
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors. Please try again.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Error!',
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
      const confirmedOffender = data.offenders?.filter((el) => el.getConfirmed);
      const getOffenders = (): CreateIncidentData['offenders'] => {
        if (confirmedOffender) {
          const existingOffenders = confirmedOffender.filter(
            (item) => item.existing
          );
          const newOffenders = confirmedOffender.filter((item) => item.new);
          const editedOffenders = confirmedOffender.filter(
            (item) => item.edited
          );
          return {
            connect:
              existingOffenders.length > 0
                ? existingOffenders.map((offender) => ({ id: offender.id }))
                : undefined,
            create:
              newOffenders.length > 0
                ? newOffenders.map((offender) => ({
                    address:
                      offender?.address?.street &&
                      offender?.address?.townCity &&
                      offender?.address?.postcode
                        ? {
                            alias: offender?.address?.alias,
                            building: offender?.address?.building,
                            county: offender?.address?.county,
                            postcode: offender?.address?.postcode,
                            street: offender?.address?.street,
                            townCity: offender?.address?.townCity,
                          }
                        : undefined,
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
                        groups && groups.length === 1
                          ? groups.map(({ value: id }) => ({ id }))
                          : data.groups?.map((id) => ({ id })) ?? [],
                    },
                    hair: offender.hair || null,
                    height: offender.height || null,
                    idSource: offender.idSource,
                    idVerified:
                      offender.idVerified === null
                        ? false
                        : offender.idVerified,
                    // TODO don't know which one to use so keeping above, may need to change??
                    images:
                      offender?.images && offender?.images.length > 0
                        ? {
                            create: offender.images.map((image) => ({
                              indexFaces: facialRecognition,
                              url: {
                                filename: image.fileName || '',
                                id: image.id || '',
                                mimetype: image.type || '',
                                url: image.url || image.optimised || '',
                              },
                            })),
                          }
                        : undefined,
                    localId: offender.id,
                    name: offender.name,
                    peculiarities: offender.peculiarities || null,

                    race: offender.race || null,
                    scheme: { connect: { id: schemeId } },
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
                images:
                  offender?.images && offender?.images.length > 0
                    ? {
                        create: offender.images.map((image) => ({
                          url: {
                            filename: image.fileName || '',
                            id: image.id,
                            mimetype: image.type || '',
                            url: image.url || image.optimised || '',
                          },
                        })),
                      }
                    : undefined,
                infoSource: { set: offender.infoSource || '' },
                justification: { set: offender.justification || null },
                knownFor: offender.knownFor,
                name: { set: offender.name || '' },
                peculiarities: { set: offender.peculiarities || '' },
                race: { set: offender.race },
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
          create:
            newVehicles.length > 0
              ? newVehicles.map((vehicle) => ({
                  colour: vehicle.colour,
                  groups: {
                    connect:
                      groups && groups.length === 1
                        ? groups.map(({ value: id }) => ({ id }))
                        : data.groups?.map((id) => ({ id })) ?? [],
                  },
                  localId: vehicle.id,
                  make: vehicle.make,
                  model: vehicle.model,
                  registration: vehicle.registration,
                }))
              : undefined,
          update:
            editedVehicles.length > 0
              ? editedVehicles.map((vehicle) => ({
                  data: {
                    colour: { set: vehicle.colour },
                    groups: {
                      connect:
                        groups && groups.length === 1
                          ? groups.map(({ value: id }) => ({ id }))
                          : data.groups?.map((id) => ({ id })) ?? [],
                    },
                    make: { set: vehicle.make },
                    model: { set: vehicle.model },
                    registration: { set: vehicle.registration },
                  },
                  where: { id: vehicle.id },
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
              geoLat: newAddressData.geoLat,
              geoLng: newAddressData.geoLng,
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
                  const offenders = confirmedOffender?.filter((offender) =>
                    offender.images?.some(({ id }) => id === item.uid)
                  );
                  const vehicles = data.vehicles?.filter((vehicle) =>
                    vehicle.images?.some(({ id }) => id === item.uid)
                  );

                  return {
                    offenders: offenders?.map((offender) => ({
                      id: offender.id,
                      new: offender.new || false,
                    })),
                    policeImage: item.policeImage,
                    position: item.position,
                    primary: item.uid === primaryImage,
                    rotation: item.rotation || 0,
                    totalFaces: item.totalFaces || 0,
                    url: {
                      filename: item.fileName || '',
                      mimetype: item.type || '',
                      url: item.url || '',
                    },
                    vehicles: vehicles?.map((offender) => ({
                      id: offender.id,
                      new: offender.new || false,
                    })),
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
            fileType: file.type || '',
            name: file.name || '',
            origFileName: file.fileName || '',
            url: file.url || '',
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
              tagQuestionId: question.tagQuestionId,
              type: question.answerType,
            })),
            business: data.business?.value
              ? {
                  id: data.business?.value,
                }
              : {
                  id: businesses[0]?.id,
                },
            cctvRecords: {
              create: data.cctv?.map((item) => ({
                aheadBehind: item.aheadBehind,
                cameraNumber: item.cameraNumber,
                correctTime: item.correctTime,
                description: item.description,
                endTime: item.endTime,
                incorrectBy: item.incorrectBy,
                showFace: !!item.showFace,
                showIncident: !!item.showIncident,
                startTime: item.startTime,
              })),
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
              groups && groups.length === 1
                ? groups.map(({ value: id }) => ({ id }))
                : data.groups?.map((id) => ({ id })) ?? [],
            images: getImages(),
            investigationId: investigationId || null,
            items: data.goods
              ?.filter(
                (item) => item.goodsType !== undefined || item.sku !== undefined
              )
              .map((item) => ({
                description: item.description,
                goodsType: item.goodsType
                  ? {
                      id: item.goodsType,
                    }
                  : undefined,
                name:
                  item.name ??
                  goodsTypesData?.listGoodsTypes.goodsTypes.find(
                    ({ id }) => id === item.goodsType
                  )?.name ??
                  '',
                quantity: item.quantity,
                recoveredQuantity: item.recoveredQuantity,
                recoveredValue: item.recoveredValue || 0,
                sku: item.sku,
                stockItem: item.stockItem
                  ? {
                      id: item.stockItem,
                    }
                  : undefined,
                value: item.value || 0,
              })),
            location: getLocation(),
            offenders: addOffenderRights
              ? getOffenders()
              : {
                  connect: undefined,
                  create: undefined,
                },
            policeCCTVEmail: data.policeCCTVEmail,
            policeDay: data.policeDay,
            policeDistanceFromIncident: data.policeDistanceFromIncident,
            policeIncidentDuration: data.policeIncidentDuration,

            policeInvolved: data.policeInvolved,
            policeItemsLocation: data.policeItemsLocation,
            policeItemsMO: data.policeItemsMO,
            policeKnownBefore: data.policeKnownBefore,
            policeMG11: data.policeMG11,
            policeNo: data.policeNo,
            policeObstructions: data.policeObstructions,
            policeObstructionsDetails: data.policeObstructionsDetails,
            policeReasonRemember: data.policeReasonRemember,
            policeRef: data.policeRef,
            policeReported: data.policeReported,
            policeResponse: data.policeResponse,
            policeSign: data.policeSign,
            policeStatement: data.policeStatement,
            policeWillingCourt: data.policeWillingCourt,
            policeWitnessAddress: data.policeWitnessAddress,
            policeWitnessAtTime: data.policeWitnessAtTime,
            policeWitnessEmail: data.policeWitnessEmail,
            policeWitnessEthnicity: data.policeWitnessEthnicity,
            policeWitnessGender: data.policeWitnessGender,
            policeWitnessLength: data.policeWitnessLength,
            policeWitnessMobileNo: data.policeWitnessMobileNo,
            policeWitnessName: data.policeWitnessName,
            policeWitnessPlaceOfBirth: data.policeWitnessGender,
            policeWitnessPostcode: data.policeWitnessPostcode,
            policeWitnessWorkNo: data.policeWitnessWorkNo,
            scheme: schemeId,
            sessionId,
            subject: data.subject,
            time: data.date,
            vehicles: getVehicles(),
            victims: {
              create: data.victimsDetails?.map((item) => ({
                description: item.description,
                email: item.email,
                name: item.name,
                phone: item.phone,
              })),
            },
            witnesses: {
              create: data.witnessDetails?.map((item) => ({
                description: item.description,
                email: item.email,
                name: item.name,
                phone: item.phone,
              })),
            },
          },
        },
      });
    } else {
      confirm({
        content:
          'You need to confirm that all the offenders were involved in the incident.',
        title: 'Please confirm offenders',
        type: 'error',
      });
      setSaving(false);
    }
  };

  const autoPopulateDescription =
    useAtomValue(currentSchemeAtom)?.autoPopulateDescription;
  const onValuesChange = (changedValues: FormData, values: FormData) => {
    if (changedValues.description) {
      setDescriptionPristine(false);
    }

    if (descriptionPristine && autoPopulateDescription) {
      // build description as data is completed
      const tags = values.tags
        .map((id) => tagsData?.tags.find((tag) => tag.id === id))
        .map((tag) => tag?.name || '');
      const offenders = values.offenders || [];
      const unknownOffenders =
        (values.offenders &&
          values.offenders.filter(
            (item) =>
              item.name ===
              intl.formatMessage({
                defaultMessage: 'Unidentified Offender',
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
              })
          )) ||
        [];

      const offendersText = intl.formatMessage(
        {
          defaultMessage:
            'The incident involved {offenderCount, plural, one {offender} other {offenders}} {knownOffenders}{unknownCount, plural, =0 {.} other { and}} {unknownCount, plural, =0 {} 1 {unidentified offender} other {unidentified offenders.}}',
        },
        {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          knownOffenders: `${knownOffenders.map(
            (item, index) => `${index > 1 ? ' ' : ''}${item.name || ''}`
          )}`,

          offenderCount: offenders.length,
          unknownCount: unknownOffenders.length,
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
            },
            {
              date: moment(values.date).format('dddd Do MMMM YYYY'),
              goods: 0,
              recovered:
                goodsWithRecoveredValue.length > 0
                  ? intl.formatNumber(
                      goodsWithRecoveredValue.reduce(
                        (a, b) => (a || 0) + (b || 0)
                      ) || 0,
                      {
                        currency: 'GBP',
                        style: 'currency',
                      }
                    )
                  : '',
              tags: tags
                .map((tag, index) => `${index > 0 ? ' ' : ''}${tag}`)
                .toString(),
              time: moment(values.date).format('HH:mm'),
              totalLoss:
                goodsWithValue.length > 0
                  ? intl.formatNumber(
                      goodsWithValue.reduce((a, b) => (a || 0) + (b || 0)) || 0,
                      {
                        currency: 'GBP',
                        style: 'currency',
                      }
                    )
                  : '',
            }
          ) + (offenders.length > 0 ? offendersText : ''),
      });
    }
  };

  const dontKnowGoods = () => {
    setGoodsVisible(false);
    if (goodsMode === GoodsMode.Generic) {
      form.setFieldsValue({
        goods: [
          {
            goodsType:
              goodsTypesData?.listGoodsTypes.goodsTypes.find(
                (item) => item.name === 'Unknown'
              )?.id || undefined,
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

  useEffect(() => {
    form.setFieldValue('cctv', [{ cameraNumber: '' }]);
  }, [cctvAvailable]);

  useEffect(() => {
    form.setFieldValue('witnessDetails', [{ name: '' }]);
  }, [witnessesInvolved]);

  useEffect(() => {
    form.setFieldValue('victimsDetails', [{ name: '' }]);
  }, [victimInvolved]);

  useEffect(() => {
    if (formTags) {
      if (formTags.length === 0) {
        setIncidentForm([IncidentFormField.Types]);
      } else {
        const sections = [
          ...new Set(
            formTags
              .map((value) =>
                incidentTagsData?.listIncidentTags.find(
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
      }
      if (formTags.length > 0) {
        const tag = incidentTagsData?.listIncidentTags.find(
          (item) => item.value === formTags[0]
        );
        if (tag?.questions) {
          const tagQuestions = tag.questions.map((question) => ({
            answerType: question?.answerType || AnswerType.String,
            dependentOnAnswerValue: question?.dependentOnAnswerValue || null,
            dependentOnBrandIds: question?.dependentOnBrandIds || [],
            dependentOnQuestionId: question?.dependentOnQuestionId || null,
            label: question?.label || '',
            options: question?.options || [],
            questionId: question?.questionId || '',
            required: question?.required || false,
            tagQuestionId: question?.tagQuestionId || '',
            tooltip: question.tooltip ?? undefined,
            value: '',
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
    addNewAddress,
    addressLoading,
    brands,
    customQuestions,
    dontKnowGoods,
    form,
    generatingStatement,
    goodsMode,
    goodsVisible,
    incidentForm,
    incidentTagsData,
    incidentTagsLoading,
    isTheft,
    knowGoods,
    newAddressData,
    onSubmit,
    onValuesChange,
    policeReporting,
    primaryAddress: addressData
      ? addressData.addresses.find((item) => item.primary)
      : undefined,
    primaryImage,
    reportOnly,
    saving,
    setBrands,
    setPoliceReporting,
    setPrimaryImage,
    showSiteNumber,
    tagsData,
    toggleAddNewAddress,
    updateNewAddressData,
  };
};

export default useAddIncident;
