/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';

import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  PageHeader,
  Radio,
  Row,
  Typography,
} from 'antd';
import useStyles from './CreateMg11.styles';
import type { FormData } from './useCreateMg11';

const { Title } = Typography;
const { TextArea } = Input;

interface Props {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  form: FormInstance<FormData>;
}

const CreateMg11 = ({ onSubmit, saving, form }: Props): JSX.Element => {
  const classes = useStyles();
  const likelyToAttend = Form.useWatch('likelyToAttend', form);
  const careNeeds = Form.useWatch('careNeeds', form);
  return (
    <div className="page-view">
      <PageHeader
        onBack={() => window.history.back()}
        title="Create Witness Statement (MG11)"
      />
      <Form<FormData>
        form={form}
        initialValues={{
          urn: '',
          station: '',
          statementWhereWhen: '',
          visualRecording: '',

          statement: '',

          address: '',
          postcode: '',
          homeTel: '',
          workTel: '',
          mobileTel: '',
          email: '',
          name: '',
          age: '',
          occupation: '',
          prefContact: '',
          gender: '',
          dobPlace: '',
          formerName: '',
          height: '',
          ethnicity: '',
          availability: '',
          likelyToAttend: '',
          likelyToAttendReason: '',
          specialMeasures: '',
          careNeeds: '',
          careNeedsDetails: '',
        }}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Card className={classes.card}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                1.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Basic Details
              </Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="urn" label="Urn">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="station" label="Station">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="statementWhereWhen"
            label="When and where was this statement made?"
            style={{ width: '50%' }}
          >
            <Input disabled={saving} />
          </Form.Item>
          <Form.Item
            name="visualRecording"
            label="Was the witness evidence visually recorded?"
            rules={[
              {
                required: true,
                message: 'Please choose an option.',
              },
            ]}
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Card>

        <Card className={classes.card}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                2.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Witness Details
              </Title>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please enter a name for the witness.',
                  },
                ]}
                name="name"
                label="Name"
              >
                <Input disabled={saving} />
              </Form.Item>
              <Form.Item name="formerName" label="Former Name (if applicable)">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please enter an email for the witness.',
                  },
                ]}
                name="email"
                label="Email"
              >
                <Input disabled={saving} />
              </Form.Item>
              <Form.Item name="occupation" label="Occupation">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={2}>
              {' '}
              <Form.Item name="height" label="Height">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={2}>
              {' '}
              <Form.Item
                name="age"
                label="Age"
                tooltip="If over 18, please enter over 18"
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={4}>
              {' '}
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a gender.',
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                name="ethnicity"
                label="Ethnicity Code"
                rules={[
                  {
                    required: true,
                    message: 'Please enter an ethnicity code.',
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dobPlace"
                label="Date and place of birth"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a DOB and place of birth.',
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="address"
                label="Home Address"
                rules={[
                  {
                    required: true,
                    message: 'Please enter an address.',
                  },
                ]}
              >
                <TextArea
                  autoComplete="off"
                  placeholder="Home address"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item
                name="postcode"
                label="Postcode"
                rules={[
                  {
                    required: true,
                    message: 'Please enter a postcode.',
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={4}>
              {' '}
              <Form.Item name="homeTel" label="Home Phone no.">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={4}>
              {' '}
              <Form.Item name="workTel" label="Work Phone no.">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={4}>
              {' '}
              <Form.Item
                name="mobileTel"
                label="Mobile Phone no."
                rules={[
                  {
                    required: true,
                    message: 'Please enter a mobile number.',
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="prefContact" label="Preferred means of contact">
                <Input disabled={saving} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="availability"
                label="Availability details for the next 6 months"
              >
                <TextArea
                  autoComplete="off"
                  placeholder="Availabity"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card className={classes.card}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                3.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Witness Care
              </Title>
            </Col>
          </Row>

          <Form.Item
            name="likelyToAttend"
            label="Is the witness willing to attend court?"
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Col span={12}>
            <Form.Item
              name="likelyToAttendReason"
              label="What can be done to ensure
              attendance?"
            >
              <TextArea
                disabled={likelyToAttend !== 'true'}
                autoComplete="off"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
          <Form.Item
            name="specialMeasures"
            label="Does the witness require a Special Measures Assessment?"
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>{' '}
          </Form.Item>

          <Form.Item
            name="careNeeds"
            label="Does the witness have any special needs?"
          >
            <Radio.Group size="small">
              <Radio.Button value="true">Yes</Radio.Button>
              <Radio.Button value="false">No</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Col span={12}>
            <Form.Item
              name="careNeedsDetails"
              label="What are the special care needs?"
            >
              <TextArea
                disabled={careNeeds !== 'true'}
                autoComplete="off"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
        </Card>

        <Card className={classes.card}>
          <Row align="bottom" style={{ marginBottom: 20 }}>
            <Col>
              <Title style={{ marginBottom: 0 }} level={4}>
                4.
              </Title>
            </Col>
            <Col>
              <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                Statement
              </Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="statement"
                label="Statement"
                tooltip="Please enter the statement for the incident."
                rules={[
                  {
                    required: true,
                    message: 'Please enter a statement.',
                  },
                ]}
              >
                <TextArea autoComplete="off" autoSize={{ minRows: 6 }} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Buttons */}
        <Form.Item>
          <Row style={{ marginTop: 10 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={() => window.history.back()}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                Create Mg11
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateMg11;
