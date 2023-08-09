import React from 'react';
import { Button, Col, Popconfirm, Row, Table, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import { createUseStyles } from 'react-jss';
// import type { ColumnsType } from 'antd/es/table/interface';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';

const useStyles = createUseStyles({
  row: { cursor: 'pointer' },
});
interface Props {
  crimeGroups:
    | {
        id: string;
        reference?: number | null;
        alias?: string | null;
        totalOffenders?: number | null;
        totalIncidents?: number | null;
        totalValue?: number | null;
      }[];
  hasNavigation?: boolean;
  saving?: boolean;
  onDelete?: (id: string) => void;
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
  saving,
}: Props): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    // <Table<CrimeGroupsTable>
    <Table
      size="small"
      rowClassName={classes.row}
      onRow={(record) =>
        hasNavigation
          ? {
              onClick: () => navigate(`/app/crime-groups/view/${record.key}`),
            }
          : {}
      }
      columns={[
        {
          key: 'reference',
          dataIndex: 'reference',
          title: <FormattedMessage id="k8ZNgH" defaultMessage="Alert ID" />,
          width: 100,
        },
        {
          key: 'alias',
          dataIndex: 'alias',
          title: <FormattedMessage id="Ri9jA7" defaultMessage="Alias" />,
        },
        {
          key: 'totalOffenders',
          dataIndex: 'totalOffenders',
          title: <FormattedMessage id="xb54TN" defaultMessage="Offenders" />,
        },
        {
          key: 'totalIncidents',
          dataIndex: 'totalIncidents',
          title: <FormattedMessage id="mtr3R4" defaultMessage="Incidents" />,
        },
        {
          key: 'totalValue',
          dataIndex: 'totalValue',
          title: <FormattedMessage id="MoJx/h" defaultMessage="Total Value" />,
          render: (value: number) => `£${value.toLocaleString() || 0}`,
        },
        {
          key: 'options',
          dataIndex: 'options',
          title: <FormattedMessage id="NDV5Mq" defaultMessage="Options" />,
          render: (_, record) => (
            <Row gutter={8}>
              <Col>
                <Tooltip
                  title={
                    <FormattedMessage
                      id="6HwEZt"
                      defaultMessage="Remove Crime Group"
                    />
                  }
                >
                  <Popconfirm
                    placement="topLeft"
                    trigger="hover"
                    title={
                      <FormattedMessage
                        id="Ek+T43"
                        defaultMessage="Remove the crime group?"
                      />
                    }
                    onConfirm={() => {
                      if (onDelete) onDelete(record.key);
                    }}
                    okText={
                      <FormattedMessage id="a5msuh" defaultMessage="Yes" />
                    }
                    cancelText={
                      <FormattedMessage id="oUWADl" defaultMessage="No" />
                    }
                    overlayInnerStyle={{
                      padding: 10,
                    }}
                  >
                    <Button
                      size="small"
                      disabled={saving}
                      icon={<FontAwesomeIcon icon={faTrash} />}
                    />
                  </Popconfirm>
                </Tooltip>
              </Col>
            </Row>
          ),
        },
      ]}
      dataSource={crimeGroups?.map((crimeGroup) => ({
        key: crimeGroup.id,
        reference: crimeGroup.reference,
        alias: crimeGroup.alias,
        totalOffenders: crimeGroup.totalOffenders || 0,
        totalIncidents: crimeGroup.totalIncidents || 0,
        totalValue: crimeGroup.totalValue || 0,
        saving,
        onDelete,
        // totalRecoveredValue:
        //   crimeGroup.totalRecoveredValue,
        // totalTheftSuccess: crimeGroup.totalTheftSuccess,
      }))}
      pagination={
        crimeGroups && crimeGroups.length > 5
          ? {
              pageSize: 5,
            }
          : false
      }
    />
  );
};
export default CrimeGroupTable;
