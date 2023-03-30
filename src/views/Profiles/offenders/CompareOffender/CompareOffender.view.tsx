import React, { useEffect, useRef, useState } from 'react';
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
import type { ViewOffenderCompareQuery } from 'graphql/generated';
import { Age, Build, Gender, Race } from 'graphql/generated';
import { getAge, getBuild, getEthnicity, getSex } from 'utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faColumns,
  faImages,
  faSave,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { Layout } from 'react-grid-layout';
import GridLayout from 'react-grid-layout';
import AddExisitingOffender from 'components/form-components/incident/offender/AddExistingOffender';
import type { OffenderData } from 'components/form-components/incident/offender/AddExistingOffender/AddExistingOffender.container';
import WatermarkImage from 'components/images/WatermarkImage.view';
import useStyles from './CompareOffender.styles';
import type { OffenderField, Selected } from './useCompareIncident';

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
  mode: 'column' | 'grid';
  setMode: (value: 'column' | 'grid') => void;
  toggleSelectedImages: (value: string) => void;
  selectedImages: string[];
  onSubmitImages: () => void;
}

interface GridImageProps {
  image: {
    id: string;
    optimised?: string | undefined | null;
    name?: string | undefined | null;
    offenderId: string;
  };
  layout: Layout[];
  toggleSelectedImages: (value: string) => void;
  selected: boolean;
}

const GridImage = ({
  image,
  layout,
  selected,
  toggleSelectedImages,
}: GridImageProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  useEffect(() => {}, [layout]);

  useEffect(() => {}, []);

  return (
    <div ref={cardRef} style={{ height: '100%', width: '100%' }}>
      <Card
        key={image.id}
        bodyStyle={{ padding: 0 }}
        style={{ height: '100%', width: '100%', overflow: 'hidden' }}
      >
        <TransformWrapper
          panning={{
            disabled: true,
          }}
        >
          <TransformComponent>
            <div
              className={classes.gridImage}
              style={{
                height: (cardRef.current?.offsetHeight || 0) - 46,
                width: cardRef.current?.offsetWidth || 0,
              }}
            >
              <WatermarkImage url={image.optimised} />
            </div>
          </TransformComponent>
        </TransformWrapper>
        <Row align="middle" className={classes.gridName}>
          <Col flex={1}>
            <Text>{image.name}</Text>
          </Col>
          <Col>
            <Checkbox
              checked={selected}
              onChange={() => toggleSelectedImages(image.offenderId)}
              className={classes.gridCheck}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

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
  mode,
  setMode,
  selectedImages,
  toggleSelectedImages,
  onSubmitImages,
}: Props) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const [layout, setLayout] = useState<Layout[]>([]);

  return (
    <div ref={pageRef} className={classes.page}>
      <Row justify="end" gutter={16} style={{ marginBottom: 10 }}>
        <Col>
          <Button onClick={toggleAddOffender} type="ghost" danger>
            Add Offender
          </Button>
        </Col>
        {mode === 'grid' && (
          <Col>
            <Button onClick={() => setMode('column')} type="ghost">
              Cancel
            </Button>
          </Col>
        )}
        <Col>
          {mode === 'column' && (
            <Button onClick={() => setMode('grid')}>
              <FontAwesomeIcon
                size="lg"
                style={{ marginRight: 10 }}
                icon={faImages}
              />
              Image Comparison
            </Button>
          )}
          {mode === 'grid' && (
            <Button
              disabled={selectedImages.length === 0}
              type="primary"
              onClick={onSubmitImages}
            >
              <FontAwesomeIcon
                size="lg"
                style={{ marginRight: 10 }}
                icon={faColumns}
              />
              Select Images & Compare Fields
            </Button>
          )}
        </Col>
        {mode === 'column' && (
          <Col>
            <Button type="primary" size="small" onClick={onMerge}>
              <FontAwesomeIcon
                size="lg"
                style={{ marginRight: 10 }}
                icon={faSave}
              />
              Save &amp; Merge
            </Button>
          </Col>
        )}
      </Row>
      {mode === 'column' && (
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
            <Row wrap={false} gutter={8} style={{ overflow: 'auto' }}>
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
                    {offender.images.length > 0 ? (
                      <Carousel>
                        {offender.images.map((image) => (
                          <div
                            key={image.id}
                            className={classes.imageContainer}
                          >
                            <TransformWrapper>
                              <TransformComponent>
                                <div className={classes.image}>
                                  <WatermarkImage url={image.optimised} />
                                </div>
                              </TransformComponent>
                            </TransformWrapper>
                          </div>
                        ))}
                      </Carousel>
                    ) : (
                      <div className={classes.imagePlaceholder} />
                    )}
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
                        <Text>
                          {getEthnicity(offender.race || Race.Unknown)}
                        </Text>
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
            </Row>
            <Card className={classes.card} bodyStyle={{ padding: 0 }}>
              <Carousel>
                {preview.images.map((image) => (
                  <div key={image.id} className={classes.imageContainer}>
                    <TransformWrapper>
                      <TransformComponent>
                        <div className={classes.image}>
                          <WatermarkImage url={image.optimised} />
                        </div>
                      </TransformComponent>
                    </TransformWrapper>
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
              <Divider style={{ margin: 0 }} />
              <div className={classes.field}>
                <Text>{getAge(preview.dateOfBirth || 'Unknown')}</Text>
              </div>
              <Divider style={{ margin: 0 }} />
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
      )}
      {mode === 'grid' && (
        <GridLayout
          className="layout"
          width={pageRef.current?.offsetWidth}
          rowHeight={100}
          cols={12}
          onLayoutChange={(e) => {
            setLayout(e);
          }}
          onResizeStop={(e) => {
            setLayout(e);
          }}
          onResize={(e) => {
            setLayout(e);
          }}
          layout={offenders
            .flatMap((offender) =>
              offender.images.map((image) => ({
                ...image,
                name: offender.name,
                offenderId: offender.id,
              }))
            )
            .map((image, index) => ({
              i: image.id,
              h: 3,
              w: 3,
              x: index * 3,
              y: 0,
              resizeHandles: ['se'],
            }))}
        >
          {offenders
            .flatMap((offender) =>
              offender.images.map((image) => ({
                ...image,
                name: offender.name,
                offenderId: offender.id,
              }))
            )
            .map((image) => (
              <div className={classes.gridCard} key={image.id}>
                <GridImage
                  selected={selectedImages.includes(image.offenderId)}
                  layout={layout}
                  image={image}
                  toggleSelectedImages={toggleSelectedImages}
                />
              </div>
            ))}
        </GridLayout>
      )}
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
