import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { ageValues, buildValues, genderValues, raceValues } from 'types/enums';
import { IdSource } from 'graphql/generated';
import { heightValues } from 'types/enums/height';
import AddCustomGallery from 'components/form-components/customGalleries/AddCustomGallery';
import AddOffenderTag from 'components/form-components/tags/offenderWarnings/AddOffenderWarning';
import type { CustomGalleryData, TagData } from 'types/DataType';

const { Title, Paragraph } = Typography;

interface Props {
  adminRights: boolean;
  saving: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  toggleAddOffenderTag: () => void;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  idVerified?: boolean;
  toggleAddCustomGallery: () => void;
  addOffenderTag: boolean;
  updateNewOffenderTagData: (values: TagData) => void;
  addCustomGallery: boolean;
  updateNewCustomGalleryData: (values: CustomGalleryData) => void;
}

const OffenderDetails = ({
  tags,
  tagsLoading,
  adminRights,
  saving,
  ageCheck,
  setAgeCheck,
  toggleAddOffenderTag,
  idVerified,
  customGalleries,
  customGalleriesLoading,
  toggleAddCustomGallery,
  addOffenderTag,
  updateNewOffenderTagData,
  addCustomGallery,
  updateNewCustomGalleryData,
}: Props): JSX.Element => (
  <>
    <Row align="bottom" style={{ marginBottom: 30 }}>
      <Col>
        <Title style={{ marginBottom: 0 }} level={4}>
          1.
        </Title>
      </Col>
      <Col>
        <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
          Offender Details
        </Title>
      </Col>
      <Col>
        <Paragraph
          style={{ marginBottom: 1, marginLeft: 5 }}
          type="secondary"
          italic
        >
          - Please complete the basic details for the offender.
        </Paragraph>
      </Col>
    </Row>
    <Row gutter={50}>
      <Col span={8}>
        <Form.Item
          name="name"
          label="Name"
          tooltip="Enter the offenders name if you know it, if not leave this field
                blank."
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="alias"
          label="Alias"
          tooltip="Select the alias of the offender if known."
        >
          <Select disabled={saving} mode="tags" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="gender"
          label="Sex"
          tooltip="Select the gender of the offender if known."
        >
          <Select options={genderValues} disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={50}>
      <Col span={8}>
        <Form.Item
          name="build"
          label="Build"
          tooltip="Select the build of the offender if known."
        >
          <Select options={buildValues} disabled={saving} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="height"
          label="Height"
          tooltip="Select the height of the offender if known."
        >
          <Select options={heightValues} disabled={saving} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="race"
          label="Ethnicity"
          tooltip="Select the ethnicity of the offender if known."
        >
          <Select options={raceValues} disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={50}>
      <Col span={8}>
        <Form.Item
          name="hair"
          label="Hair"
          tooltip="The style and colour of the offenders hair if known."
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>
    </Row>

    {adminRights && (
      <Row gutter={50}>
        <Col span={10}>
          <Row gutter={5} align="middle">
            <Col flex={1}>
              <Form.Item
                name="tags"
                label="Offender Warnings"
                tooltip="select any warning labels that are relevant to this offender or add your own."
              >
                <Select
                  loading={tagsLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  optionFilterProp="label"
                >
                  {tags.map((tag) => (
                    <Select.Option value={tag.value} label={tag.label}>
                      {tag.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Button
                disabled={saving}
                style={{ color: 'red', padding: 8 }}
                onClick={toggleAddOffenderTag}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                Add Label
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Row gutter={5} align="middle">
            <Col flex={1}>
              <Form.Item
                name="customGalleries"
                label="Custom Galleries"
                tooltip="select any custom galleries that are relevant to this offender or add your own."
              >
                <Select
                  loading={customGalleriesLoading}
                  disabled={saving}
                  mode="multiple"
                  maxTagCount={3}
                  optionFilterProp="label"
                  // value={selectedItems}
                  // onChange={onSelectCustomGallery}
                >
                  {customGalleries.map((el) => (
                    <Select.Option value={el.value} label={el.label}>
                      {el.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col>
              <Button
                disabled={saving}
                style={{ color: 'red', padding: 8 }}
                onClick={toggleAddCustomGallery}
                icon={
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                }
              >
                Add Custom Gallery
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    )}

    <Row gutter={16}>
      <Col span={23}>
        <Form.Item
          name="peculiarities"
          label="Peculiarities"
          tooltip="Enter any distinctive features of the offender."
        >
          <Input.TextArea disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={23}>
        <Form.Item
          name="comment"
          label="Comment"
          tooltip="Leave a comment for the offender."
        >
          <Input.TextArea disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={50}>
      <Col>
        <Form.Item
          name="ageCheck"
          label="Do you know the offender's date of birth?"
        >
          <Switch
            style={{ width: 70, marginLeft: 10 }}
            checked={ageCheck}
            checkedChildren="Yes"
            unCheckedChildren="No"
            onChange={() => {
              setAgeCheck(!ageCheck);
            }}
          />
        </Form.Item>
      </Col>

      {ageCheck ? (
        <>
          <Col>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              tooltip="Enter the offender's date of birth if known."
            >
              <DatePicker
                style={{ width: 200 }}
                disabled={saving}
                disabledDate={(current) =>
                  current && current.valueOf() > Date.now()
                }
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="dateSource"
              label="Information Source"
              tooltip="Enter the information source of the offender's date of birth range of the offender ."
            >
              <Input.TextArea style={{ width: 300 }} disabled={saving} />
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item
            name="age"
            label="Age"
            tooltip="Select an estimated age range of the offender if known."
          >
            <Select
              style={{ width: 200 }}
              options={ageValues}
              disabled={saving}
            />
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
    <Drawer
      title="Add Offender Warning"
      visible={addOffenderTag}
      width="400"
      onClose={toggleAddOffenderTag}
    >
      {addOffenderTag ? (
        <AddOffenderTag
          update={updateNewOffenderTagData}
          onClose={toggleAddOffenderTag}
        />
      ) : (
        <div />
      )}
    </Drawer>
    <Drawer
      title="Add Custom Gallery"
      visible={addCustomGallery}
      width="400"
      onClose={toggleAddCustomGallery}
    >
      {addCustomGallery ? (
        <AddCustomGallery
          update={updateNewCustomGalleryData}
          onClose={toggleAddCustomGallery}
        />
      ) : (
        <div />
      )}
    </Drawer>
  </>
);
export default OffenderDetails;
