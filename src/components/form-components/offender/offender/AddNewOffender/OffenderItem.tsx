/* eslint-disable formatjs/no-literal-string-in-jsx */

import type { Theme } from 'configs/ThemeConfig';
import type { SearchOffendersQuery } from 'graphql/offenders/queries/__generated__/search-offenders.generated';

import { Col, Row, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { getAge, getBuild, getEthnicity, getSex } from 'utils';

interface Props {
  item: Exclude<
    SearchOffendersQuery['listOffenders'],
    null | undefined
  >['offenders'][0];
}

const useStyles = createUseStyles((theme: Theme) => ({
  descText: {
    fontSize: 12,
    marginBottom: 0,
  },
  image: {
    backgroundColor: theme.imageBackgroundColor,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 50,
    width: 50,
  },
  nameText: {
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
            position={item.images[0]?.position}
            url={item.images[0]?.optimised}
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
              <Typography.Text className={classes.descText} type="secondary">
                {getEthnicity(item.race)} /
              </Typography.Text>
            )}
          </Col>
          <Col>
            {item.age && (
              <Typography.Text className={classes.descText} type="secondary">
                {getAge(item.age)} /
              </Typography.Text>
            )}
          </Col>
          <Col>
            {item.build && (
              <Typography.Text className={classes.descText} type="secondary">
                {getBuild(item.build)} /
              </Typography.Text>
            )}
          </Col>
          <Col>
            {item.gender && (
              <Typography.Text className={classes.descText} type="secondary">
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
