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
import {
  AlertOutlined,
  CheckSquareOutlined,
  DownOutlined,
  FolderOpenOutlined,
  LinkOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Empty,
  Grid,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import LinkCrimeGroup from 'components/form-components/linkOptions/LinkCrimeGroup';
import LinkIncident from 'components/form-components/linkOptions/LinkIncident';
import LinkOffender from 'components/form-components/offender/AddExistingOffender';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import LinkInvestigation from '../../Investigation/LinkInvestigation';
import LinkChecklist from '../../linkOptions/LinkChecklist';
import useStyles from './LinkProfile.styles';

const { useBreakpoint } = Grid;

interface Props {
  checklistsData: ChecklistData | undefined;
  crimeGroupsData: CrimeGroupData | undefined;
  incidentsData: IncidentCardData | undefined;
  investigationsData: InvestigationData | undefined;
  minimal?: boolean;
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
  minimal = false,
  offendersData,
  saving,
  updateChecklistsList,
  updateCrimeGroupsList,
  updateIncidentList,
  updateInvestigationList,
  updateOffendersList,
}: Props): JSX.Element => {
  const intl = useIntl();
  const screens = useBreakpoint();
  const classes = useStyles();

  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [linkChecklist, setLinkChecklist] = useState(false);
  const [linkCrimeGroup, setLinkCrimeGroup] = useState(false);
  const [linkInvestigation, setLinkInvestigation] = useState(false);

  const toggleLinkIncident = () => setLinkIncident(!linkIncident);
  const toggleLinkOffender = () => setLinkOffender(!linkOffender);
  const toggleLinkChecklist = () => setLinkChecklist(!linkChecklist);
  const toggleLinkCrimeGroup = () => setLinkCrimeGroup(!linkCrimeGroup);
  const toggleLinkInvestigation = () =>
    setLinkInvestigation(!linkInvestigation);

  // Count linked items
  const linkedItems = [
    incidentsData,
    offendersData,
    investigationsData,
    crimeGroupsData,
    checklistsData,
  ].filter(Boolean);

  // Build menu items for dropdown
  const menuItems: Array<{
    disabled?: boolean;
    icon: React.ReactNode;
    key: string;
    label: string;
    onClick: () => void;
  }> = [];

  const canReadIncidents = hasRolePermission({
    permission: {
      method: PermissionMethod.Read,
      model: PermissionModel.Incidents,
    },
  });

  const canReadOffenders = hasRolePermission({
    permission: {
      method: PermissionMethod.Read,
      model: PermissionModel.Offenders,
    },
  });

  const canReadInvestigations = hasRolePermission({
    permission: {
      method: PermissionMethod.Read,
      model: PermissionModel.Investigations,
    },
  });

  const canReadCrimeGroups = hasRolePermission({
    permission: {
      method: PermissionMethod.Read,
      model: PermissionModel.CrimeGroups,
    },
  });

  const canReadChecklists = hasRolePermission({
    permission: {
      method: PermissionMethod.Read,
      model: PermissionModel.Checklist,
    },
  });

  if (canReadIncidents) {
    menuItems.push({
      disabled: incidentsData !== undefined,
      icon: <AlertOutlined />,
      key: 'incident',
      label: intl.formatMessage({ defaultMessage: 'Add Incident' }),
      onClick: toggleLinkIncident,
    });
  }

  if (canReadOffenders) {
    menuItems.push({
      icon: <UserOutlined />,
      key: 'offender',
      label: intl.formatMessage({ defaultMessage: 'Add Offender' }),
      onClick: toggleLinkOffender,
    });
  }

  if (canReadInvestigations) {
    menuItems.push({
      icon: <FolderOpenOutlined />,
      key: 'investigation',
      label: intl.formatMessage({ defaultMessage: 'Add Investigation' }),
      onClick: toggleLinkInvestigation,
    });
  }

  if (canReadCrimeGroups) {
    menuItems.push({
      icon: <TeamOutlined />,
      key: 'crimeGroup',
      label: intl.formatMessage({ defaultMessage: 'Add Crime Group' }),
      onClick: toggleLinkCrimeGroup,
    });
  }

  if (canReadChecklists) {
    menuItems.push({
      icon: <CheckSquareOutlined />,
      key: 'checklist',
      label: intl.formatMessage({ defaultMessage: 'Add Checklist' }),
      onClick: toggleLinkChecklist,
    });
  }

  return (
    <>
      <Card
        className={`${classes.linkedProfilesCard} todo-linked-profiles`}
        extra={
          !minimal && (
            <Dropdown
              disabled={saving || menuItems.length === 0}
              menu={{ items: menuItems }}
              trigger={['click']}
            >
              <Button
                disabled={saving || menuItems.length === 0}
                icon={<PlusOutlined />}
                size="small"
              >
                {intl.formatMessage({ defaultMessage: 'Add' })}
                <DownOutlined style={{ marginLeft: 4 }} />
              </Button>
            </Dropdown>
          )
        }
        title={
          <Space>
            <LinkOutlined style={{ fontSize: 18 }} />
            {intl.formatMessage({ defaultMessage: 'Linked Profiles' })}
            {linkedItems.length > 0 && (
              <Tag color="purple">
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                {linkedItems.length}{' '}
                {intl.formatMessage({ defaultMessage: 'linked' })}
              </Tag>
            )}
          </Space>
        }
      >
        {/* Linked Items Display */}
        {linkedItems.length > 0 ? (
          <Row gutter={[16, 16]}>
            {canReadIncidents && incidentsData && (
              <Col lg={12} xs={24}>
                <Card
                  className={classes.linkedItemCard}
                  extra={
                    !saving && (
                      <Button
                        danger
                        onClick={() => updateIncidentList(undefined)}
                        size="small"
                        type="text"
                      >
                        {intl.formatMessage({ defaultMessage: 'Remove' })}
                      </Button>
                    )
                  }
                  hoverable
                  size="small"
                  title={
                    <Space>
                      <AlertOutlined style={{ color: '#ff4d4f' }} />
                      {intl.formatMessage({ defaultMessage: 'Incident' })}
                    </Space>
                  }
                >
                  <IncidentDetailCard incident={incidentsData} />
                </Card>
              </Col>
            )}

            {canReadOffenders && offendersData && (
              <Col lg={12} xs={24}>
                <Card
                  className={classes.linkedItemCard}
                  extra={
                    !saving && (
                      <Button
                        danger
                        onClick={() => updateOffendersList(undefined)}
                        size="small"
                        type="text"
                      >
                        {intl.formatMessage({ defaultMessage: 'Remove' })}
                      </Button>
                    )
                  }
                  hoverable
                  size="small"
                  title={
                    <Space>
                      <UserOutlined style={{ color: '#fa8c16' }} />
                      {intl.formatMessage({ defaultMessage: 'Offender' })}
                    </Space>
                  }
                >
                  <OffenderDetailCard offender={offendersData} />
                </Card>
              </Col>
            )}

            {canReadInvestigations && investigationsData && (
              <Col lg={12} xs={24}>
                <Card
                  className={classes.linkedItemCard}
                  extra={
                    !saving && (
                      <Button
                        danger
                        onClick={() => updateInvestigationList(undefined)}
                        size="small"
                        type="text"
                      >
                        {intl.formatMessage({ defaultMessage: 'Remove' })}
                      </Button>
                    )
                  }
                  hoverable
                  size="small"
                  title={
                    <Space>
                      <FolderOpenOutlined style={{ color: '#1890ff' }} />
                      {intl.formatMessage({
                        defaultMessage: 'Investigation',
                      })}
                    </Space>
                  }
                >
                  <InvestigationDetailCard investigation={investigationsData} />
                </Card>
              </Col>
            )}

            {canReadCrimeGroups && crimeGroupsData && (
              <Col lg={12} xs={24}>
                <Card
                  className={classes.linkedItemCard}
                  extra={
                    !saving && (
                      <Button
                        danger
                        onClick={() => updateCrimeGroupsList(undefined)}
                        size="small"
                        type="text"
                      >
                        {intl.formatMessage({ defaultMessage: 'Remove' })}
                      </Button>
                    )
                  }
                  hoverable
                  size="small"
                  title={
                    <Space>
                      <TeamOutlined style={{ color: '#722ed1' }} />
                      {intl.formatMessage({ defaultMessage: 'Crime Group' })}
                    </Space>
                  }
                >
                  <CrimeGroupDetailCard crimeGroup={crimeGroupsData} />
                </Card>
              </Col>
            )}

            {canReadChecklists && checklistsData && (
              <Col lg={12} xs={24}>
                <Card
                  className={classes.linkedItemCard}
                  extra={
                    !saving && (
                      <Button
                        danger
                        onClick={() => updateChecklistsList(undefined)}
                        size="small"
                        type="text"
                      >
                        {intl.formatMessage({ defaultMessage: 'Remove' })}
                      </Button>
                    )
                  }
                  hoverable
                  size="small"
                  title={
                    <Space>
                      <CheckSquareOutlined style={{ color: '#52c41a' }} />
                      {intl.formatMessage({ defaultMessage: 'Checklist' })}
                    </Space>
                  }
                >
                  <ChecklistDetailCard checklist={checklistsData} />
                </Card>
              </Col>
            )}
          </Row>
        ) : (
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No profiles linked yet',
            })}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            {!minimal && (
              <Typography.Text type="secondary">
                {intl.formatMessage({
                  defaultMessage: 'Click the Add button above to link profiles',
                })}
              </Typography.Text>
            )}
          </Empty>
        )}
      </Card>

      {/* Drawers */}
      <Drawer
        onClose={toggleLinkIncident}
        open={linkIncident}
        title={intl.formatMessage({
          defaultMessage: 'Link Incidents',
        })}
        width={screens.xs ? '100%' : 800}
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
        width={screens.xs ? '100%' : 800}
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
        width={screens.xs ? '100%' : 800}
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
        width={screens.xs ? '100%' : 800}
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
        width={screens.xs ? '100%' : 800}
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
