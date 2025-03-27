import type { Dayjs } from 'dayjs';
import type { Build, Gender, Height, Race, Role } from 'graphql/types';

export interface Profile {
  adminViewOnly: string;
  aka: string;
  build: string;
  dateCreated: string;
  dateOfBirth: string;
  ethnicity: string;
  eyeColour: string;
  forename: string;
  gender: string;
  hairColour: string;
  height: string;
  knownMarks: string;
  profileID: string;
  surname: string;
  warning_GoingEquipped: string;
  warning_Other: string;
  warning_Violent: string;
  warning_Weapons: string;
}

export interface Incident {
  adminViewOnly: string;
  dateCreated: string;
  incidentDate: string;
  incidentGoods: string;
  incidentID: string;
  incidentProfiles: string;
  incidentStatus: string;
  incidentType: string;
  incidentVehicles: string;
  internalDescription: string;
  memberUserID: string;
  policeInvolvedAtScene: string;
}

export interface Member {
  address1: string;
  address2: string;
  business: string;
  county: string;
  dateCreated: string;
  email: string;
  forename: string;
  jobRole: string;
  memberUserID: string;
  postCode: string;
  postTown: string;
  surname: string;
}

export interface Business {
  address1: string;
  address2: string;
  business: string;
  county: string;
  postCode: string;
  postTown: string;
}

export interface Vehicle {
  colour: string;
  dateCreated: string;
  make: string;
  model: string;
  registration: string;
  vehicleID: string;
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
  role: Role | undefined;
  sentrysysId: string;
}

export interface NewBusiness {
  building: string;
  county: string;
  existing?: string;
  groups: string[];
  id: string;
  name: string;
  postcode: string;
  street: string;
  townCity: string;
}

export interface NewOffender {
  alias: string[];
  build: Build;
  dateOfBirth: Dayjs | undefined;
  gender: Gender;
  groups: string[];
  height: Height;
  id: string;
  images: Image[];
  name: string;
  peculiarities: string;
  race: Race;
  sentrysysId: string;
}

export interface NewVehicle {
  colour: string;
  dateCreated: string;
  groups: string[];
  id: string;
  images: Image[];
  make: string;
  model: string;
  registration: string;
  sentrysysId: string;
}

export interface NewIncident {
  business: string | undefined;
  createdBy: string | undefined;
  crimeTypes: string[];
  date: Dayjs;
  description: string;
  groups: string[];
  id: string;
  images: Image[];
  impactTypes: string[];
  involvedTypes: string[];
  items: {
    id: string;
    lost: number;
    recovered: number;
  }[];
  offenders: string[];
  policeInvolved: boolean;
  policeReported: boolean;
  sentrysysId: string;
  subject: string;
  time: Dayjs;
  vehicles: string[];
}

export interface HistoricIncident {
  business: string | undefined;
  createdBy: string | undefined;
  crimeTypes: string[];
  date: Dayjs;
  description: string;
  groups: string[];
  id: string;
  impactTypes: string[];
  involvedTypes: string[];
  items: {
    id: string;
    lost: number;
    recovered: number;
  }[];
  policeInvolved: boolean;
  policeReported: boolean;
  sentrysysId: string;
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
