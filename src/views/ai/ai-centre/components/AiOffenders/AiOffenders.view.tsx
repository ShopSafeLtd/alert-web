import type { Theme } from '#/configs/ThemeConfig';
import type { AiOffendersQuery } from '#/views/ai/ai-centre/components/AiOffenders/__generated__/AiOffenders.generated';

import WatermarkImage from '#/components/images/WatermarkImage.view';
import { useStoreState } from '#/state';
import { useAiOffendersQuery } from '#/views/ai/ai-centre/components/AiOffenders/__generated__/AiOffenders.generated';
import { Button, Col, Row, Typography } from 'antd';
import { SortOrder } from 'graphql/types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    backgroundColor: theme.imageBackgroundColor,
    borderRadius: 10,
    height: 250,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  cardName: {
    alignItems: 'center',
    bottom: 6,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 99,
  },
  nameCard: {
    backgroundColor: theme.componentBackground,
    borderRadius: 100,
    padding: 10,
  },
}));

interface Props {
  data: AiOffendersQuery['listOffendersRelay']['edges'][number]['node'];
}

const AiOffender = ({ data }: Props) => {
  const styles = useStyles();

  return (
    <Link to={`/app/offenders/view/${data.id}`}>
      <div className={styles.card}>
        {data.images.at(0)?.url && (
          <WatermarkImage
            style={{ height: 250, width: '100%' }}
            url={data.images.at(0)?.url}
          />
        )}
        <div className={styles.cardName}>
          <div className={styles.nameCard}>
            <Typography.Text>{data.name}</Typography.Text>
          </div>
        </div>
      </div>
    </Link>
  );
};

const AiOffenders = () => {
  const currentScheme = useStoreState((state) => state.scheme.id);

  const { data } = useAiOffendersQuery({
    variables: {
      first: 6,
      order: {
        aiImpactScore: SortOrder.Desc,
      },
      scheme: {
        id: currentScheme,
      },
      where: {},
    },
  });
  return (
    <>
      <Row align="middle" style={{ marginBottom: 0, marginTop: 20 }}>
        <Col flex={1}>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            <FormattedMessage defaultMessage="Identfied High Impact Offenders" />
          </Typography.Title>
        </Col>
        <Col>
          <Button type="text">
            <FormattedMessage defaultMessage="View All Offenders" />
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 20, width: '100%' }}>
        {data?.listOffendersRelay.edges.map((offender) => (
          <Col key={offender.node.id} span={8}>
            <AiOffender data={offender.node} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AiOffenders;
