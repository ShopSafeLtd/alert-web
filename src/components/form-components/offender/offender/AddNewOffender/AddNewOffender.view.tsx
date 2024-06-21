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
import { useIntl } from 'react-intl';
import type { Image } from 'types/DataType';
import useStyles from './AddNewOffender.style';
import type { FormData } from './useAddNewOffender';
import { IdSource } from 'graphql/types';

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
  addOverride?: string;
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
  addOverride,
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
            name="name"
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            tooltip={intl.formatMessage({
              defaultMessage: 'Enter the offenders name if you know it.',
            })}
          >
            <Input className={classes.nameSelect} disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="alias"
            label={intl.formatMessage({
              defaultMessage: 'Alias',
            })}
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
            name="build"
            label={intl.formatMessage({
              defaultMessage: 'Build',
            })}
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the build of the offender if known.',
            })}
          >
            <Select options={buildValues} disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="height"
            label={intl.formatMessage({
              defaultMessage: 'Height',
            })}
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the height of the offender if known.',
            })}
          >
            <Select options={heightValues} disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="gender"
            label={intl.formatMessage({ defaultMessage: 'Sex' })}
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the gender of the offender if known.',
            })}
          >
            <Select options={genderValues} disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="race"
            label={intl.formatMessage({
              defaultMessage: 'Ethnicity',
            })}
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the ethnicity of the offender if known.',
            })}
          >
            <Select options={raceValues} disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="hair"
            label={intl.formatMessage({ defaultMessage: 'Hair' })}
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
            name="peculiarities"
            label={intl.formatMessage({
              defaultMessage: 'Characteristics',
            })}
            tooltip={intl.formatMessage({
              defaultMessage: 'Any distinctive features of the offender.',
            })}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="comment"
            label={intl.formatMessage({
              defaultMessage: 'Comment',
            })}
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
            style={{ marginLeft: 10, marginTop: 10 }}
            checked={ageCheck}
            checkedChildren={intl.formatMessage({
              defaultMessage: 'Yes',
            })}
            unCheckedChildren={intl.formatMessage({
              defaultMessage: 'No',
            })}
            onChange={() => {
              setAgeCheck(!ageCheck);
            }}
          />
        </Col>

        {ageCheck ? (
          <>
            <Col span={10}>
              <Form.Item
                name="dateOfBirth"
                label={intl.formatMessage({
                  defaultMessage: 'Date of Birth',
                })}
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
                name="dateSource"
                label={intl.formatMessage({
                  defaultMessage: 'Date of Birth Source',
                })}
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
              name="age"
              label={intl.formatMessage({
                defaultMessage: 'Age',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Select an estimated age range of the offender if known.',
              })}
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
            label={intl.formatMessage({
              defaultMessage: "Has the offender's ID been verified?",
            })}
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
              name="idSource"
              label={intl.formatMessage({
                defaultMessage: 'ID Source',
              })}
              tooltip={intl.formatMessage({
                defaultMessage: 'How did you confirm the ID?',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Please enter the source of the ID.',
                  }),
                },
              ]}
            >
              <Select
                style={{ width: 200 }}
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
          title={intl.formatMessage({
            defaultMessage: 'offender',
          })}
        />
      )}

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
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
