/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { Theme } from 'configs/ThemeConfig';
import type { Age, Build, Gender, ImagePosition, Race } from 'graphql/types';
import type { OffenderData } from 'types/DataType';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { faEdit, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Skeleton, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import {
  getOffenderAge,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

const useStyles = createUseStyles((theme: Theme) => ({
  actionRow: {
    bottom: 10,
    position: 'absolute',
    right: 5,
  },
  hoverFadeSection: {
    overflow: 'none',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 2,
    transition: 'all 1.4s ease',
  },
  hoverImage: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderBottom: `1px solid ${theme.borderColor}`,
    borderBottomRightRadius: 5,
    borderRight: `1px solid ${theme.borderColor}`,
    borderTopLeftRadius: 10,
    height: 180,
    opacity: 0.8,
    overflow: 'hidden',
    width: '100%',
  },
  hoverImageSkeleton: {
    '&.ant-skeleton-element .ant-skeleton-image': {
      '& .ant-skeleton-image-svg': {
        width: 35,
      },
      height: 120,
      width: 120,
    },
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 10,
    height: '100% !important',
    width: '100% !important',
  },
  hoverSection: {
    height: '48%',
    marginBottom: 15,
  },
  image: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    height: 120,
    opacity: 0.8,
    overflow: 'hidden',
    width: '100%',
  },
  imageSkeleton: {
    '&.ant-skeleton-element .ant-skeleton-image': {
      '& .ant-skeleton-image-svg': {
        width: 35,
      },
      height: 120,
      width: 120,
    },
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    height: '120px !important',
    width: '100% !important',
  },
  noWrap: { whiteSpace: 'nowrap' },
  offenderCard: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    cursor: 'pointer',
    height: 120,
    // backgroundColor: theme.imageBackgroundColor,
    position: 'relative',
    width: '100%',
  },
  offenderHover: {
    // backgroundColor: theme.imageBackgroundColor,
    backgroundColor: theme.componentBackground,
    borderColor: theme.borderColor,
    borderRadius: 10,
    borderStyle: 'solid',
    cursor: 'default',
    filter: `drop-shadow(0px 0px 5px ${theme.borderColor})`,
    overflow: 'hidden',
    position: 'absolute',
    transition: 'all .3s ease',
    width: 500,
    zIndex: 10,
  },
  offenderOverlayContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 1000,
  },
}));

interface Offender {
  age?: Age | null;
  alias?: string[];
  build?: Build | null;
  dateOfBirth?: Date | null;
  gender?: Gender | null;
  id: string;
  images?:
    | {
        id: string;
        optimised?: null | string | undefined;
        position?: ImagePosition;
        rotation?: number;
      }[]
    | null
    | undefined;
  knownFor?: string[];
  latestIncident?: {
    date: Date;
    id: string;
  } | null;
  name?: null | string;
  race?: Race | null;
  reference?: null | number;
  targetedBusinesses?:
    | {
        id: string;
        name: string;
      }[]
    | null;
  targetedGoods?: string[];
  totalIncidents: number;
  totalValue: number;
}

interface Position {
  height: number;
  width: number;
  x: number;
  y: number;
}

interface Props {
  deleteRights?: boolean;
  editRights?: boolean;
  offenders?: Offender[];
  onDeleteOffender?: (id: string) => void;
  setEditOffenderData?: (value: OffenderData | null) => void;
}

interface OffenderCardProps {
  offender: Offender;
  onOpenOffender: (value: Offender, position: Position) => void;
}

