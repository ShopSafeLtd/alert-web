import type {
  ChecklistData,
  CrimeGroupData,
  IncidentCardData,
  InvestigationData,
  OffenderData,
} from 'types/DataType';

import ChecklistDetailCard from '#/components/MessageInput/MessageCard/ChecklistDetailCard';
import CrimeGroupDetailCard from '#/components/MessageInput/MessageCard/CrimeGroupDetailCard';
import IncidentDetailCard from '#/components/MessageInput/MessageCard/IncidentDetailCard';
import InvestigationDetailCard from '#/components/MessageInput/MessageCard/InvestigationDetailCard';
import OffenderDetailCard from '#/components/MessageInput/MessageCard/OffenderDetailCard';
import { PermissionMethod, PermissionModel } from '#/graphql/types';
import hasRolePermission from '#/utils/has-role-permission';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Divider, Drawer, Form, Row } from 'antd';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import LinkOffender from 'components/form-components/offender/AddExistingOffender';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import LinkInvestigation from '../Investigation/LinkInvestigation';
import LinkChecklist from '../linkOptions/LinkChecklist';

interface Props {
  checklistsData: ChecklistData | undefined;
  crimeGroupsData: CrimeGroupData | undefined;
  incidentsData: IncidentCardData | undefined;
  investigationsData: InvestigationData | undefined;
  offendersData: OffenderData | undefined;
  saving: boolean;
  updateChecklistsList: (value: ChecklistData | undefined) => void;
  updateCrimeGroupsList: (value: CrimeGroupData | undefined) => void;
  updateIncidentList: (value: IncidentCardData | undefined) => void;
  updateInvestigationList: (value: InvestigationData | undefined) => void;
  updateOffendersList: (value: OffenderData | undefined) => void;
}

