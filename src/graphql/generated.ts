import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Action = {
  __typename?: 'Action';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  reason?: Maybe<Scalars['String']>;
};

export type ActionCreateInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateManyAddressInput = {
  banId?: InputMaybe<Scalars['String']>;
  byUserId: Scalars['String'];
  chatId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  inSchemeId: Scalars['String'];
  incidentId?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
  type: ActionType;
  userId?: InputMaybe<Scalars['String']>;
};

export type ActionCreateManyAddressInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManyAddressInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateManyBanInput = {
  addressId?: InputMaybe<Scalars['String']>;
  byUserId: Scalars['String'];
  chatId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  inSchemeId: Scalars['String'];
  incidentId?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
  type: ActionType;
  userId?: InputMaybe<Scalars['String']>;
};

export type ActionCreateManyBanInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManyBanInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateManyByUserInput = {
  addressId?: InputMaybe<Scalars['String']>;
  banId?: InputMaybe<Scalars['String']>;
  chatId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  inSchemeId: Scalars['String'];
  incidentId?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
  type: ActionType;
  userId?: InputMaybe<Scalars['String']>;
};

export type ActionCreateManyByUserInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManyByUserInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateManyChatInput = {
  addressId?: InputMaybe<Scalars['String']>;
  banId?: InputMaybe<Scalars['String']>;
  byUserId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  inSchemeId: Scalars['String'];
  incidentId?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
  type: ActionType;
  userId?: InputMaybe<Scalars['String']>;
};

export type ActionCreateManyChatInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManyChatInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateManyGroupsInput = {
  addressId?: InputMaybe<Scalars['String']>;
  banId?: InputMaybe<Scalars['String']>;
  byUserId: Scalars['String'];
  chatId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  inSchemeId: Scalars['String'];
  incidentId?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
  type: ActionType;
  userId?: InputMaybe<Scalars['String']>;
};

export type ActionCreateManyGroupsInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManyGroupsInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateManyImagesInput = {
  addressId?: InputMaybe<Scalars['String']>;
  banId?: InputMaybe<Scalars['String']>;
  byUserId: Scalars['String'];
  chatId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  inSchemeId: Scalars['String'];
  incidentId?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
  type: ActionType;
  userId?: InputMaybe<Scalars['String']>;
};

export type ActionCreateManyImagesInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManyImagesInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateManyInSchemeInput = {
  addressId?: InputMaybe<Scalars['String']>;
  banId?: InputMaybe<Scalars['String']>;
  byUserId: Scalars['String'];
  chatId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
  type: ActionType;
  userId?: InputMaybe<Scalars['String']>;
};

export type ActionCreateManyInSchemeInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManyInSchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateManyIncidentInput = {
  addressId?: InputMaybe<Scalars['String']>;
  banId?: InputMaybe<Scalars['String']>;
  byUserId: Scalars['String'];
  chatId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  inSchemeId: Scalars['String'];
  messageId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
  type: ActionType;
  userId?: InputMaybe<Scalars['String']>;
};

export type ActionCreateManyIncidentInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManyIncidentInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateManyMessageInput = {
  addressId?: InputMaybe<Scalars['String']>;
  banId?: InputMaybe<Scalars['String']>;
  byUserId: Scalars['String'];
  chatId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  inSchemeId: Scalars['String'];
  incidentId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
  type: ActionType;
  userId?: InputMaybe<Scalars['String']>;
};

export type ActionCreateManyMessageInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManyMessageInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateManyOffenderInput = {
  addressId?: InputMaybe<Scalars['String']>;
  banId?: InputMaybe<Scalars['String']>;
  byUserId: Scalars['String'];
  chatId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  inSchemeId: Scalars['String'];
  incidentId?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
  type: ActionType;
  userId?: InputMaybe<Scalars['String']>;
};

export type ActionCreateManyOffenderInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManyOffenderInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateManySchemeInput = {
  addressId?: InputMaybe<Scalars['String']>;
  banId?: InputMaybe<Scalars['String']>;
  byUserId: Scalars['String'];
  chatId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  inSchemeId: Scalars['String'];
  incidentId?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
  type: ActionType;
  userId?: InputMaybe<Scalars['String']>;
};

export type ActionCreateManySchemeInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManySchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateManyTagInput = {
  addressId?: InputMaybe<Scalars['String']>;
  banId?: InputMaybe<Scalars['String']>;
  byUserId: Scalars['String'];
  chatId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  inSchemeId: Scalars['String'];
  incidentId?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  type: ActionType;
  userId?: InputMaybe<Scalars['String']>;
};

export type ActionCreateManyTagInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManyTagInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateManyUserInput = {
  addressId?: InputMaybe<Scalars['String']>;
  banId?: InputMaybe<Scalars['String']>;
  byUserId: Scalars['String'];
  chatId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  inSchemeId: Scalars['String'];
  incidentId?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  reason?: InputMaybe<Scalars['String']>;
  schemeId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
  type: ActionType;
};

export type ActionCreateManyUserInputEnvelope = {
  data?: InputMaybe<Array<ActionCreateManyUserInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ActionCreateNestedManyWithoutAddressInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutAddressInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutAddressInput>>;
  createMany?: InputMaybe<ActionCreateManyAddressInputEnvelope>;
};

export type ActionCreateNestedManyWithoutBanInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutBanInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutBanInput>>;
  createMany?: InputMaybe<ActionCreateManyBanInputEnvelope>;
};

export type ActionCreateNestedManyWithoutByUserInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutByUserInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutByUserInput>>;
  createMany?: InputMaybe<ActionCreateManyByUserInputEnvelope>;
};

export type ActionCreateNestedManyWithoutChatInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutChatInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutChatInput>>;
  createMany?: InputMaybe<ActionCreateManyChatInputEnvelope>;
};

export type ActionCreateNestedManyWithoutGroupsInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutGroupsInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutGroupsInput>>;
  createMany?: InputMaybe<ActionCreateManyGroupsInputEnvelope>;
};

export type ActionCreateNestedManyWithoutImagesInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutImagesInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutImagesInput>>;
  createMany?: InputMaybe<ActionCreateManyImagesInputEnvelope>;
};

export type ActionCreateNestedManyWithoutInSchemeInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutInSchemeInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutInSchemeInput>>;
  createMany?: InputMaybe<ActionCreateManyInSchemeInputEnvelope>;
};

export type ActionCreateNestedManyWithoutIncidentInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutIncidentInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutIncidentInput>>;
  createMany?: InputMaybe<ActionCreateManyIncidentInputEnvelope>;
};

export type ActionCreateNestedManyWithoutMessageInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutMessageInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutMessageInput>>;
  createMany?: InputMaybe<ActionCreateManyMessageInputEnvelope>;
};

export type ActionCreateNestedManyWithoutOffenderInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutOffenderInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutOffenderInput>>;
  createMany?: InputMaybe<ActionCreateManyOffenderInputEnvelope>;
};

export type ActionCreateNestedManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<ActionCreateManySchemeInputEnvelope>;
};

export type ActionCreateNestedManyWithoutTagInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutTagInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutTagInput>>;
  createMany?: InputMaybe<ActionCreateManyTagInputEnvelope>;
};

export type ActionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutUserInput>>;
  createMany?: InputMaybe<ActionCreateManyUserInputEnvelope>;
};

export type ActionCreateOrConnectWithoutAddressInput = {
  create: ActionCreateWithoutAddressInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateOrConnectWithoutBanInput = {
  create: ActionCreateWithoutBanInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateOrConnectWithoutByUserInput = {
  create: ActionCreateWithoutByUserInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateOrConnectWithoutChatInput = {
  create: ActionCreateWithoutChatInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateOrConnectWithoutGroupsInput = {
  create: ActionCreateWithoutGroupsInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateOrConnectWithoutImagesInput = {
  create: ActionCreateWithoutImagesInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateOrConnectWithoutInSchemeInput = {
  create: ActionCreateWithoutInSchemeInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateOrConnectWithoutIncidentInput = {
  create: ActionCreateWithoutIncidentInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateOrConnectWithoutMessageInput = {
  create: ActionCreateWithoutMessageInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateOrConnectWithoutOffenderInput = {
  create: ActionCreateWithoutOffenderInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateOrConnectWithoutSchemeInput = {
  create: ActionCreateWithoutSchemeInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateOrConnectWithoutTagInput = {
  create: ActionCreateWithoutTagInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateOrConnectWithoutUserInput = {
  create: ActionCreateWithoutUserInput;
  where: ActionWhereUniqueInput;
};

export type ActionCreateWithoutAddressInput = {
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateWithoutBanInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateWithoutByUserInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateWithoutChatInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateWithoutGroupsInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateWithoutImagesInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateWithoutInSchemeInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateWithoutIncidentInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateWithoutMessageInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateWithoutOffenderInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateWithoutSchemeInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateWithoutTagInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  type: ActionType;
  user?: InputMaybe<UserCreateNestedOneWithoutActionsInput>;
};

export type ActionCreateWithoutUserInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutActionsInput>;
  Ban?: InputMaybe<BanCreateNestedOneWithoutActionsInput>;
  byUser: UserCreateNestedOneWithoutActionsByUserInput;
  chat?: InputMaybe<ChatCreateNestedOneWithoutActionsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<GroupCreateNestedOneWithoutActionsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedOneWithoutActionsInput>;
  inScheme: SchemeCreateNestedOneWithoutActionsInSchemeInput;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutActionsInput>;
  message?: InputMaybe<MessageCreateNestedOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutActionsInput>;
  reason?: InputMaybe<Scalars['String']>;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutActionsInput>;
  tag?: InputMaybe<TagCreateNestedOneWithoutActionsInput>;
  type: ActionType;
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
  addressId?: InputMaybe<SortOrder>;
  banId?: InputMaybe<SortOrder>;
  byUser?: InputMaybe<UserOrderByWithRelationInput>;
  byUserId?: InputMaybe<SortOrder>;
  chat?: InputMaybe<ChatOrderByWithRelationInput>;
  chatId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  dataType?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  groupId?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByWithRelationInput>;
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
};

export type ActionScalarWhereInput = {
  AND?: InputMaybe<Array<ActionScalarWhereInput>>;
  NOT?: InputMaybe<Array<ActionScalarWhereInput>>;
  OR?: InputMaybe<Array<ActionScalarWhereInput>>;
  addressId?: InputMaybe<StringNullableFilter>;
  banId?: InputMaybe<StringNullableFilter>;
  byUserId?: InputMaybe<StringFilter>;
  chatId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dataType?: InputMaybe<EnumModelFilter>;
  description?: InputMaybe<StringNullableFilter>;
  groupId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  imageId?: InputMaybe<StringNullableFilter>;
  inSchemeId?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  messageId?: InputMaybe<StringNullableFilter>;
  offenderId?: InputMaybe<StringNullableFilter>;
  reason?: InputMaybe<StringNullableFilter>;
  schemeId?: InputMaybe<StringNullableFilter>;
  tagId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumActionTypeFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export enum ActionType {
  Add = 'ADD',
  Create = 'CREATE',
  Delete = 'DELETE',
  Disable = 'DISABLE',
  Enable = 'ENABLE',
  Extend = 'EXTEND',
  Invite = 'INVITE',
  Reduce = 'REDUCE',
  Remove = 'REMOVE',
  ResetPassword = 'RESET_PASSWORD',
  Update = 'UPDATE'
}

export type ActionUpdateInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
};

export type ActionUpdateManyWithWhereWithoutAddressInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithWhereWithoutBanInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithWhereWithoutByUserInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithWhereWithoutChatInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithWhereWithoutGroupsInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithWhereWithoutImagesInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithWhereWithoutInSchemeInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithWhereWithoutIncidentInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithWhereWithoutMessageInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithWhereWithoutOffenderInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithWhereWithoutSchemeInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithWhereWithoutTagInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithWhereWithoutUserInput = {
  data: ActionUpdateManyMutationInput;
  where: ActionScalarWhereInput;
};

export type ActionUpdateManyWithoutAddressInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutAddressInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutAddressInput>>;
  createMany?: InputMaybe<ActionCreateManyAddressInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutAddressInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutAddressInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutAddressInput>>;
};

export type ActionUpdateManyWithoutBanInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutBanInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutBanInput>>;
  createMany?: InputMaybe<ActionCreateManyBanInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutBanInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutBanInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutBanInput>>;
};

export type ActionUpdateManyWithoutByUserInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutByUserInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutByUserInput>>;
  createMany?: InputMaybe<ActionCreateManyByUserInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutByUserInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutByUserInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutByUserInput>>;
};

export type ActionUpdateManyWithoutChatInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutChatInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutChatInput>>;
  createMany?: InputMaybe<ActionCreateManyChatInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutChatInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutChatInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutChatInput>>;
};

export type ActionUpdateManyWithoutGroupsInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutGroupsInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutGroupsInput>>;
  createMany?: InputMaybe<ActionCreateManyGroupsInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutGroupsInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutGroupsInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutGroupsInput>>;
};

export type ActionUpdateManyWithoutImagesInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutImagesInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutImagesInput>>;
  createMany?: InputMaybe<ActionCreateManyImagesInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutImagesInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutImagesInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutImagesInput>>;
};

export type ActionUpdateManyWithoutInSchemeInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutInSchemeInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutInSchemeInput>>;
  createMany?: InputMaybe<ActionCreateManyInSchemeInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutInSchemeInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutInSchemeInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutInSchemeInput>>;
};

export type ActionUpdateManyWithoutIncidentInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutIncidentInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutIncidentInput>>;
  createMany?: InputMaybe<ActionCreateManyIncidentInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutIncidentInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutIncidentInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutIncidentInput>>;
};

export type ActionUpdateManyWithoutMessageInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutMessageInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutMessageInput>>;
  createMany?: InputMaybe<ActionCreateManyMessageInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutMessageInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutMessageInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutMessageInput>>;
};

export type ActionUpdateManyWithoutOffenderInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutOffenderInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutOffenderInput>>;
  createMany?: InputMaybe<ActionCreateManyOffenderInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutOffenderInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutOffenderInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutOffenderInput>>;
};

export type ActionUpdateManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<ActionCreateManySchemeInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutSchemeInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutSchemeInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutSchemeInput>>;
};

export type ActionUpdateManyWithoutTagInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutTagInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutTagInput>>;
  createMany?: InputMaybe<ActionCreateManyTagInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutTagInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutTagInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutTagInput>>;
};

