import React from 'react';
import { faCircleXmark } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Popconfirm,
  Row,
  Typography,
} from 'antd';
import { CrimeGroupData } from 'types/DataType';

const { Title } = Typography;

interface Props {
  crimeGroup: CrimeGroupData;
  removeCrimeGroup?: (value: string | undefined) => void;
  saving?: boolean;
}

const CrimeGroupCard = ({ crimeGroup, removeCrimeGroup, saving }: Props) => (
  <Card
    style={{ width: 120, height: 100 }}
    bodyStyle={{
      paddingTop: 5,
      paddingLeft: 2,
      marginBottom: -5,
    }}
    size="small"
    className="message-card"
  >
    <Row gutter={5} wrap={false}>
      {removeCrimeGroup && (
        <Popconfirm
          placement="topLeft"
          trigger="click"
          title="Remove the crime group?"
          onConfirm={() => removeCrimeGroup(crimeGroup.id)}
          okText="Yes"
          cancelText="No"
          overlayInnerStyle={{ padding: 10 }}
        >
          <Button
            size="small"
            disabled={saving}
            className="info-remove-button"
            shape="circle"
            type="text"
            icon={<FontAwesomeIcon icon={faCircleXmark} size="lg" />}
          />
        </Popconfirm>
      )}

      <Col flex={1} style={{ marginTop: 10, marginLeft: 5 }}>
        <Title ellipsis level={4}>
          {crimeGroup.alias}
        </Title>
        {/* <Paragraph
          strong
          ellipsis
          style={{
            fontSize: 16,
          }}
        >
          {crimeGroup.alias || 'unk'}
        </Paragraph> */}
        <Descriptions size="small">
          <Descriptions.Item label=" Alert ID">
            {crimeGroup.reference}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions size="small">
          <Descriptions.Item label="Members">
            {crimeGroup?.totalOffenders || 0}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  </Card>
);

export default CrimeGroupCard;
