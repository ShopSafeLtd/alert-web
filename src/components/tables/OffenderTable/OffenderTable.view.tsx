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
        images: {
          id: string;
          optimised: string;
          position: ImagePosition;
        }[];
      }[];
  hasNavigation: boolean;
}

const OffenderTable = ({ offenders, hasNavigation }: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
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
          render: (item) => {
            console.log(item);
            return (
              <div style={{ height: 100, width: 80 }}>
                <WatermarkImage
                  url={item[0]?.optimised}
                  position={item[0]?.position}
                />
              </div>
            );
          },
        },
        {
          key: 'reference',
          dataIndex: 'reference',
          title: 'Alert ID',
          width: 100,
        },

        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
        },
        {
          title: 'Ethnicity',
          dataIndex: 'ethnicity',
          key: 'ethnicity',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Build',
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
