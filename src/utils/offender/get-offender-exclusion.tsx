import React from 'react';
import { FormattedMessage } from 'react-intl';
// calculate the difference in days between start and end date
export const calcDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate).valueOf();
  const end = new Date(endDate).valueOf();

  const difference = Math.abs(end - start);
  const days = Math.ceil(difference / 1000 / 60 / 60 / 24);
  const years = Math.floor(days / 365);
  const remainingDays = days % 365;

  if (days <= 365.25)
    return (
      <FormattedMessage
        id="j3Zy75"
        defaultMessage="{reference, plural, =0 {0 days} one {1 day} other {# days}}"
        values={{
          reference: days,
        }}
      />
    );

  return (
    <>
      <FormattedMessage
        id="i9u9wS"
        defaultMessage="{reference, plural, =0 {0 years} one {1 year} other {# years}}"
        values={{
          reference: years,
        }}
      />
      {remainingDays > 0 && (
        <FormattedMessage
          id="ANWXuX"
          defaultMessage="{ reference, plural, =1 {1 day} other {# days}}"
          values={{
            reference: remainingDays,
          }}
        />
      )}
    </>
  );
};
// calculate if the ban has expired
export const calcExpired = (endDate: string | Date) => {
  const end = new Date(endDate).valueOf();
  const now = Date.now();

  return end - now < 0;
};
