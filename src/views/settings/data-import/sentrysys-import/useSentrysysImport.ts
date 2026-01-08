/* eslint-disable array-bracket-newline */

import type { GoodsTypesQuery } from '#/views/settings/data-import/csv/data-import/graphql/queries/__generated__/goods-types.generated';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';

import {
  Build,
  Gender,
  Height,
  Model,
  Race,
  Role,
  SortOrder,
} from '#/graphql/types';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useGoodsTypesQuery } from '#/views/settings/data-import/csv/data-import/graphql/queries/__generated__/goods-types.generated';
import { Form } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useSchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { useListUsersQuery } from 'graphql/users/queries/__generated__/list-users.generated';
import update from 'immutability-helper';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
dayjs.extend(customParseFormat);

import type {
  Business,
  CSVData,
  GenerateData,
  HistoricIncident,
  Image,
  Incident,
  Member,
  NewBusiness,
  NewIncident,
  NewOffender,
  NewUser,
  NewVehicle,
  Profile,
  Vehicle,
} from './SentrysysImport.types';

import { useSentrysysImportDataMutation } from './graphql/__generated__/sentrysys-import.generated';

const calcBuild = (value: string) => {
  if (value === 'Medium') return Build.Medium;
  if (value === 'Slim') return Build.Small;
  if (value === 'Large') return Build.Large;
  return Build.Unknown;
};

const calcHeight = (value: string) => {
  if (Number(value) >= 170) return Height.Tall;
  if (Number(value) < 170 && Number(value) > 160) return Height.Average;
  if (Number(value) <= 160) return Height.Short;
  return Height.Unknown;
};

const calcGender = (value: string) => {
  if (value === 'M') return Gender.Male;
  if (value === 'F') return Gender.Female;
  return Gender.Unknown;
};

const calcRace = (value: string) => {
  if (value === 'WhiteNorthEuropean') return Race.Ic1;
  if (value === 'WhiteSouthEuropean') return Race.Ic2;
  if (value === 'Black') return Race.Ic3;
  if (value === 'Asian') return Race.Ic4;
  if (value === 'SouthEastAsian') return Race.Ic5;
  if (value === 'Arabic') return Race.Ic6;
  // if (value === 'Arabic') return Race.Ic9;

  return Race.Unknown;
};

interface Return {
  currentStep: number;
  fileList: UploadFile[];
  generating: boolean;
  goodsData: GoodsTypesQuery | undefined;
  groupsData: SchemeGroupsQuery | undefined;
  handleFileListChange: UploadProps['onChange'];
  imageModalOpen: boolean;
  images: Image[];
  incidentItems: string[];
  incidentModalOpen: boolean;
  incidentTypes: string[];
  incidents: Incident[];
  mappingForm: FormInstance<GenerateData>;
  memberModalOpen: boolean;
  members: Member[];
  newBusinesses: NewBusiness[];
  newIncidents: NewIncident[];
  newOffenders: NewOffender[];
  newUsers: NewUser[];
  onDeleteNewBusiness: (id: string) => void;
  onGenerateData: (values: GenerateData) => void;
  onIncidentFileLoaded: (data: CSVData) => void;
  onMembersFileLoaded: (data: CSVData) => void;
  onProfileFileLoaded: (data: CSVData) => void;
  onStepChange: (value: number) => void;
  onSubmit: () => void;
  onUpdateBusiness: (data: NewBusiness) => void;
  onUpdateIncident: (data: NewIncident) => void;
  onUpdateOffender: (data: NewOffender) => void;
  onUpdateUser: (data: NewUser) => void;
  onVehicleFileLoaded: (data: CSVData) => void;
  profileModalOpen: boolean;
  profiles: Profile[];
  tagData: TagsQuery | undefined;
  toggleImageModal: () => void;
  toggleIncidentModal: () => void;
  toggleMemberModal: () => void;
  toggleProfileModal: () => void;
  toggleVehicleModal: () => void;
  vehicleModalOpen: boolean;
  vehicles: Vehicle[];
}

