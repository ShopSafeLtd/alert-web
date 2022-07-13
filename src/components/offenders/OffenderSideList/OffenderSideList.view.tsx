import React from 'react';
import { ListOffendersQuery } from 'graphql/generated';
import { Row, Col, Skeleton, Typography, Divider, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/pro-light-svg-icons';
import {
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/get-offender-desc';

const { Text, Paragraph } = Typography;
interface Props {
  data: ListOffendersQuery | undefined;
  // loading: boolean;
  // eslint-disable-next-line react/require-default-props
  current?: string;
  onPaginationChange: (page: number, pageSize: number) => void;
}

const OffenderSideList = ({
  data,
  // loading,
  current,
  onPaginationChange,
}: Props): JSX.Element => (
  <div className="offenders-side-list">
    {data?.listOffenders?.offenders.map((offender) => (
      <Link to={`/app/offenders/view/${offender.id}`} key={offender.id}>
        <div
          key={offender.id}
          className={
            current === offender.id ? 'incident-item current' : 'incident-item'
          }
        >
          <Row wrap={false}>
            <Col>
              {offender.images.length > 0 ? (
                <div
                  className="offender-item-image"
                  style={{
                    backgroundImage: `url(${offender.images[0].optimised})`,
                  }}
                />
              ) : (
                <Skeleton.Image className="offender-item-image-skeleton" />
              )}
            </Col>
            <Col className="offender-item-content" flex={1}>
              <Text strong={current === offender.id} ellipsis>
                {offender.name}
              </Text>
              {/* <Paragraph
                className="offender-item-desc"
                type="secondary"
                ellipsis
              >
                Last updated:{' '}
                {moment(offender?.updatedAt || moment()).format(
                  `ddd MMM DD YYYY - HH:mm`
                )}
              </Paragraph> */}
              <Paragraph
                className="offender-item-detail"
                type="secondary"
                ellipsis
              >
                <FontAwesomeIcon
                  className="offender-item-icon"
                  icon={faClock}
                />
                Age: {getOffenderAge(offender.age)}
              </Paragraph>
              <Paragraph
                className="offender-item-detail"
                type="secondary"
                ellipsis
              >
                <FontAwesomeIcon className="offender-item-icon" icon={faUser} />
                Build:{getOffenderBuild(offender.build)}
              </Paragraph>
              <Paragraph
                className="offender-item-detail"
                type="secondary"
                ellipsis
              >
                <FontAwesomeIcon className="offender-item-icon" icon={faUser} />
                Sex: {getOffenderGender(offender.gender)}
              </Paragraph>
              <Paragraph
                className="offender-item-detail"
                type="secondary"
                ellipsis
              >
                <FontAwesomeIcon className="offender-item-icon" icon={faUser} />
                Ethnicity: {getOffenderRace(offender.race, true)}
              </Paragraph>
            </Col>
          </Row>
          <Divider className="offender-item-divider" />
        </div>
      </Link>
    ))}
    <Pagination
      total={data?.listOffenders?.total}
      size="small"
      showSizeChanger={false}
      onChange={onPaginationChange}
    />
  </div>
);

export default OffenderSideList;
