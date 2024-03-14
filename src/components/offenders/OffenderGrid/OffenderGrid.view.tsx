/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Row, Skeleton, Typography } from 'antd';
import { createUseStyles } from 'react-jss';
import {
  getOffenderAge,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import type {
  Age,
  Build,
  Gender,
  ImagePosition,
  Race,
} from 'graphql/generated';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { FormattedMessage, useIntl } from 'react-intl';
import type { OffenderData } from 'types/DataType';
import type { Theme } from 'configs/ThemeConfig';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/pro-light-svg-icons';

const useStyles = createUseStyles((theme: Theme) => ({
  offenderCard: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    cursor: 'pointer',
    // backgroundColor: theme.imageBackgroundColor,
    position: 'relative',
    width: '100%',
    height: 120,
  },
  offenderOverlayContainer: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1000,
  },
  offenderHover: {
    // backgroundColor: theme.imageBackgroundColor,
    backgroundColor: theme.componentBackground,
    borderColor: theme.borderColor,
    borderStyle: 'solid',
    position: 'absolute',
    zIndex: 10,
    borderRadius: 10,
    transition: 'all .3s ease',
    filter: `drop-shadow(0px 0px 5px ${theme.borderColor})`,
    overflow: 'hidden',
    cursor: 'default',
    width: 500,
  },
  image: {
    height: 120,
    width: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.8,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  imageSkeleton: {
    height: '120px !important',
    width: '100% !important',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    '&.ant-skeleton-element .ant-skeleton-image': {
      height: 120,
      width: 120,
      '& .ant-skeleton-image-svg': {
        width: 35,
      },
    },
  },
  hoverImage: {
    height: 180,
    width: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.8,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 5,
    borderBottom: `1px solid ${theme.borderColor}`,
    borderRight: `1px solid ${theme.borderColor}`,
    overflow: 'hidden',
  },
  hoverImageSkeleton: {
    height: '100% !important',
    width: '100% !important',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 5,
    '&.ant-skeleton-element .ant-skeleton-image': {
      height: 120,
      width: 120,
      '& .ant-skeleton-image-svg': {
        width: 35,
      },
    },
  },
  hoverSection: {
    height: '48%',
    marginBottom: 15,
  },
  hoverFadeSection: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 2,
    transition: 'all 1.4s ease',
    overflow: 'none',
  },
  noWrap: { whiteSpace: 'nowrap' },
  actionRow: {
    position: 'absolute',
    bottom: 10,
    right: 5,
  },
}));

interface Offender {
  id: string;
  reference?: number | null;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  alias?: string[];
  totalIncidents: number;
  totalValue: number;
  targetedBusinesses?:
    | {
        id: string;
        name: string;
      }[]
    | null;
  targetedGoods?: string[];
  knownFor?: string[];
  latestIncident?: {
    id: string;
    date: Date;
  } | null;
  images?:
    | {
        id: string;
        optimised?: string | null | undefined;
        position?: ImagePosition;
        rotation?: number;
      }[]
    | null
    | undefined;
}

