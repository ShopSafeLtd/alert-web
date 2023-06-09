import type { Age, Build, Gender, Height, Race, Role } from 'graphql/generated';
import type { Moment } from 'moment';

export interface KnownSubject {
  workspaceId: string;
  workspaceName: string;
  memberEmail: string;
  id: string;
  firstName: string;
  lastName: string;
  nicknames: string;
  gender: string;
  dateOfBirth: string;
  prohibitions: string;
  icCodes: string;
  ageRange: string;
  height: string;
  build: string;
  distinguishingFeatures: string;
  comments: string;
  address: string;
  postcode: string;
  incidentCount: string;
  dateAdded: string;
  databaseDeletionDate: string;
  galleryStatus: string;
}

export interface IDSought {
  workspaceId: string;
  workspaceName: string;
  memberEmail: string;
  id: string;
  firstName: string;
  lastName: string;
  nicknames: string;
  gender: string;
  dateOfBirth: string;
  prohibitions: string;
  icCodes: string;
  ageRange: string;
  height: string;
  build: string;
  distinguishingFeatures: string;
  comments: string;
  address: string;
  postcode: string;
  incidentCount: string;
  dateAdded: string;
  databaseDeletionDate: string;
  galleryStatus: string;
}

export interface Incident {
  workspaceName: string;
  id: string;
  date: string;
  dateTime: string;
  summary: string;
  description: string;
  policeContacted: string;
  sentToEmails: string;
  crimeReportStatus: string;
  internalReference: string;
  vehicleDescriptions: string;
  vehicleRegistrations: string;
  fraudInvolved: string;
  outcome: string;
  otherOutcome: string;
  drinkInvolved: string;
  drugsInvolved: string;
  dealingInvolved: string;
  weaponInvolved: string;
  groupInvolved: string;
  violenceInvolved: string;
  verbalAbuseInvolved: string;
  lossValue: string;
  lossRecovered: string;
  policeReference: string;
  lossRecoveredAtTime: string;
  address: string;
  postcode: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  locationName: string;
  premises: string;
  typeOfOffence: string;
  assaultViolenceAffray: string;
  beggingPersistent: string;
  begging: string;
  criminalDamageGraffitiVandalism: string;
  possessionWithIntentToSupplyDrugs: string;
  harassmentThreateningBehaviour: string;
  joyRiding: string;
  kerbCrawling: string;
  noiseNuisance: string;
  inappropriateSexualContact: string;
  racialAbuse: string;
  smokingUnderageOrInProhibitedArea: string;
  streetDrinking: string;
  possessionOfDrugs: string;
  theft: string;
  verbalAbuse: string;
  beingOnPremisesWhilstBanned: string;
  breachOfSection35Order: string;
  other: string;
  unlicensedTaxiCab: string;
  unlicensedStreetTrading: string;
  misuseOfID: string;
  underageIntoxication: string;
  goingEquippedToSteal: string;
  hateCrime: string;
  roughSleeping: string;
  breachOfBan: string;
  drunkenDisorderlyBehaviour: string;
  possessionOfAnOffensiveWeapon: string;
  attemptedTheft: string;
  illegalGambling: string;
  robbery: string;
  section35Issued: string;
  breachPoliceBail: string;
  otherAlcoholDrugRelated: string;
  otherAntiSocialBehaviour: string;
  otherTheftFraud: string;
  otherViolentOffensiveBehaviour: string;
  otherBreachBan: string;
  fareEvasion: string;
  covidRelated: string;
  subjectID: string;
  subjectFirstName: string;
  subjectLastName: string;
  subjectDOB: string;
  subjectGender: string;
  subjectProhibitions: string;
  subjectDeletionDate: string;
  subjectID1: string;
  subjectFirstName1: string;
  subjectLastName1: string;
  subjectDOB1: string;
  subjectGender1: string;
  subjectProhibitions1: string;
  subjectDeletionDate1: string;
  subjectID2: string;
  subjectFirstName2: string;
  subjectLastName2: string;
  subjectDOB2: string;
  subjectGender2: string;
  subjectProhibitions2: string;
  subjectDeletionDate2: string;
  subjectID3: string;
  subjectFirstName3: string;
  subjectLastName3: string;
  subjectGender3: string;
  subjectProhibitions3: string;
  subjectDeletionDate3: string;
  subjectID4: string;
  subjectFirstName4: string;
  subjectLastName4: string;
  subjectDOB4: string;
  subjectGender4: string;
  subjectProhibitions4: string;
  subjectDeletionDate4: string;
  subjectID5: string;
  subjectFirstName5: string;
  subjectLastName5: string;
  subjectDOB5: string;
  subjectGender5: string;
  subjectProhibitions5: string;
  subjectDeletionDate5: string;
  subjectID6: string;
  subjectFirstName6: string;
  subjectLastName6: string;
  subjectDOB6: string;
  subjectGender6: string;
  subjectProhibitions6: string;
  subjectDeletionDate6: string;
  incidentNotes: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organisation: string;
  placeOfWork: string;
  premises: string;
  categories: string;
  lastSignedIn: string;
}

