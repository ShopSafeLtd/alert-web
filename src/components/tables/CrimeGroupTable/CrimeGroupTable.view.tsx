import React from 'react';
import { Button, Col, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
import { createUseStyles } from 'react-jss';
// import type { ColumnsType } from 'antd/es/table/interface';
import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faPenToSquare,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import type { CrimeGroupCardData } from 'types/DataType';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  row: {
    // cursor: 'pointer'
  },
});
interface Props {
  crimeGroups: CrimeGroupCardData[] | undefined;
  hasNavigation?: boolean;
  saving?: boolean;
  onDelete?: (id: string) => void;
  setEditData?: (value: CrimeGroupCardData | null) => void;
  deleteRights?: boolean;
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
  hasNavigation,
  onDelete,
  setEditData,
  saving,
  deleteRights,
}: Props): JSX.Element => {
  const classes = useStyles();

  const intl = useIntl();

  return (
    // <Table<CrimeGroupsTable>
    <Table
      size="small"
      rowClassName={classes.row}
      columns={[
        {
          key: 'reference',
          dataIndex: 'reference',
          title: <FormattedMessage defaultMessage="Alert ID" />,
          width: 100,
          render: (
            _,
            record: { key: string; reference: number | null | undefined }
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
        },
        {
          key: 'alias',
          dataIndex: 'alias',
          title: <FormattedMessage defaultMessage="Alias" />,
        },
        {
          key: 'totalOffenders',
          dataIndex: 'totalOffenders',
          title: <FormattedMessage defaultMessage="Members" />,
        },
        {
          key: 'totalIncidents',
          dataIndex: 'totalIncidents',
          title: <FormattedMessage defaultMessage="Incidents" />,
        },
        {
          key: 'totalValue',
          dataIndex: 'totalValue',
          title: <FormattedMessage defaultMessage="Total Value" />,
          render: (value: number) => `£${value.toLocaleString() || 0}`,
        },
        {
          key: 'Options',
          title: '',
          dataIndex: 'Options',
          width: 100,
          render: (
            _,
            record: {
              crimeGroup: CrimeGroupCardData | null;
              key: string;
            }
          ) => (
            <Row gutter={8}>
              {hasNavigation && (
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'View Crime Group',
                    })}
                  >
                    <Link to={`/app/crime-groups/view/${record.key}`}>
                      <Button
                        size="small"
                        disabled={saving}
                        icon={<FontAwesomeIcon icon={faEye} />}
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
                      size="small"
                      disabled={saving}
                      onClick={() => {
                        setEditData(record.crimeGroup);
                      }}
                      icon={<FontAwesomeIcon icon={faPenToSquare} />}
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
                      placement="topLeft"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the crimeGroup?',
                      })}
                      onConfirm={() => {
                        onDelete(record.key);
                      }}
                      okText={intl.formatMessage({
                        defaultMessage: 'Yes',
                      })}
                      cancelText={intl.formatMessage({
                        defaultMessage: 'No',
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
      ].filter((item) => item?.key !== 'Options' || deleteRights)}
      dataSource={
        crimeGroups?.map((crimeGroup) => ({
          key: crimeGroup.id,
          reference: crimeGroup.reference,
          alias: crimeGroup.alias,
          totalOffenders: crimeGroup.totalOffenders || 0,
          totalIncidents: crimeGroup.totalIncidents || 0,
          totalValue: crimeGroup.totalValue || 0,
          saving,
          onDelete,
          crimeGroup,
          // totalRecoveredValue:
          //   crimeGroup.totalRecoveredValue,
          // totalTheftSuccess: crimeGroup.totalTheftSuccess,
        })) || []
      }
      pagination={{
        hideOnSinglePage: true,
        pageSize: 5,
      }}
    />
  );
};
export default CrimeGroupTable;
