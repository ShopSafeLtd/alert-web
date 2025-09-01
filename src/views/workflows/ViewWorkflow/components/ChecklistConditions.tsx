import {
  Col,
  Divider,
  Form,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface ChecklistConditionsProps {
  checklistOption: { label: string; value: string }[];
  classes: { cardBody: string };
  loading: boolean;
}

const ChecklistConditions: React.FC<ChecklistConditionsProps> = ({
  checklistOption,
  classes,
  loading,
}) => (
  <>
    <Divider style={{ marginBottom: 0, marginTop: 0 }} />
    <div>
      <Row style={{ padding: 20 }} wrap={false}>
        <Col flex={1}>
          <Typography.Title
            level={4}
            style={{
              alignItems: 'center',
              display: 'flex',
              paddingTop: 8,
            }}
          >
            <FormattedMessage defaultMessage="Use Checklist Score" />
          </Typography.Title>
          <Typography.Text type="secondary">
            <FormattedMessage defaultMessage="Only trigger the workflow based on checklist score." />
          </Typography.Text>
        </Col>
        <Col span={2}>
          <Form.Item name="useChecklistScore" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </div>

    <Form.Item
      noStyle
      shouldUpdate={(prev, curr) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        prev.useChecklistScore !== curr.useChecklistScore
      }
    >
      {({ getFieldValue }) =>
        getFieldValue('useChecklistScore') ? (
          <div className={classes.cardBody}>
            <Form.Item
              label={<FormattedMessage defaultMessage="Score Threshold" />}
              name="checklistScore"
              rules={[
                {
                  message: 'Enter a non-negative number',
                  min: 0,
                  required: true,
                  type: 'number',
                },
              ]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item initialValue={true} name="checklistScoreGreaterThan">
              <Radio.Group>
                <Radio value={true}>
                  <FormattedMessage defaultMessage="Trigger when score is greater than threshold" />
                </Radio>
                <Radio value={false}>
                  <FormattedMessage defaultMessage="Trigger when score is less than threshold" />
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        ) : null
      }
    </Form.Item>

    <Divider style={{ marginBottom: 0, marginTop: 0 }} />
    <div>
      <Row style={{ padding: 20 }} wrap={false}>
        <Col span={24}>
          <Typography.Title
            level={4}
            style={{
              alignItems: 'center',
              display: 'flex',
              paddingTop: 8,
            }}
          >
            <FormattedMessage defaultMessage="If selected template was used" />
          </Typography.Title>
          <Typography.Text type="secondary">
            <FormattedMessage defaultMessage="Only trigger the workflow based on the checklist template." />
          </Typography.Text>
        </Col>
      </Row>
      <Row style={{ padding: 20 }} wrap={false}>
        <Col span={24}>
          <Form.Item name="checklistTemplate">
            <Select
              allowClear
              loading={loading}
              mode={'multiple'}
              optionFilterProp={'label'}
              options={checklistOption}
              showSearch
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  </>
);

export default ChecklistConditions;
