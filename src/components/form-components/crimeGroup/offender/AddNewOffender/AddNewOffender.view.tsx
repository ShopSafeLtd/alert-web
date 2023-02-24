import React from 'react';
import { Age, Build, Gender, Race } from 'graphql/generated';

import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Typography,
  Upload,
} from 'antd';

import { ageValues, buildValues, genderValues, raceValues } from 'types/enums';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

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
  images?: [{ id: string; url: string; optimised: string }];
}

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
}

const AddNewOffender = ({
  onClose,
  onSubmit,
  saving,
  ageCheck,
  setAgeCheck,
  imgChange,
  beforeUpload,
  fileList,
}: Props): JSX.Element => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="name"
          label="Name"
          tooltip="Enter the offenders name if you know it, if not leave this field
                blank."
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16} wrap>
      <Col span={12}>
        <Form.Item
          name="build"
          label="Build"
          tooltip="Select the build of the offender if known."
        >
          <Select options={buildValues} disabled={saving} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="gender"
          label="Sex"
          tooltip="Select the gender of the offender if known."
        >
          <Select options={genderValues} disabled={saving} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="race"
          label="Ethnicity"
          tooltip="Select the ethnicity of the offender if known."
        >
          <Select options={raceValues} disabled={saving} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16} wrap>
      <Col span={24}>
        <Form.Item
          name="hair"
          label="Hair"
          tooltip="The style and colour of the offenders hair if known."
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="peculiarities"
          label="Peculiarities"
          tooltip="Anything distinctive features of the offender."
        >
          <Input.TextArea disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={20} wrap>
      <Col span={12}>
        <Typography.Text>
          Do you know the offender&apos;s date of birth?
        </Typography.Text>
        <Switch
          style={{ height: 30, marginLeft: 10, marginTop: 10 }}
          checked={ageCheck}
          checkedChildren="Yes"
          unCheckedChildren="No"
          onChange={() => {
            setAgeCheck(!ageCheck);
          }}
        />
      </Col>

      {ageCheck ? (
        <>
          <Col span={10}>
            <Form.Item name="dateOfBirth" label="Date of Birth">
              <DatePicker
                disabled={saving}
                disabledDate={(current) =>
                  current && current.valueOf() > Date.now()
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="dateSource"
              label="Date of Birth Source"
              tooltip="Enter the information source of the offender's date of birth range of the offender ."
            >
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col span={10}>
          <Form.Item
            name="age"
            label="Age"
            tooltip="Select an estimated age range of the offender if known."
          >
            <Select options={ageValues} disabled={saving} />
          </Form.Item>
        </Col>
      )}
    </Row>
    <Row>
      <Col>
        <Form.Item
          name="images"
          label="Images"
          tooltip="Please add any images that you have of the offender."
        >
          <Upload
            action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
            className="upload-images"
            style={{ width: '50%', height: '50%' }}
            listType="picture-card"
            fileList={fileList}
            onChange={imgChange}
            beforeUpload={beforeUpload}
            accept=".png,.jpeg,.webp"
          >
            {fileList.length < 10 && '+ Upload'}
          </Upload>
        </Form.Item>
      </Col>
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
            Add Offender
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);
export default AddNewOffender;
