import { Empty, List, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface GoodsItem {
  count: number;
  name: string;
}

interface StolenGoodsListProps {
  data: GoodsItem[] | null | undefined;
  limit?: number;
}

const StolenGoodsList: React.FC<StolenGoodsListProps> = ({
  data,
  limit = 10,
}) => {
  const intl = useIntl();

  const sorted = [...(data ?? [])]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  if (sorted.length === 0) {
    return (
      <Empty
        description={intl.formatMessage({
          defaultMessage: 'No data available',
        })}
      />
    );
  }

  return (
    <List
      dataSource={sorted}
      renderItem={(item, index) => (
        <List.Item style={{ padding: '4px 0' }}>
          <Typography.Text style={{ minWidth: 24 }} type="secondary">
            {intl.formatMessage({ defaultMessage: '{n}.' }, { n: index + 1 })}
          </Typography.Text>
          <Typography.Text style={{ flex: 1, marginLeft: 8 }}>
            {item.name}
          </Typography.Text>
          <Typography.Text strong>{item.count}</Typography.Text>
        </List.Item>
      )}
      size="small"
    />
  );
};

export default StolenGoodsList;
