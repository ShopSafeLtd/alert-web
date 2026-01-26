import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Alert, Spin, message } from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { GeographicalAreaListView } from './GeographicalAreaList.view';
import { useGeographicalAreas } from './useGeographicalAreas';

const GeographicalAreaListContainer: React.FC = () => {
  const intl = useIntl();
  const currentScheme = useAtomValue(currentSchemeAtom);
  const schemeId = currentScheme?.id;

  const { areas, deleteArea, loading, searchText, setSearchText } =
    useGeographicalAreas({ schemeId: schemeId ?? '' });

  const handleCreate = () => {
    void message.info(
      intl.formatMessage({
        defaultMessage:
          'Please use the Reporting Areas page for full map-based area creation and editing.',
      })
    );
  };

  const handleEdit = () => {
    void message.info(
      intl.formatMessage({
        defaultMessage:
          'Please use the Reporting Areas page for full map-based area editing.',
      })
    );
  };

  const handleDelete = (id: string) => {
    void deleteArea(id);
  };

  if (!schemeId) {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <Spin
          size="large"
          tip={intl.formatMessage({ defaultMessage: 'Loading scheme...' })}
        />
      </div>
    );
  }

  return (
    <>
      <Alert
        description={
          <FormattedMessage defaultMessage="Geographical areas are used for filtering incidents, offenders, and vehicles by location. For advanced map-based editing, please use the Reporting Areas page." />
        }
        message={
          <FormattedMessage defaultMessage="Geographical Areas Management" />
        }
        showIcon
        style={{ margin: 24 }}
        type="info"
      />
      <GeographicalAreaListView
        areas={areas}
        loading={loading}
        onCreate={handleCreate}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onSearchChange={setSearchText}
        searchText={searchText}
      />
    </>
  );
};

export default GeographicalAreaListContainer;
