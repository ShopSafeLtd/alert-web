import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Skeleton } from 'antd';
import React from 'react';

interface Props {
  removeItem: () => void;
  title: string;
}

const DashboardWidgetTemplate: React.FC<Props> = ({ removeItem, title }) => (
  <Card
    extra={
      <Button
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={removeItem}
        size="small"
      />
    }
    style={{ height: '100%' }}
    title={title}
  >
    <Skeleton active />
  </Card>
);

export default DashboardWidgetTemplate;
