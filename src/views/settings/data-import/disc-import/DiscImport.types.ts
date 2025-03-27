import type { Dayjs } from 'dayjs';
import type { Age, Build, Gender, Height, Race, Role } from 'graphql/types';

export interface KnownSubject {
  address: string;
  ageRange: string;
  build: string;
  comments: string;
  databaseDeletionDate: string;
  dateAdded: string;
  dateOfBirth: string;
  distinguishingFeatures: string;
  firstName: string;
  galleryStatus: string;
  gender: string;
  height: string;
  icCodes: string;
  id: string;
  incidentCount: string;
  lastName: string;
  memberEmail: string;
  nicknames: string;
  postcode: string;
  prohibitions: string;
  workspaceId: string;
  workspaceName: string;
}

export interface IDSought {
  address: string;
  ageRange: string;
  build: string;
  comments: string;
  databaseDeletionDate: string;
  dateAdded: string;
  dateOfBirth: string;
  distinguishingFeatures: string;
  firstName: string;
  galleryStatus: string;
  gender: string;
  height: string;
  icCodes: string;
  id: string;
  incidentCount: string;
  lastName: string;
  memberEmail: string;
  nicknames: string;
  postcode: string;
  prohibitions: string;
  workspaceId: string;
  workspaceName: string;
}

export interface Incident {
  address: string;
  assaultViolenceAffray: string;
  attemptedTheft: string;
  begging: string;
  beggingPersistent: string;
  beingOnPremisesWhilstBanned: string;
  breachOfBan: string;
  breachOfSection35Order: string;
  breachPoliceBail: string;
  covidRelated: string;
  crimeReportStatus: string;
  criminalDamageGraffitiVandalism: string;
  date: string;
  dateTime: string;
  dealingInvolved: string;
  description: string;
  drinkInvolved: string;
  drugsInvolved: string;
  drunkenDisorderlyBehaviour: string;
  fareEvasion: string;
  fraudInvolved: string;
  goingEquippedToSteal: string;
  groupInvolved: string;
  harassmentThreateningBehaviour: string;
  hateCrime: string;
  id: string;
  illegalGambling: string;
  inappropriateSexualContact: string;
  incidentNotes: string;
  internalReference: string;
  joyRiding: string;
  kerbCrawling: string;
  locationName: string;
  lossRecovered: string;
  lossRecoveredAtTime: string;
  lossValue: string;
  memberEmail: string;
  memberId: string;
  memberName: string;
  misuseOfID: string;
  noiseNuisance: string;
  other: string;
  otherAlcoholDrugRelated: string;
  otherAntiSocialBehaviour: string;
  otherBreachBan: string;
  otherOutcome: string;
  otherTheftFraud: string;
  otherViolentOffensiveBehaviour: string;
  outcome: string;
  policeContacted: string;
  policeReference: string;
  possessionOfAnOffensiveWeapon: string;
  possessionOfDrugs: string;
  possessionWithIntentToSupplyDrugs: string;
  postcode: string;
  premises: string;
  racialAbuse: string;
  robbery: string;
  roughSleeping: string;
  section35Issued: string;
  sentToEmails: string;
  smokingUnderageOrInProhibitedArea: string;
  streetDrinking: string;
  subjectDOB: string;
  subjectDOB1: string;
  subjectDOB2: string;
  subjectDOB4: string;
  subjectDOB5: string;
  subjectDOB6: string;
  subjectDeletionDate: string;
  subjectDeletionDate1: string;
  subjectDeletionDate2: string;
  subjectDeletionDate3: string;
  subjectDeletionDate4: string;
  subjectDeletionDate5: string;
  subjectDeletionDate6: string;
  subjectFirstName: string;
  subjectFirstName1: string;
  subjectFirstName2: string;
  subjectFirstName3: string;
  subjectFirstName4: string;
  subjectFirstName5: string;
  subjectFirstName6: string;
  subjectGender: string;
  subjectGender1: string;
  subjectGender2: string;
  subjectGender3: string;
  subjectGender4: string;
  subjectGender5: string;
  subjectGender6: string;
  subjectID: string;
  subjectID1: string;
  subjectID2: string;
  subjectID3: string;
  subjectID4: string;
  subjectID5: string;
  subjectID6: string;
  subjectLastName: string;
  subjectLastName1: string;
  subjectLastName2: string;
  subjectLastName3: string;
  subjectLastName4: string;
  subjectLastName5: string;
  subjectLastName6: string;
  subjectProhibitions: string;
  subjectProhibitions1: string;
  subjectProhibitions2: string;
  subjectProhibitions3: string;
  subjectProhibitions4: string;
  subjectProhibitions5: string;
  subjectProhibitions6: string;
  summary: string;
  theft: string;
  typeOfOffence: string;
  underageIntoxication: string;
  unlicensedStreetTrading: string;
  unlicensedTaxiCab: string;
  vehicleDescriptions: string;
  vehicleRegistrations: string;
  verbalAbuse: string;
  verbalAbuseInvolved: string;
  violenceInvolved: string;
  weaponInvolved: string;
  workspaceName: string;
}

export interface Member {
  areas: string;
  categories: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  lastSignedIn: Dayjs;
  organisation: string;
  placeOfWork: string;
  premises: string;
}

export interface Business {
  lastSignedIn: Dayjs;
  name: string;
}

export interface Image {
  fileName: string;
  id: string;
  originalName: string;
  url: string;
}

