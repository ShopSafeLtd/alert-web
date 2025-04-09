import type { Image } from '#/types/DataType';
import type { FormInstance } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

// import DebounceSelect from 'components/form-components/DebounceSelect';
import UploadImage from '#/components/images/UploadImage.view';
import DatePicker from '#/components/util-components/DatePicker';
import {
  ageValues,
  buildValues,
  genderValues,
  raceValues,
} from '#/types/enums';
import { heightValues } from '#/types/enums/height';
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import { IdSource } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddNewOffender';

import useStyles from './AddNewOffender.style';

interface Props {
  addOverride?: string;
  ageCheck: boolean;
  beforeUpload: (value: RcFile) => void;
  editImage: Image | null;
  fileList: UploadFile[];
  form: FormInstance<FormData>;
  hideImages?: boolean;
  idVerified: boolean;
  imgChange: UploadProps['onChange'];
  onClose: () => void;
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  onSubmit: (value: FormData) => void;
  onValuesChange: (changedValues: FormData, values: FormData) => void;
  primaryImage: string;
  saving: boolean;
  setAgeCheck: (value: boolean) => void;
  setPrimaryImage: (value: string) => void;
  toggleEditImage: (value?: Image) => void;
}

const AddNewOffender = ({
  addOverride,
  ageCheck,
  beforeUpload,
  editImage,
  fileList,
  form,
  hideImages,
  idVerified,
  imgChange,
  onClose,
  onEditImage,
  onRemoveImage,
  onSubmit,
  onValuesChange,
  primaryImage,
  saving,
  setAgeCheck,
  setPrimaryImage,
  toggleEditImage,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
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
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            name="name"
            tooltip={intl.formatMessage({
              defaultMessage: 'Enter the offenders name if you know it.',
            })}
          >
            <Input className={classes.nameSelect} disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Alias',
            })}
            name="alias"
            tooltip={intl.formatMessage({
              defaultMessage: 'Add the alias of the offender if known.',
            })}
          >
            <Select disabled={saving} mode="tags" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} wrap>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Build',
            })}
            name="build"
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the build of the offender if known.',
            })}
          >
            <Select disabled={saving} options={buildValues} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Height',
            })}
            name="height"
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the height of the offender if known.',
            })}
          >
            <Select disabled={saving} options={heightValues} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Sex' })}
            name="gender"
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the gender of the offender if known.',
            })}
          >
            <Select disabled={saving} options={genderValues} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Ethnicity',
            })}
            name="race"
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the ethnicity of the offender if known.',
            })}
          >
            <Select disabled={saving} options={raceValues} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Hair' })}
            name="hair"
            tooltip={intl.formatMessage({
              defaultMessage:
                'The style and colour of the offenders hair if known.',
            })}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} wrap>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Characteristics',
            })}
            name="peculiarities"
            tooltip={intl.formatMessage({
              defaultMessage: 'Any distinctive features of the offender.',
            })}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Comment',
            })}
            name="comment"
            tooltip={intl.formatMessage({
              defaultMessage: 'Any other comments about this offender.',
            })}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20} wrap>
        <Col span={12}>
          <Typography.Text>
            {intl.formatMessage({
              defaultMessage: "Do you know the offender's date of birth?",
            })}
          </Typography.Text>
          <Switch
            checked={ageCheck}
            checkedChildren={intl.formatMessage({
              defaultMessage: 'Yes',
            })}
            onChange={() => {
              setAgeCheck(!ageCheck);
            }}
            style={{ marginLeft: 10, marginTop: 10 }}
            unCheckedChildren={intl.formatMessage({
              defaultMessage: 'No',
            })}
          />
        </Col>

        {ageCheck ? (
          <>
            <Col span={10}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Date of Birth',
                })}
                name="dateOfBirth"
              >
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
                label={intl.formatMessage({
                  defaultMessage: 'Date of Birth Source',
                })}
                name="dateSource"
                tooltip={intl.formatMessage({
                  defaultMessage:
                    "Enter the information source of the offender's date of birth range of the offender.",
                })}
              >
                <Input.TextArea disabled={saving} />
              </Form.Item>
            </Col>
          </>
        ) : (
          <Col span={10}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Age',
              })}
              name="age"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Select an estimated age range of the offender if known.',
              })}
            >
              <Select disabled={saving} options={ageValues} />
            </Form.Item>
          </Col>
        )}
      </Row>
      <Row gutter={50}>
        <Col>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: "Has the offender's ID been verified?",
            })}
            name="idVerified"
            tooltip={intl.formatMessage({
              defaultMessage:
                'Have you confirmed the offenders ID using an accepted method?',
            })}
          >
            <Radio.Group disabled={saving}>
              <Radio.Button value>
                {intl.formatMessage({ defaultMessage: 'Yes' })}
              </Radio.Button>
              <Radio.Button value={false}>
                {intl.formatMessage({ defaultMessage: 'No' })}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        {idVerified && (
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'ID Source',
              })}
              name="idSource"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the source of the ID.',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage: 'How did you confirm the ID?',
              })}
            >
              <Select
                disabled={saving}
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Driving Licence',
                    }),
                    value: IdSource.DrivingLicence,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'ID Card',
                    }),
                    value: IdSource.IdCard,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'By BCRP',
                    }),
                    value: IdSource.Bcrp,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Known Offender',
                    }),
                    value: IdSource.Known,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Provided By Police',
                    }),
                    value: IdSource.Police,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Other',
                    }),
                    value: IdSource.Other,
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Passport',
                    }),
                    value: IdSource.Passport,
                  },
                ]}
                style={{ width: 200 }}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
      {!hideImages && (
        <UploadImage
          beforeUpload={beforeUpload}
          editImage={editImage}
          fileList={fileList}
          imgChange={imgChange}
          onEditImage={onEditImage}
          onRemoveImage={onRemoveImage}
          primaryImage={primaryImage}
          setPrimaryImage={setPrimaryImage}
          title={intl.formatMessage({
            defaultMessage: 'offender',
          })}
          toggleEditImage={toggleEditImage}
        />
      )}

      <Form.Item>
        <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
            >
              {addOverride || intl.formatMessage({ defaultMessage: 'Add' })}
              {intl.formatMessage({ defaultMessage: 'Offender' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default AddNewOffender;
