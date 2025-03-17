import type { OffenderData } from '#/components/form-components/offender/AddExistingOffender/AddExistingOffender.container';
import type { ViewOffenderCompareQuery } from 'graphql/offenders/queries/__generated__/compare-offender.generated';
import type { Layout } from 'react-grid-layout';

import hasRolePermission from '#/utils/has-role-permission';
import {
  faColumns,
  faImages,
  faSave,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import AddExisitingOffender from 'components/form-components/offender/AddExistingOffender';
import WatermarkImage from 'components/images/WatermarkImage.view';
import {
  Age,
  Build,
  Gender,
  PermissionMethod,
  PermissionModel,
  Race,
} from 'graphql/types';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import GridLayout from 'react-grid-layout';
import { useIntl } from 'react-intl';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useStoreState } from 'state';
import { getAge, getBuild, getEthnicity, getSex } from 'utils';

import type { OffenderField, Selected } from './useCompareIncident';

import useStyles from './CompareOffender.styles';

const { Text, Title } = Typography;

type Offender = Exclude<ViewOffenderCompareQuery['offender'], null | undefined>;

interface Props {
  addOffender: boolean;
  addOffenders: (value: OffenderData) => void;
  mode: 'column' | 'grid';
  offenders: Offender[];
  onMerge: () => void;
  onSubmitImages: () => void;
  preview: Offender;
  removeOffender: (offender: Offender) => void;
  selected: Selected;
  selectedImages: string[];
  setMode: (value: 'column' | 'grid') => void;
  toggleAddOffender: () => void;
  toggleSelected: (offender: Offender, field: OffenderField) => void;
  toggleSelectedImages: (value: string) => void;
}

