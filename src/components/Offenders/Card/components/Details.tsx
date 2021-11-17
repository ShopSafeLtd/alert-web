import React from 'react';
import { Row, Col, Typography } from 'antd';
import {
  IoAlertCircleOutline,
  IoBanOutline,
  IoLocationOutline,
} from 'react-icons/io5';
import {
  calcAge,
  getAge,
  getBuild,
  getEthnicity,
  getLastOffence,
  getSex,
} from 'utils';
import moment from 'moment-timezone';

interface Props {
  offender: any;
  onClick: () => void;
}

/**
 *
 * @param props - {@link Props}
 * @param props.offender - offender object returned from database query
 * @param props.onClick - function to call when the section is clicked
 * @returns JSX.Element representing the details section of an offender card
 */
const Details: React.FC<Props> = ({ offender, onClick }) => {
  return (
    <div
      onClick={onClick}
      key="0"
      style={{ padding: '12px 14px 14px 14px', cursor: 'pointer' }}
    >
      <Row>
        <Col span={20}>
          <Typography.Title ellipsis level={3} style={{ marginBottom: '-4px' }}>
            {offender.name}
          </Typography.Title>
          <Typography.Text
            ellipsis
            type="secondary"
            style={{ fontSize: '12px' }}
          >
            Last updated:{' '}
            {moment
              .tz(offender.updatedAt, 'Europe/London')
              .format('ddd MMM DD YYYY - HH:mm')}
          </Typography.Text>
        </Col>
        <Col span={4}>
          <Row align="middle" justify="end">
            <Typography.Text style={{ color: '#de4436' }}>
              {offender.bans.length || 0}
            </Typography.Text>
            <div style={{ marginLeft: '8px' }} />
            <IoBanOutline color="#de4436" size={24} />
          </Row>
          <Row align="middle" justify="end">
            <Typography.Text style={{ color: '#de4436' }}>
              {offender.incidents.length || 0}
            </Typography.Text>
            <div style={{ marginLeft: '8px' }} />
            <IoAlertCircleOutline color="#de4436" size={24} />
          </Row>
        </Col>
      </Row>
      <Row>
        {offender.groups.map((el: any) => (
          <div
            key={el.id}
            style={{
              borderRadius: '3px',
              paddingRight: '6px',
              marginRight: '3px',
            }}
          >
            <Typography.Text
              style={{ color: '#de4436', fontWeight: 100, fontSize: '12px' }}
            >
              {el.name}
            </Typography.Text>
          </div>
        ))}
      </Row>
      <div style={{ marginTop: '5px' }} />
      <Row>
        <Typography.Text ellipsis>
          Age:{' '}
          {offender.dateOfBirth
            ? calcAge(offender.dateOfBirth)
            : getAge(offender.age)}
        </Typography.Text>
      </Row>
      <Row>
        <Typography.Text ellipsis>
          Build: {getBuild(offender.build)}
        </Typography.Text>
      </Row>
      <Row>
        <Typography.Text ellipsis>Sex: {getSex(offender.sex)}</Typography.Text>
      </Row>
      <Row>
        <Typography.Text ellipsis>
          Ethnicity: {getEthnicity(offender.ethnicity)}
        </Typography.Text>
      </Row>
      <div style={{ marginTop: '10px' }} />
      <Row align="middle" wrap={false}>
        <IoLocationOutline color="#de4436" size={16} />
        <div style={{ marginLeft: '6px' }} />
        <Typography.Text ellipsis type="secondary" style={{ fontSize: '12px' }}>
          Last offence: {getLastOffence(offender.incidents).location}
        </Typography.Text>
      </Row>
    </div>
  );
};

export default Details;
