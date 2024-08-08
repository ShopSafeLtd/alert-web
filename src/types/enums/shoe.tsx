import { ShoeSide, ShoeStatus, ShoeType } from '#/graphql/types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

// wait to check
export const shoeStatusValues = [
  {
    label: 'Awaiting Match',
    value: 'AWAITING_MATCH',
  },
  {
    label: 'Awaiting Shipping',
    value: 'AWAITING_SHIPPING',
  },
  {
    label: 'Shipped',
    value: 'SHIPPED',
  },
  {
    label: 'Received',
    value: 'RECEIVED',
  },
];

export const shoeTypeValues = [
  {
    label: 'Others',
    value: 'OTHERS',
  },
];

export const getShoeStatus = (
  status: ShoeStatus | null | undefined
): React.ReactNode => {
  if (status === ShoeStatus.Shipped)
    return <FormattedMessage defaultMessage="Shipped" />;
  if (status === ShoeStatus.AwaitingShipping)
    return <FormattedMessage defaultMessage="Awaiting Shipping" />;
  if (status === ShoeStatus.AwaitingMatch)
    return <FormattedMessage defaultMessage="Awaiting Match" />;
  if (status === ShoeStatus.Received)
    return <FormattedMessage defaultMessage="Received" />;
  return <FormattedMessage defaultMessage="Awaiting Match" />;
};

export const getShoeType = (
  type: ShoeType | null | undefined
): React.ReactNode => {
  if (type === ShoeType.Others)
    return <FormattedMessage defaultMessage="Others" />;
};
export const getShoeSide = (
  side: ShoeSide | null | undefined
): React.ReactNode => {
  if (side === ShoeSide.Left) return <FormattedMessage defaultMessage="Left" />;
  if (side === ShoeSide.Right)
    return <FormattedMessage defaultMessage="Right" />;
};

export const getTitle = (value: string): string => {
  if (value.includes('no match')) {
    return 'No match';
  }
  if (value.includes('and matched')) {
    return 'Matched Successfully';
  }
  return value;
};
