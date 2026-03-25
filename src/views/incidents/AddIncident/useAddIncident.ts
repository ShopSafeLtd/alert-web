/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { CreateIncidentMutation } from '#/graphql/incidents/mutations/__generated__/create-incident.generated';
import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';
import type { AddressesQuery } from 'graphql/incidents/queries/__generated__/address.generated';
import type { ListIncidentsQuery } from 'graphql/incidents/queries/__generated__/list-incidents.generated';
import type { ViewInvestigationQuery } from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import type { ListIncidentTagsQuery } from 'graphql/tags/queries/__generated__/list-incident-tags.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import type { CreateIncidentData } from 'graphql/types';
import type {
  CustomQuestion,
  CustomQuestionAction,
  LocationData,
} from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { useCreateIncidentMutation } from '#/graphql/incidents/mutations/__generated__/create-incident.generated';
import { sessionIdAtom } from '#/hooks/useManageSession';
import {
  currencyAtom,
  currentPermissionsAtom,
  currentSchemeAtom,
  currentSchemeBusinessesAtom,
  currentSchemeIdAtom,
  currentUserSchemeAtom,
  isAdminAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasPermission from '#/utils/has-permission';
import hasRolePermission from '#/utils/has-role-permission';
import { useUpsertIncidentMutation } from '#/views/incidents/AddIncident/graphql/mutations/__generated__/upsert-incident.generated';
import { useBusinessGroupsLazyQuery } from '#/views/incidents/AddIncident/graphql/queries/__generated__/business-groups.generated';
import { useIncidentDraftDetailsQuery } from '#/views/incidents/AddIncident/graphql/queries/__generated__/edit-incident-draft.generated';
import generateInitData from '#/views/incidents/AddIncident/helpers/generate-init-data';
import upsertIncident from '#/views/incidents/AddIncident/helpers/upsert-incident';
import { useGenerateMG11Statement } from '#/views/incidents/AddIncident/hooks/useGenerateMG11Statement';
import { Form, Modal, notification } from 'antd';
import dayjs from 'dayjs';
import { useBusinessBrandsLazyQuery } from 'graphql/businesses/queries/__generated__/business-brands.generated';
import { useListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
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
// noinspection ES6PreferShortImport
import { useAtomValue } from 'jotai/index';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'state';
import Mixpanel from 'utils/mixpanel';

const { useForm } = Form;
const { confirm } = Modal;

interface Props {
  id?: string;
  investigationId?: string;
}

export type IncidentFormState = {
  metadata?: Record<string, unknown>[];
  type: IncidentFormField;
}[];

interface Return {
  addNewAddress: boolean;
  addressLoading: boolean;
  brands: string[];
  continueDraft: () => void;
  customQuestions: CustomQuestion[];
  dontKnowGoods: () => void;
  draftLoading: boolean;
  form: FormInstance<FormData>;
  generatingStatement: boolean;
  goodsMode: GoodsMode;
  goodsVisible: boolean;
  hidePostDraftSections: boolean;
  incidentForm: IncidentFormState;
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
  submitDraft: () => void;
  tagsData: TagsQuery | undefined;
  toggleAddNewAddress: () => void;
  updateNewAddressData: (value: LocationData | undefined) => void;
}

const useAddIncident = ({ id, investigationId }: Props): Return => {
  const [form] = useForm<FormData>();
  const [hidePostDraftSections, setHidePostDraftSections] = useState(false);

  const intl = useIntl();
  const isAdmin = useAtomValue(isAdminAtom);
  const userId = useAtomValue(currentUserAtom)?.id ?? '';
  const userRole = useAtomValue(currentUserSchemeAtom)?.role;
  const businesses = useAtomValue(currentSchemeBusinessesAtom);
  const permissions = useAtomValue(currentPermissionsAtom);
  const userBusinesses = useAtomValue(currentSchemeBusinessesAtom);

  const reportOnly =
    useAtomValue(currentSchemeAtom)?.reportOnly &&
    !hasRolePermission({
      permission: {
        method: PermissionMethod.Read,
        model: PermissionModel.Incidents,
      },
    });
  const currency = useAtomValue(currencyAtom);

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
  const [formDataVersion, setFormDataVersion] = useState(0);

  const [isTheft] = useState(false);
  const [descriptionPristine, setDescriptionPristine] = useState(true);
  const [saving, setSaving] = useState(false);
  // eslint-disable-next-line array-bracket-newline
  const [incidentForm, setIncidentForm] = useState<IncidentFormState>([
    { type: IncidentFormField.Types },
    // eslint-disable-next-line array-bracket-newline
  ]);
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const showSiteNumber = requireSiteNumberForUsers && !isAdmin;
  const [brands, setBrands] = useState<string[]>([]);
  const [businessGroups, setBusinessGroups] = useState<string[]>([]);
  const formTags = Form.useWatch('tags', form);
  const victimInvolved = Form.useWatch('victimInvolved', form);
  const witnessesInvolved = Form.useWatch('witnessesInvolved', form);
  const cctvAvailable = Form.useWatch('cctvAvailable', form);

  const { data: draftData, loading: draftLoading } =
    useIncidentDraftDetailsQuery({
      skip: !id,
      variables: {
        where: {
          id: id || '',
        },
      },
    });

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
      const businessBrands = businesses[0]?.brands;
      setBrands(businessBrands);
    }
  }, [businesses]);

  const [getBrands] = useBusinessBrandsLazyQuery();
  const [getGroups] = useBusinessGroupsLazyQuery();

  const businessId = useMemo(() => {
    if (userBusinesses.length === 1) return userBusinesses[0].id;
    return formBusiness?.value;
  }, [formBusiness, userBusinesses]);
  useEffect(() => {
    if (businessId) {
      void getBrands({
        onCompleted: (data) => {
          if (data && data.business && data.business.brands.length > 0) {
            setBrands(data.business.brands);
          }
        },
        variables: {
          where: {
            id: businessId,
          },
        },
      });

      void getGroups({
        onCompleted: (data) => {
          if (data && data.groups && data.groups.length > 0) {
            setBusinessGroups(data.groups.map((group) => group.id));
          }
        },
        variables: {
          where: {
            businesses: {
              some: {
                id: {
                  equals: businessId,
                },
              },
            },
          },
        },
      });
    } else {
      setBrands([]);
      setBusinessGroups([]);
    }
  }, [formBusiness]);

  // Generate MG11 statement from form data
  const { generating: generatingStatement } = useGenerateMG11Statement({
    businessId,
    form,
    policeReporting,
  });

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
          // Note: incidents and offenders fields are not in the query, update counts instead
          totalIncidents: existingData.investigation.totalIncidents + 1,
          totalOffenders:
            existingData.investigation.totalOffenders +
            res.createIncident.offenders.length,
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
    onCompleted: (result) => {
      setSaving(false);
      Mixpanel.track('Successfully create incident');
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'Your new incident has been successfully created.',
        }),
        duration: 0,
        message: intl.formatMessage(
          {
            defaultMessage: 'Incident {var1} created',
          },
          {
            var1: result.createIncident.reference,
          }
        ),
        placement: 'bottomRight',
      });
      if (investigationId) {
        navigate(`/app/investigations/view/${investigationId}`);
      } else if (reportOnly) {
        navigate('/app/incidents/add');
      } else if (
        (restrictIncidentAccess &&
          hasPermission({
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.Incidents,
            },
            permissions,
          })) ||
        !hasPermission({
          permission: {
            method: PermissionMethod.Read,
            model: PermissionModel.Incidents,
          },
          permissions,
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
  const [draftSet, setDraftSet] = useState(false);
  useEffect(() => {
    if (!draftData || !incidentTagsData || draftSet) return;

    const formData = generateInitData(draftData);

    if (formData.goods && formData.goods?.length > 0) {
      setGoodsVisible(true);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    form.setFieldsValue({
      ...formData,
      offenders: formData.offenders ?? undefined,
      vehicles: formData.vehicles ?? undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    setHidePostDraftSections(false);
    setDraftSet(true);
  }, [draftData, draftSet, form, incidentTagsData]);

  const [upsertIncidentM] = useUpsertIncidentMutation({
    onCompleted: (result) => {
      setSaving(false);
      Mixpanel.track('Successfully created incident');
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'Your new incident has been successfully created.',
        }),
        duration: 0,
        message: intl.formatMessage(
          {
            defaultMessage: 'Incident {var1} created',
          },
          {
            var1: result.upsertIncident.reference,
          }
        ),
        placement: 'bottomRight',
      });
      if (investigationId) {
        navigate(`/app/investigations/view/${investigationId}`);
      } else if (reportOnly) {
        navigate('/app/incidents/add');
      } else if (
        (restrictIncidentAccess &&
          hasPermission({
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.Incidents,
            },
            permissions,
          })) ||
        !hasPermission({
          permission: {
            method: PermissionMethod.Read,
            model: PermissionModel.Incidents,
          },
          permissions,
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
  });

  const onSubmit = (data: FormData, draft?: boolean) => {
    setSaving(true);

    const draftFormattedData = upsertIncident(
      data,
      schemeId || '',
      goodsTypesData,
      customQuestions,
      businesses[0]?.id,
      draftData,
      groups,
      facialRecognition,
      sessionId || undefined
    );

    if (draft) {
      void upsertIncidentM({
        variables: {
          data: { ...draftFormattedData, draft: true, id: id || undefined },
        },
      });
      return;
    }

    const allOffendersConfirmed = !data.offenders
      ?.map((offender) => offender.confirmedInIncident)
      .includes(false);
    if (allOffendersConfirmed) {
      if (id) {
        void upsertIncidentM({
          variables: {
            data: { ...draftFormattedData, draft: false, id },
          },
        });
        return;
      } else {
        const confirmedOffender = data.offenders?.filter(
          (el) => el.getConfirmed
        );
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
                            : (data.groups?.map((id) => ({ id })) ?? []),
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
                      name: offender.name || 'Unidentified Offender',
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
                  name: { set: offender.name || 'Unidentified Offender' },
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
                          : (data.groups?.map((id) => ({ id })) ?? []),
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
                            : (data.groups?.map((id) => ({ id })) ?? []),
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
          if (data.documents && data.documents?.length > 0) {
            return data.documents.map((file) => ({
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
                : businesses[0]
                  ? {
                      id: businesses[0]?.id,
                    }
                  : undefined,
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
                  : (data.groups?.map((id) => ({ id })) ?? []),
              images: getImages(),
              investigationId: investigationId || null,
              items: data.goods
                ?.filter(
                  (item) =>
                    item.goodsType !== undefined || item.sku !== undefined
                )
                .map((item) => ({
                  damagedQuantity: item.damagedQuantity,
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
              policeDepartment: data.policeDepartment,
              policeDistanceFromIncident: data.policeDistanceFromIncident,
              policeIncidentDuration: data.policeIncidentDuration,
              policeInvolved: data.policeInvolved,
              policeItemsLocation: data.policeItemsLocation,
              policeItemsMO: data.policeItemsMO,
              policeKnownBefore: data.policeKnownBefore !== 'NOT_KNOWN',
              policeMG11: data.policeMG11,
              policeNo: data.policeNo,
              policeObstructions: data.policeObstructions,
              policeObstructionsDetails: data.policeObstructionsDetails,
              policeOfficerName: data.policeOfficerName,
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
      }
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

  const submitDraft = () => {
    form.validateFields().then(
      () => {
        setSaving(true);
        const formValues = form.getFieldsValue();
        void onSubmit(formValues, true);
        setSaving(false);
      },
      () => {
        setSaving(false);
      }
    );
  };
  const autoPopulateDescription =
    useAtomValue(currentSchemeAtom)?.autoPopulateDescription;
  const onValuesChange = (changedValues: FormData, values: FormData) => {
    setFormDataVersion(formDataVersion + 1);
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
              date: dayjs(values.date).format('dddd Do MMMM YYYY'),
              goods: 0,
              recovered:
                goodsWithRecoveredValue.length > 0
                  ? intl.formatNumber(
                      goodsWithRecoveredValue.reduce(
                        (a, b) => (a || 0) + (b || 0)
                      ) || 0,
                      {
                        currency,
                        style: 'currency',
                      }
                    )
                  : '',
              tags: tags
                .map((tag, index) => `${index > 0 ? ' ' : ''}${tag}`)
                .toString(),
              time: dayjs(values.date).format('HH:mm'),
              totalLoss:
                goodsWithValue.length > 0
                  ? intl.formatNumber(
                      goodsWithValue.reduce((a, b) => (a || 0) + (b || 0)) || 0,
                      {
                        currency,
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
        goodsKnown: undefined,
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
        setIncidentForm([{ type: IncidentFormField.Types }]);
      } else {
        const sections = formTags
          .map((value) =>
            incidentTagsData?.listIncidentTags.find(
              (item) => item.value === value
            )
          )
          .flatMap((item) => item?.incidentForm)
          .filter((item) => {
            if (item?.conditions && item.conditions.length > 0) {
              const conditions = item.conditions as {
                conditionValues: string[];
                mode?: 'HIDE' | 'SHOW';
                questionId?: string;
                type: 'BUSINESS_GROUPS' | 'CUSTOM_QUESTION' | 'USER_ROLE';
              }[];

              // Helper function to evaluate a single condition
              const evaluateCondition = (
                condition: (typeof conditions)[0]
              ): boolean => {
                if (condition.type === 'CUSTOM_QUESTION') {
                  const questionId = condition.questionId ?? '';
                  const questionValue = form.getFieldValue(
                    questionId
                  ) as string;

                  return condition.conditionValues.includes(questionValue);
                }

                if (condition.type === 'BUSINESS_GROUPS') {
                  return businessGroups.some((item) =>
                    condition.conditionValues.includes(item)
                  );
                }

                if (condition.type === 'USER_ROLE') {
                  // Check if user's role ID matches any of the condition values
                  return !!(
                    userRole && condition.conditionValues.includes(userRole)
                  );
                }

                return false;
              };

              // Separate SHOW and HIDE conditions
              const showConditions = conditions.filter(
                (c) => !c.mode || c.mode === 'SHOW'
              );
              const hideConditions = conditions.filter(
                (c) => c.mode === 'HIDE'
              );

              // Evaluate conditions
              const showResults = showConditions.map(evaluateCondition);
              const hideResults = hideConditions.map(evaluateCondition);

              // Logic:
              // - If SHOW conditions exist, ALL must be true to show
              // - If HIDE conditions exist, ALL must be true to hide
              const shouldShow =
                showConditions.length === 0 || showResults.every(Boolean);
              const shouldHide =
                hideConditions.length > 0 && hideResults.every(Boolean);

              return shouldShow && !shouldHide;
            }
            return true; // No conditions = always show
          })
          .map((item) => ({ metadata: [item?.metadata], type: item?.type }));

        if (sections.length > 0) {
          setIncidentForm(sections as IncidentFormState);
        } else {
          setIncidentForm([
            { type: IncidentFormField.Types },
            { type: IncidentFormField.Involved },
            { type: IncidentFormField.Where },
            { type: IncidentFormField.Images },
            { type: IncidentFormField.Offenders },
            { type: IncidentFormField.Police },
            { type: IncidentFormField.Details },
            { type: IncidentFormField.Groups },
          ]);
        }
      }
      if (formTags.length > 0) {
        const tag = incidentTagsData?.listIncidentTags.find(
          (item) => item.value === formTags[0]
        );
        if (tag?.questions) {
          const tagQuestions = tag.questions.map((question) => ({
            actions: (question.actions as CustomQuestionAction[]) ?? [],
            answerType: question?.answerType || AnswerType.String,
            dependentMode: (question?.dependentMode || null) as
              | 'all'
              | 'any'
              | null,
            dependentOnAnswerValue: question?.dependentOnAnswerValue || null,
            dependentOnAnswerValueArray:
              question?.dependentOnAnswerValueArray || [],
            dependentOnBrandIds: question?.dependentOnBrandIds || [],
            dependentOnQuestionId: question?.dependentOnQuestionId || null,
            dependentOnTagIds: question?.dependentOnTagIds || [],
            label: question?.label || '',
            options: question?.options || [],
            questionId: question?.questionId || '',
            required: question?.required || false,
            tagQuestionId: question?.tagQuestionId || '',
            tooltip: question.tooltip ?? undefined,
            value: '',
          }));
          const involvedTags: string[] =
            form.getFieldValue('involvedTags') || ([] as string[]);

          if (brands && brands.length > 0) {
            const filteredQuestions = tagQuestions
              .filter((question) => {
                if (question.dependentOnBrandIds.length > 0) {
                  return question.dependentOnBrandIds.some((id) =>
                    brands.includes(id)
                  );
                }
                return true;
              })
              .filter((question) => {
                if (question.dependentOnTagIds.length > 0) {
                  return question.dependentOnTagIds.some((id) =>
                    involvedTags.includes(id)
                  );
                }

                return true;
              });

            setCustomQuestions(filteredQuestions);
          } else {
            const filteredQuestions = tagQuestions
              .filter((question) => question.dependentOnBrandIds.length === 0)
              .filter((question) => {
                if (question.dependentOnTagIds.length > 0) {
                  return question.dependentOnTagIds.some((id) =>
                    involvedTags.includes(id)
                  );
                }

                return true;
              });
            setCustomQuestions(filteredQuestions);
          }
        }
      }
    }
  }, [formTags, incidentTagsData, brands, formDataVersion, businessGroups]);
  const hasDraft = useMemo(
    () => incidentForm.some((item) => item.type === IncidentFormField.Draft),
    [incidentForm]
  );
  useEffect(() => {
    const draftSkipped = form.getFieldValue('draftSkip');
    if (id) {
      setHidePostDraftSections(false);
      return;
    }
    if (!hasDraft) {
      setHidePostDraftSections(false);
    } else if (!hidePostDraftSections && !draftSkipped) {
      setHidePostDraftSections(true);
    }
  }, [incidentForm, hasDraft, id]);

  const continueDraft = () => {
    setHidePostDraftSections(false);
    form.setFieldValue('draftSkip', true);
  };

  return {
    addNewAddress,
    addressLoading,
    brands,
    continueDraft,
    customQuestions,
    dontKnowGoods,
    draftLoading,
    form,
    generatingStatement,
    goodsMode,
    goodsVisible,
    hidePostDraftSections,
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
    submitDraft,
    tagsData,
    toggleAddNewAddress,
    updateNewAddressData,
  };
};

export default useAddIncident;
