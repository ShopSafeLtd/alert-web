export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  DateTime: Date;
  JSON: { [key: string]: any };
  Upload: any;
};

export enum AiEntityType {
  Business = 'BUSINESS',
  Incident = 'INCIDENT',
  Offender = 'OFFENDER'
}

export type AiSuggestion = {
  __typename?: 'AISuggestion';
  compassMatch?: Maybe<CompassMatch>;
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  metadata?: Maybe<Scalars['JSON']>;
  offenders?: Maybe<Array<Offender>>;
  reference?: Maybe<Scalars['Int']>;
  rekMatch?: Maybe<RekMatch>;
  status?: Maybe<AiSuggestionStatus>;
  title: Scalars['String'];
  type?: Maybe<AiSuggestionType>;
};

export enum AiSuggestionStatus {
  Approved = 'APPROVED',
  Open = 'OPEN',
  Rejected = 'REJECTED'
}

export enum AiSuggestionType {
  CompassSuggestion = 'COMPASS_SUGGESTION',
  CrimeGroupNew = 'CRIME_GROUP_NEW',
  CrimeGroupOffender = 'CRIME_GROUP_OFFENDER',
  FaceMatch = 'FACE_MATCH',
  IncidentPoliceReport = 'INCIDENT_POLICE_REPORT',
  IncidentPriority = 'INCIDENT_PRIORITY',
  InvestigationCreate = 'INVESTIGATION_CREATE',
  InvestigationIncident = 'INVESTIGATION_INCIDENT',
  InvestigationOffender = 'INVESTIGATION_OFFENDER',
  InvestigationVehicle = 'INVESTIGATION_VEHICLE',
  OffenderDuplicate = 'OFFENDER_DUPLICATE',
  ToxicWarningIncident = 'TOXIC_WARNING_INCIDENT',
  ToxicWarningMessage = 'TOXIC_WARNING_MESSAGE',
  ToxicWarningOffender = 'TOXIC_WARNING_OFFENDER',
  ToxicWarningUpdate = 'TOXIC_WARNING_UPDATE',
  TrendBusiness = 'TREND_BUSINESS',
  TrendGlobal = 'TREND_GLOBAL',
  TrendHotSpot = 'TREND_HOT_SPOT',
  TrendOffenderImpact = 'TREND_OFFENDER_IMPACT'
}

export type AiVisionCamera = {
  __typename?: 'AIVisionCamera';
  business: Business;
  createdAt: Scalars['Date'];
  detectionConfigs: Scalars['Int'];
  duplicateMatchTimeout: Scalars['String'];
  groups: Array<Group>;
  id: Scalars['ID'];
  lastUploaded?: Maybe<Scalars['Date']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  onDetect: Array<DetectActionConfig>;
  osVersion?: Maybe<Scalars['String']>;
  serialNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type AiVisionCameraInput = {
  business: Scalars['String'];
  duplicateMatchTimeout?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupsConnectDisconnect>;
  id?: InputMaybe<Scalars['String']>;
  make?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  onDetect?: InputMaybe<DetectConfigConnectDisconnect>;
  osVersion?: InputMaybe<Scalars['String']>;
  scheme: Scalars['String'];
  serialNumber?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
};

export type AiVisionEvent = {
  __typename?: 'AIVisionEvent';
  business: Business;
  camera: AiVisionCamera;
  createdAt: Scalars['Date'];
  groups: Array<Group>;
  id: Scalars['ID'];
  match?: Maybe<AiVisionMatch>;
  matchFound?: Maybe<Scalars['Boolean']>;
  type?: Maybe<AiVisionEventType>;
  updatedAt: Scalars['Date'];
};

export enum AiVisionEventType {
  FaceDetected = 'FaceDetected'
}

export type AiVisionMatch = {
  __typename?: 'AIVisionMatch';
  business: Business;
  camera: AiVisionCamera;
  confidence: Scalars['Float'];
  confidenceRating: AiVisionMatchConfidence;
  createdAt: Scalars['Date'];
  faceImage: Image;
  groups: Array<Group>;
  id: Scalars['ID'];
  matchedFace: RekFace;
  matchedOffender: Offender;
  outcome?: Maybe<AiVisionMatchOutcome>;
  outcomeNotes?: Maybe<Scalars['String']>;
  priority: AiVisionMatchPriority;
  stillImage: Image;
  updatedAt: Scalars['Date'];
  verificationMethod?: Maybe<AiVisionMatchVerificationMethod>;
  verifiedAt?: Maybe<Scalars['Date']>;
  verifiedBy?: Maybe<User>;
};

export enum AiVisionMatchConfidence {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum AiVisionMatchOutcome {
  DeterredByStaff = 'DETERRED_BY_STAFF',
  FalsePositive = 'FALSE_POSITIVE',
  IncidentOccurred = 'INCIDENT_OCCURRED',
  LeftWithoutIncident = 'LEFT_WITHOUT_INCIDENT',
  NoActionNeeded = 'NO_ACTION_NEEDED',
  Uncertain = 'UNCERTAIN'
}

export enum AiVisionMatchPriority {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Normal = 'NORMAL'
}

export enum AiVisionMatchVerificationMethod {
  AutoConfidence = 'AUTO_CONFIDENCE',
  Manual = 'MANUAL'
}

export type Action = {
  __typename?: 'Action';
  byUser: User;
  createdAt: Scalars['Date'];
  dataType: Model;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['Int']>;
  type: ActionType;
  workflowResults?: Maybe<Scalars['JSON']>;
};

export type ActionOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
};

export enum ActionScalarFieldEnum {
  AddressId = 'addressId',
  ArticleId = 'articleId',
  BanId = 'banId',
  BusinessId = 'businessId',
  ByUserId = 'byUserId',
  ChatId = 'chatId',
  CreatedAt = 'createdAt',
  CrimeGroupId = 'crimeGroupId',
  DataType = 'dataType',
  Description = 'description',
  GroupId = 'groupId',
  Id = 'id',
  ImageId = 'imageId',
  InSchemeId = 'inSchemeId',
  IncidentId = 'incidentId',
  MessageId = 'messageId',
  OffenderId = 'offenderId',
  Reason = 'reason',
  SchemeId = 'schemeId',
  TagId = 'tagId',
  Type = 'type',
  UserId = 'userId',
  VehicleId = 'vehicleId'
}

export enum ActionType {
  Add = 'ADD',
  Approved = 'APPROVED',
  Completed = 'COMPLETED',
  Create = 'CREATE',
  Delete = 'DELETE',
  Disable = 'DISABLE',
  Download = 'DOWNLOAD',
  Enable = 'ENABLE',
  Extend = 'EXTEND',
  Invite = 'INVITE',
  Reduce = 'REDUCE',
  Remove = 'REMOVE',
  ResetPassword = 'RESET_PASSWORD',
  Restore = 'RESTORE',
  SaveDraft = 'SAVE_DRAFT',
  Send = 'SEND',
  Update = 'UPDATE',
  View = 'VIEW',
  WorkflowCheck = 'WORKFLOW_CHECK'
}

export type ActionWhereInput = {
  business?: InputMaybe<BusinessWhereInput>;
  inScheme?: InputMaybe<SchemeWhereInput>;
};

export enum ActionableLevelEnum {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type ActiveChecklist = {
  __typename?: 'ActiveChecklist';
  business?: Maybe<Business>;
  checklistSection: Array<ActiveChecklistSections>;
  comments?: Maybe<Scalars['String']>;
  completedAt?: Maybe<Scalars['Date']>;
  completedBy?: Maybe<User>;
  document?: Maybe<Document>;
  fields: Array<ActiveChecklistFields>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  percentComplete: Scalars['Int'];
  percentageScore: Scalars['String'];
  reference?: Maybe<Scalars['Int']>;
  scheme?: Maybe<Scheme>;
  signature?: Maybe<Scalars['String']>;
  status: ChecklistStatus;
  timeTaken?: Maybe<Scalars['String']>;
  todos: Array<Todo>;
  updatedAt: Scalars['Date'];
};


export type ActiveChecklistTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<Array<TodoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TodoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};

export type ActiveChecklistAnswerInput = {
  additionalInfo?: InputMaybe<Scalars['String']>;
  answer?: InputMaybe<Scalars['String']>;
  fieldId: Scalars['String'];
  flagged: Scalars['Boolean'];
  images?: InputMaybe<Array<Scalars['String']>>;
  na: Scalars['Boolean'];
  weight?: InputMaybe<Scalars['Int']>;
};

export type ActiveChecklistFields = {
  __typename?: 'ActiveChecklistFields';
  answer?: Maybe<ChecklistAnswer>;
  answerTranslations: Array<Scalars['JSON']>;
  availableAnswers: Array<Scalars['JSON']>;
  dependent?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  order: Scalars['Int'];
  question: Scalars['JSON'];
  section: Scalars['Int'];
  subsection: Scalars['Int'];
  type: ChecklistAnswerType;
};

export enum ActiveChecklistFieldsScalarFieldEnum {
  ActiveChecklistId = 'activeChecklistId',
  AnswerTranslations = 'answerTranslations',
  AvailableAnswers = 'availableAnswers',
  CreatedAt = 'createdAt',
  Id = 'id',
  Question = 'question',
  Section = 'section',
  Subsection = 'subsection',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  Weight = 'weight'
}

export type ActiveChecklistOrderByWithRelationInput = {
  completedAt?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  percentComplete?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
};

export enum ActiveChecklistScalarFieldEnum {
  BusinessId = 'businessId',
  ChecklistId = 'checklistId',
  Comments = 'comments',
  CompletedAt = 'completedAt',
  CompletedById = 'completedById',
  CreatedAt = 'createdAt',
  Id = 'id',
  MaxWeight = 'maxWeight',
  PercentComplete = 'percentComplete',
  Signature = 'signature',
  Status = 'status',
  TotalWeight = 'totalWeight',
  UpdatedAt = 'updatedAt'
}

export type ActiveChecklistSections = {
  __typename?: 'ActiveChecklistSections';
  dependsOnWeight?: Maybe<DependWeight>;
  section: Scalars['Int'];
  sub: Scalars['Boolean'];
  subsection?: Maybe<Scalars['Int']>;
  titleLocaled: Scalars['String'];
  titleTranslations: Array<Scalars['JSON']>;
};

export type ActiveChecklistWhereInput = {
  OR?: InputMaybe<Array<ActiveChecklistWhereInput>>;
  business?: InputMaybe<BusinessWhereInput>;
  checklist?: InputMaybe<ChecklistWhereInput>;
  completedBy?: InputMaybe<UserWhereInput>;
  deleted?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumChecklistStatusFilter>;
};

export type ActiveChecklistWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type ActivityExportWhere = {
  assignedUsers?: InputMaybe<Array<Scalars['String']>>;
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  completedAt?: InputMaybe<DateRangeInput>;
  createdAt?: InputMaybe<DateRangeInput>;
  dueDate?: InputMaybe<DateRangeInput>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  status: TodoStatusInput;
};

export type ActivityPerformance = {
  __typename?: 'ActivityPerformance';
  completed: Scalars['Boolean'];
  dueDate: Scalars['Date'];
  id: Scalars['String'];
  name: Scalars['String'];
  totalAnswers: Scalars['Int'];
  totalAssignedUsers: Scalars['Int'];
  totalQuestions: Scalars['Int'];
};

export type ActivityReportsWhere = {
  completed?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<DateRangeInput>;
  groupIds: Array<Scalars['String']>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type ActivitySummary = {
  __typename?: 'ActivitySummary';
  completed: Scalars['Int'];
  overdue: Scalars['Int'];
  percentComplete: Scalars['String'];
  total: Scalars['Int'];
};

export type ActivityTableWhereInput = {
  brandsIds?: InputMaybe<Array<Scalars['String']>>;
  businessesIds?: InputMaybe<Array<Scalars['String']>>;
  completed?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<DateRangeInput>;
  groupIds: Array<Scalars['String']>;
  industryIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type AddImageIntelData = {
  image: UploadIncidentImage;
  incident?: InputMaybe<IncidentConnectOne>;
  offender?: InputMaybe<OffenderConnectOne>;
};

export type Address = {
  __typename?: 'Address';
  alias?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  full: Scalars['String'];
  geoLat?: Maybe<Scalars['Float']>;
  geoLng?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  postcode?: Maybe<Scalars['String']>;
  premises?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  street?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
};

export type AddressListRelationFilter = {
  some?: InputMaybe<AddressWhereInput>;
};

export enum AddressScalarFieldEnum {
  Alias = 'alias',
  Building = 'building',
  BusinessId = 'businessId',
  Country = 'country',
  County = 'county',
  CreatedAt = 'createdAt',
  GeoLat = 'geoLat',
  GeoLng = 'geoLng',
  Id = 'id',
  IncidentId = 'incidentId',
  OffenderId = 'offenderId',
  Postcode = 'postcode',
  Premises = 'premises',
  Primary = 'primary',
  Street = 'street',
  TownCity = 'townCity',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type AddressWhereInput = {
  business?: InputMaybe<BusinessWhereInput>;
  geoLat?: InputMaybe<FloatNullableFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  offender?: InputMaybe<OffenderWhereInput>;
  postcode?: InputMaybe<StringNullableFilter>;
  primary?: InputMaybe<BoolNullableFilter>;
  street?: InputMaybe<StringNullableFilter>;
  townCity?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type AddressWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AdminDashboardData = {
  __typename?: 'AdminDashboardData';
  businessCard: DataCard;
  sessionCard: DataCard;
  userCard: DataCard;
};

export enum Age {
  EighteenThirty = 'EIGHTEEN_THIRTY',
  FiftySixty = 'FIFTY_SIXTY',
  FortyFifty = 'FORTY_FIFTY',
  OverEighty = 'OVER_EIGHTY',
  SeventyEighty = 'SEVENTY_EIGHTY',
  SixtySeventy = 'SIXTY_SEVENTY',
  ThirtyForty = 'THIRTY_FORTY',
  UnderEighteen = 'UNDER_EIGHTEEN',
  Unknown = 'UNKNOWN'
}

export type AiActivityTrends = {
  __typename?: 'AiActivityTrends';
  createdAt: Scalars['Date'];
  crimeGroup: CrimeGroup;
  evolutionNotes?: Maybe<Scalars['String']>;
  geographicFocus: Scalars['String'];
  id: Scalars['ID'];
  peakActivityPeriods: Scalars['String'];
  recentActivityTrend: Scalars['String'];
  targetPreferences: Array<Scalars['String']>;
  totalIncidents: Scalars['Int'];
  updatedAt: Scalars['Date'];
};

export type AiAssociatedRisk = {
  __typename?: 'AiAssociatedRisk';
  aggregatedRiskLevel: AiRiskAssessmentThreatLevel;
  averageOffenderRisk: Scalars['Float'];
  createdAt: Scalars['Date'];
  highRiskOffenderCount: Scalars['Int'];
  id: Scalars['ID'];
  riskJustification: Scalars['String'];
  updatedAt: Scalars['Date'];
  vehicle: Vehicle;
};

export type AiBehavioralAnalysis = {
  __typename?: 'AiBehavioralAnalysis';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  incident?: Maybe<Incident>;
  interventionResponse?: Maybe<Scalars['String']>;
  learningBehavior?: Maybe<Scalars['String']>;
  offender?: Maybe<Offender>;
  planningEvidence?: Maybe<Scalars['String']>;
  riskTolerance?: Maybe<AiRiskTolerance>;
  sophisticationLevel?: Maybe<AiSophisticationLevel>;
  stressResponse?: Maybe<Scalars['String']>;
  tacticsUsed: Array<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type AiGeographicAnalysis = {
  __typename?: 'AiGeographicAnalysis';
  createdAt: Scalars['Date'];
  geographicPattern: Scalars['String'];
  hotspotAnalysis: Scalars['String'];
  id: Scalars['ID'];
  offender: Offender;
  travelDistance: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type AiGeographicMovement = {
  __typename?: 'AiGeographicMovement';
  createdAt: Scalars['Date'];
  crossBorderActivity: Scalars['Boolean'];
  hotspots: Array<Scalars['String']>;
  id: Scalars['ID'];
  primaryRegions: Array<Scalars['String']>;
  travelRadius: Scalars['String'];
  updatedAt: Scalars['Date'];
  vehicle: Vehicle;
};

export type AiGroupSophistication = {
  __typename?: 'AiGroupSophistication';
  adaptabilityScore: Scalars['Int'];
  createdAt: Scalars['Date'];
  crimeGroup: CrimeGroup;
  id: Scalars['ID'];
  organizationStructure: Scalars['String'];
  planningCapability: Scalars['String'];
  resourceLevel: Scalars['String'];
  sophisticationLevel: AiSophisticationLevel;
  updatedAt: Scalars['Date'];
};

export type AiIdentityLinkage = {
  __typename?: 'AiIdentityLinkage';
  createdAt: Scalars['Date'];
  distinctiveMarkers: Array<Scalars['String']>;
  id: Scalars['ID'];
  identityConfidence: Scalars['Int'];
  offender: Offender;
  potentialMatches: Array<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type AiImpactAssessment = {
  __typename?: 'AiImpactAssessment';
  category?: Maybe<AiImpactAssessmentCategory>;
  createdAt: Scalars['Date'];
  financialImpact?: Maybe<AiImpactAssessmentFinancialImpact>;
  id: Scalars['ID'];
  incident?: Maybe<Incident>;
  justification: Scalars['String'];
  keyFactors: Array<Scalars['String']>;
  offender?: Maybe<Offender>;
  overallScore: Scalars['Int'];
  securityResourceImpact?: Maybe<AiImpactAssessmentSecurityResourceImpact>;
  updatedAt: Scalars['Date'];
};

export enum AiImpactAssessmentCategory {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum AiImpactAssessmentFinancialImpact {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum AiImpactAssessmentSecurityResourceImpact {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type AiIncidentImportInput = {
  fallbackGroup: Array<UniqueId>;
  scheme: UniqueId;
  url: Scalars['String'];
};

export type AiInvestigationLeads = {
  __typename?: 'AiInvestigationLeads';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  incident: Incident;
  keyCCTVTimestamps: Array<Scalars['String']>;
  suggestedActions: Array<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type AiMemberRiskAggregation = {
  __typename?: 'AiMemberRiskAggregation';
  aggregatedThreatLevel: AiRiskAssessmentThreatLevel;
  averageMemberRisk: Scalars['Float'];
  createdAt: Scalars['Date'];
  crimeGroup: CrimeGroup;
  highRiskMembers: Scalars['Int'];
  id: Scalars['ID'];
  prolificMembersCount: Scalars['Int'];
  riskJustification: Scalars['String'];
  totalMembers: Scalars['Int'];
  updatedAt: Scalars['Date'];
  violentMembersCount: Scalars['Int'];
};

export type AiNetworkAnalysis = {
  __typename?: 'AiNetworkAnalysis';
  communicationObserved: Array<Scalars['String']>;
  createdAt: Scalars['Date'];
  groupDynamics: Scalars['String'];
  id: Scalars['ID'];
  incident?: Maybe<Incident>;
  offenderRoles?: Maybe<Scalars['JSON']>;
  updatedAt: Scalars['Date'];
};

export type AiPatternRecognition = {
  __typename?: 'AiPatternRecognition';
  createdAt: Scalars['Date'];
  groupBehaviorPattern: Scalars['String'];
  id: Scalars['ID'];
  incident: Incident;
  knownMOMatch: Scalars['String'];
  timePatternClassification: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type AiPreventionInsights = {
  __typename?: 'AiPreventionInsights';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  incident: Incident;
  recommendations: Array<Scalars['String']>;
  staffingImplications: Scalars['String'];
  updatedAt: Scalars['Date'];
  vulnerabilitiesExploited: Array<Scalars['String']>;
};

export type AiQualityAssessment = {
  __typename?: 'AiQualityAssessment';
  createdAt: Scalars['Date'];
  dataGaps: Array<Scalars['String']>;
  id: Scalars['ID'];
  improvements: Array<Scalars['String']>;
  offender: Offender;
  qualityScore: Scalars['Int'];
  updatedAt: Scalars['Date'];
};

export type AiRecommendedActions = {
  __typename?: 'AiRecommendedActions';
  createdAt: Scalars['Date'];
  earlyWarningSignals: Array<Scalars['String']>;
  id: Scalars['ID'];
  offender: Offender;
  preventionTactics: Array<Scalars['String']>;
  priorityLevel?: Maybe<AiRecommendedActionsPriorityLevel>;
  staffGuidance?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export enum AiRecommendedActionsPriorityLevel {
  Elevated = 'ELEVATED',
  High = 'HIGH',
  Normal = 'NORMAL'
}

export type AiRiskAssessment = {
  __typename?: 'AiRiskAssessment';
  confrontationResponse?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  escalationPotential?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  incident?: Maybe<Incident>;
  offender?: Maybe<Offender>;
  reoffendingProbability?: Maybe<Scalars['Int']>;
  staffSafetyRisk?: Maybe<AiRiskAssessmentSafetyRisk>;
  threatLevel?: Maybe<AiRiskAssessmentThreatLevel>;
  updatedAt: Scalars['Date'];
  violencePotential?: Maybe<AiRiskAssessmentThreatLevel>;
};

export enum AiRiskAssessmentSafetyRisk {
  High = 'HIGH',
  Low = 'LOW',
  Moderate = 'MODERATE'
}

export enum AiRiskAssessmentThreatLevel {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum AiRiskTolerance {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum AiSophisticationLevel {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type AiSuggestionWhereInput = {
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<AiSuggestionStatus>>;
  type?: InputMaybe<Array<AiSuggestionType>>;
};

export type AiSuggestionWhereUniqueInput = {
  id: Scalars['String'];
};

export type AiSuggestionsOrderBy = {
  createdAt?: InputMaybe<SortOrder>;
};

export type AiTargetAnalysis = {
  __typename?: 'AiTargetAnalysis';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  offender: Offender;
  storeVulnerabilities: Array<Scalars['String']>;
  targetPreference: Scalars['String'];
  updatedAt: Scalars['Date'];
  valueRange: Scalars['String'];
};

export type AiTemporalAnalysis = {
  __typename?: 'AiTemporalAnalysis';
  createdAt: Scalars['Date'];
  frequencyAnalysis: Scalars['String'];
  id: Scalars['ID'];
  offender: Offender;
  patternPrediction: Scalars['String'];
  timePatterns: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type AiVehicleUsageAnalysis = {
  __typename?: 'AiVehicleUsageAnalysis';
  createdAt: Scalars['Date'];
  dayPatterns: Scalars['String'];
  id: Scalars['ID'];
  incidentFrequency: Scalars['Int'];
  primaryIncidentTypes: Array<Scalars['String']>;
  timePatterns: Scalars['String'];
  updatedAt: Scalars['Date'];
  vehicle: Vehicle;
};

export type AiVisionCameraWhereInput = {
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type AiVisionEventOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
};

export type AiVisionEventWhereInput = {
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  cameraIds?: InputMaybe<Array<Scalars['String']>>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  matchFound?: InputMaybe<Scalars['Boolean']>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type AiVisionMapData = {
  __typename?: 'AiVisionMapData';
  count: Scalars['Int'];
  lat: Scalars['Float'];
  lon: Scalars['Float'];
};

export type AiVisionMatchOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
};

export type AiVisionMatchWhereInput = {
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  cameraIds?: InputMaybe<Array<Scalars['String']>>;
  confidenceRating?: InputMaybe<Array<AiVisionMatchConfidence>>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  offenderIds?: InputMaybe<Array<Scalars['String']>>;
  outcome?: InputMaybe<Array<AiVisionMatchOutcome>>;
  priority?: InputMaybe<Array<AiVisionMatchPriority>>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  verificationMethod?: InputMaybe<Array<AiVisionMatchVerificationMethod>>;
  verified?: InputMaybe<Scalars['Boolean']>;
  verifiedByUserIds?: InputMaybe<Array<Scalars['String']>>;
};

export type Answer = {
  __typename?: 'Answer';
  answer: Scalars['String'];
  id: Scalars['ID'];
  tagQuestion?: Maybe<TagQuestion>;
  taskQuestion?: Maybe<TaskQuestion>;
  type: AnswerType;
};

export type AnswerCount = {
  __typename?: 'AnswerCount';
  answer: Scalars['String'];
  count: Scalars['Int'];
};

export type AnswerCreateWithoutIncidentInput = {
  answer: Scalars['String'];
  tagId: Scalars['String'];
  type: AnswerType;
};

export type AnswerOption = {
  __typename?: 'AnswerOption';
  label: Scalars['String'];
  value: Scalars['String'];
};

export type AnswerOrderByWithRelationInput = {
  tagId?: InputMaybe<SortOrder>;
  tagQuestion?: InputMaybe<TagQuestionOrderByWithRelationInput>;
  taskId?: InputMaybe<SortOrder>;
  taskQuestion?: InputMaybe<TaskQuestionOrderByWithRelationInput>;
};

export enum AnswerScalarFieldEnum {
  Answer = 'answer',
  CreatedAt = 'createdAt',
  Id = 'id',
  IncidentId = 'incidentId',
  TagId = 'tagId',
  TaskId = 'taskId',
  TodoId = 'todoId',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

export type AnswerScalarWhereInput = {
  id?: InputMaybe<StringFilter>;
};

export enum AnswerType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Number = 'NUMBER',
  Select = 'SELECT',
  SelectSingle = 'SELECT_SINGLE',
  String = 'STRING',
  Time = 'TIME'
}

export enum AnswerTypeInput {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Number = 'NUMBER',
  String = 'STRING'
}

export type AnswerUpdateManyWithoutIncidentInput = {
  create?: InputMaybe<Array<AnswerCreateWithoutIncidentInput>>;
  update?: InputMaybe<Array<AnswerUpdateWithWhereUniqueWithoutIncidentInput>>;
};

export type AnswerUpdateManyWithoutTaskQuestionNestedInputFields = {
  create?: InputMaybe<Array<TaskQuestionCreateAnswer>>;
};

export type AnswerUpdateManyWithoutTodoNestedInput = {
  deleteMany?: InputMaybe<Array<AnswerScalarWhereInput>>;
};

export type AnswerUpdateWithWhereUniqueWithoutIncidentInput = {
  data: AnswerUpdateWithoutIncidentInput;
  where: AnswerWhereUniqueInput;
};

export type AnswerUpdateWithoutIncidentInput = {
  answer?: InputMaybe<Scalars['String']>;
};

export type AnswerWeight = {
  __typename?: 'AnswerWeight';
  answer: Scalars['String'];
  weight: Scalars['Int'];
};

export type AnswerWeightInput = {
  answer: Scalars['String'];
  weight?: InputMaybe<Scalars['Int']>;
};

export enum AnswerWeightScalarFieldEnum {
  Answer = 'answer',
  Id = 'id',
  QuestionId = 'questionId',
  Weight = 'weight'
}

export type AnswerWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AnswersInput = {
  answer: Scalars['String'];
  tagQuestionId: Scalars['String'];
  type: AnswerType;
};

export enum AnyAll {
  All = 'all',
  Any = 'any'
}

export enum ApiTokenScope {
  BusinessesRead = 'BUSINESSES_READ',
  FormQuestionsRead = 'FORM_QUESTIONS_READ',
  GoodsTypesRead = 'GOODS_TYPES_READ',
  GroupsRead = 'GROUPS_READ',
  IncidentsCreate = 'INCIDENTS_CREATE',
  IncidentsRead = 'INCIDENTS_READ',
  IncidentStatusesRead = 'INCIDENT_STATUSES_READ',
  IncidentTypesRead = 'INCIDENT_TYPES_READ',
  OffendersCreate = 'OFFENDERS_CREATE',
  OffendersRead = 'OFFENDERS_READ',
  VehiclesCreate = 'VEHICLES_CREATE',
  VehiclesRead = 'VEHICLES_READ'
}

export enum AppType {
  Native = 'NATIVE',
  Web = 'WEB'
}

export type ApprovalUser = {
  __typename?: 'ApprovalUser';
  userId?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  when?: Maybe<Scalars['Date']>;
};

export type ApproveGroupsData = {
  connect?: InputMaybe<Array<UniqueId>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
};

export type ApproveIncidentData = {
  groups?: InputMaybe<ApproveGroupsData>;
};

export type Article = {
  __typename?: 'Article';
  business?: Maybe<Business>;
  completedAt?: Maybe<Scalars['Date']>;
  createdAt: Scalars['Date'];
  createdBy: User;
  criticalExpiry?: Maybe<Scalars['Date']>;
  documents: Array<Document>;
  groups: Array<Group>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  images: Array<Image>;
  previewImage?: Maybe<Scalars['String']>;
  previewText?: Maybe<Scalars['String']>;
  priority: ArticlePriority;
  roles: Array<CustomRole>;
  rows: Array<ArticleRow>;
  schemes: Array<Scheme>;
  status: CompleteStatus;
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
  watermarkImage: Scalars['Boolean'];
};


export type ArticleGroupsArgs = {
  where?: InputMaybe<GroupWhereInput>;
};


export type ArticleImagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type ArticleColumn = {
  __typename?: 'ArticleColumn';
  incidents: Array<Incident>;
  offenders: Array<Offender>;
  text?: Maybe<Scalars['String']>;
};


export type ArticleColumnIncidentsArgs = {
  where?: InputMaybe<IncidentWhereInput>;
};


export type ArticleColumnOffendersArgs = {
  where?: InputMaybe<OffenderWhereInput>;
};

export enum ArticleColumnScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Position = 'position',
  ReportData = 'reportData',
  RowId = 'rowId',
  Text = 'text',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  Width = 'width'
}

export type ArticleOrderByWithRelationInput = {
  criticalExpiry?: InputMaybe<SortOrder>;
  priority?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum ArticlePriority {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Medium = 'MEDIUM',
  Normal = 'NORMAL'
}

export type ArticleRow = {
  __typename?: 'ArticleRow';
  columns: Array<ArticleColumn>;
};

export enum ArticleRowScalarFieldEnum {
  ArticleId = 'articleId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Position = 'position',
  UpdatedAt = 'updatedAt'
}

export enum ArticleScalarFieldEnum {
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  Frequency = 'frequency',
  HideWatermark = 'hideWatermark',
  Id = 'id',
  ImageId = 'imageId',
  PreviewImage = 'previewImage',
  PreviewText = 'previewText',
  Priority = 'priority',
  Recurring = 'recurring',
  RecycleDate = 'recycleDate',
  Recycled = 'recycled',
  Start = 'start',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  WatermarkImage = 'watermarkImage',
  When = 'when'
}

export enum ArticleSectionType {
  GeneralStats = 'GENERAL_STATS',
  ImageGallery = 'IMAGE_GALLERY',
  IncidentGallery = 'INCIDENT_GALLERY',
  IncidentMap = 'INCIDENT_MAP',
  OffenderGallery = 'OFFENDER_GALLERY',
  RecentIncidents = 'RECENT_INCIDENTS',
  Text = 'TEXT',
  TopOffenders = 'TOP_OFFENDERS'
}

export type ArticleWhereInput = {
  OR?: InputMaybe<Array<ArticleWhereInput>>;
  business?: InputMaybe<BusinessWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  priority?: InputMaybe<EnumArticlePriorityFilter>;
  roles?: InputMaybe<CustomRoleListRelationFilter>;
  status?: InputMaybe<EnumCompleteStatusFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ArticleWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AudioAnalyticsReport = {
  __typename?: 'AudioAnalyticsReport';
  averageDuration: Scalars['Float'];
  averageQuality: Scalars['Float'];
  dateRange: Scalars['String'];
  enhancedModeAdoption: Scalars['Float'];
  featureUsage: Scalars['JSON'];
  successRate: Scalars['Float'];
  topIssues: Array<Scalars['JSON']>;
  totalSessions: Scalars['Int'];
};

export type AudioCustomQuestion = {
  __typename?: 'AudioCustomQuestion';
  id: Scalars['String'];
  options: Array<Scalars['JSON']>;
  priority: Scalars['Int'];
  question: Scalars['String'];
  questionId: Scalars['String'];
  required: Scalars['Boolean'];
  type: Scalars['String'];
};

export type AudioFormField = {
  __typename?: 'AudioFormField';
  conditions: Array<Scalars['JSON']>;
  metadata?: Maybe<Scalars['JSON']>;
  position: Scalars['Int'];
  required: Scalars['Boolean'];
  type: Scalars['String'];
};

export type AudioImageUploadResult = {
  __typename?: 'AudioImageUploadResult';
  detectedFaces: Array<DetectedFace>;
  processingStatus: Scalars['String'];
  requiresFaceSelection: Scalars['Boolean'];
  uploadedImages: Array<Scalars['String']>;
};

export type AudioIncidentForm = {
  __typename?: 'AudioIncidentForm';
  fields: Array<AudioFormField>;
  id: Scalars['String'];
};

export type AudioIncidentRequirements = {
  __typename?: 'AudioIncidentRequirements';
  availableBusinesses: Array<Business>;
  connectedBusiness?: Maybe<Business>;
  requiresBusinessSelection: Scalars['Boolean'];
};

export type AudioIncidentType = {
  __typename?: 'AudioIncidentType';
  customQuestions: Array<AudioCustomQuestion>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  incidentForm?: Maybe<AudioIncidentForm>;
  name: Scalars['String'];
};

export type AudioPerformanceMetrics = {
  __typename?: 'AudioPerformanceMetrics';
  averageLatency: Scalars['Float'];
  errorRate: Scalars['Float'];
  last24Hours: Scalars['JSON'];
  operation: Scalars['String'];
  successRate: Scalars['Float'];
  throughput: Scalars['Float'];
};

export type AudioProcessingResult = {
  __typename?: 'AudioProcessingResult';
  chunkNumber?: Maybe<Scalars['Int']>;
  processed: Scalars['Boolean'];
  status: Scalars['String'];
};

export type AudioQualityMetrics = {
  __typename?: 'AudioQualityMetrics';
  confidence: Scalars['Float'];
  duration: Scalars['Float'];
  estimatedQuality: Scalars['String'];
  fileSize: Scalars['Int'];
  issues: Array<Scalars['String']>;
  recommendations: Array<Scalars['String']>;
};

export type AudioSession = {
  __typename?: 'AudioSession';
  sessionId: Scalars['String'];
  status: Scalars['String'];
  uploadUrl: Scalars['String'];
};

export type AudioSessionMetrics = {
  __typename?: 'AudioSessionMetrics';
  audioQuality: Scalars['Float'];
  chunksProcessed: Scalars['Int'];
  enhancedModeUsed: Scalars['Boolean'];
  facesDetected: Scalars['Int'];
  goodsPreSelected: Scalars['Int'];
  imagesUploaded: Scalars['Int'];
  processingTime: Scalars['Float'];
  questionsGenerated: Scalars['Int'];
  sessionDuration: Scalars['Float'];
  transcriptionConfidence: Scalars['Float'];
  wordCount: Scalars['Int'];
};

export type Ban = {
  __typename?: 'Ban';
  active: Scalars['Boolean'];
  checkId?: Maybe<Scalars['String']>;
  companyRef?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  createdBy: User;
  current: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  endDate: Scalars['Date'];
  expired: Scalars['Boolean'];
  feedImage?: Maybe<Image>;
  fineValue: Scalars['Float'];
  id: Scalars['ID'];
  location: Scalars['String'];
  months: Scalars['Int'];
  offender: Offender;
  startDate: Scalars['Date'];
  title?: Maybe<Scalars['String']>;
  type?: Maybe<BanType>;
  updatedAt: Scalars['Date'];
};

export type BanCreateInput = {
  checkId?: InputMaybe<Scalars['String']>;
  companyRef?: InputMaybe<Scalars['String']>;
  createdBy: ConnectHelper;
  description?: InputMaybe<Scalars['String']>;
  endDate: Scalars['Date'];
  fineValue?: InputMaybe<Scalars['Float']>;
  location: Scalars['String'];
  months?: InputMaybe<Scalars['Int']>;
  scheme: ConnectHelper;
  startDate: Scalars['Date'];
  type?: InputMaybe<BanType>;
};

export type BanListRelationFilter = {
  some?: InputMaybe<BanWhereInput>;
};

export type BanNestedUpdate = {
  data: BanUpdateInput;
  where?: InputMaybe<BanWhereUniqueInput>;
};

export type BanOrderByWithRelationInput = {
  endDate?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
};

export enum BanScalarFieldEnum {
  Active = 'active',
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  Description = 'description',
  EndDate = 'endDate',
  Id = 'id',
  Location = 'location',
  OffenderId = 'offenderId',
  Reference = 'reference',
  SchemeId = 'schemeId',
  StartDate = 'startDate',
  Title = 'title',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

export enum BanType {
  Arrest = 'ARREST',
  Cbo = 'CBO',
  CivilRecovery = 'CIVIL_RECOVERY',
  CommunityBan = 'COMMUNITY_BAN',
  CompanyBanningNotice = 'COMPANY_BANNING_NOTICE',
  Compensation = 'COMPENSATION',
  CourtData = 'COURT_DATA',
  Cpn = 'CPN',
  Cpw = 'CPW',
  Fine = 'FINE',
  Other = 'OTHER',
  PrisonSentence = 'PRISON_SENTENCE',
  PromisaryNote = 'PROMISARY_NOTE',
  Pspo = 'PSPO',
  RehabilitationOrder = 'REHABILITATION_ORDER',
  Restitution = 'RESTITUTION',
  SuspendedSentence = 'SUSPENDED_SENTENCE',
  Wip = 'WIP'
}

export type BanUpdateInput = {
  checkId?: InputMaybe<NullableSetStringHelper>;
  companyRef?: InputMaybe<NullableSetStringHelper>;
  description?: InputMaybe<NullableSetStringHelper>;
  endDate?: InputMaybe<NullableSetDateHelper>;
  fineValue?: InputMaybe<SetFloatHelper>;
  location?: InputMaybe<NullableSetStringHelper>;
  months?: InputMaybe<SetIntHelper>;
  startDate?: InputMaybe<NullableSetDateHelper>;
  type?: InputMaybe<NullableEnumBanTypeFieldUpdateOperationsInput>;
};

export type BanWhereInput = {
  active?: InputMaybe<BoolFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
};

export type BanWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type BansOnOffenderUpdate = {
  create?: InputMaybe<Array<BanCreateInput>>;
  delete?: InputMaybe<Array<UniqueId>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
  update?: InputMaybe<Array<BanNestedUpdate>>;
};

export type BatchConfigDetail = {
  __typename?: 'BatchConfigDetail';
  error?: Maybe<Scalars['String']>;
  hubForce: PoliceForce;
  policeHubId: Scalars['String'];
  policeHubName: Scalars['String'];
  sharingConfigId?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

export type BatchPoliceSharingConfigInput = {
  hubForceFilter?: InputMaybe<Array<PoliceForce>>;
  mode: SharingMode;
  schemeFrom: UniqueId;
};

export type BatchPoliceSharingConfigResult = {
  __typename?: 'BatchPoliceSharingConfigResult';
  created: Scalars['Int'];
  details: Array<BatchConfigDetail>;
  failed: Scalars['Int'];
  skipped: Scalars['Int'];
  success: Scalars['Boolean'];
  tagMappingsGenerated: Scalars['Int'];
  total: Scalars['Int'];
};

export type BillingCalculationSummary = {
  __typename?: 'BillingCalculationSummary';
  /** Grand total of all billing costs */
  grandTotal: Scalars['Float'];
  /** Number of tenants in this calculation */
  tenantCount: Scalars['Int'];
  /** Total cost from per-business billing */
  totalBusinessCost: Scalars['Float'];
  /** Total cost from flat rate billing */
  totalFlatRateCost: Scalars['Float'];
  /** Total number of unique users across all tenants */
  totalUniqueUsers: Scalars['Int'];
  /** Total cost from per-user billing */
  totalUserCost: Scalars['Float'];
};

export type BillingCalculationTenant = {
  __typename?: 'BillingCalculationTenant';
  /** Billing mode for this tenant */
  billingMode: BillingMode;
  /** Billing rate for this tenant */
  billingRate: Scalars['Float'];
  /** Whether this tenant is the primary user charge tenant */
  isPrimaryUserChargeTenant: Scalars['Boolean'];
  /** Optional notes for this tenant billing */
  notes?: Maybe<Scalars['String']>;
  /** Quantity being billed (users or businesses) */
  quantity: Scalars['Int'];
  /** Calculated subtotal for this tenant */
  subtotal: Scalars['Float'];
  /** ID of the tenant (scheme) */
  tenantId: Scalars['String'];
  /** Name of the tenant (scheme) */
  tenantName: Scalars['String'];
};

export type BillingCustomer = {
  __typename?: 'BillingCustomer';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  schemeCount: Scalars['Int'];
  schemes: Array<Scheme>;
};

export type BillingCustomerCalculation = {
  __typename?: 'BillingCustomerCalculation';
  /** ID of the billing customer */
  billingCustomerId: Scalars['String'];
  /** Name of the billing customer */
  billingCustomerName: Scalars['String'];
  /** Timestamp when this calculation was performed */
  calculatedAt: Scalars['Date'];
  /** Summary of all billing calculations */
  summary: BillingCalculationSummary;
  /** List of tenants and their billing calculations */
  tenants: Array<BillingCalculationTenant>;
};

export type BillingCustomerCreateInput = {
  name: Scalars['String'];
  schemes?: InputMaybe<NullableConnectOnlyArrayHelper>;
};

export type BillingCustomerUpdateInput = {
  name?: InputMaybe<SetStringHelper>;
  schemes?: InputMaybe<NullableConnectArrayHelper>;
};

export type BillingCustomerWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum BillingMode {
  FlatRate = 'FLAT_RATE',
  PerBusiness = 'PER_BUSINESS',
  PerUser = 'PER_USER'
}

export type BlurImageInput = {
  id: Scalars['String'];
  url: Scalars['String'];
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type BoolNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedBoolNullableFilter>;
  _min?: InputMaybe<NestedBoolNullableFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableWithAggregatesFilter>;
};

export type BoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type Brand = {
  __typename?: 'Brand';
  businessCount: Scalars['Int'];
  businesses: Array<Business>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  industry?: Maybe<Industry>;
  name: Scalars['String'];
  recycled: Scalars['Boolean'];
  scheme: Scheme;
  schemeId: Scalars['String'];
};

export type BrandListRelationFilter = {
  every?: InputMaybe<BrandWhereInput>;
  none?: InputMaybe<BrandWhereInput>;
  some?: InputMaybe<BrandWhereInput>;
};

export type BrandOrderBy = {
  name?: InputMaybe<SortOrder>;
};

export type BrandOrderByWithRelationInput = {
  name?: InputMaybe<SortOrder>;
};

export type BrandWhereInput = {
  AND?: InputMaybe<Array<BrandWhereInput>>;
  NOT?: InputMaybe<Array<BrandWhereInput>>;
  OR?: InputMaybe<Array<BrandWhereInput>>;
  businesses?: InputMaybe<BusinessListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  industry?: InputMaybe<IndustryWhereInput>;
  name?: InputMaybe<StringFilter>;
  recycled?: InputMaybe<BoolFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
};

export type BrandWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum Build {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL',
  Unknown = 'UNKNOWN'
}

export type BulletinEngagement = {
  __typename?: 'BulletinEngagement';
  averageViewsPerUser: Scalars['Float'];
  bulletinId: Scalars['String'];
  bulletinTitle: Scalars['String'];
  notViewedCount: Scalars['Int'];
  totalUsers: Scalars['Int'];
  totalViews: Scalars['Int'];
  users: Array<BulletinUserEngagement>;
  viewRate: Scalars['Float'];
  viewedCount: Scalars['Int'];
};

export type BulletinUserEngagement = {
  __typename?: 'BulletinUserEngagement';
  firstViewedAt?: Maybe<Scalars['Date']>;
  hasViewed: Scalars['Boolean'];
  lastViewedAt?: Maybe<Scalars['Date']>;
  userEmail?: Maybe<Scalars['String']>;
  userFullName: Scalars['String'];
  userId: Scalars['String'];
  viewCount?: Maybe<Scalars['Int']>;
};

export type BulletinView = {
  __typename?: 'BulletinView';
  bulletinId: Scalars['String'];
  bulletinTitle: Scalars['String'];
  firstViewedAt: Scalars['Date'];
  lastViewedAt: Scalars['Date'];
  viewCount: Scalars['Int'];
};

export type Business = {
  __typename?: 'Business';
  actions: Array<Action>;
  adminName: Scalars['String'];
  brands: Array<Scalars['String']>;
  brandsList: Array<Brand>;
  checklists: Array<Checklist>;
  children: Array<Business>;
  createdAt: Scalars['Date'];
  currency?: Maybe<Currency>;
  demDevices: Array<DemDevice>;
  demId?: Maybe<Scalars['String']>;
  division?: Maybe<Scalars['String']>;
  evidences: Array<Document>;
  fullName: Scalars['String'];
  goodsTypesTotals?: Maybe<Array<BusinessGoodsTotals>>;
  groups: Array<Group>;
  id: Scalars['ID'];
  incidents: Array<Incident>;
  locations: Array<Address>;
  name: Scalars['String'];
  offenderSettings: OffenderSettings;
  parent?: Maybe<Business>;
  parentId?: Maybe<Scalars['String']>;
  policeArea: Array<PoliceForce>;
  publicName: Scalars['Boolean'];
  recycled: Scalars['Boolean'];
  reference?: Maybe<Scalars['Int']>;
  schemes: Array<Scheme>;
  siteNumber?: Maybe<Scalars['String']>;
  tags: Array<Tag>;
  todos: Array<Todo>;
  totalUsers: Scalars['Int'];
  updatedAt: Scalars['Date'];
  users: Array<User>;
  valueStats?: Maybe<ValueTotals>;
};


export type BusinessGoodsTypesTotalsArgs = {
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};


export type BusinessIncidentsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type BusinessLocationsArgs = {
  take?: InputMaybe<Scalars['Int']>;
};


export type BusinessTodosArgs = {
  take?: InputMaybe<Scalars['Int']>;
};


export type BusinessValueStatsArgs = {
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};

export type BusinessAnswerInput = {
  answer: Scalars['String'];
  businessQuestionId: Scalars['String'];
  type?: InputMaybe<AnswerTypeInput>;
};

export type BusinessBrandsInput = {
  set?: InputMaybe<Array<UniqueId>>;
};

export type BusinessContributionOrderByInput = {
  averageLossValue?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  totalIncidents?: InputMaybe<SortOrder>;
  totalLogins?: InputMaybe<SortOrder>;
  totalLostValue?: InputMaybe<SortOrder>;
  totalMessages?: InputMaybe<SortOrder>;
  totalOffenders?: InputMaybe<SortOrder>;
  totalRecoveredValue?: InputMaybe<SortOrder>;
  totalSuccessRate?: InputMaybe<SortOrder>;
  totalUpdates?: InputMaybe<SortOrder>;
  totalUsers?: InputMaybe<SortOrder>;
};

export type BusinessContributions = {
  __typename?: 'BusinessContributions';
  averageLossValue?: Maybe<Scalars['Float']>;
  highestTotalValueGoodLost?: Maybe<Scalars['Float']>;
  mostCommonGoodLost?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  totalIncidents: Scalars['Int'];
  totalLogins: Scalars['Int'];
  totalLostValue: Scalars['Float'];
  totalMessages: Scalars['Int'];
  totalOffenders: Scalars['Int'];
  totalRecoveredValue: Scalars['Float'];
  totalSuccessRate: Scalars['Float'];
  totalUpdates: Scalars['Int'];
  totalUsers: Scalars['Int'];
};

export type BusinessCreateNestedManyWithoutUsersInput = {
  connect?: InputMaybe<Array<BusinessWhereUniqueInput>>;
  create?: InputMaybe<Array<CreateBusinessOnUserDataInput>>;
  disconnect?: InputMaybe<Array<BusinessWhereUniqueInput>>;
};

export type BusinessGoodsTotals = {
  __typename?: 'BusinessGoodsTotals';
  avgLostValue?: Maybe<Scalars['Float']>;
  avgRecoveredValue?: Maybe<Scalars['Float']>;
  businessId?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  goodsType?: Maybe<GoodsType>;
  successRate?: Maybe<Scalars['Float']>;
  totalLostValue?: Maybe<Scalars['Float']>;
  totalRecoveredValue?: Maybe<Scalars['Float']>;
};

export type BusinessImpact = {
  __typename?: 'BusinessImpact';
  businessAddress: Scalars['String'];
  businessName: Scalars['String'];
  contactAddress: Scalars['String'];
  contactName: Scalars['String'];
  crimeNumber: Scalars['String'];
  date: Scalars['String'];
  description: Scalars['String'];
  incidentDate: Scalars['String'];
  incidentLoss: Scalars['String'];
  incidentRecovered: Scalars['String'];
  lostItems: Array<Scalars['String']>;
  policeOfficerAttending: Scalars['String'];
  referenceNumber: Scalars['String'];
  telephone: Scalars['String'];
  userAddress: Scalars['String'];
  userContact: Scalars['String'];
  userName: Scalars['String'];
};

export type BusinessImpactInput = {
  businessAddress: Scalars['String'];
  businessName: Scalars['String'];
  compensation: Scalars['String'];
  contactAddress: Scalars['String'];
  contactName: Scalars['String'];
  crimeNumber: Scalars['String'];
  date: Scalars['String'];
  directLossStatement: Scalars['String'];
  financialImpact: Scalars['String'];
  incidentID: Scalars['String'];
  nonFinancialImpact: Scalars['String'];
  otherComments: Scalars['String'];
  otherLossStatement: Scalars['String'];
  policeOfficerAttending: Scalars['String'];
  signature: Scalars['String'];
  telephone: Scalars['String'];
};

export type BusinessIncidentsCountGraphInput = {
  brandIds?: InputMaybe<Array<Scalars['String']>>;
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  crimeGroupId?: InputMaybe<Scalars['String']>;
  dateRange: DateRangeInput;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  industryIds?: InputMaybe<Array<Scalars['String']>>;
  offenderId?: InputMaybe<Scalars['String']>;
  roleIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
};

export type BusinessLpActionItems = {
  __typename?: 'BusinessLPActionItems';
  /** Bans for business offenders expiring within 7 days */
  bansExpiringSoon: Array<BusinessLpExpiringBan>;
  /** Incidents at this business awaiting approval */
  incidentsPendingApproval: Array<BusinessLpPendingIncident>;
};

export type BusinessLpActiveBans = {
  __typename?: 'BusinessLPActiveBans';
  /** Bans expiring within 30 days — urgent awareness */
  expiringWithin30Days: Array<BusinessLpBanItem>;
  /** Bans valid for more than 30 days — general awareness */
  longerTerm: Array<BusinessLpBanItem>;
};

export type BusinessLpBanItem = {
  __typename?: 'BusinessLPBanItem';
  daysRemaining: Scalars['Int'];
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  offenderId: Scalars['String'];
  /** Images associated with this offender */
  offenderImages: Scalars['JSON'];
  offenderName?: Maybe<Scalars['String']>;
};

export type BusinessLpCrimePatterns = {
  __typename?: 'BusinessLPCrimePatterns';
  /** Day of week (0=Sunday) with most incidents, or null */
  peakDay?: Maybe<Scalars['Int']>;
  /** Top 3 hours by incident count (last 90 days) */
  peakHours: Array<BusinessLpPeakHour>;
  /** Top 5 most stolen goods with value (last 90 days) */
  topStolenGoods: Array<BusinessLpTopGood>;
};

export type BusinessLpExpiringBan = {
  __typename?: 'BusinessLPExpiringBan';
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  offenderName?: Maybe<Scalars['String']>;
};

export type BusinessLpLinkedInvestigation = {
  __typename?: 'BusinessLPLinkedInvestigation';
  id: Scalars['String'];
  /** Number of this business's incidents in the investigation */
  incidentCount: Scalars['Int'];
  name: Scalars['String'];
  reference?: Maybe<Scalars['Int']>;
  status: Scalars['String'];
};

export type BusinessLpPeakHour = {
  __typename?: 'BusinessLPPeakHour';
  count: Scalars['Int'];
  /** Hour of day (0-23) */
  hour: Scalars['Int'];
};

export type BusinessLpPendingIncident = {
  __typename?: 'BusinessLPPendingIncident';
  date: Scalars['DateTime'];
  id: Scalars['String'];
  reference?: Maybe<Scalars['Int']>;
};

export type BusinessLpRecentIncident = {
  __typename?: 'BusinessLPRecentIncident';
  approved?: Maybe<Scalars['Boolean']>;
  /** INCIDENT_CRIME_TYPE tag names */
  crimeTypes: Array<Scalars['String']>;
  date: Scalars['DateTime'];
  id: Scalars['String'];
  offenderCount: Scalars['Int'];
  reference?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Float']>;
};

export type BusinessLpRiskProfile = {
  __typename?: 'BusinessLPRiskProfile';
  /** Quality score of submitted data */
  aiDataQualityScore?: Maybe<Scalars['Float']>;
  /** How actively the business uses the platform */
  aiEngagementScore?: Maybe<Scalars['Float']>;
  /** Key AI-generated insights for this business */
  aiKeyInsights: Array<Scalars['String']>;
  /** Enum label: LOW / MEDIUM / HIGH / CRITICAL */
  aiRiskLevel?: Maybe<Scalars['String']>;
  /** Computed risk score (null if not yet analysed) */
  aiRiskScore?: Maybe<Scalars['Float']>;
  /** Urgent actions flagged by AI analysis */
  aiUrgentActions: Array<Scalars['String']>;
};

export type BusinessLpSchemeComparison = {
  __typename?: 'BusinessLPSchemeComparison';
  /** % of scheme businesses with fewer incidents (0-100) */
  incidentCountPercentile: Scalars['Float'];
  /** This business rank by incident count (1 = highest) */
  incidentCountRank: Scalars['Int'];
  /** Mean incident count across scheme businesses */
  schemeAvgIncidentCount: Scalars['Float'];
  /** Mean value lost across scheme businesses */
  schemeAvgValueLost: Scalars['Float'];
  /** Total businesses in the scheme */
  schemeBusinessCount: Scalars['Int'];
  /** % of scheme businesses with lower value lost (0-100) */
  valuePercentile: Scalars['Float'];
  /** This business rank by value lost (1 = highest) */
  valueRank: Scalars['Int'];
};

export type BusinessLpSummary = {
  __typename?: 'BusinessLPSummary';
  /** Active bans for offenders who have targeted this business */
  activeBansCount: Scalars['Int'];
  /** Most recent incident date (null if no incidents) */
  lastIncidentDate?: Maybe<Scalars['DateTime']>;
  /** Incidents at this business awaiting approval */
  pendingApprovalCount: Scalars['Int'];
  /** totalRecoveredValue / totalValueLost (0 if no losses) */
  recoveryRate: Scalars['Float'];
  /** Incidents at this business in the last 30 days */
  thisMonthCount: Scalars['Int'];
  /** Incidents at this business in the last 7 days */
  thisWeekCount: Scalars['Int'];
  /** Incidents at this business today */
  todayCount: Scalars['Int'];
  /** Sum of recovered values in last 30 days */
  totalRecoveredValue: Scalars['Float'];
  /** Sum of incident values in last 30 days */
  totalValueLost: Scalars['Float'];
  /** % change in incidents vs previous week (null if no prior data) */
  weeklyChange?: Maybe<Scalars['Float']>;
};

export type BusinessLpTopGood = {
  __typename?: 'BusinessLPTopGood';
  count: Scalars['Int'];
  name: Scalars['String'];
  totalValue: Scalars['Float'];
};

export type BusinessLpWatchlistInsights = {
  __typename?: 'BusinessLPWatchlistInsights';
  /** Average days between incidents for repeat offenders */
  averageDaysBetweenIncidents: Scalars['Float'];
  /** Distribution: period0to30, period31to90, period91to180, period180plus */
  recidivismDistribution: Scalars['JSON'];
  /** Top 3 highest-frequency offenders at this business */
  topByFrequency: Array<BusinessLpWatchlistOffender>;
  /** Offenders with 3+ incidents at this business in 90 days */
  totalRepeatOffenders: Scalars['Int'];
};

export type BusinessLpWatchlistOffender = {
  __typename?: 'BusinessLPWatchlistOffender';
  id: Scalars['String'];
  /** Images associated with this offender */
  images: Scalars['JSON'];
  incidentCount: Scalars['Int'];
  /** Whether this offender has an active ban right now */
  isCurrentlyBanned: Scalars['Boolean'];
  lastIncidentDate?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['Int']>;
  totalValue: Scalars['Float'];
};

export enum BusinessLpWatchlistOrderBy {
  IncidentCount = 'INCIDENT_COUNT',
  TotalValue = 'TOTAL_VALUE'
}

export type BusinessListRelationFilter = {
  every?: InputMaybe<BusinessWhereInput>;
  none?: InputMaybe<BusinessWhereInput>;
  some?: InputMaybe<BusinessWhereInput>;
};

export type BusinessLossPreventionData = {
  __typename?: 'BusinessLossPreventionData';
  /** Items requiring immediate attention */
  actionItems?: Maybe<BusinessLpActionItems>;
  /** Active bans partitioned by urgency */
  activeBans?: Maybe<BusinessLpActiveBans>;
  /** Peak hours, peak day, and top stolen goods (last 90 days) */
  crimePatterns?: Maybe<BusinessLpCrimePatterns>;
  /** Open investigations containing incidents from this business */
  linkedInvestigations?: Maybe<Array<BusinessLpLinkedInvestigation>>;
  /** Top 10 offenders by incident count (last 90 days) */
  offenderWatchlist?: Maybe<Array<BusinessLpWatchlistOffender>>;
  /** Last 10 incidents at this business */
  recentIncidents?: Maybe<Array<BusinessLpRecentIncident>>;
  /** AI-derived risk and engagement scores for this business */
  riskProfile?: Maybe<BusinessLpRiskProfile>;
  /** How this business ranks vs others in the scheme (requires schemeId) */
  schemeComparison?: Maybe<BusinessLpSchemeComparison>;
  /** Multi-period pulse metrics for this business */
  summary: BusinessLpSummary;
  /** Repeat offender patterns for this business */
  watchlistInsights?: Maybe<BusinessLpWatchlistInsights>;
};

export enum BusinessLossPreventionSection {
  ActionItems = 'ACTION_ITEMS',
  ActiveBans = 'ACTIVE_BANS',
  CrimePatterns = 'CRIME_PATTERNS',
  LinkedInvestigations = 'LINKED_INVESTIGATIONS',
  OffenderWatchlist = 'OFFENDER_WATCHLIST',
  RecentIncidents = 'RECENT_INCIDENTS',
  RiskProfile = 'RISK_PROFILE',
  SchemeComparison = 'SCHEME_COMPARISON',
  Summary = 'SUMMARY',
  WatchlistInsights = 'WATCHLIST_INSIGHTS'
}

export type BusinessOrderBy = {
  name?: InputMaybe<SortOrder>;
};

export type BusinessParentInput = {
  connect?: InputMaybe<UniqueId>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type BusinessQuestion = {
  __typename?: 'BusinessQuestion';
  actions: Array<Scalars['JSON']>;
  answers: Array<Answer>;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  dependentBrands: Array<Scalars['String']>;
  dependentQuestions: Array<Scalars['JSON']>;
  dependentTags: Array<Scalars['String']>;
  failureAnswer?: Maybe<Scalars['String']>;
  failureMessage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  priority: Scalars['Int'];
  question: Question;
  questionId: Scalars['String'];
  req: Scalars['Boolean'];
  roles: Array<CustomRole>;
  scheme: Scheme;
  schemeId: Scalars['String'];
  tooltip?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type BusinessQuestionRelayOrderInput = {
  priority?: InputMaybe<SortOrder>;
};

export type BusinessQuestionRelayWhereInput = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  required?: InputMaybe<Scalars['Boolean']>;
  schemeIds?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
};

export type BusinessQuestionWhereInput = {
  AND?: InputMaybe<Array<BusinessQuestionWhereInput>>;
  NOT?: InputMaybe<Array<BusinessQuestionWhereInput>>;
  OR?: InputMaybe<Array<BusinessQuestionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  priority?: InputMaybe<IntFilter>;
  questionId?: InputMaybe<StringFilter>;
  req?: InputMaybe<BoolFilter>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BusinessQuestionWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type BusinessReport = {
  __typename?: 'BusinessReport';
  crimeTypeDonut: Array<Graph>;
  goodsTypeLossRecovered: Array<RadialGraph>;
  incidentDayOfWeekGraph: Array<Graph>;
  incidentMonthGraph: Array<Graph>;
  incidentSummary: IncidentSummary;
  incidentTimeOfDayDonut: Array<Graph>;
  incidentsTable: ListIncidents;
  involvedTagDonut: Array<Graph>;
  lossTotals: LossTotals;
  targetedGoods: ListTargetedGoods;
};

export type BusinessReportInput = {
  businessId: Scalars['String'];
  crimeGroupIds?: InputMaybe<Array<Scalars['String']>>;
  dateRange: DateRangeInput;
  groupIds: Array<Scalars['String']>;
  offenderIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
};

export enum BusinessScalarFieldEnum {
  CreatedAt = 'createdAt',
  DemId = 'demId',
  Division = 'division',
  Id = 'id',
  Name = 'name',
  ParentId = 'parentId',
  PublicName = 'publicName',
  Recycled = 'recycled',
  Reference = 'reference',
  UpdatedAt = 'updatedAt'
}

export type BusinessStatistics = {
  __typename?: 'BusinessStatistics';
  /** Total number of businesses in the scheme */
  totalBusinesses: Scalars['Int'];
  /** Number of businesses with UK-based locations */
  ukBasedCount: Scalars['Int'];
  /** Percentage of businesses that are UK-based */
  ukBasedPercentage: Scalars['Float'];
  /** Number of businesses with configured police force */
  withPoliceAreaCount: Scalars['Int'];
  /** Percentage of businesses with configured police force */
  withPoliceAreaPercentage: Scalars['Float'];
};

export type BusinessSyncResult = {
  __typename?: 'BusinessSyncResult';
  businessId: Scalars['String'];
  businessName: Scalars['String'];
  groupCount: Scalars['Int'];
  incidents: EntitySyncStats;
  offenders: EntitySyncStats;
  vehicles: EntitySyncStats;
};

export type BusinessUpdateInput = {
  brands?: InputMaybe<BusinessBrandsInput>;
  currency?: InputMaybe<NullableEnumCurrencyFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupsSet>;
  locations?: InputMaybe<LocationUpdateInputField>;
  name?: InputMaybe<SetStringHelper>;
  parent?: InputMaybe<BusinessParentInput>;
  policeArea?: InputMaybe<PoliceAreaSet>;
  publicName?: InputMaybe<Scalars['Boolean']>;
  schemes?: InputMaybe<NullableConnectArrayHelper>;
  siteNumber?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<TagsOnBusiness>;
};

export type BusinessWhereInput = {
  AND?: InputMaybe<Array<BusinessWhereInput>>;
  NOT?: InputMaybe<Array<BusinessWhereInput>>;
  OR?: InputMaybe<Array<BusinessWhereInput>>;
  brands?: InputMaybe<BrandListRelationFilter>;
  currency?: InputMaybe<EnumCurrencyNullableFilter>;
  division?: InputMaybe<StringNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  locations?: InputMaybe<AddressListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  parent?: InputMaybe<BusinessWhereInput>;
  policeArea?: InputMaybe<EnumPoliceForceNullableListFilter>;
  publicName?: InputMaybe<BoolFilter>;
  recycled?: InputMaybe<BoolFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  siteNumber?: InputMaybe<StringFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type BusinessWhereUniqueInput = {
  AND?: InputMaybe<Array<BusinessWhereInput>>;
  NOT?: InputMaybe<Array<BusinessWhereInput>>;
  OR?: InputMaybe<Array<BusinessWhereInput>>;
  children?: InputMaybe<BusinessListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  demId?: InputMaybe<StringNullableFilter>;
  division?: InputMaybe<StringNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  locations?: InputMaybe<AddressListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  parent?: InputMaybe<BusinessWhereInput>;
  parentId?: InputMaybe<StringNullableFilter>;
  publicName?: InputMaybe<BoolFilter>;
  recycled?: InputMaybe<BoolFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type CategoryCount = {
  __typename?: 'CategoryCount';
  /** Category name */
  category: Scalars['String'];
  /** Number of occurrences */
  count: Scalars['Int'];
};

export type CctvCreateUpdate = {
  createUpdate?: InputMaybe<Array<UpsertIncidentCctvRecord>>;
  remove?: InputMaybe<Array<Scalars['String']>>;
};

export type CctvRecord = {
  __typename?: 'CctvRecord';
  aheadBehind?: Maybe<Scalars['String']>;
  cameraNumber: Scalars['String'];
  correctTime?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  endTime: Scalars['Date'];
  id: Scalars['String'];
  incident: Incident;
  incorrectBy?: Maybe<Scalars['Int']>;
  showFace: Scalars['Boolean'];
  showIncident: Scalars['Boolean'];
  startTime: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type CctvRecordCreateWithoutIncident = {
  aheadBehind?: InputMaybe<Scalars['String']>;
  cameraNumber: Scalars['String'];
  correctTime?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  endTime: Scalars['Date'];
  incorrectBy?: InputMaybe<Scalars['Int']>;
  showFace: Scalars['Boolean'];
  showIncident: Scalars['Boolean'];
  startTime: Scalars['Date'];
};

export type CctvRecordListRelationFilter = {
  every?: InputMaybe<CctvRecordWhereInput>;
  none?: InputMaybe<CctvRecordWhereInput>;
  some?: InputMaybe<CctvRecordWhereInput>;
};

export type CctvRecordOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CctvRecordOrderByWithRelationInput = {
  aheadBehind?: InputMaybe<SortOrder>;
  cameraNumber?: InputMaybe<SortOrder>;
  correctTime?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  endTime?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  incorrectBy?: InputMaybe<SortOrder>;
  showFace?: InputMaybe<SortOrder>;
  showIncident?: InputMaybe<SortOrder>;
  startTime?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CctvRecordScalarWhereInput = {
  AND?: InputMaybe<Array<CctvRecordScalarWhereInput>>;
  NOT?: InputMaybe<Array<CctvRecordScalarWhereInput>>;
  OR?: InputMaybe<Array<CctvRecordScalarWhereInput>>;
  aheadBehind?: InputMaybe<StringNullableFilter>;
  cameraNumber?: InputMaybe<StringFilter>;
  correctTime?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  endTime?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringFilter>;
  incorrectBy?: InputMaybe<IntNullableFilter>;
  showFace?: InputMaybe<BoolFilter>;
  showIncident?: InputMaybe<BoolFilter>;
  startTime?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CctvRecordScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CctvRecordScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<CctvRecordScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CctvRecordScalarWhereWithAggregatesInput>>;
  aheadBehind?: InputMaybe<StringNullableWithAggregatesFilter>;
  cameraNumber?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  endTime?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentId?: InputMaybe<StringWithAggregatesFilter>;
  incorrectBy?: InputMaybe<IntNullableWithAggregatesFilter>;
  startTime?: InputMaybe<DateTimeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type CctvRecordUpdateManyWithoutIncidentInput = {
  create?: InputMaybe<Array<CctvRecordCreateWithoutIncident>>;
  deleteMany?: InputMaybe<Array<CctvRecordScalarWhereInput>>;
  update?: InputMaybe<Array<CctvRecordUpdateWithWhereUniqueWithoutIncident>>;
};

export type CctvRecordUpdateWithWhereUniqueWithoutIncident = {
  data: CctvRecordUpdateWithoutIncident;
  where: CctvRecordWhereUniqueInput;
};

export type CctvRecordUpdateWithoutIncident = {
  aheadBehind?: InputMaybe<Scalars['String']>;
  cameraNumber?: InputMaybe<Scalars['String']>;
  correctTime?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['Date']>;
  incorrectBy?: InputMaybe<Scalars['Int']>;
  showFace?: InputMaybe<Scalars['Boolean']>;
  showIncident?: InputMaybe<Scalars['Boolean']>;
  startTime?: InputMaybe<Scalars['Date']>;
};

export type CctvRecordWhereInput = {
  AND?: InputMaybe<Array<CctvRecordWhereInput>>;
  NOT?: InputMaybe<Array<CctvRecordWhereInput>>;
  OR?: InputMaybe<Array<CctvRecordWhereInput>>;
  aheadBehind?: InputMaybe<StringNullableFilter>;
  cameraNumber?: InputMaybe<StringFilter>;
  correctTime?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  endTime?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringFilter>;
  incorrectBy?: InputMaybe<IntNullableFilter>;
  showFace?: InputMaybe<BoolFilter>;
  showIncident?: InputMaybe<BoolFilter>;
  startTime?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CctvRecordWhereUniqueInput = {
  AND?: InputMaybe<Array<CctvRecordWhereInput>>;
  NOT?: InputMaybe<Array<CctvRecordWhereInput>>;
  OR?: InputMaybe<Array<CctvRecordWhereInput>>;
  aheadBehind?: InputMaybe<StringNullableFilter>;
  cameraNumber?: InputMaybe<StringFilter>;
  correctTime?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  endTime?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringFilter>;
  incorrectBy?: InputMaybe<IntNullableFilter>;
  showFace?: InputMaybe<BoolFilter>;
  showIncident?: InputMaybe<BoolFilter>;
  startTime?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CentralCoopIdInput = {
  id: Scalars['String'];
};

export type CentralCoopImportDataInput = {
  /** Optional mapping of CSV/Excel columns to incident fields */
  columnMapping?: InputMaybe<IncidentColumnMapping>;
  /** Base64 encoded CSV/Excel data or file content as string (auto-detects format) */
  csvData?: InputMaybe<Scalars['String']>;
  /** URL to download the CSV/Excel file from (e.g., Azure Blob Storage URL) */
  fileUrl?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<CentralCoopIdInput>>;
  scheme: CentralCoopIdInput;
};

export type ChangePositionAndReqInput = {
  tags: Array<UpdateTagQuestionInput>;
};

export type ChangeSchemeTierInput = {
  adminLimit: Scalars['Int'];
  businessLimit: Scalars['Int'];
  licenceType: LicenceType;
  schemeId: Scalars['String'];
  startTrial?: InputMaybe<Scalars['Boolean']>;
  tierId: Scalars['String'];
  userLimit: Scalars['Int'];
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  firstLetter: Scalars['String'];
  id: Scalars['ID'];
  members: Array<UserChat>;
  messageCount: Scalars['Int'];
  messages: Array<Message>;
  name: Scalars['String'];
  totalMembers: Scalars['Int'];
  totalMessages: Scalars['Int'];
  updatedAt: Scalars['Date'];
};


export type ChatMembersArgs = {
  cursor?: InputMaybe<UserChatWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserChatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserChatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserChatWhereInput>;
};


export type ChatMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};

export type ChatCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<ChatMembersCreate>;
  name: Scalars['String'];
  scheme: ConnectHelper;
};

export type ChatListRelationFilter = {
  every?: InputMaybe<ChatWhereInput>;
  none?: InputMaybe<ChatWhereInput>;
  some?: InputMaybe<ChatWhereInput>;
};

export type ChatMembersCreate = {
  create: Array<UserChatCreate>;
};

export type ChatMembersUpdate = {
  create?: InputMaybe<Array<UserChatCreate>>;
  delete?: InputMaybe<Array<UniqueId>>;
  update?: InputMaybe<Array<UserChatUpdateEnvelope>>;
};

export type ChatMessagesWhereInput = {
  chat: UniqueId;
};

export type ChatOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ChatOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  members?: InputMaybe<UserChatOrderByRelationAggregateInput>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  todos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  uploaded?: InputMaybe<SortOrder>;
};

export type ChatUpdateInput = {
  description?: InputMaybe<SetStringHelper>;
  members?: InputMaybe<ChatMembersUpdate>;
  name?: InputMaybe<SetStringHelper>;
};

export type ChatWhereInput = {
  AND?: InputMaybe<Array<ChatWhereInput>>;
  NOT?: InputMaybe<Array<ChatWhereInput>>;
  OR?: InputMaybe<Array<ChatWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  members?: InputMaybe<UserChatListRelationFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
};

export type ChatWhereUniqueInput = {
  AND?: InputMaybe<Array<ChatWhereInput>>;
  NOT?: InputMaybe<Array<ChatWhereInput>>;
  OR?: InputMaybe<Array<ChatWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<UserChatListRelationFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
};

export type Checklist = {
  __typename?: 'Checklist';
  activeChecklists: Array<ActiveChecklist>;
  business: Array<Business>;
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  descriptionLocaled: Scalars['String'];
  groups: Array<Group>;
  id: Scalars['ID'];
  requiredBusiness: Scalars['Boolean'];
  roles: Array<CustomRole>;
  schemes: Array<Scheme>;
  sections: Array<ChecklistSection>;
  title: Scalars['String'];
  titleLocaled: Scalars['String'];
  titleTranslations: Array<Scalars['JSON']>;
  updatedAt: Scalars['Date'];
  users: Array<User>;
};


export type ChecklistActiveChecklistsArgs = {
  cursor?: InputMaybe<ActiveChecklistWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActiveChecklistScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActiveChecklistOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActiveChecklistWhereInput>;
};


export type ChecklistGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type ChecklistSchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};

export type ChecklistAnswer = {
  __typename?: 'ChecklistAnswer';
  additionalComments?: Maybe<Scalars['String']>;
  answer: Scalars['String'];
  answerTranslations: Array<Scalars['JSON']>;
  createdAt: Scalars['Date'];
  field: ActiveChecklistFields;
  fieldId: Scalars['String'];
  id: Scalars['ID'];
  images: Array<Scalars['String']>;
  type: AnswerType;
  updatedAt: Scalars['Date'];
};

export enum ChecklistAnswerType {
  GoodBad = 'GOOD_BAD',
  GoodBadNa = 'GOOD_BAD_NA',
  Media = 'MEDIA',
  PassFail = 'PASS_FAIL',
  PassFailNa = 'PASS_FAIL_NA',
  Text = 'TEXT',
  YesNo = 'YES_NO',
  YesNoNa = 'YES_NO_NA'
}

export type ChecklistCreateUpdateInput = {
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  groupsIds?: InputMaybe<Array<Scalars['String']>>;
  requiredBusiness?: InputMaybe<Scalars['Boolean']>;
  roleIds?: InputMaybe<Array<Scalars['String']>>;
  sections: Array<SectionInput>;
  title: Scalars['String'];
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type ChecklistDateRange = {
  dateRange: DateRangeInput;
};

export type ChecklistOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  descriptionTranslations?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  title?: InputMaybe<SortOrder>;
  titleTranslations?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ChecklistPerformance = {
  __typename?: 'ChecklistPerformance';
  completedAt: Scalars['Date'];
  id: Scalars['String'];
  name: Scalars['String'];
  percentAnswer: Scalars['Int'];
  percentComplete: Scalars['Int'];
  percentScore: Scalars['Int'];
  totalAnswers: Scalars['Int'];
  totalQuestions: Scalars['Int'];
  totalSections: Scalars['Int'];
};

export type ChecklistQuestion = {
  __typename?: 'ChecklistQuestion';
  brandIds: Array<Scalars['String']>;
  checklistSubsection?: Maybe<ChecklistSubsection>;
  checklistSubsectionId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  dependent?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  maxWeight: Scalars['Int'];
  order: Scalars['Int'];
  question: Scalars['JSON'];
  type: ChecklistAnswerType;
  updatedAt: Scalars['Date'];
  weight: Array<AnswerWeight>;
};


export type ChecklistQuestionWeightArgs = {
  distinct?: InputMaybe<Array<AnswerWeightScalarFieldEnum>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type ChecklistQuestionPerformance = {
  __typename?: 'ChecklistQuestionPerformance';
  id: Scalars['String'];
  name: Scalars['String'];
  percentAnswer: Scalars['Int'];
  questions: Array<RadialValueGraph>;
  totalAnswers: Scalars['Int'];
  totalFields: Scalars['Int'];
  totalQuestions: Scalars['Int'];
};

export type ChecklistScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ChecklistScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ChecklistScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ChecklistScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type ChecklistSection = {
  __typename?: 'ChecklistSection';
  checklist: Checklist;
  checklistId: Scalars['String'];
  createdAt: Scalars['Date'];
  dependsOnWeight?: Maybe<DependWeight>;
  id: Scalars['ID'];
  order: Scalars['Int'];
  subsections: Array<ChecklistSubsection>;
  title: Scalars['String'];
  titleTranslations: Array<Scalars['JSON']>;
  updatedAt: Scalars['Date'];
};

export enum ChecklistStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS'
}

export type ChecklistSubsection = {
  __typename?: 'ChecklistSubsection';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  order: Scalars['Int'];
  questions: Array<ChecklistQuestion>;
  section: ChecklistSection;
  sectionId: Scalars['String'];
  title: Scalars['String'];
  titleTranslations: Array<Scalars['JSON']>;
  updatedAt: Scalars['Date'];
};

export type ChecklistTableWhereInput = {
  brandsIds?: InputMaybe<Array<Scalars['String']>>;
  businessesIds?: InputMaybe<Array<Scalars['String']>>;
  dateRange?: InputMaybe<DateRangeInput>;
  industryIds?: InputMaybe<Array<Scalars['String']>>;
  percentComplete?: InputMaybe<ScoreRangeInput>;
  percentScore?: InputMaybe<ScoreRangeInput>;
  schemeIds: Array<Scalars['String']>;
  score?: InputMaybe<ScoreRangeInput>;
  search?: InputMaybe<Scalars['String']>;
};

export type ChecklistUpdateInput = {
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  groupsIds?: InputMaybe<Array<Scalars['String']>>;
  requiredBusiness?: InputMaybe<Scalars['Boolean']>;
  roleIds?: InputMaybe<Array<Scalars['String']>>;
  sections?: InputMaybe<Array<SectionInput>>;
  title?: InputMaybe<Scalars['String']>;
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type ChecklistWhereInput = {
  AND?: InputMaybe<Array<ChecklistWhereInput>>;
  NOT?: InputMaybe<Array<ChecklistWhereInput>>;
  OR?: InputMaybe<Array<ChecklistWhereInput>>;
  business?: InputMaybe<BusinessListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  roles?: InputMaybe<CustomRoleListRelationFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type ChecklistWhereUniqueInput = {
  AND?: InputMaybe<Array<ChecklistWhereInput>>;
  NOT?: InputMaybe<Array<ChecklistWhereInput>>;
  OR?: InputMaybe<Array<ChecklistWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CircleFilterInput = {
  /** Center latitude (-90 to 90) */
  latitude: Scalars['Float'];
  /** Center longitude (-180 to 180) */
  longitude: Scalars['Float'];
  /** Radius in meters (1 to 100000) */
  radiusMeters: Scalars['Float'];
};

export enum CityEnum {
  Aberdeen = 'aberdeen',
  Armagh = 'armagh',
  Ayr = 'ayr',
  Barnsley = 'barnsley',
  Barry = 'barry',
  Basingstoke = 'basingstoke',
  Bath = 'bath',
  Belfast = 'belfast',
  Birmingham = 'birmingham',
  Blackburn = 'blackburn',
  Blackpool = 'blackpool',
  Bolton = 'bolton',
  Bournemouth = 'bournemouth',
  Bradford = 'bradford',
  Brighton = 'brighton',
  Bristol = 'bristol',
  Cambridge = 'cambridge',
  Canterbury = 'canterbury',
  Cardiff = 'cardiff',
  Carlisle = 'carlisle',
  Chatham = 'chatham',
  Chelmsford = 'chelmsford',
  Cheltenham = 'cheltenham',
  Chester = 'chester',
  Colchester = 'colchester',
  Coventry = 'coventry',
  Crewe = 'crewe',
  Darlington = 'darlington',
  Derby = 'derby',
  Derry = 'derry',
  Doncaster = 'doncaster',
  Dumfries = 'dumfries',
  Dundee = 'dundee',
  Durham = 'durham',
  EastKilbride = 'east_kilbride',
  Eastbourne = 'eastbourne',
  Edinburgh = 'edinburgh',
  Exeter = 'exeter',
  Glasgow = 'glasgow',
  Gloucester = 'gloucester',
  Guildford = 'guildford',
  Harrogate = 'harrogate',
  Hartlepool = 'hartlepool',
  Hastings = 'hastings',
  Hereford = 'hereford',
  Huddersfield = 'huddersfield',
  Hull = 'hull',
  Inverness = 'inverness',
  Ipswich = 'ipswich',
  Kilmarnock = 'kilmarnock',
  Lancaster = 'lancaster',
  Leeds = 'leeds',
  Leicester = 'leicester',
  Lincoln = 'lincoln',
  Lisburn = 'lisburn',
  Liverpool = 'liverpool',
  Livingston = 'livingston',
  London = 'london',
  Luton = 'luton',
  Maidstone = 'maidstone',
  Manchester = 'manchester',
  Middlesbrough = 'middlesbrough',
  MiltonKeynes = 'milton_keynes',
  Newcastle = 'newcastle',
  Newport = 'newport',
  Newry = 'newry',
  Northampton = 'northampton',
  Norwich = 'norwich',
  Nottingham = 'nottingham',
  Oxford = 'oxford',
  Paisley = 'paisley',
  Perth = 'perth',
  Peterborough = 'peterborough',
  Plymouth = 'plymouth',
  Poole = 'poole',
  Portsmouth = 'portsmouth',
  Preston = 'preston',
  Reading = 'reading',
  Rotherham = 'rotherham',
  Scarborough = 'scarborough',
  Sheffield = 'sheffield',
  Shrewsbury = 'shrewsbury',
  Slough = 'slough',
  Southampton = 'southampton',
  Stirling = 'stirling',
  Stoke = 'stoke',
  Sunderland = 'sunderland',
  Swansea = 'swansea',
  Swindon = 'swindon',
  Taunton = 'taunton',
  Telford = 'telford',
  Torquay = 'torquay',
  Wakefield = 'wakefield',
  Warrington = 'warrington',
  Watford = 'watford',
  Wigan = 'wigan',
  Wolverhampton = 'wolverhampton',
  Worcester = 'worcester',
  Worthing = 'worthing',
  Wrexham = 'wrexham',
  York = 'york'
}

export type CompassMatch = {
  __typename?: 'CompassMatch';
  aiSuggestions: Array<AiSuggestion>;
  behavioralScore: Scalars['Float'];
  confidence: CompassMatchConfidence;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  matchedOffender: Offender;
  nameScore: Scalars['Float'];
  reasons: Array<Scalars['String']>;
  searchedOffender: Offender;
  spatialScore: Scalars['Float'];
  temporalScore: Scalars['Float'];
  totalScore: Scalars['Float'];
  updatedAt: Scalars['Date'];
};

export enum CompassMatchConfidence {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type CompassMatchListRelationFilter = {
  every?: InputMaybe<CompassMatchWhereInput>;
  none?: InputMaybe<CompassMatchWhereInput>;
  some?: InputMaybe<CompassMatchWhereInput>;
};

export type CompassMatchOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CompassMatchOrderByWithRelationInput = {
  behavioralScore?: InputMaybe<SortOrder>;
  confidence?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  matchedOffender?: InputMaybe<OffenderOrderByWithRelationInput>;
  matchedOffenderId?: InputMaybe<SortOrder>;
  nameScore?: InputMaybe<SortOrder>;
  searchedOffender?: InputMaybe<OffenderOrderByWithRelationInput>;
  searchedOffenderId?: InputMaybe<SortOrder>;
  spatialScore?: InputMaybe<SortOrder>;
  temporalScore?: InputMaybe<SortOrder>;
  totalScore?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CompassMatchWhereInput = {
  AND?: InputMaybe<Array<CompassMatchWhereInput>>;
  NOT?: InputMaybe<Array<CompassMatchWhereInput>>;
  OR?: InputMaybe<Array<CompassMatchWhereInput>>;
  behavioralScore?: InputMaybe<FloatFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  matchedOffender?: InputMaybe<OffenderWhereInput>;
  matchedOffenderId?: InputMaybe<StringFilter>;
  nameScore?: InputMaybe<FloatFilter>;
  searchedOffender?: InputMaybe<OffenderWhereInput>;
  searchedOffenderId?: InputMaybe<StringFilter>;
  spatialScore?: InputMaybe<FloatFilter>;
  temporalScore?: InputMaybe<FloatFilter>;
  totalScore?: InputMaybe<FloatFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CompassMatchWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type CompleteActiveChecklistInput = {
  additionalInfo?: InputMaybe<Scalars['String']>;
  answers: Array<ActiveChecklistAnswerInput>;
  businessId?: InputMaybe<Scalars['String']>;
  draft: Scalars['Boolean'];
  max?: InputMaybe<Scalars['Int']>;
  signature?: InputMaybe<Scalars['String']>;
  total?: InputMaybe<Scalars['Int']>;
};

export type CompleteAudioResult = {
  __typename?: 'CompleteAudioResult';
  extractedData: ExtractedIncidentData;
  finalTranscript: Scalars['String'];
  isReadyForSubmission: Scalars['Boolean'];
};

export enum CompleteStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS'
}

export type ConnectArrayHelper = {
  connect: Array<UniqueId>;
  disconnect?: InputMaybe<Array<UniqueId>>;
};

export type ConnectHelper = {
  connect: UniqueId;
};

export type ConnectIdDisconnectBool = {
  connect?: InputMaybe<UniqueId>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type ConnectImageToIncident = {
  id: Scalars['String'];
  offenders?: InputMaybe<Array<IncidentOffenderWhereInput>>;
};

export type ConnectOffendersToInvestigationInput = {
  connectCrimeGroups?: InputMaybe<Scalars['Boolean']>;
  connectIncidents?: InputMaybe<Scalars['Boolean']>;
  connectVehicles?: InputMaybe<Scalars['Boolean']>;
  investigationId: Scalars['String'];
  offenderIds: Array<Scalars['String']>;
};

export type ConnectOnlyArrayHelper = {
  connect: Array<UniqueId>;
};

export type ConnectRemove = {
  connect: Array<Scalars['String']>;
  remove: Array<Scalars['String']>;
};

export type ConnectSetHelper = {
  connect?: InputMaybe<Array<UniqueId>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
  set?: InputMaybe<Array<UniqueId>>;
};

export enum ConnectionStrength {
  Medium = 'MEDIUM',
  Strong = 'STRONG',
  Weak = 'WEAK'
}

export type Contact = {
  __typename?: 'Contact';
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  dobPlace?: Maybe<Scalars['String']>;
  formerName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['String']>;
  homeTel?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mg11: Array<Mg11>;
  mobileTel?: Maybe<Scalars['String']>;
  occupation?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  prefContact?: Maybe<Scalars['String']>;
  schemes: Array<Scheme>;
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
  workTel?: Maybe<Scalars['String']>;
};


export type ContactMg11Args = {
  cursor?: InputMaybe<Mg11WhereUniqueInput>;
  distinct?: InputMaybe<Array<Mg11ScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<Mg11OrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mg11WhereInput>;
};


export type ContactSchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};

export type ContactListRelationFilter = {
  every?: InputMaybe<ContactWhereInput>;
  none?: InputMaybe<ContactWhereInput>;
  some?: InputMaybe<ContactWhereInput>;
};

export type ContactOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ContactOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mg11?: InputMaybe<Mg11OrderByRelationAggregateInput>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
};

export enum ContactScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type ContactScalarWhereInput = {
  AND?: InputMaybe<Array<ContactScalarWhereInput>>;
  NOT?: InputMaybe<Array<ContactScalarWhereInput>>;
  OR?: InputMaybe<Array<ContactScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ContactScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ContactScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ContactScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ContactScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type ContactWhereInput = {
  AND?: InputMaybe<Array<ContactWhereInput>>;
  NOT?: InputMaybe<Array<ContactWhereInput>>;
  OR?: InputMaybe<Array<ContactWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  mg11?: InputMaybe<Mg11ListRelationFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type ContactWhereUniqueInput = {
  AND?: InputMaybe<Array<ContactWhereInput>>;
  NOT?: InputMaybe<Array<ContactWhereInput>>;
  OR?: InputMaybe<Array<ContactWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  mg11?: InputMaybe<Mg11ListRelationFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type CoordinatesInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type CopyEvidenceInput = {
  crimeGroupId?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  investigationId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  thumbnailUrl?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type Count = {
  __typename?: 'Count';
  count: Array<Scalars['Int']>;
  name: Scalars['String'];
};

export type CreateActionEvidence = {
  id: Scalars['String'];
  type: ActionType;
};

export type CreateActiveChecklistInput = {
  businessId?: InputMaybe<Scalars['String']>;
  checklistId: Scalars['String'];
  title: Scalars['String'];
};

export type CreateArticleImages = {
  disconnect?: InputMaybe<Array<UniqueId>>;
  optimistic?: InputMaybe<Array<CreateImageOptimistic>>;
  upload?: InputMaybe<Array<UploadArticleImage>>;
};

export type CreateArticleInput = {
  business?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  criticalExpiry?: InputMaybe<Scalars['DateTime']>;
  documents?: InputMaybe<Array<CreateDocument>>;
  draft?: InputMaybe<Scalars['Boolean']>;
  groups: Array<Scalars['String']>;
  htmlBody: Scalars['String'];
  image?: InputMaybe<CreateArticlePreviewImage>;
  images?: InputMaybe<CreateArticleImages>;
  incidents?: InputMaybe<Array<Scalars['String']>>;
  offenders?: InputMaybe<Array<Scalars['String']>>;
  previewImage?: InputMaybe<Scalars['String']>;
  previewText?: InputMaybe<Scalars['String']>;
  priority: ArticlePriority;
  roleIds?: InputMaybe<Array<Scalars['String']>>;
  schemes: Array<Scalars['String']>;
  title: Scalars['String'];
  watermarkImage?: InputMaybe<Scalars['Boolean']>;
};

export type CreateArticlePreviewImage = {
  disconnect?: InputMaybe<UniqueId>;
  optimistic?: InputMaybe<CreateImageOptimistic>;
  upload?: InputMaybe<UploadArticleImage>;
};

export type CreateBanOnOffender = {
  createdBy: ConnectHelper;
  description?: InputMaybe<Scalars['String']>;
  endDate: Scalars['Date'];
  fineValue?: InputMaybe<Scalars['Float']>;
  location: Scalars['String'];
  months?: InputMaybe<Scalars['Int']>;
  scheme: ConnectHelper;
  startDate: Scalars['Date'];
  type?: InputMaybe<BanType>;
};

export type CreateBusinessDataInput = {
  customGalleries?: InputMaybe<CustomGalleryCreateNestedManyWithoutOffender>;
  groups?: InputMaybe<Array<UniqueId>>;
  location?: InputMaybe<SimpleLocation>;
  name: Scalars['String'];
  parent?: InputMaybe<BusinessParentInput>;
  publicName: Scalars['Boolean'];
  schemes: ConnectArrayHelper;
  siteNumber?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<TagsOnBusiness>;
};

export type CreateBusinessOnUserDataInput = {
  groups?: InputMaybe<ConnectArrayHelper>;
  locations?: InputMaybe<CreateSimpleLocationEnvelope>;
  name: Scalars['String'];
  parent?: InputMaybe<BusinessParentInput>;
  publicName: Scalars['Boolean'];
  schemes: ConnectArrayHelper;
  tags?: InputMaybe<NullableConnectArrayHelper>;
};

export type CreateBusinessQuestionInput = {
  actions?: InputMaybe<Array<Scalars['JSON']>>;
  dependentBrands?: InputMaybe<Array<Scalars['String']>>;
  dependentQuestions?: InputMaybe<Array<Scalars['JSON']>>;
  dependentTags?: InputMaybe<Array<Scalars['String']>>;
  failureAnswer?: InputMaybe<Scalars['String']>;
  failureMessage?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<Scalars['Int']>;
  questionId: Scalars['String'];
  req?: InputMaybe<Scalars['Boolean']>;
  roleIds?: InputMaybe<Array<Scalars['String']>>;
  schemeId: Scalars['String'];
  tooltip?: InputMaybe<Scalars['String']>;
};

export type CreateCollectionInput = {
  name: Scalars['String'];
  schemes?: InputMaybe<Array<UniqueId>>;
};

export type CreateCommentData = {
  incident?: InputMaybe<IncidentConnectOne>;
  offender?: InputMaybe<OffenderConnectOne>;
  text: Scalars['String'];
};

export type CreateCrimeGroupDataInput = {
  alias?: InputMaybe<Scalars['String']>;
  investigations?: InputMaybe<ConnectOnlyArrayHelper>;
  offenders?: InputMaybe<ConnectOnlyArrayHelper>;
  schemes: ConnectOnlyArrayHelper;
  vehicles?: InputMaybe<ConnectOnlyArrayHelper>;
};

export type CreateCrimeGroupOffenders = {
  connect?: InputMaybe<Array<UniqueId>>;
  create?: InputMaybe<Array<OffenderCreateWithoutCrimeGroupsInput>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
};

export type CreateCrimeGroupVehicles = {
  connect?: InputMaybe<Array<UniqueId>>;
  create?: InputMaybe<Array<VehicleCreateWithoutCrimeGroupInput>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
};

export type CreateCustomGalleryInput = {
  createdBy?: InputMaybe<Array<UniqueId>>;
  crimeGroups?: InputMaybe<Array<UniqueId>>;
  description?: InputMaybe<Scalars['String']>;
  groups: ConnectOnlyArrayHelper;
  name: Scalars['String'];
  offenders?: InputMaybe<Array<UniqueId>>;
  schemes: ConnectHelper;
  vehicles?: InputMaybe<Array<UniqueId>>;
};

export type CreateCustomGalleryOnOffenderInput = {
  crimeGroups?: InputMaybe<ConnectOnlyArrayHelper>;
  description?: InputMaybe<Scalars['String']>;
  groups: ConnectOnlyArrayHelper;
  name: Scalars['String'];
  offenders?: InputMaybe<ConnectOnlyArrayHelper>;
  schemes: ConnectOnlyArrayHelper;
  vehicles?: InputMaybe<ConnectOnlyArrayHelper>;
};

export type CreateDocument = {
  crimeGroupId?: InputMaybe<Scalars['String']>;
  fileType: Scalars['String'];
  folderId?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  investigationId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  newFolder?: InputMaybe<UpsertFolder>;
  newTags?: InputMaybe<Array<SimpleTagCreate>>;
  offenderId?: InputMaybe<Scalars['String']>;
  origFileName: Scalars['String'];
  schemeId?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  thumbnailUrl?: InputMaybe<Scalars['String']>;
  todoId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<DocumentType>;
  url: Scalars['String'];
  vehicleId?: InputMaybe<Scalars['String']>;
};

export type CreateDocuments = {
  crimeGroupId?: InputMaybe<Scalars['String']>;
  documents?: InputMaybe<Array<CreateListDocument>>;
  folderId?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  investigationId?: InputMaybe<Scalars['String']>;
  newFolder?: InputMaybe<UpsertFolder>;
  newTags?: InputMaybe<Array<SimpleTagCreate>>;
  offenderId?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  todoId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<DocumentType>;
  vehicleId?: InputMaybe<Scalars['String']>;
};

export type CreateEventInput = {
  auth0Id: Scalars['String'];
  geoIp?: InputMaybe<GeoIpInput>;
  ip: Scalars['String'];
};

export type CreateFlowInput = {
  description?: InputMaybe<Scalars['String']>;
  investigationId: Scalars['String'];
  name: Scalars['String'];
};

export type CreateGeographicalAreaInput = {
  /** Define a circular area */
  circle?: InputMaybe<CircleFilterInput>;
  /** Hex color for map display (e.g., "#FF5733") */
  color?: InputMaybe<Scalars['String']>;
  /** Optional description */
  description?: InputMaybe<Scalars['String']>;
  /** Name for this geographical area */
  name: Scalars['String'];
  /** Define a polygon area */
  polygon?: InputMaybe<PolygonFilterInput>;
  /** Police hub scheme ID this area belongs to */
  schemeId: Scalars['String'];
};

export type CreateGoodsTypeDataInput = {
  name: Scalars['String'];
  schemeIds: Array<Scalars['String']>;
};

export type CreateImageOptimistic = {
  uri: Scalars['String'];
};

export type CreateIncidentCctvRecord = {
  aheadBehind?: InputMaybe<Scalars['String']>;
  cameraNumber: Scalars['String'];
  correctTime?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  endTime: Scalars['Date'];
  incorrectBy?: InputMaybe<Scalars['Int']>;
  showFace: Scalars['Boolean'];
  showIncident: Scalars['Boolean'];
  startTime: Scalars['Date'];
};

export type CreateIncidentCctvRecords = {
  create?: InputMaybe<Array<CreateIncidentCctvRecord>>;
};

export type CreateIncidentCrimeGroups = {
  connect?: InputMaybe<Array<UniqueId>>;
};

export type CreateIncidentData = {
  activityAuthorised?: InputMaybe<Scalars['Boolean']>;
  answers?: InputMaybe<Array<AnswersInput>>;
  business?: InputMaybe<UniqueId>;
  cctvRecords?: InputMaybe<CreateIncidentCctvRecords>;
  crimeGroups: CreateIncidentCrimeGroups;
  crimeTypes?: InputMaybe<Array<UniqueId>>;
  date: Scalars['Date'];
  dayOrNight?: InputMaybe<Scalars['Boolean']>;
  description: Scalars['String'];
  documents?: InputMaybe<Array<CreateDocument>>;
  draft?: InputMaybe<Scalars['Boolean']>;
  groups: Array<UniqueId>;
  images: CreateIncidentImages;
  investigationId?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<CreateIncidentItemInput>>;
  location?: InputMaybe<CreateIncidentLocation>;
  offenders: CreateIncidentOffenders;
  policeAdditionalEvidence?: InputMaybe<Scalars['String']>;
  policeCCTVEmail?: InputMaybe<Scalars['String']>;
  policeCCTVReviewed?: InputMaybe<Scalars['Boolean']>;
  policeDay?: InputMaybe<Scalars['Boolean']>;
  policeDepartment?: InputMaybe<Scalars['String']>;
  policeDistanceFromIncident?: InputMaybe<Scalars['String']>;
  policeIncidentDuration?: InputMaybe<Scalars['String']>;
  policeInside?: InputMaybe<Scalars['Boolean']>;
  policeInvolved?: InputMaybe<Scalars['Boolean']>;
  policeItemsLocation?: InputMaybe<Array<Scalars['String']>>;
  policeItemsMO?: InputMaybe<Array<Scalars['String']>>;
  policeKnownBefore?: InputMaybe<Scalars['Boolean']>;
  policeMG11?: InputMaybe<Scalars['Boolean']>;
  policeNo?: InputMaybe<Scalars['String']>;
  policeObstructions?: InputMaybe<Scalars['String']>;
  policeObstructionsDetails?: InputMaybe<Scalars['String']>;
  policeOfficerName?: InputMaybe<Scalars['String']>;
  policeReasonRemember?: InputMaybe<Scalars['String']>;
  policeRef?: InputMaybe<Scalars['String']>;
  policeReported?: InputMaybe<Scalars['Boolean']>;
  policeResponse?: InputMaybe<PoliceResponseTime>;
  policeSign?: InputMaybe<Scalars['String']>;
  policeStatement?: InputMaybe<Scalars['String']>;
  policeTimePassed?: InputMaybe<Scalars['String']>;
  policeWillingCourt?: InputMaybe<Scalars['Boolean']>;
  policeWitnessAddress?: InputMaybe<Scalars['String']>;
  policeWitnessAtTime?: InputMaybe<Scalars['Boolean']>;
  policeWitnessEmail?: InputMaybe<Scalars['String']>;
  policeWitnessEthnicity?: InputMaybe<Scalars['String']>;
  policeWitnessGender?: InputMaybe<Scalars['String']>;
  policeWitnessLength?: InputMaybe<Scalars['String']>;
  policeWitnessMobileNo?: InputMaybe<Scalars['String']>;
  policeWitnessName?: InputMaybe<Scalars['String']>;
  policeWitnessPlaceOfBirth?: InputMaybe<Scalars['String']>;
  policeWitnessPostcode?: InputMaybe<Scalars['String']>;
  policeWitnessWorkNo?: InputMaybe<Scalars['String']>;
  recoveredValue?: InputMaybe<Scalars['Float']>;
  scheme: Scalars['String'];
  sessionId?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['Date'];
  value?: InputMaybe<Scalars['Float']>;
  vehicles: CreateIncidentVehicles;
  victims?: InputMaybe<CreateIncidentVictims>;
  witnesses?: InputMaybe<CreateIncidentWitnesses>;
};

export type CreateIncidentImages = {
  connect?: InputMaybe<Array<ConnectImageToIncident>>;
  create?: InputMaybe<Array<UploadIncidentImage>>;
  optimistic?: InputMaybe<Array<CreateImageOptimistic>>;
};

export type CreateIncidentItemInput = {
  damagedQuantity?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  goodsType?: InputMaybe<UniqueId>;
  name?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  recoveredQuantity?: InputMaybe<Scalars['Int']>;
  recoveredValue?: InputMaybe<Scalars['Float']>;
  sku?: InputMaybe<Scalars['String']>;
  stockItem?: InputMaybe<UniqueId>;
  value?: InputMaybe<Scalars['Float']>;
};

export type CreateIncidentLocation = {
  account?: InputMaybe<Scalars['Boolean']>;
  create?: InputMaybe<SimpleLocation>;
  previous?: InputMaybe<UniqueId>;
};

export type CreateIncidentOffender = {
  address?: InputMaybe<CreateIncidentOffenderAddress>;
  age?: InputMaybe<Age>;
  alias?: InputMaybe<SetStringArrayHelper>;
  build?: InputMaybe<Build>;
  comment?: InputMaybe<Scalars['String']>;
  createdBy: ConnectHelper;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<ConnectOnlyArrayHelper>;
  hair?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Height>;
  idSource?: InputMaybe<IdSource>;
  idVerified?: InputMaybe<Scalars['Boolean']>;
  images?: InputMaybe<IncidentOffenderImages>;
  infoSource?: InputMaybe<Scalars['String']>;
  justification?: InputMaybe<Scalars['String']>;
  knownFor?: InputMaybe<SetStringArrayHelper>;
  localId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  origOffenderId?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  scheme: ConnectHelper;
  targetedGoods?: InputMaybe<SetStringArrayHelper>;
  wanted?: InputMaybe<Scalars['Boolean']>;
};

export type CreateIncidentOffenderAddress = {
  alias?: InputMaybe<Scalars['String']>;
  building?: InputMaybe<Scalars['String']>;
  county?: InputMaybe<Scalars['String']>;
  postcode: Scalars['String'];
  street: Scalars['String'];
  townCity: Scalars['String'];
};

export type CreateIncidentOffenders = {
  connect?: InputMaybe<Array<UniqueId>>;
  create?: InputMaybe<Array<CreateIncidentOffender>>;
  update?: InputMaybe<Array<CreateIncidentUpdateOffenders>>;
};

export type CreateIncidentUpdateOffenders = {
  data?: InputMaybe<OffenderUpdateWithoutIncidents>;
  where?: InputMaybe<IncidentOffenderWhereInput>;
};

export type CreateIncidentUpdateVehicles = {
  data?: InputMaybe<VehicleUpdateWithoutIncidentInput>;
  where?: InputMaybe<UniqueId>;
};

export type CreateIncidentVehicles = {
  connect?: InputMaybe<Array<UniqueId>>;
  create?: InputMaybe<Array<VehicleCreateWithoutIncidentsInput>>;
  update?: InputMaybe<Array<CreateIncidentUpdateVehicles>>;
};

export type CreateIncidentVictim = {
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
};

export type CreateIncidentVictims = {
  create?: InputMaybe<Array<CreateIncidentVictim>>;
};

export type CreateIncidentWitness = {
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
};

export type CreateIncidentWitnesses = {
  create?: InputMaybe<Array<CreateIncidentWitness>>;
};

export type CreateInvestigationInput = {
  crimeGroupId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  incidentId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  offenderId?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<InvestigationPriority>;
  schemeId: Scalars['String'];
  status?: InputMaybe<InvestigationStatus>;
  type?: InputMaybe<InvestigationType>;
  vehicleId?: InputMaybe<Scalars['String']>;
};

export type CreateListDocument = {
  fileType: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  origFileName: Scalars['String'];
  thumbnailUrl?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type CreateOffenderCrimeGroups = {
  connect?: InputMaybe<Array<UniqueId>>;
};

export type CreateOffenderData = {
  address?: InputMaybe<SimpleLocation>;
  age?: InputMaybe<Age>;
  alias?: InputMaybe<Array<Scalars['String']>>;
  bans?: InputMaybe<Array<CreateBanOnOffender>>;
  build?: InputMaybe<Build>;
  comment?: InputMaybe<Scalars['String']>;
  crimeGroups?: InputMaybe<CreateOffenderCrimeGroups>;
  customGalleries?: InputMaybe<CustomGalleryCreateNestedManyWithoutOffender>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  dateSource?: InputMaybe<Scalars['String']>;
  documents?: InputMaybe<Array<CreateDocument>>;
  draft?: InputMaybe<Scalars['Boolean']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<ConnectOnlyArrayHelper>;
  hair?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Height>;
  idSource?: InputMaybe<IdSource>;
  idVerified?: InputMaybe<Scalars['Boolean']>;
  image?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  images?: InputMaybe<Array<UploadOffenderImage>>;
  incidentId?: InputMaybe<Scalars['String']>;
  infoSource?: InputMaybe<Scalars['String']>;
  investigationId?: InputMaybe<Scalars['String']>;
  justification?: InputMaybe<Scalars['String']>;
  knownFor?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  origOffenderId?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  scheme: Scalars['String'];
  sessionId?: InputMaybe<Scalars['String']>;
  sourceDetails?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<TagCreateNestedManyWithoutOffenders>;
  targetedGoods?: InputMaybe<Array<Scalars['String']>>;
  vehicles?: InputMaybe<CreateOffenderVehicles>;
  wanted?: InputMaybe<Scalars['Boolean']>;
};

export type CreateOffenderUpdateVehicles = {
  data?: InputMaybe<VehicleUpdateWithoutOffenderInput>;
  where?: InputMaybe<UniqueId>;
};

export type CreateOffenderVehicles = {
  connect?: InputMaybe<Array<UniqueId>>;
  create?: InputMaybe<Array<VehicleCreateWithoutOffenderInput>>;
  update?: InputMaybe<Array<CreateOffenderUpdateVehicles>>;
};

export type CreateQuestionInput = {
  brands?: InputMaybe<Array<Scalars['String']>>;
  dependentAnswer?: InputMaybe<Scalars['String']>;
  dependentMatchMode?: InputMaybe<AnyAll>;
  dependentOnQId?: InputMaybe<Scalars['String']>;
  dependentOnTagQId?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<QuestionModel>;
  options?: InputMaybe<Array<Scalars['String']>>;
  question: Scalars['String'];
  required?: Scalars['Boolean'];
  roles?: InputMaybe<Array<Scalars['String']>>;
  tagId?: InputMaybe<Scalars['String']>;
  taskId?: InputMaybe<Scalars['String']>;
  tooltip?: InputMaybe<Scalars['String']>;
  type: AnswerType;
};

export type CreateSessionInput = {
  app: AppType;
  locationLat?: InputMaybe<Scalars['Float']>;
  locationLng?: InputMaybe<Scalars['Float']>;
  scheme?: InputMaybe<UniqueId>;
  user: UniqueId;
};

export type CreateSimpleLocationEnvelope = {
  create?: InputMaybe<Array<SimpleLocation>>;
};

export type CreateStockRemovalItemInput = {
  itemId: Scalars['String'];
  pickLocation?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Int'];
};

export type CreateStockRemovalRequestApproverInput = {
  approverId: Scalars['String'];
  stockRemovalRequestId: Scalars['String'];
};

export type CreateStockRemovalRequestInput = {
  approverIds: Array<Scalars['String']>;
  businessId?: InputMaybe<Scalars['String']>;
  costCentreCode?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  destination?: InputMaybe<StockRemovalRquestDestination>;
  fascia?: InputMaybe<Scalars['String']>;
  items: Array<CreateStockRemovalItemInput>;
  nominalCode?: InputMaybe<Scalars['String']>;
  personalityInfluences?: InputMaybe<Scalars['String']>;
  pickerId?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<StockRemovalPriority>;
  reason?: InputMaybe<Scalars['String']>;
  reasonForNonReturn?: InputMaybe<Scalars['String']>;
  rechargeBrand?: InputMaybe<Scalars['String']>;
  rechargeReference?: InputMaybe<Scalars['String']>;
  recipientEmail?: InputMaybe<Scalars['String']>;
  recipientName?: InputMaybe<Scalars['String']>;
  recipientPhone?: InputMaybe<Scalars['String']>;
  returnDate?: InputMaybe<Scalars['DateTime']>;
  schemeId: Scalars['String'];
  shippingAddressLine1?: InputMaybe<Scalars['String']>;
  shippingAddressLine2?: InputMaybe<Scalars['String']>;
  shippingCity?: InputMaybe<Scalars['String']>;
  shippingCountry?: InputMaybe<Scalars['String']>;
  shippingCounty?: InputMaybe<Scalars['String']>;
  shippingPostcode?: InputMaybe<Scalars['String']>;
  smqAccountNumber?: InputMaybe<Scalars['String']>;
  socialHandles?: InputMaybe<Scalars['String']>;
  storeOrDC?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  willStockBeReturned?: InputMaybe<Scalars['String']>;
};

export type CreateStockRemovalReturnInput = {
  businessId?: InputMaybe<Scalars['String']>;
  costCentreCode?: InputMaybe<Scalars['String']>;
  dateofReturn?: InputMaybe<Scalars['DateTime']>;
  imageIds?: InputMaybe<Array<Scalars['String']>>;
  images?: InputMaybe<Array<StockRemovalReturnImageInput>>;
  items: Array<CreateStockRemovalReturnItemInput>;
  originalAlertId?: InputMaybe<Scalars['String']>;
  rechargeBrand?: InputMaybe<Scalars['String']>;
  rechargeReference?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  storeOrDC: Scalars['String'];
  tracking?: InputMaybe<Scalars['String']>;
};

export type CreateStockRemovalReturnItemInput = {
  damaged?: InputMaybe<Scalars['Boolean']>;
  itemId: Scalars['String'];
  quantity: Scalars['Int'];
};

export type CreateTermsInput = {
  content: Scalars['String'];
  schemeId: Scalars['String'];
};

export type CreateTrainingVideoInput = {
  description?: InputMaybe<Scalars['String']>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  loginPrompt?: InputMaybe<Scalars['Boolean']>;
  mandatory?: InputMaybe<Scalars['Boolean']>;
  schemeId: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
  videoUrl: Scalars['String'];
};

export type CreateUpdateData = {
  icon: UpdateIcon;
  images?: InputMaybe<Array<UrlImage>>;
  linkedArticles?: InputMaybe<Array<UniqueId>>;
  linkedCrimeGroups?: InputMaybe<Array<UniqueId>>;
  linkedIncidents?: InputMaybe<Array<UniqueId>>;
  linkedOffenders?: InputMaybe<Array<UniqueId>>;
  linkedVehicles?: InputMaybe<Array<UniqueId>>;
  mentionedUsers?: InputMaybe<Array<UniqueId>>;
  optimisticImages?: InputMaybe<Array<CreateImageOptimistic>>;
  replyTo?: InputMaybe<UniqueId>;
  text?: InputMaybe<Scalars['String']>;
  type: UpdateType;
};

export type CreateUserData = {
  approverGroups?: InputMaybe<Array<UniqueId>>;
  bulletinEmails?: InputMaybe<Scalars['Boolean']>;
  bulletinPush?: InputMaybe<Scalars['Boolean']>;
  businesses: BusinessCreateNestedManyWithoutUsersInput;
  chats?: InputMaybe<Array<UniqueId>>;
  defaultGroups?: InputMaybe<Array<UniqueId>>;
  email?: InputMaybe<Scalars['String']>;
  forcePasswordReset?: InputMaybe<Scalars['Boolean']>;
  fullName: Scalars['String'];
  groups: Array<UniqueId>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  mobileNumber?: InputMaybe<Scalars['String']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  organisation?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  publicName: Scalars['Boolean'];
  reportToAllBusinesses?: InputMaybe<Scalars['Boolean']>;
  role: Role;
  roleId: Scalars['String'];
  scheme: UniqueId;
  subscribedIncidentOnly?: InputMaybe<Scalars['Boolean']>;
  subscribedOffenderOnly?: InputMaybe<Scalars['Boolean']>;
};

export type CreateVehicleDataInput = {
  colour?: InputMaybe<Scalars['String']>;
  crimeGroup?: InputMaybe<Array<UniqueId>>;
  customGalleries?: InputMaybe<CustomGalleryCreateNestedManyWithoutOffender>;
  documents?: InputMaybe<Array<CreateDocument>>;
  groups?: InputMaybe<Array<UniqueId>>;
  image?: InputMaybe<ImageCreateNestedManyWithoutVehiclesInput>;
  images?: InputMaybe<Array<UploadVehicleImage>>;
  incidents?: InputMaybe<Array<UniqueId>>;
  investigationId?: InputMaybe<Scalars['String']>;
  make?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  offenders?: InputMaybe<Array<UniqueId>>;
  registration?: InputMaybe<Scalars['String']>;
  schemes: Scalars['String'];
};

export type CreateVehicleWithoutOffenderDataInput = {
  colour?: InputMaybe<Scalars['String']>;
  crimeGroup?: InputMaybe<NullableConnectArrayHelper>;
  customGalleries?: InputMaybe<CustomGalleryCreateNestedManyWithoutOffender>;
  documents?: InputMaybe<Array<CreateDocument>>;
  groups?: InputMaybe<Array<UniqueId>>;
  image?: InputMaybe<ImageCreateNestedManyWithoutVehiclesInput>;
  images?: InputMaybe<Array<UploadVehicleImage>>;
  incidents?: InputMaybe<NullableConnectArrayHelper>;
  investigationId?: InputMaybe<Scalars['String']>;
  make?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  registration?: InputMaybe<Scalars['String']>;
  schemes?: InputMaybe<Scalars['String']>;
};

export type CreatedDataCounts = {
  __typename?: 'CreatedDataCounts';
  bulletins: Scalars['Int'];
  crimeGroups: Scalars['Int'];
  incidents: Scalars['Int'];
  messages: Scalars['Int'];
  offenders: Scalars['Int'];
  updates: Scalars['Int'];
  vehicles: Scalars['Int'];
};

export type CreationBreakdown = {
  __typename?: 'CreationBreakdown';
  data: Array<Count>;
  scale: Array<Scalars['String']>;
};

export type CrimeGroup = {
  __typename?: 'CrimeGroup';
  activities: Array<Todo>;
  aiActivityPatterns?: Maybe<Scalars['String']>;
  aiActivityTrends?: Maybe<AiActivityTrends>;
  aiGroupSophistication?: Maybe<AiGroupSophistication>;
  aiImpactScore?: Maybe<Scalars['Int']>;
  aiImprovements?: Maybe<Scalars['String']>;
  aiKeyObservations: Array<Scalars['String']>;
  aiMemberRiskAggregation?: Maybe<AiMemberRiskAggregation>;
  aiOrganizationStructure?: Maybe<Scalars['String']>;
  aiQualityScore?: Maybe<Scalars['Int']>;
  aiSophisticationLevel?: Maybe<Scalars['String']>;
  aiSummary?: Maybe<Scalars['String']>;
  alias?: Maybe<Scalars['String']>;
  evidence: Array<Document>;
  groups: Array<Group>;
  id: Scalars['ID'];
  incidents: Array<Incident>;
  investigations: Array<Investigation>;
  latestUpdate?: Maybe<Update>;
  /** Analytics for offenders in this crime group with tier classifications and scoring metrics */
  offenderAnalytics: Array<CrimeGroupOffenderAnalytics>;
  offenders: Array<Offender>;
  ref: Scalars['String'];
  reference?: Maybe<Scalars['Int']>;
  subscribed: Scalars['Boolean'];
  subscribedUsers: Array<User>;
  suggestedMembers: Array<Offender>;
  totalIncidents: Scalars['Int'];
  totalOffenders: Scalars['Int'];
  totalRecoveredValue: Scalars['Float'];
  totalTheftSuccess: Scalars['Float'];
  totalUpdates: Scalars['Int'];
  totalValue: Scalars['Float'];
  updatedAt: Scalars['Date'];
  updates: Array<Update>;
  vehicles: Array<Vehicle>;
};


export type CrimeGroupEvidenceArgs = {
  cursor?: InputMaybe<DocumentWhereUniqueInput>;
  distinct?: InputMaybe<Array<DocumentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DocumentWhereInput>;
};


export type CrimeGroupGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type CrimeGroupIncidentsArgs = {
  orderBy?: InputMaybe<IncidentOrderByWithRelationInput>;
  take?: InputMaybe<Scalars['Int']>;
};


export type CrimeGroupInvestigationsArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<Array<InvestigationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InvestigationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type CrimeGroupOffenderAnalyticsArgs = {
  mode: CrimeGroupAnalyticsMode;
};


export type CrimeGroupOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type CrimeGroupSubscribedUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type CrimeGroupUpdatesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type CrimeGroupVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<Array<VehicleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VehicleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
};

export enum CrimeGroupAnalyticsMode {
  Impact = 'IMPACT',
  LinkAnalysis = 'LINK_ANALYSIS'
}

export type CrimeGroupListRelationFilter = {
  every?: InputMaybe<CrimeGroupWhereInput>;
  none?: InputMaybe<CrimeGroupWhereInput>;
  some?: InputMaybe<CrimeGroupWhereInput>;
};

export type CrimeGroupMap = {
  __typename?: 'CrimeGroupMap';
  incidentsCoords?: Maybe<Array<HeatMapLatLng>>;
  offenderMarkers?: Maybe<Array<MapMarker>>;
};

export type CrimeGroupNestedCreateOnIncident = {
  offenders?: InputMaybe<ConnectOnlyArrayHelper>;
};

export type CrimeGroupOffenderAnalytics = {
  __typename?: 'CrimeGroupOffenderAnalytics';
  /** Total number of crime group incidents this offender is involved in */
  crimeGroupIncidentCount: Scalars['Int'];
  /** Total value of stolen items across all incidents */
  crimeGroupTotalValue: Scalars['Float'];
  /** Number of crime group incidents this offender is linked to */
  impactIncidentScore: Scalars['Int'];
  /** Total impact score. Formula: incidentScore + valueScore */
  impactTotalScore: Scalars['Float'];
  /** Value score based on total stolen value. Formula: totalValueCount / 1000 */
  impactValueScore: Scalars['Float'];
  /** Cluster score combining shared incidents and unique connections. Formula: totalSharedIncidents + (uniqueConnections × 2) */
  linkClusterScore: Scalars['Int'];
  /** Map of offender IDs to shared incident counts. Format: { [offenderId]: sharedIncidentCount } */
  linkConnectionsMap?: Maybe<Scalars['JSON']>;
  /** Total number of crime group incidents shared with other members */
  linkTotalSharedIncidents: Scalars['Int'];
  /** Count of distinct crime group members this offender has worked with */
  linkUniqueConnections: Scalars['Int'];
  offender: Offender;
  /** The primary score used for tier calculation (linkClusterScore for LINK_ANALYSIS, impactTotalScore for IMPACT) */
  score: Scalars['Float'];
  /** Tier classification relative to other crime group members. HIGH (≥70% of max), MEDIUM (40-70%), LOW (<40%) */
  tier: CrimeGroupOffenderTier;
};

export type CrimeGroupOffenderAnalyticsSimple = {
  __typename?: 'CrimeGroupOffenderAnalyticsSimple';
  /** Number of incidents in this crime group */
  crimeGroupIncidentCount: Scalars['Int'];
  /** Total value of offenses in this crime group */
  crimeGroupTotalValue: Scalars['Float'];
  /** Number of incidents (scoped to crime group) */
  impactIncidentScore: Scalars['Int'];
  /** Total impact score (incident score + value score) */
  impactTotalScore: Scalars['Float'];
  /** Total value score (totalValueCount / 1000) */
  impactValueScore: Scalars['Float'];
  /** Total cluster score (shared incidents + unique connections * 2) */
  linkClusterScore: Scalars['Int'];
  /** Map of connected offender IDs to shared incident counts */
  linkConnectionsMap?: Maybe<Scalars['JSON']>;
  /** Total number of incidents shared with other crime group members */
  linkTotalSharedIncidents: Scalars['Int'];
  /** Number of unique co-offenders in the crime group */
  linkUniqueConnections: Scalars['Int'];
  /** The ID of the offender */
  offenderId: Scalars['String'];
  /** The score used for tier calculation (mode-dependent) */
  score: Scalars['Float'];
  /** Tier classification (HIGH/MEDIUM/LOW) based on relative score */
  tier: CrimeGroupOffenderTier;
};

export enum CrimeGroupOffenderTier {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type CrimeGroupOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CrimeGroupOrderByWithRelationInput = {
  alias?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  evidence?: InputMaybe<DocumentOrderByRelationAggregateInput>;
  feedItems?: InputMaybe<FeedItemOrderByRelationAggregateInput>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  intel?: InputMaybe<IntelOrderByRelationAggregateInput>;
  investigations?: InputMaybe<InvestigationOrderByRelationAggregateInput>;
  linkedUpdates?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  ref?: InputMaybe<SortOrder>;
  reference?: InputMaybe<SortOrder>;
  referenceStr?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  subscribedUsers?: InputMaybe<UserOrderByRelationAggregateInput>;
  todos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  updates?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  vehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
};

export type CrimeGroupPerformance = {
  __typename?: 'CrimeGroupPerformance';
  alertId: Scalars['String'];
  alias: Scalars['String'];
  lastIncident?: Maybe<Scalars['Date']>;
  totalIncidents: Scalars['Int'];
  totalLostValue: Scalars['Float'];
  totalOffenders: Scalars['Int'];
  totalRecoveredValue: Scalars['Float'];
  totalSuccessRate: Scalars['Float'];
};

export type CrimeGroupReport = {
  __typename?: 'CrimeGroupReport';
  crimeGroupMap: CrimeGroupMap;
  crimeTypeByOffender: Array<RadialGraph>;
  goodsTypeLossRecovered: Array<RadialGraph>;
  incidentDayOfWeekGraph: Array<Graph>;
  incidentMonthGraph: Array<Graph>;
  incidentSummary: IncidentSummary;
  incidentTimeOfDayDonut: Array<Graph>;
  incidentsTable: ListIncidents;
  lossTotals: LossTotals;
  offenderGoodsTypeValue: Array<RadialGraph>;
  offenderTable: ListOffenders;
};

export type CrimeGroupReportInput = {
  businessIds: Array<Scalars['String']>;
  crimeGroupId: Scalars['String'];
  dateRange: DateRangeInput;
  groupIds: Array<Scalars['String']>;
  schemeIds: Array<Scalars['String']>;
};

export enum CrimeGroupScalarFieldEnum {
  Alias = 'alias',
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  Id = 'id',
  Ref = 'ref',
  Reference = 'reference',
  ReferenceStr = 'referenceStr',
  UpdatedAt = 'updatedAt'
}

export type CrimeGroupUpdateManyWithoutIncidents = {
  connect?: InputMaybe<Array<UniqueId>>;
  create?: InputMaybe<Array<CrimeGroupNestedCreateOnIncident>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
};

export type CrimeGroupWhereInput = {
  AND?: InputMaybe<Array<CrimeGroupWhereInput>>;
  NOT?: InputMaybe<Array<CrimeGroupWhereInput>>;
  OR?: InputMaybe<Array<CrimeGroupWhereInput>>;
  alias?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringNullableFilter>;
  evidence?: InputMaybe<DocumentListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  linkedUpdates?: InputMaybe<UpdateListRelationFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  subscribedUsers?: InputMaybe<UserListRelationFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updates?: InputMaybe<UpdateListRelationFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type CrimeGroupWhereUniqueInput = {
  AND?: InputMaybe<Array<CrimeGroupWhereInput>>;
  NOT?: InputMaybe<Array<CrimeGroupWhereInput>>;
  OR?: InputMaybe<Array<CrimeGroupWhereInput>>;
  alias?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringNullableFilter>;
  evidence?: InputMaybe<DocumentListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  linkedUpdates?: InputMaybe<UpdateListRelationFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  subscribedUsers?: InputMaybe<UserListRelationFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updates?: InputMaybe<UpdateListRelationFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type CrimeGroupsWhere = {
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type CrimeGroupsWhereOrder = {
  alias?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
};

export enum CrimeType {
  Burglary = 'BURGLARY',
  CriminalDamage = 'CRIMINAL_DAMAGE',
  Drugs = 'DRUGS',
  FraudForgery = 'FRAUD_FORGERY',
  Other = 'OTHER',
  Robbery = 'ROBBERY',
  SexualOffences = 'SEXUAL_OFFENCES',
  TheftHandling = 'THEFT_HANDLING',
  Violence = 'VIOLENCE'
}

export enum CronSchedule {
  EveryDay = 'EVERY_DAY',
  EveryMonth = 'EVERY_MONTH',
  EveryWeek = 'EVERY_WEEK',
  EveryYear = 'EVERY_YEAR'
}

export type CsvImport = {
  __typename?: 'CsvImport';
  additionalInfo?: Maybe<Scalars['JSON']>;
  createdAt: Scalars['Date'];
  errors: Array<Scalars['JSON']>;
  file: Scalars['String'];
  headersToModel: Array<Scalars['JSON']>;
  id: Scalars['ID'];
  imported: Scalars['Int'];
  percentage: Scalars['Int'];
  scheme: Scheme;
  schemeId: Scalars['String'];
  status: CsvStatus;
  total: Scalars['Int'];
  type: CsvType;
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type CsvImportCreateInput = {
  additionalInfo?: InputMaybe<Scalars['JSON']>;
  file: Scalars['String'];
  headersToModel?: InputMaybe<Array<Scalars['JSON']>>;
  scheme: ConnectHelper;
  total: Scalars['Int'];
  type: CsvType;
  user: ConnectHelper;
};

export type CsvImportListRelationFilter = {
  every?: InputMaybe<CsvImportWhereInput>;
  none?: InputMaybe<CsvImportWhereInput>;
  some?: InputMaybe<CsvImportWhereInput>;
};

export type CsvImportOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CsvImportOrderByWithRelationInput = {
  additionalInfo?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  errors?: InputMaybe<SortOrder>;
  file?: InputMaybe<SortOrder>;
  headersToModel?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imported?: InputMaybe<SortOrder>;
  percentage?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  total?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum CsvImportScalarFieldEnum {
  AdditionalInfo = 'additionalInfo',
  CreatedAt = 'createdAt',
  Errors = 'errors',
  File = 'file',
  HeadersToModel = 'headersToModel',
  Id = 'id',
  Imported = 'imported',
  Percentage = 'percentage',
  SchemeId = 'schemeId',
  Status = 'status',
  Total = 'total',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type CsvImportScalarWhereInput = {
  AND?: InputMaybe<Array<CsvImportScalarWhereInput>>;
  NOT?: InputMaybe<Array<CsvImportScalarWhereInput>>;
  OR?: InputMaybe<Array<CsvImportScalarWhereInput>>;
  additionalInfo?: InputMaybe<JsonNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  errors?: InputMaybe<JsonNullableListFilter>;
  file?: InputMaybe<StringFilter>;
  headersToModel?: InputMaybe<JsonNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  imported?: InputMaybe<IntFilter>;
  percentage?: InputMaybe<IntFilter>;
  schemeId?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumCsvStatusFilter>;
  total?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumCsvTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type CsvImportScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<CsvImportScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<CsvImportScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<CsvImportScalarWhereWithAggregatesInput>>;
  additionalInfo?: InputMaybe<JsonNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  errors?: InputMaybe<JsonNullableListFilter>;
  file?: InputMaybe<StringWithAggregatesFilter>;
  headersToModel?: InputMaybe<JsonNullableListFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  imported?: InputMaybe<IntWithAggregatesFilter>;
  percentage?: InputMaybe<IntWithAggregatesFilter>;
  schemeId?: InputMaybe<StringWithAggregatesFilter>;
  status?: InputMaybe<EnumCsvStatusWithAggregatesFilter>;
  total?: InputMaybe<IntWithAggregatesFilter>;
  type?: InputMaybe<EnumCsvTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type CsvImportWhereInput = {
  AND?: InputMaybe<Array<CsvImportWhereInput>>;
  NOT?: InputMaybe<Array<CsvImportWhereInput>>;
  OR?: InputMaybe<Array<CsvImportWhereInput>>;
  additionalInfo?: InputMaybe<JsonNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  errors?: InputMaybe<JsonNullableListFilter>;
  file?: InputMaybe<StringFilter>;
  headersToModel?: InputMaybe<JsonNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  imported?: InputMaybe<IntFilter>;
  percentage?: InputMaybe<IntFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumCsvStatusFilter>;
  total?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumCsvTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type CsvImportWhereUniqueInput = {
  AND?: InputMaybe<Array<CsvImportWhereInput>>;
  NOT?: InputMaybe<Array<CsvImportWhereInput>>;
  OR?: InputMaybe<Array<CsvImportWhereInput>>;
  additionalInfo?: InputMaybe<JsonNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  errors?: InputMaybe<JsonNullableListFilter>;
  file?: InputMaybe<StringFilter>;
  headersToModel?: InputMaybe<JsonNullableListFilter>;
  id?: InputMaybe<Scalars['String']>;
  imported?: InputMaybe<IntFilter>;
  percentage?: InputMaybe<IntFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumCsvStatusFilter>;
  total?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumCsvTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export enum CsvStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

export enum CsvType {
  Business = 'BUSINESS',
  Group = 'GROUP',
  Incident = 'INCIDENT',
  Offender = 'OFFENDER',
  Stock = 'STOCK',
  User = 'USER',
  Vehicle = 'VEHICLE'
}

export enum Currency {
  Aud = 'AUD',
  Brl = 'BRL',
  Cad = 'CAD',
  Chf = 'CHF',
  Cny = 'CNY',
  Dkk = 'DKK',
  Eur = 'EUR',
  Gbp = 'GBP',
  Hkd = 'HKD',
  Idr = 'IDR',
  Inr = 'INR',
  Jpy = 'JPY',
  Krw = 'KRW',
  Mxn = 'MXN',
  Myr = 'MYR',
  Nok = 'NOK',
  Nzd = 'NZD',
  Php = 'PHP',
  Rub = 'RUB',
  Sek = 'SEK',
  Sgd = 'SGD',
  Thb = 'THB',
  Try = 'TRY',
  Usd = 'USD',
  Vnd = 'VND',
  Zar = 'ZAR'
}

export type CustomGallery = {
  __typename?: 'CustomGallery';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  groups: Array<Group>;
  id: Scalars['ID'];
  name: Scalars['String'];
  offenders: Array<Offender>;
  schemes: Array<Scheme>;
  updatedAt: Scalars['Date'];
  vehicles: Array<Vehicle>;
};


export type CustomGalleryGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type CustomGalleryOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type CustomGallerySchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};


export type CustomGalleryVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<Array<VehicleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VehicleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
};

export type CustomGalleryCreateNestedManyWithoutOffender = {
  connect?: InputMaybe<Array<CustomGalleryWhereUniqueInput>>;
  create?: InputMaybe<Array<CreateCustomGalleryOnOffenderInput>>;
};

export type CustomGalleryListRelationFilter = {
  every?: InputMaybe<CustomGalleryWhereInput>;
  none?: InputMaybe<CustomGalleryWhereInput>;
  some?: InputMaybe<CustomGalleryWhereInput>;
};

export type CustomGalleryOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CustomGalleryOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  vehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
};

export enum CustomGalleryScalarFieldEnum {
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type CustomGalleryUpdateInput = {
  description?: InputMaybe<SetStringHelper>;
  groups?: InputMaybe<GroupsSet>;
  name?: InputMaybe<SetStringHelper>;
};

export type CustomGalleryWhereInput = {
  AND?: InputMaybe<Array<CustomGalleryWhereInput>>;
  NOT?: InputMaybe<Array<CustomGalleryWhereInput>>;
  OR?: InputMaybe<Array<CustomGalleryWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type CustomGalleryWhereUniqueInput = {
  AND?: InputMaybe<Array<CustomGalleryWhereInput>>;
  NOT?: InputMaybe<Array<CustomGalleryWhereInput>>;
  OR?: InputMaybe<Array<CustomGalleryWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<StringFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type CustomGraphInput = {
  dataType: DataType;
  /** Period for date grouping when using dateRange on X-axis */
  datePeriod?: InputMaybe<DatePeriod>;
  /** Filter by business IDs */
  filterBusinesses?: InputMaybe<Array<Scalars['String']>>;
  /** Number of days to look back */
  filterDatePeriod?: InputMaybe<Scalars['Int']>;
  /** Filter by group IDs */
  filterGroups?: InputMaybe<Array<Scalars['String']>>;
  /** Filter by user IDs */
  filterUsers?: InputMaybe<Array<Scalars['String']>>;
  graphType: GraphType;
  /** Number of records to return (e.g., number of businesses, number of date periods) */
  numberOfRecords?: InputMaybe<Scalars['Int']>;
  /** X-axis type (e.g., dateRange, businesses, status) */
  xAxis: Scalars['String'];
  /** Label for the X-axis */
  xAxisLabel: Scalars['String'];
  /** Y-axis type (e.g., count, value) */
  yAxis: Scalars['String'];
  /** Label for the Y-axis */
  yAxisLabel: Scalars['String'];
};

export type CustomQuestionsCountGraphInput = {
  brandIds?: InputMaybe<Array<Scalars['String']>>;
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  crimeGroupId?: InputMaybe<Scalars['String']>;
  dateRange: DateRangeInput;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  industryIds?: InputMaybe<Array<Scalars['String']>>;
  languageCode: LanguageCode;
  offenderId?: InputMaybe<Scalars['String']>;
  questionId: Scalars['String'];
  roleIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
};

export type CustomQuestionsGraph = {
  __typename?: 'CustomQuestionsGraph';
  data: Array<Graph>;
  title: Scalars['String'];
};

export type CustomRole = {
  __typename?: 'CustomRole';
  admin: Scalars['Boolean'];
  approvalTier: Scalars['Boolean'];
  checklists: Array<Checklist>;
  createdAt: Scalars['DateTime'];
  dashboard?: Maybe<Dashboard>;
  folders: Array<Folder>;
  id: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<CustomRole>;
  parentId?: Maybe<Scalars['String']>;
  permissions: Array<Permission>;
  scheme: Scheme;
  type: Role;
  updatedAt: Scalars['DateTime'];
  users: Array<UserScheme>;
  usersCount: Scalars['Int'];
};

export type CustomRoleListRelationFilter = {
  every?: InputMaybe<CustomRoleWhereInput>;
  none?: InputMaybe<CustomRoleWhereInput>;
  some?: InputMaybe<CustomRoleWhereInput>;
};

export type CustomRoleOrderBy = {
  name?: InputMaybe<SortOrder>;
};

export type CustomRoleOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CustomRoleOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserSchemeOrderByRelationAggregateInput>;
};

export type CustomRoleWhereInput = {
  AND?: InputMaybe<Array<CustomRoleWhereInput>>;
  NOT?: InputMaybe<Array<CustomRoleWhereInput>>;
  OR?: InputMaybe<Array<CustomRoleWhereInput>>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  permissions?: InputMaybe<PermissionListRelationFilter>;
  users?: InputMaybe<UserSchemeListRelationFilter>;
};

export type CustomRoleWhereUniqueInput = {
  AND?: InputMaybe<Array<CustomRoleWhereInput>>;
  NOT?: InputMaybe<Array<CustomRoleWhereInput>>;
  OR?: InputMaybe<Array<CustomRoleWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<StringFilter>;
  users?: InputMaybe<UserSchemeListRelationFilter>;
};

export type Dashboard = {
  __typename?: 'Dashboard';
  createdAt: Scalars['Date'];
  defaultAdmin: Scalars['Boolean'];
  defaultUser: Scalars['Boolean'];
  id: Scalars['String'];
  layout: Array<DashboardLayout>;
  metadata?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  roles: Array<CustomRole>;
  runningBanner?: Maybe<Scalars['String']>;
  scheme: Scheme;
  updatedAt: Scalars['Date'];
};

export type DashboardCreateInput = {
  defaultAdmin: Scalars['Boolean'];
  defaultUser: Scalars['Boolean'];
  layout?: InputMaybe<DashboardTemplateInput>;
  metadata?: InputMaybe<Scalars['JSON']>;
  name: Scalars['String'];
  roles?: ConnectOnlyArrayHelper;
  runningBanner: Scalars['String'];
  scheme: ConnectHelper;
};

export type DashboardInput = {
  approvedOnly?: InputMaybe<Scalars['Boolean']>;
  dateRange: DateRangeInput;
  draft?: InputMaybe<Scalars['Boolean']>;
  following?: InputMaybe<Scalars['Boolean']>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  myData?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  useBusiness?: InputMaybe<Scalars['Boolean']>;
};

export type DashboardLayout = {
  __typename?: 'DashboardLayout';
  createdAt: Scalars['Date'];
  dashboard: Dashboard;
  dashboardId: Scalars['String'];
  h: Scalars['Int'];
  i: Scalars['String'];
  id: Scalars['String'];
  maxH?: Maybe<Scalars['Int']>;
  maxW?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['JSON']>;
  minH?: Maybe<Scalars['Int']>;
  minW?: Maybe<Scalars['Int']>;
  moved: Scalars['Boolean'];
  static: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
  w: Scalars['Int'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type DashboardLayoutCreateManyTemplateInput = {
  h: Scalars['Int'];
  i: Scalars['String'];
  maxH?: InputMaybe<Scalars['Int']>;
  maxW?: InputMaybe<Scalars['Int']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  minH?: InputMaybe<Scalars['Int']>;
  minW?: InputMaybe<Scalars['Int']>;
  moved?: Scalars['Boolean'];
  static: Scalars['Boolean'];
  w: Scalars['Int'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type DashboardLayoutCreateManyTemplateInputEnvelope = {
  data: Array<DashboardLayoutCreateManyTemplateInput>;
  skipDuplicates?: Scalars['Boolean'];
};

export type DashboardLayoutScalarWhereInput = {
  createdAt?: InputMaybe<DateTimeFilter>;
  h?: InputMaybe<IntFilter>;
  i?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  maxH?: InputMaybe<IntNullableFilter>;
  maxW?: InputMaybe<IntNullableFilter>;
  minH?: InputMaybe<IntNullableFilter>;
  minW?: InputMaybe<IntNullableFilter>;
  moved?: InputMaybe<BoolFilter>;
  static?: InputMaybe<BoolFilter>;
  templateId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  w?: InputMaybe<IntFilter>;
  x?: InputMaybe<IntFilter>;
  y?: InputMaybe<IntFilter>;
};

export type DashboardLayoutUpdateManyWithoutTemplateNestedInput = {
  createMany?: InputMaybe<DashboardLayoutCreateManyTemplateInputEnvelope>;
  delete?: InputMaybe<Array<DashboardLayoutWhereUnique>>;
  deleteMany?: InputMaybe<Array<DashboardLayoutScalarWhereInput>>;
  updateMany?: InputMaybe<DashboardUpdateManyTemplateInput>;
};

export type DashboardLayoutWhereUnique = {
  id: Scalars['String'];
};

export type DashboardOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DashboardTemplateInput = {
  createMany: DashboardLayoutCreateManyTemplateInputEnvelope;
};

export type DashboardTemplateUpdateInput = {
  defaultAdmin?: InputMaybe<Scalars['Boolean']>;
  defaultUser?: InputMaybe<Scalars['Boolean']>;
  layout?: InputMaybe<DashboardLayoutUpdateManyWithoutTemplateNestedInput>;
  metadata?: InputMaybe<Scalars['JSON']>;
  name?: InputMaybe<NullableSetStringHelper>;
  roles?: InputMaybe<NullableConnectArrayHelper>;
  runningBanner?: InputMaybe<NullableSetStringHelper>;
  schemes?: InputMaybe<NullableConnectArrayHelper>;
};

export type DashboardUpdateManyTemplateInput = {
  data: DashboardLayoutCreateManyTemplateInput;
  where: DashboardLayoutWhereUnique;
};

export type DashboardWhereInput = {
  defaultAdmin?: InputMaybe<BoolFilter>;
  defaultUser?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
};

export type DashboardWhereUniqueInput = {
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DataCard = {
  __typename?: 'DataCard';
  change: Scalars['Float'];
  graph: Scalars['JSON'];
  graphEnd: Scalars['String'];
  graphStart: Scalars['String'];
  total: Scalars['Float'];
  totalDuration: Scalars['String'];
};

export type DataQualityScore = {
  __typename?: 'DataQualityScore';
  /** Percentage of incidents with categories */
  categoryCompletionRate: Scalars['Float'];
  /** Quality score for descriptions */
  descriptionQualityScore: Scalars['Float'];
  /** Percentage of incidents with images */
  imageAttachmentRate: Scalars['Float'];
  /** Incident data completeness score */
  incidentCompleteness: Scalars['Float'];
  /** Score for linking incidents to offenders */
  linkageScore: Scalars['Float'];
  /** Percentage of incidents with location data */
  locationDataRate: Scalars['Float'];
  /** Offender data completeness score */
  offenderCompleteness: Scalars['Float'];
  /** Overall data quality score (0-100) */
  overallScore: Scalars['Float'];
  /** Score for timely data entry */
  timelinessScore: Scalars['Float'];
};

export type DataQualityTrend = {
  __typename?: 'DataQualityTrend';
  /** Average completeness percentage */
  averageCompleteness: Scalars['Float'];
  /** Improvement from previous month */
  improvementRate?: Maybe<Scalars['Float']>;
  /** Number of incidents */
  incidentCount: Scalars['Int'];
  /** Month */
  month: Scalars['String'];
  /** Overall quality score */
  overallScore: Scalars['Float'];
};

export enum DataType {
  Activities = 'activities',
  Incidents = 'incidents',
  Offenders = 'offenders'
}

export enum DatePeriod {
  Day = 'day',
  Month = 'month',
  Quarter = 'quarter',
  Week = 'week',
  Year = 'year'
}

export type DateRangeInput = {
  endDate: Scalars['Date'];
  startDate: Scalars['Date'];
};

export type DateRangeOutput = {
  __typename?: 'DateRangeOutput';
  avgPerDay?: Maybe<Scalars['Float']>;
  earliest?: Maybe<Scalars['Date']>;
  latest?: Maybe<Scalars['Date']>;
  spanDays?: Maybe<Scalars['Int']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Date']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['Date']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Date']>>;
};

export type DateTimeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedDateTimeNullableFilter>;
  _min?: InputMaybe<NestedDateTimeNullableFilter>;
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<NestedDateTimeNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Date']>>;
};

export type DateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Date']>>;
};

export type DeleteRole = {
  id: Scalars['String'];
  newId: Scalars['String'];
};

export type DemCompany = {
  __typename?: 'DemCompany';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type DemDevice = {
  __typename?: 'DemDevice';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  demGroups: Array<DemGroup>;
  demId: Scalars['String'];
  evidence: Array<Document>;
  id: Scalars['ID'];
  modelId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  recycled: Scalars['Boolean'];
  scheme: Scheme;
  schemeId: Scalars['String'];
  serialNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type DemDeviceListRelationFilter = {
  every?: InputMaybe<DemDeviceWhereInput>;
  none?: InputMaybe<DemDeviceWhereInput>;
  some?: InputMaybe<DemDeviceWhereInput>;
};

export type DemDeviceModel = {
  __typename?: 'DemDeviceModel';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type DemDeviceOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  evidence?: InputMaybe<DocumentOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DemDeviceScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<DemDeviceScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<DemDeviceScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<DemDeviceScalarWhereWithAggregatesInput>>;
  businessId?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  schemeId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type DemDeviceWhereInput = {
  AND?: InputMaybe<Array<DemDeviceWhereInput>>;
  NOT?: InputMaybe<Array<DemDeviceWhereInput>>;
  OR?: InputMaybe<Array<DemDeviceWhereInput>>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  demId?: InputMaybe<StringFilter>;
  evidence?: InputMaybe<DocumentListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  serialNumber?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DemDeviceWhereUniqueInput = {
  AND?: InputMaybe<Array<DemDeviceWhereInput>>;
  NOT?: InputMaybe<Array<DemDeviceWhereInput>>;
  OR?: InputMaybe<Array<DemDeviceWhereInput>>;
  business?: InputMaybe<BusinessWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  demId?: InputMaybe<Scalars['String']>;
  evidence?: InputMaybe<DocumentListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeWhereInput>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DemEvidence = {
  __typename?: 'DemEvidence';
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  importance?: Maybe<Scalars['String']>;
  playbackUrl?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type DemEvidenceExtended = {
  __typename?: 'DemEvidenceExtended';
  duration?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  importance?: Maybe<Scalars['String']>;
  officerName?: Maybe<Scalars['String']>;
  playbackUrl?: Maybe<Scalars['String']>;
  recordedAt?: Maybe<Scalars['DateTime']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type DemEvidenceNew = {
  __typename?: 'DemEvidenceNew';
  duration?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  importance?: Maybe<Scalars['String']>;
  officerName?: Maybe<Scalars['String']>;
  playbackUrl?: Maybe<Scalars['String']>;
  recordedAt?: Maybe<Scalars['DateTime']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type DemEvidenceNode = {
  __typename?: 'DemEvidenceNode';
  node: DemEvidenceNew;
};

export type DemGroup = {
  __typename?: 'DemGroup';
  createdAt: Scalars['Date'];
  demDevices: Array<DemDevice>;
  demId: Scalars['String'];
  devicesTotal: Array<DemDevice>;
  id: Scalars['ID'];
  name: Scalars['String'];
  scheme: Scheme;
  schemeId: Scalars['String'];
  totalDevices: Scalars['Int'];
  updatedAt: Scalars['Date'];
};

export type DemGroupOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DemGroupScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<DemGroupScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<DemGroupScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<DemGroupScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  schemeId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type DemGroupWhereInput = {
  AND?: InputMaybe<Array<DemGroupWhereInput>>;
  NOT?: InputMaybe<Array<DemGroupWhereInput>>;
  OR?: InputMaybe<Array<DemGroupWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  demDevices?: InputMaybe<DemDeviceListRelationFilter>;
  demId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DemGroupWhereUniqueInput = {
  AND?: InputMaybe<Array<DemGroupWhereInput>>;
  NOT?: InputMaybe<Array<DemGroupWhereInput>>;
  OR?: InputMaybe<Array<DemGroupWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  demDevices?: InputMaybe<DemDeviceListRelationFilter>;
  demId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeWhereInput>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DemUser = {
  __typename?: 'DemUser';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type DependInput = {
  answer: Scalars['String'];
  question: Scalars['String'];
};

export type DependWeight = {
  __typename?: 'DependWeight';
  dependsOn: Scalars['String'];
  weight: Scalars['String'];
};

export type DependWeightInput = {
  dependsOn: Scalars['String'];
  weight: Scalars['String'];
};

export type DetectActionConfig = {
  __typename?: 'DetectActionConfig';
  camera: Array<AiVisionCamera>;
  cameraCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  eventData: EventData;
  id: Scalars['ID'];
  minimumConfidenceTrigger: AiVisionMatchConfidence;
  minimumPriorityTrigger: AiVisionMatchPriority;
  name: Scalars['String'];
  scheme: Scheme;
  schemeId: Scalars['String'];
  type: DetectActionType;
  updatedAt: Scalars['DateTime'];
  usersToGet: UsersToGetFrom;
};

export type DetectActionConfigInput = {
  camerasToAdd?: InputMaybe<Array<Scalars['String']>>;
  camerasToRemove?: InputMaybe<Array<Scalars['String']>>;
  /** Event configuration data */
  eventData: EventDataInput;
  id?: InputMaybe<Scalars['String']>;
  minimumConfidenceTrigger?: InputMaybe<AiVisionMatchConfidence>;
  minimumPriorityTrigger?: InputMaybe<AiVisionMatchPriority>;
  name: Scalars['String'];
  scheme: Scalars['String'];
  type: DetectActionType;
  /** User selection criteria */
  usersToGet: UsersToGetInput;
};

export enum DetectActionType {
  Activity = 'ACTIVITY',
  Email = 'EMAIL',
  PushNotification = 'PUSH_NOTIFICATION',
  Sms = 'SMS'
}

export type DetectConfigConnectDisconnect = {
  connect?: InputMaybe<Array<Scalars['String']>>;
  disconnect?: InputMaybe<Array<Scalars['String']>>;
};

export type DetectedFace = {
  __typename?: 'DetectedFace';
  attributes: Scalars['JSON'];
  boundingBox: Scalars['JSON'];
  confidence: Scalars['Float'];
  faceId: Scalars['String'];
  similarityMatches?: Maybe<Array<FaceMatch>>;
};

export type DetectionConfigWhere = {
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  searchedIds?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<Array<DetectActionType>>;
};

export type DeviceInfo = {
  name?: InputMaybe<Scalars['String']>;
  osName?: InputMaybe<Scalars['String']>;
  osVersion?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type DiscImportBusinessesInput = {
  connect?: InputMaybe<DiscImportConnectBusinessInput>;
  create?: InputMaybe<DiscImportCreateBusinessInput>;
};

export type DiscImportConnectBusinessInput = {
  id: Scalars['String'];
  importId: Scalars['String'];
};

export type DiscImportConnectUserInput = {
  groups?: InputMaybe<Array<UniqueId>>;
  id: Scalars['String'];
  importId: Scalars['String'];
  role: Role;
};

export type DiscImportCreateBusinessInput = {
  building?: InputMaybe<Scalars['String']>;
  county?: InputMaybe<Scalars['String']>;
  importId: Scalars['String'];
  name: Scalars['String'];
  postcode: Scalars['String'];
  street: Scalars['String'];
  townCity?: InputMaybe<Scalars['String']>;
};

export type DiscImportCreateUserInput = {
  business: UniqueId;
  email: Scalars['String'];
  fullName: Scalars['String'];
  groups: Array<UniqueId>;
  importId: Scalars['String'];
  role: Role;
};

export type DiscImportDataInput = {
  businesses: Array<DiscImportBusinessesInput>;
  historicIncidents: Array<DiscImportHistoricIncidentsInput>;
  images: Array<DiscImportImagesInput>;
  incidents: Array<DiscImportIncidentsInput>;
  offenders: Array<DiscImportOffendersInput>;
  scheme: UniqueId;
  users: Array<DiscImportUsersInput>;
};

export type DiscImportHistoricIncidentsInput = {
  activityAuthorised?: InputMaybe<Scalars['Boolean']>;
  building?: InputMaybe<Scalars['String']>;
  business?: InputMaybe<UniqueId>;
  county?: InputMaybe<Scalars['String']>;
  crimeTypes?: InputMaybe<Array<UniqueId>>;
  date?: InputMaybe<Scalars['Date']>;
  groups?: InputMaybe<Array<UniqueId>>;
  importId: Scalars['String'];
  lostValue?: InputMaybe<Scalars['Float']>;
  policeInvolved?: InputMaybe<Scalars['Boolean']>;
  policeReported?: InputMaybe<Scalars['Boolean']>;
  postcode?: InputMaybe<Scalars['String']>;
  recoveredValue?: InputMaybe<Scalars['Float']>;
  street?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['Date']>;
  townCity?: InputMaybe<Scalars['String']>;
};

export type DiscImportImagesInput = {
  fileName: Scalars['String'];
  importId: Scalars['String'];
  mimetype: Scalars['String'];
  url: Scalars['String'];
};

export type DiscImportIncidentsInput = {
  activityAuthorised?: InputMaybe<Scalars['Boolean']>;
  building?: InputMaybe<Scalars['String']>;
  business?: InputMaybe<UniqueId>;
  county?: InputMaybe<Scalars['String']>;
  createdBy?: InputMaybe<UniqueId>;
  crimeTypes?: InputMaybe<Array<UniqueId>>;
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<UniqueId>>;
  images?: InputMaybe<Array<UniqueId>>;
  importId: Scalars['String'];
  lostValue?: InputMaybe<Scalars['Float']>;
  offenders?: InputMaybe<Array<UniqueId>>;
  policeInvolved?: InputMaybe<Scalars['Boolean']>;
  policeRef?: InputMaybe<Scalars['String']>;
  policeReported?: InputMaybe<Scalars['Boolean']>;
  postcode?: InputMaybe<Scalars['String']>;
  recoveredValue?: InputMaybe<Scalars['Float']>;
  street?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['Date']>;
  townCity?: InputMaybe<Scalars['String']>;
};

export type DiscImportOffendersInput = {
  age?: InputMaybe<Age>;
  build?: InputMaybe<Build>;
  comment?: InputMaybe<Scalars['String']>;
  createdBy?: InputMaybe<UniqueId>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  deletionDate?: InputMaybe<Scalars['Date']>;
  gender?: InputMaybe<Gender>;
  groups: Array<UniqueId>;
  hair?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Height>;
  images: Array<UniqueId>;
  importId: Scalars['String'];
  name: Scalars['String'];
  peculiarities?: InputMaybe<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  street?: InputMaybe<Scalars['String']>;
};

export type DiscImportUsersInput = {
  connect?: InputMaybe<DiscImportConnectUserInput>;
  create?: InputMaybe<DiscImportCreateUserInput>;
};

export type Document = {
  __typename?: 'Document';
  articles: Array<Article>;
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  fileType?: Maybe<FileType>;
  folder?: Maybe<Folder>;
  folderId?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  investigation: Array<Investigation>;
  mg11?: Maybe<Mg11>;
  mg11Id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  offenders: Array<Offender>;
  tags: Array<Tag>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  type: DocumentType;
  updatedAt: Scalars['Date'];
  url: Scalars['String'];
};


export type DocumentArticlesArgs = {
  cursor?: InputMaybe<ArticleWhereUniqueInput>;
  distinct?: InputMaybe<ArticleScalarFieldEnum>;
  orderBy?: InputMaybe<ArticleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type DocumentInvestigationArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<InvestigationScalarFieldEnum>;
  orderBy?: InputMaybe<InvestigationOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type DocumentOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<OffenderScalarFieldEnum>;
  orderBy?: InputMaybe<OffenderOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type DocumentTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  distinct?: InputMaybe<TagScalarFieldEnum>;
  orderBy?: InputMaybe<TagOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};

export type DocumentEngagement = {
  __typename?: 'DocumentEngagement';
  averageViewsPerUser: Scalars['Float'];
  documentId: Scalars['String'];
  documentName: Scalars['String'];
  notViewedCount: Scalars['Int'];
  totalUsers: Scalars['Int'];
  totalViews: Scalars['Int'];
  users: Array<DocumentUserEngagement>;
  viewRate: Scalars['Float'];
  viewedCount: Scalars['Int'];
};

export type DocumentIncidentCreate = {
  fileType: Scalars['String'];
  name: Scalars['String'];
  origFileName: Scalars['String'];
  url: Scalars['String'];
};

export type DocumentListRelationFilter = {
  every?: InputMaybe<DocumentWhereInput>;
  none?: InputMaybe<DocumentWhereInput>;
  some?: InputMaybe<DocumentWhereInput>;
};

export type DocumentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type DocumentOrderByWithRelationInput = {
  checklist?: InputMaybe<ActiveChecklistOrderByWithRelationInput>;
  checklistId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  crimeGroups?: InputMaybe<CrimeGroupOrderByRelationAggregateInput>;
  description?: InputMaybe<SortOrder>;
  fileType?: InputMaybe<SortOrder>;
  fileTypeLit?: InputMaybe<SortOrder>;
  hash?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  investigation?: InputMaybe<InvestigationOrderByRelationAggregateInput>;
  mg11?: InputMaybe<Mg11OrderByWithRelationInput>;
  mg11Id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  tags?: InputMaybe<TagOrderByRelationAggregateInput>;
  thumbnailUrl?: InputMaybe<SortOrder>;
  todos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  vehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
};

export enum DocumentScalarFieldEnum {
  ChecklistId = 'checklistId',
  CreatedAt = 'createdAt',
  Description = 'description',
  FileType = 'fileType',
  FileTypeLit = 'fileTypeLit',
  Hash = 'hash',
  Id = 'id',
  Mg11Id = 'mg11Id',
  Name = 'name',
  SchemeId = 'schemeId',
  ThumbnailUrl = 'thumbnailUrl',
  UpdatedAt = 'updatedAt',
  Url = 'url'
}

export enum DocumentType {
  Document = 'DOCUMENT',
  Evidence = 'EVIDENCE'
}

export type DocumentUserEngagement = {
  __typename?: 'DocumentUserEngagement';
  firstViewedAt?: Maybe<Scalars['Date']>;
  hasViewed: Scalars['Boolean'];
  lastViewedAt?: Maybe<Scalars['Date']>;
  userEmail?: Maybe<Scalars['String']>;
  userFullName: Scalars['String'];
  userId: Scalars['String'];
  viewCount?: Maybe<Scalars['Int']>;
};

export type DocumentView = {
  __typename?: 'DocumentView';
  documentId: Scalars['String'];
  documentName: Scalars['String'];
  firstViewedAt: Scalars['Date'];
  lastViewedAt: Scalars['Date'];
  viewCount: Scalars['Int'];
};

export type DocumentWhereInput = {
  AND?: InputMaybe<Array<DocumentWhereInput>>;
  NOT?: InputMaybe<Array<DocumentWhereInput>>;
  OR?: InputMaybe<Array<DocumentWhereInput>>;
  checklist?: InputMaybe<ActiveChecklistWhereInput>;
  checklistId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  description?: InputMaybe<StringNullableFilter>;
  fileType?: InputMaybe<EnumFileTypeNullableFilter>;
  fileTypeLit?: InputMaybe<StringNullableFilter>;
  folder?: InputMaybe<FolderWhereInput>;
  folderId?: InputMaybe<StringNullableFilter>;
  hash?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  investigation?: InputMaybe<InvestigationListRelationFilter>;
  mg11?: InputMaybe<Mg11WhereInput>;
  mg11Id?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  thumbnailUrl?: InputMaybe<StringNullableFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  type?: InputMaybe<EnumDocumentTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type DocumentWhereUniqueInput = {
  AND?: InputMaybe<Array<DocumentWhereInput>>;
  NOT?: InputMaybe<Array<DocumentWhereInput>>;
  OR?: InputMaybe<Array<DocumentWhereInput>>;
  checklist?: InputMaybe<ActiveChecklistWhereInput>;
  checklistId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  description?: InputMaybe<StringNullableFilter>;
  fileType?: InputMaybe<EnumFileTypeNullableFilter>;
  fileTypeLit?: InputMaybe<StringNullableFilter>;
  hash?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  investigation?: InputMaybe<InvestigationListRelationFilter>;
  mg11?: InputMaybe<Mg11WhereInput>;
  mg11Id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<StringFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  thumbnailUrl?: InputMaybe<StringNullableFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type DocumentsCreateRemove = {
  create?: InputMaybe<Array<DocumentIncidentCreate>>;
  remove: Array<Scalars['String']>;
};

export type DunelmColumnMapping = {
  assaultTypeColumn?: InputMaybe<Scalars['String']>;
  cameraNumbersColumn?: InputMaybe<Scalars['String']>;
  cctvAvailableColumn?: InputMaybe<Scalars['String']>;
  crimeReferenceColumn?: InputMaybe<Scalars['String']>;
  dateTimeColumn?: InputMaybe<Scalars['String']>;
  descriptionColumn?: InputMaybe<Scalars['String']>;
  locationColumn?: InputMaybe<Scalars['String']>;
  locationInStoreColumn?: InputMaybe<Scalars['String']>;
  numberColumn?: InputMaybe<Scalars['String']>;
  policeActionColumn?: InputMaybe<Scalars['String']>;
  policeAttendedColumn?: InputMaybe<Scalars['String']>;
  productPropertyColumn?: InputMaybe<Scalars['String']>;
  reportedToPoliceColumn?: InputMaybe<Scalars['String']>;
  suspectNameColumn?: InputMaybe<Scalars['String']>;
  typeLevel1Column?: InputMaybe<Scalars['String']>;
  typeLevel2Column?: InputMaybe<Scalars['String']>;
  valueColumn?: InputMaybe<Scalars['String']>;
  vehicleMakeColumn?: InputMaybe<Scalars['String']>;
  vehicleRegColumn?: InputMaybe<Scalars['String']>;
  vehicleUsedColumn?: InputMaybe<Scalars['String']>;
};

export type DunelmIdInput = {
  id: Scalars['String'];
};

export type DunelmImportDataInput = {
  /** Optional mapping of CSV/Excel columns to incident fields */
  columnMapping?: InputMaybe<DunelmColumnMapping>;
  /** Base64 encoded CSV/Excel data or file content as string (auto-detects format) */
  fileData?: InputMaybe<Scalars['String']>;
  /** URL to download the CSV/Excel file from (e.g., Azure Blob Storage URL) */
  fileUrl?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<DunelmIdInput>>;
  scheme: DunelmIdInput;
};

export type EnableSchemeRekognotionInput = {
  collection?: InputMaybe<SchemeRekognotionCollectionsInput>;
};

export type EnhancedAudioSession = {
  __typename?: 'EnhancedAudioSession';
  detectedFaces: Array<DetectedFace>;
  faceRecognitionEnabled: Scalars['Boolean'];
  goodsMode: Scalars['String'];
  preSelectedGoods: Array<PreSelectedGood>;
  preUploadedImages: Array<Scalars['String']>;
  sessionId: Scalars['String'];
  status: Scalars['String'];
  uploadUrl: Scalars['String'];
};

export type EnhancedStreamAudioData = {
  __typename?: 'EnhancedStreamAudioData';
  audioQuality?: Maybe<AudioQualityMetrics>;
  confidence?: Maybe<Scalars['Float']>;
  enhancedTranscription?: Maybe<EnhancedTranscription>;
  errorMessages?: Maybe<Array<Scalars['String']>>;
  extractedData?: Maybe<Scalars['JSON']>;
  formData?: Maybe<Scalars['JSON']>;
  isComplete: Scalars['Boolean'];
  languageDetection?: Maybe<LanguageDetectionResult>;
  missingRequiredFields?: Maybe<Array<Scalars['String']>>;
  partialTranscript?: Maybe<Scalars['String']>;
  processingStage?: Maybe<Scalars['String']>;
  sessionId: Scalars['String'];
  status: Scalars['String'];
  suggestedQuestions?: Maybe<Array<Scalars['JSON']>>;
  translation?: Maybe<TranslationResult>;
};

export type EnhancedTranscription = {
  __typename?: 'EnhancedTranscription';
  language: Scalars['String'];
  overallConfidence: Scalars['Float'];
  processingTime: Scalars['Int'];
  segments: Array<TranscriptionSegment>;
  speakersDetected: Scalars['Int'];
  suggestedCorrections: Array<TranscriptionCorrection>;
};

export type EntitySyncStats = {
  __typename?: 'EntitySyncStats';
  errors: Scalars['Int'];
  found: Scalars['Int'];
  updated: Scalars['Int'];
};

export type EntityTypeViewBreakdown = {
  __typename?: 'EntityTypeViewBreakdown';
  /** Number of crime group views */
  crimeGroups: Scalars['Int'];
  /** Number of incident views */
  incidents: Scalars['Int'];
  /** Number of offender views */
  offenders: Scalars['Int'];
  /** Number of vehicle views */
  vehicles: Scalars['Int'];
};

export type EnumAiSuggestionStatusNullableFilter = {
  equals?: InputMaybe<AiSuggestionStatus>;
  in?: InputMaybe<Array<AiSuggestionStatus>>;
  not?: InputMaybe<AiSuggestionStatus>;
  notIn?: InputMaybe<Array<AiSuggestionStatus>>;
};

export type EnumAiSuggestionTypeNullableFilter = {
  equals?: InputMaybe<AiSuggestionType>;
  in?: InputMaybe<Array<AiSuggestionType>>;
  not?: InputMaybe<AiSuggestionType>;
  notIn?: InputMaybe<Array<AiSuggestionType>>;
};

export type EnumActionTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<ActionType>;
};

export type EnumActionTypeFilter = {
  equals?: InputMaybe<ActionType>;
  in?: InputMaybe<Array<ActionType>>;
  not?: InputMaybe<ActionType>;
  notIn?: InputMaybe<Array<ActionType>>;
};

export type EnumActionTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumActionTypeFilter>;
  _min?: InputMaybe<NestedEnumActionTypeFilter>;
  equals?: InputMaybe<ActionType>;
  in?: InputMaybe<Array<ActionType>>;
  not?: InputMaybe<ActionType>;
  notIn?: InputMaybe<Array<ActionType>>;
};

export type EnumAgeNullableFilter = {
  equals?: InputMaybe<Age>;
  in?: InputMaybe<Array<Age>>;
  not?: InputMaybe<Age>;
  notIn?: InputMaybe<Array<Age>>;
};

export type EnumAgeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumAgeNullableFilter>;
  _min?: InputMaybe<NestedEnumAgeNullableFilter>;
  equals?: InputMaybe<Age>;
  in?: InputMaybe<Array<Age>>;
  not?: InputMaybe<Age>;
  notIn?: InputMaybe<Array<Age>>;
};

export type EnumAnswerTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<AnswerType>;
};

export type EnumAnswerTypeFilter = {
  equals?: InputMaybe<AnswerType>;
  in?: InputMaybe<Array<AnswerType>>;
  not?: InputMaybe<AnswerType>;
  notIn?: InputMaybe<Array<AnswerType>>;
};

export type EnumAnswerTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumAnswerTypeFilter>;
  _min?: InputMaybe<NestedEnumAnswerTypeFilter>;
  equals?: InputMaybe<AnswerType>;
  in?: InputMaybe<Array<AnswerType>>;
  not?: InputMaybe<AnswerType>;
  notIn?: InputMaybe<Array<AnswerType>>;
};

export type EnumAppTypeFilter = {
  equals?: InputMaybe<AppType>;
  in?: InputMaybe<Array<AppType>>;
  not?: InputMaybe<AppType>;
  notIn?: InputMaybe<Array<AppType>>;
};

export type EnumArticlePriorityFieldUpdateOperationsInput = {
  set?: InputMaybe<ArticlePriority>;
};

export type EnumArticlePriorityFilter = {
  equals?: InputMaybe<ArticlePriority>;
  in?: InputMaybe<Array<ArticlePriority>>;
  not?: InputMaybe<ArticlePriority>;
  notIn?: InputMaybe<Array<ArticlePriority>>;
};

export type EnumArticlePriorityWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumArticlePriorityFilter>;
  _min?: InputMaybe<NestedEnumArticlePriorityFilter>;
  equals?: InputMaybe<ArticlePriority>;
  in?: InputMaybe<Array<ArticlePriority>>;
  not?: InputMaybe<ArticlePriority>;
  notIn?: InputMaybe<Array<ArticlePriority>>;
};

export type EnumArticleSectionTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<ArticleSectionType>;
};

export type EnumArticleSectionTypeFilter = {
  equals?: InputMaybe<ArticleSectionType>;
  in?: InputMaybe<Array<ArticleSectionType>>;
  not?: InputMaybe<ArticleSectionType>;
  notIn?: InputMaybe<Array<ArticleSectionType>>;
};

export type EnumArticleSectionTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumArticleSectionTypeFilter>;
  _min?: InputMaybe<NestedEnumArticleSectionTypeFilter>;
  equals?: InputMaybe<ArticleSectionType>;
  in?: InputMaybe<Array<ArticleSectionType>>;
  not?: InputMaybe<ArticleSectionType>;
  notIn?: InputMaybe<Array<ArticleSectionType>>;
};

export type EnumBanTypeNullableFilter = {
  equals?: InputMaybe<BanType>;
  in?: InputMaybe<Array<BanType>>;
  not?: InputMaybe<BanType>;
  notIn?: InputMaybe<Array<BanType>>;
};

export type EnumBanTypeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumBanTypeNullableFilter>;
  _min?: InputMaybe<NestedEnumBanTypeNullableFilter>;
  equals?: InputMaybe<BanType>;
  in?: InputMaybe<Array<BanType>>;
  not?: InputMaybe<BanType>;
  notIn?: InputMaybe<Array<BanType>>;
};

export type EnumBillingModeFieldUpdateOperationsInput = {
  set?: InputMaybe<BillingMode>;
};

export type EnumBuildNullableFilter = {
  equals?: InputMaybe<Build>;
  in?: InputMaybe<Array<Build>>;
  not?: InputMaybe<Build>;
  notIn?: InputMaybe<Array<Build>>;
};

export type EnumBuildNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumBuildNullableFilter>;
  _min?: InputMaybe<NestedEnumBuildNullableFilter>;
  equals?: InputMaybe<Build>;
  in?: InputMaybe<Array<Build>>;
  not?: InputMaybe<Build>;
  notIn?: InputMaybe<Array<Build>>;
};

export type EnumChecklistAnswerTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<ChecklistAnswerType>;
};

export type EnumChecklistAnswerTypeFilter = {
  equals?: InputMaybe<ChecklistAnswerType>;
  in?: InputMaybe<Array<ChecklistAnswerType>>;
  not?: InputMaybe<ChecklistAnswerType>;
  notIn?: InputMaybe<Array<ChecklistAnswerType>>;
};

export type EnumChecklistAnswerTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumChecklistAnswerTypeFilter>;
  _min?: InputMaybe<NestedEnumChecklistAnswerTypeFilter>;
  equals?: InputMaybe<ChecklistAnswerType>;
  in?: InputMaybe<Array<ChecklistAnswerType>>;
  not?: InputMaybe<ChecklistAnswerType>;
  notIn?: InputMaybe<Array<ChecklistAnswerType>>;
};

export type EnumChecklistStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<ChecklistStatus>;
};

export type EnumChecklistStatusFilter = {
  equals?: InputMaybe<ChecklistStatus>;
  in?: InputMaybe<Array<ChecklistStatus>>;
  not?: InputMaybe<ChecklistStatus>;
  notIn?: InputMaybe<Array<ChecklistStatus>>;
};

export type EnumChecklistStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumChecklistStatusFilter>;
  _min?: InputMaybe<NestedEnumChecklistStatusFilter>;
  equals?: InputMaybe<ChecklistStatus>;
  in?: InputMaybe<Array<ChecklistStatus>>;
  not?: InputMaybe<ChecklistStatus>;
  notIn?: InputMaybe<Array<ChecklistStatus>>;
};

export type EnumCompleteStatusFilter = {
  equals?: InputMaybe<CompleteStatus>;
  in?: InputMaybe<Array<CompleteStatus>>;
  not?: InputMaybe<CompleteStatus>;
  notIn?: InputMaybe<Array<CompleteStatus>>;
};

export type EnumCompleteStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumCompleteStatusFilter>;
  _min?: InputMaybe<NestedEnumCompleteStatusFilter>;
  equals?: InputMaybe<CompleteStatus>;
  in?: InputMaybe<Array<CompleteStatus>>;
  not?: InputMaybe<CompleteStatus>;
  notIn?: InputMaybe<Array<CompleteStatus>>;
};

export type EnumCrimeTypeNullableFilter = {
  equals?: InputMaybe<CrimeType>;
  in?: InputMaybe<Array<CrimeType>>;
  not?: InputMaybe<CrimeType>;
  notIn?: InputMaybe<Array<CrimeType>>;
};

export type EnumCrimeTypeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumCrimeTypeNullableFilter>;
  _min?: InputMaybe<NestedEnumCrimeTypeNullableFilter>;
  equals?: InputMaybe<CrimeType>;
  in?: InputMaybe<Array<CrimeType>>;
  not?: InputMaybe<CrimeType>;
  notIn?: InputMaybe<Array<CrimeType>>;
};

export type EnumCsvStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<CsvStatus>;
};

export type EnumCsvStatusFilter = {
  equals?: InputMaybe<CsvStatus>;
  in?: InputMaybe<Array<CsvStatus>>;
  not?: InputMaybe<CsvStatus>;
  notIn?: InputMaybe<Array<CsvStatus>>;
};

export type EnumCsvStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumCsvStatusFilter>;
  _min?: InputMaybe<NestedEnumCsvStatusFilter>;
  equals?: InputMaybe<CsvStatus>;
  in?: InputMaybe<Array<CsvStatus>>;
  not?: InputMaybe<CsvStatus>;
  notIn?: InputMaybe<Array<CsvStatus>>;
};

export type EnumCsvTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<CsvType>;
};

export type EnumCsvTypeFilter = {
  equals?: InputMaybe<CsvType>;
  in?: InputMaybe<Array<CsvType>>;
  not?: InputMaybe<CsvType>;
  notIn?: InputMaybe<Array<CsvType>>;
};

export type EnumCsvTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumCsvTypeFilter>;
  _min?: InputMaybe<NestedEnumCsvTypeFilter>;
  equals?: InputMaybe<CsvType>;
  in?: InputMaybe<Array<CsvType>>;
  not?: InputMaybe<CsvType>;
  notIn?: InputMaybe<Array<CsvType>>;
};

export type EnumCurrencyNullableFilter = {
  equals?: InputMaybe<Currency>;
  in?: InputMaybe<Array<Currency>>;
  not?: InputMaybe<NestedEnumCurrencyNullableFilter>;
  notIn?: InputMaybe<Array<Currency>>;
};

export type EnumDocumentTypeFilter = {
  equals?: InputMaybe<DocumentType>;
  in?: InputMaybe<Array<DocumentType>>;
  not?: InputMaybe<DocumentType>;
  notIn?: InputMaybe<Array<DocumentType>>;
};

export type EnumFeaturesListUpdateOperationsInput = {
  set?: InputMaybe<Array<Features>>;
};

export type EnumFeedItemTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<FeedItemType>;
};

export type EnumFeedItemTypeFilter = {
  equals?: InputMaybe<FeedItemType>;
  in?: InputMaybe<Array<FeedItemType>>;
  not?: InputMaybe<FeedItemType>;
  notIn?: InputMaybe<Array<FeedItemType>>;
};

export type EnumFeedItemTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumFeedItemTypeFilter>;
  _min?: InputMaybe<NestedEnumFeedItemTypeFilter>;
  equals?: InputMaybe<FeedItemType>;
  in?: InputMaybe<Array<FeedItemType>>;
  not?: InputMaybe<FeedItemType>;
  notIn?: InputMaybe<Array<FeedItemType>>;
};

export type EnumFileTypeNullableFilter = {
  equals?: InputMaybe<FileType>;
  in?: InputMaybe<Array<FileType>>;
  not?: InputMaybe<FileType>;
  notIn?: InputMaybe<Array<FileType>>;
};

export type EnumFileTypeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumFileTypeNullableFilter>;
  _min?: InputMaybe<NestedEnumFileTypeNullableFilter>;
  equals?: InputMaybe<FileType>;
  in?: InputMaybe<Array<FileType>>;
  not?: InputMaybe<FileType>;
  notIn?: InputMaybe<Array<FileType>>;
};

export type EnumGenderNullableFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<Gender>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type EnumGenderNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumGenderNullableFilter>;
  _min?: InputMaybe<NestedEnumGenderNullableFilter>;
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<Gender>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type EnumGoodsModeFieldUpdateOperationsInput = {
  set?: InputMaybe<GoodsMode>;
};

export type EnumGoodsModeFilter = {
  equals?: InputMaybe<GoodsMode>;
  in?: InputMaybe<Array<GoodsMode>>;
  not?: InputMaybe<GoodsMode>;
  notIn?: InputMaybe<Array<GoodsMode>>;
};

export type EnumGoodsModeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumGoodsModeFilter>;
  _min?: InputMaybe<NestedEnumGoodsModeFilter>;
  equals?: InputMaybe<GoodsMode>;
  in?: InputMaybe<Array<GoodsMode>>;
  not?: InputMaybe<GoodsMode>;
  notIn?: InputMaybe<Array<GoodsMode>>;
};

export type EnumHeightNullableFilter = {
  equals?: InputMaybe<Height>;
  in?: InputMaybe<Array<Height>>;
  not?: InputMaybe<Height>;
  notIn?: InputMaybe<Array<Height>>;
};

export type EnumHeightNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumHeightNullableFilter>;
  _min?: InputMaybe<NestedEnumHeightNullableFilter>;
  equals?: InputMaybe<Height>;
  in?: InputMaybe<Array<Height>>;
  not?: InputMaybe<Height>;
  notIn?: InputMaybe<Array<Height>>;
};

export type EnumIdSourceNullableFilter = {
  equals?: InputMaybe<IdSource>;
  in?: InputMaybe<Array<IdSource>>;
  not?: InputMaybe<IdSource>;
  notIn?: InputMaybe<Array<IdSource>>;
};

export type EnumIdSourceNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumIdSourceNullableFilter>;
  _min?: InputMaybe<NestedEnumIdSourceNullableFilter>;
  equals?: InputMaybe<IdSource>;
  in?: InputMaybe<Array<IdSource>>;
  not?: InputMaybe<IdSource>;
  notIn?: InputMaybe<Array<IdSource>>;
};

export type EnumImagePositionFieldUpdateOperationsInput = {
  set?: InputMaybe<ImagePosition>;
};

export type EnumImagePositionFilter = {
  equals?: InputMaybe<ImagePosition>;
  in?: InputMaybe<Array<ImagePosition>>;
  not?: InputMaybe<ImagePosition>;
  notIn?: InputMaybe<Array<ImagePosition>>;
};

export type EnumImagePositionWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumImagePositionFilter>;
  _min?: InputMaybe<NestedEnumImagePositionFilter>;
  equals?: InputMaybe<ImagePosition>;
  in?: InputMaybe<Array<ImagePosition>>;
  not?: InputMaybe<ImagePosition>;
  notIn?: InputMaybe<Array<ImagePosition>>;
};

export type EnumIncidentFormFieldFieldUpdateOperationsInput = {
  set?: InputMaybe<IncidentFormField>;
};

export type EnumIncidentFormFieldFilter = {
  equals?: InputMaybe<IncidentFormField>;
  in?: InputMaybe<Array<IncidentFormField>>;
  not?: InputMaybe<IncidentFormField>;
  notIn?: InputMaybe<Array<IncidentFormField>>;
};

export type EnumIncidentFormFieldWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumIncidentFormFieldFilter>;
  _min?: InputMaybe<NestedEnumIncidentFormFieldFilter>;
  equals?: InputMaybe<IncidentFormField>;
  in?: InputMaybe<Array<IncidentFormField>>;
  not?: InputMaybe<IncidentFormField>;
  notIn?: InputMaybe<Array<IncidentFormField>>;
};

export type EnumIncidentPriorityFieldUpdateOperationsInput = {
  set?: InputMaybe<IncidentPriority>;
};

export type EnumIncidentPriorityFilter = {
  equals?: InputMaybe<IncidentPriority>;
  in?: InputMaybe<Array<IncidentPriority>>;
  not?: InputMaybe<IncidentPriority>;
  notIn?: InputMaybe<Array<IncidentPriority>>;
};

export type EnumIntelTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<IntelType>;
};

export type EnumIntelTypeFilter = {
  equals?: InputMaybe<IntelType>;
  in?: InputMaybe<Array<IntelType>>;
  not?: InputMaybe<IntelType>;
  notIn?: InputMaybe<Array<IntelType>>;
};

export type EnumIntelTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumIntelTypeFilter>;
  _min?: InputMaybe<NestedEnumIntelTypeFilter>;
  equals?: InputMaybe<IntelType>;
  in?: InputMaybe<Array<IntelType>>;
  not?: InputMaybe<IntelType>;
  notIn?: InputMaybe<Array<IntelType>>;
};

export type EnumInvestigationStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<InvestigationStatus>;
};

export type EnumInvestigationStatusFilter = {
  equals?: InputMaybe<InvestigationStatus>;
  in?: InputMaybe<Array<InvestigationStatus>>;
  not?: InputMaybe<InvestigationStatus>;
  notIn?: InputMaybe<Array<InvestigationStatus>>;
};

export type EnumInvestigationStatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumInvestigationStatusFilter>;
  _min?: InputMaybe<NestedEnumInvestigationStatusFilter>;
  equals?: InputMaybe<InvestigationStatus>;
  in?: InputMaybe<Array<InvestigationStatus>>;
  not?: InputMaybe<InvestigationStatus>;
  notIn?: InputMaybe<Array<InvestigationStatus>>;
};

export type EnumLanguageCodeFieldUpdateOperationsInput = {
  set?: InputMaybe<LanguageCode>;
};

export type EnumLanguageCodeFilter = {
  equals?: InputMaybe<LanguageCode>;
  in?: InputMaybe<Array<LanguageCode>>;
  not?: InputMaybe<LanguageCode>;
  notIn?: InputMaybe<Array<LanguageCode>>;
};

export type EnumLanguageCodeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumLanguageCodeFilter>;
  _min?: InputMaybe<NestedEnumLanguageCodeFilter>;
  equals?: InputMaybe<LanguageCode>;
  in?: InputMaybe<Array<LanguageCode>>;
  not?: InputMaybe<LanguageCode>;
  notIn?: InputMaybe<Array<LanguageCode>>;
};

export type EnumMg11StatusFieldUpdateOperationsInput = {
  set?: InputMaybe<Mg11Status>;
};

export type EnumMg11StatusFilter = {
  equals?: InputMaybe<Mg11Status>;
  in?: InputMaybe<Array<Mg11Status>>;
  not?: InputMaybe<Mg11Status>;
  notIn?: InputMaybe<Array<Mg11Status>>;
};

export type EnumMg11StatusWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumMg11StatusFilter>;
  _min?: InputMaybe<NestedEnumMg11StatusFilter>;
  equals?: InputMaybe<Mg11Status>;
  in?: InputMaybe<Array<Mg11Status>>;
  not?: InputMaybe<Mg11Status>;
  notIn?: InputMaybe<Array<Mg11Status>>;
};

export type EnumModelFieldUpdateOperationsInput = {
  set?: InputMaybe<Model>;
};

export type EnumModelFilter = {
  equals?: InputMaybe<Model>;
  in?: InputMaybe<Array<Model>>;
  not?: InputMaybe<Model>;
  notIn?: InputMaybe<Array<Model>>;
};

export type EnumModelNullableFilter = {
  equals?: InputMaybe<Model>;
  in?: InputMaybe<Array<Model>>;
  not?: InputMaybe<Model>;
  notIn?: InputMaybe<Array<Model>>;
};

export type EnumModelNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumModelNullableFilter>;
  _min?: InputMaybe<NestedEnumModelNullableFilter>;
  equals?: InputMaybe<Model>;
  in?: InputMaybe<Array<Model>>;
  not?: InputMaybe<Model>;
  notIn?: InputMaybe<Array<Model>>;
};

export type EnumModelWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumModelFilter>;
  _min?: InputMaybe<NestedEnumModelFilter>;
  equals?: InputMaybe<Model>;
  in?: InputMaybe<Array<Model>>;
  not?: InputMaybe<Model>;
  notIn?: InputMaybe<Array<Model>>;
};

export type EnumOnboardStepsFieldUpdateOperationsInput = {
  set?: InputMaybe<OnboardSteps>;
};

export type EnumOnboardStepsFilter = {
  equals?: InputMaybe<OnboardSteps>;
  in?: InputMaybe<Array<OnboardSteps>>;
  not?: InputMaybe<OnboardSteps>;
  notIn?: InputMaybe<Array<OnboardSteps>>;
};

export type EnumOnboardStepsWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumOnboardStepsFilter>;
  _min?: InputMaybe<NestedEnumOnboardStepsFilter>;
  equals?: InputMaybe<OnboardSteps>;
  in?: InputMaybe<Array<OnboardSteps>>;
  not?: InputMaybe<OnboardSteps>;
  notIn?: InputMaybe<Array<OnboardSteps>>;
};

export type EnumPermissionMethodListFilter = {
  equals?: InputMaybe<Array<PermissionMethod>>;
  has?: InputMaybe<PermissionMethod>;
  hasEvery?: InputMaybe<Array<PermissionMethod>>;
  hasSome?: InputMaybe<Array<PermissionMethod>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type EnumPermissionModelListFilter = {
  equals?: InputMaybe<PermissionModel>;
  in?: InputMaybe<Array<PermissionModel>>;
  not?: InputMaybe<PermissionModel>;
  notIn?: InputMaybe<Array<PermissionModel>>;
};

export type EnumPoliceForceNullableListFilter = {
  equals?: InputMaybe<Array<PoliceForce>>;
  has?: InputMaybe<PoliceForce>;
  hasEvery?: InputMaybe<Array<PoliceForce>>;
  hasSome?: InputMaybe<Array<PoliceForce>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type EnumPoliceResponseTimeNullableFilter = {
  equals?: InputMaybe<PoliceResponseTime>;
  in?: InputMaybe<Array<PoliceResponseTime>>;
  not?: InputMaybe<PoliceResponseTime>;
  notIn?: InputMaybe<Array<PoliceResponseTime>>;
};

export type EnumPoliceResponseTimeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumPoliceResponseTimeNullableFilter>;
  _min?: InputMaybe<NestedEnumPoliceResponseTimeNullableFilter>;
  equals?: InputMaybe<PoliceResponseTime>;
  in?: InputMaybe<Array<PoliceResponseTime>>;
  not?: InputMaybe<PoliceResponseTime>;
  notIn?: InputMaybe<Array<PoliceResponseTime>>;
};

export type EnumPoliceTriageStatusFilter = {
  equals?: InputMaybe<PoliceTriageStatus>;
  in?: InputMaybe<Array<PoliceTriageStatus>>;
  not?: InputMaybe<NestedEnumPoliceTriageStatusFilter>;
  notIn?: InputMaybe<Array<PoliceTriageStatus>>;
};

export type EnumQuestionModelFieldUpdateOperationsInput = {
  set?: InputMaybe<QuestionModel>;
};

export type EnumQuestionModelFilter = {
  equals?: InputMaybe<QuestionModel>;
  in?: InputMaybe<Array<QuestionModel>>;
  not?: InputMaybe<QuestionModel>;
  notIn?: InputMaybe<Array<QuestionModel>>;
};

export type EnumQuestionModelWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumQuestionModelFilter>;
  _min?: InputMaybe<NestedEnumQuestionModelFilter>;
  equals?: InputMaybe<QuestionModel>;
  in?: InputMaybe<Array<QuestionModel>>;
  not?: InputMaybe<QuestionModel>;
  notIn?: InputMaybe<Array<QuestionModel>>;
};

export type EnumRaceNullableFilter = {
  equals?: InputMaybe<Race>;
  in?: InputMaybe<Array<Race>>;
  not?: InputMaybe<Race>;
  notIn?: InputMaybe<Array<Race>>;
};

export type EnumRaceNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumRaceNullableFilter>;
  _min?: InputMaybe<NestedEnumRaceNullableFilter>;
  equals?: InputMaybe<Race>;
  in?: InputMaybe<Array<Race>>;
  not?: InputMaybe<Race>;
  notIn?: InputMaybe<Array<Race>>;
};

export type EnumReportTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<ReportType>;
};

export type EnumReportTypeFilter = {
  equals?: InputMaybe<ReportType>;
  in?: InputMaybe<Array<ReportType>>;
  not?: InputMaybe<ReportType>;
  notIn?: InputMaybe<Array<ReportType>>;
};

export type EnumReportTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumReportTypeFilter>;
  _min?: InputMaybe<NestedEnumReportTypeFilter>;
  equals?: InputMaybe<ReportType>;
  in?: InputMaybe<Array<ReportType>>;
  not?: InputMaybe<ReportType>;
  notIn?: InputMaybe<Array<ReportType>>;
};

export type EnumRoleFieldUpdateOperationsInput = {
  set?: InputMaybe<Role>;
};

export type EnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<Role>;
  notIn?: InputMaybe<Array<Role>>;
};

export type EnumRoleWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumRoleFilter>;
  _min?: InputMaybe<NestedEnumRoleFilter>;
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<Role>;
  notIn?: InputMaybe<Array<Role>>;
};

export type EnumShoeSideFilter = {
  equals?: InputMaybe<ShoeSide>;
  in?: InputMaybe<Array<ShoeSide>>;
  not?: InputMaybe<ShoeSide>;
  notIn?: InputMaybe<Array<ShoeSide>>;
};

export type EnumShoeStatusFilter = {
  equals?: InputMaybe<ShoeStatus>;
  in?: InputMaybe<Array<ShoeStatus>>;
  not?: InputMaybe<ShoeStatus>;
  notIn?: InputMaybe<Array<ShoeStatus>>;
};

export type EnumShoeTypeFilter = {
  equals?: InputMaybe<ShoeType>;
  in?: InputMaybe<Array<ShoeType>>;
  not?: InputMaybe<ShoeType>;
  notIn?: InputMaybe<Array<ShoeType>>;
};

export type EnumTagTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<TagType>;
};

export type EnumTagTypeFilter = {
  equals?: InputMaybe<TagType>;
  in?: InputMaybe<Array<TagType>>;
  not?: InputMaybe<TagType>;
  notIn?: InputMaybe<Array<TagType>>;
};

export type EnumTagTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumTagTypeFilter>;
  _min?: InputMaybe<NestedEnumTagTypeFilter>;
  equals?: InputMaybe<TagType>;
  in?: InputMaybe<Array<TagType>>;
  not?: InputMaybe<TagType>;
  notIn?: InputMaybe<Array<TagType>>;
};

export type EnumTodoTypeNullableFilter = {
  equals?: InputMaybe<TodoType>;
  in?: InputMaybe<Array<TodoType>>;
  not?: InputMaybe<TodoType>;
  notIn?: InputMaybe<Array<TodoType>>;
};

export type EnumTodoTypeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumTodoTypeNullableFilter>;
  _min?: InputMaybe<NestedEnumTodoTypeNullableFilter>;
  equals?: InputMaybe<TodoType>;
  in?: InputMaybe<Array<TodoType>>;
  not?: InputMaybe<TodoType>;
  notIn?: InputMaybe<Array<TodoType>>;
};

export type EnumUpdateIconFieldUpdateOperationsInput = {
  set?: InputMaybe<UpdateIcon>;
};

export type EnumUpdateIconFilter = {
  equals?: InputMaybe<UpdateIcon>;
  in?: InputMaybe<Array<UpdateIcon>>;
  not?: InputMaybe<UpdateIcon>;
  notIn?: InputMaybe<Array<UpdateIcon>>;
};

export type EnumUpdateIconWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumUpdateIconFilter>;
  _min?: InputMaybe<NestedEnumUpdateIconFilter>;
  equals?: InputMaybe<UpdateIcon>;
  in?: InputMaybe<Array<UpdateIcon>>;
  not?: InputMaybe<UpdateIcon>;
  notIn?: InputMaybe<Array<UpdateIcon>>;
};

export type EnumUpdateTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<UpdateType>;
};

export type EnumUpdateTypeFilter = {
  equals?: InputMaybe<UpdateType>;
  in?: InputMaybe<Array<UpdateType>>;
  not?: InputMaybe<UpdateType>;
  notIn?: InputMaybe<Array<UpdateType>>;
};

export type EnumUpdateTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumUpdateTypeFilter>;
  _min?: InputMaybe<NestedEnumUpdateTypeFilter>;
  equals?: InputMaybe<UpdateType>;
  in?: InputMaybe<Array<UpdateType>>;
  not?: InputMaybe<UpdateType>;
  notIn?: InputMaybe<Array<UpdateType>>;
};

export type EnumUserStatusNullableFilter = {
  equals?: InputMaybe<UserStatus>;
  in?: InputMaybe<Array<UserStatus>>;
  not?: InputMaybe<UserStatus>;
  notIn?: InputMaybe<Array<UserStatus>>;
};

export type EnumUserStatusNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumUserStatusNullableFilter>;
  _min?: InputMaybe<NestedEnumUserStatusNullableFilter>;
  equals?: InputMaybe<UserStatus>;
  in?: InputMaybe<Array<UserStatus>>;
  not?: InputMaybe<UserStatus>;
  notIn?: InputMaybe<Array<UserStatus>>;
};

export type EnumUserTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<UserType>;
};

export type EnumUserTypeFilter = {
  equals?: InputMaybe<UserType>;
  in?: InputMaybe<Array<UserType>>;
  not?: InputMaybe<UserType>;
  notIn?: InputMaybe<Array<UserType>>;
};

export type EnumUserTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumUserTypeFilter>;
  _min?: InputMaybe<NestedEnumUserTypeFilter>;
  equals?: InputMaybe<UserType>;
  in?: InputMaybe<Array<UserType>>;
  not?: InputMaybe<UserType>;
  notIn?: InputMaybe<Array<UserType>>;
};

export type EnumWhenNullableFilter = {
  equals?: InputMaybe<When>;
  in?: InputMaybe<Array<When>>;
  not?: InputMaybe<When>;
  notIn?: InputMaybe<Array<When>>;
};

export type EnumWhenNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedEnumWhenNullableFilter>;
  _min?: InputMaybe<NestedEnumWhenNullableFilter>;
  equals?: InputMaybe<When>;
  in?: InputMaybe<Array<When>>;
  not?: InputMaybe<When>;
  notIn?: InputMaybe<Array<When>>;
};

export type EnumWorkflowActionTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<WorkflowActionType>;
};

export type EnumWorkflowActionTypeFilter = {
  equals?: InputMaybe<WorkflowActionType>;
  in?: InputMaybe<Array<WorkflowActionType>>;
  not?: InputMaybe<WorkflowActionType>;
  notIn?: InputMaybe<Array<WorkflowActionType>>;
};

export type EnumWorkflowActionTypeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumWorkflowActionTypeFilter>;
  _min?: InputMaybe<NestedEnumWorkflowActionTypeFilter>;
  equals?: InputMaybe<WorkflowActionType>;
  in?: InputMaybe<Array<WorkflowActionType>>;
  not?: InputMaybe<WorkflowActionType>;
  notIn?: InputMaybe<Array<WorkflowActionType>>;
};

export type EnumWorkflowTriggerFieldUpdateOperationsInput = {
  set?: InputMaybe<WorkflowTrigger>;
};

export type EnumWorkflowTriggerFilter = {
  equals?: InputMaybe<WorkflowTrigger>;
  in?: InputMaybe<Array<WorkflowTrigger>>;
  not?: InputMaybe<WorkflowTrigger>;
  notIn?: InputMaybe<Array<WorkflowTrigger>>;
};

export type EnumWorkflowTriggerWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedEnumWorkflowTriggerFilter>;
  _min?: InputMaybe<NestedEnumWorkflowTriggerFilter>;
  equals?: InputMaybe<WorkflowTrigger>;
  in?: InputMaybe<Array<WorkflowTrigger>>;
  not?: InputMaybe<WorkflowTrigger>;
  notIn?: InputMaybe<Array<WorkflowTrigger>>;
};

export type EventData = {
  __typename?: 'EventData';
  sendEmail?: Maybe<SendEmailData>;
  sendNotification?: Maybe<SendNotificationData>;
  sendSMS?: Maybe<SendSmsData>;
  task?: Maybe<TaskData>;
};

export type EventDataInput = {
  sendEmail?: InputMaybe<SendEmailInput>;
  sendNotification?: InputMaybe<SendNotificationInput>;
  sendSMS?: InputMaybe<SendSmsInput>;
  task?: InputMaybe<TaskInput>;
};

export type ExpoPushToken = {
  __typename?: 'ExpoPushToken';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  token: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type ExpoPushTokenListRelationFilter = {
  every?: InputMaybe<ExpoPushTokenWhereInput>;
  none?: InputMaybe<ExpoPushTokenWhereInput>;
  some?: InputMaybe<ExpoPushTokenWhereInput>;
};

export type ExpoPushTokenOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ExpoPushTokenWhereInput = {
  AND?: InputMaybe<Array<ExpoPushTokenWhereInput>>;
  NOT?: InputMaybe<Array<ExpoPushTokenWhereInput>>;
  OR?: InputMaybe<Array<ExpoPushTokenWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  token?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type ExtractedGoods = {
  __typename?: 'ExtractedGoods';
  brand?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Float']>;
};

export type ExtractedIncidentData = {
  __typename?: 'ExtractedIncidentData';
  confidence?: Maybe<Scalars['Float']>;
  datetime?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  goods?: Maybe<Array<ExtractedGoods>>;
  incidentType?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  offenders?: Maybe<Array<ExtractedOffender>>;
  policeInvolved?: Maybe<Scalars['Boolean']>;
  policeRef?: Maybe<Scalars['String']>;
  vehicles?: Maybe<Array<ExtractedVehicle>>;
};

export type ExtractedOffender = {
  __typename?: 'ExtractedOffender';
  age?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ExtractedVehicle = {
  __typename?: 'ExtractedVehicle';
  color?: Maybe<Scalars['String']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  registration?: Maybe<Scalars['String']>;
};

export type FaceDetectorComparisonInput = {
  age?: InputMaybe<Scalars['Int']>;
  boundingBox: Array<Scalars['Int']>;
  gender?: InputMaybe<Scalars['String']>;
};

export type FaceInput = {
  blur: Scalars['Boolean'];
  height: Scalars['Float'];
  left: Scalars['Float'];
  top: Scalars['Float'];
  width: Scalars['Float'];
};

export type FaceMatch = {
  __typename?: 'FaceMatch';
  confidence: Scalars['Float'];
  offenderId: Scalars['String'];
  offenderName: Scalars['String'];
  similarity: Scalars['Float'];
};

export enum FaceSource {
  Aws = 'AWS',
  Custom = 'CUSTOM'
}

export type FeatureAdoptionRate = {
  __typename?: 'FeatureAdoptionRate';
  /** Percentage of users who have used this feature */
  adoptionRate: Scalars['Float'];
  /** Average number of items created per user */
  averagePerUser: Scalars['Float'];
  /** Name of the feature */
  featureName: Scalars['String'];
  /** Total number of items created for this feature */
  totalCount: Scalars['Int'];
  /** Usage trend (increasing, decreasing, stable) */
  trend?: Maybe<Scalars['String']>;
  /** Number of unique users who used this feature */
  uniqueUsers: Scalars['Int'];
};

export enum Features {
  Activities = 'ACTIVITIES',
  AdvancedActivities = 'ADVANCED_ACTIVITIES',
  AdvancedDashboard = 'ADVANCED_DASHBOARD',
  AdvancedIncidentReports = 'ADVANCED_INCIDENT_REPORTS',
  AdvancedReports = 'ADVANCED_REPORTS',
  AiCentre = 'AI_CENTRE',
  AnprMatching = 'ANPR_MATCHING',
  Articles = 'ARTICLES',
  AuditTrail = 'AUDIT_TRAIL',
  Bans = 'BANS',
  Brands = 'BRANDS',
  Businesses = 'BUSINESSES',
  Chat = 'CHAT',
  Checklist = 'CHECKLIST',
  CrimeGroups = 'CRIME_GROUPS',
  CrimeGroupMapping = 'CRIME_GROUP_MAPPING',
  Dashboard = 'DASHBOARD',
  DataSharing = 'DATA_SHARING',
  Documents = 'DOCUMENTS',
  EmergencyAlerts = 'EMERGENCY_ALERTS',
  Evidence = 'EVIDENCE',
  FaceDetection = 'FACE_DETECTION',
  FaceRecognition = 'FACE_RECOGNITION',
  Groups = 'GROUPS',
  Incidents = 'INCIDENTS',
  Investigations = 'INVESTIGATIONS',
  InvestigationMapping = 'INVESTIGATION_MAPPING',
  LinkSuggestions = 'LINK_SUGGESTIONS',
  Offenders = 'OFFENDERS',
  OffenderAddresses = 'OFFENDER_ADDRESSES',
  Patrol = 'PATROL',
  Rebranding = 'REBRANDING',
  Reports = 'REPORTS',
  SingleShoe = 'SINGLE_SHOE',
  Smartdem = 'SMARTDEM',
  SubjectAccessRequests = 'SUBJECT_ACCESS_REQUESTS',
  Users = 'USERS',
  UserRoles = 'USER_ROLES',
  Vehicles = 'VEHICLES',
  WitnessStatements = 'WITNESS_STATEMENTS',
  Workflows = 'WORKFLOWS'
}

export type FeedItem = {
  __typename?: 'FeedItem';
  article?: Maybe<Article>;
  articleId?: Maybe<Scalars['String']>;
  ban?: Maybe<Ban>;
  banId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']>;
  crimeGroup?: Maybe<CrimeGroup>;
  crimeGroupId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  groups: Array<Group>;
  id: Scalars['ID'];
  images: Array<Image>;
  incident?: Maybe<Incident>;
  incidentId?: Maybe<Scalars['String']>;
  investigation?: Maybe<Investigation>;
  investigationId?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  model?: Maybe<Model>;
  offender?: Maybe<Offender>;
  offenderId?: Maybe<Scalars['String']>;
  schemes: Array<Scheme>;
  type: FeedItemType;
  updatedAt: Scalars['Date'];
  vehicle?: Maybe<Vehicle>;
  vehicleId?: Maybe<Scalars['String']>;
};


export type FeedItemGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type FeedItemImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


export type FeedItemSchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};

export type FeedItemListRelationFilter = {
  every?: InputMaybe<FeedItemWhereInput>;
  none?: InputMaybe<FeedItemWhereInput>;
  some?: InputMaybe<FeedItemWhereInput>;
};

export type FeedItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FeedItemOrderByWithRelationInput = {
  article?: InputMaybe<ArticleOrderByWithRelationInput>;
  articleId?: InputMaybe<SortOrder>;
  ban?: InputMaybe<BanOrderByWithRelationInput>;
  banId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  crimeGroup?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  crimeGroupId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  investigation?: InputMaybe<InvestigationOrderByWithRelationInput>;
  investigationId?: InputMaybe<SortOrder>;
  message?: InputMaybe<SortOrder>;
  model?: InputMaybe<SortOrder>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  vehicle?: InputMaybe<VehicleOrderByWithRelationInput>;
  vehicleId?: InputMaybe<SortOrder>;
};

export enum FeedItemScalarFieldEnum {
  ArticleId = 'articleId',
  BanId = 'banId',
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  CrimeGroupId = 'crimeGroupId',
  Description = 'description',
  Id = 'id',
  IncidentId = 'incidentId',
  InvestigationId = 'investigationId',
  Message = 'message',
  Model = 'model',
  OffenderId = 'offenderId',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  VehicleId = 'vehicleId'
}

export type FeedItemScalarWhereInput = {
  AND?: InputMaybe<Array<FeedItemScalarWhereInput>>;
  NOT?: InputMaybe<Array<FeedItemScalarWhereInput>>;
  OR?: InputMaybe<Array<FeedItemScalarWhereInput>>;
  articleId?: InputMaybe<StringNullableFilter>;
  banId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringNullableFilter>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigationId?: InputMaybe<StringNullableFilter>;
  message?: InputMaybe<StringFilter>;
  model?: InputMaybe<EnumModelNullableFilter>;
  offenderId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumFeedItemTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export type FeedItemScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<FeedItemScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<FeedItemScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<FeedItemScalarWhereWithAggregatesInput>>;
  articleId?: InputMaybe<StringNullableWithAggregatesFilter>;
  banId?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  createdById?: InputMaybe<StringNullableWithAggregatesFilter>;
  crimeGroupId?: InputMaybe<StringNullableWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentId?: InputMaybe<StringNullableWithAggregatesFilter>;
  investigationId?: InputMaybe<StringNullableWithAggregatesFilter>;
  message?: InputMaybe<StringWithAggregatesFilter>;
  model?: InputMaybe<EnumModelNullableWithAggregatesFilter>;
  offenderId?: InputMaybe<StringNullableWithAggregatesFilter>;
  type?: InputMaybe<EnumFeedItemTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  vehicleId?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export enum FeedItemType {
  CrimegroupIntel = 'CRIMEGROUP_INTEL',
  Incident = 'INCIDENT',
  IncidentImage = 'INCIDENT_IMAGE',
  IncidentIntel = 'INCIDENT_INTEL',
  Investigation = 'INVESTIGATION',
  InvestigationImage = 'INVESTIGATION_IMAGE',
  InvestigationIntel = 'INVESTIGATION_INTEL',
  NewArticle = 'NEW_ARTICLE',
  NewBan = 'NEW_BAN',
  NewCrimegroup = 'NEW_CRIMEGROUP',
  NewIncident = 'NEW_INCIDENT',
  NewInvestigation = 'NEW_INVESTIGATION',
  NewOffender = 'NEW_OFFENDER',
  NewVehicle = 'NEW_VEHICLE',
  Offender = 'OFFENDER',
  OffenderImage = 'OFFENDER_IMAGE',
  OffenderIntel = 'OFFENDER_INTEL',
  OffenderUpdate = 'OFFENDER_UPDATE',
  VehicleImage = 'VEHICLE_IMAGE',
  VehicleIntel = 'VEHICLE_INTEL'
}

export type FeedItemWhereInput = {
  AND?: InputMaybe<Array<FeedItemWhereInput>>;
  NOT?: InputMaybe<Array<FeedItemWhereInput>>;
  OR?: InputMaybe<Array<FeedItemWhereInput>>;
  article?: InputMaybe<ArticleWhereInput>;
  articleId?: InputMaybe<StringNullableFilter>;
  ban?: InputMaybe<BanWhereInput>;
  banId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringNullableFilter>;
  crimeGroup?: InputMaybe<CrimeGroupWhereInput>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigation?: InputMaybe<InvestigationWhereInput>;
  investigationId?: InputMaybe<StringNullableFilter>;
  message?: InputMaybe<StringFilter>;
  model?: InputMaybe<EnumModelNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  type?: InputMaybe<EnumFeedItemTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicle?: InputMaybe<VehicleWhereInput>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export type FeedItemWhereUniqueInput = {
  AND?: InputMaybe<Array<FeedItemWhereInput>>;
  NOT?: InputMaybe<Array<FeedItemWhereInput>>;
  OR?: InputMaybe<Array<FeedItemWhereInput>>;
  article?: InputMaybe<ArticleWhereInput>;
  articleId?: InputMaybe<StringNullableFilter>;
  ban?: InputMaybe<BanWhereInput>;
  banId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringNullableFilter>;
  crimeGroup?: InputMaybe<CrimeGroupWhereInput>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageListRelationFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigation?: InputMaybe<InvestigationWhereInput>;
  investigationId?: InputMaybe<StringNullableFilter>;
  message?: InputMaybe<StringFilter>;
  model?: InputMaybe<EnumModelNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  type?: InputMaybe<EnumFeedItemTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicle?: InputMaybe<VehicleWhereInput>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export enum FileType {
  Audio = 'AUDIO',
  Document = 'DOCUMENT',
  Image = 'IMAGE',
  Unknown = 'UNKNOWN',
  Video = 'VIDEO'
}

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type FloatNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedFloatNullableFilter>;
  _min?: InputMaybe<NestedFloatNullableFilter>;
  _sum?: InputMaybe<NestedFloatNullableFilter>;
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type FloatWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedFloatFilter>;
  _min?: InputMaybe<NestedFloatFilter>;
  _sum?: InputMaybe<NestedFloatFilter>;
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type Flow = {
  __typename?: 'Flow';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  edges: Array<FlowEdge>;
  id: Scalars['ID'];
  investigation: Investigation;
  name: Scalars['String'];
  nodes: Array<FlowNode>;
  updatedAt: Scalars['Date'];
};

export type FlowEdge = {
  __typename?: 'FlowEdge';
  createdAt: Scalars['Date'];
  flow: Flow;
  id: Scalars['ID'];
  markerEnd: Scalars['JSON'];
  source: Scalars['String'];
  sourceHandle?: Maybe<Scalars['String']>;
  target: Scalars['String'];
  targetHandle?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type FlowEdgeListRelationFilter = {
  every?: InputMaybe<FlowEdgeWhereInput>;
  none?: InputMaybe<FlowEdgeWhereInput>;
  some?: InputMaybe<FlowEdgeWhereInput>;
};

export type FlowEdgeWhereInput = {
  AND?: InputMaybe<Array<FlowEdgeWhereInput>>;
  NOT?: InputMaybe<Array<FlowEdgeWhereInput>>;
  OR?: InputMaybe<Array<FlowEdgeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  flow?: InputMaybe<FlowWhereInput>;
  flowId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  markerEnd?: InputMaybe<JsonFilter>;
  source?: InputMaybe<StringFilter>;
  sourceHandle?: InputMaybe<StringNullableFilter>;
  target?: InputMaybe<StringFilter>;
  targetHandle?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FlowListRelationFilter = {
  every?: InputMaybe<FlowWhereInput>;
  none?: InputMaybe<FlowWhereInput>;
  some?: InputMaybe<FlowWhereInput>;
};

export type FlowNode = {
  __typename?: 'FlowNode';
  createdAt: Scalars['Date'];
  data: Scalars['JSON'];
  flow: Flow;
  height: Scalars['Int'];
  id: Scalars['ID'];
  position: Xy;
  positionAbX: Scalars['Int'];
  positionAbY: Scalars['Int'];
  positionAbsolute: Xy;
  positionX: Scalars['Int'];
  positionY: Scalars['Int'];
  style: Style;
  type: Scalars['String'];
  updatedAt: Scalars['Date'];
  width: Scalars['Int'];
};

export type FlowNodeListRelationFilter = {
  every?: InputMaybe<FlowNodeWhereInput>;
  none?: InputMaybe<FlowNodeWhereInput>;
  some?: InputMaybe<FlowNodeWhereInput>;
};

export type FlowNodeWhereInput = {
  AND?: InputMaybe<Array<FlowNodeWhereInput>>;
  NOT?: InputMaybe<Array<FlowNodeWhereInput>>;
  OR?: InputMaybe<Array<FlowNodeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  data?: InputMaybe<JsonFilter>;
  flow?: InputMaybe<FlowWhereInput>;
  flowId?: InputMaybe<StringFilter>;
  height?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  positionAbX?: InputMaybe<IntFilter>;
  positionAbY?: InputMaybe<IntFilter>;
  positionX?: InputMaybe<IntFilter>;
  positionY?: InputMaybe<IntFilter>;
  type?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  width?: InputMaybe<IntFilter>;
};

export type FlowOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlowWhereInput = {
  AND?: InputMaybe<Array<FlowWhereInput>>;
  NOT?: InputMaybe<Array<FlowWhereInput>>;
  OR?: InputMaybe<Array<FlowWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  edges?: InputMaybe<FlowEdgeListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  investigation?: InputMaybe<InvestigationWhereInput>;
  investigationId?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodes?: InputMaybe<FlowNodeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Folder = {
  __typename?: 'Folder';
  childFolders: Array<Folder>;
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  documents: Array<Document>;
  id: Scalars['ID'];
  name: Scalars['String'];
  parentFolder?: Maybe<Folder>;
  parentFolderId?: Maybe<Scalars['String']>;
  roles: Array<CustomRole>;
  scheme?: Maybe<Scheme>;
  schemeId?: Maybe<Scalars['String']>;
  totalChildFolders: Scalars['Int'];
  totalDocuments: Scalars['Int'];
  updatedAt: Scalars['Date'];
};


export type FolderChildFoldersArgs = {
  cursor?: InputMaybe<FolderWhereUniqueInput>;
  distinct?: InputMaybe<FolderScalarFieldEnum>;
  orderBy?: InputMaybe<FolderOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FolderWhereInput>;
};


export type FolderDocumentsArgs = {
  cursor?: InputMaybe<DocumentWhereUniqueInput>;
  distinct?: InputMaybe<Array<DocumentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DocumentWhereInput>;
};

export type FolderListRelationFilter = {
  every?: InputMaybe<FolderWhereInput>;
  none?: InputMaybe<FolderWhereInput>;
  some?: InputMaybe<FolderWhereInput>;
};

export type FolderOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FolderOrderByWithRelationInput = {
  childFolders?: InputMaybe<FolderOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  documents?: InputMaybe<DocumentOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  parentFolder?: InputMaybe<FolderOrderByWithRelationInput>;
  parentFolderId?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum FolderScalarFieldEnum {
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  Description = 'description',
  Id = 'id',
  Name = 'name',
  ParentFolderId = 'parentFolderId',
  SchemeId = 'schemeId',
  UpdatedAt = 'updatedAt'
}

export type FolderWhereInput = {
  AND?: InputMaybe<Array<FolderWhereInput>>;
  NOT?: InputMaybe<Array<FolderWhereInput>>;
  OR?: InputMaybe<Array<FolderWhereInput>>;
  childFolders?: InputMaybe<FolderListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  documents?: InputMaybe<DocumentListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  parentFolderId?: InputMaybe<StringNullableFilter>;
  recycled?: InputMaybe<BoolFilter>;
  roles?: InputMaybe<CustomRoleListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  search?: InputMaybe<Array<FolderWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FolderWhereUniqueInput = {
  AND?: InputMaybe<Array<FolderWhereInput>>;
  NOT?: InputMaybe<Array<FolderWhereInput>>;
  OR?: InputMaybe<Array<FolderWhereInput>>;
  childFolders?: InputMaybe<FolderListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  documents?: InputMaybe<DocumentListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<StringFilter>;
  parentFolder?: InputMaybe<FolderWhereInput>;
  parentFolderId?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FormData = {
  __typename?: 'FormData';
  CUSTOM?: Maybe<Scalars['JSON']>;
  DETAILS?: Maybe<FormFieldDetails>;
  GOODS?: Maybe<Array<ExtractedGoods>>;
  OFFENDERS?: Maybe<Array<ExtractedOffender>>;
  POLICE?: Maybe<FormFieldPolice>;
  VEHICLES?: Maybe<Array<ExtractedVehicle>>;
  WHERE?: Maybe<FormFieldWhere>;
};

export type FormField = {
  __typename?: 'FormField';
  conditions: Array<Scalars['JSON']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  incidentForm?: Maybe<IncidentForm>;
  metadata?: Maybe<Scalars['JSON']>;
  position: Scalars['Int'];
  tooltip?: Maybe<Scalars['String']>;
  type: IncidentFormField;
  updatedAt: Scalars['Date'];
};

export type FormFieldDetails = {
  __typename?: 'FormFieldDetails';
  date?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};

export type FormFieldListRelationFilter = {
  every?: InputMaybe<FormFieldWhereInput>;
  none?: InputMaybe<FormFieldWhereInput>;
  some?: InputMaybe<FormFieldWhereInput>;
};

export type FormFieldOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FormFieldPolice = {
  __typename?: 'FormFieldPolice';
  reference?: Maybe<Scalars['String']>;
  reported?: Maybe<Scalars['Boolean']>;
};

export type FormFieldScalarWhereInput = {
  AND?: InputMaybe<Array<FormFieldScalarWhereInput>>;
  NOT?: InputMaybe<Array<FormFieldScalarWhereInput>>;
  OR?: InputMaybe<Array<FormFieldScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incidentFormId?: InputMaybe<StringNullableFilter>;
  position?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumIncidentFormFieldFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FormFieldScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<FormFieldScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<FormFieldScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<FormFieldScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentFormId?: InputMaybe<StringNullableWithAggregatesFilter>;
  position?: InputMaybe<IntWithAggregatesFilter>;
  type?: InputMaybe<EnumIncidentFormFieldWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type FormFieldWhere = {
  __typename?: 'FormFieldWhere';
  businessId?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};

export type FormFieldWhereInput = {
  AND?: InputMaybe<Array<FormFieldWhereInput>>;
  NOT?: InputMaybe<Array<FormFieldWhereInput>>;
  OR?: InputMaybe<Array<FormFieldWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incidentForm?: InputMaybe<IncidentFormWhereInput>;
  incidentFormId?: InputMaybe<StringNullableFilter>;
  position?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumIncidentFormFieldFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN'
}

export type GenerateOffenderBulletinData = {
  context?: InputMaybe<Scalars['String']>;
};

export type GenerateOffenderBulletinWhere = {
  id: Scalars['String'];
};

export type GenerateStatementCctv = {
  aheadBehind?: InputMaybe<Scalars['String']>;
  correctTime?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['DateTime']>;
  incorrectBy?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['DateTime']>;
};

export type GenerateStatementData = {
  businessId?: InputMaybe<Scalars['String']>;
  cctv: Array<GenerateStatementCctv>;
  date: Scalars['DateTime'];
  dayNight?: InputMaybe<Scalars['Boolean']>;
  description: Scalars['String'];
  distanceFromIncident?: InputMaybe<Scalars['String']>;
  impactTags: Array<Scalars['String']>;
  inBuilding?: InputMaybe<Scalars['Boolean']>;
  incidentDuration?: InputMaybe<Scalars['String']>;
  incidentType: Scalars['String'];
  involvedTags: Array<Scalars['String']>;
  items?: InputMaybe<Array<GenerateStatementItem>>;
  knownSubjects?: InputMaybe<Scalars['String']>;
  obstructions?: InputMaybe<Scalars['String']>;
  offenders: Array<GenerateStatementOffender>;
  policeItemsLocation?: InputMaybe<Array<Scalars['String']>>;
  policeItemsMO?: InputMaybe<Array<Scalars['String']>>;
  policeObstructionsDetails?: InputMaybe<Scalars['String']>;
  policeWitnessLength?: InputMaybe<Scalars['String']>;
  reasonToRemember?: InputMaybe<Scalars['String']>;
  timePassed?: InputMaybe<Scalars['String']>;
  vehicles: Array<GenerateStatementVehicles>;
  witnessedInPerson: Scalars['Boolean'];
};

export type GenerateStatementItem = {
  description?: InputMaybe<Scalars['String']>;
  goodsId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  recoveredQuantity?: InputMaybe<Scalars['Int']>;
  recoveredValue?: InputMaybe<Scalars['Float']>;
  stockItemId?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};

export type GenerateStatementOffender = {
  age?: InputMaybe<Age>;
  alias?: InputMaybe<Array<Scalars['String']>>;
  build?: InputMaybe<Build>;
  characteristics?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
  ethnicity?: InputMaybe<Race>;
  hair?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Height>;
  name?: InputMaybe<Scalars['String']>;
  sex?: InputMaybe<Gender>;
};

export type GenerateStatementVehicles = {
  colour?: InputMaybe<Scalars['String']>;
  make?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  registrationPlate?: InputMaybe<Scalars['String']>;
};

export type GeneratedReportLayoutResult = {
  __typename?: 'GeneratedReportLayoutResult';
  layout: Array<Scalars['JSON']>;
  metaData: Array<Scalars['JSON']>;
};

export type GeneratedStatementBody = {
  __typename?: 'GeneratedStatementBody';
  statement: Scalars['String'];
};

export type GeoIp = {
  __typename?: 'GeoIp';
  city?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  countryName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['Float']>;
  loginEvents: Array<LoginEvent>;
  longitude?: Maybe<Scalars['Float']>;
  postalCode?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type GeoIpInput = {
  cityName?: InputMaybe<Scalars['String']>;
  continentCode?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  countryCode3?: InputMaybe<Scalars['String']>;
  countryName?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  subdivisionCode?: InputMaybe<Scalars['String']>;
  subdivisionName?: InputMaybe<Scalars['String']>;
  timeZone?: InputMaybe<Scalars['String']>;
};

export type GeoIpOrderByWithRelationInput = {
  city?: InputMaybe<SortOrder>;
  countryCode?: InputMaybe<SortOrder>;
  countryName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  loginEvents?: InputMaybe<LoginEventOrderByRelationAggregateInput>;
  longitude?: InputMaybe<SortOrder>;
  postalCode?: InputMaybe<SortOrder>;
  region?: InputMaybe<SortOrder>;
  timezone?: InputMaybe<SortOrder>;
};

export type GeoIpScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GeoIpScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<GeoIpScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GeoIpScalarWhereWithAggregatesInput>>;
  city?: InputMaybe<StringNullableWithAggregatesFilter>;
  countryCode?: InputMaybe<StringNullableWithAggregatesFilter>;
  countryName?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  latitude?: InputMaybe<FloatNullableWithAggregatesFilter>;
  longitude?: InputMaybe<FloatNullableWithAggregatesFilter>;
  postalCode?: InputMaybe<StringNullableWithAggregatesFilter>;
  region?: InputMaybe<StringNullableWithAggregatesFilter>;
  timezone?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type GeoIpWhereInput = {
  AND?: InputMaybe<Array<GeoIpWhereInput>>;
  NOT?: InputMaybe<Array<GeoIpWhereInput>>;
  OR?: InputMaybe<Array<GeoIpWhereInput>>;
  city?: InputMaybe<StringNullableFilter>;
  countryCode?: InputMaybe<StringNullableFilter>;
  countryName?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  latitude?: InputMaybe<FloatNullableFilter>;
  loginEvents?: InputMaybe<LoginEventListRelationFilter>;
  longitude?: InputMaybe<FloatNullableFilter>;
  postalCode?: InputMaybe<StringNullableFilter>;
  region?: InputMaybe<StringNullableFilter>;
  timezone?: InputMaybe<StringNullableFilter>;
};

export type GeographicalArea = {
  __typename?: 'GeographicalArea';
  areaType: Scalars['String'];
  /** Circle definition (only present when areaType is "circle"). Format: { latitude: number, longitude: number, radiusMeters: number } */
  circle?: Maybe<Scalars['JSON']>;
  color?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  /** Polygon definition (only present when areaType is "polygon"). Format: { coordinates: [[lng, lat], ...] } */
  polygon?: Maybe<Scalars['JSON']>;
  scheme: Scheme;
  schemeId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type GeographicalFilterInput = {
  /** Use a saved geographical area by ID */
  areaId?: InputMaybe<Scalars['String']>;
  /** Define a circular area inline */
  circle?: InputMaybe<CircleFilterInput>;
  /** Define a polygon area inline */
  polygon?: InputMaybe<PolygonFilterInput>;
};

export enum GoodsMode {
  Generic = 'GENERIC',
  Specific = 'SPECIFIC'
}

export type GoodsType = {
  __typename?: 'GoodsType';
  createdAt: Scalars['Date'];
  default: Scalars['Boolean'];
  id: Scalars['ID'];
  incidentItems: Array<IncidentItem>;
  name: Scalars['String'];
  schemes: Array<Scheme>;
  updatedAt: Scalars['Date'];
};

export type GoodsTypeOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incidentItems?: InputMaybe<IncidentItemOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  stockItems?: InputMaybe<StockItemOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GoodsTypeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<GoodsTypeScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<GoodsTypeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<GoodsTypeScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type GoodsTypeWhereInput = {
  AND?: InputMaybe<Array<GoodsTypeWhereInput>>;
  NOT?: InputMaybe<Array<GoodsTypeWhereInput>>;
  OR?: InputMaybe<Array<GoodsTypeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incidentItems?: InputMaybe<IncidentItemListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  stockItems?: InputMaybe<StockItemListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GoodsTypeWhereUniqueInput = {
  AND?: InputMaybe<Array<GoodsTypeWhereInput>>;
  NOT?: InputMaybe<Array<GoodsTypeWhereInput>>;
  OR?: InputMaybe<Array<GoodsTypeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  incidentItems?: InputMaybe<IncidentItemListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  stockItems?: InputMaybe<StockItemListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Graph = {
  __typename?: 'Graph';
  label: Scalars['String'];
  value: Scalars['Float'];
};

export enum GraphType {
  Area = 'area',
  Bar = 'bar',
  Line = 'line',
  Pie = 'pie'
}

export type Group = {
  __typename?: 'Group';
  approver: Array<User>;
  businessesCount: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  offenderSettings?: Maybe<OffenderSettings>;
  scheme: Scheme;
  schemeId: Scalars['String'];
  updatedAt: Scalars['Date'];
  uploaded: Scalars['Boolean'];
  users: Array<User>;
  usersCount: Scalars['Int'];
};


export type GroupApproverArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<UserScalarFieldEnum>;
  orderBy?: InputMaybe<UserOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type GroupUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<UserScalarFieldEnum>;
  orderBy?: InputMaybe<UserOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type GroupCreateInput = {
  approver?: InputMaybe<ConnectOnlyArrayHelper>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  offenderSettings?: InputMaybe<OffenderSettingsCreateInput>;
  scheme: ConnectHelper;
  users?: InputMaybe<ConnectOnlyArrayHelper>;
};

export type GroupKpiStat = {
  __typename?: 'GroupKpiStat';
  /** Average data quality score (0-100) */
  averageQualityScore: Scalars['Float'];
  /** Group ID */
  groupId: Scalars['String'];
  /** Group name */
  groupName: Scalars['String'];
  /** Number of offenders with at least one image */
  offendersWithImages: Scalars['Int'];
  /** Total number of incidents in the group */
  totalIncidents: Scalars['Int'];
  /** Total number of offenders in the group */
  totalOffenders: Scalars['Int'];
  /** Success rate (0-1) based on recovery rates */
  totalOutcomes: Scalars['Float'];
  /** Total number of ID verified offenders in the group */
  totalVerifiedOffenders: Scalars['Int'];
};

export type GroupListRelationFilter = {
  every?: InputMaybe<GroupWhereInput>;
  none?: InputMaybe<GroupWhereInput>;
  some?: InputMaybe<GroupWhereInput>;
};

export type GroupOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type GroupOrderByWithRelationInput = {
  approver?: InputMaybe<UserOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  crimeGroups?: InputMaybe<CrimeGroupOrderByRelationAggregateInput>;
  customGalleries?: InputMaybe<CustomGalleryOrderByRelationAggregateInput>;
  defaultGroupScheme?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  defaultGroupUser?: InputMaybe<UserOrderByRelationAggregateInput>;
  description?: InputMaybe<SortOrder>;
  feedItems?: InputMaybe<FeedItemOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uploaded?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
  vehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
};

export enum GroupScalarFieldEnum {
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  Name = 'name',
  SchemeId = 'schemeId',
  UpdatedAt = 'updatedAt',
  Uploaded = 'uploaded'
}

export type GroupSummary = {
  __typename?: 'GroupSummary';
  id: Scalars['String'];
  incidentTypeCount: Array<Graph>;
  name: Scalars['String'];
  totalIncidents: Scalars['Int'];
};

export enum GroupSyncStrategy {
  Merge = 'MERGE',
  Replace = 'REPLACE'
}

export type GroupUpdateInput = {
  approver?: InputMaybe<SetArrayHelper>;
  description?: InputMaybe<SetStringHelper>;
  name?: InputMaybe<SetStringHelper>;
  offenderSettings?: InputMaybe<OffenderSettingsUpdateInput>;
  users?: InputMaybe<UserUpdateManyWithoutGroups>;
};

export type GroupWhereInput = {
  AND?: InputMaybe<Array<GroupWhereInput>>;
  NOT?: InputMaybe<Array<GroupWhereInput>>;
  OR?: InputMaybe<Array<GroupWhereInput>>;
  approver?: InputMaybe<UserListRelationFilter>;
  bans?: InputMaybe<BanListRelationFilter>;
  businesses?: InputMaybe<BusinessListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  customGalleries?: InputMaybe<CustomGalleryListRelationFilter>;
  defaultGroupScheme?: InputMaybe<SchemeListRelationFilter>;
  defaultGroupUser?: InputMaybe<UserListRelationFilter>;
  description?: InputMaybe<StringNullableFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
  users?: InputMaybe<UserListRelationFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type GroupWhereUniqueInput = {
  AND?: InputMaybe<Array<GroupWhereInput>>;
  NOT?: InputMaybe<Array<GroupWhereInput>>;
  OR?: InputMaybe<Array<GroupWhereInput>>;
  approver?: InputMaybe<UserListRelationFilter>;
  bans?: InputMaybe<BanListRelationFilter>;
  businesses?: InputMaybe<BusinessListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  customGalleries?: InputMaybe<CustomGalleryListRelationFilter>;
  defaultGroupScheme?: InputMaybe<SchemeListRelationFilter>;
  defaultGroupUser?: InputMaybe<UserListRelationFilter>;
  description?: InputMaybe<StringNullableFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
  users?: InputMaybe<UserListRelationFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type GroupsConnectDisconnect = {
  connect?: InputMaybe<Array<Scalars['String']>>;
  disconnect?: InputMaybe<Array<Scalars['String']>>;
};

export type GroupsNestedSetConnectDisconnect = {
  connect?: InputMaybe<Array<UniqueId>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
  set?: InputMaybe<Array<UniqueId>>;
};

export type GroupsOnOffenderInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  disconnect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  set?: InputMaybe<Array<GroupWhereUniqueInput>>;
};

export type GroupsSet = {
  set?: InputMaybe<Array<UniqueId>>;
};

export type HeatChart = {
  __typename?: 'HeatChart';
  data: Array<XyHeat>;
  id: Scalars['String'];
};

export type HeatMapLatLng = {
  __typename?: 'HeatMapLatLng';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type HeatMapLocations = {
  __typename?: 'HeatMapLocations';
  id: Scalars['String'];
  location?: Maybe<LatLngId>;
};

export enum Height {
  Average = 'AVERAGE',
  Short = 'SHORT',
  Tall = 'TALL',
  Unknown = 'UNKNOWN'
}

export type HourCountXy = {
  __typename?: 'HourCountXY';
  x: Scalars['String'];
  y: Scalars['Int'];
};

export enum IdSource {
  Bcrp = 'BCRP',
  DrivingLicence = 'DRIVING_LICENCE',
  IdCard = 'ID_CARD',
  Known = 'KNOWN',
  Other = 'OTHER',
  Passport = 'PASSPORT',
  Police = 'POLICE'
}

export type IcelandColumnMapping = {
  dateColumn?: InputMaybe<Scalars['String']>;
  moColumn?: InputMaybe<Scalars['String']>;
  moColumn2?: InputMaybe<Scalars['String']>;
  noColumn?: InputMaybe<Scalars['String']>;
  offenderAddressColumn?: InputMaybe<Scalars['String']>;
  offenderNameColumn?: InputMaybe<Scalars['String']>;
  offenderSurnameColumn?: InputMaybe<Scalars['String']>;
  policeRefColumn?: InputMaybe<Scalars['String']>;
  timeColumn?: InputMaybe<Scalars['String']>;
  typeColumn?: InputMaybe<Scalars['String']>;
  valueColumn?: InputMaybe<Scalars['String']>;
};

export type IcelandIdInput = {
  id: Scalars['String'];
};

export type IcelandImportDataInput = {
  /** Optional mapping of CSV/Excel columns to incident fields */
  columnMapping?: InputMaybe<IcelandColumnMapping>;
  /** Base64 encoded CSV/Excel data or file content as string (auto-detects format) */
  csvData?: InputMaybe<Scalars['String']>;
  /** URL to download the CSV/Excel file from (e.g., Azure Blob Storage URL) */
  fileUrl?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<IcelandIdInput>>;
  scheme: IcelandIdInput;
};

export type Image = {
  __typename?: 'Image';
  card?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  faces: Array<RekFace>;
  id: Scalars['ID'];
  isFace?: Maybe<Scalars['Boolean']>;
  low?: Maybe<Scalars['String']>;
  offenders: Array<Offender>;
  optimised?: Maybe<Scalars['String']>;
  optimisedPersisted?: Maybe<Scalars['String']>;
  optimisticUri?: Maybe<Scalars['String']>;
  origImageUrl?: Maybe<Scalars['String']>;
  policeImage?: Maybe<Scalars['Boolean']>;
  position: ImagePosition;
  positionX?: Maybe<Scalars['Float']>;
  positionY?: Maybe<Scalars['Float']>;
  primary?: Maybe<Scalars['Boolean']>;
  recycled: Scalars['Boolean'];
  rekImage?: Maybe<Scalars['String']>;
  reportIcons: Array<Scheme>;
  rotation: Scalars['Int'];
  uploaded: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
  urlPersisted?: Maybe<Scalars['String']>;
};


export type ImageFacesArgs = {
  cursor?: InputMaybe<RekFaceWhereUniqueInput>;
  distinct?: InputMaybe<Array<RekFaceScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RekFaceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RekFaceWhereInput>;
};


export type ImageOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type ImageReportIconsArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};

export type ImageCreateNestedManyWithoutOffendersInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  optimistic?: InputMaybe<Array<CreateImageOptimistic>>;
  upload?: InputMaybe<Array<UploadOffenderImage>>;
};

export type ImageCreateNestedManyWithoutVehiclesInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  optimistic?: InputMaybe<Array<CreateImageOptimistic>>;
  upload?: InputMaybe<Array<UploadVehicleImage>>;
};

export type ImageListRelationFilter = {
  every?: InputMaybe<ImageWhereInput>;
  none?: InputMaybe<ImageWhereInput>;
  some?: InputMaybe<ImageWhereInput>;
};

export type ImageOffender = {
  id: Scalars['String'];
  new: Scalars['Boolean'];
};

export type ImageOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ImageOrderByWithRelationInput = {
  Scheme?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  artcleColumnId?: InputMaybe<SortOrder>;
  article?: InputMaybe<ArticleOrderByWithRelationInput>;
  card?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  faces?: InputMaybe<RekFaceOrderByRelationAggregateInput>;
  feeditems?: InputMaybe<FeedItemOrderByRelationAggregateInput>;
  fileNames?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  intel?: InputMaybe<IntelOrderByWithRelationInput>;
  intelId?: InputMaybe<SortOrder>;
  isFace?: InputMaybe<SortOrder>;
  low?: InputMaybe<SortOrder>;
  message?: InputMaybe<MessageOrderByWithRelationInput>;
  messageId?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  optimised?: InputMaybe<SortOrder>;
  optimisticUri?: InputMaybe<SortOrder>;
  policeImage?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  positionX?: InputMaybe<SortOrder>;
  positionY?: InputMaybe<SortOrder>;
  primary?: InputMaybe<SortOrder>;
  recycled?: InputMaybe<SortOrder>;
  rekImage?: InputMaybe<SortOrder>;
  reportIcons?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  rotation?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeDark?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  schemeId?: InputMaybe<SortOrder>;
  totalFaces?: InputMaybe<SortOrder>;
  update?: InputMaybe<UpdateOrderByWithRelationInput>;
  updateId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uploaded?: InputMaybe<SortOrder>;
  uploadedBy?: InputMaybe<UserOrderByWithRelationInput>;
  uploadedById?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
  vehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
};

export enum ImagePosition {
  CenterBottom = 'CENTER_BOTTOM',
  CenterCenter = 'CENTER_CENTER',
  CenterTop = 'CENTER_TOP',
  LeftBottom = 'LEFT_BOTTOM',
  LeftCenter = 'LEFT_CENTER',
  LeftTop = 'LEFT_TOP',
  RightBottom = 'RIGHT_BOTTOM',
  RightCenter = 'RIGHT_CENTER',
  RightTop = 'RIGHT_TOP'
}

export enum ImageScalarFieldEnum {
  ArtcleColumnId = 'artcleColumnId',
  BlurFaces = 'blurFaces',
  Card = 'card',
  CreatedAt = 'createdAt',
  FileNames = 'fileNames',
  Id = 'id',
  IncidentId = 'incidentId',
  IntelId = 'intelId',
  IsFace = 'isFace',
  Low = 'low',
  MessageId = 'messageId',
  Optimised = 'optimised',
  OptimisticUri = 'optimisticUri',
  OrigImageUrl = 'origImageUrl',
  PoliceImage = 'policeImage',
  Position = 'position',
  PositionX = 'positionX',
  PositionY = 'positionY',
  Primary = 'primary',
  Recycled = 'recycled',
  RekImage = 'rekImage',
  Rotation = 'rotation',
  SchemeId = 'schemeId',
  TotalFaces = 'totalFaces',
  UpdateId = 'updateId',
  UpdatedAt = 'updatedAt',
  Uploaded = 'uploaded',
  UploadedById = 'uploadedById',
  Url = 'url'
}

export type ImageUpdateDataWithoutIncidentInput = {
  isFace?: InputMaybe<NullableSetBooleanHelper>;
  offenders?: InputMaybe<NullableConnectArrayHelper>;
  policeImage?: InputMaybe<NullableSetBooleanHelper>;
  position?: InputMaybe<EnumImagePositionFieldUpdateOperationsInput>;
  positionX?: InputMaybe<SetFloatHelper>;
  positionY?: InputMaybe<SetFloatHelper>;
  primary?: InputMaybe<NullableSetBooleanHelper>;
  rotation?: InputMaybe<SetIntHelper>;
  totalFaces?: InputMaybe<SetIntHelper>;
};

export type ImageUpdateDataWithoutOffenderInput = {
  incidents?: InputMaybe<NullableConnectArrayHelper>;
  isFace?: InputMaybe<NullableSetBooleanHelper>;
  policeImage?: InputMaybe<NullableSetBooleanHelper>;
  position?: InputMaybe<EnumImagePositionFieldUpdateOperationsInput>;
  positionX?: InputMaybe<SetFloatHelper>;
  positionY?: InputMaybe<SetFloatHelper>;
  primary?: InputMaybe<NullableSetBooleanHelper>;
  rotation?: InputMaybe<SetIntHelper>;
  totalFaces?: InputMaybe<SetIntHelper>;
};

export type ImageUpdateManyWithoutIncidentNestedInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  create?: InputMaybe<Array<UploadIncidentImage>>;
  disconnect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  optimistic?: InputMaybe<Array<CreateImageOptimistic>>;
  update?: InputMaybe<Array<ImageUpdateWhereDataWithoutIncidentInput>>;
  upload?: InputMaybe<Array<UploadIncidentImage>>;
};

export type ImageUpdateManyWithoutOffenderNestedInput = {
  connect?: InputMaybe<Array<UniqueId>>;
  delete?: InputMaybe<Array<UniqueId>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
  optimistic?: InputMaybe<Array<CreateImageOptimistic>>;
  update?: InputMaybe<Array<ImageUpdateWhereDataWithoutOffenderInput>>;
  upload?: InputMaybe<Array<UploadIncidentImage>>;
};

export type ImageUpdateOneWithoutSchemeDarkNestedInput = {
  delete?: InputMaybe<Scalars['Boolean']>;
  upload?: InputMaybe<UploadSchemeImage>;
};

export type ImageUpdateWhereDataWithoutIncidentInput = {
  data: ImageUpdateDataWithoutIncidentInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpdateWhereDataWithoutOffenderInput = {
  data: ImageUpdateDataWithoutOffenderInput;
  where: ImageWhereUniqueInput;
};

export type ImageWhereInput = {
  AND?: InputMaybe<Array<ImageWhereInput>>;
  NOT?: InputMaybe<Array<ImageWhereInput>>;
  OR?: InputMaybe<Array<ImageWhereInput>>;
  Scheme?: InputMaybe<SchemeListRelationFilter>;
  artcleColumnId?: InputMaybe<StringNullableFilter>;
  article?: InputMaybe<ArticleWhereInput>;
  card?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  faces?: InputMaybe<RekFaceListRelationFilter>;
  feeditems?: InputMaybe<FeedItemListRelationFilter>;
  fileNames?: InputMaybe<StringNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  intel?: InputMaybe<IntelWhereInput>;
  intelId?: InputMaybe<StringNullableFilter>;
  isFace?: InputMaybe<BoolNullableFilter>;
  low?: InputMaybe<StringNullableFilter>;
  message?: InputMaybe<MessageWhereInput>;
  messageId?: InputMaybe<StringNullableFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  optimised?: InputMaybe<StringNullableFilter>;
  optimisticUri?: InputMaybe<StringNullableFilter>;
  origImageUrl?: InputMaybe<StringNullableFilter>;
  policeImage?: InputMaybe<BoolNullableFilter>;
  position?: InputMaybe<EnumImagePositionFilter>;
  positionX?: InputMaybe<FloatNullableFilter>;
  positionY?: InputMaybe<FloatNullableFilter>;
  primary?: InputMaybe<BoolNullableFilter>;
  recycled?: InputMaybe<BoolFilter>;
  rekImage?: InputMaybe<StringNullableFilter>;
  reportIcons?: InputMaybe<SchemeListRelationFilter>;
  rotation?: InputMaybe<IntFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeDark?: InputMaybe<SchemeListRelationFilter>;
  schemeId?: InputMaybe<StringFilter>;
  totalFaces?: InputMaybe<IntFilter>;
  update?: InputMaybe<UpdateWhereInput>;
  updateId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
  uploadedBy?: InputMaybe<UserWhereInput>;
  uploadedById?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringNullableFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type ImageWhereUniqueInput = {
  AND?: InputMaybe<Array<ImageWhereInput>>;
  NOT?: InputMaybe<Array<ImageWhereInput>>;
  OR?: InputMaybe<Array<ImageWhereInput>>;
  Scheme?: InputMaybe<SchemeListRelationFilter>;
  artcleColumnId?: InputMaybe<StringNullableFilter>;
  article?: InputMaybe<ArticleWhereInput>;
  card?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  faces?: InputMaybe<RekFaceListRelationFilter>;
  feeditems?: InputMaybe<FeedItemListRelationFilter>;
  fileNames?: InputMaybe<StringNullableListFilter>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  intel?: InputMaybe<IntelWhereInput>;
  intelId?: InputMaybe<StringNullableFilter>;
  isFace?: InputMaybe<BoolNullableFilter>;
  low?: InputMaybe<StringNullableFilter>;
  message?: InputMaybe<MessageWhereInput>;
  messageId?: InputMaybe<StringNullableFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  optimised?: InputMaybe<StringNullableFilter>;
  optimisticUri?: InputMaybe<StringNullableFilter>;
  origImageUrl?: InputMaybe<StringNullableFilter>;
  policeImage?: InputMaybe<BoolNullableFilter>;
  position?: InputMaybe<EnumImagePositionFilter>;
  primary?: InputMaybe<BoolNullableFilter>;
  recycled?: InputMaybe<BoolFilter>;
  rekImage?: InputMaybe<StringNullableFilter>;
  reportIcons?: InputMaybe<SchemeListRelationFilter>;
  rotation?: InputMaybe<IntFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeDark?: InputMaybe<SchemeListRelationFilter>;
  schemeId?: InputMaybe<StringFilter>;
  totalFaces?: InputMaybe<IntFilter>;
  update?: InputMaybe<UpdateWhereInput>;
  updateId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
  uploadedBy?: InputMaybe<UserWhereInput>;
  uploadedById?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringNullableFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type ImagesOnModelUpsert = {
  connect?: InputMaybe<Array<Scalars['String']>>;
  createConnect?: InputMaybe<Array<Scalars['String']>>;
  new?: InputMaybe<Array<IncidentImageCreate>>;
  removed?: InputMaybe<Array<Scalars['String']>>;
};

export type ImagesUpsert = {
  create?: InputMaybe<Array<IncidentImageCreate>>;
  remove?: InputMaybe<Array<Scalars['String']>>;
  update?: InputMaybe<Array<IncidentImageUpdate>>;
};

export type ImportDemEvidence = {
  id: Scalars['String'];
  name: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export enum ImportType {
  Csv = 'CSV',
  Disc = 'DISC',
  IntelOne = 'INTEL_ONE',
  MySafety = 'MY_SAFETY'
}

export type Impression = {
  __typename?: 'Impression';
  article?: Maybe<Article>;
  createdAt: Scalars['Date'];
  document?: Maybe<Document>;
  firstViewedAt: Scalars['Date'];
  id: Scalars['ID'];
  incident?: Maybe<Incident>;
  lastViewedAt: Scalars['Date'];
  offender?: Maybe<Offender>;
  updatedAt: Scalars['Date'];
  user: User;
  viewCount: Scalars['Int'];
};

export type ImpressionListRelationFilter = {
  every?: InputMaybe<ImpressionWhereInput>;
  none?: InputMaybe<ImpressionWhereInput>;
  some?: InputMaybe<ImpressionWhereInput>;
};

export type ImpressionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ImpressionOrderByWithRelationInput = {
  article?: InputMaybe<ArticleOrderByWithRelationInput>;
  articleId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum ImpressionScalarFieldEnum {
  ArticleId = 'articleId',
  CreatedAt = 'createdAt',
  Id = 'id',
  IncidentId = 'incidentId',
  OffenderId = 'offenderId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type ImpressionScalarWhereInput = {
  AND?: InputMaybe<Array<ImpressionScalarWhereInput>>;
  NOT?: InputMaybe<Array<ImpressionScalarWhereInput>>;
  OR?: InputMaybe<Array<ImpressionScalarWhereInput>>;
  articleId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  offenderId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ImpressionScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ImpressionScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ImpressionScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ImpressionScalarWhereWithAggregatesInput>>;
  articleId?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentId?: InputMaybe<StringNullableWithAggregatesFilter>;
  offenderId?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type ImpressionWhereInput = {
  AND?: InputMaybe<Array<ImpressionWhereInput>>;
  NOT?: InputMaybe<Array<ImpressionWhereInput>>;
  OR?: InputMaybe<Array<ImpressionWhereInput>>;
  article?: InputMaybe<ArticleWhereInput>;
  articleId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type ImpressionWhereUniqueInput = {
  AND?: InputMaybe<Array<ImpressionWhereInput>>;
  NOT?: InputMaybe<Array<ImpressionWhereInput>>;
  OR?: InputMaybe<Array<ImpressionWhereInput>>;
  article?: InputMaybe<ArticleWhereInput>;
  articleId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type Incident = {
  __typename?: 'Incident';
  actionableScore: Scalars['Int'];
  actions: Array<Action>;
  activityAuthorised: Scalars['Boolean'];
  aiBehavioralAnalysis?: Maybe<AiBehavioralAnalysis>;
  aiImpactAssessment?: Maybe<AiImpactAssessment>;
  aiImprovements?: Maybe<Scalars['String']>;
  aiInvestigationLeads?: Maybe<AiInvestigationLeads>;
  aiKeyObservations?: Maybe<Array<Scalars['String']>>;
  aiMO?: Maybe<Scalars['String']>;
  aiMethod?: Maybe<Scalars['String']>;
  aiNetworkAnalysis?: Maybe<AiNetworkAnalysis>;
  aiPatternRecognition?: Maybe<AiPatternRecognition>;
  aiPreventionInsights?: Maybe<AiPreventionInsights>;
  aiQualityScore?: Maybe<Scalars['Int']>;
  aiRiskAssessment?: Maybe<AiRiskAssessment>;
  aiSummary?: Maybe<Scalars['String']>;
  answers: Array<Answer>;
  approved?: Maybe<Scalars['Boolean']>;
  approvedAction?: Maybe<ApprovalUser>;
  articleColumns: Array<ArticleColumn>;
  assignedUsers: Array<User>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']>;
  cctvRecords: Array<CctvRecord>;
  completedTodos: Array<Todo>;
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['String'];
  createdByUser: Scalars['Boolean'];
  crimeGroups: Array<CrimeGroup>;
  crimeTypes: Array<Tag>;
  customerRef?: Maybe<Scalars['String']>;
  date: Scalars['Date'];
  dateAgo: Scalars['Int'];
  dayOfMonth?: Maybe<Scalars['Int']>;
  dayOfWeek?: Maybe<Scalars['Int']>;
  dayTime: Scalars['String'];
  deleted: Scalars['Boolean'];
  description: Scalars['String'];
  descriptionTranslations: Array<Scalars['JSON']>;
  draft: Scalars['Boolean'];
  evidence: Array<Document>;
  feedImage?: Maybe<Image>;
  geoLat?: Maybe<Scalars['String']>;
  geoLng?: Maybe<Scalars['String']>;
  groups: Array<Group>;
  hasNamedOffender: Scalars['Boolean'];
  hasYouthOffender: Scalars['Boolean'];
  hourOfDay?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  images: Array<Image>;
  impactTags: Array<Tag>;
  impressions: Array<Impression>;
  incidentItems: Array<IncidentItem>;
  intel: Array<Intel>;
  investigations: Array<Investigation>;
  involvedTags: Array<Tag>;
  latestUpdate?: Maybe<Update>;
  linkedUpdates: Array<Update>;
  location?: Maybe<Address>;
  matches: Array<RekMatch>;
  messages: Array<Message>;
  mg11: Array<Mg11>;
  monthOfYear?: Maybe<Scalars['Int']>;
  motiveTags: Array<Tag>;
  newIncident: Scalars['Boolean'];
  notifications: Array<Notification>;
  offenderIdentityScore?: Maybe<Scalars['Int']>;
  offenders: Array<Offender>;
  originalDescription: Scalars['String'];
  policeAdditionalEvidence?: Maybe<Scalars['String']>;
  policeCCTVReviewed?: Maybe<Scalars['Boolean']>;
  policeDay?: Maybe<Scalars['Boolean']>;
  policeDepartment?: Maybe<Scalars['String']>;
  policeDistanceFromIncident?: Maybe<Scalars['String']>;
  policeIncidentDuration?: Maybe<Scalars['String']>;
  policeInside?: Maybe<Scalars['Boolean']>;
  policeInvolved: Scalars['Boolean'];
  policeItemsMO?: Maybe<Scalars['String']>;
  policeKnownBefore?: Maybe<Scalars['Boolean']>;
  policeMG11?: Maybe<Scalars['Boolean']>;
  policeNo?: Maybe<Scalars['String']>;
  policeObstructions?: Maybe<Scalars['String']>;
  policeOfficerName?: Maybe<Scalars['String']>;
  policeReasonRemember?: Maybe<Scalars['String']>;
  policeRef?: Maybe<Scalars['String']>;
  policeReportEligible: Scalars['Boolean'];
  policeReportSubmitted: Scalars['Boolean'];
  policeReportSubmittedDate?: Maybe<Scalars['Date']>;
  policeReported: Scalars['Boolean'];
  policeResponse?: Maybe<PoliceResponseTime>;
  policeStatement?: Maybe<Scalars['String']>;
  policeTimePassed?: Maybe<Scalars['String']>;
  policeTriageBestOffenderScore?: Maybe<Scalars['Int']>;
  policeTriageCompositeScore?: Maybe<Scalars['Int']>;
  policeTriageConfidence?: Maybe<Scalars['Int']>;
  policeTriageDate?: Maybe<Scalars['Date']>;
  policeTriageHighImpactFlag: Scalars['Boolean'];
  policeTriageIncidentQuality?: Maybe<Scalars['String']>;
  policeTriageOffenderImpact?: Maybe<Scalars['String']>;
  policeTriageOffenderQuality?: Maybe<Scalars['String']>;
  policeTriageReason?: Maybe<Scalars['String']>;
  policeTriageRepeatOffender: Scalars['Boolean'];
  policeTriageScore?: Maybe<Scalars['Int']>;
  policeTriageStatus: PoliceTriageStatus;
  priority: IncidentPriority;
  recoveredValue?: Maybe<Scalars['Float']>;
  recycleBin?: Maybe<RecycledItem>;
  recycleDate: Scalars['Date'];
  recycleExtendedTo?: Maybe<Scalars['Date']>;
  recycleInfo?: Maybe<RecycleExtenstion>;
  recycled: Scalars['Boolean'];
  ref: Scalars['String'];
  reference?: Maybe<Scalars['Int']>;
  referenceStr?: Maybe<Scalars['String']>;
  reportedBusinessName: Scalars['String'];
  scheme: Scheme;
  schemeId: Scalars['String'];
  schemes: Array<Scheme>;
  skipFeedItem: Scalars['Boolean'];
  skipNotification: Scalars['Boolean'];
  status?: Maybe<IncidentStatus>;
  statusId?: Maybe<Scalars['String']>;
  subject: Scalars['String'];
  subscribed: Scalars['Boolean'];
  subscribedUsers: Array<User>;
  time: Scalars['Date'];
  todos: Array<Todo>;
  totalImages: Scalars['Int'];
  totalOffenders: Scalars['Int'];
  totalRecoveredValue: Scalars['Float'];
  totalUpdates: Scalars['Int'];
  totalValue: Scalars['Float'];
  uncompletedTodos: Array<Todo>;
  updatedAt: Scalars['Date'];
  updates: Array<Update>;
  uploaded?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['Float']>;
  vehicles: Array<Vehicle>;
  weekOfMonth?: Maybe<Scalars['Int']>;
  weekOfYear?: Maybe<Scalars['Int']>;
};


export type IncidentAnswersArgs = {
  cursor?: InputMaybe<AnswerWhereUniqueInput>;
  distinct?: InputMaybe<Array<AnswerScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AnswerOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type IncidentArticleColumnsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type IncidentAssignedUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type IncidentCrimeGroupsArgs = {
  cursor?: InputMaybe<CrimeGroupWhereUniqueInput>;
  distinct?: InputMaybe<CrimeGroupScalarFieldEnum>;
  orderBy?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CrimeGroupWhereInput>;
};


export type IncidentCrimeTypesArgs = {
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  where?: InputMaybe<TagWhereInput>;
};


export type IncidentEvidenceArgs = {
  cursor?: InputMaybe<DocumentWhereUniqueInput>;
  distinct?: InputMaybe<Array<DocumentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DocumentWhereInput>;
};


export type IncidentGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type IncidentImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


export type IncidentImpactTagsArgs = {
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  where?: InputMaybe<TagWhereInput>;
};


export type IncidentImpressionsArgs = {
  cursor?: InputMaybe<ImpressionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImpressionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImpressionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImpressionWhereInput>;
};


export type IncidentIncidentItemsArgs = {
  cursor?: InputMaybe<IncidentItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncidentItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentItemWhereInput>;
};


export type IncidentIntelArgs = {
  cursor?: InputMaybe<IntelWhereUniqueInput>;
  distinct?: InputMaybe<Array<IntelScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IntelOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IntelWhereInput>;
};


export type IncidentInvestigationsArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<Array<InvestigationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InvestigationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type IncidentInvolvedTagsArgs = {
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  where?: InputMaybe<TagWhereInput>;
};


export type IncidentLinkedUpdatesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type IncidentMatchesArgs = {
  cursor?: InputMaybe<RekMatchWhereUniqueInput>;
  distinct?: InputMaybe<Array<RekMatchScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RekMatchOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RekMatchWhereInput>;
};


export type IncidentMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type IncidentMg11Args = {
  cursor?: InputMaybe<Mg11WhereUniqueInput>;
  distinct?: InputMaybe<Array<Mg11ScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<Mg11OrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mg11WhereInput>;
};


export type IncidentMotiveTagsArgs = {
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  where?: InputMaybe<TagWhereInput>;
};


export type IncidentNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type IncidentOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type IncidentSubscribedUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type IncidentTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<Array<TodoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TodoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};


export type IncidentUpdatesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type IncidentVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<Array<VehicleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VehicleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
};

export type IncidentColumnMapping = {
  cctvAvailableColumn?: InputMaybe<Scalars['String']>;
  crimeTypeColumn?: InputMaybe<Scalars['String']>;
  dateTimeColumn?: InputMaybe<Scalars['String']>;
  descriptionColumn?: InputMaybe<Scalars['String']>;
  locationColumn?: InputMaybe<Scalars['String']>;
  offenderColumn?: InputMaybe<Scalars['String']>;
  outcomeColumn?: InputMaybe<Scalars['String']>;
  policeAttendedColumn?: InputMaybe<Scalars['String']>;
  policeContactedColumn?: InputMaybe<Scalars['String']>;
  policeRefColumn?: InputMaybe<Scalars['String']>;
  referenceColumn?: InputMaybe<Scalars['String']>;
  reporterColumn?: InputMaybe<Scalars['String']>;
  valueColumn?: InputMaybe<Scalars['String']>;
  violenceInvolvedColumn?: InputMaybe<Scalars['String']>;
};

export type IncidentConnectOne = {
  connect: IncidentWhereUniqueInput;
};

export type IncidentDataQuality = {
  __typename?: 'IncidentDataQuality';
  /** Creation date */
  createdAt: Scalars['DateTime'];
  /** Description length in characters */
  descriptionLength: Scalars['Int'];
  /** Has category */
  hasCategory: Scalars['Boolean'];
  /** Has description */
  hasDescription: Scalars['Boolean'];
  /** Has images attached */
  hasImages: Scalars['Boolean'];
  /** Has location data */
  hasLocation: Scalars['Boolean'];
  /** Has linked offenders */
  hasOffenders: Scalars['Boolean'];
  /** Has value/loss amount */
  hasValue: Scalars['Boolean'];
  /** Number of images */
  imageCount: Scalars['Int'];
  /** Incident ID */
  incidentId: Scalars['String'];
  /** Number of linked offenders */
  offenderCount: Scalars['Int'];
  /** Quality score for this incident */
  qualityScore: Scalars['Float'];
  /** Number of updates */
  updateCount: Scalars['Int'];
};

export type IncidentExport = {
  __typename?: 'IncidentExport';
  activityCount: Scalars['Int'];
  incidentCount: Scalars['Int'];
  incidentItemsCount: Scalars['Int'];
  incidents: Array<Incident>;
  offenderCount: Scalars['Int'];
  vehicleCount: Scalars['Int'];
};

export type IncidentExportInput = {
  allBusinesses?: InputMaybe<Scalars['Boolean']>;
  businessIds: Array<Scalars['String']>;
  crimeGroupIds: Array<Scalars['String']>;
  dateRange: DateRangeInput;
  groupIds: Array<Scalars['String']>;
};

export type IncidentForm = {
  __typename?: 'IncidentForm';
  createdAt: Scalars['Date'];
  fields: Array<FormField>;
  id: Scalars['ID'];
  scheme: Array<Scheme>;
  tags: Array<Tag>;
  updatedAt: Scalars['Date'];
};

export enum IncidentFormField {
  Cctv = 'CCTV',
  Custom = 'CUSTOM',
  Details = 'DETAILS',
  Draft = 'DRAFT',
  Goods = 'GOODS',
  Groups = 'GROUPS',
  Images = 'IMAGES',
  Impact = 'IMPACT',
  Involved = 'INVOLVED',
  Offenders = 'OFFENDERS',
  Police = 'POLICE',
  PoliceReport = 'POLICE_REPORT',
  PoliceStatement = 'POLICE_STATEMENT',
  Types = 'TYPES',
  Vehicles = 'VEHICLES',
  Victims = 'VICTIMS',
  Where = 'WHERE',
  Witnesses = 'WITNESSES'
}

export type IncidentFormFieldsConditionInput = {
  conditionValues?: InputMaybe<Array<Scalars['String']>>;
  mode?: InputMaybe<Scalars['String']>;
  questionId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type IncidentFormFieldsInput = {
  conditions?: InputMaybe<Array<IncidentFormFieldsConditionInput>>;
  metadata?: InputMaybe<IncidentFormFieldsMetadataInput>;
  position: Scalars['Int'];
  tooltip?: InputMaybe<Scalars['String']>;
  type: IncidentFormField;
};

export type IncidentFormFieldsMetadataInput = {
  draftButton?: InputMaybe<Scalars['String']>;
  draftDescription?: InputMaybe<Scalars['String']>;
  draftTitle?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<Scalars['String']>;
  showDamagedQuantity?: InputMaybe<Scalars['Boolean']>;
  titles?: InputMaybe<Scalars['JSON']>;
};

export type IncidentFormInput = {
  formFields: Array<IncidentFormFieldsInput>;
  schemeIds: Array<Scalars['String']>;
  tagIds: Array<Scalars['String']>;
};

export type IncidentFormListRelationFilter = {
  every?: InputMaybe<IncidentFormWhereInput>;
  none?: InputMaybe<IncidentFormWhereInput>;
  some?: InputMaybe<IncidentFormWhereInput>;
};

export type IncidentFormOnTag = {
  __typename?: 'IncidentFormOnTag';
  conditions?: Maybe<Array<Scalars['JSON']>>;
  metadata?: Maybe<Scalars['JSON']>;
  position: Scalars['Int'];
  type: IncidentFormField;
};

export type IncidentFormOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type IncidentFormOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  fields?: InputMaybe<FormFieldOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  tags?: InputMaybe<TagOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum IncidentFormScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type IncidentFormScalarWhereInput = {
  AND?: InputMaybe<Array<IncidentFormScalarWhereInput>>;
  NOT?: InputMaybe<Array<IncidentFormScalarWhereInput>>;
  OR?: InputMaybe<Array<IncidentFormScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type IncidentFormScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<IncidentFormScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<IncidentFormScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<IncidentFormScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type IncidentFormWhereInput = {
  AND?: InputMaybe<Array<IncidentFormWhereInput>>;
  NOT?: InputMaybe<Array<IncidentFormWhereInput>>;
  OR?: InputMaybe<Array<IncidentFormWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  fields?: InputMaybe<FormFieldListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  scheme?: InputMaybe<SchemeListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type IncidentFormWhereUniqueInput = {
  AND?: InputMaybe<Array<IncidentFormWhereInput>>;
  NOT?: InputMaybe<Array<IncidentFormWhereInput>>;
  OR?: InputMaybe<Array<IncidentFormWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  fields?: InputMaybe<FormFieldListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type IncidentImageCreate = {
  filename: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  indexFaces?: InputMaybe<Scalars['Boolean']>;
  isFace?: InputMaybe<Scalars['Boolean']>;
  mimetype: Scalars['String'];
  policeImage?: InputMaybe<Scalars['Boolean']>;
  position?: InputMaybe<Scalars['String']>;
  positionX?: InputMaybe<Scalars['Float']>;
  positionY?: InputMaybe<Scalars['Float']>;
  primary?: InputMaybe<Scalars['Boolean']>;
  rotation?: InputMaybe<Scalars['Int']>;
  totalFaces?: InputMaybe<Scalars['Int']>;
  url: Scalars['String'];
};

export type IncidentImageUpdate = {
  id: Scalars['String'];
  isFace?: InputMaybe<Scalars['Boolean']>;
  policeImage?: InputMaybe<Scalars['Boolean']>;
  position?: InputMaybe<Scalars['String']>;
  positionX?: InputMaybe<Scalars['Float']>;
  positionY?: InputMaybe<Scalars['Float']>;
  primary?: InputMaybe<Scalars['Boolean']>;
  rotation?: InputMaybe<Scalars['Int']>;
  totalFaces?: InputMaybe<Scalars['Int']>;
};

export type IncidentImportDataInput = {
  fileUrl: Scalars['String'];
  /** Minimum score (0-100) required to match an existing offender. Default is 60. */
  minimumOffenderMatchScore?: InputMaybe<Scalars['Int']>;
  /** Minimum name similarity score (0-30) required for offender matching. Default is 15. Set higher (e.g., 25-28) for near-identical matches only. */
  nameMatchThreshold?: InputMaybe<Scalars['Int']>;
  skipDuplicateCheck?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentImportValidationError = {
  __typename?: 'IncidentImportValidationError';
  message: Scalars['String'];
  uuid: Scalars['String'];
};

export type IncidentImportValidationResult = {
  __typename?: 'IncidentImportValidationResult';
  invalid: Scalars['Int'];
  jobId?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
  total: Scalars['Int'];
  valid: Scalars['Int'];
  validationErrors: Array<IncidentImportValidationError>;
};

export type IncidentItem = {
  __typename?: 'IncidentItem';
  createdAt: Scalars['Date'];
  damagedQuantity?: Maybe<Scalars['Int']>;
  goodsType?: Maybe<GoodsType>;
  id: Scalars['ID'];
  incident: Incident;
  name?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  recoveredQuantity?: Maybe<Scalars['Int']>;
  recoveredValue?: Maybe<Scalars['Float']>;
  sku?: Maybe<Scalars['String']>;
  stockItem?: Maybe<StockItem>;
  updatedAt: Scalars['Date'];
  value?: Maybe<Scalars['Float']>;
};

export type IncidentItemCreateWithoutIncident = {
  damagedQuantity?: InputMaybe<Scalars['Float']>;
  goodsType?: InputMaybe<ConnectHelper>;
  name?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Float']>;
  recoveredQuantity?: InputMaybe<Scalars['Float']>;
  recoveredValue?: InputMaybe<Scalars['Float']>;
  sku?: InputMaybe<Scalars['String']>;
  stockItem?: InputMaybe<ConnectHelper>;
  value?: InputMaybe<Scalars['Float']>;
};

export type IncidentItemListRelationFilter = {
  every?: InputMaybe<IncidentItemWhereInput>;
  none?: InputMaybe<IncidentItemWhereInput>;
  some?: InputMaybe<IncidentItemWhereInput>;
};

export type IncidentItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type IncidentItemOrderByWithRelationInput = {
  barcode?: InputMaybe<SortOrder>;
  brand?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  goodsType?: InputMaybe<GoodsTypeOrderByWithRelationInput>;
  goodsTypeId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  quantity?: InputMaybe<SortOrder>;
  recoveredQuantity?: InputMaybe<SortOrder>;
  recoveredValue?: InputMaybe<SortOrder>;
  sku?: InputMaybe<SortOrder>;
  stockItem?: InputMaybe<StockItemOrderByWithRelationInput>;
  stockItemId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
};

export enum IncidentItemScalarFieldEnum {
  Barcode = 'barcode',
  Brand = 'brand',
  CreatedAt = 'createdAt',
  GoodsTypeId = 'goodsTypeId',
  Id = 'id',
  IncidentId = 'incidentId',
  Name = 'name',
  Quantity = 'quantity',
  RecoveredQuantity = 'recoveredQuantity',
  RecoveredValue = 'recoveredValue',
  Sku = 'sku',
  StockItemId = 'stockItemId',
  UpdatedAt = 'updatedAt',
  Value = 'value'
}

export type IncidentItemScalarWhereInput = {
  AND?: InputMaybe<Array<IncidentItemScalarWhereInput>>;
  NOT?: InputMaybe<Array<IncidentItemScalarWhereInput>>;
  OR?: InputMaybe<Array<IncidentItemScalarWhereInput>>;
  barcode?: InputMaybe<StringNullableFilter>;
  brand?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  goodsTypeId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  quantity?: InputMaybe<IntNullableFilter>;
  recoveredQuantity?: InputMaybe<IntNullableFilter>;
  recoveredValue?: InputMaybe<FloatNullableFilter>;
  sku?: InputMaybe<StringNullableFilter>;
  stockItemId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<FloatNullableFilter>;
};

export type IncidentItemScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<IncidentItemScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<IncidentItemScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<IncidentItemScalarWhereWithAggregatesInput>>;
  barcode?: InputMaybe<StringNullableWithAggregatesFilter>;
  brand?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  goodsTypeId?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentId?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  quantity?: InputMaybe<IntNullableWithAggregatesFilter>;
  recoveredQuantity?: InputMaybe<IntNullableWithAggregatesFilter>;
  recoveredValue?: InputMaybe<FloatNullableWithAggregatesFilter>;
  sku?: InputMaybe<StringNullableWithAggregatesFilter>;
  stockItemId?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  value?: InputMaybe<FloatNullableWithAggregatesFilter>;
};

export type IncidentItemUpdateManyWithoutIncidentInput = {
  create?: InputMaybe<Array<IncidentItemCreateWithoutIncident>>;
  deleteMany?: InputMaybe<Array<IncidentItemScalarWhereInput>>;
  update?: InputMaybe<Array<IncidentItemUpdateWithWhereUniqueWithoutIncident>>;
};

export type IncidentItemUpdateWithWhereUniqueWithoutIncident = {
  data: IncidentItemUpdateWithoutIncident;
  where: IncidentItemWhereUniqueInput;
};

export type IncidentItemUpdateWithoutIncident = {
  damagedQuantity?: InputMaybe<SetFloatHelper>;
  goodsType?: InputMaybe<ConnectHelper>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableSetStringHelper>;
  quantity?: InputMaybe<SetFloatHelper>;
  recoveredQuantity?: InputMaybe<SetFloatHelper>;
  recoveredValue?: InputMaybe<SetFloatHelper>;
  sku?: InputMaybe<NullableSetStringHelper>;
  stockItem?: InputMaybe<ConnectHelper>;
  value?: InputMaybe<SetFloatHelper>;
};

export type IncidentItemWhereInput = {
  AND?: InputMaybe<Array<IncidentItemWhereInput>>;
  NOT?: InputMaybe<Array<IncidentItemWhereInput>>;
  OR?: InputMaybe<Array<IncidentItemWhereInput>>;
  barcode?: InputMaybe<StringNullableFilter>;
  brand?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  goodsType?: InputMaybe<GoodsTypeWhereInput>;
  goodsTypeId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  quantity?: InputMaybe<IntNullableFilter>;
  recoveredQuantity?: InputMaybe<IntNullableFilter>;
  recoveredValue?: InputMaybe<FloatNullableFilter>;
  sku?: InputMaybe<StringNullableFilter>;
  stockItem?: InputMaybe<StockItemWhereInput>;
  stockItemId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<FloatNullableFilter>;
};

export type IncidentItemWhereUniqueInput = {
  AND?: InputMaybe<Array<IncidentItemWhereInput>>;
  NOT?: InputMaybe<Array<IncidentItemWhereInput>>;
  OR?: InputMaybe<Array<IncidentItemWhereInput>>;
  barcode?: InputMaybe<StringNullableFilter>;
  brand?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  goodsType?: InputMaybe<GoodsTypeWhereInput>;
  goodsTypeId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  quantity?: InputMaybe<IntNullableFilter>;
  recoveredQuantity?: InputMaybe<IntNullableFilter>;
  recoveredValue?: InputMaybe<FloatNullableFilter>;
  sku?: InputMaybe<StringNullableFilter>;
  stockItem?: InputMaybe<StockItemWhereInput>;
  stockItemId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<FloatNullableFilter>;
};

export type IncidentItemsOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  incidentDate?: InputMaybe<SortOrder>;
};

export type IncidentItemsWhereInput = {
  createdAtRange?: InputMaybe<DateRangeInput>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  incidentDateRange?: InputMaybe<DateRangeInput>;
  schemeId: Scalars['String'];
};

export enum IncidentLinkStrength {
  Moderate = 'MODERATE',
  Strong = 'STRONG',
  Weak = 'WEAK'
}

export enum IncidentLinkType {
  EscalationSequence = 'ESCALATION_SEQUENCE',
  GeographicCluster = 'GEOGRAPHIC_CLUSTER',
  SameGroup = 'SAME_GROUP',
  SameOffender = 'SAME_OFFENDER',
  SimilarMo = 'SIMILAR_MO',
  TemporalPattern = 'TEMPORAL_PATTERN'
}

export type IncidentListRelationFilter = {
  every?: InputMaybe<IncidentWhereInput>;
  none?: InputMaybe<IncidentWhereInput>;
  some?: InputMaybe<IncidentWhereInput>;
};

export type IncidentMapRelayWhere = {
  ids: Array<Scalars['String']>;
};

export type IncidentMonthlyByScheme = {
  __typename?: 'IncidentMonthlyByScheme';
  count: Scalars['Int'];
  month: Scalars['String'];
  schemeId: Scalars['String'];
  schemeName: Scalars['String'];
};

export type IncidentOffenderImages = {
  create?: InputMaybe<Array<UploadIncidentOffenderImage>>;
};

export type IncidentOffenderRatio = {
  __typename?: 'IncidentOffenderRatio';
  /** Average number of incidents per offender */
  averageIncidentsPerOffender: Scalars['Float'];
  /** Ratio of incidents to offenders */
  incidentToOffenderRatio: Scalars['Float'];
  /** Percentage of incidents linked to offenders */
  linkageRate: Scalars['Float'];
  /** Maximum incidents linked to a single offender */
  maxIncidentsPerOffender: Scalars['Int'];
  /** Number of offenders with multiple incidents */
  repeatOffenderCount: Scalars['Int'];
  /** Percentage of offenders who are repeat offenders */
  repeatOffenderPercentage: Scalars['Float'];
  /** Total number of incidents */
  totalIncidents: Scalars['Int'];
  /** Total number of unique offenders */
  totalOffenders: Scalars['Int'];
  /** Number of incidents without linked offenders */
  unlinkedIncidents: Scalars['Int'];
};

export type IncidentOffenderWhereInput = {
  id?: InputMaybe<Scalars['String']>;
  localId?: InputMaybe<Scalars['String']>;
};

export type IncidentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type IncidentOrderByWithRelationInput = {
  activityAuthorised?: InputMaybe<SortOrder>;
  approved?: InputMaybe<SortOrder>;
  businessId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  crimeGroups?: InputMaybe<CrimeGroupOrderByRelationAggregateInput>;
  crimeTypes?: InputMaybe<TagOrderByRelationAggregateInput>;
  date?: InputMaybe<SortOrder>;
  dayOfMonth?: InputMaybe<SortOrder>;
  dayOfWeek?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  evidence?: InputMaybe<DocumentOrderByRelationAggregateInput>;
  feedItems?: InputMaybe<FeedItemOrderByRelationAggregateInput>;
  geoLat?: InputMaybe<SortOrder>;
  geoLng?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  hasNamedOffender?: InputMaybe<SortOrder>;
  hasYouthOffender?: InputMaybe<SortOrder>;
  hourOfDay?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  impressions?: InputMaybe<ImpressionOrderByRelationAggregateInput>;
  incidentItems?: InputMaybe<IncidentItemOrderByRelationAggregateInput>;
  intel?: InputMaybe<IntelOrderByRelationAggregateInput>;
  investigations?: InputMaybe<InvestigationOrderByRelationAggregateInput>;
  linkedUpdates?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  matches?: InputMaybe<RekMatchOrderByRelationAggregateInput>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  mg11?: InputMaybe<Mg11OrderByRelationAggregateInput>;
  monthOfYear?: InputMaybe<SortOrder>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  offenderIdentityScore?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  policeInvolved?: InputMaybe<SortOrder>;
  policeNo?: InputMaybe<SortOrder>;
  policeRef?: InputMaybe<SortOrder>;
  policeReportEligible?: InputMaybe<SortOrder>;
  policeReportSubmitted?: InputMaybe<SortOrder>;
  policeReportSubmittedDate?: InputMaybe<SortOrder>;
  policeReported?: InputMaybe<SortOrder>;
  policeResponse?: InputMaybe<SortOrder>;
  policeTriageBestOffenderScore?: InputMaybe<SortOrder>;
  policeTriageCompositeScore?: InputMaybe<SortOrder>;
  policeTriageConfidence?: InputMaybe<SortOrder>;
  policeTriageDate?: InputMaybe<SortOrder>;
  policeTriageHighImpactFlag?: InputMaybe<SortOrder>;
  policeTriageIncidentQuality?: InputMaybe<SortOrder>;
  policeTriageOffenderImpact?: InputMaybe<SortOrder>;
  policeTriageOffenderQuality?: InputMaybe<SortOrder>;
  policeTriageReason?: InputMaybe<SortOrder>;
  policeTriageRepeatOffender?: InputMaybe<SortOrder>;
  policeTriageScore?: InputMaybe<SortOrder>;
  policeTriageStatus?: InputMaybe<SortOrder>;
  recoveredValue?: InputMaybe<SortOrder>;
  recycleBin?: InputMaybe<RecycledItemOrderByWithRelationInput>;
  recycleDate?: InputMaybe<SortOrder>;
  recycled?: InputMaybe<SortOrder>;
  ref?: InputMaybe<SortOrder>;
  reference?: InputMaybe<SortOrder>;
  referenceStr?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  skipFeedItem?: InputMaybe<SortOrder>;
  skipNotification?: InputMaybe<SortOrder>;
  subject?: InputMaybe<SortOrder>;
  subscribedUsers?: InputMaybe<UserOrderByRelationAggregateInput>;
  time?: InputMaybe<SortOrder>;
  todos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  updates?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  uploaded?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
  vehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
  weekOfMonth?: InputMaybe<SortOrder>;
  weekOfYear?: InputMaybe<SortOrder>;
};

export type IncidentPerformance = {
  __typename?: 'IncidentPerformance';
  alertId: Scalars['String'];
  createdAt: Scalars['Date'];
  date: Scalars['Date'];
  id: Scalars['String'];
  primaryPhoto?: Maybe<Scalars['String']>;
  subject: Scalars['String'];
  totalBulletins: Scalars['Float'];
  totalLostValue: Scalars['Float'];
  totalOffenders: Scalars['Int'];
  totalRecoveredValue: Scalars['Float'];
  totalSuccessRate: Scalars['Float'];
};

export enum IncidentPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Normal = 'NORMAL'
}

export type IncidentQuestions = {
  __typename?: 'IncidentQuestions';
  actions: Array<Scalars['JSON']>;
  answerType: AnswerType;
  dependentMode?: Maybe<Scalars['String']>;
  dependentOnAnswerValue?: Maybe<Scalars['String']>;
  dependentOnAnswerValueArray?: Maybe<Array<Scalars['String']>>;
  dependentOnBrandIds?: Maybe<Array<Scalars['String']>>;
  dependentOnQuestionId?: Maybe<Scalars['String']>;
  dependentOnTagIds?: Maybe<Array<Scalars['String']>>;
  label: Scalars['String'];
  options: Array<AnswerOption>;
  priority: Scalars['Int'];
  questionId: Scalars['String'];
  required: Scalars['Boolean'];
  tagQuestionId: Scalars['String'];
  tooltip?: Maybe<Scalars['String']>;
};

export type IncidentRadiusInput = {
  city?: InputMaybe<CityEnum>;
  coordinates?: InputMaybe<CoordinatesInput>;
  dateRange?: InputMaybe<DateRangeInput>;
  excludeSchemeIds?: InputMaybe<Array<Scalars['String']>>;
  radiusMiles: Scalars['Float'];
};

export type IncidentRadiusStats = {
  __typename?: 'IncidentRadiusStats';
  byScheme: Array<KeyValuePair>;
  byStatus: Array<KeyValuePair>;
  byType: Array<KeyValuePair>;
  byYear: Array<KeyValuePair>;
  dateRange?: Maybe<DateRangeOutput>;
  totalCount: Scalars['Int'];
};

export type IncidentRelaySimpleInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdByIds?: InputMaybe<Array<Scalars['String']>>;
  crimeGroupIds?: InputMaybe<Array<Scalars['String']>>;
  date?: InputMaybe<DateTimeFilter>;
  goodsTypeIds?: InputMaybe<Array<Scalars['String']>>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  incidentTagIds?: InputMaybe<Array<Scalars['String']>>;
  incidentTypeIds?: InputMaybe<Array<Scalars['String']>>;
  policeInvolved?: InputMaybe<Scalars['Boolean']>;
  policeReported?: InputMaybe<Scalars['Boolean']>;
  priorities?: InputMaybe<Array<IncidentPriority>>;
  search?: InputMaybe<Scalars['String']>;
  stockItemIds?: InputMaybe<Array<Scalars['String']>>;
  userDataOnly?: InputMaybe<Scalars['Boolean']>;
  userIsFollowing?: InputMaybe<Scalars['Boolean']>;
  vehicleIds?: InputMaybe<Array<Scalars['String']>>;
};

export enum IncidentScalarFieldEnum {
  ActivityAuthorised = 'activityAuthorised',
  Approved = 'approved',
  BusinessId = 'businessId',
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  Date = 'date',
  DayOfMonth = 'dayOfMonth',
  DayOfWeek = 'dayOfWeek',
  Deleted = 'deleted',
  Description = 'description',
  GeoLat = 'geoLat',
  GeoLng = 'geoLng',
  HourOfDay = 'hourOfDay',
  Id = 'id',
  MonthOfYear = 'monthOfYear',
  PoliceInvolved = 'policeInvolved',
  PoliceNo = 'policeNo',
  PoliceRef = 'policeRef',
  PoliceReported = 'policeReported',
  PoliceResponse = 'policeResponse',
  RecoveredValue = 'recoveredValue',
  RecycleDate = 'recycleDate',
  Recycled = 'recycled',
  Ref = 'ref',
  Reference = 'reference',
  ReferenceStr = 'referenceStr',
  SchemeId = 'schemeId',
  SkipFeedItem = 'skipFeedItem',
  SkipNotification = 'skipNotification',
  Subject = 'subject',
  Time = 'time',
  UpdatedAt = 'updatedAt',
  Uploaded = 'uploaded',
  Value = 'value',
  WeekOfMonth = 'weekOfMonth',
  WeekOfYear = 'weekOfYear'
}

export type IncidentStatus = {
  __typename?: 'IncidentStatus';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  descriptionTranslation?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  incidents: Array<Incident>;
  name: Scalars['String'];
  nameTranslation: Scalars['JSON'];
  tooltip?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};


export type IncidentStatusIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};

export type IncidentStatusCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  scheme: ConnectHelper;
};

export type IncidentStatusUpdateInput = {
  description?: InputMaybe<NullableSetStringHelper>;
  name?: InputMaybe<SetStringHelper>;
};

export type IncidentStatusWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type IncidentSummary = {
  __typename?: 'IncidentSummary';
  incidentsReportedToPolice: Scalars['Int'];
  incidentsWherePoliceAttended: Scalars['Int'];
  lastIncidentDate?: Maybe<Scalars['Date']>;
  mostCommonCrimeType: Scalars['String'];
  totalIncidents: Scalars['Int'];
};

export type IncidentTableWhereInput = {
  brandsIds?: InputMaybe<Array<Scalars['String']>>;
  businessesIds?: InputMaybe<Array<Scalars['String']>>;
  createdAt?: InputMaybe<DateRangeInput>;
  crimeGroupId?: InputMaybe<Scalars['String']>;
  crimeGroupIds?: InputMaybe<Array<Scalars['String']>>;
  dateRange?: InputMaybe<DateRangeInput>;
  groupIds: Array<Scalars['String']>;
  incidentItemIds?: InputMaybe<Array<Scalars['String']>>;
  incidentTypeIds?: InputMaybe<Array<Scalars['String']>>;
  industryIds?: InputMaybe<Array<Scalars['String']>>;
  offenderCount?: InputMaybe<Scalars['Int']>;
  offenderId?: InputMaybe<Scalars['String']>;
  priorities?: InputMaybe<Array<IncidentPriority>>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  totalValue?: InputMaybe<Scalars['Int']>;
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type IncidentTags = {
  __typename?: 'IncidentTags';
  hasChildren: Scalars['Boolean'];
  incidentForm?: Maybe<Array<IncidentFormOnTag>>;
  label: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  parents: Array<Scalars['String']>;
  policeReporting: Scalars['Boolean'];
  questions?: Maybe<Array<IncidentQuestions>>;
  tier: Scalars['Int'];
  tooltip?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type IncidentTagsInput = {
  schemeId: Scalars['String'];
};

export type IncidentTotal = {
  __typename?: 'IncidentTotal';
  data: Array<TagTotal>;
  month: Scalars['String'];
};

export type IncidentUpdateInput = {
  activityAuthorised?: InputMaybe<NullableSetBooleanHelper>;
  answers?: InputMaybe<AnswerUpdateManyWithoutIncidentInput>;
  approved?: InputMaybe<SetBooleanHelper>;
  assignedUsers?: InputMaybe<UserUpdateManyWithoutAssignedIncidents>;
  business?: InputMaybe<NullableConnectDisconnectHelper>;
  cctvRecords?: InputMaybe<CctvRecordUpdateManyWithoutIncidentInput>;
  crimeGroups?: InputMaybe<CrimeGroupUpdateManyWithoutIncidents>;
  crimeTypes?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  customerRef?: InputMaybe<SetStringHelper>;
  date?: InputMaybe<SetDateHelper>;
  description?: InputMaybe<SetStringHelper>;
  draft?: InputMaybe<Scalars['Boolean']>;
  groups?: InputMaybe<GroupsNestedSetConnectDisconnect>;
  images?: InputMaybe<ImageUpdateManyWithoutIncidentNestedInput>;
  incidentItems?: InputMaybe<IncidentItemUpdateManyWithoutIncidentInput>;
  location?: InputMaybe<UpdateSimpleLocation>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutIncidentsNested>;
  policeAdditionalEvidence?: InputMaybe<NullableSetStringHelper>;
  policeCCTVReviewed?: InputMaybe<NullableSetBooleanHelper>;
  policeDepartment?: InputMaybe<NullableSetStringHelper>;
  policeInvolved?: InputMaybe<NullableSetBooleanHelper>;
  policeNo?: InputMaybe<NullableSetStringHelper>;
  policeOfficerName?: InputMaybe<NullableSetStringHelper>;
  policeRef?: InputMaybe<NullableSetStringHelper>;
  policeReported?: InputMaybe<NullableSetBooleanHelper>;
  priority?: InputMaybe<EnumIncidentPriorityFieldUpdateOperationsInput>;
  recoveredValue?: InputMaybe<SetFloatHelper>;
  subject?: InputMaybe<NullableSetStringHelper>;
  time?: InputMaybe<NullableSetDateHelper>;
  value?: InputMaybe<SetFloatHelper>;
  vehicles?: InputMaybe<VehicleUpdateManyWithoutIncidentsInput>;
};

export type IncidentWhereInput = {
  AND?: InputMaybe<Array<IncidentWhereInput>>;
  NOT?: InputMaybe<Array<IncidentWhereInput>>;
  OR?: InputMaybe<Array<IncidentWhereInput>>;
  activityAuthorised?: InputMaybe<BoolFilter>;
  approved?: InputMaybe<BoolNullableFilter>;
  assignedUsers?: InputMaybe<UserListRelationFilter>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  crimeTypes?: InputMaybe<TagListRelationFilter>;
  customerRef?: InputMaybe<StringFilter>;
  date?: InputMaybe<DateTimeFilter>;
  dayOfMonth?: InputMaybe<IntNullableFilter>;
  dayOfWeek?: InputMaybe<IntNullableFilter>;
  deleted?: InputMaybe<BoolFilter>;
  description?: InputMaybe<StringFilter>;
  evidence?: InputMaybe<DocumentListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  geoLat?: InputMaybe<StringNullableFilter>;
  geoLng?: InputMaybe<StringNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  hasNamedOffender?: InputMaybe<BoolFilter>;
  hasYouthOffender?: InputMaybe<BoolFilter>;
  hourOfDay?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  impressions?: InputMaybe<ImpressionListRelationFilter>;
  incidentItems?: InputMaybe<IncidentItemListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  linkedUpdates?: InputMaybe<UpdateListRelationFilter>;
  location?: InputMaybe<AddressWhereInput>;
  matches?: InputMaybe<RekMatchListRelationFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  mg11?: InputMaybe<Mg11ListRelationFilter>;
  monthOfYear?: InputMaybe<IntNullableFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  offenderIdentityScore?: InputMaybe<IntNullableFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  policeInvolved?: InputMaybe<BoolFilter>;
  policeNo?: InputMaybe<StringNullableFilter>;
  policeRef?: InputMaybe<StringNullableFilter>;
  policeReportEligible?: InputMaybe<BoolFilter>;
  policeReportSubmitted?: InputMaybe<BoolFilter>;
  policeReportSubmittedDate?: InputMaybe<DateTimeNullableFilter>;
  policeReported?: InputMaybe<BoolFilter>;
  policeResponse?: InputMaybe<EnumPoliceResponseTimeNullableFilter>;
  policeTriageBestOffenderScore?: InputMaybe<IntNullableFilter>;
  policeTriageCompositeScore?: InputMaybe<IntNullableFilter>;
  policeTriageConfidence?: InputMaybe<IntNullableFilter>;
  policeTriageDate?: InputMaybe<DateTimeNullableFilter>;
  policeTriageHighImpactFlag?: InputMaybe<BoolFilter>;
  policeTriageIncidentQuality?: InputMaybe<StringNullableFilter>;
  policeTriageOffenderImpact?: InputMaybe<StringNullableFilter>;
  policeTriageOffenderQuality?: InputMaybe<StringNullableFilter>;
  policeTriageReason?: InputMaybe<StringNullableFilter>;
  policeTriageRepeatOffender?: InputMaybe<BoolFilter>;
  policeTriageScore?: InputMaybe<IntNullableFilter>;
  policeTriageStatus?: InputMaybe<EnumPoliceTriageStatusFilter>;
  priority?: InputMaybe<EnumIncidentPriorityFilter>;
  recoveredValue?: InputMaybe<FloatNullableFilter>;
  recycleBin?: InputMaybe<RecycledItemWhereInput>;
  recycleDate?: InputMaybe<DateTimeFilter>;
  recycled?: InputMaybe<BoolFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  skipFeedItem?: InputMaybe<BoolFilter>;
  skipNotification?: InputMaybe<BoolFilter>;
  statusId?: InputMaybe<StringNullableFilter>;
  subject?: InputMaybe<StringNullableFilter>;
  subscribedUsers?: InputMaybe<UserListRelationFilter>;
  time?: InputMaybe<DateTimeFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updates?: InputMaybe<UpdateListRelationFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
  value?: InputMaybe<FloatNullableFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
  weekOfMonth?: InputMaybe<IntNullableFilter>;
  weekOfYear?: InputMaybe<IntNullableFilter>;
};

export type IncidentWhereUniqueInput = {
  AND?: InputMaybe<Array<IncidentWhereInput>>;
  NOT?: InputMaybe<Array<IncidentWhereInput>>;
  OR?: InputMaybe<Array<IncidentWhereInput>>;
  activityAuthorised?: InputMaybe<BoolFilter>;
  approved?: InputMaybe<BoolNullableFilter>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  crimeTypes?: InputMaybe<TagListRelationFilter>;
  date?: InputMaybe<DateTimeFilter>;
  dayOfMonth?: InputMaybe<IntNullableFilter>;
  dayOfWeek?: InputMaybe<IntNullableFilter>;
  deleted?: InputMaybe<BoolFilter>;
  description?: InputMaybe<StringFilter>;
  evidence?: InputMaybe<DocumentListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  geoLat?: InputMaybe<StringNullableFilter>;
  geoLng?: InputMaybe<StringNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  hourOfDay?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageListRelationFilter>;
  impressions?: InputMaybe<ImpressionListRelationFilter>;
  incidentItems?: InputMaybe<IncidentItemListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  linkedUpdates?: InputMaybe<UpdateListRelationFilter>;
  location?: InputMaybe<AddressWhereInput>;
  matches?: InputMaybe<RekMatchListRelationFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  mg11?: InputMaybe<Mg11ListRelationFilter>;
  monthOfYear?: InputMaybe<IntNullableFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  policeInvolved?: InputMaybe<BoolFilter>;
  policeNo?: InputMaybe<StringNullableFilter>;
  policeRef?: InputMaybe<StringNullableFilter>;
  policeReported?: InputMaybe<BoolFilter>;
  policeResponse?: InputMaybe<EnumPoliceResponseTimeNullableFilter>;
  recoveredValue?: InputMaybe<FloatNullableFilter>;
  recycleBin?: InputMaybe<RecycledItemWhereInput>;
  recycleDate?: InputMaybe<DateTimeFilter>;
  recycled?: InputMaybe<BoolFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  skipFeedItem?: InputMaybe<BoolFilter>;
  skipNotification?: InputMaybe<BoolFilter>;
  subject?: InputMaybe<StringNullableFilter>;
  subscribedUsers?: InputMaybe<UserListRelationFilter>;
  time?: InputMaybe<DateTimeFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updates?: InputMaybe<UpdateListRelationFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
  value?: InputMaybe<FloatNullableFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
  weekOfMonth?: InputMaybe<IntNullableFilter>;
  weekOfYear?: InputMaybe<IntNullableFilter>;
};

export type IncidentsByType = {
  __typename?: 'IncidentsByType';
  data: Array<Scalars['Int']>;
  types: Array<Scalars['String']>;
};

export type IndexOffenderImagesInput = {
  /** The ID of the scheme to process offender images for */
  schemeId: Scalars['String'];
};

export type IndexOffenderImagesResult = {
  __typename?: 'IndexOffenderImagesResult';
  /** Estimated time for completion */
  estimatedTime?: Maybe<Scalars['String']>;
  /** The ID of the queued face indexing job */
  jobId: Scalars['String'];
  /** Status message for the user */
  message: Scalars['String'];
};

export type Industry = {
  __typename?: 'Industry';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type IndustryWhereInput = {
  id?: InputMaybe<StringFilter>;
};

export type IndustryWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedIntNullableFilter>;
  _sum?: InputMaybe<NestedIntNullableFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntegrationConfig = {
  __typename?: 'IntegrationConfig';
  conditions?: Maybe<Scalars['JSON']>;
  config: Scalars['JSON'];
  createdAt: Scalars['Date'];
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  lastError?: Maybe<Scalars['String']>;
  lastErrorAt?: Maybe<Scalars['Date']>;
  lastSuccess?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  scheme: Scheme;
  schemeId: Scalars['String'];
  totalAttempts: Scalars['Int'];
  totalFailures: Scalars['Int'];
  totalSuccess: Scalars['Int'];
  type: IntegrationType;
  updatedAt: Scalars['Date'];
};

export type IntegrationTestResult = {
  __typename?: 'IntegrationTestResult';
  details?: Maybe<Scalars['JSON']>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export enum IntegrationType {
  Api = 'API',
  Sentrysys = 'SENTRYSYS',
  Webhook = 'WEBHOOK'
}

export type Intel = {
  __typename?: 'Intel';
  createdAt: Scalars['Date'];
  createdBy: User;
  crimeGroup?: Maybe<CrimeGroup>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  incident?: Maybe<Incident>;
  offender?: Maybe<Offender>;
  replies?: Maybe<Array<Intel>>;
  replyTo?: Maybe<Intel>;
  replyToString?: Maybe<Scalars['String']>;
  suggestedOffender?: Maybe<Offender>;
  text?: Maybe<Scalars['String']>;
  type: IntelType;
  updatedAt: Scalars['Date'];
};

export type IntelListRelationFilter = {
  every?: InputMaybe<IntelWhereInput>;
  none?: InputMaybe<IntelWhereInput>;
  some?: InputMaybe<IntelWhereInput>;
};

export type IntelOneImportDataInput = {
  scheme: UniqueId;
  url: Scalars['String'];
};

export type IntelOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type IntelOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  crimeGroup?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  crimeGroupId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageOrderByWithRelationInput>;
  imageId?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  investigation?: InputMaybe<InvestigationOrderByWithRelationInput>;
  investigationId?: InputMaybe<SortOrder>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  replies?: InputMaybe<IntelOrderByRelationAggregateInput>;
  replyTo?: InputMaybe<IntelOrderByWithRelationInput>;
  replyToString?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  suggestedOffenderId?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum IntelScalarFieldEnum {
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  CrimeGroupId = 'crimeGroupId',
  Id = 'id',
  ImageId = 'imageId',
  IncidentId = 'incidentId',
  InvestigationId = 'investigationId',
  OffenderId = 'offenderId',
  ReplyToString = 'replyToString',
  SchemeId = 'schemeId',
  SuggestedOffenderId = 'suggestedOffenderId',
  Text = 'text',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

export enum IntelType {
  AddImage = 'ADD_IMAGE',
  AddOffender = 'ADD_OFFENDER',
  Comment = 'COMMENT',
  SuggestOffender = 'SUGGEST_OFFENDER'
}

export type IntelWhereInput = {
  AND?: InputMaybe<Array<IntelWhereInput>>;
  NOT?: InputMaybe<Array<IntelWhereInput>>;
  OR?: InputMaybe<Array<IntelWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeGroup?: InputMaybe<CrimeGroupWhereInput>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<ImageWhereInput>;
  imageId?: InputMaybe<StringNullableFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigation?: InputMaybe<InvestigationWhereInput>;
  investigationId?: InputMaybe<StringNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  replies?: InputMaybe<IntelListRelationFilter>;
  replyTo?: InputMaybe<IntelWhereInput>;
  replyToString?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  suggestedOffenderId?: InputMaybe<StringNullableFilter>;
  text?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumIntelTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type IntelWhereUniqueInput = {
  AND?: InputMaybe<Array<IntelWhereInput>>;
  NOT?: InputMaybe<Array<IntelWhereInput>>;
  OR?: InputMaybe<Array<IntelWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeGroup?: InputMaybe<CrimeGroupWhereInput>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageWhereInput>;
  imageId?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigation?: InputMaybe<InvestigationWhereInput>;
  investigationId?: InputMaybe<StringNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  replies?: InputMaybe<IntelListRelationFilter>;
  replyTo?: InputMaybe<IntelWhereInput>;
  replyToString?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  suggestedOffenderId?: InputMaybe<StringNullableFilter>;
  text?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumIntelTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Investigation = {
  __typename?: 'Investigation';
  closedAt?: Maybe<Scalars['Date']>;
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['String'];
  crimeGroups: Array<CrimeGroup>;
  description?: Maybe<Scalars['String']>;
  documents: Array<Document>;
  feedItems: Array<FeedItem>;
  flows: Array<Flow>;
  groups: Array<Group>;
  id: Scalars['ID'];
  incidents: Array<Incident>;
  intel: Array<Intel>;
  latestUpdate?: Maybe<Update>;
  linkedUpdates: Array<Update>;
  messages: Array<Message>;
  name: Scalars['String'];
  notifications: Array<Notification>;
  offenders: Array<Offender>;
  priority: InvestigationPriority;
  ref: Scalars['String'];
  reference?: Maybe<Scalars['Int']>;
  referenceStr?: Maybe<Scalars['String']>;
  status: InvestigationStatus;
  subscribed: Scalars['Boolean'];
  subscribedUsers: Array<User>;
  suggestedCrimeGroups: Array<CrimeGroup>;
  suggestedIncidents: Array<Incident>;
  suggestedOffenders: Array<Offender>;
  suggestedVehicles: Array<Vehicle>;
  todos: Array<Todo>;
  totalCrimeGroups: Scalars['Int'];
  totalIncidents: Scalars['Int'];
  totalOffenders: Scalars['Int'];
  totalRecoveredValue: Scalars['Float'];
  totalTheftSuccess: Scalars['Float'];
  totalUpdates: Scalars['Int'];
  totalValue: Scalars['Float'];
  totalVehicles: Scalars['Int'];
  type: InvestigationType;
  updatedAt: Scalars['Date'];
  updates: Array<Update>;
  vehicles: Array<Vehicle>;
};


export type InvestigationCrimeGroupsArgs = {
  cursor?: InputMaybe<CrimeGroupWhereUniqueInput>;
  distinct?: InputMaybe<CrimeGroupScalarFieldEnum>;
  orderBy?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CrimeGroupWhereInput>;
};


export type InvestigationDocumentsArgs = {
  cursor?: InputMaybe<DocumentWhereUniqueInput>;
  distinct?: InputMaybe<Array<DocumentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DocumentWhereInput>;
};


export type InvestigationFeedItemsArgs = {
  cursor?: InputMaybe<FeedItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeedItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeedItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
};


export type InvestigationGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type InvestigationIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type InvestigationIntelArgs = {
  cursor?: InputMaybe<IntelWhereUniqueInput>;
  distinct?: InputMaybe<Array<IntelScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IntelOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IntelWhereInput>;
};


export type InvestigationLinkedUpdatesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type InvestigationMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type InvestigationNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type InvestigationOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type InvestigationSubscribedUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type InvestigationTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<Array<TodoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TodoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};


export type InvestigationUpdatesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type InvestigationVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<VehicleScalarFieldEnum>;
  orderBy?: InputMaybe<VehicleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
};

export type InvestigationByType = {
  __typename?: 'InvestigationByType';
  /** Average offenders identified per investigation */
  averageOffendersIdentified: Scalars['Float'];
  /** Average resolution time */
  averageResolutionDays: Scalars['Float'];
  /** Number of investigations */
  count: Scalars['Int'];
  /** Type/category of investigation */
  investigationType: Scalars['String'];
  /** Number resolved */
  resolvedCount: Scalars['Int'];
  /** Success rate for this type */
  successRate: Scalars['Float'];
};

export type InvestigationListRelationFilter = {
  every?: InputMaybe<InvestigationWhereInput>;
  none?: InputMaybe<InvestigationWhereInput>;
  some?: InputMaybe<InvestigationWhereInput>;
};

export type InvestigationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type InvestigationOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  crimeGroups?: InputMaybe<CrimeGroupOrderByRelationAggregateInput>;
  description?: InputMaybe<SortOrder>;
  documents?: InputMaybe<DocumentOrderByRelationAggregateInput>;
  feedItems?: InputMaybe<FeedItemOrderByRelationAggregateInput>;
  flows?: InputMaybe<FlowOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  intel?: InputMaybe<IntelOrderByRelationAggregateInput>;
  linkedUpdates?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  ref?: InputMaybe<SortOrder>;
  reference?: InputMaybe<SortOrder>;
  referenceStr?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  status?: InputMaybe<SortOrder>;
  subscribedUsers?: InputMaybe<UserOrderByRelationAggregateInput>;
  todos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  updates?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  vehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
};

export type InvestigationPerformance = {
  __typename?: 'InvestigationPerformance';
  alertId: Scalars['String'];
  closedAt?: Maybe<Scalars['Date']>;
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  name: Scalars['String'];
  status: InvestigationStatus;
  totalIncidents: Scalars['Int'];
  totalOffenders: Scalars['Int'];
  totalRecoveredValue?: Maybe<Scalars['Float']>;
  totalSuccessRate?: Maybe<Scalars['Float']>;
  totalValue: Scalars['Float'];
};

export enum InvestigationPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Normal = 'NORMAL'
}

export enum InvestigationScalarFieldEnum {
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  Description = 'description',
  Id = 'id',
  Name = 'name',
  Ref = 'ref',
  Reference = 'reference',
  ReferenceStr = 'referenceStr',
  SchemeId = 'schemeId',
  Status = 'status',
  UpdatedAt = 'updatedAt'
}

export type InvestigationScalarWhereInput = {
  AND?: InputMaybe<Array<InvestigationScalarWhereInput>>;
  NOT?: InputMaybe<Array<InvestigationScalarWhereInput>>;
  OR?: InputMaybe<Array<InvestigationScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  schemeId?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumInvestigationStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type InvestigationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<InvestigationScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<InvestigationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<InvestigationScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  createdById?: InputMaybe<StringWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  ref?: InputMaybe<StringNullableWithAggregatesFilter>;
  reference?: InputMaybe<IntNullableWithAggregatesFilter>;
  referenceStr?: InputMaybe<StringNullableWithAggregatesFilter>;
  schemeId?: InputMaybe<StringWithAggregatesFilter>;
  status?: InputMaybe<EnumInvestigationStatusWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export enum InvestigationStatus {
  Closed = 'CLOSED',
  Open = 'OPEN',
  Paused = 'PAUSED'
}

export type InvestigationSuccessRate = {
  __typename?: 'InvestigationSuccessRate';
  /** Average days to resolve an investigation */
  averageResolutionDays: Scalars['Float'];
  /** Number of closed investigations */
  closedInvestigations: Scalars['Int'];
  /** Investigations linked to incidents */
  investigationsWithIncidents: Scalars['Int'];
  /** Investigations that identified offenders */
  investigationsWithOffenders: Scalars['Int'];
  /** Percentage of investigations that identified offenders */
  offenderIdentificationRate: Scalars['Float'];
  /** Number of open investigations */
  openInvestigations: Scalars['Int'];
  /** Number of resolved investigations */
  resolvedInvestigations: Scalars['Int'];
  /** Percentage of investigations resolved successfully */
  successRate: Scalars['Float'];
  /** Total number of investigations */
  totalInvestigations: Scalars['Int'];
};

export type InvestigationSummary = {
  __typename?: 'InvestigationSummary';
  closed: Scalars['Int'];
  open: Scalars['Int'];
  opened: Scalars['Int'];
};

export type InvestigationTableWhereInput = {
  brandsIds?: InputMaybe<Array<Scalars['String']>>;
  businessesIds?: InputMaybe<Array<Scalars['String']>>;
  crimeGroupIds?: InputMaybe<Array<Scalars['String']>>;
  dateRange?: InputMaybe<DateRangeInput>;
  groupIds: Array<Scalars['String']>;
  industryIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<InvestigationStatus>>;
  totalValue?: InputMaybe<Scalars['Int']>;
};

export type InvestigationTimeline = {
  __typename?: 'InvestigationTimeline';
  /** Investigations created */
  created: Scalars['Int'];
  /** Month */
  month: Scalars['String'];
  /** Investigations resolved */
  resolved: Scalars['Int'];
  /** Success rate for the month */
  successRate: Scalars['Float'];
};

export enum InvestigationType {
  CriminalDamage = 'CRIMINAL_DAMAGE',
  CyberFraud = 'CYBER_FRAUD',
  EmployeeTheft = 'EMPLOYEE_THEFT',
  Fraud = 'FRAUD',
  General = 'GENERAL',
  OrganisedRetailCrime = 'ORGANISED_RETAIL_CRIME',
  Robbery = 'ROBBERY',
  Shoplifting = 'SHOPLIFTING',
  StockLoss = 'STOCK_LOSS',
  VendorFraud = 'VENDOR_FRAUD'
}

export type InvestigationWhereInput = {
  AND?: InputMaybe<Array<InvestigationWhereInput>>;
  NOT?: InputMaybe<Array<InvestigationWhereInput>>;
  OR?: InputMaybe<Array<InvestigationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  deleted?: InputMaybe<BoolNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  documents?: InputMaybe<DocumentListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  flows?: InputMaybe<FlowListRelationFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  linkedUpdates?: InputMaybe<UpdateListRelationFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  recycled?: InputMaybe<BoolNullableFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  status?: InputMaybe<EnumInvestigationStatusFilter>;
  subscribedUsers?: InputMaybe<UserListRelationFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updates?: InputMaybe<UpdateListRelationFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type InvestigationWhereUniqueInput = {
  AND?: InputMaybe<Array<InvestigationWhereInput>>;
  NOT?: InputMaybe<Array<InvestigationWhereInput>>;
  OR?: InputMaybe<Array<InvestigationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  description?: InputMaybe<StringNullableFilter>;
  documents?: InputMaybe<DocumentListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  flows?: InputMaybe<FlowListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  linkedUpdates?: InputMaybe<UpdateListRelationFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  status?: InputMaybe<EnumInvestigationStatusFilter>;
  subscribedUsers?: InputMaybe<UserListRelationFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updates?: InputMaybe<UpdateListRelationFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type JdSiteImportInput = {
  fileUrl: Scalars['String'];
  /** Which scheme(s) to process. Defaults to BOTH */
  schemeSelection?: InputMaybe<JdSiteSchemeSelection>;
};

/** Select which scheme(s) to import data into */
export enum JdSiteSchemeSelection {
  Both = 'BOTH',
  Jdna = 'JDNA',
  JdNexus = 'JD_NEXUS'
}

export type JsonFilter = {
  array_contains?: InputMaybe<Scalars['JSON']>;
  array_ends_with?: InputMaybe<Scalars['JSON']>;
  array_starts_with?: InputMaybe<Scalars['JSON']>;
  equals?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<Scalars['JSON']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type JsonNullableFilter = {
  array_contains?: InputMaybe<Scalars['JSON']>;
  array_ends_with?: InputMaybe<Scalars['JSON']>;
  array_starts_with?: InputMaybe<Scalars['JSON']>;
  equals?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<Scalars['JSON']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type JsonNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['JSON']>>;
  has?: InputMaybe<Scalars['JSON']>;
  hasEvery?: InputMaybe<Array<Scalars['JSON']>>;
  hasSome?: InputMaybe<Array<Scalars['JSON']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type JsonNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedJsonNullableFilter>;
  _min?: InputMaybe<NestedJsonNullableFilter>;
  array_contains?: InputMaybe<Scalars['JSON']>;
  array_ends_with?: InputMaybe<Scalars['JSON']>;
  array_starts_with?: InputMaybe<Scalars['JSON']>;
  equals?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<Scalars['JSON']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type JsonWithAggregatesFilter = {
  array_contains?: InputMaybe<Scalars['JSON']>;
  array_ends_with?: InputMaybe<Scalars['JSON']>;
  array_starts_with?: InputMaybe<Scalars['JSON']>;
  equals?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<Scalars['JSON']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type KeyValuePair = {
  __typename?: 'KeyValuePair';
  key: Scalars['String'];
  value: Scalars['Int'];
};

export type LpStockLossApprovalBreakdown = {
  __typename?: 'LPStockLossApprovalBreakdown';
  approved: Scalars['Int'];
  pending: Scalars['Int'];
};

export enum LpStockLossBusinessHotspotsOrderBy {
  IncidentCount = 'INCIDENT_COUNT',
  NetValue = 'NET_VALUE',
  TotalValue = 'TOTAL_VALUE',
  TotalValueRecovered = 'TOTAL_VALUE_RECOVERED'
}

export type LpStockLossBusinessRef = {
  __typename?: 'LPStockLossBusinessRef';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type LpStockLossBusinessRow = {
  __typename?: 'LPStockLossBusinessRow';
  id: Scalars['String'];
  incidentCount: Scalars['Int'];
  name: Scalars['String'];
  /** totalValueLost minus totalValueRecovered */
  netValueLost: Scalars['Float'];
  recoveryRate: Scalars['Float'];
  /** Top 3 item names targeted at this business */
  topTargetedItems: Array<Scalars['String']>;
  /** Gross value stolen (before recovery) */
  totalValueLost: Scalars['Float'];
  totalValueRecovered: Scalars['Float'];
};

export type LpStockLossBusinessValueItem = {
  __typename?: 'LPStockLossBusinessValueItem';
  id: Scalars['String'];
  incidentCount: Scalars['Int'];
  name: Scalars['String'];
  totalValueLost: Scalars['Float'];
};

export type LpStockLossDailyItem = {
  __typename?: 'LPStockLossDailyItem';
  count: Scalars['Int'];
  /** Day of week (0=Sun … 6=Sat) */
  dayOfWeek: Scalars['Int'];
};

export type LpStockLossGoodsTypeMonthItem = {
  __typename?: 'LPStockLossGoodsTypeMonthItem';
  count: Scalars['Int'];
  /** YYYY-MM */
  month: Scalars['String'];
};

export enum LpStockLossGoodsTypeOrderBy {
  IncidentCount = 'INCIDENT_COUNT',
  NetValue = 'NET_VALUE',
  TotalValue = 'TOTAL_VALUE',
  TotalValueRecovered = 'TOTAL_VALUE_RECOVERED'
}

export type LpStockLossGoodsTypeRow = {
  __typename?: 'LPStockLossGoodsTypeRow';
  goodsTypeId: Scalars['String'];
  goodsTypeName: Scalars['String'];
  incidentCount: Scalars['Int'];
  /** Monthly incident count trend */
  monthlyTrend: Array<LpStockLossGoodsTypeMonthItem>;
  /** totalValueLost minus totalValueRecovered */
  netValueLost: Scalars['Float'];
  recoveryRate: Scalars['Float'];
  /** Top 3 items by incident count in this category */
  topItems: Array<LpStockLossGoodsTypeTopItem>;
  /** Gross value stolen (before recovery) */
  totalValueLost: Scalars['Float'];
  totalValueRecovered: Scalars['Float'];
};

export type LpStockLossGoodsTypeTopItem = {
  __typename?: 'LPStockLossGoodsTypeTopItem';
  incidentCount: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type LpStockLossHourlyItem = {
  __typename?: 'LPStockLossHourlyItem';
  count: Scalars['Int'];
  /** Hour of day (0-23) */
  hour: Scalars['Int'];
};

export type LpStockLossIncidentAnalysis = {
  __typename?: 'LPStockLossIncidentAnalysis';
  approvalBreakdown: LpStockLossApprovalBreakdown;
  /** Top 10 businesses by total value lost */
  byBusiness: Array<LpStockLossBusinessValueItem>;
  /** Incident distribution by day of week */
  byDayOfWeek: Array<LpStockLossDailyItem>;
  /** Incident distribution by hour of day */
  byHour: Array<LpStockLossHourlyItem>;
};

export enum LpStockLossOffenderOrderBy {
  IncidentCount = 'INCIDENT_COUNT',
  NetValue = 'NET_VALUE',
  TotalValue = 'TOTAL_VALUE',
  TotalValueRecovered = 'TOTAL_VALUE_RECOVERED'
}

export type LpStockLossOffenderRow = {
  __typename?: 'LPStockLossOffenderRow';
  /** Business names */
  businessesTargeted: Array<Scalars['String']>;
  id: Scalars['String'];
  incidentCount: Scalars['Int'];
  /** Stock item names from their incident items */
  itemsTargeted: Array<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** totalValueAssociated minus totalValueRecovered */
  netValueLost: Scalars['Float'];
  /** Gross value across associated incidents */
  totalValueAssociated: Scalars['Float'];
  totalValueRecovered: Scalars['Float'];
};

export type LpStockLossRecoveryAnalysis = {
  __typename?: 'LPStockLossRecoveryAnalysis';
  byBusiness: Array<LpStockLossRecoveryRateRow>;
  byGoodsType: Array<LpStockLossRecoveryRateRow>;
  /** Items with highest absolute recovered value */
  highestAbsoluteRecoveryItems: Array<LpStockLossZeroRecoveryItem>;
  overallRecoveryRate: Scalars['Float'];
  /** Items with loss but zero recovery */
  zeroRecoveryItems: Array<LpStockLossZeroRecoveryItem>;
};

export type LpStockLossRecoveryRateRow = {
  __typename?: 'LPStockLossRecoveryRateRow';
  id: Scalars['String'];
  name: Scalars['String'];
  recoveryRate: Scalars['Float'];
  totalValueLost: Scalars['Float'];
  totalValueRecovered: Scalars['Float'];
};

export type LpStockLossReportData = {
  __typename?: 'LPStockLossReportData';
  /** Businesses ranked by total stock value lost */
  businessHotspots?: Maybe<Array<LpStockLossBusinessRow>>;
  /** Loss breakdown by goods category (12-month window) */
  goodsTypeBreakdown?: Maybe<Array<LpStockLossGoodsTypeRow>>;
  /** Incident patterns: approval status, business, time */
  incidentAnalysis?: Maybe<LpStockLossIncidentAnalysis>;
  /** Top 20 offenders associated with stock loss incidents */
  offenderAssociations?: Maybe<Array<LpStockLossOffenderRow>>;
  /** Recovery rate analysis by goods type, business, and item */
  recoveryAnalysis?: Maybe<LpStockLossRecoveryAnalysis>;
  /** Headline KPIs for the period */
  summary: LpStockLossSummary;
  /** Top 20 most targeted stock items in period */
  topTargetedItems?: Maybe<Array<LpStockLossTargetedItem>>;
};

export enum LpStockLossSection {
  BusinessHotspots = 'BUSINESS_HOTSPOTS',
  GoodsTypeBreakdown = 'GOODS_TYPE_BREAKDOWN',
  IncidentAnalysis = 'INCIDENT_ANALYSIS',
  OffenderAssociations = 'OFFENDER_ASSOCIATIONS',
  RecoveryAnalysis = 'RECOVERY_ANALYSIS',
  Summary = 'SUMMARY',
  TopTargetedItems = 'TOP_TARGETED_ITEMS'
}

export type LpStockLossSummary = {
  __typename?: 'LPStockLossSummary';
  /** Distinct businessIds across incidents */
  businessesAffected: Scalars['Int'];
  /** % change in incidents vs previous equivalent period */
  periodIncidentChange?: Maybe<Scalars['Float']>;
  /** % change in value lost vs previous equivalent period */
  periodValueChange?: Maybe<Scalars['Float']>;
  /** totalValueRecovered / totalValueLost, 0 if no loss */
  recoveryRate: Scalars['Float'];
  /** Total distinct incidents containing stock items in period */
  totalIncidents: Scalars['Int'];
  /** Sum of item loss values in period */
  totalValueLost: Scalars['Float'];
  /** Sum of recovered item values in period */
  totalValueRecovered: Scalars['Float'];
  /** Distinct stockItemIds in IncidentItems */
  uniqueItemsStolen: Scalars['Int'];
  /** Distinct offender IDs across incidents */
  uniqueOffenders: Scalars['Int'];
};

export type LpStockLossTargetedItem = {
  __typename?: 'LPStockLossTargetedItem';
  barcode?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  goodsTypeName?: Maybe<Scalars['String']>;
  incidentCount: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  /** totalValueLost minus totalValueRecovered */
  netValueLost: Scalars['Float'];
  recoveryRate: Scalars['Float'];
  sku?: Maybe<Scalars['String']>;
  stockItemId: Scalars['String'];
  /** Top businesses where this item was targeted */
  topBusinesses: Array<LpStockLossBusinessRef>;
  totalQuantityLost: Scalars['Int'];
  /** Gross value stolen (before recovery) */
  totalValueLost: Scalars['Float'];
  totalValueRecovered: Scalars['Float'];
};

export enum LpStockLossTopItemsOrderBy {
  IncidentCount = 'INCIDENT_COUNT',
  NetValue = 'NET_VALUE',
  TotalValue = 'TOTAL_VALUE',
  TotalValueRecovered = 'TOTAL_VALUE_RECOVERED'
}

export type LpStockLossZeroRecoveryItem = {
  __typename?: 'LPStockLossZeroRecoveryItem';
  name?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  stockItemId: Scalars['String'];
  totalValueLost: Scalars['Float'];
};

export type Language = {
  __typename?: 'Language';
  code: LanguageCode;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  schemes: Array<Scheme>;
  updatedAt: Scalars['Date'];
};


export type LanguageSchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};

export type LanguageAlternative = {
  __typename?: 'LanguageAlternative';
  confidence: Scalars['Float'];
  language: Scalars['String'];
};

export enum LanguageCode {
  Da = 'da',
  De = 'de',
  El = 'el',
  En = 'en',
  Es = 'es',
  Fi = 'fi',
  Fr = 'fr',
  Hu = 'hu',
  Id = 'id',
  It = 'it',
  Ms = 'ms',
  Nl = 'nl',
  Pl = 'pl',
  Pt = 'pt',
  Rbe = 'rbe',
  Ro = 'ro',
  Sv = 'sv',
  Th = 'th'
}

export type LanguageDetectionResult = {
  __typename?: 'LanguageDetectionResult';
  alternativeLanguages: Array<LanguageAlternative>;
  confidence: Scalars['Float'];
  detectedLanguage: Scalars['String'];
  recommendedWhisperLanguage?: Maybe<Scalars['String']>;
  supportedByWhisper: Scalars['Boolean'];
  translationRequired: Scalars['Boolean'];
};

export type LanguageListRelationFilter = {
  every?: InputMaybe<LanguageWhereInput>;
  none?: InputMaybe<LanguageWhereInput>;
  some?: InputMaybe<LanguageWhereInput>;
};

export type LanguageOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type LanguageOrderByWithRelationInput = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum LanguageScalarFieldEnum {
  Code = 'code',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type LanguageScalarWhereInput = {
  AND?: InputMaybe<Array<LanguageScalarWhereInput>>;
  NOT?: InputMaybe<Array<LanguageScalarWhereInput>>;
  OR?: InputMaybe<Array<LanguageScalarWhereInput>>;
  code?: InputMaybe<EnumLanguageCodeFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type LanguageScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<LanguageScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<LanguageScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<LanguageScalarWhereWithAggregatesInput>>;
  code?: InputMaybe<EnumLanguageCodeWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type LanguageWhereInput = {
  AND?: InputMaybe<Array<LanguageWhereInput>>;
  NOT?: InputMaybe<Array<LanguageWhereInput>>;
  OR?: InputMaybe<Array<LanguageWhereInput>>;
  code?: InputMaybe<EnumLanguageCodeFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type LanguageWhereUniqueInput = {
  AND?: InputMaybe<Array<LanguageWhereInput>>;
  NOT?: InputMaybe<Array<LanguageWhereInput>>;
  OR?: InputMaybe<Array<LanguageWhereInput>>;
  code?: InputMaybe<EnumLanguageCodeFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type LatLngId = {
  __typename?: 'LatLngId';
  geoLat?: Maybe<Scalars['Float']>;
  geoLng?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
};

export type LatestIncident = {
  __typename?: 'LatestIncident';
  date: Scalars['DateTime'];
  id: Scalars['String'];
};

export enum LicenceType {
  BusinessCount = 'BUSINESS_COUNT',
  UserCount = 'USER_COUNT'
}

export type ListActions = {
  __typename?: 'ListActions';
  actions: Array<Action>;
  total: Scalars['Int'];
};

export type ListActivityPerformance = {
  __typename?: 'ListActivityPerformance';
  activityPerformance: Array<ActivityPerformance>;
  total: Scalars['Int'];
};

export type ListArticles = {
  __typename?: 'ListArticles';
  articles: Array<Article>;
  total: Scalars['Int'];
};

export type ListBusinessContribution = {
  __typename?: 'ListBusinessContribution';
  businessContributions: Array<BusinessContributions>;
  total: Scalars['Int'];
};

export type ListBusinessQuestions = {
  __typename?: 'ListBusinessQuestions';
  businessQuestions: Array<BusinessQuestion>;
  total: Scalars['Int'];
};

export type ListBusinesses = {
  __typename?: 'ListBusinesses';
  businesses: Array<Business>;
  total: Scalars['Int'];
};

export type ListChecklistPerformance = {
  __typename?: 'ListChecklistPerformance';
  checklistPerformance: Array<ChecklistPerformance>;
  total: Scalars['Int'];
};

export type ListCompassMatches = {
  __typename?: 'ListCompassMatches';
  matches: Array<CompassMatch>;
  total: Scalars['Int'];
};

export type ListCrimeGroupPerformance = {
  __typename?: 'ListCrimeGroupPerformance';
  crimeGroupPerformance: Array<CrimeGroupPerformance>;
  total: Scalars['Int'];
};

export type ListCrimeGroups = {
  __typename?: 'ListCrimeGroups';
  crimeGroups: Array<CrimeGroup>;
  total: Scalars['Int'];
};

export type ListCustomGalleries = {
  __typename?: 'ListCustomGalleries';
  customGalleries: Array<CustomGallery>;
  total: Scalars['Int'];
};

export type ListDemCompanies = {
  __typename?: 'ListDemCompanies';
  demCompanies: Array<DemCompany>;
  total: Scalars['Int'];
};

export type ListDemEvidence = {
  __typename?: 'ListDemEvidence';
  demEvidence: Array<DemEvidence>;
  total: Scalars['Int'];
};

export type ListDemEvidenceExtended = {
  __typename?: 'ListDemEvidenceExtended';
  demEvidence: Array<DemEvidenceExtended>;
  total: Scalars['Int'];
};

export type ListDemEvidenceRelay = {
  __typename?: 'ListDemEvidenceRelay';
  edges: Array<DemEvidenceNode>;
  pageInfo: PageInfoRelay;
  totalCount: Scalars['Int'];
};

export type ListDemUsers = {
  __typename?: 'ListDemUsers';
  demUsers: Array<DemUser>;
  total: Scalars['Int'];
};

export type ListFeedItems = {
  __typename?: 'ListFeedItems';
  feedItems: Array<FeedItem>;
  total: Scalars['Int'];
};

export type ListGoodsTypeWhere = {
  schemes: SchemeInputArg;
};

export type ListGoodsTypes = {
  __typename?: 'ListGoodsTypes';
  goodsTypes: Array<GoodsType>;
  total: Scalars['Int'];
};

export type ListIncidentPerformance = {
  __typename?: 'ListIncidentPerformance';
  incidentPerformance: Array<IncidentPerformance>;
  total: Scalars['Int'];
};

export type ListIncidents = {
  __typename?: 'ListIncidents';
  incidents: Array<Incident>;
  total: Scalars['Int'];
};

export type ListIncidentsHeatPerformance = {
  __typename?: 'ListIncidentsHeatPerformance';
  incidents: Array<HeatMapLocations>;
  total: Scalars['Int'];
};

export type ListInvestigationPerformance = {
  __typename?: 'ListInvestigationPerformance';
  investigationPerformance: Array<InvestigationPerformance>;
  total: Scalars['Int'];
};

export type ListInvestigations = {
  __typename?: 'ListInvestigations';
  investigations: Array<Investigation>;
  total: Scalars['Int'];
};

export type ListLoginEvents = {
  __typename?: 'ListLoginEvents';
  loginEvents: Array<LoginEvent>;
  total: Scalars['Int'];
};

export type ListNotifications = {
  __typename?: 'ListNotifications';
  notifications: Array<Notification>;
  total: Scalars['Int'];
};

export type ListOffenderPerformance = {
  __typename?: 'ListOffenderPerformance';
  offenderPerformance: Array<OffenderPerformance>;
  total: Scalars['Int'];
};

export type ListOffenders = {
  __typename?: 'ListOffenders';
  offenders: Array<Offender>;
  total: Scalars['Int'];
};

export type ListRekMatches = {
  __typename?: 'ListRekMatches';
  matches: Array<RekMatch>;
  total: Scalars['Int'];
};

export type ListStockItems = {
  __typename?: 'ListStockItems';
  stockItems: Array<StockItem>;
  total: Scalars['Int'];
};

export type ListTags = {
  __typename?: 'ListTags';
  tags: Array<Tag>;
  total: Scalars['Int'];
};

export type ListTargetedGoods = {
  __typename?: 'ListTargetedGoods';
  targetedGoods: Array<TargetedGood>;
  total: Scalars['Int'];
};

export type ListTodos = {
  __typename?: 'ListTodos';
  completedTodos: Array<Todo>;
  completedTotal: Scalars['Int'];
  todos: Array<Todo>;
  total: Scalars['Int'];
  totalUserTodos: Scalars['Int'];
  uncompletedTodos: Array<Todo>;
  uncompletedTotal: Scalars['Int'];
};

export type ListUserContribution = {
  __typename?: 'ListUserContribution';
  total: Scalars['Int'];
  userContributions: Array<UserContribution>;
};

export type ListUserNotifications = {
  __typename?: 'ListUserNotifications';
  notifications: Array<UserNotification>;
  total: Scalars['Int'];
};

export type ListUsers = {
  __typename?: 'ListUsers';
  total: Scalars['Int'];
  users: Array<User>;
};

export type ListVehicles = {
  __typename?: 'ListVehicles';
  total: Scalars['Int'];
  vehicles: Array<Vehicle>;
};

export type LocationUpdate = {
  data: SimpleLocationSet;
  where?: InputMaybe<AddressWhereUniqueInput>;
};

export type LocationUpdateInputField = {
  update?: InputMaybe<Array<SimpleAddressUpdateBusinessInput>>;
};

export type LocationUpsert = {
  create: SimpleLocation;
  update: SimpleLocationSet;
  where?: InputMaybe<AddressWhereInput>;
};

export type LoginEvent = {
  __typename?: 'LoginEvent';
  createdAt: Scalars['Date'];
  geoIp?: Maybe<GeoIp>;
  id: Scalars['ID'];
  ipAddress: Scalars['String'];
  loginTime: Scalars['Date'];
  updatedAt: Scalars['Date'];
  user: User;
};

export type LoginEventListRelationFilter = {
  every?: InputMaybe<LoginEventWhereInput>;
  none?: InputMaybe<LoginEventWhereInput>;
  some?: InputMaybe<LoginEventWhereInput>;
};

export type LoginEventOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type LoginEventOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  geoIp?: InputMaybe<GeoIpOrderByWithRelationInput>;
  geoIpAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ipAddress?: InputMaybe<SortOrder>;
  loginTime?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum LoginEventScalarFieldEnum {
  CreatedAt = 'createdAt',
  GeoIpAddress = 'geoIpAddress',
  Id = 'id',
  IpAddress = 'ipAddress',
  LoginTime = 'loginTime',
  SchemeId = 'schemeId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type LoginEventScalarWhereInput = {
  AND?: InputMaybe<Array<LoginEventScalarWhereInput>>;
  NOT?: InputMaybe<Array<LoginEventScalarWhereInput>>;
  OR?: InputMaybe<Array<LoginEventScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  geoIpAddress?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  ipAddress?: InputMaybe<StringFilter>;
  loginTime?: InputMaybe<DateTimeFilter>;
  schemeId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type LoginEventScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<LoginEventScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<LoginEventScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<LoginEventScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  geoIpAddress?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  ipAddress?: InputMaybe<StringWithAggregatesFilter>;
  loginTime?: InputMaybe<DateTimeWithAggregatesFilter>;
  schemeId?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type LoginEventWhereInput = {
  AND?: InputMaybe<Array<LoginEventWhereInput>>;
  NOT?: InputMaybe<Array<LoginEventWhereInput>>;
  OR?: InputMaybe<Array<LoginEventWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  geoIp?: InputMaybe<GeoIpWhereInput>;
  geoIpAddress?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  ipAddress?: InputMaybe<StringFilter>;
  loginTime?: InputMaybe<DateTimeFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type LoginEventWhereUniqueInput = {
  AND?: InputMaybe<Array<LoginEventWhereInput>>;
  NOT?: InputMaybe<Array<LoginEventWhereInput>>;
  OR?: InputMaybe<Array<LoginEventWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  geoIp?: InputMaybe<GeoIpWhereInput>;
  geoIpAddress?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  ipAddress?: InputMaybe<StringFilter>;
  loginTime?: InputMaybe<DateTimeFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type LossTotals = {
  __typename?: 'LossTotals';
  averageLossPerIncident: Scalars['Float'];
  averagePerIncident: Scalars['Float'];
  averageSuccessRate: Scalars['Float'];
  totalIncidents: Scalars['Int'];
  totalLostValue: Scalars['Float'];
  totalRecoveredValue: Scalars['Float'];
};

export type Mg11 = {
  __typename?: 'MG11';
  address?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['String']>;
  availability?: Maybe<Scalars['String']>;
  careNeeds?: Maybe<Scalars['Boolean']>;
  careNeedsDetails?: Maybe<Scalars['String']>;
  civilProceedingsRelease?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['String'];
  detailsExplained?: Maybe<Scalars['Boolean']>;
  dobPlace?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  ethnicity?: Maybe<Scalars['String']>;
  formerName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['String']>;
  homeTel?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  incident?: Maybe<Incident>;
  incidentId?: Maybe<Scalars['String']>;
  interviewerSignature?: Maybe<Scalars['String']>;
  leafletReceived?: Maybe<Scalars['Boolean']>;
  likelyToAttend?: Maybe<Scalars['Boolean']>;
  likelyToAttendReason?: Maybe<Scalars['String']>;
  medicalReleasedDefence?: Maybe<Scalars['String']>;
  medicalReleasedPolice?: Maybe<Scalars['String']>;
  mobileTel?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  occupation?: Maybe<Scalars['String']>;
  pdf?: Maybe<Document>;
  postcode?: Maybe<Scalars['String']>;
  prefContact?: Maybe<Scalars['String']>;
  specialMeasures?: Maybe<Scalars['Boolean']>;
  statement?: Maybe<Scalars['String']>;
  statementWhereWhen?: Maybe<Scalars['String']>;
  station?: Maybe<Scalars['String']>;
  status: Mg11Status;
  updatedAt: Scalars['Date'];
  urn?: Maybe<Scalars['String']>;
  visualRecording?: Maybe<Scalars['Boolean']>;
  witness?: Maybe<Contact>;
  witnessId?: Maybe<Scalars['String']>;
  witnessServiceDisclose?: Maybe<Scalars['Boolean']>;
  witnessSignature?: Maybe<Scalars['String']>;
  witnessSignatureDate?: Maybe<Scalars['Date']>;
  workTel?: Maybe<Scalars['String']>;
};

export type Mg11CreateInput = {
  address?: InputMaybe<Scalars['String']>;
  age?: InputMaybe<Scalars['String']>;
  availability?: InputMaybe<Scalars['String']>;
  careNeeds?: InputMaybe<Scalars['Boolean']>;
  careNeedsDetails?: InputMaybe<Scalars['String']>;
  civilProceedingsRelease?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  createdBy: ConnectHelper;
  detailsExplained?: InputMaybe<Scalars['Boolean']>;
  dobPlace?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  ethnicity?: InputMaybe<Scalars['String']>;
  formerName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['String']>;
  homeTel?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<ConnectHelper>;
  interviewerSignature?: InputMaybe<Scalars['String']>;
  leafletReceived?: InputMaybe<Scalars['Boolean']>;
  likelyToAttend?: InputMaybe<Scalars['Boolean']>;
  likelyToAttendReason?: InputMaybe<Scalars['String']>;
  medicalReleasedDefence?: InputMaybe<Scalars['String']>;
  medicalReleasedPolice?: InputMaybe<Scalars['String']>;
  mobileTel?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  occupation?: InputMaybe<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
  prefContact?: InputMaybe<Scalars['String']>;
  specialMeasures?: InputMaybe<Scalars['Boolean']>;
  statement?: InputMaybe<Scalars['String']>;
  statementWhereWhen?: InputMaybe<Scalars['String']>;
  station?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Mg11Status>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  urn?: InputMaybe<Scalars['String']>;
  visualRecording?: InputMaybe<Scalars['Boolean']>;
  witnessServiceDisclose?: InputMaybe<Scalars['Boolean']>;
  witnessSignature?: InputMaybe<Scalars['String']>;
  witnessSignatureDate?: InputMaybe<Scalars['Date']>;
  workTel?: InputMaybe<Scalars['String']>;
};

export type Mg11ListRelationFilter = {
  every?: InputMaybe<Mg11WhereInput>;
  none?: InputMaybe<Mg11WhereInput>;
  some?: InputMaybe<Mg11WhereInput>;
};

export type Mg11OrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Mg11OrderByWithRelationInput = {
  address?: InputMaybe<SortOrder>;
  age?: InputMaybe<SortOrder>;
  availability?: InputMaybe<SortOrder>;
  careNeeds?: InputMaybe<SortOrder>;
  careNeedsDetails?: InputMaybe<SortOrder>;
  civilProceedingsRelease?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  detailsExplained?: InputMaybe<SortOrder>;
  dobPlace?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  ethnicity?: InputMaybe<SortOrder>;
  formerName?: InputMaybe<SortOrder>;
  gender?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  homeTel?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  interviewerSignature?: InputMaybe<SortOrder>;
  leafletReceived?: InputMaybe<SortOrder>;
  likelyToAttend?: InputMaybe<SortOrder>;
  likelyToAttendReason?: InputMaybe<SortOrder>;
  medicalReleasedDefence?: InputMaybe<SortOrder>;
  medicalReleasedPolice?: InputMaybe<SortOrder>;
  mobileTel?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  occupation?: InputMaybe<SortOrder>;
  pdf?: InputMaybe<DocumentOrderByWithRelationInput>;
  postcode?: InputMaybe<SortOrder>;
  prefContact?: InputMaybe<SortOrder>;
  specialMeasures?: InputMaybe<SortOrder>;
  statement?: InputMaybe<SortOrder>;
  statementWhereWhen?: InputMaybe<SortOrder>;
  station?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  urn?: InputMaybe<SortOrder>;
  visualRecording?: InputMaybe<SortOrder>;
  witness?: InputMaybe<ContactOrderByWithRelationInput>;
  witnessId?: InputMaybe<SortOrder>;
  witnessServiceDisclose?: InputMaybe<SortOrder>;
  witnessSignature?: InputMaybe<SortOrder>;
  witnessSignatureDate?: InputMaybe<SortOrder>;
  workTel?: InputMaybe<SortOrder>;
};

export enum Mg11ScalarFieldEnum {
  Address = 'address',
  Age = 'age',
  Availability = 'availability',
  CareNeeds = 'careNeeds',
  CareNeedsDetails = 'careNeedsDetails',
  CivilProceedingsRelease = 'civilProceedingsRelease',
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  DetailsExplained = 'detailsExplained',
  DobPlace = 'dobPlace',
  Email = 'email',
  Ethnicity = 'ethnicity',
  FormerName = 'formerName',
  Gender = 'gender',
  Height = 'height',
  HomeTel = 'homeTel',
  Id = 'id',
  IncidentId = 'incidentId',
  InterviewerSignature = 'interviewerSignature',
  LeafletReceived = 'leafletReceived',
  LikelyToAttend = 'likelyToAttend',
  LikelyToAttendReason = 'likelyToAttendReason',
  MedicalReleasedDefence = 'medicalReleasedDefence',
  MedicalReleasedPolice = 'medicalReleasedPolice',
  MobileTel = 'mobileTel',
  Name = 'name',
  Occupation = 'occupation',
  Postcode = 'postcode',
  PrefContact = 'prefContact',
  SpecialMeasures = 'specialMeasures',
  Statement = 'statement',
  StatementWhereWhen = 'statementWhereWhen',
  Station = 'station',
  Status = 'status',
  UpdatedAt = 'updatedAt',
  Urn = 'urn',
  VisualRecording = 'visualRecording',
  WitnessId = 'witnessId',
  WitnessServiceDisclose = 'witnessServiceDisclose',
  WitnessSignature = 'witnessSignature',
  WitnessSignatureDate = 'witnessSignatureDate',
  WorkTel = 'workTel'
}

export type Mg11ScalarWhereInput = {
  AND?: InputMaybe<Array<Mg11ScalarWhereInput>>;
  NOT?: InputMaybe<Array<Mg11ScalarWhereInput>>;
  OR?: InputMaybe<Array<Mg11ScalarWhereInput>>;
  address?: InputMaybe<StringNullableFilter>;
  age?: InputMaybe<StringNullableFilter>;
  availability?: InputMaybe<StringNullableFilter>;
  careNeeds?: InputMaybe<BoolNullableFilter>;
  careNeedsDetails?: InputMaybe<StringNullableFilter>;
  civilProceedingsRelease?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringFilter>;
  detailsExplained?: InputMaybe<BoolNullableFilter>;
  dobPlace?: InputMaybe<StringNullableFilter>;
  email?: InputMaybe<StringNullableFilter>;
  ethnicity?: InputMaybe<StringNullableFilter>;
  formerName?: InputMaybe<StringNullableFilter>;
  gender?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<StringNullableFilter>;
  homeTel?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  interviewerSignature?: InputMaybe<StringNullableFilter>;
  leafletReceived?: InputMaybe<BoolNullableFilter>;
  likelyToAttend?: InputMaybe<BoolNullableFilter>;
  likelyToAttendReason?: InputMaybe<StringNullableFilter>;
  medicalReleasedDefence?: InputMaybe<StringNullableFilter>;
  medicalReleasedPolice?: InputMaybe<StringNullableFilter>;
  mobileTel?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  occupation?: InputMaybe<StringNullableFilter>;
  postcode?: InputMaybe<StringNullableFilter>;
  prefContact?: InputMaybe<StringNullableFilter>;
  specialMeasures?: InputMaybe<BoolNullableFilter>;
  statement?: InputMaybe<StringNullableFilter>;
  statementWhereWhen?: InputMaybe<StringNullableFilter>;
  station?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumMg11StatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  urn?: InputMaybe<StringNullableFilter>;
  visualRecording?: InputMaybe<BoolNullableFilter>;
  witnessId?: InputMaybe<StringNullableFilter>;
  witnessServiceDisclose?: InputMaybe<BoolNullableFilter>;
  witnessSignature?: InputMaybe<StringNullableFilter>;
  witnessSignatureDate?: InputMaybe<DateTimeNullableFilter>;
  workTel?: InputMaybe<StringNullableFilter>;
};

export type Mg11ScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<Mg11ScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<Mg11ScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<Mg11ScalarWhereWithAggregatesInput>>;
  address?: InputMaybe<StringNullableWithAggregatesFilter>;
  age?: InputMaybe<StringNullableWithAggregatesFilter>;
  availability?: InputMaybe<StringNullableWithAggregatesFilter>;
  careNeeds?: InputMaybe<BoolNullableWithAggregatesFilter>;
  careNeedsDetails?: InputMaybe<StringNullableWithAggregatesFilter>;
  civilProceedingsRelease?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  createdById?: InputMaybe<StringWithAggregatesFilter>;
  detailsExplained?: InputMaybe<BoolNullableWithAggregatesFilter>;
  dobPlace?: InputMaybe<StringNullableWithAggregatesFilter>;
  email?: InputMaybe<StringNullableWithAggregatesFilter>;
  ethnicity?: InputMaybe<StringNullableWithAggregatesFilter>;
  formerName?: InputMaybe<StringNullableWithAggregatesFilter>;
  gender?: InputMaybe<StringNullableWithAggregatesFilter>;
  height?: InputMaybe<StringNullableWithAggregatesFilter>;
  homeTel?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentId?: InputMaybe<StringNullableWithAggregatesFilter>;
  interviewerSignature?: InputMaybe<StringNullableWithAggregatesFilter>;
  leafletReceived?: InputMaybe<BoolNullableWithAggregatesFilter>;
  likelyToAttend?: InputMaybe<BoolNullableWithAggregatesFilter>;
  likelyToAttendReason?: InputMaybe<StringNullableWithAggregatesFilter>;
  medicalReleasedDefence?: InputMaybe<StringNullableWithAggregatesFilter>;
  medicalReleasedPolice?: InputMaybe<StringNullableWithAggregatesFilter>;
  mobileTel?: InputMaybe<StringNullableWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  occupation?: InputMaybe<StringNullableWithAggregatesFilter>;
  postcode?: InputMaybe<StringNullableWithAggregatesFilter>;
  prefContact?: InputMaybe<StringNullableWithAggregatesFilter>;
  specialMeasures?: InputMaybe<BoolNullableWithAggregatesFilter>;
  statement?: InputMaybe<StringNullableWithAggregatesFilter>;
  statementWhereWhen?: InputMaybe<StringNullableWithAggregatesFilter>;
  station?: InputMaybe<StringNullableWithAggregatesFilter>;
  status?: InputMaybe<EnumMg11StatusWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  urn?: InputMaybe<StringNullableWithAggregatesFilter>;
  visualRecording?: InputMaybe<BoolNullableWithAggregatesFilter>;
  witnessId?: InputMaybe<StringNullableWithAggregatesFilter>;
  witnessServiceDisclose?: InputMaybe<BoolNullableWithAggregatesFilter>;
  witnessSignature?: InputMaybe<StringNullableWithAggregatesFilter>;
  witnessSignatureDate?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  workTel?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export enum Mg11Status {
  Completed = 'COMPLETED',
  Draft = 'DRAFT',
  Sent = 'SENT',
  UserSigned = 'USER_SIGNED'
}

export type Mg11UpdateInput = {
  civilProceedingsRelease?: InputMaybe<NullableSetStringHelper>;
  detailsExplained?: InputMaybe<NullableSetBooleanHelper>;
  interviewerSignature?: InputMaybe<NullableSetStringHelper>;
  leafletReceived?: InputMaybe<NullableSetBooleanHelper>;
  medicalReleasedDefence?: InputMaybe<NullableSetStringHelper>;
  medicalReleasedPolice?: InputMaybe<NullableSetStringHelper>;
  status?: InputMaybe<EnumMg11StatusFieldUpdateOperationsInput>;
  witnessServiceDisclose?: InputMaybe<NullableSetBooleanHelper>;
  witnessSignature?: InputMaybe<NullableSetStringHelper>;
  witnessSignatureDate?: InputMaybe<NullableSetDateHelper>;
};

export type Mg11WhereInput = {
  AND?: InputMaybe<Array<Mg11WhereInput>>;
  NOT?: InputMaybe<Array<Mg11WhereInput>>;
  OR?: InputMaybe<Array<Mg11WhereInput>>;
  address?: InputMaybe<StringNullableFilter>;
  age?: InputMaybe<StringNullableFilter>;
  availability?: InputMaybe<StringNullableFilter>;
  careNeeds?: InputMaybe<BoolNullableFilter>;
  careNeedsDetails?: InputMaybe<StringNullableFilter>;
  civilProceedingsRelease?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  detailsExplained?: InputMaybe<BoolNullableFilter>;
  dobPlace?: InputMaybe<StringNullableFilter>;
  email?: InputMaybe<StringNullableFilter>;
  ethnicity?: InputMaybe<StringNullableFilter>;
  formerName?: InputMaybe<StringNullableFilter>;
  gender?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<StringNullableFilter>;
  homeTel?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  interviewerSignature?: InputMaybe<StringNullableFilter>;
  leafletReceived?: InputMaybe<BoolNullableFilter>;
  likelyToAttend?: InputMaybe<BoolNullableFilter>;
  likelyToAttendReason?: InputMaybe<StringNullableFilter>;
  medicalReleasedDefence?: InputMaybe<StringNullableFilter>;
  medicalReleasedPolice?: InputMaybe<StringNullableFilter>;
  mobileTel?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  occupation?: InputMaybe<StringNullableFilter>;
  pdf?: InputMaybe<DocumentWhereInput>;
  postcode?: InputMaybe<StringNullableFilter>;
  prefContact?: InputMaybe<StringNullableFilter>;
  specialMeasures?: InputMaybe<BoolNullableFilter>;
  statement?: InputMaybe<StringNullableFilter>;
  statementWhereWhen?: InputMaybe<StringNullableFilter>;
  station?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumMg11StatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  urn?: InputMaybe<StringNullableFilter>;
  visualRecording?: InputMaybe<BoolNullableFilter>;
  witness?: InputMaybe<ContactWhereInput>;
  witnessId?: InputMaybe<StringNullableFilter>;
  witnessServiceDisclose?: InputMaybe<BoolNullableFilter>;
  witnessSignature?: InputMaybe<StringNullableFilter>;
  witnessSignatureDate?: InputMaybe<DateTimeNullableFilter>;
  workTel?: InputMaybe<StringNullableFilter>;
};

export type Mg11WhereUniqueInput = {
  AND?: InputMaybe<Array<Mg11WhereInput>>;
  NOT?: InputMaybe<Array<Mg11WhereInput>>;
  OR?: InputMaybe<Array<Mg11WhereInput>>;
  address?: InputMaybe<StringNullableFilter>;
  age?: InputMaybe<StringNullableFilter>;
  availability?: InputMaybe<StringNullableFilter>;
  careNeeds?: InputMaybe<BoolNullableFilter>;
  careNeedsDetails?: InputMaybe<StringNullableFilter>;
  civilProceedingsRelease?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  detailsExplained?: InputMaybe<BoolNullableFilter>;
  dobPlace?: InputMaybe<StringNullableFilter>;
  email?: InputMaybe<StringNullableFilter>;
  ethnicity?: InputMaybe<StringNullableFilter>;
  formerName?: InputMaybe<StringNullableFilter>;
  gender?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<StringNullableFilter>;
  homeTel?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  interviewerSignature?: InputMaybe<StringNullableFilter>;
  leafletReceived?: InputMaybe<BoolNullableFilter>;
  likelyToAttend?: InputMaybe<BoolNullableFilter>;
  likelyToAttendReason?: InputMaybe<StringNullableFilter>;
  medicalReleasedDefence?: InputMaybe<StringNullableFilter>;
  medicalReleasedPolice?: InputMaybe<StringNullableFilter>;
  mobileTel?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  occupation?: InputMaybe<StringNullableFilter>;
  pdf?: InputMaybe<DocumentWhereInput>;
  postcode?: InputMaybe<StringNullableFilter>;
  prefContact?: InputMaybe<StringNullableFilter>;
  specialMeasures?: InputMaybe<BoolNullableFilter>;
  statement?: InputMaybe<StringNullableFilter>;
  statementWhereWhen?: InputMaybe<StringNullableFilter>;
  station?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumMg11StatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  urn?: InputMaybe<StringNullableFilter>;
  visualRecording?: InputMaybe<BoolNullableFilter>;
  witness?: InputMaybe<ContactWhereInput>;
  witnessId?: InputMaybe<StringNullableFilter>;
  witnessServiceDisclose?: InputMaybe<BoolNullableFilter>;
  witnessSignature?: InputMaybe<StringNullableFilter>;
  witnessSignatureDate?: InputMaybe<DateTimeNullableFilter>;
  workTel?: InputMaybe<StringNullableFilter>;
};

export type MapMarker = {
  __typename?: 'MapMarker';
  coords: HeatMapLatLng;
  name?: Maybe<Scalars['String']>;
};

export type MarkStockRemovalRequestAsPickedInput = {
  id: Scalars['String'];
  images?: InputMaybe<Array<StockRemovalPickImageInput>>;
  items: Array<PickedItemInput>;
  tmid?: InputMaybe<Scalars['String']>;
  tracking?: InputMaybe<Scalars['String']>;
};

export type MentionableUser = {
  __typename?: 'MentionableUser';
  businessesName: Scalars['String'];
  firstLetter: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['ID'];
  oldFullName: Scalars['String'];
};

export type MergeBusinessesInput = {
  aiImprovements?: InputMaybe<Scalars['JSON']>;
  aiSummary?: InputMaybe<Scalars['String']>;
  businessIds: Array<Scalars['String']>;
  currency?: InputMaybe<Currency>;
  division?: InputMaybe<Scalars['String']>;
  mainBusinessId: Scalars['String'];
  metadata?: InputMaybe<Scalars['JSON']>;
  name?: InputMaybe<Scalars['String']>;
  policeArea?: InputMaybe<Array<PoliceForce>>;
  publicName?: InputMaybe<Scalars['Boolean']>;
  reference?: InputMaybe<Scalars['Int']>;
  siteNumber?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
};

export type MergeOffendersInput = {
  age?: InputMaybe<Age>;
  build?: InputMaybe<Build>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  gender?: InputMaybe<Gender>;
  hair?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<Scalars['String']>>;
  incidents?: InputMaybe<Array<Scalars['String']>>;
  mainOffenderId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  offenderIds: Array<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type Message = {
  __typename?: 'Message';
  actions: Array<Action>;
  articles: Array<Article>;
  chat: Chat;
  chatId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  crimeGroups: Array<CrimeGroup>;
  daysAgo: Scalars['String'];
  from: User;
  fromId: Scalars['String'];
  id: Scalars['ID'];
  images: Array<Image>;
  incidents: Array<Incident>;
  investigations: Array<Investigation>;
  mentions: Array<User>;
  offenders: Array<Offender>;
  scheme: Scheme;
  schemeId: Scalars['String'];
  sent?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['Date'];
  vehicles: Array<Vehicle>;
};


export type MessageActionsArgs = {
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type MessageArticlesArgs = {
  cursor?: InputMaybe<ArticleWhereUniqueInput>;
  distinct?: InputMaybe<Array<ArticleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ArticleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type MessageCrimeGroupsArgs = {
  cursor?: InputMaybe<CrimeGroupWhereUniqueInput>;
  distinct?: InputMaybe<CrimeGroupScalarFieldEnum>;
  orderBy?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CrimeGroupWhereInput>;
};


export type MessageImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


export type MessageIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type MessageInvestigationsArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<Array<InvestigationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InvestigationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type MessageMentionsArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type MessageOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type MessageVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<Array<VehicleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VehicleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
};

export type MessageCreateInput = {
  articles?: InputMaybe<NullableConnectOnlyArrayHelper>;
  chat: ConnectHelper;
  content: Scalars['String'];
  crimeGroups?: InputMaybe<NullableConnectOnlyArrayHelper>;
  from: ConnectHelper;
  images?: InputMaybe<Array<UrlImage>>;
  incidents?: InputMaybe<NullableConnectOnlyArrayHelper>;
  mentions?: InputMaybe<NullableConnectOnlyArrayHelper>;
  offenders?: InputMaybe<NullableConnectOnlyArrayHelper>;
  optimisticImages?: InputMaybe<Array<CreateImageOptimistic>>;
  scheme: ConnectHelper;
  sent?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  vehicles?: InputMaybe<NullableConnectOnlyArrayHelper>;
};

export type MessageItem = {
  __typename?: 'MessageItem';
  articles: Array<Article>;
  chat: Chat;
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  crimeGroups: Array<CrimeGroup>;
  currentUser: Scalars['Boolean'];
  formattedDateTime: Scalars['String'];
  from: User;
  id: Scalars['String'];
  images: Array<Image>;
  incidents: Array<Incident>;
  mentions: Array<User>;
  offenders: Array<Offender>;
  paddingTop: Scalars['Boolean'];
  scheme: Scheme;
  sent: Scalars['Boolean'];
  showUser: Scalars['Boolean'];
  type: MessageItemType;
  vehicles: Array<Vehicle>;
};

export enum MessageItemType {
  Date = 'DATE',
  Message = 'MESSAGE'
}

export type MessageListRelationFilter = {
  every?: InputMaybe<MessageWhereInput>;
  none?: InputMaybe<MessageWhereInput>;
  some?: InputMaybe<MessageWhereInput>;
};

export type MessageOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MessageOrderByWithRelationInput = {
  chat?: InputMaybe<ChatOrderByWithRelationInput>;
  chatId?: InputMaybe<SortOrder>;
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  crimeGroups?: InputMaybe<CrimeGroupOrderByRelationAggregateInput>;
  from?: InputMaybe<UserOrderByWithRelationInput>;
  fromId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  investigations?: InputMaybe<InvestigationOrderByRelationAggregateInput>;
  mentions?: InputMaybe<UserOrderByRelationAggregateInput>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  sent?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  vehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
};

export enum MessageScalarFieldEnum {
  ChatId = 'chatId',
  Content = 'content',
  CreatedAt = 'createdAt',
  FromId = 'fromId',
  Id = 'id',
  SchemeId = 'schemeId',
  Sent = 'sent',
  UpdatedAt = 'updatedAt'
}

export type MessageScalarWhereInput = {
  AND?: InputMaybe<Array<MessageScalarWhereInput>>;
  NOT?: InputMaybe<Array<MessageScalarWhereInput>>;
  OR?: InputMaybe<Array<MessageScalarWhereInput>>;
  chatId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  fromId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  schemeId?: InputMaybe<StringFilter>;
  sent?: InputMaybe<BoolNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type MessageScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<MessageScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<MessageScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<MessageScalarWhereWithAggregatesInput>>;
  chatId?: InputMaybe<StringWithAggregatesFilter>;
  content?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  fromId?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  schemeId?: InputMaybe<StringWithAggregatesFilter>;
  sent?: InputMaybe<BoolNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type MessageUpdateInput = {
  content: SetStringHelper;
};

export type MessageWhereInput = {
  AND?: InputMaybe<Array<MessageWhereInput>>;
  NOT?: InputMaybe<Array<MessageWhereInput>>;
  OR?: InputMaybe<Array<MessageWhereInput>>;
  chat?: InputMaybe<ChatWhereInput>;
  chatId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  from?: InputMaybe<UserWhereInput>;
  fromId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  mentions?: InputMaybe<UserListRelationFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  sent?: InputMaybe<BoolNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type MessageWhereUniqueInput = {
  AND?: InputMaybe<Array<MessageWhereInput>>;
  NOT?: InputMaybe<Array<MessageWhereInput>>;
  OR?: InputMaybe<Array<MessageWhereInput>>;
  chat?: InputMaybe<ChatWhereInput>;
  chatId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  from?: InputMaybe<UserWhereInput>;
  fromId?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageListRelationFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  mentions?: InputMaybe<UserListRelationFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  sent?: InputMaybe<BoolNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type MidCountiesColumnMapping = {
  actualLossColumn?: InputMaybe<Scalars['String']>;
  arrestedColumn?: InputMaybe<Scalars['String']>;
  dateOfIncidentColumn?: InputMaybe<Scalars['String']>;
  eventColumn?: InputMaybe<Scalars['String']>;
  policeInvolvedColumn?: InputMaybe<Scalars['String']>;
  recoveredLossColumn?: InputMaybe<Scalars['String']>;
  referenceColumn?: InputMaybe<Scalars['String']>;
  sitePinColumn?: InputMaybe<Scalars['String']>;
  summaryColumn?: InputMaybe<Scalars['String']>;
  timeOfIncidentColumn?: InputMaybe<Scalars['String']>;
  vehicleRegColumn?: InputMaybe<Scalars['String']>;
};

export type MidCountiesIdInput = {
  id: Scalars['String'];
};

export type MidCountiesImportDataInput = {
  /** Optional mapping of CSV/Excel columns to incident fields */
  columnMapping?: InputMaybe<MidCountiesColumnMapping>;
  /** Base64 encoded CSV/Excel data or file content as string (auto-detects format) */
  fileData?: InputMaybe<Scalars['String']>;
  /** URL to download the CSV/Excel file from (e.g., Azure Blob Storage URL) */
  fileUrl?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<MidCountiesIdInput>>;
  scheme: MidCountiesIdInput;
};

export enum Model {
  Add = 'ADD',
  Address = 'ADDRESS',
  Article = 'ARTICLE',
  Ban = 'BAN',
  Business = 'BUSINESS',
  Chat = 'CHAT',
  Checklist = 'CHECKLIST',
  CrimeGroup = 'CRIME_GROUP',
  Cron = 'CRON',
  DemDevice = 'DEM_DEVICE',
  Document = 'DOCUMENT',
  Evidence = 'EVIDENCE',
  Group = 'GROUP',
  Image = 'IMAGE',
  Incident = 'INCIDENT',
  Investigation = 'INVESTIGATION',
  Message = 'MESSAGE',
  Offender = 'OFFENDER',
  Remove = 'REMOVE',
  Scheme = 'SCHEME',
  Send = 'SEND',
  SingleShoe = 'SINGLE_SHOE',
  StockRemovalRequest = 'STOCK_REMOVAL_REQUEST',
  Tag = 'TAG',
  Todo = 'TODO',
  Update = 'UPDATE',
  User = 'USER',
  Vehicle = 'VEHICLE'
}

export type MonthlyHubStats = {
  __typename?: 'MonthlyHubStats';
  /** Number of shared crime groups created in this month for this hub */
  crimeGroups: Scalars['Int'];
  /** Number of shared incidents created in this month for this hub */
  incidents: Scalars['Int'];
  /** Month name and year (e.g., "January 26") */
  month: Scalars['String'];
  /** Month number (1-12) */
  monthNumber: Scalars['Int'];
  /** Number of shared offenders created in this month for this hub */
  offenders: Scalars['Int'];
  /** Number of shared vehicles created in this month for this hub */
  vehicles: Scalars['Int'];
  /** Year as integer */
  year: Scalars['Int'];
};

export type MonthlyRecidivismAverage = {
  __typename?: 'MonthlyRecidivismAverage';
  /** Average days between incidents for this month */
  averageDaysBetweenIncidents: Scalars['Float'];
  /** Month label (e.g., "January 25") */
  month: Scalars['String'];
  /** Month number (1-12) */
  monthNumber: Scalars['Int'];
  /** Total incidents from repeat offenders */
  totalIncidents: Scalars['Int'];
  /** Number of repeat offenders in this month */
  totalRepeatOffenders: Scalars['Int'];
  /** Year */
  year: Scalars['Int'];
};

export type MonthlySharedEntityStats = {
  __typename?: 'MonthlySharedEntityStats';
  /** Number of shared crime groups created in this month */
  crimeGroups: Scalars['Int'];
  /** Number of shared incidents created in this month */
  incidents: Scalars['Int'];
  /** Month name and year (e.g., "January 26") */
  month: Scalars['String'];
  /** Month number (1-12) */
  monthNumber: Scalars['Int'];
  /** Number of shared offenders created in this month */
  offenders: Scalars['Int'];
  /** Number of shared vehicles created in this month */
  vehicles: Scalars['Int'];
  /** Year as integer */
  year: Scalars['Int'];
};

export type MostViewedEntity = {
  __typename?: 'MostViewedEntity';
  /** ID of the entity */
  entityId: Scalars['String'];
  /** Type of entity (INCIDENT, OFFENDER, VEHICLE, CRIME_GROUP) */
  entityType: Scalars['String'];
  /** Number of times viewed */
  viewCount: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  abortPatrolRun: PatrolRun;
  acknowledgeCriticalBulletin: Scalars['Boolean'];
  addAudioIncidentGoods: Scalars['Boolean'];
  addImageIntel: Intel;
  addImagesToIncident: Incident;
  addImagesToOffender: Offender;
  addImagesToUpdate: Update;
  addQuestion: Question;
  addUploadedImageToIncident: Incident;
  addUsersToBusiness: Business;
  aiIncidentImport: SystemTask;
  analyzeIncidentsByRadius: IncidentRadiusStats;
  approveAiSuggestion: AiSuggestion;
  approveCancelStockRemovalRequest: StockRemovalRequest;
  approveIncident: Incident;
  approveOffender: Offender;
  approvePAPStockRemovalRequest: StockRemovalRequest;
  approvePoliceMatch: PoliceMatch;
  approveStockRemovalRequest: StockRemovalRequestApproval;
  bulkVerifyAiVisionMatches: Scalars['Int'];
  centralCoopImportData: SystemTask;
  changeSchemeTier: SchemeTier;
  closeInvestigation: Investigation;
  completeAudioStream: CompleteAudioResult;
  completeChecklist: ActiveChecklist;
  connectOffendersToInvestigation: Investigation;
  copyEvidenceOnInvestigation: Document;
  copyEvidenceToAlert: Document;
  copyOffender: Offender;
  createActionEvidence?: Maybe<Scalars['String']>;
  createActiveChecklist: ActiveChecklist;
  createActivityCsvZip: Scalars['String'];
  createArticle: Article;
  createBatchPoliceSharingConfigs: BatchPoliceSharingConfigResult;
  createBillingCustomer: BillingCustomer;
  createBlankImage: Image;
  createBlurFaces: Image;
  createBusiness: Business;
  createBusinessCsvZip: Scalars['String'];
  createBusinessQuestion: BusinessQuestion;
  createChat: Chat;
  createChecklistCsvZip: Scalars['String'];
  createCollection: RekCollection;
  createComment: Intel;
  createCrimeGroup: CrimeGroup;
  createCsvZip: Scalars['String'];
  createCustomGallery: CustomGallery;
  createDashboard: Dashboard;
  createDocument: Document;
  createDocuments: Array<Document>;
  createFlow: Flow;
  createGeographicalArea: GeographicalArea;
  createGoodsType: GoodsType;
  createGroup: Group;
  createIncident: Incident;
  createIncidentForm: IncidentForm;
  createIncidentFromAudioSession: Incident;
  createIncidentStatus: IncidentStatus;
  createIntegrationConfig: IntegrationConfig;
  createInvestigation: Investigation;
  createInvestigationCsvZip: Scalars['String'];
  /** NOTE: This is triggered without context externally by auth0, no way to know what scheme they are logging into. May have to add a update query one they have logged in  that updates the last login with the scheme they are logging into */
  createLoginEvent?: Maybe<LoginEvent>;
  createMessage: MessageItem;
  createMg11: Mg11;
  createMg11PDF?: Maybe<Scalars['String']>;
  createOffender: Offender;
  createOneBusinessImpact: Document;
  createOneCsvImport: CsvImport;
  createOneQuestionGroup: QuestionGroup;
  createOneStatementTemplate: StatementTemplate;
  createOneTier: Tier;
  createOneWorkflow: Workflow;
  createPoliceSharingConfig: SharingConfig;
  createReportGroup: ReportGroup;
  createReportTemplate: ReportTemplate;
  createScheme: Scheme;
  createSession: Session;
  createSharingConfig: SharingConfig;
  createStockRemovalRequest: StockRemovalRequest;
  createStockRemovalRequestApprover: StockRemovalRequest;
  createStockRemovalReturn: StockRemovalRequest;
  createTag: Tag;
  createTermsAndConditions: TermsAndCondition;
  createTimes: Array<Incident>;
  createTodo: Todo;
  createTrainingVideo: TrainingVideo;
  createUnlinkedImage: UnlinkedImage;
  createUpdateChecklist: Checklist;
  createUpdateOnCrimeGroup: Update;
  createUpdateOnIncident: Update;
  createUpdateOnInvestigation: Update;
  createUpdateOnOffender: Update;
  createUpdateOnStockRemovalRequest: Update;
  createUpdateOnVehicle: Update;
  /** @deprecated Auth0 no longer used */
  createUserInAuth0?: Maybe<UserNewAuth0>;
  createUserInDatabase: User;
  createVehicle: Vehicle;
  deleteArticle: Article;
  deleteBan: Ban;
  deleteBillingCustomer: BillingCustomer;
  deleteBrand: Brand;
  deleteBusiness: Business;
  deleteBusinessQuestion: BusinessQuestion;
  deleteCamera: AiVisionCamera;
  deleteChat: Chat;
  deleteCrimeGroup: CrimeGroup;
  deleteCustomGallery: CustomGallery;
  deleteDashboardTemplate?: Maybe<Dashboard>;
  deleteDemDevice: DemDevice;
  deleteDemGroup: DemGroup;
  deleteDetectionConfig: DetectActionConfig;
  deleteDocument: Document;
  deleteEvidence: Document;
  deleteExpired: SystemTask;
  deleteFace: RekFace;
  deleteFeedItem: FeedItem;
  deleteFolder: Folder;
  deleteGeographicalArea: GeographicalArea;
  deleteGroup: Group;
  deleteIncident: Incident;
  deleteIncidentStatus: IncidentStatus;
  deleteIntegrationConfig: IntegrationConfig;
  deleteInvestigation: Investigation;
  deleteMessage?: Maybe<Message>;
  deleteOffender: Offender;
  deleteOneQuestionGroup?: Maybe<QuestionGroup>;
  deleteOneStatementTemplate?: Maybe<StatementTemplate>;
  deleteOneTier?: Maybe<Tier>;
  deleteOneWorkflow?: Maybe<Workflow>;
  deleteQuestion: Question;
  deleteRecycleTag: Tag;
  deleteReportGroup: ReportGroup;
  deleteReportTemplate?: Maybe<ReportTemplate>;
  deleteRole: CustomRole;
  deleteSharingConfig: SharingConfig;
  deleteShoe: Shoe;
  deleteStockRemovalReasonOption: StockRemovalReasonOption;
  deleteStockRemovalRequest: StockRemovalRequest;
  deleteStockRemovalRequestApproval: StockRemovalRequestApproval;
  deleteStockRemovalReturn: StockRemovalRequest;
  deleteTag: Tag;
  deleteTodo: Todo;
  deleteTrainingVideo: Scalars['Boolean'];
  deleteUpdate: Update;
  deleteUser: User;
  deleteUserFromScheme?: Maybe<User>;
  deleteVehicle: Vehicle;
  discImportData: SystemTask;
  dismissAiMatch: AiVisionMatch;
  dismissAiSuggestion: AiSuggestion;
  dismissMatch: RekMatch;
  dismissPoliceMatch: PoliceMatch;
  dismissTrainingVideoPrompt: Scalars['Boolean'];
  dunelmImportData: SystemTask;
  editArticle: Article;
  enableSchemeRekognition: RekCollection;
  exportInvestigationZip: Scalars['String'];
  extendIncident: Incident;
  extendOffender: Offender;
  finalizeAudioSession: Scalars['Boolean'];
  finishPatrolRun: PatrolRun;
  forcedPasswordSet?: Maybe<Scalars['String']>;
  generateComprehensiveDemoData: Scalars['String'];
  generateDemoBusinesses: Scalars['String'];
  generateDemoStockItems: Scalars['Int'];
  generateFeedItems: SystemTask;
  generateIncidentTypeDescription: Scalars['String'];
  generateOffenderBulletin: OffenderBulletinResult;
  generatePatrolTokenBatch: Array<PatrolCheckpointToken>;
  generateReportLayout: GeneratedReportLayoutResult;
  generateReportTemplateDescription: Scalars['String'];
  generateStatementBody: GeneratedStatementBody;
  generateTrainingVideoUploadUrl: Scalars['String'];
  icelandImportData: SystemTask;
  importStockItemCsv: Scalars['Boolean'];
  incidentImport: IncidentImportValidationResult;
  incidentItemsCsv: Scalars['String'];
  indexExistingImages: SystemTask;
  indexFaces: SystemTask;
  indexImage: Image;
  indexOffenderImagesForScheme: IndexOffenderImagesResult;
  intelOneImportData: SystemTask;
  inviteExistingUser: User;
  jdSiteImport: SystemTask;
  linkBusinessToScheme: Business;
  linkOrgToDem: Business;
  linkUserToDem: User;
  mapAudioIncidentFaces: Scalars['Boolean'];
  markAsReadMessages: UserChat;
  markBulletinViewed: Impression;
  markDocumentViewed: Impression;
  markOffenderViewed: Impression;
  markSharedCrimeGroupViewed: Impression;
  markSharedIncidentViewed: Impression;
  markSharedOffenderViewed: Impression;
  markSharedVehicleViewed: Impression;
  markStockRemovalRequestAsCollected: StockRemovalRequest;
  markStockRemovalRequestAsPicked: StockRemovalRequest;
  markStockRemovalRequestAsReturned: StockRemovalRequest;
  markTrainingVideoComplete: TrainingVideoCompletion;
  mergeBusinesses: Business;
  mergeBusinessesWithSameName: Business;
  mergeOffender: Offender;
  /** Merges a source SharedOffender into a target SharedOffender, combining all relationships, AI data, and statistics */
  mergeSharedOffenders: SharedOffender;
  midCountiesImportData: SystemTask;
  mySafetyImportData: SystemTask;
  nextImportData: SystemTask;
  oneStopImportData: SystemTask;
  queueActivityCsvExport: QueuedIncidentExportResult;
  queueBusinessEngagementCsvExport: QueuedIncidentExportResult;
  queueIncidentCsvExport: QueuedIncidentExportResult;
  queueStockRemovalCsvExport: QueuedStockRemovalExportResult;
  recordPatrolScan: PatrolEvent;
  recycleActiveChecklist: ActiveChecklist;
  recycleChecklist: Checklist;
  recycleDemEvidence?: Maybe<Scalars['String']>;
  recycleExpiredData: SystemTask;
  recycleIncident: Incident;
  recycleOffender: Offender;
  recycleTag: Tag;
  recycleUnusedImages: SystemTask;
  /** Refresh the incident_data_view materialized view */
  refreshIncidentDataView: Scalars['Boolean'];
  registerPushToken: ExpoPushToken;
  rejectPAPStockRemovalRequest: StockRemovalRequest;
  rejectStockRemovalRequest: StockRemovalRequestApproval;
  removeQuestionFromTag: TagQuestion;
  removeUserFromBusiness: Business;
  reopenInvestigation: Investigation;
  requestCancelStockRemovalRequest: StockRemovalRequest;
  restoreAllRecycledItems: SystemTask;
  restoreDemEvidence?: Maybe<Scalars['String']>;
  restoreIncident: Incident;
  restoreItem?: Maybe<RecycledItem>;
  restoreOffender: Offender;
  riverIslandImportData: SystemTask;
  scanIncident: Incident;
  searchExistingImages: Array<RekMatch>;
  searchFaces: SystemTask;
  sendInvite: User;
  sentrysysImportData: SystemTask;
  setDefaultTemplate?: Maybe<ReportTemplate>;
  setPassword: User;
  setSchemeSharing: Scheme;
  setupFaceRecognition: RekCollection;
  shareData: SystemTask;
  shareIncident: Incident;
  signTerms: UserTerm;
  startEnhancedAudioStream: EnhancedAudioSession;
  startPatrolRun: PatrolRun;
  stockItemImport: SystemTask;
  streamAudioChunk: AudioProcessingResult;
  submitBusinessAnswers: SubmitBusinessAnswersResult;
  subscribeToCrimeGroup: CrimeGroup;
  subscribeToIncident: Incident;
  subscribeToInvestigation: Investigation;
  subscribeToOffender: Offender;
  subscribeToVehicle: Vehicle;
  syncBusinessGroups: SyncBusinessGroupsResult;
  /** Syncs police force data for all businesses in a scheme based on their postcodes. Only processes businesses that do not already have police force data assigned. */
  syncBusinessPoliceForces: SyncPoliceForceResult;
  syncFeedItems: SystemTask;
  syncGeoCodes: Array<Address>;
  syncIncidentGroups: SystemTask;
  syncIncidentLocations: SystemTask;
  syncIncidentSchemes: SystemTask;
  syncNewSchemeTags: SystemTask;
  syncRekImages: SystemTask;
  testIntegrationConfig: IntegrationTestResult;
  tjxImportData: SystemTask;
  toggleUser: User;
  unsubscribeFromIncident: Incident;
  unsubscribeFromOffender: Offender;
  unsubscribeToCrimeGroup: CrimeGroup;
  unsubscribeToInvestigation: Investigation;
  unsubscribeToVehicle: Vehicle;
  updateBillingCustomer: BillingCustomer;
  updateBusiness: Business;
  updateBusinessQuestion: BusinessQuestion;
  updateChat: Chat;
  updateChecklist: Checklist;
  updateCrimeGroup: CrimeGroup;
  updateCrimeGroupOffender: CrimeGroup;
  updateCustomGallery: CustomGallery;
  updateDashboardTemplate: Dashboard;
  updateDemDevice: DemDevice;
  updateDemGroup: DemGroup;
  updateDocument: Document;
  updateFlow: Flow;
  updateFolder: Folder;
  updateGeographicalArea: GeographicalArea;
  updateGroup: Group;
  updateIncident: Incident;
  updateIncidentBusiness: Incident;
  updateIncidentBusinesses: SystemTask;
  updateIncidentStatus: Incident;
  updateIncidentStatusData: IncidentStatus;
  updateIntegrationConfig: IntegrationConfig;
  updateInvestigation: Investigation;
  updateMessage: Message;
  updateOffender: Offender;
  updateOffenderDetails: Offender;
  updateOneMG11: Mg11;
  updateOneQuestionGroup: QuestionGroup;
  updateOneStatementTemplate: StatementTemplate;
  updateOneTier: Tier;
  updateOneWorkflow: Workflow;
  updatePassword: User;
  updateQuestionOnActivity: Question;
  updateQuestionOnTag: TagQuestion;
  updateReportGroup: ReportGroup;
  /** Only use this to update the layout of template, provide all the layout data as it will delete all old data and recreate */
  updateReportTemplate: ReportTemplate;
  updateScheme: Scheme;
  updateSharingConfig: SharingConfig;
  updateShoe: Shoe;
  updateStockItem: StockItem;
  updateStockRemovalRequest: StockRemovalRequest;
  updateStockRemovalReturn: StockRemovalRequest;
  updateTag: Tag;
  updateTagPoliceSharing: Tag;
  updateTagQs: Array<TagQuestion>;
  updateTimeoutDetectionConfig: Scalars['String'];
  updateTodo: Todo;
  updateTodoMention: Array<Todo>;
  updateTrainingVideo: TrainingVideo;
  updateUpdate: Update;
  updateUser: User;
  updateUserNotifications: Array<UserNotification>;
  updateVehicle: Vehicle;
  uploadAudioIncidentImages: AudioImageUploadResult;
  uploadImage: Image;
  uploadToImage: Image;
  upsertBrand: Brand;
  upsertCamera: AiVisionCamera;
  upsertContact: Contact;
  upsertDemDevice: DemDevice;
  upsertDemGroup: DemGroup;
  upsertDetectionConfig: DetectActionConfig;
  upsertFolder: Folder;
  upsertIncident: Incident;
  upsertIncidentForm: IncidentForm;
  upsertPatrolCheckpoint: PatrolCheckpoint;
  upsertPatrolRoute: PatrolRoute;
  upsertPermission: CustomRole;
  upsertShoe: Shoe;
  upsertStockRemovalReasonOption: StockRemovalReasonOption;
  verifyAiVisionMatch: AiVisionMatch;
};


export type MutationAbortPatrolRunArgs = {
  reason?: InputMaybe<Scalars['String']>;
  runId: Scalars['ID'];
};


export type MutationAcknowledgeCriticalBulletinArgs = {
  articleId: Scalars['String'];
};


export type MutationAddAudioIncidentGoodsArgs = {
  goods: Array<PreSelectedGoodInput>;
  sessionId: Scalars['String'];
};


export type MutationAddImageIntelArgs = {
  data: AddImageIntelData;
};


export type MutationAddImagesToIncidentArgs = {
  images: Array<ImageWhereUniqueInput>;
  incident: IncidentWhereUniqueInput;
};


export type MutationAddImagesToOffenderArgs = {
  images: Array<ImageWhereUniqueInput>;
  offender: OffenderWhereUniqueInput;
};


export type MutationAddImagesToUpdateArgs = {
  data: Array<UrlImage>;
  where: UniqueId;
};


export type MutationAddQuestionArgs = {
  data: CreateQuestionInput;
  where?: InputMaybe<UniqueId>;
};


export type MutationAddUploadedImageToIncidentArgs = {
  data: Array<UploadIncidentOptimisticImage>;
  where: IncidentWhereUniqueInput;
};


export type MutationAddUsersToBusinessArgs = {
  data: Array<UserWhereUniqueInput>;
  schemeWhere: SchemeWhereUniqueInput;
  where: BusinessWhereUniqueInput;
};


export type MutationAiIncidentImportArgs = {
  data: AiIncidentImportInput;
};


export type MutationAnalyzeIncidentsByRadiusArgs = {
  input: IncidentRadiusInput;
};


export type MutationApproveAiSuggestionArgs = {
  where: UniqueId;
};


export type MutationApproveCancelStockRemovalRequestArgs = {
  where: UniqueId;
};


export type MutationApproveIncidentArgs = {
  data: ApproveIncidentData;
  where: UniqueId;
};


export type MutationApproveOffenderArgs = {
  data: ApproveIncidentData;
  where: UniqueId;
};


export type MutationApprovePapStockRemovalRequestArgs = {
  where: UniqueId;
};


export type MutationApprovePoliceMatchArgs = {
  where: PoliceMatchWhereUniqueInput;
};


export type MutationApproveStockRemovalRequestArgs = {
  where: UniqueId;
};


export type MutationBulkVerifyAiVisionMatchesArgs = {
  matchIds: Array<Scalars['String']>;
  outcome: AiVisionMatchOutcome;
  outcomeNotes?: InputMaybe<Scalars['String']>;
};


export type MutationCentralCoopImportDataArgs = {
  data: CentralCoopImportDataInput;
};


export type MutationChangeSchemeTierArgs = {
  data: ChangeSchemeTierInput;
};


export type MutationCloseInvestigationArgs = {
  where: UniqueId;
};


export type MutationCompleteAudioStreamArgs = {
  sessionId: Scalars['String'];
};


export type MutationCompleteChecklistArgs = {
  data: CompleteActiveChecklistInput;
  where: Scalars['String'];
};


export type MutationConnectOffendersToInvestigationArgs = {
  data: ConnectOffendersToInvestigationInput;
};


export type MutationCopyEvidenceOnInvestigationArgs = {
  data: ImportDemEvidence;
  where: UniqueId;
};


export type MutationCopyEvidenceToAlertArgs = {
  data: CopyEvidenceInput;
};


export type MutationCopyOffenderArgs = {
  data: CreateOffenderData;
  where: UniqueId;
};


export type MutationCreateActionEvidenceArgs = {
  data: CreateActionEvidence;
};


export type MutationCreateActiveChecklistArgs = {
  data: CreateActiveChecklistInput;
};


export type MutationCreateActivityCsvZipArgs = {
  where: ActivityExportWhere;
};


export type MutationCreateArticleArgs = {
  data: CreateArticleInput;
};


export type MutationCreateBatchPoliceSharingConfigsArgs = {
  data: BatchPoliceSharingConfigInput;
};


export type MutationCreateBillingCustomerArgs = {
  data: BillingCustomerCreateInput;
};


export type MutationCreateBlankImageArgs = {
  incident?: InputMaybe<IncidentWhereUniqueInput>;
  offenders?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  scheme: Scalars['String'];
};


export type MutationCreateBlurFacesArgs = {
  faces: Array<FaceInput>;
  image: BlurImageInput;
};


export type MutationCreateBusinessArgs = {
  data: CreateBusinessDataInput;
};


export type MutationCreateBusinessCsvZipArgs = {
  where: BusinessWhereInput;
};


export type MutationCreateBusinessQuestionArgs = {
  data: CreateBusinessQuestionInput;
};


export type MutationCreateChatArgs = {
  data: ChatCreateInput;
};


export type MutationCreateChecklistCsvZipArgs = {
  range: ChecklistDateRange;
  where: ActiveChecklistWhereInput;
};


export type MutationCreateCollectionArgs = {
  data: CreateCollectionInput;
};


export type MutationCreateCommentArgs = {
  data: CreateCommentData;
};


export type MutationCreateCrimeGroupArgs = {
  data: CreateCrimeGroupDataInput;
};


export type MutationCreateCsvZipArgs = {
  where: IncidentExportInput;
};


export type MutationCreateCustomGalleryArgs = {
  data: CreateCustomGalleryInput;
};


export type MutationCreateDashboardArgs = {
  data: DashboardCreateInput;
};


export type MutationCreateDocumentArgs = {
  data: CreateDocument;
};


export type MutationCreateDocumentsArgs = {
  data: CreateDocuments;
};


export type MutationCreateFlowArgs = {
  data: CreateFlowInput;
};


export type MutationCreateGeographicalAreaArgs = {
  data: CreateGeographicalAreaInput;
};


export type MutationCreateGoodsTypeArgs = {
  data: CreateGoodsTypeDataInput;
};


export type MutationCreateGroupArgs = {
  data: GroupCreateInput;
};


export type MutationCreateIncidentArgs = {
  data: CreateIncidentData;
};


export type MutationCreateIncidentFormArgs = {
  data: IncidentFormInput;
};


export type MutationCreateIncidentFromAudioSessionArgs = {
  additionalNotes?: InputMaybe<Scalars['String']>;
  businessId?: InputMaybe<Scalars['String']>;
  incidentDate: Scalars['String'];
  incidentTime: Scalars['String'];
  sessionId: Scalars['String'];
};


export type MutationCreateIncidentStatusArgs = {
  data: IncidentStatusCreateInput;
};


export type MutationCreateIntegrationConfigArgs = {
  conditions?: InputMaybe<Scalars['JSON']>;
  config: Scalars['JSON'];
  enabled?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  schemeId: Scalars['String'];
  type: IntegrationType;
};


export type MutationCreateInvestigationArgs = {
  data: CreateInvestigationInput;
};


export type MutationCreateInvestigationCsvZipArgs = {
  where: UniqueId;
};


export type MutationCreateLoginEventArgs = {
  data: CreateEventInput;
};


export type MutationCreateMessageArgs = {
  data: MessageCreateInput;
};


export type MutationCreateMg11Args = {
  data: Mg11CreateInput;
  schemeId: Scalars['String'];
};


export type MutationCreateMg11PdfArgs = {
  data: Scalars['String'];
};


export type MutationCreateOffenderArgs = {
  data: CreateOffenderData;
};


export type MutationCreateOneBusinessImpactArgs = {
  data: BusinessImpactInput;
};


export type MutationCreateOneCsvImportArgs = {
  data: CsvImportCreateInput;
};


export type MutationCreateOneQuestionGroupArgs = {
  data: QuestionGroupCreateInput;
};


export type MutationCreateOneStatementTemplateArgs = {
  data: StatementTemplateCreateInput;
};


export type MutationCreateOneTierArgs = {
  data: TierCreateInput;
};


export type MutationCreateOneWorkflowArgs = {
  data: WorkflowCreateInput;
};


export type MutationCreatePoliceSharingConfigArgs = {
  data: PoliceSharingConfigInput;
};


export type MutationCreateReportGroupArgs = {
  data: ReportGroupCreateInput;
};


export type MutationCreateReportTemplateArgs = {
  data: ReportTemplateCreateInput;
};


export type MutationCreateSchemeArgs = {
  data: SchemeCreateInput;
};


export type MutationCreateSessionArgs = {
  data: CreateSessionInput;
};


export type MutationCreateSharingConfigArgs = {
  data: SharingConfigCreateInput;
};


export type MutationCreateStockRemovalRequestArgs = {
  data: CreateStockRemovalRequestInput;
};


export type MutationCreateStockRemovalRequestApproverArgs = {
  data: CreateStockRemovalRequestApproverInput;
};


export type MutationCreateStockRemovalReturnArgs = {
  data: CreateStockRemovalReturnInput;
};


export type MutationCreateTagArgs = {
  data: TagCreateInput;
};


export type MutationCreateTermsAndConditionsArgs = {
  data: CreateTermsInput;
};


export type MutationCreateTimesArgs = {
  data: CreateArticleInput;
};


export type MutationCreateTodoArgs = {
  data: TodoCreateInput;
};


export type MutationCreateTrainingVideoArgs = {
  input: CreateTrainingVideoInput;
};


export type MutationCreateUnlinkedImageArgs = {
  file: Scalars['Upload'];
  localId: Scalars['String'];
  scheme: Scalars['String'];
};


export type MutationCreateUpdateChecklistArgs = {
  data: ChecklistCreateUpdateInput;
  id?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUpdateOnCrimeGroupArgs = {
  crimeGroup: UniqueId;
  data: CreateUpdateData;
};


export type MutationCreateUpdateOnIncidentArgs = {
  data: CreateUpdateData;
  incident: UniqueId;
};


export type MutationCreateUpdateOnInvestigationArgs = {
  data: CreateUpdateData;
  investigation: UniqueId;
};


export type MutationCreateUpdateOnOffenderArgs = {
  data: CreateUpdateData;
  offender: UniqueId;
};


export type MutationCreateUpdateOnStockRemovalRequestArgs = {
  data: CreateUpdateData;
  stockRemovalRequest: UniqueId;
};


export type MutationCreateUpdateOnVehicleArgs = {
  data: CreateUpdateData;
  vehicle: UniqueId;
};


export type MutationCreateUserInAuth0Args = {
  id: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateUserInDatabaseArgs = {
  data: CreateUserData;
};


export type MutationCreateVehicleArgs = {
  data: CreateVehicleDataInput;
};


export type MutationDeleteArticleArgs = {
  where: UniqueId;
};


export type MutationDeleteBanArgs = {
  where: UniqueId;
};


export type MutationDeleteBillingCustomerArgs = {
  where: UniqueId;
};


export type MutationDeleteBrandArgs = {
  where: BrandWhereUniqueInput;
};


export type MutationDeleteBusinessArgs = {
  where: BusinessWhereUniqueInput;
};


export type MutationDeleteBusinessQuestionArgs = {
  where: BusinessQuestionWhereUniqueInput;
};


export type MutationDeleteCameraArgs = {
  where: UniqueId;
};


export type MutationDeleteChatArgs = {
  where: UniqueId;
};


export type MutationDeleteCrimeGroupArgs = {
  where: UniqueId;
};


export type MutationDeleteCustomGalleryArgs = {
  where: UniqueId;
};


export type MutationDeleteDashboardTemplateArgs = {
  where: DashboardWhereUniqueInput;
};


export type MutationDeleteDemDeviceArgs = {
  where: DemDeviceWhereUniqueInput;
};


export type MutationDeleteDemGroupArgs = {
  where: DemGroupWhereUniqueInput;
};


export type MutationDeleteDetectionConfigArgs = {
  where: UniqueId;
};


export type MutationDeleteDocumentArgs = {
  where: UniqueId;
};


export type MutationDeleteEvidenceArgs = {
  where: UniqueId;
};


export type MutationDeleteFaceArgs = {
  where: RekFaceWhereUniqueInput;
};


export type MutationDeleteFeedItemArgs = {
  where: UniqueId;
};


export type MutationDeleteFolderArgs = {
  where: UniqueId;
};


export type MutationDeleteGeographicalAreaArgs = {
  id: Scalars['String'];
};


export type MutationDeleteGroupArgs = {
  where: UniqueId;
};


export type MutationDeleteIncidentArgs = {
  where: UniqueId;
};


export type MutationDeleteIncidentStatusArgs = {
  where: UniqueId;
};


export type MutationDeleteIntegrationConfigArgs = {
  id: Scalars['String'];
};


export type MutationDeleteInvestigationArgs = {
  where: UniqueId;
};


export type MutationDeleteMessageArgs = {
  where: MessageWhereUniqueInput;
};


export type MutationDeleteOffenderArgs = {
  where: UniqueId;
};


export type MutationDeleteOneQuestionGroupArgs = {
  where: QuestionGroupWhereUniqueInput;
};


export type MutationDeleteOneStatementTemplateArgs = {
  where: StatementTemplateWhereUniqueInput;
};


export type MutationDeleteOneTierArgs = {
  where: UniqueId;
};


export type MutationDeleteOneWorkflowArgs = {
  where: WorkflowWhereUniqueInput;
};


export type MutationDeleteQuestionArgs = {
  where?: InputMaybe<UniqueId>;
};


export type MutationDeleteRecycleTagArgs = {
  where: UniqueId;
};


export type MutationDeleteReportGroupArgs = {
  where: UniqueId;
};


export type MutationDeleteReportTemplateArgs = {
  where: ReportTemplateWhereUniqueInput;
};


export type MutationDeleteRoleArgs = {
  data: DeleteRole;
};


export type MutationDeleteSharingConfigArgs = {
  where: UniqueId;
};


export type MutationDeleteShoeArgs = {
  where: ShoeWhereUniqueInput;
};


export type MutationDeleteStockRemovalReasonOptionArgs = {
  where: UniqueId;
};


export type MutationDeleteStockRemovalRequestArgs = {
  where: UniqueId;
};


export type MutationDeleteStockRemovalRequestApprovalArgs = {
  where: UniqueId;
};


export type MutationDeleteStockRemovalReturnArgs = {
  where: UniqueId;
};


export type MutationDeleteTagArgs = {
  where: UniqueId;
};


export type MutationDeleteTodoArgs = {
  where: TodoWhereUniqueInput;
};


export type MutationDeleteTrainingVideoArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUpdateArgs = {
  where: UpdateWhereUnique;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
  scheme: Scalars['String'];
};


export type MutationDeleteUserFromSchemeArgs = {
  id: Scalars['String'];
  scheme: Scalars['String'];
};


export type MutationDeleteVehicleArgs = {
  where: UniqueId;
};


export type MutationDiscImportDataArgs = {
  data: DiscImportDataInput;
};


export type MutationDismissAiMatchArgs = {
  markAsFalsePositive?: InputMaybe<Scalars['Boolean']>;
  where: UniqueId;
};


export type MutationDismissAiSuggestionArgs = {
  where: UniqueId;
};


export type MutationDismissMatchArgs = {
  where: RekMatchWhereUniqueInput;
};


export type MutationDismissPoliceMatchArgs = {
  dismissReason?: InputMaybe<Scalars['String']>;
  where: PoliceMatchWhereUniqueInput;
};


export type MutationDismissTrainingVideoPromptArgs = {
  trainingVideoId: Scalars['String'];
};


export type MutationDunelmImportDataArgs = {
  data: DunelmImportDataInput;
};


export type MutationEditArticleArgs = {
  data: CreateArticleInput;
  where: UniqueId;
};


export type MutationEnableSchemeRekognitionArgs = {
  data: EnableSchemeRekognotionInput;
  where: SchemeWhereUniqueInput;
};


export type MutationExportInvestigationZipArgs = {
  where: UniqueId;
};


export type MutationExtendIncidentArgs = {
  date?: InputMaybe<Scalars['Date']>;
  where: UniqueId;
};


export type MutationExtendOffenderArgs = {
  date?: InputMaybe<Scalars['Date']>;
  where: UniqueId;
};


export type MutationFinalizeAudioSessionArgs = {
  feedbackNotes?: InputMaybe<Scalars['String']>;
  sessionId: Scalars['String'];
  userSatisfaction?: InputMaybe<Scalars['Int']>;
};


export type MutationFinishPatrolRunArgs = {
  runId: Scalars['ID'];
};


export type MutationGenerateComprehensiveDemoDataArgs = {
  businessContext: Scalars['String'];
  incidentsPerMonth?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
  timeRangeDays?: InputMaybe<Scalars['Int']>;
};


export type MutationGenerateDemoBusinessesArgs = {
  businessContext: Scalars['String'];
  schemeId: Scalars['String'];
};


export type MutationGenerateDemoStockItemsArgs = {
  businessContext: Scalars['String'];
  schemeId: Scalars['String'];
};


export type MutationGenerateFeedItemsArgs = {
  where: UniqueId;
};


export type MutationGenerateIncidentTypeDescriptionArgs = {
  incidentTypeName: Scalars['String'];
  userDescription?: InputMaybe<Scalars['String']>;
};


export type MutationGenerateOffenderBulletinArgs = {
  data?: InputMaybe<GenerateOffenderBulletinData>;
  where: GenerateOffenderBulletinWhere;
};


export type MutationGeneratePatrolTokenBatchArgs = {
  count: Scalars['Int'];
};


export type MutationGenerateReportLayoutArgs = {
  instructions?: InputMaybe<Scalars['String']>;
  reportType: ReportType;
};


export type MutationGenerateReportTemplateDescriptionArgs = {
  reportTemplateName: Scalars['String'];
  reportType?: InputMaybe<Scalars['String']>;
  userDescription?: InputMaybe<Scalars['String']>;
};


export type MutationGenerateStatementBodyArgs = {
  data: GenerateStatementData;
};


export type MutationGenerateTrainingVideoUploadUrlArgs = {
  filename: Scalars['String'];
  schemeId: Scalars['String'];
};


export type MutationIcelandImportDataArgs = {
  data: IcelandImportDataInput;
};


export type MutationImportStockItemCsvArgs = {
  where: Scalars['String'];
};


export type MutationIncidentImportArgs = {
  data: IncidentImportDataInput;
};


export type MutationIncidentItemsCsvArgs = {
  where: IncidentItemsWhereInput;
};


export type MutationIndexFacesArgs = {
  data: CreateArticleInput;
};


export type MutationIndexImageArgs = {
  where: ImageWhereUniqueInput;
};


export type MutationIndexOffenderImagesForSchemeArgs = {
  data: IndexOffenderImagesInput;
};


export type MutationIntelOneImportDataArgs = {
  data: IntelOneImportDataInput;
};


export type MutationInviteExistingUserArgs = {
  data: UserUpdateInput;
  where: UniqueId;
};


export type MutationJdSiteImportArgs = {
  data: JdSiteImportInput;
};


export type MutationLinkBusinessToSchemeArgs = {
  business: BusinessWhereUniqueInput;
  scheme: SchemeWhereUniqueInput;
};


export type MutationLinkOrgToDemArgs = {
  data: UniqueId;
  where: UniqueId;
};


export type MutationLinkUserToDemArgs = {
  data: UniqueId;
  where: UniqueId;
};


export type MutationMapAudioIncidentFacesArgs = {
  faceOffenderMapping: Scalars['JSON'];
  sessionId: Scalars['String'];
};


export type MutationMarkAsReadMessagesArgs = {
  userChatId: Scalars['String'];
};


export type MutationMarkBulletinViewedArgs = {
  articleId: Scalars['String'];
};


export type MutationMarkDocumentViewedArgs = {
  documentId: Scalars['String'];
};


export type MutationMarkOffenderViewedArgs = {
  offenderId: Scalars['String'];
};


export type MutationMarkSharedCrimeGroupViewedArgs = {
  sharedCrimeGroupId: Scalars['String'];
};


export type MutationMarkSharedIncidentViewedArgs = {
  sharedIncidentId: Scalars['String'];
};


export type MutationMarkSharedOffenderViewedArgs = {
  sharedOffenderId: Scalars['String'];
};


export type MutationMarkSharedVehicleViewedArgs = {
  sharedVehicleId: Scalars['String'];
};


export type MutationMarkStockRemovalRequestAsCollectedArgs = {
  where: UniqueId;
};


export type MutationMarkStockRemovalRequestAsPickedArgs = {
  data: MarkStockRemovalRequestAsPickedInput;
};


export type MutationMarkStockRemovalRequestAsReturnedArgs = {
  where: UniqueId;
};


export type MutationMarkTrainingVideoCompleteArgs = {
  trainingVideoId: Scalars['String'];
};


export type MutationMergeBusinessesArgs = {
  data: MergeBusinessesInput;
};


export type MutationMergeBusinessesWithSameNameArgs = {
  data: BusinessWhereUniqueInput;
};


export type MutationMergeOffenderArgs = {
  data: MergeOffendersInput;
};


export type MutationMergeSharedOffendersArgs = {
  deleteSource?: InputMaybe<Scalars['Boolean']>;
  sourceId: Scalars['String'];
  targetId: Scalars['String'];
};


export type MutationMidCountiesImportDataArgs = {
  data: MidCountiesImportDataInput;
};


export type MutationMySafetyImportDataArgs = {
  data: MySafetyImportDataInput;
};


export type MutationNextImportDataArgs = {
  data: NextImportDataInput;
};


export type MutationOneStopImportDataArgs = {
  data: OneStopImportDataInput;
};


export type MutationQueueActivityCsvExportArgs = {
  where: ActivityExportWhere;
};


export type MutationQueueBusinessEngagementCsvExportArgs = {
  orderBy?: InputMaybe<BusinessContributionOrderByInput>;
  where: UserContributionWhereInput;
};


export type MutationQueueIncidentCsvExportArgs = {
  where: IncidentExportInput;
};


export type MutationQueueStockRemovalCsvExportArgs = {
  where: StockRemovalCsvExportInput;
};


export type MutationRecordPatrolScanArgs = {
  data: PatrolScanInput;
};


export type MutationRecycleActiveChecklistArgs = {
  id: Scalars['String'];
};


export type MutationRecycleChecklistArgs = {
  id: Scalars['String'];
};


export type MutationRecycleDemEvidenceArgs = {
  where: UniqueId;
};


export type MutationRecycleIncidentArgs = {
  where: UniqueId;
};


export type MutationRecycleOffenderArgs = {
  where: UniqueId;
};


export type MutationRecycleTagArgs = {
  where: UniqueId;
};


export type MutationRegisterPushTokenArgs = {
  data: RegisterPushTokenData;
};


export type MutationRejectPapStockRemovalRequestArgs = {
  where: UniqueId;
};


export type MutationRejectStockRemovalRequestArgs = {
  where: UniqueId;
};


export type MutationRemoveQuestionFromTagArgs = {
  where?: InputMaybe<UniqueId>;
};


export type MutationRemoveUserFromBusinessArgs = {
  data: UserWhereUniqueInput;
  schemeWhere: SchemeWhereUniqueInput;
  where: BusinessWhereUniqueInput;
};


export type MutationReopenInvestigationArgs = {
  where: UniqueId;
};


export type MutationRequestCancelStockRemovalRequestArgs = {
  where: UniqueId;
};


export type MutationRestoreAllRecycledItemsArgs = {
  schemeId: UniqueId;
};


export type MutationRestoreDemEvidenceArgs = {
  where: UniqueId;
};


export type MutationRestoreIncidentArgs = {
  data: RecycledItemWhereUniqueInput;
  where: UniqueId;
};


export type MutationRestoreItemArgs = {
  where: RecycledItemWhereUniqueInput;
};


export type MutationRestoreOffenderArgs = {
  data: RecycledItemWhereUniqueInput;
  where: UniqueId;
};


export type MutationRiverIslandImportDataArgs = {
  data: RiverIslandImportInput;
};


export type MutationScanIncidentArgs = {
  where: ScanIncidentInput;
};


export type MutationSendInviteArgs = {
  user: Scalars['String'];
};


export type MutationSentrysysImportDataArgs = {
  data: SentrysysImportDataInput;
};


export type MutationSetDefaultTemplateArgs = {
  data: SetDefaultTemplateInput;
};


export type MutationSetPasswordArgs = {
  data: SetPasswordData;
};


export type MutationSetSchemeSharingArgs = {
  data: SetSchemeSharingInput;
};


export type MutationSetupFaceRecognitionArgs = {
  data: SetupFaceRecognitionInput;
  where: SchemeWhereUniqueInput;
};


export type MutationShareDataArgs = {
  data: ShareDataInput;
};


export type MutationShareIncidentArgs = {
  where: UniqueId;
};


export type MutationSignTermsArgs = {
  data: SignTermsInput;
};


export type MutationStartEnhancedAudioStreamArgs = {
  incidentTypeId: Scalars['String'];
  sessionId: Scalars['String'];
};


export type MutationStartPatrolRunArgs = {
  data: PatrolRunStartInput;
};


export type MutationStockItemImportArgs = {
  data: Array<StockItemsCreateInput>;
};


export type MutationStreamAudioChunkArgs = {
  audioChunk: Scalars['String'];
  sessionId: Scalars['String'];
};


export type MutationSubmitBusinessAnswersArgs = {
  data: SubmitBusinessAnswersInput;
};


export type MutationSubscribeToCrimeGroupArgs = {
  where: UniqueId;
};


export type MutationSubscribeToIncidentArgs = {
  where: IncidentWhereUniqueInput;
};


export type MutationSubscribeToInvestigationArgs = {
  where: UniqueId;
};


export type MutationSubscribeToOffenderArgs = {
  where: OffenderWhereUniqueInput;
};


export type MutationSubscribeToVehicleArgs = {
  where: UniqueId;
};


export type MutationSyncBusinessGroupsArgs = {
  data: SyncBusinessGroupsInput;
};


export type MutationSyncBusinessPoliceForcesArgs = {
  batchSize?: InputMaybe<Scalars['Int']>;
  concurrentLookups?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
};


export type MutationSyncIncidentGroupsArgs = {
  businessId: Scalars['String'];
  groupId: Scalars['String'];
};


export type MutationSyncIncidentLocationsArgs = {
  businessId: Scalars['String'];
  groupId: Scalars['String'];
};


export type MutationTestIntegrationConfigArgs = {
  id: Scalars['String'];
};


export type MutationTjxImportDataArgs = {
  data: TjxImportDataInput;
};


export type MutationToggleUserArgs = {
  id: Scalars['ID'];
  schemeId?: InputMaybe<Scalars['ID']>;
};


export type MutationUnsubscribeFromIncidentArgs = {
  where: IncidentWhereUniqueInput;
};


export type MutationUnsubscribeFromOffenderArgs = {
  where: OffenderWhereUniqueInput;
};


export type MutationUnsubscribeToCrimeGroupArgs = {
  where: UniqueId;
};


export type MutationUnsubscribeToInvestigationArgs = {
  where: UniqueId;
};


export type MutationUnsubscribeToVehicleArgs = {
  where: UniqueId;
};


export type MutationUpdateBillingCustomerArgs = {
  data: BillingCustomerUpdateInput;
  where: UniqueId;
};


export type MutationUpdateBusinessArgs = {
  data: BusinessUpdateInput;
  where: BusinessWhereUniqueInput;
};


export type MutationUpdateBusinessQuestionArgs = {
  data: UpdateBusinessQuestionInput;
  where: BusinessQuestionWhereUniqueInput;
};


export type MutationUpdateChatArgs = {
  data: ChatUpdateInput;
  where: UniqueId;
};


export type MutationUpdateChecklistArgs = {
  data: ChecklistUpdateInput;
  id?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateCrimeGroupArgs = {
  data: UpdateCrimeGroupDataInput;
  where: UniqueId;
};


export type MutationUpdateCrimeGroupOffenderArgs = {
  data: UpdateCrimeGroupDataInput;
  where: UniqueId;
};


export type MutationUpdateCustomGalleryArgs = {
  data: CustomGalleryUpdateInput;
  where: UniqueId;
};


export type MutationUpdateDashboardTemplateArgs = {
  data: DashboardTemplateUpdateInput;
  where: DashboardWhereUniqueInput;
};


export type MutationUpdateDemDeviceArgs = {
  data: UpdateDemDevice;
  where: UniqueId;
};


export type MutationUpdateDemGroupArgs = {
  data: UpdateDemGroup;
  where: UniqueId;
};


export type MutationUpdateDocumentArgs = {
  data: UniqueId;
  where: UniqueId;
};


export type MutationUpdateFlowArgs = {
  data: UpdateFlowData;
  where: UniqueId;
};


export type MutationUpdateFolderArgs = {
  data: UpdateFolder;
  where: UniqueId;
};


export type MutationUpdateGeographicalAreaArgs = {
  data: UpdateGeographicalAreaInput;
  id: Scalars['String'];
};


export type MutationUpdateGroupArgs = {
  data: GroupUpdateInput;
  where: UniqueId;
};


export type MutationUpdateIncidentArgs = {
  data: IncidentUpdateInput;
  where: UniqueId;
};


export type MutationUpdateIncidentBusinessArgs = {
  data: UpdateIncidentBusinessInput;
  where: UniqueId;
};


export type MutationUpdateIncidentStatusArgs = {
  data: UpdateIncidentStatusInput;
  where: IncidentWhereUniqueInput;
};


export type MutationUpdateIncidentStatusDataArgs = {
  data: IncidentStatusUpdateInput;
  where: UniqueId;
};


export type MutationUpdateIntegrationConfigArgs = {
  conditions?: InputMaybe<Scalars['JSON']>;
  config?: InputMaybe<Scalars['JSON']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateInvestigationArgs = {
  data: UpdateInvestigationInput;
  where: UniqueId;
};


export type MutationUpdateMessageArgs = {
  data: MessageUpdateInput;
  where: MessageWhereUniqueInput;
};


export type MutationUpdateOffenderArgs = {
  data: OffenderUpdateInput;
  where: UniqueId;
};


export type MutationUpdateOffenderDetailsArgs = {
  data: OffenderUpdateDetailsInput;
  where: Scalars['String'];
};


export type MutationUpdateOneMg11Args = {
  data: Mg11UpdateInput;
  where: Mg11WhereUniqueInput;
};


export type MutationUpdateOneQuestionGroupArgs = {
  data: QuestionGroupUpdateInput;
  where: QuestionGroupWhereUniqueInput;
};


export type MutationUpdateOneStatementTemplateArgs = {
  data: StatementTemplateUpdateInput;
  where: StatementTemplateWhereUniqueInput;
};


export type MutationUpdateOneTierArgs = {
  data: TierUpdateInput;
  where: UniqueId;
};


export type MutationUpdateOneWorkflowArgs = {
  data: WorkflowUpdateInput;
  where: WorkflowWhereUniqueInput;
};


export type MutationUpdatePasswordArgs = {
  data: UpdatePasswordData;
};


export type MutationUpdateQuestionOnActivityArgs = {
  data: UpdateQuestionOnActivityInput;
};


export type MutationUpdateQuestionOnTagArgs = {
  data: UpdateQuestionOnTagInput;
};


export type MutationUpdateReportGroupArgs = {
  data: ReportGroupEditInput;
  where: UniqueId;
};


export type MutationUpdateReportTemplateArgs = {
  data: ReportTemplateUpdateInput;
  where: ReportTemplateWhereUniqueInput;
};


export type MutationUpdateSchemeArgs = {
  data: SchemeUpdateInput;
  where: UniqueId;
};


export type MutationUpdateSharingConfigArgs = {
  data: SharingConfigUpdateInput;
  where: SharingConfigWhereUniqueInput;
};


export type MutationUpdateShoeArgs = {
  data: UpdateShoe;
  where: UniqueId;
};


export type MutationUpdateStockItemArgs = {
  data: UpdateStockItemInput;
  where: UniqueId;
};


export type MutationUpdateStockRemovalRequestArgs = {
  data: UpdateStockRemovalRequestInput;
  where: UniqueId;
};


export type MutationUpdateStockRemovalReturnArgs = {
  data: UpdateStockRemovalReturnInput;
  where: UniqueId;
};


export type MutationUpdateTagArgs = {
  data: TagUpdateInput;
  where: UniqueId;
};


export type MutationUpdateTagPoliceSharingArgs = {
  policeSharing: Scalars['Boolean'];
  tagId: Scalars['String'];
};


export type MutationUpdateTagQsArgs = {
  data: ChangePositionAndReqInput;
};


export type MutationUpdateTimeoutDetectionConfigArgs = {
  data: UpdateSchemeDefaultTimeoutConfigInput;
};


export type MutationUpdateTodoArgs = {
  data: TodoUpdateInput;
  where: UniqueId;
};


export type MutationUpdateTodoMentionArgs = {
  where: UpdateTodoMention;
};


export type MutationUpdateTrainingVideoArgs = {
  input: UpdateTrainingVideoInput;
};


export type MutationUpdateUpdateArgs = {
  data: UpdateUpdateDataInput;
  where: UpdateWhereUniqueInput;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UniqueId;
};


export type MutationUpdateUserNotificationsArgs = {
  where: UserNotificationWhereInput;
};


export type MutationUpdateVehicleArgs = {
  data: VehicleUpdateInput;
  where: UniqueId;
};


export type MutationUploadAudioIncidentImagesArgs = {
  imageUrls: Array<Scalars['String']>;
  sessionId: Scalars['String'];
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload'];
  incident: IncidentWhereUniqueInput;
  offenders?: InputMaybe<Array<UniqueId>>;
  scheme: Scalars['String'];
};


export type MutationUploadToImageArgs = {
  file: Scalars['Upload'];
  image: ImageWhereUniqueInput;
};


export type MutationUpsertBrandArgs = {
  data: UpsertBrand;
};


export type MutationUpsertCameraArgs = {
  data: AiVisionCameraInput;
};


export type MutationUpsertContactArgs = {
  data: UpsertContactInput;
};


export type MutationUpsertDemDeviceArgs = {
  data: UpsertDemDevice;
};


export type MutationUpsertDemGroupArgs = {
  data: UpsertDemGroup;
};


export type MutationUpsertDetectionConfigArgs = {
  data: DetectActionConfigInput;
};


export type MutationUpsertFolderArgs = {
  data: UpsertFolder;
};


export type MutationUpsertIncidentArgs = {
  data: UpsertIncidentData;
};


export type MutationUpsertIncidentFormArgs = {
  data: UpsertIncidentFormInput;
};


export type MutationUpsertPatrolCheckpointArgs = {
  data: PatrolCheckpointInput;
};


export type MutationUpsertPatrolRouteArgs = {
  data: PatrolRouteInput;
};


export type MutationUpsertPermissionArgs = {
  data: UpsertRole;
};


export type MutationUpsertShoeArgs = {
  data: UpsertShoe;
};


export type MutationUpsertStockRemovalReasonOptionArgs = {
  data: UpsertStockRemovalReasonOption;
};


export type MutationVerifyAiVisionMatchArgs = {
  outcome: AiVisionMatchOutcome;
  outcomeNotes?: InputMaybe<Scalars['String']>;
  where: UniqueId;
};

export type MySafetyImportDataInput = {
  groups: Array<UniqueId>;
  scheme: UniqueId;
  url: Scalars['String'];
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type NestedBoolNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedBoolNullableFilter>;
  _min?: InputMaybe<NestedBoolNullableFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableWithAggregatesFilter>;
};

export type NestedBoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type NestedCustomGalleryOnOffender = {
  connect?: InputMaybe<Array<UniqueId>>;
  create?: InputMaybe<Array<CreateCustomGalleryInput>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
  set?: InputMaybe<Array<UniqueId>>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['Date']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Date']>>;
};

export type NestedDateTimeNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedDateTimeNullableFilter>;
  _min?: InputMaybe<NestedDateTimeNullableFilter>;
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<NestedDateTimeNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Date']>>;
};

export type NestedDateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Date']>>;
};

export type NestedEnumActionTypeFilter = {
  equals?: InputMaybe<ActionType>;
  in?: InputMaybe<Array<ActionType>>;
  not?: InputMaybe<ActionType>;
  notIn?: InputMaybe<Array<ActionType>>;
};

export type NestedEnumAgeNullableFilter = {
  equals?: InputMaybe<Age>;
  in?: InputMaybe<Array<Age>>;
  not?: InputMaybe<Age>;
  notIn?: InputMaybe<Array<Age>>;
};

export type NestedEnumAnswerTypeFilter = {
  equals?: InputMaybe<AnswerType>;
  in?: InputMaybe<Array<AnswerType>>;
  not?: InputMaybe<AnswerType>;
  notIn?: InputMaybe<Array<AnswerType>>;
};

export type NestedEnumArticlePriorityFilter = {
  equals?: InputMaybe<ArticlePriority>;
  in?: InputMaybe<Array<ArticlePriority>>;
  not?: InputMaybe<ArticlePriority>;
  notIn?: InputMaybe<Array<ArticlePriority>>;
};

export type NestedEnumArticleSectionTypeFilter = {
  equals?: InputMaybe<ArticleSectionType>;
  in?: InputMaybe<Array<ArticleSectionType>>;
  not?: InputMaybe<ArticleSectionType>;
  notIn?: InputMaybe<Array<ArticleSectionType>>;
};

export type NestedEnumBanTypeNullableFilter = {
  equals?: InputMaybe<BanType>;
  in?: InputMaybe<Array<BanType>>;
  not?: InputMaybe<BanType>;
  notIn?: InputMaybe<Array<BanType>>;
};

export type NestedEnumBuildNullableFilter = {
  equals?: InputMaybe<Build>;
  in?: InputMaybe<Array<Build>>;
  not?: InputMaybe<Build>;
  notIn?: InputMaybe<Array<Build>>;
};

export type NestedEnumChecklistAnswerTypeFilter = {
  equals?: InputMaybe<ChecklistAnswerType>;
  in?: InputMaybe<Array<ChecklistAnswerType>>;
  not?: InputMaybe<ChecklistAnswerType>;
  notIn?: InputMaybe<Array<ChecklistAnswerType>>;
};

export type NestedEnumChecklistStatusFilter = {
  equals?: InputMaybe<ChecklistStatus>;
  in?: InputMaybe<Array<ChecklistStatus>>;
  not?: InputMaybe<ChecklistStatus>;
  notIn?: InputMaybe<Array<ChecklistStatus>>;
};

export type NestedEnumCompleteStatusFilter = {
  equals?: InputMaybe<CompleteStatus>;
  in?: InputMaybe<Array<CompleteStatus>>;
  not?: InputMaybe<CompleteStatus>;
  notIn?: InputMaybe<Array<CompleteStatus>>;
};

export type NestedEnumCrimeTypeNullableFilter = {
  equals?: InputMaybe<CrimeType>;
  in?: InputMaybe<Array<CrimeType>>;
  not?: InputMaybe<CrimeType>;
  notIn?: InputMaybe<Array<CrimeType>>;
};

export type NestedEnumCsvStatusFilter = {
  equals?: InputMaybe<CsvStatus>;
  in?: InputMaybe<Array<CsvStatus>>;
  not?: InputMaybe<CsvStatus>;
  notIn?: InputMaybe<Array<CsvStatus>>;
};

export type NestedEnumCsvTypeFilter = {
  equals?: InputMaybe<CsvType>;
  in?: InputMaybe<Array<CsvType>>;
  not?: InputMaybe<CsvType>;
  notIn?: InputMaybe<Array<CsvType>>;
};

export type NestedEnumCurrencyNullableFilter = {
  equals?: InputMaybe<Currency>;
  in?: InputMaybe<Array<Currency>>;
  not?: InputMaybe<Currency>;
  notIn?: InputMaybe<Array<Currency>>;
};

export type NestedEnumFeedItemTypeFilter = {
  equals?: InputMaybe<FeedItemType>;
  in?: InputMaybe<Array<FeedItemType>>;
  not?: InputMaybe<FeedItemType>;
  notIn?: InputMaybe<Array<FeedItemType>>;
};

export type NestedEnumFileTypeNullableFilter = {
  equals?: InputMaybe<FileType>;
  in?: InputMaybe<Array<FileType>>;
  not?: InputMaybe<FileType>;
  notIn?: InputMaybe<Array<FileType>>;
};

export type NestedEnumGenderNullableFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<Gender>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type NestedEnumGoodsModeFilter = {
  equals?: InputMaybe<GoodsMode>;
  in?: InputMaybe<Array<GoodsMode>>;
  not?: InputMaybe<GoodsMode>;
  notIn?: InputMaybe<Array<GoodsMode>>;
};

export type NestedEnumHeightNullableFilter = {
  equals?: InputMaybe<Height>;
  in?: InputMaybe<Array<Height>>;
  not?: InputMaybe<Height>;
  notIn?: InputMaybe<Array<Height>>;
};

export type NestedEnumIdSourceNullableFilter = {
  equals?: InputMaybe<IdSource>;
  in?: InputMaybe<Array<IdSource>>;
  not?: InputMaybe<IdSource>;
  notIn?: InputMaybe<Array<IdSource>>;
};

export type NestedEnumImagePositionFilter = {
  equals?: InputMaybe<ImagePosition>;
  in?: InputMaybe<Array<ImagePosition>>;
  not?: InputMaybe<ImagePosition>;
  notIn?: InputMaybe<Array<ImagePosition>>;
};

export type NestedEnumIncidentFormFieldFilter = {
  equals?: InputMaybe<IncidentFormField>;
  in?: InputMaybe<Array<IncidentFormField>>;
  not?: InputMaybe<IncidentFormField>;
  notIn?: InputMaybe<Array<IncidentFormField>>;
};

export type NestedEnumIntelTypeFilter = {
  equals?: InputMaybe<IntelType>;
  in?: InputMaybe<Array<IntelType>>;
  not?: InputMaybe<IntelType>;
  notIn?: InputMaybe<Array<IntelType>>;
};

export type NestedEnumInvestigationStatusFilter = {
  equals?: InputMaybe<InvestigationStatus>;
  in?: InputMaybe<Array<InvestigationStatus>>;
  not?: InputMaybe<InvestigationStatus>;
  notIn?: InputMaybe<Array<InvestigationStatus>>;
};

export type NestedEnumLanguageCodeFilter = {
  equals?: InputMaybe<LanguageCode>;
  in?: InputMaybe<Array<LanguageCode>>;
  not?: InputMaybe<LanguageCode>;
  notIn?: InputMaybe<Array<LanguageCode>>;
};

export type NestedEnumMg11StatusFilter = {
  equals?: InputMaybe<Mg11Status>;
  in?: InputMaybe<Array<Mg11Status>>;
  not?: InputMaybe<Mg11Status>;
  notIn?: InputMaybe<Array<Mg11Status>>;
};

export type NestedEnumModelFilter = {
  equals?: InputMaybe<Model>;
  in?: InputMaybe<Array<Model>>;
  not?: InputMaybe<Model>;
  notIn?: InputMaybe<Array<Model>>;
};

export type NestedEnumModelNullableFilter = {
  equals?: InputMaybe<Model>;
  in?: InputMaybe<Array<Model>>;
  not?: InputMaybe<Model>;
  notIn?: InputMaybe<Array<Model>>;
};

export type NestedEnumOnboardStepsFilter = {
  equals?: InputMaybe<OnboardSteps>;
  in?: InputMaybe<Array<OnboardSteps>>;
  not?: InputMaybe<OnboardSteps>;
  notIn?: InputMaybe<Array<OnboardSteps>>;
};

export type NestedEnumPoliceResponseTimeNullableFilter = {
  equals?: InputMaybe<PoliceResponseTime>;
  in?: InputMaybe<Array<PoliceResponseTime>>;
  not?: InputMaybe<PoliceResponseTime>;
  notIn?: InputMaybe<Array<PoliceResponseTime>>;
};

export type NestedEnumPoliceTriageStatusFilter = {
  equals?: InputMaybe<PoliceTriageStatus>;
  in?: InputMaybe<Array<PoliceTriageStatus>>;
  not?: InputMaybe<PoliceTriageStatus>;
  notIn?: InputMaybe<Array<PoliceTriageStatus>>;
};

export type NestedEnumQuestionModelFilter = {
  equals?: InputMaybe<QuestionModel>;
  in?: InputMaybe<Array<QuestionModel>>;
  not?: InputMaybe<QuestionModel>;
  notIn?: InputMaybe<Array<QuestionModel>>;
};

export type NestedEnumRaceNullableFilter = {
  equals?: InputMaybe<Race>;
  in?: InputMaybe<Array<Race>>;
  not?: InputMaybe<Race>;
  notIn?: InputMaybe<Array<Race>>;
};

export type NestedEnumReportTypeFilter = {
  equals?: InputMaybe<ReportType>;
  in?: InputMaybe<Array<ReportType>>;
  not?: InputMaybe<ReportType>;
  notIn?: InputMaybe<Array<ReportType>>;
};

export type NestedEnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<Role>;
  notIn?: InputMaybe<Array<Role>>;
};

export type NestedEnumTagTypeFilter = {
  equals?: InputMaybe<TagType>;
  in?: InputMaybe<Array<TagType>>;
  not?: InputMaybe<TagType>;
  notIn?: InputMaybe<Array<TagType>>;
};

export type NestedEnumTodoTypeNullableFilter = {
  equals?: InputMaybe<TodoType>;
  in?: InputMaybe<Array<TodoType>>;
  not?: InputMaybe<TodoType>;
  notIn?: InputMaybe<Array<TodoType>>;
};

export type NestedEnumUpdateIconFilter = {
  equals?: InputMaybe<UpdateIcon>;
  in?: InputMaybe<Array<UpdateIcon>>;
  not?: InputMaybe<UpdateIcon>;
  notIn?: InputMaybe<Array<UpdateIcon>>;
};

export type NestedEnumUpdateTypeFilter = {
  equals?: InputMaybe<UpdateType>;
  in?: InputMaybe<Array<UpdateType>>;
  not?: InputMaybe<UpdateType>;
  notIn?: InputMaybe<Array<UpdateType>>;
};

export type NestedEnumUserStatusNullableFilter = {
  equals?: InputMaybe<UserStatus>;
  in?: InputMaybe<Array<UserStatus>>;
  not?: InputMaybe<UserStatus>;
  notIn?: InputMaybe<Array<UserStatus>>;
};

export type NestedEnumUserTypeFilter = {
  equals?: InputMaybe<UserType>;
  in?: InputMaybe<Array<UserType>>;
  not?: InputMaybe<UserType>;
  notIn?: InputMaybe<Array<UserType>>;
};

export type NestedEnumWhenNullableFilter = {
  equals?: InputMaybe<When>;
  in?: InputMaybe<Array<When>>;
  not?: InputMaybe<When>;
  notIn?: InputMaybe<Array<When>>;
};

export type NestedEnumWorkflowActionTypeFilter = {
  equals?: InputMaybe<WorkflowActionType>;
  in?: InputMaybe<Array<WorkflowActionType>>;
  not?: InputMaybe<WorkflowActionType>;
  notIn?: InputMaybe<Array<WorkflowActionType>>;
};

export type NestedEnumWorkflowTriggerFilter = {
  equals?: InputMaybe<WorkflowTrigger>;
  in?: InputMaybe<Array<WorkflowTrigger>>;
  not?: InputMaybe<WorkflowTrigger>;
  notIn?: InputMaybe<Array<WorkflowTrigger>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedFloatNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedFloatNullableFilter>;
  _min?: InputMaybe<NestedFloatNullableFilter>;
  _sum?: InputMaybe<NestedFloatNullableFilter>;
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedFloatWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedFloatFilter>;
  _min?: InputMaybe<NestedFloatFilter>;
  _sum?: InputMaybe<NestedFloatFilter>;
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedIntNullableFilter>;
  _sum?: InputMaybe<NestedIntNullableFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedJsonNullableFilter = {
  array_contains?: InputMaybe<Scalars['JSON']>;
  array_ends_with?: InputMaybe<Scalars['JSON']>;
  array_starts_with?: InputMaybe<Scalars['JSON']>;
  equals?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<Scalars['JSON']>;
  path?: InputMaybe<Array<Scalars['String']>>;
  string_contains?: InputMaybe<Scalars['String']>;
  string_ends_with?: InputMaybe<Scalars['String']>;
  string_starts_with?: InputMaybe<Scalars['String']>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NextColumnMapping = {
  dateColumn?: InputMaybe<Scalars['String']>;
  incidentDetailsColumn?: InputMaybe<Scalars['String']>;
  locationColumn?: InputMaybe<Scalars['String']>;
  policeAttendedColumn?: InputMaybe<Scalars['String']>;
  policeRefColumn?: InputMaybe<Scalars['String']>;
  refColumn?: InputMaybe<Scalars['String']>;
  typeColumn?: InputMaybe<Scalars['String']>;
  valueRecoveredColumn?: InputMaybe<Scalars['String']>;
  valueTotalColumn?: InputMaybe<Scalars['String']>;
  violenceOrAbuseColumn?: InputMaybe<Scalars['String']>;
  whereInStoreColumn?: InputMaybe<Scalars['String']>;
};

export type NextIdInput = {
  id: Scalars['String'];
};

export type NextImportDataInput = {
  /** Optional mapping of CSV/Excel columns to incident fields */
  columnMapping?: InputMaybe<NextColumnMapping>;
  /** Base64 encoded CSV/Excel data or file content as string (auto-detects format) */
  fileData?: InputMaybe<Scalars['String']>;
  /** URL to download the CSV/Excel file from (e.g., Azure Blob Storage URL) */
  fileUrl?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<NextIdInput>>;
  scheme: NextIdInput;
};

export type NodePosition = {
  __typename?: 'NodePosition';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Notification = {
  __typename?: 'Notification';
  articleId?: Maybe<Scalars['String']>;
  ban?: Maybe<Ban>;
  body?: Maybe<Scalars['String']>;
  chatId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  crimeGroupId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  incidentId?: Maybe<Scalars['String']>;
  investigationId?: Maybe<Scalars['String']>;
  offenderId?: Maybe<Scalars['String']>;
  schemes: Array<Scheme>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Model>;
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  vehicleId?: Maybe<Scalars['String']>;
};

export type NotificationListRelationFilter = {
  every?: InputMaybe<NotificationWhereInput>;
  none?: InputMaybe<NotificationWhereInput>;
  some?: InputMaybe<NotificationWhereInput>;
};

export type NotificationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type NotificationOrderByWithRelationInput = {
  article?: InputMaybe<ArticleOrderByWithRelationInput>;
  articleId?: InputMaybe<SortOrder>;
  ban?: InputMaybe<BanOrderByWithRelationInput>;
  banId?: InputMaybe<SortOrder>;
  body?: InputMaybe<SortOrder>;
  chat?: InputMaybe<ChatOrderByWithRelationInput>;
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  crimeGroup?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  crimeGroupId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  investigation?: InputMaybe<InvestigationOrderByWithRelationInput>;
  investigationId?: InputMaybe<SortOrder>;
  mentionId?: InputMaybe<SortOrder>;
  mentionIds?: InputMaybe<SortOrder>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  sendPush?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserNotificationOrderByRelationAggregateInput>;
  vehicle?: InputMaybe<VehicleOrderByWithRelationInput>;
  vehicleId?: InputMaybe<SortOrder>;
};

export type NotificationRelayWhereInput = {
  schemeIds?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
};

export enum NotificationScalarFieldEnum {
  ArticleId = 'articleId',
  BanId = 'banId',
  Body = 'body',
  ChatId = 'chatId',
  CreatedAt = 'createdAt',
  CrimeGroupId = 'crimeGroupId',
  Id = 'id',
  IncidentId = 'incidentId',
  InvestigationId = 'investigationId',
  MentionId = 'mentionId',
  MentionIds = 'mentionIds',
  OffenderId = 'offenderId',
  SendPush = 'sendPush',
  Title = 'title',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  UserId = 'userId',
  VehicleId = 'vehicleId'
}

export type NotificationScalarWhereInput = {
  AND?: InputMaybe<Array<NotificationScalarWhereInput>>;
  NOT?: InputMaybe<Array<NotificationScalarWhereInput>>;
  OR?: InputMaybe<Array<NotificationScalarWhereInput>>;
  articleId?: InputMaybe<StringNullableFilter>;
  banId?: InputMaybe<StringNullableFilter>;
  body?: InputMaybe<StringNullableFilter>;
  chatId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigationId?: InputMaybe<StringNullableFilter>;
  mentionId?: InputMaybe<StringNullableFilter>;
  mentionIds?: InputMaybe<StringNullableListFilter>;
  offenderId?: InputMaybe<StringNullableFilter>;
  sendPush?: InputMaybe<BoolNullableFilter>;
  title?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumModelNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringNullableFilter>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export type NotificationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<NotificationScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<NotificationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<NotificationScalarWhereWithAggregatesInput>>;
  articleId?: InputMaybe<StringNullableWithAggregatesFilter>;
  banId?: InputMaybe<StringNullableWithAggregatesFilter>;
  body?: InputMaybe<StringNullableWithAggregatesFilter>;
  chatId?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  crimeGroupId?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentId?: InputMaybe<StringNullableWithAggregatesFilter>;
  investigationId?: InputMaybe<StringNullableWithAggregatesFilter>;
  mentionId?: InputMaybe<StringNullableWithAggregatesFilter>;
  mentionIds?: InputMaybe<StringNullableListFilter>;
  offenderId?: InputMaybe<StringNullableWithAggregatesFilter>;
  sendPush?: InputMaybe<BoolNullableWithAggregatesFilter>;
  title?: InputMaybe<StringNullableWithAggregatesFilter>;
  type?: InputMaybe<EnumModelNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<StringNullableWithAggregatesFilter>;
  vehicleId?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export enum NotificationType {
  ApproveOffender = 'APPROVE_OFFENDER',
  Article = 'ARTICLE',
  CrimegroupIntel = 'CRIMEGROUP_INTEL',
  Incident = 'INCIDENT',
  Investigation = 'INVESTIGATION',
  InvestigationIntel = 'INVESTIGATION_INTEL',
  NewArticle = 'NEW_ARTICLE',
  NewBan = 'NEW_BAN',
  NewCrimegroup = 'NEW_CRIMEGROUP',
  NewIncident = 'NEW_INCIDENT',
  NewOffender = 'NEW_OFFENDER',
  NewVehicle = 'NEW_VEHICLE',
  Offender = 'OFFENDER',
  OffenderUpdate = 'OFFENDER_UPDATE',
  Vehicle = 'VEHICLE',
  VehicleImage = 'VEHICLE_IMAGE',
  VehicleIntel = 'VEHICLE_INTEL'
}

export type NotificationWhereInput = {
  AND?: InputMaybe<Array<NotificationWhereInput>>;
  NOT?: InputMaybe<Array<NotificationWhereInput>>;
  OR?: InputMaybe<Array<NotificationWhereInput>>;
  article?: InputMaybe<ArticleWhereInput>;
  articleId?: InputMaybe<StringNullableFilter>;
  ban?: InputMaybe<BanWhereInput>;
  banId?: InputMaybe<StringNullableFilter>;
  body?: InputMaybe<StringNullableFilter>;
  chat?: InputMaybe<ChatWhereInput>;
  chatId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroup?: InputMaybe<CrimeGroupWhereInput>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigation?: InputMaybe<InvestigationWhereInput>;
  investigationId?: InputMaybe<StringNullableFilter>;
  mentionId?: InputMaybe<StringNullableFilter>;
  mentionIds?: InputMaybe<StringNullableListFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  sendPush?: InputMaybe<BoolNullableFilter>;
  title?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumModelNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringNullableFilter>;
  users?: InputMaybe<UserNotificationListRelationFilter>;
  vehicle?: InputMaybe<VehicleWhereInput>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export type NotificationWhereUniqueInput = {
  AND?: InputMaybe<Array<NotificationWhereInput>>;
  NOT?: InputMaybe<Array<NotificationWhereInput>>;
  OR?: InputMaybe<Array<NotificationWhereInput>>;
  article?: InputMaybe<ArticleWhereInput>;
  articleId?: InputMaybe<StringNullableFilter>;
  ban?: InputMaybe<BanWhereInput>;
  banId?: InputMaybe<StringNullableFilter>;
  body?: InputMaybe<StringNullableFilter>;
  chat?: InputMaybe<ChatWhereInput>;
  chatId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroup?: InputMaybe<CrimeGroupWhereInput>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigation?: InputMaybe<InvestigationWhereInput>;
  investigationId?: InputMaybe<StringNullableFilter>;
  mentionId?: InputMaybe<StringNullableFilter>;
  mentionIds?: InputMaybe<StringNullableListFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  sendPush?: InputMaybe<BoolNullableFilter>;
  title?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumModelNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringNullableFilter>;
  users?: InputMaybe<UserNotificationListRelationFilter>;
  vehicle?: InputMaybe<VehicleWhereInput>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export type NullableConnectArrayHelper = {
  connect?: InputMaybe<Array<UniqueId>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
};

export type NullableConnectDisconnectHelper = {
  connect?: InputMaybe<UniqueId>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

export type NullableConnectOnlyArrayHelper = {
  connect?: InputMaybe<Array<UniqueId>>;
};

export type NullableConnectSetArrayHelper = {
  connect?: InputMaybe<Array<UniqueId>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
  set?: InputMaybe<Array<UniqueId>>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Date']>;
};

export type NullableEnumAgeFieldUpdateOperationsInput = {
  set?: InputMaybe<Age>;
};

export type NullableEnumBanTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<BanType>;
};

export type NullableEnumBuildFieldUpdateOperationsInput = {
  set?: InputMaybe<Build>;
};

export type NullableEnumCrimeTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<CrimeType>;
};

export type NullableEnumCronScheduleFieldUpdateOperationsInput = {
  set?: InputMaybe<CronSchedule>;
};

export type NullableEnumCurrencyFieldUpdateOperationsInput = {
  set?: InputMaybe<Currency>;
};

export type NullableEnumFileTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<FileType>;
};

export type NullableEnumGenderFieldUpdateOperationsInput = {
  set?: InputMaybe<Gender>;
};

export type NullableEnumHeightFieldUpdateOperationsInput = {
  set?: InputMaybe<Height>;
};

export type NullableEnumIdSourceFieldUpdateOperationsInput = {
  set?: InputMaybe<IdSource>;
};

export type NullableEnumModelFieldUpdateOperationsInput = {
  set?: InputMaybe<Model>;
};

export type NullableEnumPoliceResponseTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<PoliceResponseTime>;
};

export type NullableEnumRaceFieldUpdateOperationsInput = {
  set?: InputMaybe<Race>;
};

export type NullableEnumTodoTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<TodoType>;
};

export type NullableEnumUserStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<UserStatus>;
};

export type NullableEnumWhenFieldUpdateOperationsInput = {
  set?: InputMaybe<When>;
};

export type NullableSetBooleanHelper = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type NullableSetDateHelper = {
  set?: InputMaybe<Scalars['Date']>;
};

export type NullableSetStringHelper = {
  set?: InputMaybe<Scalars['String']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type Offender = {
  __typename?: 'Offender';
  actionableLevel: ActionableLevelEnum;
  actionableScore: Scalars['Int'];
  actions: Array<Action>;
  active?: Maybe<Scalars['Boolean']>;
  addresses: Array<Address>;
  age?: Maybe<Age>;
  aiBehavioralAnalysis?: Maybe<AiBehavioralAnalysis>;
  aiGeographicAnalysis?: Maybe<AiGeographicAnalysis>;
  aiIdentityLinkage?: Maybe<AiIdentityLinkage>;
  aiImpactAssessment?: Maybe<AiImpactAssessment>;
  aiImpactScore?: Maybe<Scalars['Int']>;
  aiImprovements?: Maybe<Scalars['String']>;
  aiKeyObservations?: Maybe<Array<Scalars['String']>>;
  aiMO?: Maybe<Scalars['String']>;
  aiMethods?: Maybe<Array<Scalars['String']>>;
  aiQualityAssessment?: Maybe<AiQualityAssessment>;
  aiQualityScore?: Maybe<Scalars['Int']>;
  aiRecommendedActions?: Maybe<AiRecommendedActions>;
  aiRiskAssessment?: Maybe<AiRiskAssessment>;
  aiSummary?: Maybe<Scalars['String']>;
  aiTargetAnalysis?: Maybe<AiTargetAnalysis>;
  aiTemporalAnalysis?: Maybe<AiTemporalAnalysis>;
  aiVisionDetections: Array<AiVisionMatch>;
  alias: Array<Scalars['String']>;
  approved?: Maybe<Scalars['Boolean']>;
  articleColumns: Array<ArticleColumn>;
  articles: Array<Article>;
  /** To be used on the known associates field to show the linking crime groups */
  associatedCrimeGroups: Array<CrimeGroup>;
  /** To be used on the known associates field to show the linking incidents */
  associatedIncidents: Array<Incident>;
  bans: Array<Ban>;
  build?: Maybe<Build>;
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['String'];
  createdByUser: Scalars['Boolean'];
  crimeGroups: Array<CrimeGroup>;
  customGalleries: Array<CustomGallery>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  dateSource?: Maybe<Scalars['String']>;
  deleted: Scalars['Boolean'];
  deletionDate?: Maybe<Scalars['Date']>;
  evidence: Array<Document>;
  feedImage?: Maybe<Image>;
  feedItems: Array<FeedItem>;
  gender?: Maybe<Gender>;
  goodsTypesTotals: Array<BusinessGoodsTotals>;
  groups: Array<Group>;
  hair?: Maybe<Scalars['String']>;
  height?: Maybe<Height>;
  id: Scalars['ID'];
  idSource?: Maybe<IdSource>;
  idVerified: Scalars['Boolean'];
  images: Array<Image>;
  impactScore: Scalars['Int'];
  impressions: Array<Impression>;
  incidentTotals: Array<IncidentTotal>;
  incidents: Array<Incident>;
  incidentsByDayOfWeek: Array<TagTotal>;
  incidentsByHour: Array<TagTotal>;
  incidentsByMonth: Array<TagTotal>;
  incidentsFull: Array<Incident>;
  infoSource?: Maybe<Scalars['String']>;
  intel: Array<Intel>;
  investigations: Array<Investigation>;
  justification?: Maybe<Scalars['String']>;
  knownAssociates: Array<Offender>;
  knownFor: Array<Scalars['String']>;
  lastActive?: Maybe<Incident>;
  latestIncident?: Maybe<Incident>;
  latestUpdate?: Maybe<Update>;
  linkedUpdates: Array<Update>;
  matchedMatches: Array<RekMatch>;
  messages: Array<Message>;
  name?: Maybe<Scalars['String']>;
  notifications: Array<Notification>;
  opalScore: Scalars['Int'];
  origOffenderId?: Maybe<Scalars['String']>;
  peculiarities?: Maybe<Scalars['String']>;
  race?: Maybe<Race>;
  recycleBin?: Maybe<RecycledItem>;
  recycleDate: Scalars['Date'];
  recycleExtendedTo?: Maybe<Scalars['Date']>;
  recycleInfo?: Maybe<RecycleExtenstion>;
  recycled: Scalars['Boolean'];
  ref?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['Int']>;
  referenceStr?: Maybe<Scalars['String']>;
  rekFaces: Array<RekFace>;
  scheme: Scheme;
  schemeId: Scalars['String'];
  schemes: Array<Scheme>;
  searchedMatches: Array<RekMatch>;
  skipNotification: Scalars['Boolean'];
  sourceDetails?: Maybe<Scalars['String']>;
  subscribed: Scalars['Boolean'];
  subscribedUsers: Array<User>;
  tags: Array<Tag>;
  targetedBusinesses?: Maybe<Array<Business>>;
  targetedGoods: Array<Scalars['String']>;
  tempId?: Maybe<Scalars['String']>;
  todos: Array<Todo>;
  /** To be used on the known associates field to show total number of linking crime groups */
  totalAssociatedCrimeGroups: Scalars['Int'];
  /** To be used on the known associates field to show total number of linking incidents */
  totalAssociatedIncidents: Scalars['Int'];
  totalBans: Scalars['Int'];
  totalImages: Scalars['Int'];
  totalIncidents: Scalars['Int'];
  totalIncidentsCount: Scalars['Int'];
  totalRecoveredValue: Scalars['Float'];
  totalTheftSuccess: Scalars['Float'];
  totalUpdates: Scalars['Int'];
  totalValue: Scalars['Float'];
  totalValueCount: Scalars['Int'];
  updatedAt: Scalars['Date'];
  updates: Array<Update>;
  uploaded?: Maybe<Scalars['Boolean']>;
  vehicles: Array<Vehicle>;
  wanted: Scalars['Boolean'];
};


export type OffenderActionsArgs = {
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type OffenderAddressesArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressScalarFieldEnum>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressWhereInput>;
};


export type OffenderAiVisionDetectionsArgs = {
  take?: InputMaybe<Scalars['Int']>;
};


export type OffenderArticleColumnsArgs = {
  distinct?: InputMaybe<Array<ArticleColumnScalarFieldEnum>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type OffenderArticlesArgs = {
  cursor?: InputMaybe<ArticleWhereUniqueInput>;
  distinct?: InputMaybe<Array<ArticleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ArticleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type OffenderAssociatedCrimeGroupsArgs = {
  associatedInvestigation?: InputMaybe<UniqueId>;
  associatedOffender?: InputMaybe<UniqueId>;
};


export type OffenderAssociatedIncidentsArgs = {
  associatedCrimeGroup?: InputMaybe<UniqueId>;
  associatedInvestigation?: InputMaybe<UniqueId>;
  associatedOffender?: InputMaybe<UniqueId>;
};


export type OffenderBansArgs = {
  cursor?: InputMaybe<BanWhereUniqueInput>;
  distinct?: InputMaybe<BanScalarFieldEnum>;
  orderBy?: InputMaybe<Array<BanOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BanWhereInput>;
};


export type OffenderCrimeGroupsArgs = {
  cursor?: InputMaybe<CrimeGroupWhereUniqueInput>;
  distinct?: InputMaybe<CrimeGroupScalarFieldEnum>;
  orderBy?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CrimeGroupWhereInput>;
};


export type OffenderCustomGalleriesArgs = {
  cursor?: InputMaybe<CustomGalleryWhereUniqueInput>;
  distinct?: InputMaybe<CustomGalleryScalarFieldEnum>;
  orderBy?: InputMaybe<CustomGalleryOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CustomGalleryWhereInput>;
};


export type OffenderEvidenceArgs = {
  cursor?: InputMaybe<DocumentWhereUniqueInput>;
  distinct?: InputMaybe<Array<DocumentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DocumentWhereInput>;
};


export type OffenderFeedItemsArgs = {
  cursor?: InputMaybe<FeedItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeedItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeedItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
};


export type OffenderGoodsTypesTotalsArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};


export type OffenderGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type OffenderImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


export type OffenderImpressionsArgs = {
  cursor?: InputMaybe<ImpressionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImpressionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImpressionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImpressionWhereInput>;
};


export type OffenderIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<IncidentScalarFieldEnum>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type OffenderIncidentsFullArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<IncidentScalarFieldEnum>;
  orderBy?: InputMaybe<IncidentOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type OffenderIntelArgs = {
  cursor?: InputMaybe<IntelWhereUniqueInput>;
  distinct?: InputMaybe<Array<IntelScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IntelOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IntelWhereInput>;
};


export type OffenderInvestigationsArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<Array<InvestigationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InvestigationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type OffenderKnownAssociatesArgs = {
  groups?: InputMaybe<Array<UniqueId>>;
  linkedCrimeGroup?: InputMaybe<Scalars['Boolean']>;
  linkedIncidents?: InputMaybe<Scalars['Boolean']>;
};


export type OffenderLinkedUpdatesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type OffenderMatchedMatchesArgs = {
  cursor?: InputMaybe<RekMatchWhereUniqueInput>;
  distinct?: InputMaybe<Array<RekMatchScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RekMatchOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RekMatchWhereInput>;
};


export type OffenderMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type OffenderNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type OffenderRekFacesArgs = {
  cursor?: InputMaybe<RekFaceWhereUniqueInput>;
  distinct?: InputMaybe<Array<RekFaceScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RekFaceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RekFaceWhereInput>;
};


export type OffenderSearchedMatchesArgs = {
  cursor?: InputMaybe<RekMatchWhereUniqueInput>;
  distinct?: InputMaybe<Array<RekMatchScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RekMatchOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RekMatchWhereInput>;
};


export type OffenderSubscribedUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type OffenderTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};


export type OffenderTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<TodoScalarFieldEnum>;
  orderBy?: InputMaybe<TodoOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};


export type OffenderTotalAssociatedCrimeGroupsArgs = {
  associatedInvestigation?: InputMaybe<UniqueId>;
  associatedOffender?: InputMaybe<UniqueId>;
};


export type OffenderTotalAssociatedIncidentsArgs = {
  associatedCrimeGroup?: InputMaybe<UniqueId>;
  associatedInvestigation?: InputMaybe<UniqueId>;
  associatedOffender?: InputMaybe<UniqueId>;
};


export type OffenderUpdatesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type OffenderVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<Array<VehicleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VehicleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
};

export type OffenderBulletinResult = {
  __typename?: 'OffenderBulletinResult';
  htmlBody: Scalars['String'];
  title: Scalars['String'];
};

export type OffenderConnectOne = {
  connect: OffenderWhereUniqueInput;
};

export type OffenderCreateWithoutCrimeGroupsInput = {
  age?: InputMaybe<Age>;
  build?: InputMaybe<Build>;
  comment?: InputMaybe<Scalars['String']>;
  createdBy: ConnectHelper;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<ConnectOnlyArrayHelper>;
  hair?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Height>;
  images?: InputMaybe<UploadOffenderImageOnCrimeGroup>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  scheme: ConnectHelper;
  sourceDetails?: InputMaybe<Scalars['String']>;
};

export type OffenderCreateWithoutIncidentsInput = {
  age?: InputMaybe<Age>;
  build?: InputMaybe<Build>;
  comment?: InputMaybe<Scalars['String']>;
  createdBy: ConnectHelper;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<NullableConnectOnlyArrayHelper>;
  hair?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Height>;
  idSource?: InputMaybe<IdSource>;
  idVerified?: InputMaybe<Scalars['Boolean']>;
  images?: InputMaybe<ConnectOnlyArrayHelper>;
  infoSource?: InputMaybe<Scalars['String']>;
  justification?: InputMaybe<Scalars['String']>;
  localId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  origOffenderId?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  scheme: ConnectHelper;
  sourceDetails?: InputMaybe<Scalars['String']>;
  wanted?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderEngagement = {
  __typename?: 'OffenderEngagement';
  averageViewsPerUser: Scalars['Float'];
  notViewedCount: Scalars['Int'];
  offenderId: Scalars['String'];
  offenderName: Scalars['String'];
  totalUsers: Scalars['Int'];
  totalViews: Scalars['Int'];
  users: Array<OffenderUserEngagement>;
  viewRate: Scalars['Float'];
  viewedCount: Scalars['Int'];
};

export type OffenderLinkEdge = {
  __typename?: 'OffenderLinkEdge';
  count: Scalars['Int'];
  id: Scalars['String'];
  label: Scalars['String'];
  source: Scalars['String'];
  target: Scalars['String'];
};

export type OffenderLinkMap = {
  __typename?: 'OffenderLinkMap';
  edges: Array<OffenderLinkEdge>;
  nodes: Array<OffenderLinkMapNode>;
};

export type OffenderLinkMapNode = {
  __typename?: 'OffenderLinkMapNode';
  data: OffenderLinkMapNodeData;
  id: Scalars['String'];
  position: NodePosition;
};

export type OffenderLinkMapNodeData = {
  __typename?: 'OffenderLinkMapNodeData';
  imageUrl?: Maybe<Scalars['String']>;
  incidentCount: Scalars['Int'];
  label: Scalars['String'];
  totalLoss: Scalars['Float'];
};

export type OffenderLinkMapWhere = {
  crimeGroup?: InputMaybe<UniqueId>;
  investigation?: InputMaybe<UniqueId>;
};

export type OffenderListRelationFilter = {
  every?: InputMaybe<OffenderWhereInput>;
  none?: InputMaybe<OffenderWhereInput>;
  some?: InputMaybe<OffenderWhereInput>;
};

export type OffenderOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type OffenderOrderByWithRelationInput = {
  active?: InputMaybe<SortOrder>;
  age?: InputMaybe<SortOrder>;
  aiImpactScore?: InputMaybe<SortOrder>;
  alias?: InputMaybe<SortOrder>;
  approved?: InputMaybe<SortOrder>;
  build?: InputMaybe<SortOrder>;
  comment?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  crimeGroups?: InputMaybe<CrimeGroupOrderByRelationAggregateInput>;
  customGalleries?: InputMaybe<CustomGalleryOrderByRelationAggregateInput>;
  dateOfBirth?: InputMaybe<SortOrder>;
  dateSource?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  deletionDate?: InputMaybe<SortOrder>;
  evidence?: InputMaybe<DocumentOrderByRelationAggregateInput>;
  feedItems?: InputMaybe<FeedItemOrderByRelationAggregateInput>;
  gender?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  hair?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  idSource?: InputMaybe<SortOrder>;
  idVerified?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  impressions?: InputMaybe<ImpressionOrderByRelationAggregateInput>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  infoSource?: InputMaybe<SortOrder>;
  intel?: InputMaybe<IntelOrderByRelationAggregateInput>;
  investigations?: InputMaybe<InvestigationOrderByRelationAggregateInput>;
  justification?: InputMaybe<SortOrder>;
  knownFor?: InputMaybe<SortOrder>;
  linkedUpdates?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  matchedMatches?: InputMaybe<RekMatchOrderByRelationAggregateInput>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  origOffenderId?: InputMaybe<SortOrder>;
  peculiarities?: InputMaybe<SortOrder>;
  race?: InputMaybe<SortOrder>;
  recycleBin?: InputMaybe<RecycledItemOrderByWithRelationInput>;
  recycleDate?: InputMaybe<SortOrder>;
  recycled?: InputMaybe<SortOrder>;
  ref?: InputMaybe<SortOrder>;
  reference?: InputMaybe<SortOrder>;
  referenceStr?: InputMaybe<SortOrder>;
  rekFaces?: InputMaybe<RekFaceOrderByRelationAggregateInput>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  searchedMatches?: InputMaybe<RekMatchOrderByRelationAggregateInput>;
  skipNotification?: InputMaybe<SortOrder>;
  sourceDetails?: InputMaybe<SortOrder>;
  subscribedUsers?: InputMaybe<UserOrderByRelationAggregateInput>;
  tags?: InputMaybe<TagOrderByRelationAggregateInput>;
  targetedGoods?: InputMaybe<SortOrder>;
  tempId?: InputMaybe<SortOrder>;
  todos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  totalIncidentsCount?: InputMaybe<SortOrder>;
  totalValueCount?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  updates?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  uploaded?: InputMaybe<SortOrder>;
  vehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
};

export type OffenderPerformance = {
  __typename?: 'OffenderPerformance';
  alertId: Scalars['String'];
  id: Scalars['String'];
  lastIncidentDate?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  primaryPhoto?: Maybe<Scalars['String']>;
  totalBulletins: Scalars['Float'];
  totalIncidents: Scalars['Int'];
  totalLostValue: Scalars['Float'];
  totalRecoveredValue: Scalars['Float'];
  totalSuccessRate: Scalars['Float'];
};

export type OffenderReport = {
  __typename?: 'OffenderReport';
  crimeTypeBusinessRadial: Array<RadialGraph>;
  crimeTypeDonut: Array<Graph>;
  goodsTypeLossRecovered: Array<RadialGraph>;
  incidentDayOfWeekGraph: Array<Graph>;
  incidentMonthGraph: Array<Graph>;
  incidentSummary: IncidentSummary;
  incidentTimeOfDayDonut: Array<Graph>;
  incidentsTable: ListIncidents;
  lossTotals: LossTotals;
  offenderSummary?: Maybe<Offender>;
};

export type OffenderReportInput = {
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  dateRange: DateRangeInput;
  groupIds: Array<Scalars['String']>;
  offenderId: Scalars['String'];
  schemeIds: Array<Scalars['String']>;
};

export enum OffenderScalarFieldEnum {
  Active = 'active',
  Age = 'age',
  Alias = 'alias',
  Approved = 'approved',
  Build = 'build',
  Comment = 'comment',
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  DateOfBirth = 'dateOfBirth',
  DateSource = 'dateSource',
  Deleted = 'deleted',
  DeletionDate = 'deletionDate',
  Gender = 'gender',
  Hair = 'hair',
  Height = 'height',
  Id = 'id',
  IdSource = 'idSource',
  IdVerified = 'idVerified',
  InfoSource = 'infoSource',
  Justification = 'justification',
  KnownFor = 'knownFor',
  Name = 'name',
  OrigOffenderId = 'origOffenderId',
  Peculiarities = 'peculiarities',
  Race = 'race',
  RecycleDate = 'recycleDate',
  Recycled = 'recycled',
  Ref = 'ref',
  Reference = 'reference',
  ReferenceStr = 'referenceStr',
  SchemeId = 'schemeId',
  SkipNotification = 'skipNotification',
  TargetedGoods = 'targetedGoods',
  TempId = 'tempId',
  UpdatedAt = 'updatedAt',
  Uploaded = 'uploaded',
  Wanted = 'wanted'
}

export type OffenderScalarWhereInput = {
  AND?: InputMaybe<Array<OffenderScalarWhereInput>>;
  NOT?: InputMaybe<Array<OffenderScalarWhereInput>>;
  OR?: InputMaybe<Array<OffenderScalarWhereInput>>;
  active?: InputMaybe<BoolNullableFilter>;
  age?: InputMaybe<EnumAgeNullableFilter>;
  alias?: InputMaybe<StringNullableListFilter>;
  approved?: InputMaybe<BoolNullableFilter>;
  build?: InputMaybe<EnumBuildNullableFilter>;
  comment?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringFilter>;
  dateOfBirth?: InputMaybe<DateTimeNullableFilter>;
  dateSource?: InputMaybe<StringNullableFilter>;
  deleted?: InputMaybe<BoolFilter>;
  deletionDate?: InputMaybe<DateTimeNullableFilter>;
  gender?: InputMaybe<EnumGenderNullableFilter>;
  hair?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<EnumHeightNullableFilter>;
  id?: InputMaybe<StringFilter>;
  idSource?: InputMaybe<EnumIdSourceNullableFilter>;
  idVerified?: InputMaybe<BoolFilter>;
  infoSource?: InputMaybe<StringNullableFilter>;
  justification?: InputMaybe<StringNullableFilter>;
  knownFor?: InputMaybe<StringNullableListFilter>;
  name?: InputMaybe<StringNullableFilter>;
  origOffenderId?: InputMaybe<StringNullableFilter>;
  peculiarities?: InputMaybe<StringNullableFilter>;
  race?: InputMaybe<EnumRaceNullableFilter>;
  recycleDate?: InputMaybe<DateTimeFilter>;
  recycled?: InputMaybe<BoolFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  schemeId?: InputMaybe<StringFilter>;
  skipNotification?: InputMaybe<BoolFilter>;
  sourceDetails?: InputMaybe<StringNullableFilter>;
  targetedGoods?: InputMaybe<StringNullableListFilter>;
  tempId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
};

export type OffenderScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<OffenderScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<OffenderScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<OffenderScalarWhereWithAggregatesInput>>;
  active?: InputMaybe<BoolNullableWithAggregatesFilter>;
  age?: InputMaybe<EnumAgeNullableWithAggregatesFilter>;
  alias?: InputMaybe<StringNullableListFilter>;
  approved?: InputMaybe<BoolNullableWithAggregatesFilter>;
  build?: InputMaybe<EnumBuildNullableWithAggregatesFilter>;
  comment?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  createdById?: InputMaybe<StringWithAggregatesFilter>;
  dateOfBirth?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  dateSource?: InputMaybe<StringNullableWithAggregatesFilter>;
  deleted?: InputMaybe<BoolWithAggregatesFilter>;
  deletionDate?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  gender?: InputMaybe<EnumGenderNullableWithAggregatesFilter>;
  hair?: InputMaybe<StringNullableWithAggregatesFilter>;
  height?: InputMaybe<EnumHeightNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  idSource?: InputMaybe<EnumIdSourceNullableWithAggregatesFilter>;
  idVerified?: InputMaybe<BoolWithAggregatesFilter>;
  infoSource?: InputMaybe<StringNullableWithAggregatesFilter>;
  justification?: InputMaybe<StringNullableWithAggregatesFilter>;
  knownFor?: InputMaybe<StringNullableListFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  origOffenderId?: InputMaybe<StringNullableWithAggregatesFilter>;
  peculiarities?: InputMaybe<StringNullableWithAggregatesFilter>;
  race?: InputMaybe<EnumRaceNullableWithAggregatesFilter>;
  recycleDate?: InputMaybe<DateTimeWithAggregatesFilter>;
  recycled?: InputMaybe<BoolWithAggregatesFilter>;
  ref?: InputMaybe<StringNullableWithAggregatesFilter>;
  reference?: InputMaybe<IntNullableWithAggregatesFilter>;
  referenceStr?: InputMaybe<StringNullableWithAggregatesFilter>;
  schemeId?: InputMaybe<StringWithAggregatesFilter>;
  skipNotification?: InputMaybe<BoolWithAggregatesFilter>;
  sourceDetails?: InputMaybe<StringNullableWithAggregatesFilter>;
  targetedGoods?: InputMaybe<StringNullableListFilter>;
  tempId?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  uploaded?: InputMaybe<BoolNullableWithAggregatesFilter>;
};

export type OffenderSettings = {
  __typename?: 'OffenderSettings';
  age: Scalars['Boolean'];
  alias: Scalars['Boolean'];
  build: Scalars['Boolean'];
  comment: Scalars['Boolean'];
  dateOfBirth: Scalars['Boolean'];
  dateOfBirthSource: Scalars['Boolean'];
  ethnicity: Scalars['Boolean'];
  gender: Scalars['Boolean'];
  hair: Scalars['Boolean'];
  height: Scalars['Boolean'];
  idVerified: Scalars['Boolean'];
  images: Scalars['Boolean'];
  name: Scalars['Boolean'];
  peculiarities: Scalars['Boolean'];
};

export type OffenderSettingsCreateInput = {
  create: OffenderSettingsInput;
};

export type OffenderSettingsInput = {
  age?: InputMaybe<Scalars['Boolean']>;
  alias?: InputMaybe<Scalars['Boolean']>;
  build?: InputMaybe<Scalars['Boolean']>;
  comment?: InputMaybe<Scalars['Boolean']>;
  dateOfBirth?: InputMaybe<Scalars['Boolean']>;
  dateOfBirthSource?: InputMaybe<Scalars['Boolean']>;
  ethnicity?: InputMaybe<Scalars['Boolean']>;
  gender?: InputMaybe<Scalars['Boolean']>;
  hair?: InputMaybe<Scalars['Boolean']>;
  height?: InputMaybe<Scalars['Boolean']>;
  idVerified?: InputMaybe<Scalars['Boolean']>;
  images?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['Boolean']>;
  peculiarities?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderSettingsUpdateInput = {
  update: OffenderSettingsInput;
};

export type OffenderTableWhereInput = {
  brandsIds?: InputMaybe<Array<Scalars['String']>>;
  businessesIds?: InputMaybe<Array<Scalars['String']>>;
  createdAt?: InputMaybe<DateRangeInput>;
  crimeGroupId?: InputMaybe<Scalars['String']>;
  groupIds: Array<Scalars['String']>;
  idVerified?: InputMaybe<Scalars['Boolean']>;
  incidentCount?: InputMaybe<Scalars['Int']>;
  incidentDateRange?: InputMaybe<DateRangeInput>;
  industryIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  totalValue?: InputMaybe<Scalars['Int']>;
};

export type OffenderUpdateDetailsInput = {
  age?: InputMaybe<Age>;
  alias?: InputMaybe<Array<Scalars['String']>>;
  build?: InputMaybe<Build>;
  comment?: InputMaybe<Scalars['String']>;
  customGalleryIds?: InputMaybe<Array<Scalars['String']>>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  hair?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Height>;
  idSource?: InputMaybe<IdSource>;
  idVerified?: InputMaybe<Scalars['Boolean']>;
  infoSource?: InputMaybe<Scalars['String']>;
  justification?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  sourceDetails?: InputMaybe<Scalars['String']>;
  tagIds?: InputMaybe<Array<Scalars['String']>>;
  wanted?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderUpdateInput = {
  addresses?: InputMaybe<UpdateSimpleLocationOnOffender>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  alias?: InputMaybe<OffenderUpdatealiasInput>;
  approved?: InputMaybe<NullableSetBooleanHelper>;
  bans?: InputMaybe<BansOnOffenderUpdate>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  comment?: InputMaybe<NullableSetStringHelper>;
  crimeGroups?: InputMaybe<NullableConnectArrayHelper>;
  customGalleries?: InputMaybe<NestedCustomGalleryOnOffender>;
  dateOfBirth?: InputMaybe<NullableSetDateHelper>;
  dateSource?: InputMaybe<NullableSetStringHelper>;
  draft?: InputMaybe<Scalars['Boolean']>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupsOnOffenderInput>;
  hair?: InputMaybe<NullableSetStringHelper>;
  height?: InputMaybe<NullableEnumHeightFieldUpdateOperationsInput>;
  idSource?: InputMaybe<NullableEnumIdSourceFieldUpdateOperationsInput>;
  idVerified?: InputMaybe<NullableSetBooleanHelper>;
  images?: InputMaybe<ImageUpdateManyWithoutOffenderNestedInput>;
  incidents?: InputMaybe<ConnectArrayHelper>;
  infoSource?: InputMaybe<NullableSetStringHelper>;
  justification?: InputMaybe<NullableSetStringHelper>;
  knownFor?: InputMaybe<OffenderUpdatealiasInput>;
  name?: InputMaybe<NullableSetStringHelper>;
  origOffenderId?: InputMaybe<NullableSetStringHelper>;
  peculiarities?: InputMaybe<NullableSetStringHelper>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  scheme?: InputMaybe<ConnectHelper>;
  sourceDetails?: InputMaybe<NullableSetStringHelper>;
  tags?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  targetedGoods?: InputMaybe<OffenderUpdatealiasInput>;
  tempId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<NullableSetDateHelper>;
  vehicles?: InputMaybe<VehicleUpdateManyWithoutOffenderNestedInput>;
  wanted?: InputMaybe<NullableSetBooleanHelper>;
};

export type OffenderUpdateManyWithoutIncidentsNested = {
  connect?: InputMaybe<Array<UniqueId>>;
  create?: InputMaybe<Array<OffenderCreateWithoutIncidentsInput>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
};

export type OffenderUpdateWithoutIncidents = {
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  alias?: InputMaybe<OffenderUpdatealiasInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  comment?: InputMaybe<NullableSetStringHelper>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  height?: InputMaybe<NullableEnumHeightFieldUpdateOperationsInput>;
  idSource?: InputMaybe<NullableEnumIdSourceFieldUpdateOperationsInput>;
  idVerified?: InputMaybe<BoolFieldUpdateOperationsInput>;
  images?: InputMaybe<IncidentOffenderImages>;
  infoSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  justification?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  knownFor?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  origOffenderId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  sourceDetails?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  targetedGoods?: InputMaybe<Array<Scalars['String']>>;
  wanted?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type OffenderUpdatealiasInput = {
  push?: InputMaybe<Scalars['String']>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type OffenderUserEngagement = {
  __typename?: 'OffenderUserEngagement';
  firstViewedAt?: Maybe<Scalars['Date']>;
  hasViewed: Scalars['Boolean'];
  lastViewedAt?: Maybe<Scalars['Date']>;
  userEmail?: Maybe<Scalars['String']>;
  userFullName: Scalars['String'];
  userId: Scalars['String'];
  viewCount?: Maybe<Scalars['Int']>;
};

export type OffenderView = {
  __typename?: 'OffenderView';
  firstViewedAt: Scalars['Date'];
  lastViewedAt: Scalars['Date'];
  offenderId: Scalars['String'];
  offenderName: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type OffenderWhereInput = {
  AND?: InputMaybe<Array<OffenderWhereInput>>;
  NOT?: InputMaybe<Array<OffenderWhereInput>>;
  OR?: InputMaybe<Array<OffenderWhereInput>>;
  active?: InputMaybe<BoolNullableFilter>;
  addresses?: InputMaybe<AddressListRelationFilter>;
  age?: InputMaybe<EnumAgeNullableFilter>;
  aiImpactScore?: InputMaybe<IntNullableFilter>;
  alias?: InputMaybe<StringNullableListFilter>;
  approved?: InputMaybe<BoolNullableFilter>;
  bans?: InputMaybe<BanListRelationFilter>;
  build?: InputMaybe<EnumBuildNullableFilter>;
  comment?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  customGalleries?: InputMaybe<CustomGalleryListRelationFilter>;
  dateOfBirth?: InputMaybe<DateTimeNullableFilter>;
  dateSource?: InputMaybe<StringNullableFilter>;
  deleted?: InputMaybe<BoolFilter>;
  deletionDate?: InputMaybe<DateTimeNullableFilter>;
  evidence?: InputMaybe<DocumentListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  gender?: InputMaybe<EnumGenderNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  hair?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<EnumHeightNullableFilter>;
  id?: InputMaybe<StringFilter>;
  idSource?: InputMaybe<EnumIdSourceNullableFilter>;
  idVerified?: InputMaybe<BoolFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  impressions?: InputMaybe<ImpressionListRelationFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  infoSource?: InputMaybe<StringNullableFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  justification?: InputMaybe<StringNullableFilter>;
  knownFor?: InputMaybe<StringNullableListFilter>;
  linkedUpdates?: InputMaybe<UpdateListRelationFilter>;
  matchedMatches?: InputMaybe<RekMatchListRelationFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  name?: InputMaybe<StringNullableFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  origOffenderId?: InputMaybe<StringNullableFilter>;
  peculiarities?: InputMaybe<StringNullableFilter>;
  race?: InputMaybe<EnumRaceNullableFilter>;
  recycleBin?: InputMaybe<RecycledItemWhereInput>;
  recycleDate?: InputMaybe<DateTimeFilter>;
  recycled?: InputMaybe<BoolFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  rekFaces?: InputMaybe<RekFaceListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  searchedMatches?: InputMaybe<RekMatchListRelationFilter>;
  skipNotification?: InputMaybe<BoolFilter>;
  sourceDetails?: InputMaybe<StringNullableFilter>;
  subscribedUsers?: InputMaybe<UserListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  targetedGoods?: InputMaybe<StringNullableListFilter>;
  tempId?: InputMaybe<StringNullableFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updates?: InputMaybe<UpdateListRelationFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
  wanted?: InputMaybe<BoolFilter>;
};

export type OffenderWhereUniqueInput = {
  AND?: InputMaybe<Array<OffenderWhereInput>>;
  NOT?: InputMaybe<Array<OffenderWhereInput>>;
  OR?: InputMaybe<Array<OffenderWhereInput>>;
  active?: InputMaybe<BoolNullableFilter>;
  addresses?: InputMaybe<AddressListRelationFilter>;
  age?: InputMaybe<EnumAgeNullableFilter>;
  alias?: InputMaybe<StringNullableListFilter>;
  approved?: InputMaybe<BoolNullableFilter>;
  bans?: InputMaybe<BanListRelationFilter>;
  build?: InputMaybe<EnumBuildNullableFilter>;
  comment?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  customGalleries?: InputMaybe<CustomGalleryListRelationFilter>;
  dateOfBirth?: InputMaybe<DateTimeNullableFilter>;
  dateSource?: InputMaybe<StringNullableFilter>;
  deleted?: InputMaybe<BoolFilter>;
  deletionDate?: InputMaybe<DateTimeNullableFilter>;
  evidence?: InputMaybe<DocumentListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  gender?: InputMaybe<EnumGenderNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  hair?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<EnumHeightNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  idSource?: InputMaybe<EnumIdSourceNullableFilter>;
  idVerified?: InputMaybe<BoolFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  impressions?: InputMaybe<ImpressionListRelationFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  infoSource?: InputMaybe<StringNullableFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  justification?: InputMaybe<StringNullableFilter>;
  knownFor?: InputMaybe<StringNullableListFilter>;
  linkedUpdates?: InputMaybe<UpdateListRelationFilter>;
  matchedMatches?: InputMaybe<RekMatchListRelationFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  name?: InputMaybe<StringNullableFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  origOffenderId?: InputMaybe<StringNullableFilter>;
  peculiarities?: InputMaybe<StringNullableFilter>;
  race?: InputMaybe<EnumRaceNullableFilter>;
  recycleBin?: InputMaybe<RecycledItemWhereInput>;
  recycleDate?: InputMaybe<DateTimeFilter>;
  recycled?: InputMaybe<BoolFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  rekFaces?: InputMaybe<RekFaceListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  searchedMatches?: InputMaybe<RekMatchListRelationFilter>;
  skipNotification?: InputMaybe<BoolFilter>;
  sourceDetails?: InputMaybe<StringNullableFilter>;
  subscribedUsers?: InputMaybe<UserListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  targetedGoods?: InputMaybe<StringNullableListFilter>;
  tempId?: InputMaybe<StringNullableFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updates?: InputMaybe<UpdateListRelationFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type OffendersIncidentUpsertInput = {
  connect?: InputMaybe<Array<Scalars['String']>>;
  new?: InputMaybe<Array<UpsertIncidentOffender>>;
  removed?: InputMaybe<Array<Scalars['String']>>;
  update?: InputMaybe<Array<UpsertIncidentOffender>>;
};

export enum OnboardSteps {
  Details = 'DETAILS',
  Password = 'PASSWORD',
  Terms = 'TERMS',
  Welcome = 'WELCOME'
}

export type OneSignalId = {
  __typename?: 'OneSignalId';
  id: Scalars['ID'];
  oneSignalId: Scalars['String'];
  user: User;
};

export type OneSignalIdListRelationFilter = {
  every?: InputMaybe<OneSignalIdWhereInput>;
  none?: InputMaybe<OneSignalIdWhereInput>;
  some?: InputMaybe<OneSignalIdWhereInput>;
};

export type OneSignalIdOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type OneSignalIdScalarWhereInput = {
  AND?: InputMaybe<Array<OneSignalIdScalarWhereInput>>;
  NOT?: InputMaybe<Array<OneSignalIdScalarWhereInput>>;
  OR?: InputMaybe<Array<OneSignalIdScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  oneSignalId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type OneSignalIdScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<OneSignalIdScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<OneSignalIdScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<OneSignalIdScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  oneSignalId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type OneSignalIdWhereInput = {
  AND?: InputMaybe<Array<OneSignalIdWhereInput>>;
  NOT?: InputMaybe<Array<OneSignalIdWhereInput>>;
  OR?: InputMaybe<Array<OneSignalIdWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  oneSignalId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type OneStopColumnMapping = {
  /** The colour of any vehicles involved */
  colourColumn?: InputMaybe<Scalars['String']>;
  /** The crime reference number if reported to police */
  crimeReferenceColumn?: InputMaybe<Scalars['String']>;
  /** The description of the incident */
  incidentDetailsColumn?: InputMaybe<Scalars['String']>;
  /** The date and time of the incident */
  incidentReportDateColumn?: InputMaybe<Scalars['String']>;
  /** The make of any vehicles involved */
  makeColumn?: InputMaybe<Scalars['String']>;
  /** The model of any vehicles involved */
  modelColumn?: InputMaybe<Scalars['String']>;
  /** The name of any offenders involved if known */
  offenderNameColumn?: InputMaybe<Scalars['String']>;
  /** The customerRef of the incident */
  referenceColumn?: InputMaybe<Scalars['String']>;
  /** The name of the business for this incident */
  siteNameColumn?: InputMaybe<Scalars['String']>;
  /** The total value of the goods lost in the incident */
  totalProductStockValueColumn?: InputMaybe<Scalars['String']>;
  /** The type of the incident */
  typeColumn?: InputMaybe<Scalars['String']>;
  /** The registration of any vehicles involved */
  vehicleRegColumn?: InputMaybe<Scalars['String']>;
};

export type OneStopIdInput = {
  id: Scalars['String'];
};

export type OneStopImportDataInput = {
  /** Optional mapping of CSV/Excel columns to incident fields */
  columnMapping?: InputMaybe<OneStopColumnMapping>;
  /** Base64 encoded CSV/Excel data or file content as string (auto-detects format) */
  fileData?: InputMaybe<Scalars['String']>;
  /** URL to download the CSV/Excel file from */
  fileUrl?: InputMaybe<Scalars['String']>;
  /** Optional groups to assign imported incidents to */
  groups?: InputMaybe<Array<OneStopIdInput>>;
  scheme: OneStopIdInput;
};

export type OutcomeSummary = {
  __typename?: 'OutcomeSummary';
  totalArrests: Scalars['Int'];
  totalCBOCount: Scalars['Int'];
  totalCBOYears: Scalars['Int'];
  totalFinesCount: Scalars['Int'];
  totalFinesValue: Scalars['Float'];
  totalPrisonSentenceCount: Scalars['Int'];
  totalPrisonSentenceMonths: Scalars['Int'];
  totalRehabOrders: Scalars['Int'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PageInfoRelay = {
  __typename?: 'PageInfoRelay';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type PatrolCheckpoint = {
  __typename?: 'PatrolCheckpoint';
  active: Scalars['Boolean'];
  bleIds: Array<Scalars['String']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  geoLat?: Maybe<Scalars['Float']>;
  geoLng?: Maybe<Scalars['Float']>;
  geoRadiusMeters?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  label: Scalars['String'];
  metadata?: Maybe<Scalars['JSON']>;
  nfcUids: Array<Scalars['String']>;
  patrolEvents: Array<PatrolEvent>;
  payloadHash?: Maybe<Scalars['String']>;
  qrToken?: Maybe<Scalars['String']>;
  routeCheckpoints: Array<PatrolRouteCheckpoint>;
  scheme?: Maybe<Scheme>;
  schemeId?: Maybe<Scalars['String']>;
  tokens: Array<PatrolCheckpointToken>;
  type: PatrolCheckpointType;
  updatedAt: Scalars['Date'];
};

export type PatrolCheckpointInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  bleIds?: InputMaybe<Array<Scalars['String']>>;
  businessId?: InputMaybe<Scalars['String']>;
  geoLat?: InputMaybe<Scalars['Float']>;
  geoLng?: InputMaybe<Scalars['Float']>;
  geoRadiusMeters?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  label: Scalars['String'];
  metadata?: InputMaybe<Scalars['JSON']>;
  nfcUids?: InputMaybe<Array<Scalars['String']>>;
  schemeId?: InputMaybe<Scalars['String']>;
  tokenHash?: InputMaybe<Scalars['String']>;
  type: PatrolCheckpointType;
};

export type PatrolCheckpointToken = {
  __typename?: 'PatrolCheckpointToken';
  batchId?: Maybe<Scalars['String']>;
  checkpoint?: Maybe<PatrolCheckpoint>;
  checkpointId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  expiresAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  tokenHash: Scalars['String'];
};

export enum PatrolCheckpointType {
  Ble = 'BLE',
  Gps = 'GPS',
  Nfc = 'NFC',
  Qr = 'QR'
}

export type PatrolEvent = {
  __typename?: 'PatrolEvent';
  checkpoint?: Maybe<PatrolCheckpoint>;
  checkpointId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  deviceInfo?: Maybe<Scalars['JSON']>;
  geoAccuracyMeters?: Maybe<Scalars['Int']>;
  geoLat?: Maybe<Scalars['Float']>;
  geoLng?: Maybe<Scalars['Float']>;
  guard?: Maybe<User>;
  guardId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['JSON']>;
  method: PatrolScanMethod;
  notes?: Maybe<Scalars['String']>;
  result: PatrolScanResult;
  run: PatrolRun;
  runId: Scalars['String'];
  scannedAt: Scalars['Date'];
  scope: PatrolScanScope;
};

export type PatrolRoute = {
  __typename?: 'PatrolRoute';
  active: Scalars['Boolean'];
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']>;
  checkpoints: Array<PatrolRouteCheckpoint>;
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mode: PatrolRouteMode;
  name: Scalars['String'];
  runs: Array<PatrolRun>;
  scheme?: Maybe<Scheme>;
  schemeId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type PatrolRouteCheckpoint = {
  __typename?: 'PatrolRouteCheckpoint';
  checkpoint: PatrolCheckpoint;
  checkpointId: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  minDwellSeconds: Scalars['Int'];
  required: Scalars['Boolean'];
  route: PatrolRoute;
  routeId: Scalars['String'];
  seq: Scalars['Int'];
  toleranceMeters?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['Date'];
};

export type PatrolRouteCheckpointInput = {
  checkpointId: Scalars['ID'];
  minDwellSeconds?: InputMaybe<Scalars['Int']>;
  required?: InputMaybe<Scalars['Boolean']>;
  seq?: InputMaybe<Scalars['Int']>;
  toleranceMeters?: InputMaybe<Scalars['Int']>;
};

export type PatrolRouteInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  businessId?: InputMaybe<Scalars['String']>;
  checkpoints?: InputMaybe<Array<PatrolRouteCheckpointInput>>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  mode?: InputMaybe<PatrolRouteMode>;
  name: Scalars['String'];
  schemeId?: InputMaybe<Scalars['String']>;
};

export enum PatrolRouteMode {
  Flexible = 'FLEXIBLE',
  Ordered = 'ORDERED'
}

export type PatrolRun = {
  __typename?: 'PatrolRun';
  abortReason?: Maybe<Scalars['String']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  deviceInfo?: Maybe<Scalars['JSON']>;
  endedAt?: Maybe<Scalars['Date']>;
  guard?: Maybe<User>;
  guardId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  origin?: Maybe<PatrolRunOrigin>;
  patrolEvents: Array<PatrolEvent>;
  route?: Maybe<PatrolRoute>;
  routeId?: Maybe<Scalars['String']>;
  scanScope: PatrolScanScope;
  scheme?: Maybe<Scheme>;
  schemeId?: Maybe<Scalars['String']>;
  startedAt: Scalars['Date'];
  status: PatrolRunStatus;
  updatedAt: Scalars['Date'];
};

export enum PatrolRunOrigin {
  Mobile = 'MOBILE',
  Web = 'WEB'
}

export type PatrolRunStartInput = {
  businessId?: InputMaybe<Scalars['String']>;
  deviceInfo?: InputMaybe<DeviceInfo>;
  origin?: InputMaybe<PatrolRunOrigin>;
  routeId?: InputMaybe<Scalars['ID']>;
  scanScope?: InputMaybe<PatrolScanScope>;
  schemeId?: InputMaybe<Scalars['String']>;
};

export enum PatrolRunStatus {
  Aborted = 'ABORTED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  MissedCheckpoints = 'MISSED_CHECKPOINTS'
}

export type PatrolScanInput = {
  checkpointId?: InputMaybe<Scalars['ID']>;
  deviceInfo?: InputMaybe<DeviceInfo>;
  geoAccuracyMeters?: InputMaybe<Scalars['Int']>;
  geoLat?: InputMaybe<Scalars['Float']>;
  geoLng?: InputMaybe<Scalars['Float']>;
  location?: InputMaybe<Scalars['JSON']>;
  method: PatrolScanMethod;
  notes?: InputMaybe<Scalars['String']>;
  payload?: InputMaybe<Scalars['String']>;
  runId: Scalars['ID'];
};

export enum PatrolScanMethod {
  Ble = 'BLE',
  Gps = 'GPS',
  Manual = 'MANUAL',
  Nfc = 'NFC',
  Qr = 'QR'
}

export enum PatrolScanResult {
  Duplicate = 'DUPLICATE',
  Invalid = 'INVALID',
  Late = 'LATE',
  Ok = 'OK',
  OutOfOrder = 'OUT_OF_ORDER'
}

export enum PatrolScanScope {
  Adhoc = 'ADHOC',
  Route = 'ROUTE'
}

export type PerformanceReport = {
  __typename?: 'PerformanceReport';
  createdDataCounts: CreatedDataCounts;
  crimeTypeDonut: Array<Graph>;
  goodsTypeCountDonut: Array<Graph>;
  goodsTypeValueDonut: Array<Graph>;
  groupSummary: Array<GroupSummary>;
  incidentDayOfWeekLine: Array<Graph>;
  incidentSummary: IncidentSummary;
  investigationSummary: InvestigationSummary;
  involvedTagCountDonut: Array<Graph>;
  lossTotals: LossTotals;
  outcomeSummary: OutcomeSummary;
  policeSummary: PoliceSummary;
  priorityGraph: Array<Graph>;
  timeHeatMap: Array<TimeHeatMap>;
};

export type Permission = {
  __typename?: 'Permission';
  allowedMethods: Array<PermissionMethod>;
  id: Scalars['ID'];
  model: PermissionModel;
  role: CustomRole;
};

export type PermissionInput = {
  allowedMethods: Array<PermissionMethod>;
  model: PermissionModel;
};

export type PermissionListRelationFilter = {
  every?: InputMaybe<PermissionWhereInput>;
  none?: InputMaybe<PermissionWhereInput>;
  some?: InputMaybe<PermissionWhereInput>;
};

export enum PermissionMethod {
  Approve = 'APPROVE',
  Delete = 'DELETE',
  Edit = 'EDIT',
  HideComplete = 'HIDE_COMPLETE',
  Read = 'READ',
  ReadAll = 'READ_ALL',
  Write = 'WRITE'
}

export enum PermissionModel {
  Activities = 'ACTIVITIES',
  Articles = 'ARTICLES',
  Automations = 'AUTOMATIONS',
  Brands = 'BRANDS',
  Businesses = 'BUSINESSES',
  Chat = 'CHAT',
  ChatGroups = 'CHAT_GROUPS',
  Checklist = 'CHECKLIST',
  CrimeGroups = 'CRIME_GROUPS',
  Dashboard = 'DASHBOARD',
  Dashboards = 'DASHBOARDS',
  DataExport = 'DATA_EXPORT',
  DataImport = 'DATA_IMPORT',
  Dem = 'DEM',
  Documents = 'DOCUMENTS',
  Evidence = 'EVIDENCE',
  Folders = 'FOLDERS',
  GeneralSettings = 'GENERAL_SETTINGS',
  Groups = 'GROUPS',
  Incidents = 'INCIDENTS',
  IncidentOptions = 'INCIDENT_OPTIONS',
  Investigations = 'INVESTIGATIONS',
  Offenders = 'OFFENDERS',
  OffenderGalleries = 'OFFENDER_GALLERIES',
  OffenderWarnings = 'OFFENDER_WARNINGS',
  Patrol = 'PATROL',
  PatrolSettings = 'PATROL_SETTINGS',
  PoliceCrimeGroups = 'POLICE_CRIME_GROUPS',
  PoliceDashboard = 'POLICE_DASHBOARD',
  PoliceIncidents = 'POLICE_INCIDENTS',
  PoliceOffenders = 'POLICE_OFFENDERS',
  PoliceSettings = 'POLICE_SETTINGS',
  PoliceVehicles = 'POLICE_VEHICLES',
  RecycleBin = 'RECYCLE_BIN',
  Reports = 'REPORTS',
  Roles = 'ROLES',
  Settings = 'SETTINGS',
  SharingSettings = 'SHARING_SETTINGS',
  SingleShoe = 'SINGLE_SHOE',
  StatementTemplates = 'STATEMENT_TEMPLATES',
  StockRemovalRequests = 'STOCK_REMOVAL_REQUESTS',
  Tasks = 'TASKS',
  TaskSettings = 'TASK_SETTINGS',
  Terms = 'TERMS',
  Users = 'USERS',
  UserSettings = 'USER_SETTINGS',
  Vehicles = 'VEHICLES',
  VisionAi = 'VISION_AI',
  VisionAiSettings = 'VISION_AI_SETTINGS',
  Workflows = 'WORKFLOWS'
}

export type PermissionWhereInput = {
  AND?: InputMaybe<Array<PermissionWhereInput>>;
  NOT?: InputMaybe<Array<PermissionWhereInput>>;
  OR?: InputMaybe<Array<PermissionWhereInput>>;
  allowedMethods?: InputMaybe<EnumPermissionMethodListFilter>;
  id?: InputMaybe<StringFilter>;
  model?: InputMaybe<EnumPermissionModelListFilter>;
  role?: InputMaybe<CustomRoleWhereInput>;
  roleId?: InputMaybe<StringFilter>;
};

export type Permissions = {
  __typename?: 'Permissions';
  allowedMethods: Array<PermissionMethod>;
  model: PermissionModel;
};

export type PickedItemInput = {
  itemId: Scalars['String'];
  pickedQuantity: Scalars['Int'];
};

export type PlatformFeatureUsage = {
  __typename?: 'PlatformFeatureUsage';
  /** Feature name */
  featureName: Scalars['String'];
  /** Platform type */
  platform: Scalars['String'];
  /** Number of unique users who used this feature */
  uniqueUsers: Scalars['Int'];
  /** Number of times feature was used */
  usageCount: Scalars['Int'];
};

export type PlatformUsageBreakdown = {
  __typename?: 'PlatformUsageBreakdown';
  /** Average sessions per user on this platform */
  averageSessionsPerUser: Scalars['Float'];
  /** Percentage of total sessions */
  percentageOfSessions: Scalars['Float'];
  /** Percentage of total users */
  percentageOfUsers: Scalars['Float'];
  /** Platform type (WEB, IOS, ANDROID) */
  platform: Scalars['String'];
  /** Number of sessions from this platform */
  sessionCount: Scalars['Int'];
  /** Total actions performed on this platform */
  totalActions: Scalars['Int'];
  /** Number of unique users on this platform */
  uniqueUsers: Scalars['Int'];
};

export type PoliceAreaSet = {
  set?: InputMaybe<Array<PoliceForce>>;
};

export type PoliceEngagementStats = {
  __typename?: 'PoliceEngagementStats';
  /** Most recent view timestamp */
  lastViewedAt: Scalars['DateTime'];
  /** The most viewed entity from this police hub */
  mostViewedEntity?: Maybe<MostViewedEntity>;
  /** Police force name (e.g., METROPOLITAN) */
  policeForce: Scalars['String'];
  /** ID of the police hub scheme */
  policeSchemeId: Scalars['String'];
  /** Name of the police hub */
  policeSchemeName: Scalars['String'];
  /** Number of shared crime groups viewed */
  sharedCrimeGroupsViewed: Scalars['Int'];
  /** Number of shared incidents viewed */
  sharedIncidentsViewed: Scalars['Int'];
  /** Number of shared offenders viewed */
  sharedOffendersViewed: Scalars['Int'];
  /** Number of shared vehicles viewed */
  sharedVehiclesViewed: Scalars['Int'];
  /** Total number of views from this police hub */
  totalViews: Scalars['Int'];
  /** Number of unique officers who viewed data */
  uniqueOfficers: Scalars['Int'];
};

export enum PoliceForce {
  AvonAndSomerset = 'AVON_AND_SOMERSET',
  Bedfordshire = 'BEDFORDSHIRE',
  BritishTransportPolice = 'BRITISH_TRANSPORT_POLICE',
  Cambridgeshire = 'CAMBRIDGESHIRE',
  Cheshire = 'CHESHIRE',
  CityOfLondon = 'CITY_OF_LONDON',
  Cleveland = 'CLEVELAND',
  Cumbria = 'CUMBRIA',
  Derbyshire = 'DERBYSHIRE',
  DevonAndCornwall = 'DEVON_AND_CORNWALL',
  Dorset = 'DORSET',
  Durham = 'DURHAM',
  DyfedPowys = 'DYFED_POWYS',
  Essex = 'ESSEX',
  Gloucestershire = 'GLOUCESTERSHIRE',
  GreaterManchester = 'GREATER_MANCHESTER',
  Gwent = 'GWENT',
  Hampshire = 'HAMPSHIRE',
  Hertfordshire = 'HERTFORDSHIRE',
  Humberside = 'HUMBERSIDE',
  Kent = 'KENT',
  Lancashire = 'LANCASHIRE',
  Leicestershire = 'LEICESTERSHIRE',
  Lincolnshire = 'LINCOLNSHIRE',
  Merseyside = 'MERSEYSIDE',
  Metropolitan = 'METROPOLITAN',
  Norfolk = 'NORFOLK',
  Northamptonshire = 'NORTHAMPTONSHIRE',
  Northumbria = 'NORTHUMBRIA',
  NorthWales = 'NORTH_WALES',
  NorthYorkshire = 'NORTH_YORKSHIRE',
  Nottinghamshire = 'NOTTINGHAMSHIRE',
  PoliceScotland = 'POLICE_SCOTLAND',
  Psni = 'PSNI',
  SouthWales = 'SOUTH_WALES',
  SouthYorkshire = 'SOUTH_YORKSHIRE',
  Staffordshire = 'STAFFORDSHIRE',
  Suffolk = 'SUFFOLK',
  Surrey = 'SURREY',
  Sussex = 'SUSSEX',
  ThamesValley = 'THAMES_VALLEY',
  Warwickshire = 'WARWICKSHIRE',
  WestMercia = 'WEST_MERCIA',
  WestMidlands = 'WEST_MIDLANDS',
  WestYorkshire = 'WEST_YORKSHIRE',
  Wiltshire = 'WILTSHIRE'
}

export type PoliceHubConfigResult = {
  __typename?: 'PoliceHubConfigResult';
  /** Business statistics for the source scheme */
  businessStats: BusinessStatistics;
  /** Monthly trend data for shared entities */
  monthlyTrends: Array<MonthlySharedEntityStats>;
  /** List of police hubs with sharing configurations */
  policeHubs: Array<PoliceHubDetail>;
  /** Tags configured for police sharing */
  policeSharingTags: Array<TagDetail>;
  /** Aggregate shared entity statistics across all hubs */
  sharedEntityStats: SharedEntityStats;
};

export type PoliceHubCrimeGroupSummary = {
  __typename?: 'PoliceHubCrimeGroupSummary';
  /** Retail schemes targeted by this group */
  affectedSchemes: Array<Scalars['String']>;
  /** LOW/MEDIUM/HIGH sophistication level */
  aiSophisticationLevel?: Maybe<Scalars['String']>;
  /** AI-generated summary of group */
  aiSummary?: Maybe<Scalars['String']>;
  /** Original crime group ID */
  crimeGroupId: Scalars['String'];
  /** Known members in group */
  memberCount: Scalars['Int'];
  /** Police priority score */
  policePriorityScore?: Maybe<Scalars['Int']>;
  /** Incidents in time period */
  recentActivityCount: Scalars['Int'];
  /** Shared crime group ID */
  sharedCrimeGroupId: Scalars['String'];
  /** Total value of crimes attributed to group */
  totalValue?: Maybe<Scalars['Float']>;
  /** Last update to shared record */
  updatedAt: Scalars['DateTime'];
};

export type PoliceHubDashboard = {
  __typename?: 'PoliceHubDashboard';
  /** Active organized crime groups (top 5 by sophistication) */
  activeCrimeGroups: Array<PoliceHubCrimeGroupSummary>;
  /** Distribution of incidents by crime type/tag */
  incidentTypeDistribution: Array<PoliceHubIncidentTypeDistribution>;
  /** Incident counts by month for the past 12 months */
  monthlyIncidentCounts: Array<PoliceHubMonthlyIncidentCount>;
  /** Analysis of recidivism patterns and high-frequency offenders */
  repeatOffenderInsights: PoliceHubRepeatOffenderInsights;
  /** High-level metrics for the time period */
  summary: PoliceHubSummaryMetrics;
  /** Top 10 offenders ranked by police priority score */
  topOffenders: Array<PoliceHubTopOffender>;
  /** Top 5 vehicles by priority score */
  vehiclesOfInterest: Array<PoliceHubVehicleSummary>;
};

export type PoliceHubDetail = {
  __typename?: 'PoliceHubDetail';
  /** Police force enum (e.g., METROPOLITAN, GREATER_MANCHESTER) */
  hubForce?: Maybe<PoliceForce>;
  /** Police hub scheme ID */
  hubId: Scalars['String'];
  /** Police hub scheme name */
  hubName: Scalars['String'];
  /** Monthly breakdown of shared entities for this hub */
  monthlyStats: Array<MonthlyHubStats>;
  /** Sharing configuration details */
  sharingConfig: SharingConfigDetail;
};

export type PoliceHubIncidentTypeDistribution = {
  __typename?: 'PoliceHubIncidentTypeDistribution';
  /** Number of incidents with this type */
  count: Scalars['Int'];
  /** Mapped crime type category (THEFT_HANDLING, VIOLENCE, etc.) */
  crimeType?: Maybe<Scalars['String']>;
  /** Tag ID for the incident type */
  tagId: Scalars['String'];
  /** Display name of the incident type */
  tagName: Scalars['String'];
};

export type PoliceHubMonthlyIncidentCount = {
  __typename?: 'PoliceHubMonthlyIncidentCount';
  /** Number of incidents in this month */
  count: Scalars['Int'];
  /** Month in YYYY-MM format */
  month: Scalars['String'];
};

export type PoliceHubRelayOrderInput = {
  createdAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PoliceHubRelayWhereInput = {
  /** Filter schemes created after this date */
  createdAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter schemes created before this date */
  createdBefore?: InputMaybe<Scalars['DateTime']>;
  /** Filter by specific police force */
  hubForce?: InputMaybe<PoliceForce>;
  /** Case-insensitive search across scheme name */
  search?: InputMaybe<Scalars['String']>;
};

export type PoliceHubRepeatOffenderInsights = {
  __typename?: 'PoliceHubRepeatOffenderInsights';
  /** Average recidivism rate */
  averageDaysBetweenIncidents: Scalars['Float'];
  /** Offenders with 5+ incidents (escalating threat) */
  highFrequencyOffenders: Scalars['Int'];
  /** Distribution: period0to30, period31to90, period91to180, period180plus */
  recidivismDistribution: Scalars['JSON'];
  /** Top 5 most frequent offenders */
  topByFrequency: Array<PoliceHubTopOffender>;
  /** Offenders with 3+ incidents in period */
  totalRepeatOffenders: Scalars['Int'];
};

export type PoliceHubSummaryMetrics = {
  __typename?: 'PoliceHubSummaryMetrics';
  /** Crime groups with recent activity */
  activeCrimeGroupsCount: Scalars['Int'];
  /** Offenders with activity in the time period */
  activeOffendersCount: Scalars['Int'];
  /** Average total loss value per offender */
  averageOffenderValue?: Maybe<Scalars['Float']>;
  /** Average police priority score across active offenders */
  averagePriorityScore?: Maybe<Scalars['Float']>;
  /** Offenders with HIGH threat level from AI risk assessment */
  highRiskIndividualsCount: Scalars['Int'];
  /** Offenders shared with other police hub schemes in the time period */
  offendersSharedWithOtherPoliceHubs: Scalars['Int'];
  /** Total value of incidents in period */
  totalEstimatedValue?: Maybe<Scalars['Float']>;
  /** Total incidents shared in time period */
  totalIncidentsSharedCount: Scalars['Int'];
  /** Total number of offenders with incidents in the time period */
  totalOffenders: Scalars['Int'];
  /** Number of offenders with 3+ incidents (repeat offenders) */
  totalRepeatOffenders: Scalars['Int'];
  /** Number of unique retail schemes sharing data */
  uniqueRetailersAffected: Scalars['Int'];
};

export type PoliceHubTopOffender = {
  __typename?: 'PoliceHubTopOffender';
  /** Geographic areas of activity */
  activeAreas: Array<Scalars['String']>;
  /** Retail schemes this offender has targeted */
  affectedSchemes: Array<Scalars['String']>;
  /** AI-calculated impact/threat score */
  aiImpactScore?: Maybe<Scalars['Int']>;
  /** Key behavioral patterns observed */
  aiKeyObservations: Array<Scalars['String']>;
  /** Crime methods employed */
  aiMethods: Array<Scalars['String']>;
  /** 1-2 sentence overview of threat */
  aiSummary?: Maybe<Scalars['String']>;
  /** Days since most recent incident */
  daysSinceLastIncident?: Maybe<Scalars['Int']>;
  /** Date of first incident */
  firstIncidentDate?: Maybe<Scalars['DateTime']>;
  /** Whether this offender has associated images */
  hasImages: Scalars['Boolean'];
  /** Whether this offender has a name */
  hasName: Scalars['Boolean'];
  /** Images associated with this offender */
  images: Scalars['JSON'];
  /** Number of incidents in time period */
  incidentCount: Scalars['Int'];
  /** Date of last incident for this offender */
  lastIncidentAt?: Maybe<Scalars['DateTime']>;
  /** Date of most recent incident */
  lastIncidentDate?: Maybe<Scalars['DateTime']>;
  /** Offender name if available */
  name?: Maybe<Scalars['String']>;
  /** Original offender IDs (many-to-many) */
  offenderIds: Array<Scalars['String']>;
  /** Police priority score for ranking */
  policePriorityScore?: Maybe<Scalars['Int']>;
  /** Primary risk category */
  riskCategory?: Maybe<Scalars['String']>;
  /** Shared offender ID */
  sharedOffenderId: Scalars['String'];
  /** Tags associated with this offender */
  tags: Scalars['JSON'];
  /** HIGH/MEDIUM/LOW from risk assessment */
  threatLevel?: Maybe<Scalars['String']>;
  /** Total loss value associated with this offender */
  totalValue?: Maybe<Scalars['Float']>;
  /** Last update to shared record */
  updatedAt: Scalars['DateTime'];
};

export type PoliceHubVehicleSummary = {
  __typename?: 'PoliceHubVehicleSummary';
  /** Retail schemes where vehicle was seen */
  affectedSchemes: Array<Scalars['String']>;
  /** AI-generated summary of vehicle usage */
  aiSummary?: Maybe<Scalars['String']>;
  /** Temporal usage patterns */
  aiUsagePatterns?: Maybe<Scalars['String']>;
  /** Number of associated offenders */
  associatedOffenderCount: Scalars['Int'];
  /** Vehicle color */
  color?: Maybe<Scalars['String']>;
  /** Number of incidents involving this vehicle */
  incidentCount: Scalars['Int'];
  /** Date of most recent incident */
  lastSeenDate?: Maybe<Scalars['DateTime']>;
  /** Vehicle make */
  make?: Maybe<Scalars['String']>;
  /** Vehicle model */
  model?: Maybe<Scalars['String']>;
  /** Police priority score */
  policePriorityScore?: Maybe<Scalars['Int']>;
  /** Vehicle registration number */
  registration?: Maybe<Scalars['String']>;
  /** Shared vehicle ID */
  sharedVehicleId: Scalars['String'];
  /** Original vehicle IDs (many-to-many) */
  vehicleIds: Array<Scalars['String']>;
};

export type PoliceHubView = {
  __typename?: 'PoliceHubView';
  hub: Scheme;
  sourceSchemes: Array<SourceSchemeStats>;
  totalStats: SharedEntityTotals;
};

export type PoliceMatch = {
  __typename?: 'PoliceMatch';
  collectionId?: Maybe<Scalars['String']>;
  confidenceScore: Scalars['Float'];
  cosineDistance?: Maybe<Scalars['Float']>;
  cosineSimilarity?: Maybe<Scalars['Float']>;
  createdAt: Scalars['Date'];
  dismissReason?: Maybe<Scalars['String']>;
  dismissed: Scalars['Boolean'];
  dismissedAt?: Maybe<Scalars['Date']>;
  dismissedBy?: Maybe<User>;
  enhanced: Scalars['Boolean'];
  euclideanDistance?: Maybe<Scalars['Float']>;
  euclideanSimilarity?: Maybe<Scalars['Float']>;
  faceId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageId?: Maybe<Scalars['String']>;
  matchMetadata?: Maybe<Scalars['JSON']>;
  matchType: PoliceMatchType;
  matchedSharedOffender: SharedOffender;
  qualityPassed: Scalars['Boolean'];
  qualityScore?: Maybe<Scalars['Float']>;
  sourceImage?: Maybe<Image>;
  sourceImageId?: Maybe<Scalars['String']>;
  sourceSharedOffender: SharedOffender;
  ttaUsed: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
  verified: Scalars['Boolean'];
  verifiedAt?: Maybe<Scalars['Date']>;
  verifiedBy?: Maybe<User>;
};

export type PoliceMatchRelayOrderInput = {
  /** Sort by confidence score */
  confidenceScore?: InputMaybe<SortOrder>;
  /** Sort by creation date */
  createdAt?: InputMaybe<SortOrder>;
  /** Sort by match type */
  matchType?: InputMaybe<SortOrder>;
  /** Sort by last update date */
  updatedAt?: InputMaybe<SortOrder>;
  /** Sort by verification status */
  verified?: InputMaybe<SortOrder>;
  /** Sort by verification date */
  verifiedAt?: InputMaybe<SortOrder>;
};

export type PoliceMatchRelayWhereInput = {
  /** Maximum confidence score (0-100) */
  confidenceScoreMax?: InputMaybe<Scalars['Float']>;
  /** Minimum confidence score (0-100) */
  confidenceScoreMin?: InputMaybe<Scalars['Float']>;
  /** Filter matches created after this date */
  createdAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter matches created before this date */
  createdBefore?: InputMaybe<Scalars['DateTime']>;
  /** Filter by dismissed status */
  dismissed?: InputMaybe<Scalars['Boolean']>;
  /** Filter by match type (FACE, NAME, PATTERN, etc.) */
  matchType?: InputMaybe<PoliceMatchType>;
  /** Filter by specific matched SharedOffender ID */
  matchedSharedOffenderId?: InputMaybe<Scalars['String']>;
  /** Filter by quality check status (face matches only) */
  qualityPassed?: InputMaybe<Scalars['Boolean']>;
  /** Filter by scheme ID of the source SharedOffender */
  schemeId?: InputMaybe<Scalars['String']>;
  /** Search in source or matched SharedOffender names */
  search?: InputMaybe<Scalars['String']>;
  /** Filter by specific source SharedOffender ID */
  sourceSharedOffenderId?: InputMaybe<Scalars['String']>;
  /** Filter by verification status */
  verified?: InputMaybe<Scalars['Boolean']>;
  /** Filter matches verified after this date */
  verifiedAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter matches verified before this date */
  verifiedBefore?: InputMaybe<Scalars['DateTime']>;
};

export enum PoliceMatchType {
  Face = 'FACE',
  Geographic = 'GEOGRAPHIC',
  Mo = 'MO',
  Name = 'NAME',
  Pattern = 'PATTERN',
  Temporal = 'TEMPORAL'
}

export type PoliceMatchWhereUniqueInput = {
  id: Scalars['String'];
};

export enum PoliceResponseTime {
  NoResponse = 'NO_RESPONSE',
  Over_24Hours = 'OVER_24_HOURS',
  Within_1Hour = 'WITHIN_1_HOUR',
  Within_3Hours = 'WITHIN_3_HOURS',
  Within_12Hours = 'WITHIN_12_HOURS',
  Within_24Hours = 'WITHIN_24_HOURS'
}

export type PoliceSharingConfigInput = {
  mode: SharingMode;
  schemeFrom: UniqueId;
  schemeTo: UniqueId;
};

export type PoliceSummary = {
  __typename?: 'PoliceSummary';
  totalAttendedIncidents: Scalars['Int'];
  totalPoliceImages: Scalars['Int'];
  totalReportedIncidents: Scalars['Int'];
  totalVerifiedOffenders: Scalars['Int'];
};

export type PoliceTriageStatistics = {
  __typename?: 'PoliceTriageStatistics';
  averageScores: TriageAverageScores;
  exclusionReasons: TriageExclusionReasons;
  overview: TriageOverview;
  reporting: TriageReporting;
  statusBreakdown: TriageStatusBreakdown;
};

export enum PoliceTriageStatus {
  DoNotReport = 'DO_NOT_REPORT',
  Pending = 'PENDING',
  Report = 'REPORT',
  Review = 'REVIEW'
}

export type PolygonFilterInput = {
  /** Array of [longitude, latitude] coordinate pairs. Must form a closed polygon (first and last points match). Min 4 points, max 100 points. Example: [[0.0, 51.0], [0.1, 51.0], [0.1, 51.1], [0.0, 51.1], [0.0, 51.0]] */
  coordinates: Scalars['JSON'];
};

export type PreSelectedGood = {
  __typename?: 'PreSelectedGood';
  barcode?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  goodsTypeId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  stockItemId?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type PreSelectedGoodInput = {
  barcode?: InputMaybe<Scalars['String']>;
  brand?: InputMaybe<Scalars['String']>;
  goodsTypeId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  quantity?: InputMaybe<Scalars['Int']>;
  sku?: InputMaybe<Scalars['String']>;
  stockItemId?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  action: Action;
  actions: Array<Action>;
  activeChecklist: ActiveChecklist;
  activeChecklistExportPreview: QueryActiveChecklistExportPreviewConnection;
  activeChecklists: QueryActiveChecklistsConnection;
  activityGraph: Array<Graph>;
  activitySummary: ActivitySummary;
  activityTableReport: ListActivityPerformance;
  address: Address;
  addresses: Array<Address>;
  adminDashboard: AdminDashboardData;
  adminIncidentCrimeTypeTags: Array<Tag>;
  aiSuggestion: AiSuggestion;
  aiSuggestions: QueryAiSuggestionsConnection;
  aiVisionCamera: AiVisionCamera;
  aiVisionCameras: QueryAiVisionCamerasConnection;
  aiVisionEvent: AiVisionEvent;
  aiVisionEvents: QueryAiVisionEventsConnection;
  aiVisionMap: Array<AiVisionMapData>;
  aiVisionMatch: AiVisionMatch;
  aiVisionMatches: QueryAiVisionMatchesConnection;
  aiVisionStats: Array<Count>;
  article: Article;
  articles: Array<Article>;
  audioAnalyticsReport: AudioAnalyticsReport;
  audioDailyMetrics: Scalars['JSON'];
  audioIncidentRequirements: AudioIncidentRequirements;
  audioIncidentTypes: Array<AudioIncidentType>;
  audioSessionAnalytics: AudioSessionMetrics;
  availablePatrolTokens: Array<PatrolCheckpointToken>;
  availableQuestions: Array<Question>;
  availableTaskQuestions: Array<Question>;
  ban: Ban;
  bans: Array<Ban>;
  billingCustomer: BillingCustomer;
  /** Calculate billing totals for a billing customer and their tenants */
  billingCustomerCalculation: BillingCustomerCalculation;
  billingCustomers: QueryBillingCustomersConnection;
  brand: Brand;
  brands: QueryBrandsConnection;
  /** Get engagement analytics showing which users have viewed a bulletin */
  bulletinEngagement: BulletinEngagement;
  business: Business;
  businessContribution: ListBusinessContribution;
  businessCrimeTypeGraph: Array<RadialValueGraph>;
  businessImpact: BusinessImpact;
  businessIncidentCountGraph: Array<Graph>;
  businessLossPreventionDashboard: BusinessLossPreventionData;
  businessLossRecoveredGraph: Array<RadialGraph>;
  businessQuestion: BusinessQuestion;
  businessQuestionRelay: QueryBusinessQuestionRelayConnection;
  businessRelay: QueryBusinessRelayConnection;
  businessRelayAdmin: QueryBusinessRelayAdminConnection;
  businessReport: BusinessReport;
  chat: Chat;
  chatMessages: Array<MessageItem>;
  chats: Array<Chat>;
  checklist: Checklist;
  checklistQuestionCounts: Array<QuestionAnswerCount>;
  checklistQuestionTableReport: ChecklistQuestionPerformance;
  checklistTableReport: ListChecklistPerformance;
  checklists: Array<Checklist>;
  compareAwsToCustom: Scalars['Boolean'];
  compareFaces: SystemTask;
  compassMatch?: Maybe<CompassMatch>;
  compassMatches: ListCompassMatches;
  crimeGroup: CrimeGroup;
  /** Get analytics for offenders in a crime group */
  crimeGroupAnalytics: Array<CrimeGroupOffenderAnalyticsSimple>;
  crimeGroupPerformance: ListCrimeGroupPerformance;
  crimeGroupReport: CrimeGroupReport;
  crimeGroups: QueryCrimeGroupsConnection;
  currentUser?: Maybe<User>;
  customGalleriesRelay: QueryCustomGalleriesRelayConnection;
  customGallery: CustomGallery;
  customGraph: Array<Graph>;
  customQuestionsCountGraph: CustomQuestionsGraph;
  dashboard: Dashboard;
  dashboards: QueryDashboardsConnection;
  dataQualityScore: DataQualityScore;
  dateTest: Array<Scalars['String']>;
  dateTestParser: Array<Scalars['String']>;
  demDevice: DemDevice;
  demDeviceModel: Array<DemDeviceModel>;
  demDevices: QueryDemDevicesConnection;
  demGroup: DemGroup;
  demGroups: QueryDemGroupsConnection;
  detectionConfig: DetectActionConfig;
  detectionConfigs: QueryDetectionConfigsConnection;
  /** Get engagement analytics showing which users have viewed a document */
  documentEngagement: DocumentEngagement;
  documents: QueryDocumentsConnection;
  documentsNoFolder: QueryDocumentsNoFolderConnection;
  featureAdoptionRate: Array<FeatureAdoptionRate>;
  feedItem: FeedItem;
  feedItems: Array<FeedItem>;
  feedRelay: QueryFeedRelayConnection;
  folder: Folder;
  folders: QueryFoldersConnection;
  geographicalArea: GeographicalArea;
  geographicalAreas: Array<GeographicalArea>;
  getAudioIncidentCapabilities: Scalars['JSON'];
  getAudioIncidentSession: Scalars['JSON'];
  goodsTypes: Array<GoodsType>;
  group: Group;
  groupKpiStats: Array<GroupKpiStat>;
  groups: Array<Group>;
  health: Scalars['Boolean'];
  image: Image;
  images: Array<Image>;
  incident: Incident;
  incidentCount: Scalars['Int'];
  incidentDataQuality: Array<IncidentDataQuality>;
  incidentFeed: Array<Incident>;
  incidentHeatPerformance: ListIncidentsHeatPerformance;
  incidentItems: QueryIncidentItemsConnection;
  incidentMapRelay: QueryIncidentMapRelayConnection;
  incidentMonthGraph: Array<Graph>;
  incidentMonthlyByScheme: Array<IncidentMonthlyByScheme>;
  incidentOffenderRatio: IncidentOffenderRatio;
  incidentRelaySimple: QueryIncidentRelaySimpleConnection;
  incidentStatus: IncidentStatus;
  incidentStatuses: Array<IncidentStatus>;
  incidentTableReport: ListIncidentPerformance;
  incidents: Array<Incident>;
  incidentsDayOfWeek: Array<Graph>;
  incidentsRelay: QueryIncidentsRelayConnection;
  incidentsTimeOfDay: Array<Graph>;
  industries: Array<Industry>;
  integrationConfig?: Maybe<IntegrationConfig>;
  integrationConfigs: Array<IntegrationConfig>;
  investigation: Investigation;
  investigationPerformance: ListInvestigationPerformance;
  investigationRelay: QueryInvestigationRelayConnection;
  investigationSuccessRate: InvestigationSuccessRate;
  investigationTableReport: ListInvestigationPerformance;
  investigationTimeline: Array<InvestigationTimeline>;
  investigations: Array<Investigation>;
  investigationsByType: Array<InvestigationByType>;
  isPasswordDisabled: Scalars['Boolean'];
  latestIncident?: Maybe<LatestIncident>;
  latestIncidents: QueryLatestIncidentsConnection;
  latestVehicles: QueryLatestVehiclesConnection;
  listActions: ListActions;
  listArticles: ListArticles;
  listArticlesRelay: QueryListArticlesRelayConnection;
  listBusinessQuestions: ListBusinessQuestions;
  listBusinesses: ListBusinesses;
  listCrimeGroups: ListCrimeGroups;
  listCustomGalleries: ListCustomGalleries;
  listDemBusinessEvidence: ListDemEvidenceRelay;
  listDemCompanies: ListDemCompanies;
  listDemDeviceEvidence: ListDemEvidenceRelay;
  listDemEvidence: ListDemEvidence;
  listDemEvidenceExtendedWithoutUser: ListDemEvidenceExtended;
  listDemEvidenceRecycle: ListDemEvidenceRelay;
  listDemUsers: ListDemUsers;
  listFeedItems?: Maybe<ListFeedItems>;
  listGoodsTypes: ListGoodsTypes;
  listIncidentTags: Array<IncidentTags>;
  listIncidentTagsControl: Array<IncidentTags>;
  listIncidents?: Maybe<ListIncidents>;
  listIncidentsAllSchemes?: Maybe<ListIncidents>;
  listInvestigations: ListInvestigations;
  listInvestigationsAllSchemes: ListInvestigations;
  listLoginEvents: ListLoginEvents;
  listNotifications: ListNotifications;
  listOffenders: ListOffenders;
  listOffendersAllSchemes: ListOffenders;
  listOffendersRelay: QueryListOffendersRelayConnection;
  listRekMatches: ListRekMatches;
  listStockItems: ListStockItems;
  listTags: ListTags;
  listTodos: ListTodos;
  listUserContribution: ListUserContribution;
  listUserNotifications: ListUserNotifications;
  /** @deprecated Use relay - better performance */
  listUsers: ListUsers;
  listVehicles: ListVehicles;
  loginEvent: LoginEvent;
  loginEvents: Array<LoginEvent>;
  lpStockLossReport: LpStockLossReportData;
  mentionableUsers: Array<MentionableUser>;
  message: Message;
  messages: Array<Message>;
  mg11: Mg11;
  notificationRelay: QueryNotificationRelayConnection;
  offender: Offender;
  offenderByName: ListOffenders;
  /** Get engagement analytics showing which users have viewed an offender */
  offenderEngagement: OffenderEngagement;
  offenderFeed: Array<Offender>;
  offenderLinkMap: OffenderLinkMap;
  offenderReport: OffenderReport;
  offenderTableReport: ListOffenderPerformance;
  offenders: Array<Offender>;
  offendersPerformance: ListOffenderPerformance;
  patrolCheckpoint?: Maybe<PatrolCheckpoint>;
  patrolCheckpoints: Array<PatrolCheckpoint>;
  patrolRoutes: Array<PatrolRoute>;
  patrolRun?: Maybe<PatrolRun>;
  patrolRuns: Array<PatrolRun>;
  pendingCriticalBulletins: Array<Article>;
  pendingLoginPromptVideos: Array<TrainingVideo>;
  performanceReport: PerformanceReport;
  platformFeatureUsage: Array<PlatformFeatureUsage>;
  platformUsageBreakdown: Array<PlatformUsageBreakdown>;
  /** View police hub engagement analytics for a specific source scheme */
  policeEngagementOverview: Array<PoliceEngagementStats>;
  policeHubConfig: PoliceHubConfigResult;
  policeHubDashboard: PoliceHubDashboard;
  policeHubSchemesRelay: QueryPoliceHubSchemesRelayConnection;
  policeHubView: PoliceHubView;
  policeMatch: PoliceMatch;
  policeMatchesRelay: QueryPoliceMatchesRelayConnection;
  policeTriageByStore: Array<StoreTriageStatistics>;
  policeTriageStatistics: PoliceTriageStatistics;
  previewIncidentExport: IncidentExport;
  question: Question;
  questions: QueryQuestionsConnection;
  recidivismAverage: RecidivismAverage;
  recidivismPatternsTrend: Array<RecidivismMonthlyData>;
  recycledItem?: Maybe<RecycledItem>;
  recycledItems: Array<RecycledItem>;
  recycledItemsCount: Scalars['Int'];
  repeatOffenderDetails: Array<RepeatOffenderDetail>;
  repeatOffenderOverview: RepeatOffenderOverview;
  reportGroup: ReportGroup;
  reportGroups: QueryReportGroupsConnection;
  reportTemplate: ReportTemplate;
  reportTemplates: Array<ReportTemplate>;
  reportUserLogin: User;
  reportsCentre: Array<ReportGroup>;
  retailAdminDashboard: RetailAdminDashboardData;
  role: CustomRole;
  roles: QueryRolesConnection;
  scheme: Scheme;
  schemeDashboardStats: SchemeDashboardStats;
  schemes: Array<Scheme>;
  searchAudioIncidentGoods: Array<StockItemCandidate>;
  searchOffenders: QuerySearchOffendersConnection;
  sharedCrimeGroup: SharedCrimeGroup;
  sharedCrimeGroupRelay: QuerySharedCrimeGroupRelayConnection;
  sharedIncident: SharedIncident;
  sharedIncidentHeatmap: SharedIncidentHeatmap;
  sharedIncidentRelay: QuerySharedIncidentRelayConnection;
  sharedOffender: SharedOffender;
  sharedOffenderRelay: QuerySharedOffenderRelayConnection;
  sharedVehicle: SharedVehicle;
  sharedVehicleRelay: QuerySharedVehicleRelayConnection;
  sharingBusinesses: Array<SharingBusiness>;
  sharingConfig: SharingConfig;
  sharingConfigs: Array<SharingConfig>;
  shoe: Shoe;
  shoes: QueryShoesConnection;
  statementTemplate: StatementTemplate;
  statementTemplates: Array<StatementTemplate>;
  stockItemsRelay: QueryStockItemsRelayConnection;
  stockItemsRelayFast: QueryStockItemsRelayFastConnection;
  stockItemsSearch: StockItemSearchResult;
  stockRemovalReasonOptions: Array<StockRemovalReasonOption>;
  stockRemovalRequest: StockRemovalRequest;
  stockRemovalRequests: QueryStockRemovalRequestsConnection;
  storeColleagueDashboard: StoreColleagueDashboardData;
  tableReport: ReportTemplate;
  tag: Tag;
  tags: Array<Tag>;
  targetedGoods: ListTargetedGoods;
  targetedGoodsDashboard: Array<Graph>;
  term: TermsAndCondition;
  tier: Tier;
  tiers: QueryTiersConnection;
  todo: Todo;
  todoExportRelay: QueryTodoExportRelayConnection;
  todoRelay: QueryTodoRelayConnection;
  todos: Array<Todo>;
  totalLoss: Scalars['Float'];
  totalUserSessionsGraph: Array<Graph>;
  trainingVideo: TrainingVideo;
  /** Get audit information showing which users have watched a training video */
  trainingVideoAudit: TrainingVideoAudit;
  trainingVideos: Array<TrainingVideo>;
  translateText: Array<TranslatedText>;
  unrestrictedIncidentsRelay: QueryUnrestrictedIncidentsRelayConnection;
  unrestrictedOffendersRelay: QueryUnrestrictedOffendersRelayConnection;
  updates: Array<Update>;
  user: User;
  userActivityGauge: UserActivityGauge;
  userByEmail?: Maybe<User>;
  userChat: UserChat;
  userChats: Array<UserChat>;
  userContact?: Maybe<Contact>;
  userContributions: ListUserContribution;
  /** Get a comprehensive view of all bulletins, documents, and offenders a user has viewed */
  userEngagementActivity: UserEngagementActivity;
  userEngagementDepth: Array<UserEngagementDepth>;
  userGroupRelay: QueryUserGroupRelayConnection;
  userIncidentCountGraph: Array<Graph>;
  userNew: UserNew;
  userNotification: UserNotification;
  userNotifications: Array<UserNotification>;
  userPlatformPreferences: Array<UserPlatformPreference>;
  userScheme: UserScheme;
  userSchemes: Array<UserScheme>;
  userSessionsGraph: Array<RadialValueGraph>;
  users: Array<User>;
  usersOnline: Array<UserOnline>;
  usersRelay: QueryUsersRelayConnection;
  usersRelayAdmin: QueryUsersRelayAdminConnection;
  vehicle: Vehicle;
  workflow?: Maybe<Workflow>;
  workflows: Array<Workflow>;
};


export type QueryActionArgs = {
  where: UniqueId;
};


export type QueryActionsArgs = {
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type QueryActiveChecklistArgs = {
  where: ActiveChecklistWhereUniqueInput;
};


export type QueryActiveChecklistExportPreviewArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  range: ChecklistDateRange;
  where: ActiveChecklistWhereInput;
};


export type QueryActiveChecklistsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ActiveChecklistOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActiveChecklistWhereInput>;
};


export type QueryActivityGraphArgs = {
  where: ActivityReportsWhere;
};


export type QueryActivitySummaryArgs = {
  where: ActivityReportsWhere;
};


export type QueryActivityTableReportArgs = {
  where: ActivityTableWhereInput;
};


export type QueryAddressArgs = {
  where: AddressWhereUniqueInput;
};


export type QueryAddressesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressWhereInput>;
};


export type QueryAdminIncidentCrimeTypeTagsArgs = {
  schemeId: Scalars['String'];
};


export type QueryAiSuggestionArgs = {
  where: AiSuggestionWhereUniqueInput;
};


export type QueryAiSuggestionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AiSuggestionsOrderBy>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: AiSuggestionWhereInput;
};


export type QueryAiVisionCameraArgs = {
  where: UniqueId;
};


export type QueryAiVisionCamerasArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: AiVisionCameraWhereInput;
};


export type QueryAiVisionEventArgs = {
  where: UniqueId;
};


export type QueryAiVisionEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AiVisionEventOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: AiVisionEventWhereInput;
};


export type QueryAiVisionMapArgs = {
  where: AiVisionCameraWhereInput;
};


export type QueryAiVisionMatchArgs = {
  where: UniqueId;
};


export type QueryAiVisionMatchesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AiVisionMatchOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: AiVisionMatchWhereInput;
};


export type QueryArticleArgs = {
  where: ArticleWhereUniqueInput;
};


export type QueryArticlesArgs = {
  orderBy?: InputMaybe<Array<ArticleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type QueryAudioAnalyticsReportArgs = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};


export type QueryAudioDailyMetricsArgs = {
  date?: InputMaybe<Scalars['String']>;
};


export type QueryAudioSessionAnalyticsArgs = {
  sessionId: Scalars['String'];
};


export type QueryAvailablePatrolTokensArgs = {
  batchId?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryAvailableQuestionsArgs = {
  where?: InputMaybe<UniqueId>;
};


export type QueryAvailableTaskQuestionsArgs = {
  where: Array<Scalars['String']>;
};


export type QueryBanArgs = {
  where: BanWhereUniqueInput;
};


export type QueryBansArgs = {
  cursor?: InputMaybe<BanWhereUniqueInput>;
  distinct?: InputMaybe<Array<BanScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BanOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BanWhereInput>;
};


export type QueryBillingCustomerArgs = {
  where: BillingCustomerWhereUniqueInput;
};


export type QueryBillingCustomerCalculationArgs = {
  billingCustomerId: Scalars['String'];
};


export type QueryBillingCustomersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryBrandArgs = {
  where: BrandWhereUniqueInput;
};


export type QueryBrandsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<BrandWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BrandOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BrandWhereInput>;
};


export type QueryBulletinEngagementArgs = {
  articleId: Scalars['String'];
};


export type QueryBusinessArgs = {
  where: BusinessWhereUniqueInput;
};


export type QueryBusinessContributionArgs = {
  orderBy?: InputMaybe<BusinessContributionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: UserContributionWhereInput;
};


export type QueryBusinessCrimeTypeGraphArgs = {
  take?: InputMaybe<Scalars['Int']>;
  where: BusinessIncidentsCountGraphInput;
};


export type QueryBusinessImpactArgs = {
  where: UniqueId;
};


export type QueryBusinessIncidentCountGraphArgs = {
  take?: InputMaybe<Scalars['Int']>;
  where: BusinessIncidentsCountGraphInput;
};


export type QueryBusinessLossPreventionDashboardArgs = {
  businessId: Scalars['String'];
  schemeId?: InputMaybe<Scalars['String']>;
  sections?: InputMaybe<Array<BusinessLossPreventionSection>>;
  watchlistOrderBy?: InputMaybe<BusinessLpWatchlistOrderBy>;
};


export type QueryBusinessLossRecoveredGraphArgs = {
  take?: InputMaybe<Scalars['Int']>;
  where: BusinessIncidentsCountGraphInput;
};


export type QueryBusinessQuestionArgs = {
  where: BusinessQuestionWhereUniqueInput;
};


export type QueryBusinessQuestionRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BusinessQuestionRelayOrderInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: BusinessQuestionRelayWhereInput;
};


export type QueryBusinessRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hasChildrenOnly?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BusinessOrderBy>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BusinessWhereInput>;
};


export type QueryBusinessRelayAdminArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hasChildrenOnly?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BusinessOrderBy>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BusinessWhereInput>;
};


export type QueryBusinessReportArgs = {
  where: BusinessReportInput;
};


export type QueryChatArgs = {
  where: ChatWhereUniqueInput;
};


export type QueryChatMessagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: ChatMessagesWhereInput;
};


export type QueryChatsArgs = {
  after?: InputMaybe<ChatWhereUniqueInput>;
  orderBy?: InputMaybe<Array<ChatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChatWhereInput>;
};


export type QueryChecklistArgs = {
  where: ChecklistWhereUniqueInput;
};


export type QueryChecklistQuestionCountsArgs = {
  where: ActiveChecklistWhereInput;
};


export type QueryChecklistQuestionTableReportArgs = {
  where: ActiveChecklistWhereUniqueInput;
};


export type QueryChecklistTableReportArgs = {
  where: ChecklistTableWhereInput;
};


export type QueryChecklistsArgs = {
  order?: InputMaybe<ChecklistOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: ChecklistWhereInput;
};


export type QueryCompareAwsToCustomArgs = {
  awsFaces?: InputMaybe<Array<FaceDetectorComparisonInput>>;
  awsTimeTaken: Scalars['Float'];
  image: Scalars['String'];
};


export type QueryCompassMatchArgs = {
  where: CompassMatchWhereUniqueInput;
};


export type QueryCompassMatchesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CompassMatchWhereInput>;
};


export type QueryCrimeGroupArgs = {
  where: CrimeGroupWhereUniqueInput;
};


export type QueryCrimeGroupAnalyticsArgs = {
  crimeGroupId: Scalars['String'];
  mode: CrimeGroupAnalyticsMode;
};


export type QueryCrimeGroupPerformanceArgs = {
  where: UserContributionWhereInput;
};


export type QueryCrimeGroupReportArgs = {
  where: CrimeGroupReportInput;
};


export type QueryCrimeGroupsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CrimeGroupsWhereOrder>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: CrimeGroupsWhere;
};


export type QueryCustomGalleriesRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<CustomGalleryOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CustomGalleryWhereInput>;
};


export type QueryCustomGalleryArgs = {
  where: CustomGalleryWhereUniqueInput;
};


export type QueryCustomGraphArgs = {
  input: CustomGraphInput;
};


export type QueryCustomQuestionsCountGraphArgs = {
  where: CustomQuestionsCountGraphInput;
};


export type QueryDashboardArgs = {
  where: DashboardWhereUniqueInput;
};


export type QueryDashboardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  scheme: SchemeWhereUniqueInput;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryDataQualityScoreArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryDateTestArgs = {
  date: Scalars['DateTime'];
  parseUKDateTest?: InputMaybe<Scalars['String']>;
};


export type QueryDateTestParserArgs = {
  date?: InputMaybe<Scalars['String']>;
  time?: InputMaybe<Scalars['String']>;
};


export type QueryDemDeviceArgs = {
  where: DemDeviceWhereUniqueInput;
};


export type QueryDemDevicesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DemDeviceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DemDeviceWhereInput>;
};


export type QueryDemGroupArgs = {
  where: DemGroupWhereUniqueInput;
};


export type QueryDemGroupsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DemGroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DemGroupWhereInput>;
};


export type QueryDetectionConfigArgs = {
  where: UniqueId;
};


export type QueryDetectionConfigsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderByCameras?: InputMaybe<SortOrder>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: DetectionConfigWhere;
};


export type QueryDocumentEngagementArgs = {
  documentId: Scalars['String'];
};


export type QueryDocumentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DocumentWhereInput>;
};


export type QueryDocumentsNoFolderArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<DocumentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DocumentWhereInput>;
};


export type QueryFeatureAdoptionRateArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryFeedItemArgs = {
  where: FeedItemWhereUniqueInput;
};


export type QueryFeedItemsArgs = {
  cursor?: InputMaybe<FeedItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeedItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeedItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
};


export type QueryFeedRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  groups?: InputMaybe<Array<Scalars['String']>>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<FeedItemOrderByWithRelationInput>;
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<FeedItemWhereInput>;
};


export type QueryFolderArgs = {
  where: FolderWhereUniqueInput;
};


export type QueryFoldersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<FolderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FolderWhereInput>;
};


export type QueryGeographicalAreaArgs = {
  id: Scalars['String'];
};


export type QueryGeographicalAreasArgs = {
  schemeId: Scalars['String'];
};


export type QueryGetAudioIncidentSessionArgs = {
  sessionId: Scalars['String'];
};


export type QueryGoodsTypesArgs = {
  orderBy?: InputMaybe<Array<GoodsTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GoodsTypeWhereInput>;
};


export type QueryGroupArgs = {
  where: GroupWhereUniqueInput;
};


export type QueryGroupKpiStatsArgs = {
  dateRange?: InputMaybe<DateRangeInput>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  schemeId: Scalars['String'];
};


export type QueryGroupsArgs = {
  after?: InputMaybe<GroupWhereUniqueInput>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type QueryImageArgs = {
  where: ImageWhereUniqueInput;
};


export type QueryImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


export type QueryIncidentArgs = {
  where: IncidentWhereUniqueInput;
};


export type QueryIncidentCountArgs = {
  where: DashboardInput;
};


export type QueryIncidentDataQualityArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  minQualityScore?: InputMaybe<Scalars['Float']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryIncidentFeedArgs = {
  after?: InputMaybe<Scalars['String']>;
  approved?: InputMaybe<Scalars['Boolean']>;
  crimeTypes?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order?: InputMaybe<IncidentOrderByWithRelationInput>;
  policeAreas?: InputMaybe<Array<PoliceForce>>;
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
};


export type QueryIncidentHeatPerformanceArgs = {
  where: UserContributionWhereInput;
};


export type QueryIncidentItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderby?: InputMaybe<IncidentItemsOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: IncidentItemsWhereInput;
};


export type QueryIncidentMapRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  where: IncidentMapRelayWhere;
};


export type QueryIncidentMonthGraphArgs = {
  where: BusinessIncidentsCountGraphInput;
};


export type QueryIncidentMonthlyBySchemeArgs = {
  endDate: Scalars['String'];
  groupBy?: InputMaybe<Scalars['String']>;
  schemeIds: Array<Scalars['String']>;
  startDate: Scalars['String'];
};


export type QueryIncidentOffenderRatioArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryIncidentRelaySimpleArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  where?: InputMaybe<IncidentRelaySimpleInput>;
};


export type QueryIncidentStatusArgs = {
  where: IncidentStatusWhereUniqueInput;
};


export type QueryIncidentTableReportArgs = {
  where: IncidentTableWhereInput;
};


export type QueryIncidentsArgs = {
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type QueryIncidentsDayOfWeekArgs = {
  where: DashboardInput;
};


export type QueryIncidentsRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  approved?: InputMaybe<Scalars['Boolean']>;
  before?: InputMaybe<Scalars['String']>;
  crimeTypes?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<IncidentOrderByWithRelationInput>;
  policeAreas?: InputMaybe<Array<PoliceForce>>;
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type QueryIncidentsTimeOfDayArgs = {
  where: DashboardInput;
};


export type QueryIntegrationConfigArgs = {
  id: Scalars['String'];
};


export type QueryIntegrationConfigsArgs = {
  schemeId: Scalars['String'];
};


export type QueryInvestigationArgs = {
  where: InvestigationWhereUniqueInput;
};


export type QueryInvestigationPerformanceArgs = {
  where: UserContributionWhereInput;
};


export type QueryInvestigationRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<InvestigationRelayOrderInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: InvestigationRelayWhereInput;
};


export type QueryInvestigationSuccessRateArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryInvestigationTableReportArgs = {
  where: InvestigationTableWhereInput;
};


export type QueryInvestigationTimelineArgs = {
  months?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
};


export type QueryInvestigationsArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<Array<InvestigationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InvestigationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type QueryInvestigationsByTypeArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryIsPasswordDisabledArgs = {
  email: Scalars['String'];
};


export type QueryLatestIncidentArgs = {
  where: DashboardInput;
};


export type QueryLatestIncidentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  where: DashboardInput;
};


export type QueryLatestVehiclesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  where: DashboardInput;
};


export type QueryListActionsArgs = {
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type QueryListArticlesArgs = {
  order?: InputMaybe<ArticleOrderByWithRelationInput>;
  scheme: SchemeWhereUniqueInput;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type QueryListArticlesRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ArticleOrderByWithRelationInput>;
  scheme: SchemeWhereUniqueInput;
  where?: InputMaybe<ArticleWhereInput>;
};


export type QueryListBusinessQuestionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BusinessQuestionWhereInput>;
};


export type QueryListBusinessesArgs = {
  orderBy?: InputMaybe<Array<BusinessOrderBy>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BusinessWhereInput>;
};


export type QueryListCrimeGroupsArgs = {
  order?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CrimeGroupWhereInput>;
};


export type QueryListCustomGalleriesArgs = {
  order?: InputMaybe<CustomGalleryOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CustomGalleryWhereInput>;
};


export type QueryListDemBusinessEvidenceArgs = {
  recycled?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: Scalars['String'];
};


export type QueryListDemCompaniesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryListDemDeviceEvidenceArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: Scalars['String'];
};


export type QueryListDemEvidenceArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: Scalars['String'];
};


export type QueryListDemEvidenceExtendedWithoutUserArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: Scalars['String'];
};


export type QueryListDemEvidenceRecycleArgs = {
  recycled: Scalars['Boolean'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryListDemUsersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: Scalars['String'];
};


export type QueryListFeedItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<Scalars['String']>>;
  order?: InputMaybe<FeedItemOrderByWithRelationInput>;
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
};


export type QueryListGoodsTypesArgs = {
  where?: InputMaybe<ListGoodsTypeWhere>;
};


export type QueryListIncidentTagsArgs = {
  where: IncidentTagsInput;
};


export type QueryListIncidentTagsControlArgs = {
  where: IncidentTagsInput;
};


export type QueryListIncidentsArgs = {
  after?: InputMaybe<IncidentWhereUniqueInput>;
  order?: InputMaybe<IncidentOrderByWithRelationInput>;
  scheme: SchemeWhereUniqueInput;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type QueryListIncidentsAllSchemesArgs = {
  after?: InputMaybe<IncidentWhereUniqueInput>;
  order?: InputMaybe<IncidentOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type QueryListInvestigationsArgs = {
  order?: InputMaybe<InvestigationOrderByWithRelationInput>;
  scheme: SchemeWhereUniqueInput;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type QueryListInvestigationsAllSchemesArgs = {
  order?: InputMaybe<InvestigationOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type QueryListLoginEventsArgs = {
  orderBy?: InputMaybe<Array<LoginEventOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LoginEventWhereInput>;
};


export type QueryListNotificationsArgs = {
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type QueryListOffendersArgs = {
  after?: InputMaybe<OffenderWhereUniqueInput>;
  hasNoIncidents?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<OffenderOrderByWithRelationInput>;
  scheme: SchemeWhereUniqueInput;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type QueryListOffendersAllSchemesArgs = {
  after?: InputMaybe<OffenderWhereUniqueInput>;
  order?: InputMaybe<OffenderOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type QueryListOffendersRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hasNoIncidents?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<OffenderOrderByWithRelationInput>;
  orderByValue?: InputMaybe<SortOrder>;
  policeAreas?: InputMaybe<Array<PoliceForce>>;
  scheme?: InputMaybe<SchemeWhereUniqueInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type QueryListRekMatchesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RekMatchWhereInput>;
};


export type QueryListStockItemsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<StockItemsWhereInput>;
};


export type QueryListTagsArgs = {
  order?: InputMaybe<TagOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};


export type QueryListTodosArgs = {
  orderBy?: InputMaybe<Array<TodoOrderBy>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};


export type QueryListUserContributionArgs = {
  orderBy?: InputMaybe<UserContributionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: UserContributionWhereInput;
};


export type QueryListUserNotificationsArgs = {
  cursor?: InputMaybe<UserNotificationWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserNotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserNotificationWhereInput>;
};


export type QueryListUsersArgs = {
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryListVehiclesArgs = {
  order?: InputMaybe<VehicleOrderByWithRelationInput>;
  policeAreas?: InputMaybe<Array<PoliceForce>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
};


export type QueryLoginEventArgs = {
  where: LoginEventWhereUniqueInput;
};


export type QueryLoginEventsArgs = {
  cursor?: InputMaybe<LoginEventWhereUniqueInput>;
  distinct?: InputMaybe<Array<LoginEventScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<LoginEventOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LoginEventWhereInput>;
};


export type QueryLpStockLossReportArgs = {
  businessHotspotsOrderBy?: InputMaybe<LpStockLossBusinessHotspotsOrderBy>;
  businessId?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  goodsTypeId?: InputMaybe<Scalars['String']>;
  goodsTypeOrderBy?: InputMaybe<LpStockLossGoodsTypeOrderBy>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  offenderOrderBy?: InputMaybe<LpStockLossOffenderOrderBy>;
  schemeId?: InputMaybe<Scalars['String']>;
  sections?: InputMaybe<Array<LpStockLossSection>>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  stockItemId?: InputMaybe<Scalars['String']>;
  topItemsOrderBy?: InputMaybe<LpStockLossTopItemsOrderBy>;
};


export type QueryMentionableUsersArgs = {
  chatId?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryMessageArgs = {
  where: MessageWhereUniqueInput;
};


export type QueryMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type QueryMg11Args = {
  where: Mg11WhereUniqueInput;
};


export type QueryNotificationRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: NotificationRelayWhereInput;
};


export type QueryOffenderArgs = {
  where: OffenderWhereUniqueInput;
};


export type QueryOffenderByNameArgs = {
  name: Scalars['String'];
};


export type QueryOffenderEngagementArgs = {
  offenderId: Scalars['String'];
};


export type QueryOffenderFeedArgs = {
  active?: InputMaybe<Scalars['Boolean']>;
  after?: InputMaybe<Scalars['String']>;
  approved?: InputMaybe<Scalars['Boolean']>;
  banned?: InputMaybe<Scalars['Boolean']>;
  ethnicity?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  first?: InputMaybe<Scalars['Int']>;
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order?: InputMaybe<OffenderOrderByWithRelationInput>;
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  sex?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  userId: Scalars['String'];
};


export type QueryOffenderLinkMapArgs = {
  where: OffenderLinkMapWhere;
};


export type QueryOffenderReportArgs = {
  where: OffenderReportInput;
};


export type QueryOffenderTableReportArgs = {
  where: OffenderTableWhereInput;
};


export type QueryOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type QueryOffendersPerformanceArgs = {
  where: UserContributionWhereInput;
};


export type QueryPatrolCheckpointArgs = {
  id: Scalars['ID'];
};


export type QueryPatrolCheckpointsArgs = {
  active?: InputMaybe<Scalars['Boolean']>;
  businessId?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PatrolCheckpointType>;
};


export type QueryPatrolRoutesArgs = {
  active?: InputMaybe<Scalars['Boolean']>;
  businessId?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
};


export type QueryPatrolRunArgs = {
  id: Scalars['ID'];
};


export type QueryPatrolRunsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<PatrolRunStatus>;
};


export type QueryPendingCriticalBulletinsArgs = {
  schemeId: Scalars['String'];
};


export type QueryPendingLoginPromptVideosArgs = {
  schemeId: Scalars['String'];
};


export type QueryPerformanceReportArgs = {
  where: UserContributionWhereInput;
};


export type QueryPlatformFeatureUsageArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryPlatformUsageBreakdownArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryPoliceEngagementOverviewArgs = {
  sourceSchemeId?: InputMaybe<Scalars['String']>;
};


export type QueryPoliceHubConfigArgs = {
  monthsBack?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
};


export type QueryPoliceHubDashboardArgs = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  minPriorityScore?: InputMaybe<Scalars['Int']>;
  policeForce?: InputMaybe<Scalars['String']>;
  policeHubId?: InputMaybe<Scalars['String']>;
  schemeIds?: InputMaybe<Array<Scalars['String']>>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};


export type QueryPoliceHubSchemesRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoliceHubRelayOrderInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoliceHubRelayWhereInput>;
};


export type QueryPoliceHubViewArgs = {
  policeHubId: Scalars['String'];
};


export type QueryPoliceMatchArgs = {
  where: PoliceMatchWhereUniqueInput;
};


export type QueryPoliceMatchesRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoliceMatchRelayOrderInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoliceMatchRelayWhereInput>;
};


export type QueryPoliceTriageByStoreArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryPoliceTriageStatisticsArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['Date']>;
};


export type QueryPreviewIncidentExportArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: IncidentExportInput;
};


export type QueryQuestionArgs = {
  where: QuestionWhereUniqueInput;
};


export type QueryQuestionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where: QuestionsListWhere;
};


export type QueryRecidivismAverageArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  minIncidents?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryRecidivismPatternsTrendArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  minIncidents?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
};


export type QueryRecycledItemArgs = {
  where: RecycledItemWhereUniqueInput;
};


export type QueryRecycledItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  dataType?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<RecycledItemOrderByWithRelationInput>;
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryRecycledItemsCountArgs = {
  dataType?: InputMaybe<Array<Scalars['String']>>;
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryRepeatOffenderDetailsArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  minIncidents?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryRepeatOffenderOverviewArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  minIncidents?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
  sortBy?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryReportGroupArgs = {
  where: UniqueId;
};


export type QueryReportGroupsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: ReportGroupWhere;
};


export type QueryReportTemplateArgs = {
  where: ReportTemplateWhereUniqueInput;
};


export type QueryReportTemplatesArgs = {
  cursor?: InputMaybe<ReportTemplateWhereUniqueInput>;
  distinct?: InputMaybe<Array<ReportTemplateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ReportTemplateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ReportTemplateWhereInput>;
};


export type QueryReportUserLoginArgs = {
  device: DeviceInfo;
  platform: Scalars['Int'];
};


export type QueryReportsCentreArgs = {
  where: ReportsCentreWhereInput;
};


export type QueryRetailAdminDashboardArgs = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  schemeId?: InputMaybe<Scalars['String']>;
  sections?: InputMaybe<Array<RetailAdminDashboardSection>>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};


export type QueryRoleArgs = {
  where: CustomRoleWhereUniqueInput;
};


export type QueryRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CustomRoleOrderByWithRelationInput>;
  roleId?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QuerySchemeArgs = {
  where: SchemeWhereUniqueInput;
};


export type QuerySchemeDashboardStatsArgs = {
  schemeId: Scalars['String'];
};


export type QuerySchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};


export type QuerySearchAudioIncidentGoodsArgs = {
  barcode?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  searchTerm?: InputMaybe<Scalars['String']>;
};


export type QuerySearchOffendersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<SearchOffenderSort>;
  where: SearchOffenderWhere;
};


export type QuerySharedCrimeGroupArgs = {
  where: SharedCrimeGroupWhereUniqueInput;
};


export type QuerySharedCrimeGroupRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SharedCrimeGroupRelayOrderInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SharedCrimeGroupRelayWhereInput>;
};


export type QuerySharedIncidentArgs = {
  where: SharedIncidentWhereUniqueInput;
};


export type QuerySharedIncidentHeatmapArgs = {
  where?: InputMaybe<SharedIncidentRelayWhereInput>;
};


export type QuerySharedIncidentRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SharedIncidentRelayOrderInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SharedIncidentRelayWhereInput>;
};


export type QuerySharedOffenderArgs = {
  where: SharedOffenderWhereUniqueInput;
};


export type QuerySharedOffenderRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SharedOffenderRelayOrderInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SharedOffenderRelayWhereInput>;
};


export type QuerySharedVehicleArgs = {
  where: SharedVehicleWhereUniqueInput;
};


export type QuerySharedVehicleRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SharedVehicleRelayOrderInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SharedVehicleRelayWhereInput>;
};


export type QuerySharingBusinessesArgs = {
  destination: Scalars['String'];
  destinationGroups?: InputMaybe<Array<Scalars['String']>>;
  origin: Scalars['String'];
  originGroups?: InputMaybe<Array<Scalars['String']>>;
};


export type QuerySharingConfigArgs = {
  where: SharingConfigWhereUniqueInput;
};


export type QuerySharingConfigsArgs = {
  cursor?: InputMaybe<SharingConfigWhereUniqueInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SharingConfigWhereInput>;
};


export type QueryShoeArgs = {
  where: ShoeWhereUniqueInput;
};


export type QueryShoesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ShoeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ShoeWhereInput>;
};


export type QueryStatementTemplateArgs = {
  where: StatementTemplateWhereUniqueInput;
};


export type QueryStatementTemplatesArgs = {
  cursor?: InputMaybe<StatementTemplateWhereUniqueInput>;
  distinct?: InputMaybe<Array<StatementTemplateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<StatementTemplateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<StatementTemplateWhereInput>;
};


export type QueryStockItemsRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<StockItemRelayOrderInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: StockItemRelayWhereInput;
};


export type QueryStockItemsRelayFastArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  includeTotalCount?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<StockItemRelayOrderInput>;
  where: StockItemRelayWhereInput;
};


export type QueryStockItemsSearchArgs = {
  after?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<StockItemRelayOrderInput>;
  take?: InputMaybe<Scalars['Int']>;
  where: StockItemRelayWhereInput;
};


export type QueryStockRemovalReasonOptionsArgs = {
  schemeId: Scalars['String'];
};


export type QueryStockRemovalRequestArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: UniqueId;
};


export type QueryStockRemovalRequestsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<StockRemovalRequestsOrderBy>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: StockRemovalRequestsWhere;
};


export type QueryStoreColleagueDashboardArgs = {
  businessId: Scalars['String'];
  schemeId?: InputMaybe<Scalars['String']>;
  sections?: InputMaybe<Array<StoreColleagueDashboardSection>>;
  watchlistRadiusMeters?: InputMaybe<Scalars['Float']>;
};


export type QueryTableReportArgs = {
  where: UniqueId;
};


export type QueryTagArgs = {
  where: TagWhereUniqueInput;
};


export type QueryTagsArgs = {
  after?: InputMaybe<TagWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  where?: InputMaybe<TagWhereInput>;
};


export type QueryTargetedGoodsArgs = {
  where: UserContributionWhereInput;
};


export type QueryTargetedGoodsDashboardArgs = {
  where: DashboardInput;
};


export type QueryTermArgs = {
  where: UniqueId;
};


export type QueryTierArgs = {
  where: TierWhereUniqueInput;
};


export type QueryTiersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<TierWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TierOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TierWhereInput>;
};


export type QueryTodoArgs = {
  where: TodoWhereUniqueInput;
};


export type QueryTodoExportRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TodoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: TodoRelayWhereInput;
};


export type QueryTodoRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TodoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: TodoRelayWhereInput;
};


export type QueryTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<Array<TodoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TodoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};


export type QueryTotalLossArgs = {
  where: DashboardInput;
};


export type QueryTotalUserSessionsGraphArgs = {
  take?: InputMaybe<Scalars['Int']>;
  where: UserIncidentsCountGraphInput;
};


export type QueryTrainingVideoArgs = {
  id: Scalars['String'];
};


export type QueryTrainingVideoAuditArgs = {
  trainingVideoId: Scalars['String'];
};


export type QueryTrainingVideosArgs = {
  orderBy?: InputMaybe<Array<TrainingVideoOrderByInput>>;
  schemeId: Scalars['String'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TrainingVideoWhereInput>;
};


export type QueryTranslateTextArgs = {
  data: TranslateTextInput;
};


export type QueryUnrestrictedIncidentsRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<IncidentOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: UnrestrictedIncidentRelayInput;
};


export type QueryUnrestrictedOffendersRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OffenderOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: UnrestrictedOffenderRelayInput;
};


export type QueryUpdatesArgs = {
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUserActivityGaugeArgs = {
  daysPeriod?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserChatArgs = {
  where: UserChatWhereUniqueInput;
};


export type QueryUserChatsArgs = {
  cursor?: InputMaybe<UserChatWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserChatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserChatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserChatWhereInput>;
};


export type QueryUserContributionsArgs = {
  orderBy?: InputMaybe<UserContributionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: UserContributionWhereInput;
};


export type QueryUserEngagementActivityArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryUserEngagementDepthArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryUserGroupRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserGroupsReplayWhere>;
};


export type QueryUserIncidentCountGraphArgs = {
  take?: InputMaybe<Scalars['Int']>;
  where: UserIncidentsCountGraphInput;
};


export type QueryUserNewArgs = {
  id: Scalars['String'];
};


export type QueryUserNotificationArgs = {
  where: UserNotificationWhereUniqueInput;
};


export type QueryUserNotificationsArgs = {
  cursor?: InputMaybe<UserNotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserNotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserNotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserNotificationWhereInput>;
};


export type QueryUserPlatformPreferencesArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryUserSchemeArgs = {
  where: UserSchemeWhereUniqueInput;
};


export type QueryUserSchemesArgs = {
  cursor?: InputMaybe<UserSchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserSchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserSchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserSchemeWhereInput>;
};


export type QueryUserSessionsGraphArgs = {
  take?: InputMaybe<Scalars['Int']>;
  where: UserIncidentsCountGraphInput;
};


export type QueryUsersArgs = {
  after?: InputMaybe<UserWhereUniqueInput>;
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersOnlineArgs = {
  where: Scalars['String'];
};


export type QueryUsersRelayArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: UserRelayWhereInput;
};


export type QueryUsersRelayAdminArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<UserOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: UserRelayAdminWhereInput;
};


export type QueryVehicleArgs = {
  where: VehicleWhereUniqueInput;
};


export type QueryWorkflowArgs = {
  where: WorkflowWhereUniqueInput;
};


export type QueryWorkflowsArgs = {
  cursor?: InputMaybe<WorkflowWhereUniqueInput>;
  distinct?: InputMaybe<Array<WorkflowScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<WorkflowOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WorkflowWhereInput>;
};

export type QueryActiveChecklistExportPreviewConnection = {
  __typename?: 'QueryActiveChecklistExportPreviewConnection';
  edges: Array<QueryActiveChecklistExportPreviewConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryActiveChecklistExportPreviewConnectionEdge = {
  __typename?: 'QueryActiveChecklistExportPreviewConnectionEdge';
  cursor: Scalars['String'];
  node: ActiveChecklist;
};

export type QueryActiveChecklistsConnection = {
  __typename?: 'QueryActiveChecklistsConnection';
  edges: Array<QueryActiveChecklistsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryActiveChecklistsConnectionEdge = {
  __typename?: 'QueryActiveChecklistsConnectionEdge';
  cursor: Scalars['String'];
  node: ActiveChecklist;
};

export type QueryAiSuggestionsConnection = {
  __typename?: 'QueryAiSuggestionsConnection';
  edges: Array<QueryAiSuggestionsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryAiSuggestionsConnectionEdge = {
  __typename?: 'QueryAiSuggestionsConnectionEdge';
  cursor: Scalars['String'];
  node: AiSuggestion;
};

export type QueryAiVisionCamerasConnection = {
  __typename?: 'QueryAiVisionCamerasConnection';
  edges: Array<QueryAiVisionCamerasConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryAiVisionCamerasConnectionEdge = {
  __typename?: 'QueryAiVisionCamerasConnectionEdge';
  cursor: Scalars['String'];
  node: AiVisionCamera;
};

export type QueryAiVisionEventsConnection = {
  __typename?: 'QueryAiVisionEventsConnection';
  edges: Array<QueryAiVisionEventsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryAiVisionEventsConnectionEdge = {
  __typename?: 'QueryAiVisionEventsConnectionEdge';
  cursor: Scalars['String'];
  node: AiVisionEvent;
};

export type QueryAiVisionMatchesConnection = {
  __typename?: 'QueryAiVisionMatchesConnection';
  edges: Array<QueryAiVisionMatchesConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryAiVisionMatchesConnectionEdge = {
  __typename?: 'QueryAiVisionMatchesConnectionEdge';
  cursor: Scalars['String'];
  node: AiVisionMatch;
};

export type QueryBillingCustomersConnection = {
  __typename?: 'QueryBillingCustomersConnection';
  edges: Array<QueryBillingCustomersConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryBillingCustomersConnectionEdge = {
  __typename?: 'QueryBillingCustomersConnectionEdge';
  cursor: Scalars['String'];
  node: BillingCustomer;
};

export type QueryBrandsConnection = {
  __typename?: 'QueryBrandsConnection';
  edges: Array<QueryBrandsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryBrandsConnectionEdge = {
  __typename?: 'QueryBrandsConnectionEdge';
  cursor: Scalars['String'];
  node: Brand;
};

export type QueryBusinessQuestionRelayConnection = {
  __typename?: 'QueryBusinessQuestionRelayConnection';
  edges: Array<QueryBusinessQuestionRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryBusinessQuestionRelayConnectionEdge = {
  __typename?: 'QueryBusinessQuestionRelayConnectionEdge';
  cursor: Scalars['String'];
  node: BusinessQuestion;
};

export type QueryBusinessRelayAdminConnection = {
  __typename?: 'QueryBusinessRelayAdminConnection';
  edges: Array<QueryBusinessRelayAdminConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryBusinessRelayAdminConnectionEdge = {
  __typename?: 'QueryBusinessRelayAdminConnectionEdge';
  cursor: Scalars['String'];
  node: Business;
};

export type QueryBusinessRelayConnection = {
  __typename?: 'QueryBusinessRelayConnection';
  edges: Array<QueryBusinessRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryBusinessRelayConnectionEdge = {
  __typename?: 'QueryBusinessRelayConnectionEdge';
  cursor: Scalars['String'];
  node: Business;
};

export type QueryCrimeGroupsConnection = {
  __typename?: 'QueryCrimeGroupsConnection';
  edges: Array<QueryCrimeGroupsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryCrimeGroupsConnectionEdge = {
  __typename?: 'QueryCrimeGroupsConnectionEdge';
  cursor: Scalars['String'];
  node: CrimeGroup;
};

export type QueryCustomGalleriesRelayConnection = {
  __typename?: 'QueryCustomGalleriesRelayConnection';
  edges: Array<QueryCustomGalleriesRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryCustomGalleriesRelayConnectionEdge = {
  __typename?: 'QueryCustomGalleriesRelayConnectionEdge';
  cursor: Scalars['String'];
  node: CustomGallery;
};

export type QueryDashboardsConnection = {
  __typename?: 'QueryDashboardsConnection';
  edges: Array<QueryDashboardsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryDashboardsConnectionEdge = {
  __typename?: 'QueryDashboardsConnectionEdge';
  cursor: Scalars['String'];
  node: Dashboard;
};

export type QueryDemDevicesConnection = {
  __typename?: 'QueryDemDevicesConnection';
  edges: Array<QueryDemDevicesConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryDemDevicesConnectionEdge = {
  __typename?: 'QueryDemDevicesConnectionEdge';
  cursor: Scalars['String'];
  node: DemDevice;
};

export type QueryDemGroupsConnection = {
  __typename?: 'QueryDemGroupsConnection';
  edges: Array<QueryDemGroupsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryDemGroupsConnectionEdge = {
  __typename?: 'QueryDemGroupsConnectionEdge';
  cursor: Scalars['String'];
  node: DemGroup;
};

export type QueryDetectionConfigsConnection = {
  __typename?: 'QueryDetectionConfigsConnection';
  edges: Array<QueryDetectionConfigsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryDetectionConfigsConnectionEdge = {
  __typename?: 'QueryDetectionConfigsConnectionEdge';
  cursor: Scalars['String'];
  node: DetectActionConfig;
};

export type QueryDocumentsConnection = {
  __typename?: 'QueryDocumentsConnection';
  edges: Array<QueryDocumentsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryDocumentsConnectionEdge = {
  __typename?: 'QueryDocumentsConnectionEdge';
  cursor: Scalars['String'];
  node: Document;
};

export type QueryDocumentsNoFolderConnection = {
  __typename?: 'QueryDocumentsNoFolderConnection';
  edges: Array<QueryDocumentsNoFolderConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryDocumentsNoFolderConnectionEdge = {
  __typename?: 'QueryDocumentsNoFolderConnectionEdge';
  cursor: Scalars['String'];
  node: Document;
};

export type QueryFeedRelayConnection = {
  __typename?: 'QueryFeedRelayConnection';
  edges: Array<QueryFeedRelayConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryFeedRelayConnectionEdge = {
  __typename?: 'QueryFeedRelayConnectionEdge';
  cursor: Scalars['String'];
  node: FeedItem;
};

export type QueryFoldersConnection = {
  __typename?: 'QueryFoldersConnection';
  edges: Array<QueryFoldersConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryFoldersConnectionEdge = {
  __typename?: 'QueryFoldersConnectionEdge';
  cursor: Scalars['String'];
  node: Folder;
};

export type QueryIncidentItemsConnection = {
  __typename?: 'QueryIncidentItemsConnection';
  edges: Array<QueryIncidentItemsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryIncidentItemsConnectionEdge = {
  __typename?: 'QueryIncidentItemsConnectionEdge';
  cursor: Scalars['String'];
  node: IncidentItem;
};

export type QueryIncidentMapRelayConnection = {
  __typename?: 'QueryIncidentMapRelayConnection';
  edges: Array<QueryIncidentMapRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryIncidentMapRelayConnectionEdge = {
  __typename?: 'QueryIncidentMapRelayConnectionEdge';
  cursor: Scalars['String'];
  node: Incident;
};

export type QueryIncidentRelaySimpleConnection = {
  __typename?: 'QueryIncidentRelaySimpleConnection';
  edges: Array<QueryIncidentRelaySimpleConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryIncidentRelaySimpleConnectionEdge = {
  __typename?: 'QueryIncidentRelaySimpleConnectionEdge';
  cursor: Scalars['String'];
  node: Incident;
};

export type QueryIncidentsRelayConnection = {
  __typename?: 'QueryIncidentsRelayConnection';
  edges: Array<QueryIncidentsRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryIncidentsRelayConnectionEdge = {
  __typename?: 'QueryIncidentsRelayConnectionEdge';
  cursor: Scalars['String'];
  node: Incident;
};

export type QueryInvestigationRelayConnection = {
  __typename?: 'QueryInvestigationRelayConnection';
  edges: Array<QueryInvestigationRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryInvestigationRelayConnectionEdge = {
  __typename?: 'QueryInvestigationRelayConnectionEdge';
  cursor: Scalars['String'];
  node: Investigation;
};

export type QueryLatestIncidentsConnection = {
  __typename?: 'QueryLatestIncidentsConnection';
  edges: Array<QueryLatestIncidentsConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryLatestIncidentsConnectionEdge = {
  __typename?: 'QueryLatestIncidentsConnectionEdge';
  cursor: Scalars['String'];
  node: Incident;
};

export type QueryLatestVehiclesConnection = {
  __typename?: 'QueryLatestVehiclesConnection';
  edges: Array<QueryLatestVehiclesConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryLatestVehiclesConnectionEdge = {
  __typename?: 'QueryLatestVehiclesConnectionEdge';
  cursor: Scalars['String'];
  node: Vehicle;
};

export type QueryListArticlesRelayConnection = {
  __typename?: 'QueryListArticlesRelayConnection';
  edges: Array<QueryListArticlesRelayConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryListArticlesRelayConnectionEdge = {
  __typename?: 'QueryListArticlesRelayConnectionEdge';
  cursor: Scalars['String'];
  node: Article;
};

export type QueryListOffendersRelayConnection = {
  __typename?: 'QueryListOffendersRelayConnection';
  edges: Array<QueryListOffendersRelayConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryListOffendersRelayConnectionEdge = {
  __typename?: 'QueryListOffendersRelayConnectionEdge';
  cursor: Scalars['String'];
  node: Offender;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type QueryNotificationRelayConnection = {
  __typename?: 'QueryNotificationRelayConnection';
  edges: Array<QueryNotificationRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryNotificationRelayConnectionEdge = {
  __typename?: 'QueryNotificationRelayConnectionEdge';
  cursor: Scalars['String'];
  node: UserNotification;
};

export type QueryPoliceHubSchemesRelayConnection = {
  __typename?: 'QueryPoliceHubSchemesRelayConnection';
  edges: Array<QueryPoliceHubSchemesRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryPoliceHubSchemesRelayConnectionEdge = {
  __typename?: 'QueryPoliceHubSchemesRelayConnectionEdge';
  cursor: Scalars['String'];
  node: Scheme;
};

export type QueryPoliceMatchesRelayConnection = {
  __typename?: 'QueryPoliceMatchesRelayConnection';
  edges: Array<QueryPoliceMatchesRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryPoliceMatchesRelayConnectionEdge = {
  __typename?: 'QueryPoliceMatchesRelayConnectionEdge';
  cursor: Scalars['String'];
  node: PoliceMatch;
};

export type QueryQuestionsConnection = {
  __typename?: 'QueryQuestionsConnection';
  edges: Array<QueryQuestionsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryQuestionsConnectionEdge = {
  __typename?: 'QueryQuestionsConnectionEdge';
  cursor: Scalars['String'];
  node: Question;
};

export type QueryReportGroupsConnection = {
  __typename?: 'QueryReportGroupsConnection';
  edges: Array<QueryReportGroupsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryReportGroupsConnectionEdge = {
  __typename?: 'QueryReportGroupsConnectionEdge';
  cursor: Scalars['String'];
  node: ReportGroup;
};

export type QueryRolesConnection = {
  __typename?: 'QueryRolesConnection';
  edges: Array<QueryRolesConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryRolesConnectionEdge = {
  __typename?: 'QueryRolesConnectionEdge';
  cursor: Scalars['String'];
  node: CustomRole;
};

export type QuerySearchOffendersConnection = {
  __typename?: 'QuerySearchOffendersConnection';
  edges: Array<QuerySearchOffendersConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QuerySearchOffendersConnectionEdge = {
  __typename?: 'QuerySearchOffendersConnectionEdge';
  cursor: Scalars['String'];
  node: Offender;
};

export type QuerySharedCrimeGroupRelayConnection = {
  __typename?: 'QuerySharedCrimeGroupRelayConnection';
  edges: Array<QuerySharedCrimeGroupRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QuerySharedCrimeGroupRelayConnectionEdge = {
  __typename?: 'QuerySharedCrimeGroupRelayConnectionEdge';
  cursor: Scalars['String'];
  node: SharedCrimeGroup;
};

export type QuerySharedIncidentRelayConnection = {
  __typename?: 'QuerySharedIncidentRelayConnection';
  edges: Array<QuerySharedIncidentRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QuerySharedIncidentRelayConnectionEdge = {
  __typename?: 'QuerySharedIncidentRelayConnectionEdge';
  cursor: Scalars['String'];
  node: SharedIncident;
};

export type QuerySharedOffenderRelayConnection = {
  __typename?: 'QuerySharedOffenderRelayConnection';
  edges: Array<QuerySharedOffenderRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QuerySharedOffenderRelayConnectionEdge = {
  __typename?: 'QuerySharedOffenderRelayConnectionEdge';
  cursor: Scalars['String'];
  node: SharedOffender;
};

export type QuerySharedVehicleRelayConnection = {
  __typename?: 'QuerySharedVehicleRelayConnection';
  edges: Array<QuerySharedVehicleRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QuerySharedVehicleRelayConnectionEdge = {
  __typename?: 'QuerySharedVehicleRelayConnectionEdge';
  cursor: Scalars['String'];
  node: SharedVehicle;
};

export type QueryShoesConnection = {
  __typename?: 'QueryShoesConnection';
  edges: Array<QueryShoesConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryShoesConnectionEdge = {
  __typename?: 'QueryShoesConnectionEdge';
  cursor: Scalars['String'];
  node: Shoe;
};

export type QueryStockItemsRelayConnection = {
  __typename?: 'QueryStockItemsRelayConnection';
  edges: Array<QueryStockItemsRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryStockItemsRelayConnectionEdge = {
  __typename?: 'QueryStockItemsRelayConnectionEdge';
  cursor: Scalars['String'];
  node: StockItem;
};

export type QueryStockItemsRelayFastConnection = {
  __typename?: 'QueryStockItemsRelayFastConnection';
  edges: Array<QueryStockItemsRelayFastConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryStockItemsRelayFastConnectionEdge = {
  __typename?: 'QueryStockItemsRelayFastConnectionEdge';
  cursor: Scalars['String'];
  node: StockItem;
};

export type QueryStockRemovalRequestsConnection = {
  __typename?: 'QueryStockRemovalRequestsConnection';
  edges: Array<QueryStockRemovalRequestsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryStockRemovalRequestsConnectionEdge = {
  __typename?: 'QueryStockRemovalRequestsConnectionEdge';
  cursor: Scalars['String'];
  node: StockRemovalRequest;
};

export type QueryTiersConnection = {
  __typename?: 'QueryTiersConnection';
  edges: Array<QueryTiersConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryTiersConnectionEdge = {
  __typename?: 'QueryTiersConnectionEdge';
  cursor: Scalars['String'];
  node: Tier;
};

export type QueryTodoExportRelayConnection = {
  __typename?: 'QueryTodoExportRelayConnection';
  edges: Array<QueryTodoExportRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryTodoExportRelayConnectionEdge = {
  __typename?: 'QueryTodoExportRelayConnectionEdge';
  cursor: Scalars['String'];
  node: Todo;
};

export type QueryTodoRelayConnection = {
  __typename?: 'QueryTodoRelayConnection';
  edges: Array<QueryTodoRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryTodoRelayConnectionEdge = {
  __typename?: 'QueryTodoRelayConnectionEdge';
  cursor: Scalars['String'];
  node: Todo;
};

export type QueryUnrestrictedIncidentsRelayConnection = {
  __typename?: 'QueryUnrestrictedIncidentsRelayConnection';
  edges: Array<QueryUnrestrictedIncidentsRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryUnrestrictedIncidentsRelayConnectionEdge = {
  __typename?: 'QueryUnrestrictedIncidentsRelayConnectionEdge';
  cursor: Scalars['String'];
  node: Incident;
};

export type QueryUnrestrictedOffendersRelayConnection = {
  __typename?: 'QueryUnrestrictedOffendersRelayConnection';
  edges: Array<QueryUnrestrictedOffendersRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryUnrestrictedOffendersRelayConnectionEdge = {
  __typename?: 'QueryUnrestrictedOffendersRelayConnectionEdge';
  cursor: Scalars['String'];
  node: Offender;
};

export type QueryUserGroupRelayConnection = {
  __typename?: 'QueryUserGroupRelayConnection';
  edges: Array<QueryUserGroupRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryUserGroupRelayConnectionEdge = {
  __typename?: 'QueryUserGroupRelayConnectionEdge';
  cursor: Scalars['String'];
  node: Group;
};

export type QueryUsersRelayAdminConnection = {
  __typename?: 'QueryUsersRelayAdminConnection';
  edges: Array<QueryUsersRelayAdminConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryUsersRelayAdminConnectionEdge = {
  __typename?: 'QueryUsersRelayAdminConnectionEdge';
  cursor: Scalars['String'];
  node: User;
};

export type QueryUsersRelayConnection = {
  __typename?: 'QueryUsersRelayConnection';
  edges: Array<QueryUsersRelayConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type QueryUsersRelayConnectionEdge = {
  __typename?: 'QueryUsersRelayConnectionEdge';
  cursor: Scalars['String'];
  node: User;
};

export type Question = {
  __typename?: 'Question';
  activityCount: Scalars['Int'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  model: QuestionModel;
  options: Array<Scalars['JSON']>;
  optionsFormFormatted?: Maybe<Array<AnswerOption>>;
  optionsFormatted?: Maybe<Array<Scalars['String']>>;
  question: Scalars['String'];
  questionFormatted: Scalars['String'];
  questionGroup: Array<QuestionGroup>;
  questionOn: QuestionModel;
  questionTranslations: Array<Scalars['JSON']>;
  schemes: Array<Scheme>;
  tags: Array<TagQuestion>;
  tagsCount: Scalars['Int'];
  tasks: Array<TaskQuestion>;
  type: AnswerType;
  updatedAt: Scalars['Date'];
};

export type QuestionAnswerCount = {
  __typename?: 'QuestionAnswerCount';
  answers: Array<AnswerCount>;
  question: Scalars['String'];
};

export type QuestionGroup = {
  __typename?: 'QuestionGroup';
  createdAt: Scalars['Date'];
  defaultDueDate: Scalars['Int'];
  defaultForIncidents: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  questions: Array<Question>;
  requiredQuestionIds: Array<Scalars['String']>;
  schemes: Array<Scheme>;
};

export type QuestionGroupCreateInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  defaultDueDate?: InputMaybe<Scalars['Int']>;
  defaultForIncidents?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  questions?: InputMaybe<ConnectOnlyArrayHelper>;
  requiredQuestionIds?: InputMaybe<Array<Scalars['String']>>;
  schemes?: InputMaybe<ConnectOnlyArrayHelper>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type QuestionGroupListRelationFilter = {
  every?: InputMaybe<QuestionGroupWhereInput>;
  none?: InputMaybe<QuestionGroupWhereInput>;
  some?: InputMaybe<QuestionGroupWhereInput>;
};

export type QuestionGroupOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type QuestionGroupOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  defaultDueDate?: InputMaybe<SortOrder>;
  defaultForIncidents?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  questions?: InputMaybe<QuestionOrderByRelationAggregateInput>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum QuestionGroupScalarFieldEnum {
  CreatedAt = 'createdAt',
  DefaultDueDate = 'defaultDueDate',
  DefaultForIncidents = 'defaultForIncidents',
  Description = 'description',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type QuestionGroupUpdateInput = {
  defaultDueDate?: InputMaybe<SetIntHelper>;
  description?: InputMaybe<NullableSetStringHelper>;
  name?: InputMaybe<SetStringHelper>;
  questions?: InputMaybe<SetArrayHelper>;
  requiredQuestionIds?: InputMaybe<SetStringArrayHelper>;
};

export type QuestionGroupWhereInput = {
  AND?: InputMaybe<Array<QuestionGroupWhereInput>>;
  NOT?: InputMaybe<Array<QuestionGroupWhereInput>>;
  OR?: InputMaybe<Array<QuestionGroupWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  defaultDueDate?: InputMaybe<IntFilter>;
  defaultForIncidents?: InputMaybe<BoolFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  questions?: InputMaybe<QuestionListRelationFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type QuestionGroupWhereUniqueInput = {
  AND?: InputMaybe<Array<QuestionGroupWhereInput>>;
  NOT?: InputMaybe<Array<QuestionGroupWhereInput>>;
  OR?: InputMaybe<Array<QuestionGroupWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  defaultDueDate?: InputMaybe<IntFilter>;
  defaultForIncidents?: InputMaybe<BoolFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<StringFilter>;
  questions?: InputMaybe<QuestionListRelationFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type QuestionInput = {
  brandIds?: InputMaybe<Array<Scalars['String']>>;
  dependOn?: InputMaybe<DependInput>;
  order: Scalars['Int'];
  question: Scalars['String'];
  type: ChecklistAnswerType;
  weight?: InputMaybe<Array<AnswerWeightInput>>;
};

export type QuestionListRelationFilter = {
  every?: InputMaybe<QuestionWhereInput>;
  none?: InputMaybe<QuestionWhereInput>;
  some?: InputMaybe<QuestionWhereInput>;
};

export enum QuestionModel {
  Tag = 'TAG',
  Task = 'TASK'
}

export type QuestionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type QuestionOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  model?: InputMaybe<SortOrder>;
  options?: InputMaybe<SortOrder>;
  question?: InputMaybe<SortOrder>;
  questionGroup?: InputMaybe<QuestionGroupOrderByRelationAggregateInput>;
  questionTranslations?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  tags?: InputMaybe<TagQuestionOrderByRelationAggregateInput>;
  tasks?: InputMaybe<TaskQuestionOrderByRelationAggregateInput>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  workFlowActions?: InputMaybe<WorkflowActionOrderByRelationAggregateInput>;
};

export enum QuestionScalarFieldEnum {
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  Id = 'id',
  Model = 'model',
  Options = 'options',
  Question = 'question',
  QuestionTranslations = 'questionTranslations',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

export type QuestionWhereInput = {
  AND?: InputMaybe<Array<QuestionWhereInput>>;
  NOT?: InputMaybe<Array<QuestionWhereInput>>;
  OR?: InputMaybe<Array<QuestionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  model?: InputMaybe<EnumQuestionModelFilter>;
  options?: InputMaybe<JsonNullableListFilter>;
  question?: InputMaybe<StringFilter>;
  questionGroup?: InputMaybe<QuestionGroupListRelationFilter>;
  questionTranslations?: InputMaybe<JsonNullableListFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  tags?: InputMaybe<TagQuestionListRelationFilter>;
  tasks?: InputMaybe<TaskQuestionListRelationFilter>;
  type?: InputMaybe<EnumAnswerTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  workFlowActions?: InputMaybe<WorkflowActionListRelationFilter>;
};

export type QuestionWhereUniqueInput = {
  AND?: InputMaybe<Array<QuestionWhereInput>>;
  NOT?: InputMaybe<Array<QuestionWhereInput>>;
  OR?: InputMaybe<Array<QuestionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  id?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<EnumQuestionModelFilter>;
  options?: InputMaybe<JsonNullableListFilter>;
  question?: InputMaybe<StringFilter>;
  questionGroup?: InputMaybe<QuestionGroupListRelationFilter>;
  questionTranslations?: InputMaybe<JsonNullableListFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  tags?: InputMaybe<TagQuestionListRelationFilter>;
  tasks?: InputMaybe<TaskQuestionListRelationFilter>;
  type?: InputMaybe<EnumAnswerTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  workFlowActions?: InputMaybe<WorkflowActionListRelationFilter>;
};

export type QuestionsListWhere = {
  activityQuestions?: InputMaybe<Scalars['Boolean']>;
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  tagQuestions?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<Array<AnswerType>>;
};

export type QueuedIncidentExportResult = {
  __typename?: 'QueuedIncidentExportResult';
  /** Estimated time for completion */
  estimatedTime?: Maybe<Scalars['String']>;
  /** The ID of the queued export job */
  jobId: Scalars['String'];
  /** Status message for the user */
  message: Scalars['String'];
};

export type QueuedStockRemovalExportResult = {
  __typename?: 'QueuedStockRemovalExportResult';
  /** Estimated time for completion */
  estimatedTime?: Maybe<Scalars['String']>;
  /** The ID of the queued export job */
  jobId: Scalars['String'];
  /** Status message for the user */
  message: Scalars['String'];
};

export enum Race {
  Ic1 = 'IC1',
  Ic2 = 'IC2',
  Ic3 = 'IC3',
  Ic4 = 'IC4',
  Ic5 = 'IC5',
  Ic6 = 'IC6',
  Ic9 = 'IC9',
  Unknown = 'UNKNOWN'
}

export type RadialGraph = {
  __typename?: 'RadialGraph';
  data: Array<Graph>;
  label: Scalars['String'];
};

export type RadialValueGraph = {
  __typename?: 'RadialValueGraph';
  data: Array<Graph>;
  label: Scalars['String'];
  value: Scalars['Float'];
};

export type RecentViewActivity = {
  __typename?: 'RecentViewActivity';
  /** Date of activity */
  date: Scalars['Date'];
  /** Unique officers active */
  uniqueOfficers: Scalars['Int'];
  /** Total views on this date */
  viewCount: Scalars['Int'];
};

export type RecidivismAverage = {
  __typename?: 'RecidivismAverage';
  /** Average days between first and last incident for repeat offenders */
  averageDaysBetweenIncidents: Scalars['Float'];
  /** Average number of incidents per repeat offender */
  averageIncidentsPerOffender: Scalars['Float'];
  /** Distribution of repeat offenders across time periods */
  distribution: Scalars['JSON'];
  /** Maximum days between incidents */
  maxDaysBetweenIncidents: Scalars['Int'];
  /** Median days between first and last incident */
  medianDaysBetweenIncidents: Scalars['Float'];
  /** Minimum days between incidents */
  minDaysBetweenIncidents: Scalars['Int'];
  /** Monthly breakdown of average days between incidents */
  monthlyAverages: Array<MonthlyRecidivismAverage>;
  /** Total incidents from repeat offenders */
  totalIncidents: Scalars['Int'];
  /** Total number of repeat offenders in the period */
  totalRepeatOffenders: Scalars['Int'];
};

export type RecidivismMonthlyData = {
  __typename?: 'RecidivismMonthlyData';
  /** Average incidents per repeat offender */
  averageIncidentsPerOffender: Scalars['Float'];
  /** Breakdown by recidivism period */
  breakdowns: Array<RecidivismPeriodBreakdown>;
  /** Month label (e.g., "January 25") */
  month: Scalars['String'];
  /** Month number (1-12) */
  monthNumber: Scalars['Int'];
  /** Total incidents from repeat offenders */
  totalIncidents: Scalars['Int'];
  /** Total number of repeat offenders this month */
  totalRepeatOffenders: Scalars['Int'];
  /** Year */
  year: Scalars['Int'];
};

export type RecidivismPeriodBreakdown = {
  __typename?: 'RecidivismPeriodBreakdown';
  /** Average incident count for offenders in this period */
  averageIncidents: Scalars['Float'];
  /** Number of repeat offenders in this period */
  count: Scalars['Int'];
  /** Percentage of total repeat offenders */
  percentage: Scalars['Float'];
  /** Time period category (0-30, 31-90, 91-180, 180+) */
  period: Scalars['String'];
};

export type RecycleExtenstion = {
  __typename?: 'RecycleExtenstion';
  preservedTill?: Maybe<Scalars['Date']>;
  recycleDate?: Maybe<Scalars['Date']>;
};

export type RecycledItem = {
  __typename?: 'RecycledItem';
  deletedAt: Scalars['Date'];
  deletedBy?: Maybe<User>;
  expiresAt: Scalars['Date'];
  id: Scalars['ID'];
  incident?: Maybe<Incident>;
  offender?: Maybe<Offender>;
  scheme: Scheme;
  systemTask?: Maybe<Scalars['Boolean']>;
};

export type RecycledItemListRelationFilter = {
  every?: InputMaybe<RecycledItemWhereInput>;
  none?: InputMaybe<RecycledItemWhereInput>;
  some?: InputMaybe<RecycledItemWhereInput>;
};

export type RecycledItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RecycledItemOrderByWithRelationInput = {
  deletedAt?: InputMaybe<SortOrder>;
  deletedBy?: InputMaybe<UserOrderByWithRelationInput>;
  deletedById?: InputMaybe<SortOrder>;
  expiresAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  systemTask?: InputMaybe<SortOrder>;
  tag?: InputMaybe<TagOrderByWithRelationInput>;
  tagId?: InputMaybe<SortOrder>;
};

export enum RecycledItemScalarFieldEnum {
  DeletedAt = 'deletedAt',
  DeletedById = 'deletedById',
  ExpiresAt = 'expiresAt',
  Id = 'id',
  IncidentId = 'incidentId',
  OffenderId = 'offenderId',
  SchemeId = 'schemeId',
  SystemTask = 'systemTask',
  TagId = 'tagId'
}

export type RecycledItemScalarWhereInput = {
  AND?: InputMaybe<Array<RecycledItemScalarWhereInput>>;
  NOT?: InputMaybe<Array<RecycledItemScalarWhereInput>>;
  OR?: InputMaybe<Array<RecycledItemScalarWhereInput>>;
  deletedAt?: InputMaybe<DateTimeFilter>;
  deletedById?: InputMaybe<StringNullableFilter>;
  expiresAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  offenderId?: InputMaybe<StringNullableFilter>;
  schemeId?: InputMaybe<StringFilter>;
  systemTask?: InputMaybe<BoolFilter>;
  tagId?: InputMaybe<StringNullableFilter>;
};

export type RecycledItemScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<RecycledItemScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<RecycledItemScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<RecycledItemScalarWhereWithAggregatesInput>>;
  deletedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  deletedById?: InputMaybe<StringNullableWithAggregatesFilter>;
  expiresAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentId?: InputMaybe<StringNullableWithAggregatesFilter>;
  offenderId?: InputMaybe<StringNullableWithAggregatesFilter>;
  schemeId?: InputMaybe<StringWithAggregatesFilter>;
  systemTask?: InputMaybe<BoolWithAggregatesFilter>;
  tagId?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type RecycledItemWhereInput = {
  AND?: InputMaybe<Array<RecycledItemWhereInput>>;
  NOT?: InputMaybe<Array<RecycledItemWhereInput>>;
  OR?: InputMaybe<Array<RecycledItemWhereInput>>;
  deletedAt?: InputMaybe<DateTimeFilter>;
  deletedBy?: InputMaybe<UserWhereInput>;
  deletedById?: InputMaybe<StringNullableFilter>;
  expiresAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  systemTask?: InputMaybe<BoolFilter>;
  tag?: InputMaybe<TagWhereInput>;
  tagId?: InputMaybe<StringNullableFilter>;
};

export type RecycledItemWhereUniqueInput = {
  AND?: InputMaybe<Array<RecycledItemWhereInput>>;
  NOT?: InputMaybe<Array<RecycledItemWhereInput>>;
  OR?: InputMaybe<Array<RecycledItemWhereInput>>;
  deletedAt?: InputMaybe<DateTimeFilter>;
  deletedBy?: InputMaybe<UserWhereInput>;
  deletedById?: InputMaybe<StringNullableFilter>;
  expiresAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<Scalars['String']>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  systemTask?: InputMaybe<BoolFilter>;
  tag?: InputMaybe<TagWhereInput>;
  tagId?: InputMaybe<Scalars['String']>;
};

export type RefreshAuth = {
  __typename?: 'RefreshAuth';
  /** Access token used to authenticate requests to the API. */
  accessToken: Scalars['String'];
};

export type RegisterPushTokenData = {
  token: Scalars['String'];
};

export type RekCollection = {
  __typename?: 'RekCollection';
  collectionId: Scalars['String'];
  createdAt: Scalars['Date'];
  faces: Array<RekFace>;
  id: Scalars['ID'];
  name: Scalars['String'];
  schemes: Array<Scheme>;
  updatedAt: Scalars['Date'];
};

export type RekCollectionListRelationFilter = {
  every?: InputMaybe<RekCollectionWhereInput>;
  none?: InputMaybe<RekCollectionWhereInput>;
  some?: InputMaybe<RekCollectionWhereInput>;
};

export type RekCollectionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RekCollectionOrderByWithRelationInput = {
  collectionId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  faces?: InputMaybe<RekFaceOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum RekCollectionScalarFieldEnum {
  CollectionId = 'collectionId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type RekCollectionScalarWhereInput = {
  AND?: InputMaybe<Array<RekCollectionScalarWhereInput>>;
  NOT?: InputMaybe<Array<RekCollectionScalarWhereInput>>;
  OR?: InputMaybe<Array<RekCollectionScalarWhereInput>>;
  collectionId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RekCollectionScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<RekCollectionScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<RekCollectionScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<RekCollectionScalarWhereWithAggregatesInput>>;
  collectionId?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type RekCollectionWhereInput = {
  AND?: InputMaybe<Array<RekCollectionWhereInput>>;
  NOT?: InputMaybe<Array<RekCollectionWhereInput>>;
  OR?: InputMaybe<Array<RekCollectionWhereInput>>;
  collectionId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  faces?: InputMaybe<RekFaceListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RekCollectionWhereUniqueInput = {
  AND?: InputMaybe<Array<RekCollectionWhereInput>>;
  NOT?: InputMaybe<Array<RekCollectionWhereInput>>;
  OR?: InputMaybe<Array<RekCollectionWhereInput>>;
  collectionId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<DateTimeFilter>;
  faces?: InputMaybe<RekFaceListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RekFace = {
  __typename?: 'RekFace';
  boundingHeight?: Maybe<Scalars['Float']>;
  boundingLeft?: Maybe<Scalars['Float']>;
  boundingTop?: Maybe<Scalars['Float']>;
  boundingWidth?: Maybe<Scalars['Float']>;
  collection: RekCollection;
  collectionId: Scalars['String'];
  confidence?: Maybe<Scalars['Float']>;
  createdAt: Scalars['Date'];
  faceId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image: Image;
  imageId: Scalars['String'];
  offender?: Maybe<Offender>;
  qualityBrightness?: Maybe<Scalars['Float']>;
  qualitySharpness?: Maybe<Scalars['Float']>;
  rekMatchedFaces: Array<RekMatchedFace>;
  rekMatchedSearches: Array<RekMatch>;
  updatedAt: Scalars['Date'];
};

export type RekFaceListRelationFilter = {
  every?: InputMaybe<RekFaceWhereInput>;
  none?: InputMaybe<RekFaceWhereInput>;
  some?: InputMaybe<RekFaceWhereInput>;
};

export type RekFaceOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RekFaceOrderByWithRelationInput = {
  boundingHeight?: InputMaybe<SortOrder>;
  boundingLeft?: InputMaybe<SortOrder>;
  boundingTop?: InputMaybe<SortOrder>;
  boundingWidth?: InputMaybe<SortOrder>;
  collection?: InputMaybe<RekCollectionOrderByWithRelationInput>;
  collectionId?: InputMaybe<SortOrder>;
  confidence?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  faceId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageOrderByWithRelationInput>;
  imageId?: InputMaybe<SortOrder>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  qualityBrightness?: InputMaybe<SortOrder>;
  qualitySharpness?: InputMaybe<SortOrder>;
  rekMatchedFaces?: InputMaybe<RekMatchedFaceOrderByRelationAggregateInput>;
  rekMatchedSearches?: InputMaybe<RekMatchOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum RekFaceScalarFieldEnum {
  BoundingHeight = 'boundingHeight',
  BoundingLeft = 'boundingLeft',
  BoundingTop = 'boundingTop',
  BoundingWidth = 'boundingWidth',
  CollectionId = 'collectionId',
  Confidence = 'confidence',
  CreatedAt = 'createdAt',
  FaceId = 'faceId',
  Id = 'id',
  ImageId = 'imageId',
  OffenderId = 'offenderId',
  QualityBrightness = 'qualityBrightness',
  QualitySharpness = 'qualitySharpness',
  UpdatedAt = 'updatedAt'
}

export type RekFaceScalarWhereInput = {
  AND?: InputMaybe<Array<RekFaceScalarWhereInput>>;
  NOT?: InputMaybe<Array<RekFaceScalarWhereInput>>;
  OR?: InputMaybe<Array<RekFaceScalarWhereInput>>;
  boundingHeight?: InputMaybe<FloatNullableFilter>;
  boundingLeft?: InputMaybe<FloatNullableFilter>;
  boundingTop?: InputMaybe<FloatNullableFilter>;
  boundingWidth?: InputMaybe<FloatNullableFilter>;
  collectionId?: InputMaybe<StringFilter>;
  confidence?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  faceId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  imageId?: InputMaybe<StringFilter>;
  offenderId?: InputMaybe<StringNullableFilter>;
  qualityBrightness?: InputMaybe<FloatNullableFilter>;
  qualitySharpness?: InputMaybe<FloatNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RekFaceScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<RekFaceScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<RekFaceScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<RekFaceScalarWhereWithAggregatesInput>>;
  boundingHeight?: InputMaybe<FloatNullableWithAggregatesFilter>;
  boundingLeft?: InputMaybe<FloatNullableWithAggregatesFilter>;
  boundingTop?: InputMaybe<FloatNullableWithAggregatesFilter>;
  boundingWidth?: InputMaybe<FloatNullableWithAggregatesFilter>;
  collectionId?: InputMaybe<StringWithAggregatesFilter>;
  confidence?: InputMaybe<FloatNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  faceId?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  imageId?: InputMaybe<StringWithAggregatesFilter>;
  offenderId?: InputMaybe<StringNullableWithAggregatesFilter>;
  qualityBrightness?: InputMaybe<FloatNullableWithAggregatesFilter>;
  qualitySharpness?: InputMaybe<FloatNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type RekFaceWhereInput = {
  AND?: InputMaybe<Array<RekFaceWhereInput>>;
  NOT?: InputMaybe<Array<RekFaceWhereInput>>;
  OR?: InputMaybe<Array<RekFaceWhereInput>>;
  boundingHeight?: InputMaybe<FloatNullableFilter>;
  boundingLeft?: InputMaybe<FloatNullableFilter>;
  boundingTop?: InputMaybe<FloatNullableFilter>;
  boundingWidth?: InputMaybe<FloatNullableFilter>;
  collection?: InputMaybe<RekCollectionWhereInput>;
  collectionId?: InputMaybe<StringFilter>;
  confidence?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  faceId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<ImageWhereInput>;
  imageId?: InputMaybe<StringFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  qualityBrightness?: InputMaybe<FloatNullableFilter>;
  qualitySharpness?: InputMaybe<FloatNullableFilter>;
  rekMatchedFaces?: InputMaybe<RekMatchedFaceListRelationFilter>;
  rekMatchedSearches?: InputMaybe<RekMatchListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RekFaceWhereUniqueInput = {
  AND?: InputMaybe<Array<RekFaceWhereInput>>;
  NOT?: InputMaybe<Array<RekFaceWhereInput>>;
  OR?: InputMaybe<Array<RekFaceWhereInput>>;
  boundingHeight?: InputMaybe<FloatNullableFilter>;
  boundingLeft?: InputMaybe<FloatNullableFilter>;
  boundingTop?: InputMaybe<FloatNullableFilter>;
  boundingWidth?: InputMaybe<FloatNullableFilter>;
  collection?: InputMaybe<RekCollectionWhereInput>;
  collectionId?: InputMaybe<StringFilter>;
  confidence?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  faceId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageWhereInput>;
  imageId?: InputMaybe<StringFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  qualityBrightness?: InputMaybe<FloatNullableFilter>;
  qualitySharpness?: InputMaybe<FloatNullableFilter>;
  rekMatchedFaces?: InputMaybe<RekMatchedFaceListRelationFilter>;
  rekMatchedSearches?: InputMaybe<RekMatchListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RekMatch = {
  __typename?: 'RekMatch';
  avgSimilarity: Scalars['Float'];
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  incident?: Maybe<Incident>;
  matchedFaces: Array<RekMatchedFace>;
  matchedOffender?: Maybe<Offender>;
  rekFaceId: Scalars['String'];
  searchedFace: RekFace;
  searchedOffender?: Maybe<Offender>;
  updatedAt: Scalars['Date'];
};

export type RekMatchListRelationFilter = {
  every?: InputMaybe<RekMatchWhereInput>;
  none?: InputMaybe<RekMatchWhereInput>;
  some?: InputMaybe<RekMatchWhereInput>;
};

export type RekMatchOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RekMatchOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  matchedFaces?: InputMaybe<RekMatchedFaceOrderByRelationAggregateInput>;
  matchedId?: InputMaybe<SortOrder>;
  matchedOffender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  rekFaceId?: InputMaybe<SortOrder>;
  searchedFace?: InputMaybe<RekFaceOrderByWithRelationInput>;
  searchedOffender?: InputMaybe<OffenderOrderByWithRelationInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum RekMatchScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  IncidentId = 'incidentId',
  MatchedId = 'matchedId',
  OffenderId = 'offenderId',
  RekFaceId = 'rekFaceId',
  UpdatedAt = 'updatedAt'
}

export type RekMatchScalarWhereInput = {
  AND?: InputMaybe<Array<RekMatchScalarWhereInput>>;
  NOT?: InputMaybe<Array<RekMatchScalarWhereInput>>;
  OR?: InputMaybe<Array<RekMatchScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  matchedId?: InputMaybe<StringNullableFilter>;
  offenderId?: InputMaybe<StringNullableFilter>;
  rekFaceId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RekMatchScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<RekMatchScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<RekMatchScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<RekMatchScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentId?: InputMaybe<StringNullableWithAggregatesFilter>;
  matchedId?: InputMaybe<StringNullableWithAggregatesFilter>;
  offenderId?: InputMaybe<StringNullableWithAggregatesFilter>;
  rekFaceId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type RekMatchWhereInput = {
  AND?: InputMaybe<Array<RekMatchWhereInput>>;
  NOT?: InputMaybe<Array<RekMatchWhereInput>>;
  OR?: InputMaybe<Array<RekMatchWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  matchedFaces?: InputMaybe<RekMatchedFaceListRelationFilter>;
  matchedId?: InputMaybe<StringNullableFilter>;
  matchedOffender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  rekFaceId?: InputMaybe<StringFilter>;
  searchedFace?: InputMaybe<RekFaceWhereInput>;
  searchedOffender?: InputMaybe<OffenderWhereInput>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RekMatchWhereUniqueInput = {
  AND?: InputMaybe<Array<RekMatchWhereInput>>;
  NOT?: InputMaybe<Array<RekMatchWhereInput>>;
  OR?: InputMaybe<Array<RekMatchWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  matchedFaces?: InputMaybe<RekMatchedFaceListRelationFilter>;
  matchedId?: InputMaybe<StringNullableFilter>;
  matchedOffender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  rekFaceId?: InputMaybe<StringFilter>;
  searchedFace?: InputMaybe<RekFaceWhereInput>;
  searchedOffender?: InputMaybe<OffenderWhereInput>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RekMatchedFace = {
  __typename?: 'RekMatchedFace';
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  rekFace: RekFace;
  rekFaceId: Scalars['String'];
  rekMatch: RekMatch;
  rekMatchId: Scalars['String'];
  similarity: Scalars['Float'];
  updatedAt: Scalars['Date'];
};

export type RekMatchedFaceListRelationFilter = {
  every?: InputMaybe<RekMatchedFaceWhereInput>;
  none?: InputMaybe<RekMatchedFaceWhereInput>;
  some?: InputMaybe<RekMatchedFaceWhereInput>;
};

export type RekMatchedFaceOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RekMatchedFaceScalarWhereInput = {
  AND?: InputMaybe<Array<RekMatchedFaceScalarWhereInput>>;
  NOT?: InputMaybe<Array<RekMatchedFaceScalarWhereInput>>;
  OR?: InputMaybe<Array<RekMatchedFaceScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  rekFaceId?: InputMaybe<StringFilter>;
  rekMatchId?: InputMaybe<StringFilter>;
  similarity?: InputMaybe<FloatFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type RekMatchedFaceScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<RekMatchedFaceScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<RekMatchedFaceScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<RekMatchedFaceScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  rekFaceId?: InputMaybe<StringWithAggregatesFilter>;
  rekMatchId?: InputMaybe<StringWithAggregatesFilter>;
  similarity?: InputMaybe<FloatWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type RekMatchedFaceWhereInput = {
  AND?: InputMaybe<Array<RekMatchedFaceWhereInput>>;
  NOT?: InputMaybe<Array<RekMatchedFaceWhereInput>>;
  OR?: InputMaybe<Array<RekMatchedFaceWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  rekFace?: InputMaybe<RekFaceWhereInput>;
  rekFaceId?: InputMaybe<StringFilter>;
  rekMatch?: InputMaybe<RekMatchWhereInput>;
  rekMatchId?: InputMaybe<StringFilter>;
  similarity?: InputMaybe<FloatFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export enum RekVersion {
  Aws = 'AWS',
  Custom = 'CUSTOM'
}

export type RelationSet = {
  set?: InputMaybe<Array<UniqueId>>;
};

export type RepeatOffenderDetail = {
  __typename?: 'RepeatOffenderDetail';
  /** Categories of incidents */
  categories: Array<Scalars['String']>;
  /** Days between first and last incident */
  daysBetweenIncidents: Scalars['Int'];
  /** Date of first incident */
  firstIncidentDate: Scalars['DateTime'];
  /** Number of incidents */
  incidentCount: Scalars['Int'];
  /** Date of most recent incident */
  lastIncidentDate: Scalars['DateTime'];
  /** Offender ID */
  offenderId: Scalars['String'];
  /** Offender name */
  offenderName: Scalars['String'];
  /** Total value of incidents if available */
  totalValue?: Maybe<Scalars['Float']>;
};

export type RepeatOffenderDetailItem = {
  __typename?: 'RepeatOffenderDetailItem';
  /** Categories of incidents */
  categories: Array<Scalars['String']>;
  /** Days between first and last incident */
  daysBetweenIncidents: Scalars['Int'];
  /** Date of first incident */
  firstIncidentDate: Scalars['DateTime'];
  /** Number of incidents */
  incidentCount: Scalars['Int'];
  /** Date of most recent incident */
  lastIncidentDate: Scalars['DateTime'];
  /** Offender ID */
  offenderId: Scalars['String'];
  /** Offender name */
  offenderName: Scalars['String'];
  /** Total value of incidents if available */
  totalValue?: Maybe<Scalars['Float']>;
};

export type RepeatOffenderOverview = {
  __typename?: 'RepeatOffenderOverview';
  /** Paginated array of repeat offender details */
  offenders: Array<RepeatOffenderDetailItem>;
  /** Current page number */
  page: Scalars['Int'];
  /** Number of items per page */
  pageSize: Scalars['Int'];
  /** Summary statistics based on ALL repeat offenders */
  summary: RepeatOffenderSummary;
  /** Total number of repeat offenders (for pagination) */
  totalCount: Scalars['Int'];
  /** Total number of pages */
  totalPages: Scalars['Int'];
};

export type RepeatOffenderSummary = {
  __typename?: 'RepeatOffenderSummary';
  /** Average days between first and last incident */
  averageDaysBetween: Scalars['Float'];
  /** Top 10 most common incident categories */
  topCategories: Array<CategoryCount>;
  /** Total incidents from all repeat offenders */
  totalIncidents: Scalars['Int'];
  /** Total number of repeat offenders */
  totalRepeatOffenders: Scalars['Int'];
  /** Total value/loss from all repeat offenders */
  totalValue?: Maybe<Scalars['Float']>;
};

export type ReportGroup = {
  __typename?: 'ReportGroup';
  createdAt: Scalars['Date'];
  groups: Array<Group>;
  id: Scalars['String'];
  name: Scalars['String'];
  nameTranslations: Array<Scalars['JSON']>;
  order: Scalars['Int'];
  reports: Array<ReportTemplate>;
  scheme: Scheme;
  schemeId: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type ReportGroupCreateInput = {
  groupIds: Array<Scalars['String']>;
  name: Scalars['String'];
  order: Scalars['Int'];
  schemeId: Scalars['String'];
};

export type ReportGroupEditInput = {
  groupIds?: InputMaybe<SetStringArrayHelper>;
  name?: InputMaybe<SetStringHelper>;
  order?: InputMaybe<SetIntHelper>;
};

export type ReportGroupWhere = {
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  searchedIds?: InputMaybe<Array<Scalars['String']>>;
};

export type ReportLayout = {
  __typename?: 'ReportLayout';
  createdAt: Scalars['Date'];
  h: Scalars['Int'];
  i: Scalars['String'];
  id: Scalars['String'];
  maxH?: Maybe<Scalars['Int']>;
  maxW?: Maybe<Scalars['Int']>;
  minH?: Maybe<Scalars['Int']>;
  minW?: Maybe<Scalars['Int']>;
  moved: Scalars['Boolean'];
  static: Scalars['Boolean'];
  template: ReportTemplate;
  templateId: Scalars['String'];
  updatedAt: Scalars['Date'];
  w: Scalars['Int'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type ReportLayoutCreateManyTemplateInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  default?: InputMaybe<Scalars['Boolean']>;
  h: Scalars['Int'];
  i: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  maxH?: InputMaybe<Scalars['Int']>;
  maxW?: InputMaybe<Scalars['Int']>;
  minH?: InputMaybe<Scalars['Int']>;
  minW?: InputMaybe<Scalars['Int']>;
  moved?: InputMaybe<Scalars['Boolean']>;
  static?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
  w: Scalars['Int'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type ReportLayoutCreateManyTemplateInputEnvelope = {
  data: Array<ReportLayoutCreateManyTemplateInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ReportLayoutCreateNestedManyWithoutTemplateInput = {
  createMany?: InputMaybe<ReportLayoutCreateManyTemplateInputEnvelope>;
};

export type ReportLayoutListRelationFilter = {
  every?: InputMaybe<ReportLayoutWhereInput>;
  none?: InputMaybe<ReportLayoutWhereInput>;
  some?: InputMaybe<ReportLayoutWhereInput>;
};

export type ReportLayoutOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ReportLayoutScalarWhereInput = {
  AND?: InputMaybe<Array<ReportLayoutScalarWhereInput>>;
  NOT?: InputMaybe<Array<ReportLayoutScalarWhereInput>>;
  OR?: InputMaybe<Array<ReportLayoutScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  h?: InputMaybe<IntFilter>;
  i?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  maxH?: InputMaybe<IntNullableFilter>;
  maxW?: InputMaybe<IntNullableFilter>;
  minH?: InputMaybe<IntNullableFilter>;
  minW?: InputMaybe<IntNullableFilter>;
  moved?: InputMaybe<BoolFilter>;
  static?: InputMaybe<BoolFilter>;
  templateId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  w?: InputMaybe<IntFilter>;
  x?: InputMaybe<IntFilter>;
  y?: InputMaybe<IntFilter>;
};

export type ReportLayoutScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ReportLayoutScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ReportLayoutScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ReportLayoutScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  h?: InputMaybe<IntWithAggregatesFilter>;
  i?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  maxH?: InputMaybe<IntNullableWithAggregatesFilter>;
  maxW?: InputMaybe<IntNullableWithAggregatesFilter>;
  minH?: InputMaybe<IntNullableWithAggregatesFilter>;
  minW?: InputMaybe<IntNullableWithAggregatesFilter>;
  moved?: InputMaybe<BoolWithAggregatesFilter>;
  static?: InputMaybe<BoolWithAggregatesFilter>;
  templateId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  w?: InputMaybe<IntWithAggregatesFilter>;
  x?: InputMaybe<IntWithAggregatesFilter>;
  y?: InputMaybe<IntWithAggregatesFilter>;
};

export type ReportLayoutUpdateManyWithoutTemplateNestedInput = {
  createMany?: InputMaybe<ReportLayoutCreateManyTemplateInputEnvelope>;
  delete?: InputMaybe<Array<ReportLayoutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ReportLayoutScalarWhereInput>>;
};

export type ReportLayoutWhereInput = {
  AND?: InputMaybe<Array<ReportLayoutWhereInput>>;
  NOT?: InputMaybe<Array<ReportLayoutWhereInput>>;
  OR?: InputMaybe<Array<ReportLayoutWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  h?: InputMaybe<IntFilter>;
  i?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  maxH?: InputMaybe<IntNullableFilter>;
  maxW?: InputMaybe<IntNullableFilter>;
  minH?: InputMaybe<IntNullableFilter>;
  minW?: InputMaybe<IntNullableFilter>;
  moved?: InputMaybe<BoolFilter>;
  static?: InputMaybe<BoolFilter>;
  template?: InputMaybe<ReportTemplateWhereInput>;
  templateId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  w?: InputMaybe<IntFilter>;
  x?: InputMaybe<IntFilter>;
  y?: InputMaybe<IntFilter>;
};

export type ReportLayoutWhereUniqueInput = {
  AND?: InputMaybe<Array<ReportLayoutWhereInput>>;
  NOT?: InputMaybe<Array<ReportLayoutWhereInput>>;
  OR?: InputMaybe<Array<ReportLayoutWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  h?: InputMaybe<IntFilter>;
  i?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']>;
  maxH?: InputMaybe<IntNullableFilter>;
  maxW?: InputMaybe<IntNullableFilter>;
  minH?: InputMaybe<IntNullableFilter>;
  minW?: InputMaybe<IntNullableFilter>;
  moved?: InputMaybe<BoolFilter>;
  static?: InputMaybe<BoolFilter>;
  template?: InputMaybe<ReportTemplateWhereInput>;
  templateId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  w?: InputMaybe<IntFilter>;
  x?: InputMaybe<IntFilter>;
  y?: InputMaybe<IntFilter>;
};

export type ReportTemplate = {
  __typename?: 'ReportTemplate';
  createdAt: Scalars['Date'];
  default: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  descriptionTranslations: Array<Scalars['JSON']>;
  exportedAt?: Maybe<Scalars['Date']>;
  groups: Array<Group>;
  id: Scalars['String'];
  layout: Array<ReportLayout>;
  metaData: Array<Scalars['JSON']>;
  name: Scalars['String'];
  nameTranslations: Array<Scalars['JSON']>;
  reportGroup?: Maybe<ReportGroup>;
  schemes: Array<Scheme>;
  type: ReportType;
  updatedAt: Scalars['Date'];
};

export type ReportTemplateCreateInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  default?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<ConnectArrayHelper>;
  id?: InputMaybe<Scalars['String']>;
  layout?: InputMaybe<ReportLayoutCreateNestedManyWithoutTemplateInput>;
  metaData?: InputMaybe<Array<Scalars['JSON']>>;
  name?: InputMaybe<Scalars['String']>;
  reportGroup?: InputMaybe<ConnectHelper>;
  schemes?: InputMaybe<ConnectArrayHelper>;
  type: ReportType;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type ReportTemplateGroup = {
  set?: InputMaybe<Array<UniqueId>>;
};

export type ReportTemplateListRelationFilter = {
  every?: InputMaybe<ReportTemplateWhereInput>;
  none?: InputMaybe<ReportTemplateWhereInput>;
  some?: InputMaybe<ReportTemplateWhereInput>;
};

export type ReportTemplateOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ReportTemplateOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  layout?: InputMaybe<ReportLayoutOrderByRelationAggregateInput>;
  metaData?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum ReportTemplateScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  MetaData = 'metaData',
  Name = 'name',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

export type ReportTemplateScalarWhereInput = {
  AND?: InputMaybe<Array<ReportTemplateScalarWhereInput>>;
  NOT?: InputMaybe<Array<ReportTemplateScalarWhereInput>>;
  OR?: InputMaybe<Array<ReportTemplateScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  metaData?: InputMaybe<JsonNullableListFilter>;
  name?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumReportTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ReportTemplateScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ReportTemplateScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ReportTemplateScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ReportTemplateScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  metaData?: InputMaybe<JsonNullableListFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  type?: InputMaybe<EnumReportTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type ReportTemplateUpdateInput = {
  default?: InputMaybe<SetBooleanHelper>;
  description?: InputMaybe<NullableSetStringHelper>;
  groups?: InputMaybe<ReportTemplateGroup>;
  layout?: InputMaybe<ReportLayoutUpdateManyWithoutTemplateNestedInput>;
  metaData?: InputMaybe<Array<Scalars['JSON']>>;
  name?: InputMaybe<NullableSetStringHelper>;
  reportGroup?: InputMaybe<Scalars['String']>;
  schemes?: InputMaybe<NullableConnectArrayHelper>;
  type?: InputMaybe<EnumReportTypeFieldUpdateOperationsInput>;
};

export type ReportTemplateWhereInput = {
  AND?: InputMaybe<Array<ReportTemplateWhereInput>>;
  NOT?: InputMaybe<Array<ReportTemplateWhereInput>>;
  OR?: InputMaybe<Array<ReportTemplateWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  layout?: InputMaybe<ReportLayoutListRelationFilter>;
  metaData?: InputMaybe<JsonNullableListFilter>;
  name?: InputMaybe<StringNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  type?: InputMaybe<EnumReportTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ReportTemplateWhereUniqueInput = {
  AND?: InputMaybe<Array<ReportTemplateWhereInput>>;
  NOT?: InputMaybe<Array<ReportTemplateWhereInput>>;
  OR?: InputMaybe<Array<ReportTemplateWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  layout?: InputMaybe<ReportLayoutListRelationFilter>;
  metaData?: InputMaybe<JsonNullableListFilter>;
  name?: InputMaybe<StringNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  type?: InputMaybe<EnumReportTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export enum ReportType {
  ActivityTable = 'ACTIVITY_TABLE',
  Business = 'BUSINESS',
  BusinessEngagementTable = 'BUSINESS_ENGAGEMENT_TABLE',
  BusinessMap = 'BUSINESS_MAP',
  BusinessTable = 'BUSINESS_TABLE',
  CheckListQuestionTable = 'CHECK_LIST_QUESTION_TABLE',
  CheckListTable = 'CHECK_LIST_TABLE',
  CrimeGroup = 'CRIME_GROUP',
  CrimeGroupsTable = 'CRIME_GROUPS_TABLE',
  GroupTable = 'GROUP_TABLE',
  IncidentItemsTable = 'INCIDENT_ITEMS_TABLE',
  IncidentMap = 'INCIDENT_MAP',
  IncidentTable = 'INCIDENT_TABLE',
  InvestigationsTable = 'INVESTIGATIONS_TABLE',
  LpStockLossReport = 'LP_STOCK_LOSS_REPORT',
  Offender = 'OFFENDER',
  OffenderTable = 'OFFENDER_TABLE',
  Performance = 'PERFORMANCE',
  StockItemsTable = 'STOCK_ITEMS_TABLE',
  UserEngagementTable = 'USER_ENGAGEMENT_TABLE',
  VehiclesTable = 'VEHICLES_TABLE'
}

export type ReportsCentreWhereInput = {
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
};

export type ResetPassword = {
  __typename?: 'ResetPassword';
  message: Scalars['String'];
};

export type RetailAdminDashboardData = {
  __typename?: 'RetailAdminDashboardData';
  /** Business-level impact analysis */
  businessIntelligence?: Maybe<RetailDashboardBusinessIntelligence>;
  /** Temporal crime patterns (hour, day, month) */
  crimePatterns?: Maybe<RetailDashboardCrimePatterns>;
  /** Incident counts by INCIDENT_CRIME_TYPE tag */
  crimeTypeDistribution?: Maybe<Array<RetailDashboardCrimeTypeItem>>;
  /** Actionable items requiring attention */
  operationalQueue?: Maybe<RetailDashboardOperationalQueue>;
  /** Recidivism patterns and high-frequency offenders */
  repeatOffenderInsights?: Maybe<RetailDashboardRepeatOffenderInsights>;
  /** Headline KPIs for the period */
  summary: RetailDashboardSummary;
  /** Top 5 most stolen goods in period */
  targetedGoods?: Maybe<Array<RetailDashboardTargetedGoodsItem>>;
  /** Top 10 offenders by total value caused in period */
  topOffenders?: Maybe<Array<RetailDashboardTopOffender>>;
};

export enum RetailAdminDashboardSection {
  BusinessIntelligence = 'BUSINESS_INTELLIGENCE',
  CrimePatterns = 'CRIME_PATTERNS',
  CrimeTypeDistribution = 'CRIME_TYPE_DISTRIBUTION',
  OperationalQueue = 'OPERATIONAL_QUEUE',
  RepeatOffenderInsights = 'REPEAT_OFFENDER_INSIGHTS',
  Summary = 'SUMMARY',
  TargetedGoods = 'TARGETED_GOODS',
  TopOffenders = 'TOP_OFFENDERS'
}

export type RetailDashboardBusinessIntelligence = {
  __typename?: 'RetailDashboardBusinessIntelligence';
  /** Businesses in scheme with zero incidents in last 30 days */
  goingDarkCount: Scalars['Int'];
  /** Names of businesses with no recent activity */
  goingDarkNames: Array<Scalars['String']>;
  /** Top 5 businesses by incident count in period */
  topByCount: Array<RetailDashboardBusinessItem>;
  /** Top 5 businesses by value lost in period */
  topByValue: Array<RetailDashboardBusinessItem>;
};

export type RetailDashboardBusinessItem = {
  __typename?: 'RetailDashboardBusinessItem';
  id: Scalars['String'];
  incidentCount: Scalars['Int'];
  name: Scalars['String'];
  totalValue: Scalars['Float'];
};

export type RetailDashboardCrimePatterns = {
  __typename?: 'RetailDashboardCrimePatterns';
  /** Incident distribution by day of week */
  byDayOfWeek: Array<RetailDashboardDailyItem>;
  /** Incident distribution by hour of day */
  byHour: Array<RetailDashboardHourlyItem>;
  /** 12-month rolling incident and value trend */
  monthlyTrend: Array<RetailDashboardMonthlyItem>;
};

export type RetailDashboardCrimeTypeItem = {
  __typename?: 'RetailDashboardCrimeTypeItem';
  count: Scalars['Int'];
  crimeType?: Maybe<Scalars['String']>;
  tagId: Scalars['String'];
  tagName: Scalars['String'];
};

export type RetailDashboardDailyItem = {
  __typename?: 'RetailDashboardDailyItem';
  count: Scalars['Int'];
  /** Day of week (0=Sunday, 6=Saturday) */
  dayOfWeek: Scalars['Int'];
};

export type RetailDashboardExpiringBanItem = {
  __typename?: 'RetailDashboardExpiringBanItem';
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  offenderName?: Maybe<Scalars['String']>;
};

export type RetailDashboardHourlyItem = {
  __typename?: 'RetailDashboardHourlyItem';
  count: Scalars['Int'];
  /** Hour of day (0-23) */
  hour: Scalars['Int'];
};

export type RetailDashboardMonthlyItem = {
  __typename?: 'RetailDashboardMonthlyItem';
  count: Scalars['Int'];
  /** YYYY-MM format */
  month: Scalars['String'];
  totalValue: Scalars['Float'];
};

export type RetailDashboardOperationalQueue = {
  __typename?: 'RetailDashboardOperationalQueue';
  expiringBans: Array<RetailDashboardExpiringBanItem>;
  /** Bans expiring within 30 days */
  expiringBansCount: Scalars['Int'];
  openInvestigations: Scalars['Int'];
  /** Incidents where approved=false, draft=false */
  pendingApproval: Scalars['Int'];
};

export type RetailDashboardRepeatOffenderInsights = {
  __typename?: 'RetailDashboardRepeatOffenderInsights';
  /** Average recidivism rate in days */
  averageDaysBetweenIncidents: Scalars['Float'];
  /** Distribution: period0to30, period31to90, period91to180, period180plus */
  recidivismDistribution: Scalars['JSON'];
  /** Top 5 highest frequency offenders */
  topByFrequency: Array<RetailDashboardTopOffender>;
  /** Offenders with 3+ incidents in period */
  totalRepeatOffenders: Scalars['Int'];
};

export type RetailDashboardSummary = {
  __typename?: 'RetailDashboardSummary';
  /** Offenders with incidents in period */
  activeOffenders: Scalars['Int'];
  /** Investigations with OPEN status */
  openInvestigations: Scalars['Int'];
  /** Incidents awaiting approval (action required) */
  pendingApproval: Scalars['Int'];
  /** % change in incidents vs previous equivalent period */
  periodIncidentChange?: Maybe<Scalars['Float']>;
  /** % change in value lost vs previous equivalent period */
  periodValueChange?: Maybe<Scalars['Float']>;
  /** Offenders with 3+ incidents in period */
  repeatOffenders: Scalars['Int'];
  /** Total incidents in period */
  totalIncidents: Scalars['Int'];
  /** Sum of incident values in period */
  totalValueLost: Scalars['Float'];
};

export type RetailDashboardTargetedGoodsItem = {
  __typename?: 'RetailDashboardTargetedGoodsItem';
  count: Scalars['Int'];
  name: Scalars['String'];
  totalValue: Scalars['Float'];
};

export type RetailDashboardTopOffender = {
  __typename?: 'RetailDashboardTopOffender';
  id: Scalars['String'];
  /** Images associated with this offender */
  images: Scalars['JSON'];
  incidentCount: Scalars['Int'];
  lastIncidentDate?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['Int']>;
  totalValue: Scalars['Float'];
};

export enum RiskLevel {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Minimal = 'MINIMAL'
}

export type RiverIslandColumnMapping = {
  /** Column name for case type */
  caseTypeColumn?: InputMaybe<Scalars['String']>;
  /** Column name for incident date */
  incidentDateColumn?: InputMaybe<Scalars['String']>;
  /** Column name for report narrative */
  reportNarrativeColumn?: InputMaybe<Scalars['String']>;
  /** Column name for store number */
  storeNumberColumn?: InputMaybe<Scalars['String']>;
  /** Column name for total stolen value */
  totalStolenColumn?: InputMaybe<Scalars['String']>;
};

export type RiverIslandGroupInput = {
  id: Scalars['String'];
};

export type RiverIslandImportInput = {
  /** Optional column mapping for CSV/Excel headers */
  columnMapping?: InputMaybe<RiverIslandColumnMapping>;
  /** CSV or Excel file content as base64 string */
  fileData?: InputMaybe<Scalars['String']>;
  /** URL to download the CSV/Excel file from */
  fileUrl?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<RiverIslandGroupInput>>;
  scheme: RiverIslandSchemeInput;
};

export type RiverIslandSchemeInput = {
  id: Scalars['String'];
};

export enum Role {
  ContentAdmin = 'CONTENT_ADMIN',
  GroupAdmin = 'GROUP_ADMIN',
  SchemeAdmin = 'SCHEME_ADMIN',
  ShopsafeAdmin = 'SHOPSAFE_ADMIN',
  User = 'USER'
}

export type ScanIncidentInput = {
  id: Scalars['String'];
};

export type Scheme = {
  __typename?: 'Scheme';
  actions: Array<Action>;
  actionsInScheme: Array<Action>;
  activeChecklists: Array<ActiveChecklist>;
  activityAllowAllGroups: Scalars['Boolean'];
  activityAssignToUser: Scalars['Boolean'];
  allowTodoTemplateOverride: Scalars['Boolean'];
  approvalDueDays?: Maybe<Scalars['Int']>;
  articles: Array<Article>;
  autoApproveActivities: Scalars['Boolean'];
  autoApproveIncidents: Scalars['Boolean'];
  autoApproveOffenders: Scalars['Boolean'];
  autoPopulateDescription: Scalars['Boolean'];
  /** Features available to this scheme based on its tier */
  availableFeatures: Array<Features>;
  bans: Array<Ban>;
  billingCustomer?: Maybe<BillingCustomer>;
  billingMode?: Maybe<BillingMode>;
  billingRate?: Maybe<Scalars['Float']>;
  businessCount: Scalars['Int'];
  businesses: Array<Business>;
  chats: Array<Chat>;
  checklistFeatureActive: Scalars['Boolean'];
  checklistRequired: Scalars['Boolean'];
  checklists: Array<Checklist>;
  connectedToSchemes: Array<Scheme>;
  contacts: Array<Contact>;
  createdAt: Scalars['Date'];
  creationBreakdown: CreationBreakdown;
  crimeGroups: Array<CrimeGroup>;
  csvImports: Array<CsvImport>;
  currency: Currency;
  currentTerms?: Maybe<TermsAndCondition>;
  customGalleries: Array<CustomGallery>;
  customTranslations: Array<Scalars['JSON']>;
  customer?: Maybe<Scalars['String']>;
  darkLogo?: Maybe<Image>;
  darkLogoId?: Maybe<Scalars['String']>;
  defaultBulletinEmails: Scalars['Boolean'];
  defaultBulletinPush: Scalars['Boolean'];
  defaultGroups: Array<Group>;
  defaultIncidentEmail: Scalars['Boolean'];
  defaultIncidentPush: Scalars['Boolean'];
  defaultIncidentStatus?: Maybe<IncidentStatus>;
  defaultMessagePush: Scalars['Boolean'];
  defaultOffenderEmail: Scalars['Boolean'];
  defaultOffenderPush: Scalars['Boolean'];
  defaultPublicOffenderDOB: Scalars['Boolean'];
  defaultSubscribedIncidentOnly: Scalars['Boolean'];
  defaultSubscribedOffenderOnly: Scalars['Boolean'];
  disableCreationNotifications: Scalars['Boolean'];
  disableGalleryOnNative: Scalars['Boolean'];
  disablePassword: Scalars['Boolean'];
  divisions: Array<Scalars['String']>;
  documents: Array<Document>;
  dontAutoSetTimeDate: Scalars['Boolean'];
  dontPrefillOffenderName: Scalars['Boolean'];
  draftIncidents: Scalars['Boolean'];
  duplicateMatchTimeout: Scalars['String'];
  facialDetection: Scalars['Boolean'];
  facialRecognition: Scalars['Boolean'];
  /** Returns true if facial recognition is enabled and properly configured with an AWS collection */
  facialRecognitionConfigured: Scalars['Boolean'];
  facialRedaction: Scalars['Boolean'];
  feedItems: Array<FeedItem>;
  goodsMode: GoodsMode;
  groups: Array<Group>;
  groupsCount: Scalars['Int'];
  /** Check if scheme has access to a specific feature */
  hasFeature: Scalars['Boolean'];
  hubForce?: Maybe<PoliceForce>;
  id: Scalars['ID'];
  images: Array<Image>;
  imagesRequiredOnOffenders: Scalars['Boolean'];
  incidentAssignmentEnabled: Scalars['Boolean'];
  incidentCustomQuestionRadio: Scalars['Boolean'];
  incidentForm: Array<IncidentForm>;
  incidentImpact: Scalars['Boolean'];
  incidentPriority: Scalars['Boolean'];
  incidentRetention?: Maybe<Scalars['Int']>;
  incidentStatusEnabled: Scalars['Boolean'];
  incidentTypeTooltip?: Maybe<Scalars['String']>;
  incidents: Array<Incident>;
  incidentsByType: IncidentsByType;
  incidentsCreated: Scalars['Int'];
  intel: Array<Intel>;
  investigations: Array<Investigation>;
  investigationsInScheme: Array<Investigation>;
  labels: Array<Scalars['String']>;
  languageCount: Scalars['Int'];
  languages: Array<Language>;
  loginEvents: Array<LoginEvent>;
  logo?: Maybe<Image>;
  logoId?: Maybe<Scalars['String']>;
  members: Array<UserScheme>;
  mentionDueDays?: Maybe<Scalars['Int']>;
  messages: Array<Message>;
  messagesSent: Scalars['Int'];
  mg11Available: Scalars['Boolean'];
  name: Scalars['String'];
  needJustification: Scalars['Boolean'];
  noActvitiesForInactiveUsers: Scalars['Boolean'];
  notifications: Array<Notification>;
  offenderRetention?: Maybe<Scalars['Int']>;
  offenders: Array<Offender>;
  offendersCreated: Scalars['Int'];
  oneSelectedIncidentTypeOnly: Scalars['Boolean'];
  optionalBusinessOnUsers: Scalars['Boolean'];
  policeReporting: Scalars['Boolean'];
  policeSharing: Scalars['Boolean'];
  policeSharingGroupIds: Array<Scalars['String']>;
  policeSharingTagIds: Array<Scalars['String']>;
  questionGroups: Array<QuestionGroup>;
  questions: Array<Question>;
  recycledItems: Array<RecycledItem>;
  rekCollections: Array<RekCollection>;
  reportIcons: Array<Image>;
  reportOnly: Scalars['Boolean'];
  reportTemplates: Array<ReportTemplate>;
  requireActivityAuthorised: Scalars['Boolean'];
  requireBusinessOnIncident: Scalars['Boolean'];
  requireSiteNumberForUsers: Scalars['Boolean'];
  restrictBusinessAccessByRelation: Scalars['Boolean'];
  restrictIncidentAccess: Scalars['Boolean'];
  restrictIncidentAccessByRole: Scalars['Boolean'];
  roles: Array<CustomRole>;
  schemeTags: Array<Tag>;
  schemeType: SchemeType;
  /** Total count of shared incidents for this police hub */
  sharedIncidentCount: Scalars['Int'];
  sharingFrom: Array<SharingConfig>;
  sharingTo: Array<SharingConfig>;
  showBlankActivity: Scalars['Boolean'];
  skipLocationToAddress: Scalars['Boolean'];
  statementTemplates: Array<StatementTemplate>;
  stockItems: Array<StockItem>;
  stockRemovalReasonOptions: Array<StockRemovalReasonOption>;
  stopApprovalActivities: Scalars['Boolean'];
  storeFaceDuration: Scalars['String'];
  tagOrders: Array<TagOrder>;
  tags: Array<Tag>;
  taskTimeTracking: Scalars['Boolean'];
  terms: Array<TermsAndCondition>;
  termsInScheme: Array<TermsAndCondition>;
  /** The SchemeTier linking this scheme to its tier and feature set */
  tier?: Maybe<SchemeTier>;
  todos: Array<Todo>;
  topContributors: Array<TopContributors>;
  updatedAt: Scalars['Date'];
  updatesCreated: Scalars['Int'];
  uploadOffenderImagesOnMobile: Scalars['Boolean'];
  usDateFormat: Scalars['Boolean'];
  usPoliceData: Scalars['Boolean'];
  useBusinessGroupsOnIncident: Scalars['Boolean'];
  userCount: Scalars['Int'];
  userNotifications: Scalars['Int'];
  userTodos: Scalars['Int'];
  vehicles: Array<Vehicle>;
  workflows: Array<Workflow>;
};


export type SchemeActionsArgs = {
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type SchemeActionsInSchemeArgs = {
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type SchemeArticlesArgs = {
  cursor?: InputMaybe<ArticleWhereUniqueInput>;
  distinct?: InputMaybe<ArticleScalarFieldEnum>;
  orderBy?: InputMaybe<ArticleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type SchemeBansArgs = {
  cursor?: InputMaybe<BanWhereUniqueInput>;
  distinct?: InputMaybe<BanScalarFieldEnum>;
  orderBy?: InputMaybe<BanOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BanWhereInput>;
};


export type SchemeBusinessesArgs = {
  cursor?: InputMaybe<BusinessWhereUniqueInput>;
  distinct?: InputMaybe<BusinessScalarFieldEnum>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BusinessWhereInput>;
};


export type SchemeChatsArgs = {
  cursor?: InputMaybe<UserChatWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserChatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserChatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserChatWhereInput>;
};


export type SchemeContactsArgs = {
  cursor?: InputMaybe<ContactWhereUniqueInput>;
  distinct?: InputMaybe<Array<ContactScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ContactOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ContactWhereInput>;
};


export type SchemeCrimeGroupsArgs = {
  cursor?: InputMaybe<CrimeGroupWhereUniqueInput>;
  distinct?: InputMaybe<CrimeGroupScalarFieldEnum>;
  orderBy?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CrimeGroupWhereInput>;
};


export type SchemeCsvImportsArgs = {
  cursor?: InputMaybe<CsvImportWhereUniqueInput>;
  distinct?: InputMaybe<Array<CsvImportScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CsvImportOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CsvImportWhereInput>;
};


export type SchemeCustomGalleriesArgs = {
  cursor?: InputMaybe<CustomGalleryWhereUniqueInput>;
  distinct?: InputMaybe<CustomGalleryScalarFieldEnum>;
  orderBy?: InputMaybe<CustomGalleryOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CustomGalleryWhereInput>;
};


export type SchemeDefaultGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type SchemeDocumentsArgs = {
  cursor?: InputMaybe<DocumentWhereUniqueInput>;
  distinct?: InputMaybe<Array<DocumentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DocumentWhereInput>;
};


export type SchemeFeedItemsArgs = {
  cursor?: InputMaybe<FeedItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeedItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeedItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
};


export type SchemeGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type SchemeHasFeatureArgs = {
  feature: Features;
};


export type SchemeImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


export type SchemeIncidentFormArgs = {
  cursor?: InputMaybe<IncidentFormWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentFormScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncidentFormOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentFormWhereInput>;
};


export type SchemeIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<IncidentScalarFieldEnum>;
  orderBy?: InputMaybe<IncidentOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type SchemeIncidentsCreatedArgs = {
  endDate: Scalars['Date'];
  startDate: Scalars['Date'];
};


export type SchemeIntelArgs = {
  cursor?: InputMaybe<IntelWhereUniqueInput>;
  distinct?: InputMaybe<Array<IntelScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IntelOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IntelWhereInput>;
};


export type SchemeInvestigationsArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<Array<InvestigationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InvestigationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type SchemeInvestigationsInSchemeArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<Array<InvestigationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InvestigationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type SchemeLanguagesArgs = {
  cursor?: InputMaybe<LanguageWhereUniqueInput>;
  distinct?: InputMaybe<Array<LanguageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<LanguageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LanguageWhereInput>;
};


export type SchemeLoginEventsArgs = {
  cursor?: InputMaybe<LoginEventWhereUniqueInput>;
  distinct?: InputMaybe<Array<LoginEventScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<LoginEventOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LoginEventWhereInput>;
};


export type SchemeMembersArgs = {
  cursor?: InputMaybe<UserChatWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserChatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserChatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserChatWhereInput>;
};


export type SchemeMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type SchemeMessagesSentArgs = {
  endDate: Scalars['Date'];
  startDate: Scalars['Date'];
};


export type SchemeNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type SchemeOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type SchemeOffendersCreatedArgs = {
  endDate: Scalars['Date'];
  startDate: Scalars['Date'];
};


export type SchemeQuestionGroupsArgs = {
  cursor?: InputMaybe<QuestionGroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<QuestionGroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<QuestionGroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<QuestionGroupWhereInput>;
};


export type SchemeQuestionsArgs = {
  cursor?: InputMaybe<QuestionWhereUniqueInput>;
  distinct?: InputMaybe<Array<QuestionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<QuestionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<QuestionWhereInput>;
};


export type SchemeRecycledItemsArgs = {
  cursor?: InputMaybe<RecycledItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<RecycledItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RecycledItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RecycledItemWhereInput>;
};


export type SchemeRekCollectionsArgs = {
  cursor?: InputMaybe<RekCollectionWhereUniqueInput>;
  distinct?: InputMaybe<Array<RekCollectionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RekCollectionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RekCollectionWhereInput>;
};


export type SchemeReportIconsArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


export type SchemeReportTemplatesArgs = {
  cursor?: InputMaybe<ReportTemplateWhereUniqueInput>;
  distinct?: InputMaybe<Array<ReportTemplateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ReportTemplateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ReportTemplateWhereInput>;
};


export type SchemeSchemeTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};


export type SchemeStatementTemplatesArgs = {
  cursor?: InputMaybe<StatementTemplateWhereUniqueInput>;
  distinct?: InputMaybe<Array<StatementTemplateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<StatementTemplateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<StatementTemplateWhereInput>;
};


export type SchemeStockItemsArgs = {
  cursor?: InputMaybe<StockItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<StockItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<StockItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<StockItemWhereInput>;
};


export type SchemeTagOrdersArgs = {
  cursor?: InputMaybe<TagOrderWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagOrderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagOrderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagOrderWhereInput>;
};


export type SchemeTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};


export type SchemeTermsArgs = {
  cursor?: InputMaybe<TermsAndConditionWhereUniqueInput>;
  distinct?: InputMaybe<Array<TermsAndConditionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TermsAndConditionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TermsAndConditionWhereInput>;
};


export type SchemeTermsInSchemeArgs = {
  cursor?: InputMaybe<TermsAndConditionWhereUniqueInput>;
  distinct?: InputMaybe<Array<TermsAndConditionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TermsAndConditionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TermsAndConditionWhereInput>;
};


export type SchemeTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<TodoScalarFieldEnum>;
  orderBy?: InputMaybe<TodoOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};


export type SchemeTopContributorsArgs = {
  endDate: Scalars['Date'];
  startDate: Scalars['Date'];
};


export type SchemeUpdatesCreatedArgs = {
  endDate: Scalars['Date'];
  startDate: Scalars['Date'];
};


export type SchemeVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<Array<VehicleScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<VehicleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
};


export type SchemeWorkflowsArgs = {
  cursor?: InputMaybe<WorkflowWhereUniqueInput>;
  distinct?: InputMaybe<Array<WorkflowScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<WorkflowOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WorkflowWhereInput>;
};

export type SchemeCreateInput = {
  initialUserId: Scalars['String'];
  mirrorSchemeId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  preset?: InputMaybe<Scalars['String']>;
};

export type SchemeDashboardStats = {
  __typename?: 'SchemeDashboardStats';
  /** Number of users who logged in this month */
  activeUsersThisMonth: Scalars['Int'];
  /** Number of incidents created this month */
  incidentsThisMonth: Scalars['Int'];
  /** Total number of incidents in the scheme */
  totalIncidents: Scalars['Int'];
  /** Total number of offenders in the scheme */
  totalOffenders: Scalars['Int'];
  /** Total number of user sessions (login events) */
  totalUserSessions: Scalars['Int'];
  /** Total number of users in the scheme */
  totalUsers: Scalars['Int'];
};

export type SchemeInputArg = {
  id?: InputMaybe<StringFilter>;
};

export type SchemeListRelationFilter = {
  every?: InputMaybe<SchemeWhereInput>;
  none?: InputMaybe<SchemeWhereInput>;
  some?: InputMaybe<SchemeWhereInput>;
};

export type SchemeName = {
  __typename?: 'SchemeName';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type SchemeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type SchemeOrderByWithRelationInput = {
  Checklist?: InputMaybe<ChecklistOrderByWithRelationInput>;
  activityAssignToUser?: InputMaybe<SortOrder>;
  approvalDueDays?: InputMaybe<SortOrder>;
  autoApproveIncidents?: InputMaybe<SortOrder>;
  autoApproveOffenders?: InputMaybe<SortOrder>;
  autoPopulateDescription?: InputMaybe<SortOrder>;
  chats?: InputMaybe<ChatOrderByRelationAggregateInput>;
  checklistFeatureActive?: InputMaybe<SortOrder>;
  checklistId?: InputMaybe<SortOrder>;
  contacts?: InputMaybe<ContactOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  crimeGroups?: InputMaybe<CrimeGroupOrderByRelationAggregateInput>;
  csvImports?: InputMaybe<CsvImportOrderByRelationAggregateInput>;
  customGalleries?: InputMaybe<CustomGalleryOrderByRelationAggregateInput>;
  customTranslations?: InputMaybe<SortOrder>;
  darkLogo?: InputMaybe<ImageOrderByWithRelationInput>;
  darkLogoId?: InputMaybe<SortOrder>;
  defaultBulletinEmails?: InputMaybe<SortOrder>;
  defaultBulletinPush?: InputMaybe<SortOrder>;
  defaultGroups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  defaultIncidentEmail?: InputMaybe<SortOrder>;
  defaultIncidentPush?: InputMaybe<SortOrder>;
  defaultMessagePush?: InputMaybe<SortOrder>;
  defaultOffenderEmail?: InputMaybe<SortOrder>;
  defaultOffenderPush?: InputMaybe<SortOrder>;
  defaultPublicOffenderDOB?: InputMaybe<SortOrder>;
  defaultSubscribedIncidentOnly?: InputMaybe<SortOrder>;
  defaultSubscribedOffenderOnly?: InputMaybe<SortOrder>;
  documents?: InputMaybe<DocumentOrderByRelationAggregateInput>;
  facialDetection?: InputMaybe<SortOrder>;
  facialRecognition?: InputMaybe<SortOrder>;
  facialRedaction?: InputMaybe<SortOrder>;
  feedItems?: InputMaybe<FeedItemOrderByRelationAggregateInput>;
  goodsMode?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  imagesRequiredOnOffenders?: InputMaybe<SortOrder>;
  incidentCustomQuestionRadio?: InputMaybe<SortOrder>;
  incidentForm?: InputMaybe<IncidentFormOrderByRelationAggregateInput>;
  incidentImpact?: InputMaybe<SortOrder>;
  incidentRetention?: InputMaybe<SortOrder>;
  incidentTypeTooltip?: InputMaybe<SortOrder>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  intel?: InputMaybe<IntelOrderByRelationAggregateInput>;
  investigations?: InputMaybe<InvestigationOrderByRelationAggregateInput>;
  investigationsInScheme?: InputMaybe<InvestigationOrderByRelationAggregateInput>;
  languages?: InputMaybe<LanguageOrderByRelationAggregateInput>;
  loginEvents?: InputMaybe<LoginEventOrderByRelationAggregateInput>;
  logo?: InputMaybe<ImageOrderByWithRelationInput>;
  logoId?: InputMaybe<SortOrder>;
  members?: InputMaybe<UserSchemeOrderByRelationAggregateInput>;
  mentionDueDays?: InputMaybe<SortOrder>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  mg11Available?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  needJustification?: InputMaybe<SortOrder>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  offenderRetention?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  oneSelectedIncidentTypeOnly?: InputMaybe<SortOrder>;
  questionGroups?: InputMaybe<QuestionGroupOrderByRelationAggregateInput>;
  questions?: InputMaybe<QuestionOrderByRelationAggregateInput>;
  recycledItems?: InputMaybe<RecycledItemOrderByRelationAggregateInput>;
  rekCollections?: InputMaybe<RekCollectionOrderByRelationAggregateInput>;
  reportIcons?: InputMaybe<ImageOrderByRelationAggregateInput>;
  reportOnly?: InputMaybe<SortOrder>;
  reportTemplates?: InputMaybe<ReportTemplateOrderByRelationAggregateInput>;
  requireActivityAuthorised?: InputMaybe<SortOrder>;
  requireSiteNumberForUsers?: InputMaybe<SortOrder>;
  restrictIncidentAccess?: InputMaybe<SortOrder>;
  schemeTags?: InputMaybe<TagOrderByRelationAggregateInput>;
  statementTemplates?: InputMaybe<StatementTemplateOrderByRelationAggregateInput>;
  stockItems?: InputMaybe<StockItemOrderByRelationAggregateInput>;
  tagOrders?: InputMaybe<TagOrderOrderByRelationAggregateInput>;
  tags?: InputMaybe<TagOrderByRelationAggregateInput>;
  taskTimeTracking?: InputMaybe<SortOrder>;
  terms?: InputMaybe<TermsAndConditionOrderByRelationAggregateInput>;
  termsInScheme?: InputMaybe<TermsAndConditionOrderByRelationAggregateInput>;
  todos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  uploadOffenderImagesOnMobile?: InputMaybe<SortOrder>;
  useBusinessGroupsOnIncident?: InputMaybe<SortOrder>;
  vehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
  workflows?: InputMaybe<WorkflowOrderByRelationAggregateInput>;
};

export type SchemeRekognotionCollectionsInput = {
  connect?: InputMaybe<RekCollectionWhereUniqueInput>;
  create?: InputMaybe<CreateCollectionInput>;
};

export enum SchemeScalarFieldEnum {
  ActivityAssignToUser = 'activityAssignToUser',
  ApprovalDueDays = 'approvalDueDays',
  AutoApproveActivities = 'autoApproveActivities',
  AutoApproveIncidents = 'autoApproveIncidents',
  AutoApproveOffenders = 'autoApproveOffenders',
  AutoPopulateDescription = 'autoPopulateDescription',
  ChecklistFeatureActive = 'checklistFeatureActive',
  CreatedAt = 'createdAt',
  CustomTranslations = 'customTranslations',
  DarkLogoId = 'darkLogoId',
  DefaultBulletinEmails = 'defaultBulletinEmails',
  DefaultBulletinPush = 'defaultBulletinPush',
  DefaultIncidentEmail = 'defaultIncidentEmail',
  DefaultIncidentPush = 'defaultIncidentPush',
  DefaultMessagePush = 'defaultMessagePush',
  DefaultOffenderEmail = 'defaultOffenderEmail',
  DefaultOffenderPush = 'defaultOffenderPush',
  DefaultPublicOffenderDob = 'defaultPublicOffenderDOB',
  DefaultSubscribedIncidentOnly = 'defaultSubscribedIncidentOnly',
  DefaultSubscribedOffenderOnly = 'defaultSubscribedOffenderOnly',
  FacialDetection = 'facialDetection',
  FacialRecognition = 'facialRecognition',
  FacialRedaction = 'facialRedaction',
  GoodsMode = 'goodsMode',
  Id = 'id',
  ImagesRequiredOnOffenders = 'imagesRequiredOnOffenders',
  IncidentCustomQuestionRadio = 'incidentCustomQuestionRadio',
  IncidentImpact = 'incidentImpact',
  IncidentRetention = 'incidentRetention',
  IncidentTypeTooltip = 'incidentTypeTooltip',
  LogoId = 'logoId',
  MentionDueDays = 'mentionDueDays',
  Mg11Available = 'mg11Available',
  Name = 'name',
  NeedJustification = 'needJustification',
  OffenderRetention = 'offenderRetention',
  OneSelectedIncidentTypeOnly = 'oneSelectedIncidentTypeOnly',
  ReportOnly = 'reportOnly',
  RequireActivityAuthorised = 'requireActivityAuthorised',
  RequireSiteNumberForUsers = 'requireSiteNumberForUsers',
  RestrictIncidentAccess = 'restrictIncidentAccess',
  ShowBlankActivity = 'showBlankActivity',
  StopApprovalActivities = 'stopApprovalActivities',
  TaskTimeTracking = 'taskTimeTracking',
  UpdatedAt = 'updatedAt',
  UploadOffenderImagesOnMobile = 'uploadOffenderImagesOnMobile',
  UseBusinessGroupsOnIncident = 'useBusinessGroupsOnIncident'
}

export type SchemeTier = {
  __typename?: 'SchemeTier';
  adminLimit: Scalars['Int'];
  businessLimit: Scalars['Int'];
  hadTrial: Scalars['Boolean'];
  id: Scalars['String'];
  licenceType: LicenceType;
  scheme: Scheme;
  schemeId: Scalars['String'];
  tier: Tier;
  tierId: Scalars['String'];
  trialExpiresAt?: Maybe<Scalars['Date']>;
  userLimit: Scalars['Int'];
};

export enum SchemeType {
  Default = 'DEFAULT',
  PoliceHub = 'POLICE_HUB',
  RetalHub = 'RETAL_HUB'
}

export type SchemeUpdateInput = {
  activityAllowAllGroups?: InputMaybe<SetBooleanHelper>;
  activityAssignToUser?: InputMaybe<SetBooleanHelper>;
  aiDataEnrichment?: InputMaybe<SetBooleanHelper>;
  aiVisionAutoVerifyThreshold?: InputMaybe<AiVisionMatchConfidence>;
  allowTodoTemplateOverride?: InputMaybe<SetBooleanHelper>;
  approvalDueDays?: InputMaybe<Scalars['Int']>;
  autoApproveActivities?: InputMaybe<SetBooleanHelper>;
  autoApproveIncidents?: InputMaybe<SetBooleanHelper>;
  autoApproveOffenders?: InputMaybe<SetBooleanHelper>;
  autoPopulateDescription?: InputMaybe<SetBooleanHelper>;
  billingMode?: InputMaybe<EnumBillingModeFieldUpdateOperationsInput>;
  billingRate?: InputMaybe<SetFloatHelper>;
  checklistFeatureActive?: InputMaybe<Scalars['Boolean']>;
  collectionIds?: InputMaybe<Array<Scalars['String']>>;
  customer?: InputMaybe<SetStringHelper>;
  darkLogo?: InputMaybe<ImageUpdateOneWithoutSchemeDarkNestedInput>;
  defaultBulletinEmails?: InputMaybe<SetBooleanHelper>;
  defaultBulletinPush?: InputMaybe<SetBooleanHelper>;
  defaultGroups?: InputMaybe<Array<Scalars['String']>>;
  defaultIncidentEmail?: InputMaybe<SetBooleanHelper>;
  defaultIncidentPush?: InputMaybe<SetBooleanHelper>;
  defaultIncidentStatusId?: InputMaybe<SetStringHelper>;
  defaultMessagePush?: InputMaybe<SetBooleanHelper>;
  defaultOffenderEmail?: InputMaybe<SetBooleanHelper>;
  defaultOffenderPush?: InputMaybe<SetBooleanHelper>;
  defaultPublicOffenderDOB?: InputMaybe<SetBooleanHelper>;
  defaultSubscribedIncidentOnly?: InputMaybe<SetBooleanHelper>;
  defaultSubscribedOffenderOnly?: InputMaybe<SetBooleanHelper>;
  demCompanyId?: InputMaybe<SetStringHelper>;
  disableCreationNotifications?: InputMaybe<SetBooleanHelper>;
  disableGalleryOnNative?: InputMaybe<Scalars['Boolean']>;
  disablePassword?: InputMaybe<SetBooleanHelper>;
  dontAutoSetTimeDate?: InputMaybe<SetBooleanHelper>;
  dontPrefillOffenderName?: InputMaybe<SetBooleanHelper>;
  draftIncidents?: InputMaybe<SetBooleanHelper>;
  facialDetection?: InputMaybe<SetBooleanHelper>;
  facialRecognition?: InputMaybe<SetBooleanHelper>;
  facialRedaction?: InputMaybe<SetBooleanHelper>;
  goodsMode?: InputMaybe<EnumGoodsModeFieldUpdateOperationsInput>;
  imagesRequiredOnOffenders?: InputMaybe<SetBooleanHelper>;
  incidentAssignmentEnabled?: InputMaybe<SetBooleanHelper>;
  incidentCustomQuestionRadio?: InputMaybe<SetBooleanHelper>;
  incidentImpact?: InputMaybe<SetBooleanHelper>;
  incidentPriority?: InputMaybe<SetBooleanHelper>;
  incidentRetention?: InputMaybe<SetIntHelper>;
  incidentStatusEnabled?: InputMaybe<SetBooleanHelper>;
  incidentTypeTooltip?: InputMaybe<SetStringHelper>;
  labels?: InputMaybe<Array<Scalars['String']>>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeDarkNestedInput>;
  mg11Available?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<SetStringHelper>;
  needJustification?: InputMaybe<SetBooleanHelper>;
  noActvitiesForInactiveUsers?: InputMaybe<SetBooleanHelper>;
  offenderRetention?: InputMaybe<SetIntHelper>;
  oneSelectedIncidentTypeOnly?: InputMaybe<SetBooleanHelper>;
  optionalBusinessOnUsers?: InputMaybe<SetBooleanHelper>;
  policeReporting?: InputMaybe<SetBooleanHelper>;
  policeReportingApprovalFlow?: InputMaybe<SetBooleanHelper>;
  policeSharing?: InputMaybe<SetBooleanHelper>;
  policeSharingGroupIds?: InputMaybe<Array<Scalars['String']>>;
  policeSharingTagIds?: InputMaybe<Array<Scalars['String']>>;
  reportOnly?: InputMaybe<SetBooleanHelper>;
  reportToAllBusinessesDefault?: InputMaybe<SetBooleanHelper>;
  requireActivityAuthorised?: InputMaybe<SetBooleanHelper>;
  requireBusinessOnIncident?: InputMaybe<SetBooleanHelper>;
  requireSiteNumberForUsers?: InputMaybe<SetBooleanHelper>;
  restrictBusinessAccessByRelation?: InputMaybe<SetBooleanHelper>;
  restrictIncidentAccess?: InputMaybe<SetBooleanHelper>;
  restrictIncidentAccessByRole?: InputMaybe<SetBooleanHelper>;
  showBlankActivity?: InputMaybe<SetBooleanHelper>;
  skipLocationToAddress?: InputMaybe<SetBooleanHelper>;
  smartApprove?: InputMaybe<SetBooleanHelper>;
  stopApprovalActivities?: InputMaybe<SetBooleanHelper>;
  taskTimeTracking?: InputMaybe<Scalars['Boolean']>;
  uploadOffenderImagesOnMobile?: InputMaybe<SetBooleanHelper>;
  usDateFormat?: InputMaybe<SetBooleanHelper>;
  usPoliceData?: InputMaybe<SetBooleanHelper>;
  useBusinessGroupsOnIncident?: InputMaybe<SetBooleanHelper>;
};

export type SchemeWhereInput = {
  AND?: InputMaybe<Array<SchemeWhereInput>>;
  Checklist?: InputMaybe<ChecklistWhereInput>;
  NOT?: InputMaybe<Array<SchemeWhereInput>>;
  OR?: InputMaybe<Array<SchemeWhereInput>>;
  activityAssignToUser?: InputMaybe<BoolFilter>;
  approvalDueDays?: InputMaybe<IntNullableFilter>;
  autoApproveIncidents?: InputMaybe<BoolFilter>;
  autoApproveOffenders?: InputMaybe<BoolFilter>;
  autoPopulateDescription?: InputMaybe<BoolFilter>;
  bans?: InputMaybe<BanListRelationFilter>;
  businesses?: InputMaybe<BusinessListRelationFilter>;
  chats?: InputMaybe<ChatListRelationFilter>;
  checklistFeatureActive?: InputMaybe<BoolFilter>;
  checklistId?: InputMaybe<StringNullableFilter>;
  contacts?: InputMaybe<ContactListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  csvImports?: InputMaybe<CsvImportListRelationFilter>;
  customGalleries?: InputMaybe<CustomGalleryListRelationFilter>;
  customTranslations?: InputMaybe<JsonNullableListFilter>;
  darkLogo?: InputMaybe<ImageWhereInput>;
  darkLogoId?: InputMaybe<StringNullableFilter>;
  defaultBulletinEmails?: InputMaybe<BoolFilter>;
  defaultBulletinPush?: InputMaybe<BoolFilter>;
  defaultGroups?: InputMaybe<GroupListRelationFilter>;
  defaultIncidentEmail?: InputMaybe<BoolFilter>;
  defaultIncidentPush?: InputMaybe<BoolFilter>;
  defaultMessagePush?: InputMaybe<BoolFilter>;
  defaultOffenderEmail?: InputMaybe<BoolFilter>;
  defaultOffenderPush?: InputMaybe<BoolFilter>;
  defaultPublicOffenderDOB?: InputMaybe<BoolFilter>;
  defaultSubscribedIncidentOnly?: InputMaybe<BoolFilter>;
  defaultSubscribedOffenderOnly?: InputMaybe<BoolFilter>;
  documents?: InputMaybe<DocumentListRelationFilter>;
  facialDetection?: InputMaybe<BoolFilter>;
  facialRecognition?: InputMaybe<BoolFilter>;
  facialRedaction?: InputMaybe<BoolFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  goodsMode?: InputMaybe<EnumGoodsModeFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  imagesRequiredOnOffenders?: InputMaybe<BoolFilter>;
  incidentCustomQuestionRadio?: InputMaybe<BoolFilter>;
  incidentForm?: InputMaybe<IncidentFormListRelationFilter>;
  incidentImpact?: InputMaybe<BoolFilter>;
  incidentRetention?: InputMaybe<IntNullableFilter>;
  incidentTypeTooltip?: InputMaybe<StringNullableFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  investigationsInScheme?: InputMaybe<InvestigationListRelationFilter>;
  languages?: InputMaybe<LanguageListRelationFilter>;
  loginEvents?: InputMaybe<LoginEventListRelationFilter>;
  logo?: InputMaybe<ImageWhereInput>;
  logoId?: InputMaybe<StringNullableFilter>;
  members?: InputMaybe<UserSchemeListRelationFilter>;
  mentionDueDays?: InputMaybe<IntNullableFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  mg11Available?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  needJustification?: InputMaybe<BoolFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  offenderRetention?: InputMaybe<IntNullableFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  oneSelectedIncidentTypeOnly?: InputMaybe<BoolFilter>;
  questionGroups?: InputMaybe<QuestionGroupListRelationFilter>;
  questions?: InputMaybe<QuestionListRelationFilter>;
  recycledItems?: InputMaybe<RecycledItemListRelationFilter>;
  rekCollections?: InputMaybe<RekCollectionListRelationFilter>;
  reportIcons?: InputMaybe<ImageListRelationFilter>;
  reportOnly?: InputMaybe<BoolFilter>;
  reportTemplates?: InputMaybe<ReportTemplateListRelationFilter>;
  requireActivityAuthorised?: InputMaybe<BoolFilter>;
  requireSiteNumberForUsers?: InputMaybe<BoolFilter>;
  restrictIncidentAccess?: InputMaybe<BoolFilter>;
  schemeTags?: InputMaybe<TagListRelationFilter>;
  statementTemplates?: InputMaybe<StatementTemplateListRelationFilter>;
  stockItems?: InputMaybe<StockItemListRelationFilter>;
  tagOrders?: InputMaybe<TagOrderListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  taskTimeTracking?: InputMaybe<BoolFilter>;
  terms?: InputMaybe<TermsAndConditionListRelationFilter>;
  termsInScheme?: InputMaybe<TermsAndConditionListRelationFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploadOffenderImagesOnMobile?: InputMaybe<BoolFilter>;
  useBusinessGroupsOnIncident?: InputMaybe<BoolFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
  workflows?: InputMaybe<WorkflowListRelationFilter>;
};

export type SchemeWhereUniqueInput = {
  AND?: InputMaybe<Array<SchemeWhereInput>>;
  Checklist?: InputMaybe<ChecklistWhereInput>;
  NOT?: InputMaybe<Array<SchemeWhereInput>>;
  OR?: InputMaybe<Array<SchemeWhereInput>>;
  activityAssignToUser?: InputMaybe<BoolFilter>;
  approvalDueDays?: InputMaybe<IntNullableFilter>;
  autoApproveIncidents?: InputMaybe<BoolFilter>;
  autoApproveOffenders?: InputMaybe<BoolFilter>;
  autoPopulateDescription?: InputMaybe<BoolFilter>;
  bans?: InputMaybe<BanListRelationFilter>;
  businesses?: InputMaybe<BusinessListRelationFilter>;
  chats?: InputMaybe<ChatListRelationFilter>;
  checklistFeatureActive?: InputMaybe<BoolFilter>;
  checklistId?: InputMaybe<StringNullableFilter>;
  contacts?: InputMaybe<ContactListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  csvImports?: InputMaybe<CsvImportListRelationFilter>;
  customGalleries?: InputMaybe<CustomGalleryListRelationFilter>;
  darkLogo?: InputMaybe<ImageWhereInput>;
  darkLogoId?: InputMaybe<StringNullableFilter>;
  defaultBulletinEmails?: InputMaybe<BoolFilter>;
  defaultBulletinPush?: InputMaybe<BoolFilter>;
  defaultGroups?: InputMaybe<GroupListRelationFilter>;
  defaultIncidentEmail?: InputMaybe<BoolFilter>;
  defaultIncidentPush?: InputMaybe<BoolFilter>;
  defaultMessagePush?: InputMaybe<BoolFilter>;
  defaultOffenderEmail?: InputMaybe<BoolFilter>;
  defaultOffenderPush?: InputMaybe<BoolFilter>;
  defaultPublicOffenderDOB?: InputMaybe<BoolFilter>;
  defaultSubscribedIncidentOnly?: InputMaybe<BoolFilter>;
  defaultSubscribedOffenderOnly?: InputMaybe<BoolFilter>;
  documents?: InputMaybe<DocumentListRelationFilter>;
  facialDetection?: InputMaybe<BoolFilter>;
  facialRecognition?: InputMaybe<BoolFilter>;
  facialRedaction?: InputMaybe<BoolFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  goodsMode?: InputMaybe<EnumGoodsModeFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageListRelationFilter>;
  imagesRequiredOnOffenders?: InputMaybe<BoolFilter>;
  incidentCustomQuestionRadio?: InputMaybe<BoolFilter>;
  incidentForm?: InputMaybe<IncidentFormListRelationFilter>;
  incidentImpact?: InputMaybe<BoolFilter>;
  incidentRetention?: InputMaybe<IntNullableFilter>;
  incidentTypeTooltip?: InputMaybe<StringNullableFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  investigationsInScheme?: InputMaybe<InvestigationListRelationFilter>;
  languages?: InputMaybe<LanguageListRelationFilter>;
  loginEvents?: InputMaybe<LoginEventListRelationFilter>;
  logo?: InputMaybe<ImageWhereInput>;
  logoId?: InputMaybe<StringNullableFilter>;
  members?: InputMaybe<UserSchemeListRelationFilter>;
  mentionDueDays?: InputMaybe<IntNullableFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  mg11Available?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  needJustification?: InputMaybe<BoolFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  offenderRetention?: InputMaybe<IntNullableFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  oneSelectedIncidentTypeOnly?: InputMaybe<BoolFilter>;
  questionGroups?: InputMaybe<QuestionGroupListRelationFilter>;
  questions?: InputMaybe<QuestionListRelationFilter>;
  recycledItems?: InputMaybe<RecycledItemListRelationFilter>;
  rekCollections?: InputMaybe<RekCollectionListRelationFilter>;
  reportIcons?: InputMaybe<ImageListRelationFilter>;
  reportOnly?: InputMaybe<BoolFilter>;
  reportTemplates?: InputMaybe<ReportTemplateListRelationFilter>;
  requireActivityAuthorised?: InputMaybe<BoolFilter>;
  requireSiteNumberForUsers?: InputMaybe<BoolFilter>;
  restrictIncidentAccess?: InputMaybe<BoolFilter>;
  schemeTags?: InputMaybe<TagListRelationFilter>;
  statementTemplates?: InputMaybe<StatementTemplateListRelationFilter>;
  stockItems?: InputMaybe<StockItemListRelationFilter>;
  tagOrders?: InputMaybe<TagOrderListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  taskTimeTracking?: InputMaybe<BoolFilter>;
  terms?: InputMaybe<TermsAndConditionListRelationFilter>;
  termsInScheme?: InputMaybe<TermsAndConditionListRelationFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploadOffenderImagesOnMobile?: InputMaybe<BoolFilter>;
  useBusinessGroupsOnIncident?: InputMaybe<BoolFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
  workflows?: InputMaybe<WorkflowListRelationFilter>;
};

export type ScoreRangeInput = {
  gteValue: Scalars['Int'];
  lteValue: Scalars['Int'];
};

export type SearchOffenderSort = {
  createdAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  reference?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SearchOffenderWhere = {
  age?: InputMaybe<OffenderInNotInAge>;
  approved?: InputMaybe<Scalars['Boolean']>;
  build?: InputMaybe<OffenderInNotInBuild>;
  exclude?: InputMaybe<Array<Scalars['String']>>;
  gender?: InputMaybe<OffenderInNotInGender>;
  groups?: InputMaybe<Array<Scalars['String']>>;
  hair?: InputMaybe<Scalars['String']>;
  hasNoIncidents?: InputMaybe<Scalars['Boolean']>;
  height?: InputMaybe<OffenderInNotInHeight>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<OffenderInNotInRace>;
  schemes?: InputMaybe<Array<Scalars['String']>>;
  searchTerm?: InputMaybe<Scalars['String']>;
};

export type SectionInput = {
  dependentWeight?: InputMaybe<DependWeightInput>;
  order: Scalars['Int'];
  subsections: Array<SubsectionInput>;
  title: Scalars['String'];
};

export type SendEmailData = {
  __typename?: 'SendEmailData';
  message: Scalars['String'];
  title: Scalars['String'];
};

export type SendEmailInput = {
  message: Scalars['String'];
  title: Scalars['String'];
};

export type SendNotificationData = {
  __typename?: 'SendNotificationData';
  message: Scalars['String'];
  title: Scalars['String'];
};

export type SendNotificationInput = {
  message: Scalars['String'];
  title: Scalars['String'];
};

export type SendSmsData = {
  __typename?: 'SendSMSData';
  message: Scalars['String'];
};

export type SendSmsInput = {
  message: Scalars['String'];
};

export type SentrysysImportBusinessesInput = {
  connect?: InputMaybe<SentrysysImportConnectBusinessInput>;
  create?: InputMaybe<SentrysysImportCreateBusinessInput>;
};

export type SentrysysImportConnectBusinessInput = {
  id: Scalars['String'];
  importId: Scalars['String'];
};

export type SentrysysImportConnectUserInput = {
  groups?: InputMaybe<Array<UniqueId>>;
  id: Scalars['String'];
  importId: Scalars['String'];
  role: Role;
};

export type SentrysysImportCreateBusinessInput = {
  building?: InputMaybe<Scalars['String']>;
  county?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<UniqueId>>;
  importId: Scalars['String'];
  name: Scalars['String'];
  postcode: Scalars['String'];
  street: Scalars['String'];
  townCity?: InputMaybe<Scalars['String']>;
};

export type SentrysysImportCreateUserInput = {
  business: UniqueId;
  email: Scalars['String'];
  fullName: Scalars['String'];
  groups: Array<UniqueId>;
  importId: Scalars['String'];
  role: Role;
};

export type SentrysysImportDataInput = {
  businesses: Array<SentrysysImportBusinessesInput>;
  historicIncidents: Array<SentrysysImportHistoricIncidentsInput>;
  images: Array<SentrysysImportImagesInput>;
  incidents: Array<SentrysysImportIncidentsInput>;
  offenders: Array<SentrysysImportOffendersInput>;
  scheme: UniqueId;
  users: Array<SentrysysImportUsersInput>;
  vehicles: Array<SentrysysImportVehiclesInput>;
};

export type SentrysysImportHistoricIncidentsInput = {
  activityAuthorised?: InputMaybe<Scalars['Boolean']>;
  business?: InputMaybe<UniqueId>;
  crimeTypes?: InputMaybe<Array<UniqueId>>;
  date?: InputMaybe<Scalars['Date']>;
  groups?: InputMaybe<Array<UniqueId>>;
  importId: Scalars['String'];
  items: Array<SentrysysImportIncidentItemInput>;
  policeInvolved?: InputMaybe<Scalars['Boolean']>;
  policeReported?: InputMaybe<Scalars['Boolean']>;
  time?: InputMaybe<Scalars['Date']>;
};

export type SentrysysImportImagesInput = {
  fileName: Scalars['String'];
  importId: Scalars['String'];
  mimetype: Scalars['String'];
  url: Scalars['String'];
};

export type SentrysysImportIncidentItemInput = {
  id: Scalars['String'];
  lost: Scalars['Float'];
  recovered: Scalars['Float'];
};

export type SentrysysImportIncidentsInput = {
  activityAuthorised?: InputMaybe<Scalars['Boolean']>;
  business?: InputMaybe<UniqueId>;
  createdBy?: InputMaybe<UniqueId>;
  crimeTypes?: InputMaybe<Array<UniqueId>>;
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<UniqueId>>;
  images?: InputMaybe<Array<UniqueId>>;
  importId: Scalars['String'];
  items: Array<SentrysysImportIncidentItemInput>;
  offenders?: InputMaybe<Array<UniqueId>>;
  policeInvolved?: InputMaybe<Scalars['Boolean']>;
  policeReported?: InputMaybe<Scalars['Boolean']>;
  time?: InputMaybe<Scalars['Date']>;
  vehicles?: InputMaybe<Array<UniqueId>>;
};

export type SentrysysImportOffendersInput = {
  build?: InputMaybe<Build>;
  createdBy?: InputMaybe<UniqueId>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  gender?: InputMaybe<Gender>;
  groups: Array<UniqueId>;
  hair?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Height>;
  images: Array<UniqueId>;
  importId: Scalars['String'];
  name: Scalars['String'];
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
};

export type SentrysysImportUsersInput = {
  connect?: InputMaybe<SentrysysImportConnectUserInput>;
  create?: InputMaybe<SentrysysImportCreateUserInput>;
};

export type SentrysysImportVehiclesInput = {
  colour?: InputMaybe<Scalars['String']>;
  groups: Array<UniqueId>;
  images: Array<UniqueId>;
  importId: Scalars['String'];
  make?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  registration?: InputMaybe<Scalars['String']>;
};

export type Session = {
  __typename?: 'Session';
  actions: Array<Action>;
  app: AppType;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  locationLat?: Maybe<Scalars['Float']>;
  locationLng?: Maybe<Scalars['Float']>;
  scheme?: Maybe<Scheme>;
  updatedAt: Scalars['Date'];
  user: User;
};

export type SessionOrderByWithRelationInput = {
  app?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  locationLat?: InputMaybe<SortOrder>;
  locationLng?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum SessionScalarFieldEnum {
  Actions = 'actions',
  App = 'app',
  CreatedAt = 'createdAt',
  Id = 'id',
  LocationLat = 'locationLat',
  LocationLng = 'locationLng',
  Scheme = 'scheme',
  SchemeId = 'schemeId',
  UpdatedAt = 'updatedAt',
  User = 'user',
  UserId = 'userId'
}

export type SessionWhereInput = {
  AND?: InputMaybe<Array<SessionWhereInput>>;
  NOT?: InputMaybe<Array<SessionWhereInput>>;
  OR?: InputMaybe<Array<SessionWhereInput>>;
  app?: InputMaybe<EnumAppTypeFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  locationLat?: InputMaybe<FloatNullableFilter>;
  locationLng?: InputMaybe<FloatNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type SessionWhereUniqueInput = {
  AND?: InputMaybe<Array<SessionWhereInput>>;
  NOT?: InputMaybe<Array<SessionWhereInput>>;
  OR?: InputMaybe<Array<SessionWhereInput>>;
  app?: InputMaybe<EnumAppTypeFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  locationLat?: InputMaybe<FloatNullableFilter>;
  locationLng?: InputMaybe<FloatNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type SetArrayHelper = {
  set?: InputMaybe<Array<UniqueId>>;
};

export type SetBooleanHelper = {
  set: Scalars['Boolean'];
};

export type SetDateHelper = {
  set: Scalars['Date'];
};

export type SetDefaultTemplateInput = {
  default: Scalars['Boolean'];
  templateId: Scalars['String'];
  type: ReportType;
};

export type SetFloatHelper = {
  set?: InputMaybe<Scalars['Float']>;
};

export type SetIntHelper = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type SetPasswordData = {
  id: Scalars['String'];
  password: Scalars['String'];
};

export type SetSchemeSharingInput = {
  connectSchemes?: InputMaybe<Array<UniqueId>>;
  currentScheme: UniqueId;
  disconnectSchemes?: InputMaybe<Array<UniqueId>>;
};

export type SetStringArrayHelper = {
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type SetStringHelper = {
  set: Scalars['String'];
};

export type SetupFaceRecognitionInput = {
  /** Name for the facial recognition collection */
  collectionName: Scalars['String'];
};

export type ShareDataInput = {
  connectGroups: Array<UniqueId>;
  connectSchemes: Array<UniqueId>;
  incident?: InputMaybe<UniqueId>;
  offender?: InputMaybe<UniqueId>;
};

export type SharedCrimeGroup = {
  __typename?: 'SharedCrimeGroup';
  aiActivityPatterns?: Maybe<Scalars['String']>;
  aiActivityTrendsSnapshot?: Maybe<Scalars['JSON']>;
  aiGroupSophisticationSnapshot?: Maybe<Scalars['JSON']>;
  aiImprovements?: Maybe<Scalars['String']>;
  aiKeyObservations: Array<Scalars['String']>;
  aiMemberRiskAggregationSnapshot?: Maybe<Scalars['JSON']>;
  aiOrganizationStructure?: Maybe<Scalars['String']>;
  aiQualityScore?: Maybe<Scalars['Int']>;
  aiSophisticationLevel?: Maybe<AiSophisticationLevel>;
  aiSummary?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  crimeGroup: CrimeGroup;
  crimeGroupId: Scalars['String'];
  id: Scalars['ID'];
  policePriorityScore?: Maybe<Scalars['Int']>;
  schemes: Array<Scheme>;
  updatedAt: Scalars['Date'];
};

export type SharedCrimeGroupRelayOrderInput = {
  aiQualityScore?: InputMaybe<SortOrder>;
  aiSophisticationLevel?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  policePriorityScore?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SharedCrimeGroupRelayWhereInput = {
  /** Maximum AI quality score */
  aiQualityScoreMax?: InputMaybe<Scalars['Int']>;
  /** Minimum AI quality score */
  aiQualityScoreMin?: InputMaybe<Scalars['Int']>;
  /** Filter by sophistication level: LOW, MEDIUM, HIGH */
  aiSophisticationLevel?: InputMaybe<AiSophisticationLevel>;
  /** Filter crime groups created after this date */
  createdAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter crime groups created before this date */
  createdBefore?: InputMaybe<Scalars['DateTime']>;
  /** Maximum police priority score */
  policePriorityScoreMax?: InputMaybe<Scalars['Int']>;
  /** Minimum police priority score */
  policePriorityScoreMin?: InputMaybe<Scalars['Int']>;
  /** Filter by police hub scheme IDs */
  schemeIds?: InputMaybe<Array<Scalars['String']>>;
  /** Case-insensitive search across AI summary, organization structure, and activity patterns */
  search?: InputMaybe<Scalars['String']>;
  /** Filter crime groups updated after this date */
  updatedAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter crime groups updated before this date */
  updatedBefore?: InputMaybe<Scalars['DateTime']>;
};

export type SharedCrimeGroupWhereUniqueInput = {
  id: Scalars['String'];
};

export type SharedEntityCounts = {
  __typename?: 'SharedEntityCounts';
  crimeGroups: Scalars['Int'];
  incidents: Scalars['Int'];
  offenders: Scalars['Int'];
  vehicles: Scalars['Int'];
};

export type SharedEntityStats = {
  __typename?: 'SharedEntityStats';
  /** Total number of shared crime groups across all police hubs */
  totalCrimeGroups: Scalars['Int'];
  /** Total number of shared incidents across all police hubs */
  totalIncidents: Scalars['Int'];
  /** Total number of shared offenders across all police hubs */
  totalOffenders: Scalars['Int'];
  /** Total number of shared vehicles across all police hubs */
  totalVehicles: Scalars['Int'];
};

export type SharedEntityTotals = {
  __typename?: 'SharedEntityTotals';
  totalBusinessesInForceArea: Scalars['Int'];
  totalCrimeGroups: Scalars['Int'];
  totalIncidents: Scalars['Int'];
  totalOffenders: Scalars['Int'];
  totalVehicles: Scalars['Int'];
};

export type SharedIncident = {
  __typename?: 'SharedIncident';
  aiBehavioralAnalysisSnapshot?: Maybe<Scalars['JSON']>;
  aiImpactAssessmentSnapshot?: Maybe<Scalars['JSON']>;
  aiImprovements?: Maybe<Scalars['String']>;
  aiInvestigationLeadsSnapshot?: Maybe<Scalars['JSON']>;
  aiKeyObservations: Array<Scalars['String']>;
  aiMO?: Maybe<Scalars['String']>;
  aiMethod?: Maybe<Scalars['String']>;
  aiNetworkAnalysisSnapshot?: Maybe<Scalars['JSON']>;
  aiPatternRecognitionSnapshot?: Maybe<Scalars['JSON']>;
  aiPreventionInsightsSnapshot?: Maybe<Scalars['JSON']>;
  aiQualityScore?: Maybe<Scalars['Int']>;
  aiRiskAssessmentSnapshot?: Maybe<Scalars['JSON']>;
  aiSummary?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  incident: Incident;
  incidentId: Scalars['String'];
  policeArea: PoliceForce;
  policePriorityScore?: Maybe<Scalars['Int']>;
  schemes: Array<Scheme>;
  tag: Array<Tag>;
  updatedAt: Scalars['Date'];
};

export type SharedIncidentHeatmap = {
  __typename?: 'SharedIncidentHeatmap';
  /** Array of coordinates for the heatmap */
  points: Array<SharedIncidentHeatmapPoint>;
  /** Total number of points returned */
  total: Scalars['Int'];
};

export type SharedIncidentHeatmapPoint = {
  __typename?: 'SharedIncidentHeatmapPoint';
  /** When the incident was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** Latitude coordinate */
  lat: Scalars['Float'];
  /** Longitude coordinate */
  lng: Scalars['Float'];
  /** Police priority score for weighting the heatmap */
  policePriorityScore?: Maybe<Scalars['Int']>;
};

export type SharedIncidentRelayOrderInput = {
  aiQualityScore?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  policePriorityScore?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SharedIncidentRelayWhereInput = {
  /** Maximum AI quality score */
  aiQualityScoreMax?: InputMaybe<Scalars['Int']>;
  /** Minimum AI quality score */
  aiQualityScoreMin?: InputMaybe<Scalars['Int']>;
  /** Filter incidents created after this date */
  createdAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter incidents created before this date */
  createdBefore?: InputMaybe<Scalars['DateTime']>;
  /** Filter by geographical area */
  geographicalFilter?: InputMaybe<GeographicalFilterInput>;
  /** Filter by incident date (when incident occurred) - after this date */
  incidentDateAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter by incident date (when incident occurred) - before this date */
  incidentDateBefore?: InputMaybe<Scalars['DateTime']>;
  /** Filter by police area */
  policeArea?: InputMaybe<PoliceForce>;
  /** Maximum police priority score */
  policePriorityScoreMax?: InputMaybe<Scalars['Int']>;
  /** Minimum police priority score */
  policePriorityScoreMin?: InputMaybe<Scalars['Int']>;
  /** Filter by police hub scheme IDs */
  schemeIds?: InputMaybe<Array<Scalars['String']>>;
  /** Case-insensitive search across AI summary, method, and MO */
  search?: InputMaybe<Scalars['String']>;
  /** Filter by associated tag IDs */
  tagIds?: InputMaybe<Array<Scalars['String']>>;
  /** Filter incidents updated after this date */
  updatedAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter incidents updated before this date */
  updatedBefore?: InputMaybe<Scalars['DateTime']>;
};

export type SharedIncidentWhereUniqueInput = {
  id: Scalars['String'];
};

export type SharedOffender = {
  __typename?: 'SharedOffender';
  aiBehavioralAnalysisSnapshot?: Maybe<Scalars['JSON']>;
  aiGenerationAttempts: Scalars['Int'];
  aiGenerationStatus?: Maybe<Scalars['String']>;
  aiGeographicAnalysisSnapshot?: Maybe<Scalars['JSON']>;
  aiIdentityLinkageSnapshot?: Maybe<Scalars['JSON']>;
  aiImpactAssessmentSnapshot?: Maybe<Scalars['JSON']>;
  aiImpactScore?: Maybe<Scalars['Int']>;
  aiImprovements?: Maybe<Scalars['String']>;
  aiKeyObservations: Array<Scalars['String']>;
  aiLastGeneratedAt?: Maybe<Scalars['Date']>;
  aiLastGenerationError?: Maybe<Scalars['String']>;
  aiMO?: Maybe<Scalars['String']>;
  aiMethods: Array<Scalars['String']>;
  aiPatternSignature: Array<Scalars['String']>;
  aiQualityAssessmentSnapshot?: Maybe<Scalars['JSON']>;
  aiQualityScore?: Maybe<Scalars['Int']>;
  aiRecommendedActionsSnapshot?: Maybe<Scalars['JSON']>;
  aiRiskAssessmentSnapshot?: Maybe<Scalars['JSON']>;
  aiSnapshotVersion: Scalars['Int'];
  aiSummary?: Maybe<Scalars['String']>;
  aiTargetAnalysisSnapshot?: Maybe<Scalars['JSON']>;
  aiTemporalAnalysisSnapshot?: Maybe<Scalars['JSON']>;
  createdAt: Scalars['Date'];
  hasImages: Scalars['Boolean'];
  hasName: Scalars['Boolean'];
  id: Scalars['ID'];
  images: Array<Image>;
  lastIncidentAt?: Maybe<Scalars['Date']>;
  lastProcessedIncidentCount: Scalars['Int'];
  lastProcessedOffenderIds: Array<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  offender: Array<Offender>;
  offenderId: Scalars['String'];
  /** Police hub schemes where this offender has been shared */
  policeHubs: Array<Scheme>;
  policePriorityScore?: Maybe<Scalars['Int']>;
  schemes: Array<Scheme>;
  /** Source schemes where this offender has been shared from */
  sources: Array<Scheme>;
  tag: Array<Tag>;
  totalIncidents: Scalars['Int'];
  totalLossValue?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['Date'];
};

export type SharedOffenderRelayOrderInput = {
  aiImpactScore?: InputMaybe<SortOrder>;
  aiLastGeneratedAt?: InputMaybe<SortOrder>;
  aiQualityScore?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  lastIncidentAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  policePriorityScore?: InputMaybe<SortOrder>;
  totalIncidents?: InputMaybe<SortOrder>;
  totalLossValue?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SharedOffenderRelayWhereInput = {
  /** Filter by AI generation status: pending, processing, completed, failed */
  aiGenerationStatus?: InputMaybe<Scalars['String']>;
  /** Maximum AI impact score */
  aiImpactScoreMax?: InputMaybe<Scalars['Int']>;
  /** Minimum AI impact score */
  aiImpactScoreMin?: InputMaybe<Scalars['Int']>;
  /** Filter by AI data generated after this date */
  aiLastGeneratedAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter by AI data generated before this date */
  aiLastGeneratedBefore?: InputMaybe<Scalars['DateTime']>;
  /** Maximum AI quality score */
  aiQualityScoreMax?: InputMaybe<Scalars['Int']>;
  /** Minimum AI quality score */
  aiQualityScoreMin?: InputMaybe<Scalars['Int']>;
  /** Filter offenders created after this date */
  createdAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter offenders created before this date */
  createdBefore?: InputMaybe<Scalars['DateTime']>;
  /** Filter by geographical area based on associated incident locations */
  geographicalFilter?: InputMaybe<GeographicalFilterInput>;
  /** Filter by whether offender has associated images */
  hasImages?: InputMaybe<Scalars['Boolean']>;
  /** Filter by whether offender has a name */
  hasName?: InputMaybe<Scalars['Boolean']>;
  /** Filter offenders with last incident after this date */
  lastIncidentAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter offenders with last incident before this date */
  lastIncidentBefore?: InputMaybe<Scalars['DateTime']>;
  /** Maximum police priority score */
  policePriorityScoreMax?: InputMaybe<Scalars['Int']>;
  /** Minimum police priority score */
  policePriorityScoreMin?: InputMaybe<Scalars['Int']>;
  /** Filter by police hub scheme IDs */
  schemeIds?: InputMaybe<Array<Scalars['String']>>;
  /** Case-insensitive search across name, AI summary, and MO */
  search?: InputMaybe<Scalars['String']>;
  /** Filter by associated tag IDs */
  tagIds?: InputMaybe<Array<Scalars['String']>>;
  /** Filter offenders updated after this date */
  updatedAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter offenders updated before this date */
  updatedBefore?: InputMaybe<Scalars['DateTime']>;
};

export type SharedOffenderWhereUniqueInput = {
  id: Scalars['String'];
};

export type SharedVehicle = {
  __typename?: 'SharedVehicle';
  aiAssociatedRiskSnapshot?: Maybe<Scalars['JSON']>;
  aiGenerationAttempts: Scalars['Int'];
  aiGenerationStatus?: Maybe<Scalars['String']>;
  aiGeographicMovementSnapshot?: Maybe<Scalars['JSON']>;
  aiGeographicPattern?: Maybe<Scalars['String']>;
  aiImprovements?: Maybe<Scalars['String']>;
  aiKeyObservations: Array<Scalars['String']>;
  aiLastGeneratedAt?: Maybe<Scalars['Date']>;
  aiLastGenerationError?: Maybe<Scalars['String']>;
  aiQualityScore?: Maybe<Scalars['Int']>;
  aiSnapshotVersion: Scalars['Int'];
  aiSummary?: Maybe<Scalars['String']>;
  aiUsagePatterns?: Maybe<Scalars['String']>;
  aiVehicleUsageAnalysisSnapshot?: Maybe<Scalars['JSON']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  lastProcessedIncidentCount: Scalars['Int'];
  lastProcessedVehicleIds: Array<Scalars['String']>;
  policePriorityScore?: Maybe<Scalars['Int']>;
  schemes: Array<Scheme>;
  updatedAt: Scalars['Date'];
  vehicle: Array<Vehicle>;
  vehicleId: Scalars['String'];
};

export type SharedVehicleRelayOrderInput = {
  aiLastGeneratedAt?: InputMaybe<SortOrder>;
  aiQualityScore?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  policePriorityScore?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SharedVehicleRelayWhereInput = {
  /** Filter by AI generation status: pending, processing, completed, failed */
  aiGenerationStatus?: InputMaybe<Scalars['String']>;
  /** Filter by AI data generated after this date */
  aiLastGeneratedAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter by AI data generated before this date */
  aiLastGeneratedBefore?: InputMaybe<Scalars['DateTime']>;
  /** Maximum AI quality score */
  aiQualityScoreMax?: InputMaybe<Scalars['Int']>;
  /** Minimum AI quality score */
  aiQualityScoreMin?: InputMaybe<Scalars['Int']>;
  /** Filter vehicles created after this date */
  createdAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter vehicles created before this date */
  createdBefore?: InputMaybe<Scalars['DateTime']>;
  /** Filter by geographical area based on associated incident locations */
  geographicalFilter?: InputMaybe<GeographicalFilterInput>;
  /** Maximum police priority score */
  policePriorityScoreMax?: InputMaybe<Scalars['Int']>;
  /** Minimum police priority score */
  policePriorityScoreMin?: InputMaybe<Scalars['Int']>;
  /** Filter by police hub scheme IDs */
  schemeIds?: InputMaybe<Array<Scalars['String']>>;
  /** Case-insensitive search across AI summary, usage patterns, and geographic pattern */
  search?: InputMaybe<Scalars['String']>;
  /** Filter vehicles updated after this date */
  updatedAfter?: InputMaybe<Scalars['DateTime']>;
  /** Filter vehicles updated before this date */
  updatedBefore?: InputMaybe<Scalars['DateTime']>;
};

export type SharedVehicleWhereUniqueInput = {
  id: Scalars['String'];
};

export type SharingBusiness = {
  __typename?: 'SharingBusiness';
  label: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type SharingConfig = {
  __typename?: 'SharingConfig';
  businessMap?: Maybe<Scalars['JSON']>;
  conditions?: Maybe<Scalars['JSON']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  mode: SharingMode;
  noCondition: Scalars['Boolean'];
  schemeFrom: Scheme;
  schemeTo: Scheme;
  tagMap?: Maybe<Scalars['JSON']>;
  type: SharingType;
  updatedAt: Scalars['Date'];
};

export type SharingConfigConditionsInput = {
  anyAll: AnyAll;
  businesses?: InputMaybe<StringArrayConditionInput>;
  groups?: InputMaybe<StringArrayConditionInput>;
  tags?: InputMaybe<StringArrayConditionInput>;
};

export type SharingConfigCreateInput = {
  businessMap?: InputMaybe<Array<SharingConfigMapInput>>;
  conditions?: InputMaybe<SharingConfigConditionsInput>;
  groupsTo?: InputMaybe<Array<UniqueId>>;
  mode: SharingMode;
  schemeFrom: UniqueId;
  schemeTo: UniqueId;
  tagMap?: InputMaybe<Array<SharingConfigMapInput>>;
  type: SharingType;
};

export type SharingConfigDetail = {
  __typename?: 'SharingConfigDetail';
  /** Sharing conditions as JSON */
  conditions?: Maybe<Scalars['JSON']>;
  /** Sharing config ID */
  configId: Scalars['String'];
  /** When the sharing config was created */
  createdAt: Scalars['Date'];
  /** Models included in sharing (INCIDENT, OFFENDER, VEHICLE, etc.) */
  includedModels: Array<Model>;
  /** Sharing mode (AUTOMATIC or MANUAL) */
  mode: SharingMode;
  /** Tag mapping configuration as JSON */
  tagMap?: Maybe<Scalars['JSON']>;
  /** When the sharing config was last updated */
  updatedAt: Scalars['Date'];
};

export type SharingConfigMapInput = {
  fromId: Scalars['String'];
  toId: Scalars['String'];
};

export type SharingConfigUpdateInput = {
  businessMap?: InputMaybe<SharingConfigMapInput>;
  conditions: SharingConfigConditionsInput;
  groupsTo: Array<UniqueId>;
  mode: SharingMode;
  tagMap?: InputMaybe<SharingConfigMapInput>;
  type: SharingType;
};

export type SharingConfigWhereInput = {
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  schemeFrom?: InputMaybe<SchemeWhereInput>;
  schemeTo?: InputMaybe<SchemeWhereInput>;
};

export type SharingConfigWhereUniqueInput = {
  id: Scalars['String'];
};

export enum SharingMode {
  Automatic = 'AUTOMATIC',
  Manual = 'MANUAL'
}

export enum SharingType {
  Connected = 'CONNECTED',
  External = 'EXTERNAL',
  PoliceHub = 'POLICE_HUB'
}

export type Shoe = {
  __typename?: 'Shoe';
  box: Scalars['Boolean'];
  business: Business;
  businessId: Scalars['String'];
  colour: Scalars['String'];
  createdAt: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['ID'];
  matchedInfo?: Maybe<Scalars['String']>;
  matchedPrimary: Scalars['Boolean'];
  matchedShoeId?: Maybe<Scalars['String']>;
  primaryShoe?: Maybe<Shoe>;
  recycled: Scalars['Boolean'];
  retailPrice: Scalars['Float'];
  secondaryShoe?: Maybe<Shoe>;
  side: ShoeSide;
  size: Scalars['Float'];
  status: ShoeStatus;
  stockItem: StockItem;
  stockItemId: Scalars['String'];
  style: Scalars['String'];
  type: ShoeType;
  updatedAt: Scalars['Date'];
};

export type ShoeOrderByWithRelationInput = {
  box?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  retailPrice?: InputMaybe<SortOrder>;
  size?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ShoeSearchWhereInput = {
  AND?: InputMaybe<Array<ShoeWhereInput>>;
  NOT?: InputMaybe<Array<ShoeWhereInput>>;
  OR?: InputMaybe<Array<ShoeWhereInput>>;
  colour?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  style?: InputMaybe<StringFilter>;
  type?: InputMaybe<EnumShoeTypeFilter>;
};

export enum ShoeSide {
  Left = 'LEFT',
  Right = 'RIGHT'
}

export enum ShoeStatus {
  AwaitingMatch = 'AWAITING_MATCH',
  AwaitingShipping = 'AWAITING_SHIPPING',
  Received = 'RECEIVED',
  Shipped = 'SHIPPED'
}

export enum ShoeType {
  Others = 'OTHERS'
}

export type ShoeWhereInput = {
  AND?: InputMaybe<Array<ShoeWhereInput>>;
  NOT?: InputMaybe<Array<ShoeWhereInput>>;
  OR?: InputMaybe<Array<ShoeWhereInput>>;
  box?: InputMaybe<BoolFilter>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringFilter>;
  colour?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  matchedPrimary?: InputMaybe<BoolFilter>;
  matchedShoeId?: InputMaybe<StringFilter>;
  recycled?: InputMaybe<BoolFilter>;
  retailPrice?: InputMaybe<FloatNullableFilter>;
  search?: InputMaybe<Array<ShoeWhereInput>>;
  side?: InputMaybe<EnumShoeSideFilter>;
  size?: InputMaybe<FloatNullableFilter>;
  status?: InputMaybe<EnumShoeStatusFilter>;
  stockItem?: InputMaybe<StockItemWhereInput>;
  stockItemId?: InputMaybe<StringFilter>;
  style?: InputMaybe<StringFilter>;
  type?: InputMaybe<EnumShoeTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ShoeWhereUniqueInput = {
  AND?: InputMaybe<Array<ShoeWhereInput>>;
  NOT?: InputMaybe<Array<ShoeWhereInput>>;
  OR?: InputMaybe<Array<ShoeWhereInput>>;
  box?: InputMaybe<BoolFilter>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringFilter>;
  colour?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  matchedPrimary?: InputMaybe<BoolFilter>;
  matchedShoeId?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<BoolFilter>;
  retailPrice?: InputMaybe<FloatNullableFilter>;
  side?: InputMaybe<EnumShoeSideFilter>;
  size?: InputMaybe<FloatNullableFilter>;
  status?: InputMaybe<EnumShoeStatusFilter>;
  stockItem?: InputMaybe<StockItemWhereInput>;
  stockItemId?: InputMaybe<StringFilter>;
  style?: InputMaybe<StringFilter>;
  type?: InputMaybe<EnumShoeTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SignIn = {
  __typename?: 'SignIn';
  /** Access token used to authenticate requests to the API. */
  accessToken: Scalars['String'];
  /** Refresh token provided by auth0. */
  refreshToken: Scalars['String'];
};

export type SignTermsInput = {
  signature: Scalars['String'];
  termsId: Scalars['String'];
};

export type SimpleAddressUpdateBusinessInput = {
  data: SimpleLocationSet;
  where: AddressWhereUniqueInput;
};

export type SimpleLocation = {
  alias?: InputMaybe<Scalars['String']>;
  building?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  county?: InputMaybe<Scalars['String']>;
  geoLat?: InputMaybe<Scalars['Float']>;
  geoLng?: InputMaybe<Scalars['Float']>;
  postcode?: InputMaybe<Scalars['String']>;
  premises?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  townCity?: InputMaybe<Scalars['String']>;
};

export type SimpleLocationSet = {
  alias?: InputMaybe<NullableSetStringHelper>;
  building?: InputMaybe<NullableSetStringHelper>;
  country?: InputMaybe<SetStringHelper>;
  county?: InputMaybe<NullableSetStringHelper>;
  geoLat?: InputMaybe<SetFloatHelper>;
  geoLng?: InputMaybe<SetFloatHelper>;
  postcode?: InputMaybe<NullableSetStringHelper>;
  premises?: InputMaybe<SetStringHelper>;
  street?: InputMaybe<NullableSetStringHelper>;
  townCity?: InputMaybe<NullableSetStringHelper>;
};

export type SimpleTagCreate = {
  createdBy: ConnectHelper;
  dataType: Model;
  description: Scalars['String'];
  name: Scalars['String'];
  schemes: ConnectArrayHelper;
};

export enum SmartApproveAction {
  Delete = 'DELETE',
  Flag = 'FLAG',
  Ignore = 'IGNORE'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type SourceSchemeEngagement = {
  __typename?: 'SourceSchemeEngagement';
  /** Most recent view */
  lastViewedAt?: Maybe<Scalars['DateTime']>;
  /** Daily activity for last 30 days */
  recentActivity: Array<RecentViewActivity>;
  /** Top 5 most viewed entities from this source */
  topViewedEntities: Array<TopViewedEntity>;
  /** Total views from police hub */
  totalViews: Scalars['Int'];
  /** Unique officers who viewed */
  uniqueOfficers: Scalars['Int'];
  /** Views broken down by entity type */
  viewsByEntityType: EntityTypeViewBreakdown;
};

export type SourceSchemeStats = {
  __typename?: 'SourceSchemeStats';
  /** Engagement analytics for this source scheme */
  engagementAnalytics: SourceSchemeEngagement;
  scheme: Scheme;
  sharedCounts: SharedEntityCounts;
  sharingConfig: SharingConfig;
};

export type StatementTemplate = {
  __typename?: 'StatementTemplate';
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  schemes: Array<Scheme>;
  updatedAt: Scalars['Date'];
};

export type StatementTemplateCreateInput = {
  content: Scalars['String'];
  name: Scalars['String'];
  schemes?: InputMaybe<ConnectOnlyArrayHelper>;
};

export type StatementTemplateListRelationFilter = {
  every?: InputMaybe<StatementTemplateWhereInput>;
  none?: InputMaybe<StatementTemplateWhereInput>;
  some?: InputMaybe<StatementTemplateWhereInput>;
};

export type StatementTemplateOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type StatementTemplateOrderByWithRelationInput = {
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum StatementTemplateScalarFieldEnum {
  Content = 'content',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type StatementTemplateScalarWhereInput = {
  AND?: InputMaybe<Array<StatementTemplateScalarWhereInput>>;
  NOT?: InputMaybe<Array<StatementTemplateScalarWhereInput>>;
  OR?: InputMaybe<Array<StatementTemplateScalarWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StatementTemplateScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<StatementTemplateScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<StatementTemplateScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<StatementTemplateScalarWhereWithAggregatesInput>>;
  content?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type StatementTemplateUpdateInput = {
  content?: InputMaybe<SetStringHelper>;
  name?: InputMaybe<SetStringHelper>;
  schemes?: InputMaybe<NullableConnectSetArrayHelper>;
};

export type StatementTemplateWhereInput = {
  AND?: InputMaybe<Array<StatementTemplateWhereInput>>;
  NOT?: InputMaybe<Array<StatementTemplateWhereInput>>;
  OR?: InputMaybe<Array<StatementTemplateWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StatementTemplateWhereUniqueInput = {
  AND?: InputMaybe<Array<StatementTemplateWhereInput>>;
  NOT?: InputMaybe<Array<StatementTemplateWhereInput>>;
  OR?: InputMaybe<Array<StatementTemplateWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StockItem = {
  __typename?: 'StockItem';
  barcode?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  costPriceLocal?: Maybe<Scalars['Float']>;
  costPriceStandard?: Maybe<Scalars['Float']>;
  createdAt: Scalars['Date'];
  currency?: Maybe<Currency>;
  division?: Maybe<Scalars['String']>;
  goodsType?: Maybe<GoodsType>;
  goodsTypeId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  salesPriceLocal?: Maybe<Scalars['Float']>;
  salesPriceStandard?: Maybe<Scalars['Float']>;
  sku?: Maybe<Scalars['String']>;
  styleCode?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  variant?: Maybe<Scalars['String']>;
};

export type StockItemCandidate = {
  __typename?: 'StockItemCandidate';
  barcode?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  inStock: Scalars['Boolean'];
  matchScore?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  salesPrice?: Maybe<Scalars['Float']>;
  sku?: Maybe<Scalars['String']>;
  variant?: Maybe<Scalars['String']>;
};

export type StockItemListRelationFilter = {
  every?: InputMaybe<StockItemWhereInput>;
  none?: InputMaybe<StockItemWhereInput>;
  some?: InputMaybe<StockItemWhereInput>;
};

export type StockItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type StockItemOrderByWithRelationInput = {
  barcode?: InputMaybe<SortOrder>;
  brand?: InputMaybe<SortOrder>;
  costPriceLocal?: InputMaybe<SortOrder>;
  costPriceStandard?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  division?: InputMaybe<SortOrder>;
  goodsType?: InputMaybe<GoodsTypeOrderByWithRelationInput>;
  goodsTypeId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incidentItems?: InputMaybe<IncidentItemOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  salesPriceLocal?: InputMaybe<SortOrder>;
  salesPriceStandard?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  sku?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum StockItemScalarFieldEnum {
  Barcode = 'barcode',
  Brand = 'brand',
  CostPriceLocal = 'costPriceLocal',
  CostPriceStandard = 'costPriceStandard',
  CreatedAt = 'createdAt',
  Division = 'division',
  GoodsTypeId = 'goodsTypeId',
  Id = 'id',
  Name = 'name',
  SalesPriceLocal = 'salesPriceLocal',
  SalesPriceStandard = 'salesPriceStandard',
  SchemeId = 'schemeId',
  Sku = 'sku',
  UpdatedAt = 'updatedAt'
}

export type StockItemScalarWhereInput = {
  AND?: InputMaybe<Array<StockItemScalarWhereInput>>;
  NOT?: InputMaybe<Array<StockItemScalarWhereInput>>;
  OR?: InputMaybe<Array<StockItemScalarWhereInput>>;
  barcode?: InputMaybe<StringNullableFilter>;
  brand?: InputMaybe<StringNullableFilter>;
  costPriceLocal?: InputMaybe<FloatNullableFilter>;
  costPriceStandard?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  division?: InputMaybe<StringNullableFilter>;
  goodsTypeId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  salesPriceLocal?: InputMaybe<FloatNullableFilter>;
  salesPriceStandard?: InputMaybe<FloatNullableFilter>;
  schemeId?: InputMaybe<StringNullableFilter>;
  sku?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StockItemScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<StockItemScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<StockItemScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<StockItemScalarWhereWithAggregatesInput>>;
  barcode?: InputMaybe<StringNullableWithAggregatesFilter>;
  brand?: InputMaybe<StringNullableWithAggregatesFilter>;
  costPriceLocal?: InputMaybe<FloatNullableWithAggregatesFilter>;
  costPriceStandard?: InputMaybe<FloatNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  division?: InputMaybe<StringNullableWithAggregatesFilter>;
  goodsTypeId?: InputMaybe<StringNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  salesPriceLocal?: InputMaybe<FloatNullableWithAggregatesFilter>;
  salesPriceStandard?: InputMaybe<FloatNullableWithAggregatesFilter>;
  schemeId?: InputMaybe<StringNullableWithAggregatesFilter>;
  sku?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type StockItemSearchResult = {
  __typename?: 'StockItemSearchResult';
  hasMore?: Maybe<Scalars['String']>;
  stock: Array<StockItem>;
};

export type StockItemStockItem_Sku_Division_UniqueCompoundUniqueInput = {
  barcode: Scalars['String'];
  division: Scalars['String'];
  schemeId: Scalars['String'];
  sku: Scalars['String'];
  variant: Scalars['String'];
};

export type StockItemWhereInput = {
  AND?: InputMaybe<Array<StockItemWhereInput>>;
  NOT?: InputMaybe<Array<StockItemWhereInput>>;
  OR?: InputMaybe<Array<StockItemWhereInput>>;
  barcode?: InputMaybe<StringNullableFilter>;
  brand?: InputMaybe<StringNullableFilter>;
  costPriceLocal?: InputMaybe<FloatNullableFilter>;
  costPriceStandard?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  division?: InputMaybe<StringNullableFilter>;
  goodsType?: InputMaybe<GoodsTypeWhereInput>;
  goodsTypeId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incidentItems?: InputMaybe<IncidentItemListRelationFilter>;
  name?: InputMaybe<StringNullableFilter>;
  salesPriceLocal?: InputMaybe<FloatNullableFilter>;
  salesPriceStandard?: InputMaybe<FloatNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  sku?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StockItemWhereUniqueInput = {
  AND?: InputMaybe<Array<StockItemWhereInput>>;
  NOT?: InputMaybe<Array<StockItemWhereInput>>;
  OR?: InputMaybe<Array<StockItemWhereInput>>;
  StockItem_sku_division_unique?: InputMaybe<StockItemStockItem_Sku_Division_UniqueCompoundUniqueInput>;
  barcode?: InputMaybe<StringNullableFilter>;
  brand?: InputMaybe<StringNullableFilter>;
  costPriceLocal?: InputMaybe<FloatNullableFilter>;
  costPriceStandard?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  division?: InputMaybe<StringNullableFilter>;
  goodsType?: InputMaybe<GoodsTypeWhereInput>;
  goodsTypeId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  incidentItems?: InputMaybe<IncidentItemListRelationFilter>;
  name?: InputMaybe<StringNullableFilter>;
  salesPriceLocal?: InputMaybe<FloatNullableFilter>;
  salesPriceStandard?: InputMaybe<FloatNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  sku?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StockItemsCreateInput = {
  barcode?: InputMaybe<Scalars['String']>;
  brand?: InputMaybe<Scalars['String']>;
  costPriceLocal?: InputMaybe<Scalars['String']>;
  costPriceStandard?: InputMaybe<Scalars['String']>;
  division?: InputMaybe<Scalars['String']>;
  goodsType?: InputMaybe<GoodsTypeWhereUniqueInput>;
  name?: InputMaybe<Scalars['String']>;
  salesPriceLocal?: InputMaybe<Scalars['String']>;
  salesPriceStandard?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeWhereUniqueInput>;
  sku?: InputMaybe<Scalars['String']>;
};

export type StockItemsWhereInput = {
  AND?: InputMaybe<Array<StockItemWhereInput>>;
  NOT?: InputMaybe<Array<StockItemWhereInput>>;
  OR?: InputMaybe<Array<StockItemWhereInput>>;
  barcode?: InputMaybe<StringNullableFilter>;
  brand?: InputMaybe<StringNullableFilter>;
  costPriceLocal?: InputMaybe<FloatNullableFilter>;
  costPriceStandard?: InputMaybe<FloatNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  division?: InputMaybe<StringNullableFilter>;
  goodsType?: InputMaybe<GoodsTypeWhereInput>;
  goodsTypeId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incidentItems?: InputMaybe<IncidentItemListRelationFilter>;
  name?: InputMaybe<StringNullableFilter>;
  salesPriceLocal?: InputMaybe<FloatNullableFilter>;
  salesPriceStandard?: InputMaybe<FloatNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  sku?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StockRemovalCsvExportInput = {
  dateRange: DateRangeInput;
  schemeId: Scalars['String'];
};

export type StockRemovalItem = {
  __typename?: 'StockRemovalItem';
  barcode?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  damaged?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  pickLocation?: Maybe<Scalars['String']>;
  pickedQuantity?: Maybe<Scalars['Int']>;
  requestedQuantity?: Maybe<Scalars['Int']>;
  sku?: Maybe<Scalars['String']>;
  stockItem: StockItem;
  updatedAt: Scalars['Date'];
  value?: Maybe<Scalars['Float']>;
};

export type StockRemovalPickImageInput = {
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  url: Scalars['String'];
};

export enum StockRemovalPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type StockRemovalReasonOption = {
  __typename?: 'StockRemovalReasonOption';
  active: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  label: Scalars['String'];
  position: Scalars['Int'];
  scheme: Scheme;
  schemeId: Scalars['String'];
};

export type StockRemovalRequest = {
  __typename?: 'StockRemovalRequest';
  actions: Array<Action>;
  approvers: Array<StockRemovalRequestApproval>;
  business?: Maybe<Business>;
  costCentreCode?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  createdBy: User;
  dateofReturn?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  destination?: Maybe<StockRemovalRquestDestination>;
  fascia?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isReturn?: Maybe<Scalars['Boolean']>;
  items: Array<StockRemovalItem>;
  nominalCode?: Maybe<Scalars['String']>;
  personalityInfluences?: Maybe<Scalars['String']>;
  pickImages: Array<Image>;
  picker?: Maybe<User>;
  pickerId?: Maybe<Scalars['String']>;
  priority: StockRemovalPriority;
  reason?: Maybe<Scalars['String']>;
  reasonForNonReturn?: Maybe<Scalars['String']>;
  rechargeBrand?: Maybe<Scalars['String']>;
  rechargeReference?: Maybe<Scalars['String']>;
  recipientEmail?: Maybe<Scalars['String']>;
  recipientName?: Maybe<Scalars['String']>;
  recipientPhone?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['Int']>;
  returnDate?: Maybe<Scalars['DateTime']>;
  returnImages: Array<Image>;
  returnOrignalId?: Maybe<Scalars['String']>;
  scheme: Scheme;
  shippingAddress?: Maybe<Scalars['String']>;
  shippingAddressLine1?: Maybe<Scalars['String']>;
  shippingAddressLine2?: Maybe<Scalars['String']>;
  shippingCity?: Maybe<Scalars['String']>;
  shippingCountry?: Maybe<Scalars['String']>;
  shippingCounty?: Maybe<Scalars['String']>;
  shippingPostcode?: Maybe<Scalars['String']>;
  smqAccountNumber?: Maybe<Scalars['String']>;
  socialHandles?: Maybe<Scalars['String']>;
  status: StockRemovalRequestStatus;
  storeOrDC?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  tmid?: Maybe<Scalars['String']>;
  tracking?: Maybe<Scalars['String']>;
  updates: Array<Update>;
  willStockBeReturned?: Maybe<Scalars['String']>;
};


export type StockRemovalRequestUpdatesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};

export type StockRemovalRequestApproval = {
  __typename?: 'StockRemovalRequestApproval';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  status: StockRemovalRequestApprovalStatus;
  user: User;
};

export enum StockRemovalRequestApprovalStatus {
  Approved = 'APPROVED',
  Open = 'OPEN',
  Rejected = 'REJECTED'
}

export enum StockRemovalRequestStatus {
  AwaitingPapApproval = 'AWAITING_PAP_APPROVAL',
  AwaitingReturn = 'AWAITING_RETURN',
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED',
  Collected = 'COLLECTED',
  Open = 'OPEN',
  PendingApproval = 'PENDING_APPROVAL',
  Picked = 'PICKED',
  Picking = 'PICKING',
  RequestedCancel = 'REQUESTED_CANCEL',
  Returned = 'RETURNED'
}

export type StockRemovalRequestsOrderBy = {
  createdAt?: InputMaybe<SortOrder>;
};

export type StockRemovalRequestsWhere = {
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdByMe?: InputMaybe<Scalars['Boolean']>;
  destination?: InputMaybe<Array<StockRemovalRquestDestination>>;
  isReturn?: InputMaybe<Scalars['Boolean']>;
  pickerIds?: InputMaybe<Array<Scalars['String']>>;
  priority?: InputMaybe<Array<StockRemovalPriority>>;
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<StockRemovalRequestStatus>>;
};

export type StockRemovalReturnImageInput = {
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  url: Scalars['String'];
};

export enum StockRemovalRquestDestination {
  CustomerCare = 'CUSTOMER_CARE',
  Eu = 'EU',
  HeadOffice = 'HEAD_OFFICE',
  International = 'INTERNATIONAL',
  Outdoor = 'OUTDOOR',
  Uk = 'UK'
}

export type StoreAgeBreakdown = {
  __typename?: 'StoreAgeBreakdown';
  nonYouth: Scalars['Int'];
  youth: Scalars['Int'];
};

export type StoreColleagueActionItems = {
  __typename?: 'StoreColleagueActionItems';
  /** Bans for business offenders expiring within 7 days */
  bansExpiringSoon: Array<StoreColleagueExpiringBan>;
  /** Incidents at this business awaiting approval */
  incidentsPendingApproval: Array<StoreColleaguePendingIncident>;
};

export type StoreColleagueActiveBans = {
  __typename?: 'StoreColleagueActiveBans';
  /** Bans expiring within 30 days — urgent awareness */
  expiringWithin30Days: Array<StoreColleagueBanItem>;
  /** Bans valid for more than 30 days — general awareness */
  longerTerm: Array<StoreColleagueBanItem>;
};

export type StoreColleagueBanItem = {
  __typename?: 'StoreColleagueBanItem';
  daysRemaining: Scalars['Int'];
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  offenderId: Scalars['String'];
  /** Images associated with this offender */
  offenderImages: Scalars['JSON'];
  offenderName?: Maybe<Scalars['String']>;
};

export type StoreColleagueCrimePatterns = {
  __typename?: 'StoreColleagueCrimePatterns';
  /** Day of week (0=Sunday) with most incidents, or null */
  peakDay?: Maybe<Scalars['Int']>;
  /** Top 3 hours by incident count (last 90 days) */
  peakHours: Array<StoreColleaguePeakHour>;
  /** Top 3 most stolen goods in last 90 days */
  topStolenGoods: Array<StoreColleagueTopGood>;
};

export type StoreColleagueDashboardData = {
  __typename?: 'StoreColleagueDashboardData';
  /** Items requiring immediate attention */
  actionItems?: Maybe<StoreColleagueActionItems>;
  /** Active bans partitioned by urgency */
  activeBans?: Maybe<StoreColleagueActiveBans>;
  /** Peak hours, peak day, and top stolen goods (last 90 days) */
  crimePatterns?: Maybe<StoreColleagueCrimePatterns>;
  /** Scheme-wide context, only returned when schemeId is provided */
  localAreaContext?: Maybe<StoreColleagueLocalAreaContext>;
  /** Top 10 offenders by recency (last 90 days) */
  offenderWatchlist?: Maybe<Array<StoreColleagueWatchlistOffender>>;
  /** Last 10 incidents at this business */
  recentIncidents?: Maybe<Array<StoreColleagueRecentIncident>>;
  /** Multi-period pulse metrics for this business */
  summary: StoreColleagueSummary;
  /** Repeat offender patterns for this business */
  watchlistInsights?: Maybe<StoreColleagueWatchlistInsights>;
};

export enum StoreColleagueDashboardSection {
  ActionItems = 'ACTION_ITEMS',
  ActiveBans = 'ACTIVE_BANS',
  CrimePatterns = 'CRIME_PATTERNS',
  LocalAreaContext = 'LOCAL_AREA_CONTEXT',
  OffenderWatchlist = 'OFFENDER_WATCHLIST',
  RecentIncidents = 'RECENT_INCIDENTS',
  Summary = 'SUMMARY',
  WatchlistInsights = 'WATCHLIST_INSIGHTS'
}

export type StoreColleagueExpiringBan = {
  __typename?: 'StoreColleagueExpiringBan';
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  offenderName?: Maybe<Scalars['String']>;
};

export type StoreColleagueLocalAreaContext = {
  __typename?: 'StoreColleagueLocalAreaContext';
  /** Distinct offenders active across scheme this week */
  schemeActiveOffenders: Scalars['Int'];
  /** Total incidents across scheme this week */
  schemeIncidentsThisWeek: Scalars['Int'];
  /** Top 3 offenders by incident count across scheme this week */
  topSchemeOffenders: Array<StoreColleagueSchemeOffender>;
};

export type StoreColleaguePeakHour = {
  __typename?: 'StoreColleaguePeakHour';
  count: Scalars['Int'];
  /** Hour of day (0-23) */
  hour: Scalars['Int'];
};

export type StoreColleaguePendingIncident = {
  __typename?: 'StoreColleaguePendingIncident';
  date: Scalars['DateTime'];
  id: Scalars['String'];
  reference?: Maybe<Scalars['Int']>;
};

export type StoreColleagueRecentIncident = {
  __typename?: 'StoreColleagueRecentIncident';
  approved?: Maybe<Scalars['Boolean']>;
  /** INCIDENT_CRIME_TYPE tag names */
  crimeTypes: Array<Scalars['String']>;
  date: Scalars['DateTime'];
  id: Scalars['String'];
  offenderCount: Scalars['Int'];
  reference?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Float']>;
};

export type StoreColleagueSchemeOffender = {
  __typename?: 'StoreColleagueSchemeOffender';
  incidentCount: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
};

export type StoreColleagueSummary = {
  __typename?: 'StoreColleagueSummary';
  /** Active bans for offenders who have targeted this business */
  activeBansCount: Scalars['Int'];
  /** Incidents at this business awaiting approval */
  pendingApprovalCount: Scalars['Int'];
  /** Incidents at this business in the last 30 days */
  thisMonthCount: Scalars['Int'];
  /** Incidents at this business in the last 7 days */
  thisWeekCount: Scalars['Int'];
  /** Incidents at this business today */
  todayCount: Scalars['Int'];
  /** true when the offender watchlist is geo-radius filtered rather than business-scoped */
  watchlistGeoBounded: Scalars['Boolean'];
  /** The radius used for geo-bounded watchlist filtering (null when not geo-filtered) */
  watchlistRadiusMeters?: Maybe<Scalars['Float']>;
  /** % change in incidents vs previous week (null if no prior data) */
  weeklyChange?: Maybe<Scalars['Float']>;
};

export type StoreColleagueTopGood = {
  __typename?: 'StoreColleagueTopGood';
  count: Scalars['Int'];
  name: Scalars['String'];
};

export type StoreColleagueWatchlistInsights = {
  __typename?: 'StoreColleagueWatchlistInsights';
  /** Average days between incidents for repeat offenders */
  averageDaysBetweenIncidents: Scalars['Float'];
  /** Distribution: period0to30, period31to90, period91to180, period180plus */
  recidivismDistribution: Scalars['JSON'];
  /** Top 3 highest-frequency offenders at this business */
  topByFrequency: Array<StoreColleagueWatchlistOffender>;
  /** Offenders with 3+ incidents at this business in 90 days */
  totalRepeatOffenders: Scalars['Int'];
};

export type StoreColleagueWatchlistOffender = {
  __typename?: 'StoreColleagueWatchlistOffender';
  id: Scalars['String'];
  /** Images associated with this offender */
  images: Scalars['JSON'];
  incidentCount: Scalars['Int'];
  /** Whether this offender has an active ban right now */
  isCurrentlyBanned: Scalars['Boolean'];
  lastIncidentDate?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['Int']>;
  totalValue: Scalars['Float'];
};

export type StoreIncidentMetrics = {
  __typename?: 'StoreIncidentMetrics';
  totalCount: Scalars['Int'];
  totalValue: Scalars['Float'];
  withCCTV: Scalars['Int'];
  withoutCCTV: Scalars['Int'];
};

export type StoreOffenderBreakdown = {
  __typename?: 'StoreOffenderBreakdown';
  named: Scalars['Int'];
  nickname: Scalars['Int'];
  unknown: Scalars['Int'];
};

export type StorePoliceInteraction = {
  __typename?: 'StorePoliceInteraction';
  notReported: Scalars['Int'];
  policeCalled: Scalars['Int'];
  policeResponded: Scalars['Int'];
};

export type StoreQualityMetrics = {
  __typename?: 'StoreQualityMetrics';
  averageActionableScore: Scalars['Int'];
  averageOffenderIdentityScore: Scalars['Int'];
  averageTriageScore: Scalars['Int'];
};

export type StoreRepeatOffenders = {
  __typename?: 'StoreRepeatOffenders';
  count: Scalars['Int'];
  hotOffenders: Scalars['Int'];
  totalIncidents: Scalars['Int'];
};

export type StoreTriageStatistics = {
  __typename?: 'StoreTriageStatistics';
  ageBreakdown: StoreAgeBreakdown;
  incidentMetrics: StoreIncidentMetrics;
  offenderBreakdown: StoreOffenderBreakdown;
  policeInteraction: StorePoliceInteraction;
  qualityMetrics: StoreQualityMetrics;
  repeatOffenders: StoreRepeatOffenders;
  storeId: Scalars['String'];
  storeName: Scalars['String'];
};

export type StreamAudioData = {
  __typename?: 'StreamAudioData';
  confidence?: Maybe<Scalars['Float']>;
  extractedData?: Maybe<ExtractedIncidentData>;
  formData?: Maybe<FormData>;
  isComplete: Scalars['Boolean'];
  missingRequiredFields?: Maybe<Array<Scalars['String']>>;
  partialTranscript?: Maybe<Scalars['String']>;
  sessionId: Scalars['String'];
  status: Scalars['String'];
  suggestedQuestions?: Maybe<Array<SuggestedQuestion>>;
};

export type StringArrayConditionInput = {
  anyAll: AnyAll;
  ids: Array<Scalars['String']>;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>;
  has?: InputMaybe<Scalars['String']>;
  hasEvery?: InputMaybe<Array<Scalars['String']>>;
  hasSome?: InputMaybe<Array<Scalars['String']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type StringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Style = {
  __typename?: 'Style';
  height: Scalars['Int'];
  width: Scalars['Int'];
};

export type SubmitBusinessAnswersInput = {
  answers: Array<BusinessAnswerInput>;
  businessId: Scalars['String'];
};

export type SubmitBusinessAnswersResult = {
  __typename?: 'SubmitBusinessAnswersResult';
  message?: Maybe<Scalars['String']>;
  savedAnswers: Scalars['Int'];
  success: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Subscription for chat messages list */
  chatMessages: Array<MessageItem>;
  /** Subscription for new messages in a chat */
  newMessage: Message;
  streamEnhancedAudioIncident: EnhancedStreamAudioData;
};


export type SubscriptionChatMessagesArgs = {
  chatId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type SubscriptionNewMessageArgs = {
  chatId: Scalars['ID'];
};


export type SubscriptionStreamEnhancedAudioIncidentArgs = {
  sessionId: Scalars['String'];
};

export type SubsectionInput = {
  order: Scalars['Int'];
  questions: Array<QuestionInput>;
  title: Scalars['String'];
};

export type SuggestedQuestion = {
  __typename?: 'SuggestedQuestion';
  field: Scalars['String'];
  formField: Scalars['String'];
  id: Scalars['String'];
  priority: Scalars['String'];
  question: Scalars['String'];
  questionType?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
};

export type SyncBusinessGroupsInput = {
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  schemeId: Scalars['String'];
  strategy?: InputMaybe<GroupSyncStrategy>;
};

export type SyncBusinessGroupsResult = {
  __typename?: 'SyncBusinessGroupsResult';
  businessResults: Array<BusinessSyncResult>;
  businessesProcessed: Scalars['Int'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
  totalErrors: Scalars['Int'];
  totalIncidentsUpdated: Scalars['Int'];
  totalOffendersUpdated: Scalars['Int'];
  totalVehiclesUpdated: Scalars['Int'];
};

/** Result of syncing police forces for businesses based on their postcodes */
export type SyncPoliceForceResult = {
  __typename?: 'SyncPoliceForceResult';
  /** Path to CSV file containing failed businesses (if any errors occurred) */
  csvUrl?: Maybe<Scalars['String']>;
  /** Duration of the operation in milliseconds */
  duration?: Maybe<Scalars['Int']>;
  /** Number of businesses that failed to update */
  errors?: Maybe<Scalars['Int']>;
  /** Total number of businesses processed */
  processed?: Maybe<Scalars['Int']>;
  /** Whether the sync operation completed successfully */
  success: Scalars['Boolean'];
  /** Number of businesses successfully updated with police force data */
  updated?: Maybe<Scalars['Int']>;
};

export type SystemTask = {
  __typename?: 'SystemTask';
  success: Scalars['Boolean'];
};

export type Tag = {
  __typename?: 'Tag';
  actions: Array<Action>;
  articles: Array<Article>;
  businesses: Array<Business>;
  childTags: Array<Tag>;
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['String'];
  crimeType?: Maybe<CrimeType>;
  dataType: Model;
  description: Scalars['String'];
  descriptionTranslations: Array<Scalars['JSON']>;
  documents: Array<Document>;
  id: Scalars['ID'];
  incidentForm?: Maybe<IncidentForm>;
  incidentFormId?: Maybe<Scalars['String']>;
  incidents: Array<Incident>;
  name: Scalars['String'];
  nameTranslations: Array<Scalars['JSON']>;
  offenders: Array<Offender>;
  orders: Array<TagOrder>;
  parentTag?: Maybe<Tag>;
  parentTagId?: Maybe<Scalars['String']>;
  policeReporting: Scalars['Boolean'];
  policeSharing: Scalars['Boolean'];
  recycleBin?: Maybe<RecycledItem>;
  recycled?: Maybe<Scalars['Boolean']>;
  roles: Array<CustomRole>;
  scheme?: Maybe<Scheme>;
  schemeId?: Maybe<Scalars['String']>;
  schemes: Array<Scheme>;
  tagQuestions: Array<TagQuestion>;
  translations: Array<Scalars['JSON']>;
  type: TagType;
  updatedAt: Scalars['Date'];
  uploaded?: Maybe<Scalars['Boolean']>;
  users: Array<User>;
};


export type TagActionsArgs = {
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type TagArticlesArgs = {
  cursor?: InputMaybe<ArticleWhereUniqueInput>;
  distinct?: InputMaybe<ArticleScalarFieldEnum>;
  orderBy?: InputMaybe<ArticleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type TagBusinessesArgs = {
  cursor?: InputMaybe<BusinessWhereUniqueInput>;
  distinct?: InputMaybe<BusinessScalarFieldEnum>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BusinessWhereInput>;
};


export type TagChildTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  distinct?: InputMaybe<TagScalarFieldEnum>;
  orderBy?: InputMaybe<TagOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};


export type TagDocumentsArgs = {
  cursor?: InputMaybe<DocumentWhereUniqueInput>;
  distinct?: InputMaybe<Array<DocumentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DocumentWhereInput>;
};


export type TagIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type TagOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type TagOrdersArgs = {
  cursor?: InputMaybe<TagOrderWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagOrderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagOrderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagOrderWhereInput>;
};


export type TagSchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};


export type TagTagQuestionsArgs = {
  cursor?: InputMaybe<TagQuestionWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagQuestionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagQuestionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagQuestionWhereInput>;
};


export type TagUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type TagCreateInput = {
  createdBy: ConnectHelper;
  crimeType?: InputMaybe<CrimeType>;
  dataType: Model;
  description: Scalars['String'];
  name: Scalars['String'];
  parentTag?: InputMaybe<ConnectHelper>;
  roles?: InputMaybe<ConnectOnlyArrayHelper>;
  scheme?: InputMaybe<ConnectHelper>;
  schemes?: InputMaybe<ConnectOnlyArrayHelper>;
  type?: InputMaybe<TagType>;
};

export type TagCreateNestedManyWithoutOffenders = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  create?: InputMaybe<Array<TagCreateWithoutOffenders>>;
};

export type TagCreateWithoutOffenders = {
  createdBy: ConnectHelper;
  dataType: Model;
  description: Scalars['String'];
  name: Scalars['String'];
  schemes: ConnectOnlyArrayHelper;
};

export type TagDetail = {
  __typename?: 'TagDetail';
  /** Data type (INCIDENT, OFFENDER, etc.) */
  dataType: Model;
  /** Tag description */
  description: Scalars['String'];
  /** Tag ID */
  id: Scalars['String'];
  /** Tag name */
  name: Scalars['String'];
  /** Whether this tag is enabled for police sharing */
  policeSharing: Scalars['Boolean'];
};

export type TagListRelationFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagOrder = {
  __typename?: 'TagOrder';
  id: Scalars['ID'];
  order: Scalars['Int'];
  scheme: Scheme;
  tag: Tag;
};

export type TagOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TagOrderByWithRelationInput = {
  childTags?: InputMaybe<TagOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  crimeType?: InputMaybe<SortOrder>;
  dataType?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  documents?: InputMaybe<DocumentOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  incidentForm?: InputMaybe<IncidentFormOrderByWithRelationInput>;
  incidentFormId?: InputMaybe<SortOrder>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  orders?: InputMaybe<TagOrderOrderByRelationAggregateInput>;
  parentTag?: InputMaybe<TagOrderByWithRelationInput>;
  parentTagId?: InputMaybe<SortOrder>;
  recycleBin?: InputMaybe<RecycledItemOrderByWithRelationInput>;
  recycled?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  tagQuestions?: InputMaybe<TagQuestionOrderByRelationAggregateInput>;
  translations?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uploaded?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
};

export type TagOrderListRelationFilter = {
  every?: InputMaybe<TagOrderWhereInput>;
  none?: InputMaybe<TagOrderWhereInput>;
  some?: InputMaybe<TagOrderWhereInput>;
};

export type TagOrderOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TagOrderOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  order?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  tag?: InputMaybe<TagOrderByWithRelationInput>;
  tagId?: InputMaybe<SortOrder>;
};

export enum TagOrderScalarFieldEnum {
  Id = 'id',
  Order = 'order',
  SchemeId = 'schemeId',
  TagId = 'tagId'
}

export type TagOrderScalarWhereInput = {
  AND?: InputMaybe<Array<TagOrderScalarWhereInput>>;
  NOT?: InputMaybe<Array<TagOrderScalarWhereInput>>;
  OR?: InputMaybe<Array<TagOrderScalarWhereInput>>;
  id?: InputMaybe<StringFilter>;
  order?: InputMaybe<IntFilter>;
  schemeId?: InputMaybe<StringFilter>;
  tagId?: InputMaybe<StringFilter>;
};

export type TagOrderScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TagOrderScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TagOrderScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TagOrderScalarWhereWithAggregatesInput>>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  order?: InputMaybe<IntWithAggregatesFilter>;
  schemeId?: InputMaybe<StringWithAggregatesFilter>;
  tagId?: InputMaybe<StringWithAggregatesFilter>;
};

export type TagOrderWhereInput = {
  AND?: InputMaybe<Array<TagOrderWhereInput>>;
  NOT?: InputMaybe<Array<TagOrderWhereInput>>;
  OR?: InputMaybe<Array<TagOrderWhereInput>>;
  id?: InputMaybe<StringFilter>;
  order?: InputMaybe<IntFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  tag?: InputMaybe<TagWhereInput>;
  tagId?: InputMaybe<StringFilter>;
};

export type TagOrderWhereUniqueInput = {
  AND?: InputMaybe<Array<TagOrderWhereInput>>;
  NOT?: InputMaybe<Array<TagOrderWhereInput>>;
  OR?: InputMaybe<Array<TagOrderWhereInput>>;
  id?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<IntFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  tag?: InputMaybe<TagWhereInput>;
  tagId?: InputMaybe<StringFilter>;
};

export type TagQuestion = {
  __typename?: 'TagQuestion';
  actions: Array<Scalars['JSON']>;
  answers: Array<Answer>;
  createdAt: Scalars['Date'];
  dependentBrands: Array<Scalars['String']>;
  dependentQuestions: Array<Scalars['JSON']>;
  dependentTags: Array<Scalars['String']>;
  id: Scalars['String'];
  priority: Scalars['Int'];
  question: Question;
  req: Scalars['Boolean'];
  roles: Array<CustomRole>;
  tag: Tag;
  tooltip?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type TagQuestionListRelationFilter = {
  every?: InputMaybe<TagQuestionWhereInput>;
  none?: InputMaybe<TagQuestionWhereInput>;
  some?: InputMaybe<TagQuestionWhereInput>;
};

export type TagQuestionOnQInput = {
  id: Scalars['String'];
  req: Scalars['Boolean'];
};

export type TagQuestionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TagQuestionOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  dependentQuestions?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  priority?: InputMaybe<SortOrder>;
  question?: InputMaybe<QuestionOrderByWithRelationInput>;
  questionId?: InputMaybe<SortOrder>;
  req?: InputMaybe<SortOrder>;
  tag?: InputMaybe<TagOrderByWithRelationInput>;
  tagId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum TagQuestionScalarFieldEnum {
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  DependentQuestions = 'dependentQuestions',
  Id = 'id',
  Priority = 'priority',
  QuestionId = 'questionId',
  Req = 'req',
  TagId = 'tagId',
  UpdatedAt = 'updatedAt'
}

export type TagQuestionScalarWhereInput = {
  AND?: InputMaybe<Array<TagQuestionScalarWhereInput>>;
  NOT?: InputMaybe<Array<TagQuestionScalarWhereInput>>;
  OR?: InputMaybe<Array<TagQuestionScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  dependentQuestions?: InputMaybe<JsonNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  priority?: InputMaybe<IntFilter>;
  questionId?: InputMaybe<StringFilter>;
  req?: InputMaybe<BoolFilter>;
  tagId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TagQuestionScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TagQuestionScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TagQuestionScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TagQuestionScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  deleted?: InputMaybe<BoolWithAggregatesFilter>;
  dependentQuestions?: InputMaybe<JsonNullableListFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  priority?: InputMaybe<IntWithAggregatesFilter>;
  questionId?: InputMaybe<StringWithAggregatesFilter>;
  req?: InputMaybe<BoolWithAggregatesFilter>;
  tagId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type TagQuestionWhereInput = {
  AND?: InputMaybe<Array<TagQuestionWhereInput>>;
  NOT?: InputMaybe<Array<TagQuestionWhereInput>>;
  OR?: InputMaybe<Array<TagQuestionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  dependentQuestions?: InputMaybe<JsonNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  priority?: InputMaybe<IntFilter>;
  question?: InputMaybe<QuestionWhereInput>;
  questionId?: InputMaybe<StringFilter>;
  req?: InputMaybe<BoolFilter>;
  tag?: InputMaybe<TagWhereInput>;
  tagId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TagQuestionWhereUniqueInput = {
  AND?: InputMaybe<Array<TagQuestionWhereInput>>;
  NOT?: InputMaybe<Array<TagQuestionWhereInput>>;
  OR?: InputMaybe<Array<TagQuestionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  dependentQuestions?: InputMaybe<JsonNullableListFilter>;
  id?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<IntFilter>;
  question?: InputMaybe<QuestionWhereInput>;
  questionId?: InputMaybe<StringFilter>;
  req?: InputMaybe<BoolFilter>;
  tag?: InputMaybe<TagWhereInput>;
  tagId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export enum TagScalarFieldEnum {
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  CrimeType = 'crimeType',
  DataType = 'dataType',
  Description = 'description',
  Id = 'id',
  IncidentFormId = 'incidentFormId',
  Name = 'name',
  ParentTagId = 'parentTagId',
  Recycled = 'recycled',
  SchemeId = 'schemeId',
  Translations = 'translations',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  Uploaded = 'uploaded'
}

export type TagScalarWhereInput = {
  AND?: InputMaybe<Array<TagScalarWhereInput>>;
  NOT?: InputMaybe<Array<TagScalarWhereInput>>;
  OR?: InputMaybe<Array<TagScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringFilter>;
  crimeType?: InputMaybe<EnumCrimeTypeNullableFilter>;
  dataType?: InputMaybe<EnumModelFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  incidentFormId?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  parentTagId?: InputMaybe<StringNullableFilter>;
  recycled?: InputMaybe<BoolNullableFilter>;
  schemeId?: InputMaybe<StringNullableFilter>;
  translations?: InputMaybe<JsonNullableListFilter>;
  type?: InputMaybe<EnumTagTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
};

export type TagScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TagScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TagScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TagScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  createdById?: InputMaybe<StringWithAggregatesFilter>;
  crimeType?: InputMaybe<EnumCrimeTypeNullableWithAggregatesFilter>;
  dataType?: InputMaybe<EnumModelWithAggregatesFilter>;
  description?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentFormId?: InputMaybe<StringNullableWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  parentTagId?: InputMaybe<StringNullableWithAggregatesFilter>;
  recycled?: InputMaybe<BoolNullableWithAggregatesFilter>;
  schemeId?: InputMaybe<StringNullableWithAggregatesFilter>;
  translations?: InputMaybe<JsonNullableListFilter>;
  type?: InputMaybe<EnumTagTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  uploaded?: InputMaybe<BoolNullableWithAggregatesFilter>;
};

export type TagTotal = {
  __typename?: 'TagTotal';
  count: Scalars['Int'];
  name: Scalars['String'];
};

export enum TagType {
  IncidentCrimeType = 'INCIDENT_CRIME_TYPE',
  IncidentImpact = 'INCIDENT_IMPACT',
  IncidentInvolved = 'INCIDENT_INVOLVED',
  IncidentMotive = 'INCIDENT_MOTIVE'
}

export type TagUpdateInput = {
  crimeType?: InputMaybe<NullableEnumCrimeTypeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<SetStringHelper>;
  name?: InputMaybe<SetStringHelper>;
  parentTag?: InputMaybe<ConnectIdDisconnectBool>;
  roles?: InputMaybe<NullableConnectArrayHelper>;
  schemes?: InputMaybe<NullableConnectArrayHelper>;
};

export type TagUpdateManyWithoutIncidentsInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  create?: InputMaybe<Array<SimpleTagCreate>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  businesses?: InputMaybe<BusinessListRelationFilter>;
  childTags?: InputMaybe<TagListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeType?: InputMaybe<EnumCrimeTypeNullableFilter>;
  dataType?: InputMaybe<EnumModelFilter>;
  description?: InputMaybe<StringFilter>;
  documents?: InputMaybe<DocumentListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  incidentForm?: InputMaybe<IncidentFormWhereInput>;
  incidentFormId?: InputMaybe<StringNullableFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  orders?: InputMaybe<TagOrderListRelationFilter>;
  parentTag?: InputMaybe<TagWhereInput>;
  parentTagId?: InputMaybe<StringNullableFilter>;
  recycleBin?: InputMaybe<RecycledItemWhereInput>;
  recycled?: InputMaybe<BoolNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  tagQuestions?: InputMaybe<TagQuestionListRelationFilter>;
  translations?: InputMaybe<JsonNullableListFilter>;
  type?: InputMaybe<EnumTagTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type TagWhereUniqueInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  businesses?: InputMaybe<BusinessListRelationFilter>;
  childTags?: InputMaybe<TagListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeType?: InputMaybe<EnumCrimeTypeNullableFilter>;
  dataType?: InputMaybe<EnumModelFilter>;
  description?: InputMaybe<StringFilter>;
  documents?: InputMaybe<DocumentListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  incidentForm?: InputMaybe<IncidentFormWhereInput>;
  incidentFormId?: InputMaybe<StringNullableFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  orders?: InputMaybe<TagOrderListRelationFilter>;
  parentTag?: InputMaybe<TagWhereInput>;
  parentTagId?: InputMaybe<StringNullableFilter>;
  recycleBin?: InputMaybe<RecycledItemWhereInput>;
  recycled?: InputMaybe<BoolNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  tagQuestions?: InputMaybe<TagQuestionListRelationFilter>;
  translations?: InputMaybe<JsonNullableListFilter>;
  type?: InputMaybe<EnumTagTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type TagsOnBusiness = {
  connect?: InputMaybe<Array<UniqueId>>;
  create?: InputMaybe<Array<SimpleTagCreate>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
};

export type TargetedGood = {
  __typename?: 'TargetedGood';
  alertId: Scalars['String'];
  averageLossValue: Scalars['Float'];
  name: Scalars['String'];
  totalIncidents: Scalars['Int'];
  totalLostValue: Scalars['Float'];
  totalOffenders: Scalars['Int'];
  totalRecoveredValue: Scalars['Float'];
  totalSuccessRate: Scalars['Float'];
};

export type TaskData = {
  __typename?: 'TaskData';
  businesses?: Maybe<Array<Scalars['String']>>;
  dueDays: Scalars['Int'];
  name: Scalars['String'];
  questionGroupId?: Maybe<Scalars['String']>;
  questions: Array<Scalars['String']>;
};

export type TaskInput = {
  businesses?: InputMaybe<Array<Scalars['String']>>;
  dueDays: Scalars['Int'];
  name: Scalars['String'];
  questionGroupId?: InputMaybe<Scalars['String']>;
  questions: Array<Scalars['String']>;
};

export type TaskQuestion = {
  __typename?: 'TaskQuestion';
  answers: Array<Answer>;
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  priority: Scalars['Int'];
  question: Question;
  req: Scalars['Boolean'];
  task: Todo;
  updatedAt: Scalars['Date'];
};

export type TaskQuestionCreateAnswer = {
  answer: Scalars['String'];
  todo?: InputMaybe<ConnectHelper>;
  type: AnswerType;
};

export type TaskQuestionCreateAnswerWithoutTaskInput = {
  create?: InputMaybe<Array<TaskQuestionCreateAnswer>>;
};

export type TaskQuestionCreateNestedManyWithoutTaskInput = {
  create?: InputMaybe<Array<TaskQuestionCreateWithoutTaskInput>>;
};

export type TaskQuestionCreateWithoutTaskInput = {
  answers?: InputMaybe<TaskQuestionCreateAnswerWithoutTaskInput>;
  question: ConnectHelper;
  req?: InputMaybe<Scalars['Boolean']>;
};

export type TaskQuestionListRelationFilter = {
  every?: InputMaybe<TaskQuestionWhereInput>;
  none?: InputMaybe<TaskQuestionWhereInput>;
  some?: InputMaybe<TaskQuestionWhereInput>;
};

export type TaskQuestionOnQInput = {
  id: Scalars['String'];
  req: Scalars['Boolean'];
};

export type TaskQuestionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TaskQuestionOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  deleted?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  priority?: InputMaybe<SortOrder>;
  question?: InputMaybe<QuestionOrderByWithRelationInput>;
  questionId?: InputMaybe<SortOrder>;
  req?: InputMaybe<SortOrder>;
  task?: InputMaybe<TodoOrderByWithRelationInput>;
  taskId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TaskQuestionScalarWhereInput = {
  AND?: InputMaybe<Array<TaskQuestionScalarWhereInput>>;
  NOT?: InputMaybe<Array<TaskQuestionScalarWhereInput>>;
  OR?: InputMaybe<Array<TaskQuestionScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  priority?: InputMaybe<IntFilter>;
  questionId?: InputMaybe<StringFilter>;
  req?: InputMaybe<BoolFilter>;
  taskId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TaskQuestionScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TaskQuestionScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TaskQuestionScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TaskQuestionScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  deleted?: InputMaybe<BoolWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  priority?: InputMaybe<IntWithAggregatesFilter>;
  questionId?: InputMaybe<StringWithAggregatesFilter>;
  req?: InputMaybe<BoolWithAggregatesFilter>;
  taskId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type TaskQuestionUpdateManyWithoutTaskNestedInput = {
  create?: InputMaybe<Array<TaskQuestionCreateWithoutTaskInput>>;
  update?: InputMaybe<Array<TaskQuestionUpdateWithWhereUniqueWithoutTaskInputFields>>;
};

export type TaskQuestionUpdateWithWhereUniqueWithoutTaskInputFields = {
  data: TaskQuestionUpdateWithoutTaskInputFields;
  where: TaskQuestionWhereUniqueInput;
};

export type TaskQuestionUpdateWithoutTaskInputFields = {
  answers?: InputMaybe<AnswerUpdateManyWithoutTaskQuestionNestedInputFields>;
};

export type TaskQuestionWhereInput = {
  AND?: InputMaybe<Array<TaskQuestionWhereInput>>;
  NOT?: InputMaybe<Array<TaskQuestionWhereInput>>;
  OR?: InputMaybe<Array<TaskQuestionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  priority?: InputMaybe<IntFilter>;
  question?: InputMaybe<QuestionWhereInput>;
  questionId?: InputMaybe<StringFilter>;
  req?: InputMaybe<BoolFilter>;
  task?: InputMaybe<TodoWhereInput>;
  taskId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TaskQuestionWhereUniqueInput = {
  AND?: InputMaybe<Array<TaskQuestionWhereInput>>;
  NOT?: InputMaybe<Array<TaskQuestionWhereInput>>;
  OR?: InputMaybe<Array<TaskQuestionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  id?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<IntFilter>;
  question?: InputMaybe<QuestionWhereInput>;
  questionId?: InputMaybe<StringFilter>;
  req?: InputMaybe<BoolFilter>;
  task?: InputMaybe<TodoWhereInput>;
  taskId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TermsAndCondition = {
  __typename?: 'TermsAndCondition';
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  scheme: Scheme;
  schemes: Array<Scheme>;
  updatedAt: Scalars['Date'];
  userTerms: Array<UserTerm>;
  version: Scalars['Int'];
};

export type TermsAndConditionListRelationFilter = {
  every?: InputMaybe<TermsAndConditionWhereInput>;
  none?: InputMaybe<TermsAndConditionWhereInput>;
  some?: InputMaybe<TermsAndConditionWhereInput>;
};

export type TermsAndConditionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TermsAndConditionOrderByWithRelationInput = {
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  version?: InputMaybe<SortOrder>;
};

export enum TermsAndConditionScalarFieldEnum {
  Content = 'content',
  CreatedAt = 'createdAt',
  Id = 'id',
  SchemeId = 'schemeId',
  UpdatedAt = 'updatedAt',
  Version = 'version'
}

export type TermsAndConditionScalarWhereInput = {
  AND?: InputMaybe<Array<TermsAndConditionScalarWhereInput>>;
  NOT?: InputMaybe<Array<TermsAndConditionScalarWhereInput>>;
  OR?: InputMaybe<Array<TermsAndConditionScalarWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  version?: InputMaybe<IntFilter>;
};

export type TermsAndConditionScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TermsAndConditionScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TermsAndConditionScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TermsAndConditionScalarWhereWithAggregatesInput>>;
  content?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  schemeId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  version?: InputMaybe<IntWithAggregatesFilter>;
};

export type TermsAndConditionWhereInput = {
  AND?: InputMaybe<Array<TermsAndConditionWhereInput>>;
  NOT?: InputMaybe<Array<TermsAndConditionWhereInput>>;
  OR?: InputMaybe<Array<TermsAndConditionWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userTerms?: InputMaybe<UserTermListRelationFilter>;
  version?: InputMaybe<IntFilter>;
};

export type TermsAndConditionWhereUniqueInput = {
  AND?: InputMaybe<Array<TermsAndConditionWhereInput>>;
  NOT?: InputMaybe<Array<TermsAndConditionWhereInput>>;
  OR?: InputMaybe<Array<TermsAndConditionWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userTerms?: InputMaybe<UserTermListRelationFilter>;
  version?: InputMaybe<IntFilter>;
};

export enum ThumbnailStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

export type Tier = {
  __typename?: 'Tier';
  description?: Maybe<Scalars['String']>;
  features: Array<Features>;
  id: Scalars['String'];
  name: Scalars['String'];
  schemes: Array<SchemeTier>;
};

export type TierCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  features: Array<Features>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type TierOrderByWithRelationInput = {
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
};

export type TierUpdateInput = {
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  features?: InputMaybe<EnumFeaturesListUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TierWhereInput = {
  AND?: InputMaybe<Array<TierWhereInput>>;
  NOT?: InputMaybe<Array<TierWhereInput>>;
  OR?: InputMaybe<Array<TierWhereInput>>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
};

export type TierWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type TimeHeatMap = {
  __typename?: 'TimeHeatMap';
  data: Array<HourCountXy>;
  id: Scalars['String'];
};

export type TimeTaken = {
  __typename?: 'TimeTaken';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  timeTaken: Scalars['Int'];
  todo: Todo;
  updatedAt: Scalars['Date'];
  user: User;
};

export type TimeTakenCreateManyEnvelope = {
  createMany?: InputMaybe<TimeTakenCreateManyInputEnvelope>;
};

export type TimeTakenCreateManyInput = {
  timeTaken: Scalars['Int'];
  userId: Scalars['String'];
};

export type TimeTakenCreateManyInputEnvelope = {
  data?: InputMaybe<Array<TimeTakenCreateManyInput>>;
};

export type TimeTakenCreateManyTodoInput = {
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['String']>;
  timeTaken: Scalars['Int'];
  updatedAt?: InputMaybe<Scalars['Date']>;
  userId: Scalars['String'];
};

export type TimeTakenCreateManyTodoInputEnvelope = {
  data: Array<TimeTakenCreateManyTodoInput>;
};

export type TimeTakenCreateNestedManyWithoutTodoInput = {
  createMany?: InputMaybe<TimeTakenCreateManyTodoInputEnvelope>;
};

export type TimeTakenListRelationFilter = {
  every?: InputMaybe<TimeTakenWhereInput>;
  none?: InputMaybe<TimeTakenWhereInput>;
  some?: InputMaybe<TimeTakenWhereInput>;
};

export type TimeTakenOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TimeTakenOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  timeTaken?: InputMaybe<SortOrder>;
  todo?: InputMaybe<TodoOrderByWithRelationInput>;
  todoId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum TimeTakenScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  TimeTaken = 'timeTaken',
  TodoId = 'todoId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type TimeTakenScalarWhereInput = {
  AND?: InputMaybe<Array<TimeTakenScalarWhereInput>>;
  NOT?: InputMaybe<Array<TimeTakenScalarWhereInput>>;
  OR?: InputMaybe<Array<TimeTakenScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  timeTaken?: InputMaybe<IntFilter>;
  todoId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type TimeTakenScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TimeTakenScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TimeTakenScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TimeTakenScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  timeTaken?: InputMaybe<IntWithAggregatesFilter>;
  todoId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type TimeTakenWhereInput = {
  AND?: InputMaybe<Array<TimeTakenWhereInput>>;
  NOT?: InputMaybe<Array<TimeTakenWhereInput>>;
  OR?: InputMaybe<Array<TimeTakenWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  timeTaken?: InputMaybe<IntFilter>;
  todo?: InputMaybe<TodoWhereInput>;
  todoId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type TimeTakenWhereUniqueInput = {
  AND?: InputMaybe<Array<TimeTakenWhereInput>>;
  NOT?: InputMaybe<Array<TimeTakenWhereInput>>;
  OR?: InputMaybe<Array<TimeTakenWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  timeTaken?: InputMaybe<IntFilter>;
  todo?: InputMaybe<TodoWhereInput>;
  todoId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type TjxColumnMapping = {
  /** Whether it was a crime or not */
  crimeIncidentColumn?: InputMaybe<Scalars['String']>;
  /** The date and time of the incident */
  dateTimeColumn?: InputMaybe<Scalars['String']>;
  /** The description of the incident */
  descriptionColumn?: InputMaybe<Scalars['String']>;
  /** The location of the incident in the store */
  locationLabelColumn?: InputMaybe<Scalars['String']>;
  /** The store number of the business */
  storeNoColumn?: InputMaybe<Scalars['String']>;
  /** The type of theft incident */
  theftIncidentTypeColumn?: InputMaybe<Scalars['String']>;
  /** The total value of goods involved */
  totalTheftValueColumn?: InputMaybe<Scalars['String']>;
  /** The value of the incident which was lost */
  totalUnrecoveredValueColumn?: InputMaybe<Scalars['String']>;
  /** Whether it was a violent incident */
  violenceAggressionColumn?: InputMaybe<Scalars['String']>;
};

export type TjxIdInput = {
  id: Scalars['String'];
};

export type TjxImportDataInput = {
  /** Optional mapping of CSV/Excel columns to incident fields */
  columnMapping?: InputMaybe<TjxColumnMapping>;
  /** Base64 encoded CSV/Excel data or file content as string (auto-detects format) */
  fileData?: InputMaybe<Scalars['String']>;
  /** URL to download the CSV/Excel file from */
  fileUrl?: InputMaybe<Scalars['String']>;
  /** The group ID to limit business matching to */
  groupId?: InputMaybe<Scalars['String']>;
  scheme: TjxIdInput;
};

export type Todo = {
  __typename?: 'Todo';
  actions?: Maybe<Array<Action>>;
  answers?: Maybe<Array<Answer>>;
  assignedUsers: Array<User>;
  authorised?: Maybe<Scalars['Boolean']>;
  business?: Maybe<Business>;
  chatId?: Maybe<Scalars['String']>;
  checklist?: Maybe<ActiveChecklist>;
  completed?: Maybe<Scalars['Boolean']>;
  completedBy?: Maybe<User>;
  completedById?: Maybe<Scalars['String']>;
  completedDate?: Maybe<Scalars['Date']>;
  createdAt: Scalars['Date'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']>;
  crimeGroup?: Maybe<CrimeGroup>;
  crimeGroupId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['Date']>;
  evidence: Array<Document>;
  groups: Array<Group>;
  id: Scalars['ID'];
  incident?: Maybe<Incident>;
  incidentId?: Maybe<Scalars['String']>;
  investigation?: Maybe<Investigation>;
  investigationId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  offender?: Maybe<Offender>;
  offenderId?: Maybe<Scalars['String']>;
  questions: Array<TaskQuestion>;
  reference?: Maybe<Scalars['Int']>;
  schemes: Array<Scheme>;
  similarOffenderIds: Array<Scalars['String']>;
  timeTaken: Array<TimeTaken>;
  type?: Maybe<TodoType>;
  updatedAt: Scalars['Date'];
  vehicle?: Maybe<Vehicle>;
  vehicleId?: Maybe<Scalars['String']>;
};


export type TodoGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};

export type TodoCreateInput = {
  QuestionGroup?: InputMaybe<ConnectHelper>;
  assignedUsers?: InputMaybe<ConnectOnlyArrayHelper>;
  authorised?: InputMaybe<Scalars['Boolean']>;
  business?: InputMaybe<ConnectHelper>;
  checklist?: InputMaybe<ConnectHelper>;
  completed?: InputMaybe<Scalars['Boolean']>;
  createdBy?: InputMaybe<ConnectHelper>;
  crimeGroup?: InputMaybe<ConnectHelper>;
  description?: InputMaybe<Scalars['String']>;
  documents?: InputMaybe<Array<CreateDocument>>;
  dueDate?: InputMaybe<Scalars['Date']>;
  groups?: InputMaybe<Array<UniqueId>>;
  incident?: InputMaybe<ConnectHelper>;
  investigation?: InputMaybe<ConnectHelper>;
  name?: InputMaybe<Scalars['String']>;
  offender?: InputMaybe<ConnectHelper>;
  questions?: InputMaybe<TaskQuestionCreateNestedManyWithoutTaskInput>;
  schemes?: InputMaybe<ConnectOnlyArrayHelper>;
  similarOffenderIds?: InputMaybe<Array<Scalars['String']>>;
  timeTaken?: InputMaybe<TimeTakenCreateNestedManyWithoutTodoInput>;
  type?: InputMaybe<TodoType>;
  vehicle?: InputMaybe<ConnectHelper>;
};

export type TodoListRelationFilter = {
  every?: InputMaybe<TodoWhereInput>;
  none?: InputMaybe<TodoWhereInput>;
  some?: InputMaybe<TodoWhereInput>;
};

export type TodoOrderBy = {
  createdAt?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
};

export type TodoOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TodoOrderByWithRelationInput = {
  assignedUsers?: InputMaybe<UserOrderByRelationAggregateInput>;
  authorised?: InputMaybe<SortOrder>;
  businessId?: InputMaybe<SortOrder>;
  chat?: InputMaybe<ChatOrderByWithRelationInput>;
  chatId?: InputMaybe<SortOrder>;
  completed?: InputMaybe<SortOrder>;
  completedBy?: InputMaybe<UserOrderByWithRelationInput>;
  completedById?: InputMaybe<SortOrder>;
  completedDate?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  crimeGroup?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  crimeGroupId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  dueDate?: InputMaybe<SortOrder>;
  evidence?: InputMaybe<DocumentOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  investigation?: InputMaybe<InvestigationOrderByWithRelationInput>;
  investigationId?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  questions?: InputMaybe<TaskQuestionOrderByRelationAggregateInput>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  similarOffenderIds?: InputMaybe<SortOrder>;
  timeTaken?: InputMaybe<TimeTakenOrderByRelationAggregateInput>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  vehicle?: InputMaybe<VehicleOrderByWithRelationInput>;
  vehicleId?: InputMaybe<SortOrder>;
};

export type TodoRelayWhereInput = {
  assignedUsers?: InputMaybe<Array<Scalars['String']>>;
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  completedAt?: InputMaybe<DateRangeInput>;
  createdAt?: InputMaybe<DateRangeInput>;
  dueDate?: InputMaybe<DateRangeInput>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  status: TodoStatusInput;
  userMode: TodoUserModeInput;
};

export enum TodoScalarFieldEnum {
  Authorised = 'authorised',
  BusinessId = 'businessId',
  ChatId = 'chatId',
  Completed = 'completed',
  CompletedById = 'completedById',
  CompletedDate = 'completedDate',
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  CrimeGroupId = 'crimeGroupId',
  Description = 'description',
  DueDate = 'dueDate',
  Id = 'id',
  IncidentId = 'incidentId',
  InvestigationId = 'investigationId',
  Name = 'name',
  OffenderId = 'offenderId',
  SimilarOffenderIds = 'similarOffenderIds',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  VehicleId = 'vehicleId'
}

export type TodoScalarWhereInput = {
  AND?: InputMaybe<Array<TodoScalarWhereInput>>;
  NOT?: InputMaybe<Array<TodoScalarWhereInput>>;
  OR?: InputMaybe<Array<TodoScalarWhereInput>>;
  authorised?: InputMaybe<BoolNullableFilter>;
  businessId?: InputMaybe<StringNullableFilter>;
  chatId?: InputMaybe<StringNullableFilter>;
  completed?: InputMaybe<BoolNullableFilter>;
  completedById?: InputMaybe<StringNullableFilter>;
  completedDate?: InputMaybe<DateTimeNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringNullableFilter>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  dueDate?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigationId?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  offenderId?: InputMaybe<StringNullableFilter>;
  similarOffenderIds?: InputMaybe<StringNullableListFilter>;
  type?: InputMaybe<EnumTodoTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export type TodoScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<TodoScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<TodoScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<TodoScalarWhereWithAggregatesInput>>;
  authorised?: InputMaybe<BoolNullableWithAggregatesFilter>;
  businessId?: InputMaybe<StringNullableWithAggregatesFilter>;
  chatId?: InputMaybe<StringNullableWithAggregatesFilter>;
  completed?: InputMaybe<BoolNullableWithAggregatesFilter>;
  completedById?: InputMaybe<StringNullableWithAggregatesFilter>;
  completedDate?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  createdById?: InputMaybe<StringNullableWithAggregatesFilter>;
  crimeGroupId?: InputMaybe<StringNullableWithAggregatesFilter>;
  description?: InputMaybe<StringNullableWithAggregatesFilter>;
  dueDate?: InputMaybe<DateTimeNullableWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentId?: InputMaybe<StringNullableWithAggregatesFilter>;
  investigationId?: InputMaybe<StringNullableWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  offenderId?: InputMaybe<StringNullableWithAggregatesFilter>;
  similarOffenderIds?: InputMaybe<StringNullableListFilter>;
  type?: InputMaybe<EnumTodoTypeNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  vehicleId?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export enum TodoStatusInput {
  All = 'ALL',
  Completed = 'COMPLETED',
  Uncompleted = 'UNCOMPLETED'
}

export enum TodoType {
  ChatMessage = 'CHAT_MESSAGE',
  CrimegroupUpdate = 'CRIMEGROUP_UPDATE',
  IncidentApprove = 'INCIDENT_APPROVE',
  IncidentUpdate = 'INCIDENT_UPDATE',
  InvestigationUpdate = 'INVESTIGATION_UPDATE',
  OffenderApprove = 'OFFENDER_APPROVE',
  OffenderCompare = 'OFFENDER_COMPARE',
  OffenderUpdate = 'OFFENDER_UPDATE',
  ShoeMatch = 'SHOE_MATCH',
  VehicleUpdate = 'VEHICLE_UPDATE'
}

export type TodoUpdateInput = {
  answers?: InputMaybe<AnswerUpdateManyWithoutTodoNestedInput>;
  assignedUsers?: InputMaybe<RelationSet>;
  authorised?: InputMaybe<NullableSetBooleanHelper>;
  businessId?: InputMaybe<Scalars['String']>;
  checklistId?: InputMaybe<Scalars['String']>;
  completed?: InputMaybe<NullableSetBooleanHelper>;
  completedBy?: InputMaybe<ConnectHelper>;
  completedDate?: InputMaybe<NullableSetDateHelper>;
  crimeGroupId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  disconnectBusiness?: InputMaybe<Scalars['Boolean']>;
  disconnectChecklist?: InputMaybe<Scalars['Boolean']>;
  disconnectCrimeGroup?: InputMaybe<Scalars['Boolean']>;
  disconnectIncident?: InputMaybe<Scalars['Boolean']>;
  disconnectInvestigation?: InputMaybe<Scalars['Boolean']>;
  disconnectOffender?: InputMaybe<Scalars['Boolean']>;
  disconnectQuestionGroup?: InputMaybe<Scalars['Boolean']>;
  disconnectVehicle?: InputMaybe<Scalars['Boolean']>;
  documents?: InputMaybe<Array<UpdateDocument>>;
  dueDate?: InputMaybe<NullableSetDateHelper>;
  groups?: InputMaybe<RelationSet>;
  incidentId?: InputMaybe<Scalars['String']>;
  investigationId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  questionGroupId?: InputMaybe<Scalars['String']>;
  questions?: InputMaybe<TaskQuestionUpdateManyWithoutTaskNestedInput>;
  schemes?: InputMaybe<NullableConnectArrayHelper>;
  similarOffenderIds?: InputMaybe<Array<Scalars['String']>>;
  timeTaken?: InputMaybe<TimeTakenCreateManyEnvelope>;
  type?: InputMaybe<NullableEnumTodoTypeFieldUpdateOperationsInput>;
  vehicleId?: InputMaybe<Scalars['String']>;
};

export enum TodoUserModeInput {
  All = 'ALL',
  Current = 'CURRENT',
  Selected = 'SELECTED'
}

export type TodoWhereInput = {
  AND?: InputMaybe<Array<TodoWhereInput>>;
  NOT?: InputMaybe<Array<TodoWhereInput>>;
  OR?: InputMaybe<Array<TodoWhereInput>>;
  assignedUsers?: InputMaybe<UserListRelationFilter>;
  authorised?: InputMaybe<BoolNullableFilter>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringNullableFilter>;
  chat?: InputMaybe<ChatWhereInput>;
  chatId?: InputMaybe<StringNullableFilter>;
  completed?: InputMaybe<BoolNullableFilter>;
  completedBy?: InputMaybe<UserWhereInput>;
  completedById?: InputMaybe<StringNullableFilter>;
  completedDate?: InputMaybe<DateTimeNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringNullableFilter>;
  crimeGroup?: InputMaybe<CrimeGroupWhereInput>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  dueDate?: InputMaybe<DateTimeNullableFilter>;
  evidence?: InputMaybe<DocumentListRelationFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigation?: InputMaybe<InvestigationWhereInput>;
  investigationId?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  questions?: InputMaybe<TaskQuestionListRelationFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  similarOffenderIds?: InputMaybe<StringNullableListFilter>;
  timeTaken?: InputMaybe<TimeTakenListRelationFilter>;
  type?: InputMaybe<EnumTodoTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicle?: InputMaybe<VehicleWhereInput>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export type TodoWhereUniqueInput = {
  AND?: InputMaybe<Array<TodoWhereInput>>;
  NOT?: InputMaybe<Array<TodoWhereInput>>;
  OR?: InputMaybe<Array<TodoWhereInput>>;
  assignedUsers?: InputMaybe<UserListRelationFilter>;
  authorised?: InputMaybe<BoolNullableFilter>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringNullableFilter>;
  chat?: InputMaybe<ChatWhereInput>;
  chatId?: InputMaybe<StringNullableFilter>;
  completed?: InputMaybe<BoolNullableFilter>;
  completedBy?: InputMaybe<UserWhereInput>;
  completedById?: InputMaybe<StringNullableFilter>;
  completedDate?: InputMaybe<DateTimeNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringNullableFilter>;
  crimeGroup?: InputMaybe<CrimeGroupWhereInput>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  dueDate?: InputMaybe<DateTimeNullableFilter>;
  evidence?: InputMaybe<DocumentListRelationFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigation?: InputMaybe<InvestigationWhereInput>;
  investigationId?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  questions?: InputMaybe<TaskQuestionListRelationFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  similarOffenderIds?: InputMaybe<StringNullableListFilter>;
  timeTaken?: InputMaybe<TimeTakenListRelationFilter>;
  type?: InputMaybe<EnumTodoTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicle?: InputMaybe<VehicleWhereInput>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export type TopContributors = {
  __typename?: 'TopContributors';
  businesses: Array<Business>;
  fullName: Scalars['String'];
  id: Scalars['String'];
  incidentsCreated: Scalars['Int'];
  messagesSent: Scalars['Int'];
  offendersCreated: Scalars['Int'];
  updatesCreated: Scalars['Int'];
};

export type TopViewedEntity = {
  __typename?: 'TopViewedEntity';
  /** Entity ID */
  entityId: Scalars['String'];
  /** Entity name/description */
  entityName?: Maybe<Scalars['String']>;
  /** Type of entity (INCIDENT, OFFENDER, VEHICLE, CRIME_GROUP) */
  entityType: Scalars['String'];
  /** Last viewed timestamp */
  lastViewedAt: Scalars['DateTime'];
  /** Number of views */
  viewCount: Scalars['Int'];
};

export type TrainingVideo = {
  __typename?: 'TrainingVideo';
  completions: Array<TrainingVideoCompletion>;
  createdAt: Scalars['Date'];
  currentUserCompletion?: Maybe<TrainingVideoCompletion>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  groups: Array<Group>;
  id: Scalars['ID'];
  isCompletedByCurrentUser: Scalars['Boolean'];
  loginPrompt: Scalars['Boolean'];
  mandatory: Scalars['Boolean'];
  prompts: Array<TrainingVideoPrompt>;
  scheme: Scheme;
  schemeId: Scalars['String'];
  tags: Array<Tag>;
  thumbnailStatus: ThumbnailStatus;
  thumbnailUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
  uploadedBy: User;
  uploadedById: Scalars['String'];
  videoUrl: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type TrainingVideoAudit = {
  __typename?: 'TrainingVideoAudit';
  completedCount: Scalars['Int'];
  completionRate: Scalars['Float'];
  notCompletedCount: Scalars['Int'];
  totalUsers: Scalars['Int'];
  trainingVideoId: Scalars['String'];
  trainingVideoTitle: Scalars['String'];
  users: Array<TrainingVideoUserCompletion>;
};

export type TrainingVideoCompletion = {
  __typename?: 'TrainingVideoCompletion';
  completedAt: Scalars['Date'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  trainingVideo: TrainingVideo;
  trainingVideoId: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type TrainingVideoOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  viewCount?: InputMaybe<SortOrder>;
};

export type TrainingVideoPrompt = {
  __typename?: 'TrainingVideoPrompt';
  createdAt: Scalars['Date'];
  dismissedAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  trainingVideo: TrainingVideo;
  trainingVideoId: Scalars['String'];
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type TrainingVideoUserCompletion = {
  __typename?: 'TrainingVideoUserCompletion';
  completedAt?: Maybe<Scalars['Date']>;
  hasCompleted: Scalars['Boolean'];
  userEmail?: Maybe<Scalars['String']>;
  userFullName: Scalars['String'];
  userId: Scalars['String'];
};

export type TrainingVideoWhereInput = {
  AND?: InputMaybe<Array<TrainingVideoWhereInput>>;
  NOT?: InputMaybe<Array<TrainingVideoWhereInput>>;
  OR?: InputMaybe<Array<TrainingVideoWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploadedBy?: InputMaybe<UserWhereInput>;
  uploadedById?: InputMaybe<StringFilter>;
  viewCount?: InputMaybe<IntFilter>;
};

export type TrainingVideoWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type TranscriptionCorrection = {
  __typename?: 'TranscriptionCorrection';
  confidence: Scalars['Float'];
  original: Scalars['String'];
  reason: Scalars['String'];
  suggested: Scalars['String'];
};

export type TranscriptionSegment = {
  __typename?: 'TranscriptionSegment';
  alternatives?: Maybe<Array<Scalars['String']>>;
  confidence: Scalars['Float'];
  endTime: Scalars['Float'];
  isCorrection: Scalars['Boolean'];
  speaker?: Maybe<Scalars['String']>;
  startTime: Scalars['Float'];
  text: Scalars['String'];
};

export type TranslateTextInput = {
  targetLang: LanguageCode;
  text: Array<Scalars['String']>;
};

export type TranslatedText = {
  __typename?: 'TranslatedText';
  origText: Scalars['String'];
  translatedText: Scalars['String'];
};

export type TranslationResult = {
  __typename?: 'TranslationResult';
  confidence: Scalars['Float'];
  originalText: Scalars['String'];
  sourceLanguage: Scalars['String'];
  targetLanguage: Scalars['String'];
  translatedText: Scalars['String'];
};

export type Tree = {
  __typename?: 'Tree';
  id: Scalars['String'];
  name: Scalars['String'];
  parentId: Scalars['String'];
};

export type TriageAverageScores = {
  __typename?: 'TriageAverageScores';
  actionableData: Scalars['Int'];
  bestOffenderScore: Scalars['Int'];
  compositeScore: Scalars['Int'];
  confidence: Scalars['Int'];
  offenderIdentity: Scalars['Int'];
};

export type TriageExclusionReasons = {
  __typename?: 'TriageExclusionReasons';
  lowQualityData: Scalars['Int'];
  noNamedOffender: Scalars['Int'];
  youthOffenders: Scalars['Int'];
};

export type TriageOverview = {
  __typename?: 'TriageOverview';
  totalIncidents: Scalars['Int'];
  totalTriaged: Scalars['Int'];
  triageRate: Scalars['Float'];
};

export type TriageReporting = {
  __typename?: 'TriageReporting';
  eligible: Scalars['Int'];
  pending: Scalars['Int'];
  submissionRate: Scalars['Float'];
  submitted: Scalars['Int'];
};

export type TriageStatusBreakdown = {
  __typename?: 'TriageStatusBreakdown';
  doNotReport: Scalars['Int'];
  pending: Scalars['Int'];
  report: Scalars['Int'];
  review: Scalars['Int'];
};

export type UrlImage = {
  filename: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  mimetype: Scalars['String'];
  url: Scalars['String'];
};

export type UniqueId = {
  id: Scalars['String'];
};

export type UnlinkedImage = {
  __typename?: 'UnlinkedImage';
  image: Image;
  localId: Scalars['String'];
};

export type UnrestrictedIncidentRelayInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  crimeGroupIds?: InputMaybe<Array<Scalars['String']>>;
  crimeTypes?: InputMaybe<Array<Scalars['String']>>;
  dateRange?: InputMaybe<DateTimeFilter>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  hasCrimeReference?: InputMaybe<Scalars['Boolean']>;
  investigationIds?: InputMaybe<Array<Scalars['String']>>;
  locationId?: InputMaybe<Scalars['String']>;
  offenderIds?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  vehicleIds?: InputMaybe<Array<Scalars['String']>>;
};

export type UnrestrictedOffenderRelayInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  crimeGroupIds?: InputMaybe<Array<Scalars['String']>>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  incidentIds?: InputMaybe<Array<Scalars['String']>>;
  investigationIds?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  vehicleIds?: InputMaybe<Array<Scalars['String']>>;
};

export type Update = {
  __typename?: 'Update';
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['String'];
  crimeGroup?: Maybe<CrimeGroup>;
  crimeGroupId?: Maybe<Scalars['String']>;
  feedImage?: Maybe<Image>;
  icon: UpdateIcon;
  id: Scalars['ID'];
  images: Array<Image>;
  incident?: Maybe<Incident>;
  incidentId?: Maybe<Scalars['String']>;
  investigation?: Maybe<Investigation>;
  investigationId?: Maybe<Scalars['String']>;
  linkedArticles: Array<Article>;
  linkedCrimeGroups: Array<CrimeGroup>;
  linkedIncidents: Array<Incident>;
  linkedInvestigations: Array<Investigation>;
  linkedOffenders: Array<Offender>;
  linkedVehicles: Array<Vehicle>;
  mentionedUsers: Array<User>;
  offender?: Maybe<Offender>;
  offenderId?: Maybe<Scalars['String']>;
  replies: Array<Update>;
  replyTo?: Maybe<Update>;
  replyToId?: Maybe<Scalars['String']>;
  stockRemovalRequest?: Maybe<StockRemovalRequest>;
  stockRemovalRequestId?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  type: UpdateType;
  updatedAt: Scalars['Date'];
  vehicle?: Maybe<Vehicle>;
  vehicleId?: Maybe<Scalars['String']>;
};


export type UpdateImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


export type UpdateLinkedArticlesArgs = {
  cursor?: InputMaybe<ArticleWhereUniqueInput>;
  distinct?: InputMaybe<ArticleScalarFieldEnum>;
  orderBy?: InputMaybe<ArticleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type UpdateLinkedCrimeGroupsArgs = {
  cursor?: InputMaybe<CrimeGroupWhereUniqueInput>;
  distinct?: InputMaybe<CrimeGroupScalarFieldEnum>;
  orderBy?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CrimeGroupWhereInput>;
};


export type UpdateLinkedIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type UpdateLinkedInvestigationsArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<InvestigationScalarFieldEnum>;
  orderBy?: InputMaybe<InvestigationOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type UpdateLinkedOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type UpdateLinkedVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<VehicleScalarFieldEnum>;
  orderBy?: InputMaybe<VehicleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
};


export type UpdateMentionedUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type UpdateRepliesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};

export type UpdateBusinessQuestionInput = {
  actions?: InputMaybe<Array<Scalars['JSON']>>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  dependentBrands?: InputMaybe<Array<Scalars['String']>>;
  dependentQuestions?: InputMaybe<Array<Scalars['JSON']>>;
  dependentTags?: InputMaybe<Array<Scalars['String']>>;
  failureAnswer?: InputMaybe<Scalars['String']>;
  failureMessage?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<Scalars['Int']>;
  req?: InputMaybe<Scalars['Boolean']>;
  roleIds?: InputMaybe<Array<Scalars['String']>>;
  tooltip?: InputMaybe<Scalars['String']>;
};

export type UpdateCrimeGroupDataInput = {
  alias?: InputMaybe<Scalars['String']>;
  offenders?: InputMaybe<CreateCrimeGroupOffenders>;
  vehicles?: InputMaybe<CreateCrimeGroupVehicles>;
};

export type UpdateDemDevice = {
  businessId?: InputMaybe<Scalars['String']>;
  demGroupIds?: InputMaybe<Array<Scalars['String']>>;
  disconnectedBusinessId?: InputMaybe<Scalars['String']>;
};

export type UpdateDemGroup = {
  demDeviceIds: Array<Scalars['String']>;
};

export type UpdateDocument = {
  deleted?: InputMaybe<Array<UniqueId>>;
  upload?: InputMaybe<Array<CreateDocument>>;
};

export type UpdateFlowData = {
  description?: InputMaybe<Scalars['String']>;
  edges?: InputMaybe<Array<UpdateFlowEdgeData>>;
  name?: InputMaybe<Scalars['String']>;
  nodes?: InputMaybe<Array<UpdateFlowNodeData>>;
};

export type UpdateFlowEdgeData = {
  id?: InputMaybe<Scalars['String']>;
  markerEnd: Scalars['JSON'];
  source: Scalars['String'];
  sourceHandle?: InputMaybe<Scalars['String']>;
  target: Scalars['String'];
  targetHandle?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type UpdateFlowNodeData = {
  data: Scalars['JSON'];
  height: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  positionAbX: Scalars['Int'];
  positionAbY: Scalars['Int'];
  positionX: Scalars['Int'];
  positionY: Scalars['Int'];
  type: Scalars['String'];
  width: Scalars['Int'];
};

export type UpdateFolder = {
  description?: InputMaybe<SetStringHelper>;
  name?: InputMaybe<SetStringHelper>;
  parentId?: InputMaybe<Scalars['String']>;
  roleIds?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateGeographicalAreaInput = {
  /** Update to a circular area */
  circle?: InputMaybe<CircleFilterInput>;
  /** Hex color for map display (e.g., "#FF5733") */
  color?: InputMaybe<Scalars['String']>;
  /** Optional description */
  description?: InputMaybe<Scalars['String']>;
  /** Name for this geographical area */
  name?: InputMaybe<Scalars['String']>;
  /** Update to a polygon area */
  polygon?: InputMaybe<PolygonFilterInput>;
};

export enum UpdateIcon {
  Approved = 'APPROVED',
  Comment = 'COMMENT',
  Created = 'CREATED',
  CrimeGroup = 'CRIME_GROUP',
  Declined = 'DECLINED',
  Exclusion = 'EXCLUSION',
  Incident = 'INCIDENT',
  Offender = 'OFFENDER',
  Recycled = 'RECYCLED',
  Restored = 'RESTORED',
  Updated = 'UPDATED'
}

export type UpdateIncidentBusinessInput = {
  business: NullableConnectDisconnectHelper;
};

export type UpdateIncidentStatusInput = {
  statusId: Scalars['String'];
};

export type UpdateInvestigationInput = {
  crimeGroupIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description?: InputMaybe<Scalars['String']>;
  disconnectCrimeGroupIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  disconnectIncidentIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  disconnectOffenderIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  disconnectVehicleIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  groupIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  groupIdsToRemove?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  incidentIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  offenderIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  priority?: InputMaybe<InvestigationPriority>;
  schemeId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<InvestigationStatus>;
  type?: InputMaybe<InvestigationType>;
  vehicleIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UpdateListRelationFilter = {
  every?: InputMaybe<UpdateWhereInput>;
  none?: InputMaybe<UpdateWhereInput>;
  some?: InputMaybe<UpdateWhereInput>;
};

export type UpdateOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UpdateOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  crimeGroup?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  crimeGroupId?: InputMaybe<SortOrder>;
  icon?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  investigation?: InputMaybe<InvestigationOrderByWithRelationInput>;
  investigationId?: InputMaybe<SortOrder>;
  linkedCrimeGroups?: InputMaybe<CrimeGroupOrderByRelationAggregateInput>;
  linkedIncidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  linkedInvestigations?: InputMaybe<InvestigationOrderByRelationAggregateInput>;
  linkedOffenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  linkedVehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
  mentionedUsers?: InputMaybe<UserOrderByRelationAggregateInput>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  replies?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  replyTo?: InputMaybe<UpdateOrderByWithRelationInput>;
  replyToId?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  vehicle?: InputMaybe<VehicleOrderByWithRelationInput>;
  vehicleId?: InputMaybe<SortOrder>;
};

export type UpdatePasswordData = {
  currentPassword: Scalars['String'];
  id: Scalars['String'];
  newPassword: Scalars['String'];
};

export type UpdateQuestionOnActivityInput = {
  newOptions?: InputMaybe<Array<Scalars['String']>>;
  newQuestion?: InputMaybe<Scalars['String']>;
  origOptions?: InputMaybe<Array<Scalars['String']>>;
  origQuestion: Scalars['String'];
  questionId: Scalars['String'];
  taskQuestion?: InputMaybe<TaskQuestionOnQInput>;
  type?: InputMaybe<AnswerType>;
};

export type UpdateQuestionOnTagInput = {
  brands?: InputMaybe<Array<Scalars['String']>>;
  dependentAnswer?: InputMaybe<Scalars['String']>;
  dependentMatchMode?: InputMaybe<AnyAll>;
  dependentOnQId?: InputMaybe<Scalars['String']>;
  dependentOnTagQId?: InputMaybe<Scalars['String']>;
  dependentTags?: InputMaybe<Array<Scalars['String']>>;
  newOptions?: InputMaybe<Array<Scalars['String']>>;
  newQuestion?: InputMaybe<Scalars['String']>;
  origOptions?: InputMaybe<Array<Scalars['String']>>;
  origQuestion: Scalars['String'];
  questionId: Scalars['String'];
  roles?: InputMaybe<Array<Scalars['String']>>;
  tag: TagQuestionOnQInput;
  tooltip?: InputMaybe<Scalars['String']>;
};

export enum UpdateScalarFieldEnum {
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  CrimeGroupId = 'crimeGroupId',
  Icon = 'icon',
  Id = 'id',
  IncidentId = 'incidentId',
  InvestigationId = 'investigationId',
  OffenderId = 'offenderId',
  ReplyToId = 'replyToId',
  Text = 'text',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  VehicleId = 'vehicleId'
}

export type UpdateScalarWhereInput = {
  AND?: InputMaybe<Array<UpdateScalarWhereInput>>;
  NOT?: InputMaybe<Array<UpdateScalarWhereInput>>;
  OR?: InputMaybe<Array<UpdateScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringFilter>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  icon?: InputMaybe<EnumUpdateIconFilter>;
  id?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigationId?: InputMaybe<StringNullableFilter>;
  offenderId?: InputMaybe<StringNullableFilter>;
  replyToId?: InputMaybe<StringNullableFilter>;
  text?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumUpdateTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export type UpdateScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UpdateScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UpdateScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UpdateScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  createdById?: InputMaybe<StringWithAggregatesFilter>;
  crimeGroupId?: InputMaybe<StringNullableWithAggregatesFilter>;
  icon?: InputMaybe<EnumUpdateIconWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentId?: InputMaybe<StringNullableWithAggregatesFilter>;
  investigationId?: InputMaybe<StringNullableWithAggregatesFilter>;
  offenderId?: InputMaybe<StringNullableWithAggregatesFilter>;
  replyToId?: InputMaybe<StringNullableWithAggregatesFilter>;
  text?: InputMaybe<StringNullableWithAggregatesFilter>;
  type?: InputMaybe<EnumUpdateTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  vehicleId?: InputMaybe<StringNullableWithAggregatesFilter>;
};

export type UpdateSchemeDefaultTimeoutConfigInput = {
  scheme: Scalars['String'];
  timeout: Scalars['String'];
  updateAllCamerasOnDefault?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateShoe = {
  box?: InputMaybe<Scalars['Boolean']>;
  businessId?: InputMaybe<Scalars['String']>;
  colour?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  primaryShoeId?: InputMaybe<Scalars['String']>;
  retailPrice?: InputMaybe<Scalars['Float']>;
  secondaryShoeId?: InputMaybe<Scalars['String']>;
  side?: InputMaybe<ShoeSide>;
  size?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<ShoeStatus>;
  stockItemId?: InputMaybe<Scalars['String']>;
  style?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ShoeType>;
};

export type UpdateSimpleLocation = {
  create?: InputMaybe<SimpleLocation>;
  update?: InputMaybe<LocationUpdate>;
  upsert?: InputMaybe<LocationUpsert>;
};

export type UpdateSimpleLocationOnOffender = {
  create?: InputMaybe<Array<SimpleLocation>>;
  delete?: InputMaybe<Array<UniqueId>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
  update?: InputMaybe<Array<LocationUpdate>>;
  upsert?: InputMaybe<Array<LocationUpsert>>;
};

export type UpdateStockItemInput = {
  barcode?: InputMaybe<Scalars['String']>;
  brand?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Currency>;
  division?: InputMaybe<Scalars['String']>;
  goodsTypeId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  salesPriceLocal?: InputMaybe<Scalars['Float']>;
  salesPriceStandard?: InputMaybe<Scalars['Float']>;
  schemeId?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  variant?: InputMaybe<Scalars['String']>;
};

export type UpdateStockRemovalItemInput = {
  id: Scalars['String'];
  pickLocation?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Int'];
};

export type UpdateStockRemovalRequestInput = {
  approverIds?: InputMaybe<Array<Scalars['String']>>;
  businessId?: InputMaybe<Scalars['String']>;
  costCentreCode?: InputMaybe<Scalars['String']>;
  createItems?: InputMaybe<Array<CreateStockRemovalItemInput>>;
  deleteItems?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  destination?: InputMaybe<StockRemovalRquestDestination>;
  fascia?: InputMaybe<Scalars['String']>;
  nominalCode?: InputMaybe<Scalars['String']>;
  personalityInfluences?: InputMaybe<Scalars['String']>;
  pickerId?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<StockRemovalPriority>;
  reason?: InputMaybe<Scalars['String']>;
  reasonForNonReturn?: InputMaybe<Scalars['String']>;
  rechargeBrand?: InputMaybe<Scalars['String']>;
  rechargeReference?: InputMaybe<Scalars['String']>;
  recipientEmail?: InputMaybe<Scalars['String']>;
  recipientName?: InputMaybe<Scalars['String']>;
  recipientPhone?: InputMaybe<Scalars['String']>;
  returnDate?: InputMaybe<Scalars['DateTime']>;
  schemeId?: InputMaybe<Scalars['String']>;
  shippingAddressLine1?: InputMaybe<Scalars['String']>;
  shippingAddressLine2?: InputMaybe<Scalars['String']>;
  shippingCity?: InputMaybe<Scalars['String']>;
  shippingCountry?: InputMaybe<Scalars['String']>;
  shippingCounty?: InputMaybe<Scalars['String']>;
  shippingPostcode?: InputMaybe<Scalars['String']>;
  smqAccountNumber?: InputMaybe<Scalars['String']>;
  socialHandles?: InputMaybe<Scalars['String']>;
  storeOrDC?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updateItems?: InputMaybe<Array<UpdateStockRemovalItemInput>>;
  willStockBeReturned?: InputMaybe<Scalars['String']>;
};

export type UpdateStockRemovalReturnInput = {
  businessId?: InputMaybe<Scalars['String']>;
  costCentreCode?: InputMaybe<Scalars['String']>;
  createItems?: InputMaybe<Array<CreateStockRemovalReturnItemInput>>;
  dateofReturn?: InputMaybe<Scalars['DateTime']>;
  deleteItems?: InputMaybe<Array<Scalars['String']>>;
  imageIds?: InputMaybe<Array<Scalars['String']>>;
  images?: InputMaybe<Array<StockRemovalReturnImageInput>>;
  rechargeBrand?: InputMaybe<Scalars['String']>;
  rechargeReference?: InputMaybe<Scalars['String']>;
  storeOrDC?: InputMaybe<Scalars['String']>;
  tracking?: InputMaybe<Scalars['String']>;
  updateItems?: InputMaybe<Array<UpdateStockRemovalReturnItemInput>>;
};

export type UpdateStockRemovalReturnItemInput = {
  damaged?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  quantity: Scalars['Int'];
};

export type UpdateTagQuestionInput = {
  id: Scalars['String'];
  position: Scalars['Int'];
  req: Scalars['Boolean'];
};

export type UpdateTodoMention = {
  chatId?: InputMaybe<Scalars['String']>;
  crimeGroupId?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  investigationId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TodoType>;
  userId: Scalars['String'];
  vehicleId?: InputMaybe<Scalars['String']>;
};

export type UpdateTrainingVideoInput = {
  description?: InputMaybe<Scalars['String']>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['String'];
  loginPrompt?: InputMaybe<Scalars['Boolean']>;
  mandatory?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

export enum UpdateType {
  Image = 'IMAGE',
  LinkedArticle = 'LINKED_ARTICLE',
  LinkedCrimeGroup = 'LINKED_CRIME_GROUP',
  LinkedIncident = 'LINKED_INCIDENT',
  LinkedInvestigation = 'LINKED_INVESTIGATION',
  LinkedOffender = 'LINKED_OFFENDER',
  LinkedVehicle = 'LINKED_VEHICLE',
  System = 'SYSTEM',
  Text = 'TEXT'
}

export type UpdateUpdateDataInput = {
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateWhereInput = {
  AND?: InputMaybe<Array<UpdateWhereInput>>;
  NOT?: InputMaybe<Array<UpdateWhereInput>>;
  OR?: InputMaybe<Array<UpdateWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeGroup?: InputMaybe<CrimeGroupWhereInput>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  icon?: InputMaybe<EnumUpdateIconFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigation?: InputMaybe<InvestigationWhereInput>;
  investigationId?: InputMaybe<StringNullableFilter>;
  linkedCrimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  linkedIncidents?: InputMaybe<IncidentListRelationFilter>;
  linkedInvestigations?: InputMaybe<InvestigationListRelationFilter>;
  linkedOffenders?: InputMaybe<OffenderListRelationFilter>;
  linkedVehicles?: InputMaybe<VehicleListRelationFilter>;
  mentionedUsers?: InputMaybe<UserListRelationFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  replies?: InputMaybe<UpdateListRelationFilter>;
  replyTo?: InputMaybe<UpdateWhereInput>;
  replyToId?: InputMaybe<StringNullableFilter>;
  text?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumUpdateTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicle?: InputMaybe<VehicleWhereInput>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export type UpdateWhereUnique = {
  id?: InputMaybe<Scalars['String']>;
};

export type UpdateWhereUniqueInput = {
  AND?: InputMaybe<Array<UpdateWhereInput>>;
  NOT?: InputMaybe<Array<UpdateWhereInput>>;
  OR?: InputMaybe<Array<UpdateWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeGroup?: InputMaybe<CrimeGroupWhereInput>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  icon?: InputMaybe<EnumUpdateIconFilter>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageListRelationFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  investigation?: InputMaybe<InvestigationWhereInput>;
  investigationId?: InputMaybe<StringNullableFilter>;
  linkedCrimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  linkedIncidents?: InputMaybe<IncidentListRelationFilter>;
  linkedInvestigations?: InputMaybe<InvestigationListRelationFilter>;
  linkedOffenders?: InputMaybe<OffenderListRelationFilter>;
  linkedVehicles?: InputMaybe<VehicleListRelationFilter>;
  mentionedUsers?: InputMaybe<UserListRelationFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  replies?: InputMaybe<UpdateListRelationFilter>;
  replyTo?: InputMaybe<UpdateWhereInput>;
  replyToId?: InputMaybe<StringNullableFilter>;
  text?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumUpdateTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vehicle?: InputMaybe<VehicleWhereInput>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export type UploadArticleImage = {
  file?: InputMaybe<Scalars['Upload']>;
  url?: InputMaybe<UrlImage>;
};

export type UploadIncidentImage = {
  blurFaces?: InputMaybe<Array<FaceInput>>;
  file?: InputMaybe<Scalars['Upload']>;
  isFace?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<Array<ImageOffender>>;
  policeImage?: InputMaybe<Scalars['Boolean']>;
  position?: InputMaybe<ImagePosition>;
  positionX?: InputMaybe<Scalars['Float']>;
  positionY?: InputMaybe<Scalars['Float']>;
  primary?: InputMaybe<Scalars['Boolean']>;
  rotation?: InputMaybe<Scalars['Int']>;
  totalFaces?: InputMaybe<Scalars['Int']>;
  url?: InputMaybe<UrlImage>;
  vehicles?: InputMaybe<Array<ImageOffender>>;
};

export type UploadIncidentOffenderImage = {
  indexFaces?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<UrlImage>;
};

export type UploadIncidentOptimisticImage = {
  offenders?: InputMaybe<Array<ImageOffender>>;
  url: UrlImage;
};

export type UploadOffenderImage = {
  blurFaces?: InputMaybe<Array<FaceInput>>;
  file?: InputMaybe<Scalars['Upload']>;
  isFace?: InputMaybe<Scalars['Boolean']>;
  policeImage?: InputMaybe<Scalars['Boolean']>;
  position?: InputMaybe<ImagePosition>;
  positionX?: InputMaybe<Scalars['Float']>;
  positionY?: InputMaybe<Scalars['Float']>;
  primary?: InputMaybe<Scalars['Boolean']>;
  rotation?: InputMaybe<Scalars['Int']>;
  totalFaces?: InputMaybe<Scalars['Int']>;
  url?: InputMaybe<UrlImage>;
};

export type UploadOffenderImageOnCrimeGroup = {
  upload?: InputMaybe<Array<UploadOffenderImage>>;
};

export type UploadSchemeImage = {
  file?: InputMaybe<Scalars['Upload']>;
  url?: InputMaybe<UrlImage>;
};

export type UploadVehicleImage = {
  file?: InputMaybe<Scalars['Upload']>;
  policeImage?: InputMaybe<Scalars['Boolean']>;
  position?: InputMaybe<ImagePosition>;
  positionX?: InputMaybe<Scalars['Float']>;
  positionY?: InputMaybe<Scalars['Float']>;
  primary?: InputMaybe<Scalars['Boolean']>;
  rotation?: InputMaybe<Scalars['Int']>;
  url?: InputMaybe<UrlImage>;
};

export type UpsertBrand = {
  brandId?: InputMaybe<Scalars['String']>;
  businesses?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  schemeId: Scalars['String'];
};

export type UpsertContactInput = {
  address?: InputMaybe<Scalars['String']>;
  dobPlace?: InputMaybe<Scalars['String']>;
  formerName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['String']>;
  homeTel?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mobileTel?: InputMaybe<Scalars['String']>;
  occupation?: InputMaybe<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
  prefContact?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
  workTel?: InputMaybe<Scalars['String']>;
};

export type UpsertDemDevice = {
  businessId?: InputMaybe<Scalars['String']>;
  demGroupIds: Array<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  modelId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  serialNumber: Scalars['String'];
};

export type UpsertDemGroup = {
  demDeviceIds: Array<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UpsertFolder = {
  dataType?: InputMaybe<Model>;
  description?: InputMaybe<Scalars['String']>;
  folderId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
  roleIds?: InputMaybe<Array<Scalars['String']>>;
};

export type UpsertIncidentCctvRecord = {
  aheadBehind?: InputMaybe<Scalars['String']>;
  cameraNumber: Scalars['String'];
  correctTime?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  endTime: Scalars['Date'];
  id?: InputMaybe<Scalars['String']>;
  incorrectBy?: InputMaybe<Scalars['Int']>;
  showFace: Scalars['Boolean'];
  showIncident: Scalars['Boolean'];
  startTime: Scalars['Date'];
};

export type UpsertIncidentData = {
  answers?: InputMaybe<Array<AnswersInput>>;
  business?: InputMaybe<Scalars['String']>;
  cctvRecords?: InputMaybe<CctvCreateUpdate>;
  crimeTypes: ConnectRemove;
  date: Scalars['Date'];
  description: Scalars['String'];
  documents?: InputMaybe<DocumentsCreateRemove>;
  draft?: InputMaybe<Scalars['Boolean']>;
  groups: ConnectRemove;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImagesUpsert>;
  items?: InputMaybe<Array<CreateIncidentItemInput>>;
  offenders?: InputMaybe<OffendersIncidentUpsertInput>;
  policeCCTVEmail?: InputMaybe<Scalars['String']>;
  policeDay?: InputMaybe<Scalars['Boolean']>;
  policeDistanceFromIncident?: InputMaybe<Scalars['String']>;
  policeIncidentDuration?: InputMaybe<Scalars['String']>;
  policeInside?: InputMaybe<Scalars['Boolean']>;
  policeInvolved?: InputMaybe<Scalars['Boolean']>;
  policeItemsLocation?: InputMaybe<Array<Scalars['String']>>;
  policeItemsMO?: InputMaybe<Array<Scalars['String']>>;
  policeKnownBefore?: InputMaybe<Scalars['Boolean']>;
  policeMG11?: InputMaybe<Scalars['Boolean']>;
  policeNo?: InputMaybe<Scalars['String']>;
  policeObstructions?: InputMaybe<Scalars['String']>;
  policeObstructionsDetails?: InputMaybe<Scalars['String']>;
  policeReasonRemember?: InputMaybe<Scalars['String']>;
  policeRef?: InputMaybe<Scalars['String']>;
  policeReported?: InputMaybe<Scalars['Boolean']>;
  policeResponse?: InputMaybe<PoliceResponseTime>;
  policeSign?: InputMaybe<Scalars['String']>;
  policeStatement?: InputMaybe<Scalars['String']>;
  policeTimePassed?: InputMaybe<Scalars['String']>;
  policeWillingCourt?: InputMaybe<Scalars['Boolean']>;
  policeWitnessAddress?: InputMaybe<Scalars['String']>;
  policeWitnessAtTime?: InputMaybe<Scalars['Boolean']>;
  policeWitnessEmail?: InputMaybe<Scalars['String']>;
  policeWitnessEthnicity?: InputMaybe<Scalars['String']>;
  policeWitnessGender?: InputMaybe<Scalars['String']>;
  policeWitnessLength?: InputMaybe<Scalars['String']>;
  policeWitnessMobileNo?: InputMaybe<Scalars['String']>;
  policeWitnessName?: InputMaybe<Scalars['String']>;
  policeWitnessPlaceOfBirth?: InputMaybe<Scalars['String']>;
  policeWitnessPostcode?: InputMaybe<Scalars['String']>;
  policeWitnessWorkNo?: InputMaybe<Scalars['String']>;
  sessionId?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  vehicles?: InputMaybe<VehiclesUpsertIncident>;
};

export type UpsertIncidentFormInput = {
  formFields: Array<IncidentFormFieldsInput>;
  tagId: Scalars['String'];
};

export type UpsertIncidentOffender = {
  address?: InputMaybe<CreateIncidentOffenderAddress>;
  age?: InputMaybe<Age>;
  alias?: InputMaybe<Array<Scalars['String']>>;
  build?: InputMaybe<Build>;
  comment?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<ConnectOnlyArrayHelper>;
  hair?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Height>;
  id?: InputMaybe<Scalars['String']>;
  idSource?: InputMaybe<IdSource>;
  idVerified?: InputMaybe<Scalars['Boolean']>;
  images?: InputMaybe<ImagesOnModelUpsert>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  wanted?: InputMaybe<Scalars['Boolean']>;
};

export type UpsertRole = {
  canApprove?: InputMaybe<Scalars['Boolean']>;
  checklistIds?: InputMaybe<Array<Scalars['String']>>;
  folderIds?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['String']>;
  permissions: Array<PermissionInput>;
  roleId?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  type?: InputMaybe<Role>;
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type UpsertShoe = {
  box: Scalars['Boolean'];
  businessId: Scalars['String'];
  colour: Scalars['String'];
  description: Scalars['String'];
  primaryShoeId?: InputMaybe<Scalars['String']>;
  retailPrice: Scalars['Float'];
  secondaryShoeId?: InputMaybe<Scalars['String']>;
  shoeId?: InputMaybe<Scalars['String']>;
  side: ShoeSide;
  size: Scalars['Float'];
  status: ShoeStatus;
  stockItemId: Scalars['String'];
  style: Scalars['String'];
  type: ShoeType;
};

export type UpsertStockRemovalReasonOption = {
  active?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  position?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  actions: Array<Action>;
  actionsByUser: Array<Action>;
  activityEmail: Scalars['Boolean'];
  activityPush: Scalars['Boolean'];
  addresses: Array<Address>;
  approverGroups: Array<Group>;
  articles: Array<Article>;
  assignedTodos: Array<Todo>;
  auth0Id?: Maybe<Scalars['String']>;
  bans: Array<Ban>;
  bulletinEmails: Scalars['Boolean'];
  bulletinPush: Scalars['Boolean'];
  businesses: Array<Business>;
  chats: Array<UserChat>;
  checklists: Array<Checklist>;
  completedTodos: Array<Todo>;
  contact?: Maybe<Contact>;
  contactId?: Maybe<Scalars['String']>;
  createdArticles: Array<Article>;
  createdAt: Scalars['Date'];
  createdTags: Array<Tag>;
  createdTodos: Array<Todo>;
  createdUpdates: Array<Update>;
  crimeGroups: Array<CrimeGroup>;
  csvImports: Array<CsvImport>;
  currentScheme: Array<UserScheme>;
  defaultGroups: Array<Group>;
  defaultScheme?: Maybe<Scalars['String']>;
  demId?: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  email?: Maybe<Scalars['String']>;
  expoPushTokens: Array<ExpoPushToken>;
  feedItems: Array<FeedItem>;
  firstLetter: Scalars['String'];
  forcePasswordReset: Scalars['Boolean'];
  fullName: Scalars['String'];
  fullNameAdmin: Scalars['String'];
  groups: Array<Group>;
  hasPassword: Scalars['Boolean'];
  id: Scalars['ID'];
  images: Array<Image>;
  impressions: Array<Impression>;
  incidentEmail: Scalars['Boolean'];
  incidentPush: Scalars['Boolean'];
  incidents: Array<Incident>;
  intel: Array<Intel>;
  investigations: Array<Investigation>;
  ipAddress?: Maybe<Scalars['String']>;
  lastLogin?: Maybe<LoginEvent>;
  lastTenLogin: Array<LoginEvent>;
  loginEvents: Array<LoginEvent>;
  mentionedUpdated: Array<Update>;
  messageCount: Scalars['Int'];
  messageMentions: Array<Message>;
  messagePush: Scalars['Boolean'];
  messages: Array<Message>;
  mg11s: Array<Mg11>;
  mobileNumber?: Maybe<Scalars['String']>;
  newSchemeNotifications: Array<Notification>;
  newUser: Scalars['Boolean'];
  notificationCount: Scalars['Int'];
  notifications: Array<UserNotification>;
  offenderEmail: Scalars['Boolean'];
  offenderPush: Scalars['Boolean'];
  offenders: Array<Offender>;
  onboardSteps: OnboardSteps;
  oneSignalIds: Array<OneSignalId>;
  organisation?: Maybe<Scalars['String']>;
  origFirstLetter: Scalars['String'];
  origName: Scalars['String'];
  platform?: Maybe<Scalars['String']>;
  publicName: Scalars['Boolean'];
  recycled: Scalars['Boolean'];
  recycledItems: Array<RecycledItem>;
  reference?: Maybe<Scalars['Int']>;
  reportToAllBusinesses?: Maybe<Scalars['Boolean']>;
  schemePermission?: Maybe<CustomRole>;
  schemeSelector?: Maybe<Array<SchemeName>>;
  schemes: Array<UserScheme>;
  sessions: Array<Session>;
  signedTerms?: Maybe<UserTerm>;
  status?: Maybe<UserStatus>;
  subscribedCrimeGroups: Array<CrimeGroup>;
  subscribedIncidentOnly: Scalars['Boolean'];
  subscribedIncidents: Array<Incident>;
  subscribedInvestigations: Array<Investigation>;
  subscribedOffenderOnly: Scalars['Boolean'];
  subscribedOffenders: Array<Offender>;
  subscribedVehicles: Array<Vehicle>;
  tags: Array<Tag>;
  taskTimeTaken: Array<TimeTaken>;
  termsExpired: Scalars['Boolean'];
  termsSigned: Scalars['Boolean'];
  timeSigned?: Maybe<Scalars['Date']>;
  totalChats: Scalars['Int'];
  totalLastYearLogin: Scalars['Int'];
  totalNotifications: Scalars['Int'];
  totalSchemes: Scalars['Int'];
  totalThirtyDaysLogin: Scalars['Int'];
  totalUnreadNotifications: Scalars['Int'];
  type: UserType;
  unreadNotifications: Array<UserNotification>;
  updatedAt: Scalars['Date'];
  uploaded: Scalars['Boolean'];
  userTerms: Array<UserTerm>;
  vehicles: Array<Vehicle>;
};


export type UserActionsArgs = {
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type UserActionsByUserArgs = {
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type UserAddressesArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressScalarFieldEnum>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressWhereInput>;
};


export type UserApproverGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type UserArticlesArgs = {
  cursor?: InputMaybe<ArticleWhereUniqueInput>;
  distinct?: InputMaybe<ArticleScalarFieldEnum>;
  orderBy?: InputMaybe<ArticleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type UserAssignedTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<TodoScalarFieldEnum>;
  orderBy?: InputMaybe<TodoOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};


export type UserBansArgs = {
  cursor?: InputMaybe<BanWhereUniqueInput>;
  distinct?: InputMaybe<BanScalarFieldEnum>;
  orderBy?: InputMaybe<BanOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BanWhereInput>;
};


export type UserBusinessesArgs = {
  cursor?: InputMaybe<BusinessWhereUniqueInput>;
  distinct?: InputMaybe<BusinessScalarFieldEnum>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BusinessWhereInput>;
};


export type UserChatsArgs = {
  cursor?: InputMaybe<UserChatWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserChatScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserChatOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserChatWhereInput>;
};


export type UserChecklistsArgs = {
  cursor?: InputMaybe<ActiveChecklistWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActiveChecklistScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActiveChecklistOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActiveChecklistWhereInput>;
};


export type UserCompletedTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<TodoScalarFieldEnum>;
  orderBy?: InputMaybe<TodoOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};


export type UserCreatedArticlesArgs = {
  cursor?: InputMaybe<ArticleWhereUniqueInput>;
  distinct?: InputMaybe<ArticleScalarFieldEnum>;
  orderBy?: InputMaybe<ArticleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type UserCreatedTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};


export type UserCreatedTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<TodoScalarFieldEnum>;
  orderBy?: InputMaybe<TodoOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};


export type UserCreatedUpdatesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type UserCrimeGroupsArgs = {
  cursor?: InputMaybe<CrimeGroupWhereUniqueInput>;
  distinct?: InputMaybe<CrimeGroupScalarFieldEnum>;
  orderBy?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CrimeGroupWhereInput>;
};


export type UserCsvImportsArgs = {
  cursor?: InputMaybe<CsvImportWhereUniqueInput>;
  distinct?: InputMaybe<Array<CsvImportScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CsvImportOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CsvImportWhereInput>;
};


export type UserDefaultGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type UserFeedItemsArgs = {
  cursor?: InputMaybe<FeedItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeedItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeedItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
};


export type UserGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type UserImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


export type UserImpressionsArgs = {
  cursor?: InputMaybe<ImpressionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImpressionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImpressionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImpressionWhereInput>;
};


export type UserIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type UserIntelArgs = {
  cursor?: InputMaybe<IntelWhereUniqueInput>;
  distinct?: InputMaybe<Array<IntelScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IntelOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IntelWhereInput>;
};


export type UserInvestigationsArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<Array<InvestigationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InvestigationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type UserLoginEventsArgs = {
  cursor?: InputMaybe<LoginEventWhereUniqueInput>;
  distinct?: InputMaybe<Array<LoginEventScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<LoginEventOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LoginEventWhereInput>;
};


export type UserMentionedUpdatedArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type UserMessageMentionsArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type UserMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type UserMg11sArgs = {
  cursor?: InputMaybe<Mg11WhereUniqueInput>;
  distinct?: InputMaybe<Array<Mg11ScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<Mg11OrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Mg11WhereInput>;
};


export type UserNewSchemeNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type UserNotificationCountArgs = {
  scheme?: InputMaybe<UniqueId>;
};


export type UserNotificationsArgs = {
  cursor?: InputMaybe<UserNotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserNotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserNotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserNotificationWhereInput>;
};


export type UserOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type UserRecycledItemsArgs = {
  cursor?: InputMaybe<RecycledItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<RecycledItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RecycledItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RecycledItemWhereInput>;
};


export type UserSchemesArgs = {
  cursor?: InputMaybe<UserSchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserSchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserSchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserSchemeWhereInput>;
};


export type UserSessionsArgs = {
  cursor?: InputMaybe<SessionWhereUniqueInput>;
  distinct?: InputMaybe<SessionScalarFieldEnum>;
  orderBy?: InputMaybe<SessionOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SessionWhereInput>;
};


export type UserSubscribedCrimeGroupsArgs = {
  cursor?: InputMaybe<CrimeGroupWhereUniqueInput>;
  distinct?: InputMaybe<CrimeGroupScalarFieldEnum>;
  orderBy?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CrimeGroupWhereInput>;
};


export type UserSubscribedIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type UserSubscribedInvestigationsArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<Array<InvestigationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InvestigationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type UserSubscribedOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type UserSubscribedVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<VehicleScalarFieldEnum>;
  orderBy?: InputMaybe<VehicleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
};


export type UserTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};


export type UserTaskTimeTakenArgs = {
  cursor?: InputMaybe<TimeTakenWhereUniqueInput>;
  distinct?: InputMaybe<Array<TimeTakenScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TimeTakenOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TimeTakenWhereInput>;
};


export type UserUserTermsArgs = {
  cursor?: InputMaybe<UserTermWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserTermScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserTermOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserTermWhereInput>;
};


export type UserVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<VehicleScalarFieldEnum>;
  orderBy?: InputMaybe<VehicleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
};

export type UserActivityGauge = {
  __typename?: 'UserActivityGauge';
  /** Number of users who have not been online in the past 30 days */
  offlineCount: Scalars['Int'];
  /** Percentage of users offline */
  offlinePercentage: Scalars['Float'];
  /** Number of users who have been online in the past 30 days */
  onlineCount: Scalars['Int'];
  /** Percentage of users online */
  onlinePercentage: Scalars['Float'];
  /** Total number of users in the scheme */
  totalCount: Scalars['Int'];
};

export type UserChat = {
  __typename?: 'UserChat';
  chat: Chat;
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  mentioned?: Maybe<Scalars['Boolean']>;
  newMessages?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['Date'];
  user: User;
};

export type UserChatCreate = {
  chat?: InputMaybe<ConnectHelper>;
  newMessages?: InputMaybe<Scalars['Boolean']>;
  user?: InputMaybe<ConnectHelper>;
};

export type UserChatListRelationFilter = {
  every?: InputMaybe<UserChatWhereInput>;
  none?: InputMaybe<UserChatWhereInput>;
  some?: InputMaybe<UserChatWhereInput>;
};

export type UserChatOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserChatOrderByWithRelationInput = {
  chat?: InputMaybe<ChatOrderByWithRelationInput>;
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mentioned?: InputMaybe<SortOrder>;
  newMessages?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum UserChatScalarFieldEnum {
  ChatId = 'chatId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Mentioned = 'mentioned',
  NewMessages = 'newMessages',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type UserChatScalarWhereInput = {
  AND?: InputMaybe<Array<UserChatScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserChatScalarWhereInput>>;
  OR?: InputMaybe<Array<UserChatScalarWhereInput>>;
  chatId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  mentioned?: InputMaybe<BoolNullableFilter>;
  newMessages?: InputMaybe<BoolNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserChatScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserChatScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserChatScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserChatScalarWhereWithAggregatesInput>>;
  chatId?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  mentioned?: InputMaybe<BoolNullableWithAggregatesFilter>;
  newMessages?: InputMaybe<BoolNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type UserChatUpdateData = {
  mentioned: SetBooleanHelper;
  newMessages: SetBooleanHelper;
};

export type UserChatUpdateEnvelope = {
  data: UserChatUpdateData;
  where: UserChatWhereInput;
};

export type UserChatWhereInput = {
  AND?: InputMaybe<Array<UserChatWhereInput>>;
  NOT?: InputMaybe<Array<UserChatWhereInput>>;
  OR?: InputMaybe<Array<UserChatWhereInput>>;
  chat?: InputMaybe<ChatWhereInput>;
  chatId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  mentioned?: InputMaybe<BoolNullableFilter>;
  newMessages?: InputMaybe<BoolNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type UserChatWhereUniqueInput = {
  AND?: InputMaybe<Array<UserChatWhereInput>>;
  NOT?: InputMaybe<Array<UserChatWhereInput>>;
  OR?: InputMaybe<Array<UserChatWhereInput>>;
  chat?: InputMaybe<ChatWhereInput>;
  chatId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  mentioned?: InputMaybe<BoolNullableFilter>;
  newMessages?: InputMaybe<BoolNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type UserContribution = {
  __typename?: 'UserContribution';
  businesses: Array<Scalars['String']>;
  groups?: Maybe<Array<Scalars['String']>>;
  lastLogin: Scalars['String'];
  name: Scalars['String'];
  totalIncidents: Scalars['Int'];
  totalLogins: Scalars['Int'];
  totalMessages: Scalars['Int'];
  totalOffenders: Scalars['Int'];
  totalUpdates: Scalars['Int'];
};

export type UserContributionOrderByInput = {
  fullName?: InputMaybe<SortOrder>;
  totalIncidents?: InputMaybe<SortOrder>;
  totalLogins?: InputMaybe<SortOrder>;
  totalMessages?: InputMaybe<SortOrder>;
  totalOffenders?: InputMaybe<SortOrder>;
  totalUpdates?: InputMaybe<SortOrder>;
};

export type UserContributionWhereInput = {
  brandsIds?: InputMaybe<Array<Scalars['String']>>;
  businessesIds?: InputMaybe<Array<Scalars['String']>>;
  crimeGroupId?: InputMaybe<Scalars['String']>;
  dataBusinessBrandsIds?: InputMaybe<Array<Scalars['String']>>;
  dataBusinessGroupIds?: InputMaybe<Array<Scalars['String']>>;
  dateRange: DateRangeInput;
  groupIds: Array<Scalars['String']>;
  incidentTypeIds?: InputMaybe<Array<Scalars['String']>>;
  industryIds?: InputMaybe<Array<Scalars['String']>>;
  offenderId?: InputMaybe<Scalars['String']>;
  rolesIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export type UserEngagementActivity = {
  __typename?: 'UserEngagementActivity';
  bulletins: Array<BulletinView>;
  documents: Array<DocumentView>;
  offenders: Array<OffenderView>;
  totalBulletinsViewed: Scalars['Int'];
  totalDocumentsViewed: Scalars['Int'];
  totalOffendersViewed: Scalars['Int'];
  totalViews: Scalars['Int'];
  userFullName: Scalars['String'];
  userId: Scalars['String'];
};

export type UserEngagementDepth = {
  __typename?: 'UserEngagementDepth';
  /** User email */
  email?: Maybe<Scalars['String']>;
  /** Calculated engagement score (0-100) */
  engagementScore: Scalars['Float'];
  /** Number of incidents created */
  incidentsCreated: Scalars['Int'];
  /** Number of investigations created */
  investigationsCreated: Scalars['Int'];
  /** Last activity date */
  lastActive?: Maybe<Scalars['DateTime']>;
  /** Number of messages posted */
  messagesPosted: Scalars['Int'];
  /** Number of offenders created */
  offendersCreated: Scalars['Int'];
  /** Number of sessions in period */
  sessionCount: Scalars['Int'];
  /** Total number of actions performed */
  totalActions: Scalars['Int'];
  /** Number of updates created */
  updatesCreated: Scalars['Int'];
  /** User ID */
  userId: Scalars['String'];
  /** User full name */
  userName: Scalars['String'];
  /** Number of vehicles created */
  vehiclesCreated: Scalars['Int'];
};

export type UserGroupsPermissionFilter = {
  allowedMethods: Array<PermissionMethod>;
  model: PermissionModel;
};

export type UserGroupsReplayWhere = {
  schemeIds?: InputMaybe<Array<Scalars['String']>>;
  schemePermissionFilter?: InputMaybe<Array<UserGroupsPermissionFilter>>;
};

export type UserIncidentsCountGraphInput = {
  brandIds?: InputMaybe<Array<Scalars['String']>>;
  businessesIds?: InputMaybe<Array<Scalars['String']>>;
  crimeGroupId?: InputMaybe<Scalars['String']>;
  dateRange: DateRangeInput;
  groupIds: Array<Scalars['String']>;
  industryIds?: InputMaybe<Array<Scalars['String']>>;
  offenderId?: InputMaybe<Scalars['String']>;
  roleIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserMessage = {
  __typename?: 'UserMessage';
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  message: Message;
  read: Scalars['Boolean'];
  user: User;
};

export type UserNew = {
  __typename?: 'UserNew';
  email?: Maybe<Scalars['String']>;
  hasAuth0Id: Scalars['Boolean'];
  id: Scalars['String'];
  newUser: Scalars['Boolean'];
};

export type UserNewAuth0 = {
  __typename?: 'UserNewAuth0';
  message: Scalars['String'];
};

export type UserNotification = {
  __typename?: 'UserNotification';
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  notification: Notification;
  read: Scalars['Boolean'];
  user: User;
};

export type UserNotificationListRelationFilter = {
  every?: InputMaybe<UserNotificationWhereInput>;
  none?: InputMaybe<UserNotificationWhereInput>;
  some?: InputMaybe<UserNotificationWhereInput>;
};

export type UserNotificationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserNotificationOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  notification?: InputMaybe<NotificationOrderByWithRelationInput>;
  notificationId?: InputMaybe<SortOrder>;
  read?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum UserNotificationScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  NotificationId = 'notificationId',
  Read = 'read',
  UserId = 'userId'
}

export type UserNotificationScalarWhereInput = {
  AND?: InputMaybe<Array<UserNotificationScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserNotificationScalarWhereInput>>;
  OR?: InputMaybe<Array<UserNotificationScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  notificationId?: InputMaybe<StringFilter>;
  read?: InputMaybe<BoolFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserNotificationScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserNotificationScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserNotificationScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserNotificationScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  notificationId?: InputMaybe<StringWithAggregatesFilter>;
  read?: InputMaybe<BoolWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type UserNotificationWhereInput = {
  AND?: InputMaybe<Array<UserNotificationWhereInput>>;
  NOT?: InputMaybe<Array<UserNotificationWhereInput>>;
  OR?: InputMaybe<Array<UserNotificationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  notification?: InputMaybe<NotificationWhereInput>;
  notificationId?: InputMaybe<StringFilter>;
  read?: InputMaybe<BoolFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type UserNotificationWhereUniqueInput = {
  AND?: InputMaybe<Array<UserNotificationWhereInput>>;
  NOT?: InputMaybe<Array<UserNotificationWhereInput>>;
  OR?: InputMaybe<Array<UserNotificationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  notification?: InputMaybe<NotificationWhereInput>;
  notificationId?: InputMaybe<StringFilter>;
  read?: InputMaybe<BoolFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type UserOnline = {
  __typename?: 'UserOnline';
  online: Scalars['Boolean'];
  userId: Scalars['String'];
};

export type UserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  approverGroups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  assignedTodos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  auth0Id?: InputMaybe<SortOrder>;
  bulletinEmails?: InputMaybe<SortOrder>;
  bulletinPush?: InputMaybe<SortOrder>;
  chats?: InputMaybe<UserChatOrderByRelationAggregateInput>;
  completedTodos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  contact?: InputMaybe<ContactOrderByWithRelationInput>;
  contactId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdTags?: InputMaybe<TagOrderByRelationAggregateInput>;
  createdTodos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  createdUpdates?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  crimeGroups?: InputMaybe<CrimeGroupOrderByRelationAggregateInput>;
  csvImports?: InputMaybe<CsvImportOrderByRelationAggregateInput>;
  defaultGroups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  demId?: InputMaybe<SortOrder>;
  disabled?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  expoPushTokens?: InputMaybe<ExpoPushTokenOrderByRelationAggregateInput>;
  feedItems?: InputMaybe<FeedItemOrderByRelationAggregateInput>;
  fullName?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  impressions?: InputMaybe<ImpressionOrderByRelationAggregateInput>;
  incidentEmail?: InputMaybe<SortOrder>;
  incidentPush?: InputMaybe<SortOrder>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  intel?: InputMaybe<IntelOrderByRelationAggregateInput>;
  investigations?: InputMaybe<InvestigationOrderByRelationAggregateInput>;
  ipAddress?: InputMaybe<SortOrder>;
  loginEvents?: InputMaybe<LoginEventOrderByRelationAggregateInput>;
  mentionedUpdated?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  messageMentions?: InputMaybe<MessageOrderByRelationAggregateInput>;
  messagePush?: InputMaybe<SortOrder>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  mg11s?: InputMaybe<Mg11OrderByRelationAggregateInput>;
  newSchemeNotifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  newUser?: InputMaybe<SortOrder>;
  notifications?: InputMaybe<UserNotificationOrderByRelationAggregateInput>;
  offenderEmail?: InputMaybe<SortOrder>;
  offenderPush?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  onboardSteps?: InputMaybe<SortOrder>;
  oneSignalIds?: InputMaybe<OneSignalIdOrderByRelationAggregateInput>;
  organisation?: InputMaybe<SortOrder>;
  platform?: InputMaybe<SortOrder>;
  publicName?: InputMaybe<SortOrder>;
  recycled?: InputMaybe<SortOrder>;
  recycledItems?: InputMaybe<RecycledItemOrderByRelationAggregateInput>;
  reference?: InputMaybe<SortOrder>;
  reportToAllBusinesses?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<UserSchemeOrderByRelationAggregateInput>;
  status?: InputMaybe<SortOrder>;
  subscribedCrimeGroups?: InputMaybe<CrimeGroupOrderByRelationAggregateInput>;
  subscribedIncidentOnly?: InputMaybe<SortOrder>;
  subscribedIncidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  subscribedInvestigations?: InputMaybe<InvestigationOrderByRelationAggregateInput>;
  subscribedOffenderOnly?: InputMaybe<SortOrder>;
  subscribedOffenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  subscribedVehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
  tags?: InputMaybe<TagOrderByRelationAggregateInput>;
  taskTimeTaken?: InputMaybe<TimeTakenOrderByRelationAggregateInput>;
  termsSigned?: InputMaybe<SortOrder>;
  timeSigned?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uploaded?: InputMaybe<SortOrder>;
  vehicles?: InputMaybe<VehicleOrderByRelationAggregateInput>;
};

export type UserPlatformPreference = {
  __typename?: 'UserPlatformPreference';
  /** Number of Android sessions */
  androidSessions: Scalars['Int'];
  /** Number of iOS sessions */
  iosSessions: Scalars['Int'];
  /** Whether user uses multiple platforms */
  multiPlatformUser: Scalars['Boolean'];
  /** Most used platform */
  primaryPlatform: Scalars['String'];
  /** User ID */
  userId: Scalars['String'];
  /** User name */
  userName: Scalars['String'];
  /** Number of web sessions */
  webSessions: Scalars['Int'];
};

export type UserRelayAdminWhereInput = {
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
};

export type UserRelayWhereInput = {
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};

export enum UserScalarFieldEnum {
  Auth0Id = 'auth0Id',
  BulletinEmails = 'bulletinEmails',
  BulletinPush = 'bulletinPush',
  ContactId = 'contactId',
  CreatedAt = 'createdAt',
  DemId = 'demId',
  Disabled = 'disabled',
  Email = 'email',
  FullName = 'fullName',
  Id = 'id',
  IncidentEmail = 'incidentEmail',
  IncidentPush = 'incidentPush',
  IpAddress = 'ipAddress',
  MessagePush = 'messagePush',
  NewUser = 'newUser',
  OffenderEmail = 'offenderEmail',
  OffenderPush = 'offenderPush',
  OnboardSteps = 'onboardSteps',
  Organisation = 'organisation',
  Platform = 'platform',
  PublicName = 'publicName',
  Recycled = 'recycled',
  Reference = 'reference',
  ReportToAllBusinesses = 'reportToAllBusinesses',
  Status = 'status',
  SubscribedIncidentOnly = 'subscribedIncidentOnly',
  SubscribedOffenderOnly = 'subscribedOffenderOnly',
  TermsSigned = 'termsSigned',
  TimeSigned = 'timeSigned',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  Uploaded = 'uploaded'
}

export type UserScheme = {
  __typename?: 'UserScheme';
  activityEmail: Scalars['Boolean'];
  activityPush: Scalars['Boolean'];
  bulletinEmails: Scalars['Boolean'];
  bulletinPush: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  dashboard?: Maybe<Dashboard>;
  disabled: Scalars['Boolean'];
  fullName: Scalars['String'];
  id: Scalars['String'];
  incidentEmail: Scalars['Boolean'];
  incidentPush: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  messagePush: Scalars['Boolean'];
  notificationCount: Scalars['Int'];
  offenderEmail: Scalars['Boolean'];
  offenderPush: Scalars['Boolean'];
  orignalPermissions?: Maybe<CustomRole>;
  permissions: Array<Permissions>;
  permissionsId?: Maybe<Scalars['String']>;
  recycled: Scalars['Boolean'];
  role: Role;
  scheme: Scheme;
  schemeId: Scalars['String'];
  subscribedIncidentOnly: Scalars['Boolean'];
  subscribedOffenderOnly: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type UserSchemeCreateWithoutUserInput = {
  permissions?: InputMaybe<ConnectHelper>;
  role: Role;
  scheme?: InputMaybe<ConnectHelper>;
};

export type UserSchemeListRelationFilter = {
  every?: InputMaybe<UserSchemeWhereInput>;
  none?: InputMaybe<UserSchemeWhereInput>;
  some?: InputMaybe<UserSchemeWhereInput>;
};

export type UserSchemeOnUserInput = {
  create?: InputMaybe<Array<UserSchemeCreateWithoutUserInput>>;
  update?: InputMaybe<Array<UserSchemeOnUserUpdateInputEnvelope>>;
};

export type UserSchemeOnUserUpdateInput = {
  activityEmail?: InputMaybe<SetBooleanHelper>;
  activityPush?: InputMaybe<SetBooleanHelper>;
  bulletinEmails?: InputMaybe<SetBooleanHelper>;
  bulletinPush?: InputMaybe<SetBooleanHelper>;
  disabled?: InputMaybe<SetBooleanHelper>;
  fullName?: InputMaybe<SetStringHelper>;
  incidentEmail?: InputMaybe<SetBooleanHelper>;
  incidentPush?: InputMaybe<SetBooleanHelper>;
  messagePush?: InputMaybe<SetBooleanHelper>;
  offenderEmail?: InputMaybe<SetBooleanHelper>;
  offenderPush?: InputMaybe<SetBooleanHelper>;
  permissions?: InputMaybe<ConnectHelper>;
  publicName?: InputMaybe<SetBooleanHelper>;
  reportToAllBusinesses?: InputMaybe<SetBooleanHelper>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  subscribedIncidentOnly?: InputMaybe<SetBooleanHelper>;
  subscribedOffenderOnly?: InputMaybe<SetBooleanHelper>;
};

export type UserSchemeOnUserUpdateInputEnvelope = {
  data: UserSchemeOnUserUpdateInput;
  where: UserSchemeWhereUniqueInput;
};

export type UserSchemeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserSchemeOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  fullName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  recycled?: InputMaybe<SortOrder>;
  role?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum UserSchemeScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Recycled = 'recycled',
  Role = 'role',
  SchemeId = 'schemeId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type UserSchemeScalarWhereInput = {
  AND?: InputMaybe<Array<UserSchemeScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserSchemeScalarWhereInput>>;
  OR?: InputMaybe<Array<UserSchemeScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  recycled?: InputMaybe<BoolFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserSchemeScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserSchemeScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserSchemeScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserSchemeScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  recycled?: InputMaybe<BoolWithAggregatesFilter>;
  role?: InputMaybe<EnumRoleWithAggregatesFilter>;
  schemeId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type UserSchemeWhereInput = {
  AND?: InputMaybe<Array<UserSchemeWhereInput>>;
  NOT?: InputMaybe<Array<UserSchemeWhereInput>>;
  OR?: InputMaybe<Array<UserSchemeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  fullName?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  permissions?: InputMaybe<CustomRoleWhereInput>;
  recycled?: InputMaybe<BoolFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type UserSchemeWhereUniqueInput = {
  AND?: InputMaybe<Array<UserSchemeWhereInput>>;
  NOT?: InputMaybe<Array<UserSchemeWhereInput>>;
  OR?: InputMaybe<Array<UserSchemeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<BoolFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
  Inactive = 'INACTIVE',
  Invited = 'INVITED',
  NotInvited = 'NOT_INVITED'
}

export type UserTerm = {
  __typename?: 'UserTerm';
  accepted: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  signature?: Maybe<Scalars['String']>;
  signedAt: Scalars['Date'];
  terms: TermsAndCondition;
  updatedAt: Scalars['Date'];
  user: User;
};

export type UserTermListRelationFilter = {
  every?: InputMaybe<UserTermWhereInput>;
  none?: InputMaybe<UserTermWhereInput>;
  some?: InputMaybe<UserTermWhereInput>;
};

export type UserTermOrderByWithRelationInput = {
  accepted?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  signature?: InputMaybe<SortOrder>;
  signedAt?: InputMaybe<SortOrder>;
  terms?: InputMaybe<TermsAndConditionOrderByWithRelationInput>;
  termsId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum UserTermScalarFieldEnum {
  Accepted = 'accepted',
  CreatedAt = 'createdAt',
  Id = 'id',
  Signature = 'signature',
  SignedAt = 'signedAt',
  TermsId = 'termsId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type UserTermScalarWhereInput = {
  AND?: InputMaybe<Array<UserTermScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserTermScalarWhereInput>>;
  OR?: InputMaybe<Array<UserTermScalarWhereInput>>;
  accepted?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  signature?: InputMaybe<StringNullableFilter>;
  signedAt?: InputMaybe<DateTimeFilter>;
  termsId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserTermScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<UserTermScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<UserTermScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<UserTermScalarWhereWithAggregatesInput>>;
  accepted?: InputMaybe<BoolWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  signature?: InputMaybe<StringNullableWithAggregatesFilter>;
  signedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  termsId?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  userId?: InputMaybe<StringWithAggregatesFilter>;
};

export type UserTermWhereInput = {
  AND?: InputMaybe<Array<UserTermWhereInput>>;
  NOT?: InputMaybe<Array<UserTermWhereInput>>;
  OR?: InputMaybe<Array<UserTermWhereInput>>;
  accepted?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  signature?: InputMaybe<StringNullableFilter>;
  signedAt?: InputMaybe<DateTimeFilter>;
  terms?: InputMaybe<TermsAndConditionWhereInput>;
  termsId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type UserTermWhereUniqueInput = {
  AND?: InputMaybe<Array<UserTermWhereInput>>;
  NOT?: InputMaybe<Array<UserTermWhereInput>>;
  OR?: InputMaybe<Array<UserTermWhereInput>>;
  accepted?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  signature?: InputMaybe<StringNullableFilter>;
  signedAt?: InputMaybe<DateTimeFilter>;
  terms?: InputMaybe<TermsAndConditionWhereInput>;
  termsId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export enum UserType {
  Guest = 'GUEST',
  User = 'USER'
}

export type UserUpdateInput = {
  activityEmail?: InputMaybe<SetBooleanHelper>;
  activityPush?: InputMaybe<SetBooleanHelper>;
  approverGroups?: InputMaybe<NullableConnectArrayHelper>;
  bulletinEmails?: InputMaybe<SetBooleanHelper>;
  bulletinPush?: InputMaybe<SetBooleanHelper>;
  businesses?: InputMaybe<BusinessCreateNestedManyWithoutUsersInput>;
  chats?: InputMaybe<ChatMembersUpdate>;
  defaultGroups?: InputMaybe<NullableConnectArrayHelper>;
  defaultScheme?: InputMaybe<SetStringHelper>;
  disabled?: InputMaybe<SetBooleanHelper>;
  email?: InputMaybe<SetStringHelper>;
  fullName?: InputMaybe<SetStringHelper>;
  groups?: InputMaybe<NullableConnectArrayHelper>;
  incidentEmail?: InputMaybe<SetBooleanHelper>;
  incidentPush?: InputMaybe<SetBooleanHelper>;
  messagePush?: InputMaybe<SetBooleanHelper>;
  mobileNumber?: InputMaybe<SetStringHelper>;
  newUser?: InputMaybe<SetBooleanHelper>;
  offenderEmail?: InputMaybe<SetBooleanHelper>;
  offenderPush?: InputMaybe<SetBooleanHelper>;
  publicName?: InputMaybe<SetBooleanHelper>;
  reportToAllBusinesses?: InputMaybe<SetBooleanHelper>;
  schemes?: InputMaybe<UserSchemeOnUserInput>;
  status?: InputMaybe<NullableEnumUserStatusFieldUpdateOperationsInput>;
  subscribedIncidentOnly?: InputMaybe<SetBooleanHelper>;
  subscribedOffenderOnly?: InputMaybe<SetBooleanHelper>;
  termsExpire?: InputMaybe<SetDateHelper>;
  termsSigned?: InputMaybe<SetBooleanHelper>;
};

export type UserUpdateManyWithoutAssignedIncidents = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserUpdateManyWithoutGroups = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  addresses?: InputMaybe<AddressListRelationFilter>;
  approverGroups?: InputMaybe<GroupListRelationFilter>;
  assignedTodos?: InputMaybe<TodoListRelationFilter>;
  auth0Id?: InputMaybe<StringNullableFilter>;
  bans?: InputMaybe<BanListRelationFilter>;
  bulletinEmails?: InputMaybe<BoolFilter>;
  bulletinPush?: InputMaybe<BoolFilter>;
  businesses?: InputMaybe<BusinessListRelationFilter>;
  chats?: InputMaybe<UserChatListRelationFilter>;
  completedTodos?: InputMaybe<TodoListRelationFilter>;
  contact?: InputMaybe<ContactWhereInput>;
  contactId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdTags?: InputMaybe<TagListRelationFilter>;
  createdTodos?: InputMaybe<TodoListRelationFilter>;
  createdUpdates?: InputMaybe<UpdateListRelationFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  csvImports?: InputMaybe<CsvImportListRelationFilter>;
  defaultGroups?: InputMaybe<GroupListRelationFilter>;
  demId?: InputMaybe<StringNullableFilter>;
  disabled?: InputMaybe<BoolFilter>;
  email?: InputMaybe<StringFilter>;
  expoPushTokens?: InputMaybe<ExpoPushTokenListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  fullName?: InputMaybe<StringFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  impressions?: InputMaybe<ImpressionListRelationFilter>;
  incidentEmail?: InputMaybe<BoolFilter>;
  incidentPush?: InputMaybe<BoolFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  ipAddress?: InputMaybe<StringNullableFilter>;
  loginEvents?: InputMaybe<LoginEventListRelationFilter>;
  mentionedUpdated?: InputMaybe<UpdateListRelationFilter>;
  messageMentions?: InputMaybe<MessageListRelationFilter>;
  messagePush?: InputMaybe<BoolFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  mg11s?: InputMaybe<Mg11ListRelationFilter>;
  newSchemeNotifications?: InputMaybe<NotificationListRelationFilter>;
  newUser?: InputMaybe<BoolFilter>;
  notifications?: InputMaybe<UserNotificationListRelationFilter>;
  offenderEmail?: InputMaybe<BoolFilter>;
  offenderPush?: InputMaybe<BoolFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFilter>;
  oneSignalIds?: InputMaybe<OneSignalIdListRelationFilter>;
  organisation?: InputMaybe<StringFilter>;
  platform?: InputMaybe<StringNullableFilter>;
  publicName?: InputMaybe<BoolFilter>;
  recycled?: InputMaybe<BoolFilter>;
  recycledItems?: InputMaybe<RecycledItemListRelationFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  reportToAllBusinesses?: InputMaybe<BoolFilter>;
  schemes?: InputMaybe<UserSchemeListRelationFilter>;
  status?: InputMaybe<EnumUserStatusNullableFilter>;
  subscribedCrimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  subscribedIncidentOnly?: InputMaybe<BoolFilter>;
  subscribedIncidents?: InputMaybe<IncidentListRelationFilter>;
  subscribedInvestigations?: InputMaybe<InvestigationListRelationFilter>;
  subscribedOffenderOnly?: InputMaybe<BoolFilter>;
  subscribedOffenders?: InputMaybe<OffenderListRelationFilter>;
  subscribedVehicles?: InputMaybe<VehicleListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  taskTimeTaken?: InputMaybe<TimeTakenListRelationFilter>;
  termsSigned?: InputMaybe<BoolFilter>;
  timeSigned?: InputMaybe<DateTimeNullableFilter>;
  type?: InputMaybe<EnumUserTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
  userTerms?: InputMaybe<UserTermListRelationFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  addresses?: InputMaybe<AddressListRelationFilter>;
  approverGroups?: InputMaybe<GroupListRelationFilter>;
  assignedTodos?: InputMaybe<TodoListRelationFilter>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanListRelationFilter>;
  bulletinEmails?: InputMaybe<BoolFilter>;
  bulletinPush?: InputMaybe<BoolFilter>;
  businesses?: InputMaybe<BusinessListRelationFilter>;
  chats?: InputMaybe<UserChatListRelationFilter>;
  completedTodos?: InputMaybe<TodoListRelationFilter>;
  contact?: InputMaybe<ContactWhereInput>;
  contactId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdTags?: InputMaybe<TagListRelationFilter>;
  createdTodos?: InputMaybe<TodoListRelationFilter>;
  createdUpdates?: InputMaybe<UpdateListRelationFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  csvImports?: InputMaybe<CsvImportListRelationFilter>;
  defaultGroups?: InputMaybe<GroupListRelationFilter>;
  demId?: InputMaybe<StringNullableFilter>;
  disabled?: InputMaybe<BoolFilter>;
  email?: InputMaybe<Scalars['String']>;
  expoPushTokens?: InputMaybe<ExpoPushTokenListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  fullName?: InputMaybe<StringFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageListRelationFilter>;
  impressions?: InputMaybe<ImpressionListRelationFilter>;
  incidentEmail?: InputMaybe<BoolFilter>;
  incidentPush?: InputMaybe<BoolFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  ipAddress?: InputMaybe<StringNullableFilter>;
  loginEvents?: InputMaybe<LoginEventListRelationFilter>;
  mentionedUpdated?: InputMaybe<UpdateListRelationFilter>;
  messageMentions?: InputMaybe<MessageListRelationFilter>;
  messagePush?: InputMaybe<BoolFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  mg11s?: InputMaybe<Mg11ListRelationFilter>;
  newSchemeNotifications?: InputMaybe<NotificationListRelationFilter>;
  newUser?: InputMaybe<BoolFilter>;
  notifications?: InputMaybe<UserNotificationListRelationFilter>;
  offenderEmail?: InputMaybe<BoolFilter>;
  offenderPush?: InputMaybe<BoolFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFilter>;
  oneSignalIds?: InputMaybe<OneSignalIdListRelationFilter>;
  organisation?: InputMaybe<StringFilter>;
  platform?: InputMaybe<StringNullableFilter>;
  publicName?: InputMaybe<BoolFilter>;
  recycled?: InputMaybe<BoolFilter>;
  recycledItems?: InputMaybe<RecycledItemListRelationFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  reportToAllBusinesses?: InputMaybe<BoolFilter>;
  schemes?: InputMaybe<UserSchemeListRelationFilter>;
  status?: InputMaybe<EnumUserStatusNullableFilter>;
  subscribedCrimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  subscribedIncidentOnly?: InputMaybe<BoolFilter>;
  subscribedIncidents?: InputMaybe<IncidentListRelationFilter>;
  subscribedInvestigations?: InputMaybe<InvestigationListRelationFilter>;
  subscribedOffenderOnly?: InputMaybe<BoolFilter>;
  subscribedOffenders?: InputMaybe<OffenderListRelationFilter>;
  subscribedVehicles?: InputMaybe<VehicleListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  taskTimeTaken?: InputMaybe<TimeTakenListRelationFilter>;
  termsSigned?: InputMaybe<BoolFilter>;
  timeSigned?: InputMaybe<DateTimeNullableFilter>;
  type?: InputMaybe<EnumUserTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
  userTerms?: InputMaybe<UserTermListRelationFilter>;
  vehicles?: InputMaybe<VehicleListRelationFilter>;
};

export type UsersToGetFrom = {
  __typename?: 'UsersToGetFrom';
  adminGroups?: Maybe<Array<Scalars['String']>>;
  createdBy?: Maybe<Scalars['Boolean']>;
  groups?: Maybe<Array<Scalars['String']>>;
  parentGroups?: Maybe<Scalars['Boolean']>;
  parentGroupsAdmin?: Maybe<Scalars['Boolean']>;
  roles?: Maybe<Array<Scalars['String']>>;
  users?: Maybe<Array<Scalars['String']>>;
};

export type UsersToGetInput = {
  adminGroups?: InputMaybe<Array<Scalars['String']>>;
  createdBy?: InputMaybe<Scalars['Boolean']>;
  groups?: InputMaybe<Array<Scalars['String']>>;
  parentGroups?: InputMaybe<Scalars['Boolean']>;
  parentGroupsAdmin?: InputMaybe<Scalars['Boolean']>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  users?: InputMaybe<Array<Scalars['String']>>;
};

export type ValueTotals = {
  __typename?: 'ValueTotals';
  avgLostValue: Scalars['Float'];
  avgRecoveredValue: Scalars['Float'];
  businessId: Scalars['String'];
  successRate: Scalars['Float'];
  totalLostValue: Scalars['Float'];
  totalRecoveredValue: Scalars['Float'];
};

export type Vehicle = {
  __typename?: 'Vehicle';
  actions: Array<Action>;
  aiAssociatedRisk?: Maybe<AiAssociatedRisk>;
  aiGeographicMovement?: Maybe<AiGeographicMovement>;
  aiGeographicPattern?: Maybe<Scalars['String']>;
  aiImprovements?: Maybe<Scalars['String']>;
  aiKeyObservations: Array<Scalars['String']>;
  aiQualityScore?: Maybe<Scalars['Int']>;
  aiSummary?: Maybe<Scalars['String']>;
  aiUsagePatterns?: Maybe<Scalars['String']>;
  aiVehicleUsageAnalysis?: Maybe<AiVehicleUsageAnalysis>;
  colour?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']>;
  crimeGroup: Array<CrimeGroup>;
  customGalleries: Array<CustomGallery>;
  deleted: Scalars['Boolean'];
  evidence: Array<Document>;
  feedImage?: Maybe<Image>;
  feedItems: Array<FeedItem>;
  groups: Array<Group>;
  id: Scalars['ID'];
  images: Array<Image>;
  incidents: Array<Incident>;
  investigations: Array<Investigation>;
  latestUpdate?: Maybe<Update>;
  linkedUpdates: Array<Update>;
  make?: Maybe<Scalars['String']>;
  messages: Array<Message>;
  model?: Maybe<Scalars['String']>;
  notifications: Array<Notification>;
  offenders: Array<Offender>;
  recycleDate: Scalars['Date'];
  ref: Scalars['String'];
  reference?: Maybe<Scalars['Int']>;
  referenceStr?: Maybe<Scalars['String']>;
  registration?: Maybe<Scalars['String']>;
  schemes: Array<Scheme>;
  subscribed: Scalars['Boolean'];
  subscribedUsers: Array<User>;
  todos: Array<Todo>;
  totalCrimeGroups: Scalars['Int'];
  totalImages: Scalars['Int'];
  totalIncidents: Scalars['Int'];
  totalOffenders: Scalars['Int'];
  totalUpdates: Scalars['Int'];
  updatedAt: Scalars['Date'];
  updates: Array<Update>;
};


export type VehicleActionsArgs = {
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type VehicleCrimeGroupArgs = {
  cursor?: InputMaybe<CrimeGroupWhereUniqueInput>;
  distinct?: InputMaybe<CrimeGroupScalarFieldEnum>;
  orderBy?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CrimeGroupWhereInput>;
};


export type VehicleCustomGalleriesArgs = {
  cursor?: InputMaybe<CustomGalleryWhereUniqueInput>;
  distinct?: InputMaybe<CustomGalleryScalarFieldEnum>;
  orderBy?: InputMaybe<CustomGalleryOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CustomGalleryWhereInput>;
};


export type VehicleEvidenceArgs = {
  cursor?: InputMaybe<DocumentWhereUniqueInput>;
  distinct?: InputMaybe<Array<DocumentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DocumentWhereInput>;
};


export type VehicleFeedItemsArgs = {
  cursor?: InputMaybe<FeedItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeedItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeedItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
};


export type VehicleGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type VehicleImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


export type VehicleIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type VehicleInvestigationsArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<Array<InvestigationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InvestigationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type VehicleLinkedUpdatesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type VehicleMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type VehicleNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type VehicleOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type VehicleSchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};


export type VehicleSubscribedUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type VehicleTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<TodoScalarFieldEnum>;
  orderBy?: InputMaybe<TodoOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};


export type VehicleUpdatesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};

export type VehicleCreateWithoutCrimeGroupInput = {
  colour?: InputMaybe<Scalars['String']>;
  crimeGroup?: InputMaybe<NullableConnectArrayHelper>;
  customGalleries?: InputMaybe<CustomGalleryCreateNestedManyWithoutOffender>;
  groups?: InputMaybe<NullableConnectArrayHelper>;
  incidents?: InputMaybe<NullableConnectArrayHelper>;
  make?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  offenders?: InputMaybe<NullableConnectArrayHelper>;
  registration?: InputMaybe<Scalars['String']>;
  schemes?: InputMaybe<NullableConnectArrayHelper>;
};

export type VehicleCreateWithoutIncidentsInput = {
  colour?: InputMaybe<Scalars['String']>;
  groups: ConnectOnlyArrayHelper;
  localId?: InputMaybe<Scalars['String']>;
  make?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  registration?: InputMaybe<Scalars['String']>;
};

export type VehicleCreateWithoutOffenderInput = {
  colour?: InputMaybe<Scalars['String']>;
  crimeGroup?: InputMaybe<ConnectOnlyArrayHelper>;
  groups: ConnectOnlyArrayHelper;
  incidents?: InputMaybe<ConnectOnlyArrayHelper>;
  localId?: InputMaybe<Scalars['String']>;
  make?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  registration?: InputMaybe<Scalars['String']>;
  schemes?: InputMaybe<ConnectOnlyArrayHelper>;
};

export type VehicleListRelationFilter = {
  every?: InputMaybe<VehicleWhereInput>;
  none?: InputMaybe<VehicleWhereInput>;
  some?: InputMaybe<VehicleWhereInput>;
};

export type VehicleOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type VehicleOrderByWithRelationInput = {
  colour?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  crimeGroup?: InputMaybe<CrimeGroupOrderByRelationAggregateInput>;
  customGalleries?: InputMaybe<CustomGalleryOrderByRelationAggregateInput>;
  deleted?: InputMaybe<SortOrder>;
  evidence?: InputMaybe<DocumentOrderByRelationAggregateInput>;
  feedItems?: InputMaybe<FeedItemOrderByRelationAggregateInput>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  investigations?: InputMaybe<InvestigationOrderByRelationAggregateInput>;
  linkedUpdates?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  make?: InputMaybe<SortOrder>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  model?: InputMaybe<SortOrder>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  recycleDate?: InputMaybe<SortOrder>;
  ref?: InputMaybe<SortOrder>;
  reference?: InputMaybe<SortOrder>;
  referenceStr?: InputMaybe<SortOrder>;
  registration?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  subscribedUsers?: InputMaybe<UserOrderByRelationAggregateInput>;
  todos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  updates?: InputMaybe<UpdateOrderByRelationAggregateInput>;
};

export enum VehicleScalarFieldEnum {
  Colour = 'colour',
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  Deleted = 'deleted',
  Id = 'id',
  Make = 'make',
  Model = 'model',
  RecycleDate = 'recycleDate',
  Ref = 'ref',
  Reference = 'reference',
  ReferenceStr = 'referenceStr',
  Registration = 'registration',
  UpdatedAt = 'updatedAt'
}

export type VehicleScalarWhereInput = {
  AND?: InputMaybe<Array<VehicleScalarWhereInput>>;
  NOT?: InputMaybe<Array<VehicleScalarWhereInput>>;
  OR?: InputMaybe<Array<VehicleScalarWhereInput>>;
  colour?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringNullableFilter>;
  deleted?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  make?: InputMaybe<StringNullableFilter>;
  model?: InputMaybe<StringNullableFilter>;
  recycleDate?: InputMaybe<DateTimeFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  registration?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type VehicleScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<VehicleScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<VehicleScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<VehicleScalarWhereWithAggregatesInput>>;
  colour?: InputMaybe<StringNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  createdById?: InputMaybe<StringNullableWithAggregatesFilter>;
  deleted?: InputMaybe<BoolWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  make?: InputMaybe<StringNullableWithAggregatesFilter>;
  model?: InputMaybe<StringNullableWithAggregatesFilter>;
  recycleDate?: InputMaybe<DateTimeWithAggregatesFilter>;
  ref?: InputMaybe<StringNullableWithAggregatesFilter>;
  reference?: InputMaybe<IntNullableWithAggregatesFilter>;
  referenceStr?: InputMaybe<StringNullableWithAggregatesFilter>;
  registration?: InputMaybe<StringNullableWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type VehicleUpdateInput = {
  colour?: InputMaybe<NullableSetStringHelper>;
  crimeGroup?: InputMaybe<ConnectSetHelper>;
  customGalleries?: InputMaybe<NestedCustomGalleryOnOffender>;
  groups?: InputMaybe<SetArrayHelper>;
  images?: InputMaybe<ImageUpdateManyWithoutOffenderNestedInput>;
  incidents?: InputMaybe<ConnectSetHelper>;
  make?: InputMaybe<NullableSetStringHelper>;
  model?: InputMaybe<NullableSetStringHelper>;
  offenders?: InputMaybe<ConnectSetHelper>;
  registration?: InputMaybe<NullableSetStringHelper>;
};

export type VehicleUpdateManyWithoutIncidentsInput = {
  connect?: InputMaybe<Array<VehicleWhereUniqueInput>>;
  create?: InputMaybe<Array<VehicleCreateWithoutIncidentsInput>>;
  disconnect?: InputMaybe<Array<VehicleWhereUniqueInput>>;
  update?: InputMaybe<Array<VehicleUpdateWithWhereUniqueWithoutIncidents>>;
};

export type VehicleUpdateManyWithoutOffenderNestedInput = {
  connect?: InputMaybe<Array<UniqueId>>;
  create?: InputMaybe<Array<CreateVehicleWithoutOffenderDataInput>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
  update?: InputMaybe<Array<VehicleUpdateWhereDataWithoutOffenderInput>>;
};

export type VehicleUpdateWhereDataWithoutOffenderInput = {
  data: VehicleUpdateInput;
  where: VehicleWhereUniqueInput;
};

export type VehicleUpdateWithWhereUniqueWithoutIncidents = {
  data: VehicleUpdateWithoutIncidents;
  where: VehicleWhereUniqueInput;
};

export type VehicleUpdateWithoutIncidentInput = {
  colour?: InputMaybe<NullableSetStringHelper>;
  groups?: InputMaybe<ConnectOnlyArrayHelper>;
  make?: InputMaybe<NullableSetStringHelper>;
  model?: InputMaybe<NullableSetStringHelper>;
  registration?: InputMaybe<NullableSetStringHelper>;
};

export type VehicleUpdateWithoutIncidents = {
  colour?: InputMaybe<NullableSetStringHelper>;
  crimeGroup?: InputMaybe<ConnectOnlyArrayHelper>;
  groups?: InputMaybe<ConnectOnlyArrayHelper>;
  incidents?: InputMaybe<ConnectOnlyArrayHelper>;
  make?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  model?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<ConnectOnlyArrayHelper>;
  registration?: InputMaybe<NullableSetStringHelper>;
};

export type VehicleUpdateWithoutOffenderInput = {
  colour?: InputMaybe<NullableSetStringHelper>;
  crimeGroup?: InputMaybe<ConnectOnlyArrayHelper>;
  groups?: InputMaybe<ConnectOnlyArrayHelper>;
  incidents?: InputMaybe<ConnectOnlyArrayHelper>;
  make?: InputMaybe<NullableSetStringHelper>;
  model?: InputMaybe<NullableSetStringHelper>;
  offenders?: InputMaybe<ConnectOnlyArrayHelper>;
  registration?: InputMaybe<NullableSetStringHelper>;
};

export type VehicleWhereInput = {
  AND?: InputMaybe<Array<VehicleWhereInput>>;
  NOT?: InputMaybe<Array<VehicleWhereInput>>;
  OR?: InputMaybe<Array<VehicleWhereInput>>;
  colour?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringNullableFilter>;
  crimeGroup?: InputMaybe<CrimeGroupListRelationFilter>;
  customGalleries?: InputMaybe<CustomGalleryListRelationFilter>;
  deleted?: InputMaybe<BoolFilter>;
  evidence?: InputMaybe<DocumentListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  linkedUpdates?: InputMaybe<UpdateListRelationFilter>;
  make?: InputMaybe<StringNullableFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  model?: InputMaybe<StringNullableFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  recycleDate?: InputMaybe<DateTimeFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  registration?: InputMaybe<StringNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  subscribedUsers?: InputMaybe<UserListRelationFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updates?: InputMaybe<UpdateListRelationFilter>;
};

export type VehicleWhereUniqueInput = {
  AND?: InputMaybe<Array<VehicleWhereInput>>;
  NOT?: InputMaybe<Array<VehicleWhereInput>>;
  OR?: InputMaybe<Array<VehicleWhereInput>>;
  colour?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringNullableFilter>;
  crimeGroup?: InputMaybe<CrimeGroupListRelationFilter>;
  customGalleries?: InputMaybe<CustomGalleryListRelationFilter>;
  deleted?: InputMaybe<BoolFilter>;
  evidence?: InputMaybe<DocumentListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageListRelationFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  investigations?: InputMaybe<InvestigationListRelationFilter>;
  linkedUpdates?: InputMaybe<UpdateListRelationFilter>;
  make?: InputMaybe<StringNullableFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  model?: InputMaybe<StringNullableFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  recycleDate?: InputMaybe<DateTimeFilter>;
  ref?: InputMaybe<StringNullableFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  referenceStr?: InputMaybe<StringNullableFilter>;
  registration?: InputMaybe<StringNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  subscribedUsers?: InputMaybe<UserListRelationFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  updates?: InputMaybe<UpdateListRelationFilter>;
};

export type VehiclesUpsert = {
  colour?: InputMaybe<Scalars['String']>;
  localId?: InputMaybe<Scalars['String']>;
  make?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  registration?: InputMaybe<Scalars['String']>;
};

export type VehiclesUpsertIncident = {
  connect?: InputMaybe<Array<Scalars['String']>>;
  new?: InputMaybe<Array<VehiclesUpsert>>;
  removed?: InputMaybe<Array<Scalars['String']>>;
  updated?: InputMaybe<Array<VehiclesUpsert>>;
};

export type Victim = {
  __typename?: 'Victim';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  incident: Incident;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export enum When {
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type Witness = {
  __typename?: 'Witness';
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  incident: Incident;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type Workflow = {
  __typename?: 'Workflow';
  actions: Array<WorkflowAction>;
  conditions: Scalars['JSON'];
  createdAt: Scalars['Date'];
  cronDate?: Maybe<Scalars['Date']>;
  cronSchedule?: Maybe<CronSchedule>;
  id: Scalars['String'];
  name: Scalars['String'];
  schemes: Array<Scheme>;
  trigger: WorkflowTrigger;
  triggerModels: Model;
  updatedAt: Scalars['Date'];
};

export type WorkflowAction = {
  __typename?: 'WorkflowAction';
  Workflow: Workflow;
  createdAt: Scalars['Date'];
  data: Scalars['JSON'];
  id: Scalars['String'];
  outputModel?: Maybe<Model>;
  timesRun: Scalars['Int'];
  type: WorkflowActionType;
  updatedAt: Scalars['Date'];
  workflowId: Scalars['String'];
};

export type WorkflowActionCreateNestedManyWithoutWorkflow = {
  data: Scalars['JSON'];
  outputModel?: InputMaybe<Model>;
  type: WorkflowActionType;
};

export type WorkflowActionCreateNestedManyWithoutWorkflowInput = {
  create?: InputMaybe<Array<WorkflowActionCreateNestedManyWithoutWorkflow>>;
};

export type WorkflowActionListRelationFilter = {
  every?: InputMaybe<WorkflowActionWhereInput>;
  none?: InputMaybe<WorkflowActionWhereInput>;
  some?: InputMaybe<WorkflowActionWhereInput>;
};

export type WorkflowActionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type WorkflowActionScalarWhereInput = {
  AND?: InputMaybe<Array<WorkflowActionScalarWhereInput>>;
  NOT?: InputMaybe<Array<WorkflowActionScalarWhereInput>>;
  OR?: InputMaybe<Array<WorkflowActionScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  data?: InputMaybe<JsonFilter>;
  id?: InputMaybe<StringFilter>;
  outputModel?: InputMaybe<EnumModelNullableFilter>;
  timesRun?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumWorkflowActionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  workflowId?: InputMaybe<StringFilter>;
};

export type WorkflowActionScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<WorkflowActionScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<WorkflowActionScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<WorkflowActionScalarWhereWithAggregatesInput>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  data?: InputMaybe<JsonWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  outputModel?: InputMaybe<EnumModelNullableWithAggregatesFilter>;
  timesRun?: InputMaybe<IntWithAggregatesFilter>;
  type?: InputMaybe<EnumWorkflowActionTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  workflowId?: InputMaybe<StringWithAggregatesFilter>;
};

export enum WorkflowActionType {
  AutoApprove = 'AUTO_APPROVE',
  Create = 'CREATE',
  CreateActivity = 'CREATE_ACTIVITY',
  SendEmail = 'SEND_EMAIL',
  SendNotification = 'SEND_NOTIFICATION',
  SetPriority = 'SET_PRIORITY'
}

export type WorkflowActionUpdateManyWithoutWorkflowNestedInput = {
  update?: InputMaybe<Array<WorkflowActionUpdateWithWhereUniqueWithoutWorkflowInput>>;
};

export type WorkflowActionUpdateWithWhereUniqueWithoutWorkflowInput = {
  data: WorkflowActionUpdateWithoutWorkflowInput;
  where: WorkflowActionWhereUniqueInput;
};

export type WorkflowActionUpdateWithoutWorkflowInput = {
  data?: InputMaybe<Scalars['JSON']>;
};

export type WorkflowActionWhereInput = {
  AND?: InputMaybe<Array<WorkflowActionWhereInput>>;
  NOT?: InputMaybe<Array<WorkflowActionWhereInput>>;
  OR?: InputMaybe<Array<WorkflowActionWhereInput>>;
  Workflow?: InputMaybe<WorkflowWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  data?: InputMaybe<JsonFilter>;
  id?: InputMaybe<StringFilter>;
  outputModel?: InputMaybe<EnumModelNullableFilter>;
  questions?: InputMaybe<QuestionListRelationFilter>;
  timesRun?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumWorkflowActionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  workflowId?: InputMaybe<StringFilter>;
};

export type WorkflowActionWhereUniqueInput = {
  AND?: InputMaybe<Array<WorkflowActionWhereInput>>;
  NOT?: InputMaybe<Array<WorkflowActionWhereInput>>;
  OR?: InputMaybe<Array<WorkflowActionWhereInput>>;
  Workflow?: InputMaybe<WorkflowWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  data?: InputMaybe<JsonFilter>;
  id?: InputMaybe<Scalars['String']>;
  outputModel?: InputMaybe<EnumModelNullableFilter>;
  questions?: InputMaybe<QuestionListRelationFilter>;
  timesRun?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumWorkflowActionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  workflowId?: InputMaybe<StringFilter>;
};

export type WorkflowCreateInput = {
  actions?: InputMaybe<WorkflowActionCreateNestedManyWithoutWorkflowInput>;
  conditions?: InputMaybe<Scalars['JSON']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  cronDate?: InputMaybe<Scalars['Date']>;
  cronSchedule?: InputMaybe<CronSchedule>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  schemes?: InputMaybe<ConnectOnlyArrayHelper>;
  trigger: WorkflowTrigger;
  triggerModels: Model;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type WorkflowListRelationFilter = {
  every?: InputMaybe<WorkflowWhereInput>;
  none?: InputMaybe<WorkflowWhereInput>;
  some?: InputMaybe<WorkflowWhereInput>;
};

export type WorkflowOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type WorkflowOrderByWithRelationInput = {
  actions?: InputMaybe<WorkflowActionOrderByRelationAggregateInput>;
  conditions?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  trigger?: InputMaybe<SortOrder>;
  triggerModels?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum WorkflowScalarFieldEnum {
  Conditions = 'conditions',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  Trigger = 'trigger',
  TriggerModels = 'triggerModels',
  UpdatedAt = 'updatedAt'
}

export type WorkflowScalarWhereInput = {
  AND?: InputMaybe<Array<WorkflowScalarWhereInput>>;
  NOT?: InputMaybe<Array<WorkflowScalarWhereInput>>;
  OR?: InputMaybe<Array<WorkflowScalarWhereInput>>;
  conditions?: InputMaybe<JsonNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  trigger?: InputMaybe<EnumWorkflowTriggerFilter>;
  triggerModels?: InputMaybe<EnumModelFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type WorkflowScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<WorkflowScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<WorkflowScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<WorkflowScalarWhereWithAggregatesInput>>;
  conditions?: InputMaybe<JsonNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  trigger?: InputMaybe<EnumWorkflowTriggerWithAggregatesFilter>;
  triggerModels?: InputMaybe<EnumModelWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export enum WorkflowTrigger {
  Approved = 'APPROVED',
  Assigned = 'ASSIGNED',
  Completed = 'COMPLETED',
  Created = 'CREATED',
  Cron = 'CRON',
  Recycle = 'RECYCLE',
  Updated = 'UPDATED'
}

export type WorkflowUpdateInput = {
  actions?: InputMaybe<WorkflowActionUpdateManyWithoutWorkflowNestedInput>;
  conditions?: InputMaybe<Scalars['JSON']>;
  cronDate?: InputMaybe<NullableSetDateHelper>;
  cronSchedule?: InputMaybe<NullableEnumCronScheduleFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type WorkflowWhereInput = {
  AND?: InputMaybe<Array<WorkflowWhereInput>>;
  NOT?: InputMaybe<Array<WorkflowWhereInput>>;
  OR?: InputMaybe<Array<WorkflowWhereInput>>;
  actions?: InputMaybe<WorkflowActionListRelationFilter>;
  conditions?: InputMaybe<JsonNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  trigger?: InputMaybe<EnumWorkflowTriggerFilter>;
  triggerModels?: InputMaybe<EnumModelFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type WorkflowWhereUniqueInput = {
  AND?: InputMaybe<Array<WorkflowWhereInput>>;
  NOT?: InputMaybe<Array<WorkflowWhereInput>>;
  OR?: InputMaybe<Array<WorkflowWhereInput>>;
  actions?: InputMaybe<WorkflowActionListRelationFilter>;
  conditions?: InputMaybe<JsonNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  trigger?: InputMaybe<EnumWorkflowTriggerFilter>;
  triggerModels?: InputMaybe<EnumModelFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Xy = {
  __typename?: 'XY';
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type XyHeat = {
  __typename?: 'XYHeat';
  x: Scalars['String'];
  y: Scalars['Int'];
};

export type InvestigationRelayOrderInput = {
  createdAt?: InputMaybe<SortOrder>;
};

export type InvestigationRelayWhereInput = {
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<StringFilter>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<InvestigationStatus>>;
};

export type OffenderInNotInAge = {
  in?: InputMaybe<Array<Age>>;
  notIn?: InputMaybe<Array<Age>>;
};

export type OffenderInNotInBuild = {
  in?: InputMaybe<Array<Build>>;
  notIn?: InputMaybe<Array<Build>>;
};

export type OffenderInNotInGender = {
  in?: InputMaybe<Array<Gender>>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type OffenderInNotInHeight = {
  in?: InputMaybe<Array<Height>>;
  notIn?: InputMaybe<Array<Height>>;
};

export type OffenderInNotInRace = {
  in?: InputMaybe<Array<Race>>;
  notIn?: InputMaybe<Array<Race>>;
};

export type StockItemRelayOrderInput = {
  createdAt?: InputMaybe<SortOrder>;
};

export type StockItemRelayWhereInput = {
  barcode?: InputMaybe<StringNullableFilter>;
  brand?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  currency?: InputMaybe<Currency>;
  division?: InputMaybe<StringNullableFilter>;
  divisionIds?: InputMaybe<Array<Scalars['String']>>;
  goodsTypeId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  salesPriceLocal?: InputMaybe<FloatNullableFilter>;
  salesPriceStandard?: InputMaybe<FloatNullableFilter>;
  schemeId?: InputMaybe<StringNullableFilter>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  searchColumns?: InputMaybe<StringNullableFilter>;
  sku?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  variant?: InputMaybe<StringNullableFilter>;
};
