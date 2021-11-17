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
const Exclusions: React.FC<Props> = ({ exclusions, onClick }) => {
  console.log(exclusions);
  const itemsToRender = new Array(2);
  exclusions.forEach((el, i) => {
    const expired = calcExpired(new Date(el.endDate));
    itemsToRender.unshift(
      <Row key={el.title || el.startDate}>
        <Col span={24}>
          {i !== exclusions.length - 1 ? (
            <Row>
              <div
                style={{
                  height: '1px',
                  width: '100%',
                  backgroundColor: '#e5e5e5',
                  borderRadius: '1px',
                  margin: '5px 0',
                }}
              />
            </Row>
          ) : null}
          <Typography.Title
            ellipsis
            level={4}
            style={{ marginBottom: 0, marginTop: '4px' }}
          >
            {el.title || 'Exclusion'}
          </Typography.Title>
          <Row>
            <Typography.Text>{`End: ${new Date(
              el.endDate
            ).toDateString()}`}</Typography.Text>
            {expired && (
              <Typography.Text
                type="secondary"
                style={{ marginLeft: '4px' }}
              >{`- [ EXPIRED ]`}</Typography.Text>
            )}
          </Row>
          <Row align="middle" wrap={false} style={{ height: '18px' }}>
            <div style={{ paddingTop: '3px' }}>
              <IoLocationOutline color="#de4436" size={13} />
            </div>
            <div style={{ marginLeft: '3px' }} />
            <Typography.Text
              ellipsis
              type="secondary"
              style={{ fontSize: '12px' }}
            >
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
        <div
          onClick={onClick}
          key="0"
          style={{ padding: '12px 14px 14px 14px', cursor: 'pointer' }}
        >
          {itemsToRender}
          {exclusions.length > 0 && (
            <Row justify="center">
              <Button
                onClick={onClick}
                style={{
                  color: '#de4436',
                  height: '28px',
                  padding: '3px 12px',
                  marginTop: '14px',
                }}
                type="text"
              >
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
