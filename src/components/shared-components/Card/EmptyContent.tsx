import React from 'react';
import { Col, Row, Typography } from 'antd';

interface Props {
  text: string;
}
/**
 *
 * @param props - { text } An explanation of why there is no content (e.g. 'No one has added [xyx] to this [abc] yet')
 * @returns JSX.Element
 */
const EmptyContent: React.FC<Props> = ({ text }: Props) => (
  <Row
    className="empty-content"
    align="middle"
    justify="center"
    gutter={[0, 50]}
  >
    <Col span={24} />
    <Col span={14}>
      <Row align="middle" justify="center">
        <Typography.Title level={4}>
          There&apos;s nothing here!
        </Typography.Title>
        <Typography.Text type="secondary">{text}</Typography.Text>
      </Row>
    </Col>
    <Col span={24} />
  </Row>
);

export default EmptyContent;
