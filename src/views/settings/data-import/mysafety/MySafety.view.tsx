import React from 'react';
import CSVReader from 'components/CSVReader/CSVReader';
import { Button, Card, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import useMySafety from './useMySafety';

const MySafety = () => {
  const { onFileLoad, saving, onSubmit, valid } = useMySafety();
  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Typography.Title level={4}>
          <FormattedMessage id="/tmHKO" defaultMessage="Mysafety Import" />
        </Typography.Title>
        <Typography.Text>
          <FormattedMessage
            id="04FiIZ"
            defaultMessage="Select a csv file from mysafety to import it."
          />
        </Typography.Text>
        <CSVReader onFileLoaded={onFileLoad} />
        <Button
          style={{ marginTop: 20 }}
          onClick={onSubmit}
          loading={saving}
          disabled={saving || valid}
        >
          <FormattedMessage id="cTiCAi" defaultMessage="Import Data" />
        </Button>
      </Card>
    </div>
  );
};

export default MySafety;
