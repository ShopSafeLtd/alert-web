import React from 'react';
import {
  Typography,
  Card,
  Row,
  Col,
  Button,
  Input,
  Skeleton,
  Dropdown,
  Drawer,
  Modal,
} from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import type { ReportsCentreQuery } from 'graphql/generated';
import { ReportType } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleEllipsis,
  faEdit,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import CreateReport from '#/components/form-components/reports/CreateReport/CreateReport.view';
import type { Theme } from '#/configs/ThemeConfig';
import EditReport from '#/components/form-components/reports/EditReport/EditReport.view';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    padding: 20,
  },
  reportCard: {
    width: 250,
    cursor: 'pointer',
    height: 100,
    position: 'relative',
    '&:hover': {
      backgroundColor: theme.itemHoverBackground,
    },
  },
  reportTitle: {
    fontSize: 16,
  },
  reportText: {
    marginBottom: '0px !important',
    marginTop: 5,
  },
  search: {
    width: 450,
  },
  pageTitle: {
    marginBottom: '0px !important',
  },
  skeleton: {
    height: '100px !important',
    width: '250px !important',
    borderRadius: 10,
    marginBottom: 20,
  },
  editButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    height: 25,
    width: 25,
    padding: '0px !important',
    borderRadius: 100,
  },
  linkContainer: {
    width: '100%',
    height: '100%',
  },
}));

interface ReportCardProps {
  item: {
    id: string;
    name?: string | null;
    description?: string | null;
    type: ReportType;
  };
  toggleEditOpen: (id: string) => void;
  onDeleteReportTemplate: (id: string) => void;
}

const ReportCard = ({
  item,
  toggleEditOpen,
  onDeleteReportTemplate,
}: ReportCardProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const getRoute = () => {
    if (item.type === ReportType.CrimeGroup) return 'crime-groups';
    if (item.type === ReportType.Offender) return 'offender-profile';
    if (item.type === ReportType.Business) return 'business';
    return 'summary-report';
  };

  return (
    <Col key={item.id}>
      <Card className={classes.reportCard} bodyStyle={{ padding: '15px 20px' }}>
        <Dropdown
          menu={{
            items: [
              {
                key: `${item.id}-edit`,
                icon: <FontAwesomeIcon icon={faEdit} />,
                label: intl.formatMessage({
                  defaultMessage: 'Edit Report',
                  id: 'wOa42g',
                }),
                onClick: () => toggleEditOpen(item.id),
                // @ts-expect-error issue with antd types for dropdown
                children: null,
              },
              {
                key: `${item.id}-delete`,
                icon: <FontAwesomeIcon icon={faTrash} />,
                label: intl.formatMessage({
                  defaultMessage: 'Delete Report',
                  id: 's8R8id',
                }),
                // @ts-expect-error issue with antd types for dropdown
                children: null,
                onClick: () =>
                  Modal.confirm({
                    title: intl.formatMessage({
                      defaultMessage: 'Are you sure?',
                      id: '2oCaym',
                    }),
                    onOk: () => onDeleteReportTemplate(item.id),
                    okText: intl.formatMessage({
                      defaultMessage: 'Delete',
                      id: 'K3r6DQ',
                    }),
                    content: intl.formatMessage({
                      defaultMessage:
                        'Once deleted a  report cannot be restored.',
                      id: 'z5ptVj',
                    }),
                  }),
              },
            ],
          }}
          placement="bottom"
        >
          <Button className={classes.editButton} type="text">
            <FontAwesomeIcon size="lg" icon={faCircleEllipsis} />
          </Button>
        </Dropdown>
        <Link to={`/app/reports/${getRoute()}/${item.id}`}>
          <div className={classes.linkContainer}>
            <Typography.Text className={classes.reportTitle} strong>
              {item.name}
            </Typography.Text>
            <Typography.Paragraph
              ellipsis={{
                rows: 2,
              }}
              type="secondary"
              className={classes.reportText}
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
        <Skeleton.Input className={classes.skeleton} active />
      </Col>
      <Col>
        <Skeleton.Input className={classes.skeleton} active />
      </Col>
      <Col>
        <Skeleton.Input className={classes.skeleton} active />
      </Col>
    </Row>
  );
};

interface Props {
  data: ReportsCentreQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onDeleteReportTemplate: (id: string) => void;
  toggleCreateOpen: () => void;
  toggleEditOpen: (id: string | null) => void;
  editOpen: string | null;
  createOpen: boolean;
}

