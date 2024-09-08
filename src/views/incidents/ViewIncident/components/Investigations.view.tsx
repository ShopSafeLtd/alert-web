import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';

import AddInvestigation from '#/components/form-components/Investigation/AddInvestigation';
import InvestigationTable from '#/components/tables/InvestigationTable';
import { ViewIncidentDocument } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Drawer, Empty, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

const { Title } = Typography;

interface Props {
  data: ViewIncidentQuery | undefined;
  incidentId: string;
  loading: boolean;
}

const Investigations = ({ data, incidentId, loading }: Props) => {
  const intl = useIntl();
  const [addInvestigation, setAddInvestigation] = useState(false);

  const toggleAddInvestigation = () => {
    setAddInvestigation(() => !addInvestigation);
  };

  const updateInvestigationList: MutationUpdaterFn<
    CreateInvestigationMutation
  > = (store, { data: res }) => {
    if (
      res?.createInvestigation === null ||
      res?.createInvestigation === undefined
    )
      return;
    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          investigations: [
            ...existingData.incident.investigations,
            res.createInvestigation,
          ],
        },
      },
      query: ViewIncidentDocument,
      variables: {
        where: {
          id: incidentId,
        },
      },
    });
  };

  return (
    <>
      <Card loading={loading}>
        <Row align="middle" gutter={8} style={{ marginBottom: 10 }}>
          <Col flex={1}>
            <Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Investigations',
              })}
            </Title>
          </Col>

          <Col>
            <Button
              icon={
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
              }
              onClick={toggleAddInvestigation}
              size="small"
            >
              {intl.formatMessage({
                defaultMessage: 'Add Investigation',
              })}
            </Button>
          </Col>
        </Row>
        {data?.incident?.investigations.length && !loading ? (
          <InvestigationTable investigations={data?.incident?.investigations} />
        ) : (
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No investigations for this incident',
            })}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Card>
      <Drawer
        onClose={toggleAddInvestigation}
        open={addInvestigation}
        title={intl.formatMessage({
          defaultMessage: 'Add New Investigation',
        })}
        width="500"
      >
        {addInvestigation ? (
          <AddInvestigation
            incidentId={data?.incident?.id || ''}
            onClose={toggleAddInvestigation}
            update={updateInvestigationList}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default Investigations;
