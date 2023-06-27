import { useEffect, useState } from 'react';
import type { UploadFile, UploadProps, FormInstance } from 'antd';
import { Form } from 'antd';
import type { SchemeGroupsQuery, TagsQuery } from 'graphql/generated';
import {
  Height,
  useDiscImportDataMutation,
  Model,
  useTagsQuery,
  Gender,
  Race,
  Age,
  Build,
  useSchemeGroupsQuery,
  SortOrder,
  TagType,
  Role,
  useListUsersQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import update from 'immutability-helper';
import type {
  KnownSubject,
  CSVData,
  Member,
  Business,
  IDSought,
  Incident,
  NewBusiness,
  NewOffender,
  Image,
  NewUser,
  NewIncident,
  GenerateData,
  IncidentTags,
  HistoricIncident,
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
  return Race.Unknown;
};

interface Return {
  knownSubjects: KnownSubject[];
  members: Member[];
  idSought: IDSought[];
  incidents: Incident[];
  images: Image[];
  newBusinesses: NewBusiness[];
  newOffenders: NewOffender[];
  newUsers: NewUser[];
  onKnownSubjectFileLoaded: (data: CSVData) => void;
  onMembersFileLoaded: (data: CSVData) => void;
  onIDSoughtFileLoaded: (data: CSVData) => void;
  onIncidentFileLoaded: (data: CSVData) => void;
  onGenerateData: (values: GenerateData) => void;
  onDeleteNewBusiness: (id: string) => void;
  fileList: UploadFile[];
  handleFileListChange: UploadProps['onChange'];
  groupsData: SchemeGroupsQuery | undefined;
  memberModalOpen: boolean;
  knownSubjectModalOpen: boolean;
  idSoughtModalOpen: boolean;
  incidentModalOpen: boolean;
  imageModalOpen: boolean;
  toggleMemberModal: () => void;
  toggleKnownSubjectModal: () => void;
  toggleIdSoughtModal: () => void;
  toggleIncidentModal: () => void;
  toggleImageModal: () => void;
  generating: boolean;
  tagData: TagsQuery | undefined;
  newIncidents: NewIncident[];
  activeTags: IncidentTags;
  onSubmit: () => void;
  onUpdateOffender: (data: NewOffender) => void;
  onUpdateIncident: (data: NewIncident) => void;
  onUpdateBusiness: (data: NewBusiness) => void;
  onUpdateUser: (data: NewUser) => void;
  mappingForm: FormInstance<GenerateData>;
  areas: string[];
  galleries: string[];
  currentStep: number;
  onStepChange: (value: number) => void;
}

const useDiscImport = (): Return => {
  const [mappingForm] = Form.useForm<GenerateData>();

  const schemeId = useStoreState((state) => state.scheme.id);

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
    beggingPersistent: false,
    begging: false,
    criminalDamageGraffitiVandalism: false,
    possessionWithIntentToSupplyDrugs: false,
    harassmentThreateningBehaviour: false,
    joyRiding: false,
    kerbCrawling: false,
    noiseNuisance: false,
    inappropriateSexualContact: false,
    racialAbuse: false,
    smokingUnderageOrInProhibitedArea: false,
    streetDrinking: false,
    possessionOfDrugs: false,
    theft: false,
    verbalAbuse: false,
    beingOnPremisesWhilstBanned: false,
    breachOfSection35Order: false,
    other: false,
    unlicensedTaxiCab: false,
    unlicensedStreetTrading: false,
    misuseOfID: false,
    underageIntoxication: false,
    goingEquippedToSteal: false,
    hateCrime: false,
    roughSleeping: false,
    breachOfBan: false,
    drunkenDisorderlyBehaviour: false,
    possessionOfAnOffensiveWeapon: false,
    attemptedTheft: false,
    illegalGambling: false,
    robbery: false,
    section35Issued: false,
    breachPoliceBail: false,
    otherAlcoholDrugRelated: false,
    otherAntiSocialBehaviour: false,
    otherTheftFraud: false,
    otherViolentOffensiveBehaviour: false,
    otherBreachBan: false,
    fareEvasion: false,
    covidRelated: false,
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
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: {
        name: SortOrder.Asc,
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
        workspaceId: item[0],
        workspaceName: item[1],
        memberEmail: item[2],
        id: item[3],
        firstName: item[4],
        lastName: item[5],
        nicknames: item[6],
        gender: item[7],
        dateOfBirth: item[8],
        prohibitions: item[9]?.replace(/(<([^>]+)>)/gi, ''),
        icCodes: item[10],
        ageRange: item[11],
        height: item[12],
        build: item[13],
        distinguishingFeatures: item[14],
        comments: item[15],
        address: item[16],
        postcode: item[17],
        incidentCount: item[18],
        dateAdded: item[19],
        databaseDeletionDate: item[20],
        galleryStatus: item[21],
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
      id: item[0],
      firstName: item[1],
      lastName: item[2],
      email: item[3],
      organisation: item[4],
      placeOfWork: item[5],
      premises: item[6],
      categories: item[7],
      areas: item[8],
      lastSignedIn: moment(item[9]),
    }));
    const filteredMembers = importedMembers
      .filter((item) => !item.email?.includes('littoralis'))
      .filter((item) => item.id !== 'Member Id')
      .filter((item) => item.lastSignedIn && item.firstName && item.email);

    const activeAreas = [
      ...new Set(filteredMembers.flatMap((item) => item.areas?.split(', '))),
    ]
      .filter((area) => area !== '')
      .filter((area) => area !== undefined && area !== null);

    setAreas(activeAreas);
    setMembers(filteredMembers);
    setBusinesses(
      filteredMembers.map((item) => ({
        name: item.organisation,
        lastSignedIn: item.lastSignedIn,
      }))
    );
  };

  const onIDSoughtFileLoaded = (data: CSVData) => {
    const idSoughtData = data
      .map((item) => ({
        workspaceId: item[0],
        workspaceName: item[1],
        memberEmail: item[2],
        id: item[3],
        firstName: item[4],
        lastName: item[5],
        nicknames: item[6],
        gender: item[7],
        dateOfBirth: item[8],
        prohibitions: item[9]?.replace(/(<([^>]+)>)/gi, ''),
        icCodes: item[10],
        ageRange: item[11],
        height: item[12],
        build: item[13],
        distinguishingFeatures: item[14],
        comments: item[15],
        address: item[16],
        postcode: item[17],
        incidentCount: item[18],
        dateAdded: item[19],
        databaseDeletionDate: item[20],
        galleryStatus: item[21],
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
        workspaceName: item[0],
        id: item[1],
        date: item[2],
        dateTime: item[3],
        summary: item[4],
        description: item[5],
        policeContacted: item[6],
        sentToEmails: item[7],
        crimeReportStatus: item[8],
        internalReference: item[9],
        vehicleDescriptions: item[10],
        vehicleRegistrations: item[11],
        fraudInvolved: item[12],
        outcome: item[13],
        otherOutcome: item[14],
        drinkInvolved: item[15],
        drugsInvolved: item[16],
        dealingInvolved: item[17],
        weaponInvolved: item[18],
        groupInvolved: item[19],
        violenceInvolved: item[20],
        verbalAbuseInvolved: item[21],
        lossValue: item[22],
        lossRecovered: item[23],
        policeReference: item[24],
        lossRecoveredAtTime: item[25],
        address: item[26],
        postcode: item[27],
        memberId: item[28],
        memberName: item[29],
        memberEmail: item[30],
        locationName: item[31],
        premises: item[32],
        typeOfOffence: item[33],
        assaultViolenceAffray: item[34],
        beggingPersistent: item[35],
        begging: item[36],
        criminalDamageGraffitiVandalism: item[37],
        possessionWithIntentToSupplyDrugs: item[38],
        harassmentThreateningBehaviour: item[39],
        joyRiding: item[40],
        kerbCrawling: item[41],
        noiseNuisance: item[42],
        inappropriateSexualContact: item[43],
        racialAbuse: item[44],
        smokingUnderageOrInProhibitedArea: item[45],
        streetDrinking: item[46],
        possessionOfDrugs: item[47],
        theft: item[48],
        verbalAbuse: item[49],
        beingOnPremisesWhilstBanned: item[50],
        breachOfSection35Order: item[51],
        other: item[52],
        unlicensedTaxiCab: item[53],
        unlicensedStreetTrading: item[54],
        misuseOfID: item[55],
        underageIntoxication: item[56],
        goingEquippedToSteal: item[57],
        hateCrime: item[58],
        roughSleeping: item[59],
        breachOfBan: item[60],
        drunkenDisorderlyBehaviour: item[61],
        possessionOfAnOffensiveWeapon: item[62],
        attemptedTheft: item[63],
        illegalGambling: item[64],
        robbery: item[65],
        section35Issued: item[66],
        breachPoliceBail: item[67],
        otherAlcoholDrugRelated: item[68],
        otherAntiSocialBehaviour: item[69],
        otherTheftFraud: item[70],
        otherViolentOffensiveBehaviour: item[71],
        otherBreachBan: item[72],
        fareEvasion: item[73],
        covidRelated: item[74],
        subjectID: item[75],
        subjectFirstName: item[76],
        subjectLastName: item[77],
        subjectDOB: item[78],
        subjectGender: item[79],
        subjectProhibitions: item[80],
        subjectDeletionDate: item[81],
        subjectID1: item[82],
        subjectFirstName1: item[83],
        subjectLastName1: item[84],
        subjectDOB1: item[85],
        subjectGender1: item[86],
        subjectProhibitions1: item[87],
        subjectDeletionDate1: item[88],
        subjectID2: item[89],
        subjectFirstName2: item[90],
        subjectLastName2: item[91],
        subjectDOB2: item[92],
        subjectGender2: item[93],
        subjectProhibitions2: item[94],
        subjectDeletionDate2: item[95],
        subjectID3: item[96],
        subjectFirstName3: item[97],
        subjectLastName3: item[98],
        subjectGender3: item[100],
        subjectProhibitions3: item[101],
        subjectDeletionDate3: item[102],
        subjectID4: item[103],
        subjectFirstName4: item[104],
        subjectLastName4: item[105],
        subjectDOB4: item[106],
        subjectGender4: item[107],
        subjectProhibitions4: item[108],
        subjectDeletionDate4: item[109],
        subjectID5: item[110],
        subjectFirstName5: item[111],
        subjectLastName5: item[112],
        subjectDOB5: item[112],
        subjectGender5: item[114],
        subjectProhibitions5: item[115],
        subjectDeletionDate5: item[116],
        subjectID6: item[117],
        subjectFirstName6: item[118],
        subjectLastName6: item[119],
        subjectDOB6: item[120],
        subjectGender6: item[121],
        subjectProhibitions6: item[122],
        subjectDeletionDate6: item[123],
        incidentNotes: item[124],
      }))
      .filter((item) => item.workspaceName !== 'Workspace Name')
      .filter((item) => item.workspaceName !== '');
    setIncidents(incidentsValue);
    setActiveTags({
      assaultViolenceAffray: incidentsValue
        .map((incident) => incident.assaultViolenceAffray)
        .includes('Yes'),
      beggingPersistent: incidentsValue
        .map((incident) => incident.beggingPersistent)
        .includes('Yes'),
      begging: incidentsValue
        .map((incident) => incident.begging)
        .includes('Yes'),
      criminalDamageGraffitiVandalism: incidentsValue
        .map((incident) => incident.criminalDamageGraffitiVandalism)
        .includes('Yes'),
      possessionWithIntentToSupplyDrugs: incidentsValue
        .map((incident) => incident.possessionWithIntentToSupplyDrugs)
        .includes('Yes'),
      harassmentThreateningBehaviour: incidentsValue
        .map((incident) => incident.harassmentThreateningBehaviour)
        .includes('Yes'),
      joyRiding: incidentsValue
        .map((incident) => incident.joyRiding)
        .includes('Yes'),
      kerbCrawling: incidentsValue
        .map((incident) => incident.kerbCrawling)
        .includes('Yes'),
      noiseNuisance: incidentsValue
        .map((incident) => incident.noiseNuisance)
        .includes('Yes'),
      inappropriateSexualContact: incidentsValue
        .map((incident) => incident.inappropriateSexualContact)
        .includes('Yes'),
      racialAbuse: incidentsValue
        .map((incident) => incident.racialAbuse)
        .includes('Yes'),
      smokingUnderageOrInProhibitedArea: incidentsValue
        .map((incident) => incident.smokingUnderageOrInProhibitedArea)
        .includes('Yes'),
      streetDrinking: incidentsValue
        .map((incident) => incident.streetDrinking)
        .includes('Yes'),
      possessionOfDrugs: incidentsValue
        .map((incident) => incident.possessionOfDrugs)
        .includes('Yes'),
      theft: incidentsValue.map((incident) => incident.theft).includes('Yes'),
      verbalAbuse: incidentsValue
        .map((incident) => incident.verbalAbuse)
        .includes('Yes'),
      beingOnPremisesWhilstBanned: incidentsValue
        .map((incident) => incident.beingOnPremisesWhilstBanned)
        .includes('Yes'),
      breachOfSection35Order: incidentsValue
        .map((incident) => incident.breachOfSection35Order)
        .includes('Yes'),
      other: incidentsValue.map((incident) => incident.other).includes('Yes'),
      unlicensedTaxiCab: incidentsValue
        .map((incident) => incident.unlicensedTaxiCab)
        .includes('Yes'),
      unlicensedStreetTrading: incidentsValue
        .map((incident) => incident.unlicensedStreetTrading)
        .includes('Yes'),
      misuseOfID: incidentsValue
        .map((incident) => incident.misuseOfID)
        .includes('Yes'),
      underageIntoxication: incidentsValue
        .map((incident) => incident.underageIntoxication)
        .includes('Yes'),
      goingEquippedToSteal: incidentsValue
        .map((incident) => incident.goingEquippedToSteal)
        .includes('Yes'),
      hateCrime: incidentsValue
        .map((incident) => incident.hateCrime)
        .includes('Yes'),
      roughSleeping: incidentsValue
        .map((incident) => incident.roughSleeping)
        .includes('Yes'),
      breachOfBan: incidentsValue
        .map((incident) => incident.breachOfBan)
        .includes('Yes'),
      drunkenDisorderlyBehaviour: incidentsValue
        .map((incident) => incident.drunkenDisorderlyBehaviour)
        .includes('Yes'),
      possessionOfAnOffensiveWeapon: incidentsValue
        .map((incident) => incident.possessionOfAnOffensiveWeapon)
        .includes('Yes'),
      attemptedTheft: incidentsValue
        .map((incident) => incident.attemptedTheft)
        .includes('Yes'),
      illegalGambling: incidentsValue
        .map((incident) => incident.illegalGambling)
        .includes('Yes'),
      robbery: incidentsValue
        .map((incident) => incident.robbery)
        .includes('Yes'),
      section35Issued: incidentsValue
        .map((incident) => incident.section35Issued)
        .includes('Yes'),
      breachPoliceBail: incidentsValue
        .map((incident) => incident.breachPoliceBail)
        .includes('Yes'),
      otherAlcoholDrugRelated: incidentsValue
        .map((incident) => incident.otherAlcoholDrugRelated)
        .includes('Yes'),
      otherAntiSocialBehaviour: incidentsValue
        .map((incident) => incident.otherAntiSocialBehaviour)
        .includes('Yes'),
      otherTheftFraud: incidentsValue
        .map((incident) => incident.otherTheftFraud)
        .includes('Yes'),
      otherViolentOffensiveBehaviour: incidentsValue
        .map((incident) => incident.otherViolentOffensiveBehaviour)
        .includes('Yes'),
      otherBreachBan: incidentsValue
        .map((incident) => incident.otherBreachBan)
        .includes('Yes'),
      fareEvasion: incidentsValue
        .map((incident) => incident.fareEvasion)
        .includes('Yes'),
      covidRelated: incidentsValue
        .map((incident) => incident.covidRelated)
        .includes('Yes'),
    });
  };

  const generateBusiness = (business: Business) =>
    new Promise<NewBusiness>((resolve) => {
      resolve({
        id: uuidv4(),
        name: business.name,
        building: '',
        county: '',
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
        .filter(
          (business) =>
            business.name && business.lastSignedIn > values.excludeUserDate
        )
        .filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.name === value.name)
        )
        .map((business) => generateBusiness(business))
    );
    const filteredUsers = members.filter(
      (member) =>
        member.lastSignedIn > values.excludeUserDate &&
        member.firstName &&
        member.email
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
          id: uuidv4(),
          business: newBusinessData.find(
            (business) => business.name === user.organisation
          )?.id,
          email: user.email,
          fullName: `${user.firstName} ${user.lastName}`,
          groups: getUserGroups(user),
          role: undefined,
          lastLogin: user.lastSignedIn,
          existing:
            usersData?.listUsers.users.find((item) => item.email === user.email)
              ?.id || undefined,
        });
      });

    const generateOffender = (offender: KnownSubject | IDSought) =>
      new Promise<NewOffender>((resolve) => {
        resolve({
          id: uuidv4(),
          discId: offender.id,
          name:
            // eslint-disable-next-line sonarjs/no-nested-template-literals
            `${offender.firstName}${
              offender.lastName ? ` ${offender.lastName}` : ''
            }` || 'Unidentified Offender',
          images: images.filter((image) =>
            image.fileName.includes(offender.id)
          ),
          alias: offender.nicknames.split(','),
          dateOfBirth: offender.dateOfBirth
            ? moment(offender.dateOfBirth)
            : undefined,
          gender: calcGender(offender.gender),
          race: calcRace(offender.icCodes),
          height: calcHeight(offender.height),
          build: calcBuild(offender.build),
          peculiarities: offender.distinguishingFeatures,
          comments: offender.comments,
          age: calcAge(offender.ageRange),
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
          deletionDate: moment(offender.databaseDeletionDate),
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

      const userGroups = newUserData
        .filter((user) => user.groups.includes(createdBy))
        .flatMap((user) => user.groups);
      if (userGroups.length > 0) return userGroups;

      const streetGroups = groupsData?.groups
        .filter((group) => incident.address.includes(group.name.split(' ')[0]))
        .map((group) => group.id);
      if (streetGroups && streetGroups.length > 0) return streetGroups;

      return values.fallbackGroup;
    };

    const generateIncident = (incident: Incident) =>
      new Promise<NewIncident>((resolve) => {
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
          incident.subjectID5
            ? newOffenderData?.find(
                (offender) => offender.discId === incident.subjectID5
              ) || null
            : null,
          incident.subjectID6
            ? newOffenderData?.find(
                (offender) => offender.discId === incident.subjectID6
              ) || null
            : null,
        ].filter((item) => item !== null) as NewOffender[];
        const offendersIds = [
          ...new Set(offenders.map((offender) => offender.id)),
        ];
        const createdBy = newUserData.find(
          (user) => user.email === incident.memberEmail
        )?.id;
        resolve({
          id: uuidv4(),
          discId: incident.id,
          date: moment(incident.dateTime),
          description: incident.description
            ?.replace(/(<([^>]+)>)/gi, '')
            .replace('&nbsp;', ''),
          subject: '',
          time: moment(incident.dateTime),
          policeInvolved: incident.policeContacted.includes('attended'),
          policeRef: incident.policeReference,
          policeReported: incident.policeContacted.includes('Yes'),
          lostValue: Number(incident.lossValue),
          recoveredValue: Number(incident.lossRecovered),
          building: '',
          street: incident.address.replace(values.townCity, '') || 'London',
          townCity: values.townCity,
          county: '',
          postcode: incident.postcode,
          images: images.filter((image) =>
            image.fileName.includes(incident.subjectID)
          ),
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
          offenders: offendersIds,
          business: newUserData.find(
            (user) => user.email === incident.memberEmail
          )?.business,
          createdBy,
          groups: getIncidentGroups(incident, offendersIds, createdBy || ''),
        });
      });

    const generateHistoricIncident = (incident: Incident) =>
      new Promise<HistoricIncident>((resolve) => {
        const createdBy = newUserData.find(
          (user) => user.email === incident.memberEmail
        )?.id;

        resolve({
          id: uuidv4(),
          discId: incident.id,
          date: moment(incident.dateTime),
          description: incident.description,
          subject: '',
          time: moment(incident.dateTime),
          policeInvolved: incident.policeContacted.includes('attended'),
          policeRef: incident.policeReference,
          policeReported: incident.policeContacted.includes('Yes'),
          lostValue: Number(incident.lossValue),
          recoveredValue: Number(incident.lossRecovered),
          street: incident.address || 'London',
          postcode: incident.postcode,
          groups: getIncidentGroups(incident, [], createdBy || ''),
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
    if (info.file.response && info.file.status === 'done') {
      setImages(
        info.file.response.map((item: Image) => ({ ...item, id: uuidv4() }))
      );
    }
    setFileList(info.fileList);
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
    importData({
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
                  importId: business.id,
                  name: business.name,
                  postcode: business.postcode,
                  street: business.street,
                  building: business.street,
                  county: business.county,
                  townCity: business.townCity,
                },
          })),
          historicIncidents: newHistoricIncidents.map((incident) => ({
            importId: incident.id,
            building: '',
            county: '',
            business: incident.business ? { id: incident.business } : undefined,
            crimeTypes: [
              ...incident.crimeTypes,
              ...incident.impactTypes,
              ...incident.involvedTypes,
            ].map((id) => ({ id })),
            date: incident.date,
            lostValue: incident.lostValue,
            policeInvolved: incident.policeInvolved,
            policeReported: incident.policeReported,
            postcode: incident.postcode,
            recoveredValue: incident.recoveredValue,
            street: incident.street,
            time: incident.time,
            townCity: '',
            groups: incident.groups.map((id) => ({ id })),
          })),
          images: images.map((image) => ({
            fileName: image.fileName,
            importId: image.id,
            mimetype: 'image/png',
            url: image.url,
          })),
          incidents: newIncidents.map((incident) => ({
            importId: incident.id,
            building: '',
            business: incident.business ? { id: incident.business } : undefined,
            county: '',
            createdBy: incident.createdBy
              ? { id: incident.createdBy }
              : undefined,
            crimeTypes: [
              ...incident.crimeTypes,
              ...incident.impactTypes,
              ...incident.involvedTypes,
            ].map((id) => ({ id })),
            date: incident.date,
            description: incident.description,
            groups: incident.groups.map((id) => ({ id })),
            images: incident.images.map(({ id }) => ({ id })),
            lostValue: incident.lostValue,
            offenders: incident.offenders.map((id) => ({ id })),
            policeInvolved: incident.policeInvolved,
            policeRef: incident.policeRef,
            policeReported: incident.policeReported,
            postcode: incident.postcode,
            recoveredValue: incident.recoveredValue,
            street: incident.street,
            time: incident.time,
            townCity: '',
          })),
          offenders: newOffenders
            .map((offender) => ({
              importId: offender.id,
              name: offender.name,
              age: offender.age,
              build: offender.build,
              comment: offender.comments,
              dateOfBirth: offender.dateOfBirth,
              gender: offender.gender,
              groups: offender.groups.map((id) => ({ id })),
              height: offender.height,
              images: offender.images.map(({ id }) => ({ id })),
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
                  id: user.existing,
                  importId: user.id,
                  role: user.role || Role.User,
                  groups: user.groups.map((id) => ({ id })),
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
                  importId: user.id,
                  role: user.role || Role.User,
                  groups: user.groups.map((id) => ({ id })),
                },
          })),
        },
      },
    });
  };

  return {
    knownSubjects,
    onKnownSubjectFileLoaded,
    onMembersFileLoaded,
    onIDSoughtFileLoaded,
    onIncidentFileLoaded,
    members,
    idSought,
    incidents,
    onGenerateData,
    newBusinesses,
    onDeleteNewBusiness,
    newOffenders,
    handleFileListChange,
    fileList,
    images,
    newUsers,
    groupsData,
    idSoughtModalOpen,
    imageModalOpen,
    incidentModalOpen,
    knownSubjectModalOpen,
    memberModalOpen,
    toggleIdSoughtModal,
    toggleImageModal,
    toggleIncidentModal,
    toggleKnownSubjectModal,
    toggleMemberModal,
    generating,
    tagData,
    newIncidents,
    activeTags,
    onSubmit,
    onUpdateOffender,
    onUpdateIncident,
    onUpdateBusiness,
    onUpdateUser,
    mappingForm,
    areas,
    galleries,
    currentStep,
    onStepChange: setCurrentStep,
  };
};

export default useDiscImport;
