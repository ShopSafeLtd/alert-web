import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import AddSvg from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { isEqual } from 'lodash-es';

import { SubHeader, EmptyText } from '../../../../global/typography';
import { EmptySection } from '../../../../global/emptyStates';
import Grow from '../Grow/Grow';
import { Row, Section } from '../../../../global/layout';
import OffendersImage from '../../../../../images/Offenders';

const AddIcon = styled(AddSvg)`
  margin-right: 5px;
`;
const SearchIcon = styled(Search)`
  margin-right: 5px;
`;
const Offenders = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Offender = styled.div`
  border: 1px solid #eeeeee;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 200px;
  margin: 10px 10px;
  width: 98%;
  @media (min-width: 1024px) {
    width: calc(33.33% - 20px);
    height: 150px;
  }
`;
const OffenderImage = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${({ url }) => `background-image: url(${url});`};
`;

const OffenderName = styled(Typography)`
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  line-height: 30px;
  margin: 0;
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
  color: #fff;
`;

const BlankAvatar = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid #eeeeee;
  background: #f5f5f5;
  position: relative;
`;

const UserIcon = styled.svg`
  height: 100%;
  width: 100%;
`;

class EditOffenders extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.loading !== nextProps.loading) return true;
    if (!isEqual(this.props.offenders, nextProps.offenders)) return true;
    return false;
  }

  render() {
    const {
      openNewOffenders,
      openExistingOffenders,
      offenders,
      loading,
      openEditOffender
    } = this.props;

    return (
      <Section width="50%" elevation={1}>
        <Row row>
          <SubHeader>Offenders</SubHeader>
          <Grow />
          {offenders.length > 0 && (
            <Button onClick={openNewOffenders}>
              <AddIcon />
              new Offender
            </Button>
          )}
          {offenders.length > 0 && (
            <Button onClick={openExistingOffenders}>
              <SearchIcon />
              Find Offender
            </Button>
          )}
        </Row>
        {offenders.length > 0 ? (
          <Offenders>
            {offenders.map(({ images, id, name }) => {
              return (
                <Offender key={id} onClick={() => openEditOffender(id)}>
                  {!!images && images.length > 0 ? (
                    <OffenderImage url={images[0].url} />
                  ) : (
                    <BlankAvatar>
                      <UserIcon viewBox="0 0 24 24">
                        <path
                          fill="#E0E0E0"
                          d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                        />
                      </UserIcon>
                    </BlankAvatar>
                  )}
                  <OffenderName variant="caption">{name}</OffenderName>
                </Offender>
              );
            })}
          </Offenders>
        ) : (
          <EmptySection>
            <OffendersImage width="100px" height="100px" />
            <EmptyText>There are no offenders on this incident</EmptyText>
            <Row>
              <Button
                color="primary"
                onClick={openNewOffenders}
                disabled={loading}
              >
                <AddIcon />
                Add Offender
              </Button>
              <Button
                color="primary"
                onClick={openExistingOffenders}
                disabled={loading}
              >
                <SearchIcon />
                Find Offender
              </Button>
            </Row>
          </EmptySection>
        )}
      </Section>
    );
  }
}

export default EditOffenders;
