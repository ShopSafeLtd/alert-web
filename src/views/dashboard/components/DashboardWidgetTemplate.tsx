import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Skeleton } from 'antd';
import React from 'react';

interface Props {
  removeItem: () => void;
  title: string;
}

const DashboardWidgetTemplate: React.FC<Props> = ({ removeItem, title }) => (
  <Card style={{ height: '100%', position: 'relative' }} title={title}>
    <Button
      icon={<FontAwesomeIcon icon={faTrash} />}
      onClick={removeItem}
      style={{ position: 'absolute', right: 10, top: 10, zIndex: 10 }}
    />
    <Skeleton active />
  </Card>
);

export default DashboardWidgetTemplate;
