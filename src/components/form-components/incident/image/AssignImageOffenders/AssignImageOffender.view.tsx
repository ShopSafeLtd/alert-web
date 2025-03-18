import type { UploadFile } from 'antd/lib/upload/interface';
import type { OffenderData } from 'types/DataType';

import publicOffenderDob from '#/utils/public-offender-dob';
import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Modal,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';
import { useIntl } from 'react-intl';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

import AddExistingOffender from '../../../offender/AddExistingOffender';
import AddOffender from '../../../offender/AddNewOffender';

const { Paragraph, Text, Title } = Typography;

// interface OffenderData {
//   id: string;
//   name?: string | null;
//   age?: Age | null;
//   gender?: Gender | null;
//   race?: Race | null;
//   build?: Build | null;
//   dateOfBirth?: Date | null;
//   hair?: string | null;
//   dateSource?: string | null;
//   peculiarities?: string | null;
//   approved?: boolean | null;
//   groups?:
//     | {
//         id: string;
//         name: string;
//       }[]
//     | undefined;
//   images?:
//     | {
//         id: string;
//         optimised?: string | null;
//         url?: string | null;
//         new?: boolean;
//       }[]
//     | null;
//   imageUid?: string[] | undefined;
// }

// interface OffenderData extends OffenderData {
//   new: boolean;
//   existing: boolean;
//   edited: boolean;
// }

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: null | string | undefined;
  }[];
}

interface Props {
  addExistingOffender: boolean;
  addOffender: boolean;
  image: Image | undefined;
  offendersData: OffenderData[];
  onAddOffender: (value: OffenderData, existing: boolean) => void;
  onCancel: () => void;
  onSubmit: () => void;
  selected: string[];
  toggleAddExistingOffender: () => void;
  toggleAddOffender: () => void;
  toggleOffender: (id: string) => void;
}

const AssignImageOffender = ({
  addExistingOffender,
  addOffender,
  image,
  offendersData,
  onAddOffender,
  onCancel,
  onSubmit,
  selected,
  toggleAddExistingOffender,
  toggleAddOffender,
  toggleOffender,
}: Props): JSX.Element => {
  const intl = useIntl();
  const publicOffenderDOB = publicOffenderDob();
  return (
    <Modal
      bodyStyle={{ padding: 0 }}
      cancelText={intl.formatMessage({
        defaultMessage: 'No Offenders',
      })}
      okText={intl.formatMessage({
        defaultMessage: 'Assign Offenders',
      })}
      onCancel={onCancel}
      onOk={onSubmit}
      open={image !== undefined}
      title={intl.formatMessage({
        defaultMessage: 'Are there offenders in your image?',
      })}
      width={900}
      zIndex={1000}
    >
      <div className="incident-form-assign">
        <div className="incident-form-assign-image">
          <WatermarkImage url={image?.url} />
        </div>
        <div className="incident-form-assign-offenders">
          <Title className="offender-title" level={4}>
            {offendersData && offendersData.length > 0
              ? intl.formatMessage({
                  defaultMessage: 'Select Offenders',
                })
              : intl.formatMessage({
                  defaultMessage: 'Add Offenders',
                })}
          </Title>
          {offendersData && offendersData.length === 0 && (
            <Paragraph>
              {intl.formatMessage({
                defaultMessage:
                  'You have not added any offenders to the incident yet, please add offenders if any are present in the image.',
              })}
            </Paragraph>
          )}
          <div className="incident-form-assign-offender-list">
            {offendersData.map((offender) => (
              <Row
                className="incident-form-assign-offender"
                key={offender.id}
                onClick={() => toggleOffender(offender.id)}
                wrap={false}
              >
                {offender.images && offender.images.length > 0 ? (
                  <Col>
                    <div className="incident-form-assign-offender-image">
                      <WatermarkImage url={offender.images[0]?.optimised} />
                    </div>
                  </Col>
                ) : (
                  <Col>
                    <Skeleton.Image style={{ height: 80, width: 80 }} />
                  </Col>
                )}
                <Col className="incident-form-assign-offender-content">
                  <Text strong>{offender.name}</Text>
                  <Paragraph>
                    {intl.formatMessage(
                      {
                        defaultMessage:
                          'Age: {age}, Build: {build}, Ethnicity: {ethnicity}, Sex: {sex}',
                      },
                      {
                        age:
                          offender.age && publicOffenderDOB
                            ? getOffenderAge(offender.age)
                            : intl.formatMessage({
                                defaultMessage: 'Unknown',
                              }),
                        build: offender.build
                          ? getOffenderBuild(offender.build)
                          : intl.formatMessage({
                              defaultMessage: 'Unknown',
                            }),
                        ethnicity: offender.race
                          ? getOffenderRace(offender.race, true)
                          : intl.formatMessage({
                              defaultMessage: 'Unknown',
                            }),
                        sex: offender.gender
                          ? getOffenderGender(offender.gender)
                          : intl.formatMessage({
                              defaultMessage: 'Unknown',
                            }),
                      }
                    )}
                  </Paragraph>
                </Col>
                <Col className="incident-form-assign-offender-check">
                  <Checkbox
                    checked={selected.includes(offender.id)}
                    onChange={() => toggleOffender(offender.id)}
                  />
                </Col>
              </Row>
            ))}
          </div>
          <Row gutter={8}>
            <Col>
              <Button
                onClick={toggleAddOffender}
                size="small"
                style={{ color: 'red' }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Add New Offender',
                })}
              </Button>
            </Col>
            <Col>
              <Button
                onClick={toggleAddExistingOffender}
                size="small"
                style={{ color: 'red' }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Add Existing Offender',
                })}
              </Button>
            </Col>
          </Row>
        </div>

        <Drawer
          onClose={toggleAddOffender}
          open={addOffender}
          title={intl.formatMessage({
            defaultMessage: 'Add New Offender',
          })}
          width="600"
          zIndex={1001}
        >
          {addOffender && (
            <AddOffender
              onClose={toggleAddOffender}
              update={(data) => onAddOffender(data, false)}
            />
          )}
        </Drawer>

        <Drawer
          onClose={toggleAddExistingOffender}
          open={addExistingOffender}
          title={intl.formatMessage({
            defaultMessage: 'Add Existing Offenders',
          })}
          width="1000"
          zIndex={1001}
        >
          {addExistingOffender && (
            <AddExistingOffender
              offenderIds={offendersData.map(({ id }) => id)}
              onClose={toggleAddExistingOffender}
              update={(data) => onAddOffender(data, true)}
            />
          )}
        </Drawer>
      </div>
    </Modal>
  );
};

export default AssignImageOffender;
