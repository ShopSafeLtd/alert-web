import React from 'react';
import {
  Typography,
  Row,
  Col,
  Button,
  Drawer,
  Checkbox,
  Modal,
  Skeleton,
} from 'antd';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import type { UploadFile } from 'antd/lib/upload/interface';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';
import type { OffenderData } from 'types/DataType';
import { useStoreState } from 'state';
import { Role } from 'graphql/generated';
import AddExistingOffender from '../../../offender/offender/AddExistingOffender';
import AddOffender from '../../../offender/offender/AddNewOffender';

const { Title, Paragraph, Text } = Typography;

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
    name?: string | undefined | null;
  }[];
}

interface Props {
  image: Image | undefined;
  offendersData: OffenderData[];
  toggleAddOffender: () => void;
  toggleAddExistingOffender: () => void;
  addExistingOffender: boolean;
  addOffender: boolean;
  onAddOffender: (value: OffenderData, existing: boolean) => void;
  toggleOffender: (id: string) => void;
  selected: string[];
  onCancel: () => void;
  onSubmit: () => void;
}

const AssignImageOffender = ({
  image,
  offendersData,
  toggleAddExistingOffender,
  toggleAddOffender,
  addExistingOffender,
  addOffender,
  onAddOffender,
  selected,
  toggleOffender,
  onCancel,
  onSubmit,
}: Props): JSX.Element => {
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;
  return (
    <Modal
      open={image !== undefined}
      title={intl.formatMessage({
        defaultMessage: 'Are there offenders in your image?',
        id: 'cLrIqr',
      })}
      bodyStyle={{ padding: 0 }}
      okText={intl.formatMessage({
        defaultMessage: 'Assign Offenders',
        id: 'GFrwvj',
      })}
      cancelText={intl.formatMessage({
        defaultMessage: 'No Offenders',
        id: 'hO5g1p',
      })}
      width={900}
      zIndex={1000}
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <div className="incident-form-assign">
        <div className="incident-form-assign-image">
          <WatermarkImage url={image?.url} />
        </div>
        <div className="incident-form-assign-offenders">
          <Title level={4} className="offender-title">
            {offendersData && offendersData.length > 0
              ? intl.formatMessage({
                  defaultMessage: 'Select Offenders',
                  id: 'nNFHrE',
                })
              : intl.formatMessage({
                  defaultMessage: 'Add Offenders',
                  id: 'KaNxum',
                })}
          </Title>
          {offendersData && offendersData.length === 0 && (
            <Paragraph>
              {intl.formatMessage({
                defaultMessage:
                  'You have not added any offenders to the incident yet, please add offenders if any are present in the image.',
                id: 'mjoJ/I',
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
                        id: 'RkYfRn',
                      },
                      {
                        age:
                          offender.age && publicOffenderDOB
                            ? getOffenderAge(offender.age)
                            : intl.formatMessage({
                                defaultMessage: 'Unknown',
                                id: '5jeq8P',
                              }),
                        build: offender.build
                          ? getOffenderBuild(offender.build)
                          : intl.formatMessage({
                              defaultMessage: 'Unknown',
                              id: '5jeq8P',
                            }),
                        ethnicity: offender.race
                          ? getOffenderRace(offender.race, true)
                          : intl.formatMessage({
                              defaultMessage: 'Unknown',
                              id: '5jeq8P',
                            }),
                        sex: offender.gender
                          ? getOffenderGender(offender.gender)
                          : intl.formatMessage({
                              defaultMessage: 'Unknown',
                              id: '5jeq8P',
                            }),
                      }
                    )}
                  </Paragraph>
                </Col>
                <Col className="incident-form-assign-offender-check">
                  <Checkbox
                    onChange={() => toggleOffender(offender.id)}
                    checked={selected.includes(offender.id)}
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
                  id: 'V+RsEq',
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
                  id: 'w4XD3a',
                })}
              </Button>
            </Col>
          </Row>
        </div>

        <Drawer
          open={addOffender}
          onClose={toggleAddOffender}
          title={intl.formatMessage({
            defaultMessage: 'Add New Offender',
            id: 'V+RsEq',
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
          open={addExistingOffender}
          onClose={toggleAddExistingOffender}
          title={intl.formatMessage({
            defaultMessage: 'Add Existing Offenders',
            id: '1FbM4r',
          })}
          width="1000"
          zIndex={1001}
        >
          {addExistingOffender && (
            <AddExistingOffender
              onClose={toggleAddExistingOffender}
              offenderIds={offendersData.map(({ id }) => id)}
              update={(data) => onAddOffender(data, true)}
            />
          )}
        </Drawer>
      </div>
    </Modal>
  );
};

export default AssignImageOffender;
