import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import { FullWidthButton } from '../../../../global/actions';
import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';
import { List, ListItem, Row } from '../../../../global/layout';
import { ItemHeader, EmptyText } from '../../../../global/typography';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import ExclusionsImage from '../../../../../images/Ban';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Empty = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
`;
const Container = styled.div`
  margin-bottom: 120px;
`;
const EmptyActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const Column = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ExclusionDate = styled(Typography)`
  margin: 0;
  font-weight: 400;
`;
const DateRow = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
`;
const Svg = styled.svg`
  height: 24px;
  width: 24px;
`;
const Field = styled.div`
  margin: 5px 0;
  width: 100%;
`;
const FieldText = styled(Typography)`
  margin-top: 5px;
`;
const Icon = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 3px;
`;
const ButtonRow = styled(Row)`
  width: 100%;
`;
const PositionedFab = styled(Fab)`
  position: fixed;
  bottom: 70px;
  right: 10px;
`;

class Exclusion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      remove: null
    };
  }

  componentDidMount() {
    this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo('/offenders/add/warning-labels');
  }

  handleEdit = exclusion => {
    this.props.setEditingExclusion(exclusion);
    this.props.history.push('/offenders/add/ban/edit-ban');
  };

  submit = () => {
    this.props.submit();
    this.props.history.push('/offenders');
  };

  handleNext = () => {
    this.props.groups.length !== 1
      ? this.props.history.push('/offenders/add/groups')
      : this.submit();
  };

  render() {
    const { exclusions, removeExclusion, groups } = this.props;
    const { remove } = this.state;
    return (
      <Page>
        <Header>
          <HeaderText>Exclusion</HeaderText>
          <HeaderSubText>
            Create exclusions for this offender to exclusion them from areas or premises.
          </HeaderSubText>
        </Header>
        {exclusions.length > 0 ? (
          <Container>
            <List>
              {exclusions.map(
                ({ id, startDate, endDate, location, description }) => (
                  <ListItem key={id} column noHover>
                    <ButtonRow row right>
                      <Button
                        color="primary"
                        onClick={() =>
                          this.handleEdit({
                            id,
                            startDate,
                            endDate,
                            location,
                            description
                          })
                        }
                      >
                        <Icon viewBox="0 0 24 24">
                          <path
                            fill="#E57373"
                            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                          />
                        </Icon>
                        Edit
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => this.setState({ remove: id })}
                      >
                        <Icon viewBox="0 0 24 24">
                          <path
                            fill="#E57373"
                            d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                          />
                        </Icon>
                        Delete
                      </Button>
                    </ButtonRow>
                    <Field>
                      <ItemHeader>Duration</ItemHeader>
                      <DateRow>
                        <Column>
                          <ExclusionDate>
                            {moment(startDate).format('DD/MM/YYYY')}
                          </ExclusionDate>
                        </Column>
                        <Column>
                          <Svg viewBox="0 0 24 24">
                            <path
                              fill="#EF5350"
                              d="M11,16H3V8H11V2L21,12L11,22V16M13,7V10H5V14H13V17L18,12L13,7Z"
                            />
                          </Svg>
                        </Column>
                        <Column>
                          <ExclusionDate>
                            {moment(endDate).format('DD/MM/YYYY')}
                          </ExclusionDate>
                        </Column>
                      </DateRow>
                    </Field>
                    {location !== '' && (
                      <Field>
                        <ItemHeader>Location</ItemHeader>
                        <FieldText>{location}</FieldText>
                      </Field>
                    )}
                    {description !== '' && (
                      <Field>
                        <ItemHeader>Description</ItemHeader>
                        <FieldText>{description}</FieldText>
                      </Field>
                    )}
                  </ListItem>
                )
              )}
            </List>
          </Container>
        ) : (
          <Empty>
            <ExclusionsImage width="90px" height="90px" />
            <EmptyText>Currently no added bans</EmptyText>
            <EmptyActions>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/offenders/add/ban/add-ban"
              >
                Add Exclusion
              </Button>
            </EmptyActions>
          </Empty>
        )}
        {exclusions.length > 0 && (
          <PositionedFab
            variant="extended"
            color="primary"
            component={Link}
            to="/offenders/add/ban/add-bans"
          >
            <Svg viewBox="0 0 24 24">
              <path fill="#FFF" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </Svg>
            Add Exclusion
          </PositionedFab>
        )}
        <FullWidthButton
          text={
            groups.length !== 1
              ? exclusions.length > 0
                ? 'Next'
                : 'Skip Exclusions'
              : 'Submit Offender'
          }
          onClick={this.handleNext}
        />
        <ConfirmDialog
          open={remove !== null}
          handleClose={() => this.setState({ remove: null })}
          title="Are you sure?"
          description="Deleting this crime type will remove it permanently and will also remove it from any incident it's assigned to."
          actions={[
            <Button
              key={Math.random()}
              onClick={() => this.setState({ remove: null })}
            >
              Cancel
            </Button>,
            <Button
              key={Math.random()}
              onClick={() => {
                removeExclusion(remove);
                this.setState({ remove: null });
              }}
              color="primary"
            >
              Delete
            </Button>
          ]}
        />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction('default');
    this.props.setBackLinkTo('');
  }
}

export default Exclusion;