const useSentrysysImport = (): Return => {
  const [mappingForm] = Form.useForm<GenerateData>();

  const schemeId = useAtomValue(currentSchemeIdAtom);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [newBusinesses, setNewBusinesses] = useState<NewBusiness[]>([]);
  const [newUsers, setNewUsers] = useState<NewUser[]>([]);
  const [newOffenders, setNewOffenders] = useState<NewOffender[]>([]);
  const [newVehicles, setNewVehicles] = useState<NewVehicle[]>([]);
  const [newIncidents, setNewIncidents] = useState<NewIncident[]>([]);
  const [newHistoricIncidents, setNewHistoricIncidents] = useState<
    HistoricIncident[]
  >([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [incidentTypes, setIncidentTypes] = useState<string[]>([]);
  const [incidentItems, setIncidentItems] = useState<string[]>([]);

  const [generating, setGenerating] = useState<boolean>(false);
  const [memberModalOpen, setMemberModalOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [vehicleModalOpen, setVehicleModalOpen] = useState<boolean>(false);
  const [incidentModalOpen, setIncidentModalOpen] = useState<boolean>(false);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);

  const { data: usersData } = useListUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      groupWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: {
        fullName: SortOrder.Asc,
      },
      where: {
        schemes: {
          some: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
      },
    },
  });

  const { data: groupsData } = useSchemeGroupsQuery({
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });

  const { data: tagData } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        OR: [
          {
            parentTagId: {
              equals: null,
            },
          },
          {
            parentTag: {
              recycled: {
                equals: false,
              },
            },
          },
        ],
        dataType: {
          equals: Model.Incident,
        },
        recycled: {
          equals: false,
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

  const { data: goodsData } = useGoodsTypesQuery();

  const [importData] = useSentrysysImportDataMutation();

  const toggleMemberModal = () => setMemberModalOpen(!memberModalOpen);
  const toggleProfileModal = () => setProfileModalOpen(!profileModalOpen);
  const toggleVehicleModal = () => setVehicleModalOpen(!vehicleModalOpen);
  const toggleIncidentModal = () => setIncidentModalOpen(!incidentModalOpen);
  const toggleImageModal = () => setImageModalOpen(!imageModalOpen);

  const onProfileFileLoaded = (data: CSVData) => {
    const knownSubjectData = data.map((item) => ({
      adminViewOnly: item[20],
      aka: item[12],
      build: item[8],
      dateCreated: item[1],
      dateOfBirth: item[5],
      ethnicity: item[6],
      eyeColour: item[11],
      forename: item[2],
      gender: item[4],
      hairColour: item[10],
      height: item[7],
      knownMarks: item[13],
      profileID: item[0],
      surname: item[3],
      warning_GoingEquipped: item[17],
      warning_Other: item[19],
      warning_Violent: item[18],
      warning_Weapons: item[14],
    }));

    setProfiles(
      knownSubjectData.filter((item) => item.profileID !== 'ProfileID')
    );
  };

  const onMembersFileLoaded = (data: CSVData) => {
    const importedMembers = data.map((item) => ({
      address1: item[7],
      address2: item[8],
      business: item[6],
      county: item[10],
      dateCreated: item[1],
      email: item[4],
      forename: item[2],
      jobRole: item[5],
      memberUserID: item[0],
      postCode: item[11],
      postTown: item[9],
      surname: item[3],
    }));
    const filteredMembers = importedMembers.filter(
      (item) =>
        !item.email?.includes('sentrysis') &&
        item.memberUserID !== 'MemberUserID'
    );

    setMembers(filteredMembers);

    setBusinesses(
      filteredMembers
        .map((item) => ({
          address1: item.address1,
          address2: item.address2,
          business: item.business,
          county: item.county,
          postCode: item.postCode,
          postTown: item.postTown,
        }))
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.business === value.business)
        )
        .filter((item) => item.business !== 'Business')
    );
  };

  const onVehicleFileLoaded = (data: CSVData) => {
    const vehicleData = data.map((item) => ({
      colour: item[5],
      dateCreated: item[1],
      make: item[3],
      model: item[4],
      registration: item[2],
      vehicleID: item[0],
    }));

    setVehicles(vehicleData.filter((item) => item.vehicleID !== 'VehicleID'));
  };

  const onIncidentFileLoaded = (data: CSVData) => {
    const incidentsValue = data
      .map((item) => ({
        adminViewOnly: item[7],
        dateCreated: item[1],
        incidentDate: item[4],
        incidentGoods: item[8],
        incidentID: item[0],
        incidentProfiles: item[9],
        incidentStatus: item[3],
        incidentType: item[5],
        incidentVehicles: item[10],
        internalDescription: item[6],
        memberUserID: item[2],
        policeInvolvedAtScene: item[11],
      }))
      .filter((item) => item.incidentType !== 'IncidentType');

    setIncidents(incidentsValue);

    setIncidentTypes(
      [
        ...new Set(
          incidentsValue.flatMap((item) => item.incidentType?.split(' | '))
        ),
      ].filter((item) => item !== undefined)
    );
    setIncidentItems(
      [
        ...new Set(
          incidentsValue
            .flatMap((item) => item?.incidentGoods?.split(' | '))
            .filter((item) => item !== undefined)
            .map((item) => item.split('(S')[0])
        ),
      ].filter((item) => item !== '')
    );
  };

  const generateBusiness = (business: Business) =>
    new Promise<NewBusiness>((resolve) => {
      resolve({
        building: business.address1,
        county: business.county,
        groups: [],
        id: uuidv4(),
        name: business.business,
        postcode: business.postCode,
        street: business.address2,
        townCity: business.postTown,
      });
    });

  const onGenerateData = async (values: GenerateData) => {
    console.log(values);
    setGenerating(true);
    const offenderData = profiles;
    const firstNewBusinessData = await Promise.all(
      businesses.map((business) => generateBusiness(business))
    );

    const generateUser = (user: Member) =>
      new Promise<NewUser>((resolve) => {
        resolve({
          business: firstNewBusinessData.find(
            (business) => business.name === user.business
          )?.id,
          email: user.email,
          existing:
            usersData?.listUsers.users.find((item) => item.email === user.email)
              ?.id || undefined,
          fullName: `${user.forename} ${user.surname}`,
          groups:
            usersData?.listUsers.users
              .find((item) => item.email === user.email)
              ?.groups.map(({ id }) => id) || values.fallbackGroup,
          id: uuidv4(),
          role: Role.User,
          sentrysysId: user.memberUserID,
        });
      });

    const generateOffender = (offender: Profile) =>
      new Promise<NewOffender>((resolve) => {
        resolve({
          alias: offender.aka?.split(','),
          build: calcBuild(offender.build),
          dateOfBirth: offender.dateOfBirth
            ? dayjs(offender.dateOfBirth, 'DD/MM/YYYY HH:mm')
            : undefined,
          gender: calcGender(offender.gender),
          groups: values.fallbackGroup,
          height: calcHeight(offender.height),
          id: uuidv4(),
          images: images.filter((image) =>
            image.fileName?.includes(offender.profileID)
          ),
          name:
            // eslint-disable-next-line sonarjs/no-nested-template-literals
            `${offender.forename}${
              offender.surname ? ` ${offender.surname}` : ''
            }` || 'Unidentified Offender',
          peculiarities: offender.knownMarks,
          race: calcRace(offender.ethnicity),
          sentrysysId: offender.profileID,
        });
      });

    const generateVehicles = (vehicle: Vehicle) =>
      new Promise<NewVehicle>((resolve) => {
        resolve({
          colour: vehicle.colour,
          dateCreated: vehicle.dateCreated,
          groups: values.fallbackGroup,
          id: uuidv4(),
          images: images.filter((image) =>
            image.fileName?.includes(vehicle.vehicleID)
          ),
          make: vehicle.make,
          model: vehicle.model,
          registration: vehicle.registration,
          sentrysysId: vehicle.vehicleID,
        });
      });

    const newUserData = await Promise.all(
      members.map((member) => generateUser(member))
    );

    const newBusinessData = firstNewBusinessData.map((item) => {
      const userGroups = [
        ...new Set(
          newUserData
            .filter((user) => user.business === item.id)
            .flatMap((user) => user.groups)
        ),
      ];
      return {
        ...item,
        groups: userGroups.length > 0 ? userGroups : values.fallbackGroup,
      };
    });

    const newOffenderData = await Promise.all(
      offenderData.map((item) => generateOffender(item))
    );
    const newVehicleData = await Promise.all(
      vehicles.map((item) => generateVehicles(item))
    );

    const generateIncident = (incident: Incident) =>
      new Promise<NewIncident>((resolve) => {
        const offenders =
          incident.incidentProfiles
            ?.split(' | ')
            .map((item) => item.split('ProfileID:')[1])
            .map(
              (item) =>
                newOffenderData.find(
                  (offender) => offender.sentrysysId === item
                )?.id || ''
            )
            .filter((item) => item !== undefined) ?? [];

        const offendersIds = [
          ...new Set(offenders.map((offender) => offender)),
        ];

        const incidentVehicles =
          incident.incidentVehicles
            ?.split(' | ')
            .map((item) => item.split('VehicleID::')[1])
            .map(
              (item) =>
                newVehicleData.find((vehicle) => vehicle.sentrysysId === item)
                  ?.id || ''
            ) ?? [];

        const vehiclesIds = [
          ...new Set(incidentVehicles.map((vehicle) => vehicle)),
        ];

        const createdBy = newUserData.find(
          (user) => user.sentrysysId === incident.memberUserID
        )?.id;
        resolve({
          business: newUserData.find(
            (user) => user.sentrysysId === incident.memberUserID
          )?.business,
          createdBy,
          crimeTypes: incidentTypes
            .filter((name) => incident.incidentType?.includes(name))
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            .map((item) => values[item][0] as string),
          date: dayjs(incident.incidentDate, 'DD/MM/YYYY HH:mm'),
          description: incident.internalDescription,
          groups: values.fallbackGroup,
          id: uuidv4(),
          images: images.filter((image) =>
            image.fileName.includes(incident.incidentID)
          ),
          impactTypes: [],
          involvedTypes: [],
          items: incident.incidentGoods
            ?.split(' | ')
            .map((item) => ({
              id: incidentItems.includes(item.split('(S')[0])
                ? (values[
                    incidentItems.find((e) => e === item.split('(S')[0]) ?? ''
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  ][0] as string)
                : '',
              lost: Number.isNaN(
                Number(item.split('(Stolen:')[1]?.split(') ')[0])
              )
                ? 0
                : Number(item.split('(Stolen:')[1]?.split(') ')[0]),
              recovered: Number.isNaN(
                Number(item.split('(Recovered:')[1]?.split(') ')[0])
              )
                ? 0
                : Number(item.split('(Recovered:')[1]?.split(') ')[0]),
            }))
            .filter((item) => item.id !== ''),
          offenders: offendersIds.filter((item) => item !== ''),
          policeInvolved: incident.policeInvolvedAtScene === 'TRUE',
          policeReported: incident.policeInvolvedAtScene === 'TRUE',
          sentrysysId: incident.incidentID,
          subject: '',
          time: dayjs(incident.incidentDate, 'DD/MM/YYYY HH:mm'),
          vehicles: vehiclesIds,
        });
      });

    const generateHistoricIncident = (incident: Incident) =>
      new Promise<HistoricIncident>((resolve) => {
        const createdBy = newUserData.find(
          (user) => user.email === incident.memberUserID
        )?.id;

        resolve({
          business: newUserData.find(
            (user) => user.sentrysysId === incident.memberUserID
          )?.business,
          createdBy,
          crimeTypes: incidentTypes
            .filter((name) => incident.incidentType?.includes(name))
            .map((item) => values[item] as string),
          date: dayjs(incident.incidentDate),
          description: incident.internalDescription,
          groups: values.fallbackGroup,
          id: uuidv4(),
          impactTypes: [],
          involvedTypes: [],
          items: incident.incidentGoods?.split(' | ').map((item) => ({
            id:
              (values[
                incidentItems.find((e) => e === item.split('(S')[0]) || ''
              ] as string) || '',
            lost: Number(item.split('(Recovered:')[1]?.split(') ')[0]) ?? 0,
            recovered: Number(item.split('(Stolen:')[1]?.split(') ')[0]) ?? 0,
          })),
          policeInvolved: incident.policeInvolvedAtScene === 'TRUE',
          policeReported: incident.policeInvolvedAtScene === 'TRUE',
          sentrysysId: incident.incidentID,
          subject: '',
          time: dayjs(incident.incidentDate),
        });
      });

    const newIncidentData = await Promise.all(
      incidents.map((item) => generateIncident(item))
    );
    const filteredIncidents = newIncidentData.filter(
      (incident) =>
        incident.offenders.length > 0 ||
        incident.date > values.excludeIncidentDate
    );
    const incidentIds = new Set(
      filteredIncidents.map((incident) => incident.sentrysysId)
    );

    const newHistoricIncidentData = await Promise.all(
      incidents.map((item) => generateHistoricIncident(item))
    );
    const filteredHistoricIncidents = newHistoricIncidentData.filter(
      (incident) => !incidentIds.has(incident.sentrysysId)
    );

    setNewBusinesses(newBusinessData);
    setNewUsers(newUserData);
    setNewOffenders(newOffenderData);
    setNewIncidents(filteredIncidents);
    setNewHistoricIncidents(filteredHistoricIncidents);
    setNewVehicles(newVehicleData);
    setGenerating(false);
    setCurrentStep(2);
  };

  const onDeleteNewBusiness = (id: string) => {
    setNewBusinesses(newBusinesses.filter((item) => item.id !== id));
  };

  const handleFileListChange: UploadProps['onChange'] = (info) => {
    console.log(images.length);
    if (info.file.response && info.file.status === 'done') {
      setImages([
        ...images,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        ...info.file.response.map((item: Image) => ({ ...item, id: uuidv4() })),
      ]);
    }
    setFileList(info.fileList);
    console.log(images.length);
  };

  const onUpdateOffender = (data: NewOffender) => {
    const index = newOffenders.map(({ id }) => id).indexOf(data.id);
    setNewOffenders(
      update(newOffenders, {
        [index]: {
          $set: data,
        },
      })
    );
  };

  const onUpdateIncident = (data: NewIncident) => {
    const existingData = newIncidents.find(
      (incident) => incident.id === data.id
    );
    if (data.groups.length > (existingData?.groups.length || 0)) {
      // eslint-disable-next-line unicorn/no-array-for-each
      data.offenders.forEach((offenderId) => {
        const index = newOffenders.map(({ id }) => id).indexOf(offenderId);
        const offender = newOffenders.find(({ id }) => id === offenderId);
        if (offender) {
          const newGroups = [...new Set([...offender.groups, ...data.groups])];
          setNewOffenders(
            update(newOffenders, {
              [index]: {
                $set: {
                  ...offender,
                  groups: newGroups,
                },
              },
            })
          );
        }
      });
    }

    const index = newIncidents.map(({ id }) => id).indexOf(data.id);
    setNewIncidents(
      update(newIncidents, {
        [index]: {
          $set: data,
        },
      })
    );
  };

  const onUpdateBusiness = (data: NewBusiness) => {
    const index = newBusinesses.map(({ id }) => id).indexOf(data.id);
    setNewBusinesses(
      update(newBusinesses, {
        [index]: {
          $set: data,
        },
      })
    );
  };

  const onUpdateUser = (data: NewUser) => {
    const index = newUsers.map(({ id }) => id).indexOf(data.id);
    setNewUsers(
      update(newUsers, {
        [index]: {
          $set: data,
        },
      })
    );
  };

  const onSubmit = () => {
    const fixedIncidents = newIncidents.map((incident) => ({
      ...incident,
      items:
        incident.items
          ?.map((item) => ({
            id: item.id,
            lost: item.lost === null ? 0 : item.lost,
            recovered: item.recovered === null ? 0 : item.recovered,
          }))
          .filter((item) => item.id) ?? [],
    }));

    const fixedHisIncidents = newHistoricIncidents.map((incident) => ({
      ...incident,
      items:
        incident.items
          ?.map((item) => ({
            id: item.id[0],
            lost: (item.lost ?? 0) || 0,
            recovered: item.recovered === null ? 0 : item.recovered,
          }))
          .filter((item) => item.id) ?? [],
    }));

    console.log(fixedHisIncidents);

    void importData({
      variables: {
        data: {
          businesses: newBusinesses.map((business) => ({
            connect: business.existing
              ? {
                  id: business.existing,
                  importId: business.id,
                }
              : undefined,
            create: business.existing
              ? undefined
              : {
                  building: business.street,
                  county: business.county,
                  groups: business.groups.map((id) => ({ id })),
                  importId: business.id,
                  name: business.name,
                  postcode: business.postcode,
                  street: business.street,
                  townCity: business.townCity,
                },
          })),
          historicIncidents: fixedHisIncidents.map((incident) => ({
            business: incident.business ? { id: incident.business } : undefined,
            crimeTypes: [
              ...incident.crimeTypes,
              ...incident.impactTypes,
              ...incident.involvedTypes,
            ]
              .flat()
              .map((id) => ({ id })),
            // TODO check
            date: dayjs(incident.date).toDate(),
            groups: incident.groups.map((id) => ({ id })),
            importId: incident.id,
            items: incident.items,
            policeInvolved: incident.policeInvolved,
            policeReported: incident.policeReported,
            // TODO check
            time: dayjs(incident.time).toDate(),
          })),
          images: images.map((image) => ({
            fileName: image.fileName,
            importId: image.id,
            mimetype: 'image/png',
            url: image.url,
          })),
          incidents: fixedIncidents.map((incident) => ({
            business: incident.business ? { id: incident.business } : undefined,
            createdBy: incident.createdBy
              ? { id: incident.createdBy }
              : undefined,
            crimeTypes: [
              ...incident.crimeTypes,
              ...incident.impactTypes,
              ...incident.involvedTypes,
            ]
              .flat()
              .map((id) => ({ id })),
            // TODO check
            date: dayjs(incident.date).toDate(),
            description: incident.description,
            groups: incident.groups.map((id) => ({ id })),
            images: incident.images.map(({ id }) => ({ id })),
            importId: incident.id,
            items: incident.items,
            offenders: incident.offenders.map((id) => ({ id })),
            policeInvolved: incident.policeInvolved,
            policeReported: incident.policeReported,
            // TODO check
            time: dayjs(incident.time).toDate(),
          })),
          offenders: newOffenders
            .map((offender) => ({
              build: offender.build,
              dateOfBirth: offender.dateOfBirth
                ? dayjs(offender.dateOfBirth).toDate()
                : undefined,
              gender: offender.gender,
              groups: offender.groups.map((id) => ({ id })),
              height: offender.height,
              images: offender.images.map(({ id }) => ({ id })),
              importId: offender.id,
              name: offender.name,
              peculiarities: offender.peculiarities,
              race: offender.race,
            }))
            .reverse(),
          scheme: {
            id: schemeId,
          },
          users: newUsers.map((user) => ({
            connect: user.existing
              ? {
                  groups: user.groups.map((id) => ({ id })),
                  id: user.existing,
                  importId: user.id,
                  role: user.role || Role.User,
                }
              : undefined,
            create: user.existing
              ? undefined
              : {
                  business: {
                    id: user.business as string,
                  },
                  email: user.email,
                  fullName: user.fullName,
                  groups: user.groups.map((id) => ({ id })),
                  importId: user.id,
                  role: user.role || Role.User,
                },
          })),
          vehicles: newVehicles.map((vehicle) => ({
            colour: vehicle.colour,
            groups: vehicle.groups.map((id) => ({ id })),
            images: vehicle.images.map(({ id }) => ({ id })),
            importId: vehicle.id,
            make: vehicle.make,
            model: vehicle.model,
            registration: vehicle.registration,
          })),
        },
      },
    });
  };

  return {
    currentStep,
    fileList,
    generating,
    goodsData,
    groupsData,
    handleFileListChange,
    imageModalOpen,
    images,
    incidentItems,
    incidentModalOpen,
    incidentTypes,
    incidents,
    mappingForm,
    memberModalOpen,
    members,
    newBusinesses,
    newIncidents,
    newOffenders,
    newUsers,
    onDeleteNewBusiness,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onGenerateData,
    onIncidentFileLoaded,
    onMembersFileLoaded,
    onProfileFileLoaded,
    onStepChange: setCurrentStep,
    onSubmit,
    onUpdateBusiness,
    onUpdateIncident,
    onUpdateOffender,
    onUpdateUser,
    onVehicleFileLoaded,
    profileModalOpen,
    profiles,
    tagData,
    toggleImageModal,
    toggleIncidentModal,
    toggleMemberModal,
    toggleProfileModal,
    toggleVehicleModal,
    vehicleModalOpen,
    vehicles,
  };
};

export default useSentrysysImport;
