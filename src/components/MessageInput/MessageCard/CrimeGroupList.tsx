import type { CrimeGroupData } from 'types/DataType';

import { Card, Table } from 'antd';
import React from 'react';

// const { Title } = Typography;

interface Props {
  crimeGroups: CrimeGroupData[];
  isIntel?: boolean;
}

const CrimeGroupList = ({ crimeGroups, isIntel }: Props) => (
  <Card
    className="message-card"
    size="small"
    // style={{ margin: 5, minHeight: 50 }}
    style={{ margin: 5, minHeight: 50, width: 370 }}
  >
    <Table
      columns={[
        {
          dataIndex: 'reference',
          key: 'reference',
          title: 'Alert ID',
        },
        {
          dataIndex: 'alias',
          key: 'alias',
          title: 'Alias',
        },

        {
          dataIndex: 'totalOffenders',
          key: 'totalOffenders',
          title: 'Members',
        },
      ]}
      // title={() => (
      //   <Title
      //     style={{
      //       marginBottom: -5,
      //       fontSize: 14,
      //     }}
      //   >
      //     Crime Groups
      //   </Title>
      dataSource={crimeGroups.map((crimeGroup) => ({
        alias: crimeGroup.alias,
        key: crimeGroup.id || '',
        reference: crimeGroup.reference,
        totalOffenders: crimeGroup.totalOffenders,
      }))}
      pagination={false}
      size="small"
      // )}
      style={{
        margin: isIntel ? '-8px 0 -11px' : '0 5px',
      }}
    />
  </Card>
);

export default CrimeGroupList;
