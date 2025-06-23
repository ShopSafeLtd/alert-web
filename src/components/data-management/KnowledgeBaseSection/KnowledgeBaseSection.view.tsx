import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, Space, Typography } from 'antd';
import React from 'react';

import useStyles from './KnowledgeBaseSection.styles';

interface KnowledgeBaseSectionProps {
  proTip?: {
    content: React.ReactNode;
    title: React.ReactNode;
  };
  sections: Array<{
    content: React.ReactNode;
    title: React.ReactNode;
  }>;
  subtitle: React.ReactNode;
  title: React.ReactNode;
}

const KnowledgeBaseSection: React.FC<KnowledgeBaseSectionProps> = ({
  proTip,
  sections,
  subtitle,
  title,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Space className={classes.content} direction="vertical" size={20}>
        <div>
          <Space align="center" className={classes.header}>
            <FontAwesomeIcon
              className={classes.headerIcon}
              icon={faInfoCircle}
            />
            <Typography.Title className={classes.title} level={4}>
              {title}
            </Typography.Title>
          </Space>
          <Typography.Paragraph className={classes.subtitle} type="secondary">
            {subtitle}
          </Typography.Paragraph>
        </div>

        <Divider className={classes.divider} />

        {sections.map((section, index) => (
          <div key={index}>
            <Typography.Title className={classes.sectionTitle} level={5}>
              {section.title}
            </Typography.Title>
            <div className={classes.listItem}>{section.content}</div>
          </div>
        ))}

        {proTip && (
          <div className={classes.proTip}>
            <Typography.Text className={classes.proTipTitle} strong>
              {proTip.title}
            </Typography.Text>
            <br />
            <Typography.Text className={classes.proTipText}>
              {proTip.content}
            </Typography.Text>
          </div>
        )}
      </Space>
    </div>
  );
};

export default KnowledgeBaseSection;
