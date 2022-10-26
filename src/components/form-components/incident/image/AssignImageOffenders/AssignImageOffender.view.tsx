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
import { Age, Build, Gender, Race } from 'graphql/generated';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import { UploadFile } from 'antd/lib/upload/interface';
import AddExistingOffender from '../../offender/AddExisitingOffender';
import AddOffender from '../../offender/AddNewOffender';

const { Title, Paragraph, Text } = Typography;

interface OffenderData {
  id: string;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
}

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
  updateOffendersList: (value: OffenderData) => void;
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
  updateOffendersList,
  selected,
  toggleOffender,
  onCancel,
  onSubmit,
}: Props): JSX.Element => (
  <Modal
    visible={image !== undefined}
    title="Are there offenders in your image?"
    bodyStyle={{ padding: 0 }}
    okText="Assign Offenders"
    cancelText="No Offenders"
    width={900}
    zIndex={1000}
    onCancel={onCancel}
    onOk={onSubmit}
  >
    <div className="incident-form-assign">
      <div
        className="incident-form-assign-image"
        style={{ backgroundImage: `url(${image?.url})` }}
      />
      <div className="incident-form-assign-offenders">
        <Title level={4} className="offender-title">
          {offendersData && offendersData.length > 0 ? 'Select' : 'Add'}{' '}
          Offenders
        </Title>
        {offendersData && offendersData.length === 0 && (
          <Paragraph>
            You have not added any offenders to the incident yet, please add
            offenders if any are present in the image.
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
                  <div
                    className="incident-form-assign-offender-image"
                    style={{
                      backgroundImage: `url(${offender.images[0]?.optimised})`,
                    }}
                  />
                </Col>
              ) : (
                <Col>
                  <Skeleton.Image style={{ height: 80, width: 80 }} />
                </Col>
              )}
              <Col className="incident-form-assign-offender-content">
                <Text strong>{offender.name}</Text>
                <Paragraph>
                  {`Age: ${
                    offender.age ? getOffenderAge(offender.age) : 'Unknown'
                  }, Build: ${
                    offender.build
                      ? getOffenderBuild(offender.build)
                      : 'Unknown'
                  }, Ethnicity: ${
                    offender.race
                      ? getOffenderRace(offender.race, true)
                      : 'Unknown'
                  }, Sex: ${
                    offender.gender
                      ? getOffenderGender(offender.gender)
                      : 'Unknown'
                  }`}
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
              Add New Offender
            </Button>
          </Col>
          <Col>
            <Button
              onClick={toggleAddExistingOffender}
              size="small"
              style={{ color: 'red' }}
            >
              Add Existing Offender
            </Button>
          </Col>
        </Row>
      </div>

      <Drawer
        visible={addOffender}
        onClose={toggleAddOffender}
        title="Add New Offender"
        width="600"
        zIndex={1001}
      >
        {addOffender && (
          <AddOffender
            onClose={toggleAddOffender}
            update={updateOffendersList}
          />
        )}
      </Drawer>

      <Drawer
        visible={addExistingOffender}
        onClose={toggleAddExistingOffender}
        title="Add Existing Offenders"
        width="800"
        zIndex={1001}
      >
        {addExistingOffender && (
          <AddExistingOffender
            onClose={toggleAddExistingOffender}
            offenderIds={offendersData.map(({ id }) => id)}
            update={updateOffendersList}
          />
        )}
      </Drawer>
    </div>
  </Modal>
);

export default AssignImageOffender;