const LinkProfile = ({
  checklistsData,
  crimeGroupsData,
  incidentsData,
  investigationsData,
  offendersData,
  saving,
  updateChecklistsList,
  updateCrimeGroupsList,
  updateIncidentList,
  updateInvestigationList,
  updateOffendersList,
}: Props): JSX.Element => {
  const intl = useIntl();
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [linkChecklist, setLinkChecklist] = useState(false);
  const [linkCrimeGroup, setLinkCrimeGroup] = useState(false);
  const [linkInvestigation, setLinkInvestigation] = useState(false);
  const toggleLinkIncident = () => {
    setLinkIncident(!linkIncident);
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };
  const toggleLinkChecklist = () => {
    setLinkChecklist(!linkChecklist);
  };
  const toggleLinkCrimeGroup = () => {
    setLinkCrimeGroup(!linkCrimeGroup);
  };
  const toggleLinkInvestigation = () => {
    setLinkInvestigation(!linkInvestigation);
  };
  return (
    <>
      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Profiles',
        })}
        // name="profiles"
        tooltip={intl.formatMessage({
          defaultMessage:
            'Please add the profiles that were involved in the activities.',
        })}
      >
        <Row
          align="middle"
          gutter={10}
          style={{ marginBottom: 20, width: '100%' }}
        >
          {/* <Col>
              <Typography.Title level={4} style={{ marginBottom: 0 }}>
                {intl.formatMessage({
                  defaultMessage: 'Profiles',
                })}
              </Typography.Title>
            </Col> */}
          {hasRolePermission({
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.Incidents,
            },
          }) && (
            <Col>
              <Button
                disabled={saving || incidentsData !== undefined}
                icon={
                  <FontAwesomeIcon
                    className="button-icon"
                    icon={faPlus}
                    size="lg"
                  />
                }
                onClick={toggleLinkIncident}
                style={{ color: 'red' }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Incident',
                })}
              </Button>
            </Col>
          )}
          {hasRolePermission({
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.Offenders,
            },
          }) && (
            <Col>
              <Button
                disabled={saving}
                icon={
                  <FontAwesomeIcon
                    className="button-icon"
                    icon={faPlus}
                    size="lg"
                  />
                }
                onClick={toggleLinkOffender}
                style={{ color: 'red' }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Offender',
                })}
              </Button>
            </Col>
          )}
          {hasRolePermission({
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.Investigations,
            },
          }) && (
            <Col>
              <Button
                disabled={saving}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
                onClick={toggleLinkInvestigation}
                style={{ color: 'red' }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Investigation',
                })}
              </Button>
            </Col>
          )}
          {hasRolePermission({
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.CrimeGroups,
            },
          }) && (
            <Col>
              <Button
                disabled={saving}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
                onClick={toggleLinkCrimeGroup}
                style={{ color: 'red' }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Crime Group',
                })}
              </Button>
            </Col>
          )}
          {hasRolePermission({
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.Checklist,
            },
          }) && (
            <Col>
              <Button
                disabled={saving}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
                onClick={toggleLinkChecklist}
                style={{ color: 'red' }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Checklist',
                })}
              </Button>
            </Col>
          )}
        </Row>
        <Row gutter={20} style={{ marginTop: 10 }}>
          {hasRolePermission({
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.Incidents,
            },
          }) && incidentsData ? (
            <Col span={12}>
              <Divider>
                {intl.formatMessage({
                  defaultMessage: 'Incident',
                })}
              </Divider>
              <IncidentDetailCard
                incident={incidentsData}
                onDelete={() => updateIncidentList(undefined)}
              />
            </Col>
          ) : null}

          {hasRolePermission({
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.Offenders,
            },
          }) && offendersData ? (
            <Col span={12}>
              <Divider>
                {intl.formatMessage({
                  defaultMessage: 'Offender',
                })}
              </Divider>
              <OffenderDetailCard
                offender={offendersData}
                onDelete={() => updateOffendersList(undefined)}
              />
            </Col>
          ) : null}
          {hasRolePermission({
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.Investigations,
            },
          }) && investigationsData ? (
            <Col span={12}>
              <Divider>
                {intl.formatMessage({
                  defaultMessage: 'Investigation',
                })}
              </Divider>
              <InvestigationDetailCard
                investigation={investigationsData}
                onDelete={() => updateInvestigationList(undefined)}
              />
            </Col>
          ) : null}
          {hasRolePermission({
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.CrimeGroups,
            },
          }) && crimeGroupsData ? (
            <Col span={12}>
              <Divider>
                {intl.formatMessage({
                  defaultMessage: 'Crime Group',
                })}
              </Divider>
              <CrimeGroupDetailCard
                crimeGroup={crimeGroupsData}
                onDelete={() => updateCrimeGroupsList(undefined)}
              />
            </Col>
          ) : null}
          {hasRolePermission({
            permission: {
              method: PermissionMethod.Read,
              model: PermissionModel.Checklist,
            },
          }) && checklistsData ? (
            <Col span={12}>
              <Divider>
                {intl.formatMessage({
                  defaultMessage: 'CheckList',
                })}
              </Divider>
              <ChecklistDetailCard
                checklist={checklistsData}
                onDelete={() => updateChecklistsList(undefined)}
              />
            </Col>
          ) : null}
        </Row>
      </Form.Item>

      <Drawer
        onClose={toggleLinkIncident}
        open={linkIncident}
        title={intl.formatMessage({
          defaultMessage: 'Link Incidents',
        })}
        width="800"
      >
        {linkIncident ? (
          <LinkIncident
            incidentIds={incidentsData ? [incidentsData?.id] : []}
            onClose={toggleLinkIncident}
            update={updateIncidentList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkOffender}
        open={linkOffender}
        title={intl.formatMessage({
          defaultMessage: 'Link Offenders',
        })}
        width="800"
      >
        {linkOffender ? (
          <LinkOffender
            offenderIds={offendersData ? [offendersData?.id] : []}
            onClose={toggleLinkOffender}
            update={updateOffendersList}
          />
        ) : (
          <div />
        )}
      </Drawer>

      <Drawer
        onClose={toggleLinkCrimeGroup}
        open={linkCrimeGroup}
        title={intl.formatMessage({
          defaultMessage: 'Add Crime Groups',
        })}
        width="800"
        zIndex={1001}
      >
        {linkCrimeGroup ? (
          <LinkCrimeGroup
            crimeGroupIds={crimeGroupsData ? [crimeGroupsData?.id] : []}
            onClose={toggleLinkCrimeGroup}
            update={updateCrimeGroupsList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkChecklist}
        open={linkChecklist}
        title={intl.formatMessage({
          defaultMessage: 'Link Checklists',
        })}
        width="800"
      >
        {linkChecklist ? (
          <LinkChecklist
            checklistIds={checklistsData ? [checklistsData.id] : []}
            onClose={toggleLinkChecklist}
            update={updateChecklistsList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={toggleLinkInvestigation}
        open={linkInvestigation}
        title={intl.formatMessage({
          defaultMessage: 'Link Investigation',
        })}
        width="800"
      >
        {linkInvestigation ? (
          <LinkInvestigation
            onClose={toggleLinkInvestigation}
            update={updateInvestigationList}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default LinkProfile;
