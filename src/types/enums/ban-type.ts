import { BanType } from 'graphql/generated';

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
];
export default BanTypeValues;
