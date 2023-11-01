/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { Button, Col, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import type { OffenderData } from 'types/DataType';
import { useStoreState } from 'state';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  row: { cursor: 'pointer' },
});
interface Offender {
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
        position?: ImagePosition;
        rotation?: number;
      }[]
    | null
    | undefined;
}
interface Props {
  offenders: Offender[];
  hasNavigation?: boolean;
  saving?: boolean;
  setEditOffenderData?: (value: OffenderData | null) => void;
  onDeleteOffender?: (id: string) => void;
  editRights?: boolean;
  deleteRights?: boolean;
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
  offenders,
  hasNavigation,
  saving,
  setEditOffenderData,
  onDeleteOffender,
  editRights,
  deleteRights,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    editRights;

  return (
    <Table
      size="small"
      rowClassName={classes.row}
      // onRow={(record) =>
      //   hasNavigation
      //     ? {
      //         onClick: () => navigate(`/app/offenders/view/${record.key}`),
      //       }
      //     : {}
      // }
      columns={[
        {
          key: 'images',
          dataIndex: 'images',
          title: '',
          render: (
            item: {
              position: ImagePosition | undefined;
              rotation: number | undefined;
              optimised?: string | null | undefined;
            }[]
          ) => (
            <div style={{ height: 100, width: 80 }}>
              <WatermarkImage
                url={item[0]?.optimised}
                rotation={item[0]?.rotation}
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
          width: 80,
          render: (
            _,
            record: { key: string; reference: number | null | undefined }
          ) => {
            if (hasNavigation) {
              return (
                <Link to={`/app/offenders/view/${record.key}`}>
                  <Typography.Text type="warning">
                    {record.reference}
                  </Typography.Text>
                </Link>
              );
            }
            return <Typography.Text>{record.reference}</Typography.Text>;
          },
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
        {
          key: 'Options',
          title: '',
          dataIndex: 'Options',
          width: 100,
          render: (
            _,
            record: { offender: OffenderData | null; key: string }
          ) => (
            <Row gutter={8}>
              {editRights && setEditOffenderData && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Offender',
                      id: '+OfJ4/',
                    })}
                  >
                    <Button
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        console.log('Edit');

                        if (record?.offender)
                          setEditOffenderData(record?.offender);
                      }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                  </Tooltip>
                </Col>
              )}
              {deleteRights && onDeleteOffender && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove Offender',
                      id: 'cZH2Kj',
                    })}
                  >
                    <Popconfirm
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the offender?',
                        id: 'ttuPSC',
                      })}
                      onConfirm={() => {
                        onDeleteOffender(record.key);
                      }}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                        id: 'a5msuh',
                      })}
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
                        id: 'oUWADl',
                      })}
                      overlayInnerStyle={{ padding: 10 }}
                    >
                      <Button
                        size="small"
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faTrash} />}
                      />
                    </Popconfirm>
                  </Tooltip>
                </Col>
              )}
            </Row>
          ),
        },
      ].filter((item) => item?.key !== 'Options' || deleteRights || editRights)}
      dataSource={
        offenders?.map((offender) => ({
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
          age: publicOffenderDOB ? getAgeValue(offender) : '',
          build:
            getOffenderBuild(offender.build) === 'Unknown'
              ? ''
              : getOffenderBuild(offender.build),
          images: offender.images,
          offender,
        })) || []
      }
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
    />
  );
};

export default OffenderTable;
