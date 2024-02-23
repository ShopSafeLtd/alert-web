import React from 'react';
import CSVReader from 'components/CSVReader/CSVReader';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import useMySafety from './useMySafety';

const MySafety = () => {
  const { onFileLoad, saving, onSubmit, valid } = useMySafety();
  return (
    <div style={{ padding: 20 }}>
      <CSVReader onFileLoaded={onFileLoad} />
      <Button
        style={{ marginTop: 20 }}
        onClick={onSubmit}
        loading={saving}
        disabled={saving || valid}
      >
        <FormattedMessage id="cTiCAi" defaultMessage="Import Data" />
      </Button>
    </div>
  );
};

export default MySafety;
