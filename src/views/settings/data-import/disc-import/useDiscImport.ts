import type { FormInstance, UploadFile, UploadProps } from 'antd';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import type { TagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';

import {
  Age,
  Build,
  Gender,
  Height,
  Model,
  Race,
  Role,
  SortOrder,
  TagType,
} from '#/graphql/types';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Form, notification } from 'antd';
import dayjs from 'dayjs';
import { useSchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import { useDiscImportDataMutation } from 'graphql/imports/__generated__/disc-import.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { useListUsersQuery } from 'graphql/users/queries/__generated__/list-users.generated';
import update from 'immutability-helper';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type {
  Business,
  CSVData,
  GenerateData,
  HistoricIncident,
  IDSought,
  Image,
  Incident,
  IncidentTags,
  KnownSubject,
  Member,
  NewBusiness,
  NewIncident,
  NewOffender,
  NewUser,
} from './DiscImport.types';

const calcAge = (value: string) => {
  if (value === '45 - 64') return Age.FortyFifty;
  if (value === '25 - 44') return Age.EighteenThirty;
  if (value === '18 - 24') return Age.EighteenThirty;
  return Age.Unknown;
};

const calcBuild = (value: string) => {
  if (value === 'Stocky/Medium') return Build.Large;
  if (value === 'Medium') return Build.Medium;
  if (value === 'Medium/Slim') return Build.Medium;
  if (value === 'Slim') return Build.Small;
  if (value === 'Average') return Build.Medium;
  if (value === 'Short/Average') return Build.Medium;
  if (value === 'Average/Tall') return Build.Medium;
  if (value === 'Short') return Build.Small;
  return Build.Unknown;
};

const calcHeight = (value: string) => {
  if (value === 'Average/Tall') return Height.Tall;
  if (value === 'Average') return Height.Average;
  if (value === 'Short/Average') return Height.Short;
  if (value === 'Short') return Height.Short;
  return Height.Unknown;
};

const calcGender = (value: string) => {
  if (value === 'm') return Gender.Male;
  if (value === 'f') return Gender.Female;
  return Gender.Unknown;
};

const calcRace = (value: string) => {
  if (value === 'IC1') return Race.Ic1;
  if (value === 'IC2') return Race.Ic2;
  if (value === 'IC3') return Race.Ic3;
  if (value === 'IC4') return Race.Ic4;
  if (value === 'IC5') return Race.Ic5;
  if (value === 'IC6') return Race.Ic6;
  if (value === 'IC9') return Race.Ic9;
  return Race.Unknown;
};

interface Return {
  activeTags: IncidentTags;
  areas: string[];
  currentStep: number;
  fileList: UploadFile[];
  galleries: string[];
  generating: boolean;
  groupsData: SchemeGroupsQuery | undefined;
  handleFileListChange: UploadProps['onChange'];
  idSought: IDSought[];
  idSoughtModalOpen: boolean;
  imageModalOpen: boolean;
  images: Image[];
  incidentModalOpen: boolean;
  incidents: Incident[];
  knownSubjectModalOpen: boolean;
  knownSubjects: KnownSubject[];
  mappingForm: FormInstance<GenerateData>;
  memberModalOpen: boolean;
  members: Member[];
  newBusinesses: NewBusiness[];
  newIncidents: NewIncident[];
  newOffenders: NewOffender[];
  newUsers: NewUser[];
  onDeleteNewBusiness: (id: string) => void;
  onGenerateData: (values: GenerateData) => void;
  onIDSoughtFileLoaded: (data: CSVData) => void;
  onIncidentFileLoaded: (data: CSVData) => void;
  onKnownSubjectFileLoaded: (data: CSVData) => void;
  onMembersFileLoaded: (data: CSVData) => void;
  onStepChange: (value: number) => void;
  onSubmit: () => void;
  onUpdateBusiness: (data: NewBusiness) => void;
  onUpdateIncident: (data: NewIncident) => void;
  onUpdateOffender: (data: NewOffender) => void;
  onUpdateUser: (data: NewUser) => void;
  rematchIncidentOffenders: () => void;
  rematchOffenderImages: () => void;
  tagData: TagsQuery | undefined;
  toggleIdSoughtModal: () => void;
  toggleImageModal: () => void;
  toggleIncidentModal: () => void;
  toggleKnownSubjectModal: () => void;
  toggleMemberModal: () => void;
}

const useDiscImport = (): Return => {
  const [mappingForm] = Form.useForm<GenerateData>();

  const schemeId = useAtomValue(currentSchemeIdAtom);

  const [idSought, setIdSought] = useState<IDSought[]>([]);
  const [knownSubjects, setKnownSubjects] = useState<KnownSubject[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [newBusinesses, setNewBusinesses] = useState<NewBusiness[]>([]);
  const [newUsers, setNewUsers] = useState<NewUser[]>([]);
  const [newOffenders, setNewOffenders] = useState<NewOffender[]>([]);
  const [newIncidents, setNewIncidents] = useState<NewIncident[]>([]);
  const [newHistoricIncidents, setNewHistoricIncidents] = useState<
    HistoricIncident[]
  >([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [areas, setAreas] = useState<string[]>([]);
  const [galleries, setGalleries] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<IncidentTags>({
    assaultViolenceAffray: false,
    attemptedTheft: false,
    begging: false,
    beggingPersistent: false,
    beingOnPremisesWhilstBanned: false,
    breachOfBan: false,
    breachOfSection35Order: false,
    breachPoliceBail: false,
    covidRelated: false,
    criminalDamageGraffitiVandalism: false,
    drunkenDisorderlyBehaviour: false,
    fareEvasion: false,
    goingEquippedToSteal: false,
    harassmentThreateningBehaviour: false,
    hateCrime: false,
    illegalGambling: false,
    inappropriateSexualContact: false,
    joyRiding: false,
    kerbCrawling: false,
    misuseOfID: false,
    noiseNuisance: false,
    other: false,
    otherAlcoholDrugRelated: false,
    otherAntiSocialBehaviour: false,
    otherBreachBan: false,
    otherTheftFraud: false,
    otherViolentOffensiveBehaviour: false,
    possessionOfAnOffensiveWeapon: false,
    possessionOfDrugs: false,
    possessionWithIntentToSupplyDrugs: false,
    racialAbuse: false,
    robbery: false,
    roughSleeping: false,
    section35Issued: false,
    smokingUnderageOrInProhibitedArea: false,
    streetDrinking: false,
    theft: false,
    underageIntoxication: false,
    unlicensedStreetTrading: false,
    unlicensedTaxiCab: false,
    verbalAbuse: false,
  });

  const [generating, setGenerating] = useState<boolean>(false);
  const [memberModalOpen, setMemberModalOpen] = useState<boolean>(false);
  const [knownSubjectModalOpen, setKnownSubjectModalOpen] =
    useState<boolean>(false);
  const [idSoughtModalOpen, setIdSoughtModalOpen] = useState<boolean>(false);
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
        name: SortOrder.Desc,
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

  useEffect(() => {
    mappingForm.setFieldsValue({
      areas: areas.map((area) => ({
        area,
        group: undefined,
        key: area,
      })),
    });
  }, [areas]);

  useEffect(() => {
    mappingForm.setFieldsValue({
      galleries: galleries.map((gallery) => ({
        gallery,
        group: undefined,
        key: gallery,
      })),
    });
  }, [galleries]);

  const [importData] = useDiscImportDataMutation();

  const toggleMemberModal = () => setMemberModalOpen(!memberModalOpen);
  const toggleKnownSubjectModal = () =>
    setKnownSubjectModalOpen(!knownSubjectModalOpen);
  const toggleIdSoughtModal = () => setIdSoughtModalOpen(!idSoughtModalOpen);
  const toggleIncidentModal = () => setIncidentModalOpen(!incidentModalOpen);
  const toggleImageModal = () => setImageModalOpen(!imageModalOpen);

  const onKnownSubjectFileLoaded = (data: CSVData) => {
    const knownSubjectData = data
      .map((item) => ({
        address: item[17],
        ageRange: item[11],
        build: item[13],
        comments: `${item[15]}${item[16]}`,
        databaseDeletionDate: item[21],
        dateAdded: item[20],
        dateOfBirth: item[8],
        distinguishingFeatures: item[14],
        firstName: item[4],
        galleryStatus: item[22],
        gender: item[7],
        height: item[12],
        icCodes: item[10],
        id: item[3],
        incidentCount: item[19],
        lastName: item[5],
        memberEmail: item[2],
        nicknames: item[6],
        postcode: item[18],
        prohibitions: item[9]?.replace(/(<([^>]+)>)/gi, ''),
        workspaceId: item[0],
        workspaceName: item[1],
      }))
      .filter((item) => item.workspaceId !== 'Workspace Id')
      .filter((item) => item.workspaceId !== '');

    const activeGalleries = [
      ...new Set([
        ...galleries,
        ...knownSubjectData.flatMap((item) =>
          item.galleryStatus.split('; ').map((value) => value.split(', ')[0])
        ),
      ]),
    ].filter((area) => area !== '');

    setGalleries(activeGalleries);

    setKnownSubjects(knownSubjectData);
  };

  const onMembersFileLoaded = (data: CSVData) => {
    const importedMembers = data.map((item) => ({
      areas: item[10],
      categories: item[10],
      email: item[4],
      firstName: item[2],
      id: item[0],
      lastName: item[3],
      lastSignedIn: dayjs(item[13]),
      organisation: item[5],
      placeOfWork: item[6],
      premises: item[9],
    }));
    const filteredMembers = importedMembers
      .filter((item) => !item.email?.includes('littoralis'))
      .filter((item) => item.id !== 'Member Id')
      .filter((item) => item.lastSignedIn && item.firstName && item.email);

    // eslint-disable-next-line
    const activeAreas = [
      ...new Set(filteredMembers.flatMap((item) => item.areas?.split(', '))),
      // eslint-disable-next-line
    ]
      .filter((area) => area !== '')
      .filter((area) => area !== undefined && area !== null);

    setAreas(activeAreas);
    setMembers(filteredMembers);
    setBusinesses(
      filteredMembers.map((item) => ({
        lastSignedIn: item.lastSignedIn,
        name: item.organisation,
      }))
    );
  };

  const onIDSoughtFileLoaded = (data: CSVData) => {
    const idSoughtData = data
      .map((item) => ({
        address: item[17],
        ageRange: item[11],
        build: item[13],
        comments: `${item[15]}${item[16]}`,
        databaseDeletionDate: item[21],
        dateAdded: item[20],
        dateOfBirth: item[8],
        distinguishingFeatures: item[14],
        firstName: item[4],
        galleryStatus: item[22],
        gender: item[7],
        height: item[12],
        icCodes: item[10],
        id: item[3],
        incidentCount: item[19],
        lastName: item[5],
        memberEmail: item[2],
        nicknames: item[6],
        postcode: item[18],
        prohibitions: item[9]?.replace(/(<([^>]+)>)/gi, ''),
        workspaceId: item[0],
        workspaceName: item[1],
      }))
      .filter((item) => item.workspaceId !== 'Workspace Id')
      .filter((item) => item.workspaceId !== '');

    const activeGalleries = [
      ...new Set([
        ...galleries,
        ...idSoughtData.flatMap((item) =>
          item.galleryStatus.split('; ').map((value) => value.split(', ')[0])
        ),
      ]),
    ].filter((area) => area !== '');

    setGalleries(activeGalleries);

    setIdSought(idSoughtData);
  };

  const onIncidentFileLoaded = (data: CSVData) => {
    const incidentsValue = data
      .map((item) => ({
        address: item[28],
        assaultViolenceAffray: item[36],
        attemptedTheft: item[65],
        begging: item[38],
        beggingPersistent: item[37],
        beingOnPremisesWhilstBanned: item[52],
        breachOfBan: item[62],
        breachOfSection35Order: item[53],
        breachPoliceBail: item[69],
        covidRelated: item[76],
        crimeReportStatus: item[9],
        criminalDamageGraffitiVandalism: item[39],
        date: item[2],
        dateTime: item[4],
        dealingInvolved: item[18],
        description: item[6],
        drinkInvolved: item[16],
        drugsInvolved: item[17],
        drunkenDisorderlyBehaviour: item[63],
        fareEvasion: item[75],
        fraudInvolved: item[13],
        goingEquippedToSteal: item[59],
        groupInvolved: item[20],
        harassmentThreateningBehaviour: item[41],
        hateCrime: item[60],
        id: item[1],
        illegalGambling: item[66],
        inappropriateSexualContact: item[45],
        incidentNotes: item[118],
        internalReference: item[10],
        joyRiding: item[42],
        kerbCrawling: item[43],
        locationName: item[33],
        lossRecovered: item[24],
        lossRecoveredAtTime: item[26],
        lossValue: item[23],
        memberEmail: item[32],
        memberId: item[30],
        memberName: item[31],
        misuseOfID: item[57],
        noiseNuisance: item[44],
        other: item[54],
        otherAlcoholDrugRelated: item[70],
        otherAntiSocialBehaviour: item[71],
        otherBreachBan: item[74],
        otherOutcome: item[15],
        otherTheftFraud: item[72],
        otherViolentOffensiveBehaviour: item[73],
        outcome: item[14],
        policeContacted: item[7],
        policeReference: item[25],
        possessionOfAnOffensiveWeapon: item[64],
        possessionOfDrugs: item[49],
        possessionWithIntentToSupplyDrugs: item[40],
        postcode: item[29],
        premises: item[34],
        racialAbuse: item[46],
        robbery: item[67],
        roughSleeping: item[61],
        section35Issued: item[68],
        sentToEmails: item[8],
        smokingUnderageOrInProhibitedArea: item[47],
        streetDrinking: item[48],
        subjectDOB: item[88],
        subjectDOB1: item[94],
        subjectDOB2: item[100],
        subjectDOB3: item[106],
        subjectDOB4: item[112],
        subjectDeletionDate: item[91],
        subjectDeletionDate1: item[97],
        subjectDeletionDate2: item[103],
        subjectDeletionDate3: item[109],
        subjectDeletionDate4: item[115],
        subjectGender: item[89],
        subjectGender1: item[95],
        subjectGender2: item[101],
        subjectGender3: item[107],
        subjectGender4: item[113],
        subjectID: item[86],
        subjectID1: item[92],
        subjectID2: item[98],
        subjectID3: item[104],
        subjectID4: item[110],
        subjectName: item[87],
        subjectName1: item[93],
        subjectName2: item[99],
        subjectName3: item[105],
        subjectName4: item[111],
        subjectProhibitions: item[90],
        subjectProhibitions1: item[96],
        subjectProhibitions2: item[102],
        subjectProhibitions3: item[108],
        subjectProhibitions4: item[114],
        summary: item[5],
        theft: item[50],
        typeOfOffence: item[35],
        typeOfPropertyGoods: item[27],
        underageIntoxication: item[58],
        unlicensedStreetTrading: item[56],
        unlicensedTaxiCab: item[55],
        vehicleDescriptions: item[11],
        vehicleRegistrations: item[12],
        verbalAbuse: item[51],
        verbalAbuseInvolved: item[22],
        violenceInvolved: item[21],
        weaponInvolved: item[19],
        workspaceName: item[0],
      }))
      .filter((item) => item.workspaceName !== 'Workspace Name')
      .filter((item) => item.workspaceName !== '');
    setIncidents(incidentsValue);
    setActiveTags({
      assaultViolenceAffray: incidentsValue
        .map((incident) => incident.assaultViolenceAffray)
        .includes('Yes'),
      attemptedTheft: incidentsValue
        .map((incident) => incident.attemptedTheft)
        .includes('Yes'),
      begging: incidentsValue
        .map((incident) => incident.begging)
        .includes('Yes'),
      beggingPersistent: incidentsValue
        .map((incident) => incident.beggingPersistent)
        .includes('Yes'),
      beingOnPremisesWhilstBanned: incidentsValue
        .map((incident) => incident.beingOnPremisesWhilstBanned)
        .includes('Yes'),
      breachOfBan: incidentsValue
        .map((incident) => incident.breachOfBan)
        .includes('Yes'),
      breachOfSection35Order: incidentsValue
        .map((incident) => incident.breachOfSection35Order)
        .includes('Yes'),
      breachPoliceBail: incidentsValue
        .map((incident) => incident.breachPoliceBail)
        .includes('Yes'),
      covidRelated: incidentsValue
        .map((incident) => incident.covidRelated)
        .includes('Yes'),
      criminalDamageGraffitiVandalism: incidentsValue
        .map((incident) => incident.criminalDamageGraffitiVandalism)
        .includes('Yes'),
      drunkenDisorderlyBehaviour: incidentsValue
        .map((incident) => incident.drunkenDisorderlyBehaviour)
        .includes('Yes'),
      fareEvasion: incidentsValue
        .map((incident) => incident.fareEvasion)
        .includes('Yes'),
      goingEquippedToSteal: incidentsValue
        .map((incident) => incident.goingEquippedToSteal)
        .includes('Yes'),
      harassmentThreateningBehaviour: incidentsValue
        .map((incident) => incident.harassmentThreateningBehaviour)
        .includes('Yes'),
      hateCrime: incidentsValue
        .map((incident) => incident.hateCrime)
        .includes('Yes'),
      illegalGambling: incidentsValue
        .map((incident) => incident.illegalGambling)
        .includes('Yes'),
      inappropriateSexualContact: incidentsValue
        .map((incident) => incident.inappropriateSexualContact)
        .includes('Yes'),
      joyRiding: incidentsValue
        .map((incident) => incident.joyRiding)
        .includes('Yes'),
      kerbCrawling: incidentsValue
        .map((incident) => incident.kerbCrawling)
        .includes('Yes'),
      misuseOfID: incidentsValue
        .map((incident) => incident.misuseOfID)
        .includes('Yes'),
      noiseNuisance: incidentsValue
        .map((incident) => incident.noiseNuisance)
        .includes('Yes'),
      other: incidentsValue.map((incident) => incident.other).includes('Yes'),
      otherAlcoholDrugRelated: incidentsValue
        .map((incident) => incident.otherAlcoholDrugRelated)
        .includes('Yes'),
      otherAntiSocialBehaviour: incidentsValue
        .map((incident) => incident.otherAntiSocialBehaviour)
        .includes('Yes'),
      otherBreachBan: incidentsValue
        .map((incident) => incident.otherBreachBan)
        .includes('Yes'),
      otherTheftFraud: incidentsValue
        .map((incident) => incident.otherTheftFraud)
        .includes('Yes'),
      otherViolentOffensiveBehaviour: incidentsValue
        .map((incident) => incident.otherViolentOffensiveBehaviour)
        .includes('Yes'),
      possessionOfAnOffensiveWeapon: incidentsValue
        .map((incident) => incident.possessionOfAnOffensiveWeapon)
        .includes('Yes'),
      possessionOfDrugs: incidentsValue
        .map((incident) => incident.possessionOfDrugs)
        .includes('Yes'),
      possessionWithIntentToSupplyDrugs: incidentsValue
        .map((incident) => incident.possessionWithIntentToSupplyDrugs)
        .includes('Yes'),
      racialAbuse: incidentsValue
        .map((incident) => incident.racialAbuse)
        .includes('Yes'),
      robbery: incidentsValue
        .map((incident) => incident.robbery)
        .includes('Yes'),
      roughSleeping: incidentsValue
        .map((incident) => incident.roughSleeping)
        .includes('Yes'),
      section35Issued: incidentsValue
        .map((incident) => incident.section35Issued)
        .includes('Yes'),
      smokingUnderageOrInProhibitedArea: incidentsValue
        .map((incident) => incident.smokingUnderageOrInProhibitedArea)
        .includes('Yes'),
      streetDrinking: incidentsValue
        .map((incident) => incident.streetDrinking)
        .includes('Yes'),
      theft: incidentsValue.map((incident) => incident.theft).includes('Yes'),
      underageIntoxication: incidentsValue
        .map((incident) => incident.underageIntoxication)
        .includes('Yes'),
      unlicensedStreetTrading: incidentsValue
        .map((incident) => incident.unlicensedStreetTrading)
        .includes('Yes'),
      unlicensedTaxiCab: incidentsValue
        .map((incident) => incident.unlicensedTaxiCab)
        .includes('Yes'),
      verbalAbuse: incidentsValue
        .map((incident) => incident.verbalAbuse)
        .includes('Yes'),
    });
  };

  const generateBusiness = (business: Business) =>
    new Promise<NewBusiness>((resolve) => {
      resolve({
        building: '',
        county: '',
        id: uuidv4(),
        name: business.name,
        postcode: '',
        street: '',
        townCity: '',
      });
    });

  const onGenerateData = async (values: GenerateData) => {
    setGenerating(true);
    const offenderData = [...knownSubjects, ...idSought];
    const newBusinessData = await Promise.all(
      businesses
        // .filter(
        //   (business) =>
        //     business.name && business.lastSignedIn > values.excludeUserDate
        // )
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.name === value.name)
        )
        .map((business) => generateBusiness(business))
    );
    const filteredUsers = members.filter(
      (member) =>
        // member.lastSignedIn > values.excludeUserDate &&
        member.firstName && member.email
    );

    const getUserGroups = (user: Member) => {
      const userAreasIds = [
        ...new Set(
          user.areas
            ?.split(', ')
            .flatMap(
              (area) =>
                values.areas?.find((value) => value.area === area)?.group || ''
            )
            .filter((item) => item !== '')
        ),
      ];
      const groups = [...(values.defaultGroup || ''), ...userAreasIds].filter(
        (item) => item !== ''
      );
      if (groups.length > 0) return groups;

      return values.fallbackGroup;
    };

    const generateUser = (user: Member) =>
      new Promise<NewUser>((resolve) => {
        resolve({
          business: newBusinessData.find(
            (business) => business.name === user.organisation
          )?.id,
          email: user.email,
          existing:
            usersData?.listUsers.users.find((item) => item.email === user.email)
              ?.id || undefined,
          fullName: `${user.firstName} ${user.lastName}`,
          groups: getUserGroups(user),
          id: uuidv4(),
          lastLogin: user.lastSignedIn,
          role: values.defaultRole,
        });
      });

    const generateOffender = (offender: IDSought | KnownSubject) =>
      new Promise<NewOffender>((resolve) => {
        resolve({
          age: calcAge(offender.ageRange),
          alias: offender.nicknames.split(','),
          build: calcBuild(offender.build),
          comments: offender.comments,
          dateOfBirth: offender.dateOfBirth
            ? dayjs(offender.dateOfBirth)
            : undefined,
          deletionDate: dayjs(offender.databaseDeletionDate),
          discId: offender.id,
          gender: calcGender(offender.gender),
          groups: [
            ...new Set(
              ...(values.defaultGroup || ''),
              ...offender.galleryStatus
                .split('; ')
                .map((value) => value.split(', ')[0])
                .map(
                  (gallery) =>
                    values.galleries.find((value) => value.gallery === gallery)
                      ?.group || ''
                )
            ),
          ]
            .flat()
            .filter((item) => item !== ''),
          height: calcHeight(offender.height),
          id: uuidv4(),
          images: images.filter(
            (image) =>
              image.fileName?.includes(offender.id) ||
              image.originalName?.includes(offender.id)
          ),
          name:
            offender.firstName && offender.lastName
              ? `${offender.firstName} ${offender.lastName}`
              : offender.firstName || 'Unidentified Offender',
          peculiarities: offender.distinguishingFeatures,
          postcode: offender.postcode,
          race: calcRace(offender.icCodes),
          street: offender.address,
        });
      });

    const newUserData = await Promise.all(
      filteredUsers.map((member) => generateUser(member))
    );
    const newOffenderData = await Promise.all(
      offenderData.map((item) => generateOffender(item))
    );

    const getIncidentGroups = (
      incident: Incident,
      offenders: string[],
      createdBy: string
    ) => {
      const offenderGroups = newOffenderData
        .filter((offender) => offenders.includes(offender.id))
        .flatMap((offender) => offender.groups);
      if (offenderGroups.length > 0) return offenderGroups;

      const userGroups =
        newUserData.find((user) => user.id === createdBy)?.groups ?? [];
      if (userGroups.length > 0) return userGroups;

      const streetGroups = groupsData?.groups
        .filter((group) => incident.address.includes(group.name.split(' ')[0]))
        .map((group) => group.id);
      if (streetGroups && streetGroups.length > 0) return streetGroups;

      return values.fallbackGroup;
    };

    const generateIncident = (incident: Incident) =>
      new Promise<NewIncident>((resolve) => {
        // Debug logging for incident-offender matching
        if (
          incident.subjectID ||
          incident.subjectID1 ||
          incident.subjectID2 ||
          incident.subjectID3 ||
          incident.subjectID4
        ) {
          console.log(`\n=== Incident ${incident.id} Subject IDs ===`);
          console.log(
            'subjectID:',
            `"${incident.subjectID}" (length: ${incident.subjectID?.length || 0})`
          );
          console.log(
            'subjectID1:',
            `"${incident.subjectID1}" (length: ${incident.subjectID1?.length || 0})`
          );
          console.log(
            'subjectID2:',
            `"${incident.subjectID2}" (length: ${incident.subjectID2?.length || 0})`
          );
          console.log(
            'subjectID3:',
            `"${incident.subjectID3}" (length: ${incident.subjectID3?.length || 0})`
          );
          console.log(
            'subjectID4:',
            `"${incident.subjectID4}" (length: ${incident.subjectID4?.length || 0})`
          );

          // Check what offenders we have
          console.log('\nAvailable offender discIds (first 10):');
          for (const o of newOffenderData.slice(0, 10)) {
            console.log(
              `  - "${o.discId}" (length: ${o.discId?.length || 0}) -> ${o.name}`
            );
          }

          // Try trimmed comparison for debugging
          console.log('\nTrying trimmed comparison for first Subject ID:');
          if (incident.subjectID) {
            const trimmedSubjectID = incident.subjectID.trim();
            const match = newOffenderData.find(
              (o) => o.discId?.trim() === trimmedSubjectID
            );
            console.log(`  Trimmed subjectID: "${trimmedSubjectID}"`);
            const matchResult = match ? `YES - ${match.name}` : 'NO';
            console.log(`  Found match after trimming? ${matchResult}`);
          }
        }

        const offenders = [
          incident.subjectID
            ? newOffenderData?.find(
                (offender) => offender.discId === incident.subjectID
              ) || null
            : null,
          incident.subjectID1
            ? newOffenderData?.find(
                (offender) => offender.discId === incident.subjectID1
              ) || null
            : null,
          incident.subjectID2
            ? newOffenderData?.find(
                (offender) => offender.discId === incident.subjectID2
              ) || null
            : null,
          incident.subjectID3
            ? newOffenderData?.find(
                (offender) => offender.discId === incident.subjectID3
              ) || null
            : null,
          incident.subjectID4
            ? newOffenderData?.find(
                (offender) => offender.discId === incident.subjectID4
              ) || null
            : null,
        ].filter((item) => item !== null);

        console.log(
          `Matched ${offenders.length} offenders for incident ${incident.id}`
        );
        // eslint-disable-next-line
        const offendersIds = [
          ...new Set(offenders.map((offender) => offender.id)),
          // eslint-disable-next-line
        ];
        const createdBy = newUserData.find(
          (user) => user.email === incident.memberEmail
        )?.id;
        resolve({
          building: '',
          business: newUserData.find(
            (user) => user.email === incident.memberEmail
          )?.business,
          county: '',
          createdBy,
          crimeTypes: [
            ...new Set(
              [
                incident.assaultViolenceAffray
                  ? values.assaultViolenceAffray
                  : '',
                incident.beggingPersistent ? values.beggingPersistent : '',
                incident.begging ? values.begging : '',
                incident.criminalDamageGraffitiVandalism
                  ? values.criminalDamageGraffitiVandalism
                  : '',
                incident.possessionWithIntentToSupplyDrugs
                  ? values.possessionWithIntentToSupplyDrugs
                  : '',
                incident.harassmentThreateningBehaviour
                  ? values.harassmentThreateningBehaviour
                  : '',
                incident.joyRiding ? values.joyRiding : '',
                incident.kerbCrawling ? values.kerbCrawling : '',
                incident.noiseNuisance ? values.noiseNuisance : '',
                incident.inappropriateSexualContact
                  ? values.inappropriateSexualContact
                  : '',
                incident.smokingUnderageOrInProhibitedArea
                  ? values.smokingUnderageOrInProhibitedArea
                  : '',
                incident.streetDrinking ? values.streetDrinking : '',
                incident.possessionOfDrugs ? values.possessionOfDrugs : '',
                incident.theft ? values.theft : '',
                incident.beingOnPremisesWhilstBanned
                  ? values.beingOnPremisesWhilstBanned
                  : '',
                incident.breachOfSection35Order
                  ? values.breachOfSection35Order
                  : '',
                incident.other ? values.other : '',
                incident.unlicensedTaxiCab ? values.unlicensedTaxiCab : '',
                incident.unlicensedStreetTrading
                  ? values.unlicensedStreetTrading
                  : '',
                incident.misuseOfID ? values.misuseOfID : '',
                incident.underageIntoxication
                  ? values.underageIntoxication
                  : '',
                incident.goingEquippedToSteal
                  ? values.goingEquippedToSteal
                  : '',
                incident.hateCrime ? values.hateCrime : '',
                incident.roughSleeping ? values.roughSleeping : '',
                incident.breachOfBan ? values.breachOfBan : '',
                incident.drunkenDisorderlyBehaviour
                  ? values.drunkenDisorderlyBehaviour
                  : '',
                incident.possessionOfAnOffensiveWeapon
                  ? values.possessionOfAnOffensiveWeapon
                  : '',
                incident.attemptedTheft ? values.attemptedTheft : '',
                incident.illegalGambling ? values.illegalGambling : '',
                incident.robbery ? values.robbery : '',
                incident.section35Issued ? values.section35Issued : '',
                incident.breachPoliceBail ? values.breachPoliceBail : '',
                incident.otherAlcoholDrugRelated
                  ? values.otherAlcoholDrugRelated
                  : '',
                incident.otherAntiSocialBehaviour
                  ? values.otherAntiSocialBehaviour
                  : '',
                incident.otherTheftFraud ? values.otherTheftFraud : '',
                incident.otherViolentOffensiveBehaviour
                  ? values.otherViolentOffensiveBehaviour
                  : '',
                incident.otherBreachBan ? values.otherBreachBan : '',
                incident.fareEvasion ? values.fareEvasion : '',
                incident.racialAbuse ? values.racialAbuse : '',
                incident.verbalAbuse ? values.verbalAbuse : '',
              ]
                .flat()
                .filter((item) => item !== '')
                .filter(
                  (item) =>
                    tagData?.tags.find((tag) => tag.id === item)?.type ===
                    TagType.IncidentCrimeType
                )
            ),
          ],
          date:
            incident.date && dayjs(incident.date).isValid()
              ? dayjs(incident.date)
              : incident.dateTime && dayjs(incident.dateTime).isValid()
                ? dayjs(incident.dateTime)
                : dayjs(),
          description: incident.description
            ?.replace(/(<([^>]+)>)/gi, '')
            .replace('&nbsp;', ''),
          discId: incident.id,
          groups: getIncidentGroups(incident, offendersIds, createdBy || ''),
          id: uuidv4(),
          images: images.filter((image) =>
            [
              incident.subjectID,
              incident.subjectID1,
              incident.subjectID2,
              incident.subjectID3,
              incident.subjectID4,
            ]
              .filter(Boolean) // Remove empty/null IDs
              .some((subjectId) => image.fileName?.includes(subjectId))
          ),
          impactTypes: [
            ...new Set(
              [
                incident.assaultViolenceAffray
                  ? values.assaultViolenceAffray
                  : '',
                incident.beggingPersistent ? values.beggingPersistent : '',
                incident.begging ? values.begging : '',
                incident.criminalDamageGraffitiVandalism
                  ? values.criminalDamageGraffitiVandalism
                  : '',
                incident.possessionWithIntentToSupplyDrugs
                  ? values.possessionWithIntentToSupplyDrugs
                  : '',
                incident.harassmentThreateningBehaviour
                  ? values.harassmentThreateningBehaviour
                  : '',
                incident.joyRiding ? values.joyRiding : '',
                incident.kerbCrawling ? values.kerbCrawling : '',
                incident.noiseNuisance ? values.noiseNuisance : '',
                incident.inappropriateSexualContact
                  ? values.inappropriateSexualContact
                  : '',
                incident.smokingUnderageOrInProhibitedArea
                  ? values.smokingUnderageOrInProhibitedArea
                  : '',
                incident.streetDrinking ? values.streetDrinking : '',
                incident.possessionOfDrugs ? values.possessionOfDrugs : '',
                incident.theft ? values.theft : '',
                incident.beingOnPremisesWhilstBanned
                  ? values.beingOnPremisesWhilstBanned
                  : '',
                incident.breachOfSection35Order
                  ? values.breachOfSection35Order
                  : '',
                incident.other ? values.other : '',
                incident.unlicensedTaxiCab ? values.unlicensedTaxiCab : '',
                incident.unlicensedStreetTrading
                  ? values.unlicensedStreetTrading
                  : '',
                incident.misuseOfID ? values.misuseOfID : '',
                incident.underageIntoxication
                  ? values.underageIntoxication
                  : '',
                incident.goingEquippedToSteal
                  ? values.goingEquippedToSteal
                  : '',
                incident.hateCrime ? values.hateCrime : '',
                incident.roughSleeping ? values.roughSleeping : '',
                incident.breachOfBan ? values.breachOfBan : '',
                incident.drunkenDisorderlyBehaviour
                  ? values.drunkenDisorderlyBehaviour
                  : '',
                incident.possessionOfAnOffensiveWeapon
                  ? values.possessionOfAnOffensiveWeapon
                  : '',
                incident.attemptedTheft ? values.attemptedTheft : '',
                incident.illegalGambling ? values.illegalGambling : '',
                incident.robbery ? values.robbery : '',
                incident.section35Issued ? values.section35Issued : '',
                incident.breachPoliceBail ? values.breachPoliceBail : '',
                incident.otherAlcoholDrugRelated
                  ? values.otherAlcoholDrugRelated
                  : '',
                incident.otherAntiSocialBehaviour
                  ? values.otherAntiSocialBehaviour
                  : '',
                incident.otherTheftFraud ? values.otherTheftFraud : '',
                incident.otherViolentOffensiveBehaviour
                  ? values.otherViolentOffensiveBehaviour
                  : '',
                incident.otherBreachBan ? values.otherBreachBan : '',
                incident.fareEvasion ? values.fareEvasion : '',
                incident.racialAbuse ? values.racialAbuse : '',
                incident.verbalAbuse ? values.verbalAbuse : '',
              ]
                .flat()
                .filter((item) => item !== '')
                .filter(
                  (item) =>
                    tagData?.tags.find((tag) => tag.id === item)?.type ===
                    TagType.IncidentImpact
                )
            ),
          ],
          involvedTypes: [
            ...new Set(
              [
                incident.assaultViolenceAffray
                  ? values.assaultViolenceAffray
                  : '',
                incident.beggingPersistent ? values.beggingPersistent : '',
                incident.begging ? values.begging : '',
                incident.criminalDamageGraffitiVandalism
                  ? values.criminalDamageGraffitiVandalism
                  : '',
                incident.possessionWithIntentToSupplyDrugs
                  ? values.possessionWithIntentToSupplyDrugs
                  : '',
                incident.harassmentThreateningBehaviour
                  ? values.harassmentThreateningBehaviour
                  : '',
                incident.joyRiding ? values.joyRiding : '',
                incident.kerbCrawling ? values.kerbCrawling : '',
                incident.noiseNuisance ? values.noiseNuisance : '',
                incident.inappropriateSexualContact
                  ? values.inappropriateSexualContact
                  : '',
                incident.smokingUnderageOrInProhibitedArea
                  ? values.smokingUnderageOrInProhibitedArea
                  : '',
                incident.streetDrinking ? values.streetDrinking : '',
                incident.possessionOfDrugs ? values.possessionOfDrugs : '',
                incident.theft ? values.theft : '',
                incident.beingOnPremisesWhilstBanned
                  ? values.beingOnPremisesWhilstBanned
                  : '',
                incident.breachOfSection35Order
                  ? values.breachOfSection35Order
                  : '',
                incident.other ? values.other : '',
                incident.unlicensedTaxiCab ? values.unlicensedTaxiCab : '',
                incident.unlicensedStreetTrading
                  ? values.unlicensedStreetTrading
                  : '',
                incident.misuseOfID ? values.misuseOfID : '',
                incident.underageIntoxication
                  ? values.underageIntoxication
                  : '',
                incident.goingEquippedToSteal
                  ? values.goingEquippedToSteal
                  : '',
                incident.hateCrime ? values.hateCrime : '',
                incident.roughSleeping ? values.roughSleeping : '',
                incident.breachOfBan ? values.breachOfBan : '',
                incident.drunkenDisorderlyBehaviour
                  ? values.drunkenDisorderlyBehaviour
                  : '',
                incident.possessionOfAnOffensiveWeapon
                  ? values.possessionOfAnOffensiveWeapon
                  : '',
                incident.attemptedTheft ? values.attemptedTheft : '',
                incident.illegalGambling ? values.illegalGambling : '',
                incident.robbery ? values.robbery : '',
                incident.section35Issued ? values.section35Issued : '',
                incident.breachPoliceBail ? values.breachPoliceBail : '',
                incident.otherAlcoholDrugRelated
                  ? values.otherAlcoholDrugRelated
                  : '',
                incident.otherAntiSocialBehaviour
                  ? values.otherAntiSocialBehaviour
                  : '',
                incident.otherTheftFraud ? values.otherTheftFraud : '',
                incident.otherViolentOffensiveBehaviour
                  ? values.otherViolentOffensiveBehaviour
                  : '',
                incident.otherBreachBan ? values.otherBreachBan : '',
                incident.fareEvasion ? values.fareEvasion : '',
                incident.racialAbuse ? values.racialAbuse : '',
                incident.verbalAbuse ? values.verbalAbuse : '',
              ]
                .flat()
                .filter((item) => item !== '')
                .filter(
                  (item) =>
                    tagData?.tags.find((tag) => tag.id === item)?.type ===
                    TagType.IncidentInvolved
                )
            ),
          ],
          lostValue: Number(incident.lossValue),
          offenders: offendersIds,
          policeInvolved: incident.policeContacted.includes('attended'),
          policeRef: incident.policeReference,
          policeReported: incident.policeContacted.includes('Yes'),
          postcode: incident.postcode,
          recoveredValue: Number(incident.lossRecovered),
          street: incident.address.replace(values.townCity, '') || 'London',
          subject: '',
          time:
            incident.dateTime && dayjs(incident.dateTime).isValid()
              ? dayjs(incident.dateTime)
              : dayjs(),
          townCity: values.townCity,
        });
      });

    const generateHistoricIncident = (incident: Incident) =>
      new Promise<HistoricIncident>((resolve) => {
        const createdBy = newUserData.find(
          (user) => user.email === incident.memberEmail
        )?.id;

        resolve({
          business: newUserData.find(
            (user) => user.email === incident.memberEmail
          )?.business,
          crimeTypes: [
            ...new Set(
              [
                incident.assaultViolenceAffray
                  ? values.assaultViolenceAffray
                  : '',
                incident.beggingPersistent ? values.beggingPersistent : '',
                incident.begging ? values.begging : '',
                incident.criminalDamageGraffitiVandalism
                  ? values.criminalDamageGraffitiVandalism
                  : '',
                incident.possessionWithIntentToSupplyDrugs
                  ? values.possessionWithIntentToSupplyDrugs
                  : '',
                incident.harassmentThreateningBehaviour
                  ? values.harassmentThreateningBehaviour
                  : '',
                incident.joyRiding ? values.joyRiding : '',
                incident.kerbCrawling ? values.kerbCrawling : '',
                incident.noiseNuisance ? values.noiseNuisance : '',
                incident.inappropriateSexualContact
                  ? values.inappropriateSexualContact
                  : '',
                incident.smokingUnderageOrInProhibitedArea
                  ? values.smokingUnderageOrInProhibitedArea
                  : '',
                incident.streetDrinking ? values.streetDrinking : '',
                incident.possessionOfDrugs ? values.possessionOfDrugs : '',
                incident.theft ? values.theft : '',
                incident.beingOnPremisesWhilstBanned
                  ? values.beingOnPremisesWhilstBanned
                  : '',
                incident.breachOfSection35Order
                  ? values.breachOfSection35Order
                  : '',
                incident.other ? values.other : '',
                incident.unlicensedTaxiCab ? values.unlicensedTaxiCab : '',
                incident.unlicensedStreetTrading
                  ? values.unlicensedStreetTrading
                  : '',
                incident.misuseOfID ? values.misuseOfID : '',
                incident.underageIntoxication
                  ? values.underageIntoxication
                  : '',
                incident.goingEquippedToSteal
                  ? values.goingEquippedToSteal
                  : '',
                incident.hateCrime ? values.hateCrime : '',
                incident.roughSleeping ? values.roughSleeping : '',
                incident.breachOfBan ? values.breachOfBan : '',
                incident.drunkenDisorderlyBehaviour
                  ? values.drunkenDisorderlyBehaviour
                  : '',
                incident.possessionOfAnOffensiveWeapon
                  ? values.possessionOfAnOffensiveWeapon
                  : '',
                incident.attemptedTheft ? values.attemptedTheft : '',
                incident.illegalGambling ? values.illegalGambling : '',
                incident.robbery ? values.robbery : '',
                incident.section35Issued ? values.section35Issued : '',
                incident.breachPoliceBail ? values.breachPoliceBail : '',
                incident.otherAlcoholDrugRelated
                  ? values.otherAlcoholDrugRelated
                  : '',
                incident.otherAntiSocialBehaviour
                  ? values.otherAntiSocialBehaviour
                  : '',
                incident.otherTheftFraud ? values.otherTheftFraud : '',
                incident.otherViolentOffensiveBehaviour
                  ? values.otherViolentOffensiveBehaviour
                  : '',
                incident.otherBreachBan ? values.otherBreachBan : '',
                incident.fareEvasion ? values.fareEvasion : '',
                incident.racialAbuse ? values.racialAbuse : '',
                incident.verbalAbuse ? values.verbalAbuse : '',
              ]
                .flat()
                .filter((item) => item !== '')
                .filter(
                  (item) =>
                    tagData?.tags.find((tag) => tag.id === item)?.type ===
                    TagType.IncidentCrimeType
                )
            ),
          ],
          date:
            incident.date && dayjs(incident.date).isValid()
              ? dayjs(incident.date)
              : incident.dateTime && dayjs(incident.dateTime).isValid()
                ? dayjs(incident.dateTime)
                : dayjs(),
          description: incident.description,
          discId: incident.id,
          groups: getIncidentGroups(incident, [], createdBy || ''),
          id: uuidv4(),
          impactTypes: [
            ...new Set(
              [
                incident.assaultViolenceAffray
                  ? values.assaultViolenceAffray
                  : '',
                incident.beggingPersistent ? values.beggingPersistent : '',
                incident.begging ? values.begging : '',
                incident.criminalDamageGraffitiVandalism
                  ? values.criminalDamageGraffitiVandalism
                  : '',
                incident.possessionWithIntentToSupplyDrugs
                  ? values.possessionWithIntentToSupplyDrugs
                  : '',
                incident.harassmentThreateningBehaviour
                  ? values.harassmentThreateningBehaviour
                  : '',
                incident.joyRiding ? values.joyRiding : '',
                incident.kerbCrawling ? values.kerbCrawling : '',
                incident.noiseNuisance ? values.noiseNuisance : '',
                incident.inappropriateSexualContact
                  ? values.inappropriateSexualContact
                  : '',
                incident.smokingUnderageOrInProhibitedArea
                  ? values.smokingUnderageOrInProhibitedArea
                  : '',
                incident.streetDrinking ? values.streetDrinking : '',
                incident.possessionOfDrugs ? values.possessionOfDrugs : '',
                incident.theft ? values.theft : '',
                incident.beingOnPremisesWhilstBanned
                  ? values.beingOnPremisesWhilstBanned
                  : '',
                incident.breachOfSection35Order
                  ? values.breachOfSection35Order
                  : '',
                incident.other ? values.other : '',
                incident.unlicensedTaxiCab ? values.unlicensedTaxiCab : '',
                incident.unlicensedStreetTrading
                  ? values.unlicensedStreetTrading
                  : '',
                incident.misuseOfID ? values.misuseOfID : '',
                incident.underageIntoxication
                  ? values.underageIntoxication
                  : '',
                incident.goingEquippedToSteal
                  ? values.goingEquippedToSteal
                  : '',
                incident.hateCrime ? values.hateCrime : '',
                incident.roughSleeping ? values.roughSleeping : '',
                incident.breachOfBan ? values.breachOfBan : '',
                incident.drunkenDisorderlyBehaviour
                  ? values.drunkenDisorderlyBehaviour
                  : '',
                incident.possessionOfAnOffensiveWeapon
                  ? values.possessionOfAnOffensiveWeapon
                  : '',
                incident.attemptedTheft ? values.attemptedTheft : '',
                incident.illegalGambling ? values.illegalGambling : '',
                incident.robbery ? values.robbery : '',
                incident.section35Issued ? values.section35Issued : '',
                incident.breachPoliceBail ? values.breachPoliceBail : '',
                incident.otherAlcoholDrugRelated
                  ? values.otherAlcoholDrugRelated
                  : '',
                incident.otherAntiSocialBehaviour
                  ? values.otherAntiSocialBehaviour
                  : '',
                incident.otherTheftFraud ? values.otherTheftFraud : '',
                incident.otherViolentOffensiveBehaviour
                  ? values.otherViolentOffensiveBehaviour
                  : '',
                incident.otherBreachBan ? values.otherBreachBan : '',
                incident.fareEvasion ? values.fareEvasion : '',
                incident.racialAbuse ? values.racialAbuse : '',
                incident.verbalAbuse ? values.verbalAbuse : '',
              ]
                .flat()
                .filter((item) => item !== '')
                .filter(
                  (item) =>
                    tagData?.tags.find((tag) => tag.id === item)?.type ===
                    TagType.IncidentImpact
                )
            ),
          ],
          involvedTypes: [
            ...new Set(
              [
                incident.assaultViolenceAffray
                  ? values.assaultViolenceAffray
                  : '',
                incident.beggingPersistent ? values.beggingPersistent : '',
                incident.begging ? values.begging : '',
                incident.criminalDamageGraffitiVandalism
                  ? values.criminalDamageGraffitiVandalism
                  : '',
                incident.possessionWithIntentToSupplyDrugs
                  ? values.possessionWithIntentToSupplyDrugs
                  : '',
                incident.harassmentThreateningBehaviour
                  ? values.harassmentThreateningBehaviour
                  : '',
                incident.joyRiding ? values.joyRiding : '',
                incident.kerbCrawling ? values.kerbCrawling : '',
                incident.noiseNuisance ? values.noiseNuisance : '',
                incident.inappropriateSexualContact
                  ? values.inappropriateSexualContact
                  : '',
                incident.smokingUnderageOrInProhibitedArea
                  ? values.smokingUnderageOrInProhibitedArea
                  : '',
                incident.streetDrinking ? values.streetDrinking : '',
                incident.possessionOfDrugs ? values.possessionOfDrugs : '',
                incident.theft ? values.theft : '',
                incident.beingOnPremisesWhilstBanned
                  ? values.beingOnPremisesWhilstBanned
                  : '',
                incident.breachOfSection35Order
                  ? values.breachOfSection35Order
                  : '',
                incident.other ? values.other : '',
                incident.unlicensedTaxiCab ? values.unlicensedTaxiCab : '',
                incident.unlicensedStreetTrading
                  ? values.unlicensedStreetTrading
                  : '',
                incident.misuseOfID ? values.misuseOfID : '',
                incident.underageIntoxication
                  ? values.underageIntoxication
                  : '',
                incident.goingEquippedToSteal
                  ? values.goingEquippedToSteal
                  : '',
                incident.hateCrime ? values.hateCrime : '',
                incident.roughSleeping ? values.roughSleeping : '',
                incident.breachOfBan ? values.breachOfBan : '',
                incident.drunkenDisorderlyBehaviour
                  ? values.drunkenDisorderlyBehaviour
                  : '',
                incident.possessionOfAnOffensiveWeapon
                  ? values.possessionOfAnOffensiveWeapon
                  : '',
                incident.attemptedTheft ? values.attemptedTheft : '',
                incident.illegalGambling ? values.illegalGambling : '',
                incident.robbery ? values.robbery : '',
                incident.section35Issued ? values.section35Issued : '',
                incident.breachPoliceBail ? values.breachPoliceBail : '',
                incident.otherAlcoholDrugRelated
                  ? values.otherAlcoholDrugRelated
                  : '',
                incident.otherAntiSocialBehaviour
                  ? values.otherAntiSocialBehaviour
                  : '',
                incident.otherTheftFraud ? values.otherTheftFraud : '',
                incident.otherViolentOffensiveBehaviour
                  ? values.otherViolentOffensiveBehaviour
                  : '',
                incident.otherBreachBan ? values.otherBreachBan : '',
                incident.fareEvasion ? values.fareEvasion : '',
                incident.racialAbuse ? values.racialAbuse : '',
                incident.verbalAbuse ? values.verbalAbuse : '',
              ]
                .flat()
                .filter((item) => item !== '')
                .filter(
                  (item) =>
                    tagData?.tags.find((tag) => tag.id === item)?.type ===
                    TagType.IncidentInvolved
                )
            ),
          ],
          lostValue: Number(incident.lossValue),
          policeInvolved: incident.policeContacted.includes('attended'),
          policeRef: incident.policeReference,
          policeReported: incident.policeContacted.includes('Yes'),
          postcode: incident.postcode,
          recoveredValue: Number(incident.lossRecovered),
          street: incident.address || 'London',
          subject: '',
          time:
            incident.dateTime && dayjs(incident.dateTime).isValid()
              ? dayjs(incident.dateTime)
              : dayjs(),
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
      filteredIncidents.map((incident) => incident.discId)
    );

    const newHistoricIncidentData = await Promise.all(
      incidents.map((item) => generateHistoricIncident(item))
    );
    const filteredHistoricIncidents = newHistoricIncidentData.filter(
      (incident) => !incidentIds.has(incident.discId)
    );

    const checkOffenderGroups = (offender: NewOffender) =>
      new Promise<NewOffender>((resolve) => {
        const offenderIncidents = newIncidentData.filter((incident) =>
          incident.offenders.includes(offender.id)
        );
        const incidentGroups = offenderIncidents.flatMap(
          (incident) => incident.groups
        );
        const newGroups = [...new Set([...offender.groups, ...incidentGroups])];

        resolve({
          ...offender,
          groups: newGroups.length > 0 ? newGroups : values.fallbackGroup,
        });
      });

    const offendersUpdatedGroups = await Promise.all(
      newOffenderData.map((offender) => checkOffenderGroups(offender))
    );

    setNewBusinesses(newBusinessData);
    setNewUsers(newUserData);
    setNewOffenders(offendersUpdatedGroups);
    setNewIncidents(filteredIncidents);
    setNewHistoricIncidents(filteredHistoricIncidents);
    setGenerating(false);
    setCurrentStep(2);
  };

  const onDeleteNewBusiness = (id: string) => {
    setNewBusinesses(newBusinesses.filter((item) => item.id !== id));
  };

  const handleFileListChange: UploadProps['onChange'] = (info) => {
    console.log('=== FILE UPLOAD DEBUG ===');
    console.log('File status:', info.file.status);
    console.log('Current images count:', images.length);

    if (info.file.response && info.file.status === 'done') {
      console.log('File uploaded successfully!');
      console.log('Response from server:', info.file.response);

      const responseArray = info.file.response as Image[];
      console.log('Number of images in response:', responseArray.length);

      // Log first few images from response
      if (responseArray.length > 0) {
        console.log('Sample of first 10 images from upload response:');
        for (const [idx, item] of responseArray.slice(0, 10).entries()) {
          console.log(
            `  [${idx}] fileName: "${item.fileName}", originalName: "${item.originalName}"`
          );
        }

        // Check specifically for the 708320 image
        const test708320 = responseArray.find(
          (item) =>
            item.fileName?.includes('708320') ||
            item.originalName?.includes('708320')
        );
        if (test708320) {
          console.log('✓ FOUND image with 708320 in response:', test708320);
        } else {
          console.log('✗ NO image with 708320 found in server response');
          console.log('  Checking all originalNames for "708320"...');
          const all708320 = responseArray.filter((item) =>
            item.originalName?.includes('708320')
          );
          console.log(
            `  Found ${all708320.length} images with "708320" in originalName`
          );
        }
      }

      setImages([
        ...images,
        ...responseArray.map((item) => ({ ...item, id: uuidv4() })),
      ]);
      console.log(
        'Images after adding upload:',
        images.length + responseArray.length
      );
    }
    setFileList(info.fileList);
    console.log('=== END FILE UPLOAD DEBUG ===');
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
      for (const offenderId of data.offenders) {
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
      }
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

  const rematchOffenderImages = () => {
    console.log('=== REMATCH OFFENDERS DEBUG ===');
    console.log('Total images available:', images.length);
    console.log('Total offenders:', newOffenders.length);

    // Log ALL images
    console.log('ALL IMAGES:');
    for (const [idx, img] of images.entries()) {
      console.log(`  [${idx}] originalName: "${img.originalName}"`);
    }

    // Check for specific offender
    const testOffender = newOffenders.find((o) => o.discId === '708320');
    if (testOffender) {
      console.log(`\nTesting specific offender PERRY (708320):`);
      const testMatch = images.find(
        (img) =>
          img.fileName?.includes('708320') ||
          img.originalName?.includes('708320')
      );
      console.log(`  Found matching image?`, testMatch ? 'YES' : 'NO');
      if (testMatch) {
        console.log(`  Image:`, testMatch);
      }
      // Check if there's ANY image with 708320 in it
      const anyMatch = images.filter((img) =>
        img.originalName?.includes('708320')
      );
      console.log(
        `  Total images with "708320" in originalName:`,
        anyMatch.length
      );
    }

    const updatedOffenders = newOffenders.map((offender) => {
      const matchedImages = images.filter(
        (image) =>
          image.fileName?.includes(offender.discId) ||
          image.originalName?.includes(offender.discId)
      );

      console.log(`Offender: ${offender.name} (discId: "${offender.discId}")`);
      console.log(`  - Matched ${matchedImages.length} images`);
      if (matchedImages.length > 0) {
        console.log(
          `  - Image filenames:`,
          matchedImages.map((img) => img.fileName || img.originalName)
        );
      }

      return {
        ...offender,
        images: matchedImages,
      };
    });

    console.log('=== END REMATCH DEBUG ===');
    setNewOffenders(updatedOffenders);
  };

  const rematchIncidentOffenders = () => {
    console.log('=== REMATCH INCIDENT OFFENDERS ===');
    console.log('Total incidents:', newIncidents.length);
    console.log('Total offenders:', newOffenders.length);
    console.log('Total original CSV incidents:', incidents.length);

    // Debug: Show sample discIds from newIncidents and ids from incidents
    console.log('\nSample newIncident discIds (first 3):');
    for (const inc of newIncidents.slice(0, 3)) {
      console.log(`  newIncident.discId: "${inc.discId}"`);
    }

    console.log('\nSample original incident ids (first 3):');
    for (const inc of incidents.slice(0, 3)) {
      console.log(`  incident.id: "${inc.id}"`);
    }

    const updatedIncidents = newIncidents.map((incident) => {
      // Find original incident data to get subjectIDs
      const originalIncident = incidents.find((i) => i.id === incident.discId);

      if (!originalIncident) {
        console.log(
          `No original incident found for discId: "${incident.discId}"`
        );
        return incident;
      }

      // Debug: Show what subjectIDs the original incident has
      const hasSubjects =
        originalIncident.subjectID ||
        originalIncident.subjectID1 ||
        originalIncident.subjectID2 ||
        originalIncident.subjectID3 ||
        originalIncident.subjectID4;
      if (!hasSubjects) {
        console.log(
          `Original incident ${originalIncident.id} has NO subject IDs`
        );
      }

      // Match offenders based on subjectID fields
      const offenders = [
        originalIncident.subjectID
          ? newOffenders?.find(
              (offender) => offender.discId === originalIncident.subjectID
            ) || null
          : null,
        originalIncident.subjectID1
          ? newOffenders?.find(
              (offender) => offender.discId === originalIncident.subjectID1
            ) || null
          : null,
        originalIncident.subjectID2
          ? newOffenders?.find(
              (offender) => offender.discId === originalIncident.subjectID2
            ) || null
          : null,
        originalIncident.subjectID3
          ? newOffenders?.find(
              (offender) => offender.discId === originalIncident.subjectID3
            ) || null
          : null,
        originalIncident.subjectID4
          ? newOffenders?.find(
              (offender) => offender.discId === originalIncident.subjectID4
            ) || null
          : null,
      ].filter((item) => item !== null);

      const offendersIds = [
        ...new Set(offenders.map((offender) => offender.id)),
      ];

      console.log(
        `Incident ${incident.id}: Matched ${offenders.length} offenders`
      );
      if (offenders.length > 0) {
        console.log(
          `  - Offenders:`,
          offenders.map((o) => `${o.name} (${o.discId})`)
        );
      }

      return {
        ...incident,
        offenders: offendersIds,
      };
    });

    console.log('=== END REMATCH INCIDENT OFFENDERS ===');
    setNewIncidents(updatedIncidents);
  };

  const onSubmit = () => {
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
                  building: business.street || '',
                  county: business.county || '',
                  importId: business.id,
                  name: business.name,
                  postcode: business.postcode || '',
                  street: business.street || '',
                  townCity: business.townCity || '',
                },
          })),
          historicIncidents: newHistoricIncidents.map((incident) => ({
            building: '',
            business: incident.business ? { id: incident.business } : undefined,
            county: '',
            crimeTypes: [
              ...incident.crimeTypes,
              ...incident.impactTypes,
              ...incident.involvedTypes,
            ].map((id) => ({ id })),
            // TODO check
            date: dayjs(incident.date).toDate(),
            groups: incident.groups.map((id) => ({ id })),
            importId: incident.id,
            lostValue: incident.lostValue,
            policeInvolved: incident.policeInvolved,
            policeReported: incident.policeReported,
            postcode: incident.postcode,
            recoveredValue: incident.recoveredValue,
            street: incident.street,
            // TODO check
            time: dayjs(incident.time).toDate(),
            townCity: '',
          })),
          images: images.map((image) => ({
            fileName: image.fileName,
            importId: image.id,
            mimetype: 'image/png',
            url: image.url,
          })),
          incidents: newIncidents
            .map((incident) => ({
              building: '',
              business: incident.business
                ? { id: incident.business }
                : undefined,
              county: '',
              createdBy: incident.createdBy
                ? { id: incident.createdBy }
                : undefined,
              crimeTypes: [
                ...incident.crimeTypes,
                ...incident.impactTypes,
                ...incident.involvedTypes,
              ].map((id) => ({ id })),
              // TODO check
              date: dayjs(incident.date).toDate(),
              description: incident.description,
              groups: incident.groups.map((id) => ({ id })),
              images: incident.images.map(({ id }) => ({ id })),
              importId: incident.id,
              lostValue: incident.lostValue,
              offenders: incident.offenders.map((id) => ({ id })),
              policeInvolved: incident.policeInvolved,
              policeRef: incident.policeRef,
              policeReported: incident.policeReported,
              postcode: incident.postcode || 'Unknown',
              recoveredValue: incident.recoveredValue,
              street: incident.street,
              // TODO check
              time: dayjs(incident.time).toDate(),
              townCity: incident.townCity,
            }))
            .slice(0, 1000),
          offenders: newOffenders
            .map((offender) => ({
              age: offender.age,
              build: offender.build,
              comment: offender.comments,
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
              postcode: offender.postcode,
              race: offender.race,
              street: offender.street,
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
        },
      },
    })
      .then(() => {
        notification.success({
          description: `${newIncidents.length} incidents and ${newOffenders.length} offenders imported successfully.`,
          message: 'Import Complete',
          placement: 'bottomRight',
        });
      })
      .catch(() => {
        notification.error({
          description:
            'The import failed. Please check your data and try again.',
          message: 'Import Failed',
          placement: 'bottomRight',
        });
      });
  };

  return {
    activeTags,
    areas,
    currentStep,
    fileList,
    galleries,
    generating,
    groupsData,
    handleFileListChange,
    idSought,
    idSoughtModalOpen,
    imageModalOpen,
    images,
    incidentModalOpen,
    incidents,
    knownSubjectModalOpen,
    knownSubjects,
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
    onIDSoughtFileLoaded,
    onIncidentFileLoaded,
    onKnownSubjectFileLoaded,
    onMembersFileLoaded,
    onStepChange: setCurrentStep,
    onSubmit,
    onUpdateBusiness,
    onUpdateIncident,
    onUpdateOffender,
    onUpdateUser,
    rematchIncidentOffenders,
    rematchOffenderImages,
    tagData,
    toggleIdSoughtModal,
    toggleImageModal,
    toggleIncidentModal,
    toggleKnownSubjectModal,
    toggleMemberModal,
  };
};

export default useDiscImport;
