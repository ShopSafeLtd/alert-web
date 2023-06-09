import React from 'react';

import type { FormInstance } from 'antd';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';

import { ageValues, buildValues, genderValues, raceValues } from 'types/enums';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
// import DebounceSelect from 'components/form-components/DebounceSelect';
import UploadImage from 'components/images/UploadImage.view';
import { heightValues } from 'types/enums/height';
import { IdSource } from 'graphql/generated';
import useStyles from './AddNewOffender.style';
import type { FormData, Image } from './useAddNewOffender';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  editImage: Image | null;
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  toggleEditImage: (value?: Image) => void;
  hideImages?: boolean;
  form: FormInstance<FormData>;
  idVerified: boolean;
  onValuesChange: (changedValues: FormData, values: FormData) => void;
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
  hideImages,
  onRemoveImage,
  onEditImage,
  toggleEditImage,
  editImage,
  primaryImage,
  setPrimaryImage,
  idVerified,
  form,
  onValuesChange,
}: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      onValuesChange={onValuesChange}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            tooltip="Enter the offenders name if you know it, if not leave this field
                blank."
          >
            <Input className={classes.nameSelect} disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="alias"
            label="Alias"
            tooltip="Select the alias of the offender if known."
          >
            <Select disabled={saving} mode="tags" />
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
            name="height"
            label="Height"
            tooltip="Select the height of the offender if known."
          >
            <Select options={heightValues} disabled={saving} />
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
        <Col span={12}>
          <Form.Item
            name="hair"
            label="Hair"
            tooltip="The style and colour of the offenders hair if known."
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} wrap>
        <Col span={24}>
          <Form.Item
            name="peculiarities"
            label="Peculiarities"
            tooltip="Anything distinctive features of the offender."
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="comment"
            label="Comment"
            tooltip="Leave a comment for the offender."
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
            style={{ marginLeft: 10, marginTop: 10 }}
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
      <Row gutter={50}>
        <Col>
          <Form.Item
            name="idVerified"
            label="Has the offenders ID been verified?"
            tooltip="Have you confirmed the offenders ID using an accepted method?"
          >
            <Radio.Group disabled={saving}>
              <Radio.Button value>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        {idVerified && (
          <Col>
            <Form.Item
              name="idSource"
              label="ID Source"
              tooltip="How did you confirm the ID?"
              rules={[
                {
                  required: true,
                  message: 'Please enter the source of the ID.',
                },
              ]}
            >
              <Select
                style={{ width: 200 }}
                disabled={saving}
                options={[
                  {
                    label: 'Driving Licence',
                    value: IdSource.DrivingLicence,
                  },
                  {
                    label: 'ID Card',
                    value: IdSource.IdCard,
                  },
                  {
                    label: 'Known Offender',
                    value: IdSource.Known,
                  },
                  {
                    label: 'Other',
                    value: IdSource.Other,
                  },
                  {
                    label: 'Passport',
                    value: IdSource.Passport,
                  },
                ]}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
      {!hideImages && (
        <UploadImage
          imgChange={imgChange}
          beforeUpload={beforeUpload}
          fileList={fileList}
          editImage={editImage}
          onEditImage={onEditImage}
          toggleEditImage={toggleEditImage}
          onRemoveImage={onRemoveImage}
          primaryImage={primaryImage}
          setPrimaryImage={setPrimaryImage}
          title="offender"
        />
      )}

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
};
export default AddNewOffender;
