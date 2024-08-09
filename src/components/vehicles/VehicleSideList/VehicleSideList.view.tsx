import { Col, Row, Skeleton, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom'; // Import the useIntl hook
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';

import WatermarkImage from 'components/images/WatermarkImage.view';
import InfiniteSideScrollList from 'components/side-list/InfiniteSideList';
import SideListItem from 'components/side-list/SideListItem.view';

import useStyles from './VehicleSideListList.styles';

const { Paragraph, Text } = Typography;

interface Props {
  // eslint-disable-next-line react/require-default-props
  current?: string;
  data:
    | Exclude<ListVehiclesQuery['listVehicles'], null | undefined>
    | null
    | undefined;
  loading: boolean;
  next: () => void;
  to?: string;
}

const VehicleSideList = ({
  current,
  data,
  loading,
  next,
  to,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl(); // Use the useIntl hook to access the intl object
  const isLoading = loading && !data?.total;
  const items = data?.vehicles.map((vehicle) => (
    <Link key={vehicle.id} to={`${to || '/app/vehicles/view/'}${vehicle.id}`}>
      <SideListItem current={current === vehicle.id}>
        <Row wrap={false}>
          <Col>
            {vehicle.images.length > 0 ? (
              <div className={classes.image}>
                <WatermarkImage
                  position={vehicle.images[0].position}
                  url={vehicle.images[0].optimised}
                />
              </div>
            ) : (
              <Skeleton.Image className={classes.imageSkeleton} />
            )}
          </Col>
          <Col className={classes.content} flex={1}>
            <Text
              className={classes.name}
              ellipsis
              strong={current === vehicle.id}
            >
              {vehicle.registration}
            </Text>
            <Paragraph
              className={classes.reference}
              ellipsis
              strong={current === vehicle.id}
            >
              {intl.formatMessage(
                {
                  defaultMessage: 'Alert ID: {reference}',
                },
                { reference: vehicle.reference }
              )}
            </Paragraph>

            {vehicle.make && (
              <Paragraph className={classes.detail} ellipsis>
                {vehicle.make}
              </Paragraph>
            )}
            {vehicle.model && (
              <Paragraph className={classes.detail} ellipsis>
                {vehicle.model}
              </Paragraph>
            )}
            {vehicle.colour && (
              <Paragraph className={classes.detail} ellipsis>
                {vehicle.colour}
              </Paragraph>
            )}
          </Col>
        </Row>
      </SideListItem>
    </Link>
  ));
  return (
    <InfiniteSideScrollList
      dataLength={data?.vehicles?.length}
      hasMore={(data?.vehicles?.length || 0) < (data?.total || 0)}
      isLoading={isLoading}
      items={items}
      next={next}
    />
  );
};

export default VehicleSideList;
