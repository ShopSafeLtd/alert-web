import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/icons/Label';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { FullWidthButton } from '../../../../global/actions';
import { HelpButton } from '../../../../global/actions';
import { ToggleSkeleton } from '../../../../global/skeletons';
import { EmptyText } from '../../../../global/typography';
import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import AddLabel from '../AddLabel/AddLabel';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`;
const List = styled.div`
  flex: 1;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
  padding: 0 20px;
`;
const ItemText = styled(Typography)`
  margin: 0;
  flex: 1;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
`;
const Svg = styled.svg`
  height: 30px;
  width: 30px;
`;
const FAB = styled(Fab)`
  position: fixed !important;
  bottom: 70px;
  right: 10px;
`;
const Add = styled.svg`
  height: 24px;
  width: 24px;
`;
const Empty = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const LabelIcon = styled(Icon)`
  color: #ef5350;
  font-size: 60px;
`;

class Labels extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      add: false
    };
  }

  componentDidMount() {
    this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo('/offenders/add/images');
  }

  toggleAdd = () =>
    this.setState({
      add: !this.state.add
    });

  submit = () => {
    this.props.handlePost();
    this.props.history.push('/offenders');
  };

  handleNext = () => {
    this.props.admin
      ? this.props.history.push('/offenders/add/ban')
      : this.props.groups.length > 1
        ? this.props.history.push('/offenders/add/groups')
        : this.submit();
  };

  render() {
    const {
      toggleSelectedLabels,
      offenderLabels,
      selectedLabels,
      disabled,
      addLabel,
      admin,
      labelsLoading,
      groups
    } = this.props;

    const { add } = this.state;
    return (
      <Page>
        <Header>
          <HeaderText>Warning Labels</HeaderText>
          <HeaderSubText>
            Please select any warning labels that are relevant to this offender
            or add your own.
          </HeaderSubText>
        </Header>
        {labelsLoading ? (
          <List>
            <ToggleSkeleton />
            <ToggleSkeleton />
            <ToggleSkeleton />
          </List>
        ) : offenderLabels.length === 0 ? (
          <Empty>
            <LabelIcon />
            <EmptyText>There are no offender warnings.</EmptyText>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/offenders/add/warning-labels/add"
            >
              Add Warning
            </Button>
          </Empty>
        ) : (
          <List>
            {offenderLabels.map(label => (
              <ListItem key={label.id}>
                <Svg
                  onClick={() => toggleSelectedLabels(label)}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill={
                      selectedLabels.map(({ id }) => id).includes(label.id)
                        ? '#1E88E5'
                        : '#E0E0E0'
                    }
                    d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                  />
                </Svg>
                <ItemText onClick={() => toggleSelectedLabels(label)}>
                  {label.name}
                </ItemText>
                <HelpButton title={label.name} helpText={label.description} />
              </ListItem>
            ))}
          </List>
        )}
        {admin && (
          <FAB
            color="primary"
            aria-label="Add"
            disabled={disabled}
            component={Link}
            to="/offenders/add/warning-labels/add"
          >
            <Add viewBox="0 0 24 24">
              <path
                fill="#FFFFFF"
                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              />
            </Add>
          </FAB>
        )}
        <FullWidthButton
          text={
            admin
              ? selectedLabels.length > 0
                ? 'Next'
                : 'Skip Warnings'
              : groups.length > 1
                ? 'Next'
                : 'Submit Offender'
          }
          onClick={this.handleNext}
        />
        <AddLabel open={add} close={this.toggleAdd} addLabel={addLabel} />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction('default');
    this.props.setBackLinkTo('');
  }
}

export default Labels;
