import React from 'react';
import { Col, Button, Row, Typography } from 'antd';
import { IoLocationOutline } from 'react-icons/io5';
import moment from 'moment-timezone';

import { CardEmptyContent } from 'components/shared-components/Card';

interface Props {
  incidents: any[];
  onClick: () => void;
}

/**
 *
 * @param props - {@link Props}
 * @param props.Incidents - offender incidents array returned from database query
 * @param props.onClick - function to call when the section is clicked
 * @returns JSX.Element representing the incidents section of an offender card
 *
 * @description Displays the last two items in the incidents array, with an indication of how many additonal incidents the offender has. Will display an empty content message if the incidents array is empty.
 */
const Incidents: React.FC<Props> = ({ incidents, onClick }) => {
  const itemsToRender = new Array(2);
  incidents.forEach((el, i) => {
    itemsToRender.unshift(
      <Row key={el.subject || el.date}>
        <Col span={24}>
          {i !== incidents.length - 1 ? (
            <Row>
              <div className="spacer" />
            </Row>
          ) : null}
          <Typography.Title ellipsis level={4}>
            {el.subject || 'Incident'}
          </Typography.Title>
          <Row>
            <Typography.Text className="date-time" type="secondary">
              {moment.tz(el.date, 'Europe/London').format('DD/MM/YYYY - HH:mm')}
            </Typography.Text>
          </Row>
          <Row align="middle" wrap={false} className="location">
            <div className="icon">
              <IoLocationOutline color="#de4436" size={13} />
            </div>
            <Typography.Text ellipsis type="secondary">
              {el.location.full}
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    );
    itemsToRender.pop();
  });

  const moreIncidents = incidents.length - 2;
  const viewMore = `View ${moreIncidents} more incident${
    moreIncidents > 1 ? 's' : ''
  }`;
  const viewDetails = `View more details`;
  return (
    <>
      {incidents.length > 0 ? (
        <div onClick={onClick} key="0" className="offender-tab-pane-content">
          {itemsToRender}
          {incidents.length > 0 && (
            <Row justify="center">
              <Button onClick={onClick} type="text">
                {moreIncidents > 0 ? viewMore : viewDetails}
              </Button>
            </Row>
          )}
        </div>
      ) : (
        <CardEmptyContent text="No one has added this offender to an incident yet." />
      )}
    </>
  );
};

export default Incidents;
