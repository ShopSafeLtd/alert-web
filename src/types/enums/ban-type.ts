import { BanType } from 'graphql/generated';
// wait to check

export const formatBanType = (value?: BanType | null) =>
  BanTypeValues.find((item) => item.value === value)?.label ?? '';

const BanTypeValues = [
  {
    value: BanType.Cbo,
    label: 'Criminal Behaviour Order',
  },
  {
    value: BanType.CommunityBan,
    label: 'Community Ban',
  },
  {
    value: BanType.Other,
    label: 'Other',
  },
  {
    value: BanType.Cpn,
    label: 'Community Protection Notice',
  },
  {
    value: BanType.Cpw,
    label: 'Community Protection Warning',
  },
  {
    value: BanType.Pspo,
    label: 'Public Space Protection Order',
  },
  {
    value: BanType.Wip,
    label: 'Withdrawal of Implied Permission',
  },
  {
    value: BanType.Arrest,
    label: 'Arrest',
  },
  {
    value: BanType.Fine,
    label: 'Fine',
  },
  {
    value: BanType.PrisonSentence,
    label: 'Prison Sentence',
  },
  {
    value: BanType.RehabilitationOrder,
    label: 'Rehabilitation Order',
  },
  {
    value: BanType.CourtData,
    label: 'Court Date',
  },
  {
    value: BanType.SuspendedSentence,
    label: 'Suspended Sentence',
  },
];
export default BanTypeValues;