export type ActionUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ActionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ActionCreateWithoutUserInput>>;
  createMany?: InputMaybe<ActionCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ActionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ActionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ActionWhereUniqueInput>>;
  set?: InputMaybe<Array<ActionWhereUniqueInput>>;
  update?: InputMaybe<Array<ActionUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ActionUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ActionUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ActionUpdateWithWhereUniqueWithoutAddressInput = {
  data: ActionUpdateWithoutAddressInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithWhereUniqueWithoutBanInput = {
  data: ActionUpdateWithoutBanInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithWhereUniqueWithoutByUserInput = {
  data: ActionUpdateWithoutByUserInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithWhereUniqueWithoutChatInput = {
  data: ActionUpdateWithoutChatInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithWhereUniqueWithoutGroupsInput = {
  data: ActionUpdateWithoutGroupsInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithWhereUniqueWithoutImagesInput = {
  data: ActionUpdateWithoutImagesInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithWhereUniqueWithoutInSchemeInput = {
  data: ActionUpdateWithoutInSchemeInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithWhereUniqueWithoutIncidentInput = {
  data: ActionUpdateWithoutIncidentInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithWhereUniqueWithoutMessageInput = {
  data: ActionUpdateWithoutMessageInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithWhereUniqueWithoutOffenderInput = {
  data: ActionUpdateWithoutOffenderInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithWhereUniqueWithoutSchemeInput = {
  data: ActionUpdateWithoutSchemeInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithWhereUniqueWithoutTagInput = {
  data: ActionUpdateWithoutTagInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithWhereUniqueWithoutUserInput = {
  data: ActionUpdateWithoutUserInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpdateWithoutAddressInput = {
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateWithoutBanInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateWithoutByUserInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateWithoutChatInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateWithoutGroupsInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateWithoutImagesInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateWithoutInSchemeInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateWithoutIncidentInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateWithoutMessageInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateWithoutOffenderInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateWithoutSchemeInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateWithoutTagInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutActionsInput>;
};

export type ActionUpdateWithoutUserInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutActionsInput>;
  Ban?: InputMaybe<BanUpdateOneWithoutActionsInput>;
  byUser?: InputMaybe<UserUpdateOneRequiredWithoutActionsByUserInput>;
  chat?: InputMaybe<ChatUpdateOneWithoutActionsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateOneWithoutActionsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateOneWithoutActionsInput>;
  inScheme?: InputMaybe<SchemeUpdateOneRequiredWithoutActionsInSchemeInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutActionsInput>;
  message?: InputMaybe<MessageUpdateOneWithoutActionsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutActionsInput>;
  reason?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneWithoutActionsInput>;
  tag?: InputMaybe<TagUpdateOneWithoutActionsInput>;
  type?: InputMaybe<EnumActionTypeFieldUpdateOperationsInput>;
};

export type ActionUpsertWithWhereUniqueWithoutAddressInput = {
  create: ActionCreateWithoutAddressInput;
  update: ActionUpdateWithoutAddressInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpsertWithWhereUniqueWithoutBanInput = {
  create: ActionCreateWithoutBanInput;
  update: ActionUpdateWithoutBanInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpsertWithWhereUniqueWithoutByUserInput = {
  create: ActionCreateWithoutByUserInput;
  update: ActionUpdateWithoutByUserInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpsertWithWhereUniqueWithoutChatInput = {
  create: ActionCreateWithoutChatInput;
  update: ActionUpdateWithoutChatInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpsertWithWhereUniqueWithoutGroupsInput = {
  create: ActionCreateWithoutGroupsInput;
  update: ActionUpdateWithoutGroupsInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpsertWithWhereUniqueWithoutImagesInput = {
  create: ActionCreateWithoutImagesInput;
  update: ActionUpdateWithoutImagesInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpsertWithWhereUniqueWithoutInSchemeInput = {
  create: ActionCreateWithoutInSchemeInput;
  update: ActionUpdateWithoutInSchemeInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpsertWithWhereUniqueWithoutIncidentInput = {
  create: ActionCreateWithoutIncidentInput;
  update: ActionUpdateWithoutIncidentInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpsertWithWhereUniqueWithoutMessageInput = {
  create: ActionCreateWithoutMessageInput;
  update: ActionUpdateWithoutMessageInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpsertWithWhereUniqueWithoutOffenderInput = {
  create: ActionCreateWithoutOffenderInput;
  update: ActionUpdateWithoutOffenderInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpsertWithWhereUniqueWithoutSchemeInput = {
  create: ActionCreateWithoutSchemeInput;
  update: ActionUpdateWithoutSchemeInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpsertWithWhereUniqueWithoutTagInput = {
  create: ActionCreateWithoutTagInput;
  update: ActionUpdateWithoutTagInput;
  where: ActionWhereUniqueInput;
};

export type ActionUpsertWithWhereUniqueWithoutUserInput = {
  create: ActionCreateWithoutUserInput;
  update: ActionUpdateWithoutUserInput;
  where: ActionWhereUniqueInput;
};

export type ActionWhereInput = {
  AND?: InputMaybe<Array<ActionWhereInput>>;
  Address?: InputMaybe<AddressWhereInput>;
  Ban?: InputMaybe<BanWhereInput>;
  NOT?: InputMaybe<Array<ActionWhereInput>>;
  OR?: InputMaybe<Array<ActionWhereInput>>;
  addressId?: InputMaybe<StringNullableFilter>;
  banId?: InputMaybe<StringNullableFilter>;
  byUser?: InputMaybe<UserWhereInput>;
  byUserId?: InputMaybe<StringFilter>;
  chat?: InputMaybe<ChatWhereInput>;
  chatId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dataType?: InputMaybe<EnumModelFilter>;
  description?: InputMaybe<StringNullableFilter>;
  groupId?: InputMaybe<StringNullableFilter>;
  groups?: InputMaybe<GroupWhereInput>;
  id?: InputMaybe<StringFilter>;
  imageId?: InputMaybe<StringNullableFilter>;
  images?: InputMaybe<ImageWhereInput>;
  inScheme?: InputMaybe<SchemeWhereInput>;
  inSchemeId?: InputMaybe<StringFilter>;
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
};

export type ActionWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AddImageIntelData = {
  image: UploadIncidentImage;
  incident?: InputMaybe<IncidentConnectOne>;
  offender?: InputMaybe<OffenderConnectOne>;
};

export type Address = {
  __typename?: 'Address';
  actions: Array<Action>;
  building?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  full?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  incident?: Maybe<Incident>;
  postcode: Scalars['String'];
  premises?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  street: Scalars['String'];
  townCity: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};


export type AddressActionsArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};

export type AddressCreateInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutAddressInput>;
  building?: InputMaybe<Scalars['String']>;
  county?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutLocationInput>;
  postcode: Scalars['String'];
  premises?: InputMaybe<Scalars['String']>;
  primary?: InputMaybe<Scalars['Boolean']>;
  street: Scalars['String'];
  townCity: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserCreateNestedOneWithoutAddressesInput>;
};

export type AddressCreateManyUserInput = {
  building?: InputMaybe<Scalars['String']>;
  county?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  postcode: Scalars['String'];
  premises?: InputMaybe<Scalars['String']>;
  primary?: InputMaybe<Scalars['Boolean']>;
  street: Scalars['String'];
  townCity: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AddressCreateManyUserInputEnvelope = {
  data?: InputMaybe<Array<AddressCreateManyUserInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AddressCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<AddressWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AddressCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<AddressCreateWithoutUserInput>>;
  createMany?: InputMaybe<AddressCreateManyUserInputEnvelope>;
};

export type AddressCreateNestedOneWithoutActionsInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<AddressCreateWithoutActionsInput>;
};

export type AddressCreateNestedOneWithoutIncidentInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutIncidentInput>;
  create?: InputMaybe<AddressCreateWithoutIncidentInput>;
};

export type AddressCreateOrConnectWithoutActionsInput = {
  create: AddressCreateWithoutActionsInput;
  where: AddressWhereUniqueInput;
};

export type AddressCreateOrConnectWithoutIncidentInput = {
  create: AddressCreateWithoutIncidentInput;
  where: AddressWhereUniqueInput;
};

export type AddressCreateOrConnectWithoutUserInput = {
  create: AddressCreateWithoutUserInput;
  where: AddressWhereUniqueInput;
};

export type AddressCreateWithoutActionsInput = {
  building?: InputMaybe<Scalars['String']>;
  county?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutLocationInput>;
  postcode: Scalars['String'];
  premises?: InputMaybe<Scalars['String']>;
  primary?: InputMaybe<Scalars['Boolean']>;
  street: Scalars['String'];
  townCity: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserCreateNestedOneWithoutAddressesInput>;
};

export type AddressCreateWithoutIncidentInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutAddressInput>;
  building?: InputMaybe<Scalars['String']>;
  county?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  postcode: Scalars['String'];
  premises?: InputMaybe<Scalars['String']>;
  primary?: InputMaybe<Scalars['Boolean']>;
  street: Scalars['String'];
  townCity: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserCreateNestedOneWithoutAddressesInput>;
};

export type AddressCreateWithoutUserInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutAddressInput>;
  building?: InputMaybe<Scalars['String']>;
  county?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutLocationInput>;
  postcode: Scalars['String'];
  premises?: InputMaybe<Scalars['String']>;
  primary?: InputMaybe<Scalars['Boolean']>;
  street: Scalars['String'];
  townCity: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
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
  building?: InputMaybe<SortOrder>;
  county?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  postcode?: InputMaybe<SortOrder>;
  premises?: InputMaybe<SortOrder>;
  primary?: InputMaybe<SortOrder>;
  street?: InputMaybe<SortOrder>;
  townCity?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type AddressScalarWhereInput = {
  AND?: InputMaybe<Array<AddressScalarWhereInput>>;
  NOT?: InputMaybe<Array<AddressScalarWhereInput>>;
  OR?: InputMaybe<Array<AddressScalarWhereInput>>;
  building?: InputMaybe<StringNullableFilter>;
  county?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  postcode?: InputMaybe<StringFilter>;
  premises?: InputMaybe<StringNullableFilter>;
  primary?: InputMaybe<BoolNullableFilter>;
  street?: InputMaybe<StringFilter>;
  townCity?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type AddressUpdateInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutAddressInput>;
  building?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  county?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutLocationInput>;
  postcode?: InputMaybe<StringFieldUpdateOperationsInput>;
  premises?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  primary?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  street?: InputMaybe<StringFieldUpdateOperationsInput>;
  townCity?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutAddressesInput>;
};

export type AddressUpdateManyMutationInput = {
  building?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  county?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  postcode?: InputMaybe<StringFieldUpdateOperationsInput>;
  premises?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  primary?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  street?: InputMaybe<StringFieldUpdateOperationsInput>;
  townCity?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AddressUpdateManyWithWhereWithoutUserInput = {
  data: AddressUpdateManyMutationInput;
  where: AddressScalarWhereInput;
};

export type AddressUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<AddressWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AddressCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<AddressCreateWithoutUserInput>>;
  createMany?: InputMaybe<AddressCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<AddressWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AddressScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AddressWhereUniqueInput>>;
  set?: InputMaybe<Array<AddressWhereUniqueInput>>;
  update?: InputMaybe<Array<AddressUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<AddressUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<AddressUpsertWithWhereUniqueWithoutUserInput>>;
};

export type AddressUpdateOneWithoutActionsInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<AddressCreateWithoutActionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AddressUpdateWithoutActionsInput>;
  upsert?: InputMaybe<AddressUpsertWithoutActionsInput>;
};

export type AddressUpdateOneWithoutIncidentInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutIncidentInput>;
  create?: InputMaybe<AddressCreateWithoutIncidentInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AddressUpdateWithoutIncidentInput>;
  upsert?: InputMaybe<AddressUpsertWithoutIncidentInput>;
};

export type AddressUpdateWithWhereUniqueWithoutUserInput = {
  data: AddressUpdateWithoutUserInput;
  where: AddressWhereUniqueInput;
};

export type AddressUpdateWithoutActionsInput = {
  building?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  county?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutLocationInput>;
  postcode?: InputMaybe<StringFieldUpdateOperationsInput>;
  premises?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  primary?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  street?: InputMaybe<StringFieldUpdateOperationsInput>;
  townCity?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutAddressesInput>;
};

export type AddressUpdateWithoutIncidentInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutAddressInput>;
  building?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  county?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  postcode?: InputMaybe<StringFieldUpdateOperationsInput>;
  premises?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  primary?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  street?: InputMaybe<StringFieldUpdateOperationsInput>;
  townCity?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneWithoutAddressesInput>;
};

export type AddressUpdateWithoutUserInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutAddressInput>;
  building?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  county?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutLocationInput>;
  postcode?: InputMaybe<StringFieldUpdateOperationsInput>;
  premises?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  primary?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  street?: InputMaybe<StringFieldUpdateOperationsInput>;
  townCity?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AddressUpsertWithWhereUniqueWithoutUserInput = {
  create: AddressCreateWithoutUserInput;
  update: AddressUpdateWithoutUserInput;
  where: AddressWhereUniqueInput;
};

export type AddressUpsertWithoutActionsInput = {
  create: AddressCreateWithoutActionsInput;
  update: AddressUpdateWithoutActionsInput;
};

export type AddressUpsertWithoutIncidentInput = {
  create: AddressCreateWithoutIncidentInput;
  update: AddressUpdateWithoutIncidentInput;
};

export type AddressWhereInput = {
  AND?: InputMaybe<Array<AddressWhereInput>>;
  NOT?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  building?: InputMaybe<StringNullableFilter>;
  county?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  postcode?: InputMaybe<StringFilter>;
  premises?: InputMaybe<StringNullableFilter>;
  primary?: InputMaybe<BoolNullableFilter>;
  street?: InputMaybe<StringFilter>;
  townCity?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type AddressWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
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

export type ApproveGroupsData = {
  connect?: InputMaybe<Array<InputMaybe<UniqueId>>>;
  disconnect?: InputMaybe<Array<InputMaybe<UniqueId>>>;
};

export type ApproveIncidentData = {
  groups?: InputMaybe<ApproveGroupsData>;
};

export type Auth0User = {
  __typename?: 'Auth0User';
  blocked?: Maybe<Scalars['String']>;
  lastLogin?: Maybe<Scalars['String']>;
  lastPasswordReset?: Maybe<Scalars['String']>;
  loginCount?: Maybe<Scalars['String']>;
};

export type Ban = {
  __typename?: 'Ban';
  actions: Array<Action>;
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  current?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  expired?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  location: Scalars['String'];
  offender: Offender;
  scheme: Scheme;
  startDate: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


export type BanActionsArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};

export type BanCreateInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutBanInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutBansInput;
  description?: InputMaybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  location: Scalars['String'];
  offender: OffenderCreateNestedOneWithoutBansInput;
  scheme: SchemeCreateNestedOneWithoutBansInput;
  startDate: Scalars['DateTime'];
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BanCreateManyCreatedByInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  location: Scalars['String'];
  offenderId: Scalars['String'];
  schemeId: Scalars['String'];
  startDate: Scalars['DateTime'];
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BanCreateManyCreatedByInputEnvelope = {
  data?: InputMaybe<Array<BanCreateManyCreatedByInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BanCreateManyOffenderInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdById: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  location: Scalars['String'];
  schemeId: Scalars['String'];
  startDate: Scalars['DateTime'];
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BanCreateManyOffenderInputEnvelope = {
  data?: InputMaybe<Array<BanCreateManyOffenderInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BanCreateManySchemeInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdById: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  location: Scalars['String'];
  offenderId: Scalars['String'];
  startDate: Scalars['DateTime'];
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BanCreateManySchemeInputEnvelope = {
  data?: InputMaybe<Array<BanCreateManySchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BanCreateNestedManyWithoutCreatedByInput = {
  connect?: InputMaybe<Array<BanWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BanCreateOrConnectWithoutCreatedByInput>>;
  create?: InputMaybe<Array<BanCreateWithoutCreatedByInput>>;
  createMany?: InputMaybe<BanCreateManyCreatedByInputEnvelope>;
};

export type BanCreateNestedManyWithoutOffenderInput = {
  connect?: InputMaybe<Array<BanWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BanCreateOrConnectWithoutOffenderInput>>;
  create?: InputMaybe<Array<BanCreateWithoutOffenderInput>>;
  createMany?: InputMaybe<BanCreateManyOffenderInputEnvelope>;
};

export type BanCreateNestedManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<BanWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BanCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<BanCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<BanCreateManySchemeInputEnvelope>;
};

export type BanCreateNestedOneWithoutActionsInput = {
  connect?: InputMaybe<BanWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BanCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<BanCreateWithoutActionsInput>;
};

export type BanCreateOrConnectWithoutActionsInput = {
  create: BanCreateWithoutActionsInput;
  where: BanWhereUniqueInput;
};

export type BanCreateOrConnectWithoutCreatedByInput = {
  create: BanCreateWithoutCreatedByInput;
  where: BanWhereUniqueInput;
};

export type BanCreateOrConnectWithoutOffenderInput = {
  create: BanCreateWithoutOffenderInput;
  where: BanWhereUniqueInput;
};

export type BanCreateOrConnectWithoutSchemeInput = {
  create: BanCreateWithoutSchemeInput;
  where: BanWhereUniqueInput;
};

export type BanCreateWithoutActionsInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutBansInput;
  description?: InputMaybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  location: Scalars['String'];
  offender: OffenderCreateNestedOneWithoutBansInput;
  scheme: SchemeCreateNestedOneWithoutBansInput;
  startDate: Scalars['DateTime'];
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BanCreateWithoutCreatedByInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutBanInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  location: Scalars['String'];
  offender: OffenderCreateNestedOneWithoutBansInput;
  scheme: SchemeCreateNestedOneWithoutBansInput;
  startDate: Scalars['DateTime'];
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BanCreateWithoutOffenderInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutBanInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutBansInput;
  description?: InputMaybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  location: Scalars['String'];
  scheme: SchemeCreateNestedOneWithoutBansInput;
  startDate: Scalars['DateTime'];
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BanCreateWithoutSchemeInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutBanInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutBansInput;
  description?: InputMaybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  location: Scalars['String'];
  offender: OffenderCreateNestedOneWithoutBansInput;
  startDate: Scalars['DateTime'];
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BanListRelationFilter = {
  every?: InputMaybe<BanWhereInput>;
  none?: InputMaybe<BanWhereInput>;
  some?: InputMaybe<BanWhereInput>;
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
  id?: InputMaybe<SortOrder>;
  location?: InputMaybe<SortOrder>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BanScalarWhereInput = {
  AND?: InputMaybe<Array<BanScalarWhereInput>>;
  NOT?: InputMaybe<Array<BanScalarWhereInput>>;
  OR?: InputMaybe<Array<BanScalarWhereInput>>;
  active?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringNullableFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  location?: InputMaybe<StringFilter>;
  offenderId?: InputMaybe<StringFilter>;
  schemeId?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BanUpdateInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutBanInput>;
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutBansInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  endDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  location?: InputMaybe<StringFieldUpdateOperationsInput>;
  offender?: InputMaybe<OffenderUpdateOneRequiredWithoutBansInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutBansInput>;
  startDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BanUpdateManyMutationInput = {
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  endDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  location?: InputMaybe<StringFieldUpdateOperationsInput>;
  startDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BanUpdateManyWithWhereWithoutCreatedByInput = {
  data: BanUpdateManyMutationInput;
  where: BanScalarWhereInput;
};

export type BanUpdateManyWithWhereWithoutOffenderInput = {
  data: BanUpdateManyMutationInput;
  where: BanScalarWhereInput;
};

export type BanUpdateManyWithWhereWithoutSchemeInput = {
  data: BanUpdateManyMutationInput;
  where: BanScalarWhereInput;
};

export type BanUpdateManyWithoutCreatedByInput = {
  connect?: InputMaybe<Array<BanWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BanCreateOrConnectWithoutCreatedByInput>>;
  create?: InputMaybe<Array<BanCreateWithoutCreatedByInput>>;
  createMany?: InputMaybe<BanCreateManyCreatedByInputEnvelope>;
  delete?: InputMaybe<Array<BanWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BanScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BanWhereUniqueInput>>;
  set?: InputMaybe<Array<BanWhereUniqueInput>>;
  update?: InputMaybe<Array<BanUpdateWithWhereUniqueWithoutCreatedByInput>>;
  updateMany?: InputMaybe<Array<BanUpdateManyWithWhereWithoutCreatedByInput>>;
  upsert?: InputMaybe<Array<BanUpsertWithWhereUniqueWithoutCreatedByInput>>;
};

export type BanUpdateManyWithoutOffenderInput = {
  connect?: InputMaybe<Array<BanWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BanCreateOrConnectWithoutOffenderInput>>;
  create?: InputMaybe<Array<BanCreateWithoutOffenderInput>>;
  createMany?: InputMaybe<BanCreateManyOffenderInputEnvelope>;
  delete?: InputMaybe<Array<BanWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BanScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BanWhereUniqueInput>>;
  set?: InputMaybe<Array<BanWhereUniqueInput>>;
  update?: InputMaybe<Array<BanUpdateWithWhereUniqueWithoutOffenderInput>>;
  updateMany?: InputMaybe<Array<BanUpdateManyWithWhereWithoutOffenderInput>>;
  upsert?: InputMaybe<Array<BanUpsertWithWhereUniqueWithoutOffenderInput>>;
};

export type BanUpdateManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<BanWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BanCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<BanCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<BanCreateManySchemeInputEnvelope>;
  delete?: InputMaybe<Array<BanWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BanScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BanWhereUniqueInput>>;
  set?: InputMaybe<Array<BanWhereUniqueInput>>;
  update?: InputMaybe<Array<BanUpdateWithWhereUniqueWithoutSchemeInput>>;
  updateMany?: InputMaybe<Array<BanUpdateManyWithWhereWithoutSchemeInput>>;
  upsert?: InputMaybe<Array<BanUpsertWithWhereUniqueWithoutSchemeInput>>;
};

export type BanUpdateOneWithoutActionsInput = {
  connect?: InputMaybe<BanWhereUniqueInput>;
  connectOrCreate?: InputMaybe<BanCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<BanCreateWithoutActionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<BanUpdateWithoutActionsInput>;
  upsert?: InputMaybe<BanUpsertWithoutActionsInput>;
};

export type BanUpdateWithWhereUniqueWithoutCreatedByInput = {
  data: BanUpdateWithoutCreatedByInput;
  where: BanWhereUniqueInput;
};

export type BanUpdateWithWhereUniqueWithoutOffenderInput = {
  data: BanUpdateWithoutOffenderInput;
  where: BanWhereUniqueInput;
};

export type BanUpdateWithWhereUniqueWithoutSchemeInput = {
  data: BanUpdateWithoutSchemeInput;
  where: BanWhereUniqueInput;
};

export type BanUpdateWithoutActionsInput = {
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutBansInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  endDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  location?: InputMaybe<StringFieldUpdateOperationsInput>;
  offender?: InputMaybe<OffenderUpdateOneRequiredWithoutBansInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutBansInput>;
  startDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BanUpdateWithoutCreatedByInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutBanInput>;
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  endDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  location?: InputMaybe<StringFieldUpdateOperationsInput>;
  offender?: InputMaybe<OffenderUpdateOneRequiredWithoutBansInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutBansInput>;
  startDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BanUpdateWithoutOffenderInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutBanInput>;
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutBansInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  endDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  location?: InputMaybe<StringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutBansInput>;
  startDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BanUpdateWithoutSchemeInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutBanInput>;
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutBansInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  endDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  location?: InputMaybe<StringFieldUpdateOperationsInput>;
  offender?: InputMaybe<OffenderUpdateOneRequiredWithoutBansInput>;
  startDate?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type BanUpsertWithWhereUniqueWithoutCreatedByInput = {
  create: BanCreateWithoutCreatedByInput;
  update: BanUpdateWithoutCreatedByInput;
  where: BanWhereUniqueInput;
};

export type BanUpsertWithWhereUniqueWithoutOffenderInput = {
  create: BanCreateWithoutOffenderInput;
  update: BanUpdateWithoutOffenderInput;
  where: BanWhereUniqueInput;
};

export type BanUpsertWithWhereUniqueWithoutSchemeInput = {
  create: BanCreateWithoutSchemeInput;
  update: BanUpdateWithoutSchemeInput;
  where: BanWhereUniqueInput;
};

export type BanUpsertWithoutActionsInput = {
  create: BanCreateWithoutActionsInput;
  update: BanUpdateWithoutActionsInput;
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
  id?: InputMaybe<StringFilter>;
  location?: InputMaybe<StringFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BanWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
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

export enum Build {
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL',
  Unknown = 'UNKNOWN'
}

export type Chat = {
  __typename?: 'Chat';
  actions: Array<Action>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  firstLetter?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  members: Array<UserChat>;
  messages: Array<Message>;
  name: Scalars['String'];
  scheme: Scheme;
  updatedAt: Scalars['DateTime'];
};


export type ChatActionsArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};


export type ChatMembersArgs = {
  after?: InputMaybe<UserChatWhereUniqueInput>;
  before?: InputMaybe<UserChatWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserChatOrderByWithRelationInput>>;
  where?: InputMaybe<UserChatWhereInput>;
};


export type ChatMessagesArgs = {
  after?: InputMaybe<MessageWhereUniqueInput>;
  before?: InputMaybe<MessageWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  where?: InputMaybe<MessageWhereInput>;
};

export type ChatCreateInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutChatInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<UserChatCreateNestedManyWithoutChatInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutChatInput>;
  name: Scalars['String'];
  scheme: SchemeCreateNestedOneWithoutChatsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type ChatCreateManySchemeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type ChatCreateManySchemeInputEnvelope = {
  data?: InputMaybe<Array<ChatCreateManySchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ChatCreateNestedManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChatCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<ChatCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<ChatCreateManySchemeInputEnvelope>;
};

export type ChatCreateNestedOneWithoutActionsInput = {
  connect?: InputMaybe<ChatWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<ChatCreateWithoutActionsInput>;
};

export type ChatCreateNestedOneWithoutMembersInput = {
  connect?: InputMaybe<ChatWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatCreateOrConnectWithoutMembersInput>;
  create?: InputMaybe<ChatCreateWithoutMembersInput>;
};

export type ChatCreateNestedOneWithoutMessagesInput = {
  connect?: InputMaybe<ChatWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<ChatCreateWithoutMessagesInput>;
};

export type ChatCreateOrConnectWithoutActionsInput = {
  create: ChatCreateWithoutActionsInput;
  where: ChatWhereUniqueInput;
};

export type ChatCreateOrConnectWithoutMembersInput = {
  create: ChatCreateWithoutMembersInput;
  where: ChatWhereUniqueInput;
};

export type ChatCreateOrConnectWithoutMessagesInput = {
  create: ChatCreateWithoutMessagesInput;
  where: ChatWhereUniqueInput;
};

export type ChatCreateOrConnectWithoutSchemeInput = {
  create: ChatCreateWithoutSchemeInput;
  where: ChatWhereUniqueInput;
};

export type ChatCreateWithoutActionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<UserChatCreateNestedManyWithoutChatInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutChatInput>;
  name: Scalars['String'];
  scheme: SchemeCreateNestedOneWithoutChatsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type ChatCreateWithoutMembersInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutChatInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutChatInput>;
  name: Scalars['String'];
  scheme: SchemeCreateNestedOneWithoutChatsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type ChatCreateWithoutMessagesInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutChatInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<UserChatCreateNestedManyWithoutChatInput>;
  name: Scalars['String'];
  scheme: SchemeCreateNestedOneWithoutChatsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type ChatCreateWithoutSchemeInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutChatInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  members?: InputMaybe<UserChatCreateNestedManyWithoutChatInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutChatInput>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type ChatListRelationFilter = {
  every?: InputMaybe<ChatWhereInput>;
  none?: InputMaybe<ChatWhereInput>;
  some?: InputMaybe<ChatWhereInput>;
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
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uploaded?: InputMaybe<SortOrder>;
};

export type ChatScalarWhereInput = {
  AND?: InputMaybe<Array<ChatScalarWhereInput>>;
  NOT?: InputMaybe<Array<ChatScalarWhereInput>>;
  OR?: InputMaybe<Array<ChatScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
};

export type ChatUpdateInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutChatInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  members?: InputMaybe<UserChatUpdateManyWithoutChatInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutChatInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutChatsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type ChatUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type ChatUpdateManyWithWhereWithoutSchemeInput = {
  data: ChatUpdateManyMutationInput;
  where: ChatScalarWhereInput;
};

export type ChatUpdateManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ChatCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<ChatCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<ChatCreateManySchemeInputEnvelope>;
  delete?: InputMaybe<Array<ChatWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ChatScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ChatWhereUniqueInput>>;
  set?: InputMaybe<Array<ChatWhereUniqueInput>>;
  update?: InputMaybe<Array<ChatUpdateWithWhereUniqueWithoutSchemeInput>>;
  updateMany?: InputMaybe<Array<ChatUpdateManyWithWhereWithoutSchemeInput>>;
  upsert?: InputMaybe<Array<ChatUpsertWithWhereUniqueWithoutSchemeInput>>;
};

export type ChatUpdateOneRequiredWithoutMembersInput = {
  connect?: InputMaybe<ChatWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatCreateOrConnectWithoutMembersInput>;
  create?: InputMaybe<ChatCreateWithoutMembersInput>;
  update?: InputMaybe<ChatUpdateWithoutMembersInput>;
  upsert?: InputMaybe<ChatUpsertWithoutMembersInput>;
};

export type ChatUpdateOneRequiredWithoutMessagesInput = {
  connect?: InputMaybe<ChatWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<ChatCreateWithoutMessagesInput>;
  update?: InputMaybe<ChatUpdateWithoutMessagesInput>;
  upsert?: InputMaybe<ChatUpsertWithoutMessagesInput>;
};

export type ChatUpdateOneWithoutActionsInput = {
  connect?: InputMaybe<ChatWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<ChatCreateWithoutActionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ChatUpdateWithoutActionsInput>;
  upsert?: InputMaybe<ChatUpsertWithoutActionsInput>;
};

export type ChatUpdateWithWhereUniqueWithoutSchemeInput = {
  data: ChatUpdateWithoutSchemeInput;
  where: ChatWhereUniqueInput;
};

export type ChatUpdateWithoutActionsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  members?: InputMaybe<UserChatUpdateManyWithoutChatInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutChatInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutChatsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type ChatUpdateWithoutMembersInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutChatInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutChatInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutChatsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type ChatUpdateWithoutMessagesInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutChatInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  members?: InputMaybe<UserChatUpdateManyWithoutChatInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutChatsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type ChatUpdateWithoutSchemeInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutChatInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  members?: InputMaybe<UserChatUpdateManyWithoutChatInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutChatInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type ChatUpsertWithWhereUniqueWithoutSchemeInput = {
  create: ChatCreateWithoutSchemeInput;
  update: ChatUpdateWithoutSchemeInput;
  where: ChatWhereUniqueInput;
};

export type ChatUpsertWithoutActionsInput = {
  create: ChatCreateWithoutActionsInput;
  update: ChatUpdateWithoutActionsInput;
};

export type ChatUpsertWithoutMembersInput = {
  create: ChatCreateWithoutMembersInput;
  update: ChatUpdateWithoutMembersInput;
};

export type ChatUpsertWithoutMessagesInput = {
  create: ChatCreateWithoutMessagesInput;
  update: ChatUpdateWithoutMessagesInput;
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
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
};

export type ChatWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type ConnectImageToIncident = {
  id: Scalars['String'];
  offenders?: InputMaybe<Array<InputMaybe<IncidentOffenderWhereInput>>>;
};

export type CreatIncidentData = {
  crimeTypes?: InputMaybe<Array<InputMaybe<UniqueId>>>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  groups: Array<InputMaybe<UniqueId>>;
  images: CreatIncidentImages;
  location?: InputMaybe<CreateIncidentLocation>;
  offenders: CreateIncidentOffenders;
  scheme: Scalars['String'];
  subject: Scalars['String'];
  time: Scalars['DateTime'];
};

export type CreatIncidentImages = {
  connect?: InputMaybe<Array<InputMaybe<ConnectImageToIncident>>>;
  create?: InputMaybe<Array<InputMaybe<UploadIncidentImage>>>;
};

export type CreateCommentData = {
  incident: IncidentConnectOne;
  offender: OffenderConnectOne;
  text: Scalars['String'];
};

export type CreateIncidentLocation = {
  account?: InputMaybe<Scalars['Boolean']>;
  create?: InputMaybe<AddressCreateWithoutIncidentInput>;
  previous?: InputMaybe<UniqueId>;
};

export type CreateIncidentOffenders = {
  connect?: InputMaybe<Array<InputMaybe<UniqueId>>>;
  create?: InputMaybe<Array<InputMaybe<OffenderCreateWithoutIncidentsInput>>>;
};

export type CreateOffenderData = {
  age?: InputMaybe<Age>;
  bans?: InputMaybe<Array<InputMaybe<BanCreateWithoutOffenderInput>>>;
  build?: InputMaybe<Build>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutOffendersInput>;
  hair?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  images?: InputMaybe<Array<InputMaybe<UploadOffenderImage>>>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  scheme: Scalars['String'];
  tags?: InputMaybe<TagCreateNestedManyWithoutOffendersInput>;
};

export type CreateUserData = {
  address: AddressCreateWithoutUserInput;
  chats?: InputMaybe<Array<InputMaybe<UniqueId>>>;
  email: Scalars['String'];
  fullName: Scalars['String'];
  groups: Array<InputMaybe<UniqueId>>;
  organisation: Scalars['String'];
  role: Role;
  scheme: UniqueId;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DeviceInfo = {
  name?: InputMaybe<Scalars['String']>;
  osName?: InputMaybe<Scalars['String']>;
  osVersion?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type EnumActionTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<ActionType>;
};

export type EnumActionTypeFilter = {
  equals?: InputMaybe<ActionType>;
  in?: InputMaybe<Array<ActionType>>;
  not?: InputMaybe<NestedEnumActionTypeFilter>;
  notIn?: InputMaybe<Array<ActionType>>;
};

export type EnumAgeNullableFilter = {
  equals?: InputMaybe<Age>;
  in?: InputMaybe<Array<Age>>;
  not?: InputMaybe<NestedEnumAgeNullableFilter>;
  notIn?: InputMaybe<Array<Age>>;
};

export type EnumBuildNullableFilter = {
  equals?: InputMaybe<Build>;
  in?: InputMaybe<Array<Build>>;
  not?: InputMaybe<NestedEnumBuildNullableFilter>;
  notIn?: InputMaybe<Array<Build>>;
};

export type EnumGenderNullableFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<NestedEnumGenderNullableFilter>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type EnumIntelTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<IntelType>;
};

export type EnumIntelTypeFilter = {
  equals?: InputMaybe<IntelType>;
  in?: InputMaybe<Array<IntelType>>;
  not?: InputMaybe<NestedEnumIntelTypeFilter>;
  notIn?: InputMaybe<Array<IntelType>>;
};

export type EnumModelFieldUpdateOperationsInput = {
  set?: InputMaybe<Model>;
};

export type EnumModelFilter = {
  equals?: InputMaybe<Model>;
  in?: InputMaybe<Array<Model>>;
  not?: InputMaybe<NestedEnumModelFilter>;
  notIn?: InputMaybe<Array<Model>>;
};

export type EnumOnboardStepsFieldUpdateOperationsInput = {
  set?: InputMaybe<OnboardSteps>;
};

export type EnumOnboardStepsFilter = {
  equals?: InputMaybe<OnboardSteps>;
  in?: InputMaybe<Array<OnboardSteps>>;
  not?: InputMaybe<NestedEnumOnboardStepsFilter>;
  notIn?: InputMaybe<Array<OnboardSteps>>;
};

export type EnumRaceNullableFilter = {
  equals?: InputMaybe<Race>;
  in?: InputMaybe<Array<Race>>;
  not?: InputMaybe<NestedEnumRaceNullableFilter>;
  notIn?: InputMaybe<Array<Race>>;
};

export type EnumRoleFieldUpdateOperationsInput = {
  set?: InputMaybe<Role>;
};

export type EnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type ExpoPushToken = {
  __typename?: 'ExpoPushToken';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  token: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type ExpoPushTokenCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ExpoPushTokenCreateManyUserInputEnvelope = {
  data?: InputMaybe<Array<ExpoPushTokenCreateManyUserInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ExpoPushTokenCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ExpoPushTokenWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ExpoPushTokenCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ExpoPushTokenCreateWithoutUserInput>>;
  createMany?: InputMaybe<ExpoPushTokenCreateManyUserInputEnvelope>;
};

export type ExpoPushTokenCreateOrConnectWithoutUserInput = {
  create: ExpoPushTokenCreateWithoutUserInput;
  where: ExpoPushTokenWhereUniqueInput;
};

export type ExpoPushTokenCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ExpoPushTokenListRelationFilter = {
  every?: InputMaybe<ExpoPushTokenWhereInput>;
  none?: InputMaybe<ExpoPushTokenWhereInput>;
  some?: InputMaybe<ExpoPushTokenWhereInput>;
};

export type ExpoPushTokenOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ExpoPushTokenScalarWhereInput = {
  AND?: InputMaybe<Array<ExpoPushTokenScalarWhereInput>>;
  NOT?: InputMaybe<Array<ExpoPushTokenScalarWhereInput>>;
  OR?: InputMaybe<Array<ExpoPushTokenScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  token?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ExpoPushTokenUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  token?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ExpoPushTokenUpdateManyWithWhereWithoutUserInput = {
  data: ExpoPushTokenUpdateManyMutationInput;
  where: ExpoPushTokenScalarWhereInput;
};

export type ExpoPushTokenUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<ExpoPushTokenWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ExpoPushTokenCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ExpoPushTokenCreateWithoutUserInput>>;
  createMany?: InputMaybe<ExpoPushTokenCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ExpoPushTokenWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ExpoPushTokenScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ExpoPushTokenWhereUniqueInput>>;
  set?: InputMaybe<Array<ExpoPushTokenWhereUniqueInput>>;
  update?: InputMaybe<Array<ExpoPushTokenUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ExpoPushTokenUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ExpoPushTokenUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ExpoPushTokenUpdateWithWhereUniqueWithoutUserInput = {
  data: ExpoPushTokenUpdateWithoutUserInput;
  where: ExpoPushTokenWhereUniqueInput;
};

export type ExpoPushTokenUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  token?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ExpoPushTokenUpsertWithWhereUniqueWithoutUserInput = {
  create: ExpoPushTokenCreateWithoutUserInput;
  update: ExpoPushTokenUpdateWithoutUserInput;
  where: ExpoPushTokenWhereUniqueInput;
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

export type ExpoPushTokenWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

export type File = {
  __typename?: 'File';
  encoding?: Maybe<Scalars['String']>;
  filename?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  mimetype?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN'
}

export type Group = {
  __typename?: 'Group';
  actions: Array<Action>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  incidents: Array<Incident>;
  name: Scalars['String'];
  offenders: Array<Offender>;
  scheme: Scheme;
  updatedAt: Scalars['DateTime'];
  uploaded: Scalars['Boolean'];
  users: Array<User>;
};


export type GroupActionsArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};


export type GroupIncidentsArgs = {
  after?: InputMaybe<IncidentWhereUniqueInput>;
  before?: InputMaybe<IncidentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type GroupOffendersArgs = {
  after?: InputMaybe<OffenderWhereUniqueInput>;
  before?: InputMaybe<OffenderWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type GroupUsersArgs = {
  after?: InputMaybe<UserWhereUniqueInput>;
  before?: InputMaybe<UserWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  where?: InputMaybe<UserWhereInput>;
};

export type GroupCreateInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutGroupsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutGroupsInput>;
  name: Scalars['String'];
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutGroupsInput>;
  scheme: SchemeCreateNestedOneWithoutGroupsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<UserCreateNestedManyWithoutGroupsInput>;
};

export type GroupCreateManySchemeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type GroupCreateManySchemeInputEnvelope = {
  data?: InputMaybe<Array<GroupCreateManySchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type GroupCreateNestedManyWithoutIncidentsInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutIncidentsInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutIncidentsInput>>;
};

export type GroupCreateNestedManyWithoutOffendersInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutOffendersInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutOffendersInput>>;
};

export type GroupCreateNestedManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<GroupCreateManySchemeInputEnvelope>;
};

export type GroupCreateNestedManyWithoutUsersInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutUsersInput>>;
};

export type GroupCreateNestedOneWithoutActionsInput = {
  connect?: InputMaybe<GroupWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GroupCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<GroupCreateWithoutActionsInput>;
};

export type GroupCreateOrConnectWithoutActionsInput = {
  create: GroupCreateWithoutActionsInput;
  where: GroupWhereUniqueInput;
};

export type GroupCreateOrConnectWithoutIncidentsInput = {
  create: GroupCreateWithoutIncidentsInput;
  where: GroupWhereUniqueInput;
};

export type GroupCreateOrConnectWithoutOffendersInput = {
  create: GroupCreateWithoutOffendersInput;
  where: GroupWhereUniqueInput;
};

export type GroupCreateOrConnectWithoutSchemeInput = {
  create: GroupCreateWithoutSchemeInput;
  where: GroupWhereUniqueInput;
};

export type GroupCreateOrConnectWithoutUsersInput = {
  create: GroupCreateWithoutUsersInput;
  where: GroupWhereUniqueInput;
};

export type GroupCreateWithoutActionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutGroupsInput>;
  name: Scalars['String'];
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutGroupsInput>;
  scheme: SchemeCreateNestedOneWithoutGroupsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<UserCreateNestedManyWithoutGroupsInput>;
};

export type GroupCreateWithoutIncidentsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutGroupsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutGroupsInput>;
  scheme: SchemeCreateNestedOneWithoutGroupsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<UserCreateNestedManyWithoutGroupsInput>;
};

export type GroupCreateWithoutOffendersInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutGroupsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutGroupsInput>;
  name: Scalars['String'];
  scheme: SchemeCreateNestedOneWithoutGroupsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<UserCreateNestedManyWithoutGroupsInput>;
};

export type GroupCreateWithoutSchemeInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutGroupsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutGroupsInput>;
  name: Scalars['String'];
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutGroupsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<UserCreateNestedManyWithoutGroupsInput>;
};

export type GroupCreateWithoutUsersInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutGroupsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutGroupsInput>;
  name: Scalars['String'];
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutGroupsInput>;
  scheme: SchemeCreateNestedOneWithoutGroupsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
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
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uploaded?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
};

export type GroupScalarWhereInput = {
  AND?: InputMaybe<Array<GroupScalarWhereInput>>;
  NOT?: InputMaybe<Array<GroupScalarWhereInput>>;
  OR?: InputMaybe<Array<GroupScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
};

export type GroupUpdateInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutGroupsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutGroupsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutGroupsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutGroupsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutGroupsInput>;
};

export type GroupUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type GroupUpdateManyWithWhereWithoutIncidentsInput = {
  data: GroupUpdateManyMutationInput;
  where: GroupScalarWhereInput;
};

export type GroupUpdateManyWithWhereWithoutOffendersInput = {
  data: GroupUpdateManyMutationInput;
  where: GroupScalarWhereInput;
};

export type GroupUpdateManyWithWhereWithoutSchemeInput = {
  data: GroupUpdateManyMutationInput;
  where: GroupScalarWhereInput;
};

export type GroupUpdateManyWithWhereWithoutUsersInput = {
  data: GroupUpdateManyMutationInput;
  where: GroupScalarWhereInput;
};

export type GroupUpdateManyWithoutIncidentsInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutIncidentsInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutIncidentsInput>>;
  delete?: InputMaybe<Array<GroupWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GroupScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  set?: InputMaybe<Array<GroupWhereUniqueInput>>;
  update?: InputMaybe<Array<GroupUpdateWithWhereUniqueWithoutIncidentsInput>>;
  updateMany?: InputMaybe<Array<GroupUpdateManyWithWhereWithoutIncidentsInput>>;
  upsert?: InputMaybe<Array<GroupUpsertWithWhereUniqueWithoutIncidentsInput>>;
};

export type GroupUpdateManyWithoutOffendersInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutOffendersInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutOffendersInput>>;
  delete?: InputMaybe<Array<GroupWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GroupScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  set?: InputMaybe<Array<GroupWhereUniqueInput>>;
  update?: InputMaybe<Array<GroupUpdateWithWhereUniqueWithoutOffendersInput>>;
  updateMany?: InputMaybe<Array<GroupUpdateManyWithWhereWithoutOffendersInput>>;
  upsert?: InputMaybe<Array<GroupUpsertWithWhereUniqueWithoutOffendersInput>>;
};

export type GroupUpdateManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<GroupCreateManySchemeInputEnvelope>;
  delete?: InputMaybe<Array<GroupWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GroupScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  set?: InputMaybe<Array<GroupWhereUniqueInput>>;
  update?: InputMaybe<Array<GroupUpdateWithWhereUniqueWithoutSchemeInput>>;
  updateMany?: InputMaybe<Array<GroupUpdateManyWithWhereWithoutSchemeInput>>;
  upsert?: InputMaybe<Array<GroupUpsertWithWhereUniqueWithoutSchemeInput>>;
};

export type GroupUpdateManyWithoutUsersInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutUsersInput>>;
  delete?: InputMaybe<Array<GroupWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GroupScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  set?: InputMaybe<Array<GroupWhereUniqueInput>>;
  update?: InputMaybe<Array<GroupUpdateWithWhereUniqueWithoutUsersInput>>;
  updateMany?: InputMaybe<Array<GroupUpdateManyWithWhereWithoutUsersInput>>;
  upsert?: InputMaybe<Array<GroupUpsertWithWhereUniqueWithoutUsersInput>>;
};

export type GroupUpdateOneWithoutActionsInput = {
  connect?: InputMaybe<GroupWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GroupCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<GroupCreateWithoutActionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<GroupUpdateWithoutActionsInput>;
  upsert?: InputMaybe<GroupUpsertWithoutActionsInput>;
};

export type GroupUpdateWithWhereUniqueWithoutIncidentsInput = {
  data: GroupUpdateWithoutIncidentsInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpdateWithWhereUniqueWithoutOffendersInput = {
  data: GroupUpdateWithoutOffendersInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpdateWithWhereUniqueWithoutSchemeInput = {
  data: GroupUpdateWithoutSchemeInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpdateWithWhereUniqueWithoutUsersInput = {
  data: GroupUpdateWithoutUsersInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpdateWithoutActionsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutGroupsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutGroupsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutGroupsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutGroupsInput>;
};

export type GroupUpdateWithoutIncidentsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutGroupsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutGroupsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutGroupsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutGroupsInput>;
};

export type GroupUpdateWithoutOffendersInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutGroupsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutGroupsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutGroupsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutGroupsInput>;
};

export type GroupUpdateWithoutSchemeInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutGroupsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutGroupsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutGroupsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutGroupsInput>;
};

export type GroupUpdateWithoutUsersInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutGroupsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutGroupsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutGroupsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutGroupsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type GroupUpsertWithWhereUniqueWithoutIncidentsInput = {
  create: GroupCreateWithoutIncidentsInput;
  update: GroupUpdateWithoutIncidentsInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpsertWithWhereUniqueWithoutOffendersInput = {
  create: GroupCreateWithoutOffendersInput;
  update: GroupUpdateWithoutOffendersInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpsertWithWhereUniqueWithoutSchemeInput = {
  create: GroupCreateWithoutSchemeInput;
  update: GroupUpdateWithoutSchemeInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpsertWithWhereUniqueWithoutUsersInput = {
  create: GroupCreateWithoutUsersInput;
  update: GroupUpdateWithoutUsersInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpsertWithoutActionsInput = {
  create: GroupCreateWithoutActionsInput;
  update: GroupUpdateWithoutActionsInput;
};

export type GroupWhereInput = {
  AND?: InputMaybe<Array<GroupWhereInput>>;
  NOT?: InputMaybe<Array<GroupWhereInput>>;
  OR?: InputMaybe<Array<GroupWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type GroupWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Image = {
  __typename?: 'Image';
  actions: Array<Action>;
  card?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  incident?: Maybe<Incident>;
  low?: Maybe<Scalars['String']>;
  offenders: Array<Offender>;
  optimised?: Maybe<Scalars['String']>;
  scheme: Scheme;
  updatedAt: Scalars['DateTime'];
  uploaded: Scalars['Boolean'];
  uploadedBy: User;
  url?: Maybe<Scalars['String']>;
};


export type ImageActionsArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};


export type ImageOffendersArgs = {
  after?: InputMaybe<OffenderWhereUniqueInput>;
  before?: InputMaybe<OffenderWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  where?: InputMaybe<OffenderWhereInput>;
};

export type ImageCreateInput = {
  Scheme?: InputMaybe<SchemeCreateNestedManyWithoutLogoInput>;
  actions?: InputMaybe<ActionCreateNestedManyWithoutImagesInput>;
  card?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileNames?: InputMaybe<ImageCreatefileNamesInput>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutImagesInput>;
  intel?: InputMaybe<IntelCreateNestedOneWithoutImageInput>;
  low?: InputMaybe<Scalars['String']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutImagesInput>;
  optimised?: InputMaybe<Scalars['String']>;
  scheme: SchemeCreateNestedOneWithoutImagesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  uploadedBy: UserCreateNestedOneWithoutImagesInput;
  url?: InputMaybe<Scalars['String']>;
};

export type ImageCreateManyIncidentInput = {
  card?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileNames?: InputMaybe<ImageCreatefileNamesInput>;
  id?: InputMaybe<Scalars['String']>;
  low?: InputMaybe<Scalars['String']>;
  optimised?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  uploadedById: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

export type ImageCreateManyIncidentInputEnvelope = {
  data?: InputMaybe<Array<ImageCreateManyIncidentInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ImageCreateManySchemeInput = {
  card?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileNames?: InputMaybe<ImageCreatefileNamesInput>;
  id?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  low?: InputMaybe<Scalars['String']>;
  optimised?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  uploadedById: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

export type ImageCreateManySchemeInputEnvelope = {
  data?: InputMaybe<Array<ImageCreateManySchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ImageCreateManyUploadedByInput = {
  card?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileNames?: InputMaybe<ImageCreatefileNamesInput>;
  id?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  low?: InputMaybe<Scalars['String']>;
  optimised?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ImageCreateManyUploadedByInputEnvelope = {
  data?: InputMaybe<Array<ImageCreateManyUploadedByInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ImageCreateNestedManyWithoutIncidentInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ImageCreateOrConnectWithoutIncidentInput>>;
  create?: InputMaybe<Array<ImageCreateWithoutIncidentInput>>;
  createMany?: InputMaybe<ImageCreateManyIncidentInputEnvelope>;
};

export type ImageCreateNestedManyWithoutOffendersInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ImageCreateOrConnectWithoutOffendersInput>>;
  create?: InputMaybe<Array<ImageCreateWithoutOffendersInput>>;
  upload?: InputMaybe<Array<InputMaybe<UploadOffenderImage>>>;
};

export type ImageCreateNestedManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ImageCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<ImageCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<ImageCreateManySchemeInputEnvelope>;
};

export type ImageCreateNestedManyWithoutUploadedByInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ImageCreateOrConnectWithoutUploadedByInput>>;
  create?: InputMaybe<Array<ImageCreateWithoutUploadedByInput>>;
  createMany?: InputMaybe<ImageCreateManyUploadedByInputEnvelope>;
};

export type ImageCreateNestedOneWithoutActionsInput = {
  connect?: InputMaybe<ImageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ImageCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<ImageCreateWithoutActionsInput>;
};

export type ImageCreateNestedOneWithoutIntelInput = {
  connect?: InputMaybe<ImageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ImageCreateOrConnectWithoutIntelInput>;
  create?: InputMaybe<ImageCreateWithoutIntelInput>;
};

export type ImageCreateNestedOneWithoutSchemeInput = {
  connect?: InputMaybe<ImageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ImageCreateOrConnectWithoutSchemeInput>;
  create?: InputMaybe<ImageCreateWithoutSchemeInput>;
};

export type ImageCreateOrConnectWithoutActionsInput = {
  create: ImageCreateWithoutActionsInput;
  where: ImageWhereUniqueInput;
};

export type ImageCreateOrConnectWithoutIncidentInput = {
  create: ImageCreateWithoutIncidentInput;
  where: ImageWhereUniqueInput;
};

export type ImageCreateOrConnectWithoutIntelInput = {
  create: ImageCreateWithoutIntelInput;
  where: ImageWhereUniqueInput;
};

export type ImageCreateOrConnectWithoutOffendersInput = {
  create: ImageCreateWithoutOffendersInput;
  where: ImageWhereUniqueInput;
};

export type ImageCreateOrConnectWithoutSchemeInput = {
  create: ImageCreateWithoutSchemeInput;
  where: ImageWhereUniqueInput;
};

export type ImageCreateOrConnectWithoutUploadedByInput = {
  create: ImageCreateWithoutUploadedByInput;
  where: ImageWhereUniqueInput;
};

export type ImageCreateWithoutActionsInput = {
  Scheme?: InputMaybe<SchemeCreateNestedManyWithoutLogoInput>;
  card?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileNames?: InputMaybe<ImageCreatefileNamesInput>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutImagesInput>;
  intel?: InputMaybe<IntelCreateNestedOneWithoutImageInput>;
  low?: InputMaybe<Scalars['String']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutImagesInput>;
  optimised?: InputMaybe<Scalars['String']>;
  scheme: SchemeCreateNestedOneWithoutImagesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  uploadedBy: UserCreateNestedOneWithoutImagesInput;
  url?: InputMaybe<Scalars['String']>;
};

export type ImageCreateWithoutIncidentInput = {
  Scheme?: InputMaybe<SchemeCreateNestedManyWithoutLogoInput>;
  actions?: InputMaybe<ActionCreateNestedManyWithoutImagesInput>;
  card?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileNames?: InputMaybe<ImageCreatefileNamesInput>;
  id?: InputMaybe<Scalars['String']>;
  intel?: InputMaybe<IntelCreateNestedOneWithoutImageInput>;
  low?: InputMaybe<Scalars['String']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutImagesInput>;
  optimised?: InputMaybe<Scalars['String']>;
  scheme: SchemeCreateNestedOneWithoutImagesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  upload: Array<InputMaybe<UploadIncidentImage>>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  uploadedBy: UserCreateNestedOneWithoutImagesInput;
  url?: InputMaybe<Scalars['String']>;
};

export type ImageCreateWithoutIntelInput = {
  Scheme?: InputMaybe<SchemeCreateNestedManyWithoutLogoInput>;
  actions?: InputMaybe<ActionCreateNestedManyWithoutImagesInput>;
  card?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileNames?: InputMaybe<ImageCreatefileNamesInput>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutImagesInput>;
  low?: InputMaybe<Scalars['String']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutImagesInput>;
  optimised?: InputMaybe<Scalars['String']>;
  scheme: SchemeCreateNestedOneWithoutImagesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  uploadedBy: UserCreateNestedOneWithoutImagesInput;
  url?: InputMaybe<Scalars['String']>;
};

export type ImageCreateWithoutOffendersInput = {
  Scheme?: InputMaybe<SchemeCreateNestedManyWithoutLogoInput>;
  actions?: InputMaybe<ActionCreateNestedManyWithoutImagesInput>;
  card?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileNames?: InputMaybe<ImageCreatefileNamesInput>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutImagesInput>;
  intel?: InputMaybe<IntelCreateNestedOneWithoutImageInput>;
  low?: InputMaybe<Scalars['String']>;
  optimised?: InputMaybe<Scalars['String']>;
  scheme: SchemeCreateNestedOneWithoutImagesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  uploadedBy: UserCreateNestedOneWithoutImagesInput;
  url?: InputMaybe<Scalars['String']>;
};

export type ImageCreateWithoutSchemeInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutImagesInput>;
  card?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileNames?: InputMaybe<ImageCreatefileNamesInput>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutImagesInput>;
  intel?: InputMaybe<IntelCreateNestedOneWithoutImageInput>;
  low?: InputMaybe<Scalars['String']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutImagesInput>;
  optimised?: InputMaybe<Scalars['String']>;
  scheme: SchemeCreateNestedOneWithoutImagesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  uploadedBy: UserCreateNestedOneWithoutImagesInput;
  url?: InputMaybe<Scalars['String']>;
};

export type ImageCreateWithoutUploadedByInput = {
  Scheme?: InputMaybe<SchemeCreateNestedManyWithoutLogoInput>;
  actions?: InputMaybe<ActionCreateNestedManyWithoutImagesInput>;
  card?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileNames?: InputMaybe<ImageCreatefileNamesInput>;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutImagesInput>;
  intel?: InputMaybe<IntelCreateNestedOneWithoutImageInput>;
  low?: InputMaybe<Scalars['String']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutImagesInput>;
  optimised?: InputMaybe<Scalars['String']>;
  scheme: SchemeCreateNestedOneWithoutImagesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ImageCreatefileNamesInput = {
  set?: InputMaybe<Array<Scalars['String']>>;
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
  card?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  fileNames?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  intel?: InputMaybe<IntelOrderByWithRelationInput>;
  low?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  optimised?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uploaded?: InputMaybe<SortOrder>;
  uploadedBy?: InputMaybe<UserOrderByWithRelationInput>;
  uploadedById?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type ImageScalarWhereInput = {
  AND?: InputMaybe<Array<ImageScalarWhereInput>>;
  NOT?: InputMaybe<Array<ImageScalarWhereInput>>;
  OR?: InputMaybe<Array<ImageScalarWhereInput>>;
  card?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  fileNames?: InputMaybe<StringNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  low?: InputMaybe<StringNullableFilter>;
  optimised?: InputMaybe<StringNullableFilter>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
  uploadedById?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringNullableFilter>;
};

export type ImageUpdateInput = {
  Scheme?: InputMaybe<SchemeUpdateManyWithoutLogoInput>;
  actions?: InputMaybe<ActionUpdateManyWithoutImagesInput>;
  card?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileNames?: InputMaybe<ImageUpdatefileNamesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutImagesInput>;
  intel?: InputMaybe<IntelUpdateOneWithoutImageInput>;
  low?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutImagesInput>;
  optimised?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutImagesInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  uploadedBy?: InputMaybe<UserUpdateOneRequiredWithoutImagesInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ImageUpdateManyMutationInput = {
  card?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileNames?: InputMaybe<ImageUpdatefileNamesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  low?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  optimised?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ImageUpdateManyWithWhereWithoutIncidentInput = {
  data: ImageUpdateManyMutationInput;
  where: ImageScalarWhereInput;
};

export type ImageUpdateManyWithWhereWithoutOffendersInput = {
  data: ImageUpdateManyMutationInput;
  where: ImageScalarWhereInput;
};

export type ImageUpdateManyWithWhereWithoutSchemeInput = {
  data: ImageUpdateManyMutationInput;
  where: ImageScalarWhereInput;
};

export type ImageUpdateManyWithWhereWithoutUploadedByInput = {
  data: ImageUpdateManyMutationInput;
  where: ImageScalarWhereInput;
};

export type ImageUpdateManyWithoutIncidentInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ImageCreateOrConnectWithoutIncidentInput>>;
  create?: InputMaybe<Array<ImageCreateWithoutIncidentInput>>;
  createMany?: InputMaybe<ImageCreateManyIncidentInputEnvelope>;
  delete?: InputMaybe<Array<ImageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ImageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  set?: InputMaybe<Array<ImageWhereUniqueInput>>;
  update?: InputMaybe<Array<ImageUpdateWithWhereUniqueWithoutIncidentInput>>;
  updateMany?: InputMaybe<Array<ImageUpdateManyWithWhereWithoutIncidentInput>>;
  upload?: InputMaybe<Array<InputMaybe<UploadIncidentImage>>>;
  upsert?: InputMaybe<Array<ImageUpsertWithWhereUniqueWithoutIncidentInput>>;
};

export type ImageUpdateManyWithoutOffendersInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ImageCreateOrConnectWithoutOffendersInput>>;
  create?: InputMaybe<Array<ImageCreateWithoutOffendersInput>>;
  delete?: InputMaybe<Array<ImageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ImageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  set?: InputMaybe<Array<ImageWhereUniqueInput>>;
  update?: InputMaybe<Array<ImageUpdateWithWhereUniqueWithoutOffendersInput>>;
  updateMany?: InputMaybe<Array<ImageUpdateManyWithWhereWithoutOffendersInput>>;
  upload?: InputMaybe<Array<InputMaybe<UploadOffenderImage>>>;
  upsert?: InputMaybe<Array<ImageUpsertWithWhereUniqueWithoutOffendersInput>>;
};

export type ImageUpdateManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ImageCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<ImageCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<ImageCreateManySchemeInputEnvelope>;
  delete?: InputMaybe<Array<ImageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ImageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  set?: InputMaybe<Array<ImageWhereUniqueInput>>;
  update?: InputMaybe<Array<ImageUpdateWithWhereUniqueWithoutSchemeInput>>;
  updateMany?: InputMaybe<Array<ImageUpdateManyWithWhereWithoutSchemeInput>>;
  upsert?: InputMaybe<Array<ImageUpsertWithWhereUniqueWithoutSchemeInput>>;
};

export type ImageUpdateManyWithoutUploadedByInput = {
  connect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ImageCreateOrConnectWithoutUploadedByInput>>;
  create?: InputMaybe<Array<ImageCreateWithoutUploadedByInput>>;
  createMany?: InputMaybe<ImageCreateManyUploadedByInputEnvelope>;
  delete?: InputMaybe<Array<ImageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ImageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ImageWhereUniqueInput>>;
  set?: InputMaybe<Array<ImageWhereUniqueInput>>;
  update?: InputMaybe<Array<ImageUpdateWithWhereUniqueWithoutUploadedByInput>>;
  updateMany?: InputMaybe<Array<ImageUpdateManyWithWhereWithoutUploadedByInput>>;
  upsert?: InputMaybe<Array<ImageUpsertWithWhereUniqueWithoutUploadedByInput>>;
};

export type ImageUpdateOneWithoutActionsInput = {
  connect?: InputMaybe<ImageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ImageCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<ImageCreateWithoutActionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ImageUpdateWithoutActionsInput>;
  upsert?: InputMaybe<ImageUpsertWithoutActionsInput>;
};

export type ImageUpdateOneWithoutIntelInput = {
  connect?: InputMaybe<ImageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ImageCreateOrConnectWithoutIntelInput>;
  create?: InputMaybe<ImageCreateWithoutIntelInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ImageUpdateWithoutIntelInput>;
  upsert?: InputMaybe<ImageUpsertWithoutIntelInput>;
};

export type ImageUpdateOneWithoutSchemeInput = {
  connect?: InputMaybe<ImageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ImageCreateOrConnectWithoutSchemeInput>;
  create?: InputMaybe<ImageCreateWithoutSchemeInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ImageUpdateWithoutSchemeInput>;
  upload?: InputMaybe<UploadSchemeImage>;
  upsert?: InputMaybe<ImageUpsertWithoutSchemeInput>;
};

export type ImageUpdateWithWhereUniqueWithoutIncidentInput = {
  data: ImageUpdateWithoutIncidentInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpdateWithWhereUniqueWithoutOffendersInput = {
  data: ImageUpdateWithoutOffendersInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpdateWithWhereUniqueWithoutSchemeInput = {
  data: ImageUpdateWithoutSchemeInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpdateWithWhereUniqueWithoutUploadedByInput = {
  data: ImageUpdateWithoutUploadedByInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpdateWithoutActionsInput = {
  Scheme?: InputMaybe<SchemeUpdateManyWithoutLogoInput>;
  card?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileNames?: InputMaybe<ImageUpdatefileNamesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutImagesInput>;
  intel?: InputMaybe<IntelUpdateOneWithoutImageInput>;
  low?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutImagesInput>;
  optimised?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutImagesInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  uploadedBy?: InputMaybe<UserUpdateOneRequiredWithoutImagesInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ImageUpdateWithoutIncidentInput = {
  Scheme?: InputMaybe<SchemeUpdateManyWithoutLogoInput>;
  actions?: InputMaybe<ActionUpdateManyWithoutImagesInput>;
  card?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileNames?: InputMaybe<ImageUpdatefileNamesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  intel?: InputMaybe<IntelUpdateOneWithoutImageInput>;
  low?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutImagesInput>;
  optimised?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutImagesInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  uploadedBy?: InputMaybe<UserUpdateOneRequiredWithoutImagesInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ImageUpdateWithoutIntelInput = {
  Scheme?: InputMaybe<SchemeUpdateManyWithoutLogoInput>;
  actions?: InputMaybe<ActionUpdateManyWithoutImagesInput>;
  card?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileNames?: InputMaybe<ImageUpdatefileNamesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutImagesInput>;
  low?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutImagesInput>;
  optimised?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutImagesInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  uploadedBy?: InputMaybe<UserUpdateOneRequiredWithoutImagesInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ImageUpdateWithoutOffendersInput = {
  Scheme?: InputMaybe<SchemeUpdateManyWithoutLogoInput>;
  actions?: InputMaybe<ActionUpdateManyWithoutImagesInput>;
  card?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileNames?: InputMaybe<ImageUpdatefileNamesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutImagesInput>;
  intel?: InputMaybe<IntelUpdateOneWithoutImageInput>;
  low?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  optimised?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutImagesInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  uploadedBy?: InputMaybe<UserUpdateOneRequiredWithoutImagesInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ImageUpdateWithoutSchemeInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutImagesInput>;
  card?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileNames?: InputMaybe<ImageUpdatefileNamesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutImagesInput>;
  intel?: InputMaybe<IntelUpdateOneWithoutImageInput>;
  low?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutImagesInput>;
  optimised?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutImagesInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  uploadedBy?: InputMaybe<UserUpdateOneRequiredWithoutImagesInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ImageUpdateWithoutUploadedByInput = {
  Scheme?: InputMaybe<SchemeUpdateManyWithoutLogoInput>;
  actions?: InputMaybe<ActionUpdateManyWithoutImagesInput>;
  card?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  fileNames?: InputMaybe<ImageUpdatefileNamesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutImagesInput>;
  intel?: InputMaybe<IntelUpdateOneWithoutImageInput>;
  low?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutImagesInput>;
  optimised?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutImagesInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
  url?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type ImageUpdatefileNamesInput = {
  push?: InputMaybe<Scalars['String']>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ImageUpsertWithWhereUniqueWithoutIncidentInput = {
  create: ImageCreateWithoutIncidentInput;
  update: ImageUpdateWithoutIncidentInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpsertWithWhereUniqueWithoutOffendersInput = {
  create: ImageCreateWithoutOffendersInput;
  update: ImageUpdateWithoutOffendersInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpsertWithWhereUniqueWithoutSchemeInput = {
  create: ImageCreateWithoutSchemeInput;
  update: ImageUpdateWithoutSchemeInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpsertWithWhereUniqueWithoutUploadedByInput = {
  create: ImageCreateWithoutUploadedByInput;
  update: ImageUpdateWithoutUploadedByInput;
  where: ImageWhereUniqueInput;
};

export type ImageUpsertWithoutActionsInput = {
  create: ImageCreateWithoutActionsInput;
  update: ImageUpdateWithoutActionsInput;
};

export type ImageUpsertWithoutIntelInput = {
  create: ImageCreateWithoutIntelInput;
  update: ImageUpdateWithoutIntelInput;
};

export type ImageUpsertWithoutSchemeInput = {
  create: ImageCreateWithoutSchemeInput;
  update: ImageUpdateWithoutSchemeInput;
};

export type ImageWhereInput = {
  AND?: InputMaybe<Array<ImageWhereInput>>;
  NOT?: InputMaybe<Array<ImageWhereInput>>;
  OR?: InputMaybe<Array<ImageWhereInput>>;
  Scheme?: InputMaybe<SchemeListRelationFilter>;
  actions?: InputMaybe<ActionListRelationFilter>;
  card?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  fileNames?: InputMaybe<StringNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  intel?: InputMaybe<IntelWhereInput>;
  low?: InputMaybe<StringNullableFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  optimised?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
  uploadedBy?: InputMaybe<UserWhereInput>;
  uploadedById?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringNullableFilter>;
};

export type ImageWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Incident = {
  __typename?: 'Incident';
  actions: Array<Action>;
  approved?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  crimeTypes: Array<Tag>;
  date: Scalars['DateTime'];
  dayTime?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  groups: Array<Group>;
  id: Scalars['String'];
  images: Array<Image>;
  intel: Array<Intel>;
  location?: Maybe<Address>;
  offenders: Array<Offender>;
  recycleBin?: Maybe<RecycledItem>;
  recycled: Scalars['Boolean'];
  scheme: Scheme;
  subject?: Maybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  uploaded?: Maybe<Scalars['Boolean']>;
};


export type IncidentActionsArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};


export type IncidentCrimeTypesArgs = {
  after?: InputMaybe<TagWhereUniqueInput>;
  before?: InputMaybe<TagWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  where?: InputMaybe<TagWhereInput>;
};


export type IncidentGroupsArgs = {
  after?: InputMaybe<GroupWhereUniqueInput>;
  before?: InputMaybe<GroupWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  where?: InputMaybe<GroupWhereInput>;
};


export type IncidentImagesArgs = {
  after?: InputMaybe<ImageWhereUniqueInput>;
  before?: InputMaybe<ImageWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  where?: InputMaybe<ImageWhereInput>;
};


export type IncidentIntelArgs = {
  after?: InputMaybe<IntelWhereUniqueInput>;
  before?: InputMaybe<IntelWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<IntelOrderByWithRelationInput>>;
  where?: InputMaybe<IntelWhereInput>;
};


export type IncidentOffendersArgs = {
  after?: InputMaybe<OffenderWhereUniqueInput>;
  before?: InputMaybe<OffenderWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  where?: InputMaybe<OffenderWhereInput>;
};

export type IncidentConnectOne = {
  connect: IncidentWhereUniqueInput;
};

export type IncidentCreateInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutIncidentInput>;
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIncidentsInput;
  crimeTypes?: InputMaybe<TagCreateNestedManyWithoutIncidentsInput>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutIncidentsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutIncidentInput>;
  location?: InputMaybe<AddressCreateNestedOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutIncidentInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutIncidentsInput;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateManyCreatedByInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  schemeId: Scalars['String'];
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateManyCreatedByInputEnvelope = {
  data?: InputMaybe<Array<IncidentCreateManyCreatedByInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateManySchemeInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdById: Scalars['String'];
  date: Scalars['DateTime'];
  description: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateManySchemeInputEnvelope = {
  data?: InputMaybe<Array<IncidentCreateManySchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateNestedManyWithoutCreatedByInput = {
  connect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncidentCreateOrConnectWithoutCreatedByInput>>;
  create?: InputMaybe<Array<IncidentCreateWithoutCreatedByInput>>;
  createMany?: InputMaybe<IncidentCreateManyCreatedByInputEnvelope>;
};

export type IncidentCreateNestedManyWithoutCrimeTypesInput = {
  connect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncidentCreateOrConnectWithoutCrimeTypesInput>>;
  create?: InputMaybe<Array<IncidentCreateWithoutCrimeTypesInput>>;
};

export type IncidentCreateNestedManyWithoutGroupsInput = {
  connect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncidentCreateOrConnectWithoutGroupsInput>>;
  create?: InputMaybe<Array<IncidentCreateWithoutGroupsInput>>;
};

export type IncidentCreateNestedManyWithoutOffendersInput = {
  connect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncidentCreateOrConnectWithoutOffendersInput>>;
  create?: InputMaybe<Array<IncidentCreateWithoutOffendersInput>>;
};

export type IncidentCreateNestedManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncidentCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<IncidentCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<IncidentCreateManySchemeInputEnvelope>;
};

export type IncidentCreateNestedOneWithoutActionsInput = {
  connect?: InputMaybe<IncidentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IncidentCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<IncidentCreateWithoutActionsInput>;
};

export type IncidentCreateNestedOneWithoutImagesInput = {
  connect?: InputMaybe<IncidentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IncidentCreateOrConnectWithoutImagesInput>;
  create?: InputMaybe<IncidentCreateWithoutImagesInput>;
};

export type IncidentCreateNestedOneWithoutIntelInput = {
  connect?: InputMaybe<IncidentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IncidentCreateOrConnectWithoutIntelInput>;
  create?: InputMaybe<IncidentCreateWithoutIntelInput>;
};

export type IncidentCreateNestedOneWithoutLocationInput = {
  connect?: InputMaybe<IncidentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IncidentCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<IncidentCreateWithoutLocationInput>;
};

export type IncidentCreateNestedOneWithoutRecycleBinInput = {
  connect?: InputMaybe<IncidentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IncidentCreateOrConnectWithoutRecycleBinInput>;
  create?: InputMaybe<IncidentCreateWithoutRecycleBinInput>;
};

export type IncidentCreateOrConnectWithoutActionsInput = {
  create: IncidentCreateWithoutActionsInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentCreateOrConnectWithoutCreatedByInput = {
  create: IncidentCreateWithoutCreatedByInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentCreateOrConnectWithoutCrimeTypesInput = {
  create: IncidentCreateWithoutCrimeTypesInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentCreateOrConnectWithoutGroupsInput = {
  create: IncidentCreateWithoutGroupsInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentCreateOrConnectWithoutImagesInput = {
  create: IncidentCreateWithoutImagesInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentCreateOrConnectWithoutIntelInput = {
  create: IncidentCreateWithoutIntelInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentCreateOrConnectWithoutLocationInput = {
  create: IncidentCreateWithoutLocationInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentCreateOrConnectWithoutOffendersInput = {
  create: IncidentCreateWithoutOffendersInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentCreateOrConnectWithoutRecycleBinInput = {
  create: IncidentCreateWithoutRecycleBinInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentCreateOrConnectWithoutSchemeInput = {
  create: IncidentCreateWithoutSchemeInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentCreateWithoutActionsInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIncidentsInput;
  crimeTypes?: InputMaybe<TagCreateNestedManyWithoutIncidentsInput>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutIncidentsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutIncidentInput>;
  location?: InputMaybe<AddressCreateNestedOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutIncidentInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutIncidentsInput;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateWithoutCreatedByInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutIncidentInput>;
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  crimeTypes?: InputMaybe<TagCreateNestedManyWithoutIncidentsInput>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutIncidentsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutIncidentInput>;
  location?: InputMaybe<AddressCreateNestedOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutIncidentInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutIncidentsInput;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateWithoutCrimeTypesInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutIncidentInput>;
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIncidentsInput;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutIncidentsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutIncidentInput>;
  location?: InputMaybe<AddressCreateNestedOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutIncidentInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutIncidentsInput;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateWithoutGroupsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutIncidentInput>;
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIncidentsInput;
  crimeTypes?: InputMaybe<TagCreateNestedManyWithoutIncidentsInput>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutIncidentInput>;
  location?: InputMaybe<AddressCreateNestedOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutIncidentInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutIncidentsInput;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateWithoutImagesInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutIncidentInput>;
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIncidentsInput;
  crimeTypes?: InputMaybe<TagCreateNestedManyWithoutIncidentsInput>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutIncidentsInput>;
  id?: InputMaybe<Scalars['String']>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutIncidentInput>;
  location?: InputMaybe<AddressCreateNestedOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutIncidentInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutIncidentsInput;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateWithoutIntelInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutIncidentInput>;
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIncidentsInput;
  crimeTypes?: InputMaybe<TagCreateNestedManyWithoutIncidentsInput>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutIncidentsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutIncidentInput>;
  location?: InputMaybe<AddressCreateNestedOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutIncidentInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutIncidentsInput;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateWithoutLocationInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutIncidentInput>;
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIncidentsInput;
  crimeTypes?: InputMaybe<TagCreateNestedManyWithoutIncidentsInput>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutIncidentsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutIncidentInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutIncidentsInput;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateWithoutOffendersInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutIncidentInput>;
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIncidentsInput;
  crimeTypes?: InputMaybe<TagCreateNestedManyWithoutIncidentsInput>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutIncidentsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutIncidentInput>;
  location?: InputMaybe<AddressCreateNestedOneWithoutIncidentInput>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutIncidentInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutIncidentsInput;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateWithoutRecycleBinInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutIncidentInput>;
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIncidentsInput;
  crimeTypes?: InputMaybe<TagCreateNestedManyWithoutIncidentsInput>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutIncidentsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutIncidentInput>;
  location?: InputMaybe<AddressCreateNestedOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutIncidentsInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutIncidentsInput;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentCreateWithoutSchemeInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutIncidentInput>;
  approved?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIncidentsInput;
  crimeTypes?: InputMaybe<TagCreateNestedManyWithoutIncidentsInput>;
  date: Scalars['DateTime'];
  description: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutIncidentsInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutIncidentInput>;
  location?: InputMaybe<AddressCreateNestedOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutIncidentInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  subject?: InputMaybe<Scalars['String']>;
  time: Scalars['DateTime'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type IncidentListRelationFilter = {
  every?: InputMaybe<IncidentWhereInput>;
  none?: InputMaybe<IncidentWhereInput>;
  some?: InputMaybe<IncidentWhereInput>;
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
  approved?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  crimeTypes?: InputMaybe<TagOrderByRelationAggregateInput>;
  date?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  intel?: InputMaybe<IntelOrderByRelationAggregateInput>;
  location?: InputMaybe<AddressOrderByWithRelationInput>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  recycleBin?: InputMaybe<RecycledItemOrderByWithRelationInput>;
  recycled?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  subject?: InputMaybe<SortOrder>;
  time?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uploaded?: InputMaybe<SortOrder>;
};

export type IncidentScalarWhereInput = {
  AND?: InputMaybe<Array<IncidentScalarWhereInput>>;
  NOT?: InputMaybe<Array<IncidentScalarWhereInput>>;
  OR?: InputMaybe<Array<IncidentScalarWhereInput>>;
  approved?: InputMaybe<BoolNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringFilter>;
  date?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  recycled?: InputMaybe<BoolFilter>;
  schemeId?: InputMaybe<StringFilter>;
  subject?: InputMaybe<StringNullableFilter>;
  time?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
};

export type IncidentUpdateInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutIncidentInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIncidentsInput>;
  crimeTypes?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutIncidentsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutIncidentInput>;
  location?: InputMaybe<AddressUpdateOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutIncidentInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIncidentsInput>;
  subject?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  time?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type IncidentUpdateManyMutationInput = {
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  subject?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  time?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type IncidentUpdateManyWithWhereWithoutCreatedByInput = {
  data: IncidentUpdateManyMutationInput;
  where: IncidentScalarWhereInput;
};

export type IncidentUpdateManyWithWhereWithoutCrimeTypesInput = {
  data: IncidentUpdateManyMutationInput;
  where: IncidentScalarWhereInput;
};

export type IncidentUpdateManyWithWhereWithoutGroupsInput = {
  data: IncidentUpdateManyMutationInput;
  where: IncidentScalarWhereInput;
};

export type IncidentUpdateManyWithWhereWithoutOffendersInput = {
  data: IncidentUpdateManyMutationInput;
  where: IncidentScalarWhereInput;
};

export type IncidentUpdateManyWithWhereWithoutSchemeInput = {
  data: IncidentUpdateManyMutationInput;
  where: IncidentScalarWhereInput;
};

export type IncidentUpdateManyWithoutCreatedByInput = {
  connect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncidentCreateOrConnectWithoutCreatedByInput>>;
  create?: InputMaybe<Array<IncidentCreateWithoutCreatedByInput>>;
  createMany?: InputMaybe<IncidentCreateManyCreatedByInputEnvelope>;
  delete?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IncidentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  set?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  update?: InputMaybe<Array<IncidentUpdateWithWhereUniqueWithoutCreatedByInput>>;
  updateMany?: InputMaybe<Array<IncidentUpdateManyWithWhereWithoutCreatedByInput>>;
  upsert?: InputMaybe<Array<IncidentUpsertWithWhereUniqueWithoutCreatedByInput>>;
};

export type IncidentUpdateManyWithoutCrimeTypesInput = {
  connect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncidentCreateOrConnectWithoutCrimeTypesInput>>;
  create?: InputMaybe<Array<IncidentCreateWithoutCrimeTypesInput>>;
  delete?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IncidentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  set?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  update?: InputMaybe<Array<IncidentUpdateWithWhereUniqueWithoutCrimeTypesInput>>;
  updateMany?: InputMaybe<Array<IncidentUpdateManyWithWhereWithoutCrimeTypesInput>>;
  upsert?: InputMaybe<Array<IncidentUpsertWithWhereUniqueWithoutCrimeTypesInput>>;
};

export type IncidentUpdateManyWithoutGroupsInput = {
  connect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncidentCreateOrConnectWithoutGroupsInput>>;
  create?: InputMaybe<Array<IncidentCreateWithoutGroupsInput>>;
  delete?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IncidentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  set?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  update?: InputMaybe<Array<IncidentUpdateWithWhereUniqueWithoutGroupsInput>>;
  updateMany?: InputMaybe<Array<IncidentUpdateManyWithWhereWithoutGroupsInput>>;
  upsert?: InputMaybe<Array<IncidentUpsertWithWhereUniqueWithoutGroupsInput>>;
};

export type IncidentUpdateManyWithoutOffendersInput = {
  connect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncidentCreateOrConnectWithoutOffendersInput>>;
  create?: InputMaybe<Array<IncidentCreateWithoutOffendersInput>>;
  delete?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IncidentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  set?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  update?: InputMaybe<Array<IncidentUpdateWithWhereUniqueWithoutOffendersInput>>;
  updateMany?: InputMaybe<Array<IncidentUpdateManyWithWhereWithoutOffendersInput>>;
  upsert?: InputMaybe<Array<IncidentUpsertWithWhereUniqueWithoutOffendersInput>>;
};

export type IncidentUpdateManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IncidentCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<IncidentCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<IncidentCreateManySchemeInputEnvelope>;
  delete?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IncidentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  set?: InputMaybe<Array<IncidentWhereUniqueInput>>;
  update?: InputMaybe<Array<IncidentUpdateWithWhereUniqueWithoutSchemeInput>>;
  updateMany?: InputMaybe<Array<IncidentUpdateManyWithWhereWithoutSchemeInput>>;
  upsert?: InputMaybe<Array<IncidentUpsertWithWhereUniqueWithoutSchemeInput>>;
};

export type IncidentUpdateOneWithoutActionsInput = {
  connect?: InputMaybe<IncidentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IncidentCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<IncidentCreateWithoutActionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<IncidentUpdateWithoutActionsInput>;
  upsert?: InputMaybe<IncidentUpsertWithoutActionsInput>;
};

export type IncidentUpdateOneWithoutImagesInput = {
  connect?: InputMaybe<IncidentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IncidentCreateOrConnectWithoutImagesInput>;
  create?: InputMaybe<IncidentCreateWithoutImagesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<IncidentUpdateWithoutImagesInput>;
  upsert?: InputMaybe<IncidentUpsertWithoutImagesInput>;
};

export type IncidentUpdateOneWithoutIntelInput = {
  connect?: InputMaybe<IncidentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IncidentCreateOrConnectWithoutIntelInput>;
  create?: InputMaybe<IncidentCreateWithoutIntelInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<IncidentUpdateWithoutIntelInput>;
  upsert?: InputMaybe<IncidentUpsertWithoutIntelInput>;
};

export type IncidentUpdateOneWithoutLocationInput = {
  connect?: InputMaybe<IncidentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IncidentCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<IncidentCreateWithoutLocationInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<IncidentUpdateWithoutLocationInput>;
  upsert?: InputMaybe<IncidentUpsertWithoutLocationInput>;
};

export type IncidentUpdateOneWithoutRecycleBinInput = {
  connect?: InputMaybe<IncidentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IncidentCreateOrConnectWithoutRecycleBinInput>;
  create?: InputMaybe<IncidentCreateWithoutRecycleBinInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<IncidentUpdateWithoutRecycleBinInput>;
  upsert?: InputMaybe<IncidentUpsertWithoutRecycleBinInput>;
};

export type IncidentUpdateWithWhereUniqueWithoutCreatedByInput = {
  data: IncidentUpdateWithoutCreatedByInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentUpdateWithWhereUniqueWithoutCrimeTypesInput = {
  data: IncidentUpdateWithoutCrimeTypesInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentUpdateWithWhereUniqueWithoutGroupsInput = {
  data: IncidentUpdateWithoutGroupsInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentUpdateWithWhereUniqueWithoutOffendersInput = {
  data: IncidentUpdateWithoutOffendersInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentUpdateWithWhereUniqueWithoutSchemeInput = {
  data: IncidentUpdateWithoutSchemeInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentUpdateWithoutActionsInput = {
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIncidentsInput>;
  crimeTypes?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutIncidentsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutIncidentInput>;
  location?: InputMaybe<AddressUpdateOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutIncidentInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIncidentsInput>;
  subject?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  time?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type IncidentUpdateWithoutCreatedByInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutIncidentInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  crimeTypes?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutIncidentsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutIncidentInput>;
  location?: InputMaybe<AddressUpdateOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutIncidentInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIncidentsInput>;
  subject?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  time?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type IncidentUpdateWithoutCrimeTypesInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutIncidentInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIncidentsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutIncidentsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutIncidentInput>;
  location?: InputMaybe<AddressUpdateOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutIncidentInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIncidentsInput>;
  subject?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  time?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type IncidentUpdateWithoutGroupsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutIncidentInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIncidentsInput>;
  crimeTypes?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutIncidentInput>;
  location?: InputMaybe<AddressUpdateOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutIncidentInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIncidentsInput>;
  subject?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  time?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type IncidentUpdateWithoutImagesInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutIncidentInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIncidentsInput>;
  crimeTypes?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutIncidentsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutIncidentInput>;
  location?: InputMaybe<AddressUpdateOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutIncidentInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIncidentsInput>;
  subject?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  time?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type IncidentUpdateWithoutIntelInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutIncidentInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIncidentsInput>;
  crimeTypes?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutIncidentsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutIncidentInput>;
  location?: InputMaybe<AddressUpdateOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutIncidentInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIncidentsInput>;
  subject?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  time?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type IncidentUpdateWithoutLocationInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutIncidentInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIncidentsInput>;
  crimeTypes?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutIncidentsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutIncidentInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIncidentsInput>;
  subject?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  time?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type IncidentUpdateWithoutOffendersInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutIncidentInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIncidentsInput>;
  crimeTypes?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutIncidentsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutIncidentInput>;
  location?: InputMaybe<AddressUpdateOneWithoutIncidentInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutIncidentInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIncidentsInput>;
  subject?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  time?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type IncidentUpdateWithoutRecycleBinInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutIncidentInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIncidentsInput>;
  crimeTypes?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutIncidentsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutIncidentInput>;
  location?: InputMaybe<AddressUpdateOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutIncidentsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIncidentsInput>;
  subject?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  time?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type IncidentUpdateWithoutSchemeInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutIncidentInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIncidentsInput>;
  crimeTypes?: InputMaybe<TagUpdateManyWithoutIncidentsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutIncidentsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutIncidentInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutIncidentInput>;
  location?: InputMaybe<AddressUpdateOneWithoutIncidentInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutIncidentsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutIncidentInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  subject?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  time?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type IncidentUpsertWithWhereUniqueWithoutCreatedByInput = {
  create: IncidentCreateWithoutCreatedByInput;
  update: IncidentUpdateWithoutCreatedByInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentUpsertWithWhereUniqueWithoutCrimeTypesInput = {
  create: IncidentCreateWithoutCrimeTypesInput;
  update: IncidentUpdateWithoutCrimeTypesInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentUpsertWithWhereUniqueWithoutGroupsInput = {
  create: IncidentCreateWithoutGroupsInput;
  update: IncidentUpdateWithoutGroupsInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentUpsertWithWhereUniqueWithoutOffendersInput = {
  create: IncidentCreateWithoutOffendersInput;
  update: IncidentUpdateWithoutOffendersInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentUpsertWithWhereUniqueWithoutSchemeInput = {
  create: IncidentCreateWithoutSchemeInput;
  update: IncidentUpdateWithoutSchemeInput;
  where: IncidentWhereUniqueInput;
};

export type IncidentUpsertWithoutActionsInput = {
  create: IncidentCreateWithoutActionsInput;
  update: IncidentUpdateWithoutActionsInput;
};

export type IncidentUpsertWithoutImagesInput = {
  create: IncidentCreateWithoutImagesInput;
  update: IncidentUpdateWithoutImagesInput;
};

export type IncidentUpsertWithoutIntelInput = {
  create: IncidentCreateWithoutIntelInput;
  update: IncidentUpdateWithoutIntelInput;
};

export type IncidentUpsertWithoutLocationInput = {
  create: IncidentCreateWithoutLocationInput;
  update: IncidentUpdateWithoutLocationInput;
};

export type IncidentUpsertWithoutRecycleBinInput = {
  create: IncidentCreateWithoutRecycleBinInput;
  update: IncidentUpdateWithoutRecycleBinInput;
};

export type IncidentWhereInput = {
  AND?: InputMaybe<Array<IncidentWhereInput>>;
  NOT?: InputMaybe<Array<IncidentWhereInput>>;
  OR?: InputMaybe<Array<IncidentWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  approved?: InputMaybe<BoolNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  crimeTypes?: InputMaybe<TagListRelationFilter>;
  date?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  location?: InputMaybe<AddressWhereInput>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  recycleBin?: InputMaybe<RecycledItemWhereInput>;
  recycled?: InputMaybe<BoolFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  subject?: InputMaybe<StringNullableFilter>;
  time?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
};

export type IncidentWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
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

export type Intel = {
  __typename?: 'Intel';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  id: Scalars['String'];
  image?: Maybe<Image>;
  incident?: Maybe<Incident>;
  offender?: Maybe<Offender>;
  suggestedOffender?: Maybe<Offender>;
  text?: Maybe<Scalars['String']>;
  type: IntelType;
  updatedAt: Scalars['DateTime'];
};

export type IntelCreateManyCreatedByInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  suggestedOffenderId?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<IntelType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type IntelCreateManyCreatedByInputEnvelope = {
  data?: InputMaybe<Array<IntelCreateManyCreatedByInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type IntelCreateManyIncidentInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdById: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  suggestedOffenderId?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<IntelType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type IntelCreateManyIncidentInputEnvelope = {
  data?: InputMaybe<Array<IntelCreateManyIncidentInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type IntelCreateManyOffenderInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdById: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  suggestedOffenderId?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<IntelType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type IntelCreateManyOffenderInputEnvelope = {
  data?: InputMaybe<Array<IntelCreateManyOffenderInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type IntelCreateManySchemeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdById: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  suggestedOffenderId?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<IntelType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type IntelCreateManySchemeInputEnvelope = {
  data?: InputMaybe<Array<IntelCreateManySchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type IntelCreateManySuggestedOffenderInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdById: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<IntelType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type IntelCreateManySuggestedOffenderInputEnvelope = {
  data?: InputMaybe<Array<IntelCreateManySuggestedOffenderInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type IntelCreateNestedManyWithoutCreatedByInput = {
  connect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IntelCreateOrConnectWithoutCreatedByInput>>;
  create?: InputMaybe<Array<IntelCreateWithoutCreatedByInput>>;
  createMany?: InputMaybe<IntelCreateManyCreatedByInputEnvelope>;
};

export type IntelCreateNestedManyWithoutIncidentInput = {
  connect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IntelCreateOrConnectWithoutIncidentInput>>;
  create?: InputMaybe<Array<IntelCreateWithoutIncidentInput>>;
  createMany?: InputMaybe<IntelCreateManyIncidentInputEnvelope>;
};

export type IntelCreateNestedManyWithoutOffenderInput = {
  connect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IntelCreateOrConnectWithoutOffenderInput>>;
  create?: InputMaybe<Array<IntelCreateWithoutOffenderInput>>;
  createMany?: InputMaybe<IntelCreateManyOffenderInputEnvelope>;
};

export type IntelCreateNestedManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IntelCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<IntelCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<IntelCreateManySchemeInputEnvelope>;
};

export type IntelCreateNestedManyWithoutSuggestedOffenderInput = {
  connect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IntelCreateOrConnectWithoutSuggestedOffenderInput>>;
  create?: InputMaybe<Array<IntelCreateWithoutSuggestedOffenderInput>>;
  createMany?: InputMaybe<IntelCreateManySuggestedOffenderInputEnvelope>;
};

export type IntelCreateNestedOneWithoutImageInput = {
  connect?: InputMaybe<IntelWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IntelCreateOrConnectWithoutImageInput>;
  create?: InputMaybe<IntelCreateWithoutImageInput>;
};

export type IntelCreateOrConnectWithoutCreatedByInput = {
  create: IntelCreateWithoutCreatedByInput;
  where: IntelWhereUniqueInput;
};

export type IntelCreateOrConnectWithoutImageInput = {
  create: IntelCreateWithoutImageInput;
  where: IntelWhereUniqueInput;
};

export type IntelCreateOrConnectWithoutIncidentInput = {
  create: IntelCreateWithoutIncidentInput;
  where: IntelWhereUniqueInput;
};

export type IntelCreateOrConnectWithoutOffenderInput = {
  create: IntelCreateWithoutOffenderInput;
  where: IntelWhereUniqueInput;
};

export type IntelCreateOrConnectWithoutSchemeInput = {
  create: IntelCreateWithoutSchemeInput;
  where: IntelWhereUniqueInput;
};

export type IntelCreateOrConnectWithoutSuggestedOffenderInput = {
  create: IntelCreateWithoutSuggestedOffenderInput;
  where: IntelWhereUniqueInput;
};

export type IntelCreateWithoutCreatedByInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageCreateNestedOneWithoutIntelInput>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutIntelInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutIntelInput>;
  scheme: SchemeCreateNestedOneWithoutIntelInput;
  suggestedOffender?: InputMaybe<OffenderCreateNestedOneWithoutSuggestedIdsInput>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<IntelType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type IntelCreateWithoutImageInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIntelInput;
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutIntelInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutIntelInput>;
  scheme: SchemeCreateNestedOneWithoutIntelInput;
  suggestedOffender?: InputMaybe<OffenderCreateNestedOneWithoutSuggestedIdsInput>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<IntelType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type IntelCreateWithoutIncidentInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIntelInput;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageCreateNestedOneWithoutIntelInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutIntelInput>;
  scheme: SchemeCreateNestedOneWithoutIntelInput;
  suggestedOffender?: InputMaybe<OffenderCreateNestedOneWithoutSuggestedIdsInput>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<IntelType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type IntelCreateWithoutOffenderInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIntelInput;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageCreateNestedOneWithoutIntelInput>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutIntelInput>;
  scheme: SchemeCreateNestedOneWithoutIntelInput;
  suggestedOffender?: InputMaybe<OffenderCreateNestedOneWithoutSuggestedIdsInput>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<IntelType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type IntelCreateWithoutSchemeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIntelInput;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageCreateNestedOneWithoutIntelInput>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutIntelInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutIntelInput>;
  suggestedOffender?: InputMaybe<OffenderCreateNestedOneWithoutSuggestedIdsInput>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<IntelType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type IntelCreateWithoutSuggestedOffenderInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutIntelInput;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageCreateNestedOneWithoutIntelInput>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutIntelInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutIntelInput>;
  scheme: SchemeCreateNestedOneWithoutIntelInput;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<IntelType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type IntelListRelationFilter = {
  every?: InputMaybe<IntelWhereInput>;
  none?: InputMaybe<IntelWhereInput>;
  some?: InputMaybe<IntelWhereInput>;
};

export type IntelOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type IntelOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageOrderByWithRelationInput>;
  imageId?: InputMaybe<SortOrder>;
  incident?: InputMaybe<IncidentOrderByWithRelationInput>;
  incidentId?: InputMaybe<SortOrder>;
  offender?: InputMaybe<OffenderOrderByWithRelationInput>;
  offenderId?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  suggestedOffender?: InputMaybe<OffenderOrderByWithRelationInput>;
  suggestedOffenderId?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type IntelScalarWhereInput = {
  AND?: InputMaybe<Array<IntelScalarWhereInput>>;
  NOT?: InputMaybe<Array<IntelScalarWhereInput>>;
  OR?: InputMaybe<Array<IntelScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  imageId?: InputMaybe<StringNullableFilter>;
  incidentId?: InputMaybe<StringNullableFilter>;
  offenderId?: InputMaybe<StringNullableFilter>;
  schemeId?: InputMaybe<StringFilter>;
  suggestedOffenderId?: InputMaybe<StringNullableFilter>;
  text?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumIntelTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export enum IntelType {
  AddImage = 'ADD_IMAGE',
  AddOffender = 'ADD_OFFENDER',
  Comment = 'COMMENT',
  SuggestOffender = 'SUGGEST_OFFENDER'
}

export type IntelUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumIntelTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type IntelUpdateManyWithWhereWithoutCreatedByInput = {
  data: IntelUpdateManyMutationInput;
  where: IntelScalarWhereInput;
};

export type IntelUpdateManyWithWhereWithoutIncidentInput = {
  data: IntelUpdateManyMutationInput;
  where: IntelScalarWhereInput;
};

export type IntelUpdateManyWithWhereWithoutOffenderInput = {
  data: IntelUpdateManyMutationInput;
  where: IntelScalarWhereInput;
};

export type IntelUpdateManyWithWhereWithoutSchemeInput = {
  data: IntelUpdateManyMutationInput;
  where: IntelScalarWhereInput;
};

export type IntelUpdateManyWithWhereWithoutSuggestedOffenderInput = {
  data: IntelUpdateManyMutationInput;
  where: IntelScalarWhereInput;
};

export type IntelUpdateManyWithoutCreatedByInput = {
  connect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IntelCreateOrConnectWithoutCreatedByInput>>;
  create?: InputMaybe<Array<IntelCreateWithoutCreatedByInput>>;
  createMany?: InputMaybe<IntelCreateManyCreatedByInputEnvelope>;
  delete?: InputMaybe<Array<IntelWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IntelScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  set?: InputMaybe<Array<IntelWhereUniqueInput>>;
  update?: InputMaybe<Array<IntelUpdateWithWhereUniqueWithoutCreatedByInput>>;
  updateMany?: InputMaybe<Array<IntelUpdateManyWithWhereWithoutCreatedByInput>>;
  upsert?: InputMaybe<Array<IntelUpsertWithWhereUniqueWithoutCreatedByInput>>;
};

export type IntelUpdateManyWithoutIncidentInput = {
  connect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IntelCreateOrConnectWithoutIncidentInput>>;
  create?: InputMaybe<Array<IntelCreateWithoutIncidentInput>>;
  createMany?: InputMaybe<IntelCreateManyIncidentInputEnvelope>;
  delete?: InputMaybe<Array<IntelWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IntelScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  set?: InputMaybe<Array<IntelWhereUniqueInput>>;
  update?: InputMaybe<Array<IntelUpdateWithWhereUniqueWithoutIncidentInput>>;
  updateMany?: InputMaybe<Array<IntelUpdateManyWithWhereWithoutIncidentInput>>;
  upsert?: InputMaybe<Array<IntelUpsertWithWhereUniqueWithoutIncidentInput>>;
};

export type IntelUpdateManyWithoutOffenderInput = {
  connect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IntelCreateOrConnectWithoutOffenderInput>>;
  create?: InputMaybe<Array<IntelCreateWithoutOffenderInput>>;
  createMany?: InputMaybe<IntelCreateManyOffenderInputEnvelope>;
  delete?: InputMaybe<Array<IntelWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IntelScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  set?: InputMaybe<Array<IntelWhereUniqueInput>>;
  update?: InputMaybe<Array<IntelUpdateWithWhereUniqueWithoutOffenderInput>>;
  updateMany?: InputMaybe<Array<IntelUpdateManyWithWhereWithoutOffenderInput>>;
  upsert?: InputMaybe<Array<IntelUpsertWithWhereUniqueWithoutOffenderInput>>;
};

export type IntelUpdateManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IntelCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<IntelCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<IntelCreateManySchemeInputEnvelope>;
  delete?: InputMaybe<Array<IntelWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IntelScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  set?: InputMaybe<Array<IntelWhereUniqueInput>>;
  update?: InputMaybe<Array<IntelUpdateWithWhereUniqueWithoutSchemeInput>>;
  updateMany?: InputMaybe<Array<IntelUpdateManyWithWhereWithoutSchemeInput>>;
  upsert?: InputMaybe<Array<IntelUpsertWithWhereUniqueWithoutSchemeInput>>;
};

export type IntelUpdateManyWithoutSuggestedOffenderInput = {
  connect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<IntelCreateOrConnectWithoutSuggestedOffenderInput>>;
  create?: InputMaybe<Array<IntelCreateWithoutSuggestedOffenderInput>>;
  createMany?: InputMaybe<IntelCreateManySuggestedOffenderInputEnvelope>;
  delete?: InputMaybe<Array<IntelWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<IntelScalarWhereInput>>;
  disconnect?: InputMaybe<Array<IntelWhereUniqueInput>>;
  set?: InputMaybe<Array<IntelWhereUniqueInput>>;
  update?: InputMaybe<Array<IntelUpdateWithWhereUniqueWithoutSuggestedOffenderInput>>;
  updateMany?: InputMaybe<Array<IntelUpdateManyWithWhereWithoutSuggestedOffenderInput>>;
  upsert?: InputMaybe<Array<IntelUpsertWithWhereUniqueWithoutSuggestedOffenderInput>>;
};

export type IntelUpdateOneWithoutImageInput = {
  connect?: InputMaybe<IntelWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IntelCreateOrConnectWithoutImageInput>;
  create?: InputMaybe<IntelCreateWithoutImageInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<IntelUpdateWithoutImageInput>;
  upsert?: InputMaybe<IntelUpsertWithoutImageInput>;
};

export type IntelUpdateWithWhereUniqueWithoutCreatedByInput = {
  data: IntelUpdateWithoutCreatedByInput;
  where: IntelWhereUniqueInput;
};

export type IntelUpdateWithWhereUniqueWithoutIncidentInput = {
  data: IntelUpdateWithoutIncidentInput;
  where: IntelWhereUniqueInput;
};

export type IntelUpdateWithWhereUniqueWithoutOffenderInput = {
  data: IntelUpdateWithoutOffenderInput;
  where: IntelWhereUniqueInput;
};

export type IntelUpdateWithWhereUniqueWithoutSchemeInput = {
  data: IntelUpdateWithoutSchemeInput;
  where: IntelWhereUniqueInput;
};

export type IntelUpdateWithWhereUniqueWithoutSuggestedOffenderInput = {
  data: IntelUpdateWithoutSuggestedOffenderInput;
  where: IntelWhereUniqueInput;
};

export type IntelUpdateWithoutCreatedByInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<ImageUpdateOneWithoutIntelInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutIntelInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutIntelInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIntelInput>;
  suggestedOffender?: InputMaybe<OffenderUpdateOneWithoutSuggestedIdsInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumIntelTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type IntelUpdateWithoutImageInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIntelInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutIntelInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutIntelInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIntelInput>;
  suggestedOffender?: InputMaybe<OffenderUpdateOneWithoutSuggestedIdsInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumIntelTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type IntelUpdateWithoutIncidentInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIntelInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<ImageUpdateOneWithoutIntelInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutIntelInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIntelInput>;
  suggestedOffender?: InputMaybe<OffenderUpdateOneWithoutSuggestedIdsInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumIntelTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type IntelUpdateWithoutOffenderInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIntelInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<ImageUpdateOneWithoutIntelInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutIntelInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIntelInput>;
  suggestedOffender?: InputMaybe<OffenderUpdateOneWithoutSuggestedIdsInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumIntelTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type IntelUpdateWithoutSchemeInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIntelInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<ImageUpdateOneWithoutIntelInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutIntelInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutIntelInput>;
  suggestedOffender?: InputMaybe<OffenderUpdateOneWithoutSuggestedIdsInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumIntelTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type IntelUpdateWithoutSuggestedOffenderInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutIntelInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  image?: InputMaybe<ImageUpdateOneWithoutIntelInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutIntelInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutIntelInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutIntelInput>;
  text?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumIntelTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type IntelUpsertWithWhereUniqueWithoutCreatedByInput = {
  create: IntelCreateWithoutCreatedByInput;
  update: IntelUpdateWithoutCreatedByInput;
  where: IntelWhereUniqueInput;
};

export type IntelUpsertWithWhereUniqueWithoutIncidentInput = {
  create: IntelCreateWithoutIncidentInput;
  update: IntelUpdateWithoutIncidentInput;
  where: IntelWhereUniqueInput;
};

export type IntelUpsertWithWhereUniqueWithoutOffenderInput = {
  create: IntelCreateWithoutOffenderInput;
  update: IntelUpdateWithoutOffenderInput;
  where: IntelWhereUniqueInput;
};

export type IntelUpsertWithWhereUniqueWithoutSchemeInput = {
  create: IntelCreateWithoutSchemeInput;
  update: IntelUpdateWithoutSchemeInput;
  where: IntelWhereUniqueInput;
};

export type IntelUpsertWithWhereUniqueWithoutSuggestedOffenderInput = {
  create: IntelCreateWithoutSuggestedOffenderInput;
  update: IntelUpdateWithoutSuggestedOffenderInput;
  where: IntelWhereUniqueInput;
};

export type IntelUpsertWithoutImageInput = {
  create: IntelCreateWithoutImageInput;
  update: IntelUpdateWithoutImageInput;
};

export type IntelWhereInput = {
  AND?: InputMaybe<Array<IntelWhereInput>>;
  NOT?: InputMaybe<Array<IntelWhereInput>>;
  OR?: InputMaybe<Array<IntelWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<ImageWhereInput>;
  imageId?: InputMaybe<StringNullableFilter>;
  incident?: InputMaybe<IncidentWhereInput>;
  incidentId?: InputMaybe<StringNullableFilter>;
  offender?: InputMaybe<OffenderWhereInput>;
  offenderId?: InputMaybe<StringNullableFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  suggestedOffender?: InputMaybe<OffenderWhereInput>;
  suggestedOffenderId?: InputMaybe<StringNullableFilter>;
  text?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumIntelTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type IntelWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
};

export type ListIncidents = {
  __typename?: 'ListIncidents';
  incidents: Array<Incident>;
  total: Scalars['Int'];
};

export type Message = {
  __typename?: 'Message';
  actions: Array<Action>;
  chat: Chat;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  daysAgo?: Maybe<Scalars['String']>;
  from: User;
  id: Scalars['String'];
  scheme: Scheme;
  sent?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['DateTime'];
};


export type MessageActionsArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};

export type MessageCreateInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutMessageInput>;
  chat: ChatCreateNestedOneWithoutMessagesInput;
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  from: UserCreateNestedOneWithoutMessagesInput;
  id?: InputMaybe<Scalars['String']>;
  scheme: SchemeCreateNestedOneWithoutMessagesInput;
  sent?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageCreateManyChatInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fromId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  sent?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageCreateManyChatInputEnvelope = {
  data?: InputMaybe<Array<MessageCreateManyChatInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MessageCreateManyFromInput = {
  chatId: Scalars['String'];
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  sent?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageCreateManyFromInputEnvelope = {
  data?: InputMaybe<Array<MessageCreateManyFromInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MessageCreateManySchemeInput = {
  chatId: Scalars['String'];
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fromId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  sent?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageCreateManySchemeInputEnvelope = {
  data?: InputMaybe<Array<MessageCreateManySchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MessageCreateNestedManyWithoutChatInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutChatInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutChatInput>>;
  createMany?: InputMaybe<MessageCreateManyChatInputEnvelope>;
};

export type MessageCreateNestedManyWithoutFromInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutFromInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutFromInput>>;
  createMany?: InputMaybe<MessageCreateManyFromInputEnvelope>;
};

export type MessageCreateNestedManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<MessageCreateManySchemeInputEnvelope>;
};

export type MessageCreateNestedOneWithoutActionsInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<MessageCreateWithoutActionsInput>;
};

export type MessageCreateOrConnectWithoutActionsInput = {
  create: MessageCreateWithoutActionsInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutChatInput = {
  create: MessageCreateWithoutChatInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutFromInput = {
  create: MessageCreateWithoutFromInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutSchemeInput = {
  create: MessageCreateWithoutSchemeInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateWithoutActionsInput = {
  chat: ChatCreateNestedOneWithoutMessagesInput;
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  from: UserCreateNestedOneWithoutMessagesInput;
  id?: InputMaybe<Scalars['String']>;
  scheme: SchemeCreateNestedOneWithoutMessagesInput;
  sent?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageCreateWithoutChatInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutMessageInput>;
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  from: UserCreateNestedOneWithoutMessagesInput;
  id?: InputMaybe<Scalars['String']>;
  scheme: SchemeCreateNestedOneWithoutMessagesInput;
  sent?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageCreateWithoutFromInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutMessageInput>;
  chat: ChatCreateNestedOneWithoutMessagesInput;
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  scheme: SchemeCreateNestedOneWithoutMessagesInput;
  sent?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageCreateWithoutSchemeInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutMessageInput>;
  chat: ChatCreateNestedOneWithoutMessagesInput;
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  from: UserCreateNestedOneWithoutMessagesInput;
  id?: InputMaybe<Scalars['String']>;
  sent?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

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
  chat?: InputMaybe<ChatOrderByWithRelationInput>;
  chatId?: InputMaybe<SortOrder>;
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  from?: InputMaybe<UserOrderByWithRelationInput>;
  fromId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  sent?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

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

export type MessageUpdateInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutMessageInput>;
  chat?: InputMaybe<ChatUpdateOneRequiredWithoutMessagesInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  from?: InputMaybe<UserUpdateOneRequiredWithoutMessagesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutMessagesInput>;
  sent?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type MessageUpdateManyMutationInput = {
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  sent?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type MessageUpdateManyWithWhereWithoutChatInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateManyWithWhereWithoutFromInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateManyWithWhereWithoutSchemeInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateManyWithoutChatInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutChatInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutChatInput>>;
  createMany?: InputMaybe<MessageCreateManyChatInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutChatInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutChatInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutChatInput>>;
};

export type MessageUpdateManyWithoutFromInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutFromInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutFromInput>>;
  createMany?: InputMaybe<MessageCreateManyFromInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutFromInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutFromInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutFromInput>>;
};

export type MessageUpdateManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<MessageCreateManySchemeInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutSchemeInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutSchemeInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutSchemeInput>>;
};

export type MessageUpdateOneWithoutActionsInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<MessageCreateWithoutActionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<MessageUpdateWithoutActionsInput>;
  upsert?: InputMaybe<MessageUpsertWithoutActionsInput>;
};

export type MessageUpdateWithWhereUniqueWithoutChatInput = {
  data: MessageUpdateWithoutChatInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateWithWhereUniqueWithoutFromInput = {
  data: MessageUpdateWithoutFromInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateWithWhereUniqueWithoutSchemeInput = {
  data: MessageUpdateWithoutSchemeInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateWithoutActionsInput = {
  chat?: InputMaybe<ChatUpdateOneRequiredWithoutMessagesInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  from?: InputMaybe<UserUpdateOneRequiredWithoutMessagesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutMessagesInput>;
  sent?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutChatInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutMessageInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  from?: InputMaybe<UserUpdateOneRequiredWithoutMessagesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutMessagesInput>;
  sent?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutFromInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutMessageInput>;
  chat?: InputMaybe<ChatUpdateOneRequiredWithoutMessagesInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutMessagesInput>;
  sent?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutSchemeInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutMessageInput>;
  chat?: InputMaybe<ChatUpdateOneRequiredWithoutMessagesInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  from?: InputMaybe<UserUpdateOneRequiredWithoutMessagesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  sent?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type MessageUpsertWithWhereUniqueWithoutChatInput = {
  create: MessageCreateWithoutChatInput;
  update: MessageUpdateWithoutChatInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithWhereUniqueWithoutFromInput = {
  create: MessageCreateWithoutFromInput;
  update: MessageUpdateWithoutFromInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithWhereUniqueWithoutSchemeInput = {
  create: MessageCreateWithoutSchemeInput;
  update: MessageUpdateWithoutSchemeInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithoutActionsInput = {
  create: MessageCreateWithoutActionsInput;
  update: MessageUpdateWithoutActionsInput;
};

export type MessageWhereInput = {
  AND?: InputMaybe<Array<MessageWhereInput>>;
  NOT?: InputMaybe<Array<MessageWhereInput>>;
  OR?: InputMaybe<Array<MessageWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  chat?: InputMaybe<ChatWhereInput>;
  chatId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  from?: InputMaybe<UserWhereInput>;
  fromId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  sent?: InputMaybe<BoolNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type MessageWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum Model {
  Add = 'ADD',
  Address = 'ADDRESS',
  Ban = 'BAN',
  Chat = 'CHAT',
  Group = 'GROUP',
  Image = 'IMAGE',
  Incident = 'INCIDENT',
  Message = 'MESSAGE',
  Offender = 'OFFENDER',
  Remove = 'REMOVE',
  Scheme = 'SCHEME',
  Send = 'SEND',
  Tag = 'TAG',
  User = 'USER'
}

export type Mutation = {
  __typename?: 'Mutation';
  addImageIntel?: Maybe<Intel>;
  approveIncident?: Maybe<Incident>;
  approveOffender?: Maybe<Offender>;
  clearUnusedImages?: Maybe<SystemTask>;
  createAction: Action;
  createAddress: Address;
  createBan: Ban;
  createBlankImage?: Maybe<Image>;
  createChat: Chat;
  createComment?: Maybe<Intel>;
  createGroup: Group;
  createImage: Image;
  createIncident?: Maybe<Incident>;
  createMessage?: Maybe<Message>;
  createMessageDefault: Message;
  createOffender?: Maybe<Offender>;
  createOffenderDefault: Offender;
  createScheme: Scheme;
  createTag: Tag;
  createUnlinkedImage?: Maybe<UnlinkedImage>;
  createUser?: Maybe<User>;
  createUserChat: UserChat;
  createUserDefault: User;
  createUserInAuth0?: Maybe<UserNewAuth0>;
  createUserInDatabase?: Maybe<User>;
  createUserScheme: UserScheme;
  deleteAction?: Maybe<Action>;
  deleteAddress?: Maybe<Address>;
  deleteBan?: Maybe<Ban>;
  deleteChat?: Maybe<Chat>;
  deleteChatDefault?: Maybe<Chat>;
  deleteExpired?: Maybe<SystemTask>;
  deleteGroup?: Maybe<Group>;
  deleteGroupDefault?: Maybe<Group>;
  deleteImage?: Maybe<Image>;
  deleteIncident?: Maybe<Incident>;
  deleteIncidentDefault?: Maybe<Incident>;
  deleteIntel?: Maybe<Intel>;
  deleteMessage?: Maybe<Message>;
  deleteOffender?: Maybe<Offender>;
  deleteOffenderDefault?: Maybe<Offender>;
  deleteScheme?: Maybe<Scheme>;
  deleteTag?: Maybe<Tag>;
  deleteTagDefault?: Maybe<Tag>;
  deleteUser?: Maybe<User>;
  deleteUserChat?: Maybe<UserChat>;
  deleteUserDefault?: Maybe<User>;
  deleteUserFromScheme?: Maybe<User>;
  deleteUserScheme?: Maybe<UserScheme>;
  inviteExistingUser?: Maybe<User>;
  newIncident: Incident;
  recycleExpiredData?: Maybe<SystemTask>;
  recycleIncident?: Maybe<Incident>;
  recycleOffender?: Maybe<Offender>;
  refreshAuth?: Maybe<RefreshAuth>;
  registerPushToken?: Maybe<ExpoPushToken>;
  resetPassword?: Maybe<ResetPassword>;
  restoreAllRecycledItems?: Maybe<SystemTask>;
  restoreIncident?: Maybe<Incident>;
  restoreItem?: Maybe<RecycledItem>;
  restoreOffender?: Maybe<Offender>;
  sendInvite?: Maybe<User>;
  setPassword?: Maybe<User>;
  signIn?: Maybe<SignIn>;
  suggestOffender?: Maybe<Intel>;
  toggleUser?: Maybe<User>;
  updateAction?: Maybe<Action>;
  updateAddress?: Maybe<Address>;
  updateBan?: Maybe<Ban>;
  updateBanDefault?: Maybe<Ban>;
  updateChat?: Maybe<Chat>;
  updateChatDefault?: Maybe<Chat>;
  updateGroup?: Maybe<Group>;
  updateGroupDefault?: Maybe<Group>;
  updateImage?: Maybe<Image>;
  updateIncident?: Maybe<Incident>;
  updateMessage?: Maybe<Message>;
  updateOffender?: Maybe<Offender>;
  updateOffenderDefault?: Maybe<Offender>;
  updateOneIncident?: Maybe<Incident>;
  updatePassword?: Maybe<User>;
  updateScheme?: Maybe<Scheme>;
  updateSchemeDefault?: Maybe<Scheme>;
  updateTag?: Maybe<Tag>;
  updateTagDefault?: Maybe<Tag>;
  updateUser?: Maybe<User>;
  updateUserChat?: Maybe<UserChat>;
  updateUserDefault?: Maybe<User>;
  updateUserScheme?: Maybe<UserScheme>;
  uploadImage?: Maybe<Image>;
  uploadToImage?: Maybe<Image>;
};


export type MutationAddImageIntelArgs = {
  data: AddImageIntelData;
};


export type MutationApproveIncidentArgs = {
  data: ApproveIncidentData;
  where: UniqueId;
};


export type MutationApproveOffenderArgs = {
  data: ApproveIncidentData;
  where: UniqueId;
};


export type MutationCreateActionArgs = {
  data: ActionCreateInput;
};


export type MutationCreateAddressArgs = {
  data: AddressCreateInput;
};


export type MutationCreateBanArgs = {
  data: BanCreateInput;
};


export type MutationCreateBlankImageArgs = {
  incident?: InputMaybe<IncidentWhereUniqueInput>;
  offenders?: InputMaybe<Array<InputMaybe<OffenderWhereUniqueInput>>>;
  scheme: Scalars['String'];
};


export type MutationCreateChatArgs = {
  data: ChatCreateInput;
};


export type MutationCreateCommentArgs = {
  data: CreateCommentData;
};


export type MutationCreateGroupArgs = {
  data: GroupCreateInput;
};


export type MutationCreateImageArgs = {
  data: ImageCreateInput;
};


export type MutationCreateIncidentArgs = {
  data: CreatIncidentData;
};


export type MutationCreateMessageArgs = {
  data: MessageCreateWithoutActionsInput;
};


export type MutationCreateMessageDefaultArgs = {
  data: MessageCreateInput;
};


export type MutationCreateOffenderArgs = {
  data: CreateOffenderData;
};


export type MutationCreateOffenderDefaultArgs = {
  data: OffenderCreateInput;
};


export type MutationCreateSchemeArgs = {
  data: SchemeCreateInput;
};


export type MutationCreateTagArgs = {
  data: TagCreateInput;
};


export type MutationCreateUnlinkedImageArgs = {
  file: Scalars['Upload'];
  localId: Scalars['String'];
  scheme: Scalars['String'];
};


export type MutationCreateUserArgs = {
  data: CreateUserData;
};


export type MutationCreateUserChatArgs = {
  data: UserChatCreateInput;
};


export type MutationCreateUserDefaultArgs = {
  data: UserCreateInput;
};


export type MutationCreateUserInAuth0Args = {
  id: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateUserInDatabaseArgs = {
  data: CreateUserData;
};


export type MutationCreateUserSchemeArgs = {
  data: UserSchemeCreateInput;
};


export type MutationDeleteActionArgs = {
  where: ActionWhereUniqueInput;
};


export type MutationDeleteAddressArgs = {
  where: AddressWhereUniqueInput;
};


export type MutationDeleteBanArgs = {
  where: UniqueId;
};


export type MutationDeleteChatArgs = {
  where: UniqueId;
};


export type MutationDeleteChatDefaultArgs = {
  where: ChatWhereUniqueInput;
};


export type MutationDeleteGroupArgs = {
  where: UniqueId;
};


export type MutationDeleteGroupDefaultArgs = {
  where: GroupWhereUniqueInput;
};


export type MutationDeleteImageArgs = {
  where: ImageWhereUniqueInput;
};


export type MutationDeleteIncidentArgs = {
  where: UniqueId;
};


export type MutationDeleteIncidentDefaultArgs = {
  where: IncidentWhereUniqueInput;
};


export type MutationDeleteIntelArgs = {
  where: IntelWhereUniqueInput;
};


export type MutationDeleteMessageArgs = {
  where: MessageWhereUniqueInput;
};


export type MutationDeleteOffenderArgs = {
  where: UniqueId;
};


export type MutationDeleteOffenderDefaultArgs = {
  where: OffenderWhereUniqueInput;
};


export type MutationDeleteSchemeArgs = {
  where: SchemeWhereUniqueInput;
};


export type MutationDeleteTagArgs = {
  where: UniqueId;
};


export type MutationDeleteTagDefaultArgs = {
  where: TagWhereUniqueInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
  scheme: Scalars['String'];
};


export type MutationDeleteUserChatArgs = {
  where: UserChatWhereUniqueInput;
};


export type MutationDeleteUserDefaultArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUserFromSchemeArgs = {
  id: Scalars['String'];
  scheme: Scalars['String'];
};


export type MutationDeleteUserSchemeArgs = {
  where: UserSchemeWhereUniqueInput;
};


export type MutationInviteExistingUserArgs = {
  data: UserUpdateInput;
  where: UniqueId;
};


export type MutationNewIncidentArgs = {
  data: IncidentCreateInput;
};


export type MutationRecycleIncidentArgs = {
  where: UniqueId;
};


export type MutationRecycleOffenderArgs = {
  where: UniqueId;
};


export type MutationRefreshAuthArgs = {
  data: RefreshAuthData;
};


export type MutationRegisterPushTokenArgs = {
  data: RegisterPushTokenData;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordData;
};


export type MutationRestoreAllRecycledItemsArgs = {
  schemeId: UniqueId;
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


export type MutationSendInviteArgs = {
  user: Scalars['String'];
};


export type MutationSetPasswordArgs = {
  data: SetPasswordData;
};


export type MutationSignInArgs = {
  data: SignInData;
};


export type MutationSuggestOffenderArgs = {
  data: SuggestOffenderData;
};


export type MutationToggleUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateActionArgs = {
  data: ActionUpdateInput;
  where: ActionWhereUniqueInput;
};


export type MutationUpdateAddressArgs = {
  data: AddressUpdateInput;
  where: AddressWhereUniqueInput;
};


export type MutationUpdateBanArgs = {
  data: BanUpdateInput;
  where: UniqueId;
};


export type MutationUpdateBanDefaultArgs = {
  data: BanUpdateInput;
  where: BanWhereUniqueInput;
};


export type MutationUpdateChatArgs = {
  data: ChatUpdateInput;
  where: UniqueId;
};


export type MutationUpdateChatDefaultArgs = {
  data: ChatUpdateInput;
  where: ChatWhereUniqueInput;
};


export type MutationUpdateGroupArgs = {
  data: GroupUpdateInput;
  where: UniqueId;
};


export type MutationUpdateGroupDefaultArgs = {
  data: GroupUpdateInput;
  where: GroupWhereUniqueInput;
};


export type MutationUpdateImageArgs = {
  data: ImageUpdateInput;
  where: ImageWhereUniqueInput;
};


export type MutationUpdateIncidentArgs = {
  data: IncidentUpdateInput;
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


export type MutationUpdateOffenderDefaultArgs = {
  data: OffenderUpdateInput;
  where: OffenderWhereUniqueInput;
};


export type MutationUpdateOneIncidentArgs = {
  data: IncidentUpdateInput;
  where: IncidentWhereUniqueInput;
};


export type MutationUpdatePasswordArgs = {
  data: UpdatePasswordData;
};


export type MutationUpdateSchemeArgs = {
  data: SchemeUpdateInput;
  where: UniqueId;
};


export type MutationUpdateSchemeDefaultArgs = {
  data: SchemeUpdateInput;
  where: SchemeWhereUniqueInput;
};


export type MutationUpdateTagArgs = {
  data: TagUpdateInput;
  where: UniqueId;
};


export type MutationUpdateTagDefaultArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UniqueId;
};


export type MutationUpdateUserChatArgs = {
  data: UserChatUpdateInput;
  where: UserChatWhereUniqueInput;
};


export type MutationUpdateUserDefaultArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUserSchemeArgs = {
  data: UserSchemeUpdateInput;
  where: UserSchemeWhereUniqueInput;
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

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumActionTypeFilter = {
  equals?: InputMaybe<ActionType>;
  in?: InputMaybe<Array<ActionType>>;
  not?: InputMaybe<NestedEnumActionTypeFilter>;
  notIn?: InputMaybe<Array<ActionType>>;
};

export type NestedEnumAgeNullableFilter = {
  equals?: InputMaybe<Age>;
  in?: InputMaybe<Array<Age>>;
  not?: InputMaybe<NestedEnumAgeNullableFilter>;
  notIn?: InputMaybe<Array<Age>>;
};

export type NestedEnumBuildNullableFilter = {
  equals?: InputMaybe<Build>;
  in?: InputMaybe<Array<Build>>;
  not?: InputMaybe<NestedEnumBuildNullableFilter>;
  notIn?: InputMaybe<Array<Build>>;
};

export type NestedEnumGenderNullableFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<NestedEnumGenderNullableFilter>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type NestedEnumIntelTypeFilter = {
  equals?: InputMaybe<IntelType>;
  in?: InputMaybe<Array<IntelType>>;
  not?: InputMaybe<NestedEnumIntelTypeFilter>;
  notIn?: InputMaybe<Array<IntelType>>;
};

export type NestedEnumModelFilter = {
  equals?: InputMaybe<Model>;
  in?: InputMaybe<Array<Model>>;
  not?: InputMaybe<NestedEnumModelFilter>;
  notIn?: InputMaybe<Array<Model>>;
};

export type NestedEnumOnboardStepsFilter = {
  equals?: InputMaybe<OnboardSteps>;
  in?: InputMaybe<Array<OnboardSteps>>;
  not?: InputMaybe<NestedEnumOnboardStepsFilter>;
  notIn?: InputMaybe<Array<OnboardSteps>>;
};

export type NestedEnumRaceNullableFilter = {
  equals?: InputMaybe<Race>;
  in?: InputMaybe<Array<Race>>;
  not?: InputMaybe<NestedEnumRaceNullableFilter>;
  notIn?: InputMaybe<Array<Race>>;
};

export type NestedEnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
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

export type NullableBoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type NullableEnumAgeFieldUpdateOperationsInput = {
  set?: InputMaybe<Age>;
};

export type NullableEnumBuildFieldUpdateOperationsInput = {
  set?: InputMaybe<Build>;
};

export type NullableEnumGenderFieldUpdateOperationsInput = {
  set?: InputMaybe<Gender>;
};

export type NullableEnumRaceFieldUpdateOperationsInput = {
  set?: InputMaybe<Race>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type Offender = {
  __typename?: 'Offender';
  actions: Array<Action>;
  active?: Maybe<Scalars['Boolean']>;
  age?: Maybe<Age>;
  approved?: Maybe<Scalars['Boolean']>;
  bans: Array<Ban>;
  build?: Maybe<Build>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  dateSource?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  groups: Array<Group>;
  hair?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  images: Array<Image>;
  incidents: Array<Incident>;
  intel: Array<Intel>;
  name?: Maybe<Scalars['String']>;
  peculiarities?: Maybe<Scalars['String']>;
  race?: Maybe<Race>;
  recycleBin?: Maybe<RecycledItem>;
  recycled: Scalars['Boolean'];
  scheme: Scheme;
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime'];
  uploaded?: Maybe<Scalars['Boolean']>;
};


export type OffenderActionsArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};


export type OffenderBansArgs = {
  after?: InputMaybe<BanWhereUniqueInput>;
  before?: InputMaybe<BanWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BanOrderByWithRelationInput>>;
  where?: InputMaybe<BanWhereInput>;
};


export type OffenderGroupsArgs = {
  after?: InputMaybe<GroupWhereUniqueInput>;
  before?: InputMaybe<GroupWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  where?: InputMaybe<GroupWhereInput>;
};


export type OffenderImagesArgs = {
  after?: InputMaybe<ImageWhereUniqueInput>;
  before?: InputMaybe<ImageWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  where?: InputMaybe<ImageWhereInput>;
};


export type OffenderIncidentsArgs = {
  after?: InputMaybe<IncidentWhereUniqueInput>;
  before?: InputMaybe<IncidentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type OffenderIntelArgs = {
  after?: InputMaybe<IntelWhereUniqueInput>;
  before?: InputMaybe<IntelWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<IntelOrderByWithRelationInput>>;
  where?: InputMaybe<IntelWhereInput>;
};


export type OffenderTagsArgs = {
  after?: InputMaybe<TagWhereUniqueInput>;
  before?: InputMaybe<TagWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  where?: InputMaybe<TagWhereInput>;
};

export type OffenderConnectOne = {
  connect: OffenderWhereUniqueInput;
};

export type OffenderCreateInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutOffenderInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutOffenderInput>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutOffendersInput;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutOffendersInput>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutOffenderInput>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutOffenderInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutOffendersInput;
  suggestedIds?: InputMaybe<IntelCreateNestedManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateManyCreatedByInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  schemeId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateManyCreatedByInputEnvelope = {
  data?: InputMaybe<Array<OffenderCreateManyCreatedByInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateManySchemeInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdById: Scalars['String'];
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateManySchemeInputEnvelope = {
  data?: InputMaybe<Array<OffenderCreateManySchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateNestedManyWithoutCreatedByInput = {
  connect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OffenderCreateOrConnectWithoutCreatedByInput>>;
  create?: InputMaybe<Array<OffenderCreateWithoutCreatedByInput>>;
  createMany?: InputMaybe<OffenderCreateManyCreatedByInputEnvelope>;
};

export type OffenderCreateNestedManyWithoutGroupsInput = {
  connect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OffenderCreateOrConnectWithoutGroupsInput>>;
  create?: InputMaybe<Array<OffenderCreateWithoutGroupsInput>>;
};

export type OffenderCreateNestedManyWithoutImagesInput = {
  connect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OffenderCreateOrConnectWithoutImagesInput>>;
  create?: InputMaybe<Array<OffenderCreateWithoutImagesInput>>;
};

export type OffenderCreateNestedManyWithoutIncidentsInput = {
  connect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OffenderCreateOrConnectWithoutIncidentsInput>>;
  create?: InputMaybe<Array<OffenderCreateWithoutIncidentsInput>>;
};

export type OffenderCreateNestedManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OffenderCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<OffenderCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<OffenderCreateManySchemeInputEnvelope>;
};

export type OffenderCreateNestedManyWithoutTagsInput = {
  connect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OffenderCreateOrConnectWithoutTagsInput>>;
  create?: InputMaybe<Array<OffenderCreateWithoutTagsInput>>;
};

export type OffenderCreateNestedOneWithoutActionsInput = {
  connect?: InputMaybe<OffenderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OffenderCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<OffenderCreateWithoutActionsInput>;
};

export type OffenderCreateNestedOneWithoutBansInput = {
  connect?: InputMaybe<OffenderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OffenderCreateOrConnectWithoutBansInput>;
  create?: InputMaybe<OffenderCreateWithoutBansInput>;
};

export type OffenderCreateNestedOneWithoutIntelInput = {
  connect?: InputMaybe<OffenderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OffenderCreateOrConnectWithoutIntelInput>;
  create?: InputMaybe<OffenderCreateWithoutIntelInput>;
};

export type OffenderCreateNestedOneWithoutRecycleBinInput = {
  connect?: InputMaybe<OffenderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OffenderCreateOrConnectWithoutRecycleBinInput>;
  create?: InputMaybe<OffenderCreateWithoutRecycleBinInput>;
};

export type OffenderCreateNestedOneWithoutSuggestedIdsInput = {
  connect?: InputMaybe<OffenderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OffenderCreateOrConnectWithoutSuggestedIdsInput>;
  create?: InputMaybe<OffenderCreateWithoutSuggestedIdsInput>;
};

export type OffenderCreateOrConnectWithoutActionsInput = {
  create: OffenderCreateWithoutActionsInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderCreateOrConnectWithoutBansInput = {
  create: OffenderCreateWithoutBansInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderCreateOrConnectWithoutCreatedByInput = {
  create: OffenderCreateWithoutCreatedByInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderCreateOrConnectWithoutGroupsInput = {
  create: OffenderCreateWithoutGroupsInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderCreateOrConnectWithoutImagesInput = {
  create: OffenderCreateWithoutImagesInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderCreateOrConnectWithoutIncidentsInput = {
  create: OffenderCreateWithoutIncidentsInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderCreateOrConnectWithoutIntelInput = {
  create: OffenderCreateWithoutIntelInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderCreateOrConnectWithoutRecycleBinInput = {
  create: OffenderCreateWithoutRecycleBinInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderCreateOrConnectWithoutSchemeInput = {
  create: OffenderCreateWithoutSchemeInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderCreateOrConnectWithoutSuggestedIdsInput = {
  create: OffenderCreateWithoutSuggestedIdsInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderCreateOrConnectWithoutTagsInput = {
  create: OffenderCreateWithoutTagsInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderCreateWithoutActionsInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutOffenderInput>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutOffendersInput;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutOffendersInput>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutOffenderInput>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutOffenderInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutOffendersInput;
  suggestedIds?: InputMaybe<IntelCreateNestedManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateWithoutBansInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutOffenderInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutOffendersInput;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutOffendersInput>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutOffenderInput>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutOffenderInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutOffendersInput;
  suggestedIds?: InputMaybe<IntelCreateNestedManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateWithoutCreatedByInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutOffenderInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutOffenderInput>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutOffendersInput>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutOffenderInput>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutOffenderInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutOffendersInput;
  suggestedIds?: InputMaybe<IntelCreateNestedManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateWithoutGroupsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutOffenderInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutOffenderInput>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutOffendersInput;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutOffenderInput>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutOffenderInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutOffendersInput;
  suggestedIds?: InputMaybe<IntelCreateNestedManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateWithoutImagesInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutOffenderInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutOffenderInput>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutOffendersInput;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutOffendersInput>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutOffenderInput>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutOffenderInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutOffendersInput;
  suggestedIds?: InputMaybe<IntelCreateNestedManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateWithoutIncidentsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutOffenderInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutOffenderInput>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutOffendersInput;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutOffendersInput>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutOffenderInput>;
  localId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutOffenderInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutOffendersInput;
  suggestedIds?: InputMaybe<IntelCreateNestedManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateWithoutIntelInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutOffenderInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutOffenderInput>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutOffendersInput;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutOffendersInput>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutOffendersInput>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutOffenderInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutOffendersInput;
  suggestedIds?: InputMaybe<IntelCreateNestedManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateWithoutRecycleBinInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutOffenderInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutOffenderInput>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutOffendersInput;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutOffendersInput>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutOffenderInput>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutOffendersInput;
  suggestedIds?: InputMaybe<IntelCreateNestedManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateWithoutSchemeInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutOffenderInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutOffenderInput>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutOffendersInput;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutOffendersInput>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutOffenderInput>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutOffenderInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  suggestedIds?: InputMaybe<IntelCreateNestedManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateWithoutSuggestedIdsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutOffenderInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutOffenderInput>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutOffendersInput;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutOffendersInput>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutOffenderInput>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutOffenderInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutOffendersInput;
  tags?: InputMaybe<TagCreateNestedManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type OffenderCreateWithoutTagsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutOffenderInput>;
  active?: InputMaybe<Scalars['Boolean']>;
  age?: InputMaybe<Age>;
  approved?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutOffenderInput>;
  build?: InputMaybe<Build>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutOffendersInput;
  dateOfBirth?: InputMaybe<Scalars['DateTime']>;
  dateSource?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutOffendersInput>;
  hair?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutOffenderInput>;
  name?: InputMaybe<Scalars['String']>;
  peculiarities?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Race>;
  recycleBin?: InputMaybe<RecycledItemCreateNestedOneWithoutOffenderInput>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  scheme: SchemeCreateNestedOneWithoutOffendersInput;
  suggestedIds?: InputMaybe<IntelCreateNestedManyWithoutSuggestedOffenderInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
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
  age?: InputMaybe<SortOrder>;
  approved?: InputMaybe<SortOrder>;
  bans?: InputMaybe<BanOrderByRelationAggregateInput>;
  build?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  dateOfBirth?: InputMaybe<SortOrder>;
  dateSource?: InputMaybe<SortOrder>;
  gender?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  hair?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  intel?: InputMaybe<IntelOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  peculiarities?: InputMaybe<SortOrder>;
  race?: InputMaybe<SortOrder>;
  recycleBin?: InputMaybe<RecycledItemOrderByWithRelationInput>;
  recycled?: InputMaybe<SortOrder>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  suggestedIds?: InputMaybe<IntelOrderByRelationAggregateInput>;
  tags?: InputMaybe<TagOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  uploaded?: InputMaybe<SortOrder>;
};

export type OffenderScalarWhereInput = {
  AND?: InputMaybe<Array<OffenderScalarWhereInput>>;
  NOT?: InputMaybe<Array<OffenderScalarWhereInput>>;
  OR?: InputMaybe<Array<OffenderScalarWhereInput>>;
  active?: InputMaybe<BoolNullableFilter>;
  age?: InputMaybe<EnumAgeNullableFilter>;
  approved?: InputMaybe<BoolNullableFilter>;
  build?: InputMaybe<EnumBuildNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringFilter>;
  dateOfBirth?: InputMaybe<DateTimeNullableFilter>;
  dateSource?: InputMaybe<StringNullableFilter>;
  gender?: InputMaybe<EnumGenderNullableFilter>;
  hair?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  peculiarities?: InputMaybe<StringNullableFilter>;
  race?: InputMaybe<EnumRaceNullableFilter>;
  recycled?: InputMaybe<BoolFilter>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
};

export type OffenderUpdateInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutOffenderInput>;
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutOffenderInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutOffendersInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutOffendersInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutOffenderInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutOffenderInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutOffendersInput>;
  suggestedIds?: InputMaybe<IntelUpdateManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagUpdateManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpdateManyMutationInput = {
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpdateManyWithWhereWithoutCreatedByInput = {
  data: OffenderUpdateManyMutationInput;
  where: OffenderScalarWhereInput;
};

export type OffenderUpdateManyWithWhereWithoutGroupsInput = {
  data: OffenderUpdateManyMutationInput;
  where: OffenderScalarWhereInput;
};

export type OffenderUpdateManyWithWhereWithoutImagesInput = {
  data: OffenderUpdateManyMutationInput;
  where: OffenderScalarWhereInput;
};

export type OffenderUpdateManyWithWhereWithoutIncidentsInput = {
  data: OffenderUpdateManyMutationInput;
  where: OffenderScalarWhereInput;
};

export type OffenderUpdateManyWithWhereWithoutSchemeInput = {
  data: OffenderUpdateManyMutationInput;
  where: OffenderScalarWhereInput;
};

export type OffenderUpdateManyWithWhereWithoutTagsInput = {
  data: OffenderUpdateManyMutationInput;
  where: OffenderScalarWhereInput;
};

export type OffenderUpdateManyWithoutCreatedByInput = {
  connect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OffenderCreateOrConnectWithoutCreatedByInput>>;
  create?: InputMaybe<Array<OffenderCreateWithoutCreatedByInput>>;
  createMany?: InputMaybe<OffenderCreateManyCreatedByInputEnvelope>;
  delete?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OffenderScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  set?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  update?: InputMaybe<Array<OffenderUpdateWithWhereUniqueWithoutCreatedByInput>>;
  updateMany?: InputMaybe<Array<OffenderUpdateManyWithWhereWithoutCreatedByInput>>;
  upsert?: InputMaybe<Array<OffenderUpsertWithWhereUniqueWithoutCreatedByInput>>;
};

export type OffenderUpdateManyWithoutGroupsInput = {
  connect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OffenderCreateOrConnectWithoutGroupsInput>>;
  create?: InputMaybe<Array<OffenderCreateWithoutGroupsInput>>;
  delete?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OffenderScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  set?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  update?: InputMaybe<Array<OffenderUpdateWithWhereUniqueWithoutGroupsInput>>;
  updateMany?: InputMaybe<Array<OffenderUpdateManyWithWhereWithoutGroupsInput>>;
  upsert?: InputMaybe<Array<OffenderUpsertWithWhereUniqueWithoutGroupsInput>>;
};

export type OffenderUpdateManyWithoutImagesInput = {
  connect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OffenderCreateOrConnectWithoutImagesInput>>;
  create?: InputMaybe<Array<OffenderCreateWithoutImagesInput>>;
  delete?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OffenderScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  set?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  update?: InputMaybe<Array<OffenderUpdateWithWhereUniqueWithoutImagesInput>>;
  updateMany?: InputMaybe<Array<OffenderUpdateManyWithWhereWithoutImagesInput>>;
  upsert?: InputMaybe<Array<OffenderUpsertWithWhereUniqueWithoutImagesInput>>;
};

export type OffenderUpdateManyWithoutIncidentsInput = {
  connect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OffenderCreateOrConnectWithoutIncidentsInput>>;
  create?: InputMaybe<Array<OffenderCreateWithoutIncidentsInput>>;
  delete?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OffenderScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  set?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  update?: InputMaybe<Array<OffenderUpdateWithWhereUniqueWithoutIncidentsInput>>;
  updateMany?: InputMaybe<Array<OffenderUpdateManyWithWhereWithoutIncidentsInput>>;
  upsert?: InputMaybe<Array<OffenderUpsertWithWhereUniqueWithoutIncidentsInput>>;
};

export type OffenderUpdateManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OffenderCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<OffenderCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<OffenderCreateManySchemeInputEnvelope>;
  delete?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OffenderScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  set?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  update?: InputMaybe<Array<OffenderUpdateWithWhereUniqueWithoutSchemeInput>>;
  updateMany?: InputMaybe<Array<OffenderUpdateManyWithWhereWithoutSchemeInput>>;
  upsert?: InputMaybe<Array<OffenderUpsertWithWhereUniqueWithoutSchemeInput>>;
};

export type OffenderUpdateManyWithoutTagsInput = {
  connect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OffenderCreateOrConnectWithoutTagsInput>>;
  create?: InputMaybe<Array<OffenderCreateWithoutTagsInput>>;
  delete?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OffenderScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  set?: InputMaybe<Array<OffenderWhereUniqueInput>>;
  update?: InputMaybe<Array<OffenderUpdateWithWhereUniqueWithoutTagsInput>>;
  updateMany?: InputMaybe<Array<OffenderUpdateManyWithWhereWithoutTagsInput>>;
  upsert?: InputMaybe<Array<OffenderUpsertWithWhereUniqueWithoutTagsInput>>;
};

export type OffenderUpdateOneRequiredWithoutBansInput = {
  connect?: InputMaybe<OffenderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OffenderCreateOrConnectWithoutBansInput>;
  create?: InputMaybe<OffenderCreateWithoutBansInput>;
  update?: InputMaybe<OffenderUpdateWithoutBansInput>;
  upsert?: InputMaybe<OffenderUpsertWithoutBansInput>;
};

export type OffenderUpdateOneWithoutActionsInput = {
  connect?: InputMaybe<OffenderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OffenderCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<OffenderCreateWithoutActionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<OffenderUpdateWithoutActionsInput>;
  upsert?: InputMaybe<OffenderUpsertWithoutActionsInput>;
};

export type OffenderUpdateOneWithoutIntelInput = {
  connect?: InputMaybe<OffenderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OffenderCreateOrConnectWithoutIntelInput>;
  create?: InputMaybe<OffenderCreateWithoutIntelInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<OffenderUpdateWithoutIntelInput>;
  upsert?: InputMaybe<OffenderUpsertWithoutIntelInput>;
};

export type OffenderUpdateOneWithoutRecycleBinInput = {
  connect?: InputMaybe<OffenderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OffenderCreateOrConnectWithoutRecycleBinInput>;
  create?: InputMaybe<OffenderCreateWithoutRecycleBinInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<OffenderUpdateWithoutRecycleBinInput>;
  upsert?: InputMaybe<OffenderUpsertWithoutRecycleBinInput>;
};

export type OffenderUpdateOneWithoutSuggestedIdsInput = {
  connect?: InputMaybe<OffenderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OffenderCreateOrConnectWithoutSuggestedIdsInput>;
  create?: InputMaybe<OffenderCreateWithoutSuggestedIdsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<OffenderUpdateWithoutSuggestedIdsInput>;
  upsert?: InputMaybe<OffenderUpsertWithoutSuggestedIdsInput>;
};

export type OffenderUpdateWithWhereUniqueWithoutCreatedByInput = {
  data: OffenderUpdateWithoutCreatedByInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderUpdateWithWhereUniqueWithoutGroupsInput = {
  data: OffenderUpdateWithoutGroupsInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderUpdateWithWhereUniqueWithoutImagesInput = {
  data: OffenderUpdateWithoutImagesInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderUpdateWithWhereUniqueWithoutIncidentsInput = {
  data: OffenderUpdateWithoutIncidentsInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderUpdateWithWhereUniqueWithoutSchemeInput = {
  data: OffenderUpdateWithoutSchemeInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderUpdateWithWhereUniqueWithoutTagsInput = {
  data: OffenderUpdateWithoutTagsInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderUpdateWithoutActionsInput = {
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutOffenderInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutOffendersInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutOffendersInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutOffenderInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutOffenderInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutOffendersInput>;
  suggestedIds?: InputMaybe<IntelUpdateManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagUpdateManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpdateWithoutBansInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutOffenderInput>;
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutOffendersInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutOffendersInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutOffenderInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutOffenderInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutOffendersInput>;
  suggestedIds?: InputMaybe<IntelUpdateManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagUpdateManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpdateWithoutCreatedByInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutOffenderInput>;
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutOffenderInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutOffendersInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutOffenderInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutOffenderInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutOffendersInput>;
  suggestedIds?: InputMaybe<IntelUpdateManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagUpdateManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpdateWithoutGroupsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutOffenderInput>;
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutOffenderInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutOffendersInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutOffenderInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutOffenderInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutOffendersInput>;
  suggestedIds?: InputMaybe<IntelUpdateManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagUpdateManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpdateWithoutImagesInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutOffenderInput>;
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutOffenderInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutOffendersInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutOffendersInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutOffenderInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutOffenderInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutOffendersInput>;
  suggestedIds?: InputMaybe<IntelUpdateManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagUpdateManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpdateWithoutIncidentsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutOffenderInput>;
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutOffenderInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutOffendersInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutOffendersInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutOffenderInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutOffenderInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutOffendersInput>;
  suggestedIds?: InputMaybe<IntelUpdateManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagUpdateManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpdateWithoutIntelInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutOffenderInput>;
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutOffenderInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutOffendersInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutOffendersInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutOffendersInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutOffenderInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutOffendersInput>;
  suggestedIds?: InputMaybe<IntelUpdateManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagUpdateManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpdateWithoutRecycleBinInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutOffenderInput>;
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutOffenderInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutOffendersInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutOffendersInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutOffenderInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutOffendersInput>;
  suggestedIds?: InputMaybe<IntelUpdateManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagUpdateManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpdateWithoutSchemeInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutOffenderInput>;
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutOffenderInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutOffendersInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutOffendersInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutOffenderInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutOffenderInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  suggestedIds?: InputMaybe<IntelUpdateManyWithoutSuggestedOffenderInput>;
  tags?: InputMaybe<TagUpdateManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpdateWithoutSuggestedIdsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutOffenderInput>;
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutOffenderInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutOffendersInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutOffendersInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutOffenderInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutOffenderInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutOffendersInput>;
  tags?: InputMaybe<TagUpdateManyWithoutOffendersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpdateWithoutTagsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutOffenderInput>;
  active?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  age?: InputMaybe<NullableEnumAgeFieldUpdateOperationsInput>;
  approved?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutOffenderInput>;
  build?: InputMaybe<NullableEnumBuildFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutOffendersInput>;
  dateOfBirth?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  dateSource?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableEnumGenderFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutOffendersInput>;
  hair?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutOffendersInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutOffendersInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutOffenderInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  peculiarities?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  race?: InputMaybe<NullableEnumRaceFieldUpdateOperationsInput>;
  recycleBin?: InputMaybe<RecycledItemUpdateOneWithoutOffenderInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutOffendersInput>;
  suggestedIds?: InputMaybe<IntelUpdateManyWithoutSuggestedOffenderInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type OffenderUpsertWithWhereUniqueWithoutCreatedByInput = {
  create: OffenderCreateWithoutCreatedByInput;
  update: OffenderUpdateWithoutCreatedByInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderUpsertWithWhereUniqueWithoutGroupsInput = {
  create: OffenderCreateWithoutGroupsInput;
  update: OffenderUpdateWithoutGroupsInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderUpsertWithWhereUniqueWithoutImagesInput = {
  create: OffenderCreateWithoutImagesInput;
  update: OffenderUpdateWithoutImagesInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderUpsertWithWhereUniqueWithoutIncidentsInput = {
  create: OffenderCreateWithoutIncidentsInput;
  update: OffenderUpdateWithoutIncidentsInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderUpsertWithWhereUniqueWithoutSchemeInput = {
  create: OffenderCreateWithoutSchemeInput;
  update: OffenderUpdateWithoutSchemeInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderUpsertWithWhereUniqueWithoutTagsInput = {
  create: OffenderCreateWithoutTagsInput;
  update: OffenderUpdateWithoutTagsInput;
  where: OffenderWhereUniqueInput;
};

export type OffenderUpsertWithoutActionsInput = {
  create: OffenderCreateWithoutActionsInput;
  update: OffenderUpdateWithoutActionsInput;
};

export type OffenderUpsertWithoutBansInput = {
  create: OffenderCreateWithoutBansInput;
  update: OffenderUpdateWithoutBansInput;
};

export type OffenderUpsertWithoutIntelInput = {
  create: OffenderCreateWithoutIntelInput;
  update: OffenderUpdateWithoutIntelInput;
};

export type OffenderUpsertWithoutRecycleBinInput = {
  create: OffenderCreateWithoutRecycleBinInput;
  update: OffenderUpdateWithoutRecycleBinInput;
};

export type OffenderUpsertWithoutSuggestedIdsInput = {
  create: OffenderCreateWithoutSuggestedIdsInput;
  update: OffenderUpdateWithoutSuggestedIdsInput;
};

export type OffenderWhereInput = {
  AND?: InputMaybe<Array<OffenderWhereInput>>;
  NOT?: InputMaybe<Array<OffenderWhereInput>>;
  OR?: InputMaybe<Array<OffenderWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  active?: InputMaybe<BoolNullableFilter>;
  age?: InputMaybe<EnumAgeNullableFilter>;
  approved?: InputMaybe<BoolNullableFilter>;
  bans?: InputMaybe<BanListRelationFilter>;
  build?: InputMaybe<EnumBuildNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  dateOfBirth?: InputMaybe<DateTimeNullableFilter>;
  dateSource?: InputMaybe<StringNullableFilter>;
  gender?: InputMaybe<EnumGenderNullableFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  hair?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  name?: InputMaybe<StringNullableFilter>;
  peculiarities?: InputMaybe<StringNullableFilter>;
  race?: InputMaybe<EnumRaceNullableFilter>;
  recycleBin?: InputMaybe<RecycledItemWhereInput>;
  recycled?: InputMaybe<BoolFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  suggestedIds?: InputMaybe<IntelListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
};

export type OffenderWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum OnboardSteps {
  Details = 'DETAILS',
  Password = 'PASSWORD',
  Terms = 'TERMS',
  Welcome = 'WELCOME'
}

export type OneSignalIdCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  oneSignalId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type OneSignalIdCreateManyUserInputEnvelope = {
  data?: InputMaybe<Array<OneSignalIdCreateManyUserInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type OneSignalIdCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<OneSignalIdWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OneSignalIdCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<OneSignalIdCreateWithoutUserInput>>;
  createMany?: InputMaybe<OneSignalIdCreateManyUserInputEnvelope>;
};

export type OneSignalIdCreateOrConnectWithoutUserInput = {
  create: OneSignalIdCreateWithoutUserInput;
  where: OneSignalIdWhereUniqueInput;
};

export type OneSignalIdCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  oneSignalId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
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

export type OneSignalIdUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  oneSignalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type OneSignalIdUpdateManyWithWhereWithoutUserInput = {
  data: OneSignalIdUpdateManyMutationInput;
  where: OneSignalIdScalarWhereInput;
};

export type OneSignalIdUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<OneSignalIdWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<OneSignalIdCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<OneSignalIdCreateWithoutUserInput>>;
  createMany?: InputMaybe<OneSignalIdCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<OneSignalIdWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<OneSignalIdScalarWhereInput>>;
  disconnect?: InputMaybe<Array<OneSignalIdWhereUniqueInput>>;
  set?: InputMaybe<Array<OneSignalIdWhereUniqueInput>>;
  update?: InputMaybe<Array<OneSignalIdUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<OneSignalIdUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<OneSignalIdUpsertWithWhereUniqueWithoutUserInput>>;
};

export type OneSignalIdUpdateWithWhereUniqueWithoutUserInput = {
  data: OneSignalIdUpdateWithoutUserInput;
  where: OneSignalIdWhereUniqueInput;
};

export type OneSignalIdUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  oneSignalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type OneSignalIdUpsertWithWhereUniqueWithoutUserInput = {
  create: OneSignalIdCreateWithoutUserInput;
  update: OneSignalIdUpdateWithoutUserInput;
  where: OneSignalIdWhereUniqueInput;
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

export type OneSignalIdWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  action?: Maybe<Action>;
  actions: Array<Action>;
  address?: Maybe<Address>;
  addresses: Array<Address>;
  auth0User?: Maybe<Auth0User>;
  ban?: Maybe<Ban>;
  bans: Array<Ban>;
  chat?: Maybe<Chat>;
  chats: Array<Chat>;
  currentUser?: Maybe<User>;
  group?: Maybe<Group>;
  groups: Array<Group>;
  image?: Maybe<Image>;
  images: Array<Image>;
  incident?: Maybe<Incident>;
  incidentFeed?: Maybe<Array<Maybe<Incident>>>;
  incidents: Array<Incident>;
  listIncidents?: Maybe<ListIncidents>;
  message?: Maybe<Message>;
  messages: Array<Message>;
  offender?: Maybe<Offender>;
  offenderFeed?: Maybe<Array<Maybe<Offender>>>;
  offenders: Array<Offender>;
  recycledItem?: Maybe<RecycledItem>;
  recycledItems?: Maybe<Array<Maybe<RecycledItem>>>;
  reportUserLogin?: Maybe<User>;
  scheme?: Maybe<Scheme>;
  schemes: Array<Scheme>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userChat?: Maybe<UserChat>;
  userChats: Array<UserChat>;
  userNew?: Maybe<UserNew>;
  userScheme?: Maybe<UserScheme>;
  userSchemes: Array<UserScheme>;
  users: Array<User>;
};


export type QueryActionArgs = {
  where: ActionWhereUniqueInput;
};


export type QueryActionsArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};


export type QueryAddressArgs = {
  where: AddressWhereUniqueInput;
};


export type QueryAddressesArgs = {
  after?: InputMaybe<AddressWhereUniqueInput>;
  before?: InputMaybe<AddressWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>;
  where?: InputMaybe<AddressWhereInput>;
};


export type QueryAuth0UserArgs = {
  id: Scalars['String'];
};


export type QueryBanArgs = {
  where: BanWhereUniqueInput;
};


export type QueryBansArgs = {
  after?: InputMaybe<BanWhereUniqueInput>;
  before?: InputMaybe<BanWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BanOrderByWithRelationInput>>;
  where?: InputMaybe<BanWhereInput>;
};


export type QueryChatArgs = {
  where: ChatWhereUniqueInput;
};


export type QueryChatsArgs = {
  after?: InputMaybe<ChatWhereUniqueInput>;
  before?: InputMaybe<ChatWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ChatOrderByWithRelationInput>>;
  where?: InputMaybe<ChatWhereInput>;
};


export type QueryGroupArgs = {
  where: GroupWhereUniqueInput;
};


export type QueryGroupsArgs = {
  after?: InputMaybe<GroupWhereUniqueInput>;
  before?: InputMaybe<GroupWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  where?: InputMaybe<GroupWhereInput>;
};


export type QueryImageArgs = {
  where: ImageWhereUniqueInput;
};


export type QueryImagesArgs = {
  after?: InputMaybe<ImageWhereUniqueInput>;
  before?: InputMaybe<ImageWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  where?: InputMaybe<ImageWhereInput>;
};


export type QueryIncidentArgs = {
  where: IncidentWhereUniqueInput;
};


export type QueryIncidentFeedArgs = {
  after?: InputMaybe<Scalars['String']>;
  approved?: InputMaybe<Scalars['Boolean']>;
  crimeTypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  first?: InputMaybe<Scalars['Int']>;
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order?: InputMaybe<IncidentOrderByWithRelationInput>;
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
};


export type QueryIncidentsArgs = {
  after?: InputMaybe<IncidentWhereUniqueInput>;
  before?: InputMaybe<IncidentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type QueryListIncidentsArgs = {
  after?: InputMaybe<IncidentWhereUniqueInput>;
  order?: InputMaybe<IncidentOrderByWithRelationInput>;
  scheme: SchemeWhereUniqueInput;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type QueryMessageArgs = {
  where: MessageWhereUniqueInput;
};


export type QueryMessagesArgs = {
  after?: InputMaybe<MessageWhereUniqueInput>;
  before?: InputMaybe<MessageWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  where?: InputMaybe<MessageWhereInput>;
};


export type QueryOffenderArgs = {
  where: OffenderWhereUniqueInput;
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
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  userId: Scalars['String'];
};


export type QueryOffendersArgs = {
  after?: InputMaybe<OffenderWhereUniqueInput>;
  before?: InputMaybe<OffenderWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type QueryRecycledItemArgs = {
  where: RecycledItemWhereUniqueInput;
};


export type QueryRecycledItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  dataType?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  first?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<RecycledItemOrderByWithRelationInput>;
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
};


export type QueryReportUserLoginArgs = {
  device: DeviceInfo;
  platform: Scalars['String'];
};


export type QuerySchemeArgs = {
  where: SchemeWhereUniqueInput;
};


export type QuerySchemesArgs = {
  after?: InputMaybe<SchemeWhereUniqueInput>;
  before?: InputMaybe<SchemeWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SchemeOrderByWithRelationInput>>;
  where?: InputMaybe<SchemeWhereInput>;
};


export type QueryTagArgs = {
  where: TagWhereUniqueInput;
};


export type QueryTagsArgs = {
  after?: InputMaybe<TagWhereUniqueInput>;
  before?: InputMaybe<TagWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  where?: InputMaybe<TagWhereInput>;
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
  after?: InputMaybe<UserChatWhereUniqueInput>;
  before?: InputMaybe<UserChatWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserChatOrderByWithRelationInput>>;
  where?: InputMaybe<UserChatWhereInput>;
};


export type QueryUserNewArgs = {
  id: Scalars['String'];
};


export type QueryUserSchemeArgs = {
  where: UserSchemeWhereUniqueInput;
};


export type QueryUserSchemesArgs = {
  after?: InputMaybe<UserSchemeWhereUniqueInput>;
  before?: InputMaybe<UserSchemeWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserSchemeOrderByWithRelationInput>>;
  where?: InputMaybe<UserSchemeWhereInput>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<UserWhereUniqueInput>;
  before?: InputMaybe<UserWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  where?: InputMaybe<UserWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum Race {
  Ic1 = 'IC1',
  Ic2 = 'IC2',
  Ic3 = 'IC3',
  Ic4 = 'IC4',
  Ic5 = 'IC5',
  Ic6 = 'IC6',
  Unknown = 'UNKNOWN'
}

export type RecycledItem = {
  __typename?: 'RecycledItem';
  deletedAt: Scalars['DateTime'];
  deletedBy?: Maybe<User>;
  expiresAt: Scalars['DateTime'];
  id: Scalars['String'];
  incident?: Maybe<Incident>;
  offender?: Maybe<Offender>;
  scheme: Scheme;
  systemTask: Scalars['Boolean'];
};

export type RecycledItemCreateManyDeletedByInput = {
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  expiresAt: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  schemeId: Scalars['String'];
  systemTask?: InputMaybe<Scalars['Boolean']>;
};

export type RecycledItemCreateManyDeletedByInputEnvelope = {
  data?: InputMaybe<Array<RecycledItemCreateManyDeletedByInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type RecycledItemCreateManySchemeInput = {
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  deletedById?: InputMaybe<Scalars['String']>;
  expiresAt: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
  systemTask?: InputMaybe<Scalars['Boolean']>;
};

export type RecycledItemCreateManySchemeInputEnvelope = {
  data?: InputMaybe<Array<RecycledItemCreateManySchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type RecycledItemCreateNestedManyWithoutDeletedByInput = {
  connect?: InputMaybe<Array<RecycledItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecycledItemCreateOrConnectWithoutDeletedByInput>>;
  create?: InputMaybe<Array<RecycledItemCreateWithoutDeletedByInput>>;
  createMany?: InputMaybe<RecycledItemCreateManyDeletedByInputEnvelope>;
};

export type RecycledItemCreateNestedManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<RecycledItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecycledItemCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<RecycledItemCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<RecycledItemCreateManySchemeInputEnvelope>;
};

export type RecycledItemCreateNestedOneWithoutIncidentInput = {
  connect?: InputMaybe<RecycledItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RecycledItemCreateOrConnectWithoutIncidentInput>;
  create?: InputMaybe<RecycledItemCreateWithoutIncidentInput>;
};

export type RecycledItemCreateNestedOneWithoutOffenderInput = {
  connect?: InputMaybe<RecycledItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RecycledItemCreateOrConnectWithoutOffenderInput>;
  create?: InputMaybe<RecycledItemCreateWithoutOffenderInput>;
};

export type RecycledItemCreateOrConnectWithoutDeletedByInput = {
  create: RecycledItemCreateWithoutDeletedByInput;
  where: RecycledItemWhereUniqueInput;
};

export type RecycledItemCreateOrConnectWithoutIncidentInput = {
  create: RecycledItemCreateWithoutIncidentInput;
  where: RecycledItemWhereUniqueInput;
};

export type RecycledItemCreateOrConnectWithoutOffenderInput = {
  create: RecycledItemCreateWithoutOffenderInput;
  where: RecycledItemWhereUniqueInput;
};

export type RecycledItemCreateOrConnectWithoutSchemeInput = {
  create: RecycledItemCreateWithoutSchemeInput;
  where: RecycledItemWhereUniqueInput;
};

export type RecycledItemCreateWithoutDeletedByInput = {
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  expiresAt: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutRecycleBinInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutRecycleBinInput>;
  scheme: SchemeCreateNestedOneWithoutRecycledItemsInput;
  systemTask?: InputMaybe<Scalars['Boolean']>;
};

export type RecycledItemCreateWithoutIncidentInput = {
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  deletedBy?: InputMaybe<UserCreateNestedOneWithoutRecycledItemsInput>;
  expiresAt: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutRecycleBinInput>;
  scheme: SchemeCreateNestedOneWithoutRecycledItemsInput;
  systemTask?: InputMaybe<Scalars['Boolean']>;
};

export type RecycledItemCreateWithoutOffenderInput = {
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  deletedBy?: InputMaybe<UserCreateNestedOneWithoutRecycledItemsInput>;
  expiresAt: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutRecycleBinInput>;
  scheme: SchemeCreateNestedOneWithoutRecycledItemsInput;
  systemTask?: InputMaybe<Scalars['Boolean']>;
};

export type RecycledItemCreateWithoutSchemeInput = {
  deletedAt?: InputMaybe<Scalars['DateTime']>;
  deletedBy?: InputMaybe<UserCreateNestedOneWithoutRecycledItemsInput>;
  expiresAt: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  incident?: InputMaybe<IncidentCreateNestedOneWithoutRecycleBinInput>;
  offender?: InputMaybe<OffenderCreateNestedOneWithoutRecycleBinInput>;
  systemTask?: InputMaybe<Scalars['Boolean']>;
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
};

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
};

export type RecycledItemUpdateManyMutationInput = {
  deletedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expiresAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  systemTask?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type RecycledItemUpdateManyWithWhereWithoutDeletedByInput = {
  data: RecycledItemUpdateManyMutationInput;
  where: RecycledItemScalarWhereInput;
};

export type RecycledItemUpdateManyWithWhereWithoutSchemeInput = {
  data: RecycledItemUpdateManyMutationInput;
  where: RecycledItemScalarWhereInput;
};

export type RecycledItemUpdateManyWithoutDeletedByInput = {
  connect?: InputMaybe<Array<RecycledItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecycledItemCreateOrConnectWithoutDeletedByInput>>;
  create?: InputMaybe<Array<RecycledItemCreateWithoutDeletedByInput>>;
  createMany?: InputMaybe<RecycledItemCreateManyDeletedByInputEnvelope>;
  delete?: InputMaybe<Array<RecycledItemWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RecycledItemScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RecycledItemWhereUniqueInput>>;
  set?: InputMaybe<Array<RecycledItemWhereUniqueInput>>;
  update?: InputMaybe<Array<RecycledItemUpdateWithWhereUniqueWithoutDeletedByInput>>;
  updateMany?: InputMaybe<Array<RecycledItemUpdateManyWithWhereWithoutDeletedByInput>>;
  upsert?: InputMaybe<Array<RecycledItemUpsertWithWhereUniqueWithoutDeletedByInput>>;
};

export type RecycledItemUpdateManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<RecycledItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RecycledItemCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<RecycledItemCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<RecycledItemCreateManySchemeInputEnvelope>;
  delete?: InputMaybe<Array<RecycledItemWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RecycledItemScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RecycledItemWhereUniqueInput>>;
  set?: InputMaybe<Array<RecycledItemWhereUniqueInput>>;
  update?: InputMaybe<Array<RecycledItemUpdateWithWhereUniqueWithoutSchemeInput>>;
  updateMany?: InputMaybe<Array<RecycledItemUpdateManyWithWhereWithoutSchemeInput>>;
  upsert?: InputMaybe<Array<RecycledItemUpsertWithWhereUniqueWithoutSchemeInput>>;
};

export type RecycledItemUpdateOneWithoutIncidentInput = {
  connect?: InputMaybe<RecycledItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RecycledItemCreateOrConnectWithoutIncidentInput>;
  create?: InputMaybe<RecycledItemCreateWithoutIncidentInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<RecycledItemUpdateWithoutIncidentInput>;
  upsert?: InputMaybe<RecycledItemUpsertWithoutIncidentInput>;
};

export type RecycledItemUpdateOneWithoutOffenderInput = {
  connect?: InputMaybe<RecycledItemWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RecycledItemCreateOrConnectWithoutOffenderInput>;
  create?: InputMaybe<RecycledItemCreateWithoutOffenderInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<RecycledItemUpdateWithoutOffenderInput>;
  upsert?: InputMaybe<RecycledItemUpsertWithoutOffenderInput>;
};

export type RecycledItemUpdateWithWhereUniqueWithoutDeletedByInput = {
  data: RecycledItemUpdateWithoutDeletedByInput;
  where: RecycledItemWhereUniqueInput;
};

export type RecycledItemUpdateWithWhereUniqueWithoutSchemeInput = {
  data: RecycledItemUpdateWithoutSchemeInput;
  where: RecycledItemWhereUniqueInput;
};

export type RecycledItemUpdateWithoutDeletedByInput = {
  deletedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  expiresAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutRecycleBinInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutRecycleBinInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutRecycledItemsInput>;
  systemTask?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type RecycledItemUpdateWithoutIncidentInput = {
  deletedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deletedBy?: InputMaybe<UserUpdateOneWithoutRecycledItemsInput>;
  expiresAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutRecycleBinInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutRecycledItemsInput>;
  systemTask?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type RecycledItemUpdateWithoutOffenderInput = {
  deletedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deletedBy?: InputMaybe<UserUpdateOneWithoutRecycledItemsInput>;
  expiresAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutRecycleBinInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutRecycledItemsInput>;
  systemTask?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type RecycledItemUpdateWithoutSchemeInput = {
  deletedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deletedBy?: InputMaybe<UserUpdateOneWithoutRecycledItemsInput>;
  expiresAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incident?: InputMaybe<IncidentUpdateOneWithoutRecycleBinInput>;
  offender?: InputMaybe<OffenderUpdateOneWithoutRecycleBinInput>;
  systemTask?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type RecycledItemUpsertWithWhereUniqueWithoutDeletedByInput = {
  create: RecycledItemCreateWithoutDeletedByInput;
  update: RecycledItemUpdateWithoutDeletedByInput;
  where: RecycledItemWhereUniqueInput;
};

export type RecycledItemUpsertWithWhereUniqueWithoutSchemeInput = {
  create: RecycledItemCreateWithoutSchemeInput;
  update: RecycledItemUpdateWithoutSchemeInput;
  where: RecycledItemWhereUniqueInput;
};

export type RecycledItemUpsertWithoutIncidentInput = {
  create: RecycledItemCreateWithoutIncidentInput;
  update: RecycledItemUpdateWithoutIncidentInput;
};

export type RecycledItemUpsertWithoutOffenderInput = {
  create: RecycledItemCreateWithoutOffenderInput;
  update: RecycledItemUpdateWithoutOffenderInput;
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
};

export type RecycledItemWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  incidentId?: InputMaybe<Scalars['String']>;
  offenderId?: InputMaybe<Scalars['String']>;
};

export type RefreshAuth = {
  __typename?: 'RefreshAuth';
  /** Access token used to authenticate requests to the api. */
  accessToken: Scalars['String'];
};

export type RefreshAuthData = {
  refreshToken: Scalars['String'];
};

export type RegisterPushTokenData = {
  token: Scalars['String'];
};

export type ResetPassword = {
  __typename?: 'ResetPassword';
  message: Scalars['String'];
};

export type ResetPasswordData = {
  email: Scalars['String'];
};

export enum Role {
  ContentAdmin = 'CONTENT_ADMIN',
  SchemeAdmin = 'SCHEME_ADMIN',
  ShopsafeAdmin = 'SHOPSAFE_ADMIN',
  User = 'USER'
}

export type Scheme = {
  __typename?: 'Scheme';
  actions: Array<Action>;
  actionsInScheme: Array<Action>;
  autoApproveIncidents: Scalars['Boolean'];
  autoApproveOffenders: Scalars['Boolean'];
  bans: Array<Ban>;
  chats: Array<Chat>;
  createdAt: Scalars['DateTime'];
  groups: Array<Group>;
  id: Scalars['String'];
  images: Array<Image>;
  incidentRetention?: Maybe<Scalars['Int']>;
  incidents: Array<Incident>;
  logo?: Maybe<Image>;
  members: Array<UserScheme>;
  messages: Array<Message>;
  name: Scalars['String'];
  offenderRetention?: Maybe<Scalars['Int']>;
  offenders: Array<Offender>;
  recycledItems: Array<RecycledItem>;
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime'];
};


export type SchemeActionsArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};


export type SchemeActionsInSchemeArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};


export type SchemeBansArgs = {
  after?: InputMaybe<BanWhereUniqueInput>;
  before?: InputMaybe<BanWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BanOrderByWithRelationInput>>;
  where?: InputMaybe<BanWhereInput>;
};


export type SchemeChatsArgs = {
  after?: InputMaybe<ChatWhereUniqueInput>;
  before?: InputMaybe<ChatWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ChatOrderByWithRelationInput>>;
  where?: InputMaybe<ChatWhereInput>;
};


export type SchemeGroupsArgs = {
  after?: InputMaybe<GroupWhereUniqueInput>;
  before?: InputMaybe<GroupWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  where?: InputMaybe<GroupWhereInput>;
};


export type SchemeImagesArgs = {
  after?: InputMaybe<ImageWhereUniqueInput>;
  before?: InputMaybe<ImageWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ImageOrderByWithRelationInput>>;
  where?: InputMaybe<ImageWhereInput>;
};


export type SchemeIncidentsArgs = {
  after?: InputMaybe<IncidentWhereUniqueInput>;
  before?: InputMaybe<IncidentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type SchemeMembersArgs = {
  after?: InputMaybe<UserSchemeWhereUniqueInput>;
  before?: InputMaybe<UserSchemeWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserSchemeOrderByWithRelationInput>>;
  where?: InputMaybe<UserSchemeWhereInput>;
};


export type SchemeMessagesArgs = {
  after?: InputMaybe<MessageWhereUniqueInput>;
  before?: InputMaybe<MessageWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  where?: InputMaybe<MessageWhereInput>;
};


export type SchemeOffendersArgs = {
  after?: InputMaybe<OffenderWhereUniqueInput>;
  before?: InputMaybe<OffenderWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SchemeRecycledItemsArgs = {
  after?: InputMaybe<RecycledItemWhereUniqueInput>;
  before?: InputMaybe<RecycledItemWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type SchemeTagsArgs = {
  after?: InputMaybe<TagWhereUniqueInput>;
  before?: InputMaybe<TagWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  where?: InputMaybe<TagWhereInput>;
};

export type SchemeCreateInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateManyLogoInput = {
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateManyLogoInputEnvelope = {
  data?: InputMaybe<Array<SchemeCreateManyLogoInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SchemeCreateNestedManyWithoutLogoInput = {
  connect?: InputMaybe<Array<SchemeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SchemeCreateOrConnectWithoutLogoInput>>;
  create?: InputMaybe<Array<SchemeCreateWithoutLogoInput>>;
  createMany?: InputMaybe<SchemeCreateManyLogoInputEnvelope>;
};

export type SchemeCreateNestedOneWithoutActionsInSchemeInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutActionsInSchemeInput>;
  create?: InputMaybe<SchemeCreateWithoutActionsInSchemeInput>;
};

export type SchemeCreateNestedOneWithoutActionsInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<SchemeCreateWithoutActionsInput>;
};

export type SchemeCreateNestedOneWithoutBansInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutBansInput>;
  create?: InputMaybe<SchemeCreateWithoutBansInput>;
};

export type SchemeCreateNestedOneWithoutChatsInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutChatsInput>;
  create?: InputMaybe<SchemeCreateWithoutChatsInput>;
};

export type SchemeCreateNestedOneWithoutGroupsInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutGroupsInput>;
  create?: InputMaybe<SchemeCreateWithoutGroupsInput>;
};

export type SchemeCreateNestedOneWithoutImagesInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutImagesInput>;
  create?: InputMaybe<SchemeCreateWithoutImagesInput>;
};

export type SchemeCreateNestedOneWithoutIncidentsInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutIncidentsInput>;
  create?: InputMaybe<SchemeCreateWithoutIncidentsInput>;
};

export type SchemeCreateNestedOneWithoutIntelInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutIntelInput>;
  create?: InputMaybe<SchemeCreateWithoutIntelInput>;
};

export type SchemeCreateNestedOneWithoutMembersInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutMembersInput>;
  create?: InputMaybe<SchemeCreateWithoutMembersInput>;
};

export type SchemeCreateNestedOneWithoutMessagesInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<SchemeCreateWithoutMessagesInput>;
};

export type SchemeCreateNestedOneWithoutOffendersInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutOffendersInput>;
  create?: InputMaybe<SchemeCreateWithoutOffendersInput>;
};

export type SchemeCreateNestedOneWithoutRecycledItemsInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutRecycledItemsInput>;
  create?: InputMaybe<SchemeCreateWithoutRecycledItemsInput>;
};

export type SchemeCreateNestedOneWithoutTagsInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutTagsInput>;
  create?: InputMaybe<SchemeCreateWithoutTagsInput>;
};

export type SchemeCreateOrConnectWithoutActionsInSchemeInput = {
  create: SchemeCreateWithoutActionsInSchemeInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutActionsInput = {
  create: SchemeCreateWithoutActionsInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutBansInput = {
  create: SchemeCreateWithoutBansInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutChatsInput = {
  create: SchemeCreateWithoutChatsInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutGroupsInput = {
  create: SchemeCreateWithoutGroupsInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutImagesInput = {
  create: SchemeCreateWithoutImagesInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutIncidentsInput = {
  create: SchemeCreateWithoutIncidentsInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutIntelInput = {
  create: SchemeCreateWithoutIntelInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutLogoInput = {
  create: SchemeCreateWithoutLogoInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutMembersInput = {
  create: SchemeCreateWithoutMembersInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutMessagesInput = {
  create: SchemeCreateWithoutMessagesInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutOffendersInput = {
  create: SchemeCreateWithoutOffendersInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutRecycledItemsInput = {
  create: SchemeCreateWithoutRecycledItemsInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateOrConnectWithoutTagsInput = {
  create: SchemeCreateWithoutTagsInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeCreateWithoutActionsInSchemeInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutActionsInput = {
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutBansInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutChatsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutGroupsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutImagesInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutIncidentsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutIntelInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutLogoInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutMembersInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutMessagesInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutOffendersInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutRecycledItemsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeCreateWithoutTagsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionCreateNestedManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<Scalars['Boolean']>;
  autoApproveOffenders?: InputMaybe<Scalars['Boolean']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatCreateNestedManyWithoutSchemeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groups?: InputMaybe<GroupCreateNestedManyWithoutSchemeInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<Scalars['Int']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageCreateNestedOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeCreateNestedManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutSchemeInput>;
  name: Scalars['String'];
  offenderRetention?: InputMaybe<Scalars['Int']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SchemeListRelationFilter = {
  every?: InputMaybe<SchemeWhereInput>;
  none?: InputMaybe<SchemeWhereInput>;
  some?: InputMaybe<SchemeWhereInput>;
};

export type SchemeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type SchemeOrderByWithRelationInput = {
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  actionsInScheme?: InputMaybe<ActionOrderByRelationAggregateInput>;
  autoApproveIncidents?: InputMaybe<SortOrder>;
  autoApproveOffenders?: InputMaybe<SortOrder>;
  bans?: InputMaybe<BanOrderByRelationAggregateInput>;
  chats?: InputMaybe<ChatOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  incidentRetention?: InputMaybe<SortOrder>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  intel?: InputMaybe<IntelOrderByRelationAggregateInput>;
  logo?: InputMaybe<ImageOrderByWithRelationInput>;
  logoId?: InputMaybe<SortOrder>;
  members?: InputMaybe<UserSchemeOrderByRelationAggregateInput>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  offenderRetention?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  recycledItems?: InputMaybe<RecycledItemOrderByRelationAggregateInput>;
  tags?: InputMaybe<TagOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SchemeScalarWhereInput = {
  AND?: InputMaybe<Array<SchemeScalarWhereInput>>;
  NOT?: InputMaybe<Array<SchemeScalarWhereInput>>;
  OR?: InputMaybe<Array<SchemeScalarWhereInput>>;
  autoApproveIncidents?: InputMaybe<BoolFilter>;
  autoApproveOffenders?: InputMaybe<BoolFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  incidentRetention?: InputMaybe<IntNullableFilter>;
  logoId?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  offenderRetention?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SchemeUpdateInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateManyMutationInput = {
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateManyWithWhereWithoutLogoInput = {
  data: SchemeUpdateManyMutationInput;
  where: SchemeScalarWhereInput;
};

export type SchemeUpdateManyWithoutLogoInput = {
  connect?: InputMaybe<Array<SchemeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SchemeCreateOrConnectWithoutLogoInput>>;
  create?: InputMaybe<Array<SchemeCreateWithoutLogoInput>>;
  createMany?: InputMaybe<SchemeCreateManyLogoInputEnvelope>;
  delete?: InputMaybe<Array<SchemeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SchemeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SchemeWhereUniqueInput>>;
  set?: InputMaybe<Array<SchemeWhereUniqueInput>>;
  update?: InputMaybe<Array<SchemeUpdateWithWhereUniqueWithoutLogoInput>>;
  updateMany?: InputMaybe<Array<SchemeUpdateManyWithWhereWithoutLogoInput>>;
  upsert?: InputMaybe<Array<SchemeUpsertWithWhereUniqueWithoutLogoInput>>;
};

export type SchemeUpdateOneRequiredWithoutActionsInSchemeInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutActionsInSchemeInput>;
  create?: InputMaybe<SchemeCreateWithoutActionsInSchemeInput>;
  update?: InputMaybe<SchemeUpdateWithoutActionsInSchemeInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutActionsInSchemeInput>;
};

export type SchemeUpdateOneRequiredWithoutBansInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutBansInput>;
  create?: InputMaybe<SchemeCreateWithoutBansInput>;
  update?: InputMaybe<SchemeUpdateWithoutBansInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutBansInput>;
};

export type SchemeUpdateOneRequiredWithoutChatsInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutChatsInput>;
  create?: InputMaybe<SchemeCreateWithoutChatsInput>;
  update?: InputMaybe<SchemeUpdateWithoutChatsInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutChatsInput>;
};

export type SchemeUpdateOneRequiredWithoutGroupsInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutGroupsInput>;
  create?: InputMaybe<SchemeCreateWithoutGroupsInput>;
  update?: InputMaybe<SchemeUpdateWithoutGroupsInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutGroupsInput>;
};

export type SchemeUpdateOneRequiredWithoutImagesInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutImagesInput>;
  create?: InputMaybe<SchemeCreateWithoutImagesInput>;
  update?: InputMaybe<SchemeUpdateWithoutImagesInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutImagesInput>;
};

export type SchemeUpdateOneRequiredWithoutIncidentsInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutIncidentsInput>;
  create?: InputMaybe<SchemeCreateWithoutIncidentsInput>;
  update?: InputMaybe<SchemeUpdateWithoutIncidentsInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutIncidentsInput>;
};

export type SchemeUpdateOneRequiredWithoutIntelInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutIntelInput>;
  create?: InputMaybe<SchemeCreateWithoutIntelInput>;
  update?: InputMaybe<SchemeUpdateWithoutIntelInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutIntelInput>;
};

export type SchemeUpdateOneRequiredWithoutMembersInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutMembersInput>;
  create?: InputMaybe<SchemeCreateWithoutMembersInput>;
  update?: InputMaybe<SchemeUpdateWithoutMembersInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutMembersInput>;
};

export type SchemeUpdateOneRequiredWithoutMessagesInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<SchemeCreateWithoutMessagesInput>;
  update?: InputMaybe<SchemeUpdateWithoutMessagesInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutMessagesInput>;
};

export type SchemeUpdateOneRequiredWithoutOffendersInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutOffendersInput>;
  create?: InputMaybe<SchemeCreateWithoutOffendersInput>;
  update?: InputMaybe<SchemeUpdateWithoutOffendersInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutOffendersInput>;
};

export type SchemeUpdateOneRequiredWithoutRecycledItemsInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutRecycledItemsInput>;
  create?: InputMaybe<SchemeCreateWithoutRecycledItemsInput>;
  update?: InputMaybe<SchemeUpdateWithoutRecycledItemsInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutRecycledItemsInput>;
};

export type SchemeUpdateOneRequiredWithoutTagsInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutTagsInput>;
  create?: InputMaybe<SchemeCreateWithoutTagsInput>;
  update?: InputMaybe<SchemeUpdateWithoutTagsInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutTagsInput>;
};

export type SchemeUpdateOneWithoutActionsInput = {
  connect?: InputMaybe<SchemeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchemeCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<SchemeCreateWithoutActionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<SchemeUpdateWithoutActionsInput>;
  upsert?: InputMaybe<SchemeUpsertWithoutActionsInput>;
};

export type SchemeUpdateWithWhereUniqueWithoutLogoInput = {
  data: SchemeUpdateWithoutLogoInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeUpdateWithoutActionsInSchemeInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutActionsInput = {
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutBansInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutChatsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutGroupsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutImagesInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutIncidentsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutIntelInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutLogoInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutMembersInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutMessagesInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutOffendersInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutRecycledItemsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  tags?: InputMaybe<TagUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpdateWithoutTagsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutSchemeInput>;
  actionsInScheme?: InputMaybe<ActionUpdateManyWithoutInSchemeInput>;
  autoApproveIncidents?: InputMaybe<BoolFieldUpdateOperationsInput>;
  autoApproveOffenders?: InputMaybe<BoolFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutSchemeInput>;
  chats?: InputMaybe<ChatUpdateManyWithoutSchemeInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutSchemeInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutSchemeInput>;
  incidentRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutSchemeInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutSchemeInput>;
  logo?: InputMaybe<ImageUpdateOneWithoutSchemeInput>;
  members?: InputMaybe<UserSchemeUpdateManyWithoutSchemeInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutSchemeInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenderRetention?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutSchemeInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutSchemeInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type SchemeUpsertWithWhereUniqueWithoutLogoInput = {
  create: SchemeCreateWithoutLogoInput;
  update: SchemeUpdateWithoutLogoInput;
  where: SchemeWhereUniqueInput;
};

export type SchemeUpsertWithoutActionsInSchemeInput = {
  create: SchemeCreateWithoutActionsInSchemeInput;
  update: SchemeUpdateWithoutActionsInSchemeInput;
};

export type SchemeUpsertWithoutActionsInput = {
  create: SchemeCreateWithoutActionsInput;
  update: SchemeUpdateWithoutActionsInput;
};

export type SchemeUpsertWithoutBansInput = {
  create: SchemeCreateWithoutBansInput;
  update: SchemeUpdateWithoutBansInput;
};

export type SchemeUpsertWithoutChatsInput = {
  create: SchemeCreateWithoutChatsInput;
  update: SchemeUpdateWithoutChatsInput;
};

export type SchemeUpsertWithoutGroupsInput = {
  create: SchemeCreateWithoutGroupsInput;
  update: SchemeUpdateWithoutGroupsInput;
};

export type SchemeUpsertWithoutImagesInput = {
  create: SchemeCreateWithoutImagesInput;
  update: SchemeUpdateWithoutImagesInput;
};

export type SchemeUpsertWithoutIncidentsInput = {
  create: SchemeCreateWithoutIncidentsInput;
  update: SchemeUpdateWithoutIncidentsInput;
};

export type SchemeUpsertWithoutIntelInput = {
  create: SchemeCreateWithoutIntelInput;
  update: SchemeUpdateWithoutIntelInput;
};

export type SchemeUpsertWithoutMembersInput = {
  create: SchemeCreateWithoutMembersInput;
  update: SchemeUpdateWithoutMembersInput;
};

export type SchemeUpsertWithoutMessagesInput = {
  create: SchemeCreateWithoutMessagesInput;
  update: SchemeUpdateWithoutMessagesInput;
};

export type SchemeUpsertWithoutOffendersInput = {
  create: SchemeCreateWithoutOffendersInput;
  update: SchemeUpdateWithoutOffendersInput;
};

export type SchemeUpsertWithoutRecycledItemsInput = {
  create: SchemeCreateWithoutRecycledItemsInput;
  update: SchemeUpdateWithoutRecycledItemsInput;
};

export type SchemeUpsertWithoutTagsInput = {
  create: SchemeCreateWithoutTagsInput;
  update: SchemeUpdateWithoutTagsInput;
};

export type SchemeWhereInput = {
  AND?: InputMaybe<Array<SchemeWhereInput>>;
  NOT?: InputMaybe<Array<SchemeWhereInput>>;
  OR?: InputMaybe<Array<SchemeWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  actionsInScheme?: InputMaybe<ActionListRelationFilter>;
  autoApproveIncidents?: InputMaybe<BoolFilter>;
  autoApproveOffenders?: InputMaybe<BoolFilter>;
  bans?: InputMaybe<BanListRelationFilter>;
  chats?: InputMaybe<ChatListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  incidentRetention?: InputMaybe<IntNullableFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  logo?: InputMaybe<ImageWhereInput>;
  logoId?: InputMaybe<StringNullableFilter>;
  members?: InputMaybe<UserSchemeListRelationFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  offenderRetention?: InputMaybe<IntNullableFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  recycledItems?: InputMaybe<RecycledItemListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SchemeWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type SetPasswordData = {
  id: Scalars['String'];
  password: Scalars['String'];
};

export type SignIn = {
  __typename?: 'SignIn';
  /** Access token used to authenticate requests to the api. */
  accessToken: Scalars['String'];
  /** Refresh token provided by auth0. */
  refreshToken: Scalars['String'];
};

export type SignInData = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

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

export type Subscription = {
  __typename?: 'Subscription';
  newMessage?: Maybe<Message>;
};


export type SubscriptionNewMessageArgs = {
  chatId: Scalars['ID'];
};

export type SuggestOffenderData = {
  incident: IncidentConnectOne;
  offender: OffenderConnectOne;
  suggestedOffender: OffenderConnectOne;
};

export type SystemTask = {
  __typename?: 'SystemTask';
  success?: Maybe<Scalars['Boolean']>;
};

export type Tag = {
  __typename?: 'Tag';
  actions: Array<Action>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  dataType: Model;
  description: Scalars['String'];
  id: Scalars['String'];
  incidents: Array<Incident>;
  name: Scalars['String'];
  offenders: Array<Offender>;
  scheme: Scheme;
  updatedAt: Scalars['DateTime'];
  uploaded?: Maybe<Scalars['Boolean']>;
  users: Array<User>;
};


export type TagActionsArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};


export type TagIncidentsArgs = {
  after?: InputMaybe<IncidentWhereUniqueInput>;
  before?: InputMaybe<IncidentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type TagOffendersArgs = {
  after?: InputMaybe<OffenderWhereUniqueInput>;
  before?: InputMaybe<OffenderWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type TagUsersArgs = {
  after?: InputMaybe<UserWhereUniqueInput>;
  before?: InputMaybe<UserWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  where?: InputMaybe<UserWhereInput>;
};

export type TagCreateInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutTagInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutCreatedTagsInput;
  dataType: Model;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCrimeTypesInput>;
  name: Scalars['String'];
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutTagsInput>;
  scheme: SchemeCreateNestedOneWithoutTagsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<UserCreateNestedManyWithoutTagsInput>;
};

export type TagCreateManyCreatedByInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  schemeId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type TagCreateManyCreatedByInputEnvelope = {
  data?: InputMaybe<Array<TagCreateManyCreatedByInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TagCreateManySchemeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdById: Scalars['String'];
  dataType: Model;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type TagCreateManySchemeInputEnvelope = {
  data?: InputMaybe<Array<TagCreateManySchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TagCreateNestedManyWithoutCreatedByInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutCreatedByInput>>;
  create?: InputMaybe<Array<TagCreateWithoutCreatedByInput>>;
  createMany?: InputMaybe<TagCreateManyCreatedByInputEnvelope>;
};

export type TagCreateNestedManyWithoutIncidentsInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutIncidentsInput>>;
  create?: InputMaybe<Array<TagCreateWithoutIncidentsInput>>;
};

export type TagCreateNestedManyWithoutOffendersInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutOffendersInput>>;
  create?: InputMaybe<Array<TagCreateWithoutOffendersInput>>;
};

export type TagCreateNestedManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<TagCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<TagCreateManySchemeInputEnvelope>;
};

export type TagCreateNestedManyWithoutUsersInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<TagCreateWithoutUsersInput>>;
};

export type TagCreateNestedOneWithoutActionsInput = {
  connect?: InputMaybe<TagWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TagCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<TagCreateWithoutActionsInput>;
};

export type TagCreateOrConnectWithoutActionsInput = {
  create: TagCreateWithoutActionsInput;
  where: TagWhereUniqueInput;
};

export type TagCreateOrConnectWithoutCreatedByInput = {
  create: TagCreateWithoutCreatedByInput;
  where: TagWhereUniqueInput;
};

export type TagCreateOrConnectWithoutIncidentsInput = {
  create: TagCreateWithoutIncidentsInput;
  where: TagWhereUniqueInput;
};

export type TagCreateOrConnectWithoutOffendersInput = {
  create: TagCreateWithoutOffendersInput;
  where: TagWhereUniqueInput;
};

export type TagCreateOrConnectWithoutSchemeInput = {
  create: TagCreateWithoutSchemeInput;
  where: TagWhereUniqueInput;
};

export type TagCreateOrConnectWithoutUsersInput = {
  create: TagCreateWithoutUsersInput;
  where: TagWhereUniqueInput;
};

export type TagCreateWithoutActionsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutCreatedTagsInput;
  dataType: Model;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCrimeTypesInput>;
  name: Scalars['String'];
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutTagsInput>;
  scheme: SchemeCreateNestedOneWithoutTagsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<UserCreateNestedManyWithoutTagsInput>;
};

export type TagCreateWithoutCreatedByInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutTagInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dataType: Model;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCrimeTypesInput>;
  name: Scalars['String'];
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutTagsInput>;
  scheme: SchemeCreateNestedOneWithoutTagsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<UserCreateNestedManyWithoutTagsInput>;
};

export type TagCreateWithoutIncidentsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutTagInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutCreatedTagsInput;
  dataType: Model;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutTagsInput>;
  scheme: SchemeCreateNestedOneWithoutTagsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<UserCreateNestedManyWithoutTagsInput>;
};

export type TagCreateWithoutOffendersInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutTagInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutCreatedTagsInput;
  dataType: Model;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCrimeTypesInput>;
  name: Scalars['String'];
  scheme: SchemeCreateNestedOneWithoutTagsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<UserCreateNestedManyWithoutTagsInput>;
};

export type TagCreateWithoutSchemeInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutTagInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutCreatedTagsInput;
  dataType: Model;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCrimeTypesInput>;
  name: Scalars['String'];
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutTagsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
  users?: InputMaybe<UserCreateNestedManyWithoutTagsInput>;
};

export type TagCreateWithoutUsersInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutTagInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdBy: UserCreateNestedOneWithoutCreatedTagsInput;
  dataType: Model;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCrimeTypesInput>;
  name: Scalars['String'];
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutTagsInput>;
  scheme: SchemeCreateNestedOneWithoutTagsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type TagListRelationFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TagOrderByWithRelationInput = {
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  dataType?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  scheme?: InputMaybe<SchemeOrderByWithRelationInput>;
  schemeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uploaded?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
};

export type TagScalarWhereInput = {
  AND?: InputMaybe<Array<TagScalarWhereInput>>;
  NOT?: InputMaybe<Array<TagScalarWhereInput>>;
  OR?: InputMaybe<Array<TagScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdById?: InputMaybe<StringFilter>;
  dataType?: InputMaybe<EnumModelFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
};

export type TagUpdateInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutTagInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutCreatedTagsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCrimeTypesInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutTagsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutTagsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutTagsInput>;
};

export type TagUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type TagUpdateManyWithWhereWithoutCreatedByInput = {
  data: TagUpdateManyMutationInput;
  where: TagScalarWhereInput;
};

export type TagUpdateManyWithWhereWithoutIncidentsInput = {
  data: TagUpdateManyMutationInput;
  where: TagScalarWhereInput;
};

export type TagUpdateManyWithWhereWithoutOffendersInput = {
  data: TagUpdateManyMutationInput;
  where: TagScalarWhereInput;
};

export type TagUpdateManyWithWhereWithoutSchemeInput = {
  data: TagUpdateManyMutationInput;
  where: TagScalarWhereInput;
};

export type TagUpdateManyWithWhereWithoutUsersInput = {
  data: TagUpdateManyMutationInput;
  where: TagScalarWhereInput;
};

export type TagUpdateManyWithoutCreatedByInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutCreatedByInput>>;
  create?: InputMaybe<Array<TagCreateWithoutCreatedByInput>>;
  createMany?: InputMaybe<TagCreateManyCreatedByInputEnvelope>;
  delete?: InputMaybe<Array<TagWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TagScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
  update?: InputMaybe<Array<TagUpdateWithWhereUniqueWithoutCreatedByInput>>;
  updateMany?: InputMaybe<Array<TagUpdateManyWithWhereWithoutCreatedByInput>>;
  upsert?: InputMaybe<Array<TagUpsertWithWhereUniqueWithoutCreatedByInput>>;
};

export type TagUpdateManyWithoutIncidentsInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutIncidentsInput>>;
  create?: InputMaybe<Array<TagCreateWithoutIncidentsInput>>;
  delete?: InputMaybe<Array<TagWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TagScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
  update?: InputMaybe<Array<TagUpdateWithWhereUniqueWithoutIncidentsInput>>;
  updateMany?: InputMaybe<Array<TagUpdateManyWithWhereWithoutIncidentsInput>>;
  upsert?: InputMaybe<Array<TagUpsertWithWhereUniqueWithoutIncidentsInput>>;
};

export type TagUpdateManyWithoutOffendersInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutOffendersInput>>;
  create?: InputMaybe<Array<TagCreateWithoutOffendersInput>>;
  delete?: InputMaybe<Array<TagWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TagScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
  update?: InputMaybe<Array<TagUpdateWithWhereUniqueWithoutOffendersInput>>;
  updateMany?: InputMaybe<Array<TagUpdateManyWithWhereWithoutOffendersInput>>;
  upsert?: InputMaybe<Array<TagUpsertWithWhereUniqueWithoutOffendersInput>>;
};

export type TagUpdateManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<TagCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<TagCreateManySchemeInputEnvelope>;
  delete?: InputMaybe<Array<TagWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TagScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
  update?: InputMaybe<Array<TagUpdateWithWhereUniqueWithoutSchemeInput>>;
  updateMany?: InputMaybe<Array<TagUpdateManyWithWhereWithoutSchemeInput>>;
  upsert?: InputMaybe<Array<TagUpsertWithWhereUniqueWithoutSchemeInput>>;
};

export type TagUpdateManyWithoutUsersInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<TagCreateWithoutUsersInput>>;
  delete?: InputMaybe<Array<TagWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TagScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
  update?: InputMaybe<Array<TagUpdateWithWhereUniqueWithoutUsersInput>>;
  updateMany?: InputMaybe<Array<TagUpdateManyWithWhereWithoutUsersInput>>;
  upsert?: InputMaybe<Array<TagUpsertWithWhereUniqueWithoutUsersInput>>;
};

export type TagUpdateOneWithoutActionsInput = {
  connect?: InputMaybe<TagWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TagCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<TagCreateWithoutActionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<TagUpdateWithoutActionsInput>;
  upsert?: InputMaybe<TagUpsertWithoutActionsInput>;
};

export type TagUpdateWithWhereUniqueWithoutCreatedByInput = {
  data: TagUpdateWithoutCreatedByInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateWithWhereUniqueWithoutIncidentsInput = {
  data: TagUpdateWithoutIncidentsInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateWithWhereUniqueWithoutOffendersInput = {
  data: TagUpdateWithoutOffendersInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateWithWhereUniqueWithoutSchemeInput = {
  data: TagUpdateWithoutSchemeInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateWithWhereUniqueWithoutUsersInput = {
  data: TagUpdateWithoutUsersInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateWithoutActionsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutCreatedTagsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCrimeTypesInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutTagsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutTagsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutTagsInput>;
};

export type TagUpdateWithoutCreatedByInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutTagInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCrimeTypesInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutTagsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutTagsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutTagsInput>;
};

export type TagUpdateWithoutIncidentsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutTagInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutCreatedTagsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutTagsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutTagsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutTagsInput>;
};

export type TagUpdateWithoutOffendersInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutTagInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutCreatedTagsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCrimeTypesInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutTagsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutTagsInput>;
};

export type TagUpdateWithoutSchemeInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutTagInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutCreatedTagsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCrimeTypesInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutTagsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutTagsInput>;
};

export type TagUpdateWithoutUsersInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutTagInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdBy?: InputMaybe<UserUpdateOneRequiredWithoutCreatedTagsInput>;
  dataType?: InputMaybe<EnumModelFieldUpdateOperationsInput>;
  description?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCrimeTypesInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutTagsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutTagsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
};

export type TagUpsertWithWhereUniqueWithoutCreatedByInput = {
  create: TagCreateWithoutCreatedByInput;
  update: TagUpdateWithoutCreatedByInput;
  where: TagWhereUniqueInput;
};

export type TagUpsertWithWhereUniqueWithoutIncidentsInput = {
  create: TagCreateWithoutIncidentsInput;
  update: TagUpdateWithoutIncidentsInput;
  where: TagWhereUniqueInput;
};

export type TagUpsertWithWhereUniqueWithoutOffendersInput = {
  create: TagCreateWithoutOffendersInput;
  update: TagUpdateWithoutOffendersInput;
  where: TagWhereUniqueInput;
};

export type TagUpsertWithWhereUniqueWithoutSchemeInput = {
  create: TagCreateWithoutSchemeInput;
  update: TagUpdateWithoutSchemeInput;
  where: TagWhereUniqueInput;
};

export type TagUpsertWithWhereUniqueWithoutUsersInput = {
  create: TagCreateWithoutUsersInput;
  update: TagUpdateWithoutUsersInput;
  where: TagWhereUniqueInput;
};

export type TagUpsertWithoutActionsInput = {
  create: TagCreateWithoutActionsInput;
  update: TagUpdateWithoutActionsInput;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  createdById?: InputMaybe<StringFilter>;
  dataType?: InputMaybe<EnumModelFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  scheme?: InputMaybe<SchemeWhereInput>;
  schemeId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolNullableFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type UniqueId = {
  id: Scalars['String'];
};

export type UnlinkedImage = {
  __typename?: 'UnlinkedImage';
  image?: Maybe<Image>;
  localId?: Maybe<Scalars['String']>;
};

export type UpdatePasswordData = {
  currentPassword: Scalars['String'];
  id: Scalars['String'];
  newPassword: Scalars['String'];
};

export type UploadImage = {
  file: Scalars['Upload'];
  offenders: Array<InputMaybe<ImageOffender>>;
};

export type UploadIncidentImage = {
  file: Scalars['Upload'];
  offenders?: InputMaybe<Array<InputMaybe<ImageOffender>>>;
};

export type UploadOffenderImage = {
  file: Scalars['Upload'];
};

export type UploadSchemeImage = {
  file: Scalars['Upload'];
};

export type User = {
  __typename?: 'User';
  actions: Array<Action>;
  actionsByUser: Array<Action>;
  addresses: Array<Address>;
  auth0Id?: Maybe<Scalars['String']>;
  bans: Array<Ban>;
  chats: Array<UserChat>;
  createdAt: Scalars['DateTime'];
  createdTags: Array<Tag>;
  disabled: Scalars['Boolean'];
  email: Scalars['String'];
  expoPushTokens: Array<ExpoPushToken>;
  firstLetter?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  groups: Array<Group>;
  id: Scalars['String'];
  incidentEmail: Scalars['Boolean'];
  incidentPush: Scalars['Boolean'];
  incidents: Array<Incident>;
  ipAddress?: Maybe<Scalars['String']>;
  messagePush: Scalars['Boolean'];
  messages: Array<Message>;
  newUser: Scalars['Boolean'];
  offenderEmail: Scalars['Boolean'];
  offenderPush: Scalars['Boolean'];
  offenders: Array<Offender>;
  onboardSteps: OnboardSteps;
  organisation: Scalars['String'];
  platform?: Maybe<Scalars['String']>;
  recycled: Scalars['Boolean'];
  schemes: Array<UserScheme>;
  status?: Maybe<Scalars['String']>;
  tags: Array<Tag>;
  termsSigned: Scalars['Boolean'];
  timeSigned?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
  uploaded: Scalars['Boolean'];
};


export type UserActionsArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};


export type UserActionsByUserArgs = {
  after?: InputMaybe<ActionWhereUniqueInput>;
  before?: InputMaybe<ActionWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ActionOrderByWithRelationInput>>;
  where?: InputMaybe<ActionWhereInput>;
};


export type UserAddressesArgs = {
  after?: InputMaybe<AddressWhereUniqueInput>;
  before?: InputMaybe<AddressWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AddressOrderByWithRelationInput>>;
  where?: InputMaybe<AddressWhereInput>;
};


export type UserBansArgs = {
  after?: InputMaybe<BanWhereUniqueInput>;
  before?: InputMaybe<BanWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BanOrderByWithRelationInput>>;
  where?: InputMaybe<BanWhereInput>;
};


export type UserChatsArgs = {
  after?: InputMaybe<UserChatWhereUniqueInput>;
  before?: InputMaybe<UserChatWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserChatOrderByWithRelationInput>>;
  where?: InputMaybe<UserChatWhereInput>;
};


export type UserCreatedTagsArgs = {
  after?: InputMaybe<TagWhereUniqueInput>;
  before?: InputMaybe<TagWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  where?: InputMaybe<TagWhereInput>;
};


export type UserExpoPushTokensArgs = {
  after?: InputMaybe<ExpoPushTokenWhereUniqueInput>;
  before?: InputMaybe<ExpoPushTokenWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserGroupsArgs = {
  after?: InputMaybe<GroupWhereUniqueInput>;
  before?: InputMaybe<GroupWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput>>;
  where?: InputMaybe<GroupWhereInput>;
};


export type UserIncidentsArgs = {
  after?: InputMaybe<IncidentWhereUniqueInput>;
  before?: InputMaybe<IncidentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<IncidentOrderByWithRelationInput>>;
  where?: InputMaybe<IncidentWhereInput>;
};


export type UserMessagesArgs = {
  after?: InputMaybe<MessageWhereUniqueInput>;
  before?: InputMaybe<MessageWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessageOrderByWithRelationInput>>;
  where?: InputMaybe<MessageWhereInput>;
};


export type UserOffendersArgs = {
  after?: InputMaybe<OffenderWhereUniqueInput>;
  before?: InputMaybe<OffenderWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OffenderOrderByWithRelationInput>>;
  where?: InputMaybe<OffenderWhereInput>;
};


export type UserSchemesArgs = {
  after?: InputMaybe<UserSchemeWhereUniqueInput>;
  before?: InputMaybe<UserSchemeWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserSchemeOrderByWithRelationInput>>;
  where?: InputMaybe<UserSchemeWhereInput>;
};


export type UserTagsArgs = {
  after?: InputMaybe<TagWhereUniqueInput>;
  before?: InputMaybe<TagWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  where?: InputMaybe<TagWhereInput>;
};

export type UserChat = {
  __typename?: 'UserChat';
  chat: Chat;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  newMessages?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type UserChatCreateInput = {
  chat: ChatCreateNestedOneWithoutMembersInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  newMessages?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutChatsInput;
};

export type UserChatCreateManyChatInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  newMessages?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};

export type UserChatCreateManyChatInputEnvelope = {
  data?: InputMaybe<Array<UserChatCreateManyChatInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserChatCreateManyUserInput = {
  chatId: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  newMessages?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UserChatCreateManyUserInputEnvelope = {
  data?: InputMaybe<Array<UserChatCreateManyUserInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserChatCreateNestedManyWithoutChatInput = {
  connect?: InputMaybe<Array<UserChatWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserChatCreateOrConnectWithoutChatInput>>;
  create?: InputMaybe<Array<UserChatCreateWithoutChatInput>>;
  createMany?: InputMaybe<UserChatCreateManyChatInputEnvelope>;
};

export type UserChatCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserChatWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserChatCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserChatCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserChatCreateManyUserInputEnvelope>;
};

export type UserChatCreateOrConnectWithoutChatInput = {
  create: UserChatCreateWithoutChatInput;
  where: UserChatWhereUniqueInput;
};

export type UserChatCreateOrConnectWithoutUserInput = {
  create: UserChatCreateWithoutUserInput;
  where: UserChatWhereUniqueInput;
};

export type UserChatCreateWithoutChatInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  newMessages?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutChatsInput;
};

export type UserChatCreateWithoutUserInput = {
  chat: ChatCreateNestedOneWithoutMembersInput;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  newMessages?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
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
  newMessages?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type UserChatScalarWhereInput = {
  AND?: InputMaybe<Array<UserChatScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserChatScalarWhereInput>>;
  OR?: InputMaybe<Array<UserChatScalarWhereInput>>;
  chatId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  newMessages?: InputMaybe<BoolNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type UserChatUpdateInput = {
  chat?: InputMaybe<ChatUpdateOneRequiredWithoutMembersInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  newMessages?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutChatsInput>;
};

export type UserChatUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  newMessages?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserChatUpdateManyWithWhereWithoutChatInput = {
  data: UserChatUpdateManyMutationInput;
  where: UserChatScalarWhereInput;
};

export type UserChatUpdateManyWithWhereWithoutUserInput = {
  data: UserChatUpdateManyMutationInput;
  where: UserChatScalarWhereInput;
};

export type UserChatUpdateManyWithoutChatInput = {
  connect?: InputMaybe<Array<UserChatWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserChatCreateOrConnectWithoutChatInput>>;
  create?: InputMaybe<Array<UserChatCreateWithoutChatInput>>;
  createMany?: InputMaybe<UserChatCreateManyChatInputEnvelope>;
  delete?: InputMaybe<Array<UserChatWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserChatScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserChatWhereUniqueInput>>;
  set?: InputMaybe<Array<UserChatWhereUniqueInput>>;
  update?: InputMaybe<Array<UserChatUpdateWithWhereUniqueWithoutChatInput>>;
  updateMany?: InputMaybe<Array<UserChatUpdateManyWithWhereWithoutChatInput>>;
  upsert?: InputMaybe<Array<UserChatUpsertWithWhereUniqueWithoutChatInput>>;
};

export type UserChatUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserChatWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserChatCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserChatCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserChatCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<UserChatWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserChatScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserChatWhereUniqueInput>>;
  set?: InputMaybe<Array<UserChatWhereUniqueInput>>;
  update?: InputMaybe<Array<UserChatUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<UserChatUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<UserChatUpsertWithWhereUniqueWithoutUserInput>>;
};

export type UserChatUpdateWithWhereUniqueWithoutChatInput = {
  data: UserChatUpdateWithoutChatInput;
  where: UserChatWhereUniqueInput;
};

export type UserChatUpdateWithWhereUniqueWithoutUserInput = {
  data: UserChatUpdateWithoutUserInput;
  where: UserChatWhereUniqueInput;
};

export type UserChatUpdateWithoutChatInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  newMessages?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutChatsInput>;
};

export type UserChatUpdateWithoutUserInput = {
  chat?: InputMaybe<ChatUpdateOneRequiredWithoutMembersInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  newMessages?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserChatUpsertWithWhereUniqueWithoutChatInput = {
  create: UserChatCreateWithoutChatInput;
  update: UserChatUpdateWithoutChatInput;
  where: UserChatWhereUniqueInput;
};

export type UserChatUpsertWithWhereUniqueWithoutUserInput = {
  create: UserChatCreateWithoutUserInput;
  update: UserChatUpdateWithoutUserInput;
  where: UserChatWhereUniqueInput;
};

export type UserChatWhereInput = {
  AND?: InputMaybe<Array<UserChatWhereInput>>;
  NOT?: InputMaybe<Array<UserChatWhereInput>>;
  OR?: InputMaybe<Array<UserChatWhereInput>>;
  chat?: InputMaybe<ChatWhereInput>;
  chatId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  newMessages?: InputMaybe<BoolNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<StringFilter>;
};

export type UserChatWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type UserCreateInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateNestedManyWithoutGroupsInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutGroupsInput>>;
  create?: InputMaybe<Array<UserCreateWithoutGroupsInput>>;
};

export type UserCreateNestedManyWithoutTagsInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutTagsInput>>;
  create?: InputMaybe<Array<UserCreateWithoutTagsInput>>;
};

export type UserCreateNestedOneWithoutActionsByUserInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutActionsByUserInput>;
  create?: InputMaybe<UserCreateWithoutActionsByUserInput>;
};

export type UserCreateNestedOneWithoutActionsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<UserCreateWithoutActionsInput>;
};

export type UserCreateNestedOneWithoutAddressesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAddressesInput>;
  create?: InputMaybe<UserCreateWithoutAddressesInput>;
};

export type UserCreateNestedOneWithoutBansInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutBansInput>;
  create?: InputMaybe<UserCreateWithoutBansInput>;
};

export type UserCreateNestedOneWithoutChatsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutChatsInput>;
  create?: InputMaybe<UserCreateWithoutChatsInput>;
};

export type UserCreateNestedOneWithoutCreatedTagsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCreatedTagsInput>;
  create?: InputMaybe<UserCreateWithoutCreatedTagsInput>;
};

export type UserCreateNestedOneWithoutImagesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutImagesInput>;
  create?: InputMaybe<UserCreateWithoutImagesInput>;
};

export type UserCreateNestedOneWithoutIncidentsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutIncidentsInput>;
  create?: InputMaybe<UserCreateWithoutIncidentsInput>;
};

export type UserCreateNestedOneWithoutIntelInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutIntelInput>;
  create?: InputMaybe<UserCreateWithoutIntelInput>;
};

export type UserCreateNestedOneWithoutMessagesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<UserCreateWithoutMessagesInput>;
};

export type UserCreateNestedOneWithoutOffendersInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutOffendersInput>;
  create?: InputMaybe<UserCreateWithoutOffendersInput>;
};

export type UserCreateNestedOneWithoutRecycledItemsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutRecycledItemsInput>;
  create?: InputMaybe<UserCreateWithoutRecycledItemsInput>;
};

export type UserCreateNestedOneWithoutSchemesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutSchemesInput>;
  create?: InputMaybe<UserCreateWithoutSchemesInput>;
};

export type UserCreateOrConnectWithoutActionsByUserInput = {
  create: UserCreateWithoutActionsByUserInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutActionsInput = {
  create: UserCreateWithoutActionsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutAddressesInput = {
  create: UserCreateWithoutAddressesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutBansInput = {
  create: UserCreateWithoutBansInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutChatsInput = {
  create: UserCreateWithoutChatsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutCreatedTagsInput = {
  create: UserCreateWithoutCreatedTagsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutGroupsInput = {
  create: UserCreateWithoutGroupsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutImagesInput = {
  create: UserCreateWithoutImagesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutIncidentsInput = {
  create: UserCreateWithoutIncidentsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutIntelInput = {
  create: UserCreateWithoutIntelInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutMessagesInput = {
  create: UserCreateWithoutMessagesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutOffendersInput = {
  create: UserCreateWithoutOffendersInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutRecycledItemsInput = {
  create: UserCreateWithoutRecycledItemsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutSchemesInput = {
  create: UserCreateWithoutSchemesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutTagsInput = {
  create: UserCreateWithoutTagsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutActionsByUserInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutActionsInput = {
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutAddressesInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutBansInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutChatsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutCreatedTagsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutGroupsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutImagesInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutIncidentsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutIntelInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutMessagesInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutOffendersInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutRecycledItemsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutSchemesInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutUsersInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserCreateWithoutTagsInput = {
  actions?: InputMaybe<ActionCreateNestedManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionCreateNestedManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressCreateNestedManyWithoutUserInput>;
  auth0Id?: InputMaybe<Scalars['String']>;
  bans?: InputMaybe<BanCreateNestedManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdTags?: InputMaybe<TagCreateNestedManyWithoutCreatedByInput>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  email: Scalars['String'];
  expoPushTokens?: InputMaybe<ExpoPushTokenCreateNestedManyWithoutUserInput>;
  fullName: Scalars['String'];
  groups?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  id?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ImageCreateNestedManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<Scalars['Boolean']>;
  incidentPush?: InputMaybe<Scalars['Boolean']>;
  incidents?: InputMaybe<IncidentCreateNestedManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelCreateNestedManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<Scalars['String']>;
  messagePush?: InputMaybe<Scalars['Boolean']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutFromInput>;
  newUser?: InputMaybe<Scalars['Boolean']>;
  offenderEmail?: InputMaybe<Scalars['Boolean']>;
  offenderPush?: InputMaybe<Scalars['Boolean']>;
  offenders?: InputMaybe<OffenderCreateNestedManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<OnboardSteps>;
  oneSignalIds?: InputMaybe<OneSignalIdCreateNestedManyWithoutUserInput>;
  organisation: Scalars['String'];
  platform?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  recycledItems?: InputMaybe<RecycledItemCreateNestedManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeCreateNestedManyWithoutUserInput>;
  termsSigned?: InputMaybe<Scalars['Boolean']>;
  timeSigned?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  uploaded?: InputMaybe<Scalars['Boolean']>;
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserNew = {
  __typename?: 'UserNew';
  email?: Maybe<Scalars['String']>;
  hasAuth0Id?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  newUser?: Maybe<Scalars['Boolean']>;
};

export type UserNewAuth0 = {
  __typename?: 'UserNewAuth0';
  message?: Maybe<Scalars['String']>;
};

export type UserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  actions?: InputMaybe<ActionOrderByRelationAggregateInput>;
  actionsByUser?: InputMaybe<ActionOrderByRelationAggregateInput>;
  addresses?: InputMaybe<AddressOrderByRelationAggregateInput>;
  auth0Id?: InputMaybe<SortOrder>;
  bans?: InputMaybe<BanOrderByRelationAggregateInput>;
  chats?: InputMaybe<UserChatOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  createdTags?: InputMaybe<TagOrderByRelationAggregateInput>;
  disabled?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  expoPushTokens?: InputMaybe<ExpoPushTokenOrderByRelationAggregateInput>;
  fullName?: InputMaybe<SortOrder>;
  groups?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  images?: InputMaybe<ImageOrderByRelationAggregateInput>;
  incidentEmail?: InputMaybe<SortOrder>;
  incidentPush?: InputMaybe<SortOrder>;
  incidents?: InputMaybe<IncidentOrderByRelationAggregateInput>;
  intel?: InputMaybe<IntelOrderByRelationAggregateInput>;
  ipAddress?: InputMaybe<SortOrder>;
  messagePush?: InputMaybe<SortOrder>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  newUser?: InputMaybe<SortOrder>;
  offenderEmail?: InputMaybe<SortOrder>;
  offenderPush?: InputMaybe<SortOrder>;
  offenders?: InputMaybe<OffenderOrderByRelationAggregateInput>;
  onboardSteps?: InputMaybe<SortOrder>;
  oneSignalIds?: InputMaybe<OneSignalIdOrderByRelationAggregateInput>;
  organisation?: InputMaybe<SortOrder>;
  platform?: InputMaybe<SortOrder>;
  recycled?: InputMaybe<SortOrder>;
  recycledItems?: InputMaybe<RecycledItemOrderByRelationAggregateInput>;
  schemes?: InputMaybe<UserSchemeOrderByRelationAggregateInput>;
  tags?: InputMaybe<TagOrderByRelationAggregateInput>;
  termsSigned?: InputMaybe<SortOrder>;
  timeSigned?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uploaded?: InputMaybe<SortOrder>;
};

export type UserScalarWhereInput = {
  AND?: InputMaybe<Array<UserScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereInput>>;
  OR?: InputMaybe<Array<UserScalarWhereInput>>;
  auth0Id?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  disabled?: InputMaybe<BoolFilter>;
  email?: InputMaybe<StringFilter>;
  fullName?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  incidentEmail?: InputMaybe<BoolFilter>;
  incidentPush?: InputMaybe<BoolFilter>;
  ipAddress?: InputMaybe<StringNullableFilter>;
  messagePush?: InputMaybe<BoolFilter>;
  newUser?: InputMaybe<BoolFilter>;
  offenderEmail?: InputMaybe<BoolFilter>;
  offenderPush?: InputMaybe<BoolFilter>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFilter>;
  organisation?: InputMaybe<StringFilter>;
  platform?: InputMaybe<StringNullableFilter>;
  recycled?: InputMaybe<BoolFilter>;
  termsSigned?: InputMaybe<BoolFilter>;
  timeSigned?: InputMaybe<DateTimeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
};

export type UserScheme = {
  __typename?: 'UserScheme';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  recycled: Scalars['Boolean'];
  role: Role;
  scheme: Scheme;
  schemeId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type UserSchemeCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  role: Role;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutMembersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserCreateNestedOneWithoutSchemesInput>;
};

export type UserSchemeCreateManySchemeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  role: Role;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UserSchemeCreateManySchemeInputEnvelope = {
  data?: InputMaybe<Array<UserSchemeCreateManySchemeInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserSchemeCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  role: Role;
  schemeId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UserSchemeCreateManyUserInputEnvelope = {
  data?: InputMaybe<Array<UserSchemeCreateManyUserInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type UserSchemeCreateNestedManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<UserSchemeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserSchemeCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<UserSchemeCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<UserSchemeCreateManySchemeInputEnvelope>;
};

export type UserSchemeCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserSchemeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserSchemeCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserSchemeCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserSchemeCreateManyUserInputEnvelope>;
};

export type UserSchemeCreateOrConnectWithoutSchemeInput = {
  create: UserSchemeCreateWithoutSchemeInput;
  where: UserSchemeWhereUniqueInput;
};

export type UserSchemeCreateOrConnectWithoutUserInput = {
  create: UserSchemeCreateWithoutUserInput;
  where: UserSchemeWhereUniqueInput;
};

export type UserSchemeCreateWithoutSchemeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  role: Role;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserCreateNestedOneWithoutSchemesInput>;
};

export type UserSchemeCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recycled?: InputMaybe<Scalars['Boolean']>;
  role: Role;
  scheme?: InputMaybe<SchemeCreateNestedOneWithoutMembersInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type UserSchemeListRelationFilter = {
  every?: InputMaybe<UserSchemeWhereInput>;
  none?: InputMaybe<UserSchemeWhereInput>;
  some?: InputMaybe<UserSchemeWhereInput>;
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

export type UserSchemeUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutMembersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutSchemesInput>;
};

export type UserSchemeUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserSchemeUpdateManyWithWhereWithoutSchemeInput = {
  data: UserSchemeUpdateManyMutationInput;
  where: UserSchemeScalarWhereInput;
};

export type UserSchemeUpdateManyWithWhereWithoutUserInput = {
  data: UserSchemeUpdateManyMutationInput;
  where: UserSchemeScalarWhereInput;
};

export type UserSchemeUpdateManyWithoutSchemeInput = {
  connect?: InputMaybe<Array<UserSchemeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserSchemeCreateOrConnectWithoutSchemeInput>>;
  create?: InputMaybe<Array<UserSchemeCreateWithoutSchemeInput>>;
  createMany?: InputMaybe<UserSchemeCreateManySchemeInputEnvelope>;
  delete?: InputMaybe<Array<UserSchemeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserSchemeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserSchemeWhereUniqueInput>>;
  set?: InputMaybe<Array<UserSchemeWhereUniqueInput>>;
  update?: InputMaybe<Array<UserSchemeUpdateWithWhereUniqueWithoutSchemeInput>>;
  updateMany?: InputMaybe<Array<UserSchemeUpdateManyWithWhereWithoutSchemeInput>>;
  upsert?: InputMaybe<Array<UserSchemeUpsertWithWhereUniqueWithoutSchemeInput>>;
};

export type UserSchemeUpdateManyWithoutUserInput = {
  connect?: InputMaybe<Array<UserSchemeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserSchemeCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<UserSchemeCreateWithoutUserInput>>;
  createMany?: InputMaybe<UserSchemeCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<UserSchemeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserSchemeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserSchemeWhereUniqueInput>>;
  set?: InputMaybe<Array<UserSchemeWhereUniqueInput>>;
  update?: InputMaybe<Array<UserSchemeUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<UserSchemeUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<UserSchemeUpsertWithWhereUniqueWithoutUserInput>>;
};

export type UserSchemeUpdateWithWhereUniqueWithoutSchemeInput = {
  data: UserSchemeUpdateWithoutSchemeInput;
  where: UserSchemeWhereUniqueInput;
};

export type UserSchemeUpdateWithWhereUniqueWithoutUserInput = {
  data: UserSchemeUpdateWithoutUserInput;
  where: UserSchemeWhereUniqueInput;
};

export type UserSchemeUpdateWithoutSchemeInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutSchemesInput>;
};

export type UserSchemeUpdateWithoutUserInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  scheme?: InputMaybe<SchemeUpdateOneRequiredWithoutMembersInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type UserSchemeUpsertWithWhereUniqueWithoutSchemeInput = {
  create: UserSchemeCreateWithoutSchemeInput;
  update: UserSchemeUpdateWithoutSchemeInput;
  where: UserSchemeWhereUniqueInput;
};

export type UserSchemeUpsertWithWhereUniqueWithoutUserInput = {
  create: UserSchemeCreateWithoutUserInput;
  update: UserSchemeUpdateWithoutUserInput;
  where: UserSchemeWhereUniqueInput;
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
  id?: InputMaybe<Scalars['String']>;
};

export type UserUpdateInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateManyWithWhereWithoutGroupsInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithWhereWithoutTagsInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithoutGroupsInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutGroupsInput>>;
  create?: InputMaybe<Array<UserCreateWithoutGroupsInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutGroupsInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutGroupsInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutGroupsInput>>;
};

export type UserUpdateManyWithoutTagsInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutTagsInput>>;
  create?: InputMaybe<Array<UserCreateWithoutTagsInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutTagsInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutTagsInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutTagsInput>>;
};

export type UserUpdateOneRequiredWithoutActionsByUserInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutActionsByUserInput>;
  create?: InputMaybe<UserCreateWithoutActionsByUserInput>;
  update?: InputMaybe<UserUpdateWithoutActionsByUserInput>;
  upsert?: InputMaybe<UserUpsertWithoutActionsByUserInput>;
};

export type UserUpdateOneRequiredWithoutBansInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutBansInput>;
  create?: InputMaybe<UserCreateWithoutBansInput>;
  update?: InputMaybe<UserUpdateWithoutBansInput>;
  upsert?: InputMaybe<UserUpsertWithoutBansInput>;
};

export type UserUpdateOneRequiredWithoutChatsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutChatsInput>;
  create?: InputMaybe<UserCreateWithoutChatsInput>;
  update?: InputMaybe<UserUpdateWithoutChatsInput>;
  upsert?: InputMaybe<UserUpsertWithoutChatsInput>;
};

export type UserUpdateOneRequiredWithoutCreatedTagsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCreatedTagsInput>;
  create?: InputMaybe<UserCreateWithoutCreatedTagsInput>;
  update?: InputMaybe<UserUpdateWithoutCreatedTagsInput>;
  upsert?: InputMaybe<UserUpsertWithoutCreatedTagsInput>;
};

export type UserUpdateOneRequiredWithoutImagesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutImagesInput>;
  create?: InputMaybe<UserCreateWithoutImagesInput>;
  update?: InputMaybe<UserUpdateWithoutImagesInput>;
  upsert?: InputMaybe<UserUpsertWithoutImagesInput>;
};

export type UserUpdateOneRequiredWithoutIncidentsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutIncidentsInput>;
  create?: InputMaybe<UserCreateWithoutIncidentsInput>;
  update?: InputMaybe<UserUpdateWithoutIncidentsInput>;
  upsert?: InputMaybe<UserUpsertWithoutIncidentsInput>;
};

export type UserUpdateOneRequiredWithoutIntelInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutIntelInput>;
  create?: InputMaybe<UserCreateWithoutIntelInput>;
  update?: InputMaybe<UserUpdateWithoutIntelInput>;
  upsert?: InputMaybe<UserUpsertWithoutIntelInput>;
};

export type UserUpdateOneRequiredWithoutMessagesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<UserCreateWithoutMessagesInput>;
  update?: InputMaybe<UserUpdateWithoutMessagesInput>;
  upsert?: InputMaybe<UserUpsertWithoutMessagesInput>;
};

export type UserUpdateOneRequiredWithoutOffendersInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutOffendersInput>;
  create?: InputMaybe<UserCreateWithoutOffendersInput>;
  update?: InputMaybe<UserUpdateWithoutOffendersInput>;
  upsert?: InputMaybe<UserUpsertWithoutOffendersInput>;
};

export type UserUpdateOneRequiredWithoutSchemesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutSchemesInput>;
  create?: InputMaybe<UserCreateWithoutSchemesInput>;
  update?: InputMaybe<UserUpdateWithoutSchemesInput>;
  upsert?: InputMaybe<UserUpsertWithoutSchemesInput>;
};

export type UserUpdateOneWithoutActionsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutActionsInput>;
  create?: InputMaybe<UserCreateWithoutActionsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUpdateWithoutActionsInput>;
  upsert?: InputMaybe<UserUpsertWithoutActionsInput>;
};

export type UserUpdateOneWithoutAddressesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutAddressesInput>;
  create?: InputMaybe<UserCreateWithoutAddressesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUpdateWithoutAddressesInput>;
  upsert?: InputMaybe<UserUpsertWithoutAddressesInput>;
};

export type UserUpdateOneWithoutRecycledItemsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutRecycledItemsInput>;
  create?: InputMaybe<UserCreateWithoutRecycledItemsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUpdateWithoutRecycledItemsInput>;
  upsert?: InputMaybe<UserUpsertWithoutRecycledItemsInput>;
};

export type UserUpdateWithWhereUniqueWithoutGroupsInput = {
  data: UserUpdateWithoutGroupsInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithWhereUniqueWithoutTagsInput = {
  data: UserUpdateWithoutTagsInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithoutActionsByUserInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutActionsInput = {
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutAddressesInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutBansInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutChatsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutCreatedTagsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutGroupsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutImagesInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutIncidentsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutIntelInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutMessagesInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutOffendersInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutRecycledItemsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutSchemesInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  tags?: InputMaybe<TagUpdateManyWithoutUsersInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutTagsInput = {
  actions?: InputMaybe<ActionUpdateManyWithoutUserInput>;
  actionsByUser?: InputMaybe<ActionUpdateManyWithoutByUserInput>;
  addresses?: InputMaybe<AddressUpdateManyWithoutUserInput>;
  auth0Id?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  bans?: InputMaybe<BanUpdateManyWithoutCreatedByInput>;
  chats?: InputMaybe<UserChatUpdateManyWithoutUserInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  createdTags?: InputMaybe<TagUpdateManyWithoutCreatedByInput>;
  disabled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  expoPushTokens?: InputMaybe<ExpoPushTokenUpdateManyWithoutUserInput>;
  fullName?: InputMaybe<StringFieldUpdateOperationsInput>;
  groups?: InputMaybe<GroupUpdateManyWithoutUsersInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  images?: InputMaybe<ImageUpdateManyWithoutUploadedByInput>;
  incidentEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidentPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  incidents?: InputMaybe<IncidentUpdateManyWithoutCreatedByInput>;
  intel?: InputMaybe<IntelUpdateManyWithoutCreatedByInput>;
  ipAddress?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  messagePush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutFromInput>;
  newUser?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderEmail?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenderPush?: InputMaybe<BoolFieldUpdateOperationsInput>;
  offenders?: InputMaybe<OffenderUpdateManyWithoutCreatedByInput>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFieldUpdateOperationsInput>;
  oneSignalIds?: InputMaybe<OneSignalIdUpdateManyWithoutUserInput>;
  organisation?: InputMaybe<StringFieldUpdateOperationsInput>;
  platform?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  recycled?: InputMaybe<BoolFieldUpdateOperationsInput>;
  recycledItems?: InputMaybe<RecycledItemUpdateManyWithoutDeletedByInput>;
  schemes?: InputMaybe<UserSchemeUpdateManyWithoutUserInput>;
  termsSigned?: InputMaybe<BoolFieldUpdateOperationsInput>;
  timeSigned?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  uploaded?: InputMaybe<BoolFieldUpdateOperationsInput>;
};

export type UserUpsertWithWhereUniqueWithoutGroupsInput = {
  create: UserCreateWithoutGroupsInput;
  update: UserUpdateWithoutGroupsInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithWhereUniqueWithoutTagsInput = {
  create: UserCreateWithoutTagsInput;
  update: UserUpdateWithoutTagsInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithoutActionsByUserInput = {
  create: UserCreateWithoutActionsByUserInput;
  update: UserUpdateWithoutActionsByUserInput;
};

export type UserUpsertWithoutActionsInput = {
  create: UserCreateWithoutActionsInput;
  update: UserUpdateWithoutActionsInput;
};

export type UserUpsertWithoutAddressesInput = {
  create: UserCreateWithoutAddressesInput;
  update: UserUpdateWithoutAddressesInput;
};

export type UserUpsertWithoutBansInput = {
  create: UserCreateWithoutBansInput;
  update: UserUpdateWithoutBansInput;
};

export type UserUpsertWithoutChatsInput = {
  create: UserCreateWithoutChatsInput;
  update: UserUpdateWithoutChatsInput;
};

export type UserUpsertWithoutCreatedTagsInput = {
  create: UserCreateWithoutCreatedTagsInput;
  update: UserUpdateWithoutCreatedTagsInput;
};

export type UserUpsertWithoutImagesInput = {
  create: UserCreateWithoutImagesInput;
  update: UserUpdateWithoutImagesInput;
};

export type UserUpsertWithoutIncidentsInput = {
  create: UserCreateWithoutIncidentsInput;
  update: UserUpdateWithoutIncidentsInput;
};

export type UserUpsertWithoutIntelInput = {
  create: UserCreateWithoutIntelInput;
  update: UserUpdateWithoutIntelInput;
};

export type UserUpsertWithoutMessagesInput = {
  create: UserCreateWithoutMessagesInput;
  update: UserUpdateWithoutMessagesInput;
};

export type UserUpsertWithoutOffendersInput = {
  create: UserCreateWithoutOffendersInput;
  update: UserUpdateWithoutOffendersInput;
};

export type UserUpsertWithoutRecycledItemsInput = {
  create: UserCreateWithoutRecycledItemsInput;
  update: UserUpdateWithoutRecycledItemsInput;
};

export type UserUpsertWithoutSchemesInput = {
  create: UserCreateWithoutSchemesInput;
  update: UserUpdateWithoutSchemesInput;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  actions?: InputMaybe<ActionListRelationFilter>;
  actionsByUser?: InputMaybe<ActionListRelationFilter>;
  addresses?: InputMaybe<AddressListRelationFilter>;
  auth0Id?: InputMaybe<StringNullableFilter>;
  bans?: InputMaybe<BanListRelationFilter>;
  chats?: InputMaybe<UserChatListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdTags?: InputMaybe<TagListRelationFilter>;
  disabled?: InputMaybe<BoolFilter>;
  email?: InputMaybe<StringFilter>;
  expoPushTokens?: InputMaybe<ExpoPushTokenListRelationFilter>;
  fullName?: InputMaybe<StringFilter>;
  groups?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  images?: InputMaybe<ImageListRelationFilter>;
  incidentEmail?: InputMaybe<BoolFilter>;
  incidentPush?: InputMaybe<BoolFilter>;
  incidents?: InputMaybe<IncidentListRelationFilter>;
  intel?: InputMaybe<IntelListRelationFilter>;
  ipAddress?: InputMaybe<StringNullableFilter>;
  messagePush?: InputMaybe<BoolFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  newUser?: InputMaybe<BoolFilter>;
  offenderEmail?: InputMaybe<BoolFilter>;
  offenderPush?: InputMaybe<BoolFilter>;
  offenders?: InputMaybe<OffenderListRelationFilter>;
  onboardSteps?: InputMaybe<EnumOnboardStepsFilter>;
  oneSignalIds?: InputMaybe<OneSignalIdListRelationFilter>;
  organisation?: InputMaybe<StringFilter>;
  platform?: InputMaybe<StringNullableFilter>;
  recycled?: InputMaybe<BoolFilter>;
  recycledItems?: InputMaybe<RecycledItemListRelationFilter>;
  schemes?: InputMaybe<UserSchemeListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  termsSigned?: InputMaybe<BoolFilter>;
  timeSigned?: InputMaybe<DateTimeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uploaded?: InputMaybe<BoolFilter>;
};

export type UserWhereUniqueInput = {
  auth0Id?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'SignIn', accessToken: string, refreshToken: string } | null };

export type CreateChatMutationVariables = Exact<{
  data: ChatCreateInput;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'Chat', id: string, name: string, description?: string | null } };

export type SchemeChatsQueryVariables = Exact<{
  where?: InputMaybe<ChatWhereInput>;
}>;


export type SchemeChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', id: string, name: string, description?: string | null }> };

export type GroupQueryVariables = Exact<{
  where: GroupWhereUniqueInput;
}>;


export type GroupQuery = { __typename?: 'Query', group?: { __typename?: 'Group', name: string, description?: string | null, users: Array<{ __typename?: 'User', id: string, fullName: string, organisation: string }> } | null };

export type CreateGroupMutationVariables = Exact<{
  data: GroupCreateInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string, name: string, description?: string | null } };

export type SchemeGroupsQueryVariables = Exact<{
  where?: InputMaybe<GroupWhereInput>;
  orderBy?: InputMaybe<Array<GroupOrderByWithRelationInput> | GroupOrderByWithRelationInput>;
}>;


export type SchemeGroupsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: string, name: string, description?: string | null }> };

export type DeleteIncidentMutationVariables = Exact<{
  where: UniqueId;
}>;


export type DeleteIncidentMutation = { __typename?: 'Mutation', deleteIncident?: { __typename?: 'Incident', id: string } | null };

export type IncidentFeedQueryVariables = Exact<{
  schemeId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<IncidentOrderByWithRelationInput>;
  first?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
  groups?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  crimeTypes?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  approved?: InputMaybe<Scalars['Boolean']>;
}>;


export type IncidentFeedQuery = { __typename?: 'Query', incidentFeed?: Array<{ __typename?: 'Incident', id: string, subject?: string | null, description: string, dayTime?: string | null, approved?: boolean | null, uploaded?: boolean | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id: string, createdAt: any, updatedAt: any, age?: Age | null, build?: Build | null, dateOfBirth?: any | null, dateSource?: string | null, gender?: Gender | null, hair?: string | null, name?: string | null, peculiarities?: string | null, race?: Race | null, approved?: boolean | null, uploaded?: boolean | null, active?: boolean | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }>, location?: { __typename?: 'Address', id: string, full?: string | null } | null, createdBy: { __typename?: 'User', id: string, fullName: string, organisation: string }, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, offenders: Array<{ __typename?: 'Offender', id: string }> }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> } | null> | null };

export type ListIncidentsQueryVariables = Exact<{
  scheme: SchemeWhereUniqueInput;
  where?: InputMaybe<IncidentWhereInput>;
  order?: InputMaybe<IncidentOrderByWithRelationInput>;
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type ListIncidentsQuery = { __typename?: 'Query', listIncidents?: { __typename?: 'ListIncidents', total: number, incidents: Array<{ __typename?: 'Incident', id: string, subject?: string | null, description: string, dayTime?: string | null, approved?: boolean | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id: string, age?: Age | null, build?: Build | null, dateOfBirth?: any | null, gender?: Gender | null, name?: string | null, race?: Race | null, approved?: boolean | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null }> }>, location?: { __typename?: 'Address', id: string, full?: string | null } | null, createdBy: { __typename?: 'User', id: string, fullName: string, organisation: string }, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> }> } | null };

export type ViewIncidentQueryVariables = Exact<{
  where: IncidentWhereUniqueInput;
}>;


export type ViewIncidentQuery = { __typename?: 'Query', incident?: { __typename?: 'Incident', id: string, subject?: string | null, description: string, dayTime?: string | null, approved?: boolean | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id: string, age?: Age | null, build?: Build | null, dateOfBirth?: any | null, gender?: Gender | null, name?: string | null, race?: Race | null, approved?: boolean | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null }> }>, location?: { __typename?: 'Address', id: string, full?: string | null } | null, createdBy: { __typename?: 'User', id: string, fullName: string, organisation: string }, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> } | null };

export type TagsQueryVariables = Exact<{
  where: TagWhereInput;
}>;


export type TagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string, description: string }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, fullName: string, email: string, organisation: string, newUser: boolean, groups: Array<{ __typename?: 'Group', id: string, name: string }>, schemes: Array<{ __typename?: 'UserScheme', id: string, role: Role, scheme: { __typename?: 'Scheme', id: string, name: string, autoApproveIncidents: boolean, autoApproveOffenders: boolean } }> } | null };

export type UserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
  groupWhere?: InputMaybe<GroupWhereInput>;
  chatWhere?: InputMaybe<UserChatWhereInput>;
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, fullName: string, email: string, organisation: string, disabled: boolean, newUser: boolean, addresses: Array<{ __typename?: 'Address', premises?: string | null, building?: string | null, street: string, townCity: string, county?: string | null, postcode: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, chats: Array<{ __typename?: 'UserChat', id: string, chat: { __typename?: 'Chat', name: string } }>, schemes: Array<{ __typename?: 'UserScheme', id: string, role: Role }> } | null };

export type CreateUserInDatabaseMutationVariables = Exact<{
  data: CreateUserData;
}>;


export type CreateUserInDatabaseMutation = { __typename?: 'Mutation', createUserInDatabase?: { __typename?: 'User', id: string, fullName: string, organisation: string, newUser: boolean, disabled: boolean } | null };

export type InviteExistingUserMutationVariables = Exact<{
  data: UserUpdateInput;
  where: UniqueId;
}>;


export type InviteExistingUserMutation = { __typename?: 'Mutation', inviteExistingUser?: { __typename?: 'User', id: string } | null };

export type ListSchemeUsersQueryVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput> | UserOrderByWithRelationInput>;
  after?: InputMaybe<UserWhereUniqueInput>;
  groupWhere?: InputMaybe<GroupWhereInput>;
}>;


export type ListSchemeUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, fullName: string, email: string, organisation: string, status?: string | null, groups: Array<{ __typename?: 'Group', id: string, name: string }> }> };


export const SignInDocument = gql`
    mutation signIn($email: String!, $password: String!) {
  signIn(data: {email: $email, password: $password}) {
    accessToken
    refreshToken
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const CreateChatDocument = gql`
    mutation createChat($data: ChatCreateInput!) {
  createChat(data: $data) {
    id
    name
    description
  }
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const SchemeChatsDocument = gql`
    query schemeChats($where: ChatWhereInput) {
  chats(where: $where) {
    id
    name
    description
  }
}
    `;

/**
 * __useSchemeChatsQuery__
 *
 * To run a query within a React component, call `useSchemeChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchemeChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchemeChatsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSchemeChatsQuery(baseOptions?: Apollo.QueryHookOptions<SchemeChatsQuery, SchemeChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchemeChatsQuery, SchemeChatsQueryVariables>(SchemeChatsDocument, options);
      }
export function useSchemeChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchemeChatsQuery, SchemeChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchemeChatsQuery, SchemeChatsQueryVariables>(SchemeChatsDocument, options);
        }
export type SchemeChatsQueryHookResult = ReturnType<typeof useSchemeChatsQuery>;
export type SchemeChatsLazyQueryHookResult = ReturnType<typeof useSchemeChatsLazyQuery>;
export type SchemeChatsQueryResult = Apollo.QueryResult<SchemeChatsQuery, SchemeChatsQueryVariables>;
export const GroupDocument = gql`
    query Group($where: GroupWhereUniqueInput!) {
  group(where: $where) {
    name
    description
    users {
      id
      fullName
      organisation
    }
  }
}
    `;

/**
 * __useGroupQuery__
 *
 * To run a query within a React component, call `useGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGroupQuery(baseOptions: Apollo.QueryHookOptions<GroupQuery, GroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupQuery, GroupQueryVariables>(GroupDocument, options);
      }
export function useGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupQuery, GroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupQuery, GroupQueryVariables>(GroupDocument, options);
        }
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>;
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>;
export type GroupQueryResult = Apollo.QueryResult<GroupQuery, GroupQueryVariables>;
export const CreateGroupDocument = gql`
    mutation createGroup($data: GroupCreateInput!) {
  createGroup(data: $data) {
    id
    name
    description
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const SchemeGroupsDocument = gql`
    query schemeGroups($where: GroupWhereInput, $orderBy: [GroupOrderByWithRelationInput!]) {
  groups(where: $where, orderBy: $orderBy) {
    id
    name
    description
  }
}
    `;

/**
 * __useSchemeGroupsQuery__
 *
 * To run a query within a React component, call `useSchemeGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchemeGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchemeGroupsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useSchemeGroupsQuery(baseOptions?: Apollo.QueryHookOptions<SchemeGroupsQuery, SchemeGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchemeGroupsQuery, SchemeGroupsQueryVariables>(SchemeGroupsDocument, options);
      }
export function useSchemeGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchemeGroupsQuery, SchemeGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchemeGroupsQuery, SchemeGroupsQueryVariables>(SchemeGroupsDocument, options);
        }
export type SchemeGroupsQueryHookResult = ReturnType<typeof useSchemeGroupsQuery>;
export type SchemeGroupsLazyQueryHookResult = ReturnType<typeof useSchemeGroupsLazyQuery>;
export type SchemeGroupsQueryResult = Apollo.QueryResult<SchemeGroupsQuery, SchemeGroupsQueryVariables>;
export const DeleteIncidentDocument = gql`
    mutation deleteIncident($where: UniqueId!) {
  deleteIncident(where: $where) {
    id
  }
}
    `;
export type DeleteIncidentMutationFn = Apollo.MutationFunction<DeleteIncidentMutation, DeleteIncidentMutationVariables>;

/**
 * __useDeleteIncidentMutation__
 *
 * To run a mutation, you first call `useDeleteIncidentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIncidentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIncidentMutation, { data, loading, error }] = useDeleteIncidentMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteIncidentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIncidentMutation, DeleteIncidentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteIncidentMutation, DeleteIncidentMutationVariables>(DeleteIncidentDocument, options);
      }
export type DeleteIncidentMutationHookResult = ReturnType<typeof useDeleteIncidentMutation>;
export type DeleteIncidentMutationResult = Apollo.MutationResult<DeleteIncidentMutation>;
export type DeleteIncidentMutationOptions = Apollo.BaseMutationOptions<DeleteIncidentMutation, DeleteIncidentMutationVariables>;
export const IncidentFeedDocument = gql`
    query incidentFeed($schemeId: String!, $search: String, $order: IncidentOrderByWithRelationInput, $first: Int, $cursor: String, $groups: [String], $crimeTypes: [String!], $approved: Boolean) {
  incidentFeed(
    schemeId: $schemeId
    order: $order
    first: $first
    after: $cursor
    crimeTypes: $crimeTypes
    search: $search
    groups: $groups
    approved: $approved
  ) {
    id
    subject
    description
    dayTime
    crimeTypes {
      id
      name
    }
    approved
    uploaded
    offenders {
      id
      createdAt
      updatedAt
      age
      build
      dateOfBirth
      dateSource
      gender
      hair
      name
      peculiarities
      race
      approved
      uploaded
      active
      images {
        id
        url
        optimised
        card
      }
      tags {
        id
        name
      }
    }
    location {
      id
      full
    }
    createdBy {
      id
      fullName
      organisation
    }
    images {
      id
      url
      optimised
      card
      offenders {
        id
      }
    }
    groups {
      id
      name
    }
  }
}
    `;

/**
 * __useIncidentFeedQuery__
 *
 * To run a query within a React component, call `useIncidentFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIncidentFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIncidentFeedQuery({
 *   variables: {
 *      schemeId: // value for 'schemeId'
 *      search: // value for 'search'
 *      order: // value for 'order'
 *      first: // value for 'first'
 *      cursor: // value for 'cursor'
 *      groups: // value for 'groups'
 *      crimeTypes: // value for 'crimeTypes'
 *      approved: // value for 'approved'
 *   },
 * });
 */
export function useIncidentFeedQuery(baseOptions: Apollo.QueryHookOptions<IncidentFeedQuery, IncidentFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentFeedQuery, IncidentFeedQueryVariables>(IncidentFeedDocument, options);
      }
export function useIncidentFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentFeedQuery, IncidentFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentFeedQuery, IncidentFeedQueryVariables>(IncidentFeedDocument, options);
        }
export type IncidentFeedQueryHookResult = ReturnType<typeof useIncidentFeedQuery>;
export type IncidentFeedLazyQueryHookResult = ReturnType<typeof useIncidentFeedLazyQuery>;
export type IncidentFeedQueryResult = Apollo.QueryResult<IncidentFeedQuery, IncidentFeedQueryVariables>;
export const ListIncidentsDocument = gql`
    query listIncidents($scheme: SchemeWhereUniqueInput!, $where: IncidentWhereInput, $order: IncidentOrderByWithRelationInput, $take: Int, $skip: Int) {
  listIncidents(
    scheme: $scheme
    where: $where
    order: $order
    take: $take
    skip: $skip
  ) {
    incidents {
      id
      subject
      description
      dayTime
      crimeTypes {
        id
        name
      }
      approved
      offenders {
        id
        age
        build
        dateOfBirth
        gender
        name
        race
        approved
        images {
          id
          optimised
        }
      }
      location {
        id
        full
      }
      createdBy {
        id
        fullName
        organisation
      }
      images {
        id
        optimised
      }
      groups {
        id
        name
      }
    }
    total
  }
}
    `;

/**
 * __useListIncidentsQuery__
 *
 * To run a query within a React component, call `useListIncidentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListIncidentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListIncidentsQuery({
 *   variables: {
 *      scheme: // value for 'scheme'
 *      where: // value for 'where'
 *      order: // value for 'order'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useListIncidentsQuery(baseOptions: Apollo.QueryHookOptions<ListIncidentsQuery, ListIncidentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIncidentsQuery, ListIncidentsQueryVariables>(ListIncidentsDocument, options);
      }
export function useListIncidentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIncidentsQuery, ListIncidentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIncidentsQuery, ListIncidentsQueryVariables>(ListIncidentsDocument, options);
        }
export type ListIncidentsQueryHookResult = ReturnType<typeof useListIncidentsQuery>;
export type ListIncidentsLazyQueryHookResult = ReturnType<typeof useListIncidentsLazyQuery>;
export type ListIncidentsQueryResult = Apollo.QueryResult<ListIncidentsQuery, ListIncidentsQueryVariables>;
export const ViewIncidentDocument = gql`
    query ViewIncident($where: IncidentWhereUniqueInput!) {
  incident(where: $where) {
    id
    subject
    description
    dayTime
    crimeTypes {
      id
      name
    }
    approved
    offenders {
      id
      age
      build
      dateOfBirth
      gender
      name
      race
      approved
      images {
        id
        optimised
      }
    }
    location {
      id
      full
    }
    createdBy {
      id
      fullName
      organisation
    }
    images {
      id
      optimised
    }
    groups {
      id
      name
    }
  }
}
    `;

/**
 * __useViewIncidentQuery__
 *
 * To run a query within a React component, call `useViewIncidentQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewIncidentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewIncidentQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useViewIncidentQuery(baseOptions: Apollo.QueryHookOptions<ViewIncidentQuery, ViewIncidentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewIncidentQuery, ViewIncidentQueryVariables>(ViewIncidentDocument, options);
      }
export function useViewIncidentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewIncidentQuery, ViewIncidentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewIncidentQuery, ViewIncidentQueryVariables>(ViewIncidentDocument, options);
        }
export type ViewIncidentQueryHookResult = ReturnType<typeof useViewIncidentQuery>;
export type ViewIncidentLazyQueryHookResult = ReturnType<typeof useViewIncidentLazyQuery>;
export type ViewIncidentQueryResult = Apollo.QueryResult<ViewIncidentQuery, ViewIncidentQueryVariables>;
export const TagsDocument = gql`
    query tags($where: TagWhereInput!) {
  tags(where: $where) {
    id
    name
    description
  }
}
    `;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useTagsQuery(baseOptions: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsQueryResult = Apollo.QueryResult<TagsQuery, TagsQueryVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    fullName
    email
    organisation
    newUser
    groups {
      id
      name
    }
    schemes {
      id
      role
      scheme {
        id
        name
        autoApproveIncidents
        autoApproveOffenders
      }
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const UserDocument = gql`
    query User($where: UserWhereUniqueInput!, $groupWhere: GroupWhereInput, $chatWhere: UserChatWhereInput) {
  user(where: $where) {
    id
    fullName
    email
    organisation
    addresses {
      premises
      building
      street
      townCity
      county
      postcode
    }
    disabled
    newUser
    groups(where: $groupWhere) {
      id
      name
    }
    chats(where: $chatWhere) {
      id
      chat {
        name
      }
    }
    schemes {
      id
      role
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *      groupWhere: // value for 'groupWhere'
 *      chatWhere: // value for 'chatWhere'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const CreateUserInDatabaseDocument = gql`
    mutation createUserInDatabase($data: CreateUserData!) {
  createUserInDatabase(data: $data) {
    id
    fullName
    organisation
    newUser
    disabled
  }
}
    `;
export type CreateUserInDatabaseMutationFn = Apollo.MutationFunction<CreateUserInDatabaseMutation, CreateUserInDatabaseMutationVariables>;

/**
 * __useCreateUserInDatabaseMutation__
 *
 * To run a mutation, you first call `useCreateUserInDatabaseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserInDatabaseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserInDatabaseMutation, { data, loading, error }] = useCreateUserInDatabaseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserInDatabaseMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserInDatabaseMutation, CreateUserInDatabaseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserInDatabaseMutation, CreateUserInDatabaseMutationVariables>(CreateUserInDatabaseDocument, options);
      }
export type CreateUserInDatabaseMutationHookResult = ReturnType<typeof useCreateUserInDatabaseMutation>;
export type CreateUserInDatabaseMutationResult = Apollo.MutationResult<CreateUserInDatabaseMutation>;
export type CreateUserInDatabaseMutationOptions = Apollo.BaseMutationOptions<CreateUserInDatabaseMutation, CreateUserInDatabaseMutationVariables>;
export const InviteExistingUserDocument = gql`
    mutation inviteExistingUser($data: UserUpdateInput!, $where: UniqueId!) {
  inviteExistingUser(data: $data, where: $where) {
    id
  }
}
    `;
export type InviteExistingUserMutationFn = Apollo.MutationFunction<InviteExistingUserMutation, InviteExistingUserMutationVariables>;

/**
 * __useInviteExistingUserMutation__
 *
 * To run a mutation, you first call `useInviteExistingUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteExistingUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteExistingUserMutation, { data, loading, error }] = useInviteExistingUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useInviteExistingUserMutation(baseOptions?: Apollo.MutationHookOptions<InviteExistingUserMutation, InviteExistingUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteExistingUserMutation, InviteExistingUserMutationVariables>(InviteExistingUserDocument, options);
      }
export type InviteExistingUserMutationHookResult = ReturnType<typeof useInviteExistingUserMutation>;
export type InviteExistingUserMutationResult = Apollo.MutationResult<InviteExistingUserMutation>;
export type InviteExistingUserMutationOptions = Apollo.BaseMutationOptions<InviteExistingUserMutation, InviteExistingUserMutationVariables>;
export const ListSchemeUsersDocument = gql`
    query ListSchemeUsers($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $after: UserWhereUniqueInput, $groupWhere: GroupWhereInput) {
  users(where: $where, orderBy: $orderBy, after: $after) {
    id
    fullName
    email
    organisation
    status
    groups(where: $groupWhere) {
      id
      name
    }
  }
}
    `;

/**
 * __useListSchemeUsersQuery__
 *
 * To run a query within a React component, call `useListSchemeUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSchemeUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSchemeUsersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      after: // value for 'after'
 *      groupWhere: // value for 'groupWhere'
 *   },
 * });
 */
export function useListSchemeUsersQuery(baseOptions?: Apollo.QueryHookOptions<ListSchemeUsersQuery, ListSchemeUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSchemeUsersQuery, ListSchemeUsersQueryVariables>(ListSchemeUsersDocument, options);
      }
export function useListSchemeUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSchemeUsersQuery, ListSchemeUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSchemeUsersQuery, ListSchemeUsersQueryVariables>(ListSchemeUsersDocument, options);
        }
export type ListSchemeUsersQueryHookResult = ReturnType<typeof useListSchemeUsersQuery>;
export type ListSchemeUsersLazyQueryHookResult = ReturnType<typeof useListSchemeUsersLazyQuery>;
export type ListSchemeUsersQueryResult = Apollo.QueryResult<ListSchemeUsersQuery, ListSchemeUsersQueryVariables>;