import type { CrimeGroupCardData } from 'types/DataType';

import {
  faEye,
  faPenToSquare,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
import React from 'react';
// import type { ColumnsType } from 'antd/es/table/interface';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  row: {
    // cursor: 'pointer'
  },
});
interface Props {
  crimeGroups: CrimeGroupCardData[] | undefined;
  deleteRights?: boolean;
  hasNavigation?: boolean;
  onDelete?: (id: string) => void;
  saving?: boolean;
  setEditData?: (value: CrimeGroupCardData | null) => void;
}

// interface CrimeGroupsTable {
//   key: string;
//   reference?: number | null;
//   alias?: string | null;
//   totalOffenders?: number | null;
//   totalIncidents?: number | null;
//   totalValue?: number | null;
//   saving?: boolean;
//   onDelete?: (id: string) => void;
// }

// const columns: ColumnsType<CrimeGroupsTable> = [
//   {
//     key: 'reference',
//     dataIndex: 'reference',
//     title: <FormattedMessage id="k8ZNgH" defaultMessage="Alert ID" />,
//     width: 100,
//   },
//   {
//     key: 'alias',
//     dataIndex: 'alias',
//     title: <FormattedMessage id="Ri9jA7" defaultMessage="Alias" />,
//   },
//   {
//     key: 'totalOffenders',
//     dataIndex: 'totalOffenders',
//     title: <FormattedMessage id="xb54TN" defaultMessage="Offenders" />,
//   },
//   {
//     key: 'totalIncidents',
//     dataIndex: 'totalIncidents',
//     title: <FormattedMessage id="mtr3R4" defaultMessage="Incidents" />,
//   },
//   {
//     key: 'totalValue',
//     dataIndex: 'totalValue',
//     title: <FormattedMessage id="MoJx/h" defaultMessage="Total Value" />,
//     render: (value: number) => `£${value.toLocaleString() || 0}`,
//   },
//   {
//     key: 'options',
//     dataIndex: 'options',
//     title: <FormattedMessage id="NDV5Mq" defaultMessage="Options" />,
//     render: (key: string) => (
//       <Row gutter={8}>
//         <Col>
//           <Tooltip
//             title={
//               <FormattedMessage
//                 id="6HwEZt"
//                 defaultMessage="Remove Crime Group"
//               />
//             }
//           >
//             <Popconfirm
//               placement="topLeft"
//               trigger="hover"
//               title={
//                 <FormattedMessage
//                   id="Ek+T43"
//                   defaultMessage="Remove the crime group?"
//                 />
//               }
//               onConfirm={() => onDelete(key)}
//               okText={<FormattedMessage id="a5msuh" defaultMessage="Yes" />}
//               cancelText={<FormattedMessage id="oUWADl" defaultMessage="No" />}
//               overlayInnerStyle={{
//                 padding: 10,
//               }}
//             >
//               <Button
//                 size="small"
//                 disabled={saving}
//                 icon={<FontAwesomeIcon icon={faTrash} />}
//               />
//             </Popconfirm>
//           </Tooltip>
//         </Col>
//       </Row>
//     ),
//   },
// ];

const CrimeGroupTable = ({
  crimeGroups,
  deleteRights,
  hasNavigation,
  onDelete,
  saving,
  setEditData,
}: Props): JSX.Element => {
  const classes = useStyles();

  const intl = useIntl();

  return (
    // <Table<CrimeGroupsTable>
    <Table
      columns={[
        {
          dataIndex: 'reference',
          key: 'reference',
          render: (
            _,
            record: { key: string; reference: null | number | undefined }
          ) => {
            if (hasNavigation) {
              return (
                <Link to={`/app/crime-groups/view/${record.key}`}>
                  {record.reference}
                </Link>
              );
            }
            return <Typography.Text>{record.reference}</Typography.Text>;
          },
          title: <FormattedMessage defaultMessage="Alert ID" />,
          width: 100,
        },
        {
          dataIndex: 'alias',
          key: 'alias',
          title: <FormattedMessage defaultMessage="Alias" />,
        },
        {
          dataIndex: 'totalOffenders',
          key: 'totalOffenders',
          title: <FormattedMessage defaultMessage="Members" />,
        },
        {
          dataIndex: 'totalIncidents',
          key: 'totalIncidents',
          title: <FormattedMessage defaultMessage="Incidents" />,
        },
        {
          dataIndex: 'totalValue',
          key: 'totalValue',
          render: (value: number) =>
            intl.formatNumber(value || 0, {
              currency: 'GBP',
              style: 'currency',
            }),
          title: <FormattedMessage defaultMessage="Total Value" />,
        },
        {
          dataIndex: 'Options',
          key: 'Options',
          render: (
            _,
            record: {
              crimeGroup: CrimeGroupCardData | null;
              key: string;
            }
          ) => (
            <Row className="no-print" gutter={8}>
              {hasNavigation && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'View Crime Group',
                    })}
                  >
                    <Link to={`/app/crime-groups/view/${record.key}`}>
                      <Button
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faEye} />}
                        size="small"
                      />
                    </Link>
                  </Tooltip>
                </Col>
              )}
              {deleteRights && setEditData && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Crime Group',
                    })}
                  >
                    <Button
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      onClick={() => {
                        setEditData(record.crimeGroup);
                      }}
                      size="small"
                    />
                  </Tooltip>
                </Col>
              )}
              {deleteRights && onDelete && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Remove Crime Group',
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
                        onDelete(record.key);
                      }}
                      overlayInnerStyle={{ padding: 10 }}
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the crimeGroup?',
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
      ].filter((item) => item?.key !== 'Options' || deleteRights)}
      dataSource={
        crimeGroups?.map((crimeGroup) => ({
          alias: crimeGroup.alias,
          crimeGroup,
          key: crimeGroup.id,
          onDelete,
          reference: crimeGroup.reference,
          saving,
          totalIncidents: crimeGroup.totalIncidents || 0,
          totalOffenders: crimeGroup.totalOffenders || 0,
          totalValue: crimeGroup.totalValue || 0,
          // totalRecoveredValue:
          //   crimeGroup.totalRecoveredValue,
          // totalTheftSuccess: crimeGroup.totalTheftSuccess,
        })) || []
      }
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
      rowClassName={classes.row}
      size="small"
    />
  );
};
export default CrimeGroupTable;
