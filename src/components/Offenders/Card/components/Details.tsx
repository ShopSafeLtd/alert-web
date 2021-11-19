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
    <div onClick={onClick} key="0" className="offender-tab-pane-content">
      <Row>
        <Col span={20} className="title">
          <Typography.Title ellipsis level={3}>
            {offender.name}
          </Typography.Title>
          <Typography.Text ellipsis type="secondary">
            Last updated:{' '}
            {moment
              .tz(offender.updatedAt, 'Europe/London')
              .format('ddd MMM DD YYYY - HH:mm')}
          </Typography.Text>
        </Col>
        <Col span={4} className="icon-container">
          <Row align="middle" justify="end">
            <Typography.Text>{offender.bans.length || 0}</Typography.Text>
            <IoBanOutline color="#de4436" size={24} />
          </Row>
          <Row align="middle" justify="end">
            <Typography.Text>{offender.incidents.length || 0}</Typography.Text>
            <IoAlertCircleOutline color="#de4436" size={24} />
          </Row>
        </Col>
      </Row>
      <Row className="offender-groups">
        {offender.groups.map((el: any) => (
          <div key={el.id} className="group">
            <Typography.Text>{el.name}</Typography.Text>
          </div>
        ))}
      </Row>
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
          Ethnicity: {getEthnicity(offender.race)}
        </Typography.Text>
      </Row>
      <Row align="middle" wrap={false} className="location margin-top">
        <div className="icon-container">
          <IoLocationOutline color="#de4436" size={16} />
        </div>
        <Typography.Text ellipsis type="secondary" className="margin">
          Last offence: {getLastOffence(offender.incidents)?.location}
        </Typography.Text>
      </Row>
    </div>
  );
};

export default Details;