interface Position {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface Props {
  offenders?: Offender[];
  setEditOffenderData?: (value: OffenderData | null) => void;
  onDeleteOffender?: (id: string) => void;
  editRights?: boolean;
  deleteRights?: boolean;
}

interface OffenderCardProps {
  offender: Offender;
  onOpenOffender: (value: Offender, position: Position) => void;
}

const OffenderCard = ({ offender, onOpenOffender }: OffenderCardProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const ref = useRef<HTMLDivElement>(null);

  const onOpen = () => {
    const values = ref.current?.getBoundingClientRect();
    if (values)
      onOpenOffender(offender, {
        width: values.width,
        height: values.height,
        x: values.x,
        y: values.y,
      });
  };

  return (
    <Row ref={ref} className={classes.offenderCard} onClick={onOpen}>
      <Row wrap={false} style={{ width: '100%' }}>
        <Col span={8}>
          {offender.images && offender.images?.length > 0 ? (
            <div className={classes.image}>
              <WatermarkImage
                url={offender.images[0].optimised}
                position={offender.images[0].position}
              />
            </div>
          ) : (
            <Skeleton.Image className={classes.imageSkeleton} />
          )}
        </Col>
        <Col style={{ padding: 10 }} span={16}>
          <Row>
            <Typography.Text>{offender.name}</Typography.Text>
          </Row>
          <Row gutter={8} wrap={false} style={{ width: '100%', marginTop: 2 }}>
            <Col>
              <Typography.Text
                type="secondary"
                style={{ whiteSpace: 'nowrap' }}
              >
                {intl.formatMessage({
                  id: 'tmcdrp',
                  defaultMessage: 'ID:',
                  // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                })}{' '}
                {offender.reference}
              </Typography.Text>
            </Col>
            {offender.alias && offender.alias.length > 0 && (
              <Col flex={1}>
                <Typography.Text
                  type="secondary"
                  ellipsis
                  style={{ width: '100%' }}
                >
                  {intl.formatMessage({
                    id: 'rv0Kg7',
                    defaultMessage: 'Alias:',
                    // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                  })}{' '}
                  {offender.alias.toString()}
                </Typography.Text>
              </Col>
            )}
          </Row>
          <Row gutter={8} style={{ marginTop: 2 }}>
            <Col>
              <Typography.Text type="secondary">
                {intl.formatMessage({
                  id: '+nRUf9',
                  defaultMessage: 'Incidents:',
                  // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                })}{' '}
                {offender.totalIncidents}
              </Typography.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Typography.Text type="secondary">
                {intl.formatMessage({
                  id: 'Mhp3U/',
                  defaultMessage: 'Loss:',
                })}
                {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                {'  £'}
                {offender.totalValue.toLocaleString()}
              </Typography.Text>
            </Col>
          </Row>
          {/* <Row style={{ marginTop: 2 }}> */}
          {/*  <Col> */}
          {/*    <Typography.Text type="secondary"> */}
          {/*      {intl.formatMessage({ */}
          {/*        id: 'vE+Slq', */}
          {/*        defaultMessage: 'Last incident:', */}
          {/*        // eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
          {/*      })}{' '} */}
          {/*      {offender.latestIncident */}
          {/*        ? moment(offender.latestIncident.date).format('DD/MM/YY') */}
          {/*        : intl.formatMessage({ */}
          {/*            id: 'q5Op6V', */}
          {/*            defaultMessage: 'none', */}
          {/*            // eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
          {/*          })} */}
          {/*    </Typography.Text> */}
          {/*  </Col> */}
          {/* </Row> */}
        </Col>
      </Row>
    </Row>
  );
};

interface OffenderOverlayProps {
  offender: Offender | null;
  open: boolean;
  onClose: () => void;
  position: Position | null;
  setEditOffenderData?: (value: OffenderData | null) => void;
  onDeleteOffender?: (id: string) => void;
  editRights?: boolean;
  deleteRights?: boolean;
}

const OffenderOverlay = ({
  offender,
  open,
  onClose,
  position,
  onDeleteOffender,
  setEditOffenderData,
  deleteRights,
  editRights,
}: OffenderOverlayProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const intl = useIntl();

  const [overlayPosition, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    const boundingBox = ref.current?.getBoundingClientRect();
    if (position && boundingBox) {
      const overlayEdge = position.x + 500;

      if (overlayEdge > boundingBox.width) {
        setPosition({
          width: 0,
          x: position.x - (500 - position.width),
          y: position.y,
          height: 0,
        });
      } else {
        setPosition({
          width: 0,
          x: position.x,
          y: position.y,
          height: 0,
        });
      }
    }
  }, [position]);

  return open && offender ? (
    <div ref={ref} className={classes.offenderOverlayContainer}>
      <div
        className={classes.offenderHover}
        onMouseLeave={onClose}
        style={{
          position: 'absolute',
          top: overlayPosition?.y,
          left: overlayPosition?.x,
        }}
      >
        <Row className={classes.hoverSection} wrap={false}>
          <Col span={9}>
            {offender.images && offender.images.length > 0 ? (
              <div className={classes.hoverImage}>
                <WatermarkImage
                  url={offender.images[0].optimised}
                  position={offender.images[0].position}
                />
              </div>
            ) : (
              <Skeleton.Image className={classes.hoverImageSkeleton} />
            )}
          </Col>
          <Col style={{ padding: '15px 20px' }}>
            <Row>
              <Typography.Text strong>{offender.name}</Typography.Text>
            </Row>
            <Row gutter={16}>
              <Col>
                <Row gutter={8} wrap={false}>
                  <Col>
                    <Typography.Text
                      type="secondary"
                      className={classes.noWrap}
                    >
                      {intl.formatMessage({
                        id: 'tmcdrp',
                        defaultMessage: 'ID:',
                      })}
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text ellipsis>
                      {offender.reference}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              {offender.alias && offender.alias.length > 0 && (
                <Col>
                  <Row gutter={8} wrap={false}>
                    <Col>
                      <Typography.Text
                        type="secondary"
                        className={classes.noWrap}
                      >
                        {intl.formatMessage({
                          id: 'rv0Kg7',
                          defaultMessage: 'Alias:',
                        })}
                      </Typography.Text>
                    </Col>
                    <Col>
                      <Typography.Text ellipsis>
                        {offender.alias.toString()}
                      </Typography.Text>
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
            <Row gutter={8} wrap={false}>
              <Col>
                <Typography.Text type="secondary" className={classes.noWrap}>
                  {intl.formatMessage({
                    id: 'rcVDrK',
                    defaultMessage: 'Gender:',
                  })}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text ellipsis>
                  {getOffenderGender(offender.gender)}
                </Typography.Text>
              </Col>
            </Row>
            <Row gutter={8} wrap={false}>
              <Col>
                <Typography.Text type="secondary" className={classes.noWrap}>
                  {intl.formatMessage({
                    id: 'JzYph5',
                    defaultMessage: 'Ethnicity:',
                  })}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text ellipsis>
                  {getOffenderRace(offender.race)}
                </Typography.Text>
              </Col>
            </Row>
            <Row gutter={8} wrap={false}>
              <Col>
                <Typography.Text type="secondary" className={classes.noWrap}>
                  {intl.formatMessage({
                    id: 'S9GJ93',
                    defaultMessage: 'Age:',
                  })}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text ellipsis>
                  {getOffenderAge(offender.age)}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          gutter={16}
          className={classes.hoverFadeSection}
          style={{ opacity: open ? 1 : 0 }}
        >
          <Col>
            <Row gutter={8} wrap={false}>
              <Col>
                <Typography.Text type="secondary" className={classes.noWrap}>
                  {intl.formatMessage({
                    id: '+nRUf9',
                    defaultMessage: 'Incidents:',
                  })}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text ellipsis>
                  {offender.totalIncidents}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={8} wrap={false}>
              <Col>
                <Typography.Text type="secondary" className={classes.noWrap}>
                  {intl.formatMessage({
                    id: 'Mhp3U/',
                    defaultMessage: 'Loss:',
                  })}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text ellipsis>
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  {'  £'}
                  {offender.totalValue.toLocaleString()}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={8} wrap={false}>
              <Col>
                <Typography.Text type="secondary" className={classes.noWrap}>
                  {intl.formatMessage({
                    id: 'vE+Slq',
                    defaultMessage: 'Last incident:',
                  })}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text ellipsis>
                  {offender.latestIncident
                    ? moment(offender.latestIncident.date).format('DD/MM/YY')
                    : intl.formatMessage({
                        id: 'q5Op6V',
                        defaultMessage: 'none',
                        // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                      })}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          className={classes.hoverFadeSection}
          style={{ opacity: open ? 1 : 0 }}
        >
          <Col>
            <Row gutter={8} wrap={false}>
              <Col>
                <Typography.Text type="secondary" className={classes.noWrap}>
                  {intl.formatMessage({
                    id: 'MwW671',
                    defaultMessage: 'Known for:',
                  })}
                </Typography.Text>
              </Col>
              <Col flex={1}>
                <Typography.Text ellipsis>
                  {offender.knownFor && offender.knownFor.length > 0
                    ? offender.knownFor.toString()
                    : intl.formatMessage({
                        id: '5jeq8P',
                        defaultMessage: 'Unknown',
                      })}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          className={classes.hoverFadeSection}
          style={{ opacity: open ? 1 : 0 }}
        >
          <Col>
            <Row gutter={8} wrap={false}>
              <Col>
                <Typography.Text type="secondary" className={classes.noWrap}>
                  {intl.formatMessage({
                    id: '1x5wk1',
                    defaultMessage: 'Businesses:',
                  })}
                </Typography.Text>
              </Col>
              <Col flex={1}>
                <Typography.Text ellipsis>
                  {offender.targetedBusinesses
                    ?.map((item) => item.name)
                    .toString()}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          className={classes.hoverFadeSection}
          style={{ opacity: open ? 1 : 0 }}
        >
          <Row gutter={8} wrap={false}>
            <Col>
              <Typography.Text type="secondary" className={classes.noWrap}>
                {intl.formatMessage({
                  id: '6WIx8l',
                  defaultMessage: 'Goods:',
                })}
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text ellipsis>
                {offender.targetedGoods && offender.targetedGoods.length > 0
                  ? offender.targetedGoods.toString()
                  : intl.formatMessage({
                      id: '5jeq8P',
                      defaultMessage: 'Unknown',
                    })}
              </Typography.Text>
            </Col>
          </Row>
        </Row>
        <Row justify="center" style={{ marginTop: 10, marginBottom: 10 }}>
          <Col>
            <Link to={`/app/offenders/view/${offender.id}`}>
              <Button size="small" type="text">
                <FormattedMessage id="GszQTo" defaultMessage="View Offender" />
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className={classes.actionRow} gutter={8}>
          {editRights && (
            <Col>
              <Button
                onClick={() =>
                  setEditOffenderData && setEditOffenderData(offender)
                }
                size="small"
                type="text"
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Col>
          )}
          {deleteRights && (
            <Col>
              <Button
                onClick={() =>
                  onDeleteOffender && onDeleteOffender(offender.id)
                }
                size="small"
                type="text"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Col>
          )}
        </Row>
      </div>
    </div>
  ) : (
    <div />
  );
};

const OffenderGrid = ({
  offenders,
  setEditOffenderData,
  onDeleteOffender,
  editRights,
  deleteRights,
}: Props): JSX.Element => {
  const rowRef = useRef<HTMLDivElement>(null);

  const [offendersData, setOffendersData] = useState<Offender[]>([]);
  const [offender, setOffender] = useState<Offender | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [columns, setColumns] = useState(6);
  const [showAll, setShowAll] = useState(false);

  const calcOffenders = (value: number) => {
    if (offenders)
      if (showAll) {
        setOffendersData(offenders);
      } else if (value === 8) {
        setOffendersData(offenders.slice(0, 15));
      } else if (value === 12) {
        setOffendersData(offenders.slice(0, 10));
      } else {
        setOffendersData(offenders.slice(0, 16));
      }
  };

  const calcColumns = () => {
    const values = rowRef.current?.getBoundingClientRect();
    if (values && values.width < 1089 && values.width >= 830) {
      setColumns(24 / 3);
    } else if (values && values.width < 830) {
      setColumns(24 / 2);
    } else {
      setColumns(24 / 4);
    }
  };

  useEffect(() => {
    const rowNode = rowRef.current;

    const rowObserver = new ResizeObserver(() => {
      calcColumns();
    });

    if (rowRef.current) {
      calcColumns();
      rowObserver.observe(rowRef.current);
    }

    return () => {
      if (rowNode) rowObserver.unobserve(rowNode);
    };
  }, []);

  useEffect(() => {
    calcOffenders(columns);
  }, [offenders, showAll, columns]);

  const onCloseOffender = () => {
    setOffender(null);
    setOverlayOpen(false);
    setPosition(null);
  };

  const onOpenOffender = (value: Offender, positionValue: Position) => {
    setOffender(value);
    setOverlayOpen(true);
    setPosition(positionValue);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <OffenderOverlay
        offender={offender}
        onClose={onCloseOffender}
        open={overlayOpen}
        position={position}
        onDeleteOffender={onDeleteOffender}
        setEditOffenderData={setEditOffenderData}
        editRights={editRights}
        deleteRights={deleteRights}
      />
      <Row ref={rowRef} gutter={[16, 16]}>
        {offendersData.map((item) => (
          <Col key={item.id} span={columns}>
            <OffenderCard offender={item} onOpenOffender={onOpenOffender} />
          </Col>
        ))}
      </Row>
      <Row justify="center" style={{ marginTop: 20 }}>
        <Col>
          <Button danger onClick={toggleShowAll}>
            {!showAll && (
              <FormattedMessage
                defaultMessage="Show All Offenders"
                id="z9JfuQ"
              />
            )}
            {showAll && (
              <FormattedMessage
                defaultMessage="Minimise Offender"
                id="/+OrNX"
              />
            )}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default OffenderGrid;