export interface NewUser {
  business: string | undefined;
  email: string;
  existing?: string;
  fullName: string;
  groups: string[];
  id: string;
  lastLogin?: Dayjs;
  role: Role | undefined;
}

export interface NewBusiness {
  building: string;
  county: string;
  existing?: string;
  id: string;
  name: string;
  postcode: string;
  street: string;
  townCity: string;
}

export interface NewOffender {
  age: Age;
  alias: string[];
  build: Build;
  comments: string;
  dateOfBirth: Dayjs | undefined;
  deletionDate: Dayjs;
  discId: string;
  gender: Gender;
  groups: string[];
  height: Height;
  id: string;
  images: Image[];
  name: string;
  peculiarities: string;
  postcode: string;
  race: Race;
  street: string;
}

export interface NewIncident {
  building: string;
  business: string | undefined;
  county: string;
  createdBy: string | undefined;
  crimeTypes: string[];
  date: Dayjs;
  description: string;
  discId: string;
  groups: string[];
  id: string;
  images: Image[];
  impactTypes: string[];
  involvedTypes: string[];
  lostValue: number;
  offenders: string[];
  policeInvolved: boolean;
  policeRef: string;
  policeReported: boolean;
  postcode: string;
  recoveredValue: number;
  street: string;
  subject: string;
  time: Dayjs;
  townCity: string;
}

export interface HistoricIncident {
  business: string | undefined;
  crimeTypes: string[];
  date: Dayjs;
  description: string;
  discId: string;
  groups: string[];
  id: string;
  impactTypes: string[];
  involvedTypes: string[];
  lostValue: number;
  policeInvolved: boolean;
  policeRef: string;
  policeReported: boolean;
  postcode: string;
  recoveredValue: number;
  street: string;
  subject: string;
  time: Dayjs;
}

export interface GenerateData {
  areas: {
    area: string;
    group?: string;
    key: string;
  }[];
  assaultViolenceAffray: string[];
  attemptedTheft: string[];
  begging: string[];
  beggingPersistent: string[];
  beingOnPremisesWhilstBanned: string[];
  breachOfBan: string[];
  breachOfSection35Order: string[];
  breachPoliceBail: string[];
  covidRelated: string[];
  criminalDamageGraffitiVandalism: string[];
  defaultGroup: string[] | undefined;
  drunkenDisorderlyBehaviour: string[];
  excludeIncidentDate: Dayjs;
  excludeUserDate: Dayjs;
  fallbackGroup: string[];
  fareEvasion: string[];
  galleries: {
    gallery: string;
    group?: string;
    key: string;
  }[];
  goingEquippedToSteal: string[];
  harassmentThreateningBehaviour: string[];
  hateCrime: string[];
  illegalGambling: string[];
  inappropriateSexualContact: string[];
  joyRiding: string[];
  kerbCrawling: string[];
  misuseOfID: string[];
  noiseNuisance: string[];
  other: string[];
  otherAlcoholDrugRelated: string[];
  otherAntiSocialBehaviour: string[];
  otherBreachBan: string[];
  otherTheftFraud: string[];
  otherViolentOffensiveBehaviour: string[];
  possessionOfAnOffensiveWeapon: string[];
  possessionOfDrugs: string[];
  possessionWithIntentToSupplyDrugs: string[];
  racialAbuse: string[];
  robbery: string[];
  roughSleeping: string[];
  section35Issued: string[];
  smokingUnderageOrInProhibitedArea: string[];
  streetDrinking: string[];
  theft: string[];
  townCity: string;
  underageIntoxication: string[];
  unlicensedStreetTrading: string[];
  unlicensedTaxiCab: string[];
  verbalAbuse: string[];
}

export interface IncidentTags {
  assaultViolenceAffray: boolean;
  attemptedTheft: boolean;
  begging: boolean;
  beggingPersistent: boolean;
  beingOnPremisesWhilstBanned: boolean;
  breachOfBan: boolean;
  breachOfSection35Order: boolean;
  breachPoliceBail: boolean;
  covidRelated: boolean;
  criminalDamageGraffitiVandalism: boolean;
  drunkenDisorderlyBehaviour: boolean;
  fareEvasion: boolean;
  goingEquippedToSteal: boolean;
  harassmentThreateningBehaviour: boolean;
  hateCrime: boolean;
  illegalGambling: boolean;
  inappropriateSexualContact: boolean;
  joyRiding: boolean;
  kerbCrawling: boolean;
  misuseOfID: boolean;
  noiseNuisance: boolean;
  other: boolean;
  otherAlcoholDrugRelated: boolean;
  otherAntiSocialBehaviour: boolean;
  otherBreachBan: boolean;
  otherTheftFraud: boolean;
  otherViolentOffensiveBehaviour: boolean;
  possessionOfAnOffensiveWeapon: boolean;
  possessionOfDrugs: boolean;
  possessionWithIntentToSupplyDrugs: boolean;
  racialAbuse: boolean;
  robbery: boolean;
  roughSleeping: boolean;
  section35Issued: boolean;
  smokingUnderageOrInProhibitedArea: boolean;
  streetDrinking: boolean;
  theft: boolean;
  underageIntoxication: boolean;
  unlicensedStreetTrading: boolean;
  unlicensedTaxiCab: boolean;
  verbalAbuse: boolean;
}

export type CSVData = string[][];
