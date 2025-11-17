import type { Theme } from '#/configs/ThemeConfig';
import type { ReportsCentreQuery } from '#/views/reports/reports-centre/__generated__/reports-centre.generated';

import CreateReport from '#/components/form-components/reports/CreateReport/CreateReport.view';
import CreateReportGroup from '#/components/form-components/reports/CreateReportGroup/CreateReportGroup.view';
import EditReport from '#/components/form-components/reports/EditReport/EditReport.view';
import EditReportGroup from '#/components/form-components/reports/EditReportGroup/EditGroup.view';
import {
  faCircleEllipsis,
  faEdit,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Input,
  Modal,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import { ReportType } from 'graphql/types';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles((theme: Theme) => ({
  editButton: {
    borderRadius: 100,
    height: 25,
    padding: '0px !important',
    position: 'absolute',
    right: 5,
    top: 5,
    width: 25,
  },
  linkContainer: {
    height: '100%',
    width: '100%',
  },
  page: {
    padding: 20,
  },
  pageTitle: {
    marginBottom: '0px !important',
  },
  reportCard: {
    '&:hover': {
      backgroundColor: theme.itemHoverBackground,
    },
    cursor: 'pointer',
    maxWidth: 300,
    minHeight: 100,
    minWidth: 250,
    position: 'relative',
  },
  reportText: {
    marginBottom: '0px !important',
    marginTop: 5,
  },
  reportTitle: {
    fontSize: 16,
  },
  rowButton: {
    borderRadius: '100%',
    height: 30,
    padding: '3px 8px 3px 8px',
  },
  search: {
    width: 450,
  },
  skeleton: {
    borderRadius: 10,
    height: '100px !important',
    marginBottom: 20,
    width: '250px !important',
  },
}));

interface ReportCardProps {
  item: {
    description?: null | string;
    id: string;
    name?: null | string;
    type: ReportType;
  };
  onDeleteReportTemplate: (id: string) => void;
  toggleEditOpen: (id: string) => void;
}

const ReportCard = ({
  item,
  onDeleteReportTemplate,
  toggleEditOpen,
}: ReportCardProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const getRoute = () => {
    if (item.type === ReportType.CrimeGroup) return 'crime-groups';
    if (item.type === ReportType.Offender) return 'offender-profile';
    if (item.type === ReportType.OffenderTable) return 'offender-table';
    if (item.type === ReportType.IncidentTable) return 'incident-table';
    if (item.type === ReportType.InvestigationsTable)
      return 'investigation-table';
    if (item.type === ReportType.ActivityTable) return 'activity-table';
    if (item.type === ReportType.CheckListTable) return 'checklist-table';

    if (item.type === ReportType.Business) return 'business';
    if (item.type === ReportType.BusinessEngagementTable)
      return 'business-engagement';
    if (item.type === ReportType.UserEngagementTable) return 'user-engagement';
    if (item.type === ReportType.IncidentMap) return 'incident-map';
    if (item.type === ReportType.IncidentItemsTable) return 'incident-items';
    return 'summary-report';
  };

  return (
    <Col key={item.id}>
      <Card
        bodyStyle={{ height: '100%', padding: '15px 20px' }}
        className={classes.reportCard}
      >
        <Dropdown
          menu={{
            items: [
              {
                // @ts-expect-error issue with antd types for dropdown
                children: null,
                icon: <FontAwesomeIcon icon={faEdit} />,
                key: `${item.id}-edit`,
                label: intl.formatMessage({
                  defaultMessage: 'Edit Report',
                }),
                onClick: () => toggleEditOpen(item.id),
              },
              {
                // @ts-expect-error issue with antd types for dropdown
                children: null,
                icon: <FontAwesomeIcon icon={faTrash} />,
                key: `${item.id}-delete`,
                label: intl.formatMessage({
                  defaultMessage: 'Delete Report',
                }),
                onClick: () =>
                  Modal.confirm({
                    content: intl.formatMessage({
                      defaultMessage:
                        'Once deleted a  report cannot be restored.',
                    }),
                    okText: intl.formatMessage({
                      defaultMessage: 'Delete',
                    }),
                    onOk: () => onDeleteReportTemplate(item.id),
                    title: intl.formatMessage({
                      defaultMessage: 'Are you sure?',
                    }),
                  }),
              },
            ],
          }}
          placement="bottom"
        >
          <Button className={classes.editButton} type="text">
            <FontAwesomeIcon icon={faCircleEllipsis} size="lg" />
          </Button>
        </Dropdown>
        <Link to={`/app/reports/${getRoute()}/${item.id}`}>
          <div className={classes.linkContainer}>
            <Typography.Text className={classes.reportTitle} strong>
              {item.name}
            </Typography.Text>
            <Typography.Paragraph
              className={classes.reportText}
              ellipsis={{
                rows: 2,
              }}
              type="secondary"
            >
              {item.description}
            </Typography.Paragraph>
          </div>
        </Link>
      </Card>
    </Col>
  );
};

const LoadingRow = () => {
  const classes = useStyles();
  return (
    <Row gutter={16}>
      <Col>
        <Skeleton.Input active className={classes.skeleton} />
      </Col>
      <Col>
        <Skeleton.Input active className={classes.skeleton} />
      </Col>
      <Col>
        <Skeleton.Input active className={classes.skeleton} />
      </Col>
    </Row>
  );
};

interface RowTitleProps {
  name?: null | string;
  onDelete: () => void;
  onEdit: () => void;
}

const RowTitle = ({ name, onDelete, onEdit }: RowTitleProps) => {
  const classes = useStyles();
  const intl = useIntl();
  const [hover, setHover] = useState(false);

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  return (
    <Row
      gutter={8}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ height: 40 }}
    >
      <Col>
        <Typography.Title className={classes.pageTitle} level={4}>
          {name}
        </Typography.Title>
      </Col>
      {hover && (
        <Col>
          <Button
            className={classes.rowButton}
            onClick={onEdit}
            size="small"
            type="ghost"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Col>
      )}
      {hover && (
        <Col>
          <Button
            className={classes.rowButton}
            onClick={() =>
              Modal.confirm({
                content: intl.formatMessage({
                  defaultMessage: 'This action cannot be undone.',
                }),
                onOk: onDelete,
                title: intl.formatMessage({
                  defaultMessage: 'Are you sure?',
                }),
              })
            }
            size="small"
            type="ghost"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Col>
      )}
    </Row>
  );
};

