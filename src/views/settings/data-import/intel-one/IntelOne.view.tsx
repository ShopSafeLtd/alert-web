import React from 'react';
import CSVReader from 'components/CSVReader/CSVReader';
import { Button, Card, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import useIntelOne from './useIntelOne';

const MySafety = () => {
  const { onFileLoad, saving, onSubmit, valid } = useIntelOne();
  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Typography.Title level={4}>
          <FormattedMessage id="0gOWfx" defaultMessage="Intel One Import" />
        </Typography.Title>
        <Typography.Text>
          <FormattedMessage
            id="BmgGnd"
            defaultMessage="Select a csv file from Intel One to import it."
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
