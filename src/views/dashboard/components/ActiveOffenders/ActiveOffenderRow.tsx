import WatermarkImage from '#/components/images/WatermarkImage.view';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import useStyles from '#/views/dashboard/FeedItem.styles';
import useActiveOffenders from '#/views/dashboard/components/ActiveOffenders/useActiveOffenders';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Empty, Row, Skeleton, Tooltip, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Paragraph, Title } = Typography;

const ActiveOffender = () => {
  const classes = useStyles();

  const {
    getHeight,
    getWidth,
    intl,
    rowOrCol,
    variables: { search },
  } = useDashboardContext();
  const { recentOffenderData, recentOffenderLoading } = useActiveOffenders();
  const rowOrColValue = rowOrCol('activeOffender');
  const width = getWidth('activeOffender');
  const height = getHeight('activeOffender');
  return (
    <div style={{ height: '100%', margin: 0 }}>
      <Title
        level={4}
        style={{
          fontSize: 16,
          marginBottom: 10,
          marginTop: -10,
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
                  height: 'inherit',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                }
              : {
                  alignContent: 'flex-start',
                  height: 'inherit',
                  overflowY: 'auto',
                }
          }
        >
          {Array.from({ length: 28 }).map((_, index) => (
            <Col
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              span={rowOrColValue === 'col' ? 24 / width : undefined}
              style={{
                height: 'fit-content',
              }}
            >
              <Skeleton.Avatar
                active
                shape="square"
                style={{
                  borderRadius: '0.625rem',
                  height: rowOrColValue === 'row' ? height - 35 : 140,
                  width: rowOrColValue === 'row' ? height - 45 : '100%',
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
                  height: 'inherit',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                }
              : {
                  alignContent: 'flex-start',
                  height: 'inherit',
                  overflowY: 'auto',
                }
          }
        >
          {recentOffenderData?.listOffenders?.total ? (
            recentOffenderData?.listOffenders?.offenders.map((offender) => (
              <Col
                key={offender.id}
                span={rowOrColValue === 'col' ? 24 / width : undefined}
                style={{
                  height: 'fit-content',
                }}
              >
                <Tooltip
                  placement="bottom"
                  // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                  title={`${offender.name} (${offender.reference})`}
                >
                  <Link to={`/app/offenders/view/${offender.id}`}>
                    <Card
                      bodyStyle={{
                        alignItems: 'center',
                        borderRadius: 10,
                        cursor: 'pointer',
                        display: 'flex',
                        height: rowOrColValue === 'row' ? height - 35 : 140,
                        justifyContent: 'center',
                        overflow: 'hidden',
                        padding: 0,
                        position: 'relative',
                        width: rowOrColValue === 'row' ? height - 45 : '100%',
                      }}
                    >
                      {offender.feedImage && (
                        <WatermarkImage
                          position={offender.feedImage?.position}
                          url={offender.feedImage?.low}
                        />
                      )}
                      {!offender.feedImage && (
                        <FontAwesomeIcon
                          icon={faUser}
                          size="3x"
                          style={{ color: 'rgb(114, 132, 154)' }}
                        />
                      )}
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
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
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
    </div>
  );
};

export default ActiveOffender;