interface Props {
  createGroupOpen: boolean;
  createOpen: boolean;
  data: ReportsCentreQuery | undefined;
  editGroupOpen: null | string;
  editOpen: null | string;
  loading: boolean;
  onDeleteReportGroup: (id: string) => void;
  onDeleteReportTemplate: (id: string) => void;
  search: string;
  setSearch: (value: string) => void;
  toggleCreateGroupOpen: () => void;
  toggleCreateOpen: () => void;
  toggleEditGroupOpen: (id: null | string) => void;
  toggleEditOpen: (id: null | string) => void;
}

const ReportsCentre = ({
  createGroupOpen,
  createOpen,
  data,
  editGroupOpen,
  editOpen,
  loading,
  onDeleteReportGroup,
  onDeleteReportTemplate,
  search,
  setSearch,
  toggleCreateGroupOpen,
  toggleCreateOpen,
  toggleEditGroupOpen,
  toggleEditOpen,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  const onMenuClick = (e: { key: string }) => {
    if (e.key === 'addGroup') toggleCreateGroupOpen();
  };

  return (
    <div className={classes.page}>
      <Card bodyStyle={{ padding: '10px 20px' }}>
        <Row align="middle">
          <Col>
            <Typography.Title className={classes.pageTitle} level={3}>
              <FormattedMessage defaultMessage="Reports Centre" />
            </Typography.Title>
          </Col>
          <Col flex={1}>
            <Row justify="center">
              <Col>
                <Input
                  className={classes.search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Search reports',
                  })}
                  value={search}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Dropdown.Button
              menu={{
                items: [
                  {
                    key: 'addGroup',
                    label: intl.formatMessage({
                      defaultMessage: 'Add Report Group',
                    }),
                  },
                ],
                onClick: onMenuClick,
              }}
              onClick={toggleCreateOpen}
            >
              <FormattedMessage defaultMessage="Create New Report" />
            </Dropdown.Button>
          </Col>
        </Row>
      </Card>
      {loading && <LoadingRow />}
      {!loading &&
        data?.reportsCentre.map((group) => (
          <>
            <RowTitle
              name={group.name}
              onDelete={() => onDeleteReportGroup(group.id)}
              onEdit={() => toggleEditGroupOpen(group.id)}
            />
            <Row gutter={16} key={group.id}>
              {group.reports.map((item) => (
                <ReportCard
                  item={item}
                  key={item.id}
                  onDeleteReportTemplate={onDeleteReportTemplate}
                  toggleEditOpen={toggleEditOpen}
                />
              ))}
            </Row>
          </>
        ))}

      <Drawer
        onClose={toggleCreateOpen}
        open={createOpen}
        title={intl.formatMessage({
          defaultMessage: 'Create Report',
        })}
        width={500}
      >
        {createOpen && <CreateReport onClose={toggleCreateOpen} />}
      </Drawer>
      <Drawer
        onClose={() => toggleEditOpen(null)}
        open={!!editOpen}
        title={intl.formatMessage({
          defaultMessage: 'Edit Report',
        })}
      >
        {editOpen && (
          <EditReport
            onClose={() => toggleEditOpen(null)}
            reportId={editOpen}
          />
        )}
      </Drawer>
      <Drawer
        onClose={toggleCreateGroupOpen}
        open={createGroupOpen}
        title={intl.formatMessage({
          defaultMessage: 'Create Report Goup',
        })}
        width={500}
      >
        {createGroupOpen && (
          <CreateReportGroup onClose={toggleCreateGroupOpen} />
        )}
      </Drawer>
      <Drawer
        onClose={() => toggleEditGroupOpen(null)}
        open={!!editGroupOpen}
        title={intl.formatMessage({
          defaultMessage: 'Edit Report Group',
        })}
      >
        {editGroupOpen && (
          <EditReportGroup
            onClose={() => toggleEditGroupOpen(null)}
            reportGroupId={editGroupOpen}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ReportsCentre;
