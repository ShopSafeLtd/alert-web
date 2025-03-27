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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: Date;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { [key: string]: any };
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AiSuggestion = {
  __typename?: 'AISuggestion';
  createdAt: Scalars['Date'];
  crimeGroup?: Maybe<CrimeGroup>;
  description?: Maybe<Scalars['String']>;
  groups?: Maybe<Array<Scheme>>;
  id: Scalars['ID'];
  incident?: Maybe<Array<Incident>>;
  investigation?: Maybe<Investigation>;
  message?: Maybe<Message>;
  metadata?: Maybe<Scalars['JSON']>;
  offenders?: Maybe<Array<Offender>>;
  reference?: Maybe<Scalars['Int']>;
  rekMatch?: Maybe<RekMatch>;
  schemes?: Maybe<Array<Scheme>>;
  status?: Maybe<AiSuggestionStatus>;
  title: Scalars['String'];
  type?: Maybe<AiSuggestionType>;
  update?: Maybe<Update>;
};

export enum AiSuggestionStatus {
  Approved = 'APPROVED',
  Open = 'OPEN',
  Rejected = 'REJECTED'
}

export enum AiSuggestionType {
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

export type Action = {
  __typename?: 'Action';
  Address?: Maybe<Address>;
  Ban?: Maybe<Ban>;
  Chat?: Maybe<Chat>;
  Group?: Maybe<Group>;
  addressId?: Maybe<Scalars['String']>;
  article?: Maybe<Article>;
  articleId?: Maybe<Scalars['String']>;
  banId?: Maybe<Scalars['String']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']>;
  byUser: User;
  byUserId: Scalars['String'];
  chatId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  crimeGroup?: Maybe<CrimeGroup>;
  crimeGroupId?: Maybe<Scalars['String']>;
  dataType: Model;
  description?: Maybe<Scalars['String']>;
  groupId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageId?: Maybe<Scalars['String']>;
  images?: Maybe<Image>;
  inScheme?: Maybe<Scheme>;
  inSchemeId?: Maybe<Scalars['String']>;
  incident?: Maybe<Incident>;
  incidentId?: Maybe<Scalars['String']>;
  message?: Maybe<Message>;
  messageId?: Maybe<Scalars['String']>;
  offender?: Maybe<Offender>;
  offenderId?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  scheme?: Maybe<Scheme>;
  schemeId?: Maybe<Scalars['String']>;
  tag?: Maybe<Tag>;
  tagId?: Maybe<Scalars['String']>;
  type: ActionType;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  vehicle?: Maybe<Vehicle>;
  vehicleId?: Maybe<Scalars['String']>;
};

export type ActionListRelationFilter = {
  every?: InputMaybe<ActionWhereInput>;
  none?: InputMaybe<ActionWhereInput>;
  some?: InputMaybe<ActionWhereInput>;
};

export type ActionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ActionOrderByWithRelationInput = {
  Address?: InputMaybe<AddressOrderByWithRelationInput>;
  Ban?: InputMaybe<BanOrderByWithRelationInput>;
  Chat?: InputMaybe<ChatOrderByWithRelationInput>;
  Group?: InputMaybe<GroupOrderByWithRelationInput>;
  addressId?: InputMaybe<SortOrder>;
  article?: InputMaybe<ArticleOrderByWithRelationInput>;
  articleId?: InputMaybe<SortOrder>;
  banId?: InputMaybe<SortOrder>;
  business?: InputMaybe<BusinessOrderByWithRelationInput>;
  businessId?: InputMaybe<SortOrder>;
  byUser?: InputMaybe<UserOrderByWithRelationInput>;
  byUserId?: InputMaybe<SortOrder>;
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  crimeGroup?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  crimeGroupId?: InputMaybe<SortOrder>;
  dataType?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  groupId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageId?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByWithRelationInput>;
  inScheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  inSchemeId?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  message?: InputMaybe<MessageOrderByWithRelationInput>;
  messageId?: InputMaybe<SortOrder>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  reason?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  tag?: InputMaybe<TagOrderByWithRelationInput>;
  tagId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  vehicle?: InputMaybe<VehicleOrderByWithRelationInput>;
  vehicleId?: InputMaybe<SortOrder>;
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
  Update = 'UPDATE',
  View = 'VIEW'
}

export type ActionWhereInput = {
  AND?: InputMaybe<Array<ActionWhereInput>>;
  Address?: InputMaybe<AddressWhereInput>;
  Ban?: InputMaybe<BanWhereInput>;
  Chat?: InputMaybe<ChatWhereInput>;
  Group?: InputMaybe<GroupWhereInput>;
  NOT?: InputMaybe<Array<ActionWhereInput>>;
  OR?: InputMaybe<Array<ActionWhereInput>>;
  addressId?: InputMaybe<StringNullableFilter>;
  article?: InputMaybe<ArticleWhereInput>;
  articleId?: InputMaybe<StringNullableFilter>;
  banId?: InputMaybe<StringNullableFilter>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringNullableFilter>;
  byUser?: InputMaybe<UserWhereInput>;
  byUserId?: InputMaybe<StringFilter>;
  chatId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroup?: InputMaybe<CrimeGroupWhereInput>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  dataType?: InputMaybe<EnumModelFilter>;
  description?: InputMaybe<StringNullableFilter>;
  groupId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  imageId?: InputMaybe<StringNullableFilter>;
  images?: InputMaybe<ImageWhereInput>;
  inScheme?: InputMaybe<SchemeWhereInput>;
  inSchemeId?: InputMaybe<StringNullableFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  message?: InputMaybe<MessageWhereInput>;
  messageId?: InputMaybe<StringNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  reason?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  tag?: InputMaybe<TagWhereInput>;
  tagId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumActionTypeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringNullableFilter>;
  vehicle?: InputMaybe<VehicleWhereInput>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export type ActionWhereUniqueInput = {
  AND?: InputMaybe<Array<ActionWhereInput>>;
  Address?: InputMaybe<AddressWhereInput>;
  Ban?: InputMaybe<BanWhereInput>;
  Chat?: InputMaybe<ChatWhereInput>;
  Group?: InputMaybe<GroupWhereInput>;
  NOT?: InputMaybe<Array<ActionWhereInput>>;
  OR?: InputMaybe<Array<ActionWhereInput>>;
  addressId?: InputMaybe<StringNullableFilter>;
  article?: InputMaybe<ArticleWhereInput>;
  articleId?: InputMaybe<StringNullableFilter>;
  banId?: InputMaybe<StringNullableFilter>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringNullableFilter>;
  byUser?: InputMaybe<UserWhereInput>;
  byUserId?: InputMaybe<StringFilter>;
  chatId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroup?: InputMaybe<CrimeGroupWhereInput>;
  crimeGroupId?: InputMaybe<StringNullableFilter>;
  dataType?: InputMaybe<EnumModelFilter>;
  description?: InputMaybe<StringNullableFilter>;
  groupId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<StringNullableFilter>;
  images?: InputMaybe<ImageWhereInput>;
  inScheme?: InputMaybe<SchemeWhereInput>;
  inSchemeId?: InputMaybe<StringNullableFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  message?: InputMaybe<MessageWhereInput>;
  messageId?: InputMaybe<StringNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  reason?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringNullableFilter>;
  tag?: InputMaybe<TagWhereInput>;
  tagId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumActionTypeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringNullableFilter>;
  vehicle?: InputMaybe<VehicleWhereInput>;
  vehicleId?: InputMaybe<StringNullableFilter>;
};

export enum ActionableLevelEnum {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type ActiveChecklist = {
  __typename?: 'ActiveChecklist';
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']>;
  checklist: Checklist;
  checklistId: Scalars['String'];
  checklistSection: Array<ActiveChecklistSections>;
  comments?: Maybe<Scalars['String']>;
  completedAt?: Maybe<Scalars['Date']>;
  completedBy?: Maybe<User>;
  completedById?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  document?: Maybe<Document>;
  fields: Array<ActiveChecklistFields>;
  id: Scalars['ID'];
  maxWeight: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  percentComplete: Scalars['Int'];
  percentScore: Scalars['Int'];
  percentageScore: Scalars['String'];
  signature?: Maybe<Scalars['String']>;
  status: ChecklistStatus;
  totalWeight: Scalars['Int'];
  updatedAt: Scalars['Date'];
};


export type ActiveChecklistFieldsArgs = {
  cursor?: InputMaybe<ActiveChecklistFieldsWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActiveChecklistFieldsScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActiveChecklistFieldsOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActiveChecklistFieldsWhereInput>;
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
  activeChecklist: ActiveChecklist;
  activeChecklistId: Scalars['String'];
  answer?: Maybe<ChecklistAnswer>;
  answerTranslations: Array<Scalars['JSON']>;
  availableAnswers: Array<Scalars['JSON']>;
  brandIds: Array<Scalars['String']>;
  createdAt: Scalars['Date'];
  dependent?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  order: Scalars['Int'];
  question: Scalars['JSON'];
  section: Scalars['Int'];
  subsection: Scalars['Int'];
  type: ChecklistAnswerType;
  updatedAt: Scalars['Date'];
  weight: Scalars['Int'];
};

export type ActiveChecklistFieldsListRelationFilter = {
  every?: InputMaybe<ActiveChecklistFieldsWhereInput>;
  none?: InputMaybe<ActiveChecklistFieldsWhereInput>;
  some?: InputMaybe<ActiveChecklistFieldsWhereInput>;
};

export type ActiveChecklistFieldsOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ActiveChecklistFieldsOrderByWithRelationInput = {
  activeChecklist?: InputMaybe<ActiveChecklistOrderByWithRelationInput>;
  activeChecklistId?: InputMaybe<SortOrder>;
  answerTranslations?: InputMaybe<SortOrder>;
  availableAnswers?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  question?: InputMaybe<SortOrder>;
  section?: InputMaybe<SortOrder>;
  subsection?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  weight?: InputMaybe<SortOrder>;
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

export type ActiveChecklistFieldsScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<ActiveChecklistFieldsScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<ActiveChecklistFieldsScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<ActiveChecklistFieldsScalarWhereWithAggregatesInput>>;
  activeChecklistId?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  question?: InputMaybe<JsonWithAggregatesFilter>;
  section?: InputMaybe<IntWithAggregatesFilter>;
  subsection?: InputMaybe<IntWithAggregatesFilter>;
  type?: InputMaybe<EnumChecklistAnswerTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  weight?: InputMaybe<IntWithAggregatesFilter>;
};

export type ActiveChecklistFieldsWhereInput = {
  AND?: InputMaybe<Array<ActiveChecklistFieldsWhereInput>>;
  NOT?: InputMaybe<Array<ActiveChecklistFieldsWhereInput>>;
  OR?: InputMaybe<Array<ActiveChecklistFieldsWhereInput>>;
  activeChecklist?: InputMaybe<ActiveChecklistWhereInput>;
  activeChecklistId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  question?: InputMaybe<JsonFilter>;
  section?: InputMaybe<IntFilter>;
  subsection?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumChecklistAnswerTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  weight?: InputMaybe<IntFilter>;
};

export type ActiveChecklistFieldsWhereUniqueInput = {
  AND?: InputMaybe<Array<ActiveChecklistFieldsWhereInput>>;
  NOT?: InputMaybe<Array<ActiveChecklistFieldsWhereInput>>;
  OR?: InputMaybe<Array<ActiveChecklistFieldsWhereInput>>;
  activeChecklist?: InputMaybe<ActiveChecklistWhereInput>;
  activeChecklistId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  question?: InputMaybe<JsonFilter>;
  section?: InputMaybe<IntFilter>;
  subsection?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumChecklistAnswerTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  weight?: InputMaybe<IntFilter>;
};

export type ActiveChecklistListRelationFilter = {
  every?: InputMaybe<ActiveChecklistWhereInput>;
  none?: InputMaybe<ActiveChecklistWhereInput>;
  some?: InputMaybe<ActiveChecklistWhereInput>;
};

export type ActiveChecklistOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ActiveChecklistOrderByWithRelationInput = {
  business?: InputMaybe<BusinessOrderByWithRelationInput>;
  businessId?: InputMaybe<SortOrder>;
  checklist?: InputMaybe<ChecklistOrderByWithRelationInput>;
  checklistId?: InputMaybe<SortOrder>;
  comments?: InputMaybe<SortOrder>;
  completedAt?: InputMaybe<SortOrder>;
  completedBy?: InputMaybe<UserOrderByWithRelationInput>;
  completedById?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  document?: InputMaybe<DocumentOrderByWithRelationInput>;
  fields?: InputMaybe<ActiveChecklistFieldsOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  maxWeight?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  percentComplete?: InputMaybe<SortOrder>;
  percentScore?: InputMaybe<SortOrder>;
  signature?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  totalWeight?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
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
  activeChecklist: ActiveChecklist;
  activeChecklistId: Scalars['String'];
  dependsOnWeight?: Maybe<DependWeight>;
  id: Scalars['ID'];
  maxWeight: Scalars['Int'];
  section: Scalars['Int'];
  sub: Scalars['Boolean'];
  subsection?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  titleLocaled: Scalars['String'];
  titleTranslations: Array<Scalars['JSON']>;
};

export type ActiveChecklistWhereInput = {
  AND?: InputMaybe<Array<ActiveChecklistWhereInput>>;
  NOT?: InputMaybe<Array<ActiveChecklistWhereInput>>;
  OR?: InputMaybe<Array<ActiveChecklistWhereInput>>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringNullableFilter>;
  checklist?: InputMaybe<ChecklistWhereInput>;
  checklistId?: InputMaybe<StringFilter>;
  comments?: InputMaybe<StringNullableFilter>;
  completedAt?: InputMaybe<DateTimeNullableFilter>;
  completedBy?: InputMaybe<UserWhereInput>;
  completedById?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  document?: InputMaybe<DocumentWhereInput>;
  id?: InputMaybe<StringFilter>;
  maxWeight?: InputMaybe<IntFilter>;
  percentComplete?: InputMaybe<IntFilter>;
  percentScore?: InputMaybe<IntFilter>;
  signature?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumChecklistStatusFilter>;
  totalWeight?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ActiveChecklistWhereUniqueInput = {
  AND?: InputMaybe<Array<ActiveChecklistWhereInput>>;
  NOT?: InputMaybe<Array<ActiveChecklistWhereInput>>;
  OR?: InputMaybe<Array<ActiveChecklistWhereInput>>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringNullableFilter>;
  checklist?: InputMaybe<ChecklistWhereInput>;
  checklistId?: InputMaybe<StringFilter>;
  comments?: InputMaybe<StringNullableFilter>;
  completedAt?: InputMaybe<DateTimeNullableFilter>;
  completedBy?: InputMaybe<UserWhereInput>;
  completedById?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  document?: InputMaybe<DocumentWhereInput>;
  id?: InputMaybe<Scalars['String']>;
  maxWeight?: InputMaybe<IntFilter>;
  percentComplete?: InputMaybe<IntFilter>;
  percentScore?: InputMaybe<IntFilter>;
  signature?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumChecklistStatusFilter>;
  totalWeight?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
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
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  full: Scalars['String'];
  geoLat?: Maybe<Scalars['Float']>;
  geoLng?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  incident?: Maybe<Incident>;
  incidentId?: Maybe<Scalars['String']>;
  offender?: Maybe<Offender>;
  offenderId?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  premises?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  street?: Maybe<Scalars['String']>;
  townCity?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export type AddressListRelationFilter = {
  every?: InputMaybe<AddressWhereInput>;
  none?: InputMaybe<AddressWhereInput>;
  some?: InputMaybe<AddressWhereInput>;
};

export type AddressOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AddressOrderByWithRelationInput = {
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  alias?: InputMaybe<SortOrder>;
  building?: InputMaybe<SortOrder>;
  business?: InputMaybe<BusinessOrderByWithRelationInput>;
  businessId?: InputMaybe<SortOrder>;
  country?: InputMaybe<SortOrder>;
  county?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  geoLat?: InputMaybe<SortOrder>;
  geoLng?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  postcode?: InputMaybe<SortOrder>;
  premises?: InputMaybe<SortOrder>;
  primary?: InputMaybe<SortOrder>;
  street?: InputMaybe<SortOrder>;
  townCity?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
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
  AND?: InputMaybe<Array<AddressWhereInput>>;
  NOT?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  alias?: InputMaybe<StringNullableFilter>;
  building?: InputMaybe<StringNullableFilter>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringNullableFilter>;
  country?: InputMaybe<StringNullableFilter>;
  county?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  geoLat?: InputMaybe<FloatNullableFilter>;
  geoLng?: InputMaybe<FloatNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  postcode?: InputMaybe<StringNullableFilter>;
  premises?: InputMaybe<StringNullableFilter>;
  primary?: InputMaybe<BoolNullableFilter>;
  street?: InputMaybe<StringNullableFilter>;
  townCity?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type AddressWhereUniqueInput = {
  alias?: InputMaybe<StringNullableFilter>;
  building?: InputMaybe<StringNullableFilter>;
  business?: InputMaybe<BusinessWhereInput>;
  businessId?: InputMaybe<StringNullableFilter>;
  country?: InputMaybe<StringNullableFilter>;
  county?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  geoLat?: InputMaybe<FloatNullableFilter>;
  geoLng?: InputMaybe<FloatNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<Scalars['String']>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  postcode?: InputMaybe<StringNullableFilter>;
  premises?: InputMaybe<StringNullableFilter>;
  primary?: InputMaybe<BoolNullableFilter>;
  street?: InputMaybe<StringNullableFilter>;
  townCity?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringNullableFilter>;
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

export type AiInvestigationLeads = {
  __typename?: 'AiInvestigationLeads';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  incident: Incident;
  keyCCTVTimestamps: Array<Scalars['String']>;
  suggestedActions: Array<Scalars['String']>;
  updatedAt: Scalars['Date'];
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

export type Answer = {
  __typename?: 'Answer';
  answer: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  incident?: Maybe<Incident>;
  incidentId?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['String']>;
  tagQuestion?: Maybe<TagQuestion>;
  taskId?: Maybe<Scalars['String']>;
  taskQuestion?: Maybe<TaskQuestion>;
  todo?: Maybe<Todo>;
  todoId?: Maybe<Scalars['String']>;
  type: AnswerType;
  updatedAt: Scalars['Date'];
};

export type AnswerCount = {
  __typename?: 'AnswerCount';
  answer: Scalars['String'];
  count: Scalars['Int'];
};

export type AnswerListRelationFilter = {
  every?: InputMaybe<AnswerWhereInput>;
  none?: InputMaybe<AnswerWhereInput>;
  some?: InputMaybe<AnswerWhereInput>;
};

export type AnswerOption = {
  __typename?: 'AnswerOption';
  label: Scalars['String'];
  value: Scalars['String'];
};

export type AnswerOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AnswerOrderByWithRelationInput = {
  answer?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  tagId?: InputMaybe<SortOrder>;
  tagQuestion?: InputMaybe<TagQuestionOrderByWithRelationInput>;
  taskId?: InputMaybe<SortOrder>;
  taskQuestion?: InputMaybe<TaskQuestionOrderByWithRelationInput>;
  todo?: InputMaybe<TodoOrderByWithRelationInput>;
  todoId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
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
  AND?: InputMaybe<Array<AnswerScalarWhereInput>>;
  NOT?: InputMaybe<Array<AnswerScalarWhereInput>>;
  OR?: InputMaybe<Array<AnswerScalarWhereInput>>;
  answer?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  tagId?: InputMaybe<StringNullableFilter>;
  taskId?: InputMaybe<StringNullableFilter>;
  todoId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumAnswerTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AnswerScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AnswerScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<AnswerScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AnswerScalarWhereWithAggregatesInput>>;
  answer?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  incidentId?: InputMaybe<StringNullableWithAggregatesFilter>;
  tagId?: InputMaybe<StringNullableWithAggregatesFilter>;
  taskId?: InputMaybe<StringNullableWithAggregatesFilter>;
  todoId?: InputMaybe<StringNullableWithAggregatesFilter>;
  type?: InputMaybe<EnumAnswerTypeWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
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

export type AnswerUpdateManyWithoutTaskQuestionNestedInputFields = {
  create?: InputMaybe<Array<TaskQuestionCreateAnswer>>;
};

export type AnswerUpdateManyWithoutTodoNestedInput = {
  deleteMany?: InputMaybe<Array<AnswerScalarWhereInput>>;
};

export type AnswerWeight = {
  __typename?: 'AnswerWeight';
  answer: Scalars['String'];
  id: Scalars['ID'];
  question: ChecklistQuestion;
  questionId: Scalars['String'];
  weight: Scalars['Int'];
};

export type AnswerWeightInput = {
  answer: Scalars['String'];
  weight?: InputMaybe<Scalars['Int']>;
};

export type AnswerWeightListRelationFilter = {
  every?: InputMaybe<AnswerWeightWhereInput>;
  none?: InputMaybe<AnswerWeightWhereInput>;
  some?: InputMaybe<AnswerWeightWhereInput>;
};

export type AnswerWeightOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AnswerWeightOrderByWithRelationInput = {
  answer?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  questionId?: InputMaybe<SortOrder>;
  weight?: InputMaybe<SortOrder>;
};

export enum AnswerWeightScalarFieldEnum {
  Answer = 'answer',
  Id = 'id',
  QuestionId = 'questionId',
  Weight = 'weight'
}

export type AnswerWeightScalarWhereInput = {
  AND?: InputMaybe<Array<AnswerWeightScalarWhereInput>>;
  NOT?: InputMaybe<Array<AnswerWeightScalarWhereInput>>;
  OR?: InputMaybe<Array<AnswerWeightScalarWhereInput>>;
  answer?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  questionId?: InputMaybe<StringFilter>;
  weight?: InputMaybe<IntFilter>;
};

export type AnswerWeightScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<AnswerWeightScalarWhereWithAggregatesInput>>;
  NOT?: InputMaybe<Array<AnswerWeightScalarWhereWithAggregatesInput>>;
  OR?: InputMaybe<Array<AnswerWeightScalarWhereWithAggregatesInput>>;
  answer?: InputMaybe<StringWithAggregatesFilter>;
  id?: InputMaybe<StringWithAggregatesFilter>;
  questionId?: InputMaybe<StringWithAggregatesFilter>;
  weight?: InputMaybe<IntWithAggregatesFilter>;
};

export type AnswerWeightWhereInput = {
  AND?: InputMaybe<Array<AnswerWeightWhereInput>>;
  NOT?: InputMaybe<Array<AnswerWeightWhereInput>>;
  OR?: InputMaybe<Array<AnswerWeightWhereInput>>;
  answer?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  questionId?: InputMaybe<StringFilter>;
  weight?: InputMaybe<IntFilter>;
};

export type AnswerWeightWhereUniqueInput = {
  AND?: InputMaybe<Array<AnswerWeightWhereInput>>;
  NOT?: InputMaybe<Array<AnswerWeightWhereInput>>;
  OR?: InputMaybe<Array<AnswerWeightWhereInput>>;
  answer?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['String']>;
  questionId?: InputMaybe<StringFilter>;
  weight?: InputMaybe<IntFilter>;
};

export type AnswerWhereInput = {
  AND?: InputMaybe<Array<AnswerWhereInput>>;
  NOT?: InputMaybe<Array<AnswerWhereInput>>;
  OR?: InputMaybe<Array<AnswerWhereInput>>;
  answer?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  tagId?: InputMaybe<StringNullableFilter>;
  tagQuestion?: InputMaybe<TagQuestionWhereInput>;
  taskId?: InputMaybe<StringNullableFilter>;
  taskQuestion?: InputMaybe<TaskQuestionWhereInput>;
  todo?: InputMaybe<TodoWhereInput>;
  todoId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumAnswerTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AnswerWhereUniqueInput = {
  AND?: InputMaybe<Array<AnswerWhereInput>>;
  NOT?: InputMaybe<Array<AnswerWhereInput>>;
  OR?: InputMaybe<Array<AnswerWhereInput>>;
  answer?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  tagId?: InputMaybe<StringNullableFilter>;
  tagQuestion?: InputMaybe<TagQuestionWhereInput>;
  taskId?: InputMaybe<StringNullableFilter>;
  taskQuestion?: InputMaybe<TaskQuestionWhereInput>;
  todo?: InputMaybe<TodoWhereInput>;
  todoId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumAnswerTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
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

export enum AppType {
  Native = 'NATIVE',
  Web = 'WEB'
}

export type ApproveGroupsData = {
  connect?: InputMaybe<Array<UniqueId>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
};

export type ApproveIncidentData = {
  groups?: InputMaybe<ApproveGroupsData>;
};

export type Article = {
  __typename?: 'Article';
  actions: Array<Action>;
  completedAt?: Maybe<Scalars['Date']>;
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['String'];
  documents: Array<Document>;
  feedItems: Array<FeedItem>;
  frequency?: Maybe<Scalars['Int']>;
  groups: Array<Group>;
  hideWatermark: Scalars['Boolean'];
  id: Scalars['ID'];
  image?: Maybe<Image>;
  imageId?: Maybe<Scalars['String']>;
  images: Array<Image>;
  impressions: Array<Impression>;
  notifications: Array<Notification>;
  previewImage?: Maybe<Scalars['String']>;
  previewText?: Maybe<Scalars['String']>;
  priority: ArticlePriority;
  recurring: Scalars['Boolean'];
  recycleDate: Scalars['Date'];
  recycled: Scalars['Boolean'];
  rows: Array<ArticleRow>;
  schemes: Array<Scheme>;
  start?: Maybe<Scalars['Date']>;
  status: CompleteStatus;
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
  users: Array<User>;
  watermarkImage: Scalars['Boolean'];
  when?: Maybe<When>;
};


export type ArticleActionsArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type ArticleDocumentsArgs = {
  cursor?: InputMaybe<DocumentWhereUniqueInput>;
  distinct?: InputMaybe<Array<DocumentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DocumentWhereInput>;
};


export type ArticleFeedItemsArgs = {
  cursor?: InputMaybe<FeedItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeedItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeedItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
};


export type ArticleGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type ArticleImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


export type ArticleImpressionsArgs = {
  cursor?: InputMaybe<ImpressionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImpressionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImpressionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImpressionWhereInput>;
};


export type ArticleNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type ArticleRowsArgs = {
  cursor?: InputMaybe<ArticleRowWhereUniqueInput>;
  distinct?: InputMaybe<Array<ArticleRowScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ArticleRowOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleRowWhereInput>;
};


export type ArticleSchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};


export type ArticleTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};


export type ArticleUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type ArticleColumn = {
  __typename?: 'ArticleColumn';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  images: Array<Image>;
  incidents: Array<Incident>;
  offenders: Array<Offender>;
  position: Scalars['Int'];
  reportData?: Maybe<Scalars['JSON']>;
  row: ArticleRow;
  rowId: Scalars['String'];
  text?: Maybe<Scalars['String']>;
  type: ArticleSectionType;
  updatedAt: Scalars['Date'];
  width: Scalars['Int'];
};


export type ArticleColumnImagesArgs = {
  cursor?: InputMaybe<ImageWhereUniqueInput>;
  distinct?: InputMaybe<Array<ImageScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ImageWhereInput>;
};


export type ArticleColumnIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type ArticleColumnOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};

export type ArticleColumnListRelationFilter = {
  every?: InputMaybe<ArticleColumnWhereInput>;
  none?: InputMaybe<ArticleColumnWhereInput>;
  some?: InputMaybe<ArticleColumnWhereInput>;
};

export type ArticleColumnOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ArticleColumnOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  position?: InputMaybe<SortOrder>;
  reportData?: InputMaybe<SortOrder>;
  row?: InputMaybe<ArticleRowOrderByWithRelationInput>;
  rowId?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
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

export type ArticleColumnWhereInput = {
  AND?: InputMaybe<Array<ArticleColumnWhereInput>>;
  NOT?: InputMaybe<Array<ArticleColumnWhereInput>>;
  OR?: InputMaybe<Array<ArticleColumnWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  position?: InputMaybe<IntFilter>;
  reportData?: InputMaybe<JsonNullableFilter>;
  row?: InputMaybe<ArticleRowWhereInput>;
  rowId?: InputMaybe<StringFilter>;
  text?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumArticleSectionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  width?: InputMaybe<IntFilter>;
};

export type ArticleColumnWhereUniqueInput = {
  AND?: InputMaybe<Array<ArticleColumnWhereInput>>;
  NOT?: InputMaybe<Array<ArticleColumnWhereInput>>;
  OR?: InputMaybe<Array<ArticleColumnWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageListRelationFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  position?: InputMaybe<IntFilter>;
  reportData?: InputMaybe<JsonNullableFilter>;
  row?: InputMaybe<ArticleRowWhereInput>;
  rowId?: InputMaybe<StringFilter>;
  text?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumArticleSectionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  width?: InputMaybe<IntFilter>;
};

export type ArticleListRelationFilter = {
  every?: InputMaybe<ArticleWhereInput>;
  none?: InputMaybe<ArticleWhereInput>;
  some?: InputMaybe<ArticleWhereInput>;
};

export type ArticleOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ArticleOrderByWithRelationInput = {
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  completedAt?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  documents?: InputMaybe<DocumentOrderByRelationAggregateInput>;
  feedItems?: InputMaybe<FeedItemOrderByRelationAggregateInput>;
  frequency?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  hideWatermark?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageOrderByWithRelationInput>;
  imageId?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  impressions?: InputMaybe<ImpressionOrderByRelationAggregateInput>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  previewImage?: InputMaybe<SortOrder>;
  previewText?: InputMaybe<SortOrder>;
  priority?: InputMaybe<SortOrder>;
  recurring?: InputMaybe<SortOrder>;
  recycleDate?: InputMaybe<SortOrder>;
  recycled?: InputMaybe<SortOrder>;
  rows?: InputMaybe<ArticleRowOrderByRelationAggregateInput>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  start?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  tags?: InputMaybe<TagOrderByRelationAggregateInput>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
  watermarkImage?: InputMaybe<SortOrder>;
  when?: InputMaybe<SortOrder>;
};

export enum ArticlePriority {
  High = 'HIGH',
  Medium = 'MEDIUM',
  Normal = 'NORMAL'
}

export type ArticleRow = {
  __typename?: 'ArticleRow';
  article: Article;
  articleId: Scalars['String'];
  columns: Array<ArticleColumn>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  position: Scalars['Int'];
  updatedAt: Scalars['Date'];
};


export type ArticleRowColumnsArgs = {
  cursor?: InputMaybe<ArticleColumnWhereUniqueInput>;
  distinct?: InputMaybe<Array<ArticleColumnScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ArticleColumnOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleColumnWhereInput>;
};

export type ArticleRowListRelationFilter = {
  every?: InputMaybe<ArticleRowWhereInput>;
  none?: InputMaybe<ArticleRowWhereInput>;
  some?: InputMaybe<ArticleRowWhereInput>;
};

export type ArticleRowOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ArticleRowOrderByWithRelationInput = {
  article?: InputMaybe<ArticleOrderByWithRelationInput>;
  articleId?: InputMaybe<SortOrder>;
  columns?: InputMaybe<ArticleColumnOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum ArticleRowScalarFieldEnum {
  ArticleId = 'articleId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Position = 'position',
  UpdatedAt = 'updatedAt'
}

export type ArticleRowWhereInput = {
  AND?: InputMaybe<Array<ArticleRowWhereInput>>;
  NOT?: InputMaybe<Array<ArticleRowWhereInput>>;
  OR?: InputMaybe<Array<ArticleRowWhereInput>>;
  article?: InputMaybe<ArticleWhereInput>;
  articleId?: InputMaybe<StringFilter>;
  columns?: InputMaybe<ArticleColumnListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  position?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ArticleRowWhereUniqueInput = {
  AND?: InputMaybe<Array<ArticleRowWhereInput>>;
  NOT?: InputMaybe<Array<ArticleRowWhereInput>>;
  OR?: InputMaybe<Array<ArticleRowWhereInput>>;
  article?: InputMaybe<ArticleWhereInput>;
  articleId?: InputMaybe<StringFilter>;
  columns?: InputMaybe<ArticleColumnListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

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
  AND?: InputMaybe<Array<ArticleWhereInput>>;
  NOT?: InputMaybe<Array<ArticleWhereInput>>;
  OR?: InputMaybe<Array<ArticleWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  completedAt?: InputMaybe<DateTimeNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  documents?: InputMaybe<DocumentListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  frequency?: InputMaybe<IntNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  hideWatermark?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<ImageWhereInput>;
  imageId?: InputMaybe<StringNullableFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  impressions?: InputMaybe<ImpressionListRelationFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  previewImage?: InputMaybe<StringNullableFilter>;
  previewText?: InputMaybe<StringNullableFilter>;
  priority?: InputMaybe<EnumArticlePriorityFilter>;
  recurring?: InputMaybe<BoolFilter>;
  recycleDate?: InputMaybe<DateTimeFilter>;
  recycled?: InputMaybe<BoolFilter>;
  rows?: InputMaybe<ArticleRowListRelationFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  start?: InputMaybe<DateTimeNullableFilter>;
  status?: InputMaybe<EnumCompleteStatusFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserListRelationFilter>;
  watermarkImage?: InputMaybe<BoolFilter>;
  when?: InputMaybe<EnumWhenNullableFilter>;
};

export type ArticleWhereUniqueInput = {
  AND?: InputMaybe<Array<ArticleWhereInput>>;
  NOT?: InputMaybe<Array<ArticleWhereInput>>;
  OR?: InputMaybe<Array<ArticleWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  documents?: InputMaybe<DocumentListRelationFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  frequency?: InputMaybe<IntNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  hideWatermark?: InputMaybe<BoolFilter>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageWhereInput>;
  imageId?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageListRelationFilter>;
  impressions?: InputMaybe<ImpressionListRelationFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  previewImage?: InputMaybe<StringNullableFilter>;
  previewText?: InputMaybe<StringNullableFilter>;
  priority?: InputMaybe<EnumArticlePriorityFilter>;
  recurring?: InputMaybe<BoolFilter>;
  recycleDate?: InputMaybe<DateTimeFilter>;
  recycled?: InputMaybe<BoolFilter>;
  rows?: InputMaybe<ArticleRowListRelationFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  start?: InputMaybe<DateTimeNullableFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserListRelationFilter>;
  watermarkImage?: InputMaybe<BoolFilter>;
  when?: InputMaybe<EnumWhenNullableFilter>;
};

export type Auth0User = {
  __typename?: 'Auth0User';
  blocked: Scalars['String'];
  lastLogin: Scalars['String'];
  lastPasswordReset: Scalars['String'];
  loginCount: Scalars['String'];
};

export type Ban = {
  __typename?: 'Ban';
  actions: Array<Action>;
  active: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  createdBy: User;
  createdById: Scalars['String'];
  current: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  duration: Scalars['Int'];
  endDate: Scalars['Date'];
  expired: Scalars['Boolean'];
  feedImage?: Maybe<Image>;
  feedItems: Array<FeedItem>;
  fineValue: Scalars['Float'];
  groups: Array<Group>;
  id: Scalars['ID'];
  location: Scalars['String'];
  months: Scalars['Int'];
  notifications: Array<Notification>;
  offender: Offender;
  offenderId: Scalars['String'];
  reference?: Maybe<Scalars['Int']>;
  scheme: Scheme;
  schemeId: Scalars['String'];
  startDate: Scalars['Date'];
  title?: Maybe<Scalars['String']>;
  type?: Maybe<BanType>;
  updatedAt: Scalars['Date'];
};


export type BanActionsArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type BanFeedItemsArgs = {
  cursor?: InputMaybe<FeedItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeedItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeedItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
};


export type BanGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type BanNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};

export type BanCreateInput = {
  createdBy: ConnectHelper;
  description?: InputMaybe<Scalars['String']>;
  endDate: Scalars['Date'];
  fineValue?: InputMaybe<Scalars['Float']>;
  location: Scalars['String'];
  months?: InputMaybe<Scalars['Int']>;
  reference?: InputMaybe<Scalars['Int']>;
  scheme: ConnectHelper;
  startDate: Scalars['Date'];
  type?: InputMaybe<BanType>;
};

export type BanListRelationFilter = {
  every?: InputMaybe<BanWhereInput>;
  none?: InputMaybe<BanWhereInput>;
  some?: InputMaybe<BanWhereInput>;
};

export type BanNestedUpdate = {
  data: BanUpdateInput;
  where?: InputMaybe<BanWhereUniqueInput>;
};

export type BanOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type BanOrderByWithRelationInput = {
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  active?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  feedItems?: InputMaybe<FeedItemOrderByRelationAggregateInput>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  location?: InputMaybe<SortOrder>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  reference?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
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
  CommunityBan = 'COMMUNITY_BAN',
  CourtData = 'COURT_DATA',
  Cpn = 'CPN',
  Cpw = 'CPW',
  Fine = 'FINE',
  Other = 'OTHER',
  PrisonSentence = 'PRISON_SENTENCE',
  Pspo = 'PSPO',
  RehabilitationOrder = 'REHABILITATION_ORDER',
  SuspendedSentence = 'SUSPENDED_SENTENCE',
  Wip = 'WIP'
}

export type BanUpdateInput = {
  description?: InputMaybe<NullableSetStringHelper>;
  endDate?: InputMaybe<NullableSetDateHelper>;
  fineValue?: InputMaybe<SetFloatHelper>;
  location?: InputMaybe<NullableSetStringHelper>;
  months?: InputMaybe<SetIntHelper>;
  startDate?: InputMaybe<NullableSetDateHelper>;
  type?: InputMaybe<NullableEnumBanTypeFieldUpdateOperationsInput>;
};

export type BanWhereInput = {
  AND?: InputMaybe<Array<BanWhereInput>>;
  NOT?: InputMaybe<Array<BanWhereInput>>;
  OR?: InputMaybe<Array<BanWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  active?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringNullableFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  location?: InputMaybe<StringFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumBanTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BanWhereUniqueInput = {
  AND?: InputMaybe<Array<BanWhereInput>>;
  NOT?: InputMaybe<Array<BanWhereInput>>;
  OR?: InputMaybe<Array<BanWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  active?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringNullableFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  feedItems?: InputMaybe<FeedItemListRelationFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<StringFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumBanTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BansOnOffenderUpdate = {
  create?: InputMaybe<Array<BanCreateInput>>;
  delete?: InputMaybe<Array<UniqueId>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
  update?: InputMaybe<Array<BanNestedUpdate>>;
};

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
  businesses: Array<Business>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  industry: Industry;
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
  businesses?: InputMaybe<BusinessOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BrandWhereInput = {
  AND?: InputMaybe<Array<BrandWhereInput>>;
  NOT?: InputMaybe<Array<BrandWhereInput>>;
  OR?: InputMaybe<Array<BrandWhereInput>>;
  businesses?: InputMaybe<BusinessListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  industry?: InputMaybe<IndustryWhereInput>;
  name?: InputMaybe<StringFilter>;
  recycled?: InputMaybe<BoolFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
};

export type BrandWhereUniqueInput = {
  AND?: InputMaybe<Array<BrandWhereInput>>;
  NOT?: InputMaybe<Array<BrandWhereInput>>;
  OR?: InputMaybe<Array<BrandWhereInput>>;
  businesses?: InputMaybe<BusinessListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<StringFilter>;
  recycled?: InputMaybe<BoolFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
};

export enum Build {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL',
  Unknown = 'UNKNOWN'
}

export type Business = {
  __typename?: 'Business';
  actions: Array<Action>;
  adminName: Scalars['String'];
  brands: Array<Scalars['String']>;
  brandsList: Array<Brand>;
  checklists: Array<Checklist>;
  children: Array<Business>;
  createdAt: Scalars['Date'];
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


export type BusinessActionsArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type BusinessChecklistsArgs = {
  cursor?: InputMaybe<ActiveChecklistWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActiveChecklistScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActiveChecklistOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActiveChecklistWhereInput>;
};


export type BusinessChildrenArgs = {
  cursor?: InputMaybe<BusinessWhereUniqueInput>;
  distinct?: InputMaybe<Array<BusinessScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BusinessOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BusinessWhereInput>;
};


export type BusinessDemDevicesArgs = {
  cursor?: InputMaybe<DemDeviceWhereUniqueInput>;
  distinct?: InputMaybe<Array<DemDeviceScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DemDeviceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DemDeviceWhereInput>;
};


export type BusinessGoodsTypesTotalsArgs = {
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};


export type BusinessGroupsArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};


export type BusinessIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type BusinessLocationsArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressWhereInput>;
};


export type BusinessSchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};


export type BusinessTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};


export type BusinessTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<Array<TodoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TodoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};


export type BusinessUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type BusinessValueStatsArgs = {
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};

export type BusinessBrandsInput = {
  set?: InputMaybe<Array<UniqueId>>;
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

export type BusinessCreateNestedManyRelationInput = {
  connect?: InputMaybe<Array<BusinessWhereUniqueInput>>;
  create?: InputMaybe<Array<CreateBusinessRelationDataInput>>;
  disconnect?: InputMaybe<Array<BusinessWhereUniqueInput>>;
  update?: InputMaybe<Array<UpdateBusinessRelationEnvelope>>;
};

export type BusinessCreateNestedManyWithoutUsersInput = {
  connect?: InputMaybe<Array<BusinessWhereUniqueInput>>;
  create?: InputMaybe<Array<CreateBusinessOnUserDataInput>>;
  disconnect?: InputMaybe<Array<BusinessWhereUniqueInput>>;
  update?: InputMaybe<Array<UpdateBusinessOnUserEnvelope>>;
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

export type BusinessListRelationFilter = {
  every?: InputMaybe<BusinessWhereInput>;
  none?: InputMaybe<BusinessWhereInput>;
  some?: InputMaybe<BusinessWhereInput>;
};

export type BusinessOrderBy = {
  name?: InputMaybe<SortOrder>;
};

export type BusinessOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type BusinessOrderByWithRelationInput = {
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  checklists?: InputMaybe<ActiveChecklistOrderByRelationAggregateInput>;
  children?: InputMaybe<BusinessOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  demId?: InputMaybe<SortOrder>;
  division?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  locations?: InputMaybe<AddressOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  parent?: InputMaybe<BusinessOrderByWithRelationInput>;
  parentId?: InputMaybe<SortOrder>;
  publicName?: InputMaybe<SortOrder>;
  recycled?: InputMaybe<SortOrder>;
  reference?: InputMaybe<SortOrder>;
  schemes?: InputMaybe<SchemeOrderByRelationAggregateInput>;
  tags?: InputMaybe<TagOrderByRelationAggregateInput>;
  todos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
};

export type BusinessParentInput = {
  connect?: InputMaybe<UniqueId>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
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

export type BusinessUpdateInput = {
  brands?: InputMaybe<BusinessBrandsInput>;
  groups?: InputMaybe<GroupsSet>;
  locations?: InputMaybe<LocationUpdateInputField>;
  name?: InputMaybe<SetStringHelper>;
  parent?: InputMaybe<BusinessParentInput>;
  publicName?: InputMaybe<Scalars['Boolean']>;
  schemes?: InputMaybe<NullableConnectArrayHelper>;
  siteNumber?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<TagsOnBusiness>;
};

export type BusinessWhereInput = {
  AND?: InputMaybe<Array<BusinessWhereInput>>;
  NOT?: InputMaybe<Array<BusinessWhereInput>>;
  OR?: InputMaybe<Array<BusinessWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  brands?: InputMaybe<BrandListRelationFilter>;
  children?: InputMaybe<BusinessListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  demId?: InputMaybe<StringNullableFilter>;
  division?: InputMaybe<StringNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  locations?: InputMaybe<AddressListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  parent?: InputMaybe<BusinessWhereInput>;
  parentId?: InputMaybe<StringNullableFilter>;
  publicName?: InputMaybe<BoolFilter>;
  recycled?: InputMaybe<BoolFilter>;
  reference?: InputMaybe<IntNullableFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  siteNumber?: InputMaybe<StringFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  todos?: InputMaybe<TodoListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type BusinessWhereUniqueInput = {
  AND?: InputMaybe<Array<BusinessWhereInput>>;
  NOT?: InputMaybe<Array<BusinessWhereInput>>;
  OR?: InputMaybe<Array<BusinessWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
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

export type CctvRecord = {
  __typename?: 'CctvRecord';
  cameraNumber: Scalars['String'];
  createdAt: Scalars['Date'];
  endTime: Scalars['Date'];
  id: Scalars['String'];
  incident: Incident;
  showFace: Scalars['Boolean'];
  showIncident: Scalars['Boolean'];
  startTime: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type ChangePositionAndReqInput = {
  tags: Array<UpdateTagQuestionInput>;
};

export type Chat = {
  __typename?: 'Chat';
  actions: Array<Action>;
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  firstLetter: Scalars['String'];
  id: Scalars['ID'];
  members: Array<UserChat>;
  messageCount: Scalars['Int'];
  messages: Array<Message>;
  name: Scalars['String'];
  notifications: Array<Notification>;
  scheme: Scheme;
  schemeId: Scalars['String'];
  todos: Array<Todo>;
  totalMembers: Scalars['Int'];
  totalMessages: Scalars['Int'];
  updatedAt: Scalars['Date'];
  uploaded: Scalars['Boolean'];
};


export type ChatActionsArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
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


export type ChatNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type ChatTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<Array<TodoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TodoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
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
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
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

export enum ChatScalarFieldEnum {
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  Name = 'name',
  SchemeId = 'schemeId',
  UpdatedAt = 'updatedAt',
  Uploaded = 'uploaded'
}

export type ChatUpdateInput = {
  description?: InputMaybe<SetStringHelper>;
  members?: InputMaybe<ChatMembersUpdate>;
  name?: InputMaybe<SetStringHelper>;
};

export type ChatWhereInput = {
  AND?: InputMaybe<Array<ChatWhereInput>>;
  NOT?: InputMaybe<Array<ChatWhereInput>>;
  OR?: InputMaybe<Array<ChatWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
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
  id: Scalars['ID'];
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
  PassFail = 'PASS_FAIL',
  PassFailNa = 'PASS_FAIL_NA',
  Text = 'TEXT',
  YesNo = 'YES_NO',
  YesNoNa = 'YES_NO_NA'
}

export type ChecklistCreateUpdateInput = {
  businessIds?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  sections: Array<SectionInput>;
  title: Scalars['String'];
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type ChecklistOrderByWithRelationInput = {
  activeChecklists?: InputMaybe<ActiveChecklistOrderByRelationAggregateInput>;
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
  cursor?: InputMaybe<AnswerWeightWhereUniqueInput>;
  distinct?: InputMaybe<Array<AnswerWeightScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AnswerWeightOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AnswerWeightWhereInput>;
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
  sections?: InputMaybe<Array<SectionInput>>;
  title?: InputMaybe<Scalars['String']>;
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type ChecklistWhereInput = {
  AND?: InputMaybe<Array<ChecklistWhereInput>>;
  NOT?: InputMaybe<Array<ChecklistWhereInput>>;
  OR?: InputMaybe<Array<ChecklistWhereInput>>;
  activeChecklists?: InputMaybe<ActiveChecklistListRelationFilter>;
  business?: InputMaybe<BusinessListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deleted?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type ChecklistWhereUniqueInput = {
  AND?: InputMaybe<Array<ChecklistWhereInput>>;
  NOT?: InputMaybe<Array<ChecklistWhereInput>>;
  OR?: InputMaybe<Array<ChecklistWhereInput>>;
  activeChecklists?: InputMaybe<ActiveChecklistListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['String']>;
  schemes?: InputMaybe<SchemeListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CompleteActiveChecklistInput = {
  additionalInfo?: InputMaybe<Scalars['String']>;
  answers: Array<ActiveChecklistAnswerInput>;
  draft: Scalars['Boolean'];
  max?: InputMaybe<Scalars['Int']>;
  signature?: InputMaybe<Scalars['String']>;
  total?: InputMaybe<Scalars['Int']>;
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

export type ConnectOnlyArrayHelper = {
  connect: Array<UniqueId>;
};

export type ConnectSetHelper = {
  connect?: InputMaybe<Array<UniqueId>>;
  disconnect?: InputMaybe<Array<UniqueId>>;
  set?: InputMaybe<Array<UniqueId>>;
};

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
  categories?: InputMaybe<Array<Scalars['String']>>;
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

export type CreateBusinessRelationDataInput = {
  groups?: InputMaybe<ConnectArrayHelper>;
  locations?: InputMaybe<CreateSimpleLocationEnvelope>;
  name: Scalars['String'];
  parent?: InputMaybe<BusinessParentInput>;
  publicName: Scalars['Boolean'];
  schemes: ConnectArrayHelper;
  tags?: InputMaybe<NullableConnectArrayHelper>;
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
  incidentId?: InputMaybe<Scalars['String']>;
  investigationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
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
  incidentId?: InputMaybe<Scalars['String']>;
  investigationId?: InputMaybe<Scalars['String']>;
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
  answers?: InputMaybe<Array<AnswersInput>>;
  business?: InputMaybe<UniqueId>;
  cctvRecords?: InputMaybe<CreateIncidentCctvRecords>;
  crimeGroups: CreateIncidentCrimeGroups;
  crimeTypes?: InputMaybe<Array<UniqueId>>;
  date: Scalars['Date'];
  dayOrNight?: InputMaybe<Scalars['Boolean']>;
  description: Scalars['String'];
  documents?: InputMaybe<Array<CreateDocument>>;
  groups: Array<UniqueId>;
  images: CreateIncidentImages;
  investigationId?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<CreateIncidentItemInput>>;
  location?: InputMaybe<CreateIncidentLocation>;
  offenders: CreateIncidentOffenders;
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
  schemeId: Scalars['String'];
  status?: InputMaybe<InvestigationStatus>;
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
  dependentOnQId?: InputMaybe<Scalars['String']>;
  dependentOnTagQId?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<QuestionModel>;
  options?: InputMaybe<Array<Scalars['String']>>;
  question: Scalars['String'];
  required?: Scalars['Boolean'];
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

export type CreateTermsInput = {
  content: Scalars['String'];
  schemeId: Scalars['String'];
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
  actionableScore: Scalars['Int'];
  actions: Array<Action>;
  alias?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']>;
  evidence: Array<Document>;
  feedItems: Array<FeedItem>;
  groups: Array<Group>;
  id: Scalars['ID'];
  impactScore: Scalars['Int'];
  incidents: Array<Incident>;
  intel: Array<Intel>;
  investigations: Array<Investigation>;
  latestUpdate?: Maybe<Update>;
  linkedUpdates: Array<Update>;
  messages: Array<Message>;
  notifications: Array<Notification>;
  offenders: Array<Offender>;
  opalScore: Scalars['Int'];
  ref: Scalars['String'];
  reference?: Maybe<Scalars['Int']>;
  referenceStr?: Maybe<Scalars['String']>;
  schemes: Array<Scheme>;
  subscribed: Scalars['Boolean'];
  subscribedUsers: Array<User>;
  suggestedMembers: Array<Offender>;
  todos: Array<Todo>;
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


export type CrimeGroupActionsArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type CrimeGroupEvidenceArgs = {
  cursor?: InputMaybe<DocumentWhereUniqueInput>;
  distinct?: InputMaybe<Array<DocumentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DocumentWhereInput>;
};


export type CrimeGroupFeedItemsArgs = {
  cursor?: InputMaybe<FeedItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeedItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeedItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
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


export type CrimeGroupIntelArgs = {
  cursor?: InputMaybe<IntelWhereUniqueInput>;
  distinct?: InputMaybe<Array<IntelScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<IntelOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IntelWhereInput>;
};


export type CrimeGroupInvestigationsArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<Array<InvestigationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InvestigationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
};


export type CrimeGroupLinkedUpdatesArgs = {
  cursor?: InputMaybe<UpdateWhereUniqueInput>;
  distinct?: InputMaybe<Array<UpdateScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type CrimeGroupMessagesArgs = {
  cursor?: InputMaybe<MessageWhereUniqueInput>;
  distinct?: InputMaybe<Array<MessageScalarFieldEnum>>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessageWhereInput>;
};


export type CrimeGroupNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type CrimeGroupOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<Array<OffenderScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type CrimeGroupSchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};


export type CrimeGroupSubscribedUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type CrimeGroupTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<Array<TodoScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TodoOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
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

export type CrimeGroupOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CrimeGroupOrderByWithRelationInput = {
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
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
  createdAt: Scalars['DateTime'];
  dashboard: Dashboard;
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions: Array<Permission>;
  scheme: Scheme;
  type: Role;
  updatedAt: Scalars['DateTime'];
  users: Array<UserScheme>;
  usersCount: Scalars['Int'];
};

export type CustomRoleWhereInput = {
  AND?: InputMaybe<Array<CustomRoleWhereInput>>;
  NOT?: InputMaybe<Array<CustomRoleWhereInput>>;
  OR?: InputMaybe<Array<CustomRoleWhereInput>>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
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
  name: Scalars['String'];
  roles?: ConnectOnlyArrayHelper;
  runningBanner: Scalars['String'];
  scheme: ConnectHelper;
};

export type DashboardInput = {
  approvedOnly?: InputMaybe<Scalars['Boolean']>;
  dateRange: DateRangeInput;
  following?: InputMaybe<Scalars['Boolean']>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  myData?: InputMaybe<Scalars['Boolean']>;
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

export type DateRangeInput = {
  endDate: Scalars['Date'];
  startDate: Scalars['Date'];
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
  business: Business;
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
  business?: InputMaybe<BusinessOrderByWithRelationInput>;
  createdAt?: InputMaybe<SortOrder>;
  evidence?: InputMaybe<DocumentOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum DemDeviceScalarFieldEnum {
  CreatedAt = 'createdAt',
  DemId = 'demId',
  Id = 'id',
  Name = 'name',
  SchemeId = 'schemeId',
  SerialNumber = 'serialNumber',
  UpdatedAt = 'updatedAt'
}

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
  actions?: InputMaybe<ActionListRelationFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
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
  checklist?: Maybe<ActiveChecklist>;
  checklistId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  crimeGroups: Array<CrimeGroup>;
  description?: Maybe<Scalars['String']>;
  fileType?: Maybe<FileType>;
  fileTypeLit?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  incidents: Array<Incident>;
  investigation: Array<Investigation>;
  mg11?: Maybe<Mg11>;
  mg11Id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  offenders: Array<Offender>;
  scheme?: Maybe<Scheme>;
  schemeId?: Maybe<Scalars['String']>;
  tags: Array<Tag>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  todos: Array<Todo>;
  type: DocumentType;
  updatedAt: Scalars['Date'];
  url: Scalars['String'];
  vehicles: Array<Vehicle>;
};


export type DocumentArticlesArgs = {
  cursor?: InputMaybe<ArticleWhereUniqueInput>;
  distinct?: InputMaybe<ArticleScalarFieldEnum>;
  orderBy?: InputMaybe<ArticleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type DocumentCrimeGroupsArgs = {
  cursor?: InputMaybe<CrimeGroupWhereUniqueInput>;
  distinct?: InputMaybe<CrimeGroupScalarFieldEnum>;
  orderBy?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CrimeGroupWhereInput>;
};


export type DocumentIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<IncidentScalarFieldEnum>;
  orderBy?: InputMaybe<IncidentOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
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


export type DocumentTodosArgs = {
  cursor?: InputMaybe<TodoWhereUniqueInput>;
  distinct?: InputMaybe<TodoScalarFieldEnum>;
  orderBy?: InputMaybe<TodoOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TodoWhereInput>;
};


export type DocumentVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<VehicleScalarFieldEnum>;
  orderBy?: InputMaybe<VehicleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
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
  articles?: InputMaybe<ArticleOrderByRelationAggregateInput>;
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

export type DocumentWhereInput = {
  AND?: InputMaybe<Array<DocumentWhereInput>>;
  NOT?: InputMaybe<Array<DocumentWhereInput>>;
  OR?: InputMaybe<Array<DocumentWhereInput>>;
  articles?: InputMaybe<ArticleListRelationFilter>;
  checklist?: InputMaybe<ActiveChecklistWhereInput>;
  checklistId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  crimeGroups?: InputMaybe<CrimeGroupListRelationFilter>;
  description?: InputMaybe<StringNullableFilter>;
  fileType?: InputMaybe<EnumFileTypeNullableFilter>;
  fileTypeLit?: InputMaybe<StringNullableFilter>;
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
  articles?: InputMaybe<ArticleListRelationFilter>;
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

export type EnableSchemeRekognotionInput = {
  collection?: InputMaybe<SchemeRekognotionCollectionsInput>;
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

export type EnumDocumentTypeFilter = {
  equals?: InputMaybe<DocumentType>;
  in?: InputMaybe<Array<DocumentType>>;
  not?: InputMaybe<DocumentType>;
  notIn?: InputMaybe<Array<DocumentType>>;
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

export enum FaceSource {
  Aws = 'AWS',
  Custom = 'CUSTOM'
}

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

export type FormField = {
  __typename?: 'FormField';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  incidentForm: IncidentForm;
  position: Scalars['Int'];
  tooltip?: Maybe<Scalars['String']>;
  type: IncidentFormField;
  updatedAt: Scalars['Date'];
};

export type FormFieldListRelationFilter = {
  every?: InputMaybe<FormFieldWhereInput>;
  none?: InputMaybe<FormFieldWhereInput>;
  some?: InputMaybe<FormFieldWhereInput>;
};

export type FormFieldOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
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
  knownSubjects?: InputMaybe<Scalars['Boolean']>;
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

export enum GoodsTypeScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

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

export type Group = {
  __typename?: 'Group';
  actions: Array<Action>;
  approver: Array<User>;
  articles: Array<Article>;
  bans: Array<Ban>;
  businesses: Array<Business>;
  createdAt: Scalars['Date'];
  crimeGroups: Array<CrimeGroup>;
  customGalleries: Array<CustomGallery>;
  defaultGroupScheme: Array<Scheme>;
  defaultGroupUser: Array<User>;
  description?: Maybe<Scalars['String']>;
  feedItems: Array<FeedItem>;
  id: Scalars['ID'];
  incidents: Array<Incident>;
  name: Scalars['String'];
  offenderSettings?: Maybe<OffenderSettings>;
  offenderSettingsId?: Maybe<Scalars['String']>;
  offenders: Array<Offender>;
  scheme: Scheme;
  schemeId: Scalars['String'];
  updatedAt: Scalars['Date'];
  uploaded: Scalars['Boolean'];
  users: Array<User>;
  vehicles: Array<Vehicle>;
};


export type GroupActionsArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type GroupApproverArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<UserScalarFieldEnum>;
  orderBy?: InputMaybe<UserOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type GroupArticlesArgs = {
  cursor?: InputMaybe<ArticleWhereUniqueInput>;
  distinct?: InputMaybe<ArticleScalarFieldEnum>;
  orderBy?: InputMaybe<ArticleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type GroupBansArgs = {
  cursor?: InputMaybe<BanWhereUniqueInput>;
  distinct?: InputMaybe<BanScalarFieldEnum>;
  orderBy?: InputMaybe<BanOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BanWhereInput>;
};


export type GroupBusinessesArgs = {
  cursor?: InputMaybe<BusinessWhereUniqueInput>;
  distinct?: InputMaybe<BusinessScalarFieldEnum>;
  orderBy?: InputMaybe<BusinessOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BusinessWhereInput>;
};


export type GroupCrimeGroupsArgs = {
  cursor?: InputMaybe<CrimeGroupWhereUniqueInput>;
  distinct?: InputMaybe<CrimeGroupScalarFieldEnum>;
  orderBy?: InputMaybe<CrimeGroupOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CrimeGroupWhereInput>;
};


export type GroupCustomGalleriesArgs = {
  cursor?: InputMaybe<CustomGalleryWhereUniqueInput>;
  distinct?: InputMaybe<CustomGalleryScalarFieldEnum>;
  orderBy?: InputMaybe<CustomGalleryOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CustomGalleryWhereInput>;
};


export type GroupDefaultGroupSchemeArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};


export type GroupDefaultGroupUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<UserScalarFieldEnum>;
  orderBy?: InputMaybe<UserOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type GroupFeedItemsArgs = {
  cursor?: InputMaybe<FeedItemWhereUniqueInput>;
  distinct?: InputMaybe<FeedItemScalarFieldEnum>;
  orderBy?: InputMaybe<FeedItemOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
};


export type GroupIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<IncidentScalarFieldEnum>;
  orderBy?: InputMaybe<IncidentOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type GroupOffendersArgs = {
  cursor?: InputMaybe<OffenderWhereUniqueInput>;
  distinct?: InputMaybe<OffenderScalarFieldEnum>;
  orderBy?: InputMaybe<OffenderOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type GroupUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<UserScalarFieldEnum>;
  orderBy?: InputMaybe<UserOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type GroupVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<VehicleScalarFieldEnum>;
  orderBy?: InputMaybe<VehicleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
};

export type GroupCreateInput = {
  approver?: InputMaybe<ConnectOnlyArrayHelper>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  offenderSettings?: InputMaybe<OffenderSettingsCreateInput>;
  scheme: ConnectHelper;
  users?: InputMaybe<ConnectOnlyArrayHelper>;
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
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  approver?: InputMaybe<UserOrderByRelationAggregateInput>;
  articles?: InputMaybe<ArticleOrderByRelationAggregateInput>;
  bans?: InputMaybe<BanOrderByRelationAggregateInput>;
  businesses?: InputMaybe<BusinessOrderByRelationAggregateInput>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
  approver?: InputMaybe<UserListRelationFilter>;
  articles?: InputMaybe<ArticleListRelationFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
  approver?: InputMaybe<UserListRelationFilter>;
  articles?: InputMaybe<ArticleListRelationFilter>;
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

export type Image = {
  __typename?: 'Image';
  Scheme: Array<Scheme>;
  actions: Array<Action>;
  artcleColumnId?: Maybe<Scalars['String']>;
  article?: Maybe<Article>;
  articleColumn?: Maybe<ArticleColumn>;
  articles: Array<Article>;
  card?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  faces: Array<RekFace>;
  feedItems: Array<FeedItem>;
  fileNames: Array<Scalars['String']>;
  id: Scalars['ID'];
  incident?: Maybe<Incident>;
  incidentId?: Maybe<Scalars['String']>;
  indexFaces: Scalars['Boolean'];
  intel?: Maybe<Intel>;
  intelId?: Maybe<Scalars['String']>;
  isFace?: Maybe<Scalars['Boolean']>;
  low?: Maybe<Scalars['String']>;
  lowPersisted?: Maybe<Scalars['String']>;
  message?: Maybe<Message>;
  messageId?: Maybe<Scalars['String']>;
  offenders: Array<Offender>;
  optimised?: Maybe<Scalars['String']>;
  optimisedPersisted?: Maybe<Scalars['String']>;
  optimisticUri?: Maybe<Scalars['String']>;
  origImageUrl?: Maybe<Scalars['String']>;
  policeImage?: Maybe<Scalars['Boolean']>;
  position: ImagePosition;
  primary?: Maybe<Scalars['Boolean']>;
  recycled: Scalars['Boolean'];
  rekImage?: Maybe<Scalars['String']>;
  reportIcons: Array<Scheme>;
  rotation: Scalars['Int'];
  scheme: Scheme;
  schemeDark: Array<Scheme>;
  schemeId: Scalars['String'];
  totalFaces: Scalars['Int'];
  update?: Maybe<Update>;
  updateId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  uploaded: Scalars['Boolean'];
  uploadedBy: User;
  uploadedById: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  urlPersisted?: Maybe<Scalars['String']>;
  vehicles: Array<Vehicle>;
};


export type ImageSchemeArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};


export type ImageActionsArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type ImageArticlesArgs = {
  cursor?: InputMaybe<ArticleWhereUniqueInput>;
  distinct?: InputMaybe<ArticleScalarFieldEnum>;
  orderBy?: InputMaybe<ArticleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type ImageFacesArgs = {
  cursor?: InputMaybe<RekFaceWhereUniqueInput>;
  distinct?: InputMaybe<Array<RekFaceScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<RekFaceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RekFaceWhereInput>;
};


export type ImageFeedItemsArgs = {
  cursor?: InputMaybe<FeedItemWhereUniqueInput>;
  distinct?: InputMaybe<FeedItemScalarFieldEnum>;
  orderBy?: InputMaybe<FeedItemOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
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


export type ImageSchemeDarkArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};


export type ImageVehiclesArgs = {
  cursor?: InputMaybe<VehicleWhereUniqueInput>;
  distinct?: InputMaybe<VehicleScalarFieldEnum>;
  orderBy?: InputMaybe<VehicleOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereInput>;
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
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  artcleColumnId?: InputMaybe<SortOrder>;
  article?: InputMaybe<ArticleOrderByWithRelationInput>;
  articleColumn?: InputMaybe<ArticleColumnOrderByWithRelationInput>;
  articles?: InputMaybe<ArticleOrderByRelationAggregateInput>;
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
  primary?: InputMaybe<NullableSetBooleanHelper>;
  rotation?: InputMaybe<SetIntHelper>;
  totalFaces?: InputMaybe<SetIntHelper>;
};

export type ImageUpdateDataWithoutOffenderInput = {
  incidents?: InputMaybe<NullableConnectArrayHelper>;
  isFace?: InputMaybe<NullableSetBooleanHelper>;
  policeImage?: InputMaybe<NullableSetBooleanHelper>;
  position?: InputMaybe<EnumImagePositionFieldUpdateOperationsInput>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
  artcleColumnId?: InputMaybe<StringNullableFilter>;
  article?: InputMaybe<ArticleWhereInput>;
  articleColumn?: InputMaybe<ArticleColumnWhereInput>;
  articles?: InputMaybe<ArticleListRelationFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
  artcleColumnId?: InputMaybe<StringNullableFilter>;
  article?: InputMaybe<ArticleWhereInput>;
  articleColumn?: InputMaybe<ArticleColumnWhereInput>;
  articles?: InputMaybe<ArticleListRelationFilter>;
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
  article: Article;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  incident: Incident;
  offender: Offender;
  updatedAt: Scalars['Date'];
  user: User;
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
  articleColumns: Array<ArticleColumn>;
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
  evidence: Array<Document>;
  feedImage?: Maybe<Image>;
  feedItems: Array<FeedItem>;
  geoLat?: Maybe<Scalars['String']>;
  geoLng?: Maybe<Scalars['String']>;
  groups: Array<Group>;
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
  notifications: Array<Notification>;
  offenders: Array<Offender>;
  originalDescription: Scalars['String'];
  policeDay?: Maybe<Scalars['Boolean']>;
  policeDistanceFromIncident?: Maybe<Scalars['String']>;
  policeIncidentDuration?: Maybe<Scalars['String']>;
  policeInside?: Maybe<Scalars['Boolean']>;
  policeInvolved: Scalars['Boolean'];
  policeItemsMO?: Maybe<Scalars['String']>;
  policeKnownBefore?: Maybe<Scalars['Boolean']>;
  policeMG11?: Maybe<Scalars['Boolean']>;
  policeNo?: Maybe<Scalars['String']>;
  policeObstructions?: Maybe<Scalars['String']>;
  policeReasonRemember?: Maybe<Scalars['String']>;
  policeRef?: Maybe<Scalars['String']>;
  policeReported: Scalars['Boolean'];
  policeResponse?: Maybe<PoliceResponseTime>;
  policeStatement?: Maybe<Scalars['String']>;
  policeTimePassed?: Maybe<Scalars['String']>;
  priority: IncidentPriority;
  recoveredValue?: Maybe<Scalars['Float']>;
  recycleBin?: Maybe<RecycledItem>;
  recycleDate: Scalars['Date'];
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


export type IncidentActionsArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type IncidentAnswersArgs = {
  cursor?: InputMaybe<AnswerWhereUniqueInput>;
  distinct?: InputMaybe<Array<AnswerScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AnswerOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AnswerWhereInput>;
};


export type IncidentArticleColumnsArgs = {
  cursor?: InputMaybe<ArticleColumnWhereUniqueInput>;
  distinct?: InputMaybe<Array<ArticleColumnScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ArticleColumnOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleColumnWhereInput>;
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


export type IncidentFeedItemsArgs = {
  cursor?: InputMaybe<FeedItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<FeedItemScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<FeedItemOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeedItemWhereInput>;
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

export type IncidentConnectOne = {
  connect: IncidentWhereUniqueInput;
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

export type IncidentFormFieldsInput = {
  position: Scalars['Int'];
  tooltip?: InputMaybe<Scalars['String']>;
  type: IncidentFormField;
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

export type IncidentItem = {
  __typename?: 'IncidentItem';
  createdAt: Scalars['Date'];
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

export type IncidentItemsWhereInput = {
  createdAtRange?: InputMaybe<DateRangeInput>;
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  incidentDateRange?: InputMaybe<DateRangeInput>;
  schemeId: Scalars['String'];
};

export type IncidentListRelationFilter = {
  every?: InputMaybe<IncidentWhereInput>;
  none?: InputMaybe<IncidentWhereInput>;
  some?: InputMaybe<IncidentWhereInput>;
};

export type IncidentOffenderImages = {
  create?: InputMaybe<Array<UploadIncidentOffenderImage>>;
};

export type IncidentOffenderWhereInput = {
  id?: InputMaybe<Scalars['String']>;
  localId?: InputMaybe<Scalars['String']>;
};

export type IncidentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type IncidentOrderByWithRelationInput = {
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  answers?: InputMaybe<AnswerOrderByRelationAggregateInput>;
  approved?: InputMaybe<SortOrder>;
  articleColumns?: InputMaybe<ArticleColumnOrderByRelationAggregateInput>;
  business?: InputMaybe<BusinessOrderByWithRelationInput>;
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
  hourOfDay?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  impressions?: InputMaybe<ImpressionOrderByRelationAggregateInput>;
  incidentItems?: InputMaybe<IncidentItemOrderByRelationAggregateInput>;
  intel?: InputMaybe<IntelOrderByRelationAggregateInput>;
  investigations?: InputMaybe<InvestigationOrderByRelationAggregateInput>;
  linkedUpdates?: InputMaybe<UpdateOrderByRelationAggregateInput>;
  location?: InputMaybe<AddressOrderByWithRelationInput>;
  matches?: InputMaybe<RekMatchOrderByRelationAggregateInput>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  mg11?: InputMaybe<Mg11OrderByRelationAggregateInput>;
  monthOfYear?: InputMaybe<SortOrder>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  policeInvolved?: InputMaybe<SortOrder>;
  policeNo?: InputMaybe<SortOrder>;
  policeRef?: InputMaybe<SortOrder>;
  policeReported?: InputMaybe<SortOrder>;
  policeResponse?: InputMaybe<SortOrder>;
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
  answerType: AnswerType;
  dependentOnAnswerValue?: Maybe<Scalars['String']>;
  dependentOnBrandIds?: Maybe<Array<Scalars['String']>>;
  dependentOnQuestionId?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  options: Array<AnswerOption>;
  priority: Scalars['Int'];
  questionId: Scalars['String'];
  required: Scalars['Boolean'];
  tagQuestionId: Scalars['String'];
  tooltip?: Maybe<Scalars['String']>;
};

export enum IncidentScalarFieldEnum {
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
  approved?: InputMaybe<SetBooleanHelper>;
  business?: InputMaybe<NullableConnectDisconnectHelper>;
  crimeGroups?: InputMaybe<CrimeGroupUpdateManyWithoutIncidents>;
  crimeTypes?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  customerRef?: InputMaybe<SetStringHelper>;
  date?: InputMaybe<SetDateHelper>;
  description?: InputMaybe<SetStringHelper>;
  groups?: InputMaybe<GroupsNestedSetConnectDisconnect>;
  images?: InputMaybe<ImageUpdateManyWithoutIncidentNestedInput>;
  incidentItems?: InputMaybe<IncidentItemUpdateManyWithoutIncidentInput>;
  location?: InputMaybe<UpdateSimpleLocation>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutIncidentsNested>;
  policeInvolved?: InputMaybe<NullableSetBooleanHelper>;
  policeNo?: InputMaybe<NullableSetStringHelper>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
  answers?: InputMaybe<AnswerListRelationFilter>;
  approved?: InputMaybe<BoolNullableFilter>;
  articleColumns?: InputMaybe<ArticleColumnListRelationFilter>;
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
  offenders?: InputMaybe<OffenderListRelationFilter>;
  policeInvolved?: InputMaybe<BoolFilter>;
  policeNo?: InputMaybe<StringNullableFilter>;
  policeRef?: InputMaybe<StringNullableFilter>;
  policeReported?: InputMaybe<BoolFilter>;
  policeResponse?: InputMaybe<EnumPoliceResponseTimeNullableFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
  answers?: InputMaybe<AnswerListRelationFilter>;
  approved?: InputMaybe<BoolNullableFilter>;
  articleColumns?: InputMaybe<ArticleColumnListRelationFilter>;
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

export type Intel = {
  __typename?: 'Intel';
  createdAt: Scalars['Date'];
  createdBy: User;
  crimeGroup: CrimeGroup;
  id: Scalars['ID'];
  image: Image;
  incident: Incident;
  offender: Offender;
  replies: Array<Intel>;
  replyTo: Intel;
  replyToString?: Maybe<Scalars['String']>;
  suggestedOffender: Offender;
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
  groups: Array<UniqueId>;
  incidents: Array<IntelOneImportIncidents>;
  scheme: UniqueId;
};

export type IntelOneImportIncidents = {
  colour?: InputMaybe<Scalars['String']>;
  crimeRef?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  group?: InputMaybe<Scalars['String']>;
  lat?: InputMaybe<Scalars['String']>;
  lng?: InputMaybe<Scalars['String']>;
  make?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  offenderName: Array<Scalars['String']>;
  postcode?: InputMaybe<Scalars['String']>;
  reference: Scalars['String'];
  registration?: InputMaybe<Scalars['String']>;
  reportDate: Scalars['Date'];
  siteName: Scalars['String'];
  type: Scalars['String'];
  value?: InputMaybe<Scalars['Float']>;
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
  ref: Scalars['String'];
  reference?: Maybe<Scalars['Int']>;
  referenceStr?: Maybe<Scalars['String']>;
  scheme: Scheme;
  schemeId: Scalars['String'];
  schemes: Array<Scheme>;
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


export type InvestigationSchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
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

export enum LanguageCode {
  Da = 'da',
  De = 'de',
  En = 'en',
  Es = 'es',
  Fi = 'fi',
  Fr = 'fr',
  It = 'it',
  Nl = 'nl',
  Pl = 'pl',
  Pt = 'pt',
  Rbe = 'rbe',
  Sv = 'sv'
}

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
  geoIp: GeoIp;
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
  incident: Incident;
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
  pdf: Document;
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
  witness: Contact;
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

export type MentionableUser = {
  __typename?: 'MentionableUser';
  businessesName: Scalars['String'];
  firstLetter: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['ID'];
  oldFullName: Scalars['String'];
};

export type MergeOffendersInput = {
  age?: InputMaybe<Age>;
  build?: InputMaybe<Build>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  gender?: InputMaybe<Gender>;
  hair?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<Scalars['String']>>;
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
  cursor?: InputMaybe<ActionWhereUniqueInput>;
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
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  articles?: InputMaybe<ArticleOrderByRelationAggregateInput>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
  articles?: InputMaybe<ArticleListRelationFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
  articles?: InputMaybe<ArticleListRelationFilter>;
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

export enum Model {
  Add = 'ADD',
  Address = 'ADDRESS',
  Article = 'ARTICLE',
  Ban = 'BAN',
  Business = 'BUSINESS',
  Chat = 'CHAT',
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
  Tag = 'TAG',
  Todo = 'TODO',
  Update = 'UPDATE',
  User = 'USER',
  Vehicle = 'VEHICLE'
}

export type Mutation = {
  __typename?: 'Mutation';
  addImageIntel: Intel;
  addImagesToIncident: Incident;
  addImagesToOffender: Offender;
  addImagesToUpdate: Update;
  addQuestion: Question;
  addUploadedImageToIncident: Incident;
  addUsersToBusiness: Business;
  approveAiSuggestion: AiSuggestion;
  approveIncident: Incident;
  approveOffender: Offender;
  closeInvestigation: Investigation;
  completeChecklist: ActiveChecklist;
  copyEvidenceOnInvestigation: Document;
  copyEvidenceToAlert: Document;
  copyOffender: Offender;
  createActionEvidence?: Maybe<Scalars['String']>;
  createActiveChecklist: ActiveChecklist;
  createArticle: Article;
  createBlankImage: Image;
  createBlurFaces: Image;
  createBusiness: Business;
  createChat: Chat;
  createCollection: RekCollection;
  createComment: Intel;
  createCrimeGroup: CrimeGroup;
  createCsvZip: Scalars['String'];
  createCustomGallery: CustomGallery;
  createDashboard: Dashboard;
  createDocument: Document;
  createDocuments: Array<Document>;
  createFlow: Flow;
  createGoodsType: GoodsType;
  createGroup: Group;
  createIncident: Incident;
  createIncidentForm: IncidentForm;
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
  createOneWorkflow: Workflow;
  createReportGroup: ReportGroup;
  createReportTemplate: ReportTemplate;
  createScheme: Scheme;
  createSession: Session;
  createSharingConfig: SharingConfig;
  createTag: Tag;
  createTermsAndConditions: TermsAndCondition;
  createTimes: Array<Incident>;
  createTodo: Todo;
  createUnlinkedImage: UnlinkedImage;
  createUpdateChecklist: Checklist;
  createUpdateOnCrimeGroup: Update;
  createUpdateOnIncident: Update;
  createUpdateOnInvestigation: Update;
  createUpdateOnOffender: Update;
  createUpdateOnVehicle: Update;
  /** @deprecated Auth0 no longer used */
  createUserInAuth0?: Maybe<UserNewAuth0>;
  createUserInDatabase: User;
  createVehicle: Vehicle;
  deleteArticle: Article;
  deleteBan: Ban;
  deleteBrand: Brand;
  deleteBusiness: Business;
  deleteChat: Chat;
  deleteCrimeGroup: CrimeGroup;
  deleteCustomGallery: CustomGallery;
  deleteDashboardTemplate?: Maybe<Dashboard>;
  deleteDemDevice: DemDevice;
  deleteDemGroup: DemGroup;
  deleteDocument: Document;
  deleteEvidence: Document;
  deleteExpired: SystemTask;
  deleteFace: RekFace;
  deleteFeedItem: FeedItem;
  deleteGroup: Group;
  deleteIncident: Incident;
  deleteInvestigation: Investigation;
  deleteMessage?: Maybe<Message>;
  deleteOffender: Offender;
  deleteOneQuestionGroup?: Maybe<QuestionGroup>;
  deleteOneStatementTemplate?: Maybe<StatementTemplate>;
  deleteOneWorkflow?: Maybe<Workflow>;
  deleteRecycleTag: Tag;
  deleteReportGroup: ReportGroup;
  deleteReportTemplate?: Maybe<ReportTemplate>;
  deleteRole: CustomRole;
  deleteSharingConfig: SharingConfig;
  deleteShoe: Shoe;
  deleteTag: Tag;
  deleteTodo: Todo;
  deleteUpdate: Update;
  deleteUser: User;
  deleteUserFromScheme?: Maybe<User>;
  deleteVehicle: Vehicle;
  discImportData: SystemTask;
  dismissAiSuggestion: AiSuggestion;
  dismissMatch: RekMatch;
  editArticle: Article;
  enableSchemeRekognition: RekCollection;
  exportInvestigationZip: Scalars['String'];
  forcedPasswordSet?: Maybe<Scalars['String']>;
  generateFeedItems: SystemTask;
  generateStatementBody: GeneratedStatementBody;
  importStockItemCsv: Scalars['Boolean'];
  indexExistingImages: SystemTask;
  indexFaces: SystemTask;
  indexImage: Image;
  intelOneImportData: SystemTask;
  inviteExistingUser: User;
  linkBusinessToScheme: Business;
  linkOrgToDem: Business;
  linkUserToDem: User;
  markAsReadMessages: UserChat;
  mergeBusinessesWithSameName: Business;
  mergeOffender: Offender;
  mySafetyImportData: SystemTask;
  recycleChecklist: Checklist;
  recycleDemEvidence?: Maybe<Scalars['String']>;
  recycleExpiredData: SystemTask;
  recycleIncident: Incident;
  recycleOffender: Offender;
  recycleTag: Tag;
  recycleUnusedImages: SystemTask;
  refreshAuth: RefreshAuth;
  registerPushToken: ExpoPushToken;
  removeQuestionFromTag: TagQuestion;
  removeUserFromBusiness: Business;
  reopenInvestigation: Investigation;
  resetPassword: ResetPassword;
  restoreAllRecycledItems: SystemTask;
  restoreDemEvidence?: Maybe<Scalars['String']>;
  restoreIncident: Incident;
  restoreItem?: Maybe<RecycledItem>;
  restoreOffender: Offender;
  scanIncident: Incident;
  searchExistingImages: Array<RekMatch>;
  searchFaces: SystemTask;
  sendInvite: User;
  sentrysysImportData: SystemTask;
  setDefaultTemplate?: Maybe<ReportTemplate>;
  setPassword: User;
  setSchemeSharing: Scheme;
  shareData: SystemTask;
  shareIncident: Incident;
  signIn: SignIn;
  signTerms: UserTerm;
  stockItemImport: SystemTask;
  subscribeToCrimeGroup: CrimeGroup;
  subscribeToIncident: Incident;
  subscribeToInvestigation: Investigation;
  subscribeToOffender: Offender;
  subscribeToVehicle: Vehicle;
  syncFeedItems: SystemTask;
  syncGeoCodes: Array<Address>;
  syncIncidentLocations: SystemTask;
  syncIncidentSchemes: SystemTask;
  syncNewSchemeTags: SystemTask;
  syncRekImages: SystemTask;
  toggleUser: User;
  unsubscribeFromIncident: Incident;
  unsubscribeFromOffender: Offender;
  unsubscribeToCrimeGroup: CrimeGroup;
  unsubscribeToInvestigation: Investigation;
  unsubscribeToVehicle: Vehicle;
  updateBusiness: Business;
  updateChat: Chat;
  updateChecklist: Checklist;
  updateCrimeGroup: CrimeGroup;
  updateCrimeGroupOffender: CrimeGroup;
  updateCustomGallery: CustomGallery;
  updateDashboardTemplate: Dashboard;
  updateDemDevice: DemDevice;
  updateDemGroup: DemGroup;
  updateFlow: Flow;
  updateGroup: Group;
  updateIncident: Incident;
  updateIncidentBusiness: Incident;
  updateIncidentBusinesses: SystemTask;
  updateInvestigation: Investigation;
  updateMessage: Message;
  updateOffender: Offender;
  updateOffenderDetails: Offender;
  updateOneMG11: Mg11;
  updateOneQuestionGroup: QuestionGroup;
  updateOneStatementTemplate: StatementTemplate;
  updateOneWorkflow: Workflow;
  updatePassword: User;
  updateQuestionOnTag: TagQuestion;
  updateReportGroup: ReportGroup;
  /** Only use this to update the layout of template, provide all the layout data as it will delete all old data and recreate */
  updateReportTemplate: ReportTemplate;
  updateScheme: Scheme;
  updateSharingConfig: SharingConfig;
  updateShoe: Shoe;
  updateTag: Tag;
  updateTagQs: Array<TagQuestion>;
  updateTodo: Todo;
  updateTodoMention: Array<Todo>;
  updateUpdate: Update;
  updateUser: User;
  updateUserNotifications: Array<UserNotification>;
  updateVehicle: Vehicle;
  uploadImage: Image;
  uploadToImage: Image;
  upsertBrand: Brand;
  upsertContact: Contact;
  upsertDemDevice: DemDevice;
  upsertDemGroup: DemGroup;
  upsertIncidentForm: IncidentForm;
  upsertPermission: CustomRole;
  upsertShoe: Shoe;
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


export type MutationApproveAiSuggestionArgs = {
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


export type MutationCloseInvestigationArgs = {
  where: UniqueId;
};


export type MutationCompleteChecklistArgs = {
  data: CompleteActiveChecklistInput;
  where: Scalars['String'];
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


export type MutationCreateArticleArgs = {
  data: CreateArticleInput;
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


export type MutationCreateChatArgs = {
  data: ChatCreateInput;
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


export type MutationCreateOneWorkflowArgs = {
  data: WorkflowCreateInput;
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


export type MutationDeleteBrandArgs = {
  where: BrandWhereUniqueInput;
};


export type MutationDeleteBusinessArgs = {
  where: BusinessWhereUniqueInput;
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


export type MutationDeleteGroupArgs = {
  where: UniqueId;
};


export type MutationDeleteIncidentArgs = {
  where: UniqueId;
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


export type MutationDeleteOneWorkflowArgs = {
  where: WorkflowWhereUniqueInput;
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


export type MutationDeleteTagArgs = {
  where: UniqueId;
};


export type MutationDeleteTodoArgs = {
  where: TodoWhereUniqueInput;
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


export type MutationDismissAiSuggestionArgs = {
  where: UniqueId;
};


export type MutationDismissMatchArgs = {
  where: RekMatchWhereUniqueInput;
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


export type MutationGenerateFeedItemsArgs = {
  where: UniqueId;
};


export type MutationGenerateStatementBodyArgs = {
  data: GenerateStatementData;
};


export type MutationImportStockItemCsvArgs = {
  where: Scalars['String'];
};


export type MutationIndexFacesArgs = {
  data: CreateArticleInput;
};


export type MutationIndexImageArgs = {
  where: ImageWhereUniqueInput;
};


export type MutationIntelOneImportDataArgs = {
  data: IntelOneImportDataInput;
};


export type MutationInviteExistingUserArgs = {
  data: UserUpdateInput;
  where: UniqueId;
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


export type MutationMarkAsReadMessagesArgs = {
  userChatId: Scalars['String'];
};


export type MutationMergeBusinessesWithSameNameArgs = {
  data: BusinessWhereUniqueInput;
};


export type MutationMergeOffenderArgs = {
  data: MergeOffendersInput;
};


export type MutationMySafetyImportDataArgs = {
  data: MySafetyImportDataInput;
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


export type MutationRefreshAuthArgs = {
  data: RefreshAuthData;
};


export type MutationRegisterPushTokenArgs = {
  data: RegisterPushTokenData;
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


export type MutationResetPasswordArgs = {
  data: ResetPasswordData;
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


export type MutationShareDataArgs = {
  data: ShareDataInput;
};


export type MutationShareIncidentArgs = {
  where: UniqueId;
};


export type MutationSignInArgs = {
  data: SignInData;
};


export type MutationSignTermsArgs = {
  data: SignTermsInput;
};


export type MutationStockItemImportArgs = {
  data: Array<StockItemsCreateInput>;
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


export type MutationToggleUserArgs = {
  id: Scalars['ID'];
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


export type MutationUpdateBusinessArgs = {
  data: BusinessUpdateInput;
  where: BusinessWhereUniqueInput;
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


export type MutationUpdateFlowArgs = {
  data: UpdateFlowData;
  where: UniqueId;
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


export type MutationUpdateOneWorkflowArgs = {
  data: WorkflowUpdateInput;
  where: WorkflowWhereUniqueInput;
};


export type MutationUpdatePasswordArgs = {
  data: UpdatePasswordData;
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


export type MutationUpdateTagArgs = {
  data: TagUpdateInput;
  where: UniqueId;
};


export type MutationUpdateTagQsArgs = {
  data: ChangePositionAndReqInput;
};


export type MutationUpdateTodoArgs = {
  data: TodoUpdateInput;
  where: UniqueId;
};


export type MutationUpdateTodoMentionArgs = {
  where: UpdateTodoMention;
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


export type MutationUpsertContactArgs = {
  data: UpsertContactInput;
};


export type MutationUpsertDemDeviceArgs = {
  data: UpsertDemDevice;
};


export type MutationUpsertDemGroupArgs = {
  data: UpsertDemGroup;
};


export type MutationUpsertIncidentFormArgs = {
  data: UpsertIncidentFormInput;
};


export type MutationUpsertPermissionArgs = {
  data: UpsertRole;
};


export type MutationUpsertShoeArgs = {
  data: UpsertShoe;
};

export type MySafetyImportDataInput = {
  groups: Array<UniqueId>;
  incidents: Array<MySafetyImportIncidents>;
  scheme: UniqueId;
};

export type MySafetyImportIncidents = {
  actualValue?: InputMaybe<Scalars['Float']>;
  createdByName: Scalars['String'];
  crimeReferenceNumber?: InputMaybe<Scalars['String']>;
  crimeType: Array<Scalars['String']>;
  dateOccurred: Scalars['Date'];
  description: Scalars['String'];
  emergencyServicesAttend?: InputMaybe<Scalars['Boolean']>;
  estimatedValue: Scalars['Float'];
  incidentID: Scalars['String'];
  site: Scalars['String'];
  specificArea: Scalars['String'];
  wereWeaponsUsed?: InputMaybe<Scalars['Boolean']>;
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
  alias: Array<Scalars['String']>;
  approved?: Maybe<Scalars['Boolean']>;
  articleColumns: Array<ArticleColumn>;
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
};


export type OffenderActionsArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type OffenderAddressesArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressWhereInput>;
};


export type OffenderArticleColumnsArgs = {
  cursor?: InputMaybe<ArticleColumnWhereUniqueInput>;
  distinct?: InputMaybe<Array<ArticleColumnScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ArticleColumnOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleColumnWhereInput>;
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
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  active?: InputMaybe<SortOrder>;
  addresses?: InputMaybe<AddressOrderByRelationAggregateInput>;
  age?: InputMaybe<SortOrder>;
  aiImpactScore?: InputMaybe<SortOrder>;
  alias?: InputMaybe<SortOrder>;
  approved?: InputMaybe<SortOrder>;
  articleColumns?: InputMaybe<ArticleColumnOrderByRelationAggregateInput>;
  bans?: InputMaybe<BanOrderByRelationAggregateInput>;
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
  Uploaded = 'uploaded'
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
};

export type OffenderUpdatealiasInput = {
  push?: InputMaybe<Scalars['String']>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type OffenderWhereInput = {
  AND?: InputMaybe<Array<OffenderWhereInput>>;
  NOT?: InputMaybe<Array<OffenderWhereInput>>;
  OR?: InputMaybe<Array<OffenderWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  active?: InputMaybe<BoolNullableFilter>;
  addresses?: InputMaybe<AddressListRelationFilter>;
  age?: InputMaybe<EnumAgeNullableFilter>;
  aiImpactScore?: InputMaybe<IntNullableFilter>;
  alias?: InputMaybe<StringNullableListFilter>;
  approved?: InputMaybe<BoolNullableFilter>;
  articleColumns?: InputMaybe<ArticleColumnListRelationFilter>;
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
};

export type OffenderWhereUniqueInput = {
  AND?: InputMaybe<Array<OffenderWhereInput>>;
  NOT?: InputMaybe<Array<OffenderWhereInput>>;
  OR?: InputMaybe<Array<OffenderWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  active?: InputMaybe<BoolNullableFilter>;
  addresses?: InputMaybe<AddressListRelationFilter>;
  age?: InputMaybe<EnumAgeNullableFilter>;
  alias?: InputMaybe<StringNullableListFilter>;
  approved?: InputMaybe<BoolNullableFilter>;
  articleColumns?: InputMaybe<ArticleColumnListRelationFilter>;
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

export enum PermissionMethod {
  Approve = 'APPROVE',
  Delete = 'DELETE',
  Edit = 'EDIT',
  Read = 'READ',
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
  GeneralSettings = 'GENERAL_SETTINGS',
  Groups = 'GROUPS',
  Incidents = 'INCIDENTS',
  IncidentOptions = 'INCIDENT_OPTIONS',
  Investigations = 'INVESTIGATIONS',
  Offenders = 'OFFENDERS',
  OffenderGalleries = 'OFFENDER_GALLERIES',
  OffenderWarnings = 'OFFENDER_WARNINGS',
  RecycleBin = 'RECYCLE_BIN',
  Reports = 'REPORTS',
  Roles = 'ROLES',
  Settings = 'SETTINGS',
  SharingSettings = 'SHARING_SETTINGS',
  SingleShoe = 'SINGLE_SHOE',
  StatementTemplates = 'STATEMENT_TEMPLATES',
  Tasks = 'TASKS',
  Terms = 'TERMS',
  Users = 'USERS',
  UserSettings = 'USER_SETTINGS',
  Vehicles = 'VEHICLES',
  Workflows = 'WORKFLOWS'
}

export type Permissions = {
  __typename?: 'Permissions';
  allowedMethods: Array<PermissionMethod>;
  model: PermissionModel;
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

export enum PoliceResponseTime {
  NoResponse = 'NO_RESPONSE',
  Over_24Hours = 'OVER_24_HOURS',
  Within_1Hour = 'WITHIN_1_HOUR',
  Within_3Hours = 'WITHIN_3_HOURS',
  Within_12Hours = 'WITHIN_12_HOURS',
  Within_24Hours = 'WITHIN_24_HOURS'
}

export type PoliceSummary = {
  __typename?: 'PoliceSummary';
  totalAttendedIncidents: Scalars['Int'];
  totalPoliceImages: Scalars['Int'];
  totalReportedIncidents: Scalars['Int'];
  totalVerifiedOffenders: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  action: Action;
  actions: Array<Action>;
  activeChecklist: ActiveChecklist;
  activeChecklists: QueryActiveChecklistsConnection;
  activityGraph: Array<Graph>;
  activitySummary: ActivitySummary;
  activityTableReport: ListActivityPerformance;
  address: Address;
  addresses: Array<Address>;
  adminDashboard: AdminDashboardData;
  aiSuggestion: AiSuggestion;
  aiSuggestions: QueryAiSuggestionsConnection;
  article: Article;
  articles: Array<Article>;
  auth0User: Auth0User;
  availableQuestions: Array<Question>;
  availableTaskQuestions: Array<Question>;
  ban: Ban;
  bans: Array<Ban>;
  brand: Brand;
  brands: QueryBrandsConnection;
  business: Business;
  businessContribution: ListBusinessContribution;
  businessCrimeTypeGraph: Array<RadialValueGraph>;
  businessImpact: BusinessImpact;
  businessIncidentCountGraph: Array<Graph>;
  businessLossRecoveredGraph: Array<RadialGraph>;
  businessRelay: QueryBusinessRelayConnection;
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
  crimeGroup: CrimeGroup;
  crimeGroupPerformance: ListCrimeGroupPerformance;
  crimeGroupReport: CrimeGroupReport;
  crimeGroups: QueryCrimeGroupsConnection;
  currentUser?: Maybe<User>;
  customGalleriesRelay: QueryCustomGalleriesRelayConnection;
  customGallery: CustomGallery;
  customQuestionsCountGraph: CustomQuestionsGraph;
  dashboard: Dashboard;
  dashboards: QueryDashboardsConnection;
  demDevice: DemDevice;
  demDeviceModel: Array<DemDeviceModel>;
  demDevices: QueryDemDevicesConnection;
  demGroup: DemGroup;
  demGroups: QueryDemGroupsConnection;
  documents: QueryDocumentsConnection;
  feedItem: FeedItem;
  feedItems: Array<FeedItem>;
  goodsTypes: Array<GoodsType>;
  group: Group;
  groups: Array<Group>;
  health: Scalars['Boolean'];
  image: Image;
  images: Array<Image>;
  incident: Incident;
  incidentCount: Scalars['Int'];
  incidentFeed: Array<Incident>;
  incidentHeatPerformance: ListIncidentsHeatPerformance;
  incidentItems: QueryIncidentItemsConnection;
  incidentMonthGraph: Array<Graph>;
  incidentTableReport: ListIncidentPerformance;
  incidents: Array<Incident>;
  incidentsDayOfWeek: Array<Graph>;
  incidentsRelay: QueryIncidentsRelayConnection;
  incidentsTimeOfDay: Array<Graph>;
  industries: Array<Industry>;
  investigation: Investigation;
  investigationPerformance: ListInvestigationPerformance;
  investigationRelay: QueryInvestigationRelayConnection;
  investigationTableReport: ListInvestigationPerformance;
  investigations: Array<Investigation>;
  latestIncident?: Maybe<LatestIncident>;
  latestIncidents: QueryLatestIncidentsConnection;
  latestVehicles: QueryLatestVehiclesConnection;
  listActions: ListActions;
  listArticles: ListArticles;
  listArticlesRelay: QueryListArticlesRelayConnection;
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
  listUsers: ListUsers;
  listVehicles: ListVehicles;
  loginEvent: LoginEvent;
  loginEvents: Array<LoginEvent>;
  mentionableUsers: Array<MentionableUser>;
  message: Message;
  messages: Array<Message>;
  mg11: Mg11;
  notificationRelay: QueryNotificationRelayConnection;
  offender: Offender;
  offenderByName: ListOffenders;
  offenderFeed: Array<Offender>;
  offenderLinkMap: OffenderLinkMap;
  offenderReport: OffenderReport;
  offenderTableReport: ListOffenderPerformance;
  offenders: Array<Offender>;
  offendersPerformance: ListOffenderPerformance;
  performanceReport: PerformanceReport;
  previewIncidentExport: IncidentExport;
  question: Question;
  recycledItem?: Maybe<RecycledItem>;
  recycledItems: Array<RecycledItem>;
  reportGroup: ReportGroup;
  reportGroups: QueryReportGroupsConnection;
  reportTemplate: ReportTemplate;
  reportTemplates: Array<ReportTemplate>;
  reportUserLogin: User;
  reportsCentre: Array<ReportGroup>;
  role: CustomRole;
  roles: QueryRolesConnection;
  scheme: Scheme;
  schemes: Array<Scheme>;
  searchOffenders: QuerySearchOffendersConnection;
  sharingBusinesses: Array<SharingBusiness>;
  sharingConfig: SharingConfig;
  sharingConfigs: Array<SharingConfig>;
  shoe: Shoe;
  shoes: QueryShoesConnection;
  statementTemplate: StatementTemplate;
  statementTemplates: Array<StatementTemplate>;
  stockItemsRelay: QueryStockItemsRelayConnection;
  tableReport: ReportTemplate;
  tag: Tag;
  tags: Array<Tag>;
  targetedGoods: ListTargetedGoods;
  targetedGoodsDashboard: Array<Graph>;
  term: TermsAndCondition;
  todo: Todo;
  todoRelay: QueryTodoRelayConnection;
  todos: Array<Todo>;
  totalLoss: Scalars['Float'];
  totalUserSessionsGraph: Array<Graph>;
  translateText: Array<TranslatedText>;
  updates: Array<Update>;
  user: User;
  userByEmail?: Maybe<User>;
  userChat: UserChat;
  userChats: Array<UserChat>;
  userContact?: Maybe<Contact>;
  userContributions: ListUserContribution;
  userGroupRelay: QueryUserGroupRelayConnection;
  userIncidentCountGraph: Array<Graph>;
  userNew: UserNew;
  userNotification: UserNotification;
  userNotifications: Array<UserNotification>;
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
  where: ActionWhereUniqueInput;
};


export type QueryActionsArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type QueryActiveChecklistArgs = {
  where: ActiveChecklistWhereUniqueInput;
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
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AddressWhereInput>;
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


export type QueryArticleArgs = {
  where: ArticleWhereUniqueInput;
};


export type QueryArticlesArgs = {
  orderBy?: InputMaybe<Array<ArticleOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ArticleWhereInput>;
};


export type QueryAuth0UserArgs = {
  id: Scalars['String'];
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


export type QueryBusinessArgs = {
  where: BusinessWhereUniqueInput;
};


export type QueryBusinessContributionArgs = {
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


export type QueryBusinessLossRecoveredGraphArgs = {
  take?: InputMaybe<Scalars['Int']>;
  where: BusinessIncidentsCountGraphInput;
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
  cursor?: InputMaybe<ChatWhereUniqueInput>;
  distinct?: InputMaybe<Array<ChatScalarFieldEnum>>;
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


export type QueryCrimeGroupArgs = {
  where: CrimeGroupWhereUniqueInput;
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


export type QueryDocumentsArgs = {
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


export type QueryGoodsTypesArgs = {
  cursor?: InputMaybe<GoodsTypeWhereUniqueInput>;
  distinct?: InputMaybe<Array<GoodsTypeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<GoodsTypeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GoodsTypeWhereInput>;
};


export type QueryGroupArgs = {
  where: GroupWhereUniqueInput;
};


export type QueryGroupsArgs = {
  after?: InputMaybe<GroupWhereUniqueInput>;
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<GroupScalarFieldEnum>>;
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


export type QueryIncidentFeedArgs = {
  after?: InputMaybe<Scalars['String']>;
  approved?: InputMaybe<Scalars['Boolean']>;
  crimeTypes?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order?: InputMaybe<IncidentOrderByWithRelationInput>;
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
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: IncidentItemsWhereInput;
};


export type QueryIncidentMonthGraphArgs = {
  where: BusinessIncidentsCountGraphInput;
};


export type QueryIncidentTableReportArgs = {
  where: IncidentTableWhereInput;
};


export type QueryIncidentsArgs = {
  cursor?: InputMaybe<IncidentWhereUniqueInput>;
  distinct?: InputMaybe<Array<IncidentScalarFieldEnum>>;
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
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type QueryIncidentsTimeOfDayArgs = {
  where: DashboardInput;
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


export type QueryInvestigationTableReportArgs = {
  where: InvestigationTableWhereInput;
};


export type QueryInvestigationsArgs = {
  cursor?: InputMaybe<InvestigationWhereUniqueInput>;
  distinct?: InputMaybe<Array<InvestigationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<InvestigationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<InvestigationWhereInput>;
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
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<OffenderOrderByWithRelationInput>;
  orderByValue?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeWhereUniqueInput>;
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


export type QueryPerformanceReportArgs = {
  where: UserContributionWhereInput;
};


export type QueryPreviewIncidentExportArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where: IncidentExportInput;
};


export type QueryQuestionArgs = {
  where: QuestionWhereUniqueInput;
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
  take?: InputMaybe<Scalars['Int']>;
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


export type QueryRoleArgs = {
  where: CustomRoleWhereUniqueInput;
};


export type QueryRolesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  schemeId: Scalars['String'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QuerySchemeArgs = {
  where: SchemeWhereUniqueInput;
};


export type QuerySchemesArgs = {
  cursor?: InputMaybe<SchemeWhereUniqueInput>;
  distinct?: InputMaybe<Array<SchemeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SchemeWhereInput>;
};


export type QuerySearchOffendersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<SearchOffenderSort>;
  where: SearchOffenderWhere;
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


export type QueryTodoArgs = {
  where: TodoWhereUniqueInput;
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


export type QueryTranslateTextArgs = {
  data: TranslateTextInput;
};


export type QueryUpdatesArgs = {
  orderBy?: InputMaybe<Array<UpdateOrderByWithRelationInput>>;
  where?: InputMaybe<UpdateWhereInput>;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
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
  where: UserContributionWhereInput;
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

export enum Race {
  Ic1 = 'IC1',
  Ic2 = 'IC2',
  Ic3 = 'IC3',
  Ic4 = 'IC4',
  Ic5 = 'IC5',
  Ic6 = 'IC6',
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

export type RecycledItem = {
  __typename?: 'RecycledItem';
  deletedAt: Scalars['Date'];
  deletedBy: User;
  expiresAt: Scalars['Date'];
  id: Scalars['ID'];
  incident: Incident;
  offender: Offender;
  scheme: Scheme;
  systemTask: Scalars['Boolean'];
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

export type RefreshAuthData = {
  refreshToken: Scalars['String'];
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
  offender: Offender;
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
  incident: Incident;
  matchedFaces: Array<RekMatchedFace>;
  matchedOffender: Offender;
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

export type RelationSet = {
  set?: InputMaybe<Array<UniqueId>>;
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
  reportGroup: ReportGroup;
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
  IncidentItemsTable = 'INCIDENT_ITEMS_TABLE',
  IncidentMap = 'INCIDENT_MAP',
  IncidentTable = 'INCIDENT_TABLE',
  InvestigationsTable = 'INVESTIGATIONS_TABLE',
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

export type ResetPasswordData = {
  auth0Id?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
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
  activityAssignToUser: Scalars['Boolean'];
  allowTodoTemplateOverride: Scalars['Boolean'];
  approvalDueDays?: Maybe<Scalars['Int']>;
  articles: Array<Article>;
  autoApproveIncidents: Scalars['Boolean'];
  autoApproveOffenders: Scalars['Boolean'];
  autoPopulateDescription: Scalars['Boolean'];
  bans: Array<Ban>;
  businessCount: Scalars['Int'];
  businesses: Array<Business>;
  chats: Array<Chat>;
  checklistFeatureActive: Scalars['Boolean'];
  checklists: Array<Checklist>;
  connectedToSchemes: Array<Scheme>;
  contacts: Array<Contact>;
  createdAt: Scalars['Date'];
  creationBreakdown: CreationBreakdown;
  crimeGroups: Array<CrimeGroup>;
  csvImports: Array<CsvImport>;
  currentTerms?: Maybe<TermsAndCondition>;
  customGalleries: Array<CustomGallery>;
  customTranslations: Array<Scalars['JSON']>;
  darkLogo?: Maybe<Image>;
  darkLogoId?: Maybe<Scalars['String']>;
  defaultBulletinEmails: Scalars['Boolean'];
  defaultBulletinPush: Scalars['Boolean'];
  defaultGroups: Array<Group>;
  defaultIncidentEmail: Scalars['Boolean'];
  defaultIncidentPush: Scalars['Boolean'];
  defaultMessagePush: Scalars['Boolean'];
  defaultOffenderEmail: Scalars['Boolean'];
  defaultOffenderPush: Scalars['Boolean'];
  defaultPublicOffenderDOB: Scalars['Boolean'];
  defaultSubscribedIncidentOnly: Scalars['Boolean'];
  defaultSubscribedOffenderOnly: Scalars['Boolean'];
  disableGalleryOnNative: Scalars['Boolean'];
  documents: Array<Document>;
  facialDetection: Scalars['Boolean'];
  facialRecognition: Scalars['Boolean'];
  facialRedaction: Scalars['Boolean'];
  feedItems: Array<FeedItem>;
  goodsMode: GoodsMode;
  groups: Array<Group>;
  groupsCount: Scalars['Int'];
  id: Scalars['ID'];
  images: Array<Image>;
  imagesRequiredOnOffenders: Scalars['Boolean'];
  incidentCustomQuestionRadio: Scalars['Boolean'];
  incidentForm: Array<IncidentForm>;
  incidentImpact: Scalars['Boolean'];
  incidentPriority: Scalars['Boolean'];
  incidentRetention?: Maybe<Scalars['Int']>;
  incidentTypeTooltip?: Maybe<Scalars['String']>;
  incidents: Array<Incident>;
  incidentsByType: IncidentsByType;
  incidentsCreated: Scalars['Int'];
  intel: Array<Intel>;
  investigations: Array<Investigation>;
  investigationsInScheme: Array<Investigation>;
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
  notifications: Array<Notification>;
  offenderRetention?: Maybe<Scalars['Int']>;
  offenders: Array<Offender>;
  offendersCreated: Scalars['Int'];
  oneSelectedIncidentTypeOnly: Scalars['Boolean'];
  policeReporting: Scalars['Boolean'];
  questionGroups: Array<QuestionGroup>;
  questions: Array<Question>;
  recycledItems: Array<RecycledItem>;
  rekCollections: Array<RekCollection>;
  reportIcons: Array<Image>;
  reportOnly: Scalars['Boolean'];
  reportTemplates: Array<ReportTemplate>;
  requireSiteNumberForUsers: Scalars['Boolean'];
  restrictIncidentAccess: Scalars['Boolean'];
  roles: Array<CustomRole>;
  schemeTags: Array<Tag>;
  sharingFrom: Array<SharingConfig>;
  sharingTo: Array<SharingConfig>;
  skipLocationToAddress: Scalars['Boolean'];
  statementTemplates: Array<StatementTemplate>;
  stockItems: Array<StockItem>;
  tagOrders: Array<TagOrder>;
  tags: Array<Tag>;
  taskTimeTracking: Scalars['Boolean'];
  terms: Array<TermsAndCondition>;
  termsInScheme: Array<TermsAndCondition>;
  todos: Array<Todo>;
  topContributors: Array<TopContributors>;
  updatedAt: Scalars['Date'];
  updatesCreated: Scalars['Int'];
  uploadOffenderImagesOnMobile: Scalars['Boolean'];
  useBusinessGroupsOnIncident: Scalars['Boolean'];
  userCount: Scalars['Int'];
  userNotifications: Scalars['Int'];
  userTodos: Scalars['Int'];
  vehicles: Array<Vehicle>;
  workflows: Array<Workflow>;
};


export type SchemeActionsArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type SchemeActionsInSchemeArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
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
  orderBy?: InputMaybe<BusinessOrderByWithRelationInput>;
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
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  actionsInScheme?: InputMaybe<ActionOrderByRelationAggregateInput>;
  activityAssignToUser?: InputMaybe<SortOrder>;
  approvalDueDays?: InputMaybe<SortOrder>;
  articles?: InputMaybe<ArticleOrderByRelationAggregateInput>;
  autoApproveIncidents?: InputMaybe<SortOrder>;
  autoApproveOffenders?: InputMaybe<SortOrder>;
  autoPopulateDescription?: InputMaybe<SortOrder>;
  bans?: InputMaybe<BanOrderByRelationAggregateInput>;
  businesses?: InputMaybe<BusinessOrderByRelationAggregateInput>;
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
  RequireSiteNumberForUsers = 'requireSiteNumberForUsers',
  RestrictIncidentAccess = 'restrictIncidentAccess',
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

export type SchemeUpdateInput = {
  activityAssignToUser?: InputMaybe<SetBooleanHelper>;
  approvalDueDays?: InputMaybe<Scalars['Int']>;
  autoApproveIncidents?: InputMaybe<SetBooleanHelper>;
  autoApproveOffenders?: InputMaybe<SetBooleanHelper>;
  autoPopulateDescription?: InputMaybe<SetBooleanHelper>;
  checklistFeatureActive?: InputMaybe<Scalars['Boolean']>;
  collectionIds?: InputMaybe<Array<Scalars['String']>>;
  darkLogo?: InputMaybe<ImageUpdateOneWithoutSchemeDarkNestedInput>;
  defaultBulletinEmails?: InputMaybe<SetBooleanHelper>;
  defaultBulletinPush?: InputMaybe<SetBooleanHelper>;
  defaultGroups?: InputMaybe<Array<Scalars['String']>>;
  defaultIncidentEmail?: InputMaybe<SetBooleanHelper>;
  defaultIncidentPush?: InputMaybe<SetBooleanHelper>;
  defaultMessagePush?: InputMaybe<SetBooleanHelper>;
  defaultOffenderEmail?: InputMaybe<SetBooleanHelper>;
  defaultOffenderPush?: InputMaybe<SetBooleanHelper>;
  defaultPublicOffenderDOB?: InputMaybe<SetBooleanHelper>;
  defaultSubscribedIncidentOnly?: InputMaybe<SetBooleanHelper>;
  defaultSubscribedOffenderOnly?: InputMaybe<SetBooleanHelper>;
  demCompanyId?: InputMaybe<SetStringHelper>;
  disableGalleryOnNative?: InputMaybe<Scalars['Boolean']>;
  facialDetection?: InputMaybe<SetBooleanHelper>;
  facialRecognition?: InputMaybe<SetBooleanHelper>;
  facialRedaction?: InputMaybe<SetBooleanHelper>;
  goodsMode?: InputMaybe<EnumGoodsModeFieldUpdateOperationsInput>;
  imagesRequiredOnOffenders?: InputMaybe<SetBooleanHelper>;
  incidentCustomQuestionRadio?: InputMaybe<SetBooleanHelper>;
  incidentRetention?: InputMaybe<SetIntHelper>;
  incidentTypeTooltip?: InputMaybe<SetStringHelper>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeDarkNestedInput>;
  mg11Available?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<SetStringHelper>;
  needJustification?: InputMaybe<SetBooleanHelper>;
  offenderRetention?: InputMaybe<SetIntHelper>;
  oneSelectedIncidentTypeOnly?: InputMaybe<SetBooleanHelper>;
  reportOnly?: InputMaybe<SetBooleanHelper>;
  requireSiteNumberForUsers?: InputMaybe<SetBooleanHelper>;
  restrictIncidentAccess?: InputMaybe<SetBooleanHelper>;
  taskTimeTracking?: InputMaybe<Scalars['Boolean']>;
  useBusinessGroupsOnIncident?: InputMaybe<SetBooleanHelper>;
};

export type SchemeWhereInput = {
  AND?: InputMaybe<Array<SchemeWhereInput>>;
  Checklist?: InputMaybe<ChecklistWhereInput>;
  NOT?: InputMaybe<Array<SchemeWhereInput>>;
  OR?: InputMaybe<Array<SchemeWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  actionsInScheme?: InputMaybe<ActionListRelationFilter>;
  activityAssignToUser?: InputMaybe<BoolFilter>;
  approvalDueDays?: InputMaybe<IntNullableFilter>;
  articles?: InputMaybe<ArticleListRelationFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
  actionsInScheme?: InputMaybe<ActionListRelationFilter>;
  activityAssignToUser?: InputMaybe<BoolFilter>;
  approvalDueDays?: InputMaybe<IntNullableFilter>;
  articles?: InputMaybe<ArticleListRelationFilter>;
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
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
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

export type ShareDataInput = {
  connectGroups: Array<UniqueId>;
  connectSchemes: Array<UniqueId>;
  incident?: InputMaybe<UniqueId>;
  offender?: InputMaybe<UniqueId>;
};

export type SharingBusiness = {
  __typename?: 'SharingBusiness';
  label: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type SharingConfig = {
  __typename?: 'SharingConfig';
  businessMap: Scalars['JSON'];
  conditions: Scalars['JSON'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  mode: SharingMode;
  noCondition: Scalars['Boolean'];
  schemeFrom: Scheme;
  schemeTo: Scheme;
  tagMap: Scalars['JSON'];
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
  External = 'EXTERNAL'
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
  business?: InputMaybe<BusinessOrderByWithRelationInput>;
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

export type SignInData = {
  email: Scalars['String'];
  password: Scalars['String'];
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
  division?: Maybe<Scalars['String']>;
  goodsType: GoodsType;
  goodsTypeId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  salesPriceLocal?: Maybe<Scalars['Float']>;
  salesPriceStandard?: Maybe<Scalars['Float']>;
  sku?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
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

export type Subscription = {
  __typename?: 'Subscription';
  /** Subscription for chat messages list */
  chatMessages: Array<MessageItem>;
  /** Subscription for new messages in a chat */
  newMessage: Message;
};


export type SubscriptionChatMessagesArgs = {
  chatId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type SubscriptionNewMessageArgs = {
  chatId: Scalars['ID'];
};

export type SubsectionInput = {
  order: Scalars['Int'];
  questions: Array<QuestionInput>;
  title: Scalars['String'];
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
  recycleBin?: Maybe<RecycledItem>;
  recycled?: Maybe<Scalars['Boolean']>;
  roles: Array<CustomRole>;
  scheme: Scheme;
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
  cursor?: InputMaybe<ActionWhereUniqueInput>;
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
  orderBy?: InputMaybe<BusinessOrderByWithRelationInput>;
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
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  articles?: InputMaybe<ArticleOrderByRelationAggregateInput>;
  businesses?: InputMaybe<BusinessOrderByRelationAggregateInput>;
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
  answers: Array<Answer>;
  createdAt: Scalars['Date'];
  dependentBrands: Array<Scalars['String']>;
  dependentQuestions: Array<Scalars['JSON']>;
  id: Scalars['String'];
  priority: Scalars['Int'];
  question: Question;
  req: Scalars['Boolean'];
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
  answers?: InputMaybe<AnswerOrderByRelationAggregateInput>;
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
  answers?: InputMaybe<AnswerListRelationFilter>;
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
  answers?: InputMaybe<AnswerListRelationFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
  articles?: InputMaybe<ArticleListRelationFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
  articles?: InputMaybe<ArticleListRelationFilter>;
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
};

export type TaskQuestionListRelationFilter = {
  every?: InputMaybe<TaskQuestionWhereInput>;
  none?: InputMaybe<TaskQuestionWhereInput>;
  some?: InputMaybe<TaskQuestionWhereInput>;
};

export type TaskQuestionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TaskQuestionOrderByWithRelationInput = {
  answers?: InputMaybe<AnswerOrderByRelationAggregateInput>;
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
  answers?: InputMaybe<AnswerListRelationFilter>;
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
  answers?: InputMaybe<AnswerListRelationFilter>;
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

export type Tier = {
  __typename?: 'Tier';
  description?: Maybe<Scalars['String']>;
  features: Array<Features>;
  id: Scalars['String'];
  name: Scalars['String'];
  schemes: Array<SchemeTier>;
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

export type Todo = {
  __typename?: 'Todo';
  answers?: Maybe<Array<Answer>>;
  assignedUsers: Array<User>;
  authorised?: Maybe<Scalars['Boolean']>;
  authorisedUsers?: Maybe<Array<User>>;
  business?: Maybe<Business>;
  chatId?: Maybe<Scalars['String']>;
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
  assignedUsers?: InputMaybe<ConnectOnlyArrayHelper>;
  business?: InputMaybe<ConnectHelper>;
  completed?: InputMaybe<Scalars['Boolean']>;
  createdBy?: InputMaybe<ConnectHelper>;
  description?: InputMaybe<Scalars['String']>;
  documents?: InputMaybe<Array<CreateDocument>>;
  dueDate?: InputMaybe<Scalars['Date']>;
  groups?: InputMaybe<Array<UniqueId>>;
  incident?: InputMaybe<ConnectHelper>;
  investigation?: InputMaybe<ConnectHelper>;
  name?: InputMaybe<Scalars['String']>;
  questions?: InputMaybe<TaskQuestionCreateNestedManyWithoutTaskInput>;
  schemes?: InputMaybe<ConnectOnlyArrayHelper>;
  similarOffenderIds?: InputMaybe<Array<Scalars['String']>>;
  timeTaken?: InputMaybe<TimeTakenCreateNestedManyWithoutTodoInput>;
  type?: InputMaybe<TodoType>;
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
  answers?: InputMaybe<AnswerOrderByRelationAggregateInput>;
  assignedUsers?: InputMaybe<UserOrderByRelationAggregateInput>;
  business?: InputMaybe<BusinessOrderByWithRelationInput>;
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
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Scalars['String']>;
  status: TodoStatusInput;
  userMode: TodoUserModeInput;
};

export enum TodoScalarFieldEnum {
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
  businessId?: InputMaybe<Scalars['String']>;
  completed?: InputMaybe<NullableSetBooleanHelper>;
  completedBy?: InputMaybe<ConnectHelper>;
  completedDate?: InputMaybe<NullableSetDateHelper>;
  description?: InputMaybe<Scalars['String']>;
  documents?: InputMaybe<Array<UpdateDocument>>;
  dueDate?: InputMaybe<NullableSetDateHelper>;
  groups?: InputMaybe<RelationSet>;
  name?: InputMaybe<Scalars['String']>;
  questions?: InputMaybe<TaskQuestionUpdateManyWithoutTaskNestedInput>;
  schemes?: InputMaybe<NullableConnectArrayHelper>;
  similarOffenderIds?: InputMaybe<Array<Scalars['String']>>;
  timeTaken?: InputMaybe<TimeTakenCreateManyEnvelope>;
  type?: InputMaybe<NullableEnumTodoTypeFieldUpdateOperationsInput>;
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
  answers?: InputMaybe<AnswerListRelationFilter>;
  assignedUsers?: InputMaybe<UserListRelationFilter>;
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
  answers?: InputMaybe<AnswerListRelationFilter>;
  assignedUsers?: InputMaybe<UserListRelationFilter>;
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

export type TranslateTextInput = {
  targetLang: LanguageCode;
  text: Array<Scalars['String']>;
};

export type TranslatedText = {
  __typename?: 'TranslatedText';
  origText: Scalars['String'];
  translatedText: Scalars['String'];
};

export type Tree = {
  __typename?: 'Tree';
  id: Scalars['String'];
  name: Scalars['String'];
  parentId: Scalars['String'];
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

export type UpdateBusinessOnUserEnvelope = {
  data?: InputMaybe<BusinessUpdateInput>;
  where?: InputMaybe<BusinessWhereUniqueInput>;
};

export type UpdateBusinessRelationEnvelope = {
  data?: InputMaybe<BusinessUpdateInput>;
  where?: InputMaybe<BusinessWhereUniqueInput>;
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
  schemeId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<InvestigationStatus>;
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
  linkedArticles?: InputMaybe<ArticleOrderByRelationAggregateInput>;
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

export type UpdateQuestionOnTagInput = {
  brands?: InputMaybe<Array<Scalars['String']>>;
  dependentAnswer?: InputMaybe<Scalars['String']>;
  dependentOnQId?: InputMaybe<Scalars['String']>;
  dependentOnTagQId?: InputMaybe<Scalars['String']>;
  newOptions?: InputMaybe<Array<Scalars['String']>>;
  newQuestion?: InputMaybe<Scalars['String']>;
  origOptions?: InputMaybe<Array<Scalars['String']>>;
  origQuestion: Scalars['String'];
  questionId: Scalars['String'];
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
  linkedArticles?: InputMaybe<ArticleListRelationFilter>;
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
  linkedArticles?: InputMaybe<ArticleListRelationFilter>;
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
  primary?: InputMaybe<Scalars['Boolean']>;
  rotation?: InputMaybe<Scalars['Int']>;
  url?: InputMaybe<UrlImage>;
};

export type UpsertBrand = {
  brandId?: InputMaybe<Scalars['String']>;
  businesses: Array<Scalars['String']>;
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

export type UpsertIncidentFormInput = {
  formFields: Array<IncidentFormFieldsInput>;
  tagId: Scalars['String'];
};

export type UpsertRole = {
  canApprove?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
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

export type User = {
  __typename?: 'User';
  actions: Array<Action>;
  actionsByUser: Array<Action>;
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
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type UserActionsByUserArgs = {
  cursor?: InputMaybe<ActionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ActionScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActionWhereInput>;
};


export type UserAddressesArgs = {
  cursor?: InputMaybe<AddressWhereUniqueInput>;
  distinct?: InputMaybe<Array<AddressScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>;
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
  orderBy?: InputMaybe<BusinessOrderByWithRelationInput>;
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

export type UserGroupsReplayWhere = {
  reportGroupsOnly?: InputMaybe<Scalars['Boolean']>;
  schemeIds?: InputMaybe<Array<Scalars['String']>>;
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
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  actionsByUser?: InputMaybe<ActionOrderByRelationAggregateInput>;
  addresses?: InputMaybe<AddressOrderByRelationAggregateInput>;
  approverGroups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  articles?: InputMaybe<ArticleOrderByRelationAggregateInput>;
  assignedTodos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  auth0Id?: InputMaybe<SortOrder>;
  bans?: InputMaybe<BanOrderByRelationAggregateInput>;
  bulletinEmails?: InputMaybe<SortOrder>;
  bulletinPush?: InputMaybe<SortOrder>;
  businesses?: InputMaybe<BusinessOrderByRelationAggregateInput>;
  chats?: InputMaybe<UserChatOrderByRelationAggregateInput>;
  checklists?: InputMaybe<ActiveChecklistOrderByRelationAggregateInput>;
  completedTodos?: InputMaybe<TodoOrderByRelationAggregateInput>;
  contact?: InputMaybe<ContactOrderByWithRelationInput>;
  contactId?: InputMaybe<SortOrder>;
  createdArticles?: InputMaybe<ArticleOrderByRelationAggregateInput>;
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
  createdAt: Scalars['Date'];
  dashboard?: Maybe<Dashboard>;
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  notificationCount: Scalars['Int'];
  orignalPermissions: CustomRole;
  permissions: Array<Permissions>;
  recycled: Scalars['Boolean'];
  role: Role;
  scheme: Scheme;
  schemeId: Scalars['String'];
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
  permissions?: InputMaybe<ConnectHelper>;
  reportToAllBusinesses?: InputMaybe<SetBooleanHelper>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
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
  id?: InputMaybe<StringFilter>;
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

export type UserUpdateManyWithoutGroups = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  actionsByUser?: InputMaybe<ActionListRelationFilter>;
  addresses?: InputMaybe<AddressListRelationFilter>;
  approverGroups?: InputMaybe<GroupListRelationFilter>;
  articles?: InputMaybe<ArticleListRelationFilter>;
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
  createdArticles?: InputMaybe<ArticleListRelationFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
  actionsByUser?: InputMaybe<ActionListRelationFilter>;
  addresses?: InputMaybe<AddressListRelationFilter>;
  approverGroups?: InputMaybe<GroupListRelationFilter>;
  articles?: InputMaybe<ArticleListRelationFilter>;
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
  createdArticles?: InputMaybe<ArticleListRelationFilter>;
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
  cursor?: InputMaybe<ActionWhereUniqueInput>;
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
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
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
  actions?: InputMaybe<ActionListRelationFilter>;
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
  divisionIds?: InputMaybe<Array<Scalars['String']>>;
  schemeIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};
