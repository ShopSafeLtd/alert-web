import React, { useState } from 'react';
import { Card, Col, Modal, Row, Tag, Typography } from 'antd';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    padding: '10px 20px',
  },
  thumbnail: { maxWidth: 400 },
  titleSection: {
    padding: '15px 15px 10px',
    borderBottom: `1px solid ${theme.borderColor}`,
  },
  title: {
    marginBottom: '0px !important',
  },
  thumbnailRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  tagRow: {
    padding: 10,
    borderTop: `1px solid ${theme.borderColor}`,
  },
}));

const ListVideos = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  return (
    <Row className={classes.page} gutter={16}>
      <Col>
        <Card
          bodyStyle={{
            padding: 0,
            borderRadius: 10,
            overflow: 'hidden',
            maxWidth: 400,
          }}
        >
          <div className={classes.titleSection}>
            <Typography.Title className={classes.title} level={4}>
              Alert Overview
            </Typography.Title>
            <Typography.Text className={classes.title}>
              This short video explains the core functionality of alert and how
              get around the app.
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
              className={classes.thumbnail}
              src="https://cdn.loom.com/sessions/thumbnails/5f30c94d68a5464c9fa2a1f51edc418a-with-play.gif"
              alt="thumbnail"
            />
          </Row>
          <Row className={classes.tagRow}>
            <Col>
              <Tag>Getting Started</Tag>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Card
          bodyStyle={{
            padding: 0,
            borderRadius: 10,
            overflow: 'hidden',
            maxWidth: 400,
          }}
        >
          <div className={classes.titleSection}>
            <Typography.Title className={classes.title} level={4}>
              How to add an incident
            </Typography.Title>
            <Typography.Text className={classes.title}>
              An overview of the incident form and how to add your first
              incident to alert.
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
              className={classes.thumbnail}
              src="https://cdn.loom.com/sessions/thumbnails/4112c7ef431b4d19814164fc15754408-with-play.gif"
              alt="thumbnail"
            />
          </Row>
          <Row className={classes.tagRow} gutter={8}>
            <Col>
              <Tag>Getting Started</Tag>
            </Col>
            <Col>
              <Tag>Incidents</Tag>
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
        width="70%"
        open={modalOpen !== null}
        onCancel={() => setModalOpen(null)}
        onOk={() => setModalOpen(null)}
      >
        <div
          style={{
            position: 'relative',
            paddingBottom: '64.98194945848375%',
            height: 0,
          }}
        >
          <iframe
            title="Video Modal"
            src={modalOpen || ''}
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </Modal>
    </Row>
  );
};

export default ListVideos;
