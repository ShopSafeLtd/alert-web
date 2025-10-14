import type { Theme } from 'configs/ThemeConfig';

import { Card, Col, Modal, Row, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    padding: '10px 20px',
  },
  tagRow: {
    borderTop: `1px solid ${theme.borderColor}`,
    padding: 10,
  },
  thumbnail: { maxWidth: 400 },
  thumbnailRow: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    marginBottom: '0px !important',
  },
  titleSection: {
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: '15px 15px 10px',
  },
}));

const ListVideos = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState<null | string>(null);
  const intl = useIntl();
  return (
    <Row className={classes.page} gutter={16}>
      <Col>
        <Card
          bodyStyle={{
            borderRadius: 10,
            maxWidth: 400,
            overflow: 'hidden',
            padding: 0,
          }}
        >
          <div className={classes.titleSection}>
            <Typography.Title className={classes.title} level={4}>
              {intl.formatMessage({
                defaultMessage: 'Alert Overview',
              })}
            </Typography.Title>
            <Typography.Text className={classes.title}>
              {intl.formatMessage({
                defaultMessage:
                  ' This short video explains the core functionality of alert and how get around the app.',
              })}
            </Typography.Text>
          </div>
          <Row
            className={classes.thumbnailRow}
            onClick={() =>
              setModalOpen(
                'https://www.loom.com/embed/5f30c94d68a5464c9fa2a1f51edc418a'
              )
            }
          >
            <img
              alt={intl.formatMessage({
                defaultMessage: 'thumbnail',
              })}
              className={classes.thumbnail}
              src="https://cdn.loom.com/sessions/thumbnails/5f30c94d68a5464c9fa2a1f51edc418a-with-play.gif"
            />
          </Row>
          <Row className={classes.tagRow}>
            <Col>
              <Tag>
                {intl.formatMessage({
                  defaultMessage: 'Getting Started',
                })}
              </Tag>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card
          bodyStyle={{
            borderRadius: 10,
            maxWidth: 400,
            overflow: 'hidden',
            padding: 0,
          }}
        >
          <div className={classes.titleSection}>
            <Typography.Title className={classes.title} level={4}>
              {intl.formatMessage({
                defaultMessage: 'How to add an incident',
              })}
            </Typography.Title>
            <Typography.Text className={classes.title}>
              {intl.formatMessage({
                defaultMessage:
                  'An overview of the incident form and how to add a new incident to alert.',
              })}
            </Typography.Text>
          </div>
          <Row
            className={classes.thumbnailRow}
            onClick={() =>
              setModalOpen(
                'https://www.loom.com/embed/4112c7ef431b4d19814164fc15754408'
              )
            }
          >
            <img
              alt={intl.formatMessage({
                defaultMessage: 'thumbnail',
              })}
              className={classes.thumbnail}
              src="https://cdn.loom.com/sessions/thumbnails/4112c7ef431b4d19814164fc15754408-with-play.gif"
            />
          </Row>
          <Row className={classes.tagRow} gutter={8}>
            <Col>
              <Tag>
                {intl.formatMessage({
                  defaultMessage: 'Getting Started',
                })}
              </Tag>
            </Col>
            <Col>
              <Tag>
                {intl.formatMessage({
                  defaultMessage: 'Incidents',
                })}
              </Tag>
            </Col>
          </Row>
        </Card>
      </Col>
      {/* <Col>
        <Card bodyStyle={{ padding: 0, borderRadius: 10, overflow: 'hidden', maxWidth: 400 }}>
          <div className={classes.titleSection}>
            <Typography.Title className={classes.title} level={4}>
              How to an an offender
            </Typography.Title>
            <Typography.Text className={classes.title}>
              An overview of the offender form and how to add a new offender to alert.
            </Typography.Text>
          </div>
          <Row className={classes.thumbnailRow} onClick={() => setModalOpen("https://www.loom.com/embed/5f30c94d68a5464c9fa2a1f51edc418a")}>
            <img
              className={classes.thumbnail}
              src="https://cdn.loom.com/sessions/thumbnails/5f30c94d68a5464c9fa2a1f51edc418a-with-play.gif"
              alt="thumbnail"
            />
          </Row>
          <Row className={classes.tagRow} gutter={8}>
            <Col>
              <Tag>Getting Started</Tag>
            </Col>
            <Col>
              <Tag>Offenders</Tag>
            </Col>
          </Row>
        </Card>
      </Col> */}

      <Modal
        onCancel={() => setModalOpen(null)}
        onOk={() => setModalOpen(null)}
        open={modalOpen !== null}
        width="70%"
      >
        <div
          style={{
            height: 0,
            paddingBottom: '64.98194945848375%',
            position: 'relative',
          }}
        >
          <iframe
            allowFullScreen
            src={modalOpen || ''}
            style={{
              height: '100%',
              left: 0,
              position: 'absolute',
              top: 0,
              width: '100%',
            }}
            title={intl.formatMessage({
              defaultMessage: 'video',
            })}
          />
        </div>
      </Modal>
    </Row>
  );
};

export default ListVideos;
