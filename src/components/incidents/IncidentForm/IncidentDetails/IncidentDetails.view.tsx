import React from 'react';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';

const { Title, Paragraph } = Typography;

interface Props {
  adminRights: boolean;
  saving: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  toggleAddIncidentTag: () => void;
}

const IncidentDetails = ({
  tags,
  tagsLoading,
  adminRights,
  saving,
  toggleAddIncidentTag,
}: Props): JSX.Element => (
  <>
    <Row align="bottom" style={{ marginBottom: 20 }}>
      <Col>
        <Title style={{ marginBottom: 0 }} level={4}>
          1.
        </Title>
      </Col>
      <Col>
        <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
          Incident Details
        </Title>
      </Col>
      <Col>
        <Paragraph
          style={{ marginBottom: 1, marginLeft: 5 }}
          type="secondary"
          italic
        >
          - Please complete the basic details for the incident.
        </Paragraph>
      </Col>
    </Row>

    <Row gutter={50}>
      <Col span={8}>
        <Form.Item
          name="subject"
          label="Subject"
          tooltip='A short caption for the incident that briefly explains what it is about, for example "Theft of earphones".'
          rules={[
            {
              required: true,
              message: 'Please enter a subject for the incident.',
            },
          ]}
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>
      <Col>
        <Row>
          <Form.Item
            name="date"
            label="Time &amp; Date"
            tooltip="The date and time that the incident occurred."
            rules={[
              {
                required: true,
                message: 'Please select a date for the incident.',
              },
            ]}
          >
            <DatePicker
              disabled={saving}
              disabledDate={(current) =>
                current && current.valueOf() > Date.now()
              }
              format="HH:mm - DD/MM/YY"
              showTime={{ showSecond: false, showNow: true }}
              placeholder="Set Date &amp; Time"
            />
          </Form.Item>
        </Row>
      </Col>
      <Col span={4}>
        <Form.Item
          name="value"
          label="Value"
          tooltip="Please enter a value for the incident."
        >
          <InputNumber prefix="£" disabled={saving} style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item
          name="recoveredValue"
          label="Recovered Value"
          tooltip="The value of the lost goods if any."
        >
          <InputNumber prefix="£" disabled={saving} style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={20}>
        <Form.Item
          name="description"
          label="Description"
          tooltip="A more detailed description of the incident."
          rules={[
            {
              required: true,
              message: 'Please enter a description for the incident.',
            },
          ]}
        >
          <Input.TextArea disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={50}>
      <Col>
        <Form.Item
          name="policeReported"
          valuePropName="checked"
          tooltip="The incident has been reported to the police"
          label="Police Involvement"
          style={{ marginBottom: 0 }}
        >
          <Checkbox disabled={saving}>Reported to the police</Checkbox>
        </Form.Item>
        <Form.Item
          name="policeInvolved"
          valuePropName="checked"
          tooltip="The police have been involved in the incident."
        >
          <Checkbox disabled={saving}>Police Involved</Checkbox>
        </Form.Item>
      </Col>

      <Col>
        <Form.Item
          name="policeRef"
          label="Crime Ref No."
          tooltip="The crime reference number provided by the police."
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row wrap={false} gutter={10}>
      <Col span={12}>
        <Row gutter={10} align="middle">
          <Col flex={1}>
            <Form.Item
              name="tags"
              label="Crime Types"
              tooltip="Select the relevant crime types for this incident, these help to categorise the incident,"
              rules={[
                {
                  required: true,
                  message: 'Please add at least one crime type.',
                },
              ]}
            >
              <Select
                loading={tagsLoading}
                disabled={saving}
                mode="multiple"
                maxTagCount={3}
                placeholder="Search for a crime type..."
              >
                {tags.map((tag) => (
                  <Select.Option value={tag.value}>{tag.label}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {adminRights && (
            <Col>
              <Button
                disabled={saving}
                style={{ color: 'red', padding: 8 }}
                onClick={toggleAddIncidentTag}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                Add Crime Type
              </Button>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  </>
);
export default IncidentDetails;
