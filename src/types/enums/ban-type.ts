import { BanType } from 'graphql/generated';
// wait to check
const BanTypeValues = [
  {
    value: BanType.Cbo,
    label: 'CBO',
  },
  {
    value: BanType.CommunityBan,
    label: 'Community_Ban',
  },
  {
    value: BanType.Other,
    label: 'Other',
  },
  {
    value: BanType.Cpn,
    label: 'CPN',
  },
  {
    value: BanType.Cpw,
    label: 'CPW',
  },
  {
    value: BanType.Pspo,
    label: 'PSPO',
  },
  {
    value: BanType.Wip,
    label: 'WIP',
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