export interface Business {
  name: string;
}

export interface Image {
  fileName: string;
  originalName: string;
  url: string;
  id: string;
}

export interface NewUser {
  id: string;
  fullName: string;
  email: string;
  role: Role | undefined;
  business: string | undefined;
  groups: string[];
  existing?: string;
}

export interface NewBusiness {
  id: string;
  name: string;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
  existing?: string;
}

export interface NewOffender {
  id: string;
  discId: string;
  name: string;
  images: Image[];
  alias: string[];
  dateOfBirth: Moment | undefined;
  gender: Gender;
  race: Race;
  height: Height;
  build: Build;
  peculiarities: string;
  comments: string;
  age: Age;
  groups: string[];
}

export interface NewIncident {
  id: string;
  discId: string;
  subject: string;
  date: Moment;
  time: Moment;
  description: string;
  policeInvolved: boolean;
  policeRef: string;
  policeReported: boolean;
  lostValue: number;
  recoveredValue: number;
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
  images: Image[];
  crimeTypes: string[];
  impactTypes: string[];
  involvedTypes: string[];
  offenders: string[];
  createdBy: string | undefined;
  business: string | undefined;
  groups: string[];
}

export interface HistoricIncident {
  id: string;
  discId: string;
  subject: string;
  date: Moment;
  time: Moment;
  description: string;
  policeInvolved: boolean;
  policeRef: string;
  policeReported: boolean;
  lostValue: number;
  recoveredValue: number;
  street: string;
  postcode: string;
  crimeTypes: string[];
  impactTypes: string[];
  involvedTypes: string[];
}

export interface GenerateData {
  excludeDate: Moment;
  defaultGroup: string[] | undefined;
  assaultViolenceAffray: string[];
  beggingPersistent: string[];
  begging: string[];
  criminalDamageGraffitiVandalism: string[];
  possessionWithIntentToSupplyDrugs: string[];
  harassmentThreateningBehaviour: string[];
  joyRiding: string[];
  kerbCrawling: string[];
  noiseNuisance: string[];
  inappropriateSexualContact: string[];
  racialAbuse: string[];
  smokingUnderageOrInProhibitedArea: string[];
  streetDrinking: string[];
  possessionOfDrugs: string[];
  theft: string[];
  verbalAbuse: string[];
  beingOnPremisesWhilstBanned: string[];
  breachOfSection35Order: string[];
  other: string[];
  unlicensedTaxiCab: string[];
  unlicensedStreetTrading: string[];
  misuseOfID: string[];
  underageIntoxication: string[];
  goingEquippedToSteal: string[];
  hateCrime: string[];
  roughSleeping: string[];
  breachOfBan: string[];
  drunkenDisorderlyBehaviour: string[];
  possessionOfAnOffensiveWeapon: string[];
  attemptedTheft: string[];
  illegalGambling: string[];
  robbery: string[];
  section35Issued: string[];
  breachPoliceBail: string[];
  otherAlcoholDrugRelated: string[];
  otherAntiSocialBehaviour: string[];
  otherTheftFraud: string[];
  otherViolentOffensiveBehaviour: string[];
  otherBreachBan: string[];
  fareEvasion: string[];
  covidRelated: string[];
}

export interface IncidentTags {
  assaultViolenceAffray: boolean;
  beggingPersistent: boolean;
  begging: boolean;
  criminalDamageGraffitiVandalism: boolean;
  possessionWithIntentToSupplyDrugs: boolean;
  harassmentThreateningBehaviour: boolean;
  joyRiding: boolean;
  kerbCrawling: boolean;
  noiseNuisance: boolean;
  inappropriateSexualContact: boolean;
  racialAbuse: boolean;
  smokingUnderageOrInProhibitedArea: boolean;
  streetDrinking: boolean;
  possessionOfDrugs: boolean;
  theft: boolean;
  verbalAbuse: boolean;
  beingOnPremisesWhilstBanned: boolean;
  breachOfSection35Order: boolean;
  other: boolean;
  unlicensedTaxiCab: boolean;
  unlicensedStreetTrading: boolean;
  misuseOfID: boolean;
  underageIntoxication: boolean;
  goingEquippedToSteal: boolean;
  hateCrime: boolean;
  roughSleeping: boolean;
  breachOfBan: boolean;
  drunkenDisorderlyBehaviour: boolean;
  possessionOfAnOffensiveWeapon: boolean;
  attemptedTheft: boolean;
  illegalGambling: boolean;
  robbery: boolean;
  section35Issued: boolean;
  breachPoliceBail: boolean;
  otherAlcoholDrugRelated: boolean;
  otherAntiSocialBehaviour: boolean;
  otherTheftFraud: boolean;
  otherViolentOffensiveBehaviour: boolean;
  otherBreachBan: boolean;
  fareEvasion: boolean;
  covidRelated: boolean;
}

export type CSVData = string[][];
