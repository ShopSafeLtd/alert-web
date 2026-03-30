// wait to check

import { BanType } from 'graphql/types';

export const formatBanType = (value?: BanType | null) =>
  BanTypeValues.find((item) => item.value === value)?.label ?? '';

const BanTypeValues = [
  {
    label: 'Criminal Behaviour Order',
    value: BanType.Cbo,
  },
  {
    label: 'Company Banning Notice',
    value: BanType.CompanyBanningNotice,
  },
  {
    label: 'Community Ban',
    value: BanType.CommunityBan,
  },
  {
    label: 'Civil Recovery',
    value: BanType.CivilRecovery,
  },
  {
    label: 'Restitution',
    value: BanType.Restitution,
  },
  {
    label: 'Promissory Note',
    value: BanType.PromisaryNote,
  },
  {
    label: 'Compensation',
    value: BanType.Compensation,
  },
  {
    label: 'Other',
    value: BanType.Other,
  },
  {
    label: 'Community Protection Notice',
    value: BanType.Cpn,
  },
  {
    label: 'Community Protection Warning',
    value: BanType.Cpw,
  },
  {
    label: 'Public Space Protection Order',
    value: BanType.Pspo,
  },
  {
    label: 'Withdrawal of Implied Permission',
    value: BanType.Wip,
  },
  {
    label: 'Arrest',
    value: BanType.Arrest,
  },
  {
    label: 'Fine',
    value: BanType.Fine,
  },
  {
    label: 'Prison Sentence',
    value: BanType.PrisonSentence,
  },
  {
    label: 'Rehabilitation Order',
    value: BanType.RehabilitationOrder,
  },
  {
    label: 'Court Date',
    value: BanType.CourtData,
  },
  {
    label: 'Suspended Sentence',
    value: BanType.SuspendedSentence,
  },
];
export default BanTypeValues;
