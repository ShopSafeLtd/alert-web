/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

// eslint-disable-next-line react/jsx-props-no-spreading
const IntlMessage = (props: any) => <FormattedMessage {...props} />;
export default injectIntl(IntlMessage, {
  // @ts-expect-error does exsist
  withRef: false,
});
