import React from 'react';
import { Badge, Button, Drawer, Tabs, Tooltip, Typography } from 'antd';

import { createUseStyles } from 'react-jss';
import LinkVehicle from 'components/form-components/linkOptions/LinkVehicle';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import AddExistingOffender from 'components/form-components/offender/offender/AddExistingOffender';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import { faBell, faBellSlash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage, useIntl } from 'react-intl';
import type { ViewInvestigationQuery } from '../../../graphql/generated';
import Flow from './views/Flow/Flow.container';
import ViewDetails from './views/Details';
import DocumentsContainer from './views/Documents/Documents.container';
import AddDocument from '../../../components/form-components/documents/AddDocument';
import AddEvidence from '../../../components/form-components/documents/AddEvidence';

interface Props {
  data: ViewInvestigationQuery | undefined;
  offenderIds: string[];
  vehicleIds: string[];
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  addExistingVehicle: boolean;
  toggleAddExistingVehicle: () => void;
  addExistingCrimeGroup: boolean;
  toggleAddExistingCrimeGroup: () => void;
  addExistingIncident: boolean;
  toggleAddExistingIncident: () => void;
  toggleAddDocument: () => void;
  addDocument: boolean;
  toggleAddDemDocument: () => void;
  addDemDocument: boolean;
  crimeGroupIds: string[];
  incidentIds: string[];
  demId: string | undefined | null;
  submitOffender: (value: string) => void;
  submitVehicle: (value: string) => void;
  submitCrimeGroup: (value: string) => void;
  submitIncident: (value: string) => void;
  toggleSubscribe: () => void;
}

const useStyles = createUseStyles({
  sideListContent: {
    height: '100vh',
    // paddingTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 0,
    paddingRight: 0,
    // overflow: 'hidden',
    '& .no-padding': {
      padding: 0,
    },
  },
});

const ViewInvestigation = ({
  data,
  demId,
  offenderIds,
  vehicleIds,
  incidentIds,
  crimeGroupIds,
  addExistingOffender,
  toggleAddExistingOffender,
  addExistingVehicle,
  toggleAddExistingVehicle,
  addExistingCrimeGroup,
  toggleAddExistingCrimeGroup,
  addExistingIncident,
  toggleAddExistingIncident,
  addDemDocument,
  toggleAddDocument,
  addDocument,
  toggleAddDemDocument,
  submitOffender,
  submitVehicle,
  submitCrimeGroup,
  submitIncident,
  toggleSubscribe,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div style={{ height: '100vh' }}>
      <div className={classes.sideListContent}>
        <Tabs
          tabBarExtraContent={
            <Tooltip
              title={
                data?.investigation?.subscribed
                  ? intl.formatMessage({
                      defaultMessage: 'Stop getting notified about updates.',
                      id: 'WpTY6U',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Get notified about updates.',
                      id: 'icr+Hj',
                    })
              }
            >
              <Button
                onClick={toggleSubscribe}
                type="text"
                color={data?.investigation?.subscribed ? undefined : 'danger'}
              >
                <FontAwesomeIcon
                  size="1x"
                  style={{ marginRight: 8 }}
                  icon={data?.investigation?.subscribed ? faBellSlash : faBell}
                />
                {data?.investigation?.subscribed
                  ? intl.formatMessage({
                      defaultMessage: 'Un-follow Updates',
                      id: '45gIlS',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Follow Updates',
                      id: 'gBN+ok',
                    })}
              </Button>
            </Tooltip>
          }
        >
          <Tabs.TabPane
            key="Dashboard"
            tab={<FormattedMessage defaultMessage="Details" id="Lv0zJu" />}
          >
            <ViewDetails
              toggleAddExistingOffender={toggleAddExistingOffender}
              toggleAddExistingIncident={toggleAddExistingIncident}
              toggleAddExistingVehicle={toggleAddExistingVehicle}
              investigationId={data?.investigation?.id || ''}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="Flow"
            tab={
              <Typography.Text>
                <FormattedMessage defaultMessage="Flow Map" id="Xq/6U0" />
              </Typography.Text>
            }
          >
            <Flow importData={data} />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="Documents"
            tab={
              <Badge
                offset={[8, 0]}
                size="small"
                count={data?.investigation?.documents?.length || 0}
                showZero
              >
                <Typography.Text>
                  <FormattedMessage defaultMessage="Evidence" id="6g7+6N" />
                </Typography.Text>
              </Badge>
            }
          >
            <DocumentsContainer
              demId={demId}
              data={data?.investigation?.documents}
              toggleAddDemDocument={toggleAddDemDocument}
              toggleAddDocument={toggleAddDocument}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <Drawer
        title={
          <FormattedMessage
            defaultMessage="Add Existing Offenders"
            id="1FbM4r"
          />
        }
        visible={addExistingOffender}
        width="800"
        onClose={toggleAddExistingOffender}
        zIndex={1001}
      >
        {addExistingOffender ? (
          <AddExistingOffender
            offenderIds={offenderIds}
            onClose={toggleAddExistingOffender}
            update={(submitData) => submitOffender(submitData.id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={
          <FormattedMessage
            defaultMessage="Add Existing Vehicles"
            id="goP1s6"
          />
        }
        visible={addExistingVehicle}
        width="800"
        onClose={toggleAddExistingVehicle}
        zIndex={1001}
      >
        {addExistingVehicle ? (
          <LinkVehicle
            update={(submitData) => submitVehicle(submitData.id)}
            onClose={toggleAddExistingVehicle}
            vehicleIds={vehicleIds}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={
          <FormattedMessage
            defaultMessage="Add Existing Crime Groups"
            id="3HDZC+"
          />
        }
        visible={addExistingCrimeGroup}
        width="800"
        onClose={toggleAddExistingCrimeGroup}
        zIndex={1001}
      >
        {addExistingVehicle ? (
          <LinkCrimeGroup
            update={(submitData) => submitCrimeGroup(submitData.id)}
            crimeGroupIds={crimeGroupIds}
            onClose={toggleAddExistingCrimeGroup}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={
          <FormattedMessage
            defaultMessage="Add Existing incident"
            id="1GC81u"
          />
        }
        visible={addExistingIncident}
        width="800"
        onClose={toggleAddExistingIncident}
        zIndex={1001}
      >
        {addExistingIncident ? (
          <LinkIncident
            incidentIds={incidentIds}
            onClose={toggleAddExistingIncident}
            update={(submitData) => submitIncident(submitData.id)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={<FormattedMessage defaultMessage="Add Document" id="r9vGqd" />}
        visible={addDocument}
        width="800"
        onClose={toggleAddDocument}
        zIndex={1001}
      >
        {addDocument ? (
          <AddDocument
            investigationId={data?.investigation?.id || ''}
            onClose={toggleAddDocument}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={
          <FormattedMessage defaultMessage="Add DEM Document" id="gDnUVp" />
        }
        visible={addDemDocument}
        width="800"
        onClose={toggleAddDemDocument}
        zIndex={1001}
      >
        {addDemDocument ? (
          <AddEvidence
            investigationId={data?.investigation?.id || ''}
            onClose={toggleAddDemDocument}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewInvestigation;
