import React from 'react';
import { Age, Gender, Race, Build } from 'graphql/generated';

import {
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  Switch,
  DatePicker,
  Typography,
} from 'antd';

import {
  ageValues,
  buildValues,
  genderValues,
  raceValues,
} from 'utils/select-offenders-desc/enums';

interface FormData {
  name: string;
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  hair: string;
  peculiarities: string;
  dateSource: string;
  dateOfBirth: Date;
  groups: string[];
}

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
}

const AddOffender = ({
  onClose,
  onSubmit,
  saving,
  groups,
  groupsLoading,
  ageCheck,
  setAgeCheck,
}: Props): JSX.Element => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Row gutter={50}>
      <Col span={12}>
        <Form.Item name="name" label="Name">
          <Input
            disabled={saving}
            placeholder="Enter the offenders name if you know it, if not leave this field
                blank."
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="build" label="Build">
          <Select
            options={buildValues}
            disabled={saving}
            placeholder="Select the build of the offender if known."
          />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={50}>
      <Col span={12}>
        <Form.Item name="gender" label="Sex">
          <Select
            options={genderValues}
            disabled={saving}
            placeholder="Select the gender of the offender if known."
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="race" label="Ethnicity">
          <Select
            options={raceValues}
            disabled={saving}
            placeholder="Select the ethnicity of the offender if known."
          />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={50}>
      <Col span={12}>
        <Form.Item name="hair" label="Hair">
          <Input
            disabled={saving}
            placeholder="The style and colour of the offenders hair if known."
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="peculiarities" label="Peculiarities">
          <Input
            disabled={saving}
            placeholder="Anything distinctive features of the offender."
          />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={50}>
      <Col span={12}>
        <Form.Item name="groups" label="Groups">
          <Select
            loading={groupsLoading}
            disabled={saving}
            mode="multiple"
            maxTagCount={3}
            placeholder="Select the groups that you would like this offender to be visible to."
          >
            {groups.map((group) => (
              <Select.Option key={group.value} value={group.value}>
                {group.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
    <Row style={{ marginBottom: 20 }}>
      <Col span={12}>
        <Typography.Text>
          Do you know the offender&apos;s date of birth?
        </Typography.Text>
        <Switch
          style={{ height: 30, marginLeft: 10 }}
          checked={ageCheck}
          checkedChildren="Yes"
          unCheckedChildren="No"
          onChange={() => {
            setAgeCheck(!ageCheck);
          }}
        />
      </Col>
    </Row>
    <Row gutter={50}>
      {ageCheck ? (
        <>
          <Col span={12}>
            <Form.Item name="dateOfBirth" label="Date of Birth">
              <DatePicker
                disabled={saving}
                disabledDate={(current) =>
                  current && current.valueOf() > Date.now()
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="dateSource" label="Information Source">
              <Input
                disabled={saving}
                placeholder="Enter the information source of the offender's date of birth range of the offender ."
              />
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col span={12}>
          <Form.Item name="age" label="Age">
            <Select
              placeholder="Select an estimated age range of the offender if known."
              options={ageValues}
              disabled={saving}
            />
          </Form.Item>
        </Col>
      )}
    </Row>

    <Form.Item>
      <Row style={{ marginTop: 30 }} gutter={10} justify="end">
        <Col>
          <Button disabled={saving} onClick={onClose}>
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
            Create A New Offender
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);
export default AddOffender;
