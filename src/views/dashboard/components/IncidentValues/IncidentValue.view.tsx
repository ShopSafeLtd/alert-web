import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Card, Statistic } from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

const IncidentValue = ({
  data,
  loading,
}: {
  data: number;
  loading: boolean;
}) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  return (
    <Card style={{ height: '100%' }}>
      <Statistic
        loading={loading}
        title={intl.formatMessage({
          defaultMessage: 'Total Value Lost',
        })}
        value={intl.formatNumber(data, { currency, style: 'currency' })}
      />
    </Card>
  );
};

export default IncidentValue;
