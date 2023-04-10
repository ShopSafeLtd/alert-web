import React from 'react';
import { Card, Table } from 'antd';
import type { CrimeGroupData } from 'types/DataType';

// const { Title } = Typography;

interface Props {
  crimeGroups: CrimeGroupData[];
  isIntel?: boolean;
}

const CrimeGroupList = ({ crimeGroups, isIntel }: Props) => (
  <Card
    // style={{ margin: 5, minHeight: 50 }}
    style={{ margin: 5, minHeight: 50, width: 370 }}
    size="small"
    className="message-card"
  >
    <Table
      dataSource={crimeGroups.map((crimeGroup) => ({
        key: crimeGroup.id || '',
        reference: crimeGroup.reference,
        totalOffenders: crimeGroup.totalOffenders,
        alias: crimeGroup.alias,
      }))}
      // title={() => (
      //   <Title
      //     style={{
      //       marginBottom: -5,
      //       fontSize: 14,
      //     }}
      //   >
      //     Crime Groups
      //   </Title>
      // )}
      style={{
        margin: isIntel ? '-8px 0 -11px' : '0 5px',
      }}
      pagination={false}
      size="small"
      columns={[
        {
          key: 'reference',
          dataIndex: 'reference',
          title: 'Alert ID',
        },
        {
          key: 'alias',
          dataIndex: 'alias',
          title: 'Alias',
        },

        {
          key: 'totalOffenders',
          dataIndex: 'totalOffenders',
          title: 'Members',
        },
      ]}
    />
  </Card>
);

export default CrimeGroupList;
