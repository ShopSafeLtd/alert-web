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
import { Role, Age, Build, Gender, Race } from 'graphql/generated';
import { getAge, getBuild, getEthnicity, getSex } from 'utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faColumns,
  faImages,
  faSave,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import type { Layout } from 'react-grid-layout';
import GridLayout from 'react-grid-layout';
import moment from 'moment';
import AddExisitingOffender from 'components/form-components/offender/offender/AddExistingOffender';
import type { OffenderData } from 'components/form-components/offender/offender/AddExistingOffender/AddExistingOffender.container';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
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
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;
  return (
    <div ref={pageRef} className={classes.page}>
      <Row justify="end" gutter={16} style={{ marginBottom: 10 }}>
        <Col>
          <Button onClick={toggleAddOffender} type="ghost" danger>
            {intl.formatMessage({
              defaultMessage: 'Add Offender',
              id: 'm3ChN4',
            })}
          </Button>
        </Col>
        {mode === 'grid' && (
          <Col>
            <Button onClick={() => setMode('column')} type="ghost">
              {intl.formatMessage({
                defaultMessage: 'Cancel',
                id: '47FYwb',
              })}
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
              {intl.formatMessage({
                defaultMessage: 'Image Comparison',
                id: 'Ssi2B7',
              })}
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
              {intl.formatMessage({
                defaultMessage: 'Select Images & Compare Fields\n',
                id: 'GYWlm+',
              })}
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
              {intl.formatMessage({
                defaultMessage: 'Save & Merge',
                id: 'OvPg13',
              })}
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
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Offender Name:',
                    id: 'CqQV1G',
                  })}
                </Text>
              </div>
              {publicOffenderDOB && (
                <>
                  <Divider style={{ margin: 0 }} />
                  <div className={classes.titleField}>
                    <Text strong>
                      {intl.formatMessage({
                        defaultMessage: 'Age:',
                        id: 'S9GJ93',
                      })}
                    </Text>
                  </div>
                </>
              )}
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Date of Birth:',
                    id: 'sYTUgV',
                  })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'DoB Source:',
                    id: '+WLvff',
                  })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Sex:',
                    id: 'Oz0DsA',
                  })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Ethnicity:',
                    id: 'JzYph5',
                  })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Build:',
                    id: '0qjl3+',
                  })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Hair:',
                    id: '2x7zoS',
                  })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Characteristics:',
                    id: 'BxC/6v',
                  })}
                </Text>
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
                        {intl.formatMessage(
                          {
                            defaultMessage: 'Offender {index}',
                            id: 'hO4ExD',
                          },
                          {
                            index: index + 1,
                          }
                        )}
                      </Title>
                    </Col>
                    {offenders.length > 1 && (
                      <Col>
                        <Popconfirm
                          overlayInnerStyle={{
                            padding: '12px 16px',
                          }}
                          title={intl.formatMessage({
                            defaultMessage: 'Are you sure?',
                            id: '2oCaym',
                          })}
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
                                  <WatermarkImage
                                    url={image.optimised}
                                    rotation={image.rotation}
                                    position={image.position}
                                  />
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
                        <Text>
                          {offender?.dateOfBirth
                            ? moment(offender?.dateOfBirth).format('DD/MM/YY')
                            : intl.formatMessage({
                                defaultMessage: 'Unknown',
                                id: '5jeq8P',
                              })}
                        </Text>
                      </div>
                      <Checkbox
                        checked={selected.dateOfBirth === offender.id}
                        onChange={() => toggleSelected(offender, 'dateOfBirth')}
                      />
                    </div>
                    <Divider style={{ margin: 0 }} />
                    <div className={classes.field}>
                      <div className={classes.text}>
                        <Text>
                          {getAge(
                            offender.dateSource ||
                              intl.formatMessage({
                                defaultMessage: 'None',
                                id: '450Fty',
                              })
                          )}
                        </Text>
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
                        <Text>
                          {offender.hair ||
                            intl.formatMessage({
                              defaultMessage: 'None',
                              id: '450Fty',
                            })}
                        </Text>
                      </div>
                      <Checkbox
                        checked={selected.hair === offender.id}
                        onChange={() => toggleSelected(offender, 'hair')}
                      />
                    </div>
                    <Divider style={{ margin: 0 }} />
                    <div className={classes.field}>
                      <div className={classes.text}>
                        <Text>
                          {offender.peculiarities ||
                            intl.formatMessage({
                              defaultMessage: 'None',
                              id: '450Fty',
                            })}
                        </Text>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
              <Col className={classes.addContainer}>
                <Button onClick={toggleAddOffender} type="primary">
                  {intl.formatMessage({
                    defaultMessage: 'Add Offender',
                    id: 'm3ChN4',
                  })}
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row align="middle" className={classes.headerRow}>
              <Col flex={1}>
                <Title className={classes.cardTitle} level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Preview',
                    id: 'TJo5E6',
                  })}
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
                          <WatermarkImage
                            url={image.optimised}
                            rotation={image.rotation}
                            position={image.position}
                          />
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
                <Text>
                  {preview?.dateOfBirth
                    ? moment(preview.dateOfBirth).format('DD/MM/YYYY')
                    : intl.formatMessage({
                        defaultMessage: 'Unknown',
                        id: '5jeq8P',
                      })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.field}>
                <Text>
                  {getAge(
                    preview.dateSource ||
                      intl.formatMessage({
                        defaultMessage: 'None',
                        id: '450Fty',
                      })
                  )}
                </Text>
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
                <Text>
                  {preview.hair ||
                    intl.formatMessage({
                      defaultMessage: 'None',
                      id: '450Fty',
                    })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.field}>
                <Text>
                  {preview.peculiarities ||
                    intl.formatMessage({
                      defaultMessage: 'None',
                      id: '450Fty',
                    })}
                </Text>
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
        title={intl.formatMessage({
          defaultMessage: 'Add Offender',
          id: 'm3ChN4',
        })}
        open={addOffender}
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
