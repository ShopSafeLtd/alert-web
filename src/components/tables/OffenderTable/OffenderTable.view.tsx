/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { Age, Build, Gender, ImagePosition, Race } from 'graphql/types';
import type { OffenderData } from 'types/DataType';

import {
  faEye,
  faPenToSquare,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { useStoreState } from 'state';
import {
  calcAge,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

const useStyles = createUseStyles({
  row: {
    // cursor: 'pointer'
  },
});
interface Offender {
  age?: Age | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  gender?: Gender | null;
  id: string;
  images?:
    | {
        id: string;
        optimised?: null | string | undefined;
        position?: ImagePosition;
        rotation?: number;
      }[]
    | null
    | undefined;
  name?: null | string;
  race?: Race | null;
  reference?: null | number;
}
interface Props {
  deleteRights?: boolean;
  editRights?: boolean;
  hasNavigation?: boolean;
  offenders: Offender[];
  onDeleteOffender?: (id: string) => void;
  saving?: boolean;
  setEditOffenderData?: (value: OffenderData | null) => void;
}
const getAgeValue = (offender: Offender) => {
  if (offender.dateOfBirth) {
    return calcAge(offender.dateOfBirth);
  }
  if (getOffenderAge(offender.age) !== 'Unknown') {
    return getOffenderAge(offender.age);
  }
  return '';
};
const OffenderTable = ({
  deleteRights,
  editRights,
  hasNavigation,
  offenders,
  onDeleteOffender,
  saving,
  setEditOffenderData,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    editRights;

  return (
    <Table
      // }
      columns={[
        {
          dataIndex: 'images',
          key: 'images',
          render: (
            item: {
              optimised?: null | string | undefined;
              position: ImagePosition | undefined;
              rotation: number | undefined;
            }[]
          ) => (
            <div style={{ height: 100, width: 80 }}>
              <WatermarkImage
                position={item[0]?.position}
                rotation={item[0]?.rotation}
                url={item[0]?.optimised}
              />
            </div>
          ),
          title: '',
        },
        {
          dataIndex: 'reference',
          key: 'reference',
          render: (
            _,
            record: { key: string; reference: null | number | undefined }
          ) => {
            if (hasNavigation) {
              return (
                <Link to={`/app/offenders/view/${record.key}`}>
                  {record.reference}
                </Link>
              );
            }
            return <Typography.Text>{record.reference}</Typography.Text>;
          },
          title: intl.formatMessage({
            defaultMessage: 'Alert ID',
          }),
          width: 80,
        },

        {
          dataIndex: 'name',
          key: 'name',
          title: intl.formatMessage({ defaultMessage: 'Name' }),
        },
        {
          dataIndex: 'gender',
          key: 'gender',
          title: intl.formatMessage({ defaultMessage: 'Gender' }),
        },
        {
          dataIndex: 'ethnicity',
          key: 'ethnicity',
          title: intl.formatMessage({
            defaultMessage: 'Ethnicity',
          }),
        },
        {
          dataIndex: 'age',
          key: 'age',
          title: intl.formatMessage({ defaultMessage: 'Age' }),
        },
        {
          dataIndex: 'build',
          key: 'build',
          title: intl.formatMessage({ defaultMessage: 'Build' }),
        },
        {
          dataIndex: 'Options',
          key: 'Options',
          render: (
            _,
            record: { key: string; offender: OffenderData | null }
          ) => (
            <Row className="no-print" gutter={8}>
              {hasNavigation && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'View Offender',
                    })}
                  >
                    <Link to={`/app/offenders/view/${record.key}`}>
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faEye} />}
                        size="small"
                      />
                    </Link>
                  </Tooltip>
                </Col>
              )}
              {editRights && setEditOffenderData && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Offender',
                    })}
                  >
                    <Button
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      onClick={() => {
                        if (record?.offender)
                          setEditOffenderData(record?.offender);
                      }}
                      size="small"
                    />
                  </Tooltip>
                </Col>
              )}
              {deleteRights && onDeleteOffender && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove Offender',
                    })}
                  >
                    <Popconfirm
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                      })}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                      })}
                      onConfirm={() => {
                        onDeleteOffender(record.key);
                      }}
                      overlayInnerStyle={{ padding: 10 }}
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the offender?',
                      })}
                    >
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        size="small"
                      />
                    </Popconfirm>
                  </Tooltip>
                </Col>
              )}
            </Row>
          ),
          title: '',
          width: 100,
        },
      ].filter((item) => item?.key !== 'Options' || deleteRights || editRights)}
      dataSource={
        offenders?.map((offender) => ({
          age: publicOffenderDOB ? getAgeValue(offender) : '',
          build:
            getOffenderBuild(offender.build) === 'Unknown'
              ? ''
              : getOffenderBuild(offender.build),
          ethnicity:
            getOffenderRace(offender.race, true) === 'Unknown'
              ? ''
              : getOffenderRace(offender.race, true),
          gender:
            getOffenderGender(offender.gender) === 'Unknown'
              ? ''
              : getOffenderGender(offender.gender),
          images: offender.images,
          key: offender.id,
          name: offender.name,
          offender,
          reference: offender.reference,
        })) || []
      }
      // onRow={(record) =>
      //   hasNavigation
      //     ? {
      //         onClick: () => navigate(`/app/offenders/view/${record.key}`),
      //       }
      //     : {}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
      rowClassName={classes.row}
      size="small"
    />
  );
};

export default OffenderTable;
