import type { AvailableDashboardElements } from '#/state/dashboard-model';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Statistic } from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

const IncidentValue = ({
  removeItem,
}: {
  removeItem: (item: AvailableDashboardElements) => void;
}) => {
  const data = '123222.50';
  const loading = false;
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  return (
    <Card style={{ height: '100%' }}>
      <Button
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={() => removeItem('incidentValue')}
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
      />
      <Statistic
        loading={loading}
        title={intl.formatMessage({
          defaultMessage: 'Total Value Lost',
        })}
        value={intl.formatNumber(Number.parseFloat(data), {
          currency,
          style: 'currency',
        })}
      />
    </Card>
  );
};

export default IncidentValue;