const OffenderCard = ({ offender, onOpenOffender }: OffenderCardProps) => {
  const classes = useStyles();
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  const ref = useRef<HTMLDivElement>(null);

  const onOpen = () => {
    const values = ref.current?.getBoundingClientRect();
    if (values)
      onOpenOffender(offender, {
        height: values.height,
        width: values.width,
        x: values.x,
        y: values.y,
      });
  };

  return (
    <Row className={classes.offenderCard} onClick={onOpen} ref={ref}>
      <Row style={{ width: '100%' }} wrap={false}>
        <Col span={8}>
          {offender.images && offender.images?.length > 0 ? (
            <div className={classes.image}>
              <WatermarkImage
                position={offender.images[0].position}
                url={offender.images[0].optimised}
              />
            </div>
          ) : (
            <Skeleton.Image className={classes.imageSkeleton} />
          )}
        </Col>
        <Col span={16} style={{ padding: 10 }}>
          <Row>
            <Typography.Text>{offender.name}</Typography.Text>
          </Row>
          <Row gutter={8} style={{ marginTop: 2, width: '100%' }} wrap={false}>
            <Col>
              <Typography.Text
                style={{ whiteSpace: 'nowrap' }}
                type="secondary"
              >
                {intl.formatMessage({
                  defaultMessage: 'ID:',
                  // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                })}{' '}
                {offender.reference}
              </Typography.Text>
            </Col>
            {offender.alias && offender.alias.length > 0 && (
              <Col flex={1}>
                <Typography.Text
                  ellipsis
                  style={{ width: '100%' }}
                  type="secondary"
                >
                  {intl.formatMessage({
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
                  defaultMessage: 'Loss:',
                })}
                {intl.formatNumber(offender.totalValue || 0, {
                  currency,
                  style: 'currency',
                })}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

interface OffenderOverlayProps {
  deleteRights?: boolean;
  editRights?: boolean;
  offender: Offender | null;
  onClose: () => void;
  onDeleteOffender?: (id: string) => void;
  open: boolean;
  position: Position | null;
  setEditOffenderData?: (value: OffenderData | null) => void;
}

const OffenderOverlay = ({
  deleteRights,
  editRights,
  offender,
  onClose,
  onDeleteOffender,
  open,
  position,
  setEditOffenderData,
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
          height: 0,
          width: 0,
          x: position.x - (500 - position.width),
          y: position.y,
        });
      } else {
        setPosition({
          height: 0,
          width: 0,
          x: position.x,
          y: position.y,
        });
      }
    }
  }, [position]);

  return open && offender ? (
    <div className={classes.offenderOverlayContainer} ref={ref}>
      <div
        className={classes.offenderHover}
        onMouseLeave={onClose}
        style={{
          left: overlayPosition?.x,
          position: 'absolute',
          top: overlayPosition?.y,
        }}
      >
        <Row className={classes.hoverSection} wrap={false}>
          <Col span={9}>
            {offender.images && offender.images.length > 0 ? (
              <div className={classes.hoverImage}>
                <WatermarkImage
                  position={offender.images[0].position}
                  url={offender.images[0].optimised}
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
                      className={classes.noWrap}
                      type="secondary"
                    >
                      {intl.formatMessage({
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
                        className={classes.noWrap}
                        type="secondary"
                      >
                        {intl.formatMessage({
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
                <Typography.Text className={classes.noWrap} type="secondary">
                  {intl.formatMessage({
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
                <Typography.Text className={classes.noWrap} type="secondary">
                  {intl.formatMessage({
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
                <Typography.Text className={classes.noWrap} type="secondary">
                  {intl.formatMessage({
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
          className={classes.hoverFadeSection}
          gutter={16}
          style={{ opacity: open ? 1 : 0 }}
        >
          <Col>
            <Row gutter={8} wrap={false}>
              <Col>
                <Typography.Text className={classes.noWrap} type="secondary">
                  {intl.formatMessage({
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
                <Typography.Text className={classes.noWrap} type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Loss:',
                  })}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text ellipsis>
                  {intl.formatNumber(offender.totalValue || 0, {
                    currency,
                    style: 'currency',
                  })}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={8} wrap={false}>
              <Col>
                <Typography.Text className={classes.noWrap} type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Last incident:',
                  })}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text ellipsis>
                  {offender.latestIncident
                    ? dayjs(offender.latestIncident.date).format('DD/MM/YY')
                    : intl.formatMessage({
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
                <Typography.Text className={classes.noWrap} type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Known for:',
                  })}
                </Typography.Text>
              </Col>
              <Col flex={1}>
                <Typography.Text ellipsis>
                  {offender.knownFor && offender.knownFor.length > 0
                    ? offender.knownFor.toString()
                    : intl.formatMessage({
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
                <Typography.Text className={classes.noWrap} type="secondary">
                  {intl.formatMessage({
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
              <Typography.Text className={classes.noWrap} type="secondary">
                {intl.formatMessage({
                  defaultMessage: 'Goods:',
                })}
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text ellipsis>
                {offender.targetedGoods && offender.targetedGoods.length > 0
                  ? offender.targetedGoods.toString()
                  : intl.formatMessage({
                      defaultMessage: 'Unknown',
                    })}
              </Typography.Text>
            </Col>
          </Row>
        </Row>
        <Row justify="center" style={{ marginBottom: 10, marginTop: 10 }}>
          <Col>
            <Link to={`/app/offenders/view/${offender.id}`}>
              <Button size="small" type="text">
                <FormattedMessage defaultMessage="View Offender" />
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
  deleteRights,
  editRights,
  offenders,
  onDeleteOffender,
  setEditOffenderData,
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
        deleteRights={deleteRights}
        editRights={editRights}
        offender={offender}
        onClose={onCloseOffender}
        onDeleteOffender={onDeleteOffender}
        open={overlayOpen}
        position={position}
        setEditOffenderData={setEditOffenderData}
      />
      <Row gutter={[16, 16]} ref={rowRef}>
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
              <FormattedMessage defaultMessage="Show All Offenders" />
            )}
            {showAll && <FormattedMessage defaultMessage="Minimise Offender" />}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default OffenderGrid;
