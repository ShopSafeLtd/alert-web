import React from 'react';
import type { ListVehiclesQuery } from 'graphql/generated';
import { Col, Pagination, Row, Skeleton, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl'; // Import the useIntl hook
import WatermarkImage from 'components/images/WatermarkImage.view';
import SideList from 'components/side-list/SideList.view';
import SideListItem from 'components/side-list/SideListItem.view';
import useStyles from './VehicleSideListList.styles';

const { Text, Paragraph } = Typography;

interface Props {
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  onPaginationChange: (page: number, pageSize: number) => void;
  to?: string;
  pagination: {
    page: number;
    pageSize: number;
  };
}

const VehicleSideList = ({
  data,
  loading,
  current,
  onPaginationChange,
  to,
  pagination,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl(); // Use the useIntl hook to access the intl object

  return (
    <SideList>
      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: '100vh',
          }}
        >
          <Spin />
        </div>
      )}
      {data?.listVehicles?.vehicles.map((vehicle) => (
        <Link
          to={`${to || '/app/vehicles/view/'}${vehicle.id}`}
          key={vehicle.id}
        >
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
                      id: '377fsC',
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
      ))}
      {!loading && (
        <Pagination
          total={data?.listVehicles?.total}
          size="small"
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSize={pagination.pageSize}
          current={pagination.page}
          hideOnSinglePage
        />
      )}
    </SideList>
  );
};

export default VehicleSideList;
