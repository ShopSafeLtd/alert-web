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
];
export default BanTypeValues;
