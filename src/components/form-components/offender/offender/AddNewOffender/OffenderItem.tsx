/* eslint-disable formatjs/no-literal-string-in-jsx */
import React from 'react';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import { Col, Row, Typography } from 'antd';
import { getAge, getBuild, getEthnicity, getSex } from 'utils';
import WatermarkImage from 'components/images/WatermarkImage.view';
import type { SearchOffendersQuery } from 'graphql/offenders/queries/search-offenders.generated';

interface Props {
  item: Exclude<
    SearchOffendersQuery['listOffenders'],
    undefined | null
  >['offenders'][0];
}

const useStyles = createUseStyles((theme: Theme) => ({
  image: {
    height: 50,
    width: 50,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: theme.imageBackgroundColor,
  },
  nameText: {
    marginBottom: 0,
  },
  descText: {
    fontSize: 12,
    marginBottom: 0,
  },
}));

const OffenderItem = ({ item }: Props) => {
  const classes = useStyles();

  return (
    <Row gutter={16}>
      <Col>
        <div className={classes.image}>
          <WatermarkImage
            url={item.images[0]?.optimised}
            position={item.images[0]?.position}
          />
        </div>
      </Col>
      <Col>
        <Typography.Text className={classes.nameText}>
          {item.name}
        </Typography.Text>
        <Row gutter={8}>
          <Col>
            {item.race && (
              <Typography.Text type="secondary" className={classes.descText}>
                {getEthnicity(item.race)} /
              </Typography.Text>
            )}
          </Col>
          <Col>
            {item.age && (
              <Typography.Text type="secondary" className={classes.descText}>
                {getAge(item.age)} /
              </Typography.Text>
            )}
          </Col>
          <Col>
            {item.build && (
              <Typography.Text type="secondary" className={classes.descText}>
                {getBuild(item.build)} /
              </Typography.Text>
            )}
          </Col>
          <Col>
            {item.gender && (
              <Typography.Text type="secondary" className={classes.descText}>
                {getSex(item.gender)}
              </Typography.Text>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default OffenderItem;
