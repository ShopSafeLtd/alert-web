import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useReportsCentreQuery } from '#/views/reports/reports-centre/__generated__/reports-centre.generated';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { ReportType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from './ReportsSideMenu.style';

const getRoute = (item: { type: ReportType }) => {
  if (item.type === ReportType.CrimeGroup) return 'crime-groups';
  if (item.type === ReportType.Offender) return 'offender-profile';
  if (item.type === ReportType.OffenderTable) return 'offender-table';
  if (item.type === ReportType.Business) return 'business';
  if (item.type === ReportType.BusinessEngagementTable)
    return 'business-engagement';
  if (item.type === ReportType.UserEngagementTable) return 'user-engagement';
  if (item.type === ReportType.IncidentMap) return 'incident-map';
  if (item.type === ReportType.IncidentItemsTable) return 'incident-items';
  return 'summary-report';
};

interface Props {
  collapsed: boolean;
  selectedId: string;
  setCollapsed: (value: boolean) => void;
}

const ReportsSideMenu = ({ collapsed, selectedId, setCollapsed }: Props) => {
  const classes = useStyles();

  const currentSchemeId = useAtomValue(currentSchemeIdAtom);

  const { data } = useReportsCentreQuery({
    variables: {
      where: {
        schemeId: currentSchemeId,
      },
    },
  });

  return (
    <Sider collapsed={collapsed} collapsible trigger={null}>
      <Button
        icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        shape="circle"
        size="small"
        style={{
          fontSize: '16px',
          left: collapsed ? -18 : undefined,
          position: 'absolute',
          right: collapsed ? undefined : -18,
          top: 400,
          zIndex: 999,
        }}
        type="default"
      />
      {collapsed ? (
        <div style={{ width: 20 }} />
      ) : (
        <div className={classes.container}>
          <Typography.Paragraph className={classes.menuTitle}>
            <FormattedMessage defaultMessage="Reports Centre" />
          </Typography.Paragraph>

          {data?.reportsCentre.map((reportGroup) => (
            <div className={classes.subMenu} key={reportGroup.id}>
              <Typography.Paragraph className={classes.menuSubTitle}>
                {reportGroup.name}
              </Typography.Paragraph>
              {reportGroup.reports.map((item) => (
                <Link
                  key={item.id}
                  to={`/app/reports/${getRoute(item)}/${item.id}`}
                >
                  <Tooltip title={item.description}>
                    <div
                      className={
                        selectedId === item.id
                          ? classes.selectedItem
                          : classes.item
                      }
                    >
                      <Typography.Text className={classes.text}>
                        {item.name}
                      </Typography.Text>
                    </div>
                  </Tooltip>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </Sider>
  );
};

export default ReportsSideMenu;