interface GridImageProps {
  image: {
    id: string;
    name?: null | string | undefined;
    offenderId: string;
    optimised?: null | string | undefined;
  };
  layout: Layout[];
  selected: boolean;
  toggleSelectedImages: (value: string) => void;
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
        bodyStyle={{ padding: 0 }}
        key={image.id}
        style={{ height: '100%', overflow: 'hidden', width: '100%' }}
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
              className={classes.gridCheck}
              onChange={() => toggleSelectedImages(image.offenderId)}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

const CompareIncident = ({
  addOffender,
  addOffenders,
  mode,
  offenders,
  onMerge,
  onSubmitImages,
  preview,
  removeOffender,
  selected,
  selectedImages,
  setMode,
  toggleAddOffender,
  toggleSelected,
  toggleSelectedImages,
}: Props) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const [layout, setLayout] = useState<Layout[]>([]);
  const intl = useIntl();
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    hasRolePermission({
      permission: {
        method: PermissionMethod.Read,
        model: PermissionModel.Offenders,
      },
    });
  return (
    <div className={classes.page} ref={pageRef}>
      <Row gutter={16} justify="end" style={{ marginBottom: 10 }}>
        <Col>
          <Button danger onClick={toggleAddOffender} type="ghost">
            {intl.formatMessage({
              defaultMessage: 'Add Offender',
            })}
          </Button>
        </Col>
        {mode === 'grid' && (
          <Col>
            <Button onClick={() => setMode('column')} type="ghost">
              {intl.formatMessage({
                defaultMessage: 'Cancel',
              })}
            </Button>
          </Col>
        )}
        <Col>
          {mode === 'column' && (
            <Button onClick={() => setMode('grid')}>
              <FontAwesomeIcon
                icon={faImages}
                size="lg"
                style={{ marginRight: 10 }}
              />
              {intl.formatMessage({
                defaultMessage: 'Image Comparison',
              })}
            </Button>
          )}
          {mode === 'grid' && (
            <Button
              disabled={selectedImages.length === 0}
              onClick={onSubmitImages}
              type="primary"
            >
              <FontAwesomeIcon
                icon={faColumns}
                size="lg"
                style={{ marginRight: 10 }}
              />
              {intl.formatMessage({
                defaultMessage: 'Select Images & Compare Fields\n',
              })}
            </Button>
          )}
        </Col>
        {mode === 'column' && (
          <Col>
            <Button onClick={onMerge} size="small" type="primary">
              <FontAwesomeIcon
                icon={faSave}
                size="lg"
                style={{ marginRight: 10 }}
              />
              {intl.formatMessage({
                defaultMessage: 'Save & Merge',
              })}
            </Button>
          </Col>
        )}
      </Row>
      {mode === 'column' && (
        <Row gutter={8} wrap={false}>
          <Col>
            <Card bodyStyle={{ padding: 0 }} className={classes.firstCard}>
              <div className={classes.imagePlaceholder} />
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Offender Name:',
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
                  })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'DoB Source:',
                  })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Sex:',
                  })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Ethnicity:',
                  })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Build:',
                  })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Hair:',
                  })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.titleField}>
                <Text strong>
                  {intl.formatMessage({
                    defaultMessage: 'Characteristics:',
                  })}
                </Text>
              </div>
            </Card>
          </Col>
          <Col flex={1}>
            <Row gutter={8} style={{ overflow: 'auto' }} wrap={false}>
              {offenders.map((offender, index) => (
                <Col key={offender.id}>
                  <Row align="middle" className={classes.headerRow}>
                    <Col flex={1}>
                      <Title className={classes.cardTitle} level={4}>
                        {intl.formatMessage(
                          {
                            defaultMessage: 'Offender {index}',
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
                          onConfirm={() => removeOffender(offender)}
                          overlayInnerStyle={{
                            padding: '12px 16px',
                          }}
                          title={intl.formatMessage({
                            defaultMessage: 'Are you sure?',
                          })}
                        >
                          <Button size="small">
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </Popconfirm>
                      </Col>
                    )}
                  </Row>
                  <Card bodyStyle={{ padding: 0 }} className={classes.card}>
                    {offender.images.length > 0 ? (
                      <Carousel>
                        {offender.images.map((image) => (
                          <div
                            className={classes.imageContainer}
                            key={image.id}
                          >
                            <TransformWrapper>
                              <TransformComponent>
                                <div className={classes.image}>
                                  <WatermarkImage
                                    position={image.position}
                                    rotation={image.rotation}
                                    url={image.optimised}
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
                  })}
                </Title>
              </Col>
            </Row>
            <Card bodyStyle={{ padding: 0 }} className={classes.card}>
              <Carousel>
                {preview.images.map((image) => (
                  <div className={classes.imageContainer} key={image.id}>
                    <TransformWrapper>
                      <TransformComponent>
                        <div className={classes.image}>
                          <WatermarkImage
                            position={image.position}
                            rotation={image.rotation}
                            url={image.optimised}
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
                    })}
                </Text>
              </div>
              <Divider style={{ margin: 0 }} />
              <div className={classes.field}>
                <Text>
                  {preview.peculiarities ||
                    intl.formatMessage({
                      defaultMessage: 'None',
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
          cols={12}
          layout={offenders
            .flatMap((offender) =>
              offender.images.map((image) => ({
                ...image,
                name: offender.name,
                offenderId: offender.id,
              }))
            )
            .map((image, index) => ({
              h: 3,
              i: image.id,
              resizeHandles: ['se'],
              w: 3,
              x: index * 3,
              y: 0,
            }))}
          onLayoutChange={(e) => {
            setLayout(e);
          }}
          onResize={(e) => {
            setLayout(e);
          }}
          onResizeStop={(e) => {
            setLayout(e);
          }}
          rowHeight={100}
          width={pageRef.current?.offsetWidth}
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
                  image={image}
                  layout={layout}
                  selected={selectedImages.includes(image.offenderId)}
                  toggleSelectedImages={toggleSelectedImages}
                />
              </div>
            ))}
        </GridLayout>
      )}
      <Drawer
        onClose={toggleAddOffender}
        open={addOffender}
        title={intl.formatMessage({
          defaultMessage: 'Add Offender',
        })}
        width="800"
        zIndex={1001}
      >
        {addOffender ? (
          <AddExisitingOffender
            offenderIds={offenders.map(({ id }) => id)}
            onClose={toggleAddOffender}
            update={addOffenders}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default CompareIncident;
