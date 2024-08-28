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
import { Form } from 'antd';
import { useSchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import { useDiscImportDataMutation } from 'graphql/imports/__generated__/disc-import.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { useListUsersQuery } from 'graphql/users/queries/__generated__/list-users.generated';
import update from 'immutability-helper';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useStoreState } from 'state';
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
  tagData: TagsQuery | undefined;
  toggleIdSoughtModal: () => void;
  toggleImageModal: () => void;
  toggleIncidentModal: () => void;
  toggleKnownSubjectModal: () => void;
  toggleMemberModal: () => void;
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
      areas: item[8],
      categories: item[7],
      email: item[3],
      firstName: item[1],
      id: item[0],
      lastName: item[2],
      lastSignedIn: moment(item[9]),
      organisation: item[4],
      placeOfWork: item[5],
      premises: item[6],
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
        address: item[26],
        assaultViolenceAffray: item[34],
        attemptedTheft: item[63],
        begging: item[36],
        beggingPersistent: item[35],
        beingOnPremisesWhilstBanned: item[50],
        breachOfBan: item[60],
        breachOfSection35Order: item[51],
        breachPoliceBail: item[67],
        covidRelated: item[74],
        crimeReportStatus: item[8],
        criminalDamageGraffitiVandalism: item[37],
        date: item[2],
        dateTime: item[3],
        dealingInvolved: item[17],
        description: item[5],
        drinkInvolved: item[15],
        drugsInvolved: item[16],
        drunkenDisorderlyBehaviour: item[61],
        fareEvasion: item[73],
        fraudInvolved: item[12],
        goingEquippedToSteal: item[57],
        groupInvolved: item[19],
        harassmentThreateningBehaviour: item[39],
        hateCrime: item[58],
        id: item[1],
        illegalGambling: item[64],
        inappropriateSexualContact: item[43],
        incidentNotes: item[124],
        internalReference: item[9],
        joyRiding: item[40],
        kerbCrawling: item[41],
        locationName: item[31],
        lossRecovered: item[23],
        lossRecoveredAtTime: item[25],
        lossValue: item[22],
        memberEmail: item[30],
        memberId: item[28],
        memberName: item[29],
        misuseOfID: item[55],
        noiseNuisance: item[42],
        other: item[52],
        otherAlcoholDrugRelated: item[68],
        otherAntiSocialBehaviour: item[69],
        otherBreachBan: item[72],
        otherOutcome: item[14],
        otherTheftFraud: item[70],
        otherViolentOffensiveBehaviour: item[71],
        outcome: item[13],
        policeContacted: item[6],
        policeReference: item[24],
        possessionOfAnOffensiveWeapon: item[62],
        possessionOfDrugs: item[47],
        possessionWithIntentToSupplyDrugs: item[38],
        postcode: item[27],
        premises: item[32],
        racialAbuse: item[44],
        robbery: item[65],
        roughSleeping: item[59],
        section35Issued: item[66],
        sentToEmails: item[7],
        smokingUnderageOrInProhibitedArea: item[45],
        streetDrinking: item[46],
        subjectDOB: item[78],
        subjectDOB1: item[85],
        subjectDOB2: item[92],
        subjectDOB4: item[106],
        subjectDOB5: item[112],
        subjectDOB6: item[120],
        subjectDeletionDate: item[81],
        subjectDeletionDate1: item[88],
        subjectDeletionDate2: item[95],
        subjectDeletionDate3: item[102],
        subjectDeletionDate4: item[109],
        subjectDeletionDate5: item[116],
        subjectDeletionDate6: item[123],
        subjectFirstName: item[76],
        subjectFirstName1: item[83],
        subjectFirstName2: item[90],
        subjectFirstName3: item[97],
        subjectFirstName4: item[104],
        subjectFirstName5: item[111],
        subjectFirstName6: item[118],
        subjectGender: item[79],
        subjectGender1: item[86],
        subjectGender2: item[93],
        subjectGender3: item[100],
        subjectGender4: item[107],
        subjectGender5: item[114],
        subjectGender6: item[121],
        subjectID: item[75],
        subjectID1: item[82],
        subjectID2: item[89],
        subjectID3: item[96],
        subjectID4: item[103],
        subjectID5: item[110],
        subjectID6: item[117],
        subjectLastName: item[77],
        subjectLastName1: item[84],
        subjectLastName2: item[91],
        subjectLastName3: item[98],
        subjectLastName4: item[105],
        subjectLastName5: item[112],
        subjectLastName6: item[119],
        subjectProhibitions: item[80],
        subjectProhibitions1: item[87],
        subjectProhibitions2: item[94],
        subjectProhibitions3: item[101],
        subjectProhibitions4: item[108],
        subjectProhibitions5: item[115],
        subjectProhibitions6: item[122],
        summary: item[4],
        theft: item[48],
        typeOfOffence: item[33],
        underageIntoxication: item[56],
        unlicensedStreetTrading: item[54],
        unlicensedTaxiCab: item[53],
        vehicleDescriptions: item[10],
        vehicleRegistrations: item[11],
        verbalAbuse: item[49],
        verbalAbuseInvolved: item[21],
        violenceInvolved: item[20],
        weaponInvolved: item[18],
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
          role: undefined,
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
            ? moment(offender.dateOfBirth)
            : undefined,
          deletionDate: moment(offender.databaseDeletionDate),
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
          images: images.filter((image) =>
            image.fileName?.includes(offender.id)
          ),
          name:
            // eslint-disable-next-line sonarjs/no-nested-template-literals
            `${offender.firstName}${
              offender.lastName ? ` ${offender.lastName}` : ''
            }` || 'Unidentified Offender',
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
          date: moment(incident.dateTime),
          description: incident.description
            ?.replace(/(<([^>]+)>)/gi, '')
            .replace('&nbsp;', ''),
          discId: incident.id,
          groups: getIncidentGroups(incident, offendersIds, createdBy || ''),
          id: uuidv4(),
          images: images.filter((image) =>
            image.fileName?.includes(incident.subjectID)
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
          time: moment(incident.dateTime),
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
          date: moment(incident.dateTime),
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
          time: moment(incident.dateTime),
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
    console.log({
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
        date: moment(incident.date).toDate(),
        groups: incident.groups.map((id) => ({ id })),
        importId: incident.id,
        lostValue: incident.lostValue,
        policeInvolved: incident.policeInvolved,
        policeReported: incident.policeReported,
        postcode: incident.postcode,
        recoveredValue: incident.recoveredValue,
        street: incident.street,
        // TODO check
        time: moment(incident.time).toDate(),
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
          // TODO check
          date: moment(incident.date).toDate(),
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
          time: moment(incident.time).toDate(),
          townCity: incident.townCity,
        }))
        .slice(0, 1000),
      offenders: newOffenders
        .map((offender) => ({
          age: offender.age,
          build: offender.build,
          comment: offender.comments,
          dateOfBirth: offender.dateOfBirth
            ? moment(offender.dateOfBirth).toDate()
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
    });
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
            date: moment(incident.date).toDate(),
            groups: incident.groups.map((id) => ({ id })),
            importId: incident.id,
            lostValue: incident.lostValue,
            policeInvolved: incident.policeInvolved,
            policeReported: incident.policeReported,
            postcode: incident.postcode,
            recoveredValue: incident.recoveredValue,
            street: incident.street,
            // TODO check
            time: moment(incident.time).toDate(),
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
              date: moment(incident.date).toDate(),
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
              time: moment(incident.time).toDate(),
              townCity: incident.townCity,
            }))
            .slice(0, 1000),
          offenders: newOffenders
            .map((offender) => ({
              age: offender.age,
              build: offender.build,
              comment: offender.comments,
              dateOfBirth: offender.dateOfBirth
                ? moment(offender.dateOfBirth).toDate()
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
    }).then(() => {});
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
    tagData,
    toggleIdSoughtModal,
    toggleImageModal,
    toggleIncidentModal,
    toggleKnownSubjectModal,
    toggleMemberModal,
  };
};

export default useDiscImport;
