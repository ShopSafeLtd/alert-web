import React from 'react';
import {
  Button,
  Card,
  Carousel,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Popconfirm,
  Row,
  Typography,
} from 'antd';
import {
  Age,
  Build,
  Gender,
  Race,
  ViewOffenderCompareQuery,
} from 'graphql/generated';
import { getAge, getBuild, getEthnicity, getSex } from 'utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/pro-light-svg-icons';
import AddExisitingOffender from 'components/form-components/incident/offender/AddExistingOffender';
import { OffenderData } from 'components/form-components/incident/offender/AddExistingOffender/AddExistingOffender.container';
import useStyles from './CompareOffender.styles';
import { Selected, OffenderField } from './useCompareIncident';

const { Text, Title } = Typography;

type Offender = Exclude<ViewOffenderCompareQuery['offender'], undefined | null>;
interface Props {
  offenders: Offender[];
  preview: Offender;
  addOffender: boolean;
  toggleAddOffender: () => void;
  addOffenders: (value: OffenderData) => void;
  toggleSelected: (offender: Offender, field: OffenderField) => void;
  selected: Selected;
  removeOffender: (offender: Offender) => void;
  onMerge: () => void;
}

const CompareIncident = ({
  offenders,
  preview,
  addOffender,
  addOffenders,
  toggleAddOffender,
  toggleSelected,
  selected,
  removeOffender,
  onMerge,
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Row wrap={false} gutter={8}>
        <Col>
          <Card bodyStyle={{ padding: 0 }} className={classes.firstCard}>
            <div className={classes.imagePlaceholder} />
            <Divider style={{ margin: 0 }} />
            <div className={classes.titleField}>
              <Text strong>Offender Name:</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.titleField}>
              <Text strong>Age:</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.titleField}>
              <Text strong>Date of Birth:</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.titleField}>
              <Text strong>DoB source:</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.titleField}>
              <Text strong>Sex:</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.titleField}>
              <Text strong>Ethnicity:</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.titleField}>
              <Text strong>Build:</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.titleField}>
              <Text strong>Hair:</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.titleField}>
              <Text strong>Peculiarities:</Text>
            </div>
          </Card>
        </Col>
        <Col flex={1}>
          <Row wrap={false} gutter={8} style={{ overflow: 'scroll' }}>
            {offenders.map((offender, index) => (
              <Col key={offender.id}>
                <Row align="middle" className={classes.headerRow}>
                  <Col flex={1}>
                    <Title className={classes.cardTitle} level={4}>
                      Offender {index + 1}
                    </Title>
                  </Col>
                  {offenders.length > 1 && (
                    <Col>
                      <Popconfirm
                        overlayInnerStyle={{
                          padding: '12px 16px',
                        }}
                        title="Are you sure?"
                        onConfirm={() => removeOffender(offender)}
                      >
                        <Button size="small">
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </Popconfirm>
                    </Col>
                  )}
                </Row>
                <Card className={classes.card} bodyStyle={{ padding: 0 }}>
                  <Carousel>
                    {offender.images.map((image) => (
                      <div key={image.id} className={classes.imageContainer}>
                        <div
                          className={classes.image}
                          style={{
                            backgroundImage: `url(${image.optimised || ''})`,
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                  <div className={classes.field}>
                    <div className={classes.text}>
                      <Text>{offender.name}</Text>
                    </div>
                    <Checkbox
                      checked={selected.name === offender.id}
                      onChange={() => toggleSelected(offender, 'name')}
                    />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={classes.field}>
                    <div className={classes.text}>
                      <Text>{getAge(offender.age || Age.Unknown)}</Text>
                    </div>
                    <Checkbox
                      checked={selected.age === offender.id}
                      onChange={() => toggleSelected(offender, 'age')}
                    />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={classes.field}>
                    <div className={classes.text}>
                      <Text>{getAge(offender.dateOfBirth || 'Unknown')}</Text>
                    </div>
                    <Checkbox
                      checked={selected.dateOfBirth === offender.id}
                      onChange={() => toggleSelected(offender, 'dateOfBirth')}
                    />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={classes.field}>
                    <div className={classes.text}>
                      <Text>{getAge(offender.dateSource || 'None')}</Text>
                    </div>
                    <Checkbox
                      checked={selected.dateSource === offender.id}
                      onChange={() => toggleSelected(offender, 'dateSource')}
                    />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={classes.field}>
                    <div className={classes.text}>
                      <Text>{getSex(offender.gender || Gender.Unknown)}</Text>
                    </div>
                    <Checkbox
                      checked={selected.gender === offender.id}
                      onChange={() => toggleSelected(offender, 'gender')}
                    />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={classes.field}>
                    <div className={classes.text}>
                      <Text>{getEthnicity(offender.race || Race.Unknown)}</Text>
                    </div>
                    <Checkbox
                      checked={selected.race === offender.id}
                      onChange={() => toggleSelected(offender, 'race')}
                    />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={classes.field}>
                    <div className={classes.text}>
                      <Text>{getBuild(offender.build || Build.Unknown)}</Text>
                    </div>
                    <Checkbox
                      checked={selected.build === offender.id}
                      onChange={() => toggleSelected(offender, 'build')}
                    />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={classes.field}>
                    <div className={classes.text}>
                      <Text>{offender.hair || 'None'}</Text>
                    </div>
                    <Checkbox
                      checked={selected.hair === offender.id}
                      onChange={() => toggleSelected(offender, 'hair')}
                    />
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <div className={classes.field}>
                    <div className={classes.text}>
                      <Text>{offender.peculiarities || 'None'}</Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
            <Col className={classes.addContainer}>
              <Button onClick={toggleAddOffender} type="primary">
                Add Offender
              </Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row align="middle" className={classes.headerRow}>
            <Col flex={1}>
              <Title className={classes.cardTitle} level={4}>
                Preview
              </Title>
            </Col>
            <Col>
              <Button type="primary" size="small" onClick={onMerge}>
                <FontAwesomeIcon style={{ marginRight: 5 }} icon={faSave} />
                Save &amp; Merge
              </Button>
            </Col>
          </Row>
          <Card className={classes.card} bodyStyle={{ padding: 0 }}>
            <Carousel>
              {preview.images.map((image) => (
                <div key={image.id} className={classes.imageContainer}>
                  <div
                    className={classes.image}
                    style={{
                      backgroundImage: `url(${image.optimised || ''})`,
                    }}
                  />
                </div>
              ))}
            </Carousel>
            <div className={classes.field}>
              <Text>{preview.name}</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.field}>
              <Text>{getAge(preview.age || Age.Unknown)}</Text>
            </div>
            <div className={classes.field}>
              <Text>{getAge(preview.dateOfBirth || 'Unknown')}</Text>
            </div>
            <div className={classes.field}>
              <Text>{getAge(preview.dateSource || 'None')}</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.field}>
              <Text>{getSex(preview.gender || Gender.Unknown)}</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.field}>
              <Text>{getEthnicity(preview.race || Race.Unknown)}</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.field}>
              <Text>{getBuild(preview.build || Build.Unknown)}</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.field}>
              <Text>{preview.hair || 'None'}</Text>
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={classes.field}>
              <Text>{preview.peculiarities || 'None'}</Text>
            </div>
          </Card>
        </Col>
      </Row>
      <Drawer
        title="Add Offenders"
        visible={addOffender}
        width="800"
        onClose={toggleAddOffender}
        zIndex={1001}
      >
        {addOffender ? (
          <AddExisitingOffender
            update={addOffenders}
            offenderIds={offenders.map(({ id }) => id)}
            onClose={toggleAddOffender}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default CompareIncident;