const ReportsCentre = ({
  loading,
  data,
  search,
  setSearch,
  onDeleteReportTemplate,
  toggleEditOpen,
  toggleCreateOpen,
  editOpen,
  createOpen,
}: Props) => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className={classes.page}>
      <Card bodyStyle={{ padding: '10px 20px' }}>
        <Row align="middle">
          <Col>
            <Typography.Title level={3} className={classes.pageTitle}>
              <FormattedMessage defaultMessage="Reports Centre" id="6MXa5r" />
            </Typography.Title>
          </Col>
          <Col flex={1}>
            <Row justify="center">
              <Col>
                <Input
                  className={classes.search}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Search reports',
                    id: '56tlGn',
                  })}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Button type={'primary'} onClick={toggleCreateOpen}>
              <FormattedMessage
                defaultMessage="Create New Report"
                id="Y92GJc"
              />
            </Button>
          </Col>
        </Row>
      </Card>
      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Summary Reports" id="Mk3lXF" />
      </Typography.Title>
      {loading && <LoadingRow />}
      {!loading && (
        <Row gutter={16}>
          {data?.reportsCentre.summaryReports.map((item) => (
            <ReportCard
              key={item.id}
              item={item}
              onDeleteReportTemplate={onDeleteReportTemplate}
              toggleEditOpen={toggleEditOpen}
            />
          ))}
        </Row>
      )}

      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Offender Reports" id="u9fC2r" />
      </Typography.Title>
      {loading && <LoadingRow />}
      {!loading && (
        <Row gutter={16}>
          {data?.reportsCentre.offenderReports.map((item) => (
            <ReportCard
              key={item.id}
              item={item}
              onDeleteReportTemplate={onDeleteReportTemplate}
              toggleEditOpen={toggleEditOpen}
            />
          ))}
        </Row>
      )}

      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Business Reports" id="Mx+X4o" />
      </Typography.Title>
      {loading && <LoadingRow />}
      {!loading && (
        <Row gutter={16}>
          {data?.reportsCentre.businessReports.map((item) => (
            <ReportCard
              key={item.id}
              item={item}
              onDeleteReportTemplate={onDeleteReportTemplate}
              toggleEditOpen={toggleEditOpen}
            />
          ))}
        </Row>
      )}

      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Crime Group Reports" id="MSLXPl" />
      </Typography.Title>
      {loading && <LoadingRow />}
      {!loading && (
        <Row gutter={16}>
          {data?.reportsCentre.crimeGroupReports.map((item) => (
            <ReportCard
              key={item.id}
              item={item}
              onDeleteReportTemplate={onDeleteReportTemplate}
              toggleEditOpen={toggleEditOpen}
            />
          ))}
        </Row>
      )}

      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Engagement Reports" id="7DwulR" />
      </Typography.Title>
      <Row gutter={16}>
        <Col>
          <Link to="/app/reports/user-engagement">
            <Card
              className={classes.reportCard}
              bodyStyle={{ padding: '15px 20px' }}
            >
              <Typography.Text className={classes.reportTitle} strong>
                <FormattedMessage
                  defaultMessage="User Engagement Table"
                  id="KvzmVk"
                />
              </Typography.Text>
              <Typography.Paragraph
                type="secondary"
                className={classes.reportText}
              >
                <FormattedMessage
                  defaultMessage="Summary of all data added into the system."
                  id="ZpapCJ"
                />
              </Typography.Paragraph>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/app/reports/business-engagement">
            <Card
              className={classes.reportCard}
              bodyStyle={{ padding: '15px 20px' }}
            >
              <Typography.Text className={classes.reportTitle} strong>
                <FormattedMessage
                  defaultMessage="Business Engagement Table"
                  id="qxxIJW"
                />
              </Typography.Text>
              <Typography.Paragraph
                type="secondary"
                className={classes.reportText}
              >
                <FormattedMessage
                  defaultMessage="Analysis and breakdown of incident data over time."
                  id="FQ0QHC"
                />
              </Typography.Paragraph>
            </Card>
          </Link>
        </Col>
      </Row>

      <Typography.Title level={4}>
        <FormattedMessage defaultMessage="Mapping Reports" id="1Uo6oc" />
      </Typography.Title>
      <Link to="/app/reports/incident-map">
        <Card
          className={classes.reportCard}
          bodyStyle={{ padding: '15px 20px' }}
        >
          <Typography.Text className={classes.reportTitle} strong>
            <FormattedMessage defaultMessage="Incident Map" id="8vWvqg" />
          </Typography.Text>
          <Typography.Paragraph type="secondary" className={classes.reportText}>
            <FormattedMessage
              defaultMessage="Plotting of incident data on a map."
              id="N+vDG+"
            />
          </Typography.Paragraph>
        </Card>
      </Link>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Create Report',
          id: 'xUcQWH',
        })}
        open={createOpen}
        width={500}
        onClose={toggleCreateOpen}
      >
        {createOpen && <CreateReport onClose={toggleCreateOpen} />}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Report',
          id: 'wOa42g',
        })}
        open={!!editOpen}
        onClose={() => toggleEditOpen(null)}
      >
        {editOpen && (
          <EditReport
            onClose={() => toggleEditOpen(null)}
            reportId={editOpen}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ReportsCentre;
