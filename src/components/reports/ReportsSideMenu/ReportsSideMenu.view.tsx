import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Tooltip, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useStoreState } from '#/state';
import { useReportsCentreQuery } from '#/graphql/generated';
import Sider from 'antd/lib/layout/Sider';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import useStyles from './ReportsSideMenu.style';

interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const ReportsSideMenu = ({ collapsed, setCollapsed }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  const currentSchemeId = useStoreState((state) => state.scheme.id);

  const { data } = useReportsCentreQuery({
    variables: {
      where: {
        scheme: {
          id: currentSchemeId,
        },
      },
    },
  });

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Button
        type="default"
        icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        shape="circle"
        size="small"
        style={{
          position: 'absolute',
          top: 400,
          left: collapsed ? -18 : undefined,
          right: collapsed ? undefined : -18,
          fontSize: '16px',
          zIndex: 99_999,
        }}
      />
      {collapsed ? (
        <div style={{ width: 20 }} />
      ) : (
        <div className={classes.container}>
          <Typography.Paragraph className={classes.menuTitle}>
            <FormattedMessage id="6MXa5r" defaultMessage="Reports Centre" />
          </Typography.Paragraph>

          <div className={classes.subMenu}>
            <Typography.Paragraph className={classes.menuSubTitle}>
              <FormattedMessage id="Mk3lXF" defaultMessage="Summary Reports" />
            </Typography.Paragraph>
            {data?.reportsCentre.summaryReports.map((item) => (
              <Link key={item.id} to={`/app/reports/summary-report/${item.id}`}>
                <Tooltip title={item.description}>
                  <div className={classes.item}>
                    <Typography.Text className={classes.text}>
                      {item.name}
                    </Typography.Text>
                  </div>
                </Tooltip>
              </Link>
            ))}
          </div>

          <div className={classes.subMenu}>
            <Typography.Paragraph className={classes.menuSubTitle}>
              <FormattedMessage id="u9fC2r" defaultMessage="Offender Reports" />
            </Typography.Paragraph>
            {data?.reportsCentre.offenderReports.map((item) => (
              <Link
                key={item.id}
                to={`/app/reports/offender-profile/${item.id}`}
              >
                <Tooltip title={item.description}>
                  <div className={classes.item}>
                    <Typography.Text className={classes.text}>
                      {item.name}
                    </Typography.Text>
                  </div>
                </Tooltip>
              </Link>
            ))}
          </div>

          <div className={classes.subMenu}>
            <Typography.Paragraph className={classes.menuSubTitle}>
              <FormattedMessage id="Mx+X4o" defaultMessage="Business Reports" />
            </Typography.Paragraph>
            {data?.reportsCentre.businessReports.map((item) => (
              <Link key={item.id} to={`/app/reports/business/${item.id}`}>
                <Tooltip title={item.description}>
                  <div className={classes.item}>
                    <Typography.Text className={classes.text}>
                      {item.name}
                    </Typography.Text>
                  </div>
                </Tooltip>
              </Link>
            ))}
          </div>

          <div className={classes.subMenu}>
            <Typography.Paragraph className={classes.menuSubTitle}>
              <FormattedMessage
                id="MSLXPl"
                defaultMessage="Crime Group Reports"
              />
            </Typography.Paragraph>
            {data?.reportsCentre.crimeGroupReports.map((item) => (
              <Link key={item.id} to={`/app/reports/crime-groups/${item.id}`}>
                <Tooltip title={item.description}>
                  <div className={classes.item}>
                    <Typography.Text className={classes.text}>
                      {item.name}
                    </Typography.Text>
                  </div>
                </Tooltip>
              </Link>
            ))}
          </div>

          <div className={classes.subMenu}>
            <Typography.Paragraph className={classes.menuSubTitle}>
              <FormattedMessage
                id="7DwulR"
                defaultMessage="Engagement Reports"
              />
            </Typography.Paragraph>
            <Link to="/app/reports/business-engagement">
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage:
                    'Table showing engagement of businesses with the alert platform.',
                  id: 'VpEQsA',
                })}
              >
                <div className={classes.item}>
                  <Typography.Text className={classes.text}>
                    <FormattedMessage
                      defaultMessage="Business Engagement"
                      id="8reQAO"
                    />
                  </Typography.Text>
                </div>
              </Tooltip>
            </Link>
            <Link to={'/app/reports/user-engagement'}>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage:
                    'Table showing engagement of users with the alert platform.',
                  id: 'wqY0X0',
                })}
              >
                <div className={classes.item}>
                  <Typography.Text className={classes.text}>
                    <FormattedMessage
                      defaultMessage="User Engagement"
                      id="cRXL0+"
                    />
                  </Typography.Text>
                </div>
              </Tooltip>
            </Link>
          </div>

          <div className={classes.subMenu}>
            <Typography.Paragraph className={classes.menuSubTitle}>
              <FormattedMessage id="1Uo6oc" defaultMessage="Mapping Reports" />
            </Typography.Paragraph>
            <Link to={'/app/reports/incident-map'}>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Plotting of incident data on a map.',
                  id: 'N+vDG+',
                })}
              >
                <div className={classes.item}>
                  <Typography.Text className={classes.text}>
                    <FormattedMessage
                      defaultMessage="Incident Map"
                      id="8vWvqg"
                    />
                  </Typography.Text>
                </div>
              </Tooltip>
            </Link>
          </div>
        </div>
      )}
    </Sider>
  );
};

export default ReportsSideMenu;
