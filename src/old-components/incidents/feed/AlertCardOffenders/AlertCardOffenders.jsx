import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { Row, Col, Typography as AntTypography } from 'antd';

const OffenderImage = styled.div`
  width: 60px;
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${({ url }) => `background-image: url(${url});`};
`;
const AlertOffenders = styled.div`
  height: 231px;
  padding: 0;
`;
const Svg = styled.svg`
  width: 26px;
  height: 26px;
`;
const Offender = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
const OffenderText = styled(Typography)`
  padding: 0 20px;
  margin: 0;
  flex: 1;
  display: flex;
  align-items: center;
`;
const OffenderAvatar = styled.div`
  background: #f5f5f5;
`;
const OffenderIcon = styled.svg`
  width: 60px;
  height: 60px;
`;
const List = styled.div`
  padding-top: 10px;
  height: 100%;
  overflow: auto;
`;

class AlertCardOffenders extends React.PureComponent {
  render() {
    const { offenders, toggleOffenderPopOver } = this.props;

    return (
      <AlertOffenders>
        {!!offenders && offenders.length > 0 ? (
          <List>
            {offenders.map((offender) => (
              <Offender
                button
                key={offender.id}
                onClick={() => toggleOffenderPopOver(offender)}
              >
                {offender.images.length > 0 ? (
                  <OffenderImage url={offender.images[0].url} />
                ) : (
                  <OffenderAvatar>
                    <OffenderIcon viewBox="0 0 24 24">
                      <path
                        fill="#E0E0E0"
                        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                      />
                    </OffenderIcon>
                  </OffenderAvatar>
                )}
                <OffenderText>{offender.name}</OffenderText>
                <Svg viewBox="0 0 24 24">
                  <path
                    fill="#EF9A9A"
                    d="M17,12L12,17V14H8V10H12V7L17,12M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12Z"
                  />
                </Svg>
              </Offender>
            ))}
          </List>
        ) : (
          <Row
            className="empty-content"
            align="middle"
            justify="center"
            gutter={[0, 65]}
          >
            <Col span={24} />
            <Col span={14}>
              <Row align="middle" justify="center">
                <AntTypography.Title level={4}>
                  There's nothing here!
                </AntTypography.Title>
                <AntTypography.Text type="secondary">
                  There are no offenders associated with this incident
                </AntTypography.Text>
              </Row>
            </Col>
            <Col span={24} />
          </Row>
        )}
      </AlertOffenders>
    );
  }
}

export default AlertCardOffenders;
