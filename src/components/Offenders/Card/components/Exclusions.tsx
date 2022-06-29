/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Col, Button, Row, Typography } from 'antd';
import { IoLocationOutline } from 'react-icons/io5';
import { CardEmptyContent } from 'components/shared-components/Card';

// calculate if the ban has expired
const calcExpired = (endDate: Date) => {
  const end = new Date(endDate).valueOf();
  const now = Date.now();

  return end - now < 0;
};

interface Props {
  exclusions: any[];
  onClick: () => void;
}
/**
 *
 * @param props - {@link Props}
 * @param props.exclusions - offender exclusions array returned from database query
 * @param props.onClick - function to call when the section is clicked
 * @returns JSX.Element representing the exclusions section of an offender card
 *
 * @description Displays the last two items in the exclusions array, with an indication of how many additonal exclusions the offender has. Will display an empty content message if the exclusions array is empty.
 */
const Exclusions: React.FC<Props> = ({ exclusions, onClick }: Props) => {
  const itemsToRender = new Array(2);
  exclusions.forEach((el, i) => {
    const expired = calcExpired(new Date(el.endDate));
    itemsToRender.unshift(
      <Row key={el.title || el.startDate}>
        <Col span={24}>
          {i !== exclusions.length - 1 ? (
            <Row>
              <div className="spacer" />
            </Row>
          ) : null}
          <Typography.Title ellipsis level={4}>
            {el.title || 'Exclusion'}
          </Typography.Title>
          <Row>
            <Typography.Text>{`End: ${new Date(
              el.endDate
            ).toDateString()}`}</Typography.Text>
            {expired && (
              <Typography.Text
                type="secondary"
                className="expired"
              >- [ EXPIRED ]</Typography.Text>
            )}
          </Row>
          <Row align="middle" wrap={false} className="location">
            <div className="icon">
              <IoLocationOutline color="#de4436" size={13} />
            </div>
            <Typography.Text ellipsis type="secondary">
              {el.location}
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    );
    itemsToRender.pop();
  });

  const moreExclusions = exclusions.length - 2;
  const viewMore = `View ${moreExclusions} more exclusion${
    moreExclusions > 1 ? 's' : ''
  }`;
  const viewDetails = `View more details`;
  return (
    <>
      {exclusions.length > 0 ? (
        <div onClick={onClick} key="0" className="offender-tab-pane-content">
          {itemsToRender}
          {exclusions.length > 0 && (
            <Row justify="center">
              <Button onClick={onClick} type="text">
                {moreExclusions > 0 ? viewMore : viewDetails}
              </Button>
            </Row>
          )}
        </div>
      ) : (
        <CardEmptyContent text="No one has added an exclusion to this offender yet." />
      )}
    </>
  );
};

export default Exclusions;
