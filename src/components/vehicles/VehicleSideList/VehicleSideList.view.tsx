import React from 'react';
import { Col, Row, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl'; // Import the useIntl hook
import WatermarkImage from 'components/images/WatermarkImage.view';
import SideListItem from 'components/side-list/SideListItem.view';
import InfiniteSideScrollList from 'components/side-list/InfiniteSideList';
import useStyles from './VehicleSideListList.styles';
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/list-vehicles.generated';

const { Text, Paragraph } = Typography;

interface Props {
  data:
    | Exclude<ListVehiclesQuery['listVehicles'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  next: () => void;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  to?: string;
}

const VehicleSideList = ({
  data,
  loading,
  current,
  next,
  to,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl(); // Use the useIntl hook to access the intl object
  const isLoading = loading && !data?.total;
  const items = data?.vehicles.map((vehicle) => (
    <Link to={`${to || '/app/vehicles/view/'}${vehicle.id}`} key={vehicle.id}>
      <SideListItem current={current === vehicle.id}>
        <Row wrap={false}>
          <Col>
            {vehicle.images.length > 0 ? (
              <div className={classes.image}>
                <WatermarkImage
                  url={vehicle.images[0].optimised}
                  position={vehicle.images[0].position}
                />
              </div>
            ) : (
              <Skeleton.Image className={classes.imageSkeleton} />
            )}
          </Col>
          <Col className={classes.content} flex={1}>
            <Text
              className={classes.name}
              strong={current === vehicle.id}
              ellipsis
            >
              {vehicle.registration}
            </Text>
            <Paragraph
              className={classes.reference}
              strong={current === vehicle.id}
              ellipsis
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
      next={next}
      hasMore={(data?.vehicles?.length || 0) < (data?.total || 0)}
      isLoading={isLoading}
      items={items}
    />
  );
};

export default VehicleSideList;
