import { Card, Space, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import useStyles from './ToolCard.styles';

interface ToolCardProps {
  description: React.ReactNode;
  icon: React.ReactNode;
  iconBackground: string;
  iconColor: string;
  title: React.ReactNode;
  to: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  description,
  icon,
  iconBackground,
  iconColor,
  title,
  to,
}) => {
  const classes = useStyles();

  return (
    <Link to={to}>
      <Card bodyStyle={{ padding: '24px' }} className={classes.card} hoverable>
        <Space className={classes.content} direction="vertical" size={16}>
          <div
            className={classes.iconContainer}
            style={{
              background: `linear-gradient(135deg, ${iconBackground}15 0%, ${iconBackground}05 100%)`,
            }}
          >
            {React.cloneElement(icon as React.ReactElement, {
              style: { color: iconColor, fontSize: 24 },
            })}
          </div>
          <div>
            <Typography.Title className={classes.title} level={4}>
              {title}
            </Typography.Title>
            <Typography.Text className={classes.description} type="secondary">
              {description}
            </Typography.Text>
          </div>
        </Space>
      </Card>
    </Link>
  );
};

export default ToolCard;
