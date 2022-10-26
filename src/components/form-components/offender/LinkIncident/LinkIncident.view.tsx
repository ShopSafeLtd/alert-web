/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { ListIncidentsQuery } from 'graphql/generated';
import {
  Typography,
  Row,
  Col,
  Descriptions,
  Button,
  Input,
  Skeleton,
  Pagination,
  Tag,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faLocationDot,
  faUser,
} from '@fortawesome/pro-light-svg-icons';

// import { SRLWrapper } from 'simple-react-lightbox';
import IncidentTile from 'components/incidents/IncidentTile';

const { Title, Paragraph } = Typography;

interface Props {
  onClose: () => void;
  onSubmit: (value: string | undefined) => void;
  saving: boolean;
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  openLightbox: (index: number) => void;
  setCurrentId: (value: string | undefined) => void;
  selectedIncident:
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents'][0]
    | null
    | undefined;
}

const LinkIncident = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
  search,
  setSearch,
  openLightbox,
  onPaginationChange,
  setCurrentId,
  selectedIncident,
}: Props): JSX.Element => (
  <div className="add-existing-offender">
    <Row gutter={8} className="search-offender">
      <Col span={18}>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Incidents..."
          allowClear
        />
      </Col>
    </Row>

    <Row className="add-existing-offender-row">
      <Col
        span={selectedIncident !== null ? 10 : 24}
        className="offenders-side-list"
      >
        {!data && loading ? (
          <Skeleton />
        ) : (
          <Row wrap gutter={16}>
            {data?.listIncidents?.incidents.map((incident) => (
              <Col
                span={selectedIncident !== null ? 12 : 4}
                key={incident.id}
                className="offender-item"
              >
                <IncidentTile
                  incident={incident}
                  onClick={() => setCurrentId(incident.id)}
                />
              </Col>
            ))}
          </Row>
        )}

        <Pagination
          total={data?.listIncidents?.total}
          size="small"
          showSizeChanger={false}
          onChange={onPaginationChange}
          pageSize={24}
        />
      </Col>
      {selectedIncident && (
        <Col span={14} className="view-offender">
          {selectedIncident && selectedIncident.images.length > 0 && (
            <Row
              gutter={8}
              justify="start"
              align="middle"
              wrap={false}
              className="offender-images"
            >
              {selectedIncident?.images.map((image, i) => (
                <Col key={image.id}>
                  <div
                    onClick={() => openLightbox(i)}
                    className="offender-image"
                    style={{ backgroundImage: `url(${image.optimised})` }}
                  />
                </Col>
              ))}
            </Row>
          )}

          <Row>
            <Col span={24} style={{ margin: 10 }}>
              <Title level={4}>{selectedIncident?.subject}</Title>
              <Row className="incident-tags">
                {selectedIncident?.crimeTypes.map((crimeType) => (
                  <Col key={crimeType.id}>
                    <Tag color="red">{crimeType.name}</Tag>
                  </Col>
                ))}
              </Row>{' '}
              <Paragraph type="secondary" style={{ marginTop: 10 }}>
                {selectedIncident?.description}
              </Paragraph>
              <Descriptions column={1} className="offender-descriptions">
                <Descriptions.Item
                  label={
                    <span>
                      <FontAwesomeIcon
                        className="offender-description-icon"
                        icon={faClock}
                      />
                      Created At
                    </span>
                  }
                >
                  {selectedIncident?.dayTime}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span>
                      <FontAwesomeIcon
                        className="offender-description-icon"
                        icon={faUser}
                      />
                      Created By
                    </span>
                  }
                >
                  {`${selectedIncident?.createdBy.fullName} -
                              ${selectedIncident?.createdBy.organisation}`}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span>
                      <FontAwesomeIcon
                        className="offender-description-icon"
                        icon={faLocationDot}
                      />
                      Location
                    </span>
                  }
                >
                  {selectedIncident?.location?.full}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                onClick={() => onSubmit(selectedIncident?.id)}
              >
                Link Incident
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </Row>

    {/* <SRLWrapper
      elements={
        selectedIncident?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      }
      options={{ buttons: { showDownloadButton: false } }}
    /> */}
  </div>
);

export default LinkIncident;
