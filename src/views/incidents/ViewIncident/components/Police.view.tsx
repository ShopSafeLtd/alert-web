import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';

import useStyles from '#/views/incidents/ViewIncident/ViewIncident.styles';
import { Card, Descriptions, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const { Title } = Typography;

interface Props {
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  usPoliceData?: boolean;
}

const Police = ({ data, loading, usPoliceData }: Props) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card loading={loading}>
      <Title level={4}>
        {intl.formatMessage({
          defaultMessage: 'Police Information',
        })}
      </Title>
      <Descriptions
        className={classes.desc}
        column={1}
        style={{ marginTop: 10 }}
      >
        <Descriptions.Item
          className={classes.detail}
          label={
            <span>
              {intl.formatMessage({
                defaultMessage: 'Police Reported',
              })}
            </span>
          }
        >
          {data?.incident?.policeReported
            ? intl.formatMessage({
                defaultMessage: 'Yes',
              })
            : intl.formatMessage({
                defaultMessage: 'No',
              })}
        </Descriptions.Item>
        <Descriptions.Item
          className={classes.detail}
          label={
            <span>
              {intl.formatMessage({
                defaultMessage: 'Police Attended',
              })}
            </span>
          }
        >
          {data?.incident?.policeInvolved
            ? intl.formatMessage({
                defaultMessage: 'Yes',
              })
            : intl.formatMessage({
                defaultMessage: 'No',
              })}
        </Descriptions.Item>
        <Descriptions.Item
          className={classes.detail}
          label={intl.formatMessage({
            defaultMessage: 'Crime Ref',
          })}
        >
          {data?.incident?.policeRef ||
            intl.formatMessage({
              defaultMessage: 'Not Provided',
            })}
        </Descriptions.Item>
        <Descriptions.Item
          className={classes.detail}
          label={
            <span>
              {intl.formatMessage({
                defaultMessage: 'Officer Collar Number',
              })}
            </span>
          }
        >
          {data?.incident?.policeNo ||
            intl.formatMessage({
              defaultMessage: 'Not Provided',
            })}
        </Descriptions.Item>
        {data?.incident?.policeReported && usPoliceData && (
          <>
            <Descriptions.Item
              className={classes.detail}
              label={intl.formatMessage({
                defaultMessage: 'Police Department',
              })}
            >
              {data?.incident?.policeDepartment ||
                intl.formatMessage({ defaultMessage: 'Not Provided' })}
            </Descriptions.Item>
            <Descriptions.Item
              className={classes.detail}
              label={intl.formatMessage({
                defaultMessage: 'Police Officer Name',
              })}
            >
              {data?.incident?.policeOfficerName ||
                intl.formatMessage({ defaultMessage: 'Not Provided' })}
            </Descriptions.Item>
          </>
        )}
      </Descriptions>
    </Card>
  );
};

export default Police;
