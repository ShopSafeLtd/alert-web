/* eslint-disable react/require-default-props */
import React from 'react';
import { Col, Row, Typography } from 'antd';
import { IoLocationOutline } from 'react-icons/io5';

// calculate if the ban has expired
const calcExpired = (endDate: Date) => {
  const end = new Date(endDate).valueOf();
  const now = Date.now();

  return end - now < 0;
};

interface Props {
  exclusion: {
    title: string;
    startDate: string;
    endDate: string;
    location: string;
  };
  exclusionKey?: string;
  activeExclusion?: string | string[];
}
/**
 *
 * @param props - {@link Props}
 * @param props.exclusion - { title, startDate, endDate, location } info to display. Each property should be a string.
 * @returns JSX.Elements
 *
 * @description An exclusion list item displaying title, start and end date, and the location of the exclusion.
 */
const Exclusion: React.FC<Props> = ({
  exclusion,
  activeExclusion,
  exclusionKey,
}: Props) => {
  const { title, startDate, endDate, location } = exclusion;
  const expired = calcExpired(new Date(endDate));
  const active = activeExclusion?.includes(exclusionKey || ' ');

  return (
    <Row className="exclusion-list-item" key={title || startDate}>
      <Col flex="1">
        <Typography.Title className="exclusion-title" ellipsis level={4}>
          {title || 'Exclusion'}
        </Typography.Title>
        <Row>
          <Typography.Text>{`End: ${new Date(
            endDate
          ).toDateString()}`}</Typography.Text>
          {expired && (
            <Typography.Text type="secondary" className="expired">
              - [ EXPIRED ]
            </Typography.Text>
          )}
        </Row>
        <Row align="top" wrap={false} className="location">
          <div className="icon-container">
            <IoLocationOutline color="#de4436" size={13} />
          </div>
          <Typography.Text ellipsis={!active} type="secondary">
            {location}
          </Typography.Text>
        </Row>
      </Col>
    </Row>
  );
};
export default Exclusion;
