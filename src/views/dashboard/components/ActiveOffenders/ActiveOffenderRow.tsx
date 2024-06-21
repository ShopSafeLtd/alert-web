import React from 'react';
import WatermarkImage from '#/components/images/WatermarkImage.view';
import useActiveOffenders from '#/views/dashboard/components/ActiveOffenders/useActiveOffenders';
import { Card, Col, Empty, Row, Skeleton, Tooltip, Typography } from 'antd';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import useStyles from '#/views/dashboard/FeedItem.styles';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Title, Paragraph } = Typography;

const ActiveOffender = () => {
  const classes = useStyles();

  const {
    intl,
    variables: { search },
    rowOrCol,
    getWidth,
    getHeight,
  } = useDashboardContext();
  const { recentOffenderData, recentOffenderLoading } = useActiveOffenders();
  const rowOrColValue = rowOrCol('activeOffender');
  const width = getWidth('activeOffender');
  const height = getHeight('activeOffender');
  return (
    <Card
      style={{ height: '100%', margin: 0 }}
      bodyStyle={{
        height: 'calc(100%)',
      }}
    >
      <Title
        level={4}
        style={{
          fontSize: 16,
          marginTop: -10,
          marginBottom: 0,
        }}
      >
        {intl.formatMessage({
          defaultMessage: 'Recently Active Offenders',
        })}
      </Title>

      {recentOffenderLoading ? (
        <Row
          gutter={8}
          style={
            rowOrColValue === 'row'
              ? {
                  flexWrap: 'nowrap',
                  overflowX: 'auto',
                  height: 'inherit',
                  overflowY: 'hidden',
                }
              : {
                  overflowY: 'auto',
                  height: 'inherit',
                  alignContent: 'flex-start',
                }
          }
        >
          {Array.from({ length: 28 }).map((_, index) => (
            <Col
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={{
                height: 'fit-content',
              }}
              span={rowOrColValue === 'col' ? 24 / width : undefined}
            >
              <Skeleton.Avatar
                active
                shape="square"
                style={{
                  width: rowOrColValue === 'row' ? height - 45 : '100%',
                  height: rowOrColValue === 'row' ? height - 35 : 140,
                  borderRadius: '0.625rem',
                }}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Row
          gutter={8}
          style={
            rowOrColValue === 'row'
              ? {
                  flexWrap: 'nowrap',
                  overflowX: 'auto',
                  height: 'inherit',
                  overflowY: 'hidden',
                }
              : {
                  overflowY: 'auto',
                  height: 'inherit',
                  alignContent: 'flex-start',
                }
          }
        >
          {recentOffenderData?.listOffenders?.total ? (
            recentOffenderData?.listOffenders?.offenders.map((offender) => (
              <Col
                key={offender.id}
                style={{
                  height: 'fit-content',
                }}
                span={rowOrColValue === 'col' ? 24 / width : undefined}
              >
                <Tooltip
                  placement="bottom"
                  title={intl.formatMessage(
                    {
                      defaultMessage: 'View {offenderName} ',
                    },
                    { offenderName: offender.name }
                  )}
                >
                  <Link to={`/app/offenders/view/${offender.id}`}>
                    <Card
                      // onClick={() => setAddRecentOffender(offender)}
                      style={{ border: 0 }}
                      bodyStyle={{
                        width: rowOrColValue === 'row' ? height - 45 : '100%',
                        height: rowOrColValue === 'row' ? height - 35 : 140,
                        position: 'relative',
                        padding: 0,
                        borderRadius: '0.625rem',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      {offender.feedImage && (
                        <WatermarkImage
                          url={offender.feedImage?.low}
                          position={offender.feedImage?.position}
                        />
                      )}
                      {!offender.feedImage && (
                        <FontAwesomeIcon
                          style={{ color: 'rgb(114, 132, 154)' }}
                          icon={faUser}
                          size="3x"
                        />
                      )}
                      <Paragraph
                        className={classes.offenderParagraph}
                        style={{
                          top: 0,
                        }}
                      >
                        {intl.formatMessage(
                          {
                            defaultMessage: 'Alert ID: {offenderReference}',
                          },
                          { offenderReference: offender.reference }
                        )}
                      </Paragraph>
                      <Paragraph
                        className={classes.offenderParagraph}
                        style={{
                          bottom: -15,
                        }}
                      >
                        {offender.name}
                      </Paragraph>
                    </Card>
                  </Link>
                </Tooltip>
              </Col>
            ))
          ) : (
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Empty
                description={
                  search === ''
                    ? intl.formatMessage({
                        defaultMessage: 'No Offenders',
                      })
                    : intl.formatMessage({
                        defaultMessage:
                          'No offenders match your search criteria',
                      })
                }
              />
            </div>
          )}
        </Row>
      )}
    </Card>
  );
};

export default ActiveOffender;
