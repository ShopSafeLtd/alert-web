/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router';
import { createUseStyles } from 'react-jss';
import {
  calcAge,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import type {
  Age,
  Build,
  Gender,
  ImagePosition,
  Race,
} from 'graphql/generated';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';

const useStyles = createUseStyles({
  row: { cursor: 'pointer' },
});

interface Props {
  offenders:
    | {
        id: string;
        reference?: number | null;
        name?: string | null;
        age?: Age | null;
        gender?: Gender | null;
        race?: Race | null;
        build?: Build | null;
        dateOfBirth?: Date | null;
        images?:
          | {
              id: string;
              optimised?: string | null | undefined;
              position: ImagePosition;
            }[]
          | null
          | undefined;
      }[];
  hasNavigation: boolean;
}

const OffenderTable = ({ offenders, hasNavigation }: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <Table
      size="small"
      rowClassName={classes.row}
      onRow={(record) =>
        hasNavigation
          ? {
              onClick: () => navigate(`/app/offenders/view/${record.key}`),
            }
          : {}
      }
      columns={[
        {
          key: 'images',
          dataIndex: 'images',
          title: '',
          render: (item) => (
            <div style={{ height: 100, width: 80 }}>
              <WatermarkImage
                url={item[0]?.optimised}
                position={item[0]?.position}
              />
            </div>
          ),
        },
        {
          key: 'reference',
          dataIndex: 'reference',
          title: intl.formatMessage({
            id: 'k8ZNgH',
            defaultMessage: 'Alert ID',
          }),
          width: 100,
        },

        {
          title: intl.formatMessage({ id: 'HAlOn1', defaultMessage: 'Name' }),
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: intl.formatMessage({ id: 'm8/n8c', defaultMessage: 'Gender' }),
          dataIndex: 'gender',
          key: 'gender',
        },
        {
          title: intl.formatMessage({
            id: 'XtCAFo',
            defaultMessage: 'Ethnicity',
          }),
          dataIndex: 'ethnicity',
          key: 'ethnicity',
        },
        {
          title: intl.formatMessage({ id: '9oNQSC', defaultMessage: 'Age' }),
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: intl.formatMessage({ id: 'RSctv1', defaultMessage: 'Build' }),
          dataIndex: 'build',
          key: 'build',
        },
      ]}
      dataSource={offenders.map((offender) => ({
        key: offender.id,
        reference: offender.reference,
        name: offender.name,
        gender:
          getOffenderGender(offender.gender) === 'Unknown'
            ? ''
            : getOffenderGender(offender.gender),
        ethnicity:
          getOffenderRace(offender.race, true) === 'Unknown'
            ? ''
            : getOffenderRace(offender.race, true),
        age: offender.dateOfBirth
          ? calcAge(offender.dateOfBirth)
          : getOffenderAge(offender.age) === 'Unknown'
          ? ''
          : getOffenderAge(offender.age),
        build:
          getOffenderBuild(offender.build) === 'Unknown'
            ? ''
            : getOffenderBuild(offender.build),
        images: offender.images,
      }))}
      pagination={
        offenders && offenders.length > 5
          ? {
              pageSize: 5,
            }
          : false
      }
    />
  );
};

export default OffenderTable;
