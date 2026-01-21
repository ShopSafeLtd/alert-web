// Example implementation showing how to integrate print optimization
// This file demonstrates the pattern - you would integrate this into ViewDetails.view.tsx

import type { ViewInvestigationQuery } from 'graphql/investigations/queries/__generated__/view-investigation.generated';

import { Card } from 'antd';
import {
  HideOnPrint,
  PrintableGrid,
  ShowOnPrint,
  useGridPrintOptimization,
} from 'components/common/PrintableGrid';
import CrimeGroupTable from 'components/tables/CrimeGroupTable';
import VehicleGrid from 'components/vehicles/VehicleGrid';
import React from 'react';
import { useIntl } from 'react-intl';

interface PrintProps {
  data: ViewInvestigationQuery | undefined;
  loading?: boolean;
  sortBy?: string;
  vehicleSortBy?: string;
}

// Example of how to modify the ViewDetails component for print optimization
const ViewDetailsWithPrint = ({
  data,
  loading = false,
  sortBy: _sortBy,
  vehicleSortBy,
}: PrintProps) => {
  const intl = useIntl();
  // Apply print styles via hook
  useGridPrintOptimization();

  return (
    <>
      {/* Print-only header */}
      <ShowOnPrint>
        <div
          style={{
            borderBottom: '2px solid #000',
            marginBottom: '20px',
            paddingBottom: '10px',
          }}
        >
          <h1>
            {intl.formatMessage(
              { defaultMessage: 'Investigation Report: {name}' },
              { name: data?.investigation?.name || '' }
            )}
          </h1>
          <p>
            {intl.formatMessage(
              { defaultMessage: 'Investigation ID: {id}' },
              { id: data?.investigation?.id || '' }
            )}
          </p>
          <p>
            {intl.formatMessage(
              { defaultMessage: 'Status: {status}' },
              { status: String(data?.investigation?.status || '') }
            )}
          </p>
          <p>
            {intl.formatMessage(
              { defaultMessage: 'Generated: {date}' },
              { date: new Date().toLocaleDateString() }
            )}
          </p>
        </div>
      </ShowOnPrint>

      {/* Offenders Section */}
      <Card
        className="offenderGridCard"
        loading={loading}
        title={
          <HideOnPrint>
            <div>{/* Original title with buttons */}</div>
          </HideOnPrint>
        }
      >
        <ShowOnPrint>
          <h2 style={{ marginBottom: '15px' }}>
            {intl.formatMessage(
              { defaultMessage: 'Offenders ({count})' },
              { count: data?.investigation?.totalOffenders || 0 }
            )}
          </h2>
        </ShowOnPrint>

        <PrintableGrid
          maxItemsPerPage={12}
          title={intl.formatMessage(
            { defaultMessage: 'Offenders - {name}' },
            { name: data?.investigation?.name || '' }
          )}
        >
          <div className="offenderGrid">
            {/* Note: Investigation query doesn't fetch offenders field, only totalOffenders count */}
            {/* Offender grid cannot be displayed in print view until query is updated */}
          </div>
        </PrintableGrid>
      </Card>

      {/* Vehicles Section */}
      <Card
        className="vehicleGridCard"
        loading={loading}
        style={{ marginTop: '20px' }}
      >
        <ShowOnPrint>
          <h2 style={{ marginBottom: '15px' }}>
            {intl.formatMessage(
              { defaultMessage: 'Vehicles ({count})' },
              { count: data?.investigation?.vehicles?.length || 0 }
            )}
          </h2>
        </ShowOnPrint>

        <PrintableGrid
          maxItemsPerPage={12}
          title={intl.formatMessage(
            { defaultMessage: 'Vehicles - {name}' },
            { name: data?.investigation?.name || '' }
          )}
        >
          <div className="vehicleGrid">
            {data?.investigation?.vehicles && (
              <VehicleGrid
                canDisconnect={false} // Disable actions for print
                sortBy={vehicleSortBy}
                vehicles={data.investigation.vehicles}
              />
            )}
          </div>
        </PrintableGrid>
      </Card>

      {/* Crime Groups Section */}
      <Card
        className="crimeGroupTableCard"
        loading={loading}
        style={{ marginTop: '20px' }}
      >
        <ShowOnPrint>
          <h2 style={{ marginBottom: '15px' }}>
            {intl.formatMessage(
              { defaultMessage: 'Crime Groups ({count})' },
              { count: data?.investigation?.crimeGroups?.length || 0 }
            )}
          </h2>
        </ShowOnPrint>

        <div className="crimeGroupTable">
          {data?.investigation?.crimeGroups && (
            <CrimeGroupTable
              crimeGroups={data.investigation.crimeGroups}
              deleteRights={false} // Disable actions for print
            />
          )}
        </div>
      </Card>

      {/* Page break before additional sections */}
      <div style={{ pageBreakAfter: 'always' }} />

      {/* Additional sections would follow... */}
    </>
  );
};

export default ViewDetailsWithPrint;
